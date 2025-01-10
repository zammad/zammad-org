---
order: 2
title: 'Gemeinsame Entwürfe'
---

# Gemeinsame Entwürfe

## Anzeigen

Erforderliche Berechtigung: `ticket.agent`.

`GET`-Anfrage gesendet: `/api/v1/tickets/{ticket id}/shared_draft`

::: details Show response

<<< @/fixtures/rest-api/tickets/shared_draft/get-ticket-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent`.

`PUT`-Anfrage gesendet: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/put-ticket-id-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `ticket.agent`

`PATCH`-Anfrage gesendet: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-res.json

:::
::::

## Entfernen

Erforderliche Berechtigung: `ticket.agent`

`DELETE`-Anfrage gesendet: `/api/v1/tickets/{ticket id}/shared_draft`

::: details Show response

<<< @/fixtures/rest-api/tickets/shared_draft/delete-ticket-id-res.json

:::
