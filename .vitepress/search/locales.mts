/*
 * Languages of the site, in the order of its language switcher. The one place
 * that lists them: `config.mts` builds an app per entry, and the indexer and
 * ./check.mts refuse a build that is missing one, so that a locale cannot drop
 * out of the search unnoticed.
 */
export const supportedLocales: string[] = ['en', 'de', 'sr', 'it', 'pt_BR', 'cs']
