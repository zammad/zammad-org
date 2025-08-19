---
order: 9
title: Mentions
---

# Mentions

::: warning
The mention endpoint depends on the group permissions and if the user
you're using is an **agent**. Because of this tickets may or may not
be available.
:::

## List

Required permission: `ticket.agent` **or** `ticket.customer`

`GET`-Request sent: `/api/v1/mentions`

::: details

<<< @/fixtures/rest-api/mentions/get-res.json

:::

## Create

Required permission: `ticket.agent`

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
