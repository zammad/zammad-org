---
order: 2
title: 'Audit log'
---

# Audit log

The audit log records security-relevant changes to your Zammad system: who
changed what, and when. The audit log is read-only.

## Listar

Required permission: `admin.audit_log`

`GET`-Request sent: `/api/v1/audit_logs`

The endpoint supports pagination. The default page size is `500`.  Entries
are returned ordered by `id` (ascending). Pass `?sort_by=id` and
`?order_by=DESC` to return the newest entries first.

::: details

<<< @/fixtures/rest-api/audit_logs/get-list-res.json

:::

## Mostrar

Required permission: `admin.audit_log`

`GET`-Request sent: `/api/v1/audit_logs/{id}`

::: details

<<< @/fixtures/rest-api/audit_logs/get-id-res.json

:::

## Pesquisar

Required permission: `admin.audit_log`

The search endpoint accepts the Zammad search-backend `query` syntax. The
simplest case is a literal substring on a single indexed field such as
`auditable_name`, `auditable_type` or `user_fullname`:

`GET`-Request sent: `/api/v1/audit_logs/search?query={search-string}`

::: details

<<< @/fixtures/rest-api/audit_logs/get-search-res.json

:::

To filter on a specific attribute rather than substring-match the whole
record, prefix the attribute name. You can even use the logical `AND`
connector to narrow down the results:

`GET`-Request sent: `/api/v1/audit_logs/search?query=auditable_type:Macro
AND user_id:3`

::: warning
Search matches are case-sensitive and search only the indexed
attribute fields (`auditable_name`, `auditable_type`,
`user_fullname` and so on). The `value_from` and `value_to`
payloads are not searchable.
:::

::: tip
By default the response is a bare JSON array of matching entries.
Pass `with_total_count=true` on the URL (or `with_total_count:
true` in the body of a `POST` request) to wrap the response in
an object that also contains the `total_count`. Send a `POST`
request when the query is too long or complex for a URL.
:::

## Field reference

`id` : Integer primary key of the audit log entry.

`user_id`
: ID of the user that triggered the change. `null` when the entry
  was written by a background job without a current user.

`user_fullname`
: Full name of the user at the time the entry was written. Stored
  separately so it remains readable after the user account is
  removed.

`action_type`
: Type of the recorded change. One of: `create` (a record was
  added), `update` (an existing record was modified), `destroy`
  (a record was removed), `switch_to` (a user took over another
  user's session via _View from user's perspective_),
  `switch_back_to` (the original session was resumed).

`auditable_id` : ID of the record that was changed.

`auditable_type`
: Class name of the record that was changed (e.g. `Macro`,
  `Setting`, `KnowledgeBase`, `ChecklistTemplate`, `Job`).

`auditable_name`
: Display name of the changed record at the time the entry was
  written. Stored separately so it remains readable after the record
  itself is gone.

`value_from`
: Object (JSON) holding the previous state of the audited
  attributes. Empty (`{}`) on `create` entries.

`value_to`
: Object (JSON) holding the new state of the audited attributes.
  Empty (`{}`) on `destroy` entries.

`source_ip`
: IP address that issued the underlying request. `Rails console`
  or `Rails runner` is stored when the entry was written from a
  maintenance script.

`preferences`
: Object (JSON) holding additional per-entry metadata. For
  `update` entries this contains a `changed_attributes` array
  listing the attributes that actually changed.

`created_at`
: Timestamp at which the entry was written. Audit log entries are
  append-only.

`updated_at`
: Same as `created_at` for audit log entries. Audit log entries
  are append-only.

## Lifecycle

A scheduled task removes entries older than **12 months** every day.  Use
`AuditLog.cleanup` in the Rails console to trigger a cleanup manually.
