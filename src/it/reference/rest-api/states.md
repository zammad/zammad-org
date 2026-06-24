---
order: 17
title: Stati
---

# Stati

::: warning
Creare, modificare o rimuovere stati tramite gli endpoint seguenti non è
consigliato! Puoi farlo.
:::

## Elenca

Permesso richiesto: `admin.object` **o** `ticket.agent` **o**
`ticket.customer`

Richiesta `GET` inviata: `/api/v1/ticket_states`

::: details

<<< @/fixtures/rest-api/ticket_states/get-res.json

:::

## Mostra

Permesso richiesto: `admin.object` **o** `ticket.agent` **o**
`ticket.customer`

Richiesta `GET` inviata: `/api/v1/ticket_states/{id}`

::: details

<<< @/fixtures/rest-api/ticket_states/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.object`

Richiesta `POST` inviata: `/api/v1/ticket_states`

::: info
Below payload makes use of `state_type_id` which is a instance
specific set of IDs. State types indicate how the state will work.

As there's no endpoint for retrieving these, please use the
[Rails console](/en/reference/rails-commands).
:::

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_states/post-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_states/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.object`

Richiesta `PUT` inviata: `/api/v1/ticket_states/{id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_states/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_states/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `admin.object`

Richiesta `DELETE` inviata: `/api/v1/ticket_states/{id}`

::: danger
**Questa è una rimozione permanente**

Tieni presente che rimuovere stati ticket non può essere annullato.
:::

::: details

Risposta:

<<< @/fixtures/rest-api/ticket_states/delete-id-res.json

:::
