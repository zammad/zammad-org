---
order: 13
title: Priorities
---

# Priorities

## List

Required permission: `admin.object` **or** `ticket.agent` **or**
`ticket.customer`

`GET`-Request sent: `/api/v1/ticket_priorities`

::: details Show response

<<< @/fixtures/rest-api/ticket_priorities/get-res.json

:::

## Show

Required permission: `admin.object` **or** `ticket.agent` **or**
`ticket.customer`

`GET`-Request sent: `/api/v1/ticket_priorities/{id}`

::: details Show response

<<< @/fixtures/rest-api/ticket_priorities/get-id-res.json

:::

## Create

Required permission: `admin.object`

`POST`-Request sent: `/api/v1/ticket_priorities`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_priorities/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_priorities/post-res.json

:::
::::

## Освежавање

Required permission: `admin.object`

`PUT`-Request sent: `/api/v1/ticket_priorities/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_priorities/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_priorities/put-id-res.json

:::
::::

## Delete

Required permission: `admin.object`

`DELETE`-Request sent: `/api/v1/ticket_priorities/{id}`

::: warning
**This is a permanent removal**

Please note that removing priorities cannot be undone.

Removing ticket priorities with references in tickets is not possible
via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider either setting said priority to `active: false` or adjust all
tickets with the to remove priority to another priority.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/ticket_priorities/delete-id-res.json

:::
