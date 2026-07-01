---
order: 2
title: 'Collega e configura Elasticsearch'
---

# Collega e configura Elasticsearch

<!--@include: @/en/modules/zammad-services-hint.md-->

Questa guida ti mostra come collegare Zammad con Elasticsearch.

## Collega Elasticsearch con Zammad

### Imposta l'URL di Elasticsearch

Imposta l'indirizzo del server Elasticsearch; adattalo al tuo scenario.

```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Imposta l'utente e la password di Elasticsearch

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```

Sostituisci `<password>` con quella ottenuta durante l'installazione di Elasticsearch. Nel caso.

```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Aggiungi certificato a Zammad

#### Aggiungilo tramite console Rails

Nel caso tu stia installando un nuovo Zammad e non abbia seguito la
procedura guidata.

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt | zammad run rails r "SSLCertificate.create!
```

#### Aggiungilo tramite interfaccia

Nel caso tu abbia già un Zammad in esecuzione e configurato, puoi aggiungere il certificato in Z

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

Per aggiungerlo in Zammad, carica il file del certificato o incolla il
contenuto nella finestra di dialogo.

### Costruisci/Ricostruisci l'indice di ricerca

Senza specificare i core CPU da usare:

```sh
zammad run rake zammad:searchindex:rebuild
```

Specificando i core CPU da usare (esempio 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Impostazioni opzionali

Abbiamo raccolto alcune impostazioni utili che potresti voler applicare. Per
ulteriori informazioni, consulta la [documentazione di
Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

### Namespacing dell'indice

Utile quando si collegano più servizi o istanze Zammad a un singolo server
Elasticsearch.

```sh
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### Regole di indicizzazione allegati file

Zammad supporta la ricerca negli allegati file, il che significa che
Elasticsearch deve indicizzarli.

I file con queste estensioni non verranno indicizzati:

```sh
zammad run rails r "Setting.set('es_attachment_ignore',\
[ '.png', '.jpg', '.jpeg', '.mpeg
```

I file più grandi di questa dimensione (in MB) non verranno indicizzati:

```sh
zammad run rails r "Setting.set('es_attachment_max_size_in_mb', 50)"
```

### Asciifold

Per impostazione predefinita, la [funzionalità Asciifold di
Elasticsearch](https://www.elastic.co/docs/reference/text-analysis/analysis-asciifolding-tokenfilter){target=_blank}
è abilitata. Questo può essere utile se lavori con testo che include
diacritici e/o umlaut.

Nel caso tu abbia bisogno di una ricerca più precisa, puoi disattivarla
tramite [console Rails](/it/reference/rails-commands#disabilita-asciifold).

## Risoluzione problemi

:::tip
Risoluzione dei problemi non riuscita o problema non descritto?

Se non riesci a risolvere il tuo problema utilizzando i passaggi di troubleshooting forniti
o non trovi il tuo problema specifico descritto qui, sentiti libero di
[chiedere alla community](https://community.zammad.org){target=_blank} assistenza tecnica.
:::

### Dati mancanti dall'interfaccia web / Dati di ricerca mancanti o incompleti

Un problema comunemente segnalato è la mancanza di dati nella Web-UI. Questo
può riguardare ticket, articoli, utenti o qualsiasi altra cosa [indicizzata
da Elasticsearch](/en/reference/es-indexed-attributes) e può essere causato
da indici mancanti o incompleti.

Se stai riscontrando questo problema e hai installato Elasticsearch seguendo
la nostra [guida di installazione](/en/tutorials/install-elasticsearch),
segui questi passaggi per assicurarti che Elasticsearch funzioni
correttamente.

#### Passo 1: Verifica che Elasticsearch sia in esecuzione

```sh
sudo systemctl status elasticsearch
```

Questo dovrebbe produrre qualcosa come quanto segue, assicurati che dica
`Active: active (runnin

```sh
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/lib/systemd/system/elasticsear
```

Altrimenti, prova a riavviarlo e controlla di nuovo:

```sh
sudo systemctl restart elasticsearch
```

::: warning
Se questo fallisce, è probabile che la tua installazione di Elasticsearch sia danneggiata.
Prova a eliminare completamente e reinstallare Elasticsearch seguendo
la nostra [guida di installazione](/en/tutorials/install-elasticsearch).
:::

#### Passo 2: Verifica che Zammad possa accedere a Elasticsearch e ricostruisci gli indici

Forza Zammad a eliminare e ricostruire gli indici Elasticsearch,
opzionalmente con un numero specificato.

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

Questo dovrebbe iniziare a ricostruire gli indici e visualizzare il suo
progresso:

```sh
Dropping indexes... done.
Deleting pipeline... done.
Creating indexes... done.
Creating pi
```

A seconda delle prestazioni del sistema e della quantità di dati, questo può
richiedere del tempo per completarsi.

Se questo fallisce o genera un errore, potrebbe esserci qualcos’altro che
non va nella tua installazione. Assicurati di aver seguito l’intera
procedura di configurazione e integrazione di Elasticsearch secondo la
nostra [guida di installazione](/en/tutorials/install-elasticsearch).

::: tip
In molte situazioni in cui non hai successo con i passaggi sopra, potresti
voler controllare i log di Elasticsearch.
:::

Dopo aver completato questi passaggi, dovresti aver verificato che la tua
installazione Elasticsearch sia.
