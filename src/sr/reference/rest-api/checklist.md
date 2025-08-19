---
order: 4
title: 'Списак задатака'
---

# Списак задатака

Zammad has different checklist endpoints:

- [Checklists](#checklists)
- [Checklist items](#checklist-items)
- [Checklist templates](#checklist-templates)

:::info
_Checklist templates_ include their items whereas the _standard
checklist_ has a separate item endpoint.
:::

## Спискови задатака

:::info
To add checklist items, use the [checklist items endpoint](#checklist-items).
:::

### Show

Required permission: `ticket.agent`

`GET`-Request sent: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/get-checklist-id-res.json

:::

::: tip
You can find the `checklist_id` attribute of a ticket by sending a `GET` request to `/api/v1/tickets/{ticket id}`.
:::

### Create

Required permission: `ticket.agent`

`POST`-Request sent: `/api/v1/checklists`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklists/post-req.json

=== Response

<<< @/fixtures/rest-api/checklists/post-res.json

:::
::::

### Освежавање

Required permission: `ticket.agent`

`PATCH`-Request sent: `/api/v1/checklists/{checklist id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklists/patch-checklist-id-req.json

=== Response

<<< @/fixtures/rest-api/checklists/patch-checklist-id-res.json

:::
::::

### Delete

Required permission: `ticket.agent`

`DELETE`-Request sent: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/delete-checklist-id-res.json

:::

## Checklist Items

### Show

Required permission: `ticket.agent`

`GET`-Request sent: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/get-checklist-item-id-res.json

:::

### Create

Required permission: `ticket.agent`

`POST`-Request sent: `/api/v1/checklist_items`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_items/post-req.json

=== Response

<<< @/fixtures/rest-api/checklist_items/post-res.json

:::
::::

### Освежавање

Required permission: `ticket.agent`

`PATCH`-Request sent: `/api/v1/checklist_items/{checklist item id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-req.json

=== Response

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-res.json

:::
::::

### Delete

Required permission: `ticket.agent`

`DELETE`-Request sent: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/delete-checklist-item-id-res.json

:::

## Checklist Templates

### Show

Required permission: `admin.checklists` or `ticket.agent`

`GET`-Request sent: `/api/v1/checklist_templates/{checklist template id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/get-checklist-template-id-res.json

:::

### Create

Required permission: `admin.checklists`

`POST`-Request sent: `/api/v1/checklist_templates`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_templates/post-req.json

=== Response

<<< @/fixtures/rest-api/checklist_templates/post-res.json

:::
::::

### Освежавање

Required permission: `admin.checklists`

`PATCH`-Request sent: `/api/v1/checklist_templates/{checklist template id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-req.json

=== Response

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-res.json

:::
::::

### Delete

Required permission: `admin.checklists`

`DELETE`-Request sent: `/api/v1/checklist_templates/{checklist template id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/delete-checklist-template-id-res.json

:::
