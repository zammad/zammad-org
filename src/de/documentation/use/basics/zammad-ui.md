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

![Screenshot zeigt die
Ticket-Detailansicht](/screenshots/cypress/documentation/use/basics-zammad-ui.cy.js/zammad-ui-full.png)

## Haupt-UI-Elemente

Der Screenshot oben zeigt eine Ticket-Detailansicht in Zammad. Lesen Sie
weiter, um eine Beschreibung der verschiedenen Elemente von Zammad zu
erhalten.

Primäre Navigation
: Hierbei handelt es sich um die gesamte linke Seitenleiste, die die Suche, Benachrichtigungen, Übersichten, die Taskleiste, Ihren Avatar, die
  Schaltfläche zum Erstellen eines Tickets und je nach Ihrem System möglicherweise weitere Elemente enthält (siehe nächster Abschnitt).

Ticket-Detailansicht
: Hier bearbeiten Sie Ihre Kundenanfragen. Sie wird im Hauptinhaltsbereich in der Mitte des Bildschirms angezeigt,
  wenn in der Navigations-Seitenleiste ein Ticket-Tab ausgewählt ist.

Seitenleiste
: Dies ist die rechte Seitenleiste in der Ticket-Detailansicht. Sie enthält Seitenleisten- Tabs
  wie Kunde und Checkliste und zeigt den aktuell ausgewählten Tab an.

## Primäre Navigation

Die primäre Navigation ist Ihr zentraler Ort, um auf alle wichtigen Bereiche
von Zammad zuzugreifen. Möglicherweise sehen Sie nicht alles davon, da
manches von der Konfiguration Ihres Zammads abhängt. Die
Navigations-Seitenleiste ist immer sichtbar. Das heißt, wenn Sie nicht
wissen, wo Sie sich befinden, können Sie z.B. jederzeit zum Dashboard, zu
Ihren Übersichten oder zu einem geöffneten Ticket zurückkehren.

Such- und Benachrichtigungsbereich
: Beinhaltet die Suche, in der Sie nach Benutzern, Organisationen, Tickets und grundsätzlich allen in Zammad verfügbaren
  Informationen suchen können. Neben der Suche finden Sie das Zammad-Logo. Falls es eine Benachrichtigung gibt, zeigt es Ihnen
  in einem Zähler an, wie viele Benachrichtigungen vorhanden sind.

Navigations-Tabs
: Ermöglichen es Ihnen, zu verschiedenen Zammad-Ansichten wie dem Dashboard, den Übersichten, der Knowledge Base oder der Telefonansicht zu wechseln,
  abhängig von Ihrem System.

Taskleisten-Tabs
: In der Taskleiste finden Sie Registerkarten für Ihre geöffneten Tickets, Benutzer, Organisationen sowie die erweiterte Suche. Wenn also
  von einem Benutzer-Tab die Rede ist, ist damit ein geöffneter Benutzer-Tab in Ihrer Seitenleiste gemeint.

Untere Leiste
: Profileinstellungen und Schaltfläche "Neues Ticket" innerhalb der Navigations-Seitenleiste. Falls Sie über entsprechende Berechtigungen verfügen, gibt es zusätzlich die Schaltflächen Einstellungen und
  Berichte.

Zammad speichert Ihren aktuellen Arbeitsfortschritt sofort, so dass Sie
leicht zwischen den verschiedenen Bereichen von Zammad wechseln können und
keine Angst haben müssen, Daten zu verlieren, z.B. eine noch nicht
abgeschickte Antwort in einem Ticket.

## Seitenleiste

Die rechte Seitenleiste in der Ticket-Detailansicht enthält verschiedene
Seitenleisten-Tabs wie **Ticket**, **Kunde** und **Checkliste**, abhängig
vom Status des Tickets, des Kunden und der Konfiguration Ihres Zammad. Sie
können zwischen diesen Seitenleisten-Tabs wechseln, indem Sie auf das
entsprechende Symbol auf der rechten Seite der Seitenleiste klicken.

<!-- markdownlint-disable MD007 -->

Ticket-Tab
: In diesem Tab werden die Ticket-Informationen wie Besitzer, Gruppe, Priorität und Status angezeigt und Sie können diese Werte bearbeiten.
  Wenn Sie auf die ::a:: Schaltfläche oben klicken, können Sie außerdem die folgenden Aktionen ausführen:

  - Historie: Zeigt einen Dialog mit der Historie des aktuellen Tickets
    an. Hier können Sie sehen, wer wann welche Änderungen durchgeführt hat.
  - Zusammenfassen: Fassen Sie das Ticket mit einem anderen zusammen, falls
    ein Kunde Sie mehrfach wegen desselben Problems kontaktiert hat.
  - Kunden ändern: Ändern Sie den Kunden für das Ticket.

Kunden-Tab
: Anzeige der Kundendetails einschließlich eines Verweises auf dessen andere Tickets. Sie können den Kunden des Tickets hier ändern,
  indem Sie auf die ::a:: Schaltfläche klicken.

Organisations-Tab
: Dieser Tab wird nur angezeigt, wenn der Kunde Mitglied einer Organisation ist. Sie zeigt die Details der Organisation einschließlich aller
  Mitglieder. Bearbeiten Sie die Organisation, indem Sie die ::a:: Schaltfläche im oberen Bereich klicken.
