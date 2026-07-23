---
order: 7
title: 'Base de conhecimento'
---

# Base de conhecimento

O Zammad tem vários endpoints relacionados à base de conhecimento. Os mais
importantes - mas não todos - são cobertos nesta documentação. Você encontra
abaixo os gerais sobre a base de conhecimento em si, seguidos pelos
subendpoints para [respostas](#answers) e [categorias](#categories).

## Base de conhecimento geral

::: info
Os exemplos de solicitação e resposta incluem o ID de base de conhecimento `1`. Seu ID pode ser diferente, por exemplo, se você
criou uma base de conhecimento antes, a excluiu e criou uma nova.
:::

### Visão geral

Permissão necessária: `knowledge_base.editor`

Solicitação `POST` enviada: `/api/v1/knowledge_bases/init`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-init.json

:::

### Mostrar

Permissão necessária: `knowledge_base.reader` ou `knowledge_base.editor`

Solicitação `GET` enviada: `/api/v1/knowledge_bases/{ID of your KB}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-kb.json

:::

### Alterar configurações

Permissão necessária: `knowledge_base.editor`

Solicitação `PATCH` enviada: `/api/v1/knowledge_bases/manage/{ID of your
KB}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-manage.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-manage-response.json

:::
::::

### Mostrar permissões

Permissão necessária: `knowledge_base.editor`

Solicitação `GET` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-permissions.json

:::

### Alterar permissões

Permissão necessária: `knowledge_base.editor`

Solicitação `PUT` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/permissions`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/put-permissions.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/put-permissions-response.json

:::
::::

## Categorias

### Reordenar subcategorias

Permissão necessária: `knowledge_base.editor`

Solicitação `PATCH` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/reorder_categories`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-reorder.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-response.json

:::
::::

### Reordenar categorias raiz

::: info
Você precisa fornecer a ordem de todas as categorias de nível superior, ou seja,
categorias sem nenhuma categoria como pai (parent: `>> Homepage <<`).
:::

Permissão necessária: `knowledge_base.editor`

Solicitação `PATCH` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/reorder_root_categories`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root-response.json

:::
::::

### Mostrar

Permissão necessária: `knowledge_base.reader` ou `knowledge_base.editor`

Solicitação `GET` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories.json

:::

### Criar

Permissão necessária: `knowledge_base.editor`

Solicitação `POST` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/post-categories.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/post-categories-response.json

:::
::::

### Alterar

Permissão necessária: `knowledge_base.editor`

Solicitação `PATCH` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-categories.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-categories-response.json

:::
::::

### Excluir

Permissão necessária: `knowledge_base.editor`

Solicitação `DELETE` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-categories.json

:::

### Mostrar permissões

Permissão necessária: `knowledge_base.editor`

Solicitação `GET` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories-permissions.json

:::

### Alterar permissões

Permissão necessária: `knowledge_base.editor`

Solicitação `PUT` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/permissions`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions-response.json

:::
::::

## Respostas

### Reordenar respostas

Permissão necessária: `knowledge_base.editor`

Solicitação `PATCH` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/reorder_answers`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers-response.json

:::
::::

### Mostrar

Permissão necessária: `knowledge_base.reader` ou `knowledge_base.editor`

Solicitação `GET` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

::: tip
Se você quiser obter o conteúdo de uma resposta, adicione os parâmetros `?full=1&include_contents=1` à URL da consulta. A
solicitação para a resposta a seguir incluiu esses parâmetros.
:::

:::: details

<<< @/fixtures/rest-api/knowledgebase/get-answers.json

:::

### Criar

Permissão necessária: `knowledge_base.editor`

Solicitação `POST` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/answers`

::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/post-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/post-answers-response.json

:::
::::

### Alterar

Permissão necessária: `knowledge_base.editor`

Solicitação `PATCH` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-answers-response.json

:::
::::

### Excluir

Permissão necessária: `knowledge_base.editor`

Solicitação `DELETE` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers.json

:::

### Gerenciar status de publicação

Permissão necessária: `knowledge_base.editor`

::: info
As respostas são omitidas aqui. Você pode esperar obter uma resposta como para mostrar uma resposta com um valor preenchido para
`archived_at`, `published_at` ou `internal_at`, dependendo de qual solicitação você executar.
:::

:::: details

::: tabs

=== Publish internally

Solicitação `POST` enviada:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/internal`

=== Publish publicly

Solicitação `POST` enviada:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/publish`

=== Archive

Solicitação `POST` enviada:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/archive`

=== Unarchive

Solicitação `POST` enviada:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/unarchive`

:::
::::

### Gerenciar anexos

Permissão necessária: `knowledge_base.editor`

Adicionar anexo:

Solicitação `POST` com payload enviada: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}/attachments`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-answers-attachment.json

:::

Excluir anexo:

Solicitação `DELETE` enviada: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}/attachments/{ID of attachment}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers-attachments.json

:::
