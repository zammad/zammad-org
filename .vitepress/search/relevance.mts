/*
 * Relevance settings of a locale, from `relevance/<locale>.json`:
 *
 * - `stopwords`: words that are left out of every query (how, the, my …).
 * - `synonyms`: lists of words that find each other (["kanal", "channel"]),
 *   or `{ "root": "…", "synonyms": […] }` where only the synonyms find the root.
 *   Applied when indexing (`keywordsOf`): a section that contains a word of a
 *   list gets the whole list as keywords. Typesense's own synonyms do not
 *   work together with stemming, which the languages need.
 * - `pinned`: results that come first for a query, by URL of the section.
 * - `checks`: query → page that has to be among the first results; run by
 *   ./check.mts in CI and on deploy.
 *
 * Applied by ./indexer.mts. See README.md ("Tuning the search") for how to use it.
 */
import { existsSync, readFileSync } from 'node:fs'
import type { AudienceFilter } from '../theme/search/typesense.mts'

export interface Pin {
  /** Query that triggers the pin. */
  query: string
  /** `exact` (default): the whole query; `contains`: the query contains it. */
  match?: 'exact' | 'contains'
  /** Sections to show first, in this order (canonical URLs, with anchor). */
  urls: string[]
}

export interface Check {
  q: string
  /** Start of the expected page URL, e.g. `/en/get-started/installation/`. */
  expect: string
  /** Within the first n pages of the results; default 5. */
  top?: number
  audience?: AudienceFilter
}

export interface Relevance {
  stopwords: string[]
  synonyms: (string[] | { root: string; synonyms: string[] })[]
  pinned: Pin[]
  checks: Check[]
}

const empty: Relevance = { stopwords: [], synonyms: [], pinned: [], checks: [] }

export function loadRelevance(locale: string): Relevance {
  const file = new URL(`./relevance/${locale}.json`, import.meta.url)

  if (!existsSync(file)) return empty

  const relevance = { ...empty, ...JSON.parse(readFileSync(file, 'utf8')) } as Relevance
  const where = `relevance/${locale}.json`

  for (const set of relevance.synonyms) {
    const words = Array.isArray(set) ? set : [set.root, ...set.synonyms]

    if (words.length < 2 || words.some((w) => typeof w !== 'string' || !w.trim())) {
      throw new Error(`${where}: invalid synonyms ${JSON.stringify(set)}`)
    }
  }

  for (const pin of relevance.pinned) {
    if (!pin.query?.trim() || !pin.urls?.length) throw new Error(`${where}: invalid pin ${JSON.stringify(pin)}`)
    if (pin.urls.some((url) => !url.startsWith(`/${locale}/`))) {
      throw new Error(`${where}: pinned URLs must start with /${locale}/: ${JSON.stringify(pin)}`)
    }
  }

  for (const check of relevance.checks) {
    if (!check.q?.trim() || !check.expect?.startsWith(`/${locale}/`)) {
      throw new Error(`${where}: invalid check ${JSON.stringify(check)}`)
    }
  }

  return relevance
}

/** Letters and digits of any script; everything else separates words. */
const wordChar = '\\p{L}\\p{N}'

/**
 * Whether the text contains the term as a word. Terms of four or more
 * characters also match the start of a word, so that `rolle` covers `rollen`
 * and `anbindung` covers `anbindungen`.
 */
function contains(text: string, term: string): boolean {
  const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const end = term.length >= 4 ? '' : `(?![${wordChar}])`

  return new RegExp(`(?<![${wordChar}])${escaped}${end}`, 'u').test(text)
}

/** Synonyms to add to a section with the given text, see `synonyms` above. */
export function keywordsOf(relevance: Relevance, text: string): string[] {
  const lower = text.toLowerCase()
  const keywords = new Set<string>()

  for (const set of relevance.synonyms) {
    if (Array.isArray(set)) {
      if (set.some((term) => contains(lower, term))) set.forEach((term) => keywords.add(term))
    } else if (contains(lower, set.root)) {
      set.synonyms.forEach((term) => keywords.add(term))
    }
  }

  return [...keywords]
}
