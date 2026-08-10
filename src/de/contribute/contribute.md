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

Wenn Sie uns bei der Übersetzung helfen und die Mehrsprachigkeit von Zammad
oder der Dokumentation verbessern wollen, sind Sie ebenfalls herzlich
willkommen! Die Übersetzung von Zammad und der Dokumentation erfolgt über
Weblate, einen Dienst für die gemeinschaftliche Übersetzung von
Projekten. Gehen Sie einfach zu Zammads
[Weblate-Instanz](https://translations.zammad.org/){target=_blank}. Sie
können entweder ein Konto erstellen (falls Sie noch keins haben) oder sich
sogar mit Ihrem Github-Konto anmelden!

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

Unten finden Sie einige Beispiele für spezielle Zeichenketten mit einem
Hinweis darauf, wo eine solche Zeichenkette zu finden ist. Versuchen Sie,
das (angepasste) Markup beizubehalten und achten Sie darauf, die Variablen
beizubehalten. Der Abschnitt **Ort der Ausgangszeichenkette** in Weblate
(auf der rechten Seite) gibt Ihnen einen Hinweis, wo Sie nach dem Kontext
suchen können. Werfen Sie auch einen Blick in den [Styleguide der
Dokumentation](style-guide), wo Sie weitere Informationen über die Syntax
und die Verwendung der Markdown/Vitepress-Funktionen finden.

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
