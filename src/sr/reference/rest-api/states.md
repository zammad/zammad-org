---
order: 17
title: Статуси
---

# Статуси

::: warning
Креирање, мењање или брисање статуса путем доњих ендпоинта није
препоручено! Ово можете урадити у Zammad UI-ју. Да бисте то учинили, идите на
админ интерфејс и одаберите _System > Objects > Ticket_.
:::

## Преглед листе

Потребна дозвола: `admin.object` **или** `ticket.agent` **или**
`ticket.customer`

`GET`-Захтев послат: `/api/v1/ticket_states`

::: details

<<< @/fixtures/rest-api/ticket_states/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.object` **или** `ticket.agent` **или**
`ticket.customer`

`GET`-Захтев послат: `/api/v1/ticket_states/{id}`

::: details

<<< @/fixtures/rest-api/ticket_states/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.object`

`POST`-Захтев послат: `/api/v1/ticket_states`

::: info
Доњи payload користи `state_type_id` који је инстанци-специфичан
скуп ID-јева. Типови статуса указују на начин рада статуса.

С обзиром да не постоји ендпоинт за њихово преузимање, користите
[Rails конзолу](/en/reference/rails-commands).
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.object`

`PUT`-Захтев послат: `/api/v1/ticket_states/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `admin.object`

`DELETE`-Захтев послат: `/api/v1/ticket_states/{id}`

::: danger
**Ово је трајно уклањање**

Имајте на уму да уклањање статуса карата не може бити поништено.

Уклањање статуса карата са референцама у тикетима није могуће путем
API-ја - што ће бити означено као
`"error": "Can't delete, object has references."`. Ово _није_ буг.

Размотрите постављање тог статуса на `active: false` или ажурирање свих
тицкетс with тхе то ремове стате то анотхер стате.
:::

::: details

Одговор:

<<< @/fixtures/rest-api/ticket_states/delete-id-res.json

:::
