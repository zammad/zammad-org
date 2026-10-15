# Zammad Hub

This repo will replace the current zammad.org with the with a single landing page from where users can jump to different sections as well as to related sites.

It contains the new documentation system which is based on Vitepress. Their documentation can be found [here](https://vitepress.dev/guide/getting-started).

## Getting Started

- Clone this repository.
- Install dependencies via `pnpm install --frozen-lockfile`.
- Get the dev system running via `pnpm dev` and access it at `http://localhost:5173/en/`. This serves the English app; use `pnpm dev:de` to generate that language's content and serve it at `http://localhost:5173/de/`.
- Every language is an app of its own and built into its own directory. `pnpm build` builds all of them into `dist/<language>/`, a single one can be built with e.g. `pnpm build:de`. Serve the build with `pnpm preview` at `http://localhost:4173/`. To build locally, the screenshots are required, see below.

## Internationalization (i18n)

Only the content in `src/en/` directory and child directories should be modified. The content of all other languages is generated from the PO files in `i18n/` and is not tracked by Git:

- `LOCALE=de pnpm i18n:locale` generates the content of a single language and everything that language's app needs. `pnpm i18n` does the same for all languages.
- The content is generated automatically before the language is built, see `.gitlab/i18n_locale.sh`.
- Please submit your translations via [Weblate](https://translations.zammad.org) and they will be automatically applied.

## Deployment

Every language is served as an app of its own from its own directory (`/en/`, `/de/`, …), which is why each app is built with its language as its base path. The web server takes care of the rest:

- `/` redirects to the language detected from the `Accept-Language` header.
- Links without a language prefix are redirected to the detected language.
- Internal links that carry a language prefix of their own (`/en/...` links in the German content, for example) are collapsed back to the app they point to.

See `.docker-compose/vitepress.conf` for the configuration used for local testing. `pnpm preview` serves the build as plain files, so the redirects above and the per-language error pages only take effect with the web server.

## Automatic Screenshots (Cypress)

First, start a local Zammad stack via docker compose: `pnpm screenshots:start-stack`. This will run against the `develop` docker image of Zammad. If you want another one like `stable` or a specific version, you can pass it via environment variable like so: `ZAMMAD_VERSION=stable …`.

Now you can install cypress by running `pnpm screenshots:install`.

A Firefox installation is required for the local screenshots: the suite is pinned to Firefox via `defaultBrowser` in `.screenshots/cypress.config.js` and Cypress aborts when that browser is missing. To run in another browser instead, pass it explicitly, e.g. `pnpm --dir ./.screenshots exec cypress run --browser chrome` (on Wayland, Electron additionally needs `ELECTRON_EXTRA_LAUNCH_ARGS='--ozone-platform=x11'`).

Then, to generate automatic screenshots, run `pnpm screenshots:build`. The screenshots will be stored under `src/public/screenshots/cypress/`, but will not be tracked by Git.

To implement new screenshots, run `pnpm screenshots:dev` and Cypress will open in a separate window. Make sure to run the build command when ready, so the screenshot is saved in its correct place.

> NOTE: You may need to run the build/dev command twice in succession, in case you just started the Zammad stack for the first time, otherwise Cypress may hang. This will obviously get addressed in the future, but for now just run the tests once before starting to work on it and expect it to fail.

Finally, the Zammad stack can be shut down via `pnpm screenshots:stop-stack`. This will also remove any associated volume data.

## Additional Info

- Before pushing your changes, make sure to update the translation catalog by executing `pnpm i18n`.
- Make sure to change the English source files only. All other languages are generated from the translations of [Weblate](https://translations.zammad.org) when they are built.
