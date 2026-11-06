/*
 * Shape of the search documents, shared by the extraction at build time
 * (./extract.mts) and the indexer that pushes them to Typesense.
 *
 * One document per section of a page: the page intro (everything before the
 * first h2) and every h2/h3. Deeper headings are folded into their parent
 * section, so that a result always lands on an anchor the reader can see in
 * the outline. See https://github.com/zammad/zammad-org/issues/242.
 */

/**
 * Part of the site a page belongs to, derived from its path. Root-level pages
 * (privacy policy, imprint) are `general`; the pages directly below
 * `documentation/` (overview, introduction) are `documentation`.
 */
export const searchSections = [
  'get-started',
  'documentation',
  'documentation/use',
  'documentation/manage',
  'reference',
  'tutorials',
  'contribute',
  'general',
] as const

export type SearchSection = (typeof searchSections)[number]

/** Who a page is written for; replaces the hidden `user` field of the local search. */
export type SearchAudience = 'user' | 'admin' | 'general'

export interface SearchDocument {
  /** Stable hash of `url`, unchanged between builds as long as the URL is. */
  id: string
  /** Canonical link: locale prefix, path and anchor (`/de/documentation/use/guides/search.html#basic-search`). */
  url: string
  /** Link of the page without anchor; groups the sections of one page in the results. */
  page_url: string
  /** Heading anchor, empty for the page intro. */
  anchor: string
  /** Page title (h1). */
  title: string
  /** Section heading; the page title for the page intro. */
  heading: string
  /** Localized section label, page title and parent headings — everything above `heading`. */
  breadcrumb: string[]
  /** Plain text of the section, including folded subsections. */
  content: string
  locale: string
  section: SearchSection
  audience: SearchAudience
  /** Heading level: 1 for the page intro, 2 or 3 for sections. */
  level: number
  /** Position of the section within its page. */
  order: number
}

/** Alias the search queries; points to the current collection of the locale. */
export function aliasName(locale: string): string {
  return `docs_${locale}`
}

/** Prefix of the versioned collections of a locale, `docs_<locale>_<version>`. */
export function collectionPrefix(locale: string): string {
  return `${aliasName(locale)}_`
}

/** Typesense locale of a site locale, for tokenization and stemming. */
const typesenseLocales: Record<string, string> = {
  en: 'en',
  de: 'de',
  it: 'it',
  pt_BR: 'pt',
  sr: 'sr',
}

/**
 * Typesense collection of a locale. Only the fields that are searched,
 * filtered, grouped or sorted by are declared; the others (`url`, `anchor`,
 * `title`) are stored and returned with the results.
 */
export function typesenseLocale(locale: string): string {
  const language = typesenseLocales[locale]

  if (!language) throw new Error(`Search: no Typesense locale for "${locale}"`)

  return language
}

export function collectionSchema(locale: string, name: string) {
  const text = { locale: typesenseLocale(locale), stem: true }

  return {
    name,
    fields: [
      { name: 'heading', type: 'string', ...text },
      { name: 'breadcrumb', type: 'string[]', ...text },
      { name: 'content', type: 'string', ...text },
      // Synonyms of the words in the section, added by the indexer from
      // relevance/<locale>.json; see ./relevance.mts.
      { name: 'keywords', type: 'string[]', optional: true, ...text },
      { name: 'page_url', type: 'string', facet: true },
      { name: 'locale', type: 'string', facet: true },
      { name: 'section', type: 'string', facet: true },
      { name: 'audience', type: 'string', facet: true },
      { name: 'level', type: 'int32', sort: true },
      { name: 'order', type: 'int32', sort: true },
    ],
  }
}

/** Section of a page path relative to the app's base path (`documentation/use/guides/search.html`). */
export function sectionOf(pagePath: string): SearchSection {
  const segments = pagePath.split('/')

  if (segments.length === 1) return 'general'

  if (segments[0] === 'documentation') {
    if (segments.length > 2 && (segments[1] === 'use' || segments[1] === 'manage'))
      return `documentation/${segments[1]}`

    return 'documentation'
  }

  const section = segments[0] as SearchSection

  if (!searchSections.includes(section)) {
    throw new Error(`Search: page "${pagePath}" is not in a known section (${searchSections.join(', ')})`)
  }

  return section
}

export function audienceOf(section: SearchSection): SearchAudience {
  if (section === 'documentation/use') return 'user'
  if (section === 'documentation/manage') return 'admin'
  return 'general'
}
