# frozen_string_literal: true

require 'json'
require 'time'

module ZammadDocsMcp
  # Log of the tool calls, one JSON line per call on stdout, so that it shows
  # in `docker compose logs`: the tool, the language, the filters, the number
  # of results, whether it fell back to English, the duration and whether it
  # failed.
  #
  # Nothing a client typed is logged: no query, page or term, as they can
  # contain personal data. Neither are IP addresses or headers. The filters
  # are enums and numbers of the tools' input schemas.
  #
  # Logging never fails a tool call.
  class CallLog
    def initialize(io = $stdout, clock: -> { Time.now.utc })
      @io = io
      @clock = clock
      @mutex = Mutex.new
    end

    # Writes one entry: tool, locale, filters, results (count), fallback,
    # duration_ms and error.
    def record(**entry)
      line = JSON.generate({ time: @clock.call.iso8601(3), event: 'tool_call', **entry })

      @mutex.synchronize do
        @io.puts(line)
        @io.flush
      end
    rescue IOError, SystemCallError
      nil
    end
  end
end
