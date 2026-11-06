/*
 * Queries the search index (Typesense, see .vitepress/search/) through the
 * same-origin proxy `/search-api/multi_search`: nginx in production, the Vite
 * dev server locally. The proxy adds the search-only key; the page carries no
 * credential. Plain `fetch`, no client library, to keep the search chunk small.
 */

export type AudienceFilter = 'all' | 'user' | 'admin'

export interface SearchHit {
  url: string
  /** Section path within the page, ending with the heading; empty for the page intro. */
  path: string[]
  /** Highlighted heading, safe HTML. */
  heading: string
  /** Highlighted excerpt of the section text, safe HTML; may be empty. */
  snippet: string
}

export interface SearchGroup {
  pageUrl: string
  /** Section label and page title, e.g. `Use Zammad › Search`. */
  path: string[]
  hits: SearchHit[]
}

export interface SearchResult {
  groups: SearchGroup[]
  /** Matches per audience regardless of the filter, for the filter buttons. */
  counts: Record<AudienceFilter, number>
}

interface Document {
  url: string
  page_url: string
  title: string
  heading: string
  breadcrumb: string[]
  level: number
}

interface Highlight {
  field: string
  snippet?: string
}

interface TypesenseResult {
  error?: string
  found?: number
  grouped_hits?: { hits: { document: Document; highlights: Highlight[] }[] }[]
  facet_counts?: { field_name: string; counts: { value: string; count: number }[] }[]
}

const proxyEndpoint = '/search-api/multi_search'

// Highlight markers from the Unicode private use area: Typesense does not
// escape the text, so the snippets are escaped first and marked up afterwards.
const markStart = '\uE000'
const markEnd = '\uE001'

const baseQuery = {
  // `keywords` holds synonyms of the words in a section, see
  // .vitepress/search/relevance.mts.
  query_by: 'heading,breadcrumb,content,keywords',
  query_by_weights: '4,2,1,1',
  highlight_start_tag: markStart,
  highlight_end_tag: markEnd,
}

export interface SearchOptions {
  signal?: AbortSignal
  /**
   * Where to send the search. The site uses the proxy; the checks in CI
   * (.vitepress/search/check.mts) talk to Typesense directly, with the
   * search-only key as header.
   */
  endpoint?: string
  headers?: Record<string, string>
  /** Stop word set of the locale, if it has one; see .vitepress/search/relevance.mts. */
  stopwords?: string
}

export async function search(
  collection: string,
  q: string,
  audience: AudienceFilter,
  { signal, endpoint = proxyEndpoint, headers = {}, stopwords }: SearchOptions = {}
): Promise<SearchResult> {
  const common = { ...baseQuery, collection, q, ...(stopwords ? { stopwords } : {}) }

  const searches = [
    {
      ...common,
      filter_by: audience === 'all' ? '' : `audience:=${audience}`,
      group_by: 'page_url',
      group_limit: 3,
      per_page: 10,
      include_fields: 'url,page_url,title,heading,breadcrumb,level',
      highlight_fields: 'heading,content',
      highlight_affix_num_tokens: 12,
    },
    // Counts per audience without the filter, for the filter buttons.
    { ...common, facet_by: 'audience', per_page: 0 },
  ]

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ searches }),
    signal,
  })

  if (!response.ok) throw new Error(`Search failed with ${response.status}`)

  const [hits, facets] = ((await response.json()) as { results: TypesenseResult[] }).results

  if (hits.error || facets.error) throw new Error(hits.error || facets.error)

  const counts: Record<AudienceFilter, number> = { all: facets.found ?? 0, user: 0, admin: 0 }

  for (const { value, count } of facets.facet_counts?.find((f) => f.field_name === 'audience')?.counts ?? []) {
    if (value === 'user' || value === 'admin') counts[value] = count
  }

  return { groups: (hits.grouped_hits ?? []).map(toGroup), counts }
}

function toGroup(group: NonNullable<TypesenseResult['grouped_hits']>[number]): SearchGroup {
  const first = group.hits[0].document

  return {
    pageUrl: first.page_url,
    path: pagePath(first),
    hits: group.hits.map(({ document, highlights }) => {
      const highlighted = (field: string) => highlights.find((h) => h.field === field)?.snippet

      return {
        url: document.url,
        path: document.level === 1 ? [] : [...sectionParents(document), document.heading],
        heading: markup(highlighted('heading') ?? document.heading),
        snippet: markup(highlighted('content') ?? ''),
      }
    }),
  }
}

/**
 * The breadcrumb of a document holds the section label, the page title and
 * the parent headings (see SearchDocument in .vitepress/search/schema.mts).
 * Split it at the page title.
 */
function pagePath(document: Document): string[] {
  if (document.level === 1) return [...document.breadcrumb, document.title]

  const title = document.breadcrumb.indexOf(document.title)

  return title === -1 ? [document.title] : document.breadcrumb.slice(0, title + 1)
}

function sectionParents(document: Document): string[] {
  const title = document.breadcrumb.indexOf(document.title)

  return title === -1 ? [] : document.breadcrumb.slice(title + 1)
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}

/** Escapes the text and turns the highlight markers into `<mark>` elements. */
function markup(text: string): string {
  return escapeHtml(text).replaceAll(markStart, '<mark>').replaceAll(markEnd, '</mark>')
}
