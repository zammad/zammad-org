# frozen_string_literal: true

module ZammadDocsMcp
  # Searches the documentation the way the site does (see
  # .vitepress/theme/search/typesense.mts): the same fields and weights, one
  # group per page, the stop words of the language. Every result is one
  # section of a page and carries what is needed to cite it.
  #
  # With `fallback`, a language other than English is searched together with
  # English in one request. The English results are only used when the
  # requested language has none, and they are marked as such: a German
  # question is answered from German content whenever there is some, and an
  # English answer is never passed off as a German one.
  class Search
    SECTIONS = %w[
      get-started documentation documentation/use documentation/manage reference tutorials contribute general
    ].freeze
    AUDIENCES = %w[user admin general].freeze
    MAX_LIMIT = 20
    MAX_QUERY_LENGTH = 200

    SNIPPET_LENGTH = 300

    # Highlight markers from the Unicode private use area, removed from the snippets.
    MARK_START = "\u{E000}"
    MARK_END = "\u{E001}"

    QUERY = {
      query_by: 'heading,breadcrumb,content,keywords',
      query_by_weights: '4,2,1,1',
      group_by: 'page_url',
      group_limit: 3,
      include_fields: 'url,page_url,title,heading,breadcrumb,content,locale,section,audience,level',
      highlight_fields: 'content',
      highlight_affix_num_tokens: 20,
      highlight_start_tag: MARK_START,
      highlight_end_tag: MARK_END
    }.freeze

    def initialize(context)
      @context = context
    end

    # Returns the structured result: the query, the language, the number of
    # matching sections in it, the fallback language if one was used and the
    # results, best first.
    def call(query:, locale:, limit: 5, fallback: true, **filters)
      raise ArgumentError, "the documentation is not available in #{locale.inspect}" unless content.locale?(locale)

      limit = limit.clamp(1, MAX_LIMIT)
      query = query.to_s.strip[0, MAX_QUERY_LENGTH]
      locales = fallback ? [locale, FALLBACK_LOCALE].uniq.select { |l| content.locale?(l) } : [locale]
      responses = @context.typesense.multi_search(locales.map { |l| params(l, query, filters, limit) })
      results, fallback_locale = results_of(responses, limit)

      { query:, locale:, found: responses[0]['found'] || 0, fallback_locale:, results: }
    end

    private

    def content = @context.content

    # Typesense search of one language. `section` and `audience` come from the
    # enums of the tool's input schema.
    def params(locale, query, filters, limit)
      settings = content.search_settings(locale)

      QUERY.merge(
        collection: settings.fetch('collection'),
        q: query.empty? ? '*' : query,
        per_page: limit,
        filter_by: filters.compact.map { |field, value| "#{field}:=`#{value}`" }.join(' && '),
        **(settings['stopwords'] ? { stopwords: settings['stopwords'] } : {})
      )
    end

    # Results of the requested language, or English ones if it has none; and
    # the language of those, if any. Adding English results to a few in the
    # requested language would mostly add noise: the pages are translations.
    def results_of(responses, limit)
      results = hits(responses[0], limit).map { |hit| result(hit, fallback: false) }
      return [results, nil] if responses.size == 1 || results.any?

      english = hits(responses[1], limit).map { |hit| result(hit, fallback: true) }
      english.empty? ? [results, nil] : [english, FALLBACK_LOCALE]
    end

    # The sections of the result groups, best page first, at most `limit`.
    def hits(response, limit)
      (response['grouped_hits'] || []).flat_map { |group| group['hits'] }.first(limit)
    end

    def result(hit, fallback:)
      document = hit['document']

      {
        url: @context.config.absolute_url(document['url']),
        page_url: @context.config.absolute_url(document['page_url']),
        title: document['title'],
        heading: document['heading'],
        breadcrumb: document['breadcrumb'] || [],
        locale: document['locale'],
        section: document['section'],
        audience: document['audience'],
        snippet: snippet(hit),
        fallback:
      }
    end

    def snippet(hit)
      highlighted = (hit['highlights'] || []).find { |h| h['field'] == 'content' }&.dig('snippet')
      text = highlighted || hit.dig('document', 'content').to_s

      text = text.delete(MARK_START).delete(MARK_END).gsub(/\s+/, ' ').strip
      return text if text.length <= SNIPPET_LENGTH

      "#{text[0, SNIPPET_LENGTH].sub(/\s+\S*\z/, '')} …"
    end
  end
end
