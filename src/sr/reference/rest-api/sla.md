---
order: 16
title: SLA
---

# Service-level agreements (SLA)

::: tip
SLAs depend on [Zammad's calendars](/en/reference/rest-api/calendar).
:::

## List

Required permission: `admin.sla`

`GET`-Request sent: `/api/v1/slas`

::: details

Response:

<<< @/fixtures/rest-api/slas/get-res.json

:::

## Show

Required permission: `admin.sla`

`GET`-Request sent: `/api/v1/slas/{id}`

::: details

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

## Освежавање

Required permission: `admin.sla`

`PUT`-Request sent: `/api/v1/slas/{id}`

:::: details

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

::: details

Response:

<<< @/fixtures/rest-api/slas/delete-id-res.json

:::
