---
order: 17
title: Status
---

# Status

::: warning
Das Erstellen, Ändern oder Entfernen von Status über die unten aufgeführten Endpunkte wird nicht
empfohlen! Sie können dies in der Benutzeroberfläche von Zammad tun. Gehen Sie dazu in der
Verwaltungsoberfläche zu _System > Objekte > Ticket_.
:::

## Auflisten

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_states`

::: details

<<< @/fixtures/rest-api/ticket_states/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_states/{id}`

::: details

<<< @/fixtures/rest-api/ticket_states/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.object`

`POST`-Anfrage gesendet: `/api/v1/ticket_states`

::: info
Below payload makes use of `state_type_id` which is a instance
specific set of IDs. State types indicate how the state will work.

As there's no endpoint for retrieving these, please use the
[Rails console](/en/reference/console).
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/post-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.object`

`PUT`-Anfrage gesendet: `/api/v1/ticket_states/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_states/put-id-req.json

=== Response

<<< @/fixtures/rest-api/ticket_states/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.object`

`DELETE`-Anfrage gesendet: `/api/v1/ticket_states/{id}`

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Ticket-Status nicht rückgängig gemacht werden kann.

Das Entfernen von Ticket-Status mit Referenzen in Tickets ist nicht möglich über
API - dies wird angezeigt durch
`"Fehler": "Kann nicht gelöscht werden, Objekt hat Referenzen."`. Dies ist _kein_ Fehler.

Erwägen Sie, entweder den besagten Status auf `active: false` zu setzen oder alle
Tickets mit dem Status auf einen anderen Status abzuändern.
:::

::: details

Response:

<<< @/fixtures/rest-api/ticket_states/delete-id-res.json

:::
