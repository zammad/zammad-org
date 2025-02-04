---
order: 2
---

# Leitfaden für Stil und Inhalt

Dieser Leitfaden bietet eine Übersicht über den Inhalt, der in der
Zammad-Dokumentation enthalten sein sollte, sowie Formatierungsrichtlinien,
um Klarheit und Lesbarkeit zu gewährleisten.

Wenn Sie Fragen haben, können Sie diese gerne in unserer Community
stellen. Wenn Sie zu Zammad oder der Dokumentation beitragen wollen, schauen
Sie sich unsere Beitragen-Seite an, um loszulegen.

## Annahmen zur Leserschaft und Inhalt

Die Dokumentation geht davon aus, dass die **Benutzer** ein grundlegendes
Verständnis für die Verwendung von Webbrowsern und der Bedienung von
gängiger Software haben.

Der **Zammad-Administrator** sollte zudem ein Grundverständnis für die
Arbeitsabläufe und Kommunikationsprozesse in der Firma haben.

Für selbst gehostete Instanzen sollten **Systemadministratoren** auch mit
den Grundlagen der Linux-Systemadministration vertraut sein.

## Stil

Amerikanisches Englisch ist die original Sprache für die Dokumentation.  Die
Übersetzung erfolgt über Weblate, siehe Abschnitt "Beitragen" für weitere
Informationen.

* Verwenden Sie kurze und klare Sätze und stellen Sie Informationen über
  Komplexität
* Capitalize all words except minor ones in the page title and sections
(see [title case](https://en.wikipedia.org/wiki/Title_case){target=_blank})
* Line length of 80 characters in the source file should not be exceeded if
possible
* Proper breadcrumb separation for paths and locations with `>`
* Use code highlighting to emphasize programming snippets
* Include screenshots when necessary
* Provide step-by-step instructions with clear explanations
* Use examples or scenarios to illustrate concepts
* Include relevant images or diagrams when necessary
* Abbreviations should be explained the first time they are used or included
in the glossary and linked to
* If in doubt, align it to the existing documentation


## Formatierung

| Typ            | Hervorhebung                      | Markdown Syntax                     |
|----------------|-----------------------------------|-------------------------------------|
| Buttons        | `Sign in`                       | \`Sign in\`                     |
| Felder         | **Name**                          | \*\*Name\*\*                        |
| Orte/Pfade     | *Einstellungen > Kanäle > Email*  | \*Einstellungen > Kanäle > Email\*  |


## Struktur der Überschrift

Jede Dokumentationsdatei sollte einen Titel auf der obersten Ebene (#)
enthalten. Die unteren Ebenen sollten mindestens zwei Abschnitte
enthalten. Wenn nur ein Abschnitt vorhanden ist, sollte er mit dem
übergeordneten Inhalt zusammengelegt werden.

Beispiel:

`# Titel der Seite`

`## Abschnitt 1`

`### Abschnitt 1.1`

`### Abschnitt 1.2`

`## Abschnitt 2`

### Abschnitt mit Badge <Badge type="warning" text="angepasster Text" />

Diese Überschrift verwendet ein Badge des Typs "Warnung". Es sind auch andere Badges verfügbar:  
https://vitepress.dev/reference/default-theme-badge#usage

### Anpassbare Boxen

::: info
Dies ist eine Infobox.
:::

::: tip
Dies ist ein Tipp.
:::

::: warning
Dies ist eine Warnung.
:::

::: danger
Dies ist eine gefährliche Warnung.
:::

::: details
Dies ist ein Detailblock.
:::

### Definitionslisten

Erster Begriff <Badge type="info" text="tag1" />
: Dies ist die Definition des ersten Begriffs.

Zweiter Begriff <Badge type="info" text="tag1" /> <Badge type="tip" text="tag1" />
: Dies ist eine Definition des zweiten Begriffs.
: Dies ist eine weitere Definition des zweiten Begriffs.
