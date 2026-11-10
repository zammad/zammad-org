# frozen_string_literal: true

module ZammadDocsMcp
  # The MCP server with the documentation tools.
  module Server
    INSTRUCTIONS = <<~TEXT
      Read-only access to the Zammad documentation (https://next.zammad.org), the
      helpdesk's user and administrator documentation, in English, German,
      Serbian, Italian and Brazilian Portuguese.

      Cite the canonical URL of every result you use. Results in another
      language than requested are marked with `fallback: true`; say so when you
      use them.
    TEXT

    # Tools in the order of `tools/list`.
    TOOLS = [Tools::SearchDocs, Tools::GetPage, Tools::ListSections, Tools::GetGlossaryTerm].freeze

    def self.build(context)
      MCP::Server.new(
        name: 'zammad-docs',
        title: 'Zammad documentation',
        version: VERSION,
        website_url: context.config.site_url,
        instructions: INSTRUCTIONS,
        tools: TOOLS,
        # Tools only, and a fixed set of them: no prompts, resources or logging.
        capabilities: { tools: { listChanged: false } },
        # Results that do not match their output schema (a result without its
        # URL, say) fail instead of reaching the client.
        configuration: MCP::Configuration.new(validate_tool_call_results: true),
        server_context: { docs: context }
      )
    end
  end
end
