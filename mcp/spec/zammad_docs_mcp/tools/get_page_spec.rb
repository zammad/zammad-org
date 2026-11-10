# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Tools::GetPage do
  def get_page(page, **arguments)
    call_tool('get_page', { page:, **arguments })
  end

  def page_of(result) = result['structuredContent']

  context 'with the different ways to name a page' do
    [
      'https://docs.example.org/en/documentation/use/guides/search.html',
      '/en/documentation/use/guides/search.html',
      '/en/documentation/use/guides/search',
      'en/documentation/use/guides/search.md',
      'documentation/use/guides/search',
      'https://docs.example.org/en/documentation/use/guides/search.md'
    ].each do |reference|
      it "finds the page by #{reference}" do
        expect(page_of(get_page(reference))['title']).to eq('Search')
      end
    end
  end

  it 'returns the page as Markdown with what is needed to cite it' do
    page = page_of(get_page('documentation/use/guides/search'))

    expect(page).to include(
      'url' => 'https://docs.example.org/en/documentation/use/guides/search.html',
      'markdown_url' => 'https://docs.example.org/en/documentation/use/guides/search.md',
      'breadcrumb' => ['Documentation', 'Use Zammad', 'Guides'], 'locale' => 'en',
      'section' => 'documentation/use', 'audience' => 'user', 'last_updated' => '2026-10-01T08:00:00.000Z',
      'fallback' => false, 'anchor' => nil, 'truncated' => false
    )
    expect(page['markdown']).to start_with("# Search\n").and include('## Basic search')
    expect(page['sections'].map { |s| s['anchor'] }).to include('basic-search', 'options-1')
  end

  it 'makes links into the site absolute' do
    markdown = page_of(get_page('documentation/use/guides/search'))['markdown']

    expect(markdown).to include(
      '(https://docs.example.org/en/documentation/use/basics/find-tickets)',
      '(https://docs.example.org/en/documentation/use/guides/search.html#detailed-search)',
      '(/screenshots/search.png)'
    )
  end

  it 'returns only the section of an anchor, with its subsections' do
    page = page_of(get_page('/en/documentation/use/guides/search.html#detailed-search'))

    expect(page['url']).to end_with('search.html#detailed-search')
    expect(page['anchor']).to eq('detailed-search')
    expect(page['markdown']).to start_with('## Detailed search')
      .and include('### Options', '## not a heading')
    expect(page['markdown']).not_to include('Elasticsearch')
  end

  it 'tells a heading that occurs twice apart by its position' do
    markdown = page_of(get_page('documentation/use/guides/search#options-1'))['markdown']

    expect(markdown).to eq("### Options\n\nOptions of Elasticsearch.\n\n![Screenshot](/screenshots/search.png)")
  end

  it 'finds headings whose HTML version carries the text of a badge' do
    markdown = page_of(get_page('documentation/use/guides/search#elasticsearch'))['markdown']

    expect(markdown).to start_with('## Elasticsearch')
  end

  context 'with an anchor that is not ASCII' do
    let(:cyrillic) { "## Претрага\n\nA section with a Cyrillic anchor, like most Serbian ones." }

    it 'finds the section by the raw anchor, as search_docs returns it' do
      page = page_of(get_page('https://docs.example.org/en/documentation/use/guides/search.html#претрага'))

      expect(page).to include('anchor' => 'претрага', 'markdown' => cyrillic)
      expect(page['url']).to end_with('search.html#претрага')
    end

    it 'finds the section by the percent-encoded anchor, as browsers copy it' do
      encoded = '%D0%BF%D1%80%D0%B5%D1%82%D1%80%D0%B0%D0%B3%D0%B0'
      page = page_of(get_page("/en/documentation/use/guides/search.html##{encoded}"))

      expect(page).to include('anchor' => 'претрага', 'markdown' => cyrillic)
    end
  end

  it 'returns the whole page for an unknown anchor, and says so' do
    result = get_page('documentation/use/guides/search#nowhere')

    expect(page_of(result)['anchor']).to be_nil
    expect(result['content'].first['text']).to include('Section #nowhere not found')
  end

  it 'reads the page in the requested language' do
    page = page_of(get_page('https://docs.example.org/en/documentation/use/guides/search.html', locale: 'de'))

    expect(page).to include('title' => 'Suche', 'locale' => 'de', 'fallback' => false)
  end

  it 'falls back to English for a page the language does not have, and says so' do
    result = get_page('/de/get-started/installation/docker')

    expect(page_of(result)).to include('locale' => 'en', 'fallback' => true, 'title' => 'Install with Docker')
    expect(result['content'].first['text']).to include('this is the English version')
  end

  it 'does not fall back when asked not to' do
    expect(get_page('/de/get-started/installation/docker', fallback: false)['isError']).to be(true)
  end

  [
    '../../../etc/passwd',
    '/en/../../agent-data/en/pages.json',
    'https://attacker.example/en/documentation/use/guides/search.html',
    '/en/reference/missing',
    'javascript:alert(1)'
  ].each do |reference|
    it "finds nothing for #{reference}" do
      result = get_page(reference)

      expect(result['isError']).to be(true)
      expect(result['content'].first['text']).to include('No page of the documentation matches')
    end
  end

  it 'cuts a page longer than the limit at a heading' do
    full = page_of(get_page('documentation/use/guides/search'))['markdown']
    cut = full.index('## Detailed search')
    stub_const('ZammadDocsMcp::Pages::MAX_LENGTH', cut + 10)

    page = page_of(get_page('documentation/use/guides/search'))

    expect(page['truncated']).to be(true)
    expect(page['markdown']).to eq(full[0, cut].rstrip)
  end
end
