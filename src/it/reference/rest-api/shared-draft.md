---
order: 15
title: 'Shared drafts'
---

# Shared drafts

## Mostra

Permesso richiesto: `ticket.agent`.

Richiesta `GET` inviata: `/api/v1/tickets/{ticket id}/shared_draft`

::: details

<<< @/fixtures/rest-api/tickets/shared_draft/get-ticket-id-res.json

:::

## Crea

Permesso richiesto: `ticket.agent`.

Richiesta `PUT` inviata: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-req.json

=== Risposta

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `ticket.agent`

Richiesta `PATCH` inviata: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-req.json

=== Risposta

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-res.json

:::
::::

## Rimuovi

Permesso richiesto: `ticket.agent`

Richiesta `DELETE` inviata: `/api/v1/tickets/{ticket id}/shared_draft`

::: details

<<< @/fixtures/rest-api/tickets/shared_draft/delete-ticket-id-res.json

:::
