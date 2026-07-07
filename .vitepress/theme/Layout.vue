<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
import { computed, onMounted, nextTick, watch } from 'vue'
import VPHeader from './VPHeader.vue'

const acceptLanguage = computed(() => window.navigator.language || '')

const supportedLocales = ['en', 'de', 'sr']

const targetLocale = computed(() =>
  supportedLocales.find((locale) => acceptLanguage.value.startsWith(locale)) || 'en'
)

const { route, go } = useRouter()

const hasNoLocaleSet = computed(() => supportedLocales.every((locale) => !route.path.startsWith(`/${locale}/`)))

/**
 * Activate a tab based on ?tab=<name> in the URL.
 * If a #hash is present, target the tab group that appears
 * after that section in the document (not an ancestor).
 */
function activateTabFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const targetTab = params.get('tab')
  if (!targetTab) return

  nextTick(() => {
    // Wait for page transitions to fully render before querying the DOM
    requestAnimationFrame(() => {
      const tabGroups = document.querySelectorAll('.plugin-tabs')
      if (!tabGroups.length) return

      let candidateGroup = null

      const hash = window.location.hash
      if (hash) {
        const hashEl = document.querySelector(hash)
        if (hashEl) {
          // Find the first tab group that comes AFTER the hash element
          // in document order (headings sit above tab groups, not inside them)
          candidateGroup = Array.from(tabGroups).find(
            (g) => hashEl.compareDocumentPosition(g) & Node.DOCUMENT_POSITION_PRECEDING
          )
        }
      }

      const group = candidateGroup || tabGroups[0]

      // Click the button whose text matches the tab name (case-insensitive)
      const buttons = group.querySelectorAll('.plugin-tabs--tab')
      for (const btn of buttons) {
        const label = btn.textContent?.trim().toLowerCase()
        if (label && label === targetTab.trim().toLowerCase()) {
          btn.click()
          break
        }
      }
    })
  })
}

onMounted(() => {
  // Always redirect to the target language for the root path.
  if (route.path === '/') {
    go(`/${targetLocale.value}/`)
    return
  }

  // Redirect to the requested page under target language, if locale is not set (meta-links).
  if (route.data?.isNotFound && hasNoLocaleSet.value) {
    go(`/${targetLocale.value}${route.path}`)
    return
  }

  // Activate tab from URL parameter
  activateTabFromUrl()
})

// Watch for client-side navigation (hash changes, query changes)
watch(
  () => route.path + '?' + window.location.search + route.hash,
  () => activateTabFromUrl()
)
</script>

<template>
  <DefaultTheme.Layout>
    <!-- https://vitepress.dev/guide/extending-default-theme#layout-slots -->
    <template #layout-top>
      <VPHeader />
    </template>
  </DefaultTheme.Layout>
</template>
