---
order: 13
title: Prioritäten
---

# Prioritäten

## Auflisten

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_priorities`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_priorities/{id}`

::: details

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

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Prioritäten nicht rückgängig gemacht werden kann.

Das Entfernen von Ticketprioritäten mit Referenzen in Tickets ist nicht möglich
über die API - dies wird angezeigt durch
`"Fehler": "Kann nicht gelöscht werden, Objekt hat Referenzen."`. Dies ist _kein_ Fehler.

Erwägen Sie, entweder die besagte Priorität auf `active: false` zu setzen oder alle
Tickets mit der Priorität auf eine andere Priorität abzuändern.
:::

::: details

Response:

<<< @/fixtures/rest-api/ticket_priorities/delete-id-res.json

:::
