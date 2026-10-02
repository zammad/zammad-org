---
order: 10
title: Окидач
---

# Окидач

::: info
Triggers can run a `notification.webhook` action that references a
[webhook](/en/reference/rest-api/webhook) by id
(`{"notification.webhook": {"webhook_id": <id>}}`) instead of, or
alongside, `notification.email`. Create the webhook first, then point
the trigger's perform action at its `id`.
:::

## Преглед листе

Required permission: `admin.trigger`

`GET`-Request sent: `/api/v1/triggers`

::: details

<<< @/fixtures/rest-api/triggers/get-res.json

:::

::: info
`recipient: "article_last_sender"` emails whoever wrote the triggering
article. In this example that is always the customer, because the
condition requires `article.sender_id` to be `2` (Customer). If an agent
wrote the article, the agent would receive the email instead. Use
`recipient: "ticket_customer"` (see Create below) to always target the
customer regardless of who performed the action.
:::

## Прикажи

Required permission: `admin.trigger`

`GET`-Request sent: `/api/v1/triggers/{id}`

::: details

<<< @/fixtures/rest-api/triggers/get-id-res.json

:::

## Креирај

Required permission: `admin.trigger`

`POST`-Request sent: `/api/v1/triggers`

`condition` accepts two shapes: a flat object keyed by field name (as shown
in the List example above, matching Zammad's stock triggers) and the
explicit `{"operator": "AND", "conditions": [...]}` form used below.

In the example below, closing a ticket results in the ticket's customer
receiving a confirmation email, because `recipient: "ticket_customer"`
always resolves to the customer regardless of who performed the closing
action.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/triggers/post-req.json

=== Response

<<< @/fixtures/rest-api/triggers/post-res.json

:::

::::

## Освежавање

Required permission: `admin.trigger`

`PUT`-Request sent: `/api/v1/triggers/{id}`

Payload shape is identical to Create. The response is the updated record,
same shape as Show/Create with `updated_at` refreshed.

::: tip
A partial payload works too, e.g. `{"active": false}` to toggle just
that field. To update a trigger by name, look up its `id` via
`GET /api/v1/triggers` first, then send the `PUT` request to
`/api/v1/triggers/{id}`.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/triggers/put-id-req.json

=== Response

<<< @/fixtures/rest-api/triggers/put-id-res.json

:::

::::

## Обриши

Required permission: `admin.trigger`

::: danger
**This is a permanent removal**

Please note that removing triggers cannot be undone.
:::

`DELETE`-Request sent: `/api/v1/triggers/{id}`

::: details

<<< @/fixtures/rest-api/triggers/delete-id-res.json

:::
