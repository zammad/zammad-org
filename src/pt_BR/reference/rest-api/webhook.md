---
order: 10
title: Webhook
---

# Webhook

::: info
Os webhooks são referenciados por [gatilhos](/pt_BR/reference/rest-api/trigger) por meio
da ação perform `notification.webhook`
(`{"notification.webhook": {"webhook_id": <id>}}`). Crie o webhook
primeiro e depois aponte um ou mais gatilhos para o `id` dele.
:::

## Listar

Permissão necessária: `admin.webhook`

Solicitação `GET` enviada: `/api/v1/webhooks`

::: details

<<< @/fixtures/rest-api/webhooks/get-res.json

:::

::: info
`signature_token`, `basic_auth_password` e `bearer_token` são retornados
como `**********` depois de definidos. A API nunca retorna os segredos
armazenados. Campos não definidos são retornados como `null`.
:::

## Mostrar

Permissão necessária: `admin.webhook`

Solicitação `GET` enviada: `/api/v1/webhooks/{id}`

::: details

<<< @/fixtures/rest-api/webhooks/get-id-res.json

:::

## Criar

Permissão necessária: `admin.webhook`

Solicitação `POST` enviada: `/api/v1/webhooks`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/webhooks/post-req.json

=== Response

<<< @/fixtures/rest-api/webhooks/post-res.json

:::

::::

::: info
`ssl_verify` importa para endpoints `https://`: defina-o como `true` para realmente
validar o certificado TLS do endpoint. Só faz sentido defini-lo como
`false` para um endpoint `http://` simples, que de qualquer forma não tem certificado a
verificar.
:::

## Atualização

Permissão necessária: `admin.webhook`

Solicitação `PUT` enviada: `/api/v1/webhooks/{id}`

O formato do payload é idêntico ao de Create. A resposta é o registro
atualizado, no mesmo formato de Show/Create, com `updated_at` atualizado.

::: tip
Um payload parcial também funciona, por exemplo `{"active": false}` para alternar apenas
esse campo.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/webhooks/put-id-req.json

=== Response

<<< @/fixtures/rest-api/webhooks/put-id-res.json

:::

::::

## Excluir

Permissão necessária: `admin.webhook`

::: danger
**Esta é uma remoção permanente**

Observe que remover webhooks não pode ser desfeito.
:::

Um webhook que ainda é referenciado pela ação `perform` de outro objeto (por
exemplo, um [gatilho](/pt_BR/reference/rest-api/trigger)) não pode ser
excluído. A API responde com `422 Unprocessable Entity` e lista os objetos
que fazem a referência. Remova a referência primeiro.

Solicitação `DELETE` enviada: `/api/v1/webhooks/{id}`

::: details

<<< @/fixtures/rest-api/webhooks/delete-id-res.json

:::

::: details

<<< @/fixtures/rest-api/webhooks/delete-referenced-res.json

:::
