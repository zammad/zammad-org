import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { withSidebar } from 'vitepress-sidebar'
import definitionListMarkdownPlugin from 'markdown-it-deflist'
import footnote from 'markdown-it-footnote'
import kbd from 'markdown-it-kbd'
import { icon } from '@mdit/plugin-icon'

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

const userSearchRegex = new RegExp(`^/(${supportedLocales.join('|')})/documentation/use/`)

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
     * See .docker-compose/vitepress.conf.
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
    },
    /*
     * Each app knows only its own locale. The language switcher therefore has
     * to link to the other apps explicitly, see .vitepress/theme/VPLangSwitcher.vue.
     */
    locales: {
      root: { label: localeLabels[locale], ...localeConfigFile },
    },
    vite: {
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
        ],
      },
    },
    themeConfig: {
      ...localeConfig,
      langLinks: supportedLocales.map((l) => ({
        label: localeLabels[l],
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
      search: {
        provider: 'local',
        options: {
          locales: {
            root: searchConfig,
          },
          miniSearch: {
            options: {
              fields: ['title', 'titles', 'text', 'user'],
              storeFields: ['title', 'titles', 'user'],
              extractField(document, fieldName) {
                // Mark all user pages in search index for later filtering.
                if (fieldName === 'user') return userSearchRegex.test(document.id)

                // Add localized prefix to the breadcrumb of user documentation pages.
                // An app contains its own language only, so the matched prefix is
                // always the one of this app.
                if (fieldName === 'titles') {
                  const matches = document.id.match(userSearchRegex)

                  if (matches) {
                    const localizedPrefix = searchConfig.translations.user

                    return [localizedPrefix, ...document.titles]
                  }

                  return document.titles
                }

                return document[fieldName]
              },
            },
            searchOptions: {
              filter: (document) => {
                // Show only user pages in search results, when in the user documentation section.
                if (/\/documentation\/use\//.test(location.pathname))
                  return document.user
                return true
              },
            },
          },
        },
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
