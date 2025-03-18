---
order: 15
title: 'Заједнички нацрти'
---

# Заједнички нацрти

## Show

Required permission: `ticket.agent`.

`GET`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

::: details Show response

<<< @/fixtures/rest-api/tickets/shared_draft/get-ticket-id-res.json

:::

## Create

Required permission: `ticket.agent`.

`PUT`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-res.json

:::
::::

## Освежавање

Required permission: `ticket.agent`

`PATCH`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-res.json

:::
::::

## Remove

Required permission: `ticket.agent`

`DELETE`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

::: details Show response

<<< @/fixtures/rest-api/tickets/shared_draft/delete-ticket-id-res.json

:::
