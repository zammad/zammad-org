---
order: 10
title: Gatilho
---

# Gatilho

::: info
Os gatilhos podem executar uma ação `notification.webhook` que referencia um
[webhook](/pt_BR/reference/rest-api/webhook) pelo id
(`{"notification.webhook": {"webhook_id": <id>}}`) em vez de, ou
junto com, `notification.email`. Crie o webhook primeiro e depois aponte
a ação perform do gatilho para o `id` dele.
:::

## Listar

Permissão necessária: `admin.trigger`

Solicitação `GET` enviada: `/api/v1/triggers`

::: details

<<< @/fixtures/rest-api/triggers/get-res.json

:::

::: info
`recipient: "article_last_sender"` envia o email para quem escreveu o artigo
que disparou o gatilho. Neste exemplo, é sempre o cliente, porque a
condição exige que `article.sender_id` seja `2` (Customer). Se um agente
tivesse escrito o artigo, o agente receberia o email. Use
`recipient: "ticket_customer"` (veja Create abaixo) para sempre direcionar ao
cliente, independentemente de quem realizou a ação.
:::

## Mostrar

Permissão necessária: `admin.trigger`

Solicitação `GET` enviada: `/api/v1/triggers/{id}`

::: details

<<< @/fixtures/rest-api/triggers/get-id-res.json

:::

## Criar

Permissão necessária: `admin.trigger`

Solicitação `POST` enviada: `/api/v1/triggers`

`condition` aceita dois formatos: um objeto plano indexado pelo nome do
campo (como mostrado no exemplo de List acima, igual aos gatilhos padrão do
Zammad) e a forma explícita `{"operator": "AND", "conditions": [...]}` usada
abaixo.

No exemplo abaixo, fechar um ticket faz o cliente do ticket receber um email
de confirmação, porque `recipient: "ticket_customer"` sempre aponta para o
cliente, independentemente de quem realizou o fechamento.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/triggers/post-req.json

=== Response

<<< @/fixtures/rest-api/triggers/post-res.json

:::

::::

## Atualização

Permissão necessária: `admin.trigger`

Solicitação `PUT` enviada: `/api/v1/triggers/{id}`

O formato do payload é idêntico ao de Create. A resposta é o registro
atualizado, no mesmo formato de Show/Create, com `updated_at` atualizado.

::: tip
Um payload parcial também funciona, por exemplo `{"active": false}` para alternar apenas
esse campo. Para atualizar um gatilho pelo nome, consulte primeiro o `id` dele via
`GET /api/v1/triggers` e depois envie a solicitação `PUT` para
`/api/v1/triggers/{id}`.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/triggers/put-id-req.json

=== Response

<<< @/fixtures/rest-api/triggers/put-id-res.json

:::

::::

## Excluir

Permissão necessária: `admin.trigger`

::: danger
**Esta é uma remoção permanente**

Observe que remover gatilhos não pode ser desfeito.
:::

Solicitação `DELETE` enviada: `/api/v1/triggers/{id}`

::: details

<<< @/fixtures/rest-api/triggers/delete-id-res.json

:::
