import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { withSidebar } from 'vitepress-sidebar'
import definitionListMarkdownPlugin from 'markdown-it-deflist'
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
    head: [['link', { rel: 'icon', href: 'https://zammad.org/assets/images/favicon.ico' }]],
    markdown: {
      config(md) {
        md.use(tabsMarkdownPlugin)
          .use(definitionListMarkdownPlugin)
      },
    },
    locales: {
      root: { label: 'English', link: '/en/', ...defineConfig(configEN as UserConfig) },
      de: { label: 'Deutsch', ...defineConfig(configDE as UserConfig) },
      sr: { label: 'српски', ...defineConfig(configSR as UserConfig) },
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
        ],
      },
    },
    themeConfig: {
      logo: {
        light: '/assets/logo-flat-light.svg',
        dark: '/assets/logo-flat-dark.svg',
      },
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
        collapseDepth: 2,
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
        excludePattern: [
          'gdpr.md',
          'imprint.md',
          'TEMPLATE.md',
        ],
      }),
    )
  ]),
)