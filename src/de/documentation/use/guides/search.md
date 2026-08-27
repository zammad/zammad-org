---
order: 2
title: Suche
---

# Suche

In Zammad, you can search for all available information like:

- Betreff und Text der Nachricht
- Namen und E-Mail-Adressen
- Text in Dateianhängen
- User and organization details (like notes, names, etc.)

Je nachdem, wonach Sie suchen und wie groß die Datenmenge in Ihrer
Zammad-Instanz ist, können Sie auf unterschiedliche Weise suchen. Lesen Sie
weiter, um mehr über die Grundlagen der Suche zu erfahren, gefolgt von der
Erweiterten Suche und der Verwendung von Elasticsearch-Syntax.

## Einfache Suche

The search is located in the top left corner of the primary
navigation. Either select it via mouse or use the keyboard shortcut
[[s]]. After activation, you can see the tickets that were recently closed
from your taskbar as well as your recent search queries. To search, simply
type a term. The search then displays all matching items for which you have
at least view or read permissions, grouped by type like users and
tickets. Selecting one of those results opens the item as tab in the
taskbar.

Searching for a term also matches any values that begin with it. For
example, searching for `brooks` also finds values like `brookster`. This
does not apply when you use an attribute notation like
`owner.lastname:brooks` (described in the [Elasticsearch
syntax](#using-elasticsearch-syntax) section below), which matches exact
values only.

![Screenshot shows search results in the
taskbar](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

If you press [[enter]] or click on `detailed search`, Zammad opens the
detailed search as a tab in the taskbar. There you can narrow down your
search by selecting a specific object type (e.g. organization), using
advanced filters or even using Elasticsearch syntax. Read on for more
information.

## Erweiterte Suche

Manchmal liefert Ihnen ein einfacher Suchbegriff nicht die gewünschten
Ergebnisse. Zammad bietet Ihnen auf der Seite Erweiterte Suche verschiedene
Möglichkeiten, die Suche einzugrenzen.

Advanced filters are not available for customer accounts. If your account
has customer permissions only, the **Search entity** selector and the
advanced filter options described below are not shown.

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

Unlike the search field, you can filter the search results based on specific
attributes and their values.  To do so, click on the `Advanced filters`
button on the right side, which opens an area where you can specify
additional conditions based on specific attributes and their values. Choose
an attribute and enter or select a value to match against. When using more
than one filter, all conditions must be met; they are logically connected by
AND. This also applies to the search term in the main search field.

Remove a single filter by hovering over it and clicking the ::x:: that
appears next to the value field. To remove all filters, click the `x` in the
main search bar at the top next to the `x filter(s)` label and confirm the
removal.

To add another filter, click `Add filter` below or between the existing
filter rows and pick an attribute from the selection list. The list only
offers attributes that are not used by any filter yet, so each attribute can
be used only once.

Falls Sie Ihren Filter speichern oder weitergeben möchten, können Sie dies
tun, indem Sie die URL kopieren. Sie enthält den vollständigen
Filter. Beachten Sie, dass die Suchergebnisse für andere Benutzer aufgrund
abweichender Berechtigungen unterschiedlich ausfallen können.

Wenn Sie immer noch nicht gefunden haben, was Sie suchen, können Sie von der
Elasticsearch-gestützten Suche profitieren.  Im nächsten Abschnitt finden
Sie einige Beispiele.

## Elasticsearch-Syntax verwenden

This is an advanced topic for power users. By using Elasticsearch syntax,
you can exactly filter your data for specific attribute values. All indexed
attributes are supported. Read on to find examples of how to use it or head
over to the [indexed attributes by Elasticsearch
page](/en/reference/es-indexed-attributes) where you can find a list with
additional attributes.

### Wichtige Informationen

- Vergewissern Sie sich, dass Sie das relevante Objekt in der Tab-Auswahl
  **Suchobjekt** auswählen. Zum Beispiel ist `customer.lastname` für Tickets
  verfügbar, jedoch nicht für Benutzer.
- Multiple search terms are combined by a logical AND by default, so `smith
  open` only finds results containing both terms. Use an explicit `OR` if
  you want either of them.
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
