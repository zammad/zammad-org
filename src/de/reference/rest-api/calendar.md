---
order: 2
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

**This is a permanent removal**:

Please note that removing Calendar configurations cannot be undone.

Removing calendars with references in SLA configurations is not possible
via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is _not_ a bug.
:::

::: details Show response

<<< @/fixtures/rest-api/calendars/delete-id-res.json

:::
