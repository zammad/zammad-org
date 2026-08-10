---
order: 14
title: Улога
---

# Улоге

## Преглед листе

Потребна дозвола: `admin.role`

`GET` -Захтев послат: `/api/v1/roles`

::: details

<<< @/fixtures/rest-api/roles/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.role`

`GET` -Захтев послат: `/api/v1/roles/{id}`

::: details

<<< @/fixtures/rest-api/roles/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.role`

`POST` -Захтев послат: `/api/v1/roles`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/roles/post-req.json

=== Одговор

<<< @/fixtures/rest-api/roles/post-res.json

:::
::::

## Освежавање

Потребна дозвола: `admin.role`

`PUT` -Захтев послат: `/api/v1/roles/{id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/roles/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/roles/put-id-res.json

:::
::::
