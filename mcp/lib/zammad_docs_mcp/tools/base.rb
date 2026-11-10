# frozen_string_literal: true

module ZammadDocsMcp
  module Tools
    # What all tools share: they only read, from a fixed set of documents, and
    # answer with structured content plus a text rendering of it. Every call
    # is logged (see `CallLog`): a tool implements `run` and describes a call
    # for the log with `log_entry`.
    class Base < MCP::Tool
      LOCALE = {
        type: 'string',
        enum: LOCALES,
        default: FALLBACK_LOCALE,
        description: 'Language of the documentation: en, de (German), sr (Serbian), it (Italian), ' \
                     'pt_BR (Brazilian Portuguese). Answer in the language of the question.'
      }.freeze

      FALLBACK = {
        type: 'boolean',
        default: true,
        description: 'Fall back to English when the language has no answer. ' \
                     'English results are marked with `fallback: true`.'
      }.freeze

      def self.inherited(subclass)
        super
        subclass.annotations(read_only_hint: true, destructive_hint: false, idempotent_hint: true,
                             open_world_hint: false)
      end

      class << self
        def call(server_context:, **arguments)
          started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
          response = run(server_context:, **arguments)
          log(server_context, arguments, response, started)

          response
        end

        private

        # How a call went, without anything the client typed: locale, filters
        # (enums and numbers only), results (number) and fallback.
        def log_entry(arguments, structured)
          raise NotImplementedError, "#{name} has to describe its calls for the call log"
        end

        def log(server_context, arguments, response, started)
          structured = response.error? ? {} : response.structured_content || {}

          docs(server_context).call_log.record(
            tool: name_value,
            **log_entry(arguments, structured),
            duration_ms: ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - started) * 1000).round,
            error: response.error?
          )
        end

        def respond(structured, text)
          MCP::Tool::Response.new([{ type: 'text', text: }], structured_content: structured)
        end

        # A failure the client can show or act on, instead of a protocol error.
        def failure(message)
          MCP::Tool::Response.new([{ type: 'text', text: message }], error: true)
        end

        def docs(server_context) = server_context[:docs]
      end
    end
  end
end
