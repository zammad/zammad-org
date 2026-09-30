---
order: 10
title: 'Core workflow'
---

# Core workflow

::: info
Core Workflows are different from [triggers](/en/reference/rest-api/trigger):
they control the ticket create/edit form while someone fills it out, for
example by restricting which values are selectable in another field. The
form sends its current values to Zammad, which evaluates the workflows
and returns the resulting field changes. Unlike triggers, they don't act
on existing tickets in the background.

Compare to [report profiles](/en/reference/rest-api/report-profile), whose
`condition` field, unlike Core Workflow, does validate that referenced
fields are real.
:::

## Elenca

Required permission: `admin.core_workflow`

`GET`-Request sent: `/api/v1/core_workflows`

::: details

<<< @/fixtures/rest-api/core_workflows/get-res.json

:::

::: info
This endpoint only returns workflows with `changeable: true`. Zammad's
built-in system workflows are not changeable and are not included, so
the response on a fresh instance is an empty array. Show, Update and
Delete also only operate on changeable workflows.
:::

## Mostra

Required permission: `admin.core_workflow`

`GET`-Request sent: `/api/v1/core_workflows/{id}`

::: details

<<< @/fixtures/rest-api/core_workflows/get-id-res.json

:::

::: details

<<< @/fixtures/rest-api/core_workflows/get-non-changeable-res.json

:::

## Crea

Required permission: `admin.core_workflow`

`POST`-Request sent: `/api/v1/core_workflows`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/core_workflows/post-req.json

=== Response

<<< @/fixtures/rest-api/core_workflows/post-res.json

:::

::::

::: info
Core Workflow does _not_ validate that fields referenced in
`condition_selected` or `perform` exist. A workflow that references a
field that doesn't exist yet is saved without error. It has no visible
effect in the ticket form until the referenced field exists.
:::

## Aggiornamento

Required permission: `admin.core_workflow`

`PUT`-Request sent: `/api/v1/core_workflows/{id}`

Payload shape is identical to Create. The response is the updated record,
same shape as Show/Create.

::: info
Sending the full Create payload to an existing workflow's `id` updates
that record in place. It doesn't create a duplicate.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/core_workflows/put-id-req.json

=== Response

<<< @/fixtures/rest-api/core_workflows/put-id-res.json

:::

::::

## Elimina

Required permission: `admin.core_workflow`

::: danger
**This is a permanent removal**

Please note that removing core workflows cannot be undone.
:::

`DELETE`-Request sent: `/api/v1/core_workflows/{id}`

::: details

<<< @/fixtures/rest-api/core_workflows/delete-id-res.json

:::
