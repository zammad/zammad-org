# Zammad Hub Docker Compose

Zammad Hub runs in production as a Docker container: nginx with the built site and its configuration baked into one
image. A reverse proxy on the web host terminates TLS and forwards every request to the container. Everything else
(redirects, language detection, caching, security headers, error pages, the search proxy) is configured in this
directory. The search index lives in a second container, Typesense, and a third one loads it, see [Search](#search).
Another one, the MCP server of the documentation, answers assistants and agents at `/mcp`, see
[MCP server](#mcp-server).

| File | Purpose |
| --- | --- |
| `Dockerfile` | The images: the website (default target, based on the unprivileged nginx image, runs as non-root, listens on `8080`) and `search-init` (the search index of the same build, see [Search](#search)). |
| `nginx/**` | nginx server configuration. `nginx/templates/` is rendered with environment variables at start. |
| `docker-compose.yml` | Production stack: nginx, Typesense, `search-init` and the MCP server. The deploy job copies it to the web host. |
| `docker-compose.override.yml` | Local testing only: builds the images from `dist/`, `search-index/` and `agent-data/` instead of pulling them. |
| `.env` | Local testing only: dev keys for Typesense. The web host has its own, see [Keys](#keys). |
| `reverse-proxy.example.conf` | Example vhost for the reverse proxy on the web host. |

## Test Locally

Prerequisites: a Docker engine with Docker Compose 2.17 or newer and free `8081` and `8108` ports. Set
`ZAMMAD_ORG_PORT` and `TYPESENSE_PORT` to use other ones.

From the root directory, first build the app; this also writes the search documents to `search-index/`:

```sh
pnpm build
```

Then build the images and start the stack. Without `--wait`: `search-init` exits once it has loaded the index, which
`--wait` would take for a failure.

```sh
cd docker
docker compose up -d --build
docker compose logs -f search-init   # until it has loaded the index
```

The service is available via <http://localhost:8081/>, the MCP server via <http://localhost:8081/mcp> (see
`mcp/README.md` for a client). Rebuild the images (`--build`) after every `pnpm build`; the next start loads the
languages that changed.

Stop the stack:

```sh
cd docker
docker compose down
```

The search index survives in the `typesense-data` volume; `docker compose down --volumes` removes it.

## Search

The search of all languages is served by [Typesense](https://typesense.org/), self-hosted as the `typesense` service
of the stack. `pnpm build` writes the search documents to `search-index/`; they are loaded into one collection per
language behind the alias `docs_<locale>`. See `.vitepress/search/` for the details.

Browsers never talk to Typesense directly. They send their searches to `/search-api/multi_search` on the same origin,
and nginx:

- accepts `POST` to this one endpoint only — every other Typesense endpoint is unreachable from outside,
- adds the search-only key (`X-TYPESENSE-API-KEY`), so the page carries no credential at all,
- allows at most 2 searches per request (`limit_multi_searches`, the number the site sends), instead of Typesense's
  default of 50,
- limits each client to 10 searches per second (bursts of 20 more), answering `429` beyond that,
- resolves Typesense per request, so the site is served even when Typesense is down. The search then fails: with `504`
  after the 2 s connect timeout while nginx still has the address of Typesense cached (up to 30 s), with `502` once the
  name no longer resolves. The search dialog reports either as unavailable.

The `search-init` service loads the index. Its image is built from the same pipeline as the website and contains the
search documents of that build, the relevance settings and the indexer (`pnpm search:index`). It runs whenever the
stack is started — on every deploy — and exits:

- Languages whose index is loaded already are skipped: the name of a collection carries a hash of everything that goes
  into it. A start without changes loads nothing and keeps the previous collection of each language for a rollback.
- Changed languages are loaded into new collections and checked before the aliases switch to them; a failure while
  loading or checking leaves the previous index in place.
- It makes sure that the search-only key exists in Typesense.

nginx does not wait for it: the site goes live right away, and until the new index is in, the search uses the previous
one — or reports itself unavailable, on the first start or when loading fails. The deploy job does not wait for it
either, so a failed load does not fail the deploy: it only shows on the web host, see [Check the search after a
deploy](#check-the-search-after-a-deploy). A reboot of the host does not start it again; Typesense keeps its index.

Typesense keeps its data in the `typesense-data` volume. On start, it restores its last snapshot and replays the changes
made since; without a snapshot, that replay can lose the latest changes. So Typesense writes a snapshot every minute
(`TYPESENSE_SNAPSHOT_INTERVAL_SECONDS` in `docker-compose.yml`, default an hour), and `search-init` requests one after
loading: a restart of Typesense or of the host keeps the index.

Typesense publishes its port on `127.0.0.1` of the web host, for the host's administrators only, see
[Runbook](#runbook).

### Keys

| Variable | Used by | Can |
| --- | --- | --- |
| `TYPESENSE_ADMIN_KEY` | Typesense (bootstrap key), `search-init` | Everything. |
| `TYPESENSE_SEARCH_KEY` | nginx, the MCP server, `search-init` (creates the key in Typesense) | Search the `docs_*` collections, nothing else. |

`docker compose` refuses to start the stack without both. On the web host, they are in `/opt/zammad-org/.env` next to
`docker-compose.yml`, which the host's administrators prepare before the first deploy (see [Prepare the web
host](#prepare-the-web-host)). The file belongs to root and is readable by root only; the deploy job neither writes
nor reads it, its user has no rights to it, and `sudo docker compose` reads it. No CI variables are needed: nginx,
Typesense, `search-init` and the MCP server all get the keys from this one file. Generate them as plain hex (`openssl
rand -hex 32`): Compose interpolates `$` in `.env` values. Consequences of the self-hosting:

- The admin key is never in the repository, an image, CI or the browser. It exists only on the web host: in the
  root-only `.env` file and in the runtime environment of the Typesense and `search-init` containers.
- The search-only key exists in the root-only `.env` file and in the runtime environment of the nginx, `search-init`
  and MCP server containers. It is not secret in the sense that it could do harm — it only searches public content — but keeping it
  server-side lets the rate limit and the endpoint restriction above apply to every client.
- The index is derived data: losing the volume loses nothing that the next start of `search-init` cannot restore.

The values in `docker/.env` of this repository are for local testing only and protect nothing but a local container.

### Runbook

Commands run on the web host, in `/opt/zammad-org` (`sudo docker compose …`). Calls to the Typesense API go to its port
on `127.0.0.1` of the host and need the admin key, which only root can read from `.env`; they use `curl` and `jq`:

```sh
cd /opt/zammad-org
export TS=http://127.0.0.1:8108   # or the TYPESENSE_PORT of .env
export KEY=$(sudo sh -c '. ./.env && printf %s "$TYPESENSE_ADMIN_KEY"')
```

Locally, use `TS=http://localhost:${TYPESENSE_PORT:-8108} KEY=local-dev-admin-key` instead.

#### Prepare the web host

Once, before the first deploy. Create `/opt/zammad-org/.env`, owned by root and readable by root only:

```sh
sudo install -d /opt/zammad-org
sudo install -m 600 -o root -g root /dev/null /opt/zammad-org/.env   # skip if the file exists, see below
sudoedit /opt/zammad-org/.env
```

Put both keys into it, each generated with `openssl rand -hex 32`:

```sh
TYPESENSE_ADMIN_KEY=<64 hex characters>
TYPESENSE_SEARCH_KEY=<64 hex characters>
```

If the file exists already (e.g. with `ZAMMAD_ORG_PORT`), add the two lines and make sure that it is root's and
readable by root only: `sudo chown root:root /opt/zammad-org/.env && sudo chmod 600 /opt/zammad-org/.env`. Set
`TYPESENSE_PORT` there if port `8108` of the host is taken.

The first deploy creates the volume, loads all languages and creates the search-only key in Typesense.

#### Check the search after a deploy

The deploy job does not report whether `search-init` loaded the index: a failed run is a possible failure point that
only shows on the web host. The site works either way. After a deploy:

```sh
sudo docker compose ps -a search-init   # Exited (0): loaded, or nothing to load
sudo docker compose logs search-init
```

On another exit code, the end of the log names the cause. What the search uses then depends on when the run failed:

- While loading or checking (Typesense not healthy, a rejected document, a pin to an unknown URL, a failed check), no
  alias has changed: the search keeps the previous index, or reports itself unavailable if there is none.
- While switching the aliases, the languages switched up to then use the new index and the others the previous one.
- After the switch (cleaning up, creating the search-only key, requesting the snapshot), the new index is active;
  without the search-only key the search is unavailable, and without the snapshot a restart may lose the latest
  changes.

So after any failed run, check which collection each alias points to — the log lists every switch (`docs_de → …`):

```sh
curl -s "$TS/aliases" -H "X-TYPESENSE-API-KEY: $KEY" | jq -r '.aliases[] | "\(.name) → \(.collection_name)"'
```

Fix the cause, then start `search-init` again (see below) or deploy the fix. A new run completes what is missing:
languages already on the new index are skipped, the others are loaded and switched, and the search-only key and the
snapshot are taken care of on every run.

#### Reindex after content changes

Nothing to do: every deploy starts the stack, and `search-init` loads the languages that changed. To run it again
without a deploy — it skips what is loaded already:

```sh
sudo docker compose up -d search-init
sudo docker compose logs -f search-init
```

To load all languages again even though nothing changed:

```sh
sudo docker compose run --rm search-init node .vitepress/search/indexer.mts --force
```

#### Restore a lost index

A plain restart (`sudo docker compose restart typesense`, a reboot of the host) keeps the index, see [Search](#search).
If the search reports that it is unavailable after a restart anyway, check the alias: when it points to a collection
that no longer exists, the index is lost.

```sh
curl -s "$TS/aliases" -H "X-TYPESENSE-API-KEY: $KEY" | jq -r '.aliases[] | "\(.name) → \(.collection_name)"'
curl -s "$TS/collections" -H "X-TYPESENSE-API-KEY: $KEY" | jq -r '.[] | "\(.name) \(.num_documents)"'
```

When the index is lost (volume deleted, container broken, collections gone), the site keeps working; only the search
reports that it is unavailable. The index holds nothing that `search-init` cannot load again:

1. Recreate Typesense, with an empty volume if the old one is broken:

   ```sh
   sudo docker compose stop typesense && sudo docker compose rm -f typesense
   sudo docker volume rm zammad-org_typesense-data   # only if the data is broken
   sudo docker compose up -d --wait typesense
   ```

2. Start `search-init`. It loads every language whose collection is missing, creates the search-only key again and
   runs the checks:

   ```sh
   sudo docker compose up -d search-init
   sudo docker compose logs -f search-init
   ```

#### Roll back the index

Each language keeps its previous collection. To go back to it, e.g. after bad synonyms or a broken extraction:

```sh
curl -s "$TS/collections" -H "X-TYPESENSE-API-KEY: $KEY" | jq -r '.[].name' | grep '^docs_de_' | sort
curl -s -X PUT "$TS/aliases/docs_de" -H "X-TYPESENSE-API-KEY: $KEY" -H 'Content-Type: application/json' \
  -d '{"collection_name": "docs_de_<previous version>"}'
curl -s -X POST "$TS/operations/snapshot?snapshot_path=/tmp/typesense-snapshot" -H "X-TYPESENSE-API-KEY: $KEY"
```

The last command makes Typesense write a snapshot, so that the rollback survives a restart right away; without it, it
does from the next scheduled snapshot on, within a minute. The synonyms and pinned results roll back with the
collection; the stop words do not (they are not versioned). The next start of `search-init` — the next deploy, or
`docker compose up` by hand — loads the index of the release again, so fix the cause first.

#### Rotate the keys

A key is changed in `/opt/zammad-org/.env`; `sudo docker compose up -d` then restarts the containers that use it.

Search-only key:

1. Set the new value for `TYPESENSE_SEARCH_KEY` in `.env`, then run `sudo docker compose up -d`. It restarts nginx,
   the MCP server and `search-init` with the new value, and `search-init` creates the new key in Typesense. Until it
   has, a few seconds, the search may fail. The old key still exists.
2. Delete the old key. Find it by the first four characters of its value:

   ```sh
   curl -s "$TS/keys" -H "X-TYPESENSE-API-KEY: $KEY" | jq '.keys[] | {id, value_prefix}'
   curl -s -X DELETE "$TS/keys/<id>" -H "X-TYPESENSE-API-KEY: $KEY"
   ```

Admin key: set the new value for `TYPESENSE_ADMIN_KEY` in `.env`, then run `sudo docker compose up -d`. It restarts
Typesense and `search-init` with the new key; the index and the search-only key are kept, the old admin key stops
working at once. The search is unavailable for the few seconds Typesense takes to restart. Read `KEY` again for the
runbook commands.

#### Upgrade Typesense

The version is pinned in three places: `docker/docker-compose.yml`, the `check search index` job in `.gitlab-ci.yml`
and the `build` job in `.github/workflows/ci.yml`. Renovate updates all three in one merge request, whose pipeline
runs the checks against the new version. The deploy pulls the new image and restarts Typesense with its data. If a new
version cannot read the data, restore the index as described above (with an empty volume).

## MCP server

The MCP server of the documentation (`mcp/`, see `mcp/README.md`) runs as the `mcp` service of the stack: the image of
the pipeline, which carries the agent data and Markdown pages of the same build as the deployed site and index. It is
public at `https://next.zammad.org/mcp` and only reads.

- **Network:** the service is only on the internal `search` network, together with Typesense and nginx. It has no
  route out of it: no internet, no other host, no Zammad. Typesense and nginx are also on the default network, for the
  published ports.
- **Index access:** it searches with `TYPESENSE_SEARCH_KEY`, the search-only key of nginx (see [Keys](#keys)); there is
  nothing to set up for it.
- **nginx** (`location = /mcp`): `POST` only (other methods `405`), at most 64 KB per request, 10 requests per second
  per client with bursts of 40 (the internal chat sends the requests of all its users from one address), `429` beyond
  that. The client address is not passed on. nginx resolves the service per request: while it is down, the site and its
  search keep working, and `/mcp` answers `504` or `502`.
- **Container:** read-only file system, no capabilities, an unprivileged user. It writes nothing; its call log goes to
  stdout, like the logs of the other services.

The deploy job waits for the service to get healthy, like for nginx and Typesense. Whether it finds something depends on
the index, which `search-init` may still be loading; see [Check the search after a deploy](#check-the-search-after-a-deploy).

### Call log

Every tool call is logged on stdout as one JSON line, without anything the client typed (see `mcp/README.md`): tool,
language, filters, number of results, fallback, duration and error. Calls without results show where the documentation
has gaps, by tool, language and section:

```sh
cd /opt/zammad-org
sudo docker compose logs --no-log-prefix mcp | grep '"event":"tool_call"'
sudo docker compose logs --no-log-prefix mcp | grep '"event":"tool_call"' | grep '"results":0'
```

### When the MCP server is down

```sh
cd /opt/zammad-org
sudo docker compose ps mcp
sudo docker compose logs --tail 50 mcp
sudo docker compose up -d --wait mcp
```

The server refuses to start without its content, which would show in the log; the image of the last deploy always has
it. If searches fail while the server is up (the tools answer that the search is unavailable), check the index as
described in [Check the search after a deploy](#check-the-search-after-a-deploy) and [Restore a lost
index](#restore-a-lost-index).
