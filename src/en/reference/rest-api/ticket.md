---
title: Ticket
order: 19
---

# Ticket

:::warning
Ticket endpoints depend on group permissions and if the user you're
using is an **agent**. Because of this tickets may or may not be
available.
:::

## List

Required permission: `ticket.agent` **or** `ticket.customer`

`GET`-Request sent: `/api/v1/tickets`

::: details

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Show

Required permission: `ticket.agent` **or** `ticket.customer`

`GET`-Request sent: `/api/v1/tickets/{ticket id}`

::: details

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Create

Required permission: `ticket.agent` **or** `ticket.customer`

`POST`-Request sent: `/api/v1/tickets`

::: tip
**On behalf of users**

If you want to create tickets on behalf of other users, use the
`customer_id` attribute. `ticket.agent` is mandatory for this. Use
`guess:{email address}` to save an API call if you don't know the
user's ID or want to create the user in question
(`"customer_id": "guess:jane@doe.com"`).

**Add mention subscription right away**:

Add the `mentions` attribute to your ticket payload and provide an
array of user ids to directly subscribe them during ticket creation.

E.g.: `"mentions": [1, 5, 7, 8],`

:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/post-req.json

=== Response

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
For more article attributes and options have a look into
[articles](/en/reference/rest-api/articles).
:::

## Update

Required permission: `ticket.agent` **or** `ticket.customer`

`PUT`-Request sent: `/api/v1/tickets/{ticket id}`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
Above example provides an article. This article is a _new article_ and
does not affect any existing ones.
:::

=== Response

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Adding attachments**

Attachment payloads are identical to the `POST` method, just use `PUT`
instead.
:::

## Delete

Required permission: `admin`

`DELETE`-Request sent: `/api/v1/tickets/{ticket id}`

::: danger

**This is a permanent removal**:

Please note that removing tickets cannot be undone. All data (e.g.
articles & attachments) will be lost.
:::

::: details

Response:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
