<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRouter, useData } from 'vitepress'
import { computed, onMounted, nextTick } from 'vue'
import VPHeader from './VPHeader.vue'

const { site } = useData()

const acceptLanguage = computed(() => window.navigator.language || '')

/**
 * Scroll-settle generation counter. Incremented on every route change so a
 * stale image-load callback from a previous navigation never re-scrolls the
 * page the user is now looking at.
 */
let scrollGeneration = 0

/**
 * After a cross-page anchor navigation, wait for images above the target
 * heading to finish loading, then correct the scroll position if the heading
 * drifted due to layout reflow.
 *
 * VitePress's router computes `scrollTo` once inside `nextTick`, before
 * images above the target have decoded. When they arrive, the heading's
 * offsetTop grows but the scroll is never re-evaluated (vuejs/vitepress#3428).
 * This function patches that gap from the theme side.
 *
 * Guards:
 * - Skips correction if the user scrolled manually (don't fight input).
 * - Cancels entirely if a new route fires before images settle (generation
 *   counter mismatch).
 * - Times out after 3 s so a broken image never blocks the page forever.
 */
function settleAnchorScroll(hash, gen) {
  const id = hash.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return

  // Collect images above the target that haven't decoded yet.
  const allImages = Array.from(document.querySelectorAll('.VPDoc img'))
  const targetRectTop = target.getBoundingClientRect().top + window.scrollY
  const pending = allImages.filter(
    (img) =>
      img.getBoundingClientRect().top + window.scrollY < targetRectTop &&
      (!img.complete || img.naturalWidth === 0)
  )

  /**
   * Same offset math as VitePress's router scrollTo(): the bottom of the
   * scrollOffset selector (the nav bar) plus its 24px padding. Using the
   * router's own formula keeps the corrected position identical to the
   * position VitePress would have chosen without the reflow.
   */
  function navOffset() {
    let offset = 0
    const so = site.value.themeConfig?.scrollOffset
    const selector = typeof so === 'object' && so !== null ? so.selector : so
    const el =
      (typeof selector === 'string' && document.querySelector(selector)) ||
      document.querySelector('.VPNav')
    if (el) offset = el.getBoundingClientRect().bottom
    return offset
  }

  /** Absolute scroll position that puts the target below the nav. */
  function anchorScrollTop() {
    return target.getBoundingClientRect().top + window.scrollY - navOffset() - 24
  }

  // Snap immediately for responsiveness, then keep re-checking. On cached
  // images Firefox can report complete=true before decode/layout finishes,
  // so the first computation may still use collapsed metrics — the sweep
  // below corrects once the layout has finalised.
  window.scrollTo(0, anchorScrollTop())

  // Real user input — the only thing that should cancel the correction.
  // Scroll events cannot be used: the router's own programmatic scroll,
  // Firefox's scroll restoration on reload, and scroll anchoring all fire
  // them and would disarm the correction.
  let userInteracted = false
  const markUser = () => { userInteracted = true }
  window.addEventListener('wheel', markUser, { passive: true })
  window.addEventListener('touchmove', markUser, { passive: true })
  window.addEventListener('keydown', markUser)

  function stopListening() {
    window.removeEventListener('wheel', markUser)
    window.removeEventListener('touchmove', markUser)
    window.removeEventListener('keydown', markUser)
  }

  // Put the heading at its intended position if the user hasn't taken over.
  // Called repeatedly so late layout changes (image decode, scroll
  // restoration) are corrected as well.
  function reanchor() {
    if (userInteracted) { stopListening(); return }
    if (scrollGeneration !== gen) { stopListening(); return }
    const wanted = anchorScrollTop()
    if (Math.abs(wanted - window.scrollY) > 2) {
      window.scrollTo(0, wanted)
    }
  }

  if (pending.length > 0) {
    Promise.all(
      pending.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve()
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
          })
      )
    ).then(() => {
      reanchor()
    })
  }

  // Re-check a few times to catch late decode/layout/scroll-restoration
  // movement, then give up (also bounds the listeners' lifetime).
  setTimeout(reanchor, 100)
  setTimeout(reanchor, 300)
  setTimeout(reanchor, 800)
  setTimeout(() => { stopListening(); reanchor() }, 1600)
}

const supportedLocales = ['en', 'de', 'sr', 'it', 'pt_BR']

const targetLocale = computed(() => {
  const normalized = acceptLanguage.value.replace('-', '_').toLowerCase()
  return supportedLocales.find((locale) => normalized.startsWith(locale.toLowerCase())) || 'en'
})

const router = useRouter()
const { route, go } = router

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

  // Settle anchor scroll on initial load (direct navigation with #hash).
  // Note: route.hash is not set by VitePress's reactive route object, so read
  // the hash from the URL directly. Wait one frame so the browser's initial
  // fragment scroll has happened before snapshotting positions.
  const initialHash = window.location.hash
  if (initialHash) {
    nextTick(() =>
      requestAnimationFrame(() => settleAnchorScroll(initialHash, ++scrollGeneration))
    )
  }
})

// After every client-side navigation, activate tabs and settle anchor scroll.
// Uses VitePress's onAfterRouteChange hook so query-only navigations also
// trigger tab activation with the full normalised URL.
router.onAfterRouteChange = (to) => {
  const url = new URL(to, window.location.origin)
  const hash = url.hash
  // Increment generation on every route change so hashless navigations
  // invalidate pending settleAnchorScroll callbacks.
  const gen = ++scrollGeneration
  activateTabFromUrl()
  if (hash) {
    nextTick(() => requestAnimationFrame(() => settleAnchorScroll(hash, gen)))
  }
}
</script>

<template>
  <DefaultTheme.Layout>
    <!-- https://vitepress.dev/guide/extending-default-theme#layout-slots -->
    <template #layout-top>
      <VPHeader />
    </template>
  </DefaultTheme.Layout>
</template>
