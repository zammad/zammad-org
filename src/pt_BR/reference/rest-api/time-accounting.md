---
order: 20
title: 'Contabilização de tempo'
---

# Contabilização de tempo

## Listar

Permissão necessária: `ticket.agent` **ou** `admin.time_accounting`

Solicitação `GET` enviada: `/api/v1/tickets/{ticket id}/time_accountings`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-res.json

:::

## Mostrar

Permissão necessária: `ticket.agent` **ou** `admin.time_accounting`

Solicitação `GET` enviada: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-timeaccounting-id-res.json

:::

## Criar

Permissão necessária: `ticket.agent` **ou** `admin.time_accounting`

Solicitação `POST` enviada: `/api/v1/tickets/{ticket id}/time_accountings`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-res.json

:::
::::

## Atualização

Permissão necessária: `admin.time_accounting`

Solicitação `PUT` enviada: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-res.json

:::
::::

## Remover

Permissão necessária: `admin.time_accounting`

Solicitação `DELETE` enviada: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details

Response:

<<< @/fixtures/rest-api/tickets/time_accountings/delete-ticket-id-timaccounting-id-res.json

:::
