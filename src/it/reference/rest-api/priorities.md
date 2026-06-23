---
order: 13
title: Priorità
---

# Priorità

## Elenca

Permesso richiesto: `admin.object` **o** `ticket.agent` **o**
`ticket.customer`

Richiesta `GET` inviata: `/api/v1/ticket_priorities`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-res.json

:::

## Mostra

Permesso richiesto: `admin.object` **o** `ticket.agent` **o**
`ticket.customer`

Richiesta `GET` inviata: `/api/v1/ticket_priorities/{id}`

::: details

<<< @/fixtures/rest-api/ticket_priorities/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.object`

Richiesta `POST` inviata: `/api/v1/ticket_priorities`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_priorities/post-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_priorities/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.object`

Richiesta `PUT` inviata: `/api/v1/ticket_priorities/{id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_priorities/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_priorities/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `admin.object`

Richiesta `DELETE` inviata: `/api/v1/ticket_priorities/{id}`

::: danger
**Questa è una rimozione permanente**

Tieni presente che rimuovere priorità non può essere annullato.

R
:::

::: details

Risposta:

<<< @/fixtures/rest-api/ticket_priorities/delete-id-res.json

:::
