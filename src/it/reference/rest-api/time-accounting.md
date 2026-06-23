---
order: 20
title: 'Contabilità del tempo'
---

# Contabilità del tempo

## Elenca

Permesso richiesto: `ticket.agent` **o** `admin.time_accounting`

Richiesta `GET` inviata: `/api/v1/tickets/{ticket id}/time_accountings`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-res.json

:::

## Mostra

Permesso richiesto: `ticket.agent` **o** `admin.time_accounting`

Richiesta `GET` inviata: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-timeaccounting-id-res.json

:::

## Crea

Permesso richiesto: `ticket.agent` **o** `admin.time_accounting`

Richiesta `POST` inviata: `/api/v1/tickets/{ticket id}/time_accountings`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-req.json

=== Risposta

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.time_accounting`

Richiesta `PUT` inviata: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-req.json

=== Risposta

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-res.json

:::
::::

## Rimuovi

Permesso richiesto: `admin.time_accounting`

Richiesta `DELETE` inviata: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details

Risposta:

<<< @/fixtures/rest-api/tickets/time_accountings/delete-ticket-id-timaccounting-id-res.json

:::
