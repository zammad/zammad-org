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
**Em nome de usuários**

Se você quiser criar tickets em nome de outros usuários, use o
atributo `customer_id`. `ticket.agent` é obrigatório para isso. Use
`guess:{email address}` para economizar uma chamada de API se você não souber
o ID do usuário ou quiser criar o usuário em questão
(`"customer_id": "guess:jane@doe.com"`).

**Adicionar inscrição de menção imediatamente**:

Adicione o atributo `mentions` ao payload do seu ticket e forneça um
array de IDs de usuário para inscrevê-los diretamente durante a criação do ticket.

Exemplo: `"mentions": [1, 5, 7, 8],`

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
Para mais atributos e opções de artigo, dê uma olhada em
[artigos](/pt_BR/reference/rest-api/articles).
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
