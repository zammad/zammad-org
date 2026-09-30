---
order: 10
title: Utente
---

# Utente

::: info
Tieni presente che gli esempi seguenti sono stati forniti con i permessi `admin` e
`ticket.agent`.
:::

## Me - current user

Permesso richiesto: qualsiasi

Richiesta `GET` inviata: `/api/v1/users/me`

::: details

<<< @/fixtures/rest-api/users/me/get-res.json

:::

## Elenca

Permesso richiesto: `ticket.agent` **o** `admin.user`

Richiesta `GET` inviata: `/api/v1/users`

::: details

<<< @/fixtures/rest-api/users/get-res.json

:::

## Mostra

Permesso richiesto: `ticket.agent` **o** `admin.user` **o**
`ticket.customer` (condiviso o

::: info
Tecnicamente, qualsiasi elenco restituirà solo le informazioni proprie dell'utente.
:::

Richiesta `GET` inviata: `/api/v1/users/{id}`

::: details

<<< @/fixtures/rest-api/users/get-user-id-res.json

:::

## Crea

Permesso richiesto: `admin.user` **o** `ticket.agent`

Richiesta `POST` inviata: `/api/v1/users`

::: tip
**Questo dipende dai permessi**

Gli agenti non possono impostare password utente, ruoli o permessi di gruppo.
:::

::: tip
Non sei sicuro di quali attributi puoi usare o impostare? Esegui una query GET su qualsiasi
utente esistente adatto.
:::

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/users/post-req.json

=== Risposta

<<< @/fixtures/rest-api/users/post-res.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.user` **o** `ticket.agent`

Richiesta `PUT` inviata: `/api/v1/users/{id}`

::: tip
**This depends on permissions**

Agents can't set user passwords, roles or group permission. Instead
Zammad will apply the default sign up role. Check Zammad's admin interface
under _Manage > Roles_ and check which is selected as **Default at signup**.

Zammad strips `group_ids` and `roles` from an agent's request before it
writes anything, then answers `200 Ok` as if the update had gone through.
Re-read the record to see whether the change actually landed.

Agents can only edit customer-role targets. Sending a request for an
agent-role target fails with `403 Not authorized` and changes nothing.
:::

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/users/put-id-req.json

=== Risposta

<<< @/fixtures/rest-api/users/put-id-res.json

:::
::::

## Elimina

::: danger
**Questa è una rimozione permanente**

Tieni presente che rimuovere utenti non può essere annullato. Zammad.
:::

Tecnicamente, puoi eliminare utenti tramite `/api/v1/users/{id}`. Tuttavia,
raccomandiamo vivamente.

### Via data privacy endpoint

Permesso richiesto: `admin.data_privacy`

Richiesta `POST` inviata: `/api/v1/data_privacy_task`

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/users/post-privacy-task-req.json

=== Risposta

<<< @/fixtures/rest-api/users/post-privacy-task-res.json

:::
::::

### Via user endpoint <Badge type="danger" text="not recommended" />

Permesso richiesto: `admin.user`

Richiesta `DELETE` inviata: `/api/v1/users/{id}`

::: details

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
