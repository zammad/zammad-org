# MCP server of the documentation

A read-only [MCP](https://modelcontextprotocol.io/) server over the Zammad documentation, for the internal chat and for
external assistants and coding agents. See [#239](https://github.com/zammad/zammad-org/issues/239).

- Ruby with the official [MCP Ruby SDK](https://github.com/modelcontextprotocol/ruby-sdk) (`mcp` gem), a plain Rack app
  on Puma, no Rails.
- Stateless Streamable HTTP (MCP 2026-07-28) at `/mcp`, with JSON responses and no sessions; clients of earlier protocol
  versions are served as well.
- Searches go to the Typesense index of the site (`multi_search` only, with the search-only key). Pages, navigation and
  glossary come from the build output: `agent-data/<language>/` and the Markdown pages in `dist/<language>/` (see
  `.vitepress/llms/` and the "Agents" section of the root README).

## Tools

All tools only read, and every result carries the canonical URL to cite. Every tool takes `locale` (`en`, `de`, `sr`,
`it`, `pt_BR`; default `en`). Where the language has no answer, the tools fall back to English and mark it
(`fallback: true`); pass `fallback: false` to prevent that.

| Tool | Purpose |
| --- | --- |
| `search_docs` | Search: `query`, optional `section`, `audience`, `limit`. One result per page section, best first. |
| `get_page` | A page as Markdown, by URL or path; a URL with an anchor returns only that section. |
| `list_sections` | The navigation of a language, optionally one `section` and down to a `depth`. |
| `get_glossary_term` | The definition of a term from the glossary, or the closest terms. |

`search_docs` with `{"query": "passwort reset", "locale": "de", "limit": 1}` returns, as `structuredContent` (a text
rendering of it is in `content`):

```json
{
  "query": "passwort reset", "locale": "de", "found": 9, "fallback_locale": null,
  "results": [{
    "url": "https://next.zammad.org/de/documentation/use/personal-settings.html#passwort",
    "page_url": "https://next.zammad.org/de/documentation/use/personal-settings.html",
    "title": "Persönliche Einstellungen", "heading": "Passwort",
    "breadcrumb": ["Zammad verwenden", "Persönliche Einstellungen"],
    "locale": "de", "section": "documentation/use", "audience": "user",
    "snippet": "Ändern Sie das Passwort für Ihr Konto. …", "fallback": false
  }]
}
```

It searches like the site's search dialog: the same fields, weights, stop words and synonyms, one group per page. A
language other than English falls back to English only when it has no results at all.

`get_page` with `{"page": "https://next.zammad.org/de/documentation/use/personal-settings.html#passwort"}` returns
`url`, `markdown_url`, `title`, `breadcrumb`, `locale`, `section`, `audience`, `last_updated`, `fallback`, the `anchor`
of the returned section, `truncated`, the `sections` of the page (headings with anchors) and the `markdown`:
`"## Passwort\n\nÄndern Sie das Passwort für Ihr Konto. …"`. The page also takes paths (`documentation/use/guides/search`,
with or without language, `.html` or `.md`), and another `locale` than the one of the URL. Pages longer than 60,000
characters are cut at a heading; read the rest section by section.

`list_sections` with `{"locale": "de", "section": "documentation/use", "depth": 2}` returns the entries with `text`,
`url`, `section` and `items`, and how many entries were left out below the depth (`more`).

`get_glossary_term` with `{"term": "autosave", "locale": "de"}` returns
`{"found": true, "entries": [{"term": "Automatisches Speichern (Autosave)", "definition": "…", "url": "https://next.zammad.org/de/reference/glossary.html#section-a"}], …}`;
without a match, `suggestions` lists the closest terms.

## Connect a client

The server is public at `https://next.zammad.org/mcp`, without authentication.

Claude Code:

```sh
claude mcp add --transport http zammad-docs https://next.zammad.org/mcp
```

VS Code (`.vscode/mcp.json`):

```json
{
  "servers": {
    "zammad-docs": { "type": "http", "url": "https://next.zammad.org/mcp" }
  }
}
```

Claude Desktop and claude.ai: add a custom connector with the URL `https://next.zammad.org/mcp`.

Any other client, the internal chat included: Streamable HTTP, protocol version 2026-07-28 or earlier. Without a
handshake, a request of the 2026-07-28 lifecycle carries the protocol version in a header and in `_meta`:

```sh
curl -s https://next.zammad.org/mcp \
  -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
  -H 'MCP-Protocol-Version: 2026-07-28' -H 'Mcp-Method: tools/call' -H 'Mcp-Name: search_docs' \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {
        "name": "search_docs", "arguments": {"query": "sla eskalation", "locale": "de"},
        "_meta": {"io.modelcontextprotocol/protocolVersion": "2026-07-28",
                  "io.modelcontextprotocol/clientCapabilities": {}}}}'
```

Browser-based clients on other origins are refused (`Origin` check against DNS rebinding).

## Transport

Stateless Streamable HTTP (MCP 2026-07-28) is the only transport, for the internal chat and for desktop agents alike, and
locally as well (`pnpm mcp:dev`):

- The 2026-07-28 protocol is stateless: no sessions, every request stands on its own. Any instance answers any request,
  so nginx proxies `/mcp` like any other backend, without sticky sessions, and the server keeps nothing between
  requests.
- Answers are single JSON responses; the tools have nothing to stream, so there is no SSE stream to keep open.
- Desktop clients connect to the URL directly. A local stdio process would need Ruby, the build output and a Typesense
  key on every machine, for content that is public anyway.

## Local development

Ruby comes with the dev container (see `.ruby-version`). From the repository root:

```sh
pnpm search:dev     # local Typesense, build and index English (LOCALE=de for German)
pnpm mcp:install    # gems
pnpm mcp:dev        # the server on http://localhost:9292/mcp
pnpm mcp:test       # RSpec and RuboCop
```

`pnpm mcp:dev` reads the build output of the repository and searches the local Typesense with its dev key. The server
refuses to start without build output; run `pnpm build:<language>` for every language it should answer in.

The specs in `spec/integration/` run against the build output of the repository and a Typesense with its index, as CI
does after `pnpm build` (`test mcp` in GitLab, `build` in GitHub). They expect every language to be built and indexed.
Besides checking that every page can be read, they run the checks of the site search
(`.vitepress/search/relevance/<language>.json`) through `search_docs`, so that agents and the site share one ranking,
and the questions of `spec/integration/golden.yml`: English and German queries, typos and mixed terms included, that
have to be answered from the right page in the right language, or from English, marked as a fallback.

```sh
cd mcp && MCP_INTEGRATION=1 TYPESENSE_SEARCH_KEY=local-dev-search-key bundle exec rspec --tag integration
```

## Settings

| Variable | Default | |
| --- | --- | --- |
| `SITE_URL` | `https://next.zammad.org` | Public origin of the site, for absolute links. |
| `TYPESENSE_URL` | `http://localhost:8108` | Typesense. |
| `TYPESENSE_SEARCH_KEY` | | Search-only key, the same nginx uses (see `docker/README.md`). |
| `AGENT_DATA_DIR` | `../agent-data` | Agent data of the build. |
| `PAGES_DIR` | `../dist` | Built apps with the Markdown pages. |
| `MCP_ALLOWED_HOSTS` | host of `SITE_URL` | `Host` headers accepted besides loopback (comma-separated), against DNS rebinding. |
| `MCP_ALLOWED_ORIGINS` | `SITE_URL` | `Origin` headers accepted (comma-separated). |
| `PUMA_THREADS`, `PORT` | `5`, `9292` | Puma. |

## Call log

Every tool call is logged as one JSON line on stdout: time, tool, language, filters, number of results, whether it fell
back to English, duration and whether it failed. Nothing a client typed is logged, as it can contain personal data: no
query, page or term, no IP address and no headers. The filters are the enums and numbers of the input schemas
(`section`, `audience`, `limit`, `depth`). A failing log never fails a tool call.

```json
{"time":"2026-11-09T12:00:00.000Z","event":"tool_call","tool":"search_docs","locale":"de","filters":{"section":"reference"},"results":0,"fallback":false,"duration_ms":12,"error":false}
```

## Image

`mcp/Dockerfile`, built from the repository root after `pnpm build`. The image carries the agent data and the Markdown
pages of that build, so that it answers from the same content as the search index deployed with it. It runs as an
unprivileged user and with a read-only file system.

```sh
docker build -f mcp/Dockerfile -t zammad-org:local-mcp .
```
