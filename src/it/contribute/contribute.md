---
order: 1
---

# Contribuisci

Siamo felici che tu voglia contribuire a Zammad! Puoi farlo in diversi
modi. I contributi si effettuano principalmente clonando uno dei nostri
repository su GitHub e aprendo una pull request con le tue modifiche (ad
eccezione delle traduzioni, vedi sotto). 🚀

Puoi contribuire a:

- [Codice sorgente](contribute#zammad-source-code)
- [Documentazione](contribute#documentation)
- [Traduzione](contribute#traduzione)

Consulta le sezioni seguenti su come contribuire. Tutti i repository sono
disponibili su [Github](https://github.com/zammad){target=_blank}.

## Codice sorgente di Zammad

Il codice sorgente di Zammad si trova su GitHub nel [repository di
Zammad](https://github.com/zammad/zammad){target=_blank}. Consulta il
[manuale per
sviluppatori](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
per iniziare.

### Branch / Versioni supportati

Il repository GitHub di Zammad ha diversi branch:

#### `develop`

- Questo è lo stato di sviluppo attuale (non ancora rilasciato) della
  prossima versione principale (che diventerà il nuovo ramo `stable`).
- Non usarlo in produzione!
- Questo ramo è attivamente supportato e riceve regolarmente correzioni di
  bug e aggiornamenti di sicurezza (per maggiori dettagli, consultare
  [Politica di
  sicurezza](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}).

#### `stable`

- Questa è la versione stabile corrente, ad esempio Zammad 5.2.
- Usa questo branch per le installazioni in produzione.
- Questo ramo è attivamente supportato e riceve regolarmente correzioni di
  bug e aggiornamenti di sicurezza (per maggiori dettagli, consultare
  [Politica di
  sicurezza](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}).

#### `stable-x.y`

- Questi sono i branch delle versioni precedenti di Zammad, come
  `stable-5.1` per Zammad 5.1.
- Non usarlo in produzione!
- Correzioni di bug e aggiornamenti di sicurezza non vengono applicati a
  questi branch.

## Documentazione

La documentazione che stai leggendo è disponibile su zammad.org e
next.zammad.org ed è costruita con Vitepress. I file sorgente sono scritti
in Markdown. Assicurati di modificare solo i file sorgente in inglese nella
cartella `/src/en/`. La traduzione avviene tramite Weblate e sovrascriverà
qualsiasi modifica nelle cartelle specifiche per lingua (eccetto
`/src/en/`).

Apri una nuova pull request su GitHub su
<https://github.com/zammad/zammad-org> (verso il branch `develop`) con le
tue modifiche e assicurati di seguire la [guida allo stile e ai
contenuti](style-guide) e di leggere il [README.md del
repository](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Traduzione

Se vuoi aiutarci con la traduzione e migliorare il supporto multilingue di
Zammad o della documentazione, sei il benvenuto! La traduzione di Zammad e
della documentazione avviene tramite Weblate, un servizio per la traduzione
collaborativa di progetti. Vai all'[istanza Weblate di
Zammad](https://translations.zammad.org/){target=_blank}. Puoi creare un
account (se non ne hai già uno) o accedere con il tuo account GitHub!

Nelle sezioni seguenti tratteremo i passaggi di base per iniziare a
tradurre. Se vuoi usare funzionalità aggiuntive di Weblate e approfondire,
la loro [documentazione sulla
traduzione](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
è un buon punto di partenza.

### Nozioni di base

La traduzione di **Zammad** e la traduzione della **documentazione** sono suddivise in progetti diversi in Weblate.
Quando fai clic nel menu superiore su _Progetti > Sfoglia tutti i progetti_, puoi trovare la panoramica dei progetti:

![Screenshot che mostra i progetti di traduzione in Weblate e il
menu](/screenshots/contribute/weblate-overview-docs.png)

Struttura dei progetti di traduzione in Weblate:

- Documentazione
  - Nuova documentazione su next.zammad.org
  - Nuova documentazione su zammad.org
- Zammad
  - Zammad (`develop`, versione di sviluppo)
  - Zammad (versione `stable`)
  - Alcuni altri non rilevanti in questo contesto

Seleziona un progetto (documentazione o Zammad) e passa alla scheda
**Componenti**. Seleziona quello che vuoi tradurre. Dopodiché puoi vedere lo
stato della traduzione per le diverse lingue, come mostrato nello screenshot
seguente:

![Screenshot che mostra lo stato della traduzione per le diverse lingue
della documentazione
utente](/screenshots/contribute/weblate-project-overview.png)

::: tip
Non dovrebbe fare molta differenza quale componente/branch scegli di tradurre. Quando Weblate rileva le stesse stringhe in
componenti diversi, verranno usate per tutti i branch e dovranno essere tradotte una sola volta. In caso di dubbio, scegli
`develop`.
:::

### Tradurre

Ora controlla la colonna "Non finiti" della tua lingua e fai clic sul
numero. Si apre la prima stringa non tradotta e puoi iniziare a tradurre. Ma
prima diamo un breve sguardo all'interfaccia utente di Weblate:

![Screenshot dell'interfaccia utente di traduzione di
Weblate](/screenshots/contribute/weblate-ui.png)

1. **Percorso breadcrumb** verso il progetto, il componente e la lingua
   correnti
2. **Area di traduzione** vera e propria. In cima si trova la stringa
   sorgente e sotto il campo per la tua traduzione.
3. **Glossario**: quando una stringa o parte di essa viene rilevata nel
   glossario, trovi lì informazioni aggiuntive. Viene anche evidenziata
   nelle stringhe sorgente.
4. **Alcune schede utili**:
    - **Stringhe vicine**: mostra il contesto della parola o della stringa
    - **Suggerimenti automatici**: qui trovi i suggerimenti automatici di
      DeepL e i suggerimenti di stringhe simili già tradotte. Usa il
      pulsante `Clona nella traduzione` per inserirla nel campo di
      traduzione. Usa il pulsante `Accetta` per accettare la traduzione
      suggerita e passare automaticamente alla stringa successiva.
    - **Altre lingue**: qui vedi un elenco se e come la stringa è tradotta
      in altre lingue (utile per lingue simili).

### Markup nelle stringhe

Di seguito trovi esempi di stringhe sorgente speciali con un badge che
indica dove si trova tale stringa. Cerca di mantenere il markup (adattato) e
assicurati di conservare le variabili. La sezione **Posizione stringa
sorgente** in Weblate (sul lato destro) fornisce un suggerimento su dove
cercare il contesto. Dai anche un'occhiata alla [guida allo stile della
documentazione](style-guide) per maggiori informazioni.

`%s ha creato il ticket |%s|` <Badge type="tip" text="Zammad" />
: La stringa contiene variabili (`%s`) e markup (`||`). Assicurati che la variabile e il markup siano inclusi nella
  traduzione. La posizione può variare a seconda della traduzione.

`` `stringa-esempio` `` <Badge type="tip" text="Documentation" />
: Questo viene reso come codice inline (`stringa-esempio`). A seconda del contesto, può essere tradotto o meno. In ogni
  caso, usa un backtick (`` ` ``) prima e dopo la stringa anche nella tua traduzione.

`[esempio](/en/percorso/al/documento-o-sito-web)` <Badge type="tip" text="Documentazione" />
: Questo è un collegamento a un'altra pagina, incluso il codice lingua. L'"esempio" sopra riportato è il testo, che viene visualizzato come
testo del collegamento. Questa parte può essere tradotta. Per il percorso, solo `en` può essere sostituito dal codice della lingua in cui si sta
traducendo. Assicurati che la tua lingua sia già presente su zammad.org (verificalo utilizzando lo strumento di selezione della lingua). In caso contrario, contattaci se desideri che la tua lingua venga attivata.

`**stringa di esempio**` <Badge type="tip" text="Documentation" />
: Markup per il testo (ad esempio grassetto, corsivo). Alternativa: `_stringa di esempio_`. Cerca di mantenere il markup
  in generale, adattandolo per conservare il significato.
