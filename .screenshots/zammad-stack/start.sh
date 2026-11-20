#!/usr/bin/env sh

set -ex

if [ -z "$ZAMMAD_VERSION" ]
then
  if [ "$CI_COMMIT_REF_NAME" = 'stable' ]
  then
    ZAMMAD_VERSION=stable
  else
    ZAMMAD_VERSION=develop
  fi
fi

cd "$(dirname $0)"

if [ -d "zammad-docker-compose" ]
then
  (cd zammad-docker-compose; git pull)
else
  git clone --depth=1 https://github.com/zammad/zammad-docker-compose
fi

cd zammad-docker-compose

# Check if stack is already running, and if so, stop it first.
docker compose ps -q | grep -q . && docker compose down --timeout 0 --volumes

if [ -n "$CI" ]
then
  # In CI, the screenshots are taken by the screenshots-runner service: the
  # official Playwright image, with Chromium, in the network namespace of
  # zammad-nginx. It reaches Zammad at localhost:8080, the address Zammad is
  # set up for; any other address makes Zammad show a warning on every page.
  # Its version is the one of @playwright/test in .screenshots/package.json.
  PLAYWRIGHT_VERSION=$(sed -n 's/.*"@playwright\/test": "\([0-9.]*\)".*/\1/p' ../../package.json)
  test -n "$PLAYWRIGHT_VERSION"
  cat - > docker-compose.override.yml <<COMPOSE_OVERRIDE_FILE
---
name: zammad-screenshots-${CI_JOB_ID}
services:
  zammad-nginx:
    ports: !reset []
  screenshots-runner:
    image: mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble
    network_mode: service:zammad-nginx
    command: sleep infinity
    init: true
    environment:
      CI: "true"
COMPOSE_OVERRIDE_FILE
else
  cat - > docker-compose.override.yml <<COMPOSE_OVERRIDE_FILE
---
name: zammad-screenshots
COMPOSE_OVERRIDE_FILE
fi

# The screenshots need neither Elasticsearch nor backups: Zammad falls back to
# its database search, and the stack is thrown away afterwards. Leaving both
# services out saves pulling and starting them, and the reindex in zammad-init.
# Pass ZAMMAD_ELASTICSEARCH=true to start the stack with Elasticsearch anyway.
# Setting COMPOSE_FILE turns off the automatic pickup of
# docker-compose.override.yml, so it is listed explicitly.
COMPOSE_FILES=docker-compose.yml:scenarios/disable-backup-service.yml
if [ "$ZAMMAD_ELASTICSEARCH" = "true" ]
then
  ELASTICSEARCH=true
else
  ELASTICSEARCH=false
  COMPOSE_FILES=${COMPOSE_FILES}:scenarios/disable-elasticsearch-service.yml
fi

cat - > .env <<ENV_FILE
VERSION=${ZAMMAD_VERSION}
ELASTICSEARCH_ENABLED=${ELASTICSEARCH}
COMPOSE_FILE=${COMPOSE_FILES}:docker-compose.override.yml
ENV_FILE

if [ -n "$CI" ]
then
  docker compose pull --policy always --quiet
else
  docker compose pull --policy always
fi

docker compose up -d

# Mounts won't work since we're already in a container and not on the host, so use 'docker compose cp'.
# Zammad needs the seeds only.
docker compose exec zammad-nginx mkdir -p /opt/zammad/zammad-org/.screenshots/zammad-stack
docker compose cp ../seeds zammad-nginx:/opt/zammad/zammad-org/.screenshots/zammad-stack/
docker compose exec -u root zammad-nginx chown -R zammad:zammad /opt/zammad/zammad-org

if [ -n "$CI" ]
then
  # The suite and its packages, while Zammad initializes. The image brings
  # Node and Chromium; pnpm comes in the version of .screenshots/package.json.
  docker compose cp ../../../.screenshots screenshots-runner:/opt/
  docker compose exec screenshots-runner sh -c "cd /opt/.screenshots && rm -rf node_modules && npm install --global --silent \"\$(node -p 'require(\"./package.json\").packageManager')\" && pnpm install --frozen-lockfile"
fi

# Wait for the application to be initialized.
docker compose wait zammad-init

# Custom AutoWizard
docker compose exec zammad-nginx cp /opt/zammad/zammad-org/.screenshots/zammad-stack/seeds/auto_wizard.json /opt/zammad/auto_wizard.json
docker compose exec zammad-nginx /docker-entrypoint.sh bundle exec rails r 'AutoWizard.run'
# Custom Seeds
docker compose exec zammad-nginx /docker-entrypoint.sh bundle exec rails r /opt/zammad/zammad-org/.screenshots/zammad-stack/seeds/seeds.rb

# Restart services after changing FQDN
docker compose restart zammad-nginx zammad-railsserver zammad-websocket zammad-scheduler

if [ -n "$CI" ]
then
  # The restart of zammad-nginx gave it a new network namespace: join it.
  docker compose restart screenshots-runner
fi

# Confirm Zammad is running: the page itself comes from nginx, the session
# check from Rails, which takes a while longer to come up after the restart
# (nginx answers 502 until then, which curl retries).
docker compose exec zammad-nginx curl --retry 30 --retry-delay 1 --retry-connrefused -s localhost:8080 | grep "Fast Lane"
docker compose exec zammad-nginx curl --retry 60 --retry-delay 1 --retry-connrefused -sf localhost:8080/api/v1/signshow | grep -q '"config"'
