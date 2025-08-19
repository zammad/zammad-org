---
title: Ticket Summary
order: 20
---

# Ticket Summary

## Show/Trigger

Required permission: `ticket.agent`

`POST`-Request sent: `/api/v1/tickets/{ticket id}/enqueue_summarize`

The following POST request fetches an existing summary, if there is one available in the ticket. If there is no summary
available or the ticket was changed after the existing summary was created, a new summary is triggered. In such a case,
you won’t get a response with the summary. To get a summary, you have to re-send the request with a small delay
considering the AI job may take a few seconds.

Sample response if the generation of a new summary was just triggered by the request:

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-null.json

:::

Sample response for an existing summary (e.g. for the same ticket like above after waiting a few seconds):

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-summary.json

:::
