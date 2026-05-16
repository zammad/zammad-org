#!/usr/bin/env sh

mkdir -p node_modules
sudo chown -R vscode node_modules .pnpm-store
CI=true pnpm install --frozen-lockfile
mkdir -p .screenshots/node_modules
sudo chown -R vscode .screenshots/node_modules
CI=true pnpm screenshots:install
