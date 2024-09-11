# Zammad Documentation Powered by Vitepress

This is a first try to build the new Zammad documentation system. It is based on Vitepress. You can find their documentation [here](https://vitepress.dev/guide/getting-started).

## Getting started

- Clone this repo.
- Install dependencies via `pnpm install`.
- Get the dev system running via `pnpm dev` and access it at `http://localhost:5173`.
- To build the output for production, use `pnpm build` and `pnpm preview` to serve it at `http://localhost:4173/`.

## Additional info

- `Default Theme + Customization` chosen on initialization.
- Some content added to get a feeling for the system and to be able to create a basic structure.
- Added a to-do file (see button on start page) to collect necessary actions (no complete list).
- Used [tab plugin](https://vitepress-plugins.sapphi.red/tabs/) (e.g. via `pnpm add --dev vitepress-plugin-tabs`) and added the configuration to `config.ts` and `index.ts`.
- Added plugin [autosidebar](https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar) to `config.mts` to have an automatically populated page structure in the sidebar. But didn't get it to work (see comment there).
