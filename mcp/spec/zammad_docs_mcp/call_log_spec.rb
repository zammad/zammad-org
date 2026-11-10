# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::CallLog do
  let(:io) { StringIO.new }

  it 'writes one JSON line per entry' do
    log = described_class.new(io, clock: -> { Time.utc(2026, 11, 9, 12) })
    log.record(tool: 'search_docs', results: 0)
    log.record(tool: 'get_page', results: 1)

    expect(io.string.lines.map { |line| JSON.parse(line) }).to eq(
      [
        { 'time' => '2026-11-09T12:00:00.000Z', 'event' => 'tool_call', 'tool' => 'search_docs', 'results' => 0 },
        { 'time' => '2026-11-09T12:00:00.000Z', 'event' => 'tool_call', 'tool' => 'get_page', 'results' => 1 }
      ]
    )
  end

  it 'never fails a tool call' do
    io.close

    expect { described_class.new(io).record(tool: 'search_docs') }.not_to raise_error
  end
end
