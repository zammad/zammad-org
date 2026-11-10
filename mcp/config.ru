# frozen_string_literal: true

# Production entry point, served by Puma (config/puma.rb). See README.md.
require_relative 'lib/zammad_docs_mcp'

run ZammadDocsMcp::App.new(ZammadDocsMcp::Context.from_config(ZammadDocsMcp::Config.from_env))
