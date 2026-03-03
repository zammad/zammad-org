---
order: 1
---

# Beitragen

Wir freuen uns, wenn Sie zu Zammad beitragen! Sie können dies auf
verschiedene Arten tun. Sie können beitragen, indem Sie eines unserer Repos
auf GitHub forken und einen Pull Request mit Ihren Änderungen erstellen
(außer für Übersetzungen, siehe unten). 🚀

Sie können zu folgendem beitragen:

- [Quellcode](contribute#zammad-quellcode)
- [Dokumentation](contribute#dokumentation)
- [Übersetzung](contribute#ubersetzung)

Bitte werfen Sie einen Blick auf die nächsten Abschnitte, wie Sie beitragen
können. Alle Repos können auf
[Github](https://github.com/zammad){target=_blank} gefunden werden.

## Zammad Quellcode

The Zammad source code can be found on GitHub in the [Zammad
repository](https://github.com/zammad/zammad){target=_blank}. Have a look at
the [developer
manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
to get started.

### Unterstützte Branches / Versionen

Zammad's Github repository has several branches:

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

Open a new GitHub pull request at <https://github.com/zammad/zammad-org>
(targeting the `develop` branch) with your changes and make sure to follow
the [style and content guide](style-guide) and read the [repo's
README.md](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Übersetzung

If you want to help us with translation and improve the multi-language
support of Zammad and/or the documentation, you are welcome to contribute as
well! The translation of Zammad and the documentation is done via Weblate,
which is a service for the collaborative translation of projects.  Just head
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

Die Übersetzung von **Zammad** und die Übersetzung der **Dokumentation** sind in Weblate in verschiedene Projekte aufgeteilt.
Wenn Sie im oberen Menü auf _Projekte > Alle Projekte durchsuchen_ klicken, finden Sie eine Übersicht der Projekte:

![Screenshot mit Übersetzungsprojekten in Weblate und
Menü](/screenshots/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

- Dokumentation
  - Neue Dokumentation auf next.zammad.org
  - Neue Dokumentation auf zammad.org
- Zammad
  - Zammad (`develop`, Entwicklungsversion)
  - Zammad (`stable` Version)
  - _Einige weitere, die hier nicht relevant sind_

::: tip

Es macht keinen großen Unterschied, welchen Branch Sie für die Übersetzung wählen. Wenn Weblate die gleichen Zeichenketten in verschiedenen
Branches erkennt, werden sie für alle anderen verwendet und müssen nur einmal übersetzt werden. Im Zweifelsfall wählen Sie die `develop`
Version.
:::

After selecting a project (Documentation or Zammad), you will see different
sub-projects and their translation status summarized for all languages. Here
you can select one of the "components", which is more or less the same as
different versions. After selecting one of them, you can see the status of
translation for the different languages, as you can see in the following
screenshot:

![Screenshot showing translation status of different languages for the user
documentation](/screenshots/weblate-project-overview.png)

### Übersetzen

After selecting your language you want to translate to, a good starting
point is to select "_Untranslated strings_" (or the same meaning in your
language, depending on what you have set in your profile).  After that, you
will finally see the first untranslated string in the upper field and, in
theory, you can start to translate. But let's first have a brief look at the
user interface of Weblate:

![Screenshot des Weblate User-Interface](/screenshots/weblate-ui.png)

1. **Pfad** zum aktuellen Projekt und zur aktuellen Sprache
2. **Übersetzungsbereich** selbst. Sie finden die Zeichenkette der Quelle
   (_"English (United States) "_) ganz oben und das Feld für Ihre
   Übersetzung (_"French "_ in diesem Beispiel).
3. **Glossar**: Hier finden Sie gängige Übersetzungen im Zammad-Kontext. Die
   Begriffe aus dem Glossar sind auch in den Zeichenketten der Quelle
   hervorgehoben.
4. **Weitere nützliche Tabs**:
    - **Benachbarte Zeichenketten**: zeigt Ihnen den Kontext des Wortes oder
      der Zeichenkette an
    - **Automatische Vorschläge**: hier finden Sie automatische Vorschläge
      von DeepL und Vorschläge von ähnlichen Zeichenketten, die bereits
      übersetzt sind. Verwenden Sie die Schaltfläche "_In Übersetzung
      kopieren_", um sie in das Übersetzungsfeld einzufügen und die
      Änderungen zu übernehmen. Verwenden Sie die Schaltfläche "_Annehmen_",
      um die vorgeschlagene Übersetzung zu akzeptieren und automatisch zur
      nächsten Zeichenkette zu wechseln.
    - **Andere Sprachen**: Hier können Sie sich eine Übersicht verschaffen,
      welche Sprachen übersetzt wurden, und Sie können auch die übersetzten
      Zeichenketten sehen (könnte für Sprachen nützlich sein, die ähnlich
      sind).

### Markup in Strings

Find some examples for special source strings with applied markup
below. Depending on the string, it can be important to keep the markup
and/or variables. Also have a look at the [style guide](style-guide) where
you can find more information about the syntax and the usage of
Markdown/Vitepress features.

**\`Beispiel-Zeichenkette\`**
: Dies wird als `Beispiel-Zeichenkette` ausgegeben. Je nach Kontext kann diese übersetzt werden oder nicht. Verwenden Sie in jedem Fall das
  \` vor und nach der Zeichenkette in Ihrer Übersetzung.

**\[Beispiel\](/de/pfad/zu/dokument-oder-website\)**
: Dies ist ein Link zu einer anderen Seite, einschließlich des Sprachcodes. Das obige "Beispiel" ist der Text, der als Linktext angezeigt wird.
  Dieser Teil kann übersetzt werden. Für den Pfad darf nur das `en` durch den Sprachcode ersetzt werden, in dessen Sprache Sie
  übersetzen. Vergewissern Sie sich, dass Ihre Sprache bereits auf zammad.org vorhanden ist (überprüfen Sie dies im
  Sprachwechsel-Menü). Andernfalls kontaktieren Sie uns, wenn Sie Ihre Sprache aktivieren lassen wollen.

**\*\*Beispiel Zeichenkette\*\***
: Formatierung für Text (z.B. fett, kursiv). Alternativ: \Beispiel Zeichenkette\_. Diese Zeichenketten können übersetzt werden, aber die
  Formatierung (z.B. `**` oder `_`) sollte sinngetreu übernommen werden.
