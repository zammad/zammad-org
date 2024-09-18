import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

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
      root: {
        label: 'English',
        lang: 'en'
      },
      de: {
        label: 'Deutsch',
        lang: 'de', // optional, will be added  as `lang` attribute on `html` tag
        // link: '/fr/guide' // default /fr/ -- shows on navbar translations menu, can be external

        // other locale specific properties...
      },
    },
    // vite: {
    //   plugins: [
    //     AutoSidebar({
    //     })
    //   ]
    // },
// didn't get it to work, for options see https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Zammad.com', link: 'https://www.zammad.com' },
      { text: 'Community forum', link: 'https://community.zammad.org/'}
    ],

    sidebar: [
      {
        text: 'Get started with Zammad',
        items: [
          {
          text: 'Get Zammad',
          items: [
            { text: 'Start', link: 'get-started/start' },
            { text: 'Deyploy Zammad', link: 'get-started/deployment'},
          ]
        }
        ]
      },
      {
        text: 'Documentation',
        items: [
          {
          text: 'Use Zammad', collapsed: true,
          items: [
            { text: 'Login', link: '/documentation/user-docs/index' },
            { text: 'Ticket handling', link: '/documentation/user-docs/index' },
          ]
          },
          {
          text: 'Administrate Zammad', collapsed: true,
            items: [
              { text: 'General settings', link: '/documentation/user-docs/index' },
              { text: 'User management', link: '/documentation/user-docs/index' },
            ]
          },
        ]
      },
      {
        text: 'Contribute',
        items: [
          { text: 'Style and content guide', link: 'contribute/style-and-content-guide' },
          { text: 'Contribution', link: 'contribute/contribute' },
        ]
      },
      {
      text: 'Reference',
      items: [
        { text: 'Glossary', link: 'reference/glossary' },
        { text: 'API reference', link: 'reference/api-reference' },
        { text: 'Rails commands', link: 'reference/rails-commands' },
      ]
      },
      {
      text: 'Playground (example content)',
      items: [
        { text: 'Admin documentation', link: '/documentation/admin-docs/index' },
        { text: 'Formatting cheat sheet', link: '/cheat-sheet' },
        ]
      }
    ],
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
              }
            },
    footer: {
      message: 'Zammad Hub',
      copyright: 'Copyright © 2012-present Zammad Foundation'
    },

    search: {
      provider: 'local'
      },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zammad' }
    ]
  }
  }
)