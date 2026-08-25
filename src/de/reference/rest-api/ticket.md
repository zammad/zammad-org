---
order: 19
title: Ticket
---

# Ticket

::: warning
Ticket-Endpunkte hängen von den Gruppenberechtigungen ab und ob der Benutzer, den Sie
verwenden, ein **Agent** ist. Aus diesem Grund können Tickets unter Umständen nicht
verfügbar sein.
:::

::: tip
**Suppress notifications:** To create or update a ticket without triggering agent notifications (email and in-app), add
the following HTTP header to your request:

```plain
X-Zammad-Suppress-Notifications: true
```

This is useful for automated integrations that manage tickets via webhooks or triggers to avoid notification loops. The
header only affects admin and agent accounts and is ignored for customers.
:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/tickets`

::: details

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: details

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`POST`-Anfrage gesendet: `/api/v1/tickets`

::: tip
**On behalf of users**

If you want to create tickets on behalf of other users, use the `customer_id` attribute. This requires the `ticket.agent`
permission. Without it, `customer_id` is ignored and the ticket's **Customer** field is set to the current user. Use
`guess:{email address}` to save an API call if you don't know the user's ID or want to create the user in question
(`"customer_id": "guess:jane@doe.com"`).

When creating a ticket on behalf of a customer with an initial article, you **must** set `article.sender` to "Customer"
explicitly. Without this, the sender defaults to "Agent" (based on the current user's permission). This affects the
ticket's `create_article_sender_id` and the resulting contact timestamp calculations.

The same applies to articles added later via PUT: set sender explicitly there as well when acting on behalf of a customer.
Since the sender of an article cannot be changed after creation, it is important to set it correctly from the start.

For more details on the sender attribute, see [articles](/en/reference/rest-api/articles).

:::

::: tip
**Add mention subscription right away**

Add the `mentions` attribute to your ticket payload and provide an array of user ids to directly subscribe them during
ticket creation.

E.g.: `"mentions": [1, 5, 7, 8],`

:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/post-req.json

=== Response

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
The `sender` attribute of the initial article determines the ticket's `create_article_sender_id` and contact timestamps.
For the full list of article attributes and their behavior, see [articles](/en/reference/rest-api/articles).
:::

## Aktualisierung

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`PUT`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
Das obige Beispiel liefert einen Artikel. Dieser Artikel ist ein _neuer Artikel_ und
hat keine Auswirkungen auf bestehende Artikel.
:::

=== Response

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Anhänge hinzufügen**

Die Nutzlast von Anhängen ist identisch mit dem `POST`-Request, es wird stattdessen
lediglich `PUT` verwendet.
:::

## Löschen

Erforderliche Berechtigung: `admin`

`DELETE`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: danger

**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Tickets nicht rückgängig gemacht werden kann. Alle Daten (z.B.
Artikel & Anhänge) gehen dabei verloren.
:::

::: details

Response:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
