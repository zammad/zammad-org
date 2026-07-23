---
order: 17
title: Estados
---

# Estados

::: warning
Criar, alterar ou remover estados via os endpoints abaixo não é
recomendado! Você pode fazer isso na interface do Zammad. Para isso, vá até a
interface de administração em _System > Objects > Ticket_.
:::

## Listar

Permissão necessária: `admin.object` **ou** `ticket.agent` **ou**
`ticket.customer`

Solicitação `GET` enviada: `/api/v1/ticket_states`

::: details

<<< @/fixtures/rest-api/ticket_states/get-res.json

:::

## Mostrar

Permissão necessária: `admin.object` **ou** `ticket.agent` **ou**
`ticket.customer`

Solicitação `GET` enviada: `/api/v1/ticket_states/{id}`

::: details

<<< @/fixtures/rest-api/ticket_states/get-id-res.json

:::

## Criar

Permissão necessária: `admin.object`

Solicitação `POST` enviada: `/api/v1/ticket_states`

::: info
O payload abaixo usa `state_type_id`, que é um conjunto de IDs
específico da instância. Os tipos de estado indicam como o estado vai funcionar.

Como não há endpoint para recuperá-los, use o
[console Rails](/pt_BR/reference/rails-commands).
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.object`

Solicitação `PUT` enviada: `/api/v1/ticket_states/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `admin.object`

Solicitação `DELETE` enviada: `/api/v1/ticket_states/{id}`

::: danger
**Esta é uma remoção permanente**

Observe que remover estados de ticket não pode ser desfeito.

Remover estados de ticket com referências em tickets não é possível via
API - isso será indicado por
`"error": "Can't delete, object has references."`. Isso _não_ é um bug.

Considere definir esse estado como `active: false`, ou ajustar todos os
tickets com o estado a remover para outro estado.
:::

::: details

Response:

<<< @/fixtures/rest-api/ticket_states/delete-id-res.json

:::
