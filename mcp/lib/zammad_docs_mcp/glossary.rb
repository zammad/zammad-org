# frozen_string_literal: true

module ZammadDocsMcp
  # Looks up terms in the glossary of a language (`glossary.json`, from the
  # translated glossary page of the site).
  #
  # A term matches regardless of case and accents. A parenthesis at the end
  # holds aliases: "Custom development (CD)" is found by "CD" too. One at the
  # start holds optional words: "(Ticket) template" is found by "template"
  # and "ticket template", but not by "ticket". Without a match, the closest
  # terms are suggested.
  class Glossary
    MAX_SUGGESTIONS = 5

    Result = Data.define(:locale, :entries, :suggestions, :fallback)

    def initialize(context)
      @context = context
    end

    def lookup(term, locale:, fallback: true)
      raise ArgumentError, "the documentation is not available in #{locale.inspect}" unless content.locale?(locale)

      entries = matches(term, locale)
      return Result.new(locale:, entries:, suggestions: [], fallback: false) if entries.any?

      if fallback && locale != FALLBACK_LOCALE && content.locale?(FALLBACK_LOCALE)
        english = matches(term, FALLBACK_LOCALE)
        return Result.new(locale: FALLBACK_LOCALE, entries: english, suggestions: [], fallback: true) if english.any?
      end

      Result.new(locale:, entries: [], suggestions: suggestions(term, locale), fallback: false)
    end

    def self.normalize(text)
      text.unicode_normalize(:nfkd).gsub(/\p{Mn}/, '').downcase.gsub(/[^\p{Alnum}]+/, ' ').strip
    end

    private

    def content = @context.content

    def matches(term, locale)
      wanted = self.class.normalize(term)
      return [] if wanted.empty?

      content.glossary(locale).select { |entry| names(entry['term']).include?(wanted) }.map { |entry| absolute(entry) }
    end

    # The names a term is found by, see above.
    def names(term)
      names = [term]

      if (optional = term.match(/\A\((.+?)\)\s*(.+)\z/))
        names.push("#{optional[1]} #{optional[2]}", optional[2])
      elsif (aliases = term.match(/\A(.+?)\s*\((.+)\)\z/))
        names.push(aliases[1], *aliases[2].split(/[;,]/))
      end

      names.map { |name| self.class.normalize(name) }.reject(&:empty?).uniq
    end

    def absolute(entry)
      {
        term: entry['term'],
        definition: @context.config.absolute_links(entry['definition']),
        url: @context.config.absolute_url(entry['url'])
      }
    end

    # Terms that contain the query or are contained in it, then the most
    # similar ones by edit distance.
    def suggestions(term, locale)
      wanted = self.class.normalize(term)
      terms = content.glossary(locale).map { |entry| entry['term'] }
      scored = terms.map do |candidate|
        distance = names(candidate).map { |name| score(wanted, name) }.min || Float::INFINITY
        [distance, candidate]
      end

      scored.select { |distance, _| distance <= 3 }.sort.first(MAX_SUGGESTIONS).map(&:last)
    end

    def score(wanted, name)
      return 0 if !wanted.empty? && (name.include?(wanted) || wanted.include?(name))

      levenshtein(wanted, name)
    end

    def levenshtein(from, to)
      previous = (0..to.length).to_a

      from.each_char.with_index(1) do |char, i|
        current = [i]
        to.each_char.with_index(1) do |other, j|
          current << [previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (char == other ? 0 : 1)].min
        end
        previous = current
      end

      previous.last
    end
  end
end
