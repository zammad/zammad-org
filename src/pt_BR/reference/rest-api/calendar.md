---
order: 3
title: Calendário
---

# Calendário

::: tip
Calendários pertencem ao [cálculo de SLA do Zammad](/pt_BR/reference/rest-api/sla).
:::

## Listar

Permissão necessária: `admin.calendar`

Solicitação `GET` enviada: `/api/v1/calendars`

::: details

<<< @/fixtures/rest-api/calendars/get-res.json

:::

## Mostrar

Permissão necessária: `admin.calendar`

Solicitação `GET` enviada: `/api/v1/calendars/{id}`

::: details

<<< @/fixtures/rest-api/calendars/get-id-res.json

:::

## Criar

Permissão necessária: `admin.calendar`

Solicitação `POST` enviada: `/api/v1/calendars`

:::: details

::: tabs key:req-res

=== Request

<<< @/fixtures/rest-api/calendars/post-req.json

=== Response

<<< @/fixtures/rest-api/calendars/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.calendar`

Solicitação `PUT` enviada: `/api/v1/calendars/{id}`

:::: details

::: tabs key:req-res

=== Request

<<< @/fixtures/rest-api/calendars/put-id-req.json

=== Response

<<< @/fixtures/rest-api/calendars/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `admin.calendar`

Solicitação `DELETE` enviada: `/api/v1/calendars/{id}`

::: danger

**Esta é uma remoção permanente**:

Observe que remover configurações de calendário não pode ser desfeito.

Remover calendários com referências em configurações de SLA não é possível
via API - isso será indicado por
`"error": "Can't delete, object has references."`. Isso _não_ é um bug.
:::

::: details

<<< @/fixtures/rest-api/calendars/delete-id-res.json

:::
