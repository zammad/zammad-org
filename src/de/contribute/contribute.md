---
order: 1
---

# Beitragen

Wir freuen uns, wenn Sie zu Zammad beitragen! Sie können dies auf
verschiedene Arten tun. Sie können beitragen, indem Sie eines unserer Repos
auf GitHub forken und einen Pull Request mit Ihren Änderungen erstellen
(außer für Übersetzungen, siehe unten). 🚀

Sie können dazu beitragen:
 * [Quellcode]contribute#zammad-source-code)
 * [Dokumentation](contribute#documentation)
 * [Übersetzung](contribute#translation)

Bitte sehen Sie sich unsere Hinweise für Beiträge an.

Alle Repos sind auf [Github](https://github.com/zammad) zu finden.


## Zammad Quellcode

Der Quellcode von Zammad ist auf GitHub im [Zammad Repository]
(https://github.com/zammad/zammad) zu finden.

Werfen Sie einen Blick in das [Entwicklerhandbuch]
(https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md),
um loszulegen.

### Unterstützte Branches / Versionen

Das Haupt-[Zammad-Repository] (https://github.com/zammad/zammad) auf Github
hat mehrere Branches.

#### `develop`

* This is the current (unreleased) development state of next major release
  (this will become the new `stable` branch).
* Verwenden Sie das nicht für den Produktiv-Betrieb!
* Unterstützt durch Fehler- und Sicherheitskorrekturen - siehe auch unsere
  [Security Policy]
  (https://github.com/zammad/zammad/blob/develop/SECURITY.md).

#### `stable`

* Dies ist die aktuelle stabile Version, z.B. Zammad 5.2.
* Verwenden Sie diese für den Produktiv-Betrieb.
* Unterstützt durch Fehler- und Sicherheitskorrekturen - siehe auch unsere
  [Security Policy]
  (https://github.com/zammad/zammad/blob/develop/SECURITY.md).

#### `stable-x.y`

* These are the branches of old versions of Zammad like `stable-5.1` for
  Zammad 5.1.
* Keine Unterstützung durch Fehler- oder Sicherheitskorrekturen.

## Dokumentation

Möchten Sie zur Zammad-Dokumentation beitragen?

Öffnen Sie einen neuen GitHub Pull-Request unter

* https://github.com/zammad/zammad-org (die Dokumentation, die Sie gerade
  lesen)
* https://github.com/zammad/zammad-documentation (bisherige Dokumentation)
* https://github.com/zammad/zammad-admin-documentation (bisherige
  Dokumentation)
* https://github.com/zammad/zammad-user-documentation (bisherige
  Dokumentation)

mit Ihren Änderungen.

Die bisherige Dokumentation wird auf Read the Docs gehostet. Sie finden sie
unter:

* https://docs.zammad.org
* https://admin-docs.zammad.org
* https://user-docs.zammad.org

The documentation you are reading is available on next.zammad.org and
zammad.org and is built via Vitepress. The source files are written in
Markdown.  Make sure to change the English source files only which are
placed under `/src/en/`. The translations are made via Weblate and will
overwrite any changes in the language specific folders (except `/src/eng/`).

### ReStructuredText-Markup

Wenn Sie die bisherige Dokumentation bearbeiten möchten, verwenden Sie die
Auszeichnungssprache ReStructuredText.  Informationen über diese Sprache
finden Sie unter:

  * http://www.sphinx-doc.org/en/stable/rest.html
  * http://docutils.sourceforge.net/docs/user/rst/quickref.html
  * http://docs.readthedocs.io/en/latest/_themes/sphinx_rtd_theme/demo_docs/source/demo.html

Danke! ❤ ❤ ❤

Zammad-Team

## Übersetzung

Wenn Sie uns bei der Übersetzung helfen und die mehrsprachige Unterstützung
von Zammad und/oder der Dokumentation verbessern wollen, sind Sie ebenfalls
willkommen! Die Übersetzung von Zammad selbst und der Dokumentation erfolgt
mit Hilfe von Weblate, einem Dienst für die gemeinschaftliche Übersetzung
von Projekten.

Sie müssen dazu nur zu Zammads [Weblate-Instanz]
(https://translations.zammad.org/) gehen.  Sie können entweder ein Konto
erstellen (falls Sie noch keines haben) oder sich sogar mit Ihrem
Github-Konto anmelden!

In den folgenden Abschnitten werden wir einige grundlegende Schritte
behandeln, damit Sie mit dem Übersetzen beginnen können. Wenn Sie jedoch
einige zusätzliche Funktionen von Weblate nutzen und tiefer eintauchen
möchten, ist deren [Übersetzungsdokumentation]
(https://docs.weblate.org/en/latest/user/translating.htm) ein guter
Ausgangspunkt.

### Grundlagen

Die Übersetzung von **Zammad** und die Übersetzung der **Dokumentation**
sind in Weblate in zwei Projekte aufgeteilt. Wenn Sie im oberen Menü unter
"*Projekte > Alle Projekte auflisten*" klicken, finden Sie die Übersicht über die beiden
Projekte:

![Screenshot mit Übersetzungsprojekten in Weblate und
Menü](/screenshots/weblate-overview-docs.png)

Struktur von Übersetzungsprojekten in Weblate:

 * Dokumentation
    * User Documentation (`latest`)
    * User Documentation (`pre-release`)
    * Admin Documentation (`latest`)
    * Admin Documentation (`pre-release`)
 * Zammad
    * Zammad (`develop`, development version)
    * Zammad (`stable` version)
    * *Einige weitere, die hier nicht relevant sind*

::: tip

Es macht keinen großen Unterschied, welchen Zweig Sie zur Übersetzung wählen. Wenn Weblate
die gleichen Zeichenketten in verschiedenen Branches erkennt, werden sie für alle
Branches verwendet und müssen nur einmal übersetzt werden.
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
vielleicht in den Dokumentationsprojekten sehen (siehe RestructuredText_ für
Details):

- **\`\`Beispiel-String\`\`**

    This is rendered as `example-string`. Depending on the context, it can be
    translated or not. In any case, use the \`` before and after the string in
    your translation.

- **\:doc:\`Beispiel \<path/to/document>\`**

    Dies ist ein Link zu einer anderen Seite. Bei einigen Links fehlt der "Beispiel"-Teil,
    z.B. \:doc:\`pfad/zu/dokument. Das obige "Beispiel" ist der Text,
    der als Link angezeigt wird. Dieser Teil kann übersetzt werden. Der pfad/zu/Dokument
    darf nicht übersetzt werden, sonst würde der Link nicht mehr funktionieren.

- **\`ein Text \<https://example.com\>`\_**

    Dies ist ein Link, der auf eine externe Website verweisen kann. "Ein Text" ist der
    angezeigte Text in der Dokumentation, der Teil zwischen \< und \> ist das Link-Ziel.
    Das \_ am Ende ist wichtig und muss im übersetzten Text bleiben.

- **\:admin-docs:\`ein Text \</manage-text-modules.html\>\`**

    Dies ist ein Link, der auf einen andere Dokumentation verweist. "ein Text" ist der
    angezeigte Text in der Dokumentation, der Teil zwischen \< und \> ist das Link-Ziel.
     Beachten Sie das Fehlen von \_ am Ende, da dieser Link einen
    anderen Mechanismus verwendet.

- **\*\*Beispiel Text\*\***

    Markierung für Text (z. B. fett, kursiv). Alternativ: \*Beispiel Text\*.
    Diese Zeichenketten können übersetzt werden, aber die Markup-Kennzeichnung
    (z.B. ein oder mehrere \*) sollte sinngemäß übernommen werden.


