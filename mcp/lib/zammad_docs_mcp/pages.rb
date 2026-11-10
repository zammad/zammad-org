# frozen_string_literal: true

require 'cgi'
require 'uri'

module ZammadDocsMcp
  # Pages as Markdown: resolves what a client names a page by (a URL of the
  # site, a path with or without language, `.html`, `.md` or a clean URL,
  # with or without anchor) to a page of `pages.json`, and reads it or one of
  # its sections.
  #
  # A reference never becomes a file path: it is only compared with the paths
  # in `pages.json`, so anything else is simply not found.
  class Pages
    # Characters of Markdown returned at most; longer pages are cut at a
    # heading. About 15,000 tokens.
    MAX_LENGTH = 60_000

    Reference = Data.define(:locale, :path, :anchor)
    Page = Data.define(:locale, :entry, :anchor, :markdown, :truncated, :fallback)

    def initialize(context)
      @context = context
    end

    # The page a reference names, in `locale` if given, else in the language
    # of the reference, else in English. Falls back to English if the page
    # does not exist in that language. Returns nil if there is no such page.
    def find(reference, locale: nil, fallback: true)
      ref = parse(reference, locale) or return
      entry = lookup(ref.locale, ref.path)
      used_locale = ref.locale

      if entry.nil? && fallback && ref.locale != FALLBACK_LOCALE
        entry = lookup(FALLBACK_LOCALE, ref.path)
        used_locale = FALLBACK_LOCALE
      end

      entry && read(used_locale, entry, ref.anchor, fallback: used_locale != ref.locale)
    end

    private

    def content = @context.content
    def config = @context.config

    def parse(reference, locale)
      uri = URI.parse(escape_non_ascii(reference.to_s.strip))
      return unless site?(uri)

      ref_locale, path = split(uri.path.to_s)
      locale ||= ref_locale
      return unless content.locale?(locale)

      Reference.new(locale:, path:, anchor: anchor_of(uri))
    rescue URI::InvalidURIError
      nil
    end

    # `URI.parse` only takes ASCII, but anchors of the site are not always
    # ASCII (most Serbian ones are Cyrillic), and search results carry them
    # as they are.
    def escape_non_ascii(text)
      text.gsub(/[^\x00-\x7F]/) { |char| char.bytes.map { |byte| format('%%%02X', byte) }.join }
    end

    # The anchor as the outline has it: raw or percent-encoded in the reference.
    def anchor_of(uri)
      return if uri.fragment.to_s.empty?

      decoded = URI.decode_uri_component(uri.fragment).force_encoding(Encoding::UTF_8)
      decoded.valid_encoding? ? decoded : uri.fragment
    end

    # Language (English if there is none) and built path of a URL path.
    def split(url_path)
      segments = url_path.split('/').reject(&:empty?)
      locale = LOCALES.include?(segments.first) ? segments.shift : FALLBACK_LOCALE

      [locale, built_path(segments.join('/'), url_path.end_with?('/'))]
    end

    # A path, or a URL of the site.
    def site?(uri)
      uri.host ? uri.host == URI(config.site_url).host : uri.scheme.nil?
    end

    # `foo/bar`, `foo/bar.md`, `foo/bar.html` → `foo/bar.html`; `foo/` → `foo/index.html`.
    def built_path(path, directory)
      return 'index.html' if path.empty?
      return "#{path}/index.html" if directory

      "#{path.delete_suffix('.md').delete_suffix('.html')}.html"
    end

    # A page by its built path; `foo.html` also finds the index page `foo/index.html`.
    def lookup(locale, path)
      content.page(locale, path) || content.page(locale, path.sub(/\.html\z/, '/index.html'))
    end

    def read(locale, entry, anchor, fallback:)
      markdown = absolute_links(strip_front_matter(content.markdown(locale, entry)), entry)
      section = anchor && entry.fetch('sections', []).find { |s| s['anchor'] == anchor }
      excerpt = section && Outline.new(markdown).section(entry['sections'], section)
      text, truncated = limit(excerpt || markdown)

      Page.new(locale:, entry:, anchor: excerpt ? anchor : nil, markdown: text, truncated:, fallback:)
    end

    def strip_front_matter(markdown)
      markdown.sub(/\A---\r?\n.*?\r?\n---[ \t]*\r?\n/m, '').lstrip
    end

    # Links into the site and to anchors of the page itself become absolute,
    # so that they can be cited as they are.
    def absolute_links(markdown, entry)
      page_url = config.absolute_url(entry['url'])

      config.absolute_links(markdown).gsub(/\]\((#[^)\s]+)\)/) { "](#{page_url}#{Regexp.last_match(1)})" }
    end

    def limit(markdown) = Cut.call(markdown)

    # Cuts Markdown to a length: at the last heading if that keeps at least
    # half of it, else at the last blank line outside of code blocks, so that
    # no code block is left open.
    module Cut
      module_function

      # The Markdown, cut to `max` characters, and whether it was cut.
      def call(markdown, max = MAX_LENGTH)
        return [markdown, false] if markdown.length <= max

        heading, paragraph = boundaries(markdown, max)
        cut = heading && heading >= max / 2 ? heading : paragraph || heading || max

        [markdown[0, cut].rstrip, true]
      end

      # Offsets of the last heading and the last blank line up to `max`,
      # outside of code blocks.
      def boundaries(markdown, max)
        heading = paragraph = nil
        offset = 0
        fenced = false

        markdown.each_line do |line|
          break if offset > max

          unless fenced
            heading = offset if line.match?(/\A\#{2,6}\s/)
            paragraph = offset if line.strip.empty?
          end
          fenced = !fenced if line.lstrip.start_with?('```', '~~~')
          offset += line.length
        end

        [heading, paragraph]
      end
    end

    # The headings of a Markdown page, matched to the outline of `pages.json`
    # (taken from the built HTML, with the anchors the site uses).
    class Outline
      Heading = Data.define(:level, :text, :line)

      def self.normalize(text)
        CGI.unescapeHTML(text)
           .gsub(/\{[#.:][^}]*\}/, '')
           .gsub(/<[^>]+>/, '')
           .gsub(/!?\[([^\]]*)\]\([^)]*\)/, '\1')
           .delete('`*_~\\')
           .gsub(/\s+/, ' ').strip.downcase
      end

      def initialize(markdown)
        @lines = markdown.lines
        @headings = headings
      end

      # Markdown of an outline section: its heading and everything up to the
      # next heading of the same or a higher level. Nil if it cannot be found.
      def section(outline, wanted)
        heading = match(outline, wanted) or return
        stop = @headings.find { |h| h.line > heading.line && h.level <= heading.level }

        @lines[heading.line...(stop ? stop.line : @lines.size)].join.rstrip
      end

      private

      # Both lists are in page order: walk them together, so that a heading
      # that occurs twice is matched to the right section.
      def match(outline, wanted)
        position = 0

        outline.each do |section|
          index = (position...@headings.size).find { |i| same?(@headings[i], section) }
          next unless index

          return @headings[index] if section == wanted

          position = index + 1
        end

        nil
      end

      # Equal text, or the outline heading has more: the HTML heading carries
      # the text of badges the Markdown version drops.
      def same?(heading, section)
        return false unless heading.level == section['level'] && !heading.text.empty?

        text = Outline.normalize(section['heading'])
        text == heading.text || text.start_with?("#{heading.text} ")
      end

      def headings
        fenced = false

        @lines.each_with_index.filter_map do |line, index|
          fenced = !fenced if line.lstrip.start_with?('```', '~~~')
          next if fenced

          match = line.match(/\A(\#{2,6})\s+(.*?)\s*#*\s*\z/)
          match && Heading.new(level: match[1].length, text: Outline.normalize(match[2]), line: index)
        end
      end
    end
  end
end
