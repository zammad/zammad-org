---
order: 4
title: 'Напредне функције'
---

# Напредне функције

## Користите пречице на тастатури

TODO

## Подесите понашање након освежавања тикета

![Снимак екрана приказује мени понашања након
освежавања](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Зашто?**

Могуће је аутоматски затворити прозор тикета у бочној траци навигације.
Зависи од ваших подешавања, али можете уштедети клик након освежавања или
освежавања тикета са стањем *затворено*.

**Како?**

У доњој траци детаљног приказа тикета, кликните на дугме `Остани у прозору
^` и одаберите жељену опцију (уколико је на подразумеваној вредности, у
супротном имаће један од назива опција испод). Имате неколико различитих
опција:

- **Остани у прозору**: Подразумевана опција. Мораћете ручно да затворите
  прозор уколико желите да буде уклоњен из ваше бочне траке навигације.
- **Затвори прозор**: Ова опција затвара прозор по сваком освежавању
  тикета. Може бити добра опција ако обрађујете пуно тикета и/или тикети
  захтевају пуно интеракције.
- **Затвори прозор по затварању тикета**: Ова опција затвара прозор само
  када је тикет освежен и стање је постављено на *затворено*.

::: tip
Уколико се ваша ситуација разликује од тикета до тикета, можете оставити **Остани у прозору**
и користити пречицу на тастатури <kbd>Shift</kbd> <kbd>c</kbd> за промену
стања тикета на затворено и затварање прозора тикета.
:::

## Користите текстуалне шаблоне

![Снимак екрана приказује функцију текстуалних
шаблона](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Зашто?**

Коришћење текстуалних исечака доноси предности као што су:

- Штедите време приликом одговарања на тикете
- Ваши и одговори ваших колега се поклапају јер користите идентичан текст за
  одговоре

**Како?**

За коришћење текстуалних исечака, једноставно унесите `::` у уредник текста
а затим део назива или кључну реч исечка.

Можете одабрати исечак кликом на њега или коришћењем стрелица на горе и доле а затим
притиском на <kbd>enter</kbd> на вашој тастатури. Zammad долази са неким подразумеваним
текстуалним исечцима.

Уколико ухватите себе да стално одговарате на идентично питање, замолите
вашег Zammad администратора да дода текстуални исечак за вас. Исечци могу
укључивати и променљиве као што су име клијента или било који други атрибут,
које ће бити замењене кад их користите у тикету.

## Помените колегу

![Снимак екрана приказује функцију
помињања](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Зашто?**

Затражите информације од ваших колега или их помените у важним тикетима да
би добили обавештења о освежавању тикета и да би били аутоматски претплаћени
на тај тикет.

**Како?**

Док пишете чланак тикета, једноставно унесите `@@` а затим и првих пар слова
из имена колеге кога желите да поменете.

Zammad приказује листу свих корисника који одговарају вашем уносу и можете их одабрати
кликом или коришћењем стрелица на горе и доле а затим
притиском на <kbd>enter</kbd> на вашој тастатури.

## Претплатите се на тикет

![Снимак екрана приказује функцију
претплате](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Зашто?**

Уколико сте заинтересовани за прогрес тикета, можете се претплатити на
исти.  Ово значи да ћете примати обавештења за свако освежавање.

**Како?**

Укључите прекидач „Претплати се” у траци тикета са стране за добијање
обавештења. Уколико сте већ поменути у тикету, већ сте
претплаћени. Искључите прекидач за заустављање обавештења.  Сличице испод
вам приказују ко је претплаћен на тикет и ко је обавештен о освежавањима.

## Користите макро

![Снимак екрана који приказује мени радњи
макроа](/screenshots/cypress/usage-advanced-features.cy.js/ticket-macro.png)

**Зашто?**

If you have many steps you do over and over again, you should use a macro
for that. In such a macro, your admin can pre-define different ticket
actions you can apply with just a click. As an example, Zammad ships a
"Close & Tag as Spam" macro by default. If applied, the user who executes
the macro is assigned as owner, a tag `spam` is added and the ticket is
closed.

**Како?**

If your admin already created a macro, you can execute it in the ticket
detail view by clicking the three dots button `︙` in the right corner of the
footer bar and select the macro you want to execute.

::: warning
The macro gets executed immediately and without an additional confirmation!
:::

You can also apply a macro to several ticket at once. Have a loot at [bulk
actions](#bulk-actions) how to do that.

## Use Tags

![Screenshot shows tag area in ticket side
bar](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

**Зашто?**

Tags are one way to categorize a ticket. You can think of tags as some kind
of labels. They can be used in conditions like in triggers and in overviews
and they can also be assigned automatically by macros, schedulers and
triggers.  Of course you can search for the text of the tags and will find
tickets which have the tag attached.

**Како?**

In the ticket sidebar, you can find a section which is labels as "Tags". Add
a tag by clicking on the `+` button. You can select existing tags and add
new ones (if your admin didn't disable to add new tags).

Remove them by simply click on the `X` button. Be aware that there is no
confirmation dialog for deleting a tag from a ticket.

## Use a Checklist

![Screenshot shows a checklist from checklist
sidebar](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Зашто?**

- To keep track of tasks
- To complete tasks in a structured way
- To make sure nothing gets forgotten
- To make the progress of work more visible

**Како?**

Select the "Checklist" tab in the sidebar. If you can't see it, your Zammad
admin disabled it. You can only add or edit a checklist, if you have the
permission to edit the ticket.

In the checklist sidebar, you can:

- Add a checklist: either by creating a new one by clicking on `Add Empty
  Checklist` or from a template by using `Add From a Template` (if you don't
  see the template button, there is none).
- Edit the current checklist:
    - Rename it by clicking on the title or using the `︙` menu in the
      sidebar header.
    - Add checklist items by clicking the `+` button.
    - Change the text of the checklist items, either by just clicking on it
      or using the `︙` menu next to the item.
    - `Reorder` the items by clicking this button and drag & drop the items.
- Delete the complete checklist by using the `︙` menu in the sidebar header.

There are two features, which are not directly visible:

- You can refer to other tickets as a checklist item by using its hook and
  number in the item text (e.g. `Ticket#123456`). Such items can't be
  checked manually, they reflect the state of the referred ticket.
  ::: tip
  Fetch the ticket hook and number by going to the desired ticket and either
  use the copy button in the header or use the keyboard shortcut <kbd>.</kbd>.
  Then you can paste it in the checklist you want to have it included.
  :::
- Zammad automatically checks if all checklist items are completed. The
  check is performed when you set a ticket to "closed". If not all items are
  completed, Zammad will prompt you to either work on the remaining tasks
  and keep the ticket open or to close it anyway. When referencing other
  tickets in your checklist, only those which are closed (with a green
  circle) are considered as completed.


## Ticket Templates

**Зашто?**

Quickly create a ticket with pre-defined attributes like title, text, tags
and more saves you time. This requires your admin to create a ticket
template.

**Како?**

In the ticket create screen, you can find an `Apply Template ^` button in
the footer bar, if a template is available. Select the template you want to
apply and apply changes if desired.


## Заједнички нацрти

**Зашто?**

To share a draft with other agents of your group, e.g. to reflect a QA
process, instead of "just" adding an internal article. In such a draft you
can even include changed ticket attributes like priority, state and custom
attributes as well as an article with an answer to the customer.

This is an optional feature. If you can't see it, your admin has turned it
off.

**Како?**

To **save a draft**, use the `︙` menu in the footer of the ticket details
view and select "Save as draft".

To **apply an already existing draft**, click on the `Draft Available`
button on the left side of the footer.

::: warning
Applying a draft overwrites your unsaved changes!
:::

## Simultaneous Work Detection

![Screenshot shows other agents viewing/editing the
ticket](/screenshots/advanced-features/simultaneous-work-detection.png)

**Зашто?**

Things to avoid:

- Superfluous work
- Conflicting answers from different agents
- Overwritten/undone changes by different agents

This is why you can immediately see who views and edits the currently viewed
ticket.

**Како?**

Have a look at the footer bar in the ticket detail view. When there is an
avatar from another agent (see screenshot above), you are not the only one
viewing this ticket.

Depending on the additional icon and if the avatar icon is faded, it means:

- Another agent is viewing the ticket (not faded avatar without additional
  icon)
- Another agent opened the ticket but is currently not actively viewing this
  ticket (faded avatar icon with the snooze icon, see left avatar in
  screenshot)
- Another agent is currently actively working on this ticket (not faded
  avatar icon with a pencil icon, see right avatar in screenshot)


## Bulk Actions

TODO after overview bulk action implementation

**Зашто?**

**Како?**

Via drag & drop Via drop down selectors

## Merge Tickets

![Screenshot shows the ticket merge side
panel](/screenshots/cypress/usage-advanced-features.cy.js/ticket-merge.png)

**Зашто?**

If you have two or more tickets about the same issue, you may want to merge
those tickets into one. This might be the case if a customer sends you a new
email which can't be assigned to the existing ticket (e.g. the ticket
reference is missing because the customer sends you a completely new email
instead of answering in the existing thread).

Спајање тикета мигрира све поруке и напомене из тикета који спајате у
одабрани.

**Како?**

Go to the ticket you want to merge into another one. In the ticket sidebar,
use the `︙` menu and select `Merge`. This opens a side panel in which you
can select a ticket by clicking on it or enter a ticket number in search
field.  When you selected a target ticket, confirm by using the `Merge`
button at the bottom.

As result, the articles are moved into the chosen ticket. The ticket in
which you executed the merge still exists with the following changes:

- Сви чланци су замењени ознаком „спојено”
- Стање је промењено у „спојено”
- The ticket is linked to its "parent" ticket


## Split Ticket

![Screenshot shows the article action split
menu](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Зашто?**

If you have a ticket which is about more than one issue, you might want to
split it in two or more separate tickets. For example this might be the case
if a customer has a technical question and wants to place an order.

**Како?**

To split an article off, use the `︙` menu next to an article and select
`Split`.

This results in a ticket create screen with the same attributes set as in
the initial ticket. The content of the article is also included. You can
change everything to your needs and then click on `Create`.

The just created ticket is linked in the original one as child. The original
ticket is linked in the split off ticket as parent.

## Link Tickets

**Зашто?**

When tickets about related issues arise, they can be linked to each other
for easier reference. [Merged](#merge-tickets) and [split](#split-ticket)
tickets are automatically linked.

**Како?**

In the ticket sidebar, add a link to another ticket by clicking the `+`
button in the "Links" section. This opens a side panel in which you can
select a ticket by clicking on it or enter a ticket number in search
field. Additionally, you can choose between different link types:

- **Normal:** for related ticket which have no hierarchy.
- **Parent/Child**: for related tickets where one is the main issue and the
  other is a subtask. This link type is used by default if a tickets gets
  split or merged.
