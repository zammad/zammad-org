---
order: 3
title: Календар
---

# Календар

::: tip
Календар се односи на [израчунавање SLA-а у Zammad-у](/en/reference/rest-api/sla).
:::

## Преглед листе

Потребна дозвола: `admin.calendar`

`GET`-захтев послат: `/api/v1/calendars`

::: details

<<< @/fixtures/rest-api/calendars/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.calendar`

`GET`-захтев послат: `/api/v1/calendars/{id}`

::: details

<<< @/fixtures/rest-api/calendars/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.calendar`

`POST`-захтев послат: `/api/v1/calendars`

:::: details

::: tabs key:req-res

=== Захтев

<<< @/fixtures/rest-api/calendars/post-req.json

=== Одговор

<<< @/fixtures/rest-api/calendars/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.calendar`

`PUT`-захтев послат: `/api/v1/calendars/{id}`

:::: details

::: tabs key:req-res

=== Захтев

<<< @/fixtures/rest-api/calendars/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/calendars/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.calendar`

`DELETE`-захтев послат: `/api/v1/calendars/{id}`

::: danger

**Ово је трајно уклањање**:

Имајте на уму да се конфигурације календара не могу поништити.

Уклањање календара са референцама у SLA конфигурацијама није могуће
преко API-ја - то ће бити означено као
`"error": "Can't delete, object has references."`. Ово _није_ буг.
:::

::: details

<<< @/fixtures/rest-api/calendars/delete-id-res.json

:::
