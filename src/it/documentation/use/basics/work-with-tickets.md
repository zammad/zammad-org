---
order: 5
title: 'Lavora con i ticket'
---

# Lavora con i ticket

Hai trovato la strada verso un ticket esistente, congratulazioni! Ora
vediamo cosa puoi fare e come farlo.

In generale, lavorare su ticket esistenti significa seguire la
corrispondenza con un cliente in un thread/conversazione nella
visualizzazione dettagli ticket. Ogni volta che apri un ticket, apparirà una
nuova scheda nella tua barra di navigazione sul lato sinistro. Per chiudere
una scheda (nel senso di rimuoverla dalla barra di navigazione, non
impostare lo stato del ticket su chiuso), fai clic sul pulsante ::X:: nella
scheda. Zammad salva automaticamente le tue modifiche nelle schede ticket
aperte. Ciò significa che non è un problema creare un nuovo ticket mentre si
modifica uno esistente. Torna semplicemente all'altra scheda.

Per la maggior parte delle modifiche (tranne tag o rinomina del titolo, ad
esempio), è necessario un aggiornamento esplicito del ticket. Quindi
assicurati di fare clic sul pulsante `Aggiorna` sul lato destro della barra
inferiore quando sei soddisfatto delle tue modifiche.

## Modifica degli attributi del ticket

Come sai, ci sono attributi ticket aggiuntivi come gruppo, priorità e
proprietario che puoi impostare. Se non hai ancora letto le [nozioni di base
sui ticket](/it/documentation/use/basics/ticket-basics), consultale per
saperne di più.

## Crea un nuovo articolo

Che tu crei un nuovo articolo da zero o risponda a un articolo del cliente,
puoi scegliere tra diversi tipi di articolo:

- **Nota**: Scrivi un promemoria per te stesso e altri agenti, fai una
  domanda a un collega menzionando un utente o aggiungi nuove informazioni
  al ticket. La visibilità predefinita è "interna", il che significa che il
  cliente non può vedere la nota.
- **Chiamata**: Annota un riepilogo di una telefonata che hai avuto con il
  cliente.
- **Email**: Invia un'email a chiunque riguardo al ticket. Il titolo del
  ticket viene usato come oggetto dell'email.

Per scegliere un altro tipo di articolo, usa il selettore di schede
**Canale** e scegli un tipo diverso. Fai clic sul pulsante lucchetto per
modificare la visibilità dell'articolo. Gli articoli con visibilità interna
vengono visualizzati con un bordo blu tratteggiato.

![Screenshot che mostra il selettore del tipo di articolo e il pulsante di
visibilità](/screenshots/cypress/documentation/use/basics.cy.js/article-type-visibility.png)

Per scrivere e modificare testo, usa le potenti funzionalità
dell'editor. Puoi usare la barra degli strumenti o le scorciatoie da
tastiera per formattare il testo e attivare funzioni speciali. Puoi trovare
maggiori informazioni nella [pagina
dell'editor](/it/documentation/use/guides/editor) separata.

Ogni nuovo articolo appare alla fine della conversazione, ovvero sotto gli
articoli esistenti. Per vedere informazioni dettagliate di un articolo, fai
semplicemente clic su un articolo esistente che apre informazioni meta
aggiuntive.

Potresti chiederti ora come eliminare gli articoli. La risposta è che puoi
eliminare solo gli articoli che hai creato tu stesso e che non hanno più di
10 minuti. Per vedere la funzione **Elimina articolo** nel menu ::a::, gli
articoli di tipo comunicazione (email, chiamate) devono essere prima
modificati in visibilità "interna".

### Aggiungi un articolo da zero

Click on the `Add internal note` button below the ticket's articles. This
opens the editor with activated **Note** type and internal visibility. You
can change the type or visibility if you like. To answer the customer
directly or to forward a specific article, use the corresponding buttons
under an article. Read the next section for more information.

![Screenshot shows the Add internal note button below the ticket's
articles](/screenshots/cypress/documentation/use/basics.cy.js/new-article.png)

### Rispondi a un articolo

Per inoltrare o rispondere a un articolo, usa uno dei pulsanti di risposta
sotto un articolo o nel menu ::a::. Il comportamento è simile a quello di un
client email.

- **Rispondi**: Ti permette di rispondere all'articolo. Il destinatario
  viene automaticamente pre-compilato. La risposta viene inviata tramite lo
  stesso canale del messaggio originale. Questo ti permette di inviare
  facilmente una risposta a un cliente o a terze parti, se coinvolte.
- **Rispondi a tutti**: Come sopra ma usa tutti gli indirizzi dei
  destinatari del messaggio originale come destinatari per il tuo nuovo
  articolo. Disponibile solo per i canali email.
- **Inoltra**: Ciò significa che puoi inoltrare il messaggio originale a una
  terza parte o chiunque altro. Il messaggio originale e gli allegati sono
  inclusi nel tuo nuovo articolo.

![Screenshot che mostra le azioni di risposta
all'articolo](/screenshots/cypress/documentation/use/basics.cy.js/article-reply.png)

Zammad ti permette anche di **citare testo** da un articolo
esistente. Questo è particolarmente utile se una risposta fa riferimento a
parti diverse del messaggio originale o il testo è piuttosto lungo. Questa
funzionalità è limitata agli articoli di tipo comunicazione come le email
dove sono disponibili i pulsanti di risposta. Per citare il testo, seleziona
semplicemente il testo che vuoi citare e usa la funzione **Rispondi** o
**Rispondi a tutti**. Questo aggiunge il testo selezionato con un timestamp
nel tuo editor di articoli dove puoi rispondergli. Puoi usare la citazione
anche più volte per citare parti diverse del testo. Puoi dividere le
citazioni usando [[enter]] o [[shift]] + [[enter]] nell'editor e
disabilitare il formato citazione per il tuo testo.

If the ticket has a long article history, see [Handling of Large
Tickets](#handling-of-large-tickets) for the conveniences Zammad provides.

### Handling of Large Tickets

When working on tickets with long article histories - like long email
threads where you need to refer back to earlier messages - Zammad provides
two conveniences:

- A floating ticket actions toolbar on the bottom right corner of the
  article list shows quick actions, depending on your scroll position and
  the ticket state. It contains buttons with icons for the following
  actions:
  - **Add internal note**: opens the article reply form to write a note.
  - **Scroll to start** and **Scroll to end**: jump to the top or bottom of
    the article list. The end button also doubles as **Scroll to unread
    article** when there are unread articles.
  - The toolbar appears whenever the article list is taller than your screen
    so that crucial actions stay accessible.
- A **pinned reply form** so the editor stays visible while you scroll
  through the articles. To pin or unpin the reply form, click the pin icon
  in the header of the article reply form. The pinned form sticks to the
  bottom of the ticket detail view. Resize the height by dragging the line
  on the top edge of the pinned reply form. The pin state as well as the
  panel size are saved in your browser.

![Screenshot shows the article reply form pinned to the bottom of the ticket
detail
view](/screenshots/cypress/documentation/use/basics.cy.js/article-reply-pinned.png)

## Rinomina un ticket

Per rinominare un ticket, fai semplicemente clic sul titolo nella barra
dell'intestazione e inizia a digitare. Questo titolo viene usato come
oggetto nella comunicazione email e appare in diversi posti come le
panoramiche. Conferma con [[enter]] o fai clic sul pulsante sul lato destro.

## Copia numero ticket

Per copiare il numero del ticket incluso un link al ticket (ad esempio per
incollarlo in un'app di chat di terze parti), usa l'icona ::c:: accanto al
titolo del ticket. Copia il numero completo del ticket con l'identificatore
del ticket negli appunti, ad esempio `Ticket#50071`. Se incolli il contenuto
in una destinazione che può gestire HTML, viene incluso un link al
ticket. Se vuoi incollare solo il numero del ticket, usa invece l'incolla
normale tramite [[ctrl]] [[shift]] [[v]].

![Screenshot che mostra l'intestazione del ticket con il pulsante di copia
del numero ticket
evidenziato](/screenshots/cypress/documentation/use/basics.cy.js/copy-ticket-number-button.png)

Ma aspetta, c'è anche una scorciatoia da tastiera per questo! Premi
semplicemente [[.]] nella visualizzazione dettagli ticket e il numero del
ticket viene copiato negli appunti. Per includere anche il titolo del
ticket, premi [[.]] due volte. Esempio: `Ticket#31004: Onboarding nuovo
collega`.

## Elaborazione simultanea dei ticket

Può accadere che due o più agenti aprano un ticket allo stesso tempo. Per
prevenire conflitti di modifica e risposte contraddittorie ai clienti,
Zammad mostra chi sta visualizzando o modificando il ticket
attualmente. Puoi trovare questa informazione nella barra inferiore dove
vengono visualizzati gli avatar di tutti gli agenti.

![Screenshot che mostra altri agenti che visualizzano/modificano il
ticket](/screenshots/documentation/use/advanced-features/simultaneous-work-detection.png)

Assicurati di comunicare con i tuoi colleghi per prevenire questi problemi
prima che sorgano. A seconda dell'icona aggiuntiva e se l'icona dell'avatar
è sbiadita, significa:

- Avatar: Un altro agente sta visualizzando il ticket.
- Avatar sbiadito: Un altro agente ha aperto il ticket ma al momento non lo
  sta visualizzando attivamente.
- Avatar con icona matita: Un altro agente sta attualmente lavorando
  attivamente su questo ticket.

Ci sono ancora più icone che rappresentano stati aggiuntivi degli altri
agenti (ad esempio visualizzazione ticket tramite UI mobile o fuori
ufficio). Passa semplicemente il mouse se non sei sicuro di cosa significhi.

## Azioni del ticket

Azioni aggiuntive sono disponibili nel menu ::a:: nella barra laterale del
ticket.

Cronologia
: Visualizza un elenco completo degli aggiornamenti al ticket, effettuati da qualsiasi utente, dalla sua creazione. Utile per
    verificare chi ha fatto cosa e quando.

Unisci
: Migra tutti i messaggi/note a un altro ticket. Utile se hai più di un ticket su un singolo problema del cliente.
  Vedi [Unisci ticket](/it/documentation/use/advanced-features#unire-i-ticket) per i dettagli.

Cambia cliente : Riassegna il ticket a un altro cliente.

-----

Ora conosci le nozioni di base e come lavorare con i ticket in
generale. Tuttavia, ci sono molte altre funzionalità in Zammad che possono
essere molto utili nel tuo lavoro quotidiano. Continua a leggere in
[Funzionalità avanzate](/it/documentation/use/advanced-features) per saperne
di più.
