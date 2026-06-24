---
order: 1
title: Panoramiche
---

# Panoramiche

![Screenshot che mostra la sezione panoramiche
aperta](/screenshots/cypress/documentation/use/guide-overview.cy.js/overview-full.png)

## Introduzione

Le panoramiche sono un componente fondamentale di Zammad. Aprile facendo
clic sul pulsante `Panoramiche` nella barra di navigazione o usa la
scorciatoia da tastiera [[o]]. Puoi pensare alle panoramiche come a un tipo
di casella di posta elettronica con cartelle diverse. Usale per trovare
nuovi ticket da elaborare e per tenere traccia dei ticket non ancora
completati.

A seconda della configurazione del sistema e di cosa ha impostato il tuo
amministratore Zammad, puoi trovare lì diverse panoramiche, ad esempio:

- I tuoi ticket assegnati
- Ticket non assegnati e aperti
- Ticket con promemoria raggiunto
- Ticket escalati

Selezionare una panoramica nella navigazione di secondo livello mostra una
tabella che include i ticket corrispondenti.

## Utilizzo e funzionalità

Le panoramiche possono essere definite dagli amministratori in base a regole
e condizioni. Ciò significa che se un ticket è stato modificato e la
condizione della panoramica non corrisponde più, il ticket non è più
visibile in questa panoramica.

Le panoramiche vengono aggiornate automaticamente. Non devi ricaricare il
browser per osservare le modifiche. Puoi regolare l'ordine temporaneamente
facendo clic su una delle intestazioni di colonna nonché modificare la
larghezza trascinando i divisori di colonna. L'ordine viene preservato solo
finché non passi a un'altra panoramica o ricarichi la pagina.

Per ogni panoramica, puoi trovare un badge allegato. Il numero in questo
badge ti dice quanti ticket ci sono in ogni panoramica.

Gli elenchi di ticket nelle panoramiche possono anche essere raggruppati per
un attributo specifico (ad esempio cliente, organizzazione,
proprietario). Questo deve essere regolato dal tuo amministratore Zammad. Se
un raggruppamento è attivato, puoi trovare lì anche un badge con un
contatore dei ticket inclusi.

A seconda di cosa stai cercando, seleziona una panoramica adatta e inizia a
lavorare su un ticket.

::: tip
Se ti manca una panoramica o vuoi avere impostazioni diverse, fai sapere al tuo amministratore Zammad!
:::

### Stato e priorità codificati per colore

Per visualizzare diversi stati e priorità dei ticket, le voci nella tabella
sono codificate per colore.

L'icona accanto al titolo del ticket rappresenta principalmente la necessità
di azione:

![Screenshot che mostra gli stati dei
ticket](/screenshots/documentation/use/overviews/states.png)

- Cerchio giallo: azione necessaria (ad esempio nuovo, aperto, promemoria
  raggiunto)
- Cerchio grigio: in pausa, nessuna azione necessaria ora (ad esempio in
  attesa)
- Cerchio verde: nessuna azione più necessaria (ad esempio chiuso, unito)
- Triangolo rosso: azione immediata necessaria (ticket escalato a causa di
  una violazione SLA)

Se vedi un cerchio con un gradiente blu/rosa, indica che un [agente
AI](ai#agenti-ai) sta attualmente lavorando sul ticket.

La **priorità** è rappresentata dal colore del titolo del ticket:

![Screenshot che mostra le priorità dei
ticket](/screenshots/documentation/use/overviews/priorities.png)

- 1 bassa: grigio
- 2 normale: blu
- 3 alta: rosso

### Apri un ticket

Apri un ticket semplicemente facendo clic sulla riga. Questo apre il ticket
come scheda nella barra di navigazione sinistra e ti mostra la
visualizzazione dettagli ticket. Se questo ticket è già presente nella tua
barra di navigazione, attiva questa scheda invece di aprire una scheda
duplicata.

Se una panoramica contiene più di un ticket e ne apri uno, puoi trovare
frecce nell'intestazione della visualizzazione dettagli ticket per passare
al ticket successivo/precedente di questa panoramica.

### Azioni bulk

Esegui azioni bulk selezionando più ticket e usa i campi a tendina o
trascinali con il mouse per invocare l'overlay dell'azione bulk. Puoi
trovare maggiori informazioni al riguardo nella sezione [Azioni
bulk](../advanced-features#azioni-bulk) nella pagina delle funzionalità
avanzate.

### Riordina panoramiche

Se l'ordine delle panoramiche non riflette il tuo processo di lavoro o vuoi
semplicemente avere un ordine diverso, puoi riorganizzarle per il tuo
account. Usa il pulsante `riordina elementi` in cima alla barra di
navigazione di secondo livello, che apre le tue [impostazioni del
profilo](/it/documentation/use/user-profile#panoramiche) dove puoi definire
un ordine personalizzato per le tue panoramiche.

Per cambiare l'ordine, trascina e rilascia semplicemente facendo clic sulle
maniglie sul lato sinistro.

Se il tuo amministratore cambia l'ordine, il tuo ordine personalizzato viene
preservato. Puoi tornare all'ordine del tuo amministratore facendo clic sul
pulsante `Reimposta ordine panoramiche`.
