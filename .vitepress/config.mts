import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { withSidebar } from 'vitepress-sidebar'
import definitionListMarkdownPlugin from 'markdown-it-deflist'
import footnote from 'markdown-it-footnote'
import kbd from 'markdown-it-kbd'
import configEN from './config.en.yaml.json'
import configDE from './config.de.yaml.json'
import configSR from './config.sr.yaml.json'
import searchEN from './search.en.yaml.json'
import searchDE from './search.de.yaml.json'
import searchSR from './search.sr.yaml.json'

const supportedLocales = ['en', 'de', 'sr']

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

        // Remove the sub ID from the footnote caption in case of multiple source references.
        //   https://github.com/markdown-it/markdown-it-footnote/blob/master/index.mjs#L17
        //   https://github.com/zammad/zammad-org/issues/37
        md.renderer.rules.footnote_caption = (tokens, idx/*, options, env, slf */) => {
          let n = Number(tokens[idx].meta.id + 1).toString()

          // if (tokens[idx].meta.subId > 0) n += `:${tokens[idx].meta.subId}`

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
          }
        }
      },
    }
  }, [
    ...supportedLocales.map((locale) => ({
        documentRootPath: `/src/${locale}`,
        resolvePath: `/${locale}/`,
        collapsed: true,
        collapseDepth: 1,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
        excludePattern: [
          'gdpr.md',
          'imprint.md',
          'TEMPLATE.md',
          'modules/'
        ],
      }),
    )
  ]),
)
