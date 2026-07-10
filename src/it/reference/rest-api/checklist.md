---
order: 4
title: Checklist
---

# Checklist

Zammad ha diversi endpoint per le checklist:

- [Checklist](#checklists)
- [Elementi checklist](#elementi-checklist)
- [Modelli checklist](#modelli-checklist)

::: info
I _modelli checklist_ includono i loro elementi mentre la _checklist standard_ ha un endpoint separato.
:::

## Checklist

::: info
Per aggiungere elementi alla checklist, usa l'[endpoint elementi checklist](#elementi-checklist).
:::

### Mostra

Permesso richiesto: `ticket.agent`

Richiesta `GET` inviata: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/get-checklist-id-res.json

:::

::: tip
Puoi trovare l'attributo `checklist_id` di un ticket inviando una richiesta `GET` a `/api/
:::

### Crea

Permesso richiesto: `ticket.agent`

Richiesta `POST` inviata: `/api/v1/checklists`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/checklists/post-req.json

=== Risposta

<<< @/fixtures/rest-api/checklists/post-res.json

:::
::::

### Aggiornamento

Permesso richiesto: `ticket.agent`

Richiesta `PATCH` inviata: `/api/v1/checklists/{checklist id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/checklists/patch-checklist-id-req.json

=== Risposta

<<< @/fixtures/rest-api/checklists/patch-checklist-id-res.json

:::
::::

### Elimina

Permesso richiesto: `ticket.agent`

Richiesta `DELETE` inviata: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/delete-checklist-id-res.json

:::

## Elementi checklist

### Mostra

Permesso richiesto: `ticket.agent`

Richiesta `GET` inviata: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/get-checklist-item-id-res.json

:::

### Crea

Permesso richiesto: `ticket.agent`

Richiesta `POST` inviata: `/api/v1/checklist_items`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/checklist_items/post-req.json

=== Risposta

<<< @/fixtures/rest-api/checklist_items/post-res.json

:::
::::

### Aggiornamento

Permesso richiesto: `ticket.agent`

Richiesta `PATCH` inviata: `/api/v1/checklist_items/{checklist item id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-req.json

=== Risposta

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-res.json

:::
::::

### Elimina

Permesso richiesto: `ticket.agent`

Richiesta `DELETE` inviata: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/delete-checklist-item-id-res.json

:::

## Modelli checklist

### Elenca

Permesso richiesto: `admin.checklists`

Richiesta `GET` inviata: `/api/v1/checklist_templates`

::: details

<<< @/fixtures/rest-api/checklist_templates/list-checklist-templates-res.json

:::

### Mostra

Permesso richiesto: `admin.checklists` o `ticket.agent`

Richiesta `GET` inviata: `/api/v1/checklist_templates/{checklist template
id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/get-checklist-template-id-res.json

:::

### Crea

Permesso richiesto: `admin.checklists`

Richiesta `POST` inviata: `/api/v1/checklist_templates`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/checklist_templates/post-req.json

=== Risposta

<<< @/fixtures/rest-api/checklist_templates/post-res.json

:::
::::

### Aggiornamento

Permesso richiesto: `admin.checklists`

Richiesta `PATCH` inviata: `/api/v1/checklist_templates/{checklist template
id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-req.json

=== Risposta

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-res.json

:::
::::

### Elimina

Permesso richiesto: `admin.checklists`

Richiesta `DELETE` inviata: `/api/v1/checklist_templates/{checklist template
id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/delete-checklist-template-id-res.json

:::
