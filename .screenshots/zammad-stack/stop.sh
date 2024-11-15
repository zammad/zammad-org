#!/usr/bin/env sh

set -ex

cd "$(dirname $0)/zammad-docker-compose"

docker compose down --timeout 0 --volumes
