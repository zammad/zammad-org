---
order: 9
title: Menzioni
---

# Menzioni

::: warning
L'endpoint delle menzioni dipende dai permessi del gruppo e se l'utente
che stai usando è un.
:::

## Elenca

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `GET` inviata: `/api/v1/mentions`

::: details

<<< @/fixtures/rest-api/mentions/get-res.json

:::

## Crea

Permesso richiesto: `ticket.agent`

Richiesta `POST` inviata: `/api/v1/mentions`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/mentions/post-req.json

=== Risposta

<<< @/fixtures/rest-api/mentions/post-res.json

:::
::::

La menzione verrà creata per l'utente della sessione corrente.

::: tip
Se vuoi menzionare/iscrivere altri utenti, puoi farlo inviando
un'intestazione `From` aggiuntiva.
:::

## Elimina

Permesso richiesto: `ticket.agent`

Richiesta `DELETE` inviata: `/api/v1/mentions/{id}`

::: details

<<< @/fixtures/rest-api/mentions/delete-id-res.json

:::
