---
order: 21
title: 'User access token'
---

# User access token

## Elenca

Permesso richiesto: `user_preferences.access_token`

Richiesta `GET` inviata: `/api/v1/user_access_token`

::: details

<<< @/fixtures/rest-api/user_access_token/get-res.json

:::

## Crea

Permesso richiesto: `user_preferences.access_token`

Richiesta `POST` inviata: `/api/v1/user_access_token`

::::: details

:::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/user_access_token/post-req.json

=== Risposta

<<< @/fixtures/rest-api/user_access_token/post-res.json

::: info
Il `token` restituito sopra è il token API. Questo valore viene fornito una volta
dopo la creazione e può.
:::

::::
:::::

## Elimina

Permesso richiesto: `user_preferences.access_token`

Richiesta `DELETE` inviata: `/api/v1/user_access_token/{id}`

::: details

Risposta:

<<< @/fixtures/rest-api/user_access_token/delete-id-res.json

:::
