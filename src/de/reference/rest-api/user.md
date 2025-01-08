---
order: 2
title: Benutzer
---

# Benutzer

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

## Auflisten

Required permission: `ticket.agent` **or** `admin.user`

`GET`-Request sent: `/api/v1/users`

::: details Show response

<<< @/fixtures/rest-api/users/get-res.json

:::

## Suche

Required permission: `ticket.agent` **or** `admin.user`

`GET`-Request sent: `/api/v1/users/search?query=organization.name:{search
string}&limit=10`

::: details Show response

<<< @/fixtures/rest-api/users/search/get-res.json

:::

## Anzeigen

Required permission: `ticket.agent` **or** `admin.user` **or**
`ticket.customer` (shared organization)

::: info
Technically, any listings will return user's own information only.
:::

`GET`-Request sent: `/api/v1/users/{id}`

::: details Show response

<<< @/fixtures/rest-api/users/get-user-id-res.json

:::

## Erstellen

Required permission: `admin.user` **or** `ticket.agent`

`POST`-Request sent: `/api/v1/users`

::: tip
**This depends on permissions**

Agents can't set user passwords, roles or group permission. Instead
Zammad will apply the default sign up role. Check Zammad's admin interface
under *Manage > Roles* and check which is selected as **Default at signup**.

Technically, unauthenticated user creation is possible if you manage
to provide the required CSRF token (out of scope of this
documentation). If you don't want that, consider
disabling user registration under *Settings > Security > Base* by setting
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

## Aktualisierung

Required permission: `admin.user` **or** `ticket.agent`

`PUT`-Request sent: `/api/v1/users/{id}`

::: tip
**This depends on permissions**

Agents can't set user passwords, roles or group permission. Instead
Zammad will apply the default sign up role. Check Zammad's admin interface
under *Manage > Roles* and check which is selected as **Default at signup**.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/put-id-req.json

=== Response

<<< @/fixtures/rest-api/users/put-id-res.json

:::
::::

## Löschen

Required permission: `admin.user`

`DELETE`-Request sent: `/api/v1/users/{id}`

::: danger
**This is a permanent removal**

Please note that removing users cannot be undone. Zammad will also
remove references - thus potentially tickets!

Removing users with references in e.g. activity streams is not possible
via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is *not* a bug.

Consider using Zammad's Data Privacy feature via UI for
more control instead (admin interface under *System > Data privacy*).
:::

::: details Show response

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
