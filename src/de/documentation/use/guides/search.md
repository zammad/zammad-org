---
order: 2
title: Suche
---

# Suche

In Zammad können Sie grundsätzlich nach allen verfügbaren Informationen
suchen:

- Betreff und Text der Nachricht
- Namen und E-Mail-Adressen
- Text in Dateianhängen
- Benutzer- und Organisationsdetails (wie Notizen, Namen, etc.)

Je nachdem, wonach Sie suchen und wie groß die Datenmenge in Ihrer
Zammad-Instanz ist, können Sie auf unterschiedliche Weise suchen. Lesen Sie
weiter, um mehr über die Grundlagen der Suche zu erfahren, gefolgt von der
Erweiterten Suche und der Verwendung von Elasticsearch-Syntax.

## Einfache Suche

The search is located in the top left corner of the primary
navigation. Either select it via mouse or use the keyboard shortcut
[[s]]. After activation, you can see the tickets which got recently closed
from your taskbar as well as your recent search queries. To search, simply
type a term. The search then displays all matching items for which you have
at least view or read permissions, grouped by type like users and
tickets. Selecting one of those results opens the item as tab in the
taskbar.

![Screenshot shows search results in primary
navigation](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

Wenn Sie [[Enter]] drücken oder auf `Erweiterte Suche` klicken, öffnet
Zammad die Erweiterte Suche als Tab in der Navigations-Seitenleiste. Dort
können Sie Ihre Suche eingrenzen, indem Sie einen bestimmten Objekttyp
(z.B. Organisation) auswählen, erweiterte Filter verwenden oder sogar die
Elasticsearch-Syntax nutzen. Lesen Sie weiter für weitere Informationen.

## Erweiterte Suche

Manchmal liefert Ihnen ein einfacher Suchbegriff nicht die gewünschten
Ergebnisse. Zammad bietet Ihnen auf der Seite Erweiterte Suche verschiedene
Möglichkeiten, die Suche einzugrenzen.

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
<!--Screenshot skipped for now. Will be added after more attributes are available-->
Im Vergleich zum Suchfeld können Sie die Suchergebnisse auf der Grundlage bestimmter Attribute und deren Werten filtern.
Klicken Sie dazu auf die Schaltfläche `Erweiterte Filter` auf der rechten Seite, die einen Bereich für zusätzliche
Bedingungen auf Basis bestimmter Attribute und deren Werte öffnet. Wählen Sie ein Attribut und geben Sie einen Wert ein oder wählen Sie einen Wert, mit dem die
Suchergebnisse übereinstimmen müssen. Jedes Attribut ist nur einmal verfügbar. Wenn Sie mehr als einen Filter verwenden, beachten Sie bitte, dass
sie alle erfüllt sein müssen, da sie logisch durch einen AND-Operator verbunden sind. Dies gilt auch für den Suchbegriff
im Hauptsuchfeld.

Entfernen Sie einen einzelnen Filter, indem Sie auf das ::x:: neben dem Wert
klicken. Um alle Filter zu entfernen, klicken Sie auf `x` in der
Hauptsuchleiste oben neben dem Label `x Filter`.

Falls Sie Ihren Filter speichern oder weitergeben möchten, können Sie dies
tun, indem Sie die URL kopieren. Sie enthält den vollständigen
Filter. Beachten Sie, dass die Suchergebnisse für andere Benutzer aufgrund
abweichender Berechtigungen unterschiedlich ausfallen können.

Wenn Sie immer noch nicht gefunden haben, was Sie suchen, können Sie von der
Elasticsearch-gestützten Suche profitieren.  Im nächsten Abschnitt finden
Sie einige Beispiele.

## Elasticsearch-Syntax verwenden

Dieses Thema hat einen eigenen Abschnitt, da es sich um ein
fortgeschrittenes Thema für erfahrene Benutzer handelt. Mit der
Elasticsearch-Syntax können Sie Ihre Daten genau nach bestimmten
Attributwerten filtern. Im Grunde werden alle indizierten Attribute
unterstützt. Lesen Sie weiter, um Beispiele für die Verwendung zu finden,
oder gehen Sie auf die Seite [Elasticsearch indizierte
Attribute](/de/reference/es-indexed-attributes), wo Sie eine Liste mit
weiteren Attributen finden können.

### Wichtige Informationen

- Vergewissern Sie sich, dass Sie das relevante Objekt in der Tab-Auswahl
  **Suchobjekt** auswählen. Zum Beispiel ist `customer.lastname` für Tickets
  verfügbar, jedoch nicht für Benutzer.
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
