---
order: 2
title: Checkliste
---

# Checkliste

Zammad hat verschiedene Endpunkte für Checklisten:

- [Checklisten](#checklisten)
- [Checklisten-Elemente](#checklisten-elemente)
- [Checklisten-Vorlagen](#checklisten-vorlagen)

:::info
_Checklist templates_ include their items whereas the _standard
checklist_ has a separate item endpoint.
:::

## Checklisten

:::info
Um Elemente der Checkliste hinzuzufügen, verwenden Sie den Endpunkt [Checklisten-Elemente](#checklisten-elemente).
:::

### Anzeigen

Erforderliche Berechtigung: `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklists/{checklisten id}`

::: details Show response

<<< @/fixtures/rest-api/checklists/get-checklist-id-res.json

:::

### Per Ticket anzeigen

Erforderliche Berechtigung: `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklists/by_ticket/{ticket id}`

::: details Show response

<<< @/fixtures/rest-api/checklists/by_ticket/get-ticket-id-res.json

:::

### Erstellen

Erforderliche Berechtigung: `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/checklists`

:::: details Show request/response

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

:::: details Show request/response

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

::: details Show response

<<< @/fixtures/rest-api/checklists/delete-checklist-id-res.json

:::

## Checklisten-Elemente

### Anzeigen

Erforderliche Berechtigung: `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklist_items/{checklist item id}`

::: details Show response

<<< @/fixtures/rest-api/checklist_items/get-checklist-item-id-res.json

:::

### Erstellen

Erforderliche Berechtigung: `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/checklist_items`

:::: details Show request/response

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

:::: details Show request/response

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

::: details Show response

<<< @/fixtures/rest-api/checklist_items/delete-checklist-item-id-res.json

:::

## Checklisten-Vorlagen

### Anzeigen

Erforderliche Berechtigung: `admin.checklists` oder `ticket.agent`

`GET`-Anfrage gesendet: `/api/v1/checklist_templates/{checklist template
id}`

::: details Show response

<<< @/fixtures/rest-api/checklist_templates/get-checklist-template-id-res.json

:::

### Erstellen

Erforderliche Berechtigung: `admin.checklists`

`POST`-Anfrage gesendet: `/api/v1/checklist_templates`

:::: details Show request/response

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

:::: details Show request/response

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

:::details Show response

<<< @/fixtures/rest-api/checklist_templates/delete-checklist-template-id-res.json

:::
