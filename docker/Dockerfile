# Production image of the website: nginx with the built site and its config.
#
# Build from the repository root after `pnpm build`:
#
#   docker build -f docker/Dockerfile -t zammad-org .
#
# The unprivileged variant runs as a non-root user and listens on 8080.
FROM nginxinc/nginx-unprivileged:1.30-alpine

COPY docker/nginx/ /etc/nginx/
COPY dist/ /app/
