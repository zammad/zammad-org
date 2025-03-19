---
order: 2
---

# Leitfaden für Stil und Inhalt

Dieser Leitfaden bietet eine Übersicht über den Inhalt, der in der
Zammad-Dokumentation enthalten sein sollte, sowie Formatierungs- und
Stilrichtlinien, um Klarheit und Lesbarkeit zu gewährleisten.

In den ersten Abschnitten geht es um allgemeine Informationen und Regeln. Am
Ende folgt ein [Abschnitt mit nützlichen
Beispielen](#basic-formatting-examples).

Wenn Sie Fragen haben, können Sie diese in unserer Community stellen. Wenn
Sie beitragen wollen, sollten Sie einen Blick auf unsere [Seite für
Beiträge](contribute) werfen oder in einem
[Github-Issue](https://github.com/zammad/zammad-org/issues){target=_blank}
fragen, um loszulegen.

## Annahmen zur Leserschaft

Die Dokumentation geht davon aus, dass **Benutzer** ein grundlegendes
Verständnis für die Verwendung von Webbrowsern und gängige
Software-Design-Konzepte haben. Das bedeutet zum Beispiel, dass Funktionen
detailliert beschrieben werden, aber nicht auf der Ebene, wie man ein
Dropdown-Feld öffnet.

Der **Zammad-Administrator** sollte zudem über ein technisches
Grundverständnis verfügen und auch die Arbeitsabläufe und
Kommunikationsprozesse in seinem Unternehmen kennen.

Bei selbst gehosteten Instanzen sollten **Systemadministratoren** auch mit
den Grundlagen der Linux-Systemverwaltung vertraut sein. Der Zugang zum
Host-System (z.B. über SSH) und administrative Rechte werden für
Systemadministratoren vorausgesetzt.

## Inhalt

Die Dokumentation soll Informationen zu folgenden Themen enthalten:

- Wie man Zammad benutzt
- Wie man Zammad als Administrator verwaltet (z.B. nach der Installation
  einrichten, Einstellungen anpassen, Funktionen konfigurieren)
- Verschiedene Möglichkeiten, Zammad zu installieren
- Zusätzliche Anleitungen, wenn eine (Host-)Systemkonfiguration und/oder
  eine Konfiguration von Drittsystemen erforderlich ist.

Was die **Detailtiefe** betrifft, so sollten die [Annahmen zur
Leserschaft](#annahmen-zur-leserschaft) berücksichtigt werden. Da eines der
Ziele von Zammad darin besteht, intuitiv und benutzerfreundlich zu sein, ist
es nicht notwendig, jeden Klick im Detail zu beschreiben. Wichtige Schritte
sollten jedoch enthalten sein. Die Leser sollen so schnell und einfach wie
möglich ihr Ziel erreichen, ohne viel lesen zu müssen.

Due to the fact that a documentation can't cover everything (otherwise it
would be code), the relevance has to be considered. If parts with a common
use case are missing, it should be intended to include them in the
documentation.

## Stil und Regeln

Die nächsten Abschnitte behandeln allgemeine Dinge, die beim Schreiben der
Dokumentation zu beachten sind. Danach finden Sie einen Abschnitt mit
einigen [grundlegenden Beispielen zur Formatierung und
Strukturierung](#basic-formatting-examples) des Inhalts.

### Grundlagen

- Die Dokumentation ist in der Auszeichnungssprache Markdown
  geschrieben. Die Quelldateien haben die Erweiterung `.md`.
- Das System verwendet [Vitepress](https://vitepress.dev/){target=_blank}
  zur Erstellung der Website.
- Die Sprache der Quelldateien ist amerikanisches Englisch.
- Die Übersetzung der Dokumentation erfolgt über Weblate, siehe
  [Beitrags-Seite](contribute#ubersetzung) für weitere Details.

### Stil

- Verwenden Sie kurze und klare Sätze und fokussieren Sie sich auf
  Informationen statt auf Komplexität.
- Seitentitel und Überschriften: Großschreibung des ersten Buchstabens aller
  Wörter mit Ausnahme von Artikeln usw., siehe (Title Case auf
  Wikipedia](https://en.wikipedia.org/wiki/Title_case){target=_blank}).
- Verwenden Sie eine Breadcrumb-Trennung für Pfade und Orte mit `>` als
  Trennzeichen und formatieren Sie den Pfad kursiv, z.B. _Einstellungen >
  Kanäle > Chat_.
- Verwenden Sie die Codehervorhebung für Code-Snippets und Befehle.
- Verwenden Sie bei Bedarf [Info-, Tip-, Warning- und
  Danger-Kästen](#custom-boxes).
- Verwenden Sie einen [Detail-Kasten](#custom-boxes), wenn der Inhalt nicht
  für alle Leser relevant ist oder den Lesefluss unterbrechen könnte.
- Fügen Sie, wenn nötig, Screenshots ein. Die bevorzugte Art, Screenshots
  von Zammad hinzuzufügen, ist, sie automatisch [mit
  Cypress](https://github.com/zammad/zammad-org?tab=readme-ov-file#automatic-screenshots-cypress){target=_blank}
  zu erstellen. Dies unterstützt die Pflege der Dokumentation, da die
  Screenshots bei jedem Durchlauf der Build-Pipeline neu generiert
  werden. Bitte beachten Sie, dass die Verwendung von Cypress nicht Teil
  dieser Dokumentation ist.
- Geben Sie Schritt-für-Schritt-Anleitungen mit klaren Erklärungen.
- Verwenden Sie Beispiele oder Szenarien, um Konzepte zu veranschaulichen.
- Fügen Sie bei Bedarf relevante Bilder oder Diagramme ein.
- Schreiben Sie Abkürzungen bei der ersten Verwendung vollständig aus oder
  nehmen Sie sie in das Glossar auf und verweisen Sie darauf. Weit
  verbreitete und gängige Abkürzungen können von dieser Regel ausgenommen
  werden.
- Im Zweifelsfall können Sie sich an der vorhandenen Dokumentation
  orientieren.

### Konventionen

Der Dokumentations-Stack enthält automatische Prüfungen (Linting), um die
Einhaltung des Styleguides und der allgemeinen Regeln für Markdown-Dateien
sicherzustellen. Um zu prüfen, ob Ihre Änderungen konform sind, führen Sie
`pnpm lint` aus, um die Prüfung durchzuführen. Einige der erkannten Probleme
können sogar automatisch behoben werden, indem `pnpm lint:fix` ausgeführt
wird. Stellen Sie sicher, dass Sie die Prüfung durchführen, bevor Sie Ihre
Änderungen commiten. Andernfalls wird die Erstellung der Dokumentation
fehlschlagen.

Das verwendete Linting hat einige eingebaute Regeln, die Sie
[hier](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#rules--aliases){target=_blank}
finden können. Einige wichtige und von uns angepasste Regeln sind unten
aufgeführt.

- Die Zeilenlänge von 120 Zeichen in der Quelldatei darf bei Standardtext
  nicht überschritten werden. Achten Sie darauf, dass Sie einen
  Zeilenumbruch verwenden, bevor Sie diese Grenze erreichen. Ein visueller
  Indikator in Ihrem Editor kann hilfreich sein. Dies gilt nicht für
  spezielle Inhalte wie Pfade zu Screenshots und lange Links.
- Mehrere aufeinanderfolgende Leerzeilen sind nicht zulässig.
- Leerzeilen vor und nach Überschriften und Codeblöcken sind erforderlich.
- Verwenden Sie `` ``` `` (Backticks) für Codeblöcke, gefolgt von einer
  obligatorischen Angabe der Sprache, z.B. `` ```ruby`` oder ``
  ```sh``. Wenn keine Sprache anwendbar ist, verwenden Sie `` ```plain``.
- Verwenden Sie `-` für Aufzählungen (nicht numerische Listen) wie diese.
- Um leicht zwischen **fett** und _kursiv_ zu unterscheiden, verwenden Sie
  `_` um den Text in kursiv und `**` in fett zu setzen (z.B. `_kursiv_`
  vs. `**fett**`).
- Mehrere Überschriften mit gleichem Inhalt sind nicht zulässig.
- Jedes Dokument muss genau eine `h1`-Überschrift als Titel haben.
- Resolution of manual full page screenshots for _mobile view_ is 400x867
  pixels.
- Resolution of manual full page screenshots for _desktop view_ is 1920x1080
  pixels.

### Grundlegende Formatierungsbeispiele

#### Text und UI

| Type                      | Highlighting in documentation | Markdown syntax                 |
|-------------------------- |-------------------------------|---------------------------------|
| Buttons                   | `Sign in`                     | \`Sign in\`                     |
| Fields and UI elements    | **Name**                      | \*\*Name\*\*                    |
| Locations/paths           | _Settings > Channels > Email_ | \_Settings > Channels > Email\_ |
| Keyboard shortcuts        | [[x]]                         | \[\[x\]\]                       |

#### Struktur der Überschrift

Every documentation file must include exactly one title on top level (like
`# Title`). Levels below should always contain at least two sections. If
only one section exists, consider merging it with the higher-level content.

Beispiel:

`# Titel der Seite`

`## Abschnitt 1`

`### Abschnitt 1.1`

`### Abschnitt 1.2`

`## Abschnitt 2`

#### Section with Badge <Badge type="warning" text="custom text" />

This section title uses a badge of the type "warning". There are other
badges available, see
<https://vitepress.dev/reference/default-theme-badge#usage>.

::: details Usage

```md
Text/title to add a badge <Badge type="warning" text="custom text" />
```

:::

#### Anpassbare Boxen

::::: info
This is an info box.

:::: details Usage

```md
::: info
Dies ist eine Infobox.
:::
```

::::
:::::

::::: tip
This is a tip.

:::: details Usage

```md
::: tip
This is a tip box.
:::
```

::::
:::::

::::: warning
This is a warning.

:::: details Usage

```md
::: warning
This is a warning box.
:::
```

::::
:::::

::::: danger
This is a dangerous warning.

:::: details Usage

```md
::: warning
Dies ist eine gefährliche Warnung.
:::
```

::::
:::::

:::: details
This is a details block.

Usage:

```md

::: details Box title shown in collapsed state
This is the content shown in the expanded state.
:::

```

::::

#### Definitionslisten

Erster Begriff <Badge type="info" text="tag1" />
: Dies ist die Definition des ersten Begriffs.

Zweiter Begriff <Badge type="info" text="tag1" /> <Badge type="tip" text="tag1" />
: Dies ist eine Definition des zweiten Begriffs.
: Dies ist eine weitere Definition des zweiten Begriffs.

::: details Usage

```md
First Term <Badge type="info" text="tag1" />
: This is the definition of the first term
  with another line.
```

:::
