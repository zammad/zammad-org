---
order: 4
title: 'Списак задатака'
---

# Списак задатака

Zammad има различите ендпоинт-е за цхецклисте:

- [Цхецклисте](#checklists)
- [Ставке цхецклисте](#checklist-items)
- [Шаблони цхецклисти](#checklist-templates)

::: info
_Шаблони цхецклисти_ укључују своје ставке док _стандардна
цхецклиста_ има засебан ендпоинт за ставке.
:::

## Спискови задатака

::: info
Да бисте додали ставке цхецклисте, користите [ендпоинт за ставке цхецклисте](#checklist-items).
:::

### Прикажи

Потребна дозвола: `ticket.agent`

`GET`-захтев послат: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/get-checklist-id-res.json

:::

::: tip
Атрибут `checklist_id` тикета можете пронаћи слањем `GET` захтева на `/api/v1/tickets/{ticket id}`.
:::

### Креирај

Потребна дозвола: `ticket.agent`

`POST`-захтев послат: `/api/v1/checklists`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/checklists/post-req.json

=== Одговор

<<< @/fixtures/rest-api/checklists/post-res.json

:::
::::

### Освежавање

Потребна дозвола: `ticket.agent`

`PATCH`-захтев послат: `/api/v1/checklists/{checklist id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/checklists/patch-checklist-id-req.json

=== Одговор

<<< @/fixtures/rest-api/checklists/patch-checklist-id-res.json

:::
::::

### Обриши

Потребна дозвола: `ticket.agent`

`DELETE`-захтев послат: `/api/v1/checklists/{checklist id}`

::: details

<<< @/fixtures/rest-api/checklists/delete-checklist-id-res.json

:::

## Ставке цхецклисте

### Прикажи

Потребна дозвола: `ticket.agent`

`GET`-захтев послат: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/get-checklist-item-id-res.json

:::

### Креирај

Потребна дозвола: `ticket.agent`

`POST`-захтев послат: `/api/v1/checklist_items`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/checklist_items/post-req.json

=== Одговор

<<< @/fixtures/rest-api/checklist_items/post-res.json

:::
::::

### Освежавање

Потребна дозвола: `ticket.agent`

`PATCH`-захтев послат: `/api/v1/checklist_items/{checklist item id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-req.json

=== Одговор

<<< @/fixtures/rest-api/checklist_items/patch-checklist-item-id-res.json

:::
::::

### Обриши

Потребна дозвола: `ticket.agent`

`DELETE`-захтев послат: `/api/v1/checklist_items/{checklist item id}`

::: details

<<< @/fixtures/rest-api/checklist_items/delete-checklist-item-id-res.json

:::

## Шаблони цхецклисти

### Преглед листе

Потребна дозвола: `admin.checklists`

`GET`-захтев послат: `/api/v1/checklist_templates`

::: details

<<< @/fixtures/rest-api/checklist_templates/list-checklist-templates-res.json

:::

### Прикажи

Потребна дозвола: `admin.checklists` или `ticket.agent`

`GET`-захтев послат: `/api/v1/checklist_templates/{checklist template id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/get-checklist-template-id-res.json

:::

### Креирај

Потребна дозвола: `admin.checklists`

`POST`-захтев послат: `/api/v1/checklist_templates`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/checklist_templates/post-req.json

=== Одговор

<<< @/fixtures/rest-api/checklist_templates/post-res.json

:::
::::

### Освежавање

Потребна дозвола: `admin.checklists`

`PATCH`-захтев послат: `/api/v1/checklist_templates/{checklist template id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-req.json

=== Одговор

<<< @/fixtures/rest-api/checklist_templates/patch-checklist-template-id-res.json

:::
::::

### Обриши

Потребна дозвола: `admin.checklists`

`DELETE`-захтев послат: `/api/v1/checklist_templates/{checklist template
id}`

::: details

<<< @/fixtures/rest-api/checklist_templates/delete-checklist-template-id-res.json

:::
