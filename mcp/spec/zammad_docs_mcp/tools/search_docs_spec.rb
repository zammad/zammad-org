# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Tools::SearchDocs do
  let(:search_page) { 'documentation/use/guides/search.html' }
  let(:german_hits) do
    [
      section_hit('de', search_page, title: 'Suche', heading: 'Einfache Suche', anchor: 'einfache-suche',
                                     snippet: "Tippen Sie in das \u{E000}Suchfeld\u{E001}."),
      section_hit('de', 'documentation/use/basics/find-tickets.html', title: 'Tickets finden'),
      section_hit('de', 'documentation/use/guides/overviews.html', title: 'Übersichten')
    ]
  end
  let(:english_hits) do
    [
      section_hit('en', search_page, title: 'Search', heading: 'Basic search', anchor: 'basic-search'),
      section_hit('en', 'documentation/use/guides/editor.html', title: 'Editor', anchor: 'search', heading: 'Search')
    ]
  end

  it 'is listed as a read-only tool' do
    mcp_request('tools/list')
    tool = mcp_result['tools'].find { |t| t['name'] == 'search_docs' }

    expect(tool['annotations']).to include('readOnlyHint' => true, 'destructiveHint' => false,
                                           'openWorldHint' => false)
    expect(tool['inputSchema']['required']).to eq(['query'])
  end

  it 'searches like the site: same fields, weights, grouping and stop words' do
    stub_searches(search_result(*german_hits), search_result(*english_hits))
    call_tool('search_docs', { query: 'suche', locale: 'de', section: 'documentation/use', audience: 'user' })

    expect(sent_searches.first).to include(
      'collection' => 'docs_de', 'q' => 'suche', 'stopwords' => 'docs_de',
      'query_by' => 'heading,breadcrumb,content,keywords', 'query_by_weights' => '4,2,1,1',
      'group_by' => 'page_url', 'per_page' => 5,
      'filter_by' => 'section:=`documentation/use` && audience:=`user`'
    )
    expect(sent_searches.last).to include('collection' => 'docs_en', 'stopwords' => 'docs_en')
  end

  it 'returns everything needed to cite a result' do
    stub_searches(search_result(*german_hits), search_result(*english_hits))
    result = call_tool('search_docs', { query: 'suche', locale: 'de' })['structuredContent']['results'].first

    expect(result).to eq(
      'url' => 'https://docs.example.org/de/documentation/use/guides/search.html#einfache-suche',
      'page_url' => 'https://docs.example.org/de/documentation/use/guides/search.html',
      'title' => 'Suche', 'heading' => 'Einfache Suche', 'breadcrumb' => %w[Documentation Suche],
      'locale' => 'de', 'section' => 'documentation/use', 'audience' => 'user',
      'snippet' => 'Tippen Sie in das Suchfeld.', 'fallback' => false
    )
  end

  it 'answers from the requested language when it has enough results' do
    stub_searches(search_result(*german_hits), search_result(*english_hits))
    result = call_tool('search_docs', { query: 'suche', locale: 'de' })['structuredContent']

    expect(result['fallback_locale']).to be_nil
    expect(result['results'].map { |r| r['locale'] }).to eq(%w[de de de])
  end

  it 'falls back to English when the language has no results, and says so' do
    stub_searches(search_result, search_result(*english_hits))
    result = call_tool('search_docs', { query: 'suche', locale: 'de' })

    expect(result['structuredContent']['fallback_locale']).to eq('en')
    expect(result['structuredContent']['results'].map { |r| [r['locale'], r['fallback']] })
      .to eq([['en', true], ['en', true]])
    expect(result['content'].first['text']).to include('No results in de', '[en]')
  end

  it 'adds no English results to the results of the language, however few' do
    stub_searches(search_result(german_hits.first), search_result(*english_hits))
    result = call_tool('search_docs', { query: 'suche', locale: 'de' })

    expect(result['structuredContent']['fallback_locale']).to be_nil
    expect(result['structuredContent']['results'].map { |r| r['locale'] }).to eq(['de'])
    expect(result['content'].first['text']).to start_with('1 result for "suche" (de).')
  end

  it 'reports no fallback when English has no results either' do
    stub_searches(search_result, search_result)
    result = call_tool('search_docs', { query: 'xyzzy', locale: 'de' })['structuredContent']

    expect(result).to include('fallback_locale' => nil, 'results' => [])
  end

  it 'does not fall back when asked not to' do
    stub_searches(search_result)
    result = call_tool('search_docs', { query: 'suche', locale: 'de', fallback: false })['structuredContent']

    expect(sent_searches.size).to eq(1)
    expect(result['results']).to be_empty
  end

  it 'searches English alone' do
    stub_searches(search_result(*english_hits))
    call_tool('search_docs', { query: 'search' })

    expect(sent_searches.map { |s| s['collection'] }).to eq(['docs_en'])
  end

  it 'reports an unavailable search as a tool error' do
    stub_request(:post, TypesenseHelpers::ENDPOINT).to_return(status: 503)
    result = call_tool('search_docs', { query: 'search' })

    expect(result['isError']).to be(true)
    expect(result['content'].first['text']).to include('unavailable')
  end

  it 'reports a language without documentation as a tool error' do
    result = call_tool('search_docs', { query: 'pretraga', locale: 'sr' })

    expect(result['isError']).to be(true)
    expect(result['content'].first['text']).to include('not available in "sr"')
  end

  it 'refuses limits beyond the maximum' do
    result = call_tool('search_docs', { query: 'search', limit: 50 })

    expect(result['isError']).to be(true)
  end

  it 'lists the results with their URLs as text' do
    stub_searches(search_result(*english_hits))
    text = call_tool('search_docs', { query: 'search' })['content'].first['text']

    expect(text).to include('1. Search › Basic search',
                            'https://docs.example.org/en/documentation/use/guides/search.html#basic-search')
  end
end
