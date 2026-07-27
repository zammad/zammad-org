---
order: 1
title: Introduzione
---

# Introduzione

Zammad fornisce una potente REST-API[^1] che permette tutte le operazioni
disponibili tramite.

Questa pagina ti dà una prima impressione delle cose che generalmente
valgono per tutti gli endpoint.

## Client API

Sono disponibili client API. Tieni presente che questi client potrebbero non
fornire accesso a.

- [Client
  Ruby](https://github.com/zammad/zammad-api-client-ruby){target=_blank}
  (ufficiale)
- [Client
  PHP](https://github.com/zammad/zammad-api-client-php){target=_blank}
  (ufficiale)
- [Client Python](https://pypi.org/project/zammad-py/){target=_blank} (terze
  parti)
- [Client .NET](https://github.com/Asesjix/Zammad-Client){target=_blank}
  (terze parti)
- [Client API
  Android](https://github.com/KirkBushman/zammad-android){target=_blank}
  (terze parti)
- [Go Client](https://github.com/AlessandroSechi/zammad-go){target=_blank}
  (terza parte; solo client API, nessuna applicazione “pronta all’uso”)

## Autenticazione

Zammad supporta tre diversi metodi di autenticazione per la sua API.

### HTTP basic authentication (username/password)

Il nome utente / password deve essere fornito come intestazione HTTP nella
chiamata HTTP. Questa autenticazione.

```sh
curl -u {username}:{password} https://{fqdn}/{endpoint}
```

::: warning
Sconsigliamo vivamente di usare l'autenticazione di base. Usa i token
di accesso ogni volta che possibile.
:::

### HTTP token authentication (access token)

Il token di accesso deve essere fornito come intestazione HTTP nella
chiamata HTTP. Ogni utente può creare.

```sh
curl -H "Authorization: Token token={your_token}" https://{fqdn}/{endpoint}
```

### OAuth2 (accesso token)

Il token deve essere fornito come intestazione HTTP nelle tue
chiamate. Questo permette ad applicazioni di terze parti.

```sh
curl -H "Authorization: Bearer {your_token}" https://{fqdn}/{endpoint}
```

## Endpoints and example data

Per semplicità non forniremo comandi specifici nelle pagine successive, ma
diremo invece.

Il formato della risposta sarà una risposta JSON completa da un'istanza
Zammad predefinita.

## Content type

Zammad restituisce payload JSON ogni volta che recuperi dati. Se intendi
fornire dati,.

## Response payloads (expand)

Zammad restituisce sempre informazioni inclusi suggerimenti a tutte le
relazioni. Se hai bisogno di maggiori informazioni.

Questo switch fornirà ancora più informazioni - almeno relazioni con nome
oltre agli ID.

**Payload utente:**

:::: details
::: tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-user-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-user-expand-false-res.json

:::
::::

**Payload ticket:**

:::: details
::: tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-ticket-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-ticket-expand-false-res.json

:::
::::

::: tip
Tieni presente che i Flussi di lavoro principali potrebbero limitare l'accesso ad attributi o
valori.
:::

## Paginazione

Poiché Zammad limita il numero di oggetti restituiti per motivi di
prestazioni, potresti dover.

::: info
**Numero di oggetti restituiti:** Zammad ha limiti rigidi per il
numero massimo di oggetti restituiti.
:::

Per usare la paginazione avrai bisogno di due opzioni get: `per_page` e
`page`. Combina.

## Ricerca tramite API

### Endpoint search

Alcuni endpoint supportano una query di ricerca. Questi sono:

- `Gruppi <group>`
- `Organizzazioni <organization>`
- `Ruoli <role>`
- `Ticket <ticket>`
- `Utenti <user>`

I seguenti endpoint supportano anche una query di ricerca, ma non sono
esplicitamente trattati.

- Sessioni chat
- Base di conoscenza
- Macro
- Panoramica
- Modelli
- Modulo di testo

#### Search example

Richiesta `GET` inviata: `/api/v1/tickets/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-basic-search-res.json
:::

#### Expand parameter

Se vuoi avere informazioni correlate aggiuntive, puoi usare il parametro
`expand`. Usa.

Richiesta `GET` inviata: `/api/v1/tickets/search?query=welcome&expand=true`

::: details
<<< @/fixtures/rest-api/intro/get-expand-search-res.json
:::

#### Full parameter

Puoi anche estendere la risposta usando il parametro `full`. Tieni presente
che questa risposta.

Richiesta `GET` inviata: `/api/v1/tickets/search?query=welcome&full=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-res.json
:::

#### With total count parameter

Usando questo parametro verrà anche emessa la quantità di risultati di
ricerca. Può essere combinato.

Richiesta `GET` inviata:
`/api/v1/tickets/search?query=welcome&full=true&with_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-with-total-count-res.json
:::

#### Only total count parameter

Usando questo parametro `only_total_count` verrà emessa solo la quantità di
risultati di ricerca.

Richiesta `GET` inviata:
`/api/v1/tickets/search?query=welcome&only_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-total-count-res.json
:::

### Global search

Se hai bisogno di cercare non solo in un tipo di oggetto specifico, puoi
farlo usando la ricerca globale.

Richiesta `GET` inviata: `/api/v1/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-global-search-res.json
:::

### Condition based search

Puoi anche usare condizioni come per trigger e scheduler per cercare tramite
API. Se non.

Quindi, come costruisco una tale richiesta basata su condizioni?

- In Zammad, vai all'interfaccia di amministrazione e crea una condizione,
  ad esempio creando una nuova panoramica.
- Vai alla `console Rails </admin/console>`, usando `rails c` / `zammad run
  rails.
- Cerca la condizione creata, regola i seguenti esempi alle tue esigenze:

``` ruby
puts Overview.find_by(name: 'My test overview').attributes.slice('condition').to_json
```

``` ruby
puts Trigger.find_by(name: 'My new test trigger').attributes.slice('condition').to_json
```

Questo porta a un output come il seguente:

::: details
<<< @/fixtures/rest-api/intro/condition-based-search.json
:::

Usa questo come payload nella tua richiesta `POST` in una ricerca
endpoint. La risposta include.

## Sorting search results

Zammad ti permette di ordinare i tuoi risultati di ricerca per campo se
necessario.

### `sort_by`

Aggiungi `?sort_by={row name}` alla tua query per ordinare per una riga
specifica che appare nella.

### `order_by`

Aggiungi `?order_by={direction}` alla tua query per passare tra crescente e
decrescente.

Le direzioni sono: `asc` e `desc`.

::: tip
Solitamente vorrai combinare entrambi i parametri nelle tue ricerche -
ad esempio: `?query={search st
:::

## Actions on behalf of other users

**Requisito:** l'utente usato per eseguire la query per conto richiede
il permesso `admin.user`.

Eseguire query API per conto di altri utenti ti permette ad esempio di
creare ticket da un diverso.

Per farlo, aggiungi una nuova intestazione HTTP chiamata `From` alla tua
richiesta. Il valore di questa intestazione può essere.

- ID utente
- login utente
- email utente

`From` è disponibile per tutti gli endpoint.

## Codifica

L'API si aspetta la codifica UTF-8. Tieni presente che specialmente quando
usi URL con opzioni get.

If you want to learn more about URL encoding, [this Wikipedia
article](https://en.wikipedia.org/wiki/Percent-encoding){target=_blank} may
be of help

[^1]: **Re**presentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**n
