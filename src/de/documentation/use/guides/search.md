---
order: 2
title: Suche
---

# Suche

In Zammad können Sie nach allen verfügbaren Informationen suchen:

- Betreff und Text der Nachricht
- Namen und E-Mail-Adressen
- Text in Dateianhängen
- Benutzer- und Organisationsdetails (wie Notizen, Namen, etc.)

Je nachdem, wonach Sie suchen und wie groß die Datenmenge in Ihrer
Zammad-Instanz ist, können Sie auf unterschiedliche Weise suchen. Lesen Sie
weiter, um mehr über die Grundlagen der Suche zu erfahren, gefolgt von der
Erweiterten Suche und der Verwendung von Elasticsearch-Syntax.

## Einfache Suche

Die Suche befindet sich in der oberen linken Ecke in der primären
Navigation. Wählen Sie sie entweder mit der Maus aus oder verwenden Sie das
Tastaturkürzel [[s]]. Nach der Aktivierung sehen Sie in Ihrer Taskleiste die
Tickets, die kürzlich dort geschlossen wurden sowie Ihre letzten
Suchanfragen. Um zu suchen, geben Sie einfach einen Begriff ein. Die Suche
zeigt dann alle übereinstimmenden Elemente an, für die Sie mindestens über
Ansichts- bzw. Leserechte verfügen, gruppiert nach Typ wie Benutzer und
Tickets. Wenn Sie eines dieser Ergebnisse auswählen, wird das Element als
Tab in der Taskleiste geöffnet.

Bei der Suche nach einem Begriff werden auch alle Werte gefunden, die mit
diesem Begriff beginnen. Wenn Sie beispielsweise nach `brooks` suchen werden
auch Werte wie `brookster` gefunden. Dies gilt nicht, wenn Sie mittels
spezifischer Attribute wie `owner.lastname:brooks` suchen (wie im Abschnitt
[Elasticsearch-Syntax](#using-elasticsearch-syntax) weiter unten
beschrieben), da die Suche dann nur nach exakten Werten sucht.

![Screenshot zeigt Suchergebnisse in der
Taskleiste](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

Wenn Sie [[Enter]] drücken oder auf `Erweiterte Suche` klicken, öffnet
Zammad die Erweiterte Suche als Tab in der Taskleiste. Dort können Sie Ihre
Suche eingrenzen, indem Sie einen bestimmten Objekttyp (z.B. Organisation)
auswählen, erweiterte Filter verwenden oder sogar die Elasticsearch-Syntax
nutzen. Weiter unten finden Sie weitere Informationen.

## Erweiterte Suche

Manchmal liefert Ihnen ein einfacher Suchbegriff nicht die gewünschten
Ergebnisse. Zammad bietet Ihnen auf der Seite Erweiterte Suche verschiedene
Möglichkeiten, die Suche einzugrenzen.

Erweiterte Filter stehen für Kundenkonten nicht zur Verfügung. Falls Ihr
Konto ausschließlich über Kundenberechtigungen verfügt, werden die
**Suchobjekt**-Auswahl sowie die im Folgenden beschriebenen erweiterten
Filteroptionen nicht angezeigt.

![Screenshot zeigt die Erweiterte
Suche](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Sortierung der Ergebnisse

Um die Ergebnisse nach den Werten einer Spalte zu sortieren, klicken Sie auf
eine Spaltenüberschrift. Die Sortierung wird durch einen Pfeil
angezeigt. Klicken Sie erneut auf die Spalte, um die Sortierung von
aufsteigend zu absteigend und zurück zu ändern.

### Suche auf Objekttyp beschränken

Schränken Sie die Suche auf einen Objekttyp ein, indem Sie den Tab-Selektor
**Suchobjekt** unterhalb des Suchfeldes verwenden (z.B. Benutzer oder
Ticket). Dadurch wird die Suche auf den ausgewählten Objekttyp und die damit
verbundenen Daten beschränkt. Wenn Sie z.B. **Ticket** wählen, gibt die
Suche auch Tickets aus, bei denen der Besitzer oder Kunde mit dem
Suchbegriff übereinstimmt.

### Erweiterte Filter verwenden

Im Gegensatz zum Suchfeld können Sie die Suchergebnisse anhand bestimmter
Attribute und deren Werte filtern. Klicken Sie dazu auf der rechten Seite
auf die Schaltfläche `Erweiterte Filter`, wodurch sich ein Bereich öffnet,
in dem Sie zusätzliche Bedingungen auf der Grundlage bestimmter Attribute
und deren Werten festlegen können. Wählen Sie ein Attribut aus und geben Sie
einen Wert ein oder wählen Sie einen aus, der für die Suche zutreffen
muss. Bei Verwendung mehrerer Filter müssen alle Bedingungen erfüllt sein;
sie sind logisch mit "AND" verknüpft. Dies gilt auch für den Suchbegriff im
Hauptsuchfeld.

Um einen einzelnen Filter zu entfernen, bewegen Sie den Mauszeiger darüber
und klicken Sie auf das Symbol ::x::, das neben dem Wertefeld erscheint. Um
alle Filter zu entfernen, klicken Sie in der Hauptsuchleiste oben neben der
Beschriftung `x Filter` auf das Symbol `x` und bestätigen Sie dies.

Um einen weiteren Filter hinzuzufügen, klicken Sie unten oder zwischen den
vorhandenen Filterzeilen auf `Filter hinzufügen` und wählen Sie ein Attribut
aus der Auswahlliste aus. Die Liste enthält nur Attribute, die noch von
keinem Filter verwendet werden, sodass jedes Attribut nur einmal verwendet
werden kann.

Falls Sie Ihren Filter speichern oder weitergeben möchten, können Sie dies
tun, indem Sie die URL kopieren. Sie enthält den vollständigen
Filter. Beachten Sie, dass die Suchergebnisse für andere Benutzer aufgrund
abweichender Berechtigungen unterschiedlich ausfallen können.

Wenn Sie immer noch nicht gefunden haben, was Sie suchen, können Sie von der
Elasticsearch-gestützten Suche profitieren.  Im nächsten Abschnitt finden
Sie einige Beispiele.

## Elasticsearch-Syntax verwenden

Dies ist ein fortgeschrittenes Thema für erfahrene Benutzer. Mithilfe der
Elasticsearch-Syntax können Sie Ihre Daten gezielt nach bestimmten
Attributwerten filtern. Alle indizierten Attribute werden unterstützt. Lesen
Sie weiter, um Beispiele für die Anwendung zu finden oder besuchen Sie
[Elasticsearch indizierte Attribute](/de/reference/es-indexed-attributes),
wo Sie eine Liste mit weiteren Attributen finden.

### Wichtige Informationen

- Vergewissern Sie sich, dass Sie das relevante Objekt in der Tab-Auswahl
  **Suchobjekt** auswählen. Zum Beispiel ist `customer.lastname` für Tickets
  verfügbar, jedoch nicht für Benutzer.
- Mehrere Suchbegriffe werden standardmäßig mit einem logischen "AND"
  verknüpft, sodass die Suche nach `smith open` nur Ergebnisse liefert, die
  beide Begriffe enthalten. Verwenden Sie ein explizites `OR`, wenn Sie
  einen der beiden Begriffe suchen möchten.
- Wenn Sie eine Elasticsearch-Abfrage mit erweiterten Filtern kombinieren,
  beachten Sie, dass alle erweiterten Filterbedingungen und die Suchsyntax
  logisch mit AND verknüpft sind. Es werden also nur Ergebnisse angezeigt,
  die allen erweiterten Filterbedingungen und Ihrem Suchbegriff entsprechen.
- Wenn Sie Werte mit einem Leerzeichen angeben möchten, umschließen Sie
  diese mit `"`, z.B. `priority.name: "2 normal"`.

### Logische Operatoren und Bereiche

Sie können Bedingungen kombinieren, indem Sie `AND` & `OR` als logische
Operatoren verwenden. Verwenden Sie `TO`, um Bereiche für Werte mit einer
Reihenfolge anzugeben (z.B. Ganzzahl oder Datum). Schließen Sie eine Grenze
des angegebenen Bereichs ein, indem Sie eckige Klammern verwenden. Schließen
Sie sie aus, indem Sie geschweifte Klammern verwenden. Sie können diese
Klammern sogar kombinieren, z.B. um die untere Grenze ein- und die obere
Grenze auszuschließen. Verschachtelte Begriffe lassen sich durch die
Trennung mit Klammern `()` erreichen.

`AND` & `OR` mit Klammern:

```plain
owner.lastname:brooks AND tags:(internal OR onboarding)
```

`TO` mit Sternchen als Platzhalter:

```plain
state.name:open AND article_count: [5 TO *]
```

`TO` mit Ausschluss eines Grenzwerts eines Bereichs:

```plain
article.created_at:[2025-03-21 TO 2026-05-19}
```

### Unscharfe Suche

Wenn Sie sich über die genaue Schreibweise eines Wertes nicht sicher sind,
verwenden Sie die Tilde (`~`) als Suffix, um eine unscharfe (*fuzzy*) Suche
durchzuführen.

```plain
owner.firstname:lawren~
```

### Suche negieren

Wenn Sie bestimmte Werte ausschließen möchten, können Sie die Negation `!`
verwenden. Um mehr als einen Bereich zu negieren, verwenden Sie Klammern für
um den gewünschten Bereich.

Schließen Sie Besitzer mit dem Nachnamen "brooks" aus:

```plain
!owner.lastname:brooks
```

Schließen Sie mehrere Bedingungen aus:

```plain
owner.lastname:brooks AND !(tags:internal OR tags:onboarding)
```

### Regex

Sie können sogar Regex für die Suche verwenden. Schließen Sie den
Regex-Begriff in `/` ein.

```plain
customer.lastname:/(bra?.n|doe)/
```
