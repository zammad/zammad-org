---
order: 8
title: 'Рад на тикетима'
---

# Рад на тикетима

## Дохвати

Потребна дозвола: `ticket.agent` **или** `admin`

`GET`-захтев послат: `/api/v1/links`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/links/get-req.json

=== Одговор

<<< @/fixtures/rest-api/links/get-res.json

:::
::::

## Додај

Потребна дозвола: `ticket.agent` **или** `admin`

`POST`-захтев послат: `/api/v1/links/add`

::::: details

:::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/links/post-req.json

::: info
Вредност за `link_object_target` мора бити _ID тикета_.
Вредност за `link_object_source_number` мора бити _број тикета_.
:::

=== Одговор

<<< @/fixtures/rest-api/links/post-res.json

::::
:::::

## Обриши

Потребна дозвола: `ticket.agent` **или** `admin`

`DELETE`-захтев послат: `/api/v1/links/remove`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/links/remove/delete-req.json

=== Одговор

<<< @/fixtures/rest-api/links/remove/delete-res.json

:::
::::
