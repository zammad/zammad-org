# frozen_string_literal: true

require 'json'
require 'mcp'

# Read-only MCP server over the Zammad documentation: searches the Typesense
# index of the site and reads the navigation, pages and glossary the build
# writes for agents. See README.md and
# https://github.com/zammad/zammad-org/issues/239.
module ZammadDocsMcp
  VERSION = '1.0.0'

  # Languages of the site, in the order of its language switcher.
  LOCALES = %w[en de sr it pt_BR].freeze

  # Language that answers when another one has no result.
  FALLBACK_LOCALE = 'en'
end

require_relative 'zammad_docs_mcp/config'
require_relative 'zammad_docs_mcp/typesense'
require_relative 'zammad_docs_mcp/content'
require_relative 'zammad_docs_mcp/call_log'
require_relative 'zammad_docs_mcp/context'
require_relative 'zammad_docs_mcp/search'
require_relative 'zammad_docs_mcp/pages'
require_relative 'zammad_docs_mcp/glossary'
require_relative 'zammad_docs_mcp/tools/base'
require_relative 'zammad_docs_mcp/tools/search_docs'
require_relative 'zammad_docs_mcp/tools/get_page'
require_relative 'zammad_docs_mcp/tools/list_sections'
require_relative 'zammad_docs_mcp/tools/get_glossary_term'
require_relative 'zammad_docs_mcp/server'
require_relative 'zammad_docs_mcp/app'
