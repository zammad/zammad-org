---
order: 10
title: Webhook
---

# Webhook

::: info
Webhooks are referenced by [triggers](/en/reference/rest-api/trigger) via
the `notification.webhook` perform action
(`{"notification.webhook": {"webhook_id": <id>}}`). Create the webhook
first, then point one or more triggers at its `id`.
:::

## Auflisten

Required permission: `admin.webhook`

`GET`-Request sent: `/api/v1/webhooks`

::: details

<<< @/fixtures/rest-api/webhooks/get-res.json

:::

::: info
`signature_token`, `basic_auth_password` and `bearer_token` are returned
as `**********` once they're set. The API never returns the stored
secrets. Fields that aren't set are returned as `null`.
:::

## Anzeigen

Required permission: `admin.webhook`

`GET`-Request sent: `/api/v1/webhooks/{id}`

::: details

<<< @/fixtures/rest-api/webhooks/get-id-res.json

:::

## Erstellen

Required permission: `admin.webhook`

`POST`-Request sent: `/api/v1/webhooks`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/webhooks/post-req.json

=== Response

<<< @/fixtures/rest-api/webhooks/post-res.json

:::

::::

::: info
`ssl_verify` matters for `https://` endpoints, set it `true` to actually
validate the endpoint's TLS certificate. It only makes sense to set it
`false` for a plain `http://` endpoint, which has no certificate to
verify in the first place.
:::

## Aktualisierung

Required permission: `admin.webhook`

`PUT`-Request sent: `/api/v1/webhooks/{id}`

Payload shape is identical to Create. The response is the updated record,
same shape as Show/Create with `updated_at` refreshed.

::: tip
A partial payload works too, e.g. `{"active": false}` to toggle just
that field.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/webhooks/put-id-req.json

=== Response

<<< @/fixtures/rest-api/webhooks/put-id-res.json

:::

::::

## Löschen

Required permission: `admin.webhook`

::: danger
**This is a permanent removal**

Please note that removing webhooks cannot be undone.
:::

A webhook that is still referenced by the `perform` action of another object
(e.g. a [trigger](/en/reference/rest-api/trigger)) can't be deleted. The API
responds with `422 Unprocessable Entity` and lists the referencing
objects. Remove the reference first.

`DELETE`-Request sent: `/api/v1/webhooks/{id}`

::: details

<<< @/fixtures/rest-api/webhooks/delete-id-res.json

:::

::: details

<<< @/fixtures/rest-api/webhooks/delete-referenced-res.json

:::
