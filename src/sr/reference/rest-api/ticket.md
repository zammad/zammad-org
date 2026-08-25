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
**On behalf of users**

If you want to create tickets on behalf of other users, use the `customer_id` attribute. This requires the `ticket.agent`
permission. Without it, `customer_id` is ignored and the ticket's **Customer** field is set to the current user. Use
`guess:{email address}` to save an API call if you don't know the user's ID or want to create the user in question
(`"customer_id": "guess:jane@doe.com"`).

When creating a ticket on behalf of a customer with an initial article, you **must** set `article.sender` to "Customer"
explicitly. Without this, the sender defaults to "Agent" (based on the current user's permission). This affects the
ticket's `create_article_sender_id` and the resulting contact timestamp calculations.

The same applies to articles added later via PUT: set sender explicitly there as well when acting on behalf of a customer.
Since the sender of an article cannot be changed after creation, it is important to set it correctly from the start.

For more details on the sender attribute, see [articles](/en/reference/rest-api/articles).

:::

::: tip
**Add mention subscription right away**

Add the `mentions` attribute to your ticket payload and provide an array of user ids to directly subscribe them during
ticket creation.

E.g.: `"mentions": [1, 5, 7, 8],`

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
The `sender` attribute of the initial article determines the ticket's `create_article_sender_id` and contact timestamps.
For the full list of article attributes and their behavior, see [articles](/en/reference/rest-api/articles).
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
