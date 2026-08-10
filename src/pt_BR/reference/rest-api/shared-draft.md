---
order: 15
title: 'Rascunhos compartilhados'
---

# Rascunhos compartilhados

## Mostrar

Permissão necessária: `ticket.agent`.

Solicitação `GET` enviada: `/api/v1/tickets/{ticket id}/shared_draft`

::: details

<<< @/fixtures/rest-api/tickets/shared_draft/get-ticket-id-res.json

:::

## Criar

Permissão necessária: `ticket.agent`.

Solicitação `PUT` enviada: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-res.json

:::
::::

## Atualização

Permissão necessária: `ticket.agent`

Solicitação `PATCH` enviada: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-res.json

:::
::::

## Remover

Permissão necessária: `ticket.agent`

Solicitação `DELETE` enviada: `/api/v1/tickets/{ticket id}/shared_draft`

::: details

<<< @/fixtures/rest-api/tickets/shared_draft/delete-ticket-id-res.json

:::
