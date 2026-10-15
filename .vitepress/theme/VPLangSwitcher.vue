<script setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'

/*
 * Every locale is built and deployed as its own app and every app declares only
 * its own locale, which is why VitePress's built-in language menu stays empty.
 * This component is that menu, with the languages coming from
 * `themeConfig.langLinks` (see config.mts) and the markup of the default
 * theme's VPNavBarTranslations / VPNavScreenTranslations: a collapsed flyout in
 * the nav bar, a collapsible list in the screen menu. The current language is
 * the title of the menu, the other languages are its entries.
 *
 * VPFlyout is imported from the installed VitePress package because the default
 * theme does not register it globally. Opening and closing on hover, click and
 * focus loss is the part of the native menu that is not worth reimplementing.
 *
 * The entries are plain anchors although VitePress has VPMenuLink for them:
 * VPMenuLink runs its link through `withBase`, which would turn the language
 * prefix of a sibling app into `/en/de/`. Such links work, but only because the
 * web server collapses the duplicated prefix, and switching a language should
 * not depend on that. The anchors therefore keep the language prefix untouched;
 * `target="_self"` keeps this app's router out of them, as it skips links that
 * carry a target attribute (they are a document of their own, not a page of
 * this app).
 */
defineProps({
  screen: { type: Boolean, default: false },
})

const { theme } = useData()

const currentLanguage = computed(() =>
  theme.value.langLinks?.find((language) => language.current)
)

const otherLanguages = computed(() =>
  (theme.value.langLinks ?? []).filter((language) => !language.current)
)

const isOpen = ref(false)
</script>

<template>
  <VPFlyout
    v-if="!screen && currentLanguage && otherLanguages.length"
    class="VPLangSwitcher"
    icon="vpi-languages"
    :label="theme.langMenuLabel || 'Change language'"
  >
    <div class="items">
      <p class="title">{{ currentLanguage.label }}</p>

      <a
        v-for="language in otherLanguages"
        :key="language.link"
        class="link"
        :href="language.link"
        target="_self"
      >{{ language.label }}</a>
    </div>
  </VPFlyout>

  <div
    v-if="screen && currentLanguage && otherLanguages.length"
    class="VPLangSwitcher screen"
    :class="{ open: isOpen }"
  >
    <button class="title" @click="isOpen = !isOpen">
      <span class="vpi-languages icon lang" />
      {{ currentLanguage.label }}
      <span class="vpi-chevron-down icon chevron" />
    </button>

    <ul class="list">
      <li v-for="language in otherLanguages" :key="language.link" class="item">
        <a class="link" :href="language.link" target="_self">{{ language.label }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/*
 * Nav bar, hidden from where VitePress hides its own language menu.
 */
.VPLangSwitcher:not(.screen) {
  display: none;
}

@media (min-width: 1280px) {
  .VPLangSwitcher:not(.screen) {
    display: flex;
    align-items: center;
  }
}

.VPLangSwitcher:not(.screen) .title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.VPLangSwitcher:not(.screen) .link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.VPLangSwitcher:not(.screen) .link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

/*
 * Screen menu, unfolded on request.
 */
.VPLangSwitcher.screen {
  margin-top: 24px;
  height: 24px;
  overflow: hidden;
}

.VPLangSwitcher.screen.open {
  height: auto;
}

.VPLangSwitcher.screen .title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.VPLangSwitcher.screen .icon {
  font-size: 16px;
}

.VPLangSwitcher.screen .icon.lang {
  margin-right: 8px;
}

.VPLangSwitcher.screen .icon.chevron {
  margin-left: 4px;
}

.VPLangSwitcher.screen .list {
  padding: 4px 0 0 24px;
}

.VPLangSwitcher.screen .link {
  line-height: 32px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}
</style>

<style>
/*
 * The nav bar slot this component is mounted through sits after the social
 * links, where the default theme renders nothing — its own language menu lives
 * between the nav menu and the theme toggle. Flex order puts it back there, and
 * the nav menu gets the divider the theme would have drawn in front of it
 * (`.menu + .translations::before` in VPNavBar.vue). Without the divider the
 * icon would sit right next to the last menu entry, and the social links would
 * start flush against it, which is how one clicks GitHub by accident.
 *
 * Not scoped, because the elements that have to move are siblings from the
 * theme. Below 1280px all of them are hidden, so the block is limited to the
 * desktop nav bar; a divider without a language menu to separate would show up
 * between the menu and the extra flyout there.
 */
@media (min-width: 1280px) {
  .VPNavBar .content-body > .appearance,
  .VPNavBar .content-body > .social-links {
    order: 1;
  }

  .VPNavBar .content-body > .menu::after {
    margin-right: 8px;
    margin-left: 8px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: '';
  }
}
</style>
