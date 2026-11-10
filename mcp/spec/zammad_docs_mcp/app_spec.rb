# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::App do
  it 'answers the health check' do
    get '/healthz'

    expect(last_response.status).to eq(200)
    expect(last_response.body).to eq("ok\n")
  end

  it 'knows no other paths' do
    get '/mcp/other'

    expect(last_response.status).to eq(404)
  end

  it 'lists the tools without a handshake (MCP 2026-07-28)' do
    mcp_request('tools/list')

    expect(mcp_result['tools']).to be_an(Array)
  end

  it 'lists the tools for clients of the previous protocol version' do
    mcp_request('tools/list', protocol_version: '2025-11-25')

    expect(mcp_result['tools']).to be_an(Array)
  end

  it 'describes itself to clients without a handshake (MCP 2026-07-28)' do
    mcp_request('server/discover')

    expect(mcp_result['capabilities']).to eq('tools' => { 'listChanged' => false })
    expect(mcp_result['instructions']).to include('Cite the canonical URL')
  end

  it 'answers a ping of clients of the previous protocol version' do
    mcp_request('ping', protocol_version: '2025-11-25')

    expect(mcp_result).to eq({})
  end

  it 'opens no event stream: the server is stateless' do
    header 'Host', 'docs.example.org'
    header 'Accept', 'text/event-stream'
    get '/mcp'

    expect(last_response.status).to eq(405)
  end

  it 'refuses requests for other hosts against DNS rebinding' do
    mcp_request('tools/list', host: 'attacker.example')

    expect(last_response.status).to eq(403)
  end

  it 'accepts requests from the site in a browser' do
    header 'Origin', 'https://docs.example.org'
    mcp_request('tools/list')

    expect(last_response.status).to eq(200), last_response.body
  end

  it 'refuses requests from other sites in a browser' do
    header 'Origin', 'https://attacker.example'
    mcp_request('tools/list')

    expect(last_response.status).to eq(403)
  end
end
