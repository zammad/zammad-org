---
order: 18
title: Tags
---

# Tags

## Escopo de ticket

### Listar

Permissão necessária: `ticket.agent` **ou** `admin.tag`

Solicitação `GET` enviada: `/api/v1/tags?object=Ticket&o_id={ticket id}`

::: details

<<< @/fixtures/rest-api/tags/get-res.json

:::

### Adicionar

Permissão necessária: `ticket.agent` **ou** `admin.tag`

Solicitação `POST` enviada: `/api/v1/tags/add`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/add/post-req.json

::: info
Isso criará a tag se ela não existir e o usuário tiver permissão
para isso.
:::

=== Response

<<< @/fixtures/rest-api/tags/add/post-res.json

::::
:::::

### Remover

Permissão necessária: `ticket.agent` **ou** `admin.tag`

Solicitação `DELETE` enviada: `/api/v1/tags/remove`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tags/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/tags/remove/delete-res.json

:::
::::

## Escopo de administração

### Admin - Listar

Permissão necessária: `admin.tag`

Solicitação `GET` enviada: `/api/v1/tag_list`

::: details

<<< @/fixtures/rest-api/tag_list/get-res.json

:::

### Admin - Criar

Permissão necessária: `admin.tag`

Solicitação `POST` enviada: `/api/v1/tag_list`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/post-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/post-res.json

:::
::::

### Admin - Renomear

Permissão necessária: `admin.tag`

Solicitação `PUT` enviada: `/api/v1/tag_list/{tag id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tag_list/put-tag-id-req.json

=== Response

<<< @/fixtures/rest-api/tag_list/put-tag-id-res.json

:::
::::

### Admin - Excluir

Permissão necessária: `admin.tag`

Solicitação `DELETE` enviada: `/api/v1/tag_list/{tag id}`

::: details

Response:

<<< @/fixtures/rest-api/tag_list/delete-tag-id-res.json

:::
