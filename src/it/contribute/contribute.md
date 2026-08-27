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

Please have a look at our the sections below about how to contribute. All
repos can be found on [GitHub](https://github.com/zammad){target=_blank}.

## Zammad source code

Il codice sorgente di Zammad si trova su GitHub nel [repository di
Zammad](https://github.com/zammad/zammad){target=_blank}. Consulta il
[manuale per
sviluppatori](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
per iniziare.

### Supported branches / versions

Zammad's GitHub repository has several branches:

#### `develop`

- Questo è lo stato di sviluppo attuale (non ancora rilasciato) della
  prossima versione principale (che diventerà il nuovo ramo `stable`).
- Non usarlo in produzione!
- This branch is actively supported and receives regular bug fixes and
  security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable`

- Questa è la versione stabile corrente, ad esempio Zammad 5.2.
- Usa questo branch per le installazioni in produzione.
- This branch is actively supported and receives regular bug fixes and
  security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable-x.y`

- Questi sono i branch delle versioni precedenti di Zammad, come
  `stable-5.1` per Zammad 5.1.
- Non usarlo in produzione!
- Correzioni di bug e aggiornamenti di sicurezza non vengono applicati a
  questi branch.

## Documentazione

The documentation you are reading is available on zammad.org and
next.zammad.org and is built with VitePress. The source files are written in
Markdown. Make sure to change the English source files only which are placed
under `/src/en/`. The translation is done via Weblate and will overwrite any
changes in the language specific folders (except `/src/en/`).

Apri una nuova pull request su GitHub su
<https://github.com/zammad/zammad-org> (verso il branch `develop`) con le
tue modifiche e assicurati di seguire la [guida allo stile e ai
contenuti](style-guide) e di leggere il [README.md del
repository](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Traduzione

If you want to help us with translation and improve the multi-language
support of Zammad or the documentation, you are welcome to contribute as
well! The translation of Zammad and the documentation is done via Weblate,
which is a service for the collaborative translation of projects. Just head
over to Zammad's [Weblate
instance](https://translations.zammad.org/){target=_blank}.  You can either
create an account (if you don't have one already) or even sign in with your
GitHub account!

We will cover some basic steps in the following sections to get you started
with translating. However, if you want to use some additional features of
Weblate and want to dive deeper into it, their [translation
documentation](https://docs.weblate.org/en/latest/user/translating.html){target=_blank}
is a good starting point.

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

### Markup in strings

Find some examples for special source strings below with a badge indicating
where such a string can be found. Try to keep the (adjusted) markup and make
sure to keep the variables. The **Source string location** section in
Weblate (on the right side) gives you a hint where to search for the
context. Also have a look at the [style guide of the
documentation](style-guide) where you can find more information about the
syntax and the usage of Markdown/VitePress features.

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
