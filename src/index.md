---
# Empty "/" page, only for redirecting to the target language.
---
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const lang = window.navigator.language || ''
  const langs = ['de', 'sr']

  let targetLang = 'en'

  langs.forEach((langCode) => {
    if (lang.startsWith(langCode)) {
      targetLang = langCode
    }
  })

  window.location.pathname = `/${targetLang}/`
})
</script>
