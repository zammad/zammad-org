<script lang="ts">
import { ref } from 'vue'

// Kept while the page is open, so that reopening the search shows the last query.
const lastQuery = ref('')
</script>

<script lang="ts" setup>
/*
 * Search dialog, opened by VPNavBarSearch.vue. A native modal <dialog>: the
 * browser keeps the focus inside, makes the page behind it inert and closes it
 * on Escape. Results come from Typesense, see ./typesense.mts.
 */
import { useData, useRoute, useRouter } from 'vitepress'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { search, type AudienceFilter, type SearchResult } from './typesense.mts'

const emit = defineEmits<{ close: [] }>()

const { theme } = useData()
const route = useRoute()
const router = useRouter()
const { collection, stopwords, translations: t } = theme.value.typesenseSearch

const dialog = ref<HTMLDialogElement>()
const input = ref<HTMLInputElement>()
const list = ref<HTMLElement>()

const query = lastQuery

// The section the reader is in preselects the audience, like the local search
// showed only user pages within the user documentation.
const audience = ref<AudienceFilter>(
  /\/documentation\/use\//.test(route.path) ? 'user' : /\/documentation\/manage\//.test(route.path) ? 'admin' : 'all'
)

const filters: { value: AudienceFilter; label: string }[] = [
  { value: 'all', label: t.filters.all },
  { value: 'user', label: t.filters.user },
  { value: 'admin', label: t.filters.admin },
]

const status = ref<'idle' | 'loading' | 'done' | 'unavailable'>('idle')
const result = ref<SearchResult | null>(null)
const selected = ref(0)

// All hits in display order, for the keyboard navigation.
const hits = computed(() => result.value?.groups.flatMap((g) => g.hits) ?? [])
const indexOf = (url: string) => hits.value.findIndex((h) => h.url === url)

let controller: AbortController | null = null
let timer: ReturnType<typeof setTimeout> | undefined

async function run() {
  const q = query.value.trim()

  controller?.abort()

  if (!q) {
    status.value = 'idle'
    result.value = null
    return
  }

  controller = new AbortController()
  const { signal } = controller
  status.value = 'loading'

  try {
    const next = await search(collection, q, audience.value, { signal, stopwords })

    if (signal.aborted) return

    result.value = next
    selected.value = 0
    status.value = 'done'
  } catch (error) {
    if (signal.aborted) return

    result.value = null
    status.value = 'unavailable'
  }
}

// Synchronous, so that the results count as outdated from the very input on,
// whatever key event follows.
watch(query, () => {
  // The results on screen belong to the previous query: stop its request and
  // mark them as loading, so that Enter cannot open one of them before the
  // results of the new query are in.
  controller?.abort()
  clearTimeout(timer)

  if (query.value.trim()) {
    status.value = 'loading'
  } else {
    status.value = 'idle'
    result.value = null
  }

  timer = setTimeout(run, 150)
}, { flush: 'sync' })

watch(audience, () => run())

function move(step: number) {
  if (!hits.value.length) return

  selected.value = (selected.value + step + hits.value.length) % hits.value.length
  nextTick(() => list.value?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }))
}

function open(url: string) {
  emit('close')
  router.go(url)
}

function onLinkClick(event: MouseEvent, url: string) {
  // Results of the previous query, while the new one is running (see the
  // query watcher): not to be opened.
  if (status.value !== 'done') {
    event.preventDefault()
    return
  }

  // Let the browser handle new tabs and windows.
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return

  event.preventDefault()
  open(url)
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    move(event.key === 'ArrowDown' ? 1 : -1)
  } else if (event.key === 'Enter' && status.value === 'done' && hits.value[selected.value]) {
    event.preventDefault()
    open(hits.value[selected.value].url)
  }
}

function reset() {
  query.value = ''
  input.value?.focus()
}

// Closes on a click on the backdrop, that is on the dialog element itself.
function onDialogClick(event: MouseEvent) {
  if (event.target === dialog.value) emit('close')
}

let overflow = ''

onMounted(() => {
  overflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  dialog.value?.showModal()
  input.value?.select()

  if (query.value.trim()) run()
})

onBeforeUnmount(() => {
  // Closing the modal dialog natively makes the browser return the focus to
  // where it was before, e.g. the search button. Removing it from the page
  // while it is open would leave the focus on the page body.
  if (dialog.value?.open) dialog.value.close()

  controller?.abort()
  clearTimeout(timer)
  document.documentElement.style.overflow = overflow
})
</script>

<template>
  <dialog
    ref="dialog"
    class="SearchDialog"
    :aria-label="t.button.buttonText"
    @cancel.prevent="emit('close')"
    @keydown.esc.prevent="emit('close')"
    @click="onDialogClick"
  >
    <div class="shell">
      <form class="search-bar" role="search" @submit.prevent>
        <label for="search-dialog-input" :title="t.button.buttonText">
          <span aria-hidden="true" class="vpi-search search-icon local-search-icon" />
        </label>
        <div class="search-actions before">
          <button type="button" class="back-button" :title="t.modal.backButtonTitle" @click="emit('close')">
            <span class="vpi-arrow-left local-search-icon" />
          </button>
        </div>
        <input
          id="search-dialog-input"
          ref="input"
          v-model="query"
          class="search-input"
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="search-dialog-results"
          :aria-expanded="hits.length > 0"
          :aria-activedescendant="hits.length ? `search-dialog-hit-${selected}` : undefined"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          enterkeyhint="go"
          maxlength="100"
          spellcheck="false"
          :placeholder="t.button.buttonText"
          @keydown="onInputKeydown"
        />
        <div class="search-actions">
          <button
            type="button"
            class="clear-button"
            :title="t.modal.resetButtonTitle"
            :disabled="!query"
            @click="reset"
          >
            <span class="vpi-delete local-search-icon" />
          </button>
        </div>
      </form>

      <div class="filters" role="radiogroup" :aria-label="t.filters.label">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          role="radio"
          class="filter"
          :aria-checked="audience === filter.value"
          :disabled="filter.value !== 'all' && result !== null && result.counts[filter.value] === 0"
          @click="audience = filter.value"
        >
          {{ filter.label }}
          <span v-if="result" class="count">{{ result.counts[filter.value] }}</span>
        </button>
      </div>

      <ul
        id="search-dialog-results"
        ref="list"
        class="results"
        role="listbox"
        :aria-label="t.button.buttonText"
        :aria-busy="status === 'loading'"
      >
        <li v-for="group in result?.groups ?? []" :key="group.pageUrl" role="group" :aria-label="group.path.join(' › ')">
          <div class="page" aria-hidden="true">
            <template v-for="(part, i) in group.path" :key="i">
              <span v-if="i > 0" class="vpi-chevron-right separator" />
              <span :class="{ title: i === group.path.length - 1 }">{{ part }}</span>
            </template>
          </div>
          <ul role="none">
            <li
              v-for="hit in group.hits"
              :id="`search-dialog-hit-${indexOf(hit.url)}`"
              :key="hit.url"
              role="option"
              :aria-selected="selected === indexOf(hit.url)"
            >
              <a
                :href="hit.url"
                class="result"
                :class="{ selected: selected === indexOf(hit.url) }"
                tabindex="-1"
                @mousemove="selected = indexOf(hit.url)"
                @click="onLinkClick($event, hit.url)"
              >
                <div class="titles">
                  <span class="title-icon">#</span>
                  <template v-if="hit.path.length > 1">
                    <span v-for="(parent, i) in hit.path.slice(0, -1)" :key="i" class="parent">
                      {{ parent }}<span class="vpi-chevron-right separator" />
                    </span>
                  </template>
                  <span class="heading" v-html="hit.heading" />
                </div>
                <div v-if="hit.snippet" class="excerpt" v-html="hit.snippet" />
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <p v-if="status === 'done' && !hits.length" class="message">
        {{ t.modal.noResultsText }} "<strong>{{ query }}</strong>"
      </p>
      <p v-else-if="status === 'unavailable'" class="message" role="alert">
        {{ t.modal.unavailableText }}
      </p>

      <div class="search-keyboard-shortcuts" aria-hidden="true">
        <span>
          <kbd :aria-label="t.modal.footer.navigateUpKeyAriaLabel"><span class="vpi-arrow-up navigate-icon" /></kbd>
          <kbd :aria-label="t.modal.footer.navigateDownKeyAriaLabel"><span class="vpi-arrow-down navigate-icon" /></kbd>
          {{ t.modal.footer.navigateText }}
        </span>
        <span>
          <kbd :aria-label="t.modal.footer.selectKeyAriaLabel"><span class="vpi-corner-down-left navigate-icon" /></kbd>
          {{ t.modal.footer.selectText }}
        </span>
        <span>
          <kbd :aria-label="t.modal.footer.closeKeyAriaLabel">esc</kbd>
          {{ t.modal.footer.closeText }}
        </span>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
/* Based on VitePress's VPLocalSearchBox, so that the search looks as before. */
.SearchDialog {
  margin: 64px auto auto;
  border: 0;
  padding: 0;
  background: transparent;
  max-width: none;
  max-height: none;
  overflow: visible;
}

.SearchDialog::backdrop {
  background: var(--vp-backdrop-bg-color);
}

.shell {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--vp-local-search-bg);
  color: var(--vp-c-text-1);
  width: min(100vw - 60px, 900px);
  max-height: min(100vh - 128px, 900px);
  border-radius: 6px;
}

@media (max-width: 767px) {
  .SearchDialog {
    margin: 0;
  }

  .shell {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: none;
    border-radius: 0;
  }
}

.search-bar {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  cursor: text;
}

.search-bar:focus-within {
  border-color: var(--vp-c-brand-1);
}

.local-search-icon {
  display: block;
  font-size: 18px;
}

.navigate-icon {
  display: block;
  font-size: 14px;
}

.search-icon {
  margin: 8px;
}

.search-input {
  padding: 6px 12px;
  font-size: inherit;
  width: 100%;
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

@media (max-width: 767px) {
  .search-bar {
    padding: 0 8px;
  }

  .search-icon {
    display: none;
  }

  .search-input {
    padding: 6px 4px;
  }
}

.search-actions {
  display: flex;
  gap: 4px;
}

@media (min-width: 768px) {
  .search-actions.before {
    display: none;
  }
}

.search-actions button {
  padding: 8px;
}

.search-actions button:not([disabled]):hover {
  color: var(--vp-c-brand-1);
}

.search-actions button:disabled {
  opacity: 0.37;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 2px 12px;
  font-size: 0.8rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.filter:not(:disabled):hover,
.filter[aria-checked='true'] {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter:disabled {
  opacity: 0.5;
  cursor: default;
}

.count {
  font-size: 0.7rem;
  opacity: 0.75;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.results:empty {
  display: none;
}

/* Results of the previous query, while the new one is running: visible, so
   that the list does not flicker while typing, but not to be opened. */
.results[aria-busy='true'] {
  opacity: 0.6;
  pointer-events: none;
}

.results ul {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.page {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.page .title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.separator {
  display: inline-block;
  font-size: 0.8rem;
  opacity: 0.5;
  vertical-align: middle;
}

.result {
  display: block;
  padding: 10px 12px;
  border-radius: 4px;
  border: solid 2px var(--vp-local-search-result-border);
  color: inherit;
  text-decoration: none;
  outline: none;
  overflow: hidden;
}

.result.selected {
  border-color: var(--vp-local-search-result-selected-border);
}

.titles {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  line-height: 1.25rem;
}

.title-icon {
  opacity: 0.5;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.parent {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-text-2);
}

.heading {
  font-weight: 500;
}

.result.selected .titles,
.result.selected .title-icon {
  color: var(--vp-c-brand-1);
}

.excerpt {
  margin-top: 4px;
  font-size: 0.8rem;
  line-height: 1.3;
  /* At most three lines. */
  max-height: 3.9em;
  overflow: hidden;
  white-space: normal;
  overflow-wrap: anywhere;
  color: var(--vp-c-text-2);
}

.result.selected .excerpt {
  color: var(--vp-c-text-1);
}

.titles :deep(mark),
.excerpt :deep(mark) {
  background-color: var(--vp-local-search-highlight-bg);
  color: var(--vp-local-search-highlight-text);
  border-radius: 2px;
  padding: 0 2px;
}

.message {
  margin: 0;
  padding: 12px;
  font-size: 0.9rem;
  text-align: center;
}

.search-keyboard-shortcuts {
  font-size: 0.8rem;
  opacity: 75%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  line-height: 14px;
}

.search-keyboard-shortcuts span {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 767px) {
  .search-keyboard-shortcuts {
    display: none;
  }
}

.search-keyboard-shortcuts kbd {
  background: rgba(128, 128, 128, 0.1);
  border-radius: 4px;
  padding: 3px 6px;
  min-width: 24px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid rgba(128, 128, 128, 0.15);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
</style>
