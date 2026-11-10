# frozen_string_literal: true

RSpec.describe ZammadDocsMcp::Tools::GetGlossaryTerm do
  def lookup(term, **arguments)
    call_tool('get_glossary_term', { term:, **arguments })
  end

  def result_of(term, **arguments) = lookup(term, **arguments)['structuredContent']

  it 'returns the definition with a citable URL and absolute links' do
    result = result_of('agent')

    expect(result).to include('found' => true, 'locale' => 'en', 'fallback' => false)
    expect(result['entries']).to eq(
      [{
        'term' => 'Agent',
        'definition' => 'An agent is a user who works on tickets. See the ' \
                        '[glossary](https://docs.example.org/en/reference/glossary.html).',
        'url' => 'https://docs.example.org/en/reference/glossary.html#section-a'
      }]
    )
  end

  it 'finds German terms regardless of case and accents' do
    result = result_of('ubersicht', locale: 'de')

    expect(result['entries'].map { |e| e['term'] }).to eq(['Übersicht'])
  end

  it 'finds a term by the part in parentheses and by the part before' do
    expect(result_of('Autosave', locale: 'de')['entries'].map { |e| e['term'] })
      .to eq(['Automatisches Speichern (Autosave)'])
    expect(result_of('automatisches speichern', locale: 'de')['found']).to be(true)
  end

  it 'finds a term by an alias in parentheses' do
    expect(result_of('CD')['entries'].map { |e| e['term'] }).to eq(['Custom development (CD)'])
  end

  it 'treats a leading parenthesis as optional words, not as an alias' do
    expect(result_of('template')['entries'].map { |e| e['term'] }).to eq(['(Ticket) template'])
    expect(result_of('ticket template')['found']).to be(true)
    expect(result_of('ticket')['found']).to be(false)
  end

  it 'falls back to the English glossary, and says so' do
    result = lookup('Trigger', locale: 'de')

    expect(result['structuredContent']).to include('found' => true, 'locale' => 'en', 'fallback' => true)
    expect(result['content'].first['text']).to start_with('Not in the glossary of the requested language')
  end

  it 'suggests the closest terms for an unknown term instead of failing' do
    result = lookup('trigers')

    expect(result['isError']).to be(false)
    expect(result['structuredContent']).to include('found' => false, 'entries' => [], 'suggestions' => ['Trigger'])
    expect(result['content'].first['text']).to include('Closest terms: Trigger')
  end

  it 'does not fall back when asked not to' do
    expect(result_of('Trigger', locale: 'de', fallback: false)['found']).to be(false)
  end

  it 'reports a language without documentation as a tool error' do
    expect(lookup('agent', locale: 'sr')['isError']).to be(true)
  end
end
