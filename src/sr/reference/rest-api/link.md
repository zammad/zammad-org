---
order: 8
title: 'Linking Tickets'
---

# Linking Tickets

## Get

Required permission: `ticket.agent` **or** `admin`

`GET`-Request sent: `/api/v1/links`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/get-req.json

=== Response

<<< @/fixtures/rest-api/links/get-res.json

:::
::::

## Add

Required permission: `ticket.agent` **or** `admin`

`POST`-Request sent: `/api/v1/links/add`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/post-req.json

:::info
The value for `link_object_target` has to be the _ticket ID_. The
value for the `link_object_source_number` has to be the _ticket
number_.
:::

=== Response

<<< @/fixtures/rest-api/links/post-res.json

::::
:::::

## Delete

Required permission: `ticket.agent` **or** `admin`

`DELETE`-Request sent: `/api/v1/links/remove`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/links/remove/delete-res.json

:::
::::
