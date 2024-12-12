---
order: 5
title: Notification
---

# Online Notification

:::info
The availability of notification highly depends on the users
permission and chosen notification settings.

Please note that the best results are always achieved with *Agents*.
:::

## List

Required permission: `any`

`GET`-Request sent: `/api/v1/online_notifications?expand=true`

::: tip
Use the expand request to know the affected objects. Otherwise you'll
need to find out what ID stands for which object type.
:::

::: details Show response

``` json
# HTTP-Code 200 Ok

[
   {
      "id": 4,
      "o_id": 6,
      "object_lookup_id": 2,
      "type_lookup_id": 1,
      "user_id": 3,
      "seen": false,
      "updated_by_id": 8,
      "created_by_id": 8,
      "created_at": "2021-11-09T13:15:42.628Z",
      "updated_at": "2021-11-09T13:15:42.637Z",
      "user": "lauren@fastlane.inc",
      "object": "Ticket",
      "type": "create",
      "created_by": "ethan@fastlane.inc",
      "updated_by": "ethan@fastlane.inc"
   },
   {
      "id": 3,
      "o_id": 8,
      "object_lookup_id": 2,
      "type_lookup_id": 2,
      "user_id": 3,
      "seen": false,
      "updated_by_id": 4,
      "created_by_id": 4,
      "created_at": "2021-11-09T13:10:42.628Z",
      "updated_at": "2021-11-09T13:15:42.635Z",
      "user": "lauren@fastlane.inc",
      "object": "Ticket",
      "type": "update",
      "created_by": "hannah@fastlane.inc",
      "updated_by": "hannah@fastlane.inc"
   },
   {
      "id": 2,
      "o_id": 3,
      "object_lookup_id": 2,
      "type_lookup_id": 1,
      "user_id": 3,
      "seen": true,
      "updated_by_id": 6,
      "created_by_id": 6,
      "created_at": "2021-11-09T12:45:42.625Z",
      "updated_at": "2021-11-09T13:15:42.632Z",
      "user": "lauren@fastlane.inc",
      "object": "Ticket",
      "type": "create",
      "created_by": "anna@example.com",
      "updated_by": "anna@example.com"
   },
   {
      "id": 1,
      "o_id": 2,
      "object_lookup_id": 2,
      "type_lookup_id": 1,
      "user_id": 3,
      "seen": true,
      "updated_by_id": 5,
      "created_by_id": 5,
      "created_at": "2021-11-09T11:45:42.624Z",
      "updated_at": "2021-11-09T13:15:42.629Z",
      "user": "lauren@fastlane.inc",
      "object": "Ticket",
      "type": "create",
      "created_by": "emily@fastlane.inc",
      "updated_by": "emily@fastlane.inc"
   }
]
```
:::

## Show

Required permission: `any`

`GET`-Request sent: `/api/v1/online_notifications/{id}`

::: details Show response

``` json
# HTTP-Code 200 Ok

{
   "id": 4,
   "o_id": 6,
   "object_lookup_id": 2,
   "type_lookup_id": 1,
   "user_id": 3,
   "seen": false,
   "updated_by_id": 8,
   "created_by_id": 8,
   "created_at": "2021-11-09T13:15:42.628Z",
   "updated_at": "2021-11-09T13:15:42.637Z"
}
```
:::

## Update

Required permission: `any`

`PUT`-Request sent: `/api/v1/online_notifications/{id}`

::::details Show request/response

::: tabs key:reqres

=== Request

``` json
{
  "seen": true
}
```

=== Response

``` json
# HTTP-Code 200 Ok

{
   "id": 4,
   "seen": true,
   "updated_by_id": 3,
   "o_id": 6,
   "object_lookup_id": 2,
   "type_lookup_id": 1,
   "user_id": 3,
   "created_by_id": 8,
   "created_at": "2021-11-09T13:15:42.628Z",
   "updated_at": "2021-11-09T13:25:00.004Z"
}
```
:::
::::

## Delete

Required permission: `any`

`DELETE`-Request sent: `/api/v1/online_notifications/{id}`

::: details Show response

``` json
# HTTP-Code 200 Ok

{}
```

:::

## Mark All as Read

Required permission: `any`

`POST`-Request sent: `/api/v1/online_notifications/mark_all_as_read`

::: details Show response

``` json
# HTTP-Code 200 Ok

{}
```
:::
