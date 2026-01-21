---
order: 1
title: Übersichten
---

# Übersichten

![Screenshot zeigt geöffneten
Übersichten-Bereich](/screenshots/cypress/usage-guide-overview.cy.js/overview-full.png)

## Einführung

Übersichten sind eine Kernkomponente von Zammad. Sie können sie öffnen,
indem Sie auf die Schaltfläche `Übersichten` in der Navigationsleiste
klicken oder das Tastaturkürzel [[o]] verwenden. Sie können sich die
Übersichten wie eine Art E-Mail-Posteingang mit verschiedenen Ordnern
vorstellen. Verwenden Sie sie, um neue Tickets zu finden, die Sie bearbeiten
möchten, und um den Überblick über Tickets zu behalten, die noch nicht
abgeschlossen sind.

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

![Screenshot zeigt Ticket Status](/screenshots/overviews/states.png)

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
Prioritäten](/screenshots/overviews/priorities.png)

- 1 niedrig: grau
- 2 normal: blau
- 3 hoch: rot

### Ein Ticket öffnen

Öffnen Sie ein Ticket, indem Sie einfach auf die Zeile klicken. Dadurch
öffnet sich das Ticket als Tab in der linken Navigationsleiste und zeigt
Ihnen die Ticket Detailansicht. Wenn dieses Ticket bereits in Ihrer
Navigationsleiste vorhanden ist, wird dieser Tab aktiviert, anstatt einen
doppelten Tab zu öffnen.

Wenn eine Übersicht mehr als ein Ticket enthält und Sie eines der Tickets
öffnen, finden Sie im Header der Ticket Detailansicht Pfeile, um zum
nächsten/vorherigen Ticket dieser Übersicht zu wechseln.

### Mehrfach-Aktionen

Führen Sie Mehrfach-Aktionen durch, indem Sie mehrere Tickets auswählen und
entweder die Dropdown-Felder verwenden oder sie mit der Maus ziehen, um die
Einblendung für die Mehrfach-Aktion aufzurufen. Weitere Informationen dazu
finden Sie im Abschnitt
[Mehrfach-Aktionen](../advanced-features#mehrfach-aktionen) auf der Seite
mit den erweiterten Funktionen.

### Übersichten neu anordnen

Wenn die Reihenfolge der Übersichten nicht Ihrem Arbeitsablauf entspricht
oder Sie einfach eine andere Reihenfolge wünschen, können Sie sie für Ihr
Konto neu anordnen. Verwenden Sie die Schaltfläche "Elemente neu anordnen"
ganz oben in der zweiten Navigationsleiste, die Ihre
[Profileinstellungen](/de/documentation/use/manage-profile#ubersichten)
öffnet, wo Sie eine benutzerdefinierte Reihenfolge festlegen können.

Um die Reihenfolge zu ändern, ziehen Sie die Übersichten einfach per Drag &
Drop, indem Sie auf die Fläche auf der linken Seite klicken.

Wenn Ihr Administrator die Reihenfolge ändert, bleibt Ihre individuelle
Reihenfolge erhalten. Sie können wieder zur Reihenfolge Ihres Administrators
wechseln, indem Sie auf die Schaltfläche `Reihenfolge der Übersichten
zurücksetzen` klicken.
