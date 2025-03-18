---
order: 20
title: Zeiterfassung
---

# Zeiterfassung

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.time_accounting`

`GET`-Anfrage gesendet: `/api/v1/tickets/{ticket id}/time_accountings`

::: details Show response

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.time_accounting`

`GET`-Anfrage gesendet: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details Show response

<<< @/fixtures/rest-api/tickets/time_accountings/get-ticket-id-timeaccounting-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.time_accounting`

`POST`-Anfrage gesendet: `/api/v1/tickets/{ticket id}/time_accountings`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/post-ticket-id-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.time_accounting`

`PUT`-Anfrage gesendet: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-req.json

=== Response

<<< @/fixtures/rest-api/tickets/time_accountings/put-ticket-id-timeaccounting-id-res.json

:::
::::

## Entfernen

Erforderliche Berechtigung: `admin.time_accounting`

`DELETE`-Anfrage gesendet: `/api/v1/tickets/{ticket
id}/time_accountings/{timeaccounting id}`

::: details Show response

Response:

<<< @/fixtures/rest-api/tickets/time_accountings/delete-ticket-id-timaccounting-id-res.json

:::
