---
order: 20
title: 'Сажети опис тикета'
---

# Сажети опис тикета

## Show/Trigger

Required permission: `ticket.agent`

`POST`-Request sent: `/api/v1/tickets/{ticket id}/summarize`

The ticket summarize endpoint uses ``POST`` because creating and fetching
the summary happen in a single operation:

- If a summary exists, it is returned.
- If a summary does not exist, creation is triggered in the background
  (async job).

Using ``GET`` would be incorrect since the call may also create data. If you
want a summary to exist, call the endpoint; if it's not ready yet, retry
after at least 30 seconds.

Sample response if the generation of a new summary was just triggered by the
request:

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-null.json

:::

Sample response for an existing summary (e.g. for the same ticket like above
after waiting until creation has finished):

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-summary.json

:::
