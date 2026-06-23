---
order: 14
title: Ruolo
---

# Ruoli

## Elenca

Permesso richiesto: `admin.role`

Richiesta `GET` inviata: `/api/v1/roles`

::: details

<<< @/fixtures/rest-api/roles/get-res.json

:::

## Mostra

Permesso richiesto: `admin.role`

Richiesta `GET` inviata: `/api/v1/roles/{id}`

::: details

<<< @/fixtures/rest-api/roles/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.role`

Richiesta `POST` inviata: `/api/v1/roles`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/roles/post-req.json

=== Risposta

<<< @/fixtures/rest-api/roles/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.role`

Richiesta `PUT` inviata: `/api/v1/roles/{id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/roles/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/roles/put-id-res.json

:::
::::
