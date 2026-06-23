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
ulteriori informazioni dai.

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
Elasticsearch](https://www.elastic.co/docs/reference

In case you need a more exact search, you can turn it off via [Rails
console](/en/reference/rails-commands#disable-asciifold).

## Risoluzione problemi

:::tip
Risoluzione dei problemi senza successo o problema non descritto?

Se non riesci a risolvere il tuo problema usando.
:::

### Dati mancanti dall'interfaccia web / Dati di ricerca mancanti o incompleti

Un problema comunemente segnalato sono i dati mancanti dall'interfaccia
web. Potrebbero essere ticket, articoli.

Se riscontri questo problema e hai installato Elasticsearch secondo le
nostre [istruzioni di installazione].

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
Se questo fallisce, la tua installazione di Elasticsearch è probabilmente corrotta.
Prova a eliminare completamente.
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

Se questo fallisce o genera un errore, potrebbe esserci qualcos'altro che
non va nella tua installazione.

::: tip
In molte situazioni in cui non hai successo con i passaggi sopra, potresti
voler controllare i log di Elasticsearch.
:::

Dopo aver completato questi passaggi, dovresti aver verificato che la tua
installazione Elasticsearch sia.
