---
order: 18
title: Tags
---

# Tags

## Ticket-Bezug

### Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.tag`

`GET`-Anfrage gesendet: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details Show response

<<< @/fixtures/rest-api/tags/get-res.json

:::

### Hinzufügen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.tag`

`POST`-Anfrage gesendet: `/api/v1/tags/add`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/add/post-req.json

::: info
Dadurch wird das Tag erstellt, wenn es nicht existiert und der Benutzer die
Erlaubnis dazu hat.
:::

=== Response

<<< @/fixtures/rest-api/tags/add/post-res.json

::::
:::::

### Entfernen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.tag`

`DELETE`-Anfrage gesendet: `/api/v1/tags/remove`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/tags/remove/delete-res.json

:::
::::

## Admin-Bezug

### Verwaltung - Auflisten

Erforderliche Berechtigung: `admin.tag`

`GET`-Anfrage gesendet: `/api/v1/tag_list`

::: details Show response

<<< @/fixtures/rest-api/tag_list/get-res.json

:::

### Verwaltung - Erstellen

Erforderliche Berechtigung: `admin.tag`

`POST`-Anfrage gesendet: `/api/v1/tag_list`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/post-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/post-res.json

:::
::::

### Verwaltung - Umbenennen

Erforderliche Berechtigung: `admin.tag`

`PUT`-Anfrage gesendet: `/api/v1/tag_list/{tag id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/put-tag-id-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/put-tag-id-res.json

:::
::::

### Verwaltung - Löschen

Erforderliche Berechtigung: `admin.tag`

`DELETE`-Anfrage gesendet: `/api/v1/tag_list/{tag id}`

::: details Show response

Response:

<<< @/fixtures/rest-api/tag_list/delete-tag-id-res.json

:::
