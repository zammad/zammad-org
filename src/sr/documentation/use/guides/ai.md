---
order: 3
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

If the feature is activated, a banner is shown below the articles in the
ticket detail view. By clicking the `See Summary` button, the **Summary**
sidebar tab is opened and you can read the summary. The summary is created
when you open a ticket.

![Screenshot shows Zammad's ticket detail view with highlighted ticket
summary banner and summary
sidebar](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-summary-sidebar.png)

У зависности од ваше Zammad конфигурације, сажети опис може садржати следеће
одељке:

- Намера клијента
- Сажети опис конверзације
- Отворена питања (опционо)
- Предложени следећи кораци (опционо)

If suggested next steps and the checklist feature are activated, you can
even add single items or all the suggested next steps to a
[checklist](../advanced-features#checklists) to keep track of the open tasks
in this ticket.

If you don't want to see the banner below the articles, you can permanently
hide it. To get the banner again, go to **Appearance** in your [profile
settings](../manage-profile) and re-activate it by toggling the checkbox.

## Smart Editor

Нови уредник текста са AI побољшањима је дизајниран да поједностави и
унапреди ваш радни ток обраде тикета. Помаже вам преко текстуалних алатки
док пишете чланак.

За коришћење излистаних функција, прво морате да обележите текст на који
желите да се измене примене. Након тога, кликните на **Smart Editor** дугме
при дну новог чланка и изаберите једну од следећих функција, у зависности од
жељеног понашања.

![Screenshot shows Zammad's smart editor
menu](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-smart-editor.png)

:::warning

- Be aware that your text gets replaced when you select one of the text tools. If you are not satisfied with the result,
  try using the undo feature by pressing [[Ctrl]] + [[z]].
- Always double-check the response. Although the feature was carefully developed, there may still be minor problems in
  individual cases due to the nature of neural networks.

:::

- **Унапреди писање**: користи ваш текст као основу и покушава да га побољша
  унапређењем јасноће, прецизности и структуре, притом отклањајући грешке у
  правопису и граматици.
- **Исправи правопис и граматику**: само лекторише ваш текст и аутоматски
  отклања грешке у правопису и граматици.
- **Прошири**: проширује ваш текст притом одржавајући вашу мисао. Корисно је
  уколико ваш клијент очекује нешто више од пар ставки као одговор. Могуће
  је искористити прилагањем само основних информација (нпр. путем листе са
  тачкама) и пуштањем AI да напише одговор.
- **Поједностави**: ради супротно од проширења и сажима ваш текст
  одржавајући вашу мисао.
