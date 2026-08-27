---
order: 1
title: Panoramiche
---

# Panoramiche

![Screenshot che mostra la sezione panoramiche
aperta](/screenshots/cypress/documentation/use/guide-overview.cy.js/overview-full.png)

## Introduzione

Overviews are a core component of Zammad. Open them by clicking the
`Overviews` button in the primary navigation or use the keyboard shortcut
[[o]]. You can think of overviews as a kind of email inbox with different
folders. Use them to find new tickets that you want to process and to keep
track of tickets that have not yet been completed.

A seconda della configurazione del sistema e di cosa ha impostato il tuo
amministratore Zammad, puoi trovare lì diverse panoramiche, ad esempio:

- I tuoi ticket assegnati
- Ticket non assegnati e aperti
- Ticket con promemoria raggiunto
- Ticket escalati

Selezionare una panoramica nella navigazione di secondo livello mostra una
tabella che include i ticket corrispondenti.

## Usage and features

Le panoramiche possono essere definite dagli amministratori in base a regole
e condizioni. Ciò significa che se un ticket è stato modificato e la
condizione della panoramica non corrisponde più, il ticket non è più
visibile in questa panoramica.

Overviews are updated automatically. You don't have to reload your browser
to observe changes. You can adjust the order temporarily by clicking on one
of the column headers and change their width by dragging the column
dividers.  The order is only preserved until you switch to another overview
or reload the page.

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

### Color coded state and priority

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

### Open a ticket

Open a ticket by simply clicking on the row. This opens the ticket as a tab
in your taskbar and shows you the ticket detail view. If this ticket is
already present in your taskbar, it activates this tab instead of opening a
duplicate tab.

Se una panoramica contiene più di un ticket e ne apri uno, puoi trovare
frecce nell'intestazione della visualizzazione dettagli ticket per passare
al ticket successivo/precedente di questa panoramica.

### Bulk actions

Perform bulk actions by selecting multiple tickets and either use the bulk
action flyout or drag them with the mouse to invoke the bulk action
overlay. You can find more information about that in the [Bulk
Actions](../advanced-features#bulk-actions) section in the advanced features
page.

### Reorder overviews

If the order of the overviews doesn't reflect your working process or you
just like to have a different order, you can re-arrange them for your
account. Use the `reorder items` button at the very top of the second level
navigation, which opens your [profile
settings](/en/documentation/use/user-profile#overviews) where you can define
a custom order for your overviews. To change the order, simply drag & drop
them by clicking the handles on the left side.

Se il tuo amministratore cambia l'ordine, il tuo ordine personalizzato viene
preservato. Puoi tornare all'ordine del tuo amministratore facendo clic sul
pulsante `Reimposta ordine panoramiche`.
