# frozen_string_literal: true

module ZammadDocsMcp
  module Tools
    # A page of the documentation as Markdown, see `Pages`.
    class GetPage < Base
      tool_name 'get_page'
      title 'Read a page of the Zammad documentation'
      description <<~TEXT
        Returns a page of the Zammad documentation as Markdown, with its canonical URL, title, language and last
        change. Pass a URL from `search_docs` or `list_sections`, or a path like `documentation/use/guides/search`.
        A URL with an anchor (`…/search.html#basic-search`) returns only that section; `sections` lists the
        anchors of the page. Very long pages are cut at a heading (`truncated`); read them section by section.
      TEXT
      input_schema(
        properties: {
          page: { type: 'string', minLength: 1, maxLength: 500,
                  description: 'URL or path of the page, optionally with an anchor for one section.' },
          locale: LOCALE.merge(description: "#{LOCALE[:description]} Defaults to the language of the URL."),
          fallback: FALLBACK
        },
        required: ['page']
      )
      output_schema(
        type: 'object',
        required: %w[url markdown_url title breadcrumb locale section audience last_updated fallback anchor
                     truncated sections markdown],
        properties: {
          url: { type: 'string', description: 'Canonical URL of the page, with the anchor of the section if one was ' \
                                              'requested; cite this.' },
          markdown_url: { type: 'string', description: 'URL of the Markdown version of the page.' },
          title: { type: 'string' },
          breadcrumb: { type: 'array', items: { type: 'string' }, description: 'Sidebar groups above the page.' },
          locale: { type: 'string' },
          section: { type: 'string' },
          audience: { type: 'string' },
          last_updated: { type: %w[string null], description: 'Last change of the page, ISO 8601.' },
          fallback: { type: 'boolean', description: 'In English, because the page does not exist in the language.' },
          anchor: { type: %w[string null], description: 'Anchor of the returned section; null for the whole page.' },
          truncated: { type: 'boolean', description: 'The Markdown was cut at a heading because of its length.' },
          sections: {
            type: 'array', description: 'Sections of the page; pass a URL with one of the anchors to read one.',
            items: { type: 'object', required: %w[heading anchor level],
                     properties: { heading: { type: 'string' }, anchor: { type: 'string' },
                                   level: { type: 'integer' } } }
          },
          markdown: { type: 'string' }
        }
      )

      class << self
        private

        def run(page:, server_context:, locale: nil, fallback: true)
          context = docs(server_context)
          found = Pages.new(context).find(page, locale:, fallback:)
          return failure(not_found(page)) unless found

          result = structured(context.config, found)
          respond(result, render(result, page))
        end

        def log_entry(arguments, structured)
          {
            locale: structured[:locale] || arguments[:locale], filters: {},
            results: structured.empty? ? 0 : 1, fallback: structured[:fallback] == true
          }
        end

        def structured(config, page)
          entry = page.entry
          url = config.absolute_url(entry['url'])

          {
            url: page.anchor ? "#{url}##{page.anchor}" : url,
            markdown_url: config.absolute_url("/#{page.locale}/#{entry['markdown']}"),
            title: entry['title'],
            breadcrumb: entry['breadcrumb'],
            locale: page.locale,
            section: entry['section'],
            audience: entry['audience'],
            last_updated: entry['lastUpdated'],
            fallback: page.fallback,
            anchor: page.anchor,
            truncated: page.truncated,
            sections: entry.fetch('sections', []),
            markdown: page.markdown
          }
        end

        def render(result, requested)
          header = "#{result[:title]} (#{result[:locale]}, last updated #{result[:last_updated] || 'unknown'})\n" \
                   "#{result[:url]}\n"

          [header, *notes(result, requested), result[:markdown]].join("\n")
        end

        def notes(result, requested)
          notes = []
          if result[:fallback]
            notes << 'This page does not exist in the requested language; this is the English version.'
          end
          if requested.include?('#') && result[:anchor].nil?
            notes << "Section #{requested[/#.*\z/]} not found; this is the whole page."
          end
          if result[:truncated]
            notes << 'The page is cut here because of its length; read the remaining sections by their anchors.'
          end
          notes
        end

        def not_found(page)
          "No page of the documentation matches #{page.inspect}. Find pages with `search_docs` or `list_sections`."
        end
      end
    end
  end
end
