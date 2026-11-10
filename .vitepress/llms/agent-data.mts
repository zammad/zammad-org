/*
 * What the MCP server (mcp/) needs besides the search index: the navigation,
 * the pages with their Markdown versions and the glossary of one locale.
 *
 * Runs at the end of `vitepress build` (see `buildEnd` in ../config.mts) and
 * writes `agent-data/<locale>/`, outside `dist/` like `search-index/`: the
 * files are never served, they go into the image of the MCP server. Links are
 * relative to the site (`/de/...`); the server makes them absolute.
 * See https://github.com/zammad/zammad-org/issues/239.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { HTMLElement, NodeType, parse, type Node } from 'node-html-parser'
import { pageUrlOf } from '../search/extract.mts'
import {
  aliasName,
  audienceOf,
  sectionOf,
  type SearchAudience,
  type SearchDocument,
  type SearchSection,
} from '../search/schema.mts'
import { groupFolder, markdownPagePath, type SidebarItem } from './sidebar.mts'

/** Entry of the navigation tree (`nav.json`), in sidebar order. */
export interface NavEntry {
  text: string
  /** Link of the page; on a group only if its index page has content. */
  url?: string
  /** Markdown version of the page, relative to the app (`foo/bar.md`). */
  markdown?: string
  section?: SearchSection
  items?: NavEntry[]
}

/** Page with a Markdown version (`pages.json`). */
export interface PageEntry {
  /** Link of the page, as in the search index (`/de/foo/bar.html`, `/de/foo/`). */
  url: string
  /** Built page relative to the app (`foo/bar.html`). */
  path: string
  /** Markdown version relative to the app (`foo/bar.md`). */
  markdown: string
  title: string
  /** Sidebar groups above the page, outermost first; empty outside the sidebar. */
  breadcrumb: string[]
  section: SearchSection
  audience: SearchAudience
  /** Last change of the page as an ISO date, if VitePress knows it. */
  lastUpdated: string | null
  /** Sections of the page (h2, h3) with their anchors, in page order, as the search index has them. */
  sections: PageSection[]
}

export interface PageSection {
  heading: string
  anchor: string
  level: number
}

/** Term of the glossary (`glossary.json`). */
export interface GlossaryEntry {
  term: string
  /** Definition as Markdown; links are relative to the site. */
  definition: string
  /** Link of the glossary section of the term (one per letter); the terms have no anchors of their own. */
  url: string
}

/** How the site searches this locale (`search.json`), so that agents get the same ranking. */
export interface SearchSettings {
  collection: string
  /** Stop words set, only for locales that have stop words. */
  stopwords: string | null
}

export interface AgentDataOptions {
  locale: string
  /** Built app of the locale, `dist/<locale>/`. */
  outDir: string
  /** Target directory, `agent-data/<locale>/`. */
  dataDir: string
  /** Main sidebar of the app, see `mainSidebar`. */
  sidebar: { base: string; items: SidebarItem[] }
  /** Title and last change (ms since epoch) of the built pages (`foo/bar.html`). */
  pageData: ReadonlyMap<string, { title: string; lastUpdated?: number }>
  /** Search documents of the locale, for the sections of the pages. */
  documents: readonly SearchDocument[]
  /** Whether the folder of a group has an index page with content. */
  groupHasPage: (folder: string) => boolean
  hasStopwords: boolean
}

/** Built glossary page; its definition list becomes `glossary.json`. */
const glossaryPage = 'reference/glossary.html'

export function writeAgentData(options: AgentDataOptions): { pages: number; terms: number } {
  const { locale, outDir, dataDir } = options
  const breadcrumbs = new Map<string, string[]>()
  const nav = navEntries(options.sidebar.items, options.sidebar.base, [], breadcrumbs, options)
  const pages = pageEntries(options, breadcrumbs)
  const glossary = glossaryEntries(locale, outDir)
  const search: SearchSettings = {
    collection: aliasName(locale),
    stopwords: options.hasStopwords ? aliasName(locale) : null,
  }

  mkdirSync(dataDir, { recursive: true })
  write(join(dataDir, 'nav.json'), nav)
  write(join(dataDir, 'pages.json'), pages)
  write(join(dataDir, 'glossary.json'), glossary)
  write(join(dataDir, 'search.json'), search)

  return { pages: pages.length, terms: glossary.length }
}

function write(file: string, data: unknown) {
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
}

function navEntries(
  items: SidebarItem[],
  base: string,
  parents: string[],
  breadcrumbs: Map<string, string[]>,
  options: AgentDataOptions
): NavEntry[] {
  return items.map((item) => {
    const text = item.text ?? ''
    const itemBase = item.base ?? base

    if (item.items?.length) {
      const folder = groupFolder(item, itemBase)
      const entry: NavEntry = { text }

      if (folder !== undefined) {
        entry.section = sectionOf(`${folder}/index.html`)

        if (options.groupHasPage(folder)) {
          Object.assign(entry, pageLink(options.locale, `${folder}/index.html`))
          breadcrumbs.set(`${folder}/index.html`, parents)
        }
      }

      entry.items = navEntries(item.items, itemBase, [...parents, text], breadcrumbs, options)

      return entry
    }

    const link = item.link ?? ''
    const path = builtPathOf(link.startsWith('/') ? link.slice(1) : `${itemBase.replace(/^\/+/, '')}${link}`)

    breadcrumbs.set(path, parents)

    return { text, ...pageLink(options.locale, path), section: sectionOf(path) }
  })
}

/** Built page of a sidebar link: `foo/bar` → `foo/bar.html`, `foo/` → `foo/index.html`. */
function builtPathOf(link: string): string {
  const path = link.replace(/[?#].*$/, '').replace(/\.(html|md)$/, '')

  return path === '' || path.endsWith('/') ? `${path}index.html` : `${path}.html`
}

function pageLink(locale: string, path: string) {
  return { url: pageUrlOf(locale, path), markdown: markdownPagePath(path.replace(/\.html$/, '')) }
}

/** Every built page that has a Markdown version, in path order. */
function pageEntries(options: AgentDataOptions, breadcrumbs: Map<string, string[]>): PageEntry[] {
  const { locale, outDir } = options
  const sections = new Map<string, PageSection[]>()

  for (const d of [...options.documents].sort((a, b) => a.order - b.order)) {
    if (d.level < 2 || !d.anchor) continue
    if (!sections.has(d.page_url)) sections.set(d.page_url, [])
    sections.get(d.page_url)!.push({ heading: d.heading, anchor: d.anchor, level: d.level })
  }

  return readdirSync(outDir, { recursive: true, encoding: 'utf8' })
    .map((file) => file.split('\\').join('/'))
    .filter((file) => file.endsWith('.html'))
    .filter((path) => existsSync(join(outDir, markdownPagePath(path.replace(/\.html$/, '')))))
    .sort()
    .map((path) => {
      const data = options.pageData.get(path)
      const section = sectionOf(path)

      if (!data?.title) throw new Error(`Agent data: no title for "${path}" of "${locale}"`)

      const url = pageUrlOf(locale, path)

      return {
        url,
        path,
        markdown: markdownPagePath(path.replace(/\.html$/, '')),
        title: data.title,
        breadcrumb: breadcrumbs.get(path) ?? [],
        section,
        audience: audienceOf(section),
        lastUpdated: data.lastUpdated ? new Date(data.lastUpdated).toISOString() : null,
        sections: sections.get(url) ?? [],
      }
    })
}

/**
 * The terms of the rendered glossary page: one definition list per letter,
 * each below an `h2` with an anchor, `dt` followed by `dd`.
 */
function glossaryEntries(locale: string, outDir: string): GlossaryEntry[] {
  const file = join(outDir, glossaryPage)

  if (!existsSync(file)) throw new Error(`Agent data: the glossary page ${glossaryPage} of "${locale}" was not built`)

  const main = parse(readFileSync(file, 'utf8')).querySelector('main')

  if (!main) throw new Error(`Agent data: the glossary page of "${locale}" has no main content`)

  const pageUrl = pageUrlOf(locale, glossaryPage)
  const entries: GlossaryEntry[] = []
  let url = pageUrl
  let term: string | undefined

  for (const element of main.querySelectorAll('h2, dl > dt, dl > dd')) {
    if (element.tagName === 'H2') {
      const anchor = element.id || element.querySelector('a.header-anchor')?.getAttribute('href')?.replace(/^#/, '')
      url = anchor ? `${pageUrl}#${anchor}` : pageUrl
    } else if (element.tagName === 'DT') {
      term = inlineMarkdown(element).trim()
    } else if (term) {
      entries.push({ term, definition: blockMarkdown(element), url })
      term = undefined
    }
  }

  if (!entries.length) throw new Error(`Agent data: the glossary of "${locale}" has no terms`)

  return entries
}

/** Markdown of a block element: paragraphs and list items separated by blank lines. */
function blockMarkdown(element: HTMLElement): string {
  const blocks: string[] = []
  let inline = ''

  const flush = () => {
    if (inline.trim()) blocks.push(collapse(inline))
    inline = ''
  }

  for (const child of element.childNodes) {
    if (child instanceof HTMLElement && ['P', 'DIV'].includes(child.tagName)) {
      flush()
      const text = blockMarkdown(child)
      if (text) blocks.push(text)
    } else if (child instanceof HTMLElement && ['UL', 'OL'].includes(child.tagName)) {
      flush()
      const ordered = child.tagName === 'OL'
      const items = child.childNodes.filter((n): n is HTMLElement => n instanceof HTMLElement && n.tagName === 'LI')
      blocks.push(items.map((li, i) => `${ordered ? `${i + 1}.` : '-'} ${collapse(blockMarkdown(li))}`).join('\n'))
    } else {
      inline += inlineMarkdown(child)
    }
  }

  flush()

  return blocks.join('\n\n')
}

/** Markdown of inline content: links, code and emphasis; everything else as text. */
function inlineMarkdown(node: Node): string {
  if (node.nodeType === NodeType.TEXT_NODE) return node.text
  if (!(node instanceof HTMLElement)) return ''

  const inner = () => node.childNodes.map(inlineMarkdown).join('')

  switch (node.tagName) {
    case 'A': {
      const href = node.getAttribute('href')
      return href ? `[${inner()}](${href})` : inner()
    }
    case 'CODE':
      return `\`${node.text}\``
    case 'STRONG':
    case 'B':
      return `**${inner()}**`
    case 'EM':
    case 'I':
      return `*${inner()}*`
    case 'BR':
      return '\n'
    default:
      return inner()
  }
}

function collapse(text: string): string {
  return text.replace(/[ \t\r\n]+/g, ' ').trim()
}
