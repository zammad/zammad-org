---
order: 10
title: Notification
---

# Online Notification

::: info
The availability of notification highly depends on the users
permission and chosen notification settings.

Please note that the best results are always achieved with _Agents_.
:::

## List

Required permission: `any`

`GET`-Request sent: `/api/v1/online_notifications?expand=true`

::: tip
Use the expand request to know the affected objects. Otherwise you'll
need to find out what ID stands for which object type.
:::

::: details

<<< @/fixtures/rest-api/online_notifications/get-res.json

:::

## Show

Required permission: `any`

`GET`-Request sent: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/get-id-res.json

:::

## Освежавање

Required permission: `any`

`PUT`-Request sent: `/api/v1/online_notifications/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/online_notifications/put-id-req.json

=== Response

<<< @/fixtures/rest-api/online_notifications/put-id-res.json

:::
::::

## Delete

Required permission: `any`

`DELETE`-Request sent: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/delete-id-res.json

:::

## Mark All as Read

Required permission: `any`

`POST`-Request sent: `/api/v1/online_notifications/mark_all_as_read`

::: details

<<< @/fixtures/rest-api/online_notifications/mark_all_as_read/post-res.json

:::
