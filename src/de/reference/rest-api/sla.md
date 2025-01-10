---
order: 2
title: SLA
---

# Service-Level Agreements (SLA)

::: tip
SLAs hängen von [Zammads Kalender](/de/reference/rest-api/calendar) ab.
:::

## Auflisten

Erforderliche Berechtigung: `admin.sla`

`GET`-Anfrage gesendet: `/api/v1/slas`

::: details Show response

Response:

<<< @/fixtures/rest-api/slas/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.sla`

`GET` - Anfrage gesendet: `/api/v1/slas/{id}`

::: details Show response

<<< @/fixtures/rest-api/slas/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.sla`

`POST`-Anfrage gesendet: `/api/v1/slas`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/slas/post-req.json

=== Response

<<< @/fixtures/rest-api/slas/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.sla`

`PUT`-Anfrage gesendet: `/api/v1/slas/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/slas/put-id-req.json

=== Response

<<< @/fixtures/rest-api/slas/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.sla`

`DELETE`-Anfrage gesendet: `/api/v1/slas/{id}`

::: danger
**Dies ist eine dauerhafte Entfernung!**

Bitte beachten Sie, dass das Entfernen von SLA-Konfigurationen nicht rückgängig gemacht werden kann.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/slas/delete-id-res.json

:::
