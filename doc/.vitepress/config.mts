import { defineConfig, UserConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
// import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import configEN from './config.en.yaml.json'
import configDE from './config.de.yaml.json'
import configSR from './config.sr.yaml.json'
import searchEN from './search.en.yaml.json'
import searchDE from './search.de.yaml.json'
import searchSR from './search.sr.yaml.json'



// https://vitepress.dev/reference/site-config
export default
  defineConfig({
    title: "Zammad Hub",
    rewrites: {
      'en/:rest*': ':rest*'
    },
    description: "Documentation for Zammad Users and Administrators",
    head: [['link', { rel: 'icon', href: 'https://zammad.org/assets/images/favicon.ico' }]],
    markdown: {
      config(md) {
        md.use(tabsMarkdownPlugin)
      },
    },
    locales: {
      root: {label: 'English', ...defineConfig(configEN as UserConfig) },
      de: { label: 'Deutsch', ...defineConfig(configDE as UserConfig) },
      sr: { label: 'српски', ...defineConfig(configSR as UserConfig) },
    },
    // didn't get it to work, for options see https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar
    // vite: {
    //   plugins: [
    //     AutoSidebar({
    //     })
    //   ]
    // },
    themeConfig: {
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
  }
)