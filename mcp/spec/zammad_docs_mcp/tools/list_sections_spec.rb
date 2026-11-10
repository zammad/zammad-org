# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Tools::ListSections do
  def entries(**arguments)
    call_tool('list_sections', arguments)['structuredContent']['entries']
  end

  it 'returns the navigation in sidebar order with absolute URLs' do
    nav = entries

    expect(nav.map { |e| e['text'] }).to eq(['Get started', 'Documentation', 'Reference'])
    expect(nav.dig(0, 'items', 0, 'items', 0)).to eq(
      'text' => 'Install with Docker', 'section' => 'get-started',
      'url' => 'https://docs.example.org/en/get-started/installation/docker.html'
    )
  end

  it 'returns the navigation of the requested language' do
    expect(entries(locale: 'de').map { |e| e['text'] }).to eq(%w[Dokumentation Referenz])
  end

  it 'returns only the requested section' do
    nav = entries(section: 'documentation/use')

    expect(nav.map { |e| e['text'] }).to eq(['Use Zammad'])
    expect(nav.dig(0, 'items', 0, 'items', 0, 'text')).to eq('Search')
  end

  it 'counts the entries below the requested depth' do
    nav = entries(depth: 1)

    expect(nav.first).to eq('text' => 'Get started', 'section' => 'get-started', 'more' => 2)
  end

  it 'lists the entries as text' do
    text = call_tool('list_sections', {})['content'].first['text']

    expect(text).to include("- Get started\n  - Installation\n    - Install with Docker — https://docs.example.org/en/")
  end

  it 'reports a language without documentation as a tool error' do
    expect(call_tool('list_sections', { locale: 'it' })['isError']).to be(true)
  end
end
