---
order: 10
title: Notifica
---

# Notifica online

:::info
La disponibilità della notifica dipende fortemente dai permessi dell'utente e dalle notifiche scelte.
:::

## Elenca

Permesso richiesto: `any`

Richiesta `GET` inviata: `/api/v1/online_notifications?expand=true`

::: tip
Usa la richiesta expand per conoscere gli oggetti interessati. Altrimenti dovrai
scoprire cosa.
:::

::: details

<<< @/fixtures/rest-api/online_notifications/get-res.json

:::

## Mostra

Permesso richiesto: `any`

Richiesta `GET` inviata: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/get-id-res.json

:::

## Aggiornamento

Permesso richiesto: `any`

Richiesta `PUT` inviata: `/api/v1/online_notifications/{id}`

::::details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/online_notifications/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/online_notifications/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `any`

Richiesta `DELETE` inviata: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/delete-id-res.json

:::

## Segna tutto come letto

Permesso richiesto: `any`

Richiesta `POST` inviata: `/api/v1/online_notifications/mark_all_as_read`

::: details

<<< @/fixtures/rest-api/online_notifications/mark_all_as_read/post-res.json

:::
