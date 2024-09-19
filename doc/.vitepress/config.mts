import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
// import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import en from './en.yaml.json'
import de from './de.yaml.json'
import sr from './sr.yaml.json'

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
      root: {label: 'English', ...defineConfig(en) },
      de: { label: 'Deutsch', ...defineConfig(de) },
      sr: { label: 'српски', ...defineConfig(sr) },
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
        text: 'Updated at',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium',
        }
      },
      search: {
        provider: 'local'
      },
    }
  }
)