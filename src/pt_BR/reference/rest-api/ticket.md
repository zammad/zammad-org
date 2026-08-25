---
order: 19
title: Ticket
---

# Ticket

::: warning
Os endpoints de ticket dependem das permissões de grupo e se o usuário
que você está usando é um **agente**. Por causa disso, os tickets podem
ou não estar disponíveis.
:::

## Listar

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `GET` enviada: `/api/v1/tickets`

::: details

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Mostrar

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `GET` enviada: `/api/v1/tickets/{ticket id}`

::: details

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Criar

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `POST` enviada: `/api/v1/tickets`

::: tip
**On behalf of users**

If you want to create tickets on behalf of other users, use the `customer_id` attribute. This requires the `ticket.agent`
permission. Without it, `customer_id` is ignored and the ticket's **Customer** field is set to the current user. Use
`guess:{email address}` to save an API call if you don't know the user's ID or want to create the user in question
(`"customer_id": "guess:jane@doe.com"`).

When creating a ticket on behalf of a customer with an initial article, you **must** set `article.sender` to "Customer"
explicitly. Without this, the sender defaults to "Agent" (based on the current user's permission). This affects the
ticket's `create_article_sender_id` and the resulting contact timestamp calculations.

The same applies to articles added later via PUT: set sender explicitly there as well when acting on behalf of a customer.
Since the sender of an article cannot be changed after creation, it is important to set it correctly from the start.

For more details on the sender attribute, see [articles](/en/reference/rest-api/articles).

:::

::: tip
**Add mention subscription right away**

Add the `mentions` attribute to your ticket payload and provide an array of user ids to directly subscribe them during
ticket creation.

E.g.: `"mentions": [1, 5, 7, 8],`

:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/post-req.json

=== Response

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
The `sender` attribute of the initial article determines the ticket's `create_article_sender_id` and contact timestamps.
For the full list of article attributes and their behavior, see [articles](/en/reference/rest-api/articles).
:::

## Atualização

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `PUT` enviada: `/api/v1/tickets/{ticket id}`

::: tip
**Suprimir notificações:** Para atualizar um ticket sem acionar notificações de agente (email e no app), adicione o
seguinte cabeçalho HTTP à sua solicitação:

```plain
X-Zammad-Suppress-Notifications: true
```

Isso é útil para integrações automatizadas que atualizam tickets via webhooks ou gatilhos, para evitar loops de notificação. O
cabeçalho afeta apenas contas de admin e agente, e é ignorado para clientes. Também funciona para o
endpoint `POST /api/v1/ticket_articles`.
:::

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
O exemplo acima fornece um artigo. Este artigo é um _novo artigo_ e
não afeta nenhum existente.
:::

=== Response

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Adicionando anexos**

Os payloads de anexo são idênticos ao método `POST`, apenas use `PUT`
em vez disso.
:::

## Excluir

Permissão necessária: `admin`

Solicitação `DELETE` enviada: `/api/v1/tickets/{ticket id}`

::: danger

**Esta é uma remoção permanente**:

Observe que remover tickets não pode ser desfeito. Todos os dados (por exemplo,
artigos e anexos) serão perdidos.
:::

::: details

Response:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
