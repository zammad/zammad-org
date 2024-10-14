# Zammad Hub

This repo will replace the current zammad.org with the with a single landing
page from where users can jump to different sections as well as to related
sites.

It contains the new documentation system which is based on Vitepress.
Their documentation can be found
[here](https://vitepress.dev/guide/getting-started).

## Getting started

- Clone this repository.
- Install dependencies via `pnpm install --frozen-lockfile`.
- Get the dev system running via `pnpm dev` and access it
  at `http://localhost:5173`.
- To build the output for production, use `pnpm build`. The build can be
  located under `/dist`, and `pnpm preview` used to serve it at
  `http://localhost:4173/`.

## Additional info

- Before pushing your changes, make sure to update the translation catalog by
executing ``pnpm i18n``.
- Make sure to change only the english source files. All other languages are
automatically built based on the translation from
[Weblate](https://translations.zammad.org).
