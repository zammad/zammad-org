---
order: 1
---

# Beitragen

Wir freuen uns, wenn Sie zu Zammad beitragen! Sie können dies auf
verschiedene Arten tun. Sie können beitragen, indem Sie eines unserer Repos
auf GitHub forken und einen Pull Request mit Ihren Änderungen erstellen
(außer für Übersetzungen, siehe unten). 🚀

Sie können dazu beitragen:
 * [Quellcode](contribute#zammad-quellcode)
 * [Dokumentation](contribute#dokumentation)
 * [Übersetzung](contribute#ubersetzung)

Bitte sehen Sie sich unsere Hinweise für Beiträge an.

Alle Repos sind auf [Github](https://github.com/zammad){target=_blank} zu
finden.


## Zammad Quellcode

Der Quellcode von Zammad ist auf GitHub im [Zammad
Repository](https://github.com/zammad/zammad){target=_blank} zu finden.

Werfen Sie einen Blick in das
[Entwicklerhandbuch](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank},
um loszulegen.

### Unterstützte Branches / Versionen

Das
Haupt-[Zammad-Repository](https://github.com/zammad/zammad){target=_blank}
auf Github hat mehrere Branches.

#### `develop`

* Dies ist der aktuelle (unveröffentlichte) Entwicklungsstand der nächsten
  Hauptversion (dieser wird zum neuen `stable`-Branch).
* Verwenden Sie das nicht für den Produktiv-Betrieb!
* Unterstützt durch Fehler- und Sicherheitskorrekturen - siehe auch unsere
  [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable`

* Dies ist die aktuelle stabile Version, z.B. Zammad 5.2.
* Verwenden Sie diese für den Produktiv-Betrieb.
* Unterstützt durch Fehler- und Sicherheitskorrekturen - siehe auch unsere
  [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable-x.y`

* Dies sind Branches von alten Versionen von Zammad wie `stable-5.1` für
  Zammad 5.1.
* Keine Unterstützung durch Fehler- oder Sicherheitskorrekturen.

## Dokumentation

Möchten Sie zur Zammad-Dokumentation beitragen?

Erstellen Sie einen neuen GitHub-Pull-Request auf
https://github.com/zammad/zammad-org mit Ihren Änderungen und stellen Sie
sicher, dass Sie die Voraussetzungen und Anweisungen aus der README des Repo
befolgen.

Die Dokumentation, die Sie gerade lesen, ist auf next.zammad.org und
zammad.org verfügbar und wird über Vitepress erstellt. Die Quelldateien sind
in Markdown geschrieben.  Stellen Sie sicher, dass Sie nur die englischen
Quelldateien ändern, die sich unter `/src/en/` befinden. Die Übersetzung
erfolgt über Weblate und überschreibt alle Änderungen in den
sprachspezifischen Ordnern (außer `/src/eng/`).

## Übersetzung

Wenn Sie uns bei der Übersetzung helfen und die mehrsprachige Unterstützung
von Zammad und/oder der Dokumentation verbessern wollen, sind Sie ebenfalls
willkommen! Die Übersetzung von Zammad selbst und der Dokumentation erfolgt
mit Hilfe von Weblate, einem Dienst für die gemeinschaftliche Übersetzung
von Projekten.

Sie müssen dazu nur zu Zammads
[Weblate-Instanz](https://translations.zammad.org/){target=_blank} gehen.
Sie können entweder ein Konto erstellen (falls Sie noch keines haben) oder
sich sogar mit Ihrem Github-Konto anmelden!

In den folgenden Abschnitten werden wir einige grundlegende Schritte
behandeln, damit Sie mit dem Übersetzen beginnen können. Wenn Sie jedoch
einige zusätzliche Funktionen von Weblate nutzen und tiefer eintauchen
möchten, ist deren
[Übersetzungsdokumentation](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
ein guter Ausgangspunkt.

### Grundlagen

Die Übersetzung von **Zammad** und die Übersetzung der **Dokumentation**
sind in Weblate in verschiedene Projekte aufgeteilt. Wenn Sie im oberen Menü unter
"*Projekte > Alle Projekte auflisten*" klicken, finden Sie die Übersicht über die
Projekte:

![Screenshot mit Übersetzungsprojekten in Weblate und
Menü](/screenshots/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

 * Dokumentation
    * Neue Dokumentation auf next.zammad.org
 * Zammad
    * Zammad (`develop`, Entwicklungsversion)
    * Zammad (`stable` Version)
    * *Einige weitere, die hier nicht relevant sind*

::: tip

Es macht keinen großen Unterschied, welchen Zweig Sie zur Übersetzung wählen. Wenn Weblate
die gleichen Zeichenketten in verschiedenen Branches erkennt, werden sie für alle
Branches verwendet und müssen nur einmal übersetzt werden.
I m Zweifelsfall wählen Sie die `develop` Version.
:::

Nachdem Sie ein Projekt (Dokumentation oder Zammad) ausgewählt haben, sehen
Sie verschiedene Unterprojekte und deren Übersetzungsstatus für alle
Sprachen in einer Übersicht.  Diese Übersichten können eine recht niedrige
Übersetzungsrate zeigen, was auf die Menge der aktiven Sprachen
zurückzuführen ist.

Hier können Sie eine der "Komponenten" auswählen, was mehr oder weniger dasselbe ist wie
verschiedenen Versionen. Nachdem Sie eine der Komponenten ausgewählt haben, können Sie den Status der
Übersetzung für die verschiedenen Sprachen sehen, wie im
folgenden Screenshot mit einem Beispiel aus *Dokumentation > Benutzer
Dokumentation (latest)*:

![Screenshot zeigt Übersetzungsstand der verschiedenen Sprachen für die
Benutzer Dokumentation ](/screenshots/weblate-translations-user-docs.png)

### Übersetzen

Nachdem Sie die Sprache ausgewählt haben, in die Sie übersetzen möchten,
sollten Sie zunächst "*Nicht übersetzt*" auswählen (oder die gleiche
Bedeutung in Ihrer Sprache, je nachdem, was Sie in Ihrem Profil eingestellt
haben).

Danach sehen Sie die erste unübersetzte Zeichenkette im oberen Feld und
können theoretisch mit dem Übersetzen beginnen. Zunächst eine kurze
Übersicht über die Benutzeroberfläche von Weblate:

![Screenshot des Weblate User-Interface](/screenshots/weblate-ui.png)

1. **Pfad** zum aktuellen Projekt und zur aktuellen Sprache
2. **Übersetzungsbereich** selbst. Sie finden die Zeichenkette der Quelle
   (*"English (United States) "*) ganz oben und das Feld für Ihre
   Übersetzung (*"French "* in diesem Beispiel).
3. **Glossar**: Hier finden Sie gängige Übersetzungen im Zammad-Kontext. Die
   Begriffe aus dem Glossar sind auch in den Zeichenketten der Quelle
   hervorgehoben.
4. **Weitere nützliche Tabs**:
    * **Benachbarte Zeichenketten**: zeigt Ihnen den Kontext des Wortes oder
      der Zeichenkette an
    * **Automatische Vorschläge**: hier finden Sie automatische Vorschläge
      von DeepL und Vorschläge von ähnlichen Zeichenketten, die bereits
      übersetzt sind.  Verwenden Sie die Schaltfläche "*In Übersetzung
      kopieren*", um sie in das Übersetzungsfeld einzufügen und die
      Änderungen zu übernehmen. Verwenden Sie die Schaltfläche "*Annehmen*",
      um die vorgeschlagene Übersetzung zu akzeptieren und automatisch zur
      nächsten Zeichenkette zu wechseln.
    * **Andere Sprachen**: Hier können Sie sich eine Übersicht verschaffen,
      welche Sprachen übersetzt wurden, und Sie können auch die übersetzten
      Zeichenketten sehen (könnte für Sprachen nützlich sein, die ähnlich
      sind).

### Fehlerbehebung

Und schließlich noch einige Hinweise für "spezielle" Zeichenketten, die Sie
vielleicht in den Dokumentationsprojekten sehen:

- **\`Beispiel-String\`**

    Dies wird als `Beispiel-String` ausgegeben. Je nach Kontext kann dieser
    übersetzt werden oder nicht. Verwenden Sie in jedem Fall \` vor und nach der Zeichenkette in
    Ihrer Übersetzung.

- **\[Beispiel\](/en/pfad/zu/dokument-oder-website\)**

    Dies ist ein Link zu einer anderen Seite, einschließlich des Sprachcodes.
    Das obige "Beispiel" ist der Text, der als Linktext angezeigt wird. Dieser Teil kann
    übersetzt werden. Für den Pfad darf nur das `en` durch den Sprachcode ersetzt werden,
    in den Sie übersetzen. Stellen Sie sicher, dass Ihre Sprache
    bereits auf zammad.org vorhanden ist (überprüfen Sie dies mit dem Sprachumschalter).
    Andernfalls kontaktieren Sie uns, wenn Sie Ihre Sprache aktivieren lassen wollen (und ein
    maßgeblicher Teil der Zeichenketten bereits übersetzt ist).

- **\*\*Beispiel Text\*\***

    Markierung für Text (z. B. fett, kursiv). Alternativ: \*Beispiel Text\*.
    Diese Zeichenketten können übersetzt werden, aber die Markup-Kennzeichnung
    (z.B. ein oder mehrere \*) sollte sinngemäß übernommen werden.


