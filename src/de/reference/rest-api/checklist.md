---
order: 4
title: Checkliste
---

# Checkliste

Zammad hat verschiedene Endpunkte für Checklisten:

- [Checklisten](#checklisten)
- [Checklisten-Elemente](#checklisten-elemente)
- [Checklisten-Vorlagen](#checklisten-vorlagen)

:::info
_Checklisten-Vorlagen_ enthalten ihre Elemente, während die
_Standard-Checkliste_ einen eigenen Endpunkt für Elemente hat.
:::

## Checklisten

:::info
Um Elemente der Checkliste hinzuzufügen, verwenden Sie den Endpunkt [Checklisten-Elemente](#checklisten-elemente).
:::

### Anzeigen

Erforderliche Berechtigung: `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklists/{checklisten id}`

::: details

<<< @/fixtures/rest-api/checklists/get-checklist-id-res.json

:::

::: tip
Sie können das Attribut `checklist_id` eines Tickets finden, indem Sie eine `GET`-Anfrage an `/api/v1/tickets/{ticket id}` senden.
:::

### Erstellen

Erforderliche Berechtigung: `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/checklists`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklists/post-req.json

=== Response

<<< @/fixtures/rest-api/checklists/post-res.json

:::
::::

### Aktualisierung

Erforderliche Berechtigung: `ticket.agent`

`PATCH`-Anfrage gesendet: `/api/v1/checklists/{checklisten id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklists/patch-checklist-id-req.json

=== Response

<<< @/fixtures/rest-api/checklists/patch-checklist-id-res.json

:::
::::

### Löschen

Erforderliche Berechtigung: `ticket.agent`

`DELETE`-Anfrage gesendet: `/api/v1/checklists/{checklisten id}`

::: details

<<< @/fixtures/rest-api/checklists/delete-checklist-id-res.json

:::

## Checklisten-Elemente

### Anzeigen

Erforderliche Berechtigung: `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/get-checklist-item-id-res.json

:::

### Erstellen

Erforderliche Berechtigung: `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/checklist_items`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_items/post-req.json

=== Response

<<< @/fixtures/rest-api/checklist_items/post-res.json

:::
::::

### Aktualisierung

Erforderliche Berechtigung: `ticket.agent`

`PATCH`-Anfrage gesendet: `/api/v1/checklist_items/{checklist item id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-req.json

=== Response

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-res.json

:::
::::

### Löschen

Erforderliche Berechtigung: `ticket.agent`

`DELETE`-Anfrage gesendet: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/delete-checklist-item-id-res.json

:::

## Checklisten-Vorlagen

### Anzeigen

Erforderliche Berechtigung: `admin.checklists` oder `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklist_templates/{checklist template
id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/get-checklist-template-id-res.json

:::

### Erstellen

Erforderliche Berechtigung: `admin.checklists`

`POST`-Anfrage gesendet: `/api/v1/checklist_templates`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_templates/post-req.json

=== Response

<<< @/fixtures/rest-api/checklist_templates/post-res.json

:::
::::

### Aktualisierung

Erforderliche Berechtigung: `admin.checklists`

`PATCH`-Anfrage gesendet: `/api/v1/checklist_templates/{checklist template
id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-req.json

=== Response

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-res.json

:::
::::

### Löschen

Erforderliche Berechtigung: `admin.checklists`

`DELETE`-Anfrage gesendet: `/api/v1/checklist_templates/{checklist template
id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/delete-checklist-template-id-res.json

:::
