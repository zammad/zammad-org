---
order: 3
title: Editor
---

# Editor

L'editor di Zammad fornisce un'esperienza di modifica del testo ricco per la
creazione di articoli. Dovrebbe essere autoesplicativo e semplice da
usare. A causa dell'importanza di questo elemento centrale in Zammad, questa
pagina tratta alcune funzionalità che potrebbero non essere visibili a prima
vista.

![Screenshot che mostra l'editor di
Zammad](/screenshots/cypress/documentation/use/guide-editor.cy.js/editor-overview.png)

## Funzioni speciali

L'editor di Zammad include alcune funzionalità intelligenti. Puoi trovarle
sul lato sinistro della barra degli strumenti nell'editor. Poiché sono già
descritte altrove, qui ci limitiamo a fare riferimento a quei posti per
evitare contenuti duplicati.

- [AI assistant text tools](ai#writing-assistant-tools )
- [Mention users](../advanced-features#mention-a-user)
- [Inserisci moduli di testo](../advanced-features#moduli-di-testo)
- [Inserisci articoli dalla base di
  conoscenza](../advanced-features#inserisci-articolo-dalla-base-di-conoscenza)

## Incollare contenuto complesso

Quando incolli contenuto da altre fonti, specialmente documenti contenenti
tabelle, formattazione complessa o immagini, tieni presente che l'aspetto in
Zammad potrebbe essere diverso. L'editor cerca di preservare la
formattazione se possibile, ma possono verificarsi incoerenze. Se ti trovi
in tale situazione, prova a copiare/incollare il contenuto uno alla volta o
incolla testo normale e applica la formattazione nell'editor (vedi la
[sezione formattazione](#applica-formattazione) di seguito).

## Paragrafi

Per separare i paragrafi nell'editor, usa il tasto [[enter]] **una
volta**. Questo viene reso come paragrafi con o senza una riga vuota, a
seconda del software usato dal destinatario. Se aggiungi una riga vuota
aggiuntiva, questa può essere resa come due righe vuote sul lato client.

## Cita testo

Potresti voler citare il testo del tuo cliente per fare riferimento
esattamente alla tua risposta e il tuo cliente non si perde nelle
conversazioni lunghe. Per usare questa funzionalità, seleziona semplicemente
il testo che vuoi citare e fai clic sul pulsante `rispondi` o `inoltra`
accanto all'articolo. Se hai già inserito del testo, viene preservato e il
testo selezionato viene inserito in aggiunta. Ciò significa che puoi
ripetere questo per citare sezioni diverse senza perdere il testo scritto.

## Applica formattazione

Puoi formattare il testo nell'editor in diversi modi:

- Usa la barra degli strumenti integrata
- Usa le scorciatoie da tastiera
- Usa la sintassi [Markdown](https://www.markdownguide.org)

La **barra degli strumenti** dell'editor include pulsanti per le attività di
formattazione comuni. Passando il mouse su ciascun pulsante viene
visualizzato un tooltip che spiega la sua funzione. In alternativa puoi
usare le **scorciatoie da tastiera** (vedi le prossime due sezioni). Attiva
la formattazione in anticipo oppure seleziona il testo dopo la scrittura e
usa la formattazione che vuoi applicare.

### Scorciatoie da tastiera generali

L'editor supporta anche scorciatoie da tastiera per ottimizzare il flusso di
lavoro. Queste scorciatoie sono comuni in molti strumenti di elaborazione
testi. Le scorciatoie importanti sono:

 Scorciatoia/comando            | Formattazione
-------------------------------|---------------
[[ctrl]] + [[b]]               | **Grassetto**
[[ctrl]] + [[i]]               | _Corsivo_
[[ctrl]] + [[u]]               | <u>Sottolineato</u>

Dai un'occhiata alle scorciatoie da tastiera in Zammad dove puoi trovare
tutte le scorciatoie. Aprile tramite il [menu
avatar](/it/documentation/use/user-profile#menu-avatar) nell'angolo in basso
a sinistra o digita [[?]].

Dai un'occhiata alla sezione successiva per usare ancora più formattazione
tramite tastiera. Indipendentemente dal fatto che tu sia abituato a scrivere
Markdown o meno, alcune di esse potrebbero ancora essere utili nel tuo
lavoro quotidiano.

### Utilizzo di Markdown

Per gli utenti che hanno familiarità con la sintassi Markdown, l'editor
fornisce supporto di base per la formattazione del contenuto con
Markdown. Quando si usa la sintassi Markdown, viene applicata immediatamente
o dopo il delimitatore di chiusura in modo da poter vedere il risultato
direttamente nell'editor. Per tornare al testo standard, usa semplicemente
lo stesso delimitatore di nuovo o usa [[enter]], a seconda dell'opzione.

Non è previsto il supporto di tutte le funzionalità Markdown, ma aiutare gli
utenti a fare le cose più facilmente. Pertanto, le cose più importanti sono
supportate come intestazioni, elenchi, link, blocchi di codice e altro. Dai
un'occhiata agli esempi di formattazione non esaustivi di seguito.

Sintassi Markdown              | Formattazione
-------------------------------|---------------
`**`                           | Delimitatore per **grassetto**
`_`                            | Delimitatore per _corsivo_
`#`, `##`, `###`               | Intestazione, livello a seconda del numero di `#`
`>`                            | Citato
`` ` ``                        | Delimitatore per `codice inline`
`` ``` ``                      | Blocco di codice
`---`                          | Riga orizzontale come divisore
