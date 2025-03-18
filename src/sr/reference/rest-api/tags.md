---
order: 18
title: Ознаке
---

# Ознаке

## Ticket Scope

### List

Required permission: `ticket.agent` **or** `admin.tag`

`GET`-Request sent: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details Show response

<<< @/fixtures/rest-api/tags/get-res.json

:::

### Add

Required permission: `ticket.agent` **or** `admin.tag`

`POST`-Request sent: `/api/v1/tags/add`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/add/post-req.json

::: info
This will create the tag if it doesn't exist and the user has permission
to do so.
:::

=== Response

<<< @/fixtures/rest-api/tags/add/post-res.json

::::
:::::

### Remove

Required permission: `ticket.agent` **or** `admin.tag`

`DELETE`-Request sent: `/api/v1/tags/remove`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/tags/remove/delete-res.json

:::
::::

## Administration Scope

### Admin - List

Required permission: `admin.tag`

`GET`-Request sent: `/api/v1/tag_list`

::: details Show response

<<< @/fixtures/rest-api/tag_list/get-res.json

:::

### Admin - Create

Required permission: `admin.tag`

`POST`-Request sent: `/api/v1/tag_list`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/post-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/post-res.json

:::
::::

### Admin - Rename

Required permission: `admin.tag`

`PUT`-Request sent: `/api/v1/tag_list/{tag id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/put-tag-id-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/put-tag-id-res.json

:::
::::

### Admin - Delete

Required permission: `admin.tag`

`DELETE`-Request sent: `/api/v1/tag_list/{tag id}`

::: details Show response

Response:

<<< @/fixtures/rest-api/tag_list/delete-tag-id-res.json

:::
