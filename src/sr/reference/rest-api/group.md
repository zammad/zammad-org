---
order: 6
title: Група
---

# Група

::: info

- Имајте у виду да `follow_up_possible` можда неће радити очекивано. Могуће
  вредности су `yes` или `new_ticket`!
- Ако желите да креирате или ажурирате **подгрупе**, користите `::` као раздвајач
  за називе. Такође морате навести целу хијерархију у
  називу. Пример: `Sales::Europe::South`
:::

## Преглед листе

Потребна дозвола: `admin.group`

`GET`-захтев послат на: `/api/v1/groups`

::: details

<<< @/fixtures/rest-api/groups/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.group`

`GET`-захтев послат на: `/api/v1/groups/{id}`

::: details

<<< @/fixtures/rest-api/groups/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.group`

`POST`-захтев послат на: `/api/v1/groups`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/groups/post-req.json

=== Одговор

<<< @/fixtures/rest-api/groups/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.group`

`PUT`-захтев послат на: `/api/v1/groups/{id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/groups/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/groups/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.group`

`DELETE`-захтев послат на: `/api/v1/groups/{id}`

::: danger

**Ово је трајно брисање**:

Имајте у виду да се брисање група не може поништити.

Брисање организација са референцама (нпр. у токовима активности или
тикетима) није могуће путем API-ја - то ће бити означено као
`"error": "Can't delete, object has references."`. Ово _није_ грешка.

Размислите о постављању задужених група у статус неактивно или обезбедите премештање
свих постојећих тикета на нове групе.

:::

::: details

<<< @/fixtures/rest-api/groups/delete-id-res.json

:::
