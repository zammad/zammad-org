# frozen_string_literal: true

RSpec.describe 'Call log of the tools' do # rubocop:disable RSpec/DescribeClass
  def logged = call_log_io.string.lines.map { |line| JSON.parse(line) }

  it 'logs a search with its filters and results, without the query' do
    stub_searches(search_result(section_hit('en', 'documentation/use/guides/search.html', title: 'Search')))
    call_tool('search_docs', { query: 'jane.doe@example.com ticket 4711', section: 'documentation/use', limit: 3 })

    expect(logged.first).to include(
      'event' => 'tool_call', 'tool' => 'search_docs', 'locale' => 'en',
      'filters' => { 'section' => 'documentation/use', 'limit' => 3 }, 'results' => 1, 'fallback' => false,
      'error' => false
    )
    expect(logged.first['duration_ms']).to be_a(Integer)
    expect(logged.first).not_to have_key('query')
    expect(call_log_io.string).not_to include('jane.doe', '4711')
  end

  it 'logs a failed search as an error without results' do
    stub_request(:post, TypesenseHelpers::ENDPOINT).to_return(status: 503)
    call_tool('search_docs', { query: 'search' })

    expect(logged.first).to include('results' => 0, 'error' => true)
  end

  it 'logs a search that got an unexpected answer as an error, with a friendly failure' do
    stub_request(:post, TypesenseHelpers::ENDPOINT).to_return(body: 'not json')
    result = call_tool('search_docs', { query: 'search' })

    expect(result['isError']).to be(true)
    expect(result['content'].first['text']).to include('unavailable')
    expect(logged.first).to include('tool' => 'search_docs', 'results' => 0, 'error' => true)
  end

  it 'logs the other tools, without what the client typed' do
    call_tool('get_page', { page: '/de/get-started/installation/docker' })
    call_tool('get_glossary_term', { term: 'Jane Doe' })
    call_tool('list_sections', { locale: 'de', section: 'reference', depth: 1 })

    expect(logged.map { |e| e.values_at('tool', 'locale', 'filters', 'results', 'fallback') }).to eq(
      [
        ['get_page', 'en', {}, 1, true],
        ['get_glossary_term', 'en', {}, 0, false],
        ['list_sections', 'de', { 'section' => 'reference', 'depth' => 1 }, 1, false]
      ]
    )
    expect(call_log_io.string).not_to include('installation/docker', 'Jane Doe')
  end

  it 'logs nothing that identifies the client' do
    stub_searches(search_result)
    header 'X-Forwarded-For', '203.0.113.7'
    header 'User-Agent', 'Example/1.0'
    call_tool('search_docs', { query: 'search' })

    expect(call_log_io.string).not_to include('203.0.113.7', 'Example/1.0')
  end
end
