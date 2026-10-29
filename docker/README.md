# Zammad Hub Docker Compose

Zammad Hub runs in production as a Docker container: nginx with the built site and its configuration baked into one
image. A reverse proxy on the web host terminates TLS and forwards every request to the container. Everything else
(redirects, language detection, caching, security headers, error pages) is configured in this directory.

| File | Purpose |
| --- | --- |
| `Dockerfile` | Production image, based on the unprivileged nginx image (runs as non-root, listens on `8080`). |
| `nginx/**` | nginx server configuration. |
| `docker-compose.yml` | Production stack. The deploy job copies it to the web host. |
| `docker-compose.override.yml` | Local testing only: builds the image from `dist/` instead of pulling it. |
| `reverse-proxy.example.conf` | Example vhost for the reverse proxy on the web host. |

## Test Locally

Prerequisites: a Docker engine with Docker Compose 2.17 or newer and a free `8081` port. Set `ZAMMAD_ORG_PORT` to use
another one.

From the root directory, first build the app:

```sh
pnpm build
```

Then build the image and start the stack:

```sh
cd docker
docker compose up -d --build --wait
```

The service is available via <http://localhost:8081/>. Rebuild the image (`--build`) after every `pnpm build`.

Stop the stack:

```sh
cd docker
docker compose down
```
