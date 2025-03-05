---
order: 2
title: Status
---

# Status

::: warning
Creating, changing or removing states via below endpoints is not
recommended! You can do this in Zammad's UI. To do so, go to the
admin interface to _System > Objects > Ticket_.
:::

## Auflisten

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_states`

::: details Show response

<<< @/fixtures/rest-api/ticket_states/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.object` **oder** `ticket.agent` **oder**
`ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_states/{id}`

::: details Show response

<<< @/fixtures/rest-api/ticket_states/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.object`

`POST`-Anfrage gesendet: `/api/v1/ticket_states`

::: info
Der nachstehende Payload verwendet `state_type_id`, ein Instanz-spezifischer
Satz von IDs. Die Statustypen geben an, wie der Status funktionieren wird.

Da es keinen Endpunkt gibt, um diese abzurufen, verwenden Sie bitte die
[Rails Konsole](/de/reference/console).
:::

:::: details Show request/response

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

:::: details Show request/response

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
**This is a permanent removal**

Please note that removing ticket states cannot be undone.

Removing ticket states with references in tickets is not possible via
API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.

Consider either setting said state to `active: false` or adjust all
tickets with the to remove state to another state.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/ticket_states/delete-id-res.json

:::
