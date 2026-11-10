# frozen_string_literal: true

module ZammadDocsMcp
  module Tools
    # Searches the documentation, see `Search`.
    class SearchDocs < Base
      RESULT = {
        type: 'object',
        required: %w[url page_url title heading breadcrumb locale section audience snippet fallback],
        properties: {
          url: { type: 'string', description: 'Canonical URL of the section, with its anchor; cite this.' },
          page_url: { type: 'string', description: 'URL of the whole page.' },
          title: { type: 'string', description: 'Page title.' },
          heading: { type: 'string', description: 'Section heading; the page title for the page intro.' },
          breadcrumb: { type: 'array', items: { type: 'string' },
                        description: 'Site section, page title and parent headings.' },
          locale: { type: 'string', description: 'Language of the result.' },
          section: { type: 'string', enum: Search::SECTIONS },
          audience: { type: 'string', enum: Search::AUDIENCES },
          snippet: { type: 'string', description: 'Excerpt of the section around the match.' },
          fallback: { type: 'boolean', description: 'In English, because the requested language had no results.' }
        }
      }.freeze

      tool_name 'search_docs'
      title 'Search the Zammad documentation'
      description <<~TEXT
        Searches the Zammad documentation and returns matching sections, best first, each with a canonical URL
        that links to the section. Use it to answer questions about using, administering, installing and
        integrating Zammad. Cite the `url` of every result you use. Read a whole page with `get_page`.
      TEXT
      input_schema(
        properties: {
          query: { type: 'string', minLength: 1, maxLength: Search::MAX_QUERY_LENGTH,
                   description: 'What to look for, in the language of `locale`; keywords work best.' },
          locale: LOCALE,
          section: { type: 'string', enum: Search::SECTIONS,
                     description: 'Only this part of the site, e.g. documentation/use (user documentation), ' \
                                  'documentation/manage (administration), get-started (installation), reference.' },
          audience: { type: 'string', enum: Search::AUDIENCES,
                      description: 'Only pages for this audience: user (agents and customers), admin, general.' },
          limit: { type: 'integer', minimum: 1, maximum: Search::MAX_LIMIT, default: 5,
                   description: 'Maximum number of results.' },
          fallback: FALLBACK
        },
        required: ['query']
      )
      output_schema(
        type: 'object',
        required: %w[query locale found fallback_locale results],
        properties: {
          query: { type: 'string' },
          locale: { type: 'string' },
          found: { type: 'integer', description: 'Matching sections in the requested language.' },
          fallback_locale: { type: %w[string null], description: 'Language of the fallback results, if any.' },
          results: { type: 'array', items: RESULT }
        }
      )

      class << self
        private

        def run(query:, server_context:, locale: FALLBACK_LOCALE, section: nil, audience: nil, limit: 5,
                fallback: true)
          result = Search.new(docs(server_context)).call(query:, locale:, section:, audience:, limit:, fallback:)

          respond(result, render(result))
        rescue Typesense::Error
          failure('The documentation search is unavailable right now. Try again later.')
        rescue ArgumentError => e
          failure(e.message)
        end

        def log_entry(arguments, structured)
          {
            locale: arguments.fetch(:locale, FALLBACK_LOCALE), filters: arguments.slice(:section, :audience, :limit),
            results: structured.fetch(:results, []).size, fallback: !structured[:fallback_locale].nil?
          }
        end

        def render(result)
          count = result[:results].size
          lines = ["#{count} #{count == 1 ? 'result' : 'results'} for #{result[:query].inspect} (#{result[:locale]})."]

          if result[:fallback_locale]
            lines << "No results in #{result[:locale]}; results marked [#{result[:fallback_locale]}] are " \
                     'from the English documentation.'
          end

          result[:results].each_with_index do |r, i|
            marker = r[:fallback] ? " [#{r[:locale]}]" : ''
            lines << '' << "#{i + 1}. #{[r[:title], r[:heading]].uniq.join(' › ')}#{marker}" << "   #{r[:url]}"
            lines << "   #{r[:snippet]}" unless r[:snippet].empty?
          end

          lines.join("\n")
        end
      end
    end
  end
end
