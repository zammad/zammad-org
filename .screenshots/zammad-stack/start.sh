#!/usr/bin/env sh

set -ex

if [ -z "$ZAMMAD_VERSION" ]
then
  if [ "$CI_COMMIT_REF_NAME" = 'master' ]
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

if [ -n "$CI" ]
then
  cat - > docker-compose.override.yml <<COMPOSE_OVERRIDE_FILE
---
name: zammad-screenshots-${CI_JOB_ID}
services:
  zammad-nginx:
    ports: !reset []
COMPOSE_OVERRIDE_FILE
else
  cat - > docker-compose.override.yml <<COMPOSE_OVERRIDE_FILE
---
name: zammad-screenshots
COMPOSE_OVERRIDE_FILE
fi

cat - > .env <<ENV_FILE
VERSION=${ZAMMAD_VERSION}
ENV_FILE

if [ -n "$CI" ]
then
  docker compose pull --policy always --quiet
  docker compose up -d --quiet-pull
else
  docker compose pull --policy always
  docker compose up -d
fi

# Mounts won't work since we're already in a container and not on the host, so use 'docker compose cp'.
docker compose exec zammad-nginx mkdir -p /opt/zammad/zammad-org
docker compose cp ../../../.screenshots zammad-nginx:/opt/zammad/zammad-org/
docker compose exec -u root zammad-nginx sh -c "rm -rf /opt/zammad/zammad-org/.screenshots/node_modules && chown -R zammad:zammad /opt/zammad/zammad-org"

if [ -n "$CI" ]
then
  # Install Node & cypress dependencies
  docker compose exec -u root -e CI=true zammad-nginx sh -c "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -q -y nodejs && npm -g install yarn pnpm"
  docker compose exec -u root -e CI=true zammad-nginx sh -c "apt-get install -q -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb"
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

# Confirm Zammad is running.
docker compose exec zammad-nginx curl --retry 30 --retry-delay 1 --retry-connrefused -s localhost:8080 | grep "Fast Lane"
