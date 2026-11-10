# frozen_string_literal: true

require 'uri'

module ZammadDocsMcp
  # Links in Markdown into an app of the site: `](/de/...)`.
  LOCALE_LINK = %r{\]\((/(?:#{LOCALES.map { |l| Regexp.escape(l) }.join('|')})(?:/[^)\s]*)?)\)}

  # Settings of the server, from the environment. See README.md.
  Config = Data.define(
    :site_url,
    :typesense_url,
    :typesense_key,
    :agent_data_dir,
    :pages_dir,
    :allowed_hosts,
    :allowed_origins
  ) do
    # Repository root, for the defaults that point at the build output.
    root = File.expand_path('../../..', __dir__)

    define_singleton_method(:from_env) do |env = ENV|
      site_url = env.fetch('SITE_URL', 'https://next.zammad.org').chomp('/')

      new(
        site_url:,
        typesense_url: env.fetch('TYPESENSE_URL', 'http://localhost:8108').chomp('/'),
        typesense_key: env.fetch('TYPESENSE_SEARCH_KEY', ''),
        agent_data_dir: env.fetch('AGENT_DATA_DIR', File.join(root, 'agent-data')),
        pages_dir: env.fetch('PAGES_DIR', File.join(root, 'dist')),
        # Host and Origin headers accepted besides loopback, against DNS
        # rebinding; by default those of SITE_URL.
        allowed_hosts: list(env['MCP_ALLOWED_HOSTS']) || [URI(site_url).host],
        allowed_origins: list(env['MCP_ALLOWED_ORIGINS']) || [site_url]
      )
    end

    define_singleton_method(:list) do |value|
      return if value.nil?

      value.split(',').map(&:strip).reject(&:empty?)
    end
    private_class_method :list

    # Absolute link of a link relative to the site (`/de/foo.html#bar`).
    def absolute_url(link)
      link.start_with?('/') ? "#{site_url}#{link}" : link
    end

    # Markdown with absolute links into the apps of the site (`](/de/...)`),
    # so that they can be cited as they are. Other links stay as they are.
    def absolute_links(markdown)
      markdown.gsub(LOCALE_LINK) { "](#{absolute_url(Regexp.last_match(1))})" }
    end
  end
end
