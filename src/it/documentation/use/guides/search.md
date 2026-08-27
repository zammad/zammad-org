---
order: 2
title: Cerca
---

# Cerca

In Zammad, you can search for all available information like:

- Oggetto e testo del messaggio
- Nomi e indirizzi email
- Testo negli allegati file
- User and organization details (like notes, names, etc.)

A seconda di cosa stai cercando e della quantità di dati nella tua istanza
Zammad, puoi cercare in diversi modi. Continua a leggere per conoscere le
basi della ricerca, seguite dalla ricerca dettagliata e dall'uso della
sintassi Elasticsearch.

## Basic search

The search is located in the top left corner of the primary
navigation. Either select it via mouse or use the keyboard shortcut
[[s]]. After activation, you can see the tickets that were recently closed
from your taskbar as well as your recent search queries. To search, simply
type a term. The search then displays all matching items for which you have
at least view or read permissions, grouped by type like users and
tickets. Selecting one of those results opens the item as tab in the
taskbar.

Searching for a term also matches any values that begin with it. For
example, searching for `brooks` also finds values like `brookster`. This
does not apply when you use an attribute notation like
`owner.lastname:brooks` (described in the [Elasticsearch
syntax](#using-elasticsearch-syntax) section below), which matches exact
values only.

![Screenshot shows search results in the
taskbar](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

If you press [[enter]] or click on `detailed search`, Zammad opens the
detailed search as a tab in the taskbar. There you can narrow down your
search by selecting a specific object type (e.g. organization), using
advanced filters or even using Elasticsearch syntax. Read on for more
information.

## Detailed search

A volte un semplice termine di ricerca potrebbe non darti i risultati che
stai cercando. Zammad fornisce diverse opzioni per restringere la ricerca
nella pagina di ricerca dettagliata.

Advanced filters are not available for customer accounts. If your account
has customer permissions only, the **Search entity** selector and the
advanced filter options described below are not shown.

![Screenshot che mostra la ricerca
dettagliata](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Sort the results

Per ordinare i risultati in base ai valori della colonna, fai clic su
un'intestazione di colonna. L'ordinamento è indicato da una freccia. Fai
clic di nuovo sulla colonna per cambiare l'ordinamento da crescente a
decrescente e viceversa.

### Limit search to object type

Limita la ricerca a un tipo di oggetto usando il selettore di schede
**Entità di ricerca** sotto il campo di ricerca (ad esempio utente o
ticket). Questo limita la ricerca al tipo di oggetto selezionato e ai dati
correlati. Ad esempio, quando selezioni **Ticket**, la ricerca restituisce
anche ticket dove il proprietario o il cliente corrisponde al termine di
ricerca.

### Use advanced filters

Unlike the search field, you can filter the search results based on specific
attributes and their values.  To do so, click on the `Advanced filters`
button on the right side, which opens an area where you can specify
additional conditions based on specific attributes and their values. Choose
an attribute and enter or select a value to match against. When using more
than one filter, all conditions must be met; they are logically connected by
AND. This also applies to the search term in the main search field.

Remove a single filter by hovering over it and clicking the ::x:: that
appears next to the value field. To remove all filters, click the `x` in the
main search bar at the top next to the `x filter(s)` label and confirm the
removal.

To add another filter, click `Add filter` below or between the existing
filter rows and pick an attribute from the selection list. The list only
offers attributes that are not used by any filter yet, so each attribute can
be used only once.

Se vuoi memorizzare o condividere il tuo filtro, puoi farlo copiando
l'URL. Include il filtro completo. Tieni presente che i risultati della
ricerca potrebbero essere diversi per altri utenti a causa di permessi
divergenti.

Se non hai ancora trovato quello che stai cercando, puoi beneficiare della
ricerca alimentata da Elasticsearch. Puoi trovare alcuni esempi nella
sezione successiva.

## Using Elasticsearch syntax

This is an advanced topic for power users. By using Elasticsearch syntax,
you can exactly filter your data for specific attribute values. All indexed
attributes are supported. Read on to find examples of how to use it or head
over to the [indexed attributes by Elasticsearch
page](/en/reference/es-indexed-attributes) where you can find a list with
additional attributes.

### Important information

- Assicurati di selezionare l'oggetto rilevante nel selettore **Entità di
  ricerca**. Ad esempio `customer.lastname` è disponibile per i ticket, ma
  non per gli utenti.
- Multiple search terms are combined by a logical AND by default, so `smith
  open` only finds results containing both terms. Use an explicit `OR` if
  you want either of them.
- Quando si combina una query Elasticsearch con filtri avanzati, tieni
  presente che tutte le condizioni dei filtri avanzati e la sintassi di
  ricerca sono logicamente connesse da AND, quindi verranno visualizzati
  solo i risultati che corrispondono a tutte le condizioni dei filtri
  avanzati e al tuo termine di ricerca.
- Per fornire valori contenenti uno spazio, racchiudili in `"`, ad esempio
  `priority.name:"2 normale"`.

### Logic operators and ranges

Puoi combinare condizioni usando `AND` e `OR` come operatori logici. Usa
`TO` per specificare intervalli per valori con un ordine (ad esempio intero
o data). Includi un limite dell'intervallo specificato usando parentesi
quadre. Escludilo usando parentesi graffe. Puoi anche combinare queste
parentesi, ad esempio per includere il limite inferiore ed escludere quello
superiore. I termini nidificati possono essere ottenuti separandoli con
parentesi `()`.

`AND` e `OR` con parentesi:

```plain
owner.lastname:brooks AND tags:(internal OR onboarding)
```

`TO` con carattere jolly asterisco:

```plain
state.name:open AND article_count: [5 TO *]
```

`TO` con esclusione di un limite di un intervallo:

```plain
article.created_at:[2025-03-21 TO 2026-05-19}
```

### Fuzzy search

Se non sei sicuro dell'ortografia esatta di un valore, usa la tilde (`~`)
come suffisso per eseguire una ricerca fuzzy.

```plain
owner.firstname:lawren~
```

### Negating search

Se vuoi escludere valori specificati, puoi usare la negazione `!`. Per
negare più di un termine, usa le parentesi per tutti.

Escludi il proprietario con cognome "brooks":

```plain
!owner.lastname:brooks
```

Escludi più condizioni:

```plain
owner.lastname:brooks AND !(tags:internal OR tags:onboarding)
```

### Regex

Puoi anche usare regex per cercare. Racchiudi il termine regex in `/`.

```plain
customer.lastname:/(bra?.n|doe)/
```
