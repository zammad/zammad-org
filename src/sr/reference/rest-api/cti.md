---
order: 5
title: CTI
---

# Generic CTI

## Увод

This page describes the generic CTI API scopes and functionalities.

::: warning

- Authentication on this endpoint works fundamentally different compared to
  the rest of the API.
- API clients _do not_ work with the CTI endpoints unless explicitly stated
  by the client vendor!
- The CTI endpoints are relevant for PBX systems only.
:::

## Функције

Here's a small condensed list of the possibilities this CTI API provides.

### Долазнo

- Caller log functions for your agents.
- Blocking of caller IDs during signaling.

### Одлазнo

- Caller log functions for your agents.
- Set outbound caller IDs depending on the caller ID target.

### Endpoint

The endpoint can be found in the generic CTI integration and contains a
unique token which acts as authentication. Make sure to keep this endpoint
URL safe.

::: info
Generic CTI configuration and the correct endpoint can be found in your
Zammad in the admin interface under _System > Integrations > CTI (generic)_.

Please also note the there listed requirements and limitations.
All options that require returns (e.g. blocking, manipulating outgoing
caller IDs) rely on configurations within the Zammad CTI integration
page.
:::

::: tip
There are two options how to `POST` the relevant data to Zammad:

- JSON (recommended)
- Form-data
:::

### Events

There are several events in terms of an ongoing call. These actions always
come from your PBX system and may be:

- "newCall" event (initiation of a call)
- "hangup" event (call ending)
- "answer" event (aka picking up the phone)

In some situations Zammad may provide a return on your PBX calls (e.g. a
reject) if you blocked a specific caller. Zammad will never initiate
specific actions with your PBX. Zammad is a passive component in all
described cases.

### Коришћени примери

**Example:**
Below calls have been sent with the following configuration. This is
important for you to understand the responses we are showing here.

**Outbound:**

- Destination caller ID `4989*` set outbound caller ID `498999998145` with
  note "All from munich"
- Destination caller ID `4930*` set outbound caller ID `493023125877` "All
  from Berlin"

**Other settings:**

- Default caller ID for outbound calls `496990009111`

## New Call Event

### Уопштено

Доступни `атрибути` и <Badge type="info" text="примери" />:

`event` <Badge type="info" text="newCall"/>
: Tell Zammad there is a new call.

`from` <Badge type="info" text="4930555716000"/>
: Number that initiated the call. Can be `anonymous` as well.

`to` <Badge type="info" text="4930555716000"/>
: Number that is being called.

`direction` <Badge type="info" text="in"/>
: The call direction. If your agent initiates a call, this will be `out`. Calls
from external side to you are `in`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: An ID that is unique for the call. Zammad will use this ID to identify an
  existing call with following actions (e.g. like answering or hanging up).

`user` <Badge type="info" text="John Doe"/>
: The user(s) real name involved. You may have to provide array style (`[]`)
  params depending on the call method you choose. If the direction is `out`,
  this is the name of the calling person(s). If the direction is `in`, this
  is the name of the called person(s).

`queue` <Badge type="info" text="support"/>
: An optional queue name, this option is relevant for the caller log filter.
  This value is optional.

### Одлазнo

::::details

::: tabs key:cti

=== JSON

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.sh

=== Form-data

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req

Returns:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req.sh

:::
::::

### Долазнo

::::details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req

Returns:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req.sh

:::
::::

### Situation Specific Responses

Depending on the chosen call direction, Zammad will return either a
(optionally) configured call ID or (optionally) block a caller. If your
Zammad hasn't configured one or both options, the return will be empty.

:::info
This has to be supported by your PBX in order to work.
:::

#### Reject blocked caller IDs

If an incoming new call matches a to block number, Zammad will return the
following.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-blocked-res.json

If no to block number matches, Zammad will return the following.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

:::warning
Your PBX still needs to end the call (hangup event). Other wise the
call will not just appear within Zammad's caller log but also appear as
ringing call.
:::

#### Set specific outgoing caller ID

In case your instance has a matching overwriting caller ID configured,
Zammad will return the following payload.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-caller-id-res.json

If no overwrite match is found or you haven't configured anything, Zammad
will return the following.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

## Call Answer Event

### Уопштено

Доступни `атрибути` и <Badge type="info" text="примери" />:

`event` <Badge type="info" text="answer" />:
: Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
: Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
: Number that is being called.

`direction` <Badge type="info" text="in" />:
: The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: An ID that is unique for the call. Zammad will use this ID to identify an
  existing call with following actions (e.g. like answering or hanging up).

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad will look up for a user with given value, the following attributes will be evaluated in given order:
      - `user.phone`
      - `user.login`
      - `user.if`
    This value is optional.

`user` <Badge type="info" text="John Doe" />:
: The user(s) real name involved. You may have to provide array style (`[]`)
  params depending on the call method you choose. If the direction is `out`,
  this is the name of the calling person(s). If the direction is `in`, this is
  the name of the called person(s). This value is optional.

There are two options on how to `POST` the relevant data to Zammad.

### Одлазнo

::::details

::: tabs key:cti

=== JSON

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.sh

=== Form-data

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req

Returns:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req.sh

:::
::::

### Долазнo

::::details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req

Returns:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req.sh

:::
::::

## Call Hangup

### Уопштено

`event` <Badge type="info" text="hangup" />:
: Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
: Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
: Number that is being called.

`direction` <Badge type="info" text="in" />:
: The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: An ID that is unique for the call. Zammad will use this ID to identify an
  existing call with following actions (e.g. like answering or hanging up).

`cause`
:   This defines the reason of the hangup. Zammad evaluates the cause and indicates
    e.g. missed calls accordingly in the caller log. Possible values are:
    - `normalClearing` (one of the parties hung up after the call was established)
    - `busy` (the called party was busy)
    - `cancel` (the caller hung up before the called party picked up)
    - `noAnswer` (the called party rejected the call. E.g. through a DND setting)
    - `congestion` (the called party could not be reached)
    - `notFound` (the called number does not exist or called party is offline)
    - `forwarded` (the call was forwarded to a different party)

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad will look up for a user with given value, the following attributes will be evaluated in given order:
    - `user.phone`
    - `user.login`
    - `user.if`
    This value is optional.

### Одлазнo

::::details

::: tabs key:cti

=== JSON

`POST`-Request send:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.sh

=== Form-data

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req

Returns:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req.sh

:::
::::

### Долазнo

::::details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Sample curl command:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req.sh

:::
::::
