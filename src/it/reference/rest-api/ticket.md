---
order: 19
title: Ticket
---

# Ticket

:::warning
Gli endpoint ticket dipendono dai permessi del gruppo e se l'utente che stai
usando è un **agente**.
:::

## Elenca

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `GET` inviata: `/api/v1/tickets`

::: details

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Mostra

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `GET` inviata: `/api/v1/tickets/{ticket id}`

::: details

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Crea

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `POST` inviata: `/api/v1/tickets`

::: tip
**Per conto di utenti**

Se vuoi creare ticket per conto di altri utenti, usa il
`c

:::

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tickets/post-req.json

=== Risposta

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
Per maggiori attributi e opzioni degli articoli dai un'occhiata a
[articoli](/it/reference/rest-api/articles).
:::

## Aggiornamento

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `PUT` inviata: `/api/v1/tickets/{ticket id}`

::: tip
**Suppress notifications:** To update a ticket without triggering agent notifications (email and in-app), add the
following HTTP header to your request:

```plain
X-Zammad-Suppress-Notifications: true
```

This is useful for automated integrations that update tickets via webhooks or triggers to avoid notification loops. The
header only affects admin and agent accounts and is ignored for customers. It also works for the
`POST /api/v1/ticket_articles` endpoint.
:::

::::: details

:::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
L'esempio sopra fornisce un articolo. Questo articolo è un _nuovo articolo_ e
non influisce su nessun.
:::

=== Risposta

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Aggiunta di allegati**

I payload degli allegati sono identici al metodo `POST`, usa semplicemente.
:::

## Elimina

Permesso richiesto: `admin`

Richiesta `DELETE` inviata: `/api/v1/tickets/{ticket id}`

::: danger

**Questa è una rimozione permanente**:

Tieni presente che rimuovere ticket non può essere annullato.
:::

::: details

Risposta:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
