---
order: 16
title: SLA
---

# Service-level agreements (SLA)

::: tip
SLAs dependem dos [calendários do Zammad](/pt_BR/reference/rest-api/calendar).
:::

## Listar

Permissão necessária: `admin.sla`

Solicitação `GET` enviada: `/api/v1/slas`

::: details

Response:

<<< @/fixtures/rest-api/slas/get-res.json

:::

## Mostrar

Permissão necessária: `admin.sla`

Solicitação `GET` enviada: `/api/v1/slas/{id}`

::: details

<<< @/fixtures/rest-api/slas/get-id-res.json

:::

## Criar

Permissão necessária: `admin.sla`

Solicitação `POST` enviada: `/api/v1/slas`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/slas/post-req.json

=== Response

<<< @/fixtures/rest-api/slas/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.sla`

Solicitação `PUT` enviada: `/api/v1/slas/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/slas/put-id-req.json

=== Response

<<< @/fixtures/rest-api/slas/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `admin.sla`

Solicitação `DELETE` enviada: `/api/v1/slas/{id}`

::: danger
**Esta é uma remoção permanente!**

Observe que remover configurações de SLA não pode ser desfeito.
:::

::: details

Response:

<<< @/fixtures/rest-api/slas/delete-id-res.json

:::
