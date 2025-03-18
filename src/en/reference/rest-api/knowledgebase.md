---
order: 7
title: Knowledge Base
---

# Knowledge Base

Zammad has multiple knowledge base related endpoints. The most important - but not all - are covered in this
documentation. You can find the general ones about the knowledge base itself below, followed by the sub-endpoints
for [answers](#answers) and [categories](#categories).

## Knowledge Base General

::: info
The request and response examples include the knowledge base ID `1`. Your ID may be different, for example if you
created a knowledge base before, dropped it and created a new one.
:::

### Overview

Required permission: `knowledge_base.editor`

`POST`-Request sent: `/api/v1/knowledge_bases/init`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/post-init.json

:::

### Show

Required permission: `knowledge_base.reader` or `knowledge_base.editor`

`GET`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/get-kb.json

:::

### Change Settings

Required permission: `knowledge_base.editor`

`PATCH`-Request sent: `/api/v1/knowledge_bases/manage/{ID of your KB}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-manage.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-manage-response.json

:::
::::

### Show Permissions

Required permission: `knowledge_base.editor`

`GET`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/permissions`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/get-permissions.json

:::

### Change Permissions

Required permission: `knowledge_base.editor`

`PUT`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/permissions`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/put-permissions.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/put-permissions-response.json

:::
::::

## Categories

### Reorder Sub-Categories

Required permission: `knowledge_base.editor`

`PATCH`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}/reorder_categories`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-reorder.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-response.json

:::
::::

### Reorder Root Categories

::: info
You have to provide the order of all top level categories, i.e.
categories with no category as parent (parent: `>> Homepage <<`).
:::

Required permission: `knowledge_base.editor`

`PATCH`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/reorder_root_categories`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root-response.json

:::
::::

### Show

Required permission: `knowledge_base.reader` or `knowledge_base.editor`

`GET`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}`

::: details Show response:

<<< @/fixtures/rest-api/knowledgebase/get-categories.json

:::

### Create

Required permission: `knowledge_base.editor`

`POST`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/post-categories.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/post-categories-response.json

:::
::::

### Change

Required permission: `knowledge_base.editor`

`PATCH`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-categories.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-categories-response.json

:::
::::

### Delete

Required permission: `knowledge_base.editor`

`DELETE`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}`

::: details Show response:

<<< @/fixtures/rest-api/knowledgebase/delete-categories.json

:::

### Show Permissions

Required permission: `knowledge_base.editor`

`GET`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}/permissions`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/get-categories-permissions.json

:::

### Change Permissions

Required permission: `knowledge_base.editor`

`PUT`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}/permissions`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions-response.json

:::
::::

## Answers

### Reorder Answers

Required permission: `knowledge_base.editor`

`PATCH`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID of category}/reorder_answers`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers-response.json

:::
::::

### Show

Required permission: `knowledge_base.reader` or `knowledge_base.editor`

`GET`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}`

::: tip
If you want to get the content of an answer, add the parameters `?full=1&include_contents=1` to the query URL. The
request for the following response included the parameters.
:::

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/get-answers.json

:::

### Create

Required permission: `knowledge_base.editor`

`POST`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/answers`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/post-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/post-answers-response.json

:::
::::

### Change

Required permission: `knowledge_base.editor`

`PATCH`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-answers-response.json

:::
::::

### Delete

Required permission: `knowledge_base.editor`

`DELETE`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/delete-answers.json

:::

### Manage Publication Status

Required permission: `knowledge_base.editor`

::: info
Responses are omitted here. You can expect to get a response like for showing an answer with a populated value for
`archived_at`, `published_at` or `internal_at`, depending on which request you execute.
:::

:::: details Show requests

::: tabs

=== Publish internally

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/internal`

=== Publish publicly

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/publish`

=== Archive

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/archive`

=== Unarchive

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/unarchive`

:::
::::

### Manage Attachments

Required permission: `knowledge_base.editor`

Add attachment:

`POST`-Request with payload sent: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/attachments`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/post-answers-attachment.json

:::

Delete attachment:

`DELETE`-Request sent: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/attachments/{ID of attachment}`

::: details Show response

<<< @/fixtures/rest-api/knowledgebase/delete-answers-attachments.json

:::
