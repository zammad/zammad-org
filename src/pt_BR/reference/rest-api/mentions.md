---
order: 9
title: Menções
---

# Menções

::: warning
O endpoint de menções depende das permissões de grupo e se o usuário
que você está usando é um **agente**. Por causa disso, os tickets podem
ou não estar disponíveis.
:::

## Listar

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `GET` enviada: `/api/v1/mentions`

::: details

<<< @/fixtures/rest-api/mentions/get-res.json

:::

## Criar

Permissão necessária: `ticket.agent`

Solicitação `POST` enviada: `/api/v1/mentions`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/mentions/post-req.json

=== Response

<<< @/fixtures/rest-api/mentions/post-res.json

:::
::::

A menção será criada para o usuário da sessão atual.

::: tip
Se você quiser mencionar/inscrever outros usuários, pode fazer isso enviando
um cabeçalho `From` adicional na sua solicitação. Você pode
fornecer o ID do usuário ou o endereço de email do usuário como valor.
:::

## Excluir

Permissão necessária: `ticket.agent`

Solicitação `DELETE` enviada: `/api/v1/mentions/{id}`

::: details

<<< @/fixtures/rest-api/mentions/delete-id-res.json

:::
