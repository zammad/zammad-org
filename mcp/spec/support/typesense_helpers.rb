# frozen_string_literal: true

# Typesense answers for the search specs.
module TypesenseHelpers
  ENDPOINT = "#{McpHelpers::TYPESENSE_URL}/multi_search?limit_multi_searches=2".freeze

  # One section of a page as Typesense returns it.
  def section_hit(locale, path, title:, heading: title, anchor: nil, snippet: nil, content: 'Text of the section.')
    page_url = "/#{locale}/#{path}"

    {
      'document' => {
        'url' => anchor ? "#{page_url}##{anchor}" : page_url, 'page_url' => page_url, 'title' => title,
        'heading' => heading, 'breadcrumb' => ['Documentation', title], 'content' => content, 'locale' => locale,
        'section' => 'documentation/use', 'audience' => 'user', 'level' => anchor ? 2 : 1
      },
      'highlights' => snippet ? [{ 'field' => 'content', 'snippet' => snippet }] : []
    }
  end

  # Result of one search, the hits grouped by page like `group_by: page_url`.
  def search_result(*hits)
    groups = hits.group_by { |hit| hit.dig('document', 'page_url') }.values.map { |group| { 'hits' => group } }

    { 'found' => hits.size, 'grouped_hits' => groups }
  end

  def stub_searches(*results)
    stub_request(:post, ENDPOINT).to_return(body: { results: }.to_json)
  end

  # The searches of the last request to Typesense.
  def sent_searches
    request = WebMock::RequestRegistry.instance.requested_signatures.hash.keys.last

    JSON.parse(request.body)['searches']
  end
end

RSpec.configure { |config| config.include TypesenseHelpers }
