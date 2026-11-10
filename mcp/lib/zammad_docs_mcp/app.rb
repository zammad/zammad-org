# frozen_string_literal: true

module ZammadDocsMcp
  # Rack app: the MCP endpoint at `/mcp` and the container health check at
  # `/healthz`.
  #
  # Stateless Streamable HTTP (MCP 2026-07-28): no sessions, every POST is
  # answered on its own with a JSON response, GET and DELETE are refused. Any
  # instance can answer any request, so nginx proxies without sticky sessions.
  class App
    def initialize(context)
      @transport = MCP::Server::Transports::StreamableHTTPTransport.new(
        Server.build(context),
        stateless: true,
        enable_json_response: true,
        allowed_hosts: context.config.allowed_hosts,
        allowed_origins: context.config.allowed_origins
      )
    end

    def call(env)
      case env['PATH_INFO']
      when '/mcp' then @transport.call(env)
      when '/healthz' then [200, { 'content-type' => 'text/plain' }, ["ok\n"]]
      else [404, { 'content-type' => 'text/plain' }, ["not found\n"]]
      end
    end
  end
end
