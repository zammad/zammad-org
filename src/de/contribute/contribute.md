---
order: 1
---

# Beitragen

We are happy to see you contribute to Zammad! You can do this in several
ways. Contributions are mainly done by cloning one of our repos on GitHub
and creating a pull request with your changes (except for translations, see
below). 🚀

Sie können zu folgendem beitragen:

- [Quellcode](contribute#zammad-quellcode)
- [Dokumentation](contribute#dokumentation)
- [Übersetzung](contribute#ubersetzung)

Bitte werfen Sie einen Blick auf die nächsten Abschnitte, wie Sie beitragen
können. Alle Repos können auf
[Github](https://github.com/zammad){target=_blank} gefunden werden.

## Zammad Quellcode

Der Quellcode von Zammad ist auf GitHub im
[Zammad-Repository](https://github.com/zammad/zammad){target=_blank} zu
finden. Werfen Sie einen Blick in das [Developer
Manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank},
um loszulegen.

### Unterstützte Branches / Versionen

Zammads Repository auf Github hat mehrere Branches:

#### `develop`

- Dies ist der aktuelle (unveröffentlichte) Entwicklungsstand der nächsten
  Hauptversion (dieser wird zum neuen `stable`-Branch).
- Verwenden Sie diesen nicht für den Produktiv-Betrieb!
- Dieser Branch wird aktiv unterstützt und erhält regelmäßig
  Fehlerkorrekturen sowie Sicherheitsaktualisierungen (siehe [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  für weitere Details).

#### `stable`

- Dies ist die aktuelle stabile Version, z.B. Zammad 5.2.
- Verwenden Sie diese für den Produktiv-Betrieb.
- Dieser Branch wird aktiv unterstützt und erhält regelmäßig
  Fehlerkorrekturen sowie Sicherheitsaktualisierungen (siehe [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  für weitere Details).

#### `stable-x.y`

- Dies sind Branches von alten Versionen von Zammad wie `stable-5.1` für
  Zammad 5.1.
- Verwenden Sie diesen nicht für den Produktiv-Betrieb!
- Fehlerbehebungen und Sicherheitsaktualisierungen werden nicht auf diese
  Branches angewendet.

## Dokumentation

Die Dokumentation, die Sie gerade lesen, ist auf zammad.org und
next.zammad.org verfügbar und wird mit Vitepress erstellt. Die Quelldateien
sind in Markdown geschrieben. Stellen Sie sicher, dass Sie nur die
englischen Quelldateien ändern, die sich unter `/src/en/` befinden. Die
Übersetzung erfolgt mit Weblate und überschreibt alle Änderungen in den
sprachspezifischen Ordnern (außer `/src/en/`).

Öffnen Sie einen neuen GitHub-Pull-Request unter
<https://github.com/zammad/zammad-org> (mit `develop` Branch als Ziel) mit
Ihren Änderungen und stellen Sie sicher, dass Sie den [Stil- und
Inhaltsleitfaden](style-guide) befolgen. Werfen Sie auch einen Blick in die
[README.md](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}
des Repos.

## Übersetzung

If you want to help us with translation and improve the multi-language
support of Zammad or the documentation, you are welcome to contribute as
well! The translation of Zammad and the documentation is done via Weblate,
which is a service for the collaborative translation of projects. Just head
over to Zammad's [Weblate
instance](https://translations.zammad.org/){target=_blank}.  You can either
create an account (if you don't have one already) or even sign in with your
Github account!

In den folgenden Abschnitten werden wir einige grundlegende Schritte
behandeln, damit Sie mit dem Übersetzen beginnen können. Wenn Sie jedoch
einige zusätzliche Funktionen von Weblate nutzen und tiefer eintauchen
möchten, ist deren
[Übersetzungsdokumentation](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
ein guter Ausgangspunkt.

### Grundlagen

The translation of **Zammad** and the translation of the **documentation** are split into different projects in Weblate.
When you click in the top menu under _Projects > Browse all projects_, you can find the overview of the projects:

![Screenshot showing translation projects in Weblate and
menu](/screenshots/contribute/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

- Dokumentation
  - Neue Dokumentation auf next.zammad.org
  - Neue Dokumentation auf zammad.org
- Zammad
  - Zammad (`develop`, Entwicklungsversion)
  - Zammad (`stable` Version)
  - Some more which aren't relevant here

Select a project (documentation or Zammad) and switch to the **Components**
tab. Select the one you want to translate.  After that, you can see the
status of translation for the different languages, as you can see in the
following screenshot:

![Screenshot showing translation status of different languages for the user
documentation](/screenshots/contribute/weblate-project-overview.png)

::: tip
It should be no big difference which component/branch you choose to translate. When Weblate detects the same strings in
different components, they will be used for all branches and only have to be translated once. If in doubt, choose
`develop`.
:::

### Übersetzen

Now check the "Unfinished" column of your language and click on the number
there. This opens the first untranslated string and, in theory, you can
start translating. But let's first have a brief look at the user interface
of Weblate:

![Screenshot of Weblate translation user
interface](/screenshots/contribute/weblate-ui.png)

1. **Breadcrumbs with path** to the current project, component and language
2. **Translation area** itself. You can find the source string at the top
   and the field for your translation below.
3. **Glossary**: when a string or parts of it is detected as being present
   in the glossary, you can find additional information there. It is also
   highlighted in the source strings.
4. **Weitere nützliche Tabs**:
    - **Benachbarte Zeichenketten**: zeigt Ihnen den Kontext des Wortes oder
      der Zeichenkette an
    - **Automatic suggestions**: here you can find automatic suggestions
      from DeepL and suggestions from similar strings, which are already
      translated. Use the `Clone to translation` button to insert it in the
      translation field to apply changes. Use the `Accept` button to accept
      the suggested translation and automatically switch to the next string.
    - **Other languages**: here you see an list if and how the string is
      translated into other languages (could be useful for languages, which
      are similar).

### Zeichenketten mit Auszeichnung

Find some examples for special source strings below with a badge indicating
where such a string can be found. Try to keep the (adjusted) markup and make
sure to keep the variables. The **Source string location** section in
Weblate (on the right side) gives you a hint where to search for the
context. Also have a look at the [style guide of the
documentation](style-guide) where you can find more information about the
syntax and the usage of Markdown/Vitepress features.

`%s created ticket |%s|` <Badge type="tip" text="Zammad" />
: The string contains variables (`%s`) and markup (`||`). Make sure that the variable and markup is included in the
  translation. The position may vary depending on the translation.

`` `example-string` `` <Badge type="tip" text="Documentation" />
: This is rendered as inline code (`example-string`). Depending on the context, it can be translated or not. In any
  case, use a backtick (`` ` ``) before and after the string in your translation as well.

`[example](/en/path/to/document-or-website)` <Badge type="tip" text="Documentation" />
: This is a link to another page, including the language code. The above "example" is the text, which is shown as
  link text. This part can be translated. For the path, only the `en` may be replaced by the language code you are
  translating in. Make sure that your language is already present on zammad.org (check it by using the language
  switcher). Otherwise contact us if you want to have your language activated.

`**example string**` <Badge type="tip" text="Documentation" />
: Markup for text (e.g. bold, italics). Alternative: `_example string_`. Try to keep the markup in general but adjust
  it to keep the meaning.
