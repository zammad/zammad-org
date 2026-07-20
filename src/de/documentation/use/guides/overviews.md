---
order: 1
title: Übersichten
---

# Übersichten

![Screenshot zeigt geöffneten
Übersichten-Bereich](/screenshots/cypress/documentation/use/guide-overview.cy.js/overview-full.png)

## Einführung

Overviews are a core component of Zammad. Open them by clicking the
`Overviews` button in the primary navigation or use the keyboard shortcut
[[o]]. You can think of overviews as a kind of email inbox with different
folders. Use them to find new tickets that you want to process and to keep
track of tickets that have not yet been completed.

Je nachdem, wie Ihr System konfiguriert ist und was Ihr Zammad-Administrator
eingerichtet hat, finden Sie dort zum Beispiel folgende Übersichten:

- Meine zugewiesenen Tickets
- Nicht zugewiesene & offene Tickets
- Ausstehende Tickets
- Eskalierte Tickets

Wenn Sie eine Übersicht in der zweiten Navigationsebene auswählen, sehen Sie
eine Tabelle mit den entsprechenden Tickets.

## Verwendung und Features

Übersichten können von Administratoren anhand von Regeln und Bedingungen
definiert werden. Das heißt, wenn ein Ticket geändert wurde und die
Bedingung der Übersicht nicht mehr zutrifft, verschwindet das Ticket aus
dieser Übersicht.

Die Übersichten werden automatisch aktualisiert. Sie müssen Ihren Browser
nicht neu laden, um die Änderungen zu sehen. Sie können die Reihenfolge
temporär anpassen, indem Sie auf eine der Spaltenbeschriftungen klicken und
die Breite der Spalten durch Ziehen der Spaltentrennlinien verändern.  Die
Reihenfolge bleibt nur so lange erhalten, bis Sie zu einer anderen Übersicht
wechseln oder die Seite neu laden.

Für jede Übersicht finden Sie einen angehängten Zähler. Anhand dieser Zahl
können Sie erkennen, wie viele Tickets sich in der jeweiligen Übersicht
befinden.

Die Ticket-Listen in Übersichten können auch nach einem bestimmten Attribut
(z.B. Kunde, Organisation, Besitzer) gruppiert werden. Dies muss von Ihrem
Zammad-Administrator eingestellt werden. Wenn eine Gruppierung aktiviert
ist, finden Sie dort auch einen Zähler der enthaltenen Tickets.

Je nachdem, was Sie suchen, wählen Sie eine passende Übersicht und beginnen
mit der Bearbeitung eines Tickets.

::: tip
Wenn Sie eine Übersicht vermissen oder andere Einstellungen wünschen, lassen Sie es Ihren Zammad-Administrator wissen!
:::

### Farbcodierter Status und Priorität

Um die verschiedenen Status und Prioritäten von Tickets zu visualisieren,
sind die Einträge in der Tabelle farblich gekennzeichnet.

Das Symbol neben dem Titel des Tickets zeigt vor allem den Handlungsbedarf
an:

![Screenshot zeigt Ticket
Status](/screenshots/documentation/use/overviews/states.png)

- Gelber Kreis: Handlungsbedarf (z.B. neu, offen, warten erreicht)
- Grauer Kreis: pausiert, im Moment keine Aktion erforderlich (z.B. warten
  auf...)
- Grüner Kreis: keine Aktion mehr erforderlich (z.B. geschlossen,
  zusammengefasst)
- Rotes Dreieck: Sofortiger Handlungsbedarf (Ticket eskaliert aufgrund einer
  SLA-Verletzung)

Wenn Sie einen Kreis mit einem blau/pinken Farbverlauf sehen, bedeutet das,
dass ein [KI-Agent](ai#ai-agents) gerade an dem Ticket arbeitet.

Die **Priorität** wird durch die Farbe des Ticket-Titels dargestellt:

![Screenshot zeigt Ticket
Prioritäten](/screenshots/documentation/use/overviews/priorities.png)

- 1 niedrig: grau
- 2 normal: blau
- 3 hoch: rot

### Ein Ticket öffnen

Open a ticket by simply clicking on the row. This opens the ticket as a tab
in your taskbar and shows you the ticket detail view. If this ticket is
already present in your taskbar, it activates this tab instead of opening a
duplicate tab.

Wenn eine Übersicht mehr als ein Ticket enthält und Sie eines der Tickets
öffnen, finden Sie im Header der Ticket Detailansicht Pfeile, um zum
nächsten/vorherigen Ticket dieser Übersicht zu wechseln.

### Mehrfach-Aktionen

Perform bulk actions by selecting multiple tickets and either use the bulk
action flyout or drag them with the mouse to invoke the bulk action
overlay. You can find more information about that in the [Bulk
Actions](../advanced-features#bulk-actions) section in the advanced features
page.

### Übersichten neu anordnen

If the order of the overviews doesn't reflect your working process or you
just like to have a different order, you can re-arrange them for your
account. Use the `reorder items` button at the very top of the second level
navigation, which opens your [profile
settings](/en/documentation/use/user-profile#overviews) where you can define
a custom order for your overviews. To change the order, simply drag & drop
them by clicking the handles on the left side.

Wenn Ihr Administrator die Reihenfolge ändert, bleibt Ihre individuelle
Reihenfolge erhalten. Sie können wieder zur Reihenfolge Ihres Administrators
wechseln, indem Sie auf die Schaltfläche `Reihenfolge der Übersichten
zurücksetzen` klicken.
