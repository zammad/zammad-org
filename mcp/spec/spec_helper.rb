# frozen_string_literal: true

require 'rack/test'
require 'webmock/rspec'
require_relative '../lib/zammad_docs_mcp'

Dir[File.join(__dir__, 'support', '**', '*.rb')].each { |file| require file }

RSpec.configure do |config|
  config.expect_with(:rspec) { |c| c.syntax = :expect }
  config.disable_monkey_patching!
  config.order = :random
  config.include McpHelpers

  # Specs against the build output of the repository and a running Typesense
  # (spec/integration/), only with MCP_INTEGRATION set; see README.md.
  if ENV['MCP_INTEGRATION']
    config.before(:each, :integration) { WebMock.allow_net_connect! }
    config.after(:each, :integration) { WebMock.disable_net_connect! }
  else
    config.filter_run_excluding(:integration)
  end
end
