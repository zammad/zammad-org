---
order: 2
title: Suche
---

# Suche

## Grundlagen

If you search for tickets, user and organizations, you can use the
search. It is located in the top left corner in the primary navigation
bar. Either select it via mouse or use the keyboard shortcut [[s]]. Zammad
returns all fitting items for which you have at least view or read
permissions.

![Screenshot zeigt Suchergebnisse in der
Navigationsleiste](/screenshots/cypress/usage-guide-search.cy.js/search-sidebar.png)

The search covers basically all information which is stored in Zammad and
which got [indexed by Elasticsearch](/en/reference/es-indexed-attributes),
like:

- Betreff und Text der Nachricht
- Namen und E-Mail-Adressen
- Text in Dateianhängen
- Benutzer- und Organisationsdetails (wie Notizen, Namen, etc.)

Wenn das Suchfeld aktiv ist, können Sie Ihre zuletzt angesehenen Elemente
sowie Ihre letzten Suchanfragen sehen.

Nachdem Sie einen Suchbegriff eingegeben haben, sehen Sie sofort eine
Vorschau der Suchergebnisse. Diese Ergebnisse sind nach Typ getrennt, damit
Sie nicht den Überblick verlieren. Wenn Sie eines dieser Ergebnisse
auswählen, wird ein neuer Tab mit dem entsprechenden Element geöffnet (falls
nicht bereits geöffnet).

If you press [[enter]] or click on `detailed search`, Zammad displays a page
with search results. There you can narrow down your search by selecting a
specific object type (e.g. customer) in the tab bar below the search bar.

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

You can narrow down your search results to specific attributes, even in the
search field in the navigation bar. Read on for some examples and
explanations. For a more detailed list of available attributes, please take
a look at the [indexed attributes by
Elasticsearch](/en/reference/es-indexed-attributes).

### Syntax

Suche nach einem bestimmten Kunden mit Hilfe von `customer.attribute`:

```plain
customer.firstname: John
```

oder:

```plain
customer.lastname: Doe
```

Wenn Sie eine komplexere Suche durchführen möchten, können Sie Bedingungen
mit den Optionen `()` und `AND`/`OR` verwenden:

```plain
state.name: offen AND (article.from:me OR article.from:somebody)
```

### Zusätzliche Beispiele

| Attribut      | Suche nach                            | Beispiel                                                                                       | Beschreibung                                                                                                                                                                                                                                                         |
|---------------|---------------------------------------|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| number        | 1118566                               | number:1118566 number:11185\*                                                                  | Suche nach einem Ticket                                                                                                                                                                                                                                              |
| title         | some title                            | title:"some title" title:Printer title: "some ti\*"                                            | Falls Sie Leerzeichen in dem Suchtext haben, benutzen Sie Anführungszeichen. Zammad führt sonst eine AND-Suche aus. Sie können natürlich auch einzelne Wörter ohne Anführungzeichen verwenden.                                                                       |
| created_at    | 2018-11-18                            | created_at:2018-11-18 created_at:\[2018-11-15 TO 2018-11-18\] created_at:\>now-1h              | Sie können ein einfaches Datum, einen Datumsbereich oder \>now-xh verwenden. Das Datum muss im Format YYYY-MM-DD eingegeben werden.                                                                                                                                  |
| state.name    | new open closed                       | state.name: new state.name:new OR open                                                         | Sie können nach einzelnen Ticket-Status filtern (und diese sogar mit OR kombinieren). Beachten Sie, dass Sie die englischen Namen für Status verwenden müssen, sofern Sie keine selbst erstellten Status haben.                                                      |
| article_count | 5 \[5 TO 10\] \[5 TO \*\] \[\* TO 5\] | article_count:5 article_count: \[5 TO 10\] article_count:\[5 TO \*\] article_count:\[\* TO 5\] | Sie können nach Tickets mit einer konkreten Anzahl an Artikeln suchen (Sie können sogar nach allem mit mehr als 5 Artikel oder bis zu 5 Artikel suchen).                                                                                                             |
| article.from  | \*bob\*                               | article.from:\*bob\*                                                                           | Alle Tickets anzeigen, die Artikel von "Bob" enthalten.                                                                                                                                                                                                              |
| article.body  | heat heat~ /joh?n(ath\[oa\]n)/        | article.body:heat article.body:heat~ articlebody:/joh?n(ath\[oa\]n)/                           | Das erste Beispiel zeigt alle Tickets, die "heat" enthalten - Sie können sogar einen Fuzzy-Operator "~" verwenden, um nach ähnlichen Wörtern wie z.B. "head" zu suchen. Zammad erlaubt sogar die Verwendung regulärer Ausrücke, sofern das Attribut es unterstützt.  |

### Suchbegriffe kombinieren

Sie können Suchbegriffe mit `AND`, `OR` und `TO` kombinieren und sie sogar
mit `()` trennen. Wenn Sie Suchergebnisse ausschließen wollen, können Sie
die Negation `!` verwenden.

| Suchbegriff | Beschreibung |
|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| status.name:(geschlossen OR offen) AND (priority.name: "2 normal" ODER tags:feedback) | Zeige jedes Ticket, dessen Status entweder geschlossen oder offen ist und das die Priorität normal oder den Tag "feedback" hat.                |
| status.name:(geschlossen OR offen) AND (priority.name: "2 normal" OR tags:feedback) AND !(_Zammad_) | Dies liefert das gleiche Ergebnis wie oben, nur dass keine Tickets im Ergebnis enthalten sein sollen, die mit "Zammad" übereinstimmen |
| owner.email:<bob@example.net> AND state.name:(offen OR neu) | Zeige Tickets von <bob@example.net>, die entweder offen oder neu sind |
| status.name:pending\* AND article_count:\[1 TO 5\] | Zeigt alles mit einem "Warten auf..."-Status und einer Artikelanzahl von 1 bis 5.                                            |
