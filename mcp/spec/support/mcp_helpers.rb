# frozen_string_literal: true

# Context on the fixtures in spec/fixtures/ and requests against the Rack app.
module McpHelpers
  include Rack::Test::Methods

  FIXTURES = File.expand_path('../fixtures', __dir__)
  TYPESENSE_URL = 'http://typesense.test:8108'

  def config(**overrides)
    ZammadDocsMcp::Config.from_env(
      'SITE_URL' => 'https://docs.example.org',
      'TYPESENSE_URL' => TYPESENSE_URL,
      'TYPESENSE_SEARCH_KEY' => 'test-search-key',
      'AGENT_DATA_DIR' => File.join(FIXTURES, 'agent-data'),
      'PAGES_DIR' => File.join(FIXTURES, 'pages')
    ).with(**overrides)
  end

  def docs_context
    @docs_context ||= ZammadDocsMcp::Context.from_config(config, log: call_log_io)
  end

  # Where the call log of the tools goes, instead of stdout.
  def call_log_io
    @call_log_io ||= StringIO.new
  end

  def app
    @app ||= ZammadDocsMcp::App.new(docs_context)
  end

  # JSON-RPC request in the stateless lifecycle of MCP 2026-07-28: no
  # handshake, the protocol version and client capabilities ride along.
  def mcp_request(method, params = {}, protocol_version: '2026-07-28', host: URI(docs_context.config.site_url).host)
    body = { jsonrpc: '2.0', id: 1, method:, params: }

    if protocol_version == '2026-07-28'
      body[:params] = params.merge(
        _meta: {
          'io.modelcontextprotocol/protocolVersion' => protocol_version,
          'io.modelcontextprotocol/clientCapabilities' => {}
        }
      )
    end

    header 'Host', host
    header 'Content-Type', 'application/json'
    header 'Accept', 'application/json, text/event-stream'
    header 'MCP-Protocol-Version', protocol_version
    # The modern lifecycle mirrors the method and the tool name into headers.
    modern = protocol_version == '2026-07-28'
    header 'Mcp-Method', modern ? method : nil
    header 'Mcp-Name', modern && method == 'tools/call' ? params[:name] : nil
    post '/mcp', JSON.generate(body)
  end

  def mcp_result
    expect(last_response.status).to eq(200), "HTTP #{last_response.status}: #{last_response.body}"
    json = JSON.parse(last_response.body)
    expect(json).not_to have_key('error'), json['error'].inspect

    json.fetch('result')
  end

  # Result of a tool call, `structuredContent` and the text of `content`.
  def call_tool(name, arguments)
    mcp_request('tools/call', { name:, arguments: })
    mcp_result
  end
end
