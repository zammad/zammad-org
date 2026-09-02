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

::: tip
**Suprimir notificações:** Para criar ou atualizar um ticket sem acionar notificações de agente (email e no app), adicione o
seguinte cabeçalho HTTP à sua solicitação:

```plain
X-Zammad-Suppress-Notifications: true
```

Isso é útil para integrações automatizadas que gerenciam tickets via webhooks ou gatilhos, para evitar loops de notificação. O
cabeçalho afeta apenas contas de admin e agente, e é ignorado para clientes.
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

Se você quiser criar tickets em nome de outros usuários, use o atributo `customer_id`. Isso requer a permissão `ticket.agent`.
Sem ela, `customer_id` é ignorado e o campo **Customer** do ticket é definido como o usuário atual. Use
`guess:{endereço de email}` para economizar uma chamada de API se você não souber o ID do usuário ou quiser criar o usuário em questão
(`"customer_id": "guess:jane@doe.com"`).

Ao criar um ticket em nome de um cliente com um artigo inicial, você **precisa** definir `article.sender` como "Customer"
explicitamente. Sem isso, o remetente assume o padrão "Agent" (com base na permissão do usuário atual). Isso afeta o
`create_article_sender_id` do ticket e os cálculos resultantes de timestamp de contato.

O mesmo se aplica a artigos adicionados posteriormente via PUT: defina o remetente explicitamente também nesse caso, ao agir em nome de um cliente.
Como o remetente de um artigo não pode ser alterado após a criação, é importante defini-lo corretamente desde o início.

Para mais detalhes sobre o atributo sender, veja [articles](/en/reference/rest-api/articles).

:::

::: tip
**Adicionar inscrição de menção imediatamente**

Adicione o atributo `mentions` ao payload do seu ticket e forneça um array de IDs de usuário para inscrevê-los
diretamente durante a criação do ticket.

Ex.: `"mentions": [1, 5, 7, 8],`

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
O atributo `sender` do artigo inicial determina o `create_article_sender_id` do ticket e os timestamps de contato.
Para a lista completa de atributos de artigo e seu comportamento, veja [articles](/en/reference/rest-api/articles).
:::

## Atualização

Permissão necessária: `ticket.agent` **ou** `ticket.customer`

Solicitação `PUT` enviada: `/api/v1/tickets/{ticket id}`

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
