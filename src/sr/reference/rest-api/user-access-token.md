---
order: 21
title: 'Приступни токен корисника'
---

# Приступни токен корисника

## Преглед листе

Потребна дозвола: `user_preferences.access_token`

`GET`-захтев послат: `/api/v1/user_access_token`

::: details

<<< @/fixtures/rest-api/user_access_token/get-res.json

:::

## Креирај

Потребна дозвола: `user_preferences.access_token`

`POST`-захтев послат: `/api/v1/user_access_token`

::::: details

:::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/user_access_token/post-req.json

=== Одговор

<<< @/fixtures/rest-api/user_access_token/post-res.json

::: info
Горе наведени враћени `token` је API токен. Ова вредност се даје једном
након креирања и не може се касније повући.
:::

::::
:::::

## Обриши

Потребна дозвола: `user_preferences.access_token`

`DELETE`-захтев послат: `/api/v1/user_access_token/{id}`

::: details

Одговор:

<<< @/fixtures/rest-api/user_access_token/delete-id-res.json

:::
