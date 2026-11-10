# frozen_string_literal: true

module ZammadDocsMcp
  module Tools
    # The documented definition of a Zammad term, see `Glossary`.
    class GetGlossaryTerm < Base
      ENTRY = {
        type: 'object',
        required: %w[term definition url],
        properties: {
          term: { type: 'string' },
          definition: { type: 'string', description: 'Definition as Markdown.' },
          url: { type: 'string', description: 'Canonical URL of the glossary entry; cite this.' }
        }
      }.freeze

      tool_name 'get_glossary_term'
      title 'Look up a term in the Zammad glossary'
      description <<~TEXT
        Returns the definition of a Zammad term (e.g. agent, trigger, SLA, overview) from the glossary of the
        documentation, in the requested language. Use it for the meaning of a term; use `search_docs` for how
        to do something. Without a match, `suggestions` lists the closest terms of the glossary.
      TEXT
      input_schema(
        properties: {
          term: { type: 'string', minLength: 1, maxLength: 100, description: 'The term, in the language of `locale`.' },
          locale: LOCALE,
          fallback: FALLBACK
        },
        required: ['term']
      )
      output_schema(
        type: 'object',
        required: %w[term locale found fallback entries suggestions],
        properties: {
          term: { type: 'string' },
          locale: { type: 'string', description: 'Language of the entries.' },
          found: { type: 'boolean' },
          fallback: { type: 'boolean', description: 'From the English glossary, because the language has no entry.' },
          entries: { type: 'array', items: ENTRY },
          suggestions: { type: 'array', items: { type: 'string' }, description: 'Closest terms, if none matched.' }
        }
      )

      class << self
        private

        def run(term:, server_context:, locale: FALLBACK_LOCALE, fallback: true)
          found = Glossary.new(docs(server_context)).lookup(term, locale:, fallback:)
          result = {
            term:, locale: found.locale, found: found.entries.any?, fallback: found.fallback,
            entries: found.entries, suggestions: found.suggestions
          }

          respond(result, render(result))
        rescue ArgumentError => e
          failure(e.message)
        end

        def log_entry(arguments, structured)
          {
            locale: arguments.fetch(:locale, FALLBACK_LOCALE), filters: {},
            results: structured.fetch(:entries, []).size, fallback: structured[:fallback] == true
          }
        end

        def render(result)
          unless result[:found]
            suggestions = result[:suggestions].any? ? " Closest terms: #{result[:suggestions].join(', ')}." : ''
            return "#{result[:term].inspect} is not in the glossary (#{result[:locale]}).#{suggestions}"
          end

          note = result[:fallback] ? "Not in the glossary of the requested language; from the English one.\n\n" : ''
          note + result[:entries].map { |e| "#{e[:term]}\n#{e[:url]}\n\n#{e[:definition]}" }.join("\n\n")
        end
      end
    end
  end
end
