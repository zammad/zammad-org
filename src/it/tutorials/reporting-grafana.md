---
order: 5
title: 'Reporting con Grafana'
---

# Reporting con Grafana

::: info
Questa guida riguarda Grafana. Se vuoi usare un altro strumento, controlla se
supporta Elastic.
:::

Grafana è un'applicazione di analisi/visualizzazione di terze parti che puoi
collegare a Zammad (pr

Questa guida ti fornirà alcuni passaggi per iniziare. Per una comprensione
più approfondita, ti consigliamo di dare un'occhiata agli [attributi
indicizzati di Elasticsearch](/en/reference/es-indexed-attributes) e di
leggere la [documentazione di
Grafana](https://grafana.com/docs/){target=_blank}.

Questa guida si aspetta che tutti i requisiti siano operativi. Non
tratteremo la configurazione di base.

## Prerequisiti

Ti serve:

- Un'istanza di Grafana funzionante (ospitata o self-hosted) in versione
  10.3 o superiore
- Accesso in lettura al tuo indice Elasticsearch
- Un'istanza Zammad in versione 4 o superiore

::: warning
Non esporre mai Elasticsearch al pubblico se non sei sicuro di
come farlo. In particolare **mai.
:::

## Configurazione delle origini dati richieste

**Prima di iniziare:** Le origini dati seguono sempre lo stesso schema. Abbiamo
ridotto le informazioni sotto.

:::: tip
Sostituisci `zammad_production_` con il tuo prefisso adatto.

Fai clic su dettagli per vedere come interrogare.

::: details
Adatta il seguente comando al tuo ambiente:

```sh
curl http://localhost:9200/_aliases?pretty=true
```

Questo restituirà un output simile al seguente:

```json
{
  "zammad_production_knowledge_base_translation" : {
    "aliases" : { }
  },
  "zammad_production_ticket_priority" : {
    "aliases" : { }
  },
  "zammad_production_stats_store" : {
    "aliases" : { }
  },
  "zammad_production_organization" : {
    "aliases" : { }
  },
  "zammad_production_cti_log" : {
    "aliases" : { }
  },
  "zammad_production_group" : {
    "aliases" : { }
  },
  "zammad_production_knowledge_base_answer_translation" : {
    "aliases" : { }
  },
  "zammad_production_ticket" : {
    "aliases" : { }
  },
  "zammad_production_ticket_state" : {
    "aliases" : { }
  },
  "zammad_production_chat_session" : {
    "aliases" : { }
  },
  "zammad_production_user" : {
    "aliases" : { }
  },
  "zammad_production_knowledge_base_category_translation" : {
    "aliases" : { }
  }
}
```

:::
::::

### ES - Sessioni chat

- Nome indice: `zammad_production_chat_session`
- Nome campo orario: `created_at`

### ES - Registro CTI

- Nome indice: `zammad_production_cti_log`
- Nome campo orario: `start_at`

### ES - Articoli ticket

- Nome indice: `zammad_production_ticket`
- Nome campo orario: `article.created_at`

### ES - Ticket per closed_at

- Nome indice: `zammad_production_ticket`
- Nome campo orario: `close_at`

### ES - Ticket per created_at

- Nome indice: `zammad_production_ticket`
- Nome campo orario: `created_at`

### ES - Ticket per first_response_at

- Nome indice: `zammad_production_ticket`
- Nome campo orario: `first_response_at`

Con le origini dati sopra hai fondamentalmente tutto ciò di cui hai bisogno
per iniziare a costruire la tua.

## Avvio rapido con modello dashboard

Se desideri trarre ispirazione, puoi utilizzare le nostre dashboard di
esempio, come indicato di seguito. Queste dashboard sono disponibili anche
su [GitHub](https://github.com/zammad/grafana-dashboards){target=_blank}.

### Importare una dashboard

In Grafana, seleziona _➕ > Importa_ (o qualsiasi altro posto che ti offre di importare
una dashboard.

Durante l'importazione puoi fornire un nome dashboard e una cartella. Ti
verrà anche chiesto di mappare.

### Dashboard statistiche ticket <Badge type="tip" text="14222"/>

![Dashboard ticket Grafana](/screenshots/tutorials/reporting/tickets.png)

#### Grafici dashboard

- apertura e chiusura ticket[^1]
- articoli creati
- SLA ticket (in tempo _e_ violazione) per tipo[^1][^2]

#### Meta informazioni ticket e articoli

- distribuzione gruppi ticket
- rapporto mittenti (ad esempio Cliente / Agente)[^3]
- rapporto tipo articolo (ad esempio email, telefono)[^3]
- tipo contenuto articolo
- rapporti escalation[^1]
- prima risposta media, tempo aggiornamento e tempo chiusura[^2]
- top 10 di:
  - organizzazione del cliente del ticket[^1]
  - clienti ticket[^1]
  - proprietari ticket[^1]
  - tempo medio registrato sul ticket
  - tag ticket[^1]
- ultimi 10 ticket escalati

#### Origini dati richieste

- `ES - Articoli ticket`
- `ES - Ticket per created_at`
- `ES - Ticket per closed_at`

### Dashboard statistiche sessioni chat <Badge type="tip" text="14224"/>

![Dashboard chat
Grafana](/screenshots/tutorials/reporting/chat-sessions.png)

#### Grafici dashboard

Creazioni sessioni chat.

#### Meta informazioni sessione chat

- top 10 di:
  - tag chat
  - agenti chat
  - pagine di uscita chat
  - origini città
- rapporto argomenti chat
- numero medio di messaggi nelle sessioni chat
- tempo medio chat
- mappa mondiale con paesi di origine chat

#### Origini dati richieste

- `ES - Sessioni chat`

### Dashboard statistiche registro CTI <Badge type="tip" text="14223"/>

![Dashboard chiamate Grafana](/screenshots/tutorials/reporting/calls.png)

#### Grafici dashboard

Numero di chiamate per direzione (in entrata / in uscita).

#### Meta informazioni sessione chat

- rapporto chiamate (in entrata / in uscita)
- tempo medio di attesa
- tempo medio di conversazione
- top 10 di:
  - chiamanti (in entrata)
  - risponditori chiamate (in entrata)

#### Origini dati richieste

- `ES - Registro CTI`

[^1]: Alcuni valori non sono disponibili come informazioni di serie temporale. Questo
    significa che possiamo visualizzare solo l'_ultimo_ valore del campo in questione.

[^2]: Richiede che la funzione SLA sia attiva. Valori negativi indicano violazioni
    SLA.

[^3]: ID di riferimento specifici non sono gli stessi su ogni istanza e quindi
    il pannello potrebbe non funzionare o mostrare dati errati. Controlla la
    descrizione dei pannelli su come
