---
order: 1
title: 'Interfaccia utente di Zammad'
---

# Interfaccia utente di Zammad

L'interfaccia utente (UI) di Zammad è progettata per fornire un'esperienza
intuitiva agli utenti. Si basa sul concetto di semplicità, chiarezza e
accessibilità ed è basata su principi comuni di progettazione del software
che dovrebbero rendere l'interfaccia utente piuttosto autoesplicativa.

Ci sono componenti modulari di base per diverse funzionalità per mantenere
l'interfaccia utente coerente. Questi componenti sono descritti nelle
sezioni seguenti. A seconda della schermata attualmente aperta, ci sono
componenti interattivi, come tooltip e un aiuto contestuale. Usali dove
necessario.

![Screenshot che mostra la visualizzazione dettagli
ticket](/screenshots/cypress/documentation/use/basics-zammad-ui.cy.js/zammad-ui-full.png)

## Elementi principali dell'interfaccia utente

Lo screenshot sopra mostra una visualizzazione dettagli ticket in
Zammad. Continua a leggere per una descrizione dei diversi elementi
principali di Zammad.

Barra laterale di navigazione
: Questa è la barra laterale sinistra che include la ricerca, le notifiche, le panoramiche, le schede dei ticket, il tuo avatar e  
     ilpulsante per creare un ticket.

Scheda di navigazione
: Ogni elemento della barra laterale di navigazione è chiamato scheda di navigazione. A seconda del contenuto, può essere una 
     scheda ticket (con la visualizzazione dei dettagli del ticket) o una scheda panoramica che apre l'elenco delle panoramiche disponibili.

Visualizzazione dettagli ticket
: Qui puoi gestire le richieste dei tuoi clienti. Si trova al centro dello schermo se è selezionata una scheda ticket nella barra 
     laterale di navigazione.

Barra laterale
: Questa è la barra laterale destra nella visualizzazione dettagli ticket. Contiene schede della barra laterale come clienti e checklist e visualizza la scheda attualmente selezionata.

Schede della barra laterale
: Sul lato destro della barra laterale, sono presenti delle piccole icone per passare da una scheda all'altra. La disponibilità di
queste schede dipende dalla configurazione del sistema, dalle autorizzazioni e dagli attributi del ticket (ad esempio, se al cliente del ticket
è assegnata un'organizzazione).

## Barra laterale di navigazione

La barra laterale di navigazione è il tuo posto centrale per accedere a
tutte le parti principali di Zammad. Potresti non vedere tutte perché alcune
dipendono dalla configurazione del tuo Zammad. La barra laterale di
navigazione è sempre visibile.

Area di ricerca e notifiche
: Include la funzione di ricerca che permette di cercare utenti, organizzazioni, ticket e praticamente qualsiasi informazione disponibile su Zammad.
Accanto alla barra di ricerca è presente il logo di Zammad. In caso di notifiche, viene visualizzato un badge
con un contatore delle notifiche ricevute.

Navigazione : Ti permette di passare a diverse schermate di Zammad come la
dashboard, le panoramiche, la base di conoscenza o la schermata telefono.

Schede contenuto : Qui trovi le schede per i tuoi ticket aperti, utenti e
organizzazioni.

Barra inferiore
: Impostazioni del profilo e pulsante per creare un nuovo ticket. Se hai permessi aggiuntivi, potrebbe esserci anche un pulsante delle impostazioni e uno dei rapporti.

Zammad salva immediatamente il progresso del tuo lavoro corrente, quindi
puoi passare facilmente tra le diverse aree di Zammad senza dover aver paura
di perdere dati come una risposta non ancora inviata in un ticket.

## Barra laterale

La barra laterale sul lato destro mostra tutte le informazioni rilevanti del
ticket e include funzionalità aggiuntive. La più importante è la barra
laterale del ticket. Passa tra le diverse barre laterali facendo clic sulla
scheda desiderata sul lato destro della barra laterale. Le schede
disponibili dipendono dal ticket e dalle funzionalità configurate del tuo
Zammad.

<!-- markdownlint-disable MD007 -->

Scheda ticket
: Questa scheda mostra le informazioni del ticket come proprietario, gruppo, priorità e stato e ti permette di modificare questi valori.
  Inoltre, le seguenti azioni sono disponibili quando fai clic sul pulsante ::a:: nella sezione superiore:

  - Cronologia: mostra una finestra di dialogo con la cronologia nel ticket
    corrente. Qui puoi trovare quando e quali azioni sono state eseguite e
    da chi.
  - Unisci: unisce il ticket con un altro nel caso in cui un cliente ti
    abbia inviato più email sullo stesso problema.
  - Cambia cliente: imposta un altro cliente per il ticket.

Scheda cliente
: Visualizza i dettagli del cliente incluso un riferimento agli altri ticket del cliente. Puoi anche cambiare il cliente del ticket qui
  facendo clic sul pulsante ::a:: nella sezione superiore.

Scheda organizzazione
: Questa scheda viene mostrata solo se il cliente è membro di un'organizzazione. Mostra i dettagli dell'organizzazione inclusi tutti
  i membri. Facendo clic sul pulsante ::a:: nella sezione superiore, puoi modificare l'organizzazione.
