---
order: 15
title: 'Заједнички нацрти'
---

# Заједнички нацрти

## Прикажи

Потребна дозвола: `ticket.agent`.

`GET`-Захтев послат: `/api/v1/tickets/{ticket id}/shared_draft`

::: details

<<< @/fixtures/rest-api/tickets/shared_draft/get-ticket-id-res.json

:::

## Креирај

Потребна дозвола: `ticket.agent`.

`PUT`-Захтев послат: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-req.json

=== Одговор

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-res.json

:::
::::

## Освежавање

Потребна дозвола: `ticket.agent`

`PATCH`-Захтев послат: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-req.json

=== Одговор

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-res.json

:::
::::

## Обриши

Потребна дозвола: `ticket.agent`

`DELETE`-Захтев послат: `/api/v1/tickets/{ticket id}/shared_draft`

::: details

<<< @/fixtures/rest-api/tickets/shared_draft/delete-ticket-id-res.json

:::
