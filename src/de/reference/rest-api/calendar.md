---
order: 3
title: Kalender
---

# Kalender

:::tip
Kalender gehören zu [Zammads SLA-Berechnung](/de/reference/rest-api/sla).
:::

## Auflisten

Erforderliche Berechtigung: `admin.calendar`

`GET`-Anfrage gesendet: `/api/v1/calendars`

::: details Show response

<<< @/fixtures/rest-api/calendars/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.calendar`

`GET`-Anfrage gesendet: `/api/v1/calendars/{id}`

::: details Show response

<<< @/fixtures/rest-api/calendars/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.calendar`

`POST`-Anfrage gesendet: `/api/v1/calendars`

:::: details Show request/response

::: tabs key:req-res

=== Request

<<< @/fixtures/rest-api/calendars/post-req.json

=== Response

<<< @/fixtures/rest-api/calendars/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.calendar`

`PUT`-Anfrage gesendet: `/api/v1/calendars/{id}`

:::: details Show request/response

::: tabs key:req-res

=== Request

<<< @/fixtures/rest-api/calendars/post-id-req.json

=== Response

<<< @/fixtures/rest-api/calendars/post-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.calendar`

`DELETE`-Anfrage gesendet: `/api/v1/calendars/{id}`

::: danger

**Dies ist eine dauerhafte Entfernung**:

Bitte beachten Sie, dass das Entfernen von Kalenderkonfigurationen nicht rückgängig gemacht werden kann.

Das Entfernen von Kalendern mit Referenzen in SLA-Konfigurationen ist nicht möglich
über die API - dies wird angezeigt durch
`"error": "Can't delete, object has references."`. Dies ist _kein_ Fehler.
:::

::: details Show response

<<< @/fixtures/rest-api/calendars/delete-id-res.json

:::
