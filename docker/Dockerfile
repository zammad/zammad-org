# Production image of the website: nginx with the built site and its config.
#
# Build from the repository root after `pnpm build`:
#
#   docker build -f docker/Dockerfile -t zammad-org .
#
# The unprivileged variant runs as a non-root user and listens on 8080.
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
