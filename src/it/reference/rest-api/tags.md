---
order: 18
title: Tag
---

# Tag

## Ticket scope

### Elenca

Permesso richiesto: `ticket.agent` **o** `admin.tag`

Richiesta `GET` inviata: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details

<<< @/fixtures/rest-api/tags/get-res.json

:::

### Aggiungi

Permesso richiesto: `ticket.agent` **o** `admin.tag`

Richiesta `POST` inviata: `/api/v1/tags/add`

::::: details

:::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tags/add/post-req.json

::: info
Questo creerà il tag se non esiste e l'utente ha il permesso
per farlo.
:::

=== Risposta

<<< @/fixtures/rest-api/tags/add/post-res.json

::::
:::::

### Rimuovi

Permesso richiesto: `ticket.agent` **o** `admin.tag`

Richiesta `DELETE` inviata: `/api/v1/tags/remove`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tags/remove/delete-req.json

=== Risposta

<<< @/fixtures/rest-api/tags/remove/delete-res.json

:::
::::

## Administration scope

### Admin - list

Permesso richiesto: `admin.tag`

Richiesta `GET` inviata: `/api/v1/tag_list`

::: details

<<< @/fixtures/rest-api/tag_list/get-res.json

:::

### Admin - create

Permesso richiesto: `admin.tag`

Richiesta `POST` inviata: `/api/v1/tag_list`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tag_list/post-req.json

=== Risposta

<<< @/fixtures/rest-api/tag_list/post-res.json

:::
::::

### Admin - rename

Permesso richiesto: `admin.tag`

Richiesta `PUT` inviata: `/api/v1/tag_list/{tag id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tag_list/put-tag-id-req.json

=== Risposta

<<< @/fixtures/rest-api/tag_list/put-tag-id-res.json

:::
::::

### Admin - delete

Permesso richiesto: `admin.tag`

Richiesta `DELETE` inviata: `/api/v1/tag_list/{tag id}`

::: details

Risposta:

<<< @/fixtures/rest-api/tag_list/delete-tag-id-res.json

:::
