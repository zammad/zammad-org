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
* Großschreibung aller Wörter mit Ausnahme von Füllwörtern im Seitentitel und in den Abschnitten
(siehe [title case (eng.)](https://en.wikipedia.org/wiki/Title_case))
* Die Zeilenlänge von 80 Zeichen in der Quelldatei sollte nach Möglichkeit nicht überschritten werden
* Pfade und Orte mit `>` als Hierarchietrenner
* Code-Definition zur Hervorhebung von Snippets
* Einfügen von Screenshots, wenn nötig
* Schritt-für-Schritt-Anleitungen mit klaren Erklärungen
* Verwendung von Beispielen oder Szenarien zur Veranschaulichung von Konzepten
* Wenn sinnvoll, relevante Bilder oder Diagramme einbauen.
* Abkürzungen sollten bei der ersten Verwendung erklärt oder in das Glossar aufgenommen werden.
* Im Zweifelsfall an der vorhandenen Dokumentation orientieren.


## Formatierung

| Type in Zammad | Highlighting                  | Markdown syntax                 |
|----------------|-------------------------------|---------------------------------|
| Buttons        | ``Sign in``                   | \`\`Sign in\`\`                 |
| Fields         | **Name**                      | \*\*Name\*\*                    |
| Location/path  | *Settings > Channels > Email* | \*Settings > Channels > Email\* |


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

