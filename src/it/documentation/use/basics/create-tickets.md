---
order: 4
title: 'Create tickets'
---

# Create tickets

Quando un cliente ti invia un messaggio tramite un canale recuperato da
Zammad, un ticket viene creato automaticamente (a meno che Zammad non lo
riconosca come un follow-up, nel qual caso viene aggiunto come articolo a un
ticket esistente). Tuttavia, ci possono essere casi in cui è necessario
creare un ticket manualmente. Esempi:

- Un cliente ti chiama per telefono.
- Ricevi una lettera cartacea da un cliente.
- Un cliente si presenta allo sportello di assistenza fisico.
- È necessario informare proattivamente il cliente inviandogli un messaggio.

In situations like these, you need to create a new ticket manually and click
the ::+:: button at the bottom of the primary navigation. This shows a
ticket create screen where you can add all needed information.

![Screenshot che mostra la schermata di creazione
ticket](/screenshots/cypress/documentation/use/basics.cy.js/ticket-create.png)

## Type selector

Nella finestra di dialogo di creazione ticket, puoi scegliere tra diversi
tipi di articolo:

- Chiamata ricevuta: per problemi avviati da un cliente per telefono.
- Chiamata in uscita: per problemi avviati da un agente per telefono.
- Invia email: per problemi avviati da un agente tramite email.

Quando si sceglie **Invia email**, il cliente riceve un'email con il titolo
come oggetto e il testo come contenuto dell'email.

## Titolo

Questo è il titolo di un ticket che viene mostrato in molti posti in
Zammad. Ad esempio, viene visualizzato nelle panoramiche. Viene anche usato
come oggetto per la comunicazione email. Per le email, viene aggiunto
automaticamente un identificatore di ticket (ad esempio `Ticket#901234 - Ho
bisogno di aiuto!`).

## Cliente

Inserisci un nome o un indirizzo email di un cliente per cercare account
esistenti. Puoi anche cercare organizzazioni e i loro membri. Seleziona
un'opzione dal menu a tendina o crea un nuovo cliente facendo clic sul
pulsante `+ Crea nuovo cliente` sul lato destro del campo. Si apre una
finestra di dialogo dove puoi fornire tutte le informazioni rilevanti del
cliente. Un ticket può avere solo un cliente.

Dopo aver impostato un cliente nella finestra di dialogo di creazione
ticket, la barra laterale del cliente si apre automaticamente. Puoi vedere
informazioni meta aggiuntive sul cliente incluso un suggerimento sui ticket
attualmente aperti del cliente.

## Testo

Questa è la sezione del contenuto dove vengono scritti i dettagli
attualmente noti del problema. Per il tipo "Invia email", questo è il
contenuto/messaggio dell'email. Per saperne di più sull'editor e le sue
funzionalità, consulta la [documentazione
dell'editor](/it/documentation/use/guides/editor).

## Ticket attributes

Come sai, ci sono attributi ticket aggiuntivi come gruppo, priorità e
proprietario che puoi impostare. Se non hai ancora letto le [nozioni di base
sui ticket](ticket-basics), consultale per saperne di più.

-----

Dopo aver fornito le informazioni rilevanti, crea infine il ticket facendo
clic sul pulsante `Crea`. Leggi come [lavorare con i ticket
esistenti](work-with-tickets).
