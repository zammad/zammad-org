---
title: Tags
order: 18
---

# Tags

## Ticket scope

### List

Required permission: `ticket.agent` **or** `admin.tag`

`GET`-Request sent: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details

<<< @/fixtures/rest-api/tags/get-res.json

:::

### Add

Required permission: `ticket.agent` **or** `admin.tag`

`POST`-Request sent: `/api/v1/tags/add`

::::: details

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

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/tags/remove/delete-res.json

:::
::::

## Administration scope

### Admin - list

Required permission: `admin.tag`

`GET`-Request sent: `/api/v1/tag_list`

::: details

<<< @/fixtures/rest-api/tag_list/get-res.json

:::

### Admin - create

Required permission: `admin.tag`

`POST`-Request sent: `/api/v1/tag_list`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/post-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/post-res.json

:::
::::

### Admin - rename

Required permission: `admin.tag`

`PUT`-Request sent: `/api/v1/tag_list/{tag id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/put-tag-id-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/put-tag-id-res.json

:::
::::

### Admin - delete

Required permission: `admin.tag`

`DELETE`-Request sent: `/api/v1/tag_list/{tag id}`

::: details

Response:

<<< @/fixtures/rest-api/tag_list/delete-tag-id-res.json

:::
