---
order: 4
title: Zammad AI
---

# Zammad AI

## Introduction

Zammad is getting even smarter! We are expanding Zammad's AI capabilities to help you manage support tickets even more
efficiently. ✨🚀

::: info
The AI features have to be configured and activated by your administrator. If you can't see it, it is not configured.
More information about how to configure and activate it can be found in the admin section.
:::

## Ticket Summary

The ticket summary feature does what it says: it summarizes the ticket's content. This can be a huge time saver when
dealing with large tickets and/or many hand-overs between agents.

If the feature is activated, a summary of the ticket is generated when the ticket got updated and you either open the
ticket or open the summary sidebar tab of the ticket, depending on the configuration.

![Screenshot shows Zammad's ticket detail view with highlighted ticket summary banner and summary sidebar](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-summary-sidebar.png)

Depending on the configuration of your Zammad instance, the summary includes the following sections:

- Customer intent
- Conversation summary
- Open questions (optional)
- Upcoming events (optional)
- Customer sentiment (optional)

## AI Assistant Text Tools

The new AI-powered smart editor is designed to simplify and enhance your ticket response workflow. It helps you with
text tools while you create an article.

To use any of the following features, you first have to select text you want to apply the changes to. After that,
click the **AI Assistant text tools** button at the left side of the editor toolbar and choose one of the following
functions, depending on what you want to perform.

![Screenshot shows Zammad's smart editor menu](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-smart-editor.png)

:::warning

- Be aware that your text gets replaced when you select one of the text tools. If you are not satisfied with the result,
  try using the undo feature by pressing [[ctrl]] + [[z]].
- Always double-check the response. Although the feature was carefully developed, there may still be minor problems in
  individual cases due to the nature of neural networks.

:::

- **Improve writing**: Uses your text as a base and tries to improve it by enhancing clarity, conciseness and structure
  as well as removing misspellings and grammar issues.
- **Fix spelling and grammar**: Just proofreads your text and automatically removes spelling and grammar mistakes.
- **Expand**: Expands your text while keeping your message. Useful if your customer expects more than some bullet points
  as an answer. You can even use it by providing only basic information (e.g. via bullet points) and let the AI write
  the answer.
- **Simplify**: Does the opposite of the expansion and shrinks your text while keeping your message.

## AI Agents

This is no feature which allows any agent interaction. However, if the feature is configured, you may notice it at some
points. This is why you can find an explanation here.

AI agents can be configured to work on certain types of routine tasks. You may notice the AI agents at different
locations:

### Ticket History

If an AI agent applied changes, you can see a ticket history entry telling you the name of the AI agent. If you notice
ongoing issues with what the AI agent did, inform your Zammad admin.

Example of a history entry of an AI agent:

![Screenshot shows AI agent ticket history entry](/screenshots/ai/ai-agent-ticket-history.png)

### Simultaneous Work Detection

AI agents which are currently working on a ticket are displayed like other agents in the live user section in the
bottom bar. This helps to avoid duplicate work as well as losing unsaved changes. If you see an AI agent avatar, wait
for a moment or head over to another ticket.

Avatar of AI agent:

![Screenshot shows avatar of an AI agent](/screenshots/ai/ai-live-user.png)

### Overview Indicator

A running AI agent is indicated in the status column in overviews. The status circle changes to a blue/pink gradient circle:

![Screenshot shows a status circle in overviews indicating an AI agent is currently working on it](/screenshots/ai/overview-ai-agent-indicator.png)
