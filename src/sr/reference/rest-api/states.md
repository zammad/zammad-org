---
order: 17
title: States
---

# States

::: warning
Creating, changing or removing states via below endpoints is not
recommended! You can do this in Zammad's UI. To do so, go to the
admin interface to _System > Objects > Ticket_.
:::

## List

Required permission: `admin.object` **or** `ticket.agent` **or**
`ticket.customer`

`GET`-Request sent: `/api/v1/ticket_states`

::: details

<<< @/fixtures/rest-api/ticket_states/get-res.json

:::

## Show

Required permission: `admin.object` **or** `ticket.agent` **or**
`ticket.customer`

`GET`-Request sent: `/api/v1/ticket_states/{id}`

::: details

<<< @/fixtures/rest-api/ticket_states/get-id-res.json

:::

## Create

Required permission: `admin.object`

`POST`-Request sent: `/api/v1/ticket_states`

::: info
Below payload makes use of `state_type_id` which is a instance
specific set of IDs. State types indicate how the state will work.

As there's no endpoint for retrieving these, please use the
[rails console](/en/reference/console).
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/post-res.json

:::
::::

## Освежавање

Required permission: `admin.object`

`PUT`-Request sent: `/api/v1/ticket_states/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/put-id-res.json

:::
::::

## Delete

Required permission: `admin.object`

`DELETE`-Request sent: `/api/v1/ticket_states/{id}`

::: danger
**This is a permanent removal**

Please note that removing ticket states cannot be undone.

Removing ticket states with references in tickets is not possible via
API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider either setting said state to `active: false` or adjust all
tickets with the to remove state to another state.
:::

::: details

Response:

<<< @/fixtures/rest-api/ticket_states/delete-id-res.json

:::
