---
order: 21
title: 'Benutzer Zugangs-Token'
---

# Benutzer Zugangs-Token

## Auflisten

Erforderliche Berechtigung: `user_preferences.access_token`

`GET`-Anfrage gesendet: `/api/v1/user_access_token`

::: details

<<< @/fixtures/rest-api/user_access_token/get-res.json

:::

## Erstellen

Erforderliche Berechtigung: `user_preferences.access_token`

`POST`-Anfrage gesendet: `/api/v1/user_access_token`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/user_access_token/post-req.json

=== Response

<<< @/fixtures/rest-api/user_access_token/post-res.json

::: info
Der oben zurückgegebene `token` ist das API-Token. Dieser Wert wird einmalig
nach der Erstellung bereitgestellt und kann danach nicht mehr abgerufen werden.
:::

::::
:::::

## Löschen

Erforderliche Berechtigung: `user_preferences.access_token`

`DELETE`-Anfrage gesendet: `/api/v1/user_access_token/{id}`

::: details

Response:

<<< @/fixtures/rest-api/user_access_token/delete-id-res.json

:::
