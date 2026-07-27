---
order: 1
title: 'Zammad кориснички интерфејс'
---

# Zammad кориснички интерфејс

Кориснички интерфејс Zammad-а је дизајниран да пружи интуитивно искуство
корисницима. Направљен је на основу концепта једноставности, јасноће и
приступачности, и базиран је на основим принципима развоја софтвера који
чине интерфејс самообјашњивим.

Различите функције се ослањају на основне модуларне компоненте које чине
интерфејс конзистентним. Ове компоненте су објашњене у одељцима испод. У
зависности од тренутног екрана, постоје интерактивне компоненте, као што су
савети и контекстни описи. Користите их кад год је то неопходно.

![Screenshot shows the ticket detail
view](/screenshots/cypress/documentation/use/basics-zammad-ui.cy.js/zammad-ui-full.png)

## Main UI elements

The screenshot above shows a ticket detail view in Zammad. Read on for a
description of the different main elements of Zammad.

Primary navigation
: This is the whole left sidebar which includes the search, notifications, overviews, the taskbar, your avatar, the
  ticket create button and maybe more, depending on your system (see next section).

Ticket detail view
: This is where you handle your customer requests. It appears in the main content in the middle of the screen when a
  ticket tab is selected in the navigation sidebar.

Sidebar
: This is the right sidebar in the ticket detail view. It contains sidebar tabs like customers and checklists and
  displays the currently selected tab.

## Primary navigation

The primary navigation sidebar is your central place to access all main
parts of Zammad. You might not see all of them because some depend on the
configuration of your Zammad. The navigation sidebar is always visible. That
means if you don't know where you are, you can always go back to the
dashboard, your overviews or an opened ticket, for example.

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

Zammad immediately saves your current work progress, so you can easily
switch between the different areas of Zammad and you don't have to be afraid
of losing any data like a not yet sent answer in a ticket.

## Трака са стране

The right sidebar in the ticket detail view holds different sidebar tabs
like **Ticket**, **Customer** and **Checklist**, depending on the state of
the ticket, the customer and the configuration of your Zammad.  Switch
between these sidebar tabs by clicking the corresponding icon on the right
side of the sidebar.

<!-- markdownlint-disable MD007 -->

Ticket tab
: This tab shows the ticket information like owner, group, priority and state and lets you edit these values.
  Additionally, the following actions are available when you click on the ::a:: button in the top section:

  - Историјат: приказује дијалог са историјатом тренутног тикета. Овде
    можете пронаћи када сау и које радње извршене над тикетом и од стране
    кога.
  - Споји: спојите тикет са другим у случају да вас је клијент контактирао
    више пута у вези истог проблема.
  - Измени клијента: поставите другог клијента тикета.

Customer tab
: View customer details including a reference to the customer's other tickets. You can change the ticket customer here
  as well by clicking on the ::a:: button in the top section.

Organization tab
: This tab is only shown if the customer is member of an organization. It shows the organization's details including all
  members. By clicking on the ::a:: button in the top section, you can edit the organization.
