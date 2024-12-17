---
title: User Access Token
order: 2
---

# User Access Token

## List

Required permission: `user_preferences.access_token`

`GET`-Request sent: `/api/v1/user_access_token`

::: details Show response

<<< @/fixtures/rest-api/user_access_token/get-res.json

:::

## Create

Required permission: `user_preferences.access_token`

`POST`-Request sent: `/api/v1/user_access_token`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/user_access_token/post-req.json

=== Response

<<< @/fixtures/rest-api/user_access_token/post-res.json

::: info
Above returned `token` is the API token. This value is provided once
after creation and can't be retrieved after.
:::

::::
:::::

## Delete

Required permission: `user_preferences.access_token`

`DELETE`-Request sent: `/api/v1/user_access_token/{id}`

::: details Show response

Response:

<<< @/fixtures/rest-api/user_access_token/delete-id-res.json

:::
