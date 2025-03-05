---
order: 7
title: Организација
---

# Организација

## List

Required permission: `ticket.agent` **or** `admin.organization`

::: info
Technically, customers can only see their own organization if applicable.
:::

`GET`-Request sent: `/api/v1/organizations`

::: details Show response

<<< @/fixtures/rest-api/organizations/get-res.json

:::

## Show

Required permission: `ticket.agent` **or** `admin.organization`

`GET`-Request sent: `/api/v1/organizations/{id}`

::: info
Technically, any users in question can only see their own organization.
:::

::: details Show response

<<< @/fixtures/rest-api/organizations/get-id-res.json

:::

## Create

Required permission: `admin.organization`

`POST`-Request sent: `/api/v1/organizations`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/post-req.json

=== Response

<<< @/fixtures/rest-api/organizations/post-res.json

:::
::::

## Освежавање

Required permission: `admin.organization`

`PUT`-Request sent: `/api/v1/organizations/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/put-id-req.json

=== Response

<<< @/fixtures/rest-api/organizations/put-id-res.json

:::
::::

## Delete

Required permission: `admin.organization`

`DELETE`-Request sent: `/api/v1/organizations/{id}`

::: danger
**This is a permanent removal**

Please note that removing organizations cannot be undone.

Removing organizations with references in e.g. activity streams or users
is not possible via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider using Zammad's Data Privacy feature via UI for
more control instead.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/organizations/delete-id-res.json

:::
