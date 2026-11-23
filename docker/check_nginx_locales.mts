/*
 * Keeps the language lists of the nginx config in step with the site's list,
 * `.vitepress/search/locales.mts`.
 *
 * nginx cannot interpolate a variable into a `location` or `rewrite` pattern,
 * so three places have to spell the languages out: the `$request_lang` map
 * (the 404 page of an app), the collapse of `/<app>/<language>/…` links, and
 * the `$accept_lang` and `$lang` maps (the app of a browser's language). A
 * language added to the site without them is served by the wrong app, or not
 * at all, and nobody notices until a reader does. This fails instead.
 *
 * The other locations match the language prefix as a pattern, so it also
 * fails on a top-level page or folder that is named like a language.
 *
 *   pnpm check:nginx
 */
import { readdirSync, readFileSync } from 'node:fs'
import { supportedLocales } from '../.vitepress/search/locales.mts'

const conf = readFileSync(new URL('./nginx/conf.d/default.conf', import.meta.url), 'utf8').split('\n')

/*
 * The languages of a line: its one group that is nothing but an alternation
 * (`(en|de|…|cs)`, or the named group of a map key). Their order does not
 * matter to nginx, only the set does.
 */
function languagesOn(line: string | undefined, where: string): string[] {
  for (const [, group] of (line ?? '').matchAll(/\(([^()]+)\)/g)) {
    const languages = group.replace(/^\?(?:<[A-Za-z_]+>|:)/, '')

    if (/^[A-Za-z_]+(?:\|[A-Za-z_]+)+$/.test(languages)) return languages.split('|')
  }

  throw new Error(`docker/nginx/conf.d/default.conf: no language list in ${where}`)
}

type MapEntry = { key: string; value: string }

/* The entries of a `map` block, by the variable it sets. */
function mapEntries(variable: string): MapEntry[] {
  const start = conf.findIndex(
    (line: string) => /^map \S+ \S+\s*\{$/.test(line) && line.split(/\s+/)[2] === `$${variable}`
  )
  if (start < 0) throw new Error(`docker/nginx/conf.d/default.conf: no map for ${variable}`)

  const entries: MapEntry[] = []
  for (const line of conf.slice(start + 1)) {
    if (line.trim() === '}') return entries
    const entry = line.trim().match(/^("[^"]*"|\S+)\s+(\S+);$/)
    if (entry) entries.push({ key: entry[1].replace(/^"(.*)"$/, '$1'), value: entry[2] })
  }
  throw new Error(`docker/nginx/conf.d/default.conf: unterminated map for ${variable}`)
}

/*
 * The value nginx gives a map for an input: an exact key (ignoring case), else
 * the first regex that matches (`$name` taken from its named groups), else the
 * default.
 */
function lookUp(entries: MapEntry[], input: string): string {
  const fill = (value: string, groups: Record<string, string> = {}) =>
    value.replace(/^\$(\w+)$/, (_, name: string) => groups[name] ?? '')
  const exact = entries.find(
    ({ key }) => !key.startsWith('~') && key !== 'default' && key.toLowerCase() === input.toLowerCase()
  )
  if (exact) return fill(exact.value)

  for (const { key, value } of entries.filter(({ key }) => key.startsWith('~'))) {
    const match = new RegExp(key.replace(/^~\*?/, ''), key.startsWith('~*') ? 'i' : '').exec(input)
    if (match) return fill(value, match.groups)
  }

  return fill(entries.find(({ key }) => key === 'default')?.value ?? '')
}

/*
 * The languages a browser is sent to: a locale counts when its tag, after one
 * we have no app for, comes out of `$accept_lang` and `$lang` as that locale.
 * Any other app `$lang` names is unknown.
 */
function detectedLanguages(): string[] {
  const acceptLang = mapEntries('accept_lang')
  const lang = mapEntries('lang')
  const detected = (locale: string) => lookUp(lang, lookUp(acceptLang, `xx,${locale.replace('_', '-')};q=0.9`))

  return [
    ...supportedLocales.filter((locale) => detected(locale) === locale),
    ...new Set(lang.map(({ value }) => value).filter((value) => !supportedLocales.includes(value))),
  ]
}

const lists = [
  {
    where: 'the $request_lang map',
    languages: languagesOn(conf.find((line: string) => line.includes('(?<app_lang>')), 'the $request_lang map'),
  },
  {
    where: 'the collapse of prefixed links',
    languages: languagesOn(
      conf.find((line: string) => line.includes('rewrite "^(/[a-z]{2}')),
      'the collapse of prefixed links'
    ),
  },
  {
    where: 'the $accept_lang and $lang maps',
    languages: detectedLanguages(),
  },
]

let failed = false

for (const { where, languages } of lists) {
  const missing = supportedLocales.filter((locale) => !languages.includes(locale))
  const extra = languages.filter((locale) => !supportedLocales.includes(locale))

  if (!missing.length && !extra.length) continue

  failed = true
  console.error(`docker/nginx/conf.d/default.conf ${where}:`)
  if (missing.length) console.error(`  missing ${missing.join(', ')} (see .vitepress/search/locales.mts)`)
  if (extra.length) console.error(`  unknown ${extra.join(', ')} (see .vitepress/search/locales.mts)`)
}

/*
 * The app locations take any two letters with an optional region (`/xx/`,
 * `/xx_YY/`) for a language, so a top-level page or folder named like that is
 * not redirected to the detected language when linked without a prefix, but
 * answered with a 404. The top level of an app is that of the English sources
 * (the translations mirror them), of `src/public` and of the shared tree.
 */
const languageLike = /^[a-z]{2}(?:_[A-Z]{2})?$/

for (const dir of ['src', 'src/en', 'src/public']) {
  const clashes = readdirSync(new URL(`../${dir}/`, import.meta.url))
    .map((name) => name.replace(/\.md$/, ''))
    .filter((name) => languageLike.test(name) && !supportedLocales.includes(name))

  if (!clashes.length) continue

  failed = true
  console.error(`${dir}: ${clashes.join(', ')} named like a language, nginx answers their unprefixed links with a 404`)
}

if (failed) process.exit(1)

console.log(
  `nginx lists ${supportedLocales.join(', ')} in ${lists.length} places, all match .vitepress/search/locales.mts`
)
