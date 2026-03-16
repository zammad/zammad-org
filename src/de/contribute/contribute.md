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
und/oder der Dokumentation verbessern wollen, sind Sie ebenfalls herzlich
willkommen! Die Übersetzung von Zammad und der Dokumentation erfolgt über
Weblate, einen Dienst für die gemeinschaftliche Übersetzung von Projekten.
Gehen Sie einfach zu Zammads
[Weblate-Instanz](https://translations.zammad.org/){target=_blank}.  Sie
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

Nachdem Sie ein Projekt (Dokumentation oder Zammad) ausgewählt haben, sehen
Sie verschiedene Unterprojekte und deren Übersetzungsstatus für alle
Sprachen zusammengefasst. Hier können Sie eine der "Komponenten" auswählen,
die mehr oder weniger dasselbe sind wie verschiedene Versionen. Nachdem Sie
eine davon ausgewählt haben, können Sie den Übersetzungsstatus für die
verschiedenen Sprachen sehen, wie auf folgendem Screenshot zu sehen:

![Screenshot zeigt Übersetzungsstand der verschiedenen Sprachen für die
Benutzer Dokumentation](/screenshots/weblate-project-overview.png)

### Übersetzen

Nachdem Sie die Sprache ausgewählt haben, in die Sie übersetzen möchten,
sollten Sie zunächst "_Unvollständig_" auswählen (oder die gleiche Bedeutung
in Ihrer Sprache, je nachdem, was Sie in Ihrem Profil eingestellt haben).
Danach sehen Sie die erste unübersetzte Zeichenkette im oberen Feld und
können theoretisch mit der Übersetzung beginnen. Doch werfen wir zunächst
einen kurzen Blick auf die Benutzeroberfläche von Weblate:

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

### Zeichenketten mit Auszeichnung

Nachfolgend finden Sie einige Beispiele für spezielle Zeichenketten mit
angewandtem Markup. Je nach Zeichenkette kann es wichtig sein, das Markup
und/oder die Variablen beizubehalten. Werfen Sie auch einen Blick in den
[Stil- und Inhaltsleitfaden](style-guide), wo Sie weitere Informationen über
Syntax und die Verwendung von Markdown/Vitepress-Funktionen finden.

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
