---
order: 12
title: Organization
---

# Organization

## Listar

Permissão necessária: `ticket.agent` **ou** `admin.organization`

::: info
Tecnicamente, os clientes só podem ver sua própria organização, se aplicável.
:::

Solicitação `GET` enviada: `/api/v1/organizations`

::: details

<<< @/fixtures/rest-api/organizations/get-res.json

:::

## Mostrar

Permissão necessária: `ticket.agent` **ou** `admin.organization`

Solicitação `GET` enviada: `/api/v1/organizations/{id}`

::: info
Tecnicamente, quaisquer usuários em questão só podem ver sua própria organização.
:::

::: details

<<< @/fixtures/rest-api/organizations/get-id-res.json

:::

## Criar

Permissão necessária: `admin.organization`

Solicitação `POST` enviada: `/api/v1/organizations`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/post-req.json

=== Response

<<< @/fixtures/rest-api/organizations/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.organization`

Solicitação `PUT` enviada: `/api/v1/organizations/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/put-id-req.json

=== Response

<<< @/fixtures/rest-api/organizations/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `admin.organization`

Solicitação `DELETE` enviada: `/api/v1/organizations/{id}`

::: danger
**Esta é uma remoção permanente**

Observe que remover organizações não pode ser desfeito.

Remover organizações com referências, por exemplo, em feeds de atividade ou usuários,
não é possível via API - isso será indicado por
`"error": "Can't delete, object has references."`. Isso _não_ é um bug.

Considere usar o recurso de Privacidade de Dados do Zammad via interface para
mais controle em vez disso.
:::

::: details

Response:

<<< @/fixtures/rest-api/organizations/delete-id-res.json

:::
