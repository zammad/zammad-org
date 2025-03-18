---
order: 3
title: Calendar
---

# Calendar

:::tip
Calendars belong to [Zammad's SLA calculation](/en/reference/rest-api/sla).
:::

## List

Required permission: `admin.calendar`

`GET`-Request sent: `/api/v1/calendars`

::: details Show response

<<< @/fixtures/rest-api/calendars/get-res.json

:::

## Show

Required permission: `admin.calendar`

`GET`-Request sent: `/api/v1/calendars/{id}`

::: details Show response

<<< @/fixtures/rest-api/calendars/get-id-res.json

:::

## Create

Required permission: `admin.calendar`

`POST`-Request sent: `/api/v1/calendars`

:::: details Show request/response

::: tabs key:req-res

=== Request

<<< @/fixtures/rest-api/calendars/post-req.json

=== Response

<<< @/fixtures/rest-api/calendars/post-res.json

:::
::::

## Update

Required permission: `admin.calendar`

`PUT`-Request sent: `/api/v1/calendars/{id}`

:::: details Show request/response

::: tabs key:req-res

=== Request

<<< @/fixtures/rest-api/calendars/post-id-req.json

=== Response

<<< @/fixtures/rest-api/calendars/post-id-res.json

:::
::::

## Delete

Required permission: `admin.calendar`

`DELETE`-Request sent: `/api/v1/calendars/{id}`

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
