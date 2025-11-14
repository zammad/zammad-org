#!/usr/bin/env sh

mkdir -p node_modules
sudo chown -R vscode node_modules
CI=true pnpm install --frozen-lockfile
CI=true pnpm screenshots:install
mkdir -p .screenshots/node_modules
sudo chown -R vscode .screenshots/node_modules
CI=true pnpm --dir ./.screenshots exec cypress install
