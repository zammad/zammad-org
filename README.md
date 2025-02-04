# Zammad Hub

This repo will replace the current zammad.org with the with a single landing page from where users can jump to different sections as well as to related sites.

It contains the new documentation system which is based on Vitepress. Their documentation can be found [here](https://vitepress.dev/guide/getting-started){target=_blank}.

## Getting Started

- Clone this repository.
- Install dependencies via `pnpm install --frozen-lockfile`.
- Get the dev system running via `pnpm dev` and access it  at `http://localhost:5173`.
- To build the output for production, use `pnpm build`. The build can be located under `/dist`, and `pnpm preview` used to serve it at `http://localhost:4173/`.

## Internationalization (i18n)

Only the content in `src/en/` directory and child directories should be modified. The content in other language directories is auto-generated. Please submit your translations via [Weblate](https://translations.zammad.org){target=_blank} and they will be automatically applied.

## Automatic Screenshots (Cypress)

First, start a local Zammad stack via docker compose: `pnpm screenshots:start-stack`. This will run against the `develop` docker image of Zammad. If you want another one like `stable` or a specific version, you can pass it via environment variable like so: `ZAMMAD_VERSION=stable …`.

Now you can install cypress by running `pnpm screenshots:install`.

Then, to generate automatic screenshots, run `pnpm screenshots:build`. The screenshots will be stored under `src/public/screenshots/cypress/`, but will not be tracked by Git.

To implement new screenshots, run `pnpm screenshots:dev` and Cypress will open in a separate window. Make sure to run the build command when ready, so the screenshot is saved in its correct place.

> NOTE: You may need to run the build/dev command twice in succession, in case you just started the Zammad stack for the first time, otherwise Cypress may hang. This will obviously get addressed in the future, but for now just run the tests once before starting to work on it and expect it to fail.

Finally, the Zammad stack can be shut down via `pnpm screenshots:stop-stack`. This will also remove any associated volume data.

## Additional Info

- Before pushing your changes, make sure to update the translation catalog by executing `pnpm i18n`.
- Make sure to change the English source files only. All other languages are automatically built based on the translations from [Weblate](https://translations.zammad.org){target=_blank}.
