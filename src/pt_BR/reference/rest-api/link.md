---
order: 8
title: 'Linking tickets'
---

# Linking tickets

## Obter

Permissão necessária: `ticket.agent` **ou** `admin`

Solicitação `GET` enviada: `/api/v1/links`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/get-req.json

=== Response

<<< @/fixtures/rest-api/links/get-res.json

:::
::::

## Adicionar

Permissão necessária: `ticket.agent` **ou** `admin`

Solicitação `POST` enviada: `/api/v1/links/add`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/post-req.json

::: info
O valor para `link_object_target` precisa ser o _ID do ticket_. O
valor para `link_object_source_number` precisa ser o _número do
ticket_.
:::

=== Response

<<< @/fixtures/rest-api/links/post-res.json

::::
:::::

## Excluir

Permissão necessária: `ticket.agent` **ou** `admin`

Solicitação `DELETE` enviada: `/api/v1/links/remove`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/links/remove/delete-res.json

:::
::::
