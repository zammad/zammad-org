---
order: 2
title: 'Ticket basics'
---

# Ticket basics

Sei nuovo ai sistemi di ticketing? Allora continua a leggere le nozioni di
base. Questo ti aiuta a comprendere i concetti principali e a iniziare con
Zammad. Se hai già familiarità con i sistemi di ticketing, puoi passare
direttamente alle pagine successive su come trovare, creare e lavorare con i
ticket.

## Introduzione

In Zammad, i **ticket** vengono usati per monitorare le richieste di
servizio clienti. La prima volta che un cliente ti contatta per qualcosa,
Zammad crea un nuovo ticket. Ogni messaggio inviato tra te e il cliente
viene aggiunto a quel ticket fino a quando il problema non viene risolto, il
cliente è soddisfatto e il ticket viene infine chiuso. Tale singolo
messaggio in un ticket è chiamato **articolo**. Fondamentalmente, puoi
pensare a un **ticket** come a una **conversazione** tra te e un cliente su
un singolo problema.

Se sei completamente nuovo a un sistema di ticketing e hai gestito finora le
richieste dei clienti con un client email, potresti pensare che un sistema
di ticketing sia complicato. Ma è vero il contrario:

- Tutte le email vengono ora raccolte in Zammad (e anche le richieste da
  altri canali potrebbero esserlo).
- Tu e i tuoi colleghi potete vedere chi sta lavorando su quale richiesta
  del cliente ("ticket").
- Lo stato di ogni richiesta nonché la cronologia (chi ha fatto cosa?) è
  trasparente.
- Non c'è lavoro duplicato e nulla viene trascurato.
- Puoi chiedere ai tuoi colleghi direttamente nel ticket aiuto nei casi
  difficili.
- Con l'interfaccia utente intuitiva di Zammad, puoi concentrarti su ciò che
  conta: risolvere i problemi dei clienti e rispondere alle domande dei
  clienti.

Ciò significa che puoi lavorare con Zammad in modo simile al tuo client
email. Tranne che un ticket ha attributi aggiuntivi. Continua a leggere per
saperne di più.

## Ticket attributes

Oltre agli articoli, i ticket hanno alcune informazioni meta aggiuntive
chiamate attributi. Usa la **barra laterale del ticket** per visualizzare e
modificare gli attributi del ticket.

![Screenshot che mostra la barra laterale del
ticket](/screenshots/cypress/documentation/use/basics.cy.js/ticket-sidebar.png)

Per nascondere la barra laterale, fai clic sul pulsante di compressione con
la freccia sul lato sinistro della barra laterale. Fai clic su una delle
schede per riportarla. Le opzioni disponibili dipendono dai tuoi privilegi e
dalla configurazione del sistema.

È anche possibile creare campi personalizzati per i ticket (anche per
gruppi, utenti e organizzazioni). Pensi che tale campo personalizzato abbia
senso? Parla con il tuo amministratore Zammad, può essere configurato
facilmente.

### Stato

Lo stato riflette lo stato corrente di un ticket (principalmente se una
richiesta del cliente è risolta o meno). Pensalo come una rappresentazione
del progresso verso il completamento. Per impostazione predefinita, ci sono
i seguenti stati:

- **Nuovo**: Stato per i nuovi ticket su cui nessuno ha ancora
  lavorato. Quando si aggiorna un ticket per la prima volta, passa
  automaticamente ad aperto.
- **Aperto**: Stato per i ticket che non sono ancora risolti e su cui è
  necessario lavorare.
- **In attesa di chiusura**: Stato per i ticket che sono sostanzialmente
  risolti ma che non vuoi chiudere immediatamente. Questo stato richiede di
  inserire una data e un'ora in cui il ticket passa automaticamente a
  chiuso.
- **Promemoria in attesa**: Stato per i ticket aperti di cui vuoi essere
  ricordato a una certa data e ora. Richiede di inserire una data e un'ora a
  cui vuoi essere notificato. Ad esempio utile se hai una domanda a una
  terza parte e vuoi assicurarti che questo problema non venga dimenticato.
- **Unito**: Stato per un ticket che è stato unito a un altro
  ticket. Controlla i [ticket
  collegati](/it/documentation/use/advanced-features#collegare-i-ticket) per
  vedere il ticket correlato.

Gli stati dei ticket di Zammad sono codificati per colore. Questo ti aiuta a
capire lo stato del ticket molto più velocemente in generale - senza dover
guardare i dettagli.

![Screenshot che mostra i diversi stati codificati per
colore](/screenshots/documentation/use/overviews/states.png)

### Priorità

La priorità di un ticket è semplicemente una classifica (da 1 a 3) di quanto
sia urgente o importante. Le tre priorità predefinite sono:

- 1 bassa
- 2 normale
- 3 alta

Se queste priorità non sono sufficienti, chiedi al tuo amministratore Zammad
di crearne di aggiuntive. Le priorità predefinite ti permettono di
riconoscere immediatamente l'importanza dei tuoi ticket perché sono
codificate per colore:

![Screenshot che mostra le diverse priorità codificate per
colore](/screenshots/documentation/use/overviews/priorities.png)

Potresti chiederti a cosa serve tale priorità del ticket. Di default, non fa
nulla eccetto l'evidenziazione. Tuttavia, gli amministratori di Zammad
possono configurare ogni tipo di automazione e analisi basate sulla
priorità.

Tieni presente che i clienti non possono impostare una priorità per i propri
ticket. Altrimenti, alcuni potrebbero impostare sempre i loro ticket su alta
sperando in un'escalation immediata.

### Tag

I tag sono etichette personalizzate che possono essere assegnate ai ticket
per renderli più facili da trovare in futuro. Possono essere usati in
condizioni come nei trigger e nelle panoramiche e possono anche essere
assegnati automaticamente da macro, scheduler e trigger. Naturalmente puoi
cercare il testo dei tag e troverai i ticket a cui è stato assegnato il tag.

![Screenshot che mostra l'area tag nella barra laterale del
ticket](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-tags.png)

In the ticket sidebar, you can find a section which is labeled as
**Tags**. Add a tag by clicking on the ::+:: button.  Depending on your
Zammad's configuration, you can create new tags by simply type and confirm
them with [[enter]] or [[tab]]. In any case, you can choose from already
available tags. Start typing and you see a list with matching
suggestions. To remove it, click the ::x:: button on the right side of the
tag. This button only shows up when you move the mouse over the tag.

### Gruppo

Questo attributo del ticket è utile per le organizzazioni con più di un
team. Un modo comune di usare i gruppi è averne uno per ogni dipartimento
dell'azienda. A seconda dei permessi, potresti non vedere il ticket dopo
aver cambiato il gruppo e salvato le modifiche. Se non riesci a vedere il
campo gruppo, o c'è solo un gruppo nel tuo sistema Zammad o non hai il
permesso di creare un ticket in altri gruppi.

### Proprietario

Questa è la persona attualmente responsabile del ticket. Se hai bisogno di
informazioni da un altro collega, puoi cambiare il proprietario a quella
persona o menzionare la persona in un articolo digitando [[@]][[@]] e
selezionando l'utente. In quest'ultimo caso, l'utente viene notificato e
viene automaticamente iscritto per ricevere notifiche sugli aggiornamenti
del ticket.

Per cambiare il proprietario a una persona che ha accesso solo ai ticket di
un altro gruppo, devi prima cambiare il gruppo di conseguenza.

-----

Ora che conosci le nozioni di base, vai a una delle seguenti pagine:

- [Trova ticket](/it/documentation/use/basics/find-tickets)
- [Crea ticket](/it/documentation/use/basics/create-tickets)
- [Lavora con i ticket](/it/documentation/use/basics/work-with-tickets)
