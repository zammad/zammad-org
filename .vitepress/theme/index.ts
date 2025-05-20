// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import VPDocFeatures from './VPDocFeatures.vue'
import VPGlossary from './VPGlossary.vue'
import VPHeader from './VPHeader.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-top': () => h(VPHeader),
    })
  },
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app)
    app.component('VPGlossary', VPGlossary)
    app.component('VPDocFeatures', VPDocFeatures)
  }
} satisfies Theme
