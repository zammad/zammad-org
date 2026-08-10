---
order: 10
title: Администрација
---

# Online обавештење

::: info
Доступност обавештења у великој мери зависи од дозвола корисника
и одабраних подешавања обавештења.

Имајте на уму да се најбољи резултати увек постижу са _Агентима_.
:::

## Преглед листе

Потребна дозвола: `any`

`GET`-захтев послат: `/api/v1/online_notifications?expand=true`

::: tip
Користите упит `expand` да бисте сазнали које објекте погађа. У супротном ћете
мораће да утврдите који ID одговара којем типу објекта.
:::

::: details

<<< @/fixtures/rest-api/online_notifications/get-res.json

:::

## Прикажи

Потребна дозвола: `any`

`GET`-захтев послат: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/get-id-res.json

:::

## Освежавање

Потребна дозвола: `any`

`PUT`-захтев послат: `/api/v1/online_notifications/{id}`

:::: details

::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/online_notifications/put-id-req.json

=== Одговор

<<< @/fixtures/rest-api/online_notifications/put-id-res.json

:::
::::

## Обриши

Потребна дозвола: `any`

`DELETE`-захтев послат: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/delete-id-res.json

:::

## Означи све као прочитано

Потребна дозвола: `any`

`POST`-захтев послат: `/api/v1/online_notifications/mark_all_as_read`

::: details

<<< @/fixtures/rest-api/online_notifications/mark_all_as_read/post-res.json

:::
