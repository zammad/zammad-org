---
order: 2
title: States
---

# States

::: warning
Creating, changing or removing states via below endpoints is not
recommended! You can do this in Zammad's UI. To do so, go to the
admin interface to *System > Objects > Ticket*.
:::

## List

Required permission: `admin.object` **or** `ticket.agent` **or**
`ticket.customer`

`GET`-Request sent: `/api/v1/ticket_states`

::: details Show response

```json
# HTTP-Code 200 Ok

[
   {
      "id": 1,
      "state_type_id": 1,
      "name": "new",
      "next_state_id": null,
      "ignore_escalation": false,
      "default_create": true,
      "default_follow_up": false,
      "note": null,
      "active": true,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.504Z",
      "updated_at": "2021-11-03T11:51:13.520Z"
   },
   {
      "id": 2,
      "state_type_id": 2,
      "name": "open",
      "next_state_id": null,
      "ignore_escalation": false,
      "default_create": false,
      "default_follow_up": true,
      "note": null,
      "active": true,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.518Z",
      "updated_at": "2021-11-03T11:51:13.518Z"
   },
   {
      "id": 3,
      "state_type_id": 3,
      "name": "pending reminder",
      "next_state_id": null,
      "ignore_escalation": true,
      "default_create": false,
      "default_follow_up": false,
      "note": null,
      "active": true,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.528Z",
      "updated_at": "2021-11-03T11:51:13.528Z"
   },
   {
      "id": 4,
      "state_type_id": 5,
      "name": "closed",
      "next_state_id": null,
      "ignore_escalation": true,
      "default_create": false,
      "default_follow_up": false,
      "note": null,
      "active": true,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.535Z",
      "updated_at": "2021-11-03T11:51:13.535Z"
   },
   {
      "id": 5,
      "state_type_id": 6,
      "name": "merged",
      "next_state_id": null,
      "ignore_escalation": true,
      "default_create": false,
      "default_follow_up": false,
      "note": null,
      "active": true,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.540Z",
      "updated_at": "2021-11-03T11:51:13.540Z"
   },
   {
      "id": 6,
      "state_type_id": 7,
      "name": "removed",
      "next_state_id": null,
      "ignore_escalation": true,
      "default_create": false,
      "default_follow_up": false,
      "note": null,
      "active": false,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.546Z",
      "updated_at": "2021-11-03T11:51:13.546Z"
   },
   {
      "id": 7,
      "state_type_id": 4,
      "name": "pending close",
      "next_state_id": 4,
      "ignore_escalation": true,
      "default_create": false,
      "default_follow_up": false,
      "note": null,
      "active": true,
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2021-11-03T11:51:13.553Z",
      "updated_at": "2021-11-03T11:51:13.553Z"
   }
]
```
:::

## Show

Required permission: `admin.object` **or** `ticket.agent` **or**
`ticket.customer`

`GET`-Request sent: `/api/v1/ticket_states/{id}`

::: details Show response

```json
# HTTP-Code 200 Ok

{
   "id": 4,
   "state_type_id": 5,
   "name": "closed",
   "next_state_id": null,
   "ignore_escalation": true,
   "default_create": false,
   "default_follow_up": false,
   "note": null,
   "active": true,
   "updated_by_id": 1,
   "created_by_id": 1,
   "created_at": "2021-11-03T11:51:13.535Z",
   "updated_at": "2021-11-03T11:51:13.535Z"
}
```
:::

## Create

Required permission: `admin.object`

`POST`-Request sent: `/api/v1/ticket_states`

::: info
Below payload makes use of `state_type_id` which is a instance
specific set of IDs. State types indicate how the state will work.

As there's no endpoint for retrieving these, please use the
[rails console](/en/reference/console).
:::

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
   "name": "in progress",
   "state_type_id": 2,
   "ignore_escalation": true,
   "active": true
}
```

=== Response

```json
# HTTP-Code 201 Created

{
   "id": 8,
   "state_type_id": 2,
   "name": "in progress",
   "next_state_id": null,
   "ignore_escalation": true,
   "default_create": false,
   "default_follow_up": false,
   "note": null,
   "active": true,
   "updated_by_id": 3,
   "created_by_id": 3,
   "created_at": "2021-11-08T15:08:21.671Z",
   "updated_at": "2021-11-08T15:08:21.671Z"
}
```
:::
::::

## Update

Required permission: `admin.object`

`PUT`-Request sent: `/api/v1/ticket_states/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
   "note": "State created & updated via API"
}
```

=== Response

```json
# HTTP-Code 200 Ok

{
   "id": 8,
   "note": "State created &amp; updated via API",
   "updated_by_id": 3,
   "name": "in progress",
   "state_type_id": 2,
   "next_state_id": null,
   "ignore_escalation": true,
   "default_create": false,
   "default_follow_up": false,
   "active": true,
   "created_by_id": 3,
   "created_at": "2021-11-08T15:08:21.671Z",
   "updated_at": "2021-11-08T15:13:32.370Z"
}
```

:::
::::

## Delete

Required permission: `admin.object`

`DELETE`-Request sent: `/api/v1/ticket_states/{id}`

::: danger
**This is a permanent removal**

Please note that removing ticket states cannot be undone.

Removing ticket states with references in tickets is not possible via
API - this will be indicated by
`"error": "Can't delete, object has references."`. This is *not* a bug.

Consider either setting said state to `active: false` or adjust all
tickets with the to remove state to another state.
:::

::: details Show response

Response:

```json
# HTTP-Code 200 Ok

{}
```
:::
