---
order: 8
title: 'Collegamento ticket'
---

# Collegamento ticket

## Ottieni

Permesso richiesto: `ticket.agent` **o** `admin`

Richiesta `GET` inviata: `/api/v1/links`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/links/get-req.json

=== Risposta

<<< @/fixtures/rest-api/links/get-res.json

:::
::::

## Aggiungi

Permesso richiesto: `ticket.agent` **o** `admin`

Richiesta `POST` inviata: `/api/v1/links/add`

::::: details

:::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/links/post-req.json

:::info
Il valore per `link_object_target` deve essere l'_ID ticket_. Il
valore per `link_obje
:::

=== Risposta

<<< @/fixtures/rest-api/links/post-res.json

::::
:::::

## Elimina

Permesso richiesto: `ticket.agent` **o** `admin`

Richiesta `DELETE` inviata: `/api/v1/links/remove`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/links/remove/delete-req.json

=== Risposta

<<< @/fixtures/rest-api/links/remove/delete-res.json

:::
::::
