---
order: 21
title: 'Token de acesso do usuário'
---

# Token de acesso do usuário

## Listar

Permissão necessária: `user_preferences.access_token`

Solicitação `GET` enviada: `/api/v1/user_access_token`

::: details

<<< @/fixtures/rest-api/user_access_token/get-res.json

:::

## Criar

Permissão necessária: `user_preferences.access_token`

Solicitação `POST` enviada: `/api/v1/user_access_token`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/user_access_token/post-req.json

=== Response

<<< @/fixtures/rest-api/user_access_token/post-res.json

::: info
O `token` retornado acima é o token de API. Esse valor é fornecido uma vez
após a criação e não pode ser recuperado depois.
:::

::::
:::::

## Excluir

Permissão necessária: `user_preferences.access_token`

Solicitação `DELETE` enviada: `/api/v1/user_access_token/{id}`

::: details

Response:

<<< @/fixtures/rest-api/user_access_token/delete-id-res.json

:::
