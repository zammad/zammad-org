---
order: 7
title: 'API GraphQL'
---

# API GraphQL

## Introduzione

In addition to Zammad's [REST API](rest-api/intro), you can fetch,
manipulate and create data via the powerful and open-source [GraphQL
API](https://graphql.org/) too.

This documentation isn't intended to cover everything about GraphQL. It
should give you a basic understanding about how you can fetch and
create/manipulate data to build upon. For a comprehensive guide, have a look
at [GraphQL's documentation](https://graphql.org/learn/).

GraphQL è usato da molti servizi web, anche grandi. È diventato una sorta di
standard del settore.

Recuperare lo schema GraphQL di Zammad (chiamato introspezione) abilita
l'autocompletamento e la convalida lato client.

## Per iniziare

Seguendo i passaggi successivi sarai in grado di inviare con successo una
semplice richiesta e ricevere dati.

### Client

To send request and receive responses, you need an API client. If you are
already dealing with APIs, skip this section.  If you are new to the topic,
search for a client which fits your needs. Depending on your operating
system, you may have different options. Some examples for popular clients
with GraphQL support are:

- [Bruno](https://www.usebruno.com/downloads)
- [Insomnia](https://insomnia.rest/download)
- [Postman](https://www.postman.com/downloads/)

### Autenticazione

If not already present, create a [token in the Zammad
profile](/en/documentation/use/user-profile#token-access) you want to use as
API user. Depending what you want to achieve via API, set the permissions
accordingly.

Assicurati di copiarlo prima di chiudere la finestra di dialogo perché non
potrai visualizzarlo di nuovo.

### Prepara il tuo client

Apri il tuo client API e configuralo.

- Aggiungi il tuo token da Zammad come bearer token.
- Crea una richiesta e aggiungi il tuo dominio Zammad con il suffisso
  `/graphql`, ad esempio `https://fastlane.inc/graphql`.
- Recupera lo schema GraphQL di Zammad dall'introspezione o caricalo da
  file.

::: warning
The schema introspection is enabled for Zammad in development environment. To enable it for production systems, set the
environment variable `ZAMMAD_GRAPHQL_INTROSPECTION` to `true`. Doing so increases the potential attack surface and is
**not recommended**.
:::

Fai clic su dettagli per guardare uno screencast che mostra i passaggi di
base usando Bruno come client.

::: details
<video controls="controls" src="/public/videos/graphql-client-setup-bruno.mp4" />
:::

### Crea una richiesta

Tutte le richieste e risposte sono in formato JSON. Ciò significa che tutte
le informazioni devono essere incapsulate.

Diamo un'occhiata a una richiesta per recuperare informazioni da
Zammad. Tale richiesta inizia con.

Esempio di base per recuperare gli utenti con il loro nome e cognome:

```gql :line-numbers
query userName (
  $userId: ID!
  ) {
  user(userId: $userId) {
    firstname
    lastname
```

Il `$userId` dalla riga 2 definisce una variabile usata come ID. Nella
sezione delle variabili.

```json
{
  "userId": "gid://zammad/User/2"
}
```

The value above is in the global ID format of Zammad's GraphQL
implementation. Depending on which object type you want to deal with,
replace the `User` by another object like `Ticket`, `Organization`, `Group`,
etc. Zammad expects a numeric value as ID.

A partire dalla riga 4 nel blocco di codice sopra c'è la richiesta vera e
propria. Questo semplice esempio.

Fai clic su dettagli per guardare uno screencast che mostra una richiesta di
base usando una variabile in Bruno.

::: details
<video controls="controls" src="/public/videos/graphql-user-request-variable.mp4" />
:::

Per creare o modificare dati, sostituisci `query` con `mutation` nel corpo
della richiesta.

## Esempi

Gli esempi usano variabili per i diversi tipi di oggetto. Assicurati di
impostarla quando usi.

::::tabs

==== Ticket

:::tabs

=== Richiesta

<<< @/fixtures/graphql/ticket-req.gql

=== Risposta

<<< @/fixtures/graphql/ticket-res.json

:::

==== Utente

:::tabs

=== Richiesta

<<< @/fixtures/graphql/user-req.gql

=== Risposta

<<< @/fixtures/graphql/user-res.json

:::

==== Organizzazione

:::tabs

=== Richiesta

<<< @/fixtures/graphql/organization-req.gql

=== Risposta

<<< @/fixtures/graphql/organization-res.json

:::

::::

## Appendice

### ID globali

:::info

Sostituisci `{ID}` con un valore numerico.

:::

- `gid://zammad/Ticket/{ID}`
- `gid://zammad/User/{ID}`
- `gid://zammad/Organization/{ID}`
