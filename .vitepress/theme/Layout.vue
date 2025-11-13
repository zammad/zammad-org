<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
import { computed, onMounted } from 'vue'
import VPHeader from './VPHeader.vue'

const acceptLanguage = computed(() => window.navigator.language || '')

const supportedLocales = ['en', 'de', 'sr']

const targetLocale = computed(() =>
  supportedLocales.find((locale) => acceptLanguage.value.startsWith(locale)) || 'en'
)

const { route, go } = useRouter()

const hasNoLocaleSet = computed(() => supportedLocales.every((locale) => !route.path.startsWith(`/${locale}/`)))

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
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- https://vitepress.dev/guide/extending-default-theme#layout-slots -->
    <template #layout-top>
      <VPHeader />
    </template>
  </DefaultTheme.Layout>
</template>
