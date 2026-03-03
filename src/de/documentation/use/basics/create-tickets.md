---
order: 4
title: 'Tickets erstellen'
---

# Tickets erstellen

Wenn ein Kunde Ihnen eine Nachricht über einen Kanal sendet, der von Zammad
abgerufen wird, wird automatisch ein Ticket erstellt (es sei denn, Zammad
erkennt es als Nachfrage, dann wird es als Artikel zu einem bestehenden
Ticket hinzugefügt). Es kann jedoch Fälle geben, in denen Sie ein Ticket
manuell erstellen müssen. Beispiele:

- Ein Kunde ruft Sie per Telefon an.
- Sie erhalten einen Brief in Papierform von einem Kunden.
- Ein Kunde kommt zu einem physischen Serviceschalter.
- Sie müssen einen Kunden proaktiv informieren, indem Sie ihm eine Nachricht
  schicken.

In solchen Fällen müssen Sie manuell ein neues Ticket erstellen, indem Sie
auf die Schaltfläche ::+:: am unteren Rand der Navigationsleiste
klicken. Daraufhin wird ein Ticket-Erstellungsdialog angezeigt, in dem Sie
alle erforderlichen Informationen hinzufügen können.

![Screenshot zeigt den
Ticket-Erstellungsdialog](/screenshots/cypress/usage-basics.cy.js/ticket-create.png)

## Typauswahl

Im Ticket-Erstellungsdialog können Sie zwischen verschiedenen Artikeltypen
wählen:

- Eingehender Anruf: für Probleme, die von einem Kunden per Telefon gemeldet
  wurden.
- Ausgehender Anruf: für Probleme, die initial von einem Agenten per Telefon
  gemeldet werden.
- E-Mail versenden: für Probleme, die initial von einem Agenten per E-Mail
  gemeldet werden.

Wenn Sie **E-Mail versenden** wählen, erhält der Kunde eine E-Mail mit dem
Titel als Betreff und dem Text als E-Mail-Inhalt.

## Titel

Dies ist der Titel eines Tickets, der an vielen Stellen in Zammad angezeigt
wird, zum Beispiel in Übersichten. Er wird auch als Betreff für die
Kommunikation per E-Mail verwendet. Bei E-Mails wird automatisch eine
Ticket-Identifikation angehängt (z.B. `Ticket#901234 - Ich brauche Hilfe!`).

## Kunde

Geben Sie einen Namen oder die E-Mail-Adresse eines Kunden ein, um nach
bestehenden Benutzern zu suchen. Sie können auch nach Organisationen und
deren Mitgliedern suchen. Wählen Sie eine Option aus dem Dropdown-Menü oder
legen Sie einen neuen Kunden an, indem Sie auf die Schaltfläche **+ Neuen
Kunden erstellen** rechtes des Feldes klicken. Daraufhin öffnet sich ein
Dialog, in dem Sie alle relevanten Informationen zum Kunden eingeben
können. Ein Ticket kann nur einen Kunden haben.

Nach dem hinzufügen eines Kunden während der Ticketerstellung öffnet sich
automatisch die Kunden-Seitenleiste. Hier sehen Sie zusätzliche
Kunden-Meta-Informationen, einschließlich eines Hinweises auf die aktuell
geöffneten Tickets des Kunden.

## Text

Dies ist der Inhaltsbereich, in dem die derzeit bekannten Details des
Sachverhalts festgehalten werden. Beim Typ "E-Mail versenden" ist dies der
Inhalt/die Nachricht der E-Mail. Um mehr über den Editor und seine
Funktionen zu erfahren, lesen Sie die
[Editor-Dokumentation](/de/documentation/use/guides/editor).

## Ticket Attribute

Wie Sie vielleicht wissen, gibt es zusätzliche Ticket-Attribute wie Gruppe,
Priorität und Besitzer, die Sie einstellen können. Falls Sie die
[Ticket-Grundlagen](ticket-basics) noch nicht gelesen haben, lesen Sie dort
weiter, um mehr zu erfahren.

-----

After you provided the relevant information, finally create the ticket with
a click on the **Create** button. Read on [how to work with existing
tickets](work-with-tickets).
