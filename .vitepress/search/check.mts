/*
 * Checks the live search index the way the site queries it: through the
 * aliases, with the search-only key. See ./verify.mts for what is checked; the
 * indexer runs the same checks on new collections before switching to them.
 *
 *   TYPESENSE_URL=… TYPESENSE_SEARCH_KEY=… pnpm search:check [locale…]
 *
 * Without locales, every file in `search-index/` is checked. Fails with a list
 * of what did not hold.
 */
import { readdirSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { aliasName } from './schema.mts'
import { verifyLocale } from './verify.mts'

const env = process.env
const url = env.TYPESENSE_URL || 'http://localhost:8108'
const searchKey = env.TYPESENSE_SEARCH_KEY
const indexDir = resolve(env.SEARCH_INDEX_DIR || 'search-index')

function localesToCheck(): string[] {
  const requested = process.argv.slice(2)

  if (requested.length) return requested

  return readdirSync(indexDir)
    .filter((file: string) => file.endsWith('.jsonl'))
    .map((file: string) => basename(file, '.jsonl'))
    .sort()
}

async function main() {
  if (!searchKey) throw new Error('TYPESENSE_SEARCH_KEY is not set')

  const failures: string[] = []

  for (const locale of localesToCheck()) {
    const result = await verifyLocale(locale, { collection: aliasName(locale), url, key: searchKey, indexDir })

    console.log(`${locale}: ${result.queries} queries checked`)
    failures.push(...result.failures)
  }

  if (failures.length) {
    throw new Error(`${failures.length} check(s) failed:\n${failures.map((f) => `  ${f}`).join('\n')}`)
  }
}

main().catch((error) => {
  console.error(`Search check failed: ${error.message}`)
  process.exit(1)
})
