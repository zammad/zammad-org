# frozen_string_literal: true

# The server on the build output of the repository (agent-data/, dist/) and a
# Typesense with the index of the same build. Run by CI after the build, see
# README.md.
RSpec.describe 'The MCP server on the build output', :integration do # rubocop:disable RSpec/DescribeClass
  def docs_context
    @docs_context ||= ZammadDocsMcp::Context.from_config(ZammadDocsMcp::Config.from_env, log: StringIO.new)
  end

  let(:locales) { docs_context.content.locales }

  it 'has the build output of every language' do
    expect(locales).to match_array(ZammadDocsMcp::LOCALES)
  end

  it 'offers the four tools' do
    mcp_request('tools/list')

    expect(mcp_result['tools'].map { |t| t['name'] })
      .to contain_exactly('search_docs', 'get_page', 'list_sections', 'get_glossary_term')
  end

  it 'searches every language, with citable results in that language' do
    locales.each do |locale|
      results = call_tool('search_docs', { query: 'Elasticsearch', locale:, fallback: false })
                .dig('structuredContent', 'results')

      expect(results).not_to be_empty, "no results in #{locale}"
      expect(results.map { |r| r['url'] }).to all(start_with("#{docs_context.config.site_url}/#{locale}/"))
    end
  end

  it 'reads every page of every language' do
    locales.each do |locale|
      docs_context.content.pages(locale).each do |page|
        result = call_tool('get_page', { page: page['url'], fallback: false })

        expect(result['isError']).to be(false), "#{page['url']}: #{result['content'].first['text']}"
        expect(result.dig('structuredContent', 'markdown')).not_to be_empty
      end
    end
  end

  it 'browses every language' do
    locales.each do |locale|
      expect(call_tool('list_sections', { locale: }).dig('structuredContent', 'entries')).not_to be_empty
    end
  end

  it 'has a glossary in every language' do
    locales.each do |locale|
      term = docs_context.content.glossary(locale).first['term']

      expect(call_tool('get_glossary_term', { term:, locale:, fallback: false }).dig('structuredContent', 'found'))
        .to be(true), "#{locale}: #{term}"
    end
  end
end
