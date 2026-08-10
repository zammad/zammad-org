---
order: 19
title: Тикет
---

# Тикет

::: warning
Ендпоинти за тикета зависе од дозвола групе и тога да ли је корисник који
е користите **оператер**. Због тога тикета могу или не морати бити
доступне.
:::

## Преглед листе

Потребна дозвола: `ticket.agent` **или** `ticket.customer`

`GET`-Захтев послат: `/api/v1/tickets`

::: details

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Прикажи

Потребна дозвола: `ticket.agent` **или** `ticket.customer`

`GET`-Захтев послат: `/api/v1/tickets/{ticket id}`

::: details

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Креирај

Потребна дозвола: `ticket.agent` **или** `ticket.customer`

`POST`-Захтев послат: `/api/v1/tickets`

::: tip
**У име корисника**

Ако желите да креирате тикета у име других корисника, користите атрибут
`customer_id`. Дозвола `ticket.agent` је обавезна за ово. Користите
`guess:{adresa e-pošte}` да бисте уштедели API позив ако не знате ID
корисника или желите да креирате поменутог корисника
(`"customer_id": "guess:jane@doe.com"`).

**Одмах додајте претплату на помињања:**

Додајте атрибут `mentions` у payload ваше тикета и наведите
низ ID-јева корисника да бисте их директно претплатили током креирања тикета.

Нпр.: `"mentions": [1, 5, 7, 8],`

:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/post-req.json

=== Response

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
За више атрибута чланака и опција погледајте
[чланци](/en/reference/rest-api/articles).
:::

## Освежавање

Потребна дозвола: `ticket.agent` **или** `ticket.customer`

`PUT`-Захтев послат: `/api/v1/tickets/{ticket id}`

::: tip
**Онемогући обавештења:** Да бисте освежили тикет без активирања обавештења оператерима (имејл и у апликацији), додајте
следећи HTTP заглавље у ваш захтев:

```plain
X-Zammad-Suppress-Notifications: true
```

Корисно је за аутоматске интеграције које освежавају тикете путем webhooka или окидача како би се избегло кружење обавештења. Ово
заглавље утиче само на админска и агентска налога и игнорише се за кориснике. Функционише и за
`POST /api/v1/ticket_articles` ендпоинт.
:::

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
Горњи пример даје чланак. Овај чланак је _нови чланак_ и
дне не утиче на постојеће.
:::

=== Одговор

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Додавање привитака**

Оквири података за привитке су идентични `POST` методи, само користите `PUT`
уместо ње.
:::

## Обриши

Потребна дозвола: `admin`

`DELETE`-захтев послат: `/api/v1/tickets/{ticket id}`

::: danger

**Ово је трајно уклањање**:

Имајте на уму да се укидање карата не може поништити. Сви подаци (нпр.
чланци и привици) биће изгубљени.
:::

::: details

Одговор:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
