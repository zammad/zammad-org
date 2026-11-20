#!/usr/bin/env sh

set -ex

cd "$(dirname $0)/zammad-docker-compose"

# Take screenshots with the screenshots-runner service, see start.sh.
docker compose exec screenshots-runner sh -c "cd /opt/.screenshots && pnpm build:ci"

docker compose cp screenshots-runner:/opt/.screenshots/dist/generated ../../../src/public/screenshots/
