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

## Automatic Screenshots

The screenshots of the documentation are taken by a [Playwright](https://playwright.dev/) suite in `.screenshots/`, from a Zammad stack with seeded demo data.

First, start a local Zammad stack via docker compose: `pnpm screenshots:start-stack`. This will run against the `develop` docker image of Zammad. If you want another one like `stable` or a specific version, you can pass it via environment variable like so: `ZAMMAD_VERSION=stable …`.

The stack runs without Elasticsearch and without the backup service, to keep it small and fast to start: Zammad falls back to its database search, which is enough for the screenshots. `start.sh` writes `ELASTICSEARCH_ENABLED=false` and a `COMPOSE_FILE` with the scenarios `disable-elasticsearch-service.yml` and `disable-backup-service.yml` into `.screenshots/zammad-stack/zammad-docker-compose/.env`. To start the stack with Elasticsearch, e.g. to compare a screenshot of the search, pass `ZAMMAD_ELASTICSEARCH=true pnpm screenshots:start-stack`. Run any `docker compose` command for the stack from `.screenshots/zammad-stack/zammad-docker-compose/`, so that it picks up that `.env`.

Install the suite with `pnpm screenshots:install`, and Chromium for it with `pnpm --dir ./.screenshots exec playwright install --with-deps chromium` (the dev container does both when it is created). The suite runs in Chromium only, which the UI mode of `pnpm screenshots:dev` needs anyway; Playwright brings its own build of it.

Then, to generate the screenshots, run `pnpm screenshots:build`. They are stored under `src/public/screenshots/generated/`, but are not tracked by Git; the hand-made screenshots live next to it, in the other directories of `src/public/screenshots/`. The suite expects the stack at `http://localhost:8080`; set `SCREENSHOTS_BASE_URL` for another address (the dev container sets it to the Docker host). Zammad is set up for `localhost:8080` and shows a warning on every page reached through another address, which then shows in the screenshots as well.

To implement new screenshots, run `pnpm screenshots:dev`: it opens Playwright's UI mode, in the dev container on its desktop (noVNC on port 6080). The specs live in `.screenshots/tests/`, the helpers for logging in, cropping and highlighting in `.screenshots/support/screenshots.js`, and `.screenshots/tests/*.spec.js.example` shows how to use them. A screenshot named `foo` in `tests/documentation/use/basics.spec.js` is written to `generated/documentation/use/basics/foo.png`, and the documentation refers to it as `/screenshots/generated/documentation/use/basics/foo.png`.

In CI, the suite runs in the official Playwright image, as the `screenshots-runner` service of the stack (see `start.sh` and `screenshots.sh`), in the network namespace of `zammad-nginx`, so that it reaches Zammad at `localhost:8080`. Its tag follows the version of `@playwright/test` in `.screenshots/package.json`.

Finally, the Zammad stack can be shut down via `pnpm screenshots:stop-stack`. This will also remove any associated volume data.

### Screenshots in CI

Every build needs the screenshots, but generating them takes a Zammad stack and most of a pipeline's time. That is why most pipelines reuse the screenshots of `develop`:

- **GitLab:** the `screenshots` job generates them in the nightly pipeline of `develop` (a pipeline schedule), in pipelines of `stable` (another Zammad version), and in pipelines that change `.screenshots/` or `.gitlab-ci.yml`. All other pipelines run `screenshots:reuse`, which downloads the screenshots of the latest successful pipeline of `develop`. The nightly pipeline does not deploy: the website gets the refreshed screenshots with the next merge.
- **GitHub:** the workflow does the same. It generates the screenshots in its nightly run on `develop` and in pull requests that change `.screenshots/` or `.github/workflows/ci.yml`. All other runs take them from the last successful nightly run.

The nightly run keeps the screenshots in step with the Zammad `develop` UI. When a change of that UI breaks a spec, the nightly run fails, and all other pipelines keep reusing the screenshots of the last successful night.

To generate the screenshots for a branch that does not change the suite, e.g. to see a Zammad UI change:

- **GitLab:** Build → Pipelines → Run pipeline, select the branch and set `FORCE_SCREENSHOTS` to `true`. Merge request pipelines take no variables, so this runs a branch pipeline.
- **GitHub:** run the workflow manually (Actions → Run workflow) with "force" checked.

## Additional Info

- Before pushing your changes, make sure to update the translation catalog by executing `pnpm i18n`.
- Make sure to change the English source files only. All other languages are generated from the translations of [Weblate](https://translations.zammad.org) when they are built.
