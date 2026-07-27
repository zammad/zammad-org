---
order: 7
title: 'Knowledge Base'
---

# Knowledge Base

Zammad hat mehrere Endpunkte, die mit der Knowledge Base zusammenhängen. Die
wichtigsten - aber nicht alle - werden in dieser Dokumentation
behandelt. Sie finden die allgemeinen Endpunkte zur Knowledge Base selbst
weiter unten, gefolgt von den Unter-Endpunkten für [Antworten](#antworten)
und [Kategorien](#kategorien).

## Knowledge base general

::: info
Die Beispiele für Anfragen und Antworten enthalten die Knowledge Base ID `1`. Ihre ID kann anders lauten, zum Beispiel wenn Sie
eine Knowledge Base erstellt haben, diese gelöscht und nochmal eine neue erstellt haben.
:::

### Übersicht

Erforderliche Berechtigung: `knowledge_base.editor`

`POST`-Request gesendet: `/api/v1/knowledge_bases/init`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-init.json

:::

### Anzeigen

Erforderliche Berechtigung: `knowledge_base.reader` oder
`knowledge_base.editor`

`GET`-Request gesendet: `/api/v1/knowledge_bases/{ID of your KB}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-kb.json

:::

### Change settings

Erforderliche Berechtigung: `knowledge_base.editor`

`PATCH`-Request gesendet: `/api/v1/knowledge_bases/manage/{ID of your KB}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-manage.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-manage-response.json

:::
::::

### Show permissions

Erforderliche Berechtigung: `knowledge_base.editor`

`GET`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-permissions.json

:::

### Change permissions

Erforderliche Berechtigung: `knowledge_base.editor`

`PUT`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/permissions`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/put-permissions.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/put-permissions-response.json

:::
::::

## Kategorien

### Reorder sub-categories

Erforderliche Berechtigung: `knowledge_base.editor`

`PATCH`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/reorder_categories`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-reorder.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-response.json

:::
::::

### Reorder root categories

::: info
Sie müssen die Reihenfolge aller Kategorien der obersten Ebene angeben, d.h.
Kategorien, die keine übergeordnete Kategorie haben (übergeordnete Kategorie: `>> Homepage <<`).
:::

Erforderliche Berechtigung: `knowledge_base.editor`

`PATCH`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/reorder_root_categories`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root-response.json

:::
::::

### Anzeigen

Erforderliche Berechtigung: `knowledge_base.reader` oder
`knowledge_base.editor`

`GET`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories.json

:::

### Erstellen

Erforderliche Berechtigung: `knowledge_base.editor`

`POST`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/post-categories.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/post-categories-response.json

:::
::::

### Ändern

Erforderliche Berechtigung: `knowledge_base.editor`

`PATCH`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-categories.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-categories-response.json

:::
::::

### Löschen

Erforderliche Berechtigung: `knowledge_base.editor`

`DELETE`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-categories.json

:::

### Show permissions

Erforderliche Berechtigung: `knowledge_base.editor`

`GET`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories-permissions.json

:::

### Change permissions

Erforderliche Berechtigung: `knowledge_base.editor`

`PUT`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/permissions`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions-response.json

:::
::::

## Antworten

### Reorder answers

Erforderliche Berechtigung: `knowledge_base.editor`

`PATCH`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/reorder_answers`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers-response.json

:::
::::

### Anzeigen

Erforderliche Berechtigung: `knowledge_base.reader` oder
`knowledge_base.editor`

`GET`-Request gesendet: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID
of answer}`

::: tip
Wenn Sie den Inhalt einer Antwort abrufen möchten, fügen Sie die Parameter `?full=1&include_contents=1` zur URL der Abfrage hinzu. Die
Anfrage für die folgende Antwort enthielt die Parameter.
:::

:::: details

<<< @/fixtures/rest-api/knowledgebase/get-answers.json

:::

### Erstellen

Erforderliche Berechtigung: `knowledge_base.editor`

`POST`-Request gesendet: `/api/v1/knowledge_bases/{ID of your KB}/answers`

::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/post-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/post-answers-response.json

:::
::::

### Ändern

Erforderliche Berechtigung: `knowledge_base.editor`

`PATCH`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/knowledgebase/patch-answers.json

=== Response

<<< @/fixtures/rest-api/knowledgebase/patch-answers-response.json

:::
::::

### Löschen

Erforderliche Berechtigung: `knowledge_base.editor`

`DELETE`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers.json

:::

### Manage publication status

Erforderliche Berechtigung: `knowledge_base.editor`

::: info
Antworten werden hier weggelassen. Sie können eine Antwort erwarten mit einem gesetzten Wert für
`archived_at`, `published_at` oder `internal_at`, je nachdem, welche Anfrage Sie ausführen.
:::

:::: details

::: tabs

=== Intern veröffentlichen

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/internal`

=== Veröffentlichen

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/publish`

=== Archivieren

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/archive`

===De-Archivieren

`POST`-Request sent:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/unarchive`

:::
::::

### Manage attachments

Erforderliche Berechtigung: `knowledge_base.editor`

Anhang hinzufügen:

`POST`-Request mit Nutzlast gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}/attachments`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-answers-attachment.json

:::

Anhang löschen:

`DELETE`-Request gesendet: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}/attachments/{ID of attachment}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers-attachments.json

:::
