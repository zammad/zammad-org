---
order: 7
title: Organisation
---

# Organisation

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.organization`

::: info
Technisch können Kunden nur ihre eigene Organisation sehen, sofern zutreffend.
:::

`GET`-Anfrage gesendet: `/api/v1/organizations`

::: details Show response

<<< @/fixtures/rest-api/organizations/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.organization`

`GET`-Anfrage gesendet: `/api/v1/organizations/{id}`

::: info
Technisch können die betreffenden Benutzer nur ihre eigene Organisation sehen.
:::

::: details Show response

<<< @/fixtures/rest-api/organizations/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.organization`

`POST`-Anfrage gesendet: `/api/v1/organizations`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/post-req.json

=== Response

<<< @/fixtures/rest-api/organizations/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.organization`

`PUT`-Anfrage gesendet: `/api/v1/organizations/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/put-id-req.json

=== Response

<<< @/fixtures/rest-api/organizations/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.organization`

`DELETE`-Anfrage gesendet: `/api/v1/organizations/{id}`

::: danger
**This is a permanent removal**

Please note that removing organizations cannot be undone.

Removing organizations with references in e.g. activity streams or users
is not possible via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider using Zammad's Data Privacy feature via UI for
more control instead.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/organizations/delete-id-res.json

:::
