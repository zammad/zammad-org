<script lang="ts" setup>
/*
 * Replaces VitePress's VPNavBarSearch (see the alias in .vitepress/config.mts):
 * the search button of the navigation bar and its keyboard shortcuts. The
 * dialog itself is loaded on first use. See .vitepress/search/ for the index.
 */
import { useData } from 'vitepress'
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

const SearchDialog = defineAsyncComponent(() => import('./SearchDialog.vue'))

const { theme } = useData()
const translations = theme.value.typesenseSearch.translations

const open = ref(false)

function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement

  return element.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)
}

function onKeydown(event: KeyboardEvent) {
  const ctrlK = event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)
  const slash = event.key === '/' && !isEditingContent(event)

  if ((ctrlK || slash) && !open.value) {
    event.preventDefault()
    open.value = true
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="VPNavBarSearch">
    <SearchDialog v-if="open" @close="open = false" />

    <!--
      Wrapper as in VitePress's VPNavBarSearch: as a flex item it shrinks to
      the button, which is `width: 100%` from 768px on. Without it, the button
      would stretch over the whole growing search area.
    -->
    <div class="search-button">
      <button
        type="button"
        class="DocSearch DocSearch-Button"
        :aria-label="translations.button.buttonAriaLabel"
        aria-haspopup="dialog"
        @click="open = true"
      >
        <span class="DocSearch-Button-Container">
          <span class="vp-icon DocSearch-Search-Icon"></span>
          <span class="DocSearch-Button-Placeholder">{{ translations.button.buttonText }}</span>
        </span>
        <span class="DocSearch-Button-Keys">
          <kbd class="DocSearch-Button-Key"></kbd>
          <kbd class="DocSearch-Button-Key">K</kbd>
        </span>
      </button>
    </div>
  </div>
</template>

<style>
/* Layout of VitePress's VPNavBarSearch. */
.VPNavBarSearch {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .VPNavBarSearch {
    flex-grow: 1;
    padding-left: 24px;
  }
}

@media (min-width: 960px) {
  .VPNavBarSearch {
    padding-left: 32px;
  }
}

/*
 * Search button of VitePress (VPNavBarSearchButton.vue), plus the base rules
 * that otherwise come from @docsearch/css.
 */
.DocSearch-Button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 55px;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
  transition: border-color 0.25s;
}

.DocSearch-Button:focus:not(:focus-visible) {
  outline: none;
}

@media (min-width: 768px) {
  .DocSearch-Button {
    justify-content: flex-start;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 0 10px 0 12px;
    width: 100%;
    height: 40px;
    background-color: var(--vp-c-bg-alt);
  }

  .DocSearch-Button:hover {
    border-color: var(--vp-c-brand-1);
  }
}

.DocSearch-Button .DocSearch-Button-Container {
  display: flex;
  align-items: center;
}

.DocSearch-Button .DocSearch-Search-Icon {
  position: relative;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-1);
  fill: currentColor;
  transition: color 0.5s;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Search-Icon {
    top: 1px;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    color: var(--vp-c-text-2);
  }
}

.DocSearch-Button .DocSearch-Button-Placeholder {
  display: none;
  margin-top: 2px;
  padding: 0 16px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

.DocSearch-Button:hover .DocSearch-Button-Placeholder {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Button-Placeholder {
    display: inline-block;
  }
}

.DocSearch-Button .DocSearch-Button-Keys {
  direction: ltr;
  display: none;
  min-width: auto;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Button-Keys {
    display: flex;
    align-items: center;
  }
}

.DocSearch-Button .DocSearch-Button-Key {
  display: block;
  margin: 2px 0 0 0;
  border: 1px solid var(--vp-c-divider);
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding-left: 6px;
  min-width: 0;
  width: auto;
  height: 22px;
  line-height: 22px;
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  box-shadow: none;
  transition: color 0.5s, border-color 0.5s;
}

.DocSearch-Button .DocSearch-Button-Key + .DocSearch-Button-Key {
  border-right: 1px solid var(--vp-c-divider);
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding-left: 2px;
  padding-right: 6px;
}

.DocSearch-Button .DocSearch-Button-Key:first-child {
  font-size: 0 !important;
}

.DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: 'Ctrl';
  font-size: 12px;
  letter-spacing: normal;
  color: var(--vp-c-text-2);
}

.mac .DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: '\2318';
}

.DocSearch-Search-Icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke-width='1.6' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='m14.386 14.386 4.088 4.088-4.088-4.088A7.533 7.533 0 1 1 3.733 3.733a7.533 7.533 0 0 1 10.653 10.653z'/%3E%3C/svg%3E");
}
</style>
