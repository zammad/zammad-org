#!/usr/bin/env sh

CI=true pnpm install --frozen-lockfile
CI=true pnpm screenshots:install
pnpm --dir ./.screenshots exec cypress install