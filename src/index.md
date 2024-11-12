---
# Empty "/" page, only for redirecting to the target language.
---
<script setup>
const lang = window.navigator.language || '';
let targetLang = 'en';

['de', 'sr'].forEach((langCode) => {
  if (lang.startsWith(langCode)) {
    targetLang = langCode;
  }
})

window.location.pathname = `/${targetLang}`
</script>
