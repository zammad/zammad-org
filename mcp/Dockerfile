# Image of the MCP server, see README.md.
#
# Build from the repository root after `pnpm build`: the image carries the
# agent data and the Markdown pages of that build, so that it answers from
# the same content as the search index deployed with it.
#
#   docker build -f mcp/Dockerfile -t zammad-org:local-mcp .

# Gems, compiled with the build tools the final image does without.
FROM ruby:4.0.9-slim AS gems

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential \
  && rm -rf /var/lib/apt/lists/*

# Gems go to /usr/local/bundle, where the final stage takes them from.
ENV BUNDLE_DEPLOYMENT=1 \
  BUNDLE_PATH=/usr/local/bundle \
  BUNDLE_WITHOUT=development:test

WORKDIR /app
COPY mcp/Gemfile mcp/Gemfile.lock mcp/.ruby-version ./
RUN bundle install --jobs 4 \
  && rm -rf /usr/local/bundle/cache /usr/local/bundle/ruby/*/cache

# The Markdown pages of the build, without the HTML and assets around them.
FROM ruby:4.0.9-slim AS pages

COPY dist/ /dist/
RUN mkdir /pages && cd /dist && find . -name '*.md' -exec cp --parents {} /pages/ \;

FROM ruby:4.0.9-slim

RUN useradd --system --uid 10001 --no-create-home --shell /usr/sbin/nologin mcp

COPY --from=gems /usr/local/bundle /usr/local/bundle

WORKDIR /app
COPY mcp/ ./
COPY agent-data/ ./content/agent-data/
COPY --from=pages /pages/ ./content/pages/

ENV BUNDLE_DEPLOYMENT=1 \
  BUNDLE_PATH=/usr/local/bundle \
  BUNDLE_WITHOUT=development:test \
  RACK_ENV=production \
  AGENT_DATA_DIR=/app/content/agent-data \
  PAGES_DIR=/app/content/pages

USER mcp
EXPOSE 9292

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
