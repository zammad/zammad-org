---
features:
  - 
    details: 'Lorem ipsum...'
    icon: 🛠️
    link: https://zammad.com
    linkText: 'This is a link'
    target: _blank
    title: 'Semplice e minimale, sempre'
  - 
    details: 'Lorem ipsum...'
    icon:
      src: /assets/logo.svg
    link: https://zammad.com
    title: "Un'altra funzionalità interessante"
  - 
    details: 'Lorem ipsum...'
    icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    link: https://zammad.com
    title: "Un'altra funzionalità interessante"
order: 2
---

# Guida allo stile e ai contenuti

Questa guida fornisce una panoramica dei contenuti da includere nella
documentazione di Zammad, nonché le linee guida di formattazione e stile per
garantire chiarezza e leggibilità.

Le prime sezioni riguardano informazioni e regole generali. Segue alla fine
una [sezione con esempi](#esempi).

Se hai domande, chiedi pure nella nostra community. Se vuoi contribuire, dai
un'occhiata alla nostra [pagina dei contributi](contribute) o [apri una
issue](https://github.com/zammad/zammad-org/issues){target=_blank} per
iniziare.

## Presupposti sul pubblico

La documentazione presuppone che gli **utenti** abbiano una comprensione di
base dell'uso dei browser web e familiarità con i concetti comuni del design
del software. Ciò significa, ad esempio, che le funzionalità sono descritte
in dettaglio, ma non fino al punto di spiegare come aprire un menu a
tendina.

Anche l'**amministratore di Zammad** dovrebbe avere una comprensione tecnica
di base e familiarità con i flussi di lavoro e i processi di comunicazione
della propria azienda.

Per le istanze self-hosted, gli **amministratori di sistema** dovrebbero
avere familiarità con le basi dell'amministrazione di sistemi
Linux. L'accesso al sistema host (ad esempio tramite SSH) e i permessi
amministrativi sono dati per scontati.

## Contenuto

La documentazione mira a includere informazioni su:

- Come usare Zammad
- Come gestire Zammad come amministratore (ad esempio configurarlo dopo
  l'installazione, regolare le impostazioni, configurare le funzionalità)
- I diversi modi per installare Zammad
- Guide aggiuntive quando è necessaria la configurazione del sistema (host)
  e/o di sistemi di terze parti.

Per quanto riguarda il **livello di dettaglio**, vanno considerate le
[presupposizioni sul pubblico](#presupposti-sul-pubblico). Poiché uno degli
obiettivi di Zammad è essere intuitivo e user-friendly, non è necessario
descrivere ogni clic in dettaglio. Tuttavia, i passaggi importanti devono
essere inclusi.

Dato che una documentazione non può coprire tutto, va considerata anche la
rilevanza. Se mancano parti con un caso d'uso comune, è opportuno
includerle.

## Stile e regole

Le sezioni seguenti trattano gli aspetti generali da considerare nella
scrittura della documentazione. Dopo di esse trovi una sezione con alcuni
[esempi](#esempi) su come formattare e strutturare il contenuto.

### Nozioni di base

- La documentazione è scritta nel linguaggio di markup Markdown. I file
  sorgente hanno l'estensione `.md`.
- Il sistema usa [Vitepress](https://vitepress.dev/){target=_blank} per
  costruire il sito web.
- La lingua dei file sorgente è l'inglese americano.
- La traduzione della documentazione avviene tramite Weblate, vedi la
  [sezione traduzione](contribute#traduzione) nella pagina dei contributi
  per ulteriori dettagli.

### Stile

- Usa frasi brevi e chiare e dai priorità alle informazioni rispetto alla
  complessità.
- Titolo e intestazioni di pagina: la prima lettera di tutte le parole, ad
  eccezione di quelle di minore importanza, deve essere maiuscola (vedi
  [title case](https://en.wikipedia.org/wiki/Title_case){target=_blank}).
- Usa la separazione breadcrumb per percorsi e posizioni con `>` come
  separatore e formatta il percorso in corsivo, ad esempio _Impostazioni >
  Canali > Chat_.
- Usa l'evidenziazione del codice per enfatizzare i frammenti di
  programmazione.
- Usa i [riquadri info, suggerimento, avviso e
  pericolo](#riquadri-personalizzati) quando necessario.
- Usa un [riquadro dettagli](#riquadri-personalizzati) quando il contenuto
  potrebbe non essere rilevante per tutti i lettori o potrebbe interrompere
  il flusso di lettura.
- Se disponibili, usa le icone per i pulsanti importanti dell'interfaccia
  utente come ::+:: e ::x:: (vedi gli [esempi](#testo-e-interfaccia-utente)
  di seguito).
- Usa il markup per i tasti come [[ctrl]] e [[x]] per evidenziare la
  pressione di un tasto (vedi gli [esempi](#testo-e-interfaccia-utente) di
  seguito).
- Includere screenshot quando necessario. Il metodo preferito per aggiungere
  screenshot di Zammad è crearli automaticamente [utilizzando
  Cypress](https://github.com/zammad/zammad-org?tab=readme-ov-file#automatic-screenshots-cypress){target=_blank}.
  Questo supporta la manutenibilità della documentazione poiché gli
  screenshot vengono rigenerati ogni volta che viene eseguita la pipeline di
  build. Si prega di notare che l'utilizzo di Cypress non fa parte di questa
  documentazione.
- Fornisci istruzioni passo passo con spiegazioni chiare.
- Usa esempi o scenari per illustrare i concetti.
- Includi immagini o diagrammi pertinenti quando necessario.
- Scrivi le abbreviazioni per esteso la prima volta che vengono usate,
  oppure includile nel glossario con un link.
- In caso di dubbio, allineati alla documentazione esistente.

### Convenzioni

Lo stack della documentazione include controlli automatici (linting) per
garantire la conformità alla guida allo stile e alle regole comuni per i
file Markdown. Per verificare se le tue modifiche sono conformi, esegui
`pnpm lint`. Alcuni dei problemi rilevati possono essere corretti
automaticamente eseguendo `pnpm lint:fix`.

Il sistema di linting utilizzato ha alcune regole integrate che puoi trovare
nel [repository
ufficiale](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#rules--aliases){target=_blank}.
Alcune regole importanti e personalizzate sono menzionate di seguito.

- La lunghezza della riga di 120 caratteri nel file sorgente non deve essere
  superata per il testo standard. Assicurati di andare a capo prima di
  raggiungere questo limite. Questo non si applica a contenuti speciali come
  percorsi di screenshot e link lunghi.
- Non sono consentite più righe vuote consecutive.
- Le righe vuote prima e dopo le intestazioni e i blocchi di codice sono
  obbligatorie.
- Usa `` ``` `` (backtick) per i blocchi di codice, seguiti da un tag lingua
  obbligatorio, ad esempio `ruby` o `sh`. Se non si applica nessuna lingua,
  usa `plain`.
- Usa `-` per gli elenchi puntati (non ordinati) come questo.
- Per distinguere facilmente tra **grassetto** e _corsivo_, usa `_` intorno
  al testo per il corsivo e `**` per il grassetto.
- Non sono consentite più intestazioni con lo stesso contenuto.
- Ogni documento deve avere esattamente un'intestazione `h1` come titolo.
- La risoluzione degli screenshot manuali a pagina intera per la
  _visualizzazione mobile_ è di 400x867 pixel.
- La risoluzione degli screenshot manuali a pagina intera per la
  _visualizzazione desktop_ è di 1920x1080 pixel.

### Esempi

#### Testo e interfaccia utente

| Tipo                      | Evidenziazione nella documentazione | Sintassi Markdown               |
|---------------------------|-------------------------------------|---------------------------------|
| Pulsanti con etichetta    | `Accedi`                            | `` `Accedi` ``                  |
| Campi ed elementi UI      | **Nome**                            | `**Nome**`                      |
| Posizioni/percorsi        | _Impostazioni > Canali > Email_     | `_Impostazioni > Canali > Email_` |
| Scorciatoie tastiera      | [[x]]                               | `[[x]]`                         |
| Pulsante aggiungi         | ::+::                               | `::+::`                         |
| Pulsante elimina          | ::x::                               | `::x::`                         |
| Menu azioni               | ::a::                               | `::a::`                         |
| Pulsante copia appunti    | ::c::                               | `::c::`                         |

#### Struttura delle intestazioni

Ogni file della documentazione deve includere esattamente un titolo al
livello superiore (come `# Titolo`). I livelli inferiori devono contenere
sempre almeno due sezioni.

Esempio:

`# Titolo della pagina`

`## Sezione 1`

`### Sezione 1.1`

`### Sezione 1.2`

`## Sezione 2`

#### Sezione con badge <Badge type="warning" text="testo personalizzato" />

Il titolo di questa sezione utilizza un badge del tipo "avviso". Sono
disponibili altri badge, vedere
<https://vitepress.dev/reference/default-theme-badge#usage>.

**Utilizzo:**

::: details

```md
Testo/titolo per aggiungere un badge <Badge type="warning" text="testo personalizzato" />
```

:::

#### Riquadri personalizzati

::::: info
Questo è un riquadro informativo.

**Utilizzo:**

:::: details

```md
::: info
Questo è un riquadro informativo.
:::
```

::::
:::::

::::: tip
Questo è un suggerimento.

**Utilizzo:**

:::: details

```md
::: tip
Questo è un riquadro suggerimento.
:::
```

::::
:::::

::::: warning
Questo è un avviso.

**Utilizzo:**

:::: details

```md
::: warning
Questo è un riquadro avviso.
:::
```

::::
:::::

::::: danger
Questo è un avviso pericoloso.

**Utilizzo:**

:::: details

```md
::: warning
Questo è un avviso pericoloso.
:::
```

::::
:::::

:::: details
Questo è un blocco dettagli.

**Utilizzo:**

```md
::: details
Questo è il contenuto mostrato nello stato espanso.
:::

```

::::

#### Elenchi di definizioni

Primo termine <Badge type="info" text="tag1" />
: Questa è la definizione del primo termine.

Secondo termine <Badge type="info" text="tag1" /> <Badge type="tip" text="tag1" />
: Questa è una definizione del secondo termine.
: Questa è un'altra definizione del secondo termine.

**Utilizzo:**

::: details

```md
Primo termine <Badge type="info" text="tag1" />
: Questa è la definizione del primo termine
  con un'altra riga.
```

:::

#### Evidenziazione con riquadri

Per evidenziare opzioni o varianti diverse, è possibile usare riquadri
cliccabili.

<VPDocFeatures />

La definizione del contenuto avviene tramite frontmatter, vedi il seguente
esempio (rispecchia i riquadri sopra):

```yml

features:
  - icon: 🛠️
    title: Semplice e minimale, sempre
    details: Lorem ipsum...
    link: https://zammad.com
    linkText: Questo è un link
    target: _blank
  - icon:
      src: /assets/logo.svg
    title: Un'altra funzionalità interessante
    details: Lorem ipsum...
    link: https://zammad.com
  - icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    title: Un'altra funzionalità interessante
    details: Lorem ipsum...
    link: https://zammad.com

```

Per posizionarlo nell'area del contenuto, inserisci semplicemente il riferimento `<VPDocFeatures />` nel punto in cui deve essere
renderizzato.

#### Immagini specifiche per tema

Per destinare risorse immagine specifiche a un singolo tema, puoi assegnare
la classe CSS `.dark-only` o `.light-only` all'immagine corrispondente:

```md
![Immagine solo tema scuro](/assets/logo-flat-dark.svg){.dark-only}
![Immagine solo tema chiaro](/assets/logo-flat-light.svg){.light-only}
```

![Immagine solo tema scuro](/assets/logo-flat-dark.svg){.dark-only
width=240} ![Immagine solo tema
chiaro](/assets/logo-flat-light.svg){.light-only width=240}
