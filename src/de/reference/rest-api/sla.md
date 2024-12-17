---
order: 2
title: SLA
---

# Service-Level Agreements (SLA)

::: tip
SLAs depend on [Zammad's calendars](/en/reference/rest-api/calendar).
:::

## List

Required permission: `admin.sla`

`GET`-Request sent: `/api/v1/slas`

::: details Show response

Response:

<<< @/fixtures/rest-api/slas/get-res.json

:::

## Show

Required permission: `admin.sla`

`GET`-Request sent: `/api/v1/slas/{id}`

::: details Show response

<<< @/fixtures/rest-api/slas/get-id-res.json

:::

## Create

Required permission: `admin.sla`

`POST`-Request sent: `/api/v1/slas`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/slas/post-req.json

=== Response

<<< @/fixtures/rest-api/slas/post-res.json

:::
::::

## Aktualisierung

Required permission: `admin.sla`

`PUT`-Request sent: `/api/v1/slas/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/slas/put-id-req.json

=== Response

<<< @/fixtures/rest-api/slas/put-id-res.json

:::
::::

## Delete

Required permission: `admin.sla`

`DELETE`-Request sent: `/api/v1/slas/{id}`

::: danger
**This is a permanent removal!**

Please note that removing SLA configurations cannot be undone.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/slas/delete-id-res.json

:::
