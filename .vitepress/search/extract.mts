/*
 * Extracts the search documents of one locale from its built HTML, completed
 * by the tabs that are only rendered in the browser (see `withAllTabs`).
 *
 * Runs at the end of `vitepress build` (see `buildEnd` in ../config.mts) and
 * writes `search-index/<locale>.jsonl`, one document per line. The file lives
 * outside `dist/`: it is never served, only pushed to Typesense by the indexer.
 */
import { createHash } from 'node:crypto'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { HTMLElement, Node, NodeType, parse, TextNode } from 'node-html-parser'
import { audienceOf, sectionOf, type SearchDocument } from './schema.mts'

export interface ExtractOptions {
  locale: string
  /** Built app of the locale, `dist/<locale>/`. */
  outDir: string
  /** Target file, `search-index/<locale>.jsonl`. */
  indexFile: string
  /** Page paths relative to `outDir` (`foo/bar.html`) to leave out, e.g. from `search: false` front matter. */
  excludedPages?: Iterable<string>
  /**
   * Titles of the built pages (`foo/index.html` → `Foo`), as VitePress knows
   * them from the front matter or the h1. The index pages of the sections carry
   * only front matter, so this is where their localized labels come from.
   */
  pageTitles?: ReadonlyMap<string, string>
  /**
   * Rendered Markdown of the built pages (`foo/bar.html` → HTML), captured
   * during the build. The tab groups of the built pages contain only their
   * selected tab, the other tabs are rendered in the browser; they are taken
   * from here. See `withAllTabs`.
   */
  renderedMarkdown?: ReadonlyMap<string, string>
}

export interface ExtractResult {
  pages: number
  documents: SearchDocument[]
}

/** Pages that are built but never searchable. */
const alwaysExcluded = [/^404\.html$/, /^TEMPLATE\.html$/, /^modules\//]

/** Headings that start a new document; deeper ones are folded into their parent. */
const maxSectionLevel = 3

/** Elements whose text runs on with the surrounding text; all others are separated by a space. */
const inlineTags = new Set([
  'A', 'ABBR', 'B', 'CODE', 'EM', 'I', 'KBD', 'MARK', 'S', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'U',
])

/** Elements that carry no searchable text: anchors, copy buttons, language labels, block titles. */
const skippedSelectors = ['header-anchor', 'copy', 'lang', 'custom-block-title']
const skippedTags = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'BUTTON', 'IMG', 'SVG'])

interface Section {
  level: number
  anchor: string
  heading: string
  parents: string[]
  text: string[]
}

export function extractSearchDocuments(options: ExtractOptions): ExtractResult {
  const { locale, outDir, indexFile } = options
  const excluded = new Set(options.excludedPages ?? [])
  const pageTitles = options.pageTitles ?? new Map<string, string>()

  const pages = readdirSync(outDir, { recursive: true, encoding: 'utf8' })
    .map((file: string) => file.split('\\').join('/'))
    .filter((file: string) => file.endsWith('.html'))
    .filter((file: string) => !excluded.has(file) && !alwaysExcluded.some((re) => re.test(file)))
    .sort()

  const documents: SearchDocument[] = []
  let indexedPages = 0

  for (const pagePath of pages) {
    const content = readContent(join(outDir, pagePath))

    if (content) withAllTabs(content, options.renderedMarkdown?.get(pagePath), `${locale}/${pagePath}`)

    const sections = content ? splitIntoSections(content) : []

    // Pages without a document body have nothing to search: the home page and
    // the index pages of the sections, which only name the sidebar group.
    if (!sections.length && !normalize(content?.text ?? '')) continue

    const section = sectionOf(pagePath)
    const label = section === 'general' ? '' : (pageTitles.get(`${section}/index.html`) ?? '')
    const pageUrl = pageUrlOf(locale, pagePath)
    const title = sections[0]?.level === 1 ? sections[0].heading : ''

    if (!title) {
      throw new Error(`Search: page "${pagePath}" of "${locale}" has no h1 heading`)
    }

    sections.forEach((s, order) => {
      const url = s.level === 1 ? pageUrl : `${pageUrl}#${s.anchor}`
      const breadcrumb = dedupe([label, ...(s.level === 1 ? [] : [title]), ...s.parents].filter(Boolean))

      documents.push({
        id: createHash('sha1').update(url).digest('hex'),
        url,
        page_url: pageUrl,
        anchor: s.level === 1 ? '' : s.anchor,
        title,
        heading: s.heading,
        breadcrumb,
        content: normalize(s.text.join('')),
        locale,
        section,
        audience: audienceOf(section),
        level: s.level,
        order,
      })
    })

    indexedPages++
  }

  validate(locale, documents)

  mkdirSync(dirname(indexFile), { recursive: true })
  writeFileSync(indexFile, documents.map((d) => JSON.stringify(d)).join('\n') + '\n')

  return { pages: indexedPages, documents }
}

function parseHtml(html: string): HTMLElement {
  return parse(html, {
    // Parse code blocks as well; by default their markup would end up as text.
    blockTextElements: { script: true, style: true },
  })
}

function readContent(file: string): HTMLElement | null {
  return parseHtml(readFileSync(file, 'utf8')).querySelector('.vp-doc > div')
}

/**
 * Replaces every tab group of the built page by the complete group from the
 * rendered Markdown: vitepress-plugin-tabs renders only the selected tab on the
 * server. The groups are matched by position; a mismatch fails the build rather
 * than silently losing content.
 */
function withAllTabs(content: HTMLElement, markdownHtml: string | undefined, page: string) {
  // Only the outermost groups are matched: a group nested in a tab that is not
  // selected is missing from the built page, and the replacement brings it along.
  const isBuiltGroup = (e: HTMLElement) => e.classList.contains('plugin-tabs')
  const isCompleteGroup = (e: HTMLElement) => e.tagName === 'PLUGINTABS'
  const builtGroups = outermost(content.querySelectorAll('.plugin-tabs'), isBuiltGroup)

  if (!builtGroups.length) return

  const completeGroups = markdownHtml
    ? outermost(parseHtml(markdownHtml).querySelectorAll('plugintabs'), isCompleteGroup)
    : []

  if (completeGroups.length !== builtGroups.length) {
    throw new Error(
      `Search: page "${page}" has ${builtGroups.length} tab groups, but its rendered Markdown has ${completeGroups.length}`
    )
  }

  builtGroups.forEach((group, i) => group.replaceWith(completeGroups[i]))
}

function outermost(elements: HTMLElement[], matches: (e: HTMLElement) => boolean): HTMLElement[] {
  return elements.filter((element) => {
    for (let parent = element.parentNode; parent; parent = parent.parentNode) {
      if (matches(parent)) return false
    }
    return true
  })
}

/**
 * Walks the content in document order and starts a new section at every
 * h1–h3 with an anchor, wherever it is nested (some pages wrap their content,
 * some headings sit inside a details block). Headings without anchor, like
 * the titles of feature cards, are ordinary text.
 */
function splitIntoSections(content: HTMLElement): Section[] {
  const sections: Section[] = []
  const parents: string[] = [] // heading text by level, index 0 = h1
  let current: Section | null = null

  const walk = (node: Node) => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      current?.text.push((node as TextNode).text)
      return
    }

    if (node.nodeType !== NodeType.ELEMENT_NODE) return

    const element = node as HTMLElement
    const tag = element.tagName

    if (skippedTags.has(tag) || skippedSelectors.some((c) => element.classList.contains(c))) return

    const level = /^H([1-6])$/.exec(tag)?.[1]

    if (level && Number(level) <= maxSectionLevel && element.id) {
      const n = Number(level)
      const heading = headingText(element)

      parents.length = n - 1
      // Levels that were skipped (an h3 right after the h1) leave no gap.
      current = { level: n, anchor: element.id, heading, parents: parents.slice(1).filter(Boolean), text: [] }
      parents[n - 1] = heading
      sections.push(current)
      return
    }

    const block = !inlineTags.has(tag)

    if (block) current?.text.push(' ')
    // Tab label, from the rendered Markdown (see `withAllTabs`).
    if (tag === 'PLUGINTABSTAB') current?.text.push(element.getAttribute('label') ?? '', ' ')
    element.childNodes.forEach(walk)
    if (block) current?.text.push(' ')
  }

  content.childNodes.forEach(walk)

  return sections
}

function headingText(heading: HTMLElement): string {
  const clone = heading.clone() as HTMLElement
  clone.querySelectorAll('.header-anchor').forEach((a) => a.remove())
  return normalize(clone.text)
}

function normalize(text: string): string {
  return text.replace(/\u200b/g, '').replace(/\s+/g, ' ').trim()
}

function dedupe(items: string[]): string[] {
  return items.filter((item, i) => item !== items[i - 1])
}

function validate(locale: string, documents: SearchDocument[]) {
  if (!documents.length) {
    throw new Error(`Search: no documents extracted for "${locale}"`)
  }

  const urls = new Set<string>()

  for (const d of documents) {
    for (const field of ['url', 'title', 'heading'] as const) {
      if (!d[field]) throw new Error(`Search: document without ${field} in "${locale}": ${JSON.stringify(d)}`)
    }

    if (urls.has(d.url)) throw new Error(`Search: duplicate URL in "${locale}": ${d.url}`)
    urls.add(d.url)
  }
}

/**
 * Link of a built page (`foo/bar.html`, `foo/index.html`) without anchor, as
 * the site links to it: `/<locale>/foo/bar.html`, `/<locale>/foo/`.
 */
export function pageUrlOf(locale: string, pagePath: string): string {
  return `/${locale}/` + pagePath.replace(/(^|\/)index\.html$/, '$1')
}

/** Path of a built page relative to the app, from a page's path relative to the source root. */
export function builtPagePath(relativePath: string): string {
  return relativePath.replace(/\.md$/, '.html')
}
