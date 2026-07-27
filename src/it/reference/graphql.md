---
order: 7
title: 'API GraphQL'
---

# API GraphQL

## Introduzione

In addition to Zammad's [REST API](rest-api/intro), you can fetch,
manipulate and create data via the powerful and open-source [GraphQL
API](https://graphql.org/){target=_blank} too.

This documentation isn't intended to cover everything about GraphQL. It
should give you a basic understanding about how you can fetch and
create/manipulate data to build upon. For a comprehensive guide, have a look
at [GraphQL's documentation](https://graphql.org/learn/){target=_blank}.

GraphQL è usato da molti servizi web, anche grandi. È diventato una sorta di
standard del settore.

Recuperare lo schema GraphQL di Zammad (chiamato introspezione) abilita
l'autocompletamento e la convalida lato client.

## Per iniziare

Seguendo i passaggi successivi sarai in grado di inviare con successo una
semplice richiesta e ricevere dati.

### Client

Per inviare richieste e ricevere risposte, hai bisogno di un client API. Se
già lavori con le API, puoi saltare questa sezione.
  Se sei nuovo sull’argomento, cerca un client che si adatti alle tue
esigenze. A seconda del tuo sistema operativo, potresti avere diverse
opzioni. Alcuni esempi di client popolari con supporto GraphQL sono:

- [Bruno](https://www.usebruno.com/downloads){target=_blank}
- [Insomnia](https://insomnia.rest/download){target=_blank}
- [Postman](https://www.postman.com/downloads/){target=_blank}

### Autenticazione

Se non già presente, crea un [token nel profilo
Zammad](/en/documentation/use/user-profile#token-access) che vuoi utilizzare
come utente API. A seconda di ciò che vuoi ottenere tramite API, imposta le
autorizzazioni di conseguenza.

Assicurati di copiarlo prima di chiudere la finestra di dialogo perché non
potrai visualizzarlo di nuovo.

### Prepare your client

Apri il tuo client API e configuralo.

- Aggiungi il tuo token da Zammad come bearer token.
- Crea una richiesta e aggiungi il tuo dominio Zammad con il suffisso
  `/graphql`, ad esempio `https://fastlane.inc/graphql`.
- Recupera lo schema GraphQL di Zammad dall'introspezione o caricalo da
  file.

::: warning
L’introspezione dello schema è abilitata per Zammad nell’ambiente di sviluppo. Per abilitarla nei sistemi di produzione, imposta la variabile
d’ambiente `ZAMMAD_GRAPHQL_INTROSPECTION` su `true`. Farlo aumenta la potenziale superficie di attacco ed è
**sconsigliato**.
:::

Fai clic su dettagli per guardare uno screencast che mostra i passaggi di
base usando Bruno come client.

::: details
<video controls="controls" src="/public/videos/graphql-client-setup-bruno.mp4" />
:::

### Create a request

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

Il valore sopra è nel formato ID globale dell’implementazione GraphQL di
Zammad. A seconda del tipo di oggetto con cui vuoi lavorare, sostituisci
`User` con un altro oggetto come `Ticket`, `Organization`, `Group`,
ecc. Zammad si aspetta un valore numerico come ID.

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

:::: tabs

==== Ticket

::: tabs

=== Richiesta

<<< @/fixtures/graphql/ticket-req.gql

=== Risposta

<<< @/fixtures/graphql/ticket-res.json

:::

==== Utente

::: tabs

=== Richiesta

<<< @/fixtures/graphql/user-req.gql

=== Risposta

<<< @/fixtures/graphql/user-res.json

:::

==== Organizzazione

::: tabs

=== Richiesta

<<< @/fixtures/graphql/organization-req.gql

=== Risposta

<<< @/fixtures/graphql/organization-res.json

:::

::::

## Appendice

### Global ids

::: info

Sostituisci `{ID}` con un valore numerico.

:::

- `gid://zammad/Ticket/{ID}`
- `gid://zammad/User/{ID}`
- `gid://zammad/Organization/{ID}`
