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

Primary Navigation
: This is the whole left sidebar which includes the search, notifications, overviews, the taskbar, your avatar, the
  ticket create button and maybe more, depending on your system (see next section).

Ticket Detail View
: This is where you handle your customer requests. It appears in the main content in the middle of the screen when a
  ticket tab is selected in the navigation sidebar.

Barra laterale
: Questa è la barra laterale destra nella visualizzazione dettagli ticket. Contiene schede della barra laterale come clienti e checklist e visualizza la scheda attualmente selezionata.

## Primary Navigation

The primary navigation sidebar is your central place to access all main
parts of Zammad. You might not see all of them because some depend on the
configuration of your Zammad. The navigation sidebar is always visible. That
means if you don't know where you are, you can always go back to the
dashboard, your overviews or an opened ticket, for example.

Search and Notification Area
: Includes the search where you can search for users, organizations, tickets and basically every in Zammad available
  information. Next to the search you can find the Zammad logo. In case there is a notification, it shows you a badge
  with a count about how many notifications you got.

Navigation Tabs
: Allows you to switch to different Zammad screens like the dashboard, overviews, knowledge base or phone screen
  depending on your system.

Taskbar Tabs
: You can find tabs for your opened tickets, users, organizations and the detailed search in the taskbar. So if you
  read about a user tab, this means an opened user tab in your sidebar.

Barra inferiore
: Impostazioni del profilo e pulsante per creare un nuovo ticket. Se hai permessi aggiuntivi, potrebbe esserci anche un pulsante delle impostazioni e uno dei rapporti.

Zammad salva immediatamente il progresso del tuo lavoro corrente, quindi
puoi passare facilmente tra le diverse aree di Zammad senza dover aver paura
di perdere dati come una risposta non ancora inviata in un ticket.

## Barra laterale

The right sidebar in the ticket detail view holds different sidebar tabs
like **Ticket**, **Customer** and **Checklist**, depending on the state of
the ticket, the customer and the configuration of your Zammad.  Switch
between these sidebar tabs by clicking the corresponding icon on the right
side of the sidebar.

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
