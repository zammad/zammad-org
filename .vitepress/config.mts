import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { withSidebar } from 'vitepress-sidebar'
import definitionListMarkdownPlugin from 'markdown-it-deflist'
import footnote from 'markdown-it-footnote'
import kbd from 'markdown-it-kbd'
import { icon } from '@mdit/plugin-icon'
import { builtPagePath, extractSearchDocuments } from './search/extract.mts'
import { loadRelevance } from './search/relevance.mts'
import { aliasName } from './search/schema.mts'

const supportedLocales = ['en', 'de', 'sr', 'it', 'pt_BR']

// Avoids a `@types/node` dependency for reading the environment.
const env: Record<string, string | undefined> = (globalThis as any).process?.env ?? {}

const localeLabels: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  sr: 'српски',
  it: 'Italiano',
  pt_BR: 'Português (Brasil)',
}

/*
 * Every locale is built as its own app with its own base path (`/<locale>/`),
 * so that `dist/<locale>/` can be deployed as a self-contained directory.
 * See README.md and .gitlab-ci.yml.
 */
const locale = env.BUILD_LOCALE || 'en'

if (!supportedLocales.includes(locale)) {
  throw new Error(
    `Unsupported BUILD_LOCALE "${locale}" (expected one of: ${supportedLocales.join(', ')})`
  )
}

/*
 * The config files of a language are generated from the PO files (see
 * README.md). Only the requested language is loaded, because the files of the
 * other languages may not exist: each app is built on its own.
 */
function loadGenerated(name: string) {
  const file = fileURLToPath(new URL(`./${name}`, import.meta.url))

  if (!existsSync(file)) {
    throw new Error(
      `Missing ${name} - run \`LOCALE=${locale} pnpm i18n:locale\` before using "${locale}".`
    )
  }

  return JSON.parse(readFileSync(file, 'utf-8'))
}

const localeConfigFile = loadGenerated(`config.${locale}.yaml.json`)
const localeConfig = localeConfigFile.themeConfig
const searchConfig = loadGenerated(`search.${locale}.yaml.json`)
const rootPath = fileURLToPath(new URL('./../src', import.meta.url))
const otherLocales = supportedLocales.filter((l) => l !== locale)

/*
 * Links in the content and in the configuration carry the language prefix of
 * their own app (`/en/documentation/...` in the English content, `/de/...` in
 * the German one). VitePress prepends the base path to every internal link, so
 * those links are emitted as `/en/en/...`. The web server collapses the
 * duplicated prefix, but only for requests that reach it — and a click never
 * does: the client router handles it, finds no page at the doubled path and
 * shows the app's own 404 page instead of the target.
 *
 * Stripping the own prefix where the links are made leaves an ordinary internal
 * link behind, which the router can follow. Links that point at another
 * language's app keep their prefix and are collapsed by the web server as
 * before. The dead link check resolves the stripped form through the rewrites,
 * see `rewrites.inv` in VitePress's markdown-to-page step.
 */
function withoutOwnLocalePrefix(link: string): string {
  if (link === `/${locale}`) return '/'
  return link.startsWith(`/${locale}/`) ? link.slice(locale.length + 1) : link
}

/** Strip the own locale prefix from every `link` value in `data`, at any depth. */
function stripOwnLocalePrefix(data: unknown): void {
  if (Array.isArray(data)) {
    data.forEach(stripOwnLocalePrefix)
  } else if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>

    for (const key of Object.keys(record)) {
      const value = record[key]

      if (key === 'link' && typeof value === 'string') {
        record[key] = withoutOwnLocalePrefix(value)
      } else {
        stripOwnLocalePrefix(value)
      }
    }
  }
}

// Navigation, footer and sidebar entries of the generated configuration.
stripOwnLocalePrefix(localeConfig)

/*
 * Collected while the pages are built, for the search extraction in `buildEnd`:
 * pages (`foo/bar.html`) with `search: false` in their front matter, the title
 * and the rendered Markdown of every page.
 */
const searchExcludedPages = new Set<string>()
const searchPageTitles = new Map<string, string>()
const searchRenderedMarkdown = new Map<string, string>()

const commonSidebarConfig = {
  collapsed: true,
  collapseDepth: 1,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
}

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar({
    title: 'Zammad Hub',
    outDir: env.OUT_DIR || `dist/${locale}`,
    cacheDir: env.CACHE_DIR || `cache/${locale}`,
    srcDir: rootPath,
    base: `/${locale}/`,
    /*
     * All locales share one source tree (that is where the fixtures and the
     * public directory live), but only the requested locale is built. Its
     * pages are re-rooted so that they sit directly under the app's base path.
     */
    rewrites: (page: string) =>
      page.startsWith(`${locale}/`) ? page.slice(locale.length + 1) : page,
    srcExclude: [
      'README.md',
      'index.md',
      'modules/*',
      ...otherLocales.map((l) => `${l}/**`),
    ],
    /*
     * Links that carry a locale prefix (`/en/...`, `/de/...`) are resolved at
     * the web server level: the base path of the app is prepended to them, so
     * `/en/foo` inside the English app becomes `/en/en/foo`. A rewrite rule in
     * the nginx configuration collapses that duplicated prefix again, which is
     * why these links must not be reported as dead pages of this app.
     * See docker/nginx/conf.d/default.conf.
     */
    ignoreDeadLinks: [new RegExp(`^/(${supportedLocales.join('|')})/`)],
    description: 'Documentation for Zammad Users and Administrators',
    head: [
      ['link', { rel: 'icon', href: 'https://zammad.org/assets/images/favicon.ico' }],
      [
        'script',
        {},
        `var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
        (function() {
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='https://cdn.matomo.cloud/zammad.matomo.cloud/container_O1b7GNLx.js'; s.parentNode.insertBefore(g,s);
        })();`
      ],
    ],
    markdown: {
      config(md) {
        md.use(tabsMarkdownPlugin)
          .use(definitionListMarkdownPlugin)
          .use(footnote)
          .use(kbd)
          .use(icon, {
            render: (rawIcon) => {
              let className
              let content
              let ariaLabel

              switch (rawIcon.toLowerCase()) {
                case '+':
                  className = 'add-button'
                  content = '＋'
                  ariaLabel = '+'
                  break;
                case 'a':
                  className = 'action-menu'
                  content = '︙'
                  ariaLabel = '︙'
                  break;
                case 'd':
                  className = 'docker-icon'
                  content = '<img src="/assets/docker.svg" alt="docker" />'
                  ariaLabel = 'docker'
                  break;
                case 'p':
                  className = 'package-icon'
                  content = '<img src="/assets/package.svg" alt="package" />'
                  ariaLabel = 'package'
                  break;
                case 'x':
                  className = 'remove-button'
                  content = '✕'
                  ariaLabel = 'X'
                  break;
                case 'c':
                  className = 'copy-button'
                  content = '<img src="/assets/copy.svg" alt="copy" />'
                  ariaLabel = 'copy'
                  break;
                default:
                  className = content = ariaLabel = rawIcon
              }

              return `<span class="${className}" aria-label="${ariaLabel}">${content}</span>`
            },
          })

        // Remove the sub ID from the footnote caption in case of multiple source references.
        //   https://github.com/markdown-it/markdown-it-footnote/blob/master/index.mjs#L17
        //   https://github.com/zammad/zammad-org/issues/37
        /*
         * Keep the rendered Markdown of every page for the search extraction:
         * it holds all tabs of a tab group, the built page only the selected
         * one. See `withAllTabs` in .vitepress/search/extract.mts.
         */
        const render = md.render.bind(md)
        md.render = (src, env) => {
          const html = render(src, env)
          if (env?.relativePath) searchRenderedMarkdown.set(builtPagePath(env.relativePath), html)
          return html
        }

        md.renderer.rules.footnote_caption = (tokens, idx/*, options, env, slf */) => {
          let n = Number(tokens[idx].meta.id + 1).toString()

          /* zammad-org:START */
          // if (tokens[idx].meta.subId > 0) n += `:${tokens[idx].meta.subId}`
          /* zammad-org:END */

          return `[${n}]`
        }

        /*
         * Content links carry the language prefix of their own app, see
         * `withoutOwnLocalePrefix`. Strip it while the markdown is parsed, so
         * that VitePress's link normalisation adds the base path only once.
         * Links into another language keep their prefix and are collapsed by
         * the web server, which only happens on a real request — so the router
         * has to leave those alone.
         */
        md.core.ruler.push('strip-own-locale-prefix', (state) => {
          for (const token of state.tokens) {
            for (const child of token.children ?? []) {
              if (child.type !== 'link_open') continue

              const href = child.attrGet('href')
              if (!href) continue

              const stripped = withoutOwnLocalePrefix(href)

              if (stripped !== href) {
                child.attrSet('href', stripped)
              } else if (
                otherLocales.some((l) => href === `/${l}` || href.startsWith(`/${l}/`))
              ) {
                child.attrSet('target', '_self')
              }
            }
          }
        })
      },
    },
    /*
     * Front matter links — the actions of the home page and the cards of the
     * documentation pages — never pass a markdown parser, see
     * `withoutOwnLocalePrefix`.
     */
    transformPageData(pageData) {
      stripOwnLocalePrefix(pageData.frontmatter)

      const builtPage = builtPagePath(pageData.relativePath)

      searchPageTitles.set(builtPage, pageData.title)
      if (pageData.frontmatter.search === false) searchExcludedPages.add(builtPage)
    },
    /*
     * Writes the search documents of this locale to `search-index/<locale>.jsonl`,
     * from which the indexer fills Typesense. A failed extraction fails the build.
     * See .vitepress/search/ and https://github.com/zammad/zammad-org/issues/242.
     */
    buildEnd(siteConfig) {
      const indexFile = resolve(
        env.SEARCH_INDEX_DIR || resolve(siteConfig.root, 'search-index'),
        `${locale}.jsonl`
      )

      const { pages, documents } = extractSearchDocuments({
        locale,
        outDir: siteConfig.outDir,
        indexFile,
        excludedPages: searchExcludedPages,
        pageTitles: searchPageTitles,
        renderedMarkdown: searchRenderedMarkdown,
      })

      console.log(
        `Search: ${documents.length} documents from ${pages} pages written to ${relative(siteConfig.root, indexFile)}`
      )
    },
    /*
     * Each app knows only its own locale. The language switcher therefore has
     * to link to the other apps explicitly, see .vitepress/theme/VPLangSwitcher.vue.
     */
    locales: {
      root: { label: localeLabels[locale], ...localeConfigFile },
    },
    vite: {
      clearScreen: false,
      resolve: {
        alias: [
          {
            find: /^.*\/VPFooter\.vue$/,
            replacement: fileURLToPath(
              new URL('./theme/VPFooter.vue', import.meta.url)
            )
          },
          {
            find: /^.*\/VPSidebarItem\.vue$/,
            replacement: fileURLToPath(
              new URL('./theme/VPSidebarItem.vue', import.meta.url)
            )
          },
          // The Typesense search, see .vitepress/theme/search/.
          {
            find: /^.*\/VPNavBarSearch\.vue$/,
            replacement: fileURLToPath(
              new URL('./theme/search/VPNavBarSearch.vue', import.meta.url)
            )
          },
        ],
      },
      /*
       * `pnpm dev` searches a local Typesense the way the site does in
       * production: through `/search-api/multi_search`, with the search-only
       * key added on the server side. See the nginx configuration in
       * docker/nginx/conf.d/default.conf and README.md.
       */
      server: {
        proxy: {
          '/search-api/multi_search': {
            target: env.TYPESENSE_URL || 'http://localhost:8108',
            changeOrigin: true,
            rewrite: () => '/multi_search',
            headers: { 'X-TYPESENSE-API-KEY': env.TYPESENSE_SEARCH_KEY || 'local-dev-search-key' },
          },
        },
      },
    },
    themeConfig: {
      ...localeConfig,
      /*
       * `locale` and `link` are what the language switcher needs: the built
       * app of the current language cannot know the other apps' route tables,
       * so the switcher derives the target page from the current one and the
       * locale code, falling back to `link` (that app's start page) where no
       * corresponding page exists. See theme/VPLangSwitcher.vue.
       */
      langLinks: supportedLocales.map((l) => ({
        label: localeLabels[l],
        locale: l,
        link: `/${l}/`,
        current: l === locale,
      })),
      logo: {
        light: '/assets/logo-flat-light.svg',
        dark: '/assets/logo-flat-dark.svg',
      },
      externalLinkIcon: true,
      lastUpdated: {
        formatOptions: {
          dateStyle: 'short',
          timeStyle: 'short',
        }
      },
      /*
       * The search runs against Typesense instead of a VitePress search
       * provider, see .vitepress/theme/search/. It needs the collection alias
       * of this app's language and the texts from `search.<locale>.yaml`.
       */
      typesenseSearch: {
        collection: aliasName(locale),
        // Stop word set of the locale, created by the indexer; only when the
        // locale has stop words, see .vitepress/search/relevance.mts.
        stopwords: loadRelevance(locale).stopwords.length ? aliasName(locale) : undefined,
        translations: searchConfig.translations,
      },
    }
  }, [
    {
      ...commonSidebarConfig,
      documentRootPath: `/src/${locale}`,
      resolvePath: '/',
      excludePattern: [
        'gdpr.md',
        'imprint.md',
        'TEMPLATE.md',
        'modules/',
      ],
    },
    {
      ...commonSidebarConfig,
      documentRootPath: `/src/${locale}/documentation/use`,
      resolvePath: '/documentation/use/',
      rootGroupText: `\u2039 ${localeConfig.user.rootGroupText}`, // guillemet (‹)
      rootGroupLink: '../introduction.html',
    },
  ]),
)
