# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Content do
  subject(:content) { docs_context.content }

  it 'loads the locales that have agent data' do
    expect(content.locales).to eq(%w[en de])
  end

  it 'finds pages by their built path' do
    expect(content.page('de', 'documentation/use/guides/search.html')['title']).to eq('Suche')
  end

  it 'reads the Markdown version of a page' do
    page = content.page('en', 'documentation/use/guides/search.html')

    expect(content.markdown('en', page)).to include('## Basic search')
  end

  it 'refuses to start without agent data' do
    expect { described_class.new(agent_data_dir: '/nonexistent', pages_dir: '/nonexistent') }
      .to raise_error(described_class::Error, /pnpm build/)
  end

  it 'refuses to start when Markdown pages are missing' do
    expect { described_class.new(agent_data_dir: File.join(McpHelpers::FIXTURES, 'agent-data'), pages_dir: '/nonexistent') }
      .to raise_error(described_class::Error, /Markdown pages missing/)
  end
end
