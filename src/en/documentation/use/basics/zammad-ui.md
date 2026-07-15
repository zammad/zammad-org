---
order: 1
title: Zammad UI
---

# Zammad UI

The user interface (UI) of Zammad is designed to provide an intuitive experience for users. It is built around the
concept of simplicity, clarity, and accessibility and is based on common software design principles which should make
the UI pretty self explanatory.

There are basic modular components for different features to keep the UI consistent. These components are described in
the sections below. Depending on the currently opened screen, there are interactive components, such as tooltips and a
contextual help. Use them wherever needed.

![Screenshot shows the ticket detail view](/screenshots/cypress/documentation/use/basics-zammad-ui.cy.js/zammad-ui-full.png)

## Main UI Elements

The screenshot above shows a ticket detail view in Zammad. Read on for a description of the different main elements of
Zammad.

Navigation Sidebar
: This is the left sidebar which includes the search, notifications, overviews, ticket tabs, your avatar and the ticket
  create button.

Navigation Tab
: Each item of the navigation sidebar is called navigation tab. Depending on the content, it can be a ticket tab (with
  the ticket detail view) or the overview tab which opens the list of available overviews.

Ticket Detail View
: This is where you handle your customer requests. It appears in the main
  content when a ticket tab is selected in the navigation sidebar.

Sidebar
: This is the right sidebar in the ticket detail view. It contains sidebar tabs like customers and checklists and
  displays the currently selected tab.

Sidebar Tabs
: On the right side of the sidebar, you can find small icons to switch between the different tabs. The availability of
  these tabs depends on your system configuration, your permissions and the ticket attributes (e.g. if the ticket
  customer has an assigned organization).

## Navigation Sidebar

The navigation sidebar is your central place to access all main parts of Zammad. You might not see all of them because
some depend on the configuration of your Zammad. The navigation sidebar is always visible. That means if you don't know
where you are, you can always go back to the dashboard, your overviews or an opened ticket, for example.

Search and Notification Area
: Includes the search where you can search for users, organizations, tickets and basically every in Zammad available
  information. Next to the search you can find the Zammad logo. In case there is a notification, it shows you a badge
  with a count about how many notifications you got.

Navigation
: Allows you to switch to different Zammad screens like the dashboard, overviews, knowledge base or phone screen.

Taskbar Tabs
: You can find tabs for your opened tickets, users and organizations in the taskbar which is a part of the navigation
  sidebar.

Bottom Bar
: Profile settings and create new ticket button. In case you have additional permissions, there might be a settings and
  a reporting button as well.

Zammad immediately saves your current work progress, so you can easily switch between the different areas of Zammad and
you don't have to be afraid of losing any data like a not yet sent answer in a ticket.

## Sidebar

The sidebar on the right side displays all ticket relevant information and includes additional functionality. The most
important one is the ticket sidebar. Switch between the different sidebars by clicking the desired tab on the right side
of the sidebar. The available tabs depend on the ticket and the configured features of your Zammad.

<!-- markdownlint-disable MD007 -->

Ticket Tab
: This tab shows the ticket information like owner, group, priority and state and lets you edit these values.
  Additionally, the following actions are available when you click on the ::a:: button in the top section:

  - History: shows a dialog with the history in the current ticket. This is where you can find when and what actions
    was performed and by whom.
  - Merge: merge the ticket with another one in case a customer emailed you multiple times about the same issue.
  - Change customer: set another customer for the ticket.

Customer Tab
: View customer details including a reference to the customer's other tickets. You can change the ticket customer here
  as well by clicking on the ::a:: button in the top section.

Organization Tab
: This tab is only shown if the customer is member of an organization. It shows the organization's details including all
  members. By clicking on the ::a:: button in the top section, you can edit the organization.
