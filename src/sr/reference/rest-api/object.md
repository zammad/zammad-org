---
order: 11
title: Објекат
---

# Објекат

::: danger
Подешавање објеката путем API-ја може изазвати озбиљне проблеме на вашој инстанци.
Поступајте изузетно опрезно и проверите да не модификујете ниједно од Zammad-ових
подразумеваних поља.

Ако желите да сакријете поља, уместо тога искористите основне токове рада у Zammad-у!
:::

## Преглед листе

Потребна дозвола: `admin.object`

`GET`-захтев послат: `/api/v1/object_manager_attributes`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/get-res.json

:::

## Прикажи

Потребна дозвола: `admin.object`

`GET`-захтев послат: `/api/v1/object_manager_attributes/{id}`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/get-id-res.json

:::

## Креирај

Потребна дозвола: `admin.object`

`POST`-захтев послат: `/api/v1/object_manager_attributes`

### Логички тип

:::: details

::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-req.json

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-res.json

:::
::::

### Датум

:::: details

::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-date-req.json

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-date-res.json

:::
::::

### Датум и време

:::: details

::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-req.json

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-res.json

:::
::::

### Целобројно поље

:::: details

::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-req.json

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-res.json

:::
::::

### за одабир

:::: details

::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-select-req.json

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-select-res.json

:::
::::

### Текст

::::: details

:::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-text-req.json

::: tip

Поља за унос у Zammad-у могу бити 4 различита типа:

- `email`
- `tel`
- `text`
- `url` (не подржава линк предлошке)

Зависно од изабраног типа уноса, Zammad очекује различите формате
података. На пример: емаил захтева да буде наведена адреса имејла.
:::

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-text-res.json

::::
:::::

### за одабир

:::: details

::: tabs key:regres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-req.json

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-res.json

:::
::::

:::: info
Имајте на уму да горе наведени payloadi обухватају објекте карата. То је у реду за
већину ситуација, осим ако прегледате подразумевана права приступа објектима. Зато су наведени одвојено ради вашег прегледа.

Атрибут `object` контролише који се контекст користи:

- `Ticket`
- `User`
- `Organisation`
- `Group`

::: tabs

=== Тикета

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-ticket-req.json

=== Корисник

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-user-req.json

=== Организација

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-organization-req.json

=== Група

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-group-req.json

:::
::::

## Освежавање

Потребна дозвола: `admin.object`

Осим у методама захтева, payloadi за ажурирање и креирање објеката су
идентични. За потпуне примере payloada пређите на `create_object`.

Zammad ће приликом ажурирања вратити два атрибута: `data_option` и
`data_option_new`. Први атрибут садржи тренутне активне вредности, а други
нове вредности (које постају активне након извршења миграција базе
података).

`PUT`-захтев послат: `/api/v1/object_manager_attributes/{id}`

::::: details

:::: tabs key:reqres

=== Захтев

<<< @/fixtures/rest-api/object_manager_attributes/put-id-req.json

::: info
Обавезно наведите `data_option`. Zammad строхо захтева да овај атрибут буде присутан. Имајте на уму да је мењање типа објекта _након_
креирања немогуће.
:::

=== Одговор

<<< @/fixtures/rest-api/object_manager_attributes/put-id-res.json

::::
:::::

## Обриши

Потребна дозвола: `admin.object`

`DELETE`-захтев послат: `/api/v1/object_manager_attributes/{id}`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/delete-id-res.json

:::

## Изврши миграције базе података

Потребна дозвола: `admin.object`

::: warning
Након извршавања миграција базе података, поновно покретање Zammad-а је
_обавезно_. Ако није онемогућено путем
[поставке аутоматског гашења](/en/reference/rails-commands#auto-shutdown-setting),
Zammad се аутоматски рестартује - очекујте кратку недоступност.
:::

`POST`-захтев послат: `/api/v1/object_manager_attributes_execute_migrations`

::: details

<<< @/fixtures/rest-api/object_manager_attributes_execute_migrations/post-res.json

:::
