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

![Screenshot shows search results in navigation
bar](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

Die Suche deckt grundsätzlich alle Informationen ab, die in Zammad
gespeichert bzw. von [Elasticsearch
indiziert](/de/reference/es-indexed-attributes) wurden , wie z.B.:

- Betreff und Text der Nachricht
- Namen und E-Mail-Adressen
- Text in Dateianhängen
- Benutzer- und Organisationsdetails (wie Notizen, Namen, etc.)

Wenn das Suchfeld aktiviert ist sehen Sie die Tickets, die Sie kürzlich
geschlossen haben, sowie Ihre letzten Suchanfragen.

Nachdem Sie einen Suchbegriff eingegeben haben, sehen Sie sofort eine
Vorschau der Suchergebnisse. Diese Ergebnisse sind nach Typ getrennt, damit
Sie nicht den Überblick verlieren. Wenn Sie eines dieser Ergebnisse
auswählen, wird ein neuer Tab mit dem entsprechenden Element geöffnet (falls
nicht bereits geöffnet).

Wenn Sie [[enter]] drücken oder auf `Erweiterte Suche` klicken, zeigt Zammad
eine Seite mit Suchergebnissen an. Dort können Sie Ihre Suche eingrenzen,
indem Sie in der Tab-Leiste unterhalb der Suchleiste einen bestimmten
Objekttyp (z.B. Benutzer) auswählen.

![Screenshot shows detailed
search](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

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

| Suchbegriff                                                                                   | Beschreibung                                                                                                                    |
|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `state.name:(closed OR open) AND (priority.name:"2 normal" OR tags:feedback)`                 | Zeigt jedes Ticket, dessen Status entweder geschlossen oder offen ist und das die Priorität normal oder den Tag "feedback" hat. |
| `state.name:(closed OR open) AND (priority.name:"2 normal" OR tags:feedback) AND !(_Zammad_)` | Dies liefert das gleiche Ergebnis wie oben, nur dass keine Tickets im Ergebnis enthalten sein sollen, die "Zammad" enthalten.   |
| `owner.email:bob@example.net AND state.name:(open OR new)`                                    | Zeigt Tickets mit dem Besitzer `bob@example.net`, die entweder offen oder neu sind.                                             |
| `state.name:pending* AND article_count:[1 TO 5]`                                              | Zeigt Tickets mit einem "Warten auf..."-Status und einer Artikelanzahl von 1 bis 5.                                             |

### Zusätzliche Beispiele

| Attribut      | Beispiele                                                                                        | Beschreibung                                                                                                                                                                                                                                                         |
|---------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| number        | `number:1118566`, `number:11185*`                                                                | Suche nach einer Ticketnummer.                                                                                                                                                                                                                                       |
| title         | `title:"some title"`, `title:Printer`, `title: "some ti*"`                                       | Falls Sie Leerzeichen in dem Suchtext haben, benutzen Sie Anführungszeichen. Zammad führt sonst eine AND-Suche aus. Sie können einzelne Wörter auch ohne Anführungzeichen verwenden.                                                                                 |
| created_at    | `created_at:2018-11-18`, `created_at:[2018-11-15 TO 2018-11-18]`, `created_at:>now-1h`           | Sie können ein einfaches Datum, einen Datumsbereich oder `>now-xh` verwenden. Das Datum muss im Format `YYYY-MM-DD` eingegeben werden.                                                                                                                               |
| state.name    | `state.name: new`, `state.name:new OR open`, `state.name:closed`                                 | Sie können nach einzelnen Ticket-Status filtern (und diese sogar mit OR kombinieren). Beachten Sie, dass Sie die englischen Namen für Status verwenden müssen, sofern Sie keine selbst erstellten Status haben.                                                      |
| article_count | `article_count:5`, `article_count: [5 TO 10]`, `article_count:[5 TO *]`, `article_count:[* TO 5]`| Sie können nach Tickets mit einer konkreten Anzahl an Artikeln suchen (Sie können sogar nach allem mit mehr als 5 Artikel oder bis zu 5 Artikel suchen).                                                                                                             |
| article.from  | `article.from:*bob*`                                                                             | Alle Tickets anzeigen, die von einem Benutzer erstellt wurden, der `bob` im Namen enthält.                                                                                                                                                                           |
| article.body  | `article.body:heat`, `article.body:heat~`, `article.body:/joh?n(ath[oa]n)/`                      | Das erste Beispiel zeigt alle Tickets, die "heat" enthalten - Sie können sogar einen Fuzzy-Operator "~" verwenden, um nach ähnlichen Wörtern wie z.B. "head" zu suchen. Zammad erlaubt sogar die Verwendung regulärer Ausrücke, sofern das Attribut es unterstützt.  |
