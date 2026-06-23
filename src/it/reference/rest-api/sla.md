---
order: 16
title: SLA
---

# Accordi sul livello di servizio (SLA)

::: tip
Gli SLA dipendono dai [calendari di Zammad](/it/reference/rest-api/calendar).
:::

## Elenca

Permesso richiesto: `admin.sla`

Richiesta `GET` inviata: `/api/v1/slas`

::: details

Risposta:

<<< @/fixtures/rest-api/slas/get-res.json

:::

## Mostra

Permesso richiesto: `admin.sla`

Richiesta `GET` inviata: `/api/v1/slas/{id}`

::: details

<<< @/fixtures/rest-api/slas/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.sla`

Richiesta `POST` inviata: `/api/v1/slas`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/slas/post-req.json

=== Risposta

<<< @/fixtures/rest-api/slas/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.sla`

Richiesta `PUT` inviata: `/api/v1/slas/{id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/slas/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/slas/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `admin.sla`

Richiesta `DELETE` inviata: `/api/v1/slas/{id}`

::: danger
**Questa è una rimozione permanente!**

Tieni presente che rimuovere configurazioni SLA non può essere annullato.
:::

::: details

Risposta:

<<< @/fixtures/rest-api/slas/delete-id-res.json

:::
