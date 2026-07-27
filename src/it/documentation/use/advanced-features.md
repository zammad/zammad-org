---
order: 4
title: 'Advanced features'
---

# Advanced features

Questa pagina raccoglie vari strumenti utili che non necessitano di pagine
separate. Continua a leggere, cerca nella pagina o naviga alla sezione
desiderata usando il sommario a destra.

## Ticket update behavior

![Screenshot che mostra il comportamento dopo il menu di
aggiornamento](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-behavior-update.png)

**Perché?**

È possibile chiudere automaticamente la scheda di un ticket nella barra
laterale di navigazione dopo averlo aggiornato. Questo consente di
risparmiare un clic dopo l'aggiornamento o dopo aver riportato un ticket
allo stato _chiuso_.

**Come?**

Nella barra inferiore della visualizzazione dettagli ticket, fai clic sul
pulsante `Rimani sulla scheda ^` e seleziona l'opzione desiderata. Hai
diverse opzioni:

- **Rimani sulla scheda**: Opzione predefinita. Devi chiudere manualmente la
  scheda se vuoi rimuoverla dalla barra laterale di navigazione.
- **Chiudi scheda**: Questa opzione chiude la scheda ad ogni aggiornamento
  del ticket.
- **Chiudi scheda alla chiusura del ticket**: Questa opzione chiude la
  scheda solo quando il ticket viene aggiornato allo stato _chiuso_.

::: tip
Se la situazione varia da ticket a ticket, puoi lasciare **Rimani sulla scheda** e usare la scorciatoia da tastiera
[[shift]] [[c]] per cambiare lo stato del ticket a chiuso e chiudere la scheda del ticket.
:::

## Text modules

![Screenshot che mostra la funzione dei moduli di
testo](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-article-text-template.png)

**Perché?**

Se devi rispondere ripetutamente alla stessa domanda, chiedi al tuo
amministratore Zammad di creare un modulo di testo per te. L'uso dei moduli
di testo ha vantaggi come:

- Risparmi tempo durante la risposta ai ticket
- Le risposte tue e dei tuoi colleghi sono coerenti perché usate lo stesso
  testo per le risposte

**Come?**

Usa il pulsante nella barra degli strumenti dell'editor o scrivi
semplicemente [[:]][[:]] nell'editor.

Puoi selezionarne uno facendo clic su di esso o usando le frecce su e giù
seguite da [[enter]] sulla tastiera.

## Insert knowledge base article

![Screenshot che mostra l'inserimento di un articolo dalla base di
conoscenza](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-article-insert-kba.png)

**Perché?**

Se ricevi spesso le stesse richieste dei clienti su un problema per cui
esiste un articolo nella base di conoscenza, questo ti fa risparmiare tempo.

**Come?**

Usa il pulsante nella barra degli strumenti dell'editor o scrivi
semplicemente [[?]][[?]] nell'editor.

## Mention a user

![Screenshot che mostra la menzione di un
utente](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-article-mention.png)

**Perché?**

Chiedi o richiedi informazioni ai tuoi colleghi o menzionali in ticket
importanti in modo che ricevano notifiche per gli aggiornamenti del ticket.

**Come?**

Durante la scrittura di un articolo del ticket, usa il pulsante nella barra
degli strumenti dell'editor o digita semplicemente [[@]][[@]].

Zammad visualizza un elenco con tutte le corrispondenze possibili dove puoi
sceglierne una.

## Subscribe to a ticket

![Screenshot che mostra la funzione di
iscrizione](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-subscribe.png)

**Perché?**

Se sei interessato all'avanzamento di un ticket di cui non sei il
proprietario, puoi iscriverti.

**Come?**

Activate the **Subscribe me** toggle in the ticket sidebar to get
notifications. If you have been mentioned in a ticket, you are automatically
subscribed. Switch the toggle off to stop the notification. The avatars
displayed show you who has subscribed to the ticket and is therefore
notified of updates.

## Macro

![Screenshot che mostra il menu azioni
macro](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-macro.png)

**Perché?**

Se ci sono molti passaggi che ripeti continuamente, dovresti usare una
macro. In una macro, l'amministratore può predefinire diverse azioni sui
ticket, che potrai applicare con un solo clic. Ad esempio, Zammad include di
default una macro "Chiudi e contrassegna come spam". Se applicata, l'utente
che esegue la macro viene assegnato come proprietario, viene aggiunto il tag
**spam** e il ticket viene chiuso. È persino possibile eseguire un [agente
AI](/it/documentation/use/guides/ai) all'interno di una macro su richiesta.

**Come?**

Se il tuo amministratore ha già creato una macro, puoi eseguirla nella
visualizzazione dei dettagli del ticket facendo clic sulla sezione `^` del
pulsante `Aggiorna` nell'angolo in alto a destra della barra del piè di
pagina (vedi screenshot sopra) e selezionando la macro che desideri
eseguire.

::: warning
La macro viene eseguita immediatamente e senza ulteriore conferma!
:::

È anche possibile applicare una macro a più ticket contemporaneamente. Dai
un'occhiata a [azioni di massa](#azioni-bulk) per scoprire come fare.

## Checklist

![Screenshot che mostra una checklist dalla barra laterale
checklist](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-checklist.png)

**Perché?**

- Per tenere traccia dei compiti
- Per completare le attività in modo strutturato
- Per assicurarsi che nulla venga dimenticato
- Per rendere più visibile l'avanzamento del lavoro

**Come?**

Seleziona la scheda **Checklist** nella barra laterale.

Nella barra laterale della checklist puoi:

- Aggiungi una checklist: puoi crearne una nuova cliccando su "Aggiungi
  checklist vuota" oppure utilizzarne una da un modello tramite "Aggiungi da
  un modello" (se non visualizzi il pulsante per i modelli, significa che
  non sono disponibili).
- Modificare la checklist corrente:
  - Rinominarla facendo clic sul titolo o usando il menu ::a::.
  - Aggiungere elementi alla checklist facendo clic sul pulsante ::+::.
  - Modificare il testo degli elementi della checklist.
  - `Riordina` gli elementi facendo clic su questo pulsante e trascinandoli
    con drag & drop.
- Eliminare l'intera checklist usando il menu ::a::.

Ci sono due funzionalità non direttamente visibili:

- È possibile fare riferimento ad altri ticket come elementi di una
  checklist utilizzando il relativo codice e il numero nel testo
  dell'elemento (ad esempio, `Ticket n. 123456`). Tali elementi non possono
  essere selezionati manualmente, ma riflettono lo stato del ticket a cui si
  fa riferimento.
  ::: tip
  Recupera l'hook e il numero del ticket andando al ticket desiderato e usando il pulsante di copia ::c:: oppure
  la scorciatoia da tastiera [[.]].
  :::
- Zammad verifica automaticamente se tutti gli elementi della checklist sono
  completati.

## Ticket templates

**Perché?**

Creare rapidamente un ticket con attributi predefiniti fa risparmiare tempo.

**Come?**

Nella schermata di creazione ticket, trovi un pulsante `Applica modello ^`
nella barra inferiore.

## Shared drafts

**Perché?**

Per condividere una bozza con altri agenti del tuo gruppo.

Questa è una funzionalità opzionale. Se non riesci a vederla, il tuo
amministratore l'ha disattivata.

**Come?**

Per **salvare una bozza**, usa il menu ::a:: e seleziona "Salva come bozza".

Per **applicare una bozza già esistente**, fai clic sul pulsante `Bozza
disponibile`.

::: warning
L'applicazione di una bozza sovrascrive le modifiche non salvate!
:::

## Monitoring ticket escalations

**Perché?**

Gli accordi sul livello di servizio (SLA) garantiscono risposte tempestive
alle richieste dei clienti.

**Come?**

Zammad ti invia automaticamente una notifica quando i ticket si avvicinano o
superano la scadenza. Puoi configurare queste notifiche nelle [impostazioni
del tuo profilo](/it/documentation/use/user-profile#notifiche). Zammad
include anche una panoramica predefinita chiamata "Ticket in stato di
escalation". Questa panoramica comprende i ticket già in stato di escalation
e quelli che si prevede vengano escalati entro i prossimi 10 minuti.

I ticket rilevanti per l'SLA mostrano un timestamp nell'intestazione dei
dettagli del ticket. Passando il mouse sopra questo timestamp, vengono
visualizzate tutte le fasi di escalation e le relative scadenze in una
finestra a comparsa. Vengono mostrati tutti i tempi di escalation imminenti
o già raggiunti in base alla configurazione dell'SLA.

![Screenshot che mostra il pannello di escalation passando il mouse sul
timestamp di
escalation](/screenshots/cypress/documentation/use/advanced-features.cy.js/escalation-panel.png)

::: info
I tempi di escalation vengono calcolati in base al tuo orario di lavoro. Ciò significa che se il tuo orario di lavoro inizia alle 9:00, un ticket viene creato alle 7:00 e hai un termine di 1 ora, verrà inoltrato alle 10:00, a meno che non venga risolto prima.
:::

La funzionalità SLA richiede una configurazione da parte del tuo
amministratore.

## Bulk actions

**Perché?**

Se devi applicare le stesse modifiche a molti ticket, puoi risparmiare
tempo!

**Come?**

Ci sono 2 posti dove puoi applicare azioni bulk:

- Nella scheda ticket nella [pagina di ricerca dettagliata](guides/search)
- Nelle [Panoramiche](guides/overviews)

In entrambi i posti puoi applicare azioni bulk in diversi modi:

- By using the flyout
- Usando l'overlay drag & drop

Per utilizzare le azioni di massa, seleziona innanzitutto i ticket a cui
desideri applicare le modifiche. Puoi selezionarli singolarmente cliccando
sulla casella di controllo accanto a ciascuno oppure utilizzare la casella
di controllo nell'intestazione per selezionare tutti i ticket della pagina
corrente. Dopo aver selezionato tutti i ticket della pagina, puoi anche
selezionare tutti i ticket che corrispondono alla query di ricerca corrente
o alla condizione di panoramica cliccando sull'etichetta **Seleziona tutti i
XX risultati**. Il numero massimo di ticket selezionabili per un'azione di
massa è 2000.

Per selezionare una sezione di ticket consecutivi, fai clic sulla casella
del primo ticket, poi tieni premuto [[shift]] e fai clic sull'ultimo.

A seconda del numero di ticket interessati, potresti vedere una piccola
notifica.

**Flyout:**

![Screenshot shows the bulk action
flyout](/screenshots/cypress/documentation/use/advanced-features.cy.js/bulk-side-panel-overviews.png)

After you selected tickets, click the `Bulk Action` button in the top right
corner and change/add attributes by using the fields in the right
flyout. The available changes you can apply to tickets are:

- Imposta gruppo
- Imposta proprietario
- Imposta stato
- Imposta priorità
- Aggiungi una nota
- Esegui una macro

**Drag & drop con overlay bulk:**

![Screenshot che mostra l'azione bulk tramite drag and
drop](/screenshots/cypress/documentation/use/advanced-features.cy.js/bulk-action-drag-and-drop.png)

Dopo aver selezionato i ticket, trascinali tenendo premuto il pulsante del
mouse e rilasciali sull'azione desiderata nella finestra di dialogo delle
azioni di massa. Puoi anche saltare questo passaggio rilasciando i ticket al
centro della pagina. Le azioni disponibili che puoi applicare ai ticket
sono:

- Imposta gruppo
- Imposta proprietario
- Rimuovi assegnatario
- Rimuovi assegnatario e imposta gruppo
- Esegui macro

Avvia l'azione drag and drop da uno dei ticket già selezionati.

## Merge tickets

![Screenshot shows the ticket merge
flyout](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-merge.png)

**Perché?**

Se hai due o più ticket sullo stesso problema, potresti volerli unire in uno
solo.

L'unione di un ticket migra tutti i messaggi e le note del ticket in quello
selezionato.

**Come?**

Go to the ticket you want to merge into another one. In the ticket sidebar,
use the ::a:: menu and select `Merge`. This opens a flyout in which you can
select a ticket by clicking on it or enter a ticket number in search field.
When you selected a target ticket, confirm by using the `Merge` button at
the bottom.

Di conseguenza, gli articoli vengono spostati nel ticket selezionato. Il
ticket in cui è stata eseguita l'unione rimane attivo con le seguenti
modifiche:

- Gli articoli sono stati sostituiti da un'etichetta "unito"
- Lo stato è cambiato in "unito"
- Il ticket è collegato al suo ticket "genitore"

## Split tickets

![Screenshot che mostra il menu azioni per la divisione degli
articoli](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-split.png)

**Perché?**

Se hai un ticket che riguarda più di un problema, potresti volerlo dividere
in due o più ticket separati.

**Come?**

Per dividere un articolo, usa il menu ::a:: accanto all'articolo e seleziona
`Dividi`.

Questo genera una schermata di creazione del ticket con gli stessi attributi
impostati del ticket iniziale. Il contenuto dell'articolo è incluso. Puoi
modificare tutto in base alle tue esigenze e poi fare clic su "Crea".

Il ticket appena creato è collegato in quello originale come figlio.

## Link tickets

**Perché?**

Quando si presentano ticket relativi a problemi correlati, è possibile
collegarli tra loro per una consultazione più agevole. I ticket
[Uniti](#unire-i-ticket) e [separati](#dividere-i-ticket) vengono collegati
automaticamente.

**Come?**

In the ticket sidebar, add a link to another ticket by clicking the ::+::
button in the **Related tickets** section.  This opens a flyout in which you
can select a ticket by clicking on it or enter a ticket number in search
field.  Additionally, you can choose between different link types:

- **Normale:** per ticket correlati senza gerarchia.
- **Genitore/Figlio**: per ticket correlati dove uno è il problema
  principale e l'altro è un'attività secondaria.

## Duplicate detection

![Screenshot che mostra l'avviso di ticket duplicato durante la
creazione](/screenshots/cypress/documentation/use/advanced-features.cy.js/duplicate-detection.png)

**Perché?**

A volte può capitare che un cliente contatti te (o i tuoi colleghi) più
volte per lo stesso problema. Per evitare la creazione di ticket duplicati,
Zammad può avvisarti quando esiste già un altro ticket. Questa funzionalità
deve essere attivata e configurata dal tuo amministratore.

**Come?**

Crea semplicemente un nuovo ticket e fornisci alcune informazioni. Il tuo
amministratore può configurare quali attributi del ticket devono
corrispondere affinché venga mostrato l'avviso (ad esempio cliente e
titolo). In caso di troppi avvisi non necessari o nessun avviso, chiedi al
tuo amministratore di regolare gli attributi da confrontare.

Quando viene rilevato un duplicato, nel ticket appare un avviso (vedi
l'esempio nello screenshot sopra). Questo avviso può contenere un numero di
ticket. Fai clic sul link del ticket per vedere di cosa si tratta. Se non è
un duplicato, ignoralo e continua con la creazione del ticket.

## Contabilità del tempo

**Perché?**

Con la contabilità del tempo integrata di Zammad, puoi tenere traccia del
tempo trascorso sui ticket. In base ai tempi registrati nel ticket, viene
automaticamente assegnato a clienti e organizzazioni. Questo può essere
usato nella tua azienda per la fatturazione o per monitorare i budget di
supporto.

**Come?**

Dopo aver aggiornato un ticket, apparirà una finestra di dialogo per la
contabilità del tempo. Inserisci quanto tempo hai trascorso sul ticket.

![Screenshot che mostra la finestra di dialogo per la contabilità del
tempo](/screenshots/cypress/documentation/use/advanced-features.cy.js/time-accounting-dialog.png)

La funzionalità è **opzionale**. Se non la vedi quando aggiorni un ticket,
il tuo amministratore non l'ha ancora abilitata o la regola per i ticket da
prendere in considerazione non corrisponde.

Il tempo registrato viene sempre memorizzato senza un'unità. Tuttavia, il
tuo amministratore può decidere di mostrare un'etichetta opzionale accanto
al campo per indicare in quale unità è previsto il tempo (vedi screenshot).

I tipi di attività possono essere usati per distinguere tra diverse attività
e per raggruppare i tempi registrati. Se questa funzionalità opzionale è
attiva, mostra un elenco di attività tra cui puoi selezionare nella finestra
di dialogo per la contabilità del tempo.

Se un ticket ha già tempi registrati, puoi vederli nella barra laterale del
ticket sul lato destro nella visualizzazione dettagli ticket in basso. Trovi
le somme calcolate per ogni tipo di attività (se configurato) nonché la
somma totale dei tempi registrati per tutti i tipi di attività.

![Screenshot che mostra la panoramica della contabilità del
tempo](/screenshots/cypress/documentation/use/advanced-features.cy.js/time-accounting-overview.png)

## User detail panel

**Perché?**

Visualizzare le informazioni importanti su clienti/utenti a colpo d'occhio
senza lasciare la visualizzazione corrente ti permette di restare
concentrato sul tuo compito.

**Come?**

Potresti averlo già visto: passa semplicemente il mouse su un'icona avatar,
sia nell'intestazione, nel piè di pagina, nel contenuto principale o nella
barra laterale del contenuto nella visualizzazione dettagli ticket. Per
vedere più dettagli, fai clic sull'avatar dell'utente per aprire la [pagina
dei dettagli utente](#pagina-dei-dettagli-utente).

![Screenshot che mostra un avatar con il pannello dettagli utente
aperto](/screenshots/cypress/documentation/use/advanced-features.cy.js/user-detail-panel.png)

A proposito, la corona nello screenshot rappresenta lo stato VIP del
cliente, che può essere impostato nella visualizzazione dettagli cliente e
nelle impostazioni amministratore.

## User detail page

![Screenshot che mostra la pagina dei dettagli
utente](/screenshots/cypress/documentation/use/advanced-features.cy.js/user-detail-page.png)

**Perché?**

Ti permette di vedere tutte le informazioni rilevanti sull'utente in un
unico posto. Esempi di cosa puoi trovare e fare lì:

- Vedere l'appartenenza all'organizzazione
- Vedere un grafico dei ticket recenti
- Aggiungere o modificare una nota
- Modificare il cliente (tramite menu ::a::)
- Vedere la cronologia delle modifiche (tramite menu ::a::)
- Creare un nuovo ticket con questo utente come cliente

**Come?**

Fai semplicemente clic su un avatar utente (ad esempio nell'intestazione
della visualizzazione dettagli ticket). Si apre una nuova scheda con la
pagina dei dettagli cliente. Se hai anche i permessi di amministratore, puoi
persino creare un job di eliminazione per un utente dal menu ::a::.

## Organization detail page

![Screenshot che mostra la pagina dei dettagli
organizzazione](/screenshots/cypress/documentation/use/advanced-features.cy.js/organization-detail-page.png)

**Perché?**

Ti permette di vedere tutte le informazioni rilevanti sull'organizzazione in
un unico posto. Esempi di cosa puoi trovare e fare lì:

- Vedere i membri dell'organizzazione
- Vedere un grafico dei ticket recenti dell'intera organizzazione
- Aggiungere o modificare una nota
- Modificare l'organizzazione (tramite menu ::a::)
- Vedere la cronologia delle modifiche (tramite menu ::a::)
- Creare un nuovo utente come membro di questa organizzazione

**Come?**

Fai semplicemente clic su un avatar organizzazione (ad esempio
nell'intestazione della visualizzazione dettagli ticket accanto all'avatar
utente). Si apre una nuova scheda con la pagina dei dettagli organizzazione.

## External issues and assets

**Perché?**

Se usi i-doit e Zammad per il supporto IT o gestisci issue di Github o
Gitlab, puoi collegarti a questi sistemi esterni per avere tutte le
informazioni rilevanti in un unico posto. Il tuo amministratore Zammad deve
attivare e configurare queste funzionalità nelle impostazioni di Zammad.

**Come?**

![Screenshot che mostra la barra laterale del contenuto di Gitlab con il
pulsante "Collega
issue"](/screenshots/cypress/documentation/use/advanced-features.cy.js/gitlab-content-sidebar.png)

Se attivato, apri semplicemente un ticket e scegli la scheda della barra
laterale del contenuto corretta con la rispettiva icona (vedi l'esempio di
Gitlab nello screenshot sopra). Fai clic sul pulsante per collegare un'issue
inserendo il suo URL o seleziona l'elemento da un campo di selezione
(i-doit). Dopodiché puoi vedere l'elemento collegato con metadati
aggiuntivi. Facendo clic sull'elemento collegato, vieni reindirizzato ad
esso nel rispettivo sistema.

## Highlight text

**Perché?**

Ti permette di dare ai tuoi colleghi un suggerimento sugli aspetti
importanti del ticket e di assicurarsi che le parti importanti non vengano
trascurate. Tieni presente che questa funzionalità non riguarda
l'evidenziazione del testo per i nuovi articoli, ma l'evidenziazione del
testo negli articoli esistenti per te e altri agenti.

**Come?**

![Screenshot che mostra il menu di evidenziazione dalla visualizzazione
dettagli
ticket](/screenshots/cypress/documentation/use/advanced-features.cy.js/text-highlighting.png)

Usa lo strumento di evidenziazione con l'icona della matita nell'angolo in
alto a destra nella visualizzazione dettagli ticket. Per evidenziare il
testo, seleziona prima il testo e poi fai clic sul pulsante. In alternativa,
puoi fare clic prima sul pulsante di evidenziazione e poi selezionare il
testo. Puoi scegliere un colore diverso usando la freccia giù sul lato
destro del pulsante. Per rimuovere l'evidenziazione, scegli semplicemente
l'icona della gomma dal menu dei colori.
