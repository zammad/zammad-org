---
order: 2
title: Prioritäten
---

# Prioritäten

## Auflisten

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_priorities`

::: details Show response

<<< @/fixtures/rest-api/ticket_priorities/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_priorities/{id}`

::: details Show response

<<< @/fixtures/rest-api/ticket_priorities/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.object`

`POST`-Anfrage gesendet: `/api/v1/ticket_priorities`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_priorities/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_priorities/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.object`

`PUT`-Anfrage gesendet: `/api/v1/ticket_priorities/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_priorities/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_priorities/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.object`

`DELETE`-Anfrage gesendet: `/api/v1/ticket_priorities/{id}`

::: warning
**This is a permanent removal**

Please note that removing priorities cannot be undone.

Removing ticket priorities with references in tickets is not possible
via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider either setting said priority to `active: false` or adjust all
tickets with the to remove priority to another priority.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/ticket_priorities/delete-id-res.json

:::
