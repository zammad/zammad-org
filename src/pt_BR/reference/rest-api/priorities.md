---
order: 13
title: Prioridades
---

# Prioridades

## Listar

Permissão necessária: `admin.object` **ou** `ticket.agent` **ou**
`ticket.customer`

Solicitação `GET` enviada: `/api/v1/ticket_priorities`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-res.json

:::

## Mostrar

Permissão necessária: `admin.object` **ou** `ticket.agent` **ou**
`ticket.customer`

Solicitação `GET` enviada: `/api/v1/ticket_priorities/{id}`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-id-res.json

:::

## Criar

Permissão necessária: `admin.object`

Solicitação `POST` enviada: `/api/v1/ticket_priorities`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_priorities/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_priorities/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.object`

Solicitação `PUT` enviada: `/api/v1/ticket_priorities/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_priorities/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_priorities/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `admin.object`

Solicitação `DELETE` enviada: `/api/v1/ticket_priorities/{id}`

::: danger
**Esta é uma remoção permanente**

Observe que remover prioridades não pode ser desfeito.

Remover prioridades de ticket com referências em tickets não é possível
via API - isso será indicado por
`"error": "Can't delete, object has references."`. Isso _não_ é um bug.

Considere definir essa prioridade como `active: false`, ou ajustar todos os
tickets com a prioridade a remover para outra prioridade.
:::

::: details

Response:

<<< @/fixtures/rest-api/ticket_priorities/delete-id-res.json

:::
