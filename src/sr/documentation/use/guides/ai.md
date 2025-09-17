---
order: 4
title: 'Zammad AI'
---

# Zammad AI

## Увод

Zammad постаје све паметнији! Проширујемо Zammad-ове AI могућности да вам
помогнемо у ефикаснијој обради тикета подршке. ✨🚀

::: info
The AI features have to be configured and activated by your administrator. If you can't see it, it is not configured.
More information about how to configure and activate it can be found in the admin section.
:::

## Сажети опис тикета

The ticket summary feature does what it says: it summarizes the ticket's
content. This can be a huge time saver when dealing with large tickets
and/or many hand-overs between agents.

Уколико је функција укључена, сажети опис тикета ће бити припремљен при
освежавању тикета и или отварањем детаљног прегледа тикета или бочне траке
сажетог описа тикета, у зависности од подешавања.

![Screenshot shows Zammad's ticket detail view with highlighted ticket
summary banner and summary
sidebar](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-summary-sidebar.png)

У зависности од ваше Zammad конфигурације, сажети опис може садржати следеће
одељке:

- Намера клијента
- Сажети опис конверзације
- Отворена питања (опционо)
- Предстојећи догађаји (опционо)
- Расположење клијента (опционо)

## Алатке помоћника писања

The AI-powered writing assistant tools are designed to simplify and enhance
your ticket response workflow while you create an article.  To use such a
tool, you first have to select text you want to apply the changes to. After
that, click the **Writing Assistant Tools** button at the left side of the
editor toolbar and choose one of the following tools, depending on what you
want to perform.

![Screenshot shows Zammad's smart editor
menu](/screenshots/cypress/usage-guide-ai.cy.js/ai-writing-assistant-tools.png)

:::warning

- Be aware that your text gets replaced when you select one of the text tools. If you are not satisfied with the result,
  try using the undo feature by pressing [[ctrl]] + [[z]].
- Always double-check the response. Although the feature was carefully developed, there may still be minor problems in
  individual cases due to the nature of neural networks.

:::

Zammad долази са подразумеваним алаткама помоћника за писање. Доступност
зависи од конфигурације ваше Zammad инстанце. Можете чак добити приступ и
прилагођеним алаткама у случају да их је ваш администратор дефинисао.

- **Expand draft into well-written section**: Uses your draft as a base and
  tries to elaborate a proper text. It tries to add a structure and to
  enhance clarity and conciseness and as well as removing misspellings and
  grammar errors. You can even use it by providing only basic information
  (e.g. via bullet points) and let the AI write the answer.
- **Fix spelling and grammar**: Proofreads your text and removes spelling
  and grammar mistakes.
- **Summarize section to about half its current size**: Shrinks your text
  while keeping the message and the tone of the text.
- **Rewrite complex section and make it easy to understand**: Removes
  unnecessary parts and rewrites your text in a clear and understandable
  way.

## AI агенти

Ова функција не омогућава интеракцију оператера. Међутим, уколико је
подесите, можете је приметити у акцији у неком тренутку. Из тог разлога наћи
ћете објашњење овде.

AI агенти могу бити подешени да раде на одређеним врстама рутинских
задатака. Можете приметити AI агенте на различитим местима:

### Ticket History

Уколико AI агент освежи тикет, можете то и видети у евиденцији историјата
тикета под називом AI агента. Уколико приметите проблеме са начином рада AI
агента, обавестите о томе свог Zammad администратора.

Пример евиденције историјата AI агента:

![Screenshot shows AI agent ticket history
entry](/screenshots/ai/ai-agent-ticket-history.png)

### Откривање истовремене обраде

AI агенти који тренутно раде на тикету су приказани као и други оператери у
доњој траци присутних корисника. Ово ће вам помоћи да избегнете истовремени
рад као и губитак несачуваних измена. Уколико приметите сличицу AI агента,
сачекајте тренутак или пређите на други тикет.

Сличица AI агента:

![Screenshot shows avatar of an AI agent](/screenshots/ai/ai-live-user.png)

### Overview Indicator

AI агент који се извршава има индикатор у колони стања у прегледима. Кружић
стања ће бити приказан у плаво-љубичастом градијенту:

![Screenshot shows a status circle in overviews indicating an AI agent is
currently working on it](/screenshots/ai/overview-ai-agent-indicator.png)
