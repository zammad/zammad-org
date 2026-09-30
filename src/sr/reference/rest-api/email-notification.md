---
order: 10
title: 'Email notification'
---

# Email notification

::: info
This page covers the system's outbound _notification_ email
configuration: the SMTP (or local MTA) settings Zammad uses to send its
own internal notifications, like "you were assigned a ticket", plus the
local sender identity (`EmailAddress`) that gets attached to it. This is
distinct from a ticket mailbox / support-inbox channel, which is a
separate feature not covered by this page.
:::

## Преглед листе

Required permission: `admin.channel_email`

`GET`-Request sent: `/api/v1/channels_email`

This is a combined index: it returns the notification channel(s), the ticket
mailbox channel(s) and the local sender addresses in one response.  The
response below is trimmed to the fields relevant to notification email
configuration.

::: details

<<< @/fixtures/rest-api/email_notification/get-res.json

:::

::: info
Only one channel can be `active: true` per notification setup at a time.
Configuring a new one (see _Configure_ below) automatically deactivates
whichever one was previously active. In the response above, `sendmail`
(id `2`) is now `active: false` because `smtp` (id `1`) was configured
afterward.
:::

## Configure

Required permission: `admin.channel_email`

`POST`-Request sent: `/api/v1/channels_email_notification`

::: info
Pass the adapter settings in a top-level `options` key as shown below.
Other key names, such as `new_configuration` (the parameter name of the
internal service class `Service::System::SetEmailNotificationConfiguration`),
are not rejected with a validation error. The request fails with an
unhandled `undefined method 'downcase' for nil` error instead.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/post-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/post-res.json

:::

::::

::: info
This call does double duty: it tests the connection live, sending a real
test email as a side effect, and if the test succeeds, saves the
configuration as the active notification channel in the same call. There
is no separate "save" step; `notification_channel_ids` in
`/api/v1/channels_email` immediately reflects the new channel.

If the connection can't be established, the response is `200 OK` with
`result: invalid` and the saved configuration is left untouched.
:::

::: details

<<< @/fixtures/rest-api/email_notification/post-invalid-connection-res.json

:::

::: info
`POST /api/v1/channels_email_probe` is not an alternative to this
endpoint for a notification-only setup. It always validates a _full_
inbound and outbound mailbox (`EmailHelper::Probe.full`). Sending
outbound-only SMTP settings to it returns
`{"result": "failed", "reason": "inbound failed"}`, even when the
outbound settings are correct.
:::

::: details

<<< @/fixtures/rest-api/email_notification/probe-outbound-only-res.json

:::

## Sender address

The local sender identity used for outbound notification email is managed as
an `EmailAddress` resource.

### Преглед листе

Required permission: `admin.channel_email` **or** `ticket.agent`

`GET`-Request sent: `/api/v1/email_addresses`

Returns an array of objects, each shaped like the single object shown in the
_Show_ response below.

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/get-res.json

:::

### Прикажи

Required permission: `admin.channel_email` **or** `ticket.agent`

`GET`-Request sent: `/api/v1/email_addresses/{id}`

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/get-id-res.json

:::

### Креирај

Required permission: `admin.channel_email`

`POST`-Request sent: `/api/v1/email_addresses`

::: info
`channel_id` is a reference, not a validation target: an ID that doesn't
exist is accepted, and the address is then stored with `channel_id: null`
and `active: false`. Addresses are commonly attached to a ticket mailbox
channel rather than to the notification channel.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/email_addresses/post-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/email_addresses/post-res.json

:::

::::

### Освежавање

Required permission: `admin.channel_email`

`PUT`-Request sent: `/api/v1/email_addresses/{id}`

Payload shape is identical to Create. Sending the full Create payload to an
existing address's `id` updates that record in place. It doesn't create a
duplicate. Response is the updated record, same shape as the Create response
above.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/email_addresses/put-id-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/email_addresses/put-id-res.json

:::

::::

### Обриши

Required permission: `admin.channel_email`

::: danger
**This is a permanent removal**

Please note that removing email addresses cannot be undone.

Groups that use the deleted address as their sender address
(`email_address_id`) are reset to no sender address.
:::

`DELETE`-Request sent: `/api/v1/email_addresses/{id}`

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/delete-id-res.json

:::
