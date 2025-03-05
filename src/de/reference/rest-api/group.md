---
order: 2
title: Gruppe
---

# Gruppe

::: info

- Please note that `follow_up_possible` may not work as expected. The
  possible values are `yes` or `new_ticket`!
- If you want to create or update **subgroups**, use `::` as delimiter
  for the names. You also have to name the complete hierarchy in the
  name. Example: `Sales::Europe::South`
:::

## Auflisten

Erforderliche Berechtigung: `admin.group`

`GET`-Anfrage gesendet: `/api/v1/groups`

::: details Show response

<<< @/fixtures/rest-api/groups/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.group`

`GET`-Anfrage gesendet: `/api/v1/groups/{id}`

::: details Show response

<<< @/fixtures/rest-api/groups/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.group`

`POST`-Anfrage gesendet: `/api/v1/groups`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/post-req.json

=== Response

<<< @/fixtures/rest-api/groups/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.group`

`PUT`-Anfrage gesendet: `/api/v1/groups/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/put-id-req.json

=== Response

<<< @/fixtures/rest-api/groups/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.group`

`DELETE`-Anfrage gesendet: `/api/v1/groups/{id}`

::: danger

**This is a permanent removal**:

Please note that removing groups cannot be undone.

Removing organizations with references in e.g. activity streams or
tickets is not possible via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider setting affected groups to inactive instead or ensure to move
all existing tickets to new groups.

:::

::: details Show response

<<< @/fixtures/rest-api/groups/delete-id-res.json

:::
