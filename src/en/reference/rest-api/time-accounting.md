---
title: Time Accounting
order: 20
---

# Time Accounting

## List

Required permission: `ticket.agent` **or** `admin.time_accounting`

`GET`-Request sent: `/api/v1/tickets/{ticket id}/time_accountings`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-res.json

:::

## Show

Required permission: `ticket.agent` **or** `admin.time_accounting`

`GET`-Request sent:
`/api/v1/tickets/{ticket id}/time_accountings/{timeaccounting id}`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-timeaccounting-id-res.json

:::

## Create

Required permission: `ticket.agent` **or** `admin.time_accounting`

`POST`-Request sent: `/api/v1/tickets/{ticket id}/time_accountings`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-res.json

:::
::::

## Update

Required permission: `admin.time_accounting`

`PUT`-Request sent:
`/api/v1/tickets/{ticket id}/time_accountings/{timeaccounting id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-res.json

:::
::::

## Remove

Required permission: `admin.time_accounting`

`DELETE`-Request sent:
`/api/v1/tickets/{ticket id}/time_accountings/{timeaccounting id}`

::: details

Response:

<<< @/fixtures/rest-api/tickets/time_accountings/delete-ticket-id-timaccounting-id-res.json

:::
