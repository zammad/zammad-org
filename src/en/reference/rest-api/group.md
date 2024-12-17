---
order: 2
title: Group
---

# Group

::: info
- Please note that `follow_up_possible` may not work as expected. The
  possible values are `yes` or `new_ticket`!
- If you want to create or update **subgroups**, use `::` as delimiter
  for the names. You also have to name the complete hierarchy in the
  name. Example: `Sales::Europe::South`
:::

## List

Required permission: `admin.group`

`GET`-Request sent: `/api/v1/groups`

::: details Show response

<<< @/fixtures/rest-api/groups/get-res.json

:::

## Show

Required permission: `admin.group`

`GET`-Request sent: `/api/v1/groups/{id}`

::: details Show response

<<< @/fixtures/rest-api/groups/get-id-res.json

:::

## Create

Required permission: `admin.group`

`POST`-Request sent: `/api/v1/groups`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/post-req.json

=== Response

<<< @/fixtures/rest-api/groups/post-res.json

:::
::::

## Update

Required permission: `admin.group`

`PUT`-Request sent: `/api/v1/groups/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/put-id-req.json

=== Response

<<< @/fixtures/rest-api/groups/put-id-res.json

:::
::::

## Delete

Required permission: `admin.group`

`DELETE`-Request sent: `/api/v1/groups/{id}`

::: danger

**This is a permanent removal**

Please note that removing groups cannot be undone.

Removing organizations with references in e.g. activity streams or
tickets is not possible via API - this will be indicated by
`"error": "Can't delete, object has references."`. This is *not* a bug.

Consider setting affected groups to inactive instead or ensure to move
all existing tickets to new groups.

:::

::: details Show response

<<< @/fixtures/rest-api/groups/delete-id-res.json

:::
