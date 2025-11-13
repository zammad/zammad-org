// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import Layout from './Layout.vue'
import VPDocFeatures from './VPDocFeatures.vue'
import VPGlossary from './VPGlossary.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app)
    app.component('VPGlossary', VPGlossary)
    app.component('VPDocFeatures', VPDocFeatures)
  }
} satisfies Theme
