# frozen_string_literal: true

require 'yaml'

# Answers on the real index and build output: the checks of the site search,
# run through `search_docs`, and the cases of golden.yml. English and German
# answers have to come from pages of that language unless a fallback is
# expected. See README.md.
RSpec.describe 'Answers of the MCP server', :integration do # rubocop:disable RSpec/DescribeClass
  golden = YAML.load_file(File.join(__dir__, 'golden.yml'))
  relevance_dir = ENV.fetch('RELEVANCE_DIR', File.expand_path('../../../.vitepress/search/relevance', __dir__))

  def docs_context
    @docs_context ||= ZammadDocsMcp::Context.from_config(ZammadDocsMcp::Config.from_env, log: StringIO.new)
  end

  def site_url = docs_context.config.site_url

  # Pages of the results in rank order, as links relative to the site.
  def ranked_pages(results) = results.map { |r| r['page_url'].delete_prefix(site_url) }.uniq

  def search(query, locale, **arguments)
    call_tool('search_docs', { query:, locale:, limit: 20, **arguments }).fetch('structuredContent')
  end

  # The same expectations as the site search: the page among the first `top`.
  describe 'the checks of the site search' do
    ZammadDocsMcp::LOCALES.each do |locale|
      file = File.join(relevance_dir, "#{locale}.json")
      next unless File.exist?(file)

      JSON.parse(File.read(file)).fetch('checks', []).each do |check|
        it "finds #{check['expect']} for #{check['q'].inspect} (#{locale})" do
          audience = check['audience'] unless [nil, 'all'].include?(check['audience'])
          pages = ranked_pages(search(check['q'], locale, fallback: false, **{ audience: }.compact)['results'])

          expect(pages.first(check.fetch('top', 5))).to include(a_string_starting_with(check['expect']))
        end
      end
    end
  end

  describe 'search_docs' do
    golden.fetch('search').each do |c|
      it "answers #{c['query'].inspect} (#{c['locale']}) with #{c['expect']}" do
        result = search(c['query'], c['locale'])
        top = c.fetch('top', 3)

        if c['expect'].include?('#')
          urls = result['results'].map { |r| r['url'].delete_prefix(site_url) }
          expect(urls.first(top)).to include(c['expect'])
        else
          expect(ranked_pages(result['results']).first(top)).to include(a_string_starting_with(c['expect']))
        end

        if c['fallback']
          expect(result['fallback_locale']).to eq('en')
          expect(result['results']).to all(include('fallback' => true, 'locale' => 'en'))
        else
          expect(result['fallback_locale']).to be_nil
          expect(result['results'].map { |r| r['locale'] }.uniq).to eq([c['locale']])
        end
      end
    end
  end

  describe 'get_page' do
    golden.fetch('pages').each do |c|
      it "reads #{c['page']} (#{c['locale']})" do
        arguments = { page: c['page'], fallback: false, **{ locale: c['request_locale'] }.compact }
        page = call_tool('get_page', arguments).fetch('structuredContent')

        expect(page).to include('locale' => c['locale'], 'fallback' => false)
        expect(page['markdown']).to start_with(c['starts_with']) if c['starts_with']
        expect(page['url']).to start_with("#{site_url}#{c.fetch('url', "/#{c['locale']}/")}")
      end
    end
  end

  describe 'get_glossary_term' do
    golden.fetch('glossary').each do |c|
      it "defines #{c['query'].inspect} (#{c['locale']}) as #{c['term']}" do
        result = call_tool('get_glossary_term', { term: c['query'], locale: c['locale'] }).fetch('structuredContent')
        expected_locale = c['fallback'] ? 'en' : c['locale']

        expect(result).to include('found' => true, 'locale' => expected_locale, 'fallback' => c['fallback'] == true)
        expect(result['entries'].map { |e| e['term'] }).to include(c['term'])
        expect(result['entries'].map { |e| e['url'] }).to all(start_with("#{site_url}/#{expected_locale}/"))
      end
    end
  end
end
