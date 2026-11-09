/*
 * Checks the search index of a locale the way the site queries it: the same
 * request (../theme/search/typesense.mts). Used by the indexer on the new
 * collections before the aliases are switched, and by ./check.mts on the
 * aliases, with the search-only key. Per locale:
 *
 * - Pages find themselves: the titles of a sample of pages (unique ones only)
 *   are searched, and each page has to be among the first results.
 * - Every result is complete: page path (breadcrumb), a link into this
 *   locale's app, and an anchor for every section below the page intro.
 * - The checks in ./relevance/<locale>.json: query → expected page among the
 *   first results.
 *
 * No dependencies beyond Node, so that the `search-init` image (see
 * docker/Dockerfile) needs nothing else.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { search, type AudienceFilter, type SearchResult } from '../theme/search/typesense.mts'
import { loadRelevance } from './relevance.mts'
import { aliasName, type SearchDocument } from './schema.mts'

export interface VerifyOptions {
  /** Alias or collection to query. */
  collection: string
  /** Typesense URL, e.g. `http://localhost:8108`. */
  url: string
  /** API key; the search-only key is enough. */
  key: string
  /** Directory with `<locale>.jsonl`, for the sample of pages. */
  indexDir: string
  /**
   * Stop word set to use when the locale has stop words. Default: the set of
   * the alias, as the site uses it; the indexer checks new collections with
   * their own set, see ./indexer.mts.
   */
  stopwords?: string
}

export interface VerifyResult {
  queries: number
  /** What did not hold, one line each; empty when everything passed. */
  failures: string[]
}

/** Pages per locale that have to find themselves by title. */
const samplePages = 10

function samplePagesOf(locale: string, indexDir: string): SearchDocument[] {
  const pages = readFileSync(resolve(indexDir, `${locale}.jsonl`), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line: string) => JSON.parse(line) as SearchDocument)
    .filter((d) => d.level === 1)

  const titleCount = new Map<string, number>()
  for (const p of pages) titleCount.set(p.title, (titleCount.get(p.title) ?? 0) + 1)

  const unique = pages.filter((p) => titleCount.get(p.title) === 1).sort((a, b) => a.url.localeCompare(b.url))
  const step = Math.max(1, Math.floor(unique.length / samplePages))

  return unique.filter((_, i) => i % step === 0).slice(0, samplePages)
}

/**
 * Position of the expected page among the result pages, -1 if missing. `exact`
 * for a page that has to find itself; `prefix` for the relevance checks, whose
 * expectation may be the start of a URL (`/en/get-started/installation/`).
 */
function rank(result: SearchResult, expect: string, match: 'exact' | 'prefix'): number {
  return result.groups.findIndex((g) => (match === 'exact' ? g.pageUrl === expect : g.pageUrl.startsWith(expect)))
}

export async function verifyLocale(locale: string, options: VerifyOptions): Promise<VerifyResult> {
  const relevance = loadRelevance(locale)
  const failures: string[] = []
  let queries = 0

  const fail = (message: string) => failures.push(`${locale}: ${message}`)

  const query = (q: string, audience: AudienceFilter = 'all') =>
    search(options.collection, q, audience, {
      endpoint: `${options.url.replace(/\/$/, '')}/multi_search`,
      headers: { 'X-TYPESENSE-API-KEY': options.key },
      // Like the site, see `typesenseSearch` in ../config.mts.
      stopwords: relevance.stopwords.length ? (options.stopwords ?? aliasName(locale)) : undefined,
    })

  const verifyShape = (q: string, result: SearchResult) => {
    for (const group of result.groups) {
      if (!group.path.length) fail(`"${q}": page ${group.pageUrl} without breadcrumb`)
      if (!group.pageUrl.startsWith(`/${locale}/`)) fail(`"${q}": page ${group.pageUrl} outside of /${locale}/`)

      for (const hit of group.hits) {
        if (!hit.url.startsWith(group.pageUrl)) fail(`"${q}": ${hit.url} is not on ${group.pageUrl}`)
        if (hit.path.length && !hit.url.includes('#')) fail(`"${q}": section ${hit.url} without anchor`)
      }
    }
  }

  const expectRank = async (
    q: string,
    expect: string,
    match: 'exact' | 'prefix',
    top: number,
    audience?: AudienceFilter
  ) => {
    const result = await query(q, audience)
    const position = rank(result, expect, match)

    verifyShape(q, result)
    queries++

    if (position === -1 || position >= top) {
      fail(`"${q}" does not find ${expect} among the first ${top} pages (${position === -1 ? 'not found' : `#${position + 1}`})`)
    }
  }

  for (const page of samplePagesOf(locale, options.indexDir)) {
    await expectRank(page.title, page.page_url, 'exact', 5)
  }

  for (const check of relevance.checks) {
    await expectRank(check.q, check.expect, 'prefix', check.top ?? 5, check.audience)
  }

  return { queries, failures }
}
