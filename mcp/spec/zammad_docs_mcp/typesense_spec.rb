# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Typesense do
  subject(:typesense) { described_class.new(url: McpHelpers::TYPESENSE_URL, key: 'test-search-key') }

  let(:endpoint) { "#{McpHelpers::TYPESENSE_URL}/multi_search?limit_multi_searches=2" }

  it 'searches through multi_search with the search-only key' do
    stub_request(:post, endpoint)
      .with(headers: { 'X-TYPESENSE-API-KEY' => 'test-search-key' }, body: { searches: [{ q: 'sla' }] }.to_json)
      .to_return(body: { results: [{ found: 1, hits: [] }] }.to_json)

    expect(typesense.multi_search([{ q: 'sla' }])).to eq([{ 'found' => 1, 'hits' => [] }])
  end

  it 'fails when Typesense refuses a search' do
    stub_request(:post, endpoint).to_return(body: { results: [{ error: 'Forbidden', code: 403 }] }.to_json)

    expect { typesense.multi_search([{ q: 'sla' }]) }.to raise_error(described_class::Error, /Forbidden/)
  end

  it 'fails when Typesense answers with an error' do
    stub_request(:post, endpoint).to_return(status: 503)

    expect { typesense.multi_search([{ q: 'sla' }]) }.to raise_error(described_class::Error, /503/)
  end

  it 'fails when Typesense is unreachable' do
    stub_request(:post, endpoint).to_raise(Errno::ECONNREFUSED)

    expect { typesense.multi_search([{ q: 'sla' }]) }.to raise_error(described_class::Error, /unreachable/)
  end

  {
    'malformed JSON' => 'not json',
    'no results' => '{}',
    'results that are not a list' => '{"results": {"found": 1}}',
    'results that are not objects' => '{"results": ["found"]}'
  }.each do |problem, body|
    it "fails on #{problem}" do
      stub_request(:post, endpoint).to_return(body:)

      expect { typesense.multi_search([{ q: 'sla' }]) }.to raise_error(described_class::Error, /unexpected answer/)
    end
  end

  it 'fails when the number of results does not match the searches' do
    stub_request(:post, endpoint).to_return(body: { results: [{ found: 0 }] }.to_json)

    expect { typesense.multi_search([{ q: 'sla' }, { q: 'eskalation' }]) }
      .to raise_error(described_class::Error, /unexpected answer/)
  end

  it 'fails on a broken HTTP answer' do
    stub_request(:post, endpoint).to_raise(Net::HTTPBadResponse)

    expect { typesense.multi_search([{ q: 'sla' }]) }.to raise_error(described_class::Error, /unreachable/)
  end

  it 'fails on a protocol error' do
    stub_request(:post, endpoint).to_raise(Net::ProtocolError)

    expect { typesense.multi_search([{ q: 'sla' }]) }.to raise_error(described_class::Error, /unreachable/)
  end

  it 'sends no more searches than the limit' do
    expect { typesense.multi_search([{}, {}, {}]) }.to raise_error(ArgumentError)
  end
end
