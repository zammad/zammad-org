---
title: Organization
order: 7
---

# Organization

## List

Required permission: `ticket.agent` **or** `admin.organization`

::: info
Technically, customers can only see their own organization if applicable.
:::

`GET`-Request sent: `/api/v1/organizations`

::: details Show response

```json
# HTTP-Code 200 Ok

[
   {
      "id": 1,
      "name": "Zammad Foundation",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "",
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:39.608Z",
      "updated_at": "2023-08-04T12:02:00.018Z",
      "vip": false,
      "member_ids": [
         2
      ],
      "secondary_member_ids": []
   },
   {
      "name": "Fast Lane Hardware Inc.",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "IT hardware and custom PC builds",
      "vip": false,
      "updated_by_id": 3,
      "id": 2,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:48.617Z",
      "updated_at": "2023-08-04T12:01:44.370Z",
      "member_ids": [
         3,
         5,
         4
      ],
      "secondary_member_ids": []
   },
   {
      "name": "Joe's car parts",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "Their shipping department often needs computer spare parts as well as printers!",
      "vip": true,
      "updated_by_id": 3,
      "id": 3,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:48.632Z",
      "updated_at": "2023-08-04T12:54:30.974Z",
      "member_ids": [
         8,
         7,
         6
      ],
      "secondary_member_ids": []
   },
   {
      "id": 4,
      "name": "Good Customer Inc.",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "Search the world's information, including webpages, images, videos and more. Good Customer has many special features to help you find exactly what you're looking for.",
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:48.645Z",
      "updated_at": "2023-07-26T08:44:48.645Z",
      "member_ids": [
         9
      ],
      "secondary_member_ids": []
   }
]
```
:::

## Search

Required permission: `ticket.agent` **or** `admin.organization`

`GET`-Request sent: `/api/v1/organizations/search?query=inc&limit=10`


::: details Show response

```json
# HTTP-Code 200 Ok

[
   {
      "name": "Joe's car parts",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "Their shipping department often needs computer spare parts as well as printers!",
      "vip": true,
      "updated_by_id": 3,
      "id": 3,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:48.632Z",
      "updated_at": "2023-08-04T12:54:30.974Z",
      "member_ids": [
         8,
         7,
         6
      ],
      "secondary_member_ids": []
   },
   {
      "name": "Fast Lane Hardware Inc.",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "IT hardware and custom PC builds",
      "vip": false,
      "updated_by_id": 3,
      "id": 2,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:48.617Z",
      "updated_at": "2023-08-04T12:01:44.370Z",
      "member_ids": [
         3,
         5,
         4
      ],
      "secondary_member_ids": []
   },
   {
      "id": 4,
      "name": "Good Customer Inc.",
      "shared": true,
      "domain": "",
      "domain_assignment": false,
      "active": true,
      "note": "Search the world's information, including webpages, images, videos and more. Good Customer has many special features to help you find exactly what you're looking for.",
      "updated_by_id": 1,
      "created_by_id": 1,
      "created_at": "2023-07-26T08:44:48.645Z",
      "updated_at": "2023-07-26T08:44:48.645Z",
      "member_ids": [
         9
      ],
      "secondary_member_ids": []
   }
]
```
:::

## Show

Required permission: `ticket.agent` **or** `admin.organization`

`GET`-Request sent: `/api/v1/organizations/{id}`

::: info
Technically, any users in question can only see their own organization.
:::

::: details Show response

```json
# HTTP-Code 200 Ok

{
   "id": 2,
   "name": "Fast Lane Hardware Inc.",
   "shared": true,
   "domain": "",
   "domain_assignment": false,
   "active": true,
   "note": "IT hardware and custom PC builds",
   "vip": false,
   "updated_by_id": 3,
   "created_by_id": 1,
   "created_at": "2023-07-26T08:44:48.617Z",
   "updated_at": "2023-08-04T12:01:44.370Z",
   "member_ids": [
      3,
      5,
      4
   ],
   "secondary_member_ids": []
}
```
:::

## Create

Required permission: `admin.organization`

`POST`-Request sent: `/api/v1/organizations`

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
   "name": "Sample Corp.",
   "shared": false,
   "domain": "example.com",
   "domain_assignment": true,
   "active": true,
   "vip": true,
   "note": "Just a sample, aint that nice?",
   "members": [
      "olivia@example.com",
      "david@example.com"
   ]
}
```

=== Response

```json
# HTTP-Code 201 Created

{
   "id": 5,
   "name": "Sample Corp.",
   "shared": false,
   "domain": "example.com",
   "domain_assignment": true,
   "active": true,
   "note": "Just a sample, aint that nice?",
   "updated_by_id": 3,
   "created_by_id": 3,
   "created_at": "2023-08-08T09:12:42.023Z",
   "updated_at": "2023-08-08T09:12:42.602Z",
   "vip": true,
   "member_ids": [
      10,
      11
   ],
   "secondary_member_ids": []
}
```
:::
::::

## Update

Required permission: `admin.organization`

`PUT`-Request sent: `/api/v1/organizations/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
   "name": "Sample Corp.",
   "shared": false,
   "domain": "",
   "domain_assignment": false,
   "active": true,
   "note": "This was a triumph - I'm making a note here - H-U-G-E success!",
   "members": [
      "olivia@example.com",
      "david@example.com"
   ]
}
```

=== Response

```json
# HTTP-Code 200 Ok

{
   "id": 5,
   "name": "Sample Corp.",
   "shared": false,
   "domain": "",
   "domain_assignment": false,
   "active": true,
   "note": "This was a triumph - I'm making a note here - H-U-G-E success!",
   "updated_by_id": 3,
   "created_by_id": 3,
   "created_at": "2023-08-08T09:12:42.023Z",
   "updated_at": "2023-08-08T09:16:58.922Z",
   "vip": true,
   "member_ids": [
      10,
      11
   ],
   "secondary_member_ids": []
}
```
:::
::::


## Delete

Required permission: `admin.organization`

`DELETE`-Request sent: `/api/v1/organizations/{id}`

::: danger
**This is a permanent removal**

Please note that removing organizations cannot be undone.

Removing organizations with references in e.g. activity streams or users
is not possible via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is *not* a bug.

Consider using Zammad's Data Privacy feature via UI for
more control instead.
:::

::: details Show response

Response:

```json
# HTTP-Code 200 Ok

{}
```
:::
