---
order: 4
title: 'AI Features'
---

# AI Features

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
that, click the `Writing Assistant Tools` button at the left side of the
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

- **Препиши сложени одељак и учини га лаким за разумевање**: Користи ваш
  нацрт као основу и покушава да га прошири у исполиран текст. Покушава да
  одреди структуру и побољша јасноћу и прецизност као и да уклони грешке у
  правопису и граматици. Могуће је искористити је прилагањем само основних
  информација (нпр. путем листе са тачкама) и пуштањем вештачке
  интелигенције да употпуни одговор.
- **Исправи правопис и граматику**: Лекторише ваш текст и отклања грешке у
  правопису и граматици.
- **Сажми одељак на отприлике половину његове тренутне величине**: Скраћује
  ваш текст уз задржавање поруке и тона оригиналног текста.
- **Препиши сложени одељак и учини га лаким за разумевање**: Уклања
  необавезне делове и преписује ваш текст у јасном и разумљивом стилу.

## AI агенти

AI agents can be configured to work on certain types of routine tasks. In
general, this feature operates behind the scenes but if configured, you may
notice it in some situations (see examples below). In case your admin
created a macro with an AI agent action, you can even run it manually. Ask
your admin for details and have a look at the [macro
description](/en/documentation/use/advanced-features#macros) in the advanced
features page.

### Ticket History

If an AI agent applied changes, you can see a ticket history entry telling
you the name of the AI agent. If you notice ongoing issues with what the AI
agent did, inform your Zammad admin. Example of a history entry of an AI
agent:

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
