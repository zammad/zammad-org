---
order: 5
title: 'Обрада тикета'
---

# Обрада тикета

Честитамо, пронашли сте пут до постојећег тикета! Хајде сада да видимо шта и
како можете урадити са њим.

Generally, working on existing tickets means keeping up with a customer
correspondence in a thread/conversation in the ticket detail view. Any time
you open a ticket, a new tab will appear in your taskbar. To close a tab (in
the sense of remove it from the taskbar, not setting the ticket state to
closed), just click the ::X:: button in the tab. Zammad automatically saves
your changes in opened ticket tabs, no matter if you already applied the
changes or just edited things and switched to somewhere else. This means it
is no problem to create a new ticket while editing an existing one. Simply
switch back to the other tab.

For the most changes (except tags or title renaming, for example), an
explicit update of the ticket is needed. So make sure to click the `Update`
button on the right side of the footer bar when you are happy with your
changes.

## Измена атрибута тикета

As you may know, there are additional ticket attributes such as group,
priority and owner that you can set. If you haven't read
[ticket-basics](/en/documentation/use/basics/ticket-basics) yet, check it
out to learn more.

## Create a New Article

Без обзира да ли додајете нови чланак од нуле или одговарате на постојећи
чланак клијента, можете изабрати између различитих врста чланака:

- **Напомена**: Додајте подсетних за себе и друге оператере, поставите
  питање колеги помињањем корисника или унесите нове информације у
  тикет. Подразумевана видљивост је „интерна”, што значи да клијенти неће
  видети напомену.
- **Позив**: Забележите резиме телефонског позива који сте имали са
  клијентом.
- **Email**: Send an email to anyone about the ticket. The title of the
  ticket is used for the subject of the email.

To choose another article type, use the **Channel** tab switcher and choose
a different type. Click on the lock toggle to change the article's
visibility. Articles with internal visibility are displayed with a dashed
blue border.

![Screenshot shows article type selector and visibility
toggle](/screenshots/cypress/documentation/use/basics.cy.js/article-type-visibility.png)

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

### Додавање чланка од нуле

Click on the `Add internal note` button below the ticket's articles. This
opens the editor with activated **Note** type and internal visibility. You
can change the type or visibility if you like. To answer the customer
directly or to forward a specific article, use the corresponding buttons
under an article. Read the next section for more information.

![Screenshot shows the Add internal note button below the ticket's
articles](/screenshots/cypress/documentation/use/basics.cy.js/new-article.png)

### Одговори на чланак

To forward or reply to an article, use one of the response buttons under an
article or in the ::a:: menu. The behavior is similar to the behavior of an
email client.

- **Одговори**: Омогућава одговор на чланак. Прималац ће бити аутоматски
  унешен. Одговор се шаље на истом каналу као и долазна порука. Ово вам
  омогућава да једноставно пошаљете одговор клијенту или лицу треће стране,
  уколико је укључено у конверзацију.
- **Одговори свима**: Исто као изнад, али понавља све адресе примаоца
  оригиналне поруке као примаоце вашег одговора. Доступно само на имејл
  каналима.
- **Проследи**: Омогућава прослеђивање оригиналне поруке лицима треће стране
  или било коме. Оригинална порука и прилози ће бити укључени у ваш нови
  чланак.

![Screenshot shows article reply
actions](/screenshots/cypress/documentation/use/basics.cy.js/article-reply.png)

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

If the ticket has a long article history, see [Handling of Large
Tickets](#handling-of-large-tickets) for the conveniences Zammad provides.

### Handling of Large Tickets

When working on tickets with long article histories - like long email
threads where you need to refer back to earlier messages - Zammad provides
two conveniences:

- A floating ticket actions toolbar on the bottom right corner of the
  article list shows quick actions, depending on your scroll position and
  the ticket state. It contains buttons with icons for the following
  actions:
  - **Add internal note**: opens the article reply form to write a note.
  - **Scroll to start** and **Scroll to end**: jump to the top or bottom of
    the article list. If there are unread articles, the **Scroll to end
    button** displays a badge and changes to **Scroll to unread article**.
  - The toolbar appears whenever the article list is taller than your screen
    so that crucial actions stay accessible.
- A **pinned reply form** so the editor stays visible while you scroll
  through the articles. To pin or unpin the reply form, click the pin icon
  in the header of the article reply form. The pinned form sticks to the
  bottom of the ticket detail view. Resize the height by dragging the line
  on the top edge of the pinned reply form. The pin state as well as the
  panel size are saved in your browser.

![Screenshot shows the article reply form pinned to the bottom of the ticket
detail
view](/screenshots/cypress/documentation/use/basics.cy.js/article-reply-pinned.png)

## Промена наслова тикета

To rename a ticket, simply click on the title in the header bar and start
typing. This title is used as subject in email communication and shows up in
several places like overviews. Confirm with [[enter]] or click the button on
the right side.

## Копирање броја тикета

To copy the ticket number including a link to the ticket (e.g. to paste it
in a third party chat app), use the ::c:: icon next to the ticket title. It
copies the complete ticket number with the ticket identifier to your
clipboard, e.g.  `Ticket#50071`. If pasting the content to a target which
can handle HTML, a link to the ticket is included. If you just want to paste
the ticket number, use plain pasting via [[ctrl]] [[shift]] [[v]] instead.

![Screenshot shows ticket header with highlighted ticket number copy
button](/screenshots/cypress/documentation/use/basics.cy.js/copy-ticket-number-button.png)

But wait, there is even a keyboard shortcut for that! Simply press [[.]] in
the ticket detail view and the ticket number is copied to your clipboard. To
include the ticket title as well, press [[.]] twice.  Example:
`Ticket#31004: Onboarding new colleague`.

## Симултана обрада тикета

It can happen that two or more agents open a ticket at the same time. To
prevent edit conflicts and customers receiving contradictory answers, Zammad
shows you who is viewing or editing the ticket currently. You can find this
information in the bottom bar where avatars of all agents are displayed.

![Screenshot shows other agents viewing/editing the
ticket](/screenshots/documentation/use/advanced-features/simultaneous-work-detection.png)

Make sure to communicate with your colleagues to prevent these problems
before they arise. Depending on the additional icon and if the avatar icon
is faded, it means:

- Аватар сличица: други оператер гледа тикет.
- Избледела аватар сличица: други оператер има отворен тикет али га тренутно
  не гледа активно.
- Аватар сличица са иконицом оловке: други оператер тренутно активно ради на
  овом тикету.

There are even more icons which represent additional states of the other
agents (e.g. viewing ticket by mobile UI or is out-of-office). Just hover
with the mouse if you are unsure what it means.

## Радње тикета

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
