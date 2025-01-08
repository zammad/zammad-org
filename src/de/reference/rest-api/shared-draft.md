---
order: 2
title: 'Shared Drafts'
---

# Shared Drafts

## Anzeigen

Required permission: `ticket.agent`.

`GET`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

::: details Show response

<<< @/fixtures/rest-api/tickets/shared_draft/get-ticket-id-res.json

:::

## Erstellen

Required permission: `ticket.agent`.

`PUT`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

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

`PATCH`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/shared_draft/patch-ticket-id-res.json

:::
::::

## Remove

Erforderliche Berechtigung: `ticket.agent`

`DELETE`-Request sent: `/api/v1/tickets/{ticket id}/shared_draft`

::: details Show response

<<< @/fixtures/rest-api/tickets/shared_draft/delete-ticket-id-res.json

:::
