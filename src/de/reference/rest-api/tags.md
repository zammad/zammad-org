---
order: 2
title: Tags
---

# Tags

## Ticket Scope

### List

Required permission: `ticket.agent` **or** `admin.tag`

`GET`-Request sent: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details Show response

```json
# HTTP-Code 200 OK

{
    "tags": [
        "order",
        "complaint"
    ]
}
```
:::

### Suche

Required permission: `ticket.agent` **or** `admin.tag`

`GET`-Request sent: `/api/v1/tag_search?term={tag name}`

::: info
Zammad will return all tags that contain your search phrase.
:::

::: details Show response

```json
# HTTP-Code 200 OK

[
    {
        "id": 1,
        "value": "order"
    },
    {
        "id": 2,
        "value": "complaint"
    },
    {
        "id": 3,
        "value": "printer problem"
    }
]
```
:::

### Add

Required permission: `ticket.agent` **or** `admin.tag`

`POST`-Request sent: `/api/v1/tags/add`

::::: details Show request/response

:::: tabs key:reqres

=== Request

```json
{
    "item": "{tag name}",
    "object": "Ticket",
    "o_id": {ticket id}
}
```

::: info
This will create the tag if it doesn't exist and the user has permission
to do so.
:::

=== Response

```json
# HTTP-Code 201 Created

true
```
::::
:::::

### Remove

Required permission: `ticket.agent` **or** `admin.tag`

`DELETE`-Request sent: `/api/v1/tags/remove`

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
    "item": "{tag name}",
    "object": "Ticket",
    "o_id": "{ticket id}"
}
```

=== Response

```json
# HTTP-Code 201 Created

true
```
:::
::::

## Administration Scope

### Admin - List

Required permission: `admin.tag`

`GET`-Request sent: `/api/v1/tag_list`

::: details Show response

```json
# HTTP-Code 200 OK

[
    {
        "id": 1,
        "name": "order",
        "count": 0
    },
    {
        "id": 2,
        "name": "complaint",
        "count": 0
    },
    {
        "id": 3,
        "name": "printer problem",
        "count": 0
    }
]
```
:::

### Admin - Create

Required permission: `admin.tag`

`POST`-Request sent: `/api/v1/tag_list`

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
  "name": "tag 5"
}
```

=== Response

```json
# HTTP-Code 200 OK

{}
```
:::
::::

### Admin - Rename

Required permission: `admin.tag`

`PUT`-Request sent: `/api/v1/tag_list/{tag id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

```json
{
  "name": "order"
}
```

=== Response

```json
# HTTP-Code 200 OK

{}
```
:::
::::

### Admin - Delete

Required permission: `admin.tag`

`DELETE`-Request sent: `/api/v1/tag_list/{tag id}`

::: details Show response

Response:

```json
# HTTP-Code 200 OK

{}
```
:::
