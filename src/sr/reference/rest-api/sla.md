---
order: 16
title: SLA
---

# Уговори о нивоу услуге (SLA)

::: tip
SLA зависи од [календара Zammad-а](/en/reference/rest-api/calendar).
:::

## Преглед листе

Потребна дозвола: `admin.sla`

`GET`-Захтев послат: `/api/v1/slas`

::: details

Одговор:

<<< @/fixtures/rest-api/slas/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.sla`

`GET`-Захтев послат: `/api/v1/slas/{id}`

::: details

<<< @/fixtures/rest-api/slas/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.sla`

`POST`-Захтев послат: `/api/v1/slas`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/slas/post-req.json

=== Одговор

<<< @/fixtures/rest-api/slas/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.sla`

`PUT`-Захтев послат: `/api/v1/slas/{id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/slas/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/slas/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.sla`

`DELETE`-Захтев послат: `/api/v1/slas/{id}`

::: danger
**Ово је трајно брисање!**

Имајте на уму да уклањање конфигурација SLA не може бити поништено.
:::

::: details

Одговор:

<<< @/fixtures/rest-api/slas/delete-id-res.json

:::
