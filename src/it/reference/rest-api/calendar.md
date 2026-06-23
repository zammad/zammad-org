---
order: 3
title: Calendario
---

# Calendario

:::tip
I calendari appartengono al [calcolo SLA](/it/reference/rest-api/sla) di Zammad.
:::

## Elenca

Permesso richiesto: `admin.calendar`

Richiesta `GET` inviata: `/api/v1/calendars`

::: details

<<< @/fixtures/rest-api/calendars/get-res.json

:::

## Mostra

Permesso richiesto: `admin.calendar`

Richiesta `GET` inviata: `/api/v1/calendars/{id}`

::: details

<<< @/fixtures/rest-api/calendars/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.calendar`

Richiesta `POST` inviata: `/api/v1/calendars`

:::: details

::: tabs key:req-res

=== Richiesta

<<< @/fixtures/rest-api/calendars/post-req.json

=== Risposta

<<< @/fixtures/rest-api/calendars/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.calendar`

Richiesta `PUT` inviata: `/api/v1/calendars/{id}`

:::: details

::: tabs key:req-res

=== Richiesta

<<< @/fixtures/rest-api/calendars/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/calendars/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `admin.calendar`

Richiesta `DELETE` inviata: `/api/v1/calendars/{id}`

::: danger

**Questa è una rimozione permanente**:

Tieni presente che rimuovere configurazioni Calendario non può essere annullato.
:::

::: details

<<< @/fixtures/rest-api/calendars/delete-id-res.json

:::
