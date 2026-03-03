---
features:
  - 
    details: 'Lorem ipsum...'
    icon: 🛠️
    link: https://zammad.com
    linkText: 'This is a link'
    target: _blank
    title: 'Simple and minimal, always'
  - 
    details: 'Lorem ipsum...'
    icon:
      src: /assets/logo.svg
    link: https://zammad.com
    title: 'Another cool feature'
  - 
    details: 'Lorem ipsum...'
    icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    link: https://zammad.com
    title: 'Another cool feature'
order: 2
---

# Leitfaden für Stil und Inhalt

Dieser Leitfaden bietet eine Übersicht über den Inhalt, der in der
Zammad-Dokumentation enthalten sein sollte, sowie Formatierungs- und
Stilrichtlinien, um Klarheit und Lesbarkeit zu gewährleisten.

In den ersten Abschnitten geht es um allgemeine Informationen und Regeln. Am
Ende folgt ein [Abschnitt mit Beispielen](#beispiele).

Wenn Sie Fragen haben, können Sie diese in unserer Community stellen. Wenn
Sie beitragen wollen, sollten Sie einen Blick auf unsere [Seite für
Beiträge](contribute) werfen oder in einem
[Github-Issue](https://github.com/zammad/zammad-org/issues){target=_blank}
fragen, um loszulegen.

## Annahmen zur Leserschaft

The documentation assumes that **users** have a basic understanding of how
to use web browsers and are familiar with common software design
concepts. This means, for example, that features are described in detail,
but not to the level of explaining how to open a dropdown menu.

The **Zammad administrator** should also have a basic technical
understanding and be familiar with the workflows and communication processes
within their company.

For self-hosted instances, **system administrators** should also be familiar
with Linux system administration basics.  Access to the host system
(e.g. via SSH) and administrative permissions are taken for granted.

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
would be on a code-like detail level), the relevance has to be considered
too. If parts with a common use case are missing, it should be intended to
include them in.

## Stil und Regeln

Die nächsten Abschnitte behandeln allgemeine Dinge, die beim Schreiben der
Dokumentation zu beachten sind. Danach finden Sie einen Abschnitt mit
einigen [Beispielen](#beispiele), wie Sie den Inhalt formatieren und
strukturieren können.

### Grundlagen

- Die Dokumentation ist in der Auszeichnungssprache Markdown
  geschrieben. Die Quelldateien haben die Erweiterung `.md`.
- Das System verwendet [Vitepress](https://vitepress.dev/){target=_blank}
  zur Erstellung der Website.
- Die Sprache der Quelldateien ist amerikanisches Englisch.
- Die Übersetzung der Dokumentation erfolgt über Weblate, siehe Abschnitt
  [Übersetzung](contribute#ubersetzung) auf der "Beitragen"-Seite für
  weitere Details.

### Stil

- Verwenden Sie kurze und klare Sätze und fokussieren Sie sich auf
  Informationen statt auf Komplexität.
- Seitentitel und Überschriften: Großschreibung des ersten Buchstabens aller
  Wörter mit Ausnahme von Artikeln usw., siehe [Title Case auf
  Wikipedia](https://en.wikipedia.org/wiki/Title_case){target=_blank}.
- Verwenden Sie eine Breadcrumb-Trennung für Pfade und Orte mit `>` als
  Trennzeichen und formatieren Sie den Pfad kursiv, z.B. _Einstellungen >
  Kanäle > Chat_.
- Verwenden Sie die Codehervorhebung für Code-Snippets und Befehle.
- Verwenden Sie bei Bedarf [Info-, Tip-, Warning- und
  Danger-Boxen](#spezial-boxen).
- Verwenden Sie einen [Detail-Kasten](#custom-boxes), wenn der Inhalt nicht
  für alle Leser relevant ist oder den Lesefluss unterbrechen könnte.
- Falls vorhanden, verwenden Sie Icons für wichtige UI-Buttons wie ::+:: und
  ::x:: (siehe [Beispiele](#text-and-ui) unten).
- Verwenden Sie die eine Auszeichnung wie [[strg]] und [[x]], um einen
  Tastenanschlag darzustellen (siehe [Beispiele](#text-und-ui) unten).
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

Das verwendete Linting hat einige eingebaute Regeln, die Sie im [offiziellen
Repository](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#rules--aliases){target=_blank}
finden können. Einige wichtige und von uns angepasste Regeln sind unten
aufgeführt.

- Die Zeilenlänge von 120 Zeichen in der Quelldatei darf bei Standardtext
  nicht überschritten werden. Achten Sie darauf, dass Sie einen
  Zeilenumbruch verwenden, bevor Sie diese Grenze erreichen. Ein visueller
  Indikator in Ihrem Editor kann hilfreich sein. Dies gilt nicht für
  spezielle Inhalte wie Pfade zu Screenshots und lange Links.
- Mehrere aufeinanderfolgende Leerzeilen sind nicht zulässig.
- Leerzeilen vor und nach Überschriften und Codeblöcken sind erforderlich.
- Verwenden Sie `` ``` `` (Backticks) für abgegrenzte Codeblöcke, gefolgt
  von einem obligatorischen Sprach-Tag, z.B. `ruby` oder `sh`. Wenn keine
  Sprache zutrifft, verwenden Sie `plain`.
- Verwenden Sie `-` für Aufzählungen (ungeordnete Liste) wie diese.
- Um leicht zwischen **fett** und _kursiv_ zu unterscheiden, verwenden Sie
  `_` um den Text in kursiv und `**` in fett zu setzen (z.B. `_kursiv_`
  vs. `**fett**`).
- Mehrere Überschriften mit gleichem Inhalt sind nicht zulässig.
- Jedes Dokument muss genau eine `h1`-Überschrift als Titel haben.
- Die Auflösung von manuellen Screenshots der ganzen Seite für die
  _Mobilansicht_ beträgt 400x867 Pixel.
- Die Auflösung von manuellen Screenshots der ganzen Seite für die
  _Desktop-View_ beträgt 1920x1080 Pixel.

### Beispiele

#### Text und UI

| Typ                                      | Hervorhebung in Dokumentation     | Markdown Syntax                     |
|------------------------------------------|-----------------------------------|-------------------------------------|
| Buttons                                  | `Sign in`                         | `` `Sign in` ``                     |
| Felder und UI-Elemente                   | **Name**                          | `**Name**`                          |
| Orte/Pfade                               | _Einstellungen > Kanäle > Email_  | `_Einstellungen > Kanäle > Email_`  |
| Tastaturkürzel                           | [[x]]                             | `[[x]]`                             |
| Hinzufügen Schaltfläche                  | ::+::                             | `::+::`                             |
| Löschen Schaltfläche                     | ::x::                             | `::x::`                             |
| Aktions-Schaltfläche                     | ::a::                             | `::a::`                             |
| Schaltfläche kopieren in Zwischenablage  | ::c::                             | `::c::`                             |

#### Struktur der Überschrift

Jede Dokumentationsdatei muss genau einen Titel auf der obersten Ebene
enthalten (z.B. `# Titel`). Die darunter liegenden Ebenen sollten immer
mindestens zwei Abschnitte enthalten. Wenn nur ein Abschnitt vorhanden ist,
sollte er mit dem übergeordneten Inhalt zusammengelegt werden.

Beispiel:

`# Titel der Seite`

`## Abschnitt 1`

`### Abschnitt 1.1`

`### Abschnitt 1.2`

`## Abschnitt 2`

#### Überschrift mit Badge <Badge type="warning" text="angepasster Text" />

Dieser Abschnittstitel verwendet ein Badge des Typs "warning". Es sind auch
andere Badges verfügbar, siehe
<https://vitepress.dev/reference/default-theme-badge#usage>.

**Verwendung:**

::: details

```md
Text/Titel, dem ein Badge hinzugefügt werden soll <Badge type="warning" text="freier Text" />
```

:::

#### Spezial-Boxen

::::: info
Dies ist eine Infobox.

**Verwendung:**

:::: details

```md
::: info
Dies ist eine Infobox.
:::
```

::::
:::::

::::: tip
Dies ist ein Tipp.

**Verwendung:**

:::: details

```md
::: tip
Dies ist eine Tipp-Box.
:::
```

::::
:::::

::::: warning
Dies ist eine Warnung.

**Verwendung:**

:::: details

```md
::: warning
Dies ist eine Warnungs-Box.
:::
```

::::
:::::

::::: danger
Dies ist eine gefährliche Warnung.

**Verwendung:**

:::: details

```md
::: warning
Dies ist eine gefährliche Warnung.
:::
```

::::
:::::

:::: details
Dies ist eine Detail-Box.

**Verwendung:**

```md
::: details
Dies ist der Inhalt, der im ausgeklappten Zustand angezeigt wird.
:::

```

::::

#### Definitionslisten

Erster Begriff <Badge type="info" text="tag1" />
: Dies ist die Definition des ersten Begriffs.

Zweiter Begriff <Badge type="info" text="tag1" /> <Badge type="tip" text="tag1" />
: Dies ist eine Definition des zweiten Begriffs.
: Dies ist eine weitere Definition des zweiten Begriffs.

**Verwendung:**

::: details

```md
Erster Begriff <Badge type="info" text="tag1" />
: Dies ist die Definition des ersten Begriffs
  mit einer weiteren Zeile.
```

:::

#### Hervorheben mit Kästen

Um verschiedene Optionen oder Varianten hervorzuheben, können anklickbare
Kästen verwendet werden.

<VPDocFeatures />

Die Definition des Inhalts erfolgt in Frontmatter, siehe folgendes Beispiel
(Beispiel von oben):

```yml

features:
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
    link: https://zammad.com
    linkText: This is a link
    target: _blank
  - icon:
      src: /assets/logo.svg
    title: Another cool feature
    details: Lorem ipsum...
    link: https://zammad.com
  - icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    title: Another cool feature
    details: Lorem ipsum...
    link: https://zammad.com

```

Um sie innerhalb des Inhaltsbereichs zu platzieren, fügen Sie einfach den Verweis `<VPDocFeatures />` an der Stelle ein, an der sie dargestellt
werden sollen.

#### Von Theme abhängige Bilder

Um bestimmte Bilder auf ein einzelnes Theme anzuwenden, können Sie dem
entsprechenden Bild die CSS-Klasse `.dark-only` oder `.light-only` zuweisen:

```md
![Bild nur für dunkles Theme](/assets/logo-flat-dark.svg){.dark-only}
![Bild nur für helles Theme](/assets/logo-flat-light.svg){.light-only}
```

![Bild nur für dunkles Theme](/assets/logo-flat-dark.svg){.dark-only
width=240} ![Bild nur für helles
Theme](/assets/logo-flat-light.svg){.light-only width=240}
