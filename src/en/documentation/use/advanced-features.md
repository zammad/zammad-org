---
title: Advanced Features
order: 4
---

# Advanced Features

## Use Keyboard Shortcuts

TODO

## Adjust Behavior After Updating a Ticket

![Screenshot shows behavior after update menu](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Why?**

It is possible to automatically close a ticket tab in the navigation sidebar.
It depends on your preferences, but you can save a click after updating or
updating a ticket to _closed_ state.

**How?**

In the footer bar of the ticket detail view, click on the `Stay on tab ^` button
and select your desired option (if the default is still set, otherwise it is
labeled as the other options below). You have different options:

- **Stay on tab**: Default option. You have to manually close the tab if you
  want to have it removed from your navigation sidebar.
- **Close tab**: This option closes the tab on each update of the ticket. Might
  be a good option if you have to deal with many tickets and/or the tickets
  require many interactions.
- **Close tab on ticket close**: This option only closes the tab when the ticket
  is updated and the state is set to _closed_.

::: tip
If your situation differs from ticket to ticket, you can leave **Stay on tab**
and use the keyboard shortcut [[Shift]] [[c]] for changing the
ticket state to closed and close the ticket tab.
:::

## Use Text Modules

![Screenshot shows text modules feature](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Why?**

The usage of text modules has benefits like:

- You save time while answering tickets
- Answers from you and your colleagues are aligned because you use the same
  text for answers

**How?**

To use text modules simply type `::` in the editor followed by parts of the name
or keyword of the text module.

You can pick one by clicking on it or by using the up and down arrows followed
by [[Enter]] on your keyboard. There are some text modules in Zammad which are shipped
by default.

If you have to answer the same question again and again, ask your Zammad admin
to create such a text module for you. They can even include variables like
customer name or any other available attribute which get replaced while using it
in a ticket.

## Mention a Colleague

![Screenshot shows mention feature](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Why?**

Ask or request information from your colleagues or mention them
in important tickets so they receive notifications for ticket updates and are
automatically subscribed to this ticket.

**How?**

While writing an ticket article, simply type `@@` and enter some
letters of the name of the colleague you want to mention.

Zammad displays a list with all possible matches where you can pick one
by clicking on it or by using the up and down arrows followed by [[enter]]
on your keyboard.

## Subscribe to a Ticket

![Screenshot shows subscribe feature](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Why?**

If you are interested in the progress of a ticket, you can subscribe to it.
This means you will receive notifications for each update.

**How?**

Activate the "Subscribe me" toggle in the ticket side panel to get
notifications. If you have been mentioned in a ticket, you are automatically
subscribed. Switch the toggle off to stop the notification.
The avatars displayed show you who has subscribed to the ticket and
is therefore notified of updates.

## Use a Macro

![Screenshot shows macro action menu](/screenshots/cypress/usage-advanced-features.cy.js/ticket-macro.png)

**Why?**

If you have many steps you do over and over again, you should use a macro for
that. In such a macro, your admin can pre-define different ticket actions you
can apply with just a click. As an example, Zammad ships a "Close & Tag as Spam"
macro by default. If applied, the user who executes the macro is assigned as
owner, a tag `spam` is added and the ticket is closed.

**How?**

If your admin already created a macro, you can execute it in the ticket detail
view by clicking the three dots button `︙` in the right corner of the footer
bar and select the macro you want to execute.

::: warning
The macro gets executed immediately and without an additional confirmation!
:::

You can also apply a macro to several ticket at once. Have a loot at
[bulk actions](#bulk-actions) how to do that.

## Use Tags

![Screenshot shows tag area in ticket side bar](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

**Why?**

Tags are one way to categorize a ticket. You can think of tags as some kind
of labels. They can be used in conditions like in triggers and in overviews and
they can also be assigned automatically by macros, schedulers and triggers.
Of course you can search for the text of the tags and will find tickets which
have the tag attached.

**How?**

In the ticket sidebar, you can find a section which is labels as "Tags". Add
a tag by clicking on the `+` button. You can select existing tags and add new
ones (if your admin didn't disable to add new tags).

Remove them by simply click on the `X` button. Be aware that there is no
confirmation dialog for deleting a tag from a ticket.

## Use a Checklist

![Screenshot shows a checklist from checklist sidebar](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Why?**

- To keep track of tasks
- To complete tasks in a structured way
- To make sure nothing gets forgotten
- To make the progress of work more visible

**How?**

Select the "Checklist" tab in the sidebar. If you can't see it, your Zammad
admin disabled it. You can only add or edit a checklist, if you have the
permission to edit the ticket.

In the checklist sidebar, you can:

- Add a checklist: either by creating a new one by clicking on
  `Add Empty Checklist` or from a template by using `Add From a Template` (if
  you don't see the template button, there is none).
- Edit the current checklist:
  - Rename it by clicking on the title or using the `︙` menu in the sidebar
      header.
  - Add checklist items by clicking the `+` button.
  - Change the text of the checklist items, either by just clicking on it
      or using the `︙` menu next to the item.
  - `Reorder` the items by clicking this button and drag & drop the items.
- Delete the complete checklist by using the `︙` menu in the sidebar header.

There are two features, which are not directly visible:

- You can refer to other tickets as a checklist item by using its hook and
  number in the item text (e.g. `Ticket#123456`). Such items can't be checked
  manually, they reflect the state of the referred ticket.
  ::: tip
  Fetch the ticket hook and number by going to the desired ticket and either
  use the copy button in the header or use the keyboard shortcut [[.]].
  Then you can paste it in the checklist you want to have it included.
  :::
- Zammad automatically checks if all checklist items are completed. The check
  is performed when you set a ticket to "closed". If not all items are
  completed, Zammad will prompt you to either work on the remaining tasks and
  keep the ticket open or to close it anyway. When referencing other tickets
  in your checklist, only those which are closed (with a green circle) are
  considered as completed.

## Ticket Templates

**Why?**

Quickly create a ticket with pre-defined attributes like title, text, tags and
more saves you time. This requires your admin to create a ticket template.

**How?**

In the ticket create screen, you can find an `Apply Template ^` button in the
footer bar, if a template is available. Select the template you want to apply
and apply changes if desired.

## Shared Drafts

**Why?**

To share a draft with other agents of your group, e.g. to reflect a QA process,
instead of "just" adding an internal article. In such a draft you can even
include changed ticket attributes like priority, state and custom attributes as
well as an article with an answer to the customer.

This is an optional feature. If you can't see it, your admin has turned it off.

**How?**

To **save a draft**, use the `︙` menu in the footer of the ticket details view
and select "Save as draft".

To **apply an already existing draft**, click on the `Draft Available` button on
the left side of the footer.

::: warning
Applying a draft overwrites your unsaved changes!
:::

## Simultaneous Work Detection

![Screenshot shows other agents viewing/editing the ticket](/screenshots/advanced-features/simultaneous-work-detection.png)

**Why?**

Things to avoid:

- Superfluous work
- Conflicting answers from different agents
- Overwritten/undone changes by different agents

This is why you can immediately see who views and edits the currently viewed
ticket.

**How?**

Have a look at the footer bar in the ticket detail view. When there is an avatar
from another agent (see screenshot above), you are not the only one viewing
this ticket.

Depending on the additional icon and if the avatar icon is faded, it means:

- Another agent is viewing the ticket (not faded avatar without additional icon)
- Another agent opened the ticket but is currently not actively viewing this
  ticket (faded avatar icon with the snooze icon, see left avatar in screenshot)
- Another agent is currently actively working on this ticket (not faded avatar
  icon with a pencil icon, see right avatar in screenshot)

## Bulk Actions

TODO after overview bulk action implementation

**Why?**

**How?**

Via drag & drop
Via drop down selectors

## Merge Tickets

![Screenshot shows the ticket merge side panel](/screenshots/cypress/usage-advanced-features.cy.js/ticket-merge.png)

**Why?**

If you have two or more tickets about the same issue, you may want to merge
those tickets into one. This might be the case if a customer sends you a new
email which can't be assigned to the existing ticket (e.g. the ticket reference
is missing because the customer sends you a completely new email instead of
answering in the existing thread).

Merging a ticket migrates all messages and notes of the ticket from where you
select the merging into the selected one.

**How?**

Go to the ticket you want to merge into another one. In the ticket sidebar, use
the `︙` menu and select `Merge`. This opens a side panel in which you can
select a ticket by clicking on it or enter a ticket number in search field.
When you selected a target ticket, confirm by using the `Merge` button at the
bottom.

As result, the articles are moved into the chosen ticket. The ticket in which
you executed the merge still exists with the following changes:

- The articles have been replaced by a "merged" label
- The state has changed to "merged"
- The ticket is linked to its "parent" ticket

## Split Ticket

![Screenshot shows the article action split menu](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Why?**

If you have a ticket which is about more than one issue, you might want to
split it in two or more separate tickets. For example this might be the case
if a customer has a technical question and wants to place an order.

**How?**

To split an article off, use the `︙` menu next to an article and select
`Split`.

This results in a ticket create screen with the same attributes set as in the
initial ticket. The content of the article is also included. You can change
everything to your needs and then click on `Create`.

The just created ticket is linked in the original one as child. The original
ticket is linked in the split off ticket as parent.

## Link Tickets

**Why?**

When tickets about related issues arise, they can be linked to each other for
easier reference. [Merged](#merge-tickets) and [split](#split-ticket) tickets
are automatically linked.

**How?**

In the ticket sidebar, add a link to another ticket by clicking the `+` button
in the "Links" section. This opens a side panel in which you can select a
ticket by clicking on it or enter a ticket number in search field. Additionally,
you can choose between different link types:

- **Normal:** for related ticket which have no hierarchy.
- **Parent/Child**: for related tickets where one is the main issue and the
  other is a subtask. This link type is used by default if a tickets gets split
  or merged.

## Account Time

**Why?**

With Zammad's integrated time accounting, you can help to keep track of how
much time you spent on tickets. Based on the accounted times in the ticket, it
is automatically assigned to customers and organizations. This might be used in
your company for billing or to keep track of support budgets.

**How?**

After updating a ticket, a time accounting dialog will appear. Enter how much
time you spent on the ticket.

![Screenshot shows the time accounting dialog](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-dialog.png)

The feature is **optional**. If you don't see it whenever you update a ticket,
your administrator hasn't enabled it yet or the rule for tickets to be taken
into consideration doesn't match.

The accounted time is always recorded and stored without a unit. However, your
administrator may decide to show an optional label next to the field to hint
you and your colleagues in which unit the time is expected (see screenshot).

Activity types can be used to distinguish between different activities and for
grouping the accounted times. If this optional feature is active, it shows a
list of activities from which you can select in the time accounting dialog.

If a ticket already has accounted time(s), you can see it in the ticket sidebar
on the right side in the ticket detail view at the bottom. You can find the
calculated sums of each activity type (if configured) as well as the total sum
of accounted times for all activity types.

![Screenshot shows the time accounting overview](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)
