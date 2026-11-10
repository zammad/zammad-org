/*
 * Keeps `llms.txt` in line with the navigation: runs at the end of every
 * build (see `buildEnd` in ../config.mts), so that a page in the sidebar that
 * is missing from `llms.txt`, or a link to a Markdown page that was not built,
 * fails `pnpm build` locally and in CI. See
 * https://github.com/zammad/zammad-org/issues/239.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { markdownPagePath, sidebarLinks, type SidebarItem } from './sidebar.mts'

export interface LlmsCheckOptions {
  locale: string
  /** Built app of the locale, `dist/<locale>/`. */
  outDir: string
  /** Public origin of the site, without trailing slash. */
  siteUrl: string
  /** Main sidebar of the app, see `mainSidebar`. */
  sidebar: { base: string; items: SidebarItem[] }
}

/** What does not hold, one message per problem; empty when `llms.txt` is complete. */
export function checkLlmsTxt({ locale, outDir, siteUrl, sidebar }: LlmsCheckOptions): string[] {
  const where = `llms.txt (${locale})`
  const file = join(outDir, 'llms.txt')

  if (!existsSync(file)) return [`${where}: ${file} was not generated`]

  const problems: string[] = []
  const appUrl = `${siteUrl}/${locale}/`
  const linked = new Set(
    [...readFileSync(file, 'utf8').matchAll(/\]\(([^)\s]+)\)/g)]
      .map((match) => match[1])
      .filter((url) => url.startsWith(appUrl))
      .map((url) => url.slice(appUrl.length))
  )

  for (const link of sidebarLinks(sidebar.items, sidebar.base)) {
    const page = markdownPagePath(link)

    if (!linked.has(page)) problems.push(`${where}: sidebar entry "${link}" is missing (expected ${appUrl}${page})`)
  }

  for (const page of linked) {
    if (!existsSync(join(outDir, page))) problems.push(`${where}: links to ${appUrl}${page}, which was not built`)
  }

  const full = readdirSync(outDir, { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('llms-full.txt'))

  for (const f of full) problems.push(`${where}: ${f} must not be generated, it is too heavy for models`)

  return problems
}
