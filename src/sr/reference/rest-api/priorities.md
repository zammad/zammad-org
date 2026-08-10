---
order: 13
title: Приоритети
---

# Приоритети

## Преглед листе

Потребна дозвола: `admin.object` **или** `ticket.agent` **или**
`ticket.customer`

`GET`-Захтев послат: `/api/v1/ticket_priorities`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.object` **или** `ticket.agent` **или**
`ticket.customer`

`GET`-Захтев послат: `/api/v1/ticket_priorities/{id}`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.object`

`POST`-Захтев послат: `/api/v1/ticket_priorities`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/ticket_priorities/post-req.json

=== Одговор

<<< @/fixtures/rest-api/ticket_priorities/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.object`

`PUT`-Захтев послат: `/api/v1/ticket_priorities/{id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/ticket_priorities/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/ticket_priorities/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.object`

`DELETE`-Захтев послат: `/api/v1/ticket_priorities/{id}`

::: danger
**Ово је трајно брисање**

Имајте на уму да уклањање приоритета не може бити поништено.

Уклањање приоритета карата са референцама у тикетима није могуће
путем API-ја - то ће бити означено са
`"error": "Nije moguće obrisati, objekat ima reference."`. Ово _није_ грешка.

Размислите о подешавању тог приоритета на `active: false` или о промени свих
карата са приоритетом који се уклања на други приоритет.
:::

::: details

Одговор:

<<< @/fixtures/rest-api/ticket_priorities/delete-id-res.json

:::
