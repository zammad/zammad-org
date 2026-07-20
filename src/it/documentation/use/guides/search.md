---
order: 2
title: Cerca
---

# Cerca

In Zammad, puoi cercare praticamente tutte le informazioni disponibili come:

- Oggetto e testo del messaggio
- Nomi e indirizzi email
- Testo negli allegati file
- Dettagli di utenti e organizzazioni (come note, nomi, ecc.)

A seconda di cosa stai cercando e della quantità di dati nella tua istanza
Zammad, puoi cercare in diversi modi. Continua a leggere per conoscere le
basi della ricerca, seguite dalla ricerca dettagliata e dall'uso della
sintassi Elasticsearch.

## Ricerca di base

The search is located in the top left corner of the primary
navigation. Either select it via mouse or use the keyboard shortcut
[[s]]. After activation, you can see the tickets which got recently closed
from your taskbar as well as your recent search queries. To search, simply
type a term. The search then displays all matching items for which you have
at least view or read permissions, grouped by type like users and
tickets. Selecting one of those results opens the item as tab in the primary
navigation.

![Screenshot shows search results in primary
navigation](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

Se premi [[enter]] o fai clic su `ricerca dettagliata`, Zammad apre la
ricerca dettagliata come scheda nella navigazione principale. Lì puoi
restringere la ricerca selezionando un tipo di oggetto specifico (ad esempio
organizzazione), usare filtri avanzati o persino usare la sintassi
Elasticsearch. Continua a leggere per maggiori informazioni.

## Ricerca dettagliata

A volte un semplice termine di ricerca potrebbe non darti i risultati che
stai cercando. Zammad fornisce diverse opzioni per restringere la ricerca
nella pagina di ricerca dettagliata.

![Screenshot che mostra la ricerca
dettagliata](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Ordina i risultati

Per ordinare i risultati in base ai valori della colonna, fai clic su
un'intestazione di colonna. L'ordinamento è indicato da una freccia. Fai
clic di nuovo sulla colonna per cambiare l'ordinamento da crescente a
decrescente e viceversa.

### Limita la ricerca al tipo di oggetto

Limita la ricerca a un tipo di oggetto usando il selettore di schede
**Entità di ricerca** sotto il campo di ricerca (ad esempio utente o
ticket). Questo limita la ricerca al tipo di oggetto selezionato e ai dati
correlati. Ad esempio, quando selezioni **Ticket**, la ricerca restituisce
anche ticket dove il proprietario o il cliente corrisponde al termine di
ricerca.

### Usa filtri avanzati
<!--Screenshot saltato per ora. Verrà aggiunto dopo che saranno disponibili più attributi-->
A differenza del campo di ricerca, puoi filtrare i risultati della ricerca in base ad attributi specifici e ai loro valori.
Per farlo, fai clic sul pulsante `Filtri avanzati` sul lato destro, che apre un'area dove puoi specificare condizioni aggiuntive
basate su attributi specifici e i loro valori. Scegli un attributo e inserisci o seleziona un valore che i
risultati della ricerca devono corrispondere. Ogni attributo è disponibile solo una volta. Quando usi più di un filtro, tieni presente che
devono essere tutti soddisfatti perché sono logicamente connessi da un operatore AND. Questo si applica anche al termine di ricerca
nel campo di ricerca principale.

Rimuovi un singolo filtro facendo clic su ::x:: accanto al campo valore. Per
rimuovere tutti i filtri, fai clic sulla `x` nella barra di ricerca
principale in alto accanto all'etichetta `x filtro/i`.

Se vuoi memorizzare o condividere il tuo filtro, puoi farlo copiando
l'URL. Include il filtro completo. Tieni presente che i risultati della
ricerca potrebbero essere diversi per altri utenti a causa di permessi
divergenti.

Se non hai ancora trovato quello che stai cercando, puoi beneficiare della
ricerca alimentata da Elasticsearch. Puoi trovare alcuni esempi nella
sezione successiva.

## Uso della sintassi Elasticsearch

Questo argomento ha una propria sezione perché è un argomento avanzato per
utenti esperti. Usando la sintassi Elasticsearch, puoi filtrare esattamente
i tuoi dati per valori di attributi specifici. Fondamentalmente, tutti gli
attributi indicizzati sono supportati. Continua a leggere per trovare esempi
su come usarlo o vai alla [pagina degli attributi indicizzati da
Elasticsearch](/it/reference/es-indexed-attributes) dove puoi trovare un
elenco con attributi aggiuntivi.

### Informazioni Importanti

- Assicurati di selezionare l'oggetto rilevante nel selettore **Entità di
  ricerca**. Ad esempio `customer.lastname` è disponibile per i ticket, ma
  non per gli utenti.
- Quando si combina una query Elasticsearch con filtri avanzati, tieni
  presente che tutte le condizioni dei filtri avanzati e la sintassi di
  ricerca sono logicamente connesse da AND, quindi verranno visualizzati
  solo i risultati che corrispondono a tutte le condizioni dei filtri
  avanzati e al tuo termine di ricerca.
- Per fornire valori contenenti uno spazio, racchiudili in `"`, ad esempio
  `priority.name:"2 normale"`.

### Operatori logici e intervalli

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

### Ricerca fuzzy

Se non sei sicuro dell'ortografia esatta di un valore, usa la tilde (`~`)
come suffisso per eseguire una ricerca fuzzy.

```plain
owner.firstname:lawren~
```

### Negazione della ricerca

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
