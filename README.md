# Zammad Hub

This replaces the existing zammad.org. It is planned to have a single landing
page from where you can jump to different sections as well as to sister sites.

It contains the new documentation system which is based on Vitepress.
Their documentation can be found
[here](https://vitepress.dev/guide/getting-started).

## Getting started

- Clone this repo.
- Install dependencies via `pnpm install`.
- Get the dev system running via `pnpm dev` and access it
  at `http://localhost:5173`.
- To build the output for production, use `pnpm build` and `pnpm preview` to
  serve it at `http://localhost:4173/`.

## Additional info

- Used [tab plugin](https://vitepress-plugins.sapphi.red/tabs/) and added the
  configuration to `config.ts` and `index.ts`.
- Added plugin
  [autosidebar](https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar)
  to `config.mts` to have an automatically populated page structure in the
  sidebar. Currently not working.
