---
order: 8
title: Role
---

# Roles

## List

Required permission: `admin.role`

`GET` -Request sent: `/api/v1/roles`

::: details Show response

<<< @/fixtures/rest-api/roles/get-res.json

:::


## Show

Required permission: `admin.role`

`GET` -Request sent: `/api/v1/roles/{id}`

::: details Show response

<<< @/fixtures/rest-api/roles/get-id-res.json

:::

## Create

Required permission: `admin.role`

`POST` -Request sent: `/api/v1/roles`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/post-req.json

=== Response

<<< @/fixtures/rest-api/roles/post-res.json

:::
::::

## Освежавање

Required permission: `admin.role`

`PUT` -Request sent: `/api/v1/roles/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/put-id-req.json

=== Response

<<< @/fixtures/rest-api/roles/put-id-res.json

:::
::::
