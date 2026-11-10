# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Pages::Cut do
  describe '.call' do
    let(:code) { "```json\n#{"{\"key\": \"value\"}\n" * 20}```\n" }

    it 'leaves short pages alone' do
      expect(described_class.call("# Page\n\nText.\n", 100)).to eq(["# Page\n\nText.\n", false])
    end

    it 'cuts at the last heading when that keeps at least half' do
      markdown = "# Page\n\n#{'Text. ' * 10}\n\n## Next\n\n#{'More. ' * 20}\n"

      expect(described_class.call(markdown, 100)).to eq(["# Page\n\n#{'Text. ' * 10}".rstrip, true])
    end

    it 'cuts at a paragraph instead of losing most of the page' do
      markdown = "# Page\n\n## Early\n\n#{"Text.\n\n" * 20}#{code}"
      text, truncated = described_class.call(markdown, 120)

      expect(truncated).to be(true)
      expect(text.length).to be > 60
      expect(text).not_to include('```')
    end

    it 'never cuts inside a code block' do
      markdown = "# Page\n\nIntro.\n\n#{code}\n## After\n"
      text, = described_class.call(markdown, 150)

      expect(text).to eq("# Page\n\nIntro.")
    end
  end
end
