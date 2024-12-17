---
order: 2
title: 'Time Accounting'
---

# Time Accounting

## List

Required permission: `ticket.agent` **or** `admin.time_accounting`

`GET`-Request sent: `/api/v1/tickets/{ticket id}/time_accountings`

::: details Show response

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-res.json

:::

## Show

Required permission: `ticket.agent` **or** `admin.time_accounting`

`GET`-Request sent: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details Show response

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-timeaccounting-id-res.json

:::

## Create

Required permission: `ticket.agent` **or** `admin.time_accounting`

`POST`-Request sent: `/api/v1/tickets/{ticket id}/time_accountings`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-res.json

:::
::::

## Освежавање

Required permission: `admin.time_accounting`

`PUT`-Request sent: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-res.json

:::
::::

## Remove

Required permission: `admin.time_accounting`

`DELETE`-Request sent: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details Show response

Response:

<<< @/fixtures/rest-api/tickets/time_accountings/delete-ticket-id-timaccounting-id-res.json

:::
