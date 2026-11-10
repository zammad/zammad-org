# frozen_string_literal: true

require 'json'
require 'net/http'
require 'uri'

module ZammadDocsMcp
  # Searches the documentation index. The server only ever calls
  # `multi_search`, with the search-only key: there is no code path that could
  # change the index.
  class Typesense
    class Error < StandardError; end

    # Upper bound of searches in one request, like the site's search proxy;
    # Typesense defaults to 50.
    MAX_SEARCHES = 2

    def initialize(url:, key:, open_timeout: 2, read_timeout: 5)
      @uri = URI("#{url.chomp('/')}/multi_search?limit_multi_searches=#{MAX_SEARCHES}")
      @key = key
      @open_timeout = open_timeout
      @read_timeout = read_timeout
    end

    # Runs the searches and returns their results, in the same order. Raises
    # `Error` when Typesense is unreachable or refuses one of them.
    def multi_search(searches)
      raise ArgumentError, "at most #{MAX_SEARCHES} searches per request" if searches.size > MAX_SEARCHES

      results = parse(post(JSON.generate(searches:)), searches.size)

      results.each do |result|
        raise Error, "Typesense refused the search: #{result['error']}" if result['error']
      end
    end

    private

    # One result object per search, or `Error`.
    def parse(body, count)
      answer = JSON.parse(body)
      results = answer['results'] if answer.is_a?(Hash)
      valid = results.is_a?(Array) && results.size == count && results.all?(Hash)
      raise Error, 'Typesense gave an unexpected answer' unless valid

      results
    rescue JSON::ParserError
      raise Error, 'Typesense gave an unexpected answer'
    end

    def post(body)
      request = Net::HTTP::Post.new(@uri, 'Content-Type' => 'application/json', 'X-TYPESENSE-API-KEY' => @key)
      request.body = body

      response = Net::HTTP.start(
        @uri.host, @uri.port,
        use_ssl: @uri.scheme == 'https', open_timeout: @open_timeout, read_timeout: @read_timeout
      ) { |http| http.request(request) }

      raise Error, "Typesense answered #{response.code}" unless response.is_a?(Net::HTTPSuccess)

      response.body
    rescue SystemCallError, IOError, Timeout::Error, SocketError, OpenSSL::SSL::SSLError,
           Net::ProtocolError, Net::HTTPBadResponse => e
      raise Error, "Typesense is unreachable: #{e.class}"
    end
  end
end
