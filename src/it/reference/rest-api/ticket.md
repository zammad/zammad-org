---
order: 19
title: Ticket
---

# Ticket

::: warning
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
**On behalf of users**

If you want to create tickets on behalf of other users, use the `customer_id` attribute. This requires the `ticket.agent`
permission. Without it, `customer_id` is ignored and the ticket's **Customer** field is set to the current user. Use
`guess:{email address}` to save an API call if you don't know the user's ID or want to create the user in question
(`"customer_id": "guess:jane@doe.com"`).

When creating a ticket on behalf of a customer with an initial article, you **must** set `article.sender` to "Customer"
explicitly. Without this, the sender defaults to "Agent" (based on the current user's permission). This affects the
ticket's `create_article_sender_id` and the resulting contact timestamp calculations.

The same applies to articles added later via PUT: set sender explicitly there as well when acting on behalf of a customer.
Since the sender of an article cannot be changed after creation, it is important to set it correctly from the start.

For more details on the sender attribute, see [articles](/en/reference/rest-api/articles).

:::

::: tip
**Add mention subscription right away**

Add the `mentions` attribute to your ticket payload and provide an array of user ids to directly subscribe them during
ticket creation.

E.g.: `"mentions": [1, 5, 7, 8],`

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
The `sender` attribute of the initial article determines the ticket's `create_article_sender_id` and contact timestamps.
For the full list of article attributes and their behavior, see [articles](/en/reference/rest-api/articles).
:::

## Aggiornamento

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `PUT` inviata: `/api/v1/tickets/{ticket id}`

::: tip
**Disattiva le notifiche:** Per aggiornare un ticket senza attivare le notifiche dell'agente (email e in-app), aggiungi la seguente
intestazione HTTP alla tua richiesta:

```plain
X-Zammad-Suppress-Notifications: true
```

Questo è utile per le integrazioni automatizzate che aggiornano i ticket tramite webhook o trigger per evitare cicli di notifiche.
L'intestazione ha effetto solo sugli account di amministratori e agenti e viene ignorata per i clienti. Funziona anche per l'endpoint `POST /api/v1/ticket_articles`.
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
