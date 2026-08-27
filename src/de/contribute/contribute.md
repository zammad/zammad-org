---
order: 1
---

# Beitragen

Wir freuen uns, wenn Sie zu Zammad beitragen! Sie können dies auf
verschiedene Arten tun. Sie können beitragen, indem Sie eines unserer Repos
auf GitHub klonen und einen Pull Request mit Ihren Änderungen erstellen
(außer für Übersetzungen, siehe unten). 🚀

Sie können zu folgendem beitragen:

- [Quellcode](contribute#zammad-quellcode)
- [Dokumentation](contribute#dokumentation)
- [Übersetzung](contribute#ubersetzung)

Please have a look at our the sections below about how to contribute. All
repos can be found on [GitHub](https://github.com/zammad){target=_blank}.

## Zammad Quellcode

Der Quellcode von Zammad ist auf GitHub im
[Zammad-Repository](https://github.com/zammad/zammad){target=_blank} zu
finden. Werfen Sie einen Blick in das [Developer
Manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank},
um loszulegen.

### Unterstützte Branches / Versionen

Zammad's GitHub repository has several branches:

#### `develop`

- Dies ist der aktuelle (unveröffentlichte) Entwicklungsstand der nächsten
  Hauptversion (dieser wird zum neuen `stable`-Branch).
- Verwenden Sie diesen nicht für den Produktiv-Betrieb!
- This branch is actively supported and receives regular bug fixes and
  security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable`

- Dies ist die aktuelle stabile Version, z.B. Zammad 5.2.
- Verwenden Sie diese für den Produktiv-Betrieb.
- This branch is actively supported and receives regular bug fixes and
  security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable-x.y`

- Dies sind Branches von alten Versionen von Zammad wie `stable-5.1` für
  Zammad 5.1.
- Verwenden Sie diesen nicht für den Produktiv-Betrieb!
- Fehlerbehebungen und Sicherheitsaktualisierungen werden nicht auf diese
  Branches angewendet.

## Dokumentation

The documentation you are reading is available on zammad.org and
next.zammad.org and is built with VitePress. The source files are written in
Markdown. Make sure to change the English source files only which are placed
under `/src/en/`. The translation is done via Weblate and will overwrite any
changes in the language specific folders (except `/src/en/`).

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
GitHub account!

We will cover some basic steps in the following sections to get you started
with translating. However, if you want to use some additional features of
Weblate and want to dive deeper into it, their [translation
documentation](https://docs.weblate.org/en/latest/user/translating.html){target=_blank}
is a good starting point.

### Grundlagen

Die Übersetzung von **Zammad** und die Übersetzung der **Dokumentation** sind in Weblate in verschiedene Projekte aufgeteilt.
Wenn Sie im oberen Menü auf _Projekte > Alle Projekte durchsuchen_ klicken, finden Sie eine Übersicht der Projekte:

![Screenshot mit Übersetzungsprojekten in Weblate und
Menü](/screenshots/contribute/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

- Dokumentation
  - Neue Dokumentation auf next.zammad.org
  - Neue Dokumentation auf zammad.org
- Zammad
  - Zammad (`develop`, Entwicklungsversion)
  - Zammad (`stable` Version)
  - Einige weitere, die hier nicht relevant sind

Wählen Sie ein Projekt (Dokumentation oder Zammad) und wechseln Sie auf den
Tab **Komponenten**. Wählen Sie die Komponente aus, die Sie übersetzen
möchten. Danach können Sie den Status der Übersetzung für die verschiedenen
Sprachen sehen, wie zum Beispiel im folgenden Screenshot:

![Screenshot zeigt Übersetzungsstand der verschiedenen Sprachen für die
Benutzer
Dokumentation](/screenshots/contribute/weblate-project-overview.png)

::: tip
Es macht keinen großen Unterschied, welche Komponente/Branch Sie für die Übersetzung wählen. Wenn Weblate die gleichen Zeichenketten in verschiedenen
Komponenten erkennt, werden sie für alle anderen verwendet und müssen nur einmal übersetzt werden. Im Zweifelsfall wählen Sie die `develop`
Version.
:::

### Übersetzen

Prüfen Sie nun die Spalte "Unvollständig" Ihrer Sprache und klicken Sie auf
die darin stehende Zahl. Dadurch wird die erste unübersetzte Zeichenkette
geöffnet und Sie können theoretisch mit der Übersetzung beginnen. Aber
lassen Sie uns zunächst einen kurzen Blick auf die Benutzeroberfläche von
Weblate werfen:

![Screenshot des Weblate
User-Interface](/screenshots/contribute/weblate-ui.png)

1. **Breadcrumbs mit Pfad** zum aktuellen Projekt, zur Komponente und zur
   Sprache
2. **Übersetzungsbereich** selbst. Die Zeichenkette der Quelle finden Sie
   oben, das Feld für Ihre Übersetzung darunter.
3. **Glossar**: Wenn eine Zeichenkette oder Teile davon als im Glossar
   vorhanden erkannt werden, können Sie dort zusätzliche Informationen
   finden. Entsprechende begriffe werden auch in den Quell-Zeichenketten
   hervorgehoben.
4. **Weitere nützliche Tabs**:
    - **Benachbarte Zeichenketten**: zeigt Ihnen den Kontext des Wortes oder
      der Zeichenkette an
    - **Automatische Vorschläge**: hier finden Sie automatische Vorschläge
      von DeepL und Vorschläge von ähnlichen Zeichenketten, die bereits
      übersetzt sind. Verwenden Sie die Schaltfläche In `Übersetzung
      kopieren`, um sie in das Übersetzungsfeld einzufügen und die
      Änderungen zu übernehmen. Verwenden Sie die Schaltfläche `Annehmen`,
      um die vorgeschlagene Übersetzung zu akzeptieren und automatisch zur
      nächsten Zeichenkette zu wechseln.
    - **Andere Sprachen**: Hier können Sie sich eine Übersicht verschaffen,
      welche Sprachen übersetzt wurden, und Sie können auch die übersetzten
      Zeichenketten sehen (könnte für Sprachen nützlich sein, die ähnlich
      sind).

### Zeichenketten mit Auszeichnung

Find some examples for special source strings below with a badge indicating
where such a string can be found. Try to keep the (adjusted) markup and make
sure to keep the variables. The **Source string location** section in
Weblate (on the right side) gives you a hint where to search for the
context. Also have a look at the [style guide of the
documentation](style-guide) where you can find more information about the
syntax and the usage of Markdown/VitePress features.

`%s created ticket |%s|` <Badge type="tip" text="Zammad" />
: Die Zeichenkette enthält Variablen (`%s`) und Markup (`||`). Stellen Sie sicher, dass die Variablen und das Markup in der
  Übersetzung enthalten sind. Die Position kann je nach Übersetzung variieren.

`` `example-string` `` <Badge type="tip" text="Dokumentation" />
: Dies wird als Inline-Code wiedergegeben (`example-string`). Je nach Kontext kann er übersetzt werden oder nicht.
  Auf jeden Fall muss ein Backtick (`` ` ``) vor und nach der Zeichenkette in Ihrer Übersetzung vorhanden sein.

`[example](/en/path/to/document-or-website)` <Badge type="tip" text="Dokumentation" />
: Dies ist ein Link zu einer anderen Seite, einschließlich des Sprachcodes. Das obige "example" ist der Text, der als Linktext angezeigt wird.
  Dieser Teil kann übersetzt werden. Für den Pfad darf nur das `en` durch den Sprachcode ersetzt werden, in dessen Sprache Sie
  übersetzen. Vergewissern Sie sich, dass Ihre Sprache bereits auf zammad.org vorhanden ist (überprüfen Sie dies im
  Sprachwechsel-Menü). Andernfalls kontaktieren Sie uns, wenn Sie Ihre Sprache aktivieren lassen wollen.

`**example string**` <Badge type="tip" text="Dokumentation" />
: Markup für Text (z.B. fett, kursiv). Alternative: `_example string_`. Versuchen Sie, das Markup im Allgemeinen beizubehalten,
  aber passen Sie es ggf. an, um die Bedeutung zu erhalten.
