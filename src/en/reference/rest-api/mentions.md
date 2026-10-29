---
order: 10
title: Mentions
---

# Mentions

::: warning
Mentioning other users requires the `ticket.agent` permission and at least
`read` access to the group of the ticket, `full` access also qualifies.
Otherwise the request fails with HTTP status 403.
:::

## List

Required permission: `ticket.agent` and at least `read` access to the group of the ticket, `full` access also qualifies

`GET`-Request sent: `/api/v1/mentions`

::: details

<<< @/fixtures/rest-api/mentions/get-res.json

:::

## Create

Required permission: `ticket.agent` and at least `read` access to the group of the ticket, `full` access also qualifies

`POST`-Request sent: `/api/v1/mentions`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/mentions/post-req.json

=== Response

<<< @/fixtures/rest-api/mentions/post-res.json

:::
::::

The mention will be created for the user of the current session.

::: tip
If you want to mention/subscribe other users, you can do so by sending
an additional `From`-header in your request. You can either
provide the user ID or the user email address as value.
:::

## Delete

Required permission: `ticket.agent`

`DELETE`-Request sent: `/api/v1/mentions/{id}`

::: details

<<< @/fixtures/rest-api/mentions/delete-id-res.json

:::
