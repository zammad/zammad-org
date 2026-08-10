---
order: 7
title: 'База знања'
---

# База знања

Zammad има више крајњих тачака повезаних са базом знања. Најважније - али не
и све - су обухваћене у овој документацији. Опште крајње тачке за саму базу
знања можете пронаћи испод, праћене подкрајњим тачкама за
[одговоре](#answers) и [категорије](#categories).

## Опште о бази знања

::: info
Примери захтева и одговора укључују ID базе знања `1`. Ваш ID може бити другачији, на пример ако сте
некада раније креирали базу знања, избрисали је па креирали нову.
:::

### Преглед

Потребна дозвола: `knowledge_base.editor`

`POST`-захтев послат: `/api/v1/knowledge_bases/init`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-init.json

:::

### Прикажи

Потребна дозвола: `knowledge_base.reader` или `knowledge_base.editor`

`GET`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-kb.json

:::

### Zammad тим

Потребна дозвола: `knowledge_base.editor`

`PATCH`-захтев послат: `/api/v1/knowledge_bases/manage/{ID of your KB}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/patch-manage.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/patch-manage-response.json

:::
::::

### Rails команде

Потребна дозвола: `knowledge_base.editor`

`GET`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-permissions.json

:::

### Rails команде

Потребна дозвола: `knowledge_base.editor`

`PUT`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/permissions`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/put-permissions.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/put-permissions-response.json

:::
::::

## Категорије

### Промена редоследа прегледа

Потребна дозвола: `knowledge_base.editor`

`PATCH`-захтев послат: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/reorder_categories`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/patch-reorder.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-response.json

:::
::::

### Промена редоследа прегледа

::: info
Морате навести редослед свих категорија првог нивоа, тј.
категорија без родитељске категорије (родитељ: `>> Početna stranica <<`).
:::

Потребна дозвола: `knowledge_base.editor`

`PATCH`-захтев послат: `/api/v1/knowledge_bases/{ID of your
KB}/categories/reorder_root_categories`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/patch-reorder-root-response.json

:::
::::

### Прикажи

Потребна дозвола: `knowledge_base.reader` или `knowledge_base.editor`

`GET`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID
of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories.json

:::

### Креирај

Потребна дозвола: `knowledge_base.editor`

`POST`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/categories`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/post-categories.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/post-categories-response.json

:::
::::

### Измене

Потребна дозвола: `knowledge_base.editor`

`PATCH`-захтев послат: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/patch-categories.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/patch-categories-response.json

:::
::::

### Обриши

Потребна дозвола: `knowledge_base.editor`

`DELETE`-захтев послат: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-categories.json

:::

### Rails команде

Потребна дозвола: `knowledge_base.editor`

`GET`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID
of category}/permissions`

::: details

<<< @/fixtures/rest-api/knowledgebase/get-categories-permissions.json

:::

### Rails команде

Потребна дозвола: `knowledge_base.editor`

`PUT`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/categories/{ID
of category}/permissions`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/put-categories-permissions-response.json

:::
::::

## Одговори

### Промена редоследа прегледа

Потребна дозвола: `knowledge_base.editor`

`PATCH`-захтев послат: `/api/v1/knowledge_bases/{ID of your
KB}/categories/{ID of category}/reorder_answers`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/patch-categories-reorder-answers-response.json

:::
::::

### Прикажи

Потребна дозвола: `knowledge_base.reader` или `knowledge_base.editor`

`GET`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of
answer}`

::: tip
Ако желите да добијете садржај одговора, додајте параметре `?full=1&include_contents=1` у URL упита. Захтев за следећи одговор укључио је ове параметре.
:::

:::: details

<<< @/fixtures/rest-api/knowledgebase/get-answers.json

:::

### Креирај

Потребна дозвола: `knowledge_base.editor`

`POST`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/answers`

::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/post-answers.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/post-answers-response.json

:::
::::

### Измене

Потребна дозвола: `knowledge_base.editor`

`PATCH`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID
of answer}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/knowledgebase/patch-answers.json

=== Одговор

<<< @/fixtures/rest-api/knowledgebase/patch-answers-response.json

:::
::::

### Обриши

Потребна дозвола: `knowledge_base.editor`

`DELETE`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID
of answer}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers.json

:::

### Управљање статусом објаве

Потребна дозвола: `knowledge_base.editor`

::: info
Одговори су овде изостављени. Очекујте одговор као приказ одговора са попуњеном вредношћу за
`archived_at`, `published_at` или `internal_at`, у зависности од тога који захтев извршите.
:::

:::: details

::: tabs

=== Објави интерно

`POST`-захтев послат:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/internal`

=== Објави јавно

`POST`-захтев послат:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/publish`

=== Архивирај

`POST`-захтев послат:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/archive`

=== Уклони из архиве

`POST`-захтев послат:
`/api/v1/knowledge_bases/{ID of your KB}/answers/{ID of answer}/unarchive`

:::
::::

### Управљање каналима

Потребна дозвола: `knowledge_base.editor`

Додај привитак:

`POST`-захтев са payloadom послат: `/api/v1/knowledge_bases/{ID of your
KB}/answers/{ID of answer}/attachments`

::: details

<<< @/fixtures/rest-api/knowledgebase/post-answers-attachment.json

:::

Обриши привитак:

`DELETE`-захтев послат: `/api/v1/knowledge_bases/{ID of your KB}/answers/{ID
of answer}/attachments/{ID of attachment}`

::: details

<<< @/fixtures/rest-api/knowledgebase/delete-answers-attachments.json

:::
