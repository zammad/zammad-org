---
order: 4
title: Checklist
---

# Checklist

O Zammad tem diferentes endpoints de checklist:

- [Checklists](#checklists)
- [Itens de checklist](#checklist-items)
- [Modelos de checklist](#checklist-templates)

::: info
_Modelos de checklist_ incluem seus itens, enquanto a _checklist
padrão_ tem um endpoint de item separado.
:::

## Checklists

::: info
Para adicionar itens de checklist, use o [endpoint de itens de checklist](#checklist-items).
:::

### Mostrar

Permissão necessária: `ticket.agent`

Solicitação `GET` enviada: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/get-checklist-id-res.json

:::

::: tip
Você pode encontrar o atributo `checklist_id` de um ticket enviando uma solicitação `GET` para `/api/v1/tickets/{ticket id}`.
:::

### Criar

Permissão necessária: `ticket.agent`

Solicitação `POST` enviada: `/api/v1/checklists`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklists/post-req.json

=== Response

<<< @/fixtures/rest-api/checklists/post-res.json

:::
::::

### Atualização

Permissão necessária: `ticket.agent`

Solicitação `PATCH` enviada: `/api/v1/checklists/{checklist id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklists/patch-checklist-id-req.json

=== Response

<<< @/fixtures/rest-api/checklists/patch-checklist-id-res.json

:::
::::

### Excluir

Permissão necessária: `ticket.agent`

Solicitação `DELETE` enviada: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/delete-checklist-id-res.json

:::

## Checklist items

### Mostrar

Permissão necessária: `ticket.agent`

Solicitação `GET` enviada: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/get-checklist-item-id-res.json

:::

### Criar

Permissão necessária: `ticket.agent`

Solicitação `POST` enviada: `/api/v1/checklist_items`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_items/post-req.json

=== Response

<<< @/fixtures/rest-api/checklist_items/post-res.json

:::
::::

### Atualização

Permissão necessária: `ticket.agent`

Solicitação `PATCH` enviada: `/api/v1/checklist_items/{checklist item id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-req.json

=== Response

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-res.json

:::
::::

### Excluir

Permissão necessária: `ticket.agent`

Solicitação `DELETE` enviada: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/delete-checklist-item-id-res.json

:::

## Checklist templates

### Listar

Permissão necessária: `admin.checklists`

Solicitação `GET` enviada: `/api/v1/checklist_templates`

::: details

<<< @/fixtures/rest-api/checklist_templates/list-checklist-templates-res.json

:::

### Mostrar

Permissão necessária: `admin.checklists` ou `ticket.agent`

Solicitação `GET` enviada: `/api/v1/checklist_templates/{checklist template
id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/get-checklist-template-id-res.json

:::

### Criar

Permissão necessária: `admin.checklists`

Solicitação `POST` enviada: `/api/v1/checklist_templates`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_templates/post-req.json

=== Response

<<< @/fixtures/rest-api/checklist_templates/post-res.json

:::
::::

### Atualização

Permissão necessária: `admin.checklists`

Solicitação `PATCH` enviada: `/api/v1/checklist_templates/{checklist
template id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-req.json

=== Response

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-res.json

:::
::::

### Excluir

Permissão necessária: `admin.checklists`

Solicitação `DELETE` enviada: `/api/v1/checklist_templates/{checklist
template id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/delete-checklist-template-id-res.json

:::
