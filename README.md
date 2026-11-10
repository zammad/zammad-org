# Zammad Hub

This repo will replace the current zammad.org with the with a single landing page from where users can jump to different sections as well as to related sites.

It contains the new documentation system which is based on Vitepress. Their documentation can be found [here](https://vitepress.dev/guide/getting-started).

## Getting Started

- Clone this repository.
- Install dependencies via `pnpm install --frozen-lockfile`.
- Get the dev system running via `pnpm dev` and access it at `http://localhost:5173/en/`. This serves the English app; use `pnpm dev:de` to generate that language's content and serve it at `http://localhost:5173/de/`.
- Every language is an app of its own and built into its own directory. `pnpm build` builds all of them into `dist/<language>/`, a single one can be built with e.g. `pnpm build:de`. Serve the build with `pnpm preview` at `http://localhost:4173/`. To build locally, the screenshots are required, see below.

## Search

The search is served by [Typesense](https://typesense.org/), not by the browser. `pnpm build` writes the search documents of each language to `search-index/<language>.jsonl` (one document per page section), and `pnpm search:index` loads them into Typesense — in production, the `search-init` service of the Docker stack does that on every deploy. See `.vitepress/search/` for the code and `docker/README.md` for the production setup.

Local development needs no access to any production system, only Docker:

- `pnpm search:start` starts a local Typesense (the `typesense` service of `docker/docker-compose.yml`, with the dev keys from `docker/.env`). `pnpm search:stop` stops it again; the index survives in a Docker volume.
- `pnpm search:dev` starts Typesense, builds the English app and indexes it. Use `LOCALE=de pnpm search:dev` for another language. Run it again after content changes you want to find.
- `pnpm dev` then searches the local Typesense: the dev server forwards `/search-api/multi_search` to it and adds the search-only key, like nginx does in production.

Without a running Typesense, the site works as usual and the search reports that it is unavailable. The same applies to `pnpm preview` and to downloaded build artifacts, which have no search backend.

For reindexing, restoring, rolling back and key rotation in production, see the runbook in `docker/README.md`.

Typesense is expected at `http://localhost:8108`; set `TYPESENSE_URL` to use another address (the dev container sets it to the Docker host). `TYPESENSE_ADMIN_KEY` and `TYPESENSE_SEARCH_KEY` default to the dev keys for `pnpm search:dev` and `pnpm dev`.

### Tuning the search

Each language has a file `.vitepress/search/relevance/<language>.json`. It is maintained by hand (not via Weblate) and applied on every indexing run:

- `stopwords`: words left out of every query, so that "how do I change my password" searches for "change password". Keep it to question words, articles and the like.
- `synonyms`: lists of words that find each other, e.g. `["kanal", "anbindung", "channel"]`: a search for "Anbindung" also finds the sections that only say "Kanal" or "channel". Words of four or more letters also cover longer forms (`rolle` covers `rollen`); list other forms (`kanal`, `kanäle`) separately. `{ "root": "kanal", "synonyms": ["anbindung"] }` works in one direction only: "Anbindung" finds "Kanal", not the other way round.
- `pinned`: sections that come first for a query, e.g. `{ "query": "passwort zurücksetzen", "urls": ["/de/documentation/use/personal-settings.html#passwort"] }`. The query has to match exactly (`"match": "contains"` for queries that only contain it). The URL is the address of the section as shown by the search; if a heading is renamed or retranslated, its anchor changes and the indexing fails until the pin is updated.
- `checks`: what the search has to find, e.g. `{ "q": "passwort reset", "expect": "/de/documentation/use/personal-settings.html", "top": 1 }` — the page has to be among the first `top` pages (default 5). The indexer runs them on the new index before switching to it — in CI on every pipeline, and on every deploy for each language that changed.

When a search does not find what it should: add a check that fails, then adjust the content, a synonym or a pin until it passes. Every indexing run checks the new index before switching to it, so a failing check keeps the previous index in place. To try out settings locally while a check still fails, index without the checks and run them on their own (with the dev keys from `docker/.env`):

```sh
TYPESENSE_ADMIN_KEY=local-dev-admin-key pnpm search:index en --no-checks
TYPESENSE_SEARCH_KEY=local-dev-search-key pnpm search:check en
```

## Agents (`llms.txt`, MCP)

For assistants and coding agents, `pnpm build` writes an [`llms.txt`](https://llmstxt.org/) into every app (`dist/<language>/llms.txt`) and the Markdown version of every page next to its HTML (`foo/bar.html` → `foo/bar.md`), with [vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms). nginx also serves the English `llms.txt` at `/llms.txt`; it links to the other languages.

- The table of contents follows the main sidebar. It is rendered by `.vitepress/llms/sidebar.mts`, not by the plugin, which drops the base path (`/en/`) of the pages in nested sidebar groups.
- Index pages that only name a sidebar group (front matter without content) get no Markdown version and no entry. An index page with content of its own is linked from its group.
- `llms-full.txt` (all pages in one file) is not generated: it is too heavy for models.
- At the end of every build, `.vitepress/llms/check.mts` checks that `llms.txt` lists every page of the sidebar and that every Markdown page it links to was built. Otherwise the build fails, locally and in both CI pipelines.
- The plugin advises against multilingual sites, because it would mix the languages in one file. Here every language is built as an app of its own, so the plugin only ever sees one language.
- Absolute links use `SITE_URL` (default `https://next.zammad.org`).
- The MCP server in `mcp/` gives agents search, pages, navigation and glossary at `https://next.zammad.org/mcp`; see
  `mcp/README.md` for its tools, client setup and development, and `docker/README.md` for its operation.
- For the MCP server, the build also writes `agent-data/<language>/` (outside `dist/`, never served): the navigation (`nav.json`), the pages with their Markdown versions and outlines (`pages.json`), the glossary (`glossary.json`) and the search settings of the language (`search.json`). See `.vitepress/llms/agent-data.mts`.

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

The web server runs as a Docker container in production and locally. See `docker/README.md` for the configuration, local testing and deployment. `pnpm preview` serves the build as plain files, so the redirects above and the per-language error pages only take effect with the web server.

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
