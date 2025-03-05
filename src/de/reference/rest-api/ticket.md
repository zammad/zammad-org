---
order: 2
title: Ticket
---

# Ticket

:::warning
Ticket-Endpunkte hängen von den Gruppenberechtigungen ab und ob der Benutzer, den Sie
verwenden, ein **Agent** ist. Aus diesem Grund können Tickets unter Umständen nicht
verfügbar sein.
:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/tickets`

:::details Show response

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: details Show response

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`POST`-Anfrage gesendet: `/api/v1/tickets`

::: tip
**On behalf of users**

If you want to create tickets on behalf of other users, use the
`customer_id` attribute. `ticket.agent` is mandatory for this. Use
`guess:{email address}` to save an API call if you don't know the
user's ID or want to create the user in question
(`"customer_id": "guess:jane@doe.com"`).

**Add mention subscription right away**:

Add the `mentions` attribute to your ticket payload and provide an
array of user ids to directly subscribe them during ticket creation.

_E.g.:_ `"mentions": [1, 5, 7, 8],`

:::

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/post-req.json

=== Response

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
Weitere Artikel-Attribute und Optionen finden Sie unter
[Artikel](/de/reference/rest-api/articles).
:::

## Aktualisierung

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`PUT`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
Above example provides an article. This article is a _new article_ and
does not affect any existing ones.
:::

=== Response

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Anhänge hinzufügen**

Der Payload von Anhängen ist identisch mit dem `POST`-Request, es wird stattdessen
lediglich `PUT` verwendet.
:::

## Löschen

Erforderliche Berechtigung: `admin`

`DELETE`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: danger

**This is a permanent removal**:

Please note that removing tickets cannot be undone. All data (e.g.
articles & attachments) will be lost.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
