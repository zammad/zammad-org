---
order: 2
title: Benutzer
---

# Benutzer

::: info
Bitte beachten Sie, dass die folgenden Beispiele mit den Berechtigungen `admin` und
`ticket.agent` erstellt wurden. Einige Attribute/Informationen sind andernfalls möglicherweise nicht
verfügbar.
:::

## Ich - Aktueller Benutzer

Erforderliche Berechtigung: beliebig

`GET`-Anfrage gesendet: `/api/v1/users/me`

::: details Show response

<<< @/fixtures/rest-api/users/me/get-res.json

:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.user`

`GET`-Anfrage gesendet: `/api/v1/users`

::: details Show response

<<< @/fixtures/rest-api/users/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.user` **oder**
`ticket.customer` (teilende Organisation)

::: info
Technisch gesehen werden bei allen Auflistungen nur die Informationen des Benutzers selbst angezeigt.
:::

`GET`- Anfrage gesendet: `/api/v1/users/{id}`

::: details Show response

<<< @/fixtures/rest-api/users/get-user-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.user` **oder** `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/users`

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
Sind Sie unsicher, welche Attribute Sie verwenden oder einstellen können? Führen Sie eine GET-Abfrage für einen
Benutzer aus, der bereits in Ihrer Instanz vorhanden ist.
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

Erforderliche Berechtigung: `admin.user` **oder** `ticket.agent`

`PUT`-Anfrage gesendet: `/api/v1/users/{id}`

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

## Löschen

Erforderliche Berechtigung: `admin.user`

`DELETE`-Anfrage gesendet: `/api/v1/users/{id}`

::: danger
**This is a permanent removal**

Please note that removing users cannot be undone. Zammad will also
remove references - thus potentially tickets!

Removing users with references in e.g. activity streams is not possible
via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider using Zammad's Data Privacy feature via UI for
more control instead (admin interface under _System > Data privacy_).
:::

::: details Show response

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
