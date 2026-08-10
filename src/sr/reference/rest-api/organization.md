---
order: 12
title: Организација
---

# Организација

## Преглед листе

Потребна дозвола: `ticket.agent` **или** `admin.organization`

::: info
Технички, клијенти могу видети само своју организацију, где је то применљиво.
:::

`GET`-захтев послат: `/api/v1/organizations`

::: details

<<< @/fixtures/rest-api/organizations/get-res.json

:::

## Прикажи

Потребна дозвола: `ticket.agent` **или** `admin.organization`

`GET`-захтев послат: `/api/v1/organizations/{id}`

::: info
Технички, поменути корисници могу видети само своју организацију.
:::

::: details

<<< @/fixtures/rest-api/organizations/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.organization`

`POST`-захтев послат: `/api/v1/organizations`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/organizations/post-req.json

=== Одговор

<<< @/fixtures/rest-api/organizations/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.organization`

`PUT`-захтев послат: `/api/v1/organizations/{id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/organizations/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/organizations/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.organization`

`DELETE`-Захтев послат: `/api/v1/organizations/{id}`

::: danger
**Ово је трајно брисање**

Имајте на уму да уклањање организација не може бити поништено.

Уклањање организација са референцама нпр. у токовима активности или корисницима
није могуће путем API-ја - то ће бити означено са
`"error": "Nije moguće obrisati, objekat ima reference."`. Ово _није_ грешка.

Уместо тога размислите о коришћењу Zammad-ове функције за заштиту података путем UI-а за
више контроле.
:::

::: details

Одговор:

<<< @/fixtures/rest-api/organizations/delete-id-res.json

:::
