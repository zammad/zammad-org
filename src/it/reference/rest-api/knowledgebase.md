---
order: 7
title: 'Base di conoscenza'
---

# Base di conoscenza

Zammad dispone di diversi endpoint relativi alla knowledge base. I più
importanti – ma non tutti – sono trattati in questa documentazione. Puoi
trovare quelli generali sulla knowledge base stessa qui sotto, seguiti dai
sotto-endpoint per le [risposte](#answers) e le [categorie](#categories).

## Knowledge base general

::: info
Gli esempi di richiesta e risposta includono l'ID della base di conoscenza `1`. Il tuo ID potrebbe essere diverso.
:::

### Panoramica

Permesso richiesto: `knowledge_base.editor`

Richiesta `POST` inviata: `/api/v1/knowledge_bases/init`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-init.json

:::

### Mostra

Permesso richiesto: `knowledge_base.reader` o `knowledge_base.editor`

Richiesta `GET` inviata: `/api/v1/knowledge_bases/{ID of your KB}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-kb.json

:::

### Change settings

Permesso richiesto: `knowledge_base.editor`

Richiesta `PATCH` inviata: `/api/v1/knowledge_bases/manage/{ID of your KB}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/patch-manage.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/patch-manage-response.json

:::
::::

### Show permissions

Permesso richiesto: `knowledge_base.editor`

Richiesta `GET` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-permissions.json

:::

### Change permissions

Permesso richiesto: `knowledge_base.editor`

Richiesta `PUT` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/permissions`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/put-permissions.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/put-permissions-response.json

:::
::::

## Categorie

### Reorder sub-categories

Permesso richiesto: `knowledge_base.editor`

Richiesta `PATCH` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/patch-reorder.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-response.json

:::
::::

### Reorder root categories

::: info
Devi fornire l'ordine di tutte le categorie di primo livello, ovvero
categorie senza categoria.
:::

Permesso richiesto: `knowledge_base.editor`

Richiesta `PATCH` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/reorder_root_cat

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root-response.json

:::
::::

### Mostra

Permesso richiesto: `knowledge_base.reader` o `knowledge_base.editor`

Richiesta `GET` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories.json

:::

### Crea

Permesso richiesto: `knowledge_base.editor`

Richiesta `POST` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/post-categories.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/post-categories-response.json

:::
::::

### Modifica

Permesso richiesto: `knowledge_base.editor`

Richiesta `PATCH` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/patch-categories.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/patch-categories-response.json

:::
::::

### Elimina

Permesso richiesto: `knowledge_base.editor`

Richiesta `DELETE` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-categories.json

:::

### Show permissions

Permesso richiesto: `knowledge_base.editor`

Richiesta `GET` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/p

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories-permissions.json

:::

### Change permissions

Permesso richiesto: `knowledge_base.editor`

Richiesta `PUT` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/p

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions-response.json

:::
::::

## Risposte

### Reorder answers

Permesso richiesto: `knowledge_base.editor`

Richiesta `PATCH` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers-response.json

:::
::::

### Mostra

Permesso richiesto: `knowledge_base.reader` o `knowledge_base.editor`

Richiesta `GET` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

::: tip
Se vuoi ottenere il contenuto di una risposta, aggiungi i parametri `?full=1&include_contents=
:::

:::: details

<<< @/fixtures/rest-api/knowledgebase/get-answers.json

:::

### Crea

Permesso richiesto: `knowledge_base.editor`

Richiesta `POST` inviata: `/api/v1/knowledge_bases/{ID of your KB}/answers`

::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/post-answers.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/post-answers-response.json

:::
::::

### Modifica

Permesso richiesto: `knowledge_base.editor`

Richiesta `PATCH` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/knowledgebase/patch-answers.json

=== Risposta

<<< @/fixtures/rest-api/knowledgebase/patch-answers-response.json

:::
::::

### Elimina

Permesso richiesto: `knowledge_base.editor`

Richiesta `DELETE` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers.json

:::

### Manage publication status

Permesso richiesto: `knowledge_base.editor`

::: info
Le risposte sono omesse qui. Puoi aspettarti di ottenere una risposta come per mostrare una risposta con.
:::

:::: details

::: tabs

=== Pubblica internamente

Richiesta `POST` inviata:
`/api/v1/knowledge_bases/{ID of your KB}/ans

:::
::::

### Manage attachments

Permesso richiesto: `knowledge_base.editor`

Aggiungi allegato:

Richiesta `POST` con payload inviata: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of

::: details

<<< @/fixtures/rest-api/knowledgebase/post-answers-attachment.json

:::

Elimina allegato:

Richiesta `DELETE` inviata: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}/att

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers-attachments.json

:::
