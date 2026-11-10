# frozen_string_literal: true

module ZammadDocsMcp
  # What the tools work with, handed to them as `server_context[:docs]`.
  # The call log goes to stdout; the specs pass their own `log`.
  Context = Data.define(:config, :typesense, :content, :call_log) do
    define_singleton_method(:from_config) do |config, log: $stdout|
      new(
        config:,
        typesense: Typesense.new(url: config.typesense_url, key: config.typesense_key),
        content: Content.new(agent_data_dir: config.agent_data_dir, pages_dir: config.pages_dir),
        call_log: CallLog.new(log)
      )
    end
  end
end
