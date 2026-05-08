---
order: 2
title: Ticket-Grundlagen
---

# Ticket-Grundlagen

Neu bei Ticket-Systemen? Dann lesen Sie weiter über die Grundlagen. Dies
hilft Ihnen, die wichtigsten Konzepte zu verstehen und mit Zammad
loszulegen. Wenn Sie bereits mit Ticketsystemen vertraut sind, können Sie
direkt zu den nächsten Seiten über das Finden, Erstellen und Arbeiten mit
Tickets in Zammad springen.

## Einführung

In Zammad werden **Tickets** verwendet, um Anfragen von Kunden zu bearbeiten
und zu verfolgen. Wenn ein Kunde Ihnen (oder Ihrer Firma) zum ersten Mal
eine E-Mail schickt, erstellt Zammad ein neues Ticket. Jede Nachricht
zwischen Ihnen und dem Kunden wird in diesem Ticket gespeichert, bis das
Problem gelöst oder der Kunde zufrieden ist und das Ticket schließlich
**geschlossen** werden kann.

Wenn Sie ganz neu in einem Ticket-System sind und Ihre Kundenanfragen bisher
mit einem E-Mail-Client bearbeitet haben, denken Sie vielleicht, dass ein
Ticket-System kompliziert ist. Aber das Gegenteil ist der Fall:

- Alle E-Mails werden nun in Zammad gesammelt (und Anfragen aus anderen
  Kanälen möglicherweise auch).
- Sie und Ihre Kollegen können sehen, wer an welcher Kundenanfrage
  ("Ticket") arbeitet.
- Der Status jeder Anfrage sowie die Historie (wer hat was getan?) sind
  transparent.
- Es gibt keine doppelte Arbeit und nichts wird übersehen.
- In schwierigen Fällen können Sie Ihre Kollegen direkt im Ticket um Hilfe
  bitten.
- Mit der intuitiven Benutzeroberfläche von Zammad können Sie sich auf das
  Wesentliche konzentrieren: die Lösung von Kundenproblemen und die
  Beantwortung von Kundenfragen.

Das bedeutet, dass Sie mit Zammad auf ähnliche Weise arbeiten können wie mit
Ihrem E-Mail Client. Mit dem Unterschied, dass ein Ticket zusätzliche
Attribute hat. Lesen Sie weiter, um mehr zu erfahren.

## Ticket Attribute

Zusätzlich zu den Artikeln verfügen Tickets über einige zusätzliche
Metainformationen, die als Attribute bezeichnet werden. Verwenden Sie die
**Ticket-Seitenleiste**, um Ticket-Attribute anzuzeigen und zu ändern.

![Screenshot shows ticket
sidebar](/screenshots/cypress/documentation/use/basics.cy.js/ticket-sidebar.png)

Um die Seitenleiste auszublenden, klicken Sie auf die Schaltfläche mit dem
Pfeil auf der linken Seite der Seitenleiste. Klicken Sie auf einen der Tabs,
um sie wieder einzublenden. Die verfügbaren Optionen hängen von Ihren
Berechtigungen und der Konfiguration Ihres Systems ab.

Es ist sogar möglich, benutzerdefinierte Felder für Tickets zu erstellen
(auch für Gruppen, Benutzer und Organisationen). Sie denken, ein solches
benutzerdefiniertes Feld macht Sinn? Sprechen Sie mit Ihrem
Zammad-Administrator, es lässt sich leicht einrichten.

### Status

Der Status spiegelt den aktuellen Status eines Tickets wider (hauptsächlich,
ob eine Kundenanfrage gelöst ist oder nicht). Man kann sich den Status als
eine Darstellung des Fortschritts vorstellen. Standardmäßig gibt es die
folgenden Status:

- **Neu**: Status für neue Tickets, an denen noch niemand gearbeitet
  hat. Wenn ein Ticket zum ersten Mal aktualisiert wird, wechselt es
  automatisch zu offen.
- **Offen**: Status für Tickets, die noch nicht gelöst sind und an denen
  noch gearbeitet werden muss.
- **Warten auf Schließen**: Status für Tickets, die grundsätzlich gelöst
  sind, die Sie aber nicht sofort schließen möchten. Für diesen Status
  müssen Sie ein Datum und eine Uhrzeit eingeben, zu der das Ticket
  automatisch auf geschlossen wechselt.
- **Warten auf Erinnerung**: Status für offene Tickets, an die Sie zu einem
  bestimmten Datum und einer bestimmten Uhrzeit erinnert werden
  möchten. Hier müssen Sie ein Datum und eine Uhrzeit eingeben, zu der Sie
  benachrichtigt werden möchten. Dies ist z.B. nützlich, wenn Sie eine Frage
  an eine dritte Partei hatten und sicherstellen möchten, dass dieses
  Problem nicht in Vergessenheit gerät.
- **Zusammengefasst**: Status für ein Ticket, das mit einem anderen Ticket
  zusammengeführt wurde. Prüfen Sie die [verknüpften
  Tickets](/de/documentation/use/advanced-features#tickets-verknupfen), um
  das zugehörige Ticket zu sehen.

Zammads Status sind farbkodiert. Das hilft Ihnen den Zustand eines Tickets
viel schneller zu verstehen - ohne einen detaillierten Blick hinein werfen
zu müssen.

![Screenshot shows different color-coded
states](/screenshots/documentation/use/overviews/states.png)

### Priorität

Die Priorität eines Tickets ist einfach eine Einstufung (von 1 bis 3), wie
dringend oder wichtig es ist. Die drei Standardprioritäten sind:

- 1 niedrig
- 2 normal
- 3 hoch

Falls diese Prioritäten nicht ausreichen, bitten Sie Ihren
Zammad-Administrator, zusätzliche Prioritäten zu erstellen. Die
Standardprioritäten ermöglichen es Ihnen, die Wichtigkeit Ihrer Tickets
sofort zu erkennen, da sie farblich gekennzeichnet sind:

![Screenshot shows different color-coded
priorities](/screenshots/documentation/use/overviews/priorities.png)

Sie fragen sich vielleicht, was eine solche Priorität macht. Von Haus aus
passiert damit eigentlich nichts, außer der
Hervorhebung. Zammad-Administratoren können jedoch alle Arten von
Automatisierungen und Prüfungen auf der Grundlage der Priorität einrichten.

Beachten Sie, dass Kunden keine Priorität für ihre eigenen Tickets festlegen
können. Andernfalls könnten einige ihre Tickets immer auf hoch setzen und
auf eine sofortige Eskalation hoffen.

### Tags

Tags sind Kennzeichen, die Tickets zugewiesen werden können, um sie in
Zukunft leichter auffinden zu können. Sie können in Bedingungen wie in
Triggern und in Übersichten verwendet werden und sie können auch automatisch
von Makros, Automatisierungen und Triggern zugewiesen werden. Natürlich
können Sie auch nach dem Text der Tags suchen und die Tickets finden, denen
das Tag zugewiesen wurde.

![Screenshot shows tag area in ticket side
bar](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-tags.png)

In der Ticket-Seitenleiste finden Sie einen Abschnitt mit der Bezeichnung
**Tags**. Fügen Sie einen Tag hinzu, indem Sie auf die Schaltfläche ::+::
klicken.  Je nach Zammad-Konfiguration können Sie neue Tags erstellen, indem
Sie sie einfach eintippen und mit [[enter]] oder [[tab]] bestätigen. In
jedem Fall können Sie aus bereits vorhandenen Tags wählen. Sobald Sie
anfangen zu tippen sehen Sie eine Liste mit passenden Vorschlägen. Um ein
Tag zu entfernen, klicken Sie auf die Schaltfläche ::X:: auf der rechten
Seite des Tabs.

### Gruppe

Dieses Ticket-Attribut ist nützlich für Organisationen mit mehr als einem
Team. Häufig werden Gruppen so konfiguriert, dass für eine Abteilung eine
eigene Gruppe angelegt wird. Je nach Berechtigung sehen Sie das Ticket
möglicherweise nicht, nachdem Sie die Gruppe geändert und die Änderungen
gespeichert haben. Falls Sie das Gruppenfeld nicht sehen können, gibt es
entweder nur eine Gruppe in Ihrem Zammad-System oder Sie haben nicht die
Berechtigung, ein Ticket in einer anderen Gruppe zu erstellen.

### Besitzer

Dies ist die Person, die derzeit für das Ticket verantwortlich ist. Falls
Sie Informationen von einem anderen Kollegen benötigen, können Sie entweder
den Besitzer auf diese Person ändern oder die Person in einem Artikel
erwähnen, indem Sie [[@]][[@]] eingeben und den Benutzer auswählen. Im
letzteren Fall wird der Benutzer benachrichtigt und erhält automatisch
Benachrichtigungen über Aktualisierungen des Tickets.

Um den Besitzer auf eine Person zu ändern, die nur Zugriff auf die Tickets
einer anderen Gruppe hat, müssen Sie zunächst die Gruppe entsprechend
ändern.

-----

Da Sie nun die Grundlagen kennen, sind vielleicht die folgenden Seiten
hilfreich:

- [Tickets finden](/de/documentation/use/basics/find-tickets)
- [Tickets erstellen](/de/documentation/use/basics/create-tickets)
- [Arbeiten an Tickets](/de/documentation/use/basics/work-with-tickets)
