---
title: Object
order: 6
---

# Object

::: danger
Adjusting objects via API can cause serious issues with your instance.
Proceed with absolute caution and ensure to adjust any of Zammad's
default fields.

If you want to hide fields, consider Zammad's core workflows instead!
:::

## List

Required permission: `admin.object`

`GET`-Request sent: `/api/v1/object_manager_attributes`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes/get-res.json

:::

## Show

Required permission: `admin.object`

`GET`-Request sent: `/api/v1/object_manager_attributes/{id}`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes/get-id-res.json

:::

## Create

Required permission: `admin.object`

`POST`-Request sent: `/api/v1/object_manager_attributes`

### Boolean

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-res.json

:::
::::

### Date

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-date-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-date-res.json

:::
::::

### Date Time

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-res.json

:::
::::

### Integer

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-res.json

:::
::::

### Select

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-select-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-select-res.json

:::
::::

### Text

::::: details Show request/response

:::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-text-req.json

:::tip

Zammad input fields can have 4 different types:

- `email`
- `tel`
- `text`
- `url` (does not support link-templates)

Depending on the chosen input type, Zammad expects different formats of
data. E.g.: email demands an email address to be provided.
:::

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-text-res.json

::::
:::::

### Tree Select

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-res.json

:::
::::

::::info
Please note that above payloads cover ticket objects. This is fine in
most situations, except if you're looking at the default object
permissions. This is why we're listing these separate for you to view.

The attribute `object` controls which context is being used:

- `Ticket`
- `User`
- `Organisation`
- `Group`

::: tabs

=== Ticket

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-ticket-req.json

=== User

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-user-req.json

=== Organization

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-organization-req.json

=== Group

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-group-req.json

:::
::::

## Update

Required permission: `admin.object`

Except on the request method, payloads or updating and creating objects
are identical. For full payload samples thus scroll up to
`create_object`.

Zammad will return two attributes during update: `data_option` and
`data_option_new`. The first attribute contains the current active
values and the second one the new to be values (they'll become active
after executing the database migrations).

`PUT`-Request sent: `/api/v1/object_manager_attributes/{id}`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/put-id-req.json

::: info
Ensure to provide `data_option`. Zammad is very picky if you leave out
this attribute. Please note that changing the object type *after*
creation is not possible.
:::

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/put-id-res.json

::::
:::::

## Delete

Required permission: `admin.object`

`DELETE`-Request sent: `/api/v1/object_manager_attributes/{id}`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes/delete-id-res.json

:::

## Execute Database Migrations

Required permission: `admin.object`

::: warning
After executing the database migrations a restart of Zammad is
*mandatory*. If configured Zammad also can restart automatically (this
is the case on Hosted environments) – expect a short downtime.
:::

`POST`-Request sent:
`/api/v1/object_manager_attributes_execute_migrations`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes_execute_migrations/post-res.json

:::
