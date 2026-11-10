# frozen_string_literal: true

module ZammadDocsMcp
  module Tools
    # The navigation of the site, so that an agent can browse instead of guessing URLs.
    class ListSections < Base
      ENTRY = {
        type: 'object',
        required: %w[text section],
        properties: {
          text: { type: 'string' },
          url: { type: 'string', description: 'Canonical URL; groups have one only if they have a page of their own.' },
          section: { type: 'string' },
          items: { type: 'array', items: { '$ref' => '#/$defs/entry' } },
          more: { type: 'integer', description: 'Entries below this one left out because of `depth`.' }
        }
      }.freeze

      tool_name 'list_sections'
      title 'Browse the Zammad documentation'
      description <<~TEXT
        Returns the navigation of the Zammad documentation in one language: groups and pages in the order of the
        site's sidebar, with their canonical URLs. Read a page with `get_page`.
      TEXT
      input_schema(
        properties: {
          locale: LOCALE,
          section: { type: 'string', enum: Search::SECTIONS,
                     description: 'Only this part of the site, e.g. documentation/use or reference.' },
          depth: { type: 'integer', minimum: 1, maximum: 6,
                   description: 'Levels to return; deeper entries are only counted.' }
        }
      )
      output_schema(
        type: 'object',
        required: %w[locale section entries],
        '$defs': { entry: ENTRY },
        properties: {
          locale: { type: 'string' },
          section: { type: %w[string null] },
          entries: { type: 'array', items: { '$ref' => '#/$defs/entry' } }
        }
      )

      class << self
        private

        def run(server_context:, locale: FALLBACK_LOCALE, section: nil, depth: nil)
          context = docs(server_context)
          unless context.content.locale?(locale)
            return failure("The documentation is not available in #{locale.inspect}.")
          end

          nav = context.content.nav(locale)
          roots = section ? roots_of(nav, section) : nav
          entries = roots.map { |entry| convert(context.config, entry, depth) }
          result = { locale:, section:, entries: }

          respond(result, lines(entries).join("\n"))
        end

        def log_entry(arguments, structured)
          {
            locale: arguments.fetch(:locale, FALLBACK_LOCALE), filters: arguments.slice(:section, :depth),
            results: structured.fetch(:entries, []).size, fallback: false
          }
        end

        # The topmost entries of a section: a section starts where an entry
        # belongs to it and its parent does not.
        def roots_of(entries, section, parent = nil)
          entries.flat_map do |entry|
            if entry['section'] == section && parent != section
              [entry]
            else
              roots_of(entry.fetch('items', []), section, entry['section'])
            end
          end
        end

        def convert(config, entry, depth)
          result = { text: entry['text'], section: entry['section'] }
          result[:url] = config.absolute_url(entry['url']) if entry['url']
          items = entry.fetch('items', [])
          return result if items.empty?

          if depth.nil? || depth > 1
            result[:items] = items.map { |item| convert(config, item, depth && (depth - 1)) }
          else
            result[:more] = count(items)
          end

          result
        end

        def count(items) = items.sum { |item| 1 + count(item.fetch('items', [])) }

        # The entries as an indented list, one line each.
        def lines(entries, indent = 0)
          entries.flat_map do |entry|
            line = "#{'  ' * indent}- #{entry[:text]}#{" — #{entry[:url]}" if entry[:url]}"
            line += " (#{entry[:more]} more)" if entry[:more]
            [line, *lines(entry.fetch(:items, []), indent + 1)]
          end
        end
      end
    end
  end
end
