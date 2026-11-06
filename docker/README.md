# Zammad Hub Docker Compose

Zammad Hub runs in production as a Docker container: nginx with the built site and its configuration baked into one
image. A reverse proxy on the web host terminates TLS and forwards every request to the container. Everything else
(redirects, language detection, caching, security headers, error pages, the search proxy) is configured in this
directory. The search index lives in a second container, Typesense, see [Search](#search).

| File | Purpose |
| --- | --- |
| `Dockerfile` | Production image, based on the unprivileged nginx image (runs as non-root, listens on `8080`). |
| `nginx/**` | nginx server configuration. `nginx/templates/` is rendered with environment variables at start. |
| `docker-compose.yml` | Production stack: nginx and Typesense. The deploy job copies it to the web host. |
| `docker-compose.override.yml` | Local testing only: builds the image from `dist/` instead of pulling it. |
| `.env` | Local testing only: dev keys for Typesense. The web host has its own, see [Keys](#keys). |
| `reverse-proxy.example.conf` | Example vhost for the reverse proxy on the web host. |

## Test Locally

Prerequisites: a Docker engine with Docker Compose 2.17 or newer and free `8081` and `8108` ports. Set
`ZAMMAD_ORG_PORT` and `TYPESENSE_PORT` to use other ones.

From the root directory, first build the app:

```sh
pnpm build
```

Then build the image and start the stack:

```sh
cd docker
docker compose up -d --build --wait
```

Fill the search index (from the root directory, with the dev keys from `docker/.env`):

```sh
TYPESENSE_URL=http://localhost:${TYPESENSE_PORT:-8108} \
  TYPESENSE_ADMIN_KEY=local-dev-admin-key TYPESENSE_SEARCH_KEY=local-dev-search-key pnpm search:index
```

The service is available via <http://localhost:8081/>. Rebuild the image (`--build`) and re-run the indexing after
every `pnpm build`.

Stop the stack:

```sh
cd docker
docker compose down
```

The search index survives in the `typesense-data` volume; `docker compose down --volumes` removes it.

## Search

The search of all languages is served by [Typesense](https://typesense.org/), self-hosted as the `typesense` service
of the stack. `pnpm build` writes the search documents to `search-index/`, `pnpm search:index` loads them into one
collection per language behind the alias `docs_<locale>`. See `.vitepress/search/` for the details.

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

Typesense publishes its port on `127.0.0.1` of the web host only. The deploy job reaches it through an SSH tunnel to
index the new content.

Typesense keeps its data in the `typesense-data` volume. On start, it restores its last snapshot and replays the changes
made since; without a snapshot, that replay can lose the latest changes. So Typesense writes a snapshot every minute
(`TYPESENSE_SNAPSHOT_INTERVAL_SECONDS` in `docker-compose.yml`, default an hour), and the indexer requests one after
every run: a restart of Typesense or of the host keeps the index.

### Keys

| Variable | Used by | Can |
| --- | --- | --- |
| `TYPESENSE_ADMIN_KEY` | Typesense (bootstrap key), the indexer in CI | Everything. |
| `TYPESENSE_SEARCH_KEY` | nginx, the indexer in CI (creates the key in Typesense) | Search the `docs_*` collections, nothing else. |

`docker compose` refuses to start the stack without both. On the web host, they are in `/opt/zammad-org/.env` next to
`docker-compose.yml`, which the host's administrators prepare before the first deploy (see [Prepare the web
host](#prepare-the-web-host)). The file belongs to root and is readable by root only; the deploy job neither writes
nor reads it, its user has no rights to it, and `sudo docker compose` reads it. The indexer in the deploy job needs the
same two values as GitLab CI variables, masked and protected (so `develop` has to be a protected branch). Generate them
as plain hex (`openssl rand -hex 32`): Compose interpolates `$` in `.env` values.

On every deploy, the job starts Typesense, indexes the new content through an SSH tunnel and checks it — and only then
rolls out the new site. A failure up to there stops the deploy with the previous site and index in place. Finally, the
job runs one search through nginx: it fails when the search-only key in `.env` differs from the CI variable, because
the indexer makes sure of the key from the CI variable, while nginx uses the one from `.env`. Consequences of the
self-hosting:

- The admin key is never in the repository, an image or the browser. Apart from the CI variables, it exists only on the
  web host: in the root-only `.env` file and in the runtime environment of the Typesense container.
- The search-only key exists in the CI variables, in the root-only `.env` file and in the runtime environment of the
  nginx container. It is not secret in the sense that it could do harm — it only searches public content — but keeping
  it server-side lets the rate limit and the endpoint restriction above apply to every client.
- The index is derived data: losing the volume loses nothing that the next indexing run cannot restore.

The values in `docker/.env` of this repository are for local testing only and protect nothing but a local container.

### Runbook

Production commands run on the web host (`cd /opt/zammad-org`, `sudo docker compose …`). Calls to the Typesense API
need the admin key (`TYPESENSE_ADMIN_KEY`, in the CI variables and in `/opt/zammad-org/.env`) and an SSH tunnel from
your machine, because Typesense only listens on `127.0.0.1` of the host:

```sh
ssh -N -L 18108:127.0.0.1:8108 <user>@<web host>   # keep it open in another terminal
export TS=http://127.0.0.1:18108 KEY=<admin key>
```

Locally, use `TS=http://localhost:${TYPESENSE_PORT:-8108} KEY=local-dev-admin-key` instead, without a tunnel.

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
readable by root only: `sudo chown root:root /opt/zammad-org/.env && sudo chmod 600 /opt/zammad-org/.env`. Leave
`TYPESENSE_PORT` unset: the deploy job's SSH tunnel expects Typesense on port `8108` of the host, which has to be free.

Then store the same two values as the GitLab CI variables `TYPESENSE_ADMIN_KEY` and `TYPESENSE_SEARCH_KEY`, masked and
protected. The first deploy creates the volume, loads all languages and creates the search-only key in Typesense.

#### Reindex after content changes

Nothing to do: every deploy of `develop` indexes the new content before the new site goes live. To reindex without a
content change, re-run the `deploy to website` job of the latest `develop` pipeline.

To index by hand (e.g. a single language), build it and run the indexer through the tunnel:

```sh
pnpm build:de
TYPESENSE_URL=$TS TYPESENSE_ADMIN_KEY=$KEY TYPESENSE_SEARCH_KEY=<search key> pnpm search:index de
TYPESENSE_URL=$TS TYPESENSE_SEARCH_KEY=<search key> pnpm search:check de
```

Instead of building, the `search-index/` directory can be taken from the artifacts of a pipeline.

#### Restore a lost index

A plain restart (`sudo docker compose restart typesense`, a reboot of the host) keeps the index, see [Search](#search).
If the search reports that it is unavailable after a restart anyway, check the alias: when it points to a collection
that no longer exists, the index is lost.

```sh
curl -s "$TS/aliases" -H "X-TYPESENSE-API-KEY: $KEY" | jq -r '.aliases[] | "\(.name) → \(.collection_name)"'
curl -s "$TS/collections" -H "X-TYPESENSE-API-KEY: $KEY" | jq -r '.[] | "\(.name) \(.num_documents)"'
```

When the index is lost (volume deleted, container broken, collections gone), the site keeps working; only the search
reports that it is unavailable. The index holds nothing that cannot be rebuilt from the repository:

1. Recreate Typesense, with an empty volume if the old one is broken:

   ```sh
   sudo docker compose stop typesense && sudo docker compose rm -f typesense
   sudo docker volume rm zammad-org_typesense-data   # only if the data is broken
   sudo docker compose up -d --wait typesense
   ```

2. Re-run the `deploy to website` job of the latest `develop` pipeline. It loads all languages, creates the search-only
   key again and runs the checks.

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
collection; the stop words do not (they are not versioned). The next indexing run replaces the rolled-back collection,
so fix the cause before the next deploy.

#### Rotate the keys

A new value goes into `/opt/zammad-org/.env` on the web host and into the CI variable of the same name; change both
before the next deploy. The running containers keep the old values until the deploy restarts them.

Search-only key, without downtime:

1. Set the new value for `TYPESENSE_SEARCH_KEY` in `.env` and in the CI variable, then re-run the `deploy to website`
   job. The indexer creates the new key in Typesense, the job restarts nginx with it from `.env` and checks that the
   site can search. The old key still exists.
2. Delete the old key. Find it by the first four characters of its value:

   ```sh
   curl -s "$TS/keys" -H "X-TYPESENSE-API-KEY: $KEY" | jq '.keys[] | {id, value_prefix}'
   curl -s -X DELETE "$TS/keys/<id>" -H "X-TYPESENSE-API-KEY: $KEY"
   ```

Admin key: set the new value for `TYPESENSE_ADMIN_KEY` in `.env` and in the CI variable, then re-run the `deploy to
website` job. It restarts Typesense with the new key from `.env` before the indexer uses the one from the CI variable;
the index and the search-only key are kept, the old admin key stops working at once. The site search is not
interrupted. If the two values differ, the indexer is refused and the deploy stops before anything changes.

#### Upgrade Typesense

The version is pinned in three places: `docker/docker-compose.yml`, the `check search index` job in `.gitlab-ci.yml`
and the `build` job in `.github/workflows/ci.yml`. Renovate updates all three in one merge request, whose pipeline
runs the checks against the new version. The deploy pulls the new image and restarts Typesense with its data. If a new
version cannot read the data, restore the index as described above (with an empty volume).
