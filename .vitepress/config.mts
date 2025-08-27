import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { withSidebar } from 'vitepress-sidebar'
import definitionListMarkdownPlugin from 'markdown-it-deflist'
import footnote from 'markdown-it-footnote'
import kbd from 'markdown-it-kbd'
import { icon } from '@mdit/plugin-icon'
import configEN from './config.en.yaml.json'
import configDE from './config.de.yaml.json'
import configSR from './config.sr.yaml.json'
import searchEN from './search.en.yaml.json'
import searchDE from './search.de.yaml.json'
import searchSR from './search.sr.yaml.json'

const supportedLocales = ['en', 'de', 'sr']

const configByLocale = {
  en: configEN,
  de: configDE,
  sr: configSR,
}

const searchConfigByLocale = {
  en: searchEN,
  de: searchDE,
  sr: searchSR,
}

const userSearchRegex = new RegExp(`^/(${supportedLocales.join('|')})/documentation/use/`)

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
    outDir: 'dist',
    cacheDir: 'cache',
    srcDir: 'src',
    srcExclude: ['README.md', 'modules/*'],
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
      },
    },
    locales: {
      root: { label: 'English', link: '/en/', ...configEN },
      de: { label: 'Deutsch', ...configDE },
      sr: { label: 'српски', ...configSR },
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
            root: searchEN,
            de:   searchDE,
            sr:   searchSR,
          },
          miniSearch: {
            options: {
              fields: ['title', 'titles', 'text', 'user'],
              storeFields: ['title', 'titles', 'user'],
              extractField(document, fieldName) {
                // Mark all user pages in search index for later filtering.
                if (fieldName === 'user') return userSearchRegex.test(document.id)

                // Add localized prefix to the breadcrumb of user documentation pages.
                if (fieldName === 'titles') {
                  const matches = document.id.match(userSearchRegex)

                  if (matches) {
                    const localizedPrefix = searchConfigByLocale[ matches[1] ].translations.user

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
    ...supportedLocales.map((locale) => ({
        ...commonSidebarConfig,
        documentRootPath: `/src/${locale}`,
        resolvePath: `/${locale}/`,
        excludePattern: [
          'gdpr.md',
          'imprint.md',
          'TEMPLATE.md',
          'modules/',
        ],
      }),
    ),
    ...supportedLocales.map((locale) => ({
        ...commonSidebarConfig,
        documentRootPath: `/src/${locale}/documentation/use`,
        resolvePath: `/${locale}/documentation/use/`,
        rootGroupText: `\u2039 ${configByLocale[locale].themeConfig.user.rootGroupText}`, // guillemet (‹)
        rootGroupLink: '../introduction.html',
      }),
    ),
  ]),
)
