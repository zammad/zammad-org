# Zammad Hub Docker Compose

In order to simulate Zammad Hub in production, you can use the provided Docker Compose stack to spin up an nginx
container, and host a local build. Please note that while a similar setup is used in production, the stack should only
be used for testing purposes in its current form (it's not hardened in any way).

## System Prerequisites

- Globally available Docker engine
- Free `80` port

## Prepare Build

From the root directory, first build the app:

```sh
pnpm build
```

## Run the Stack

```sh
cd .docker-compose
docker compose up -d
```

The service will be available via <http://localhost/> URL.

## Stop the Stack

```sh
cd .docker-compose
docker compose down
```
