---
order: 20
title: 'Обрачун времена'
---

# Обрачун времена

## Преглед листе

Потребна дозвола: `ticket.agent` **или** `admin.time_accounting`

`GET`-захтев послат: `/api/v1/tickets/{ticket id}/time_accountings`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-res.json

:::

## Прикажи

Потребна дозвола: `ticket.agent` **или** `admin.time_accounting`

`GET`-захтев послат: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-timeaccounting-id-res.json

:::

## Креирај

Потребна дозвола: `ticket.agent` **или** `admin.time_accounting`

`POST`-захтев послат: `/api/v1/tickets/{ticket id}/time_accountings`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-req.json

=== Одговор

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.time_accounting`

`PUT`-захтев послат: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-req.json

=== Одговор

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.time_accounting`

`DELETE`-захтев послат: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details

Одговор:

<<< @/fixtures/rest-api/tickets/time_accountings/delete-ticket-id-timaccounting-id-res.json

:::
