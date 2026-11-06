/*
 * Pushes the search documents from `search-index/<locale>.jsonl` (written by
 * the build, see ./extract.mts) to Typesense.
 *
 *   TYPESENSE_URL=http://localhost:8108 TYPESENSE_ADMIN_KEY=… pnpm search:index [locale…]
 *
 * Without locales, every file in `search-index/` is indexed. All or nothing:
 *
 * 1. Every locale is loaded into a new collection `docs_<locale>_<version>`,
 *    with the relevance settings of `relevance/<locale>.json` (synonyms,
 *    pinned results, stop words; see ./relevance.mts), and the new collections
 *    are checked (./verify.mts). A rejected document, a missing one, a pin to
 *    an unknown URL or a failed check fails the run, and the new collections
 *    are dropped again — the live search stays untouched. `--no-checks` skips
 *    the checks, for trying out relevance settings locally.
 * 2. Only when all locales are complete, the aliases `docs_<locale>` are
 *    switched to the new collections. The search queries the aliases only.
 * 3. Of the older collections of a locale, the previous one is kept for a
 *    rollback (point the alias back to it), all others are deleted.
 *
 * With `TYPESENSE_SEARCH_KEY`, the run also makes sure that this key exists
 * and can search the aliases — nothing else. nginx adds it to the searches of
 * the browsers, see docker/nginx/conf.d/default.conf.
 *
 * Finally, Typesense writes a snapshot, so that the new index survives a
 * restart (see `snapshot`).
 *
 * Plain `fetch` against the Typesense HTTP API, run with Node's type stripping.
 * See https://github.com/zammad/zammad-org/issues/242.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { keywordsOf, loadRelevance, type Relevance } from './relevance.mts'
import { verifyLocale } from './verify.mts'
import { aliasName, collectionPrefix, collectionSchema, typesenseLocale, type SearchDocument } from './schema.mts'

const env = process.env
const url = (env.TYPESENSE_URL || 'http://localhost:8108').replace(/\/$/, '')
const apiKey = env.TYPESENSE_ADMIN_KEY
const searchKey = env.TYPESENSE_SEARCH_KEY
const indexDir = resolve(env.SEARCH_INDEX_DIR || 'search-index')
// Unique per run (UTC, to the millisecond); sorts chronologically, which the cleanup relies on.
const version = new Date().toISOString().replace(/\D/g, '').slice(0, 17)

interface Collection {
  name: string
  num_documents: number
  created_at: number
}

async function typesense<T>(method: string, path: string, body?: unknown, key = apiKey): Promise<T> {
  const response = await fetch(url + path, {
    method,
    headers: {
      'X-TYPESENSE-API-KEY': key!,
      'Content-Type': typeof body === 'string' ? 'text/plain' : 'application/json',
    },
    body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
  })
  const text = await response.text()

  if (!response.ok) {
    throw new Error(`Typesense ${method} ${path} failed with ${response.status}: ${text}`)
  }

  return (path.includes('/documents/import') ? text : JSON.parse(text)) as T
}

const args = process.argv.slice(2)
const runChecks = !args.includes('--no-checks')

function localesToIndex(): string[] {
  const requested = args.filter((arg) => !arg.startsWith('--'))

  if (requested.length) return requested

  const found = readdirSync(indexDir)
    .filter((file: string) => file.endsWith('.jsonl'))
    .map((file: string) => basename(file, '.jsonl'))
    .sort()

  if (!found.length) throw new Error(`No search documents in ${indexDir} — run \`pnpm build\` first`)

  return found
}

/** Curation set of a locale: the pinned results, by document ID. */
function curationItems(locale: string, relevance: Relevance, idOf: Map<string, string>) {
  return relevance.pinned.map((pin, i) => ({
    id: `pinned-${i}`,
    rule: { query: pin.query, match: pin.match ?? 'exact' },
    includes: pin.urls.map((url, position) => {
      const id = idOf.get(url)

      if (!id) throw new Error(`${locale}: pinned URL ${url} is not in the index (relevance/${locale}.json)`)

      return { id, position: position + 1 }
    }),
  }))
}

/**
 * Creates and fills the collection of a locale; returns its name. The pinned
 * results are a curation set of the same name, linked to the collection: they
 * switch (and roll back) together with it. Synonyms become the `keywords` of
 * the documents, see ./relevance.mts.
 */
async function load(locale: string): Promise<string> {
  const lines: string[] = readFileSync(resolve(indexDir, `${locale}.jsonl`), 'utf8').split('\n').filter(Boolean)
  const name = `${collectionPrefix(locale)}${version}`
  const relevance = loadRelevance(locale)
  const documents = lines.map((line) => {
    const d = JSON.parse(line) as SearchDocument
    const keywords = keywordsOf(relevance, [d.heading, ...d.breadcrumb, d.content].join(' '))

    return keywords.length ? { ...d, keywords } : d
  })
  const idOf = new Map(documents.map((d): [string, string] => [d.url, d.id]))

  await typesense('PUT', `/curation_sets/${name}`, { items: curationItems(locale, relevance, idOf) })
  await typesense('POST', '/collections', { ...collectionSchema(locale, name), curation_sets: [name] })

  const body = documents.map((d) => JSON.stringify(d)).join('\n')
  const results = (await typesense<string>('POST', `/collections/${name}/documents/import?action=create&return_id=true`, body))
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as { success: boolean; error?: string; id?: string })

  const failed = results.filter((r) => !r.success)

  if (failed.length) {
    const urlOf = new Map(documents.map((d): [string, string] => [d.id, d.url]))
    const sample = failed.slice(0, 5).map((r) => `  ${urlOf.get(r.id) ?? r.id}: ${r.error}`).join('\n')
    throw new Error(`${locale}: ${failed.length} of ${lines.length} documents rejected\n${sample}`)
  }

  const { num_documents } = await typesense<Collection>('GET', `/collections/${name}`)

  if (num_documents !== lines.length) {
    throw new Error(`${locale}: ${num_documents} documents in Typesense, expected ${lines.length}`)
  }

  console.log(
    `${locale}: ${num_documents} documents loaded into ${name}` +
      ` (${documents.filter((d) => 'keywords' in d).length} with synonyms, ${relevance.pinned.length} pinned,` +
      ` ${relevance.stopwords.length} stop words)`
  )

  return name
}

/** Deletes all collections of the locale except the aliased one and the one before it. */
async function cleanUp(locale: string, current: string, collections: Collection[]) {
  const older = collections
    .filter((c) => c.name.startsWith(collectionPrefix(locale)) && c.name < current)
    .sort((a, b) => b.name.localeCompare(a.name))

  for (const c of older.slice(1)) {
    await drop(c.name)
    console.log(`${locale}: deleted ${c.name}`)
  }

  if (older[0]) console.log(`${locale}: kept ${older[0].name} for a rollback`)
}

/** Deletes a collection and its sets; whatever does not exist is skipped. */
async function drop(name: string) {
  for (const path of [`/collections/${name}`, `/curation_sets/${name}`, `/stopwords/${name}`]) {
    await typesense('DELETE', path).catch(() => {})
  }
}

/** Waits for Typesense to be up, e.g. a service container that is still starting in CI. */
async function waitUntilHealthy(timeoutSeconds = 60) {
  for (let second = 0; second < timeoutSeconds; second++) {
    const healthy = await typesense<{ ok: boolean }>('GET', '/health').then((h) => h.ok).catch(() => false)

    if (healthy) return

    await new Promise((done) => setTimeout(done, 1000))
  }

  throw new Error(`Typesense at ${url} is not healthy after ${timeoutSeconds}s`)
}

async function main() {
  if (!apiKey) throw new Error('TYPESENSE_ADMIN_KEY is not set')

  const locales = localesToIndex()

  await waitUntilHealthy()

  const loaded = new Map<string, string>()

  try {
    for (const locale of locales) loaded.set(locale, await load(locale))

    // Stop words of the new collections, in a set of their own name for the
    // checks below; the live set (named like the alias) is only replaced when
    // the aliases switch. Typesense rejects an empty set.
    for (const [locale, name] of loaded) {
      const { stopwords } = loadRelevance(locale)

      if (stopwords.length) {
        await typesense('PUT', `/stopwords/${name}`, { stopwords, locale: typesenseLocale(locale) })
      }
    }

    // Check the new collections before any alias points to them. The admin key,
    // because the search-only key may not exist yet (first run).
    if (runChecks) {
      const failures: string[] = []

      for (const [locale, name] of loaded) {
        const result = await verifyLocale(locale, { collection: name, url, key: apiKey!, indexDir, stopwords: name })

        console.log(`${locale}: ${result.queries} queries checked`)
        failures.push(...result.failures)
      }

      if (failures.length) {
        throw new Error(`${failures.length} check(s) failed:\n${failures.map((f) => `  ${f}`).join('\n')}`)
      }
    }
  } catch (error) {
    // Leave no half-filled collection behind; the aliases were not touched.
    const created = [...loaded.values(), ...locales.map((l) => `${collectionPrefix(l)}${version}`)]

    for (const name of new Set(created)) await drop(name)

    throw error
  }

  for (const [locale, name] of loaded) {
    // The search names the stop word set of its alias in its queries when the
    // locale has stop words (see `typesenseSearch` in ../config.mts). A set
    // that is no longer configured is left in place, for the site that is
    // still live.
    const { stopwords } = loadRelevance(locale)

    if (stopwords.length) {
      await typesense('PUT', `/stopwords/${aliasName(locale)}`, { stopwords, locale: typesenseLocale(locale) })
    }

    await typesense('PUT', `/aliases/${aliasName(locale)}`, { collection_name: name })
    console.log(`${locale}: ${aliasName(locale)} → ${name}`)
  }

  const collections = await typesense<Collection[]>('GET', '/collections')

  for (const [locale, name] of loaded) await cleanUp(locale, name, collections)

  if (searchKey) await ensureSearchKey(aliasName(locales[0]))

  await snapshot()
}

/**
 * Makes Typesense write a snapshot of its data. On start, Typesense restores
 * the last snapshot and replays the changes since; without a snapshot, the
 * replay can lose the latest changes (seen with 30.2: after a restart, the
 * alias pointed to a collection that was gone). Taken after every run, so that
 * a restart right after a deploy keeps the new index. The path is inside the
 * Typesense container, where Typesense copies the snapshot to; /tmp is
 * writable in every setup (a tmpfs in docker-compose.yml).
 */
async function snapshot() {
  await typesense('POST', `/operations/snapshot?snapshot_path=${encodeURIComponent('/tmp/typesense-snapshot')}`)
}

/** Whether the search-only key can search the given alias. */
async function searchKeyWorks(alias: string): Promise<boolean> {
  const search = { searches: [{ collection: alias, q: '*', per_page: 0 }] }
  const result = await typesense<{ results: { error?: string }[] }>('POST', '/multi_search', search, searchKey)
    .catch(() => null)

  return Boolean(result && !result.results[0]?.error)
}

/**
 * Creates the search-only key with the configured value unless it works
 * already. Typesense accepts a given value for a new key, so the same value can
 * live in the CI variables and in the nginx configuration.
 */
async function ensureSearchKey(alias: string) {
  if (await searchKeyWorks(alias)) return

  await typesense('POST', '/keys', {
    value: searchKey,
    description: 'Search-only key of the website, added by nginx to the searches of browsers',
    actions: ['documents:search'],
    collections: ['docs_.*'],
  })

  if (!(await searchKeyWorks(alias))) throw new Error('The search-only key was created, but cannot search')

  console.log('Created the search-only key')
}

main().catch((error) => {
  console.error(`Search indexing failed: ${error.message}`)
  process.exit(1)
})
