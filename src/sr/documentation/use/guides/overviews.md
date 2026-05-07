---
order: 1
title: Прегледи
---

# Прегледи

![Снимак екрана који приказује отворен
преглед](/screenshots/cypress/usage-guide-overview.cy.js/overview-full.png)

## Увод

Прегледи представљају кључну компоненту Zammad-а. Отворите их кликом на
дугме `Прегледи` у навигационој траци или користите пречицу на тастатури
[[o]]. На прегледе можете гледати као врсту поштанских сандучића са
различитим фолдерима. Користите их да пронађете нове тикете које желите да
обрадите и пратите тикете који још нису затворени.

У зависности од ваше системске конфигурације и шта је ваш Zammad
администратор подесио, овде можете видети различите прегледе, нпр:

- Ваши додељени тикети
- Недодељени и отворени тикети
- По достигнутим подсетницима тикета
- Ескалирани тикети

Одабиром прегледа на другом нивоу навигације приказаће вам се табела са
тикетима који задовољавају услове.

## Употреба и функције

Прегледе може дефинисати администратор на основу правила и услова. Ово значи
да ако се тикет измени и више се не задовољава услове прегледа, тикет више
неће бити видљив у том прегледу.

Overviews are updated automatically. You don't have to reload your browser
to observe changes. You can adjust the order temporarily by clicking on one
of the column headers as well as change their width by dragging the column
dividers.  The order is only preserved until you switch to another overview
or reload the page.

For each overview, you can find a badge attached. The number in this badge
tells you how many tickets are in each overview.

The ticket lists in overviews can also be grouped by a specific attribute
(e.g. customer, organization, owner). This has to be adjusted by your Zammad
admin. If a grouping is activated, you can find a badge with a counter of
the included tickets there as well.

Depending on what you are searching for, select a fitting overview and start
working on a ticket.

::: tip
If you miss an overview or want to have different settings, let your Zammad admin know!
:::

### Color Coded State and Priority

To visualize different ticket states and priorities, the entries in the
table are color coded.

The icon next to the ticket title mainly represents the need for action:

![Screenshot shows ticket
states](/screenshots/documentation/use/overviews/states.png)

- Yellow circle: action needed (e.g. new, open, pending reached)
- Grey circle: paused, no action needed right now (e.g. pending)
- Green circle: no action needed any more (e.g. closed, merged)
- Red triangle: immediate action needed (ticket escalated due to an SLA
  violation)

If you spot a circle with a blue/pink gradient, it indicates that an [AI
agent](ai#ai-agents) is currently working on the ticket.

The **priority** is represented by the color of the ticket title:

![Screenshot shows ticket
priorities](/screenshots/documentation/use/overviews/priorities.png)

- 1 low: gray
- 2 normal: blue
- 3 high: red

### Отворите тикет

Open a ticket by simply clicking on the line. This opens the ticket as a tab
in the left navigation bar and shows you the ticket detail view. If this
ticket is already present in your navigation bar, it activates this tab
instead of opening a duplicate tab.

If an overview contains more than one ticket and you open one of the
tickets, you can find arrows in the ticket detail view header to switch to
the next/previous ticket of this overview.

### Масовне радње

Perform bulk actions by selecting multiple tickets and either use the
drop-down fields or drag them with the mouse to invoke the bulk action
overlay. You can find more information about that in the [Bulk
Actions](../advanced-features#bulk-actions) section in the advanced features
page.

### Промена редоследа прегледа

If the order of the overviews doesn't reflect your working process or you
just like to have a different order, you can re-arrange them for your
account. Use the `reorder items` button at the very top of the second level
navigation bar, which opens your [profile
settings](/en/documentation/use/user-profile#overviews) where you can define
a custom order for your overviews.

To change the order, simply drag & drop them by clicking the handles on the
left side.

If your admin changes the order, your custom order is preserved. You can
switch back to your admin's order by clicking the `Reset Overview Order`
button.
