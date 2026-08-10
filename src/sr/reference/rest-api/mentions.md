---
order: 9
title: Помињања
---

# Помињања

::: warning
Крајња тачка за помињање зависи од дозвола групе и од тога да ли је корисник
који користите **оператер**. Због тога тикети се могу или не морати
бити доступни.
:::

## Преглед листе

Потребна дозвола: `ticket.agent` **или** `ticket.customer`

`GET`-захтев послат: `/api/v1/mentions`

::: details

<<< @/fixtures/rest-api/mentions/get-res.json

:::

## Креирај

Потребна дозвола: `ticket.agent`

`POST`-захтев послат: `/api/v1/mentions`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/mentions/post-req.json

=== Одговор

<<< @/fixtures/rest-api/mentions/post-res.json

:::
::::

Помињање ће бити креирано за корисника тренутне сесије.

::: tip
Ако желите да поменете/прикључите друге кориснике, можете то учинити слањем
додатног `From`-заглавља у захтеву. Можете
навести ID корисника или адресу имејла корисника као вредност.
:::

## Обриши

Потребна дозвола: `ticket.agent`

`DELETE`-захтев послат: `/api/v1/mentions/{id}`

::: details

<<< @/fixtures/rest-api/mentions/delete-id-res.json

:::
