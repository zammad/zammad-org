# frozen_string_literal: true

require 'json'

module ZammadDocsMcp
  # The build output for agents, read-only: per language the navigation, the
  # pages with their Markdown versions, the glossary and the search settings
  # (`agent-data/<locale>/`, see .vitepress/llms/agent-data.mts), and the
  # Markdown pages themselves (`dist/<locale>/**/*.md`).
  #
  # Everything but the page Markdown is loaded once at start, so that missing
  # or broken build output stops the server instead of failing its tools.
  # Markdown files are only ever opened by the paths in `pages.json`, never by
  # a path from a request.
  class Content
    class Error < StandardError; end

    Locale = Data.define(:nav, :pages, :glossary, :search)

    attr_reader :locales

    def initialize(agent_data_dir:, pages_dir:)
      @pages_dir = pages_dir
      @data = LOCALES.filter_map do |locale|
        dir = File.join(agent_data_dir, locale)
        [locale, load_locale(locale, dir)] if File.directory?(dir)
      end.to_h

      raise Error, "no agent data in #{agent_data_dir}, run `pnpm build` first" if @data.empty?

      @locales = @data.keys.freeze
    end

    def nav(locale) = fetch(locale).nav
    def pages(locale) = fetch(locale).pages
    def glossary(locale) = fetch(locale).glossary
    def search_settings(locale) = fetch(locale).search

    def locale?(locale) = @data.key?(locale)

    # Page of `pages.json` by its built path (`foo/bar.html`), if there is one.
    def page(locale, path)
      fetch(locale).pages.find { |page| page['path'] == path }
    end

    # Markdown version of a page of `pages.json`.
    def markdown(locale, page)
      File.read(File.join(@pages_dir, locale, page.fetch('markdown')), encoding: 'UTF-8')
    end

    private

    def fetch(locale)
      @data.fetch(locale) { raise Error, "unknown locale #{locale.inspect}" }
    end

    def load_locale(locale, dir)
      read = ->(name) { JSON.parse(File.read(File.join(dir, "#{name}.json"), encoding: 'UTF-8')).freeze }
      data = Locale.new(**%i[nav pages glossary search].to_h { |name| [name, read.call(name)] })
      missing = data.pages.map { |page| page.fetch('markdown') }.reject do |markdown|
        File.file?(File.join(@pages_dir, locale, markdown))
      end

      raise Error, "#{locale}: Markdown pages missing in #{@pages_dir}: #{missing.first(5).join(', ')}" if missing.any?

      data
    rescue Errno::ENOENT, JSON::ParserError => e
      raise Error, "#{locale}: cannot read the agent data in #{dir}: #{e.message}"
    end
  end
end
