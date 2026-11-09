# Images of the website, built from the repository root after `pnpm build`:
#
#   docker build -f docker/Dockerfile -t zammad-org .
#   docker build -f docker/Dockerfile --target search-init -t zammad-org:local-search-init .
#
# The default target is the website: nginx with the built site and its config.
# `search-init` loads the search index of the same build into Typesense when
# the stack starts, see the `search-init` service in docker-compose.yml.

# Search index of this build and the indexer that loads it (Node runs the
# TypeScript sources directly). Runs once per start of the stack and exits.
FROM node:24-alpine AS search-init

WORKDIR /search
COPY search-index/ search-index/
COPY .vitepress/search/ .vitepress/search/
COPY .vitepress/theme/search/typesense.mts .vitepress/theme/search/

USER node
CMD ["node", ".vitepress/search/indexer.mts"]

# The website. The unprivileged variant runs as a non-root user and listens on
# 8080.
FROM nginxinc/nginx-unprivileged:1.31-alpine

COPY docker/nginx/ /etc/nginx/
COPY dist/ /app/

# The entrypoint renders nginx/templates/*.template at start. The container
# runs with a read-only filesystem, so the result goes to the tmpfs, from where
# conf.d/default.conf includes it.
ENV NGINX_ENVSUBST_OUTPUT_DIR=/tmp

# Search-only key of Typesense, set by docker-compose.yml. Without it the site
# is served all the same, only the searches are refused; the empty default
# keeps the template from leaving an unknown nginx variable behind.
ENV TYPESENSE_SEARCH_KEY=""
