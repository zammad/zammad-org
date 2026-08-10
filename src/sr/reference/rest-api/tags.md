---
order: 18
title: Ознаке
---

# Ознаке

## Стање тикета

### Преглед листе

Потребна дозвола: `ticket.agent` **или** `admin.tag`

`GET`-Захтев послат: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details

<<< @/fixtures/rest-api/tags/get-res.json

:::

### Додај

Потребна дозвола: `ticket.agent` **или** `admin.tag`

`POST`-Захтев послат: `/api/v1/tags/add`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/add/post-req.json

::: info
Ово ће креирати ознаку ако не постоји и ако корисник има дозволу
да то уради.
:::

=== Response

<<< @/fixtures/rest-api/tags/add/post-res.json

::::
:::::

### Обриши

Потребна дозвола: `ticket.agent` **или** `admin.tag`

`DELETE`-Захтев послат: `/api/v1/tags/remove`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/tags/remove/delete-res.json

:::
::::

## Административни опсег

### Admin - Листа

Потребна дозвола: `admin.tag`

`GET`-Захтев послат: `/api/v1/tag_list`

::: details

<<< @/fixtures/rest-api/tag_list/get-res.json

:::

### Admin - Креирање

Потребна дозвола: `admin.tag`

`POST`-Захтев послат: `/api/v1/tag_list`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/post-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/post-res.json

:::
::::

### Admin - Преименовање

Потребна дозвола: `admin.tag`

`PUT`-Захтев послат: `/api/v1/tag_list/{tag id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/put-tag-id-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/put-tag-id-res.json

:::
::::

### Admin - Брисање

Потребна дозвола: `admin.tag`

`DELETE`-Захтев послат: `/api/v1/tag_list/{tag id}`

::: details

Одговор:

<<< @/fixtures/rest-api/tag_list/delete-tag-id-res.json

:::
