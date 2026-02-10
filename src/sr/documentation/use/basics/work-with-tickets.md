---
order: 5
title: 'Work with Tickets'
---

# Work with Tickets

You found your way into an existing ticket, congratulations! Now let's have
a look what you can do and how to do it.

Generally, working on existing tickets means keeping up with a customer
correspondence in a thread/conversation in the ticket detail view. Any time
you open a ticket, a new tab will appear in your navigation bar on the left
side. To close a tab (in the sense of remove it from the navigation bar, not
setting the ticket state to closed), just click the ::X:: button in the
tab. Zammad automatically saves your changes in opened ticket tabs, no
matter if you already applied the changes or just edited things and switched
to somewhere else. This means it is no problem to create a new ticket while
editing an existing one. Simply switch back to the other tab.

For the most changes (except tags or title renaming, for example), an
explicit update of the ticket is needed. So make sure to click the
**Update** button on the right side of the footer bar when you are happy
with your changes.

## Changing Ticket Attributes

As you may know, there are additional ticket attributes such as group,
priority and owner that you can set. If you haven't read
[ticket-basics](/en/documentation/use/basics/ticket-basics) yet, check it
out to learn more.

## Create a New Article

No matter if you create a new article from scratch or respond to a customer
article, you can choose from different article types:

- **Note**: Write a reminder for yourself and other agents, ask a colleague
  a question by mentioning a user or add new information to the ticket. The
  default visibility is "internal", which means the customer can't see the
  note.
- **Call**: Note down a summary of a phone call you had with the customer.
- **Email**: Send an email to anyone about the ticket. The title of the
  ticket is used for the subject of the email.

To choose another article type, click the **Channel** dropdown and choose a
different type. Click on the **Visibility** dropdown to change the article's
visibility. Articles with "internal" visibility are displayed with a dashed
blue border.

![Screenshot shows article type and visibility
selector](/screenshots/cypress/usage-basics.cy.js/article-type-visibility.png)

To write and edit text, make use of the powerful editor features. You can
use the toolbar or keyboard shortcuts to format text and trigger special
functions. Because of the amount of features and their importance, you can
find more information on the separate [editor
page](/en/documentation/use/guides/editor).

Every new article appears at the end of the conversation, which means below
the existing articles. To see detailed information of an article, just click
on an existing article which opens additional meta information.

You might wonder now how to delete articles. The answer is you can only
delete articles that you have created yourself and which are not older than
10 minutes. To see the **Delete article** function in the ::a:: menu,
articles of a communication type (emails, calls) must be changed to
"internal" visibility first.

### Add an Article from Scratch

Click on one of the buttons at the bottom of the ticket detail view to add
an article. Depending on what you choose, the article create screen gets
pre-populated with the type and visibility. When choosing **Add reply**, the
article gets sent out to the customer of the ticket. In case of an email
based ticket, the email address of the customer is pre-populated.

![Screenshot shows new article buttons in bottom
bar](/screenshots/cypress/usage-basics.cy.js/new-article.png)

### Respond to an Article

To forward or reply to an article, use one of the response buttons under an
article or in the ::a:: menu. The behavior is similar to the behavior of an
email client.

- **Reply**: Allows you to answer the article. The recipient is
  automatically pre-filled. The reply is sent via the same channel as the
  original message. This lets you easily send an answer to a customer or
  third party, if involved.
- **Reply all**: Same as above but uses all recipient addresses from the
  original message as recipients for your new article. Only available for
  email channels.
- **Forward**: This means you can forward the original message to a third
  party or anybody else. The original message and attachments are included
  in your new article.

![Screenshot shows article reply
actions](/screenshots/cypress/usage-basics.cy.js/article-reply.png)

Zammad even allows you to **quote text** from an existing article. This is
especially helpful if an answer refers to different parts of the original
message or the text is pretty long. This feature is limited to communication
type articles like email where the response buttons are available. To quote
text, simply select the text you want to quote and use the **Reply** or
**Reply all** function. This adds the selected text with a timestamp in your
article editor where you can answer it. You can use the quoting even
multiple times to quote different parts of the text. Just select another
part of the text, click on the same response action as before and it gets
added as another quote to your editor.  You can split quotations by using
[[enter]] or [[shift]] + [[enter]] in the editor and disable quote format
for your text.

## Rename a Ticket

To rename a ticket, simply click on the title in the header bar and start
typing. This title is used as subject in email communication and shows up in
several places like overviews. Confirm with [[enter]] or click the button on
the right side.

## Copy Ticket Number

To copy the ticket number including a link to the ticket (e.g. to paste it
in a third party chat app), use the ::c:: icon next to the ticket title. It
copies the complete ticket number with the ticket identifier to your
clipboard, e.g.  `Ticket#50071`. If pasting the content to a target which
can handle HTML, a link to the ticket is included. If you just want to paste
the ticket number, use plain pasting via [[ctrl]] [[shift]] [[v]] instead.

If you scrolled own in the ticket, hover over the collapsed header bar where
you can find the button on the top left side.

![Screenshot shows ticket header with highlighted ticket number copy
button](/screenshots/cypress/usage-basics.cy.js/copy-ticket-number-button.png)

But wait, there is even a keyboard shortcut for that. Simply press [[.]] and
the ticket number is copied to your clipboard. To include the ticket title
as well, press [[.]] twice. Example: `Ticket#31004: Onboarding new
colleague`.

## Simultaneous Ticket Processing

It can happen that two or more agents open a ticket at the same time. To
prevent edit conflicts and customers receiving contradictory answers, Zammad
shows you who is viewing or editing the ticket currently. You can find this
information in the bottom bar where avatars of all agents are displayed.

![Снимак екрана приказује друге оператере како гледају/уређују
тикет](/screenshots/advanced-features/simultaneous-work-detection.png)

Make sure to communicate with your colleagues to prevent these problems
before they arise. Depending on the additional icon and if the avatar icon
is faded, it means:

- Avatar: Another agent is viewing the ticket.
- Faded avatar: Another agent opened the ticket but is currently not
  actively viewing it.
- Avatar with pencil icon: Another agent is currently actively working on
  this ticket.

There are even more icons which represent additional states of the other
agents (e.g. viewing ticket by mobile UI or is out-of-office). Just hover
with the mouse if you are unsure what it means.

## Ticket Actions

Additional actions are available in the ::a:: menu in the ticket sidebar.

History
: See a comprehensive list of updates to the ticket, performed by any user, since its creation. Useful to check who did
  what and when.

Merge
: Migrate all messages/notes to another ticket. Useful if you have more than one ticket about a single customer issue.
  See [Merge Tickets](/en/documentation/use/advanced-features#merge-tickets) for details.

Change Customer : Reassign the ticket to another customer.

-----

You now know the basics and how to work with tickets in general. However,
there are many more features in Zammad which can be very useful in your
daily work. Read on in [Advanced
Features](/en/documentation/use/advanced-features) to learn more.
