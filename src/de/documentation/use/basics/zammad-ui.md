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

## Main UI elements

Der Screenshot oben zeigt eine Ticket-Detailansicht in Zammad. Lesen Sie
weiter, um eine Beschreibung der verschiedenen Elemente von Zammad zu
erhalten.

Primary navigation
: This is the whole left sidebar which includes the search, notifications, overviews, the taskbar, your avatar, the
  ticket create button and maybe more, depending on your system (see next section).

Ticket detail view
: This is where you handle your customer requests. It appears in the main content in the middle of the screen when a
  ticket tab is selected in the navigation sidebar.

Seitenleiste
: Dies ist die rechte Seitenleiste in der Ticket-Detailansicht. Sie enthält Seitenleisten- Tabs
  wie Kunde und Checkliste und zeigt den aktuell ausgewählten Tab an.

## Primary navigation

Die primäre Navigation ist Ihr zentraler Ort, um auf alle wichtigen Bereiche
von Zammad zuzugreifen. Möglicherweise sehen Sie nicht alles davon, da
manches von der Konfiguration Ihres Zammads abhängt. Die
Navigations-Seitenleiste ist immer sichtbar. Das heißt, wenn Sie nicht
wissen, wo Sie sich befinden, können Sie z.B. jederzeit zum Dashboard, zu
Ihren Übersichten oder zu einem geöffneten Ticket zurückkehren.

Search and notification area
: Includes the search where you can search for users, organizations, tickets and basically every in Zammad available
  information. Next to the search you can find the Zammad logo. In case there is a notification, it shows you a badge
  with a count about how many notifications you got.

Navigation tabs
: Allows you to switch to different Zammad screens like the dashboard, overviews, knowledge base or phone screen
  depending on your system.

Taskbar tabs
: You can find tabs for your opened tickets, users, organizations and the detailed search in the taskbar. So if you
  read about a user tab, this means an opened user tab in your sidebar.

Bottom bar
: Profile settings and create new ticket button. In case you have additional permissions, there might be a settings and
  a reporting button as well.

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

Ticket tab
: This tab shows the ticket information like owner, group, priority and state and lets you edit these values.
  Additionally, the following actions are available when you click on the ::a:: button in the top section:

  - Historie: Zeigt einen Dialog mit der Historie des aktuellen Tickets
    an. Hier können Sie sehen, wer wann welche Änderungen durchgeführt hat.
  - Zusammenfassen: Fassen Sie das Ticket mit einem anderen zusammen, falls
    ein Kunde Sie mehrfach wegen desselben Problems kontaktiert hat.
  - Kunden ändern: Ändern Sie den Kunden für das Ticket.

Customer tab
: View customer details including a reference to the customer's other tickets. You can change the ticket customer here
  as well by clicking on the ::a:: button in the top section.

Organization tab
: This tab is only shown if the customer is member of an organization. It shows the organization's details including all
  members. By clicking on the ::a:: button in the top section, you can edit the organization.
