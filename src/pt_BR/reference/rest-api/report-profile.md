---
order: 10
title: 'Report profile'
---

# Report profile

::: info
A report profile is a saved, reusable filter/condition for Zammad's
reporting module. It isn't an automation and doesn't do anything by
itself. It's a named condition that shows up as a selectable view when
generating reports with Zammad's reporting feature, scoped to whichever
roles (`role_ids`) can see it.

Compare to [core workflows](/en/reference/rest-api/core-workflow), which
uses a similarly-shaped condition object but does not validate referenced
fields.
:::

## Listar

Required permission: `admin.report_profile`

`GET`-Request sent: `/api/v1/report_profiles`

::: details

<<< @/fixtures/rest-api/report_profiles/get-res.json

:::

::: info
The list returns the full record for each profile, same field set as the
Show response below. Entry `1` (`-all-`) is Zammad's built-in default
profile.
:::

## Mostrar

Required permission: `admin.report_profile`

`GET`-Request sent: `/api/v1/report_profiles/{id}`

::: details

<<< @/fixtures/rest-api/report_profiles/get-id-res.json

:::

## Criar

Required permission: `admin.report_profile`

`POST`-Request sent: `/api/v1/report_profiles`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/report_profiles/post-req.json

=== Response

<<< @/fixtures/rest-api/report_profiles/post-res.json

:::

::::

::: info
Role ids aren't guaranteed to be the same across instances. Look up the
ids of the roles you need via the [roles API](/en/reference/rest-api/role)
first instead of hard-coding them.
:::

:::: info
Unlike core workflows, a report profile's `condition` _does_ validate
that referenced fields are real, fully-migrated ticket fields.
Referencing a custom field that exists but hasn't finished its schema
migration yet (`to_create`/`to_migrate` still `true` on that field) fails
with:

::: details

<<< @/fixtures/rest-api/report_profiles/post-invalid-condition-res.json

:::
::::

## Atualização

Required permission: `admin.report_profile`

`PUT`-Request sent: `/api/v1/report_profiles/{id}`

Payload shape is identical to Create. The response is the updated record,
same shape as Create's response.

::: info
Sending the full Create payload to an existing profile's `id` updates
that record in place. It doesn't create a duplicate.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/report_profiles/put-id-req.json

=== Response

<<< @/fixtures/rest-api/report_profiles/put-id-res.json

:::

::::

## Excluir

Required permission: `admin.report_profile`

::: danger
**This is a permanent removal**

Please note that removing report profiles cannot be undone.
:::

`DELETE`-Request sent: `/api/v1/report_profiles/{id}`

::: details

<<< @/fixtures/rest-api/report_profiles/delete-id-res.json

:::
