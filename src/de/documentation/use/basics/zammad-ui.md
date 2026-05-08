---
order: 1
title: 'Zammad Benutzeroberfläche'
---

# Zammad Benutzeroberfläche

Die Benutzeroberfläche (*User Interface*, kurz UI) von Zammad ist so
konzipiert, dass sie Benutzern eine intuitive Arbeit ermöglicht. Sie basiert
auf dem Konzept der Einfachheit, Klarheit und Zugänglichkeit und folgt
allgemeinen Software-Design-Prinzipien, wodurch die Benutzeroberfläche im
Wesentlichen selbsterklärend sein sollte.

Es gibt grundlegende modulare Komponenten für verschiedene Funktionen, um
die Benutzeroberfläche konsistent zu halten. Diese Komponenten werden in den
folgenden Abschnitten beschrieben. Abhängig von der aktuell geöffneten
Ansicht gibt es interaktive Komponenten wie Tooltips und eine
kontextbezogene Hilfe. Verwenden Sie diese, wo immer Sie diese benötigen.

![Screenshot shows the ticket detail
view](/screenshots/cypress/documentation/use/basics-zammad-ui.cy.js/zammad-ui-full.png)

## Haupt UI-Elemente

Der Screenshot oben zeigt eine Ticket-Detailansicht in Zammad. Lesen Sie
weiter, um eine Beschreibung der verschiedenen Elemente von Zammad zu
erhalten.

Navigations-Seitenleiste
: Dies ist die linke Seitenleiste, die die Suche, Benachrichtigungen, Übersichten,
  Tabs für Tickets, Ihren Avatar und die Schaltfläche zum Erstellen von Tickets enthält.

Navigations-Tab
: Jedes Element der Navigations-Seitenleiste wird als Navigations-Tab bezeichnet. Je nach Inhalt kann es z.B. ein Ticket-Tab (mit
  der Ticket-Detailansicht) oder ein Übersichten-Tab sein, der die Liste der verfügbaren Übersichten öffnet.

Ticket-Detailansicht
: Hier bearbeiten Sie Ihre Kundenanfragen. Sie befindet sich in der Mitte
  des Bildschirms, wenn ein Ticket-Tab in der Navigations-Seitenleiste ausgewählt ist.

Seitenleiste
: Dies ist die rechte Seitenleiste in der Ticket-Detailansicht. Sie enthält Seitenleisten- Tabs
  wie Kunde und Checkliste und zeigt den aktuell ausgewählten Tab an.

Seitenleisten-Tabs
: Auf der rechten Seite der (rechten) Seitenleiste finden Sie kleine Icons, mit denen Sie zwischen
  den verschiedenen Tabs wechseln können. Die Verfügbarkeit dieser Tabs hängt von Ihrer System-Konfiguration,
  Ihren Berechtigungen und den Ticket-Attributen ab (z.B. ob der Kunde des Tickets einer Organisation angehört).

## Navigations-Seitenleiste

Die Navigations-Seitenleiste ist Ihr zentraler Ort, um auf alle wichtigen
Bereiche von Zammad zuzugreifen. Möglicherweise sehen Sie nicht alles davon,
da manches von der Konfiguration Ihres Zammads abhängt. Die
Navigations-Seitenleiste ist immer sichtbar. Das heißt, wenn Sie nicht
wissen, wo Sie sich befinden, können Sie z.B. jederzeit zum Dashboard, zu
Ihren Übersichten oder zu einem geöffneten Ticket zurückkehren.

Such- und Benachrichtigungsbereich
: Beinhaltet die Suche, in der Sie nach Benutzern, Organisationen, Tickets und grundsätzlich allen in Zammad verfügbaren
  Informationen suchen können. Neben der Suche finden Sie das Zammad-Logo. Falls es eine Benachrichtigung gibt, zeigt es Ihnen
  in einem Zähler an, wie viele Benachrichtigungen vorhanden sind.

Navigation
: Ermöglicht Ihnen den Wechsel zu verschiedenen Zammad-Ansichten wie dem
Dashboard, den Übersichten, der Knowledge Base oder der Telefonansicht.

Inhalts-Tabs
: Es gibt Tabs für Ihre geöffneten Tickets, Benutzer und Organisationen.

Untere Leiste
: Profileinstellungen und Schaltfläche "Neues Ticket" innerhalb der Navigations-Seitenleiste. Falls Sie über entsprechende Berechtigungen verfügen, gibt es zusätzlich die Schaltflächen Einstellungen und
  Berichte.

Zammad speichert Ihren aktuellen Arbeitsfortschritt sofort, so dass Sie
leicht zwischen den verschiedenen Bereichen von Zammad wechseln können und
keine Angst haben müssen, Daten zu verlieren, z.B. eine noch nicht
abgeschickte Antwort in einem Ticket.

## Seitenleiste

Die Seitenleiste auf der rechten Seite zeigt alle ticketrelevanten
Informationen an und enthält zusätzliche Funktionen. Die wichtigste davon
ist die Ticket-Seitenleiste. Wechseln Sie zwischen den verschiedenen
Seitenleisten, indem Sie auf den gewünschten Tab auf der rechten Seite der
Seitenleiste klicken. Die verfügbaren Tabs hängen vom Ticket und den
konfigurierten Funktionen Ihres Zammads ab.

<!-- markdownlint-disable MD007 -->

Ticket Tab
: In diesem Tab werden die Ticket-Informationen wie Besitzer, Gruppe, Priorität und Status angezeigt und Sie können diese Werte bearbeiten.
  Wenn Sie auf die ::a:: Schaltfläche oben klicken, können Sie außerdem die folgenden Aktionen ausführen:

  - Historie: Zeigt einen Dialog mit der Historie des aktuellen Tickets
    an. Hier können Sie sehen, wer wann welche Änderungen durchgeführt hat.
  - Zusammenfassen: Fassen Sie das Ticket mit einem anderen zusammen, falls
    ein Kunde Sie mehrfach wegen desselben Problems kontaktiert hat.
  - Kunden ändern: Ändern Sie den Kunden für das Ticket.

Kunden Tab
: Anzeige der Kundendetails einschließlich eines Verweises auf dessen andere Tickets. Sie können den Kunden des Tickets hier ändern,
  indem Sie auf die ::a:: Schaltfläche klicken und "Kunden ändern" auswählen.

Organisations Tab
: Dieser Tab wird nur angezeigt, wenn der Kunde Mitglied einer Organisation ist. Sie zeigt die Details der Organisation einschließlich aller
  Mitglieder. Bearbeiten Sie die Organisation, indem Sie die ::a:: Schaltfläche im oberen Bereich klicken.
