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

## Haupt UI-Elemente

Der Screenshot oben zeigt eine Ticket-Detailansicht in Zammad. Lesen Sie
weiter, um eine Beschreibung der verschiedenen Elemente von Zammad zu
erhalten.

Primary Navigation
: This is the whole left sidebar which includes the search, notifications, overviews, the taskbar, your avatar, the
  ticket create button and maybe more, depending on your system (see next section).

Ticket Detail View
: This is where you handle your customer requests. It appears in the main content in the middle of the screen when a
  ticket tab is selected in the navigation sidebar.

Seitenleiste
: Dies ist die rechte Seitenleiste in der Ticket-Detailansicht. Sie enthält Seitenleisten- Tabs
  wie Kunde und Checkliste und zeigt den aktuell ausgewählten Tab an.

## Primary Navigation

The primary navigation sidebar is your central place to access all main
parts of Zammad. You might not see all of them because some depend on the
configuration of your Zammad. The navigation sidebar is always visible. That
means if you don't know where you are, you can always go back to the
dashboard, your overviews or an opened ticket, for example.

Search and Notification Area
: Includes the search where you can search for users, organizations, tickets and basically every in Zammad available
  information. Next to the search you can find the Zammad logo. In case there is a notification, it shows you a badge
  with a count about how many notifications you got.

Navigation Tabs
: Allows you to switch to different Zammad screens like the dashboard, overviews, knowledge base or phone screen
  depending on your system.

Taskbar Tabs
: You can find tabs for your opened tickets, users, organizations and the detailed search in the taskbar. So if you
  read about a user tab, this means an opened user tab in your sidebar.

Untere Leiste
: Profileinstellungen und Schaltfläche "Neues Ticket" innerhalb der Navigations-Seitenleiste. Falls Sie über entsprechende Berechtigungen verfügen, gibt es zusätzlich die Schaltflächen Einstellungen und
  Berichte.

Zammad speichert Ihren aktuellen Arbeitsfortschritt sofort, so dass Sie
leicht zwischen den verschiedenen Bereichen von Zammad wechseln können und
keine Angst haben müssen, Daten zu verlieren, z.B. eine noch nicht
abgeschickte Antwort in einem Ticket.

## Seitenleiste

The right sidebar in the ticket detail view holds different sidebar tabs
like **Ticket**, **Customer** and **Checklist**, depending on the state of
the ticket, the customer and the configuration of your Zammad.  Switch
between these sidebar tabs by clicking the corresponding icon on the right
side of the sidebar.

<!-- markdownlint-disable MD007 -->

Ticket Tab
: In diesem Tab werden die Ticket-Informationen wie Besitzer, Gruppe, Priorität und Status angezeigt und Sie können diese Werte bearbeiten.
  Wenn Sie auf die ::a:: Schaltfläche oben klicken, können Sie außerdem die folgenden Aktionen ausführen:

  - Historie: Zeigt einen Dialog mit der Historie des aktuellen Tickets
    an. Hier können Sie sehen, wer wann welche Änderungen durchgeführt hat.
  - Zusammenfassen: Fassen Sie das Ticket mit einem anderen zusammen, falls
    ein Kunde Sie mehrfach wegen desselben Problems kontaktiert hat.
  - Kunden ändern: Ändern Sie den Kunden für das Ticket.

Customer Tab
: View customer details including a reference to the customer's other tickets. You can change the ticket customer here
  as well by clicking on the ::a:: button in the top section.

Organization Tab
: This tab is only shown if the customer is member of an organization. It shows the organization's details including all
  members. By clicking on the ::a:: button in the top section, you can edit the organization.
