---
order: 3
title: 'Zammad AI'
---

# Zammad AI

## Увод

Zammad is getting even smarter! We are expanding Zammad's AI capabilities to
help you manage support tickets even more efficiently. The initial focus is
on ticket summaries, but more features will arrive soon! ✨🚀

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
