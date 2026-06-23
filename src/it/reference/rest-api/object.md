---
order: 11
title: Oggetto
---

# Oggetto

::: danger
Regolare gli oggetti tramite API può causare seri problemi alla tua istanza.
Procedi con assoluta.
:::

## Elenca

Permesso richiesto: `admin.object`

Richiesta `GET` inviata: `/api/v1/object_manager_attributes`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/get-res.json

:::

## Mostra

Permesso richiesto: `admin.object`

Richiesta `GET` inviata: `/api/v1/object_manager_attributes/{id}`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/get-id-res.json

:::

## Crea

Permesso richiesto: `admin.object`

Richiesta `POST` inviata: `/api/v1/object_manager_attributes`

### Booleano

:::: details

::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-req.json

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-res.json

:::
::::

### Data

:::: details

::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-date-req.json

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-date-res.json

:::
::::

### Data e ora

:::: details

::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-req.json

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-res.json

:::
::::

### Intero

:::: details

::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-req.json

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-res.json

:::
::::

### Selezione

:::: details

::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-select-req.json

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-select-res.json

:::
::::

### Testo

::::: details

:::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-text-req.json

:::tip

I campi di input di Zammad possono avere 4 tipi diversi:

- `email`
- `tel`
- `text`
- `url` (non
:::

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-text-res.json

::::
:::::

### Selezione ad albero

:::: details

::: tabs key:regres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-req.json

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-res.json

:::
::::

::::info
Tieni presente che i payload sopra coprono oggetti ticket. Questo va bene nella
maggior parte delle situazioni, tranne.

::: tabs

=== Ticket

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-ticket-req.json

=== User

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-user-req.json

=== Organization

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-organization-req.json

=== Group

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-group-req.json

:::
::::

## Aggiornamento

Permesso richiesto: `admin.object`

Eccetto per il metodo di richiesta, i payload per aggiornare e creare
oggetti sono identici. Per.

Zammad restituirà due attributi durante l'aggiornamento: `data_option` e
`data_option_new`.

Richiesta `PUT` inviata: `/api/v1/object_manager_attributes/{id}`

::::: details

:::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/object_manager_attributes/put-id-req.json

::: info
Assicurati di fornire `data_option`. Zammad è molto esigente se ometti
questo attributo.
:::

=== Risposta

<<< @/fixtures/rest-api/object_manager_attributes/put-id-res.json

::::
:::::

## Elimina

Permesso richiesto: `admin.object`

Richiesta `DELETE` inviata: `/api/v1/object_manager_attributes/{id}`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/delete-id-res.json

:::

## Esegui migrazioni database

Permesso richiesto: `admin.object`

::: warning
Dopo aver eseguito le migrazioni database, un riavvio di Zammad è
_obbligatorio_. Se non disattivato.
:::

Richiesta `POST` inviata:
`/api/v1/object_manager_attributes_execute_migrations`

::: details

<<< @/fixtures/rest-api/object_manager_attributes_execute_migrations/post-res.json

:::
