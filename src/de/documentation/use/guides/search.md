---
order: 2
title: Suche
---

# Suche

## Grundlagen

Wenn Sie nach Tickets, Benutzern und Organisationen suchen, können Sie die
Suche verwenden. Sie befindet sich in der linken oberen Ecke der
Navigationsleiste. Wählen Sie sie entweder mit der Maus aus oder benutzen
Sie das Tastaturkürzel [[s]]. Zammad gibt alle passenden Elemente zurück,
für die Sie mindestens Ansichts- oder Leserechte haben.

![Screenshot zeigt Suchergebnisse in der
Navigationsleiste](/screenshots/cypress/usage-guide-search.cy.js/search-sidebar.png)

Die Suche deckt grundsätzlich alle Informationen ab, die in Zammad
gespeichert bzw. von [Elasticsearch
indiziert](/de/reference/es-indexed-attributes) wurden , wie z.B.:

- Betreff und Text der Nachricht
- Namen und E-Mail-Adressen
- Text in Dateianhängen
- Benutzer- und Organisationsdetails (wie Notizen, Namen, etc.)

When the search field gets activated, you can see the tickets which got
recently closed from your taskbar as well as your recent search queries.

Nachdem Sie einen Suchbegriff eingegeben haben, sehen Sie sofort eine
Vorschau der Suchergebnisse. Diese Ergebnisse sind nach Typ getrennt, damit
Sie nicht den Überblick verlieren. Wenn Sie eines dieser Ergebnisse
auswählen, wird ein neuer Tab mit dem entsprechenden Element geöffnet (falls
nicht bereits geöffnet).

Wenn Sie [[Enter]] drücken oder auf `Erweiterte Suche` klicken, zeigt Zammad
eine Seite mit Suchergebnissen an. Dort können Sie Ihre Suche eingrenzen,
indem Sie in der Tab-Leiste unterhalb der Suchleiste einen bestimmten
Objekttyp (z.B. Benutzer) auswählen.

![Screenshot zeigt die Erweiterte
Suche](/screenshots/cypress/usage-guide-search.cy.js/search-detail.png)

Wenn Sie immer noch viele Ergebnisse erhalten, versuchen Sie, Ihre Suche
einzugrenzen, indem Sie weitere Begriffe hinzufügen oder die Sortierung der
Spalten verwenden. Um die Ergebnisse nach den Werten der Spalten zu
sortieren, klicken Sie auf eine der Spaltenüberschriften. Die Sortierung
wird durch einen Pfeil angezeigt. Klicken Sie erneut auf die Spalte, um die
Sortierung von aufsteigend zu absteigend und zurück zu ändern. Wenn Sie
immer noch nicht finden, wonach Sie suchen, sehen Sie sich den nächsten
Abschnitt an, in dem Sie erfahren, wie Sie nach bestimmten Attributen wie
dem Erstellungsdatum oder der E-Mail-Adresse des Besitzers eines Tickets
suchen können.

## Zusätzliche Funktionen

Sie können Ihre Suchergebnisse auf bestimmte Attribute eingrenzen, auch im
Suchfeld in der Navigationsleiste. Lesen Sie weiter für Beispiele und
Erklärungen. Eine ausführlichere Liste der verfügbaren Attribute finden Sie
unter [indizierte
Elasticsearch-Attribute](/de/reference/es-indexed-attributes).

### Syntax

Suche nach einem Ticket eines bestimmten Kunden:

```plain
customer.firstname: John
```

oder:

```plain
customer.lastname: Doe
```

### Suchbegriffe kombinieren

Sie können Suchbegriffe mit `AND`, `OR` und `TO` kombinieren und sie sogar
mit `()` trennen. Wenn Sie Suchergebnisse ausschließen wollen, können Sie
die Negation `!` verwenden.

| Search phrase                                                                                 | Description                                                                                                       |
|-----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `state.name:(closed OR open) AND (priority.name:"2 normal" OR tags:feedback)`                 | Show every ticket that state is either closed or open and has priority normal or the tag feedback.                |
| `state.name:(closed OR open) AND (priority.name:"2 normal" OR tags:feedback) AND !(_Zammad_)` | This gets the same result as above, expect that we don't want the ticket to contain anything matching to "Zammad".|
| `owner.email:bob@example.net AND state.name:(open OR new)`                                    | Show tickets with owner `bob@example.net` that are either open or new.                                            |
| `state.name:pending* AND article_count:\[1 TO 5\]`                                            | Show everything with any pending state and an article count of 1 to 5.                                            |

### Zusätzliche Beispiele

| Attribute     | Examples                                                                                          | Description                                                                                                                                                                                                                                          |
|---------------|---------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| number        | `number:1118566`, `number:11185*`                                                                 | Search for a specific ticket number.                                                                                                                                                                                                                 |
| title         | `title:"some title"`, `title:Printer`, `title: "some ti*"`                                        | If you need to use a space in the search phrase, use quotes. Zammad combines the search terms with an AND operator. You can also use a single keyword without quotation.                                                                             |
| created_at    | `created_at:2018-11-18`, `created_at:[2018-11-15 TO 2018-11-18]`, `created_at:>now-1h`            | You can either use a simple date, a date-range or `>now-xh`. Please note that the date format needs to be `YYYY-MM-DD`.                                                                                                                              |
| state.name    | `state.name: new`, `state.name:new OR open`, `state.name:closed`                                  | You can filter for specific ticket states (and even combine them with an OR). Please note that you need to use the English names for states, unless you have custom ticket states defined in your instance.                                          |
| article_count | `article_count:5`, `article_count: [5 TO 10]`, `article_count:[5 TO *]`, `article_count:[* TO 5]` | You can search for Tickets with a specific number of articles (you can even search for everything with 5 or more articles or up to 5 articles, if needed).                                                                                           |
| article.from  | `article.from:*bob*`                                                                              | Show all tickets that contain articles from a user with "bob" in its name.                                                                                                                                                                           |
| article.body  | `article.body:heat`, `article.body:heat~`, `article.body:/joh?n(ath\[oa\]n)/`                     | First example shows every ticket containing the word "heat" - you can also use the fuzzy operator `~` to search for similar words like e.g. like "head". Zammad will also allow you to use regular expressions, where ever the attributes allows it. |
