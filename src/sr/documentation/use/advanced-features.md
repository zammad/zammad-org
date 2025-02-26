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
If your situation differs from ticket to ticket, you can leave **Stay on tab**
and use the keyboard shortcut [[Shift]] [[c]] for changing the
ticket state to closed and close the ticket tab.
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

You can pick one by clicking on it or by using the up and down arrows
followed by [[Enter]] on your keyboard. There are some text modules in
Zammad which are shipped by default.

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

Zammad displays a list with all possible matches where you can pick one by
clicking on it or by using the up and down arrows followed by [[enter]] on
your keyboard.

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

Уколико стално понављате велики број корака, размислите о употреби макроа за
њих. У таквом макроу, ваш администратор може да дефинише одређене радње на
тикетима које можете покренути једним кликом. На пример, Zammad
подразумевано долази са макроом „Затвори и означи као непожељно”. По
активацији, корисник који изврши макро ће постати власник тикета, ознака
`spam` ће бити додата и тикет затворен.

**Како?**

Уколико је ваш администратор већ додао макро, можете га извршити у детаљном
приказу тикета кликом на дугме са три тачкице `︙` у доњем десном углу и
одабиром макроа из листе.

::: warning
Макро ће бити моментално извршен без додатне потврде!
:::

Такође можете извршити макро над неколико тикета одједном. Погледајте
[масовне радње](#bulk-actions) за упутство.

## Користите ознаке

![Снимак екрана приказује одељак ознака у траци тикета са
стране](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

**Зашто?**

Ознаке су један од начина категоризације тикета. О ознакама можете
размишљати као о некој врсти тагова. Могу се користити у условима окидача и
прегледа и могу бити додељени аутоматски од стране макроа, планера и
окидача.  Наравно, можете вршити претрагу по тексту ознаке и пронаћи тикете
који имају додељену ознаку.

**Како?**

У бочној траци тикета, можете пронаћи одељак под насловом „Ознаке”. Додајте
ознаку кликом на дугме `+`. Можете изабрати између постојећих и нових ознака
(уколико ваш администратор није искључио додавање нових ознака).

Уклоните их једноставним кликом на дугме `X`. Обратите пажњу да неће бити
потврдног дијалога за брисање ознаке са тикета.

## Користите списак задатака

![Снимак екрана приказује списак задатака у бочној
траци](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Зашто?**

- Да пратите тренутне задатке
- Да извршите задатке на структурисан начин
- Да ништа не заборавите
- Да напредак у раду буде видљивији

**Како?**

Одаберите језичак „Списак задатака” у бочној траци. Ако га не видите, ваш
Zammad администратор га је искључио. Списак задатака можете додати или
уређивати само ако имате дозволу да освежавате тикет.

У траци списка задатака можете:

- Додајте списак задатака: или додавањем новог кликом на `Додај празан
  списак` или на основу шаблона коришћењем `Додај по шаблону` (уколико не
  видите дугме за шаблон, не постоје).
- Уређивање постојећег списка:
    - Промените назив кликом на наслов или коришћењем падајућег менија `︙` у
      заглављу траке.
    - Додајте задатке на списак кликом на дугме `+` .
    - Промените текст задатка, или кликом на њега или коришћењем падајућег
      менија `︙` поред ставке.
    - Кликом на дугме `Измени редослед` можете превући и пустити ставке за
      жељени распоред.
- Обришите комплетан списак задатака коришћењем падајућег менија `︙` у
  заглављу траке.

Постоје две функције које нису директно видљиве:

- Можете рефернцирати друге тикете на списку коришћењем њиховог прикључка и
  броја у тексту задатка (нпр. `Ticket#123456`). Ове ставке се не могу ручно
  означити, већ ће одражавати стање референцираног тикета.
  ::: tip
  Fetch the ticket hook and number by going to the desired ticket and either
  use the copy button in the header or use the keyboard shortcut [[.]].
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

## Account Time

**Зашто?**

With Zammad's integrated time accounting, you can help to keep track of how
much time you spent on tickets. Based on the accounted times in the ticket,
it is automatically assigned to customers and organizations. This might be
used in your company for billing or to keep track of support budgets.

**Како?**

After updating a ticket, a time accounting dialog will appear. Enter how
much time you spent on the ticket.

![Screenshot shows the time accounting
dialog](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-dialog.png)

The feature is **optional**. If you don't see it whenever you update a
ticket, your administrator hasn't enabled it yet or the rule for tickets to
be taken into consideration doesn't match.

The accounted time is always recorded and stored without a unit. However,
your administrator may decide to show an optional label next to the field to
hint you and your colleagues in which unit the time is expected (see
screenshot).

Activity types can be used to distinguish between different activities and
for grouping the accounted times. If this optional feature is active, it
shows a list of activities from which you can select in the time accounting
dialog.

If a ticket already has accounted time(s), you can see it in the ticket
sidebar on the right side in the ticket detail view at the bottom. You can
find the calculated sums of each activity type (if configured) as well as
the total sum of accounted times for all activity types.

![Screenshot shows the time accounting
overview](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)
