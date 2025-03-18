---
order: 14
title: Rolle
---

# Rollen

## Auflisten

Erforderliche Berechtigung: `admin.role`

`GET` - Anfrage gesendet: `/api/v1/roles`

::: details Show response

<<< @/fixtures/rest-api/roles/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.role`

`GET` -Anfrage gesendet: `/api/v1/roles/{id}`

::: details Show response

<<< @/fixtures/rest-api/roles/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.role`

`POST` -Anfrage gesendet: `/api/v1/roles`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/post-req.json

=== Response

<<< @/fixtures/rest-api/roles/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.role`

`PUT` -Anfrage gesendet: `/api/v1/roles/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/put-id-req.json

=== Response

<<< @/fixtures/rest-api/roles/put-id-res.json

:::
::::
