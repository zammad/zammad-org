---
order: 6
title: Gruppo
---

# Gruppo

::: info

- Tieni presente che `follow_up_possible` potrebbe non funzionare come previsto. I
  valori possibili sono.
:::

## Elenca

Permesso richiesto: `admin.group`

Richiesta `GET` inviata: `/api/v1/groups`

::: details

<<< @/fixtures/rest-api/groups/get-res.json

:::

## Mostra

Permesso richiesto: `admin.group`

Richiesta `GET` inviata: `/api/v1/groups/{id}`

::: details

<<< @/fixtures/rest-api/groups/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.group`

Richiesta `POST` inviata: `/api/v1/groups`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/groups/post-req.json

=== Risposta

<<< @/fixtures/rest-api/groups/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.group`

Richiesta `PUT` inviata: `/api/v1/groups/{id}`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/groups/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/groups/put-id-res.json

:::
::::

## Elimina

Permesso richiesto: `admin.group`

Richiesta `DELETE` inviata: `/api/v1/groups/{id}`

::: danger

**Questa è una rimozione permanente**:

Tieni presente che rimuovere gruppi non può essere annullato.

Rimuovi

:::

::: details

<<< @/fixtures/rest-api/groups/delete-id-res.json

:::
