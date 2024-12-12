---
order: 2
title: CTI
---

# Generic CTI


## Introduction

This page describes the generic CTI API scopes and functionalities.

::: warning

* Authentication on this endpoint works fundamentally different compared to
  the rest of the API.
* API clients *do not* work with the CTI endpoints unless explicitly stated
  by the client vendor!
* The CTI endpoints are relevant for PBX systems only.
:::

## Features
Here's a small condensed list of the possibilities this CTI API
provides.

### Inbound

- Caller log functions for your agents.
- Blocking of caller IDs during signaling.

### Outbound

- Caller log functions for your agents.
- Set outbound caller IDs depending on the caller ID target.

### Endpoint

The endpoint can be found in the generic CTI integration and contains a
unique token which acts as authentication. Make sure to keep this
endpoint URL safe.

::: info
Generic CTI configuration and the correct endpoint can be found in your
Zammad in the admin interface under *System > Integrations > CTI (generic)*.

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

There are several events in terms of an ongoing call. These actions
always come from your PBX system and may be:

- "newCall" event (initiation of a call)
- "hangup" event (call ending)
- "answer" event (aka picking up the phone)

In some situations Zammad may provide a return on your PBX calls (e.g. a
reject) if you blocked a specific caller. Zammad will never initiate
specific actions with your PBX. Zammad is a passive component in all
described cases.

### Used Examples

**Example:**
Below calls have been sent with the following configuration. This is
important for you to understand the responses we are showing here.

**Outbound:**

- Destination caller ID `4989*` set outbound caller ID `498999998145`
  with note "All from munich"
- Destination caller ID `4930*` set outbound caller ID `493023125877`
  "All from Berlin"

**Other settings:**

- Default caller ID for outbound calls `496990009111`

## New Call Event

### General

Available `attributes` and <Badge type="info" text="sample data" />:

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

### Outbound

::::details Show examples

::: tabs key:cti

=== JSON

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

```json
{
   "event": "newCall",
   "from": "493023125741",
   "to": "492214710334",
   "direction": "out",
   "callId": "f4ebd2be-7b9a-4d58-94c2-eb06a3c2ce76",
   "user": "Lauren Brooks"
}
```

Response:

```json
{
   "action": "dial",
   "caller_id": "496990009111",
   "number": "492214710334"
}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "event": "newCall",
      "from": "493023125741",
      "to": "492214710334",
      "direction": "out",
      "callId": "f4ebd2be-7b9a-4d58-94c2-eb06a3c2ce76",
      "user": "Lauren Brooks"
   }'
```

=== Form-data

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

```
event:"newCall"
from:"493023125741"
to:"492214710334"
direction:"out"
callId:"f0871278-0600-4f5c-a746-bec3acf04f41"
user:"Lauren Brooks"
```

Returns:

```json
{
   "action": "dial",
   "caller_id": "496990009111",
   "number": "492214710334"
}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --form 'event="newCall"' \
   --form 'from="493023125741"' \
   --form 'to="492214710334"' \
   --form 'direction="out"' \
   --form 'callId="f0871278-0600-4f5c-a746-bec3acf04f41"' \
   --form 'user="Lauren Brooks"'
```

:::
::::


### Inbound

::::details Show examples

::: tabs key:cti

=== JSON

Payload:

```json
{
   "event": "newCall",
   "from": "493023125741",
   "to": "492214710334",
   "direction": "in",
   "callId": "307fa962-de8d-4ffc-817b-7f6993204159",
   "user": ["Lauren Brooks", "Ethan Kwan"]
}
```

Response:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "event": "newCall",
      "from": "493023125741",
      "to": "492214710334",
      "direction": "in",
      "callId": "307fa962-de8d-4ffc-817b-7f6993204159",
      "user": ["Lauren Brooks", "Ethan Kwan"]
   }'
```

=== Form-data

Payload:

```
event:"newCall"
from:"493023125741"
to:"492214710334"
direction:"in"
callId:"25641e3f-3317-4c48-80b3-fc573c7ffe2b"
user[]:"Lauren Brooks"
user[]:"Ethan Kwan"
```

Returns:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --form 'event="newCall"' \
   --form 'from="493023125741"' \
   --form 'to="492214710334"' \
   --form 'direction="in"' \
   --form 'callId="25641e3f-3317-4c48-80b3-fc573c7ffe2b"' \
   --form 'user[]="Lauren Brooks"' \
   --form 'user[]="Ethan Kwan"'
```
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

If an incoming new call matches a to block number, Zammad will return
the following.

```json
{
  "action": "reject",
  "reason": "busy"
}
```

If no to block number matches, Zammad will return the following.

```json
{}
```

:::warning
Your PBX still needs to end the call (hangup event). Other wise the
call will not just appear within Zammad's caller log but also appear as
ringing call.
:::

#### Set specific outgoing caller ID

In case your instance has a matching overwriting caller ID configured,
Zammad will return the following payload.

```json
{
  "action": "dial",
  "callerId": "493055571642",
  "number": "491711234567890"
}
```

If no overwrite match is found or you haven't configured anything,
Zammad will return the following.

```json
{}
```

## Call Answer Event

### General

Available `attributes` and <Badge type="info" text="sample data" />:

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
: Zammad will look up for a user with given value, the following attributes
  will be evaluated in given order:
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

### Outbound

::::details Show examples

::: tabs key:cti

=== JSON

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

```json
{
   "event": "answer",
   "from": "493023125741",
   "to": "492214710334",
   "direction": "out",
   "callId": "9f1840cb-8be9-4d3a-8200-3da2937085f0",
   "caller": "Lauren Brooks"
}
```

Response:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "event": "answer",
      "from": "493023125741",
      "to": "492214710334",
      "direction": "out",
      "callId": "9f1840cb-8be9-4d3a-8200-3da2937085f0",
      "caller": "Lauren Brooks"
   }'
```

=== Form-data

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

```
event:"answer"
from:"493023125741"
to:"492214710334"
direction:"out"
callId:"371e2cd7-67ff-4fd9-892b-030c8d128fb1"
caller[]:"Lauren Brooks"
caller[]:"Emily Tran"
```

Returns:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --form 'event="answer"' \
   --form 'from="493023125741"' \
   --form 'to="492214710334"' \
   --form 'direction="out"' \
   --form 'callId="371e2cd7-67ff-4fd9-892b-030c8d128fb1"' \
   --form 'caller[]="Lauren Brooks"' \
   --form 'caller[]="Emily Tran"'
```
:::
::::

### Inbound

::::details Show examples

::: tabs key:cti

=== JSON

Payload:

```json
{
   "event": "answer",
   "from": "493023125741",
   "to": "492214710334",
   "direction": "in",
   "callId": "307fa962-de8d-4ffc-817b-7f6993204159",
   "answeringNumber": "emily@fastlane.inc",
   "caller": ["Lauren Brooks", "Emily Tran"]
}
```

Response:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "event": "answer",
      "from": "493023125741",
      "to": "492214710334",
      "direction": "in",
      "callId": "307fa962-de8d-4ffc-817b-7f6993204159",
      "answeringNumber": "emily@fastlane.inc",
      "caller": ["Lauren Brooks", "Emily Tran"]
   }'
```
=== Form-data

Payload:

```
event:"answer"
from:"493023125741"
to:"492214710334"
direction:"in"
callId:"61868f1e-2171-4313-970b-25982f0c5ce1"
answeringNumber:"emily@fastlane.inc"
caller="Emily Tran"
```

Returns:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --form 'event="answer"' \
   --form 'from="493023125741"' \
   --form 'to="492214710334"' \
   --form 'direction="in"' \
   --form 'callId="61868f1e-2171-4313-970b-25982f0c5ce1"' \
   --form 'answeringNumber="emily@fastlane.inc"' \
   --form 'caller="Emily Tran"'
```
:::
::::

## Call Hangup

### General

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
: This defines the reason of the hangup. Zammad evaluates the cause and
  indicates e.g. missed calls accordingly in the caller log.
  Possible values are:
  - `normalClearing` (one of the parties hung up after the call was established)
  - `busy` (the called party was busy)
  - `cancel` (the caller hung up before the called party picked up)
  - `noAnswer` (the called party rejected the call. E.g. through a DND setting)
  - `congestion` (the called party could not be reached)
  - `notFound` (the called number does not exist or called party is offline)
  - `forwarded` (the call was forwarded to a different party)

`answeringNumber` <Badge type="info" text="493055571600" />:
: Zammad will look up for a user with given value, the following attributes
  will be evaluated in given order:
  - `user.phone`
  - `user.login`
  - `user.if`
  This value is optional.

### Outbound

::::details Show examples

::: tabs key:cti

=== JSON

`POST`-Request send:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

```json
{
   "event": "hangup",
   "from": "493023125741",
   "to": "492214710334",
   "direction": "out",
   "callId": "f4ebd2be-7b9a-4d58-94c2-eb06a3c2ce76",
   "cause": "cancel"
}
```

Response:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "event": "hangup",
      "from": "493023125741",
      "to": "492214710334",
      "direction": "out",
      "callId": "f4ebd2be-7b9a-4d58-94c2-eb06a3c2ce76",
      "cause": "cancel"
   }'
```

=== Form-data

`POST`-Request sent:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

```
event:"hangup"
from:"493023125741"
to:"492214710334"
direction:"out"
callId:"da7cf8b8-2de2-4120-93c8-7db1f55225dc"
cause:"cancel"
```

Returns:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --form 'event="hangup"' \
   --form 'from="493023125741"' \
   --form 'to="492214710334"' \
   --form 'direction="out"' \
   --form 'callId="da7cf8b8-2de2-4120-93c8-7db1f55225dc"' \
   --form 'cause="cancel"'
```
:::
::::

### Inbound

::::details Show examples

::: tabs key:cti

=== JSON

Payload:

```json
{
   "event": "hangup",
   "from": "493023125741",
   "to": "492214710334",
   "direction": "in",
   "callId": "307fa962-de8d-4ffc-817b-7f6993204159",
   "answeringNumber": "emily@fastlane.inc",
   "cause": "normalClearing"
}
```

Response:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "event": "hangup",
      "from": "493023125741",
      "to": "492214710334",
      "direction": "in",
      "callId": "307fa962-de8d-4ffc-817b-7f6993204159",
      "answeringNumber": "emily@fastlane.inc",
      "cause": "normalClearing"
   }'
```

=== Form-data

Payload:

```
event:"hangup"
from:"493023125741"
to:"492214710334"
direction:"in"
callId:"2d77882f-68df-40f0-8c62-b642589c00bc"
answeringNumber:"emily@fastlane.inc",
cause:"normalClearing"
```

Response:

```json
{}
```

Sample curl command:

```sh
$ curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
   --form 'event="hangup"' \
   --form 'from="493023125741"' \
   --form 'to="492214710334"' \
   --form 'direction="in"' \
   --form 'callId="2d77882f-68df-40f0-8c62-b642589c00bc"' \
   --form 'answeringNumber="emily@fastlane.inc"' \
   --form 'cause="normalClearing"'
```
:::
::::