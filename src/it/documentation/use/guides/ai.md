---
order: 4
title: 'AI features'
---

# AI features

## Introduzione

Zammad sta diventando ancora più intelligente! Stiamo espandendo le capacità
AI di Zammad per aiutarti a gestire i ticket di supporto in modo ancora più
efficiente. ✨🚀

::: info
Le funzionalità AI devono essere configurate e attivate dal tuo amministratore. Se non riesci a vederle, non sono configurate.
Ulteriori informazioni su come configurarle e attivarle sono disponibili nella sezione amministratore.
:::

## Ticket summary

La funzionalità di riepilogo ticket fa esattamente quello che dice:
riepiloga il contenuto del ticket. Questo può far risparmiare molto tempo
quando si tratta di ticket grandi e/o molti passaggi di consegna tra agenti.

Se la funzionalità è attivata, viene generato un riepilogo del ticket quando
il ticket viene aggiornato e tu apri il ticket o apri la scheda della barra
laterale del riepilogo del ticket, a seconda della configurazione.

![Screenshot che mostra la visualizzazione dettagli ticket di Zammad con il
banner di riepilogo ticket evidenziato e la barra laterale del
riepilogo](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-ticket-summary-sidebar.png)

A seconda della configurazione della tua istanza Zammad, il riepilogo
include le seguenti sezioni:

- Intento del cliente
- Riepilogo della conversazione
- Domande aperte (opzionale)
- Prossimi eventi (opzionale)
- Sentiment del cliente (opzionale)

## Writing assistant tools

Gli strumenti dell'assistente di scrittura basati sull'AI sono progettati
per semplificare e migliorare il flusso di lavoro delle risposte ai ticket
durante la creazione di un articolo. Per usare tale strumento, devi prima
selezionare il testo a cui vuoi applicare le modifiche. Dopodiché, fai clic
sul pulsante `Strumenti dell'assistente di scrittura` sul lato sinistro
della barra degli strumenti dell'editor e scegli uno dei seguenti strumenti.

![Screenshot che mostra il menu dell'editor intelligente di
Zammad](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-writing-assistant-tools.png)

::: warning

- Tieni presente che il tuo testo viene sostituito quando selezioni uno degli strumenti di testo. Se non sei soddisfatto del risultato,
  prova a usare la funzione annulla premendo [[ctrl]] + [[z]].
- Controlla sempre la risposta. Sebbene la funzionalità sia stata sviluppata con cura, potrebbero ancora esserci problemi minori in
  singoli casi a causa della natura delle reti neurali.

:::

Zammad include strumenti predefiniti dell'assistente di scrittura. La
disponibilità dipende dalla configurazione della tua istanza
Zammad. Potresti anche avere strumenti personalizzati aggiuntivi nel caso in
cui il tuo amministratore li abbia aggiunti.

- **Espandi bozza in sezione ben scritta**: Usa la tua bozza come base e
  cerca di elaborare un testo adeguato. Cerca di aggiungere una struttura e
  migliorare la chiarezza e la concisione, nonché rimuovere errori di
  ortografia e grammatica. Puoi usarlo anche fornendo solo informazioni di
  base (ad esempio tramite punti elenco) e lasciando che l'AI scriva la
  risposta.
- **Correggi ortografia e grammatica**: Corregge le bozze del tuo testo e
  rimuove errori di ortografia e grammatica.
- **Riepiloga la sezione a circa la metà delle dimensioni correnti**: Riduce
  il tuo testo mantenendo il messaggio e il tono del testo.
- **Riscrivi la sezione complessa e rendila facile da capire**: Rimuove le
  parti non necessarie e riscrive il tuo testo in modo chiaro e
  comprensibile.

## Knowledge base assistant

![Screenshot shows the related knowledge section of the ticket sidebar with
an AI-suggested knowledge base
answer](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-knowledge-base-assistant.png)

### Knowledge base answer generation

This feature allows you to trigger an AI-based generation of a [knowledge
base](/en/documentation/use/guides/knowledge-base)  answer from a
ticket. This is useful if you often get similar tickets and want to quickly
create a knowledge base article for such cases. Doing so helps you and your
colleagues solve similar tickets more efficiently in the future. It might
even reduce incoming ticket volume when customers can resolve their issues
directly from the published knowledge base.

This feature is available in the **Related knowledge** section of the ticket
sidebar. Click the **Add AI draft** button to trigger the answer generation.

Things to consider:

- The knowledge base answer is generated as draft and not published
  automatically.
- You are set as the answer's author.
- The answer is generated in the default language of your knowledge base.
- The answer includes a note in the content and a tag (`ai-generated`) about
  the AI generation.
- A link to the answer is added to the ticket from which you triggered the
  answer generation.
- The answer is created in a knowledge base category for which you have
  editor permissions. The AI chooses one of these categories.

If a similar knowledge base answer already exists, Zammad shows it in a
dialog before creating a new one. This gives you the chance to review
existing related answers to prevent duplicate submissions.

### Knowledge base answer suggestion

This feature compares the ticket content against the knowledge base and
shows relevant answers under **Suggested by AI** if they meet the
admin-configured score threshold. Each suggestion shows the title of the
answer and more details on hover. An additional relevance score is only
shown to users with the corresponding admin permissions. Click on the title
to open the answer in the knowledge base. Click the ::+:: on the right side
which appears when hovering with the mouse to link it to the ticket.

If no suggestions are available, the message "No suggestions." is displayed
instead.

## AI agents

Gli agenti AI possono essere configurati per lavorare su certi tipi di
attività di routine. In generale, questa funzionalità opera in background,
ma se configurata, potresti notarla in alcune situazioni (vedi esempi
sotto). Nel caso in cui il tuo amministratore abbia creato una macro con
un'azione dell'agente AI, puoi anche eseguirla manualmente. Chiedi al tuo
amministratore i dettagli e dai un'occhiata alla [descrizione delle
macro](/it/documentation/use/advanced-features#macros) nella pagina delle
funzionalità avanzate.

### Cronologia ticket

Se un agente AI ha applicato modifiche, puoi vedere una voce della
cronologia ticket che ti indica il nome dell'agente AI. Se noti problemi
continui con ciò che ha fatto l'agente AI, informa il tuo amministratore
Zammad. Esempio di una voce della cronologia di un agente AI:

![Screenshot che mostra la voce della cronologia ticket dell'agente
AI](/screenshots/documentation/use/ai/ai-agent-ticket-history.png)

### Simultaneous work detection

Gli agenti AI che stanno attualmente lavorando su un ticket vengono
visualizzati come altri agenti nella sezione utenti live nella barra
inferiore. Questo aiuta a evitare lavoro duplicato e la perdita di modifiche
non salvate. Se vedi un avatar di agente AI, aspetta un momento o passa a un
altro ticket.

Avatar dell'agente AI:

![Screenshot che mostra l'avatar di un agente
AI](/screenshots/documentation/use/ai/ai-live-user.png)

### Overview indicator

Un agente AI in esecuzione è indicato nella colonna dello stato nelle
panoramiche. Il cerchio dello stato cambia in un cerchio con gradiente
blu/rosa:

![Screenshot che mostra un cerchio di stato nelle panoramiche che indica che
un agente AI sta attualmente lavorando su di
esso](/screenshots/documentation/use/ai/overview-ai-agent-indicator.png)
