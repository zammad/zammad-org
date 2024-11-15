#!/usr/bin/env sh

set -ex

cd "$(dirname $0)/zammad-docker-compose"

# Take screenshots
docker compose exec zammad-nginx sh -c "cd /opt/zammad/zammad-org/.screenshots/ && pnpm install"
docker compose exec zammad-nginx sh -c "cd /opt/zammad/zammad-org/.screenshots/ && pnpm build:ci"

docker compose cp zammad-nginx:/opt/zammad/zammad-org/.screenshots/dist/cypress ../../../src/public/screenshots/
