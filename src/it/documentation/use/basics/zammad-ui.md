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

Ticket Detail View
: This is where you handle your customer requests. It appears in the main
  content when a ticket tab is selected in the navigation sidebar.

Barra laterale
: Questa è la barra laterale destra nella visualizzazione dettagli ticket. Contiene schede della barra laterale come clienti e checklist e visualizza la scheda attualmente selezionata.

Schede della barra laterale
: Sul lato destro della barra laterale, sono presenti delle piccole icone per passare da una scheda all'altra. La disponibilità di
queste schede dipende dalla configurazione del sistema, dalle autorizzazioni e dagli attributi del ticket (ad esempio, se al cliente del ticket
è assegnata un'organizzazione).

## Barra laterale di navigazione

The navigation sidebar is your central place to access all main parts of
Zammad. You might not see all of them because some depend on the
configuration of your Zammad. The navigation sidebar is always visible. That
means if you don't know where you are, you can always go back to the
dashboard, your overviews or an opened ticket, for example.

Search and Notification Area
: Includes the search where you can search for users, organizations, tickets and basically every in Zammad available
  information. Next to the search you can find the Zammad logo. In case there is a notification, it shows you a badge
  with a count about how many notifications you got.

Navigazione : Ti permette di passare a diverse schermate di Zammad come la
dashboard, le panoramiche, la base di conoscenza o la schermata telefono.

Taskbar Tabs
: You can find tabs for your opened tickets, users and organizations in the taskbar which is a part of the navigation
  sidebar.

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

Customer Tab
: View customer details including a reference to the customer's other tickets. You can change the ticket customer here
  as well by clicking on the ::a:: button in the top section.

Organization Tab
: This tab is only shown if the customer is member of an organization. It shows the organization's details including all
  members. By clicking on the ::a:: button in the top section, you can edit the organization.
