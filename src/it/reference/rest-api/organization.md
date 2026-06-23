---
order: 12
title: Organizzazione
---

# Organizzazione

## Elenca

Permesso richiesto: `ticket.agent` **o** `admin.organization`

::: info
Tecnicamente, i clienti possono vedere solo la propria organizzazione, se applicabile.
:::

Richiesta `GET` inviata: `/api/v1/organizations`

::: details

<<< @/fixtures/rest-api/organizations/get-res.json

:::

## Mostra

Permesso richiesto: `ticket.agent` **o** `admin.organization`

Richiesta `GET` inviata: `/api/v1/organizations/{id}`

::: info
Tecnicamente, qualsiasi utente in questione può vedere solo la propria organizzazione.
:::

::: details

<<< @/fixtures/rest-api/organizations/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.organization`

Richiesta `POST` inviata: `/api/v1/organizations`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/organizations/post-req.json

=== Risposta

<<< @/fixtures/rest-api/organizations/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.organization`

Richiesta `PUT` inviata: `/api/v1/organizations/{id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/organizations/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/organizations/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `admin.organization`

Richiesta `DELETE` inviata: `/api/v1/organizations/{id}`

::: danger
**Questa è una rimozione permanente**

Tieni presente che rimuovere organizzazioni non può essere annullato.
:::

::: details

Risposta:

<<< @/fixtures/rest-api/organizations/delete-id-res.json

:::
