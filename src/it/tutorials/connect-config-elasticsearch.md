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

We collected some useful settings you may want to apply. For further
information please have a look at [Elastic's
documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

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

By default, the [Asciifold feature of
Elasticsearch](https://www.elastic.co/docs/reference/text-analysis/analysis-asciifolding-tokenfilter){target=_blank}
is enabled. This can be useful if you deal with text which includes
diacritics and/or umlauts.

Nel caso tu abbia bisogno di una ricerca più precisa, puoi disattivarla
tramite [console Rails](/it/reference/rails-commands#disabilita-asciifold).

## Risoluzione problemi

:::tip
Troubleshooting unsuccessful or issue not described?

If you can't solve your issue using the provided troubleshooting steps
or can't find your particular issue described here, feel free to
[ask the community](https://community.zammad.org){target=_blank} for technical
assistance.
:::

### Dati mancanti dall'interfaccia web / Dati di ricerca mancanti o incompleti

A commonly reported issue is data missing from the Web-UI. This could be
tickets, articles, users or anything else [indexed by
Elasticsearch](/en/reference/es-indexed-attributes)  and can be caused by
missing or incomplete indexes.

If you are experiencing this issue and installed Elasticsearch according to
our [installation guide](/en/tutorials/install-elasticsearch), please follow
these steps to make sure Elasticsearch is working correctly.

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
If this fails, your Elasticsearch installation is probably broken.
Try completely purging and reinstalling Elasticsearch according to
our [installation guide](/en/tutorials/install-elasticsearch).
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

If this fails or throws an error, there might be something else wrong with
your installation. Make sure you followed the complete Elasticsearch set up
and integration procedure according to our [installation
guide](/en/tutorials/install-elasticsearch).

::: tip
In molte situazioni in cui non hai successo con i passaggi sopra, potresti
voler controllare i log di Elasticsearch.
:::

Dopo aver completato questi passaggi, dovresti aver verificato che la tua
installazione Elasticsearch sia.
