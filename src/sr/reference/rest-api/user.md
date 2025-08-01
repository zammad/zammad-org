---
order: 22
title: Корисник
---

# Корисник

::: info
Please note that below samples were provided with `admin` and
`ticket.agent` permissions. Some attributes / information may not be
available in specific situations.
:::

## Me - Current User

Required permission: any

`GET`-Request sent: `/api/v1/users/me`

::: details Show response

<<< @/fixtures/rest-api/users/me/get-res.json

:::

## List

Required permission: `ticket.agent` **or** `admin.user`

`GET`-Request sent: `/api/v1/users`

::: details Show response

<<< @/fixtures/rest-api/users/get-res.json

:::

## Show

Required permission: `ticket.agent` **or** `admin.user` **or**
`ticket.customer` (shared organization)

::: info
Technically, any listings will return user's own information only.
:::

`GET`-Request sent: `/api/v1/users/{id}`

::: details Show response

<<< @/fixtures/rest-api/users/get-user-id-res.json

:::

## Create

Required permission: `admin.user` **or** `ticket.agent`

`POST`-Request sent: `/api/v1/users`

::: tip
**This depends on permissions**

Agents can't set user passwords, roles or group permission. Instead
Zammad will apply the default sign up role. Check Zammad's admin interface
under _Manage > Roles_ and check which is selected as **Default at signup**.

Technically, unauthenticated user creation is possible if you manage
to provide the required CSRF token (out of scope of this
documentation). If you don't want that, consider
disabling user registration under _Settings > Security > Base_ by setting
**New user accounts** to no.
:::

::: tip
Unsure which attributes you can use or set? Run a GET query on any
fitting user existing in your instance already.
:::

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/post-req.json

=== Response

<<< @/fixtures/rest-api/users/post-res.json

:::
::::

## Освежавање

Required permission: `admin.user` **or** `ticket.agent`

`PUT`-Request sent: `/api/v1/users/{id}`

::: tip
**This depends on permissions**

Agents can't set user passwords, roles or group permission. Instead
Zammad will apply the default sign up role. Check Zammad's admin interface
under _Manage > Roles_ and check which is selected as **Default at signup**.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/put-id-req.json

=== Response

<<< @/fixtures/rest-api/users/put-id-res.json

:::
::::

## Delete

::: danger
**This is a permanent removal**

Please note that removing users cannot be undone. Zammad will also
remove references - thus potentially tickets!
:::

Technically, you can delete users via `/api/v1/users/{id}`. However, we
strongly encourage you to use the data privacy in Zammad's UI or the data
privacy endpoint instead (see section below). Using one of them makes sure
that related information like tickets are deleted as well.

### Via Data Privacy Endpoint

Required permission: `admin.data_privacy`

`POST`-Request sent: `/api/v1/data_privacy_task`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/post-privacy-task-req.json

=== Response

<<< @/fixtures/rest-api/users/post-privacy-task-res.json

:::
::::

### Via User Endpoint <Badge type="danger" text="not recommended" />

Required permission: `admin.user`

`DELETE`-Request sent: `/api/v1/users/{id}`

::: details Show response

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
