---
order: 3
title: 'Environment variables'
---

# Environment variables

Trova di seguito le variabili d’ambiente più importanti con i valori predefiniti (come <Badge type="tip" text="badge" />), se
applicabile. Le variabili per le installazioni basate su Docker e pacchetti possono essere diverse in alcuni casi. Puoi trovare
un altro badge aggiunto ai nomi delle variabili con il seguente significato:

- Disponibile solo per installazioni Docker: ::d::
- Disponibile solo per installazioni tramite pacchetto: ::p::
- Disponibile per entrambe le varianti di installazione: senza badge

::: tip

Se vuoi usare un file `.env` nelle distribuzioni Docker Compose, puoi usare quello fornito.

:::

## Varie

`GPG_PATH` ::p::
: Definisce il percorso della tua installazione GPG. Necessario solo se vuoi usarla.

`RAILS_LOG_TO_STDOUT` ::p::
: Questa impostazione può essere sovrascritta durante l'aggiornamento sulle installazioni tramite pacchetto.

`ZAMMAD_SAFE_MODE` ::p::
: Fai attenzione quando esegui comandi Zammad su sistemi di produzione.

`ZAMMAD_BIND_IP` ::p:: <Badge type="tip" text="127.0.0.1" />
:
  The IP address that the web server is bound to.

`S3_URL` ::p::
: Ti permette di fornire la configurazione del tuo provider di storage S3. Esempio per.

## Zammad

`VERSION` ::d:: <Badge type="tip" text="current stable version of Zammad" />
: Allows customization of the Zammad image tag. Example: `6.3.1-54`. This default version may be increased when you
  update your Zammad Docker stack. Please see the
  [example env file](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
  for more details on this variable.

`AUTOWIZARD_JSON` ::d::
: This variable allows you to provide initial configuration data for your instance. Autowizard JSON is out of scope of
  this documentation, however
  [this example file](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json){target=_blank}
  should help.

`ZAMMAD_HTTP_TYPE`
:
  Set the http type for your instance. Possible values are `http` and `https`.

`ZAMMAD_FQDN`
:
  Set the FQDN for your instance.

`RAILS_TRUSTED_PROXIES` <Badge type="tip" text="127.0.0.1,::1" />
: Questa impostazione è importante.

  Per impostazione predefinita, Zammad si fida solo dei proxy localhost. Eventuali server proxy aggiuntivi devono essere aggiunti.

  Nota che nel contesto Docker, Zammad potrebbe vedere l'indirizzo IP del gateway di rete invece di.

`ZAMMAD_MANAGE_SESSIONS_JOBS_WORKERS` <Badge type="tip" text="0" />
: Permette di forkare il worker.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS` <Badge type="tip" text="0" />
: Tale worker gestisce.

  Gli utenti AI self-hosted dovrebbero fare attenzione ad aumentarlo, il tuo servizio AI potrebbe collassare.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS` <Badge type="tip" text="5" />
: Quanti.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKERS` <Badge type="tip" text="0" />

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKER_THREADS` <Badge type="tip" text=

`MEMCACHE_SERVERS` <Badge type="tip" text="Docker: zammad-memcached:11211" /> <Badge type=

`REDIS_URL` <Badge type="tip" text="Docker: redis://zammad-redis:6379" /> <Badge type="tip" text="Package: unset" />
: Fornisci una tua istanza Redis se ne hai già una. Il fallback dell’installazione tramite pacchetto è
  `/opt/zammad/tmp/websocket_*`. Consulta [Variabili Redis](/en/reference/redis) per una configurazione con Sentinel.

## Elasticsearch

`ELASTICSEARCH_ENABLED` ::d:: <Badge type="tip" text="true" />
: Impostare questa variabile su.

`ELASTICSEARCH_HOST` ::d:: <Badge type="tip" text="zammad-elasticsearch" />
:
  Provide a host name or address to your external Elasticsearch cluster.

`ELASTICSEARCH_PORT` ::d:: <Badge type="tip" text="9200" />
:
  Provide a different port for Elasticsearch if needed.

`ELASTICSEARCH_SCHEMA` ::d:: <Badge type="tip" text="http" />
:
  Change it to `https` if your Elasticsearch cluster is configured to use SSL.

`ELASTICSEARCH_NAMESPACE` ::d:: <Badge type="tip" text="zammad" />
:
  With this name space all Zammad related indexes will be created. Change this if you're using external clusters.

`ELASTICSEARCH_REINDEX` ::d::
: L'indice di ricerca viene ricostruito automaticamente quando nessun indice.

`ELASTICSEARCH_SSL_VERIFY` ::d:: <Badge type="tip" text="true" />
: Ti permette di far.

`ELASTICSEARCH_HEAP_SIZE` ::d:: <Badge type="tip" text="1G" />
: Imposta la memoria disponibile.

## PostgreSQL

::: tip
Le variabili per l'installazione Docker e tramite pacchetto sono parzialmente diverse. Controlla le limitazioni.
:::

`POSTGRESQL_HOST` ::p:: <Badge type="tip" text="zammad-postgresql" />
: Nome host o indirizzo IP.

`POSTGRESQL_PORT` ::p:: <Badge type="tip" text="5432" />
:
  Adjust the port of your PostgreSQL server.

`POSTGRESQL_USER` ::p:: <Badge type="tip" text="zammad" />
:
  The database user for Zammad.

`POSTGRESQL_PASS` ::p:: <Badge type="tip" text="zammad" />
:
  The password of Zammad's database user.

`POSTGRESQL_DB` ::p:: <Badge type="tip" text="zammad_production" />
:
  Zammad's database to use.

`POSTGRES_HOST` ::d:: <Badge type="tip" text="zammad-postgresql" />
: Host name or IP address of your PostgreSQL server. In case you use an IPv6 address, enclose the address in square
  brackets (e.g. `[2001:db8::2]`).

`POSTGRES_PORT` ::d:: <Badge type="tip" text="5432" />
:
  Adjust the port of your PostgreSQL server.

`POSTGRES_USER` ::d:: <Badge type="tip" text="zammad" />
:
  The database user for Zammad.

`POSTGRES_PASS` ::d:: <Badge type="tip" text="zammad" />
:
  The password of Zammad's database user.

`POSTGRES_DB` ::d:: <Badge type="tip" text="zammad_production" />
:
  Zammad's database to use.

`POSTGRESQL_OPTIONS` <Badge type="tip" text="?pool=50" />
:
  Additional PostgreSQL params to be appended to the database URI.

`POSTGRESQL_DB_CREATE` <Badge type="tip" text="true" />
: Per impostazione predefinita, Zammad crea il database necessario. Su server di database già esistenti, il valore predefinito potrebbe
  causare problemi.

## Nginx

`NGINX_EXPOSE_PORT` ::d:: <Badge type="tip" text="8080" />
: La porta da esporre per l'accesso.

`NGINX_PORT` ::d:: <Badge type="tip" text="8080" />
:
  The internal port the Nginx service will listen on.

`NGINX_SERVER_NAME` ::d:: <Badge type="tip" text="_" />
:
  By default, the Nginx container of Zammad will respond to all request. You can provide your IP / FQDN if you want to.

`NGINX_SERVER_SCHEME` ::d:: <Badge type="tip" text="$scheme" />
: If the Nginx container for Zammad **is not** the upstream server (aka you're using another proxy in front of Nginx)
  `$scheme` may be wrong. You can set the correct scheme `http` or `https` if needed. Set this if you face a
  `CSRF Token Verification Failed` error.

`NGINX_CLIENT_MAX_BODY_SIZE` ::d::
:
  Define the maximum size of data that a client can send to the server.

`ZAMMAD_RAILSSERVER_HOST` ::d:: <Badge type="tip" text="zammad-railsserver" />
:
  Host name of the Rails server container.

`ZAMMAD_RAILSSERVER_PORT` ::d:: <Badge type="tip" text="3000" />
:
  Port of Zammad's Rails server.

`ZAMMAD_RAILS_PORT` ::p:: <Badge type="tip" text="3000" />
:
  Port of Zammad's Rails server.

`ZAMMAD_WEBSOCKET_HOST` ::d:: <Badge type="tip" text="zammad-websocket" />
:
  Host name of Zammad's WebSocket server.

`ZAMMAD_WEBSOCKET_PORT` ::d:: <Badge type="tip" text="6042" />
:
  Port of Zammad's WebSocket server.

## Performance tuning

Ognuna delle impostazioni seguenti comporta dei compromessi. Non ci sono
valori consigliati qui.

Procedi con cautela; quando regoli una di queste impostazioni, c'è un punto
in cui le prestazioni.

Le impostazioni riportate di seguito possono consumare tutte le connessioni
disponibili del database. Considera la sezione [Configure Database
Server](config-db-server) per maggiori informazioni.

`ZAMMAD_WEB_CONCURRENCY`
: Consente di avviare `n` worker per permettere più connessioni simultanee all’interfaccia web di Zammad. Nel caso tu abbia applicato
  [limiti alle risorse hardware di Docker](docker-compose-scenarios#limit-resources), l’impostazione della CPU del servizio zammad-railsserver
  dovrebbe corrispondere al valore di questa variabile.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: Quanti processi del worker di sessione eseguire.

  Nel caso tu abbia applicato [limiti alle risorse hardware di Docker](docker-compose-scenarios#limit-resources), l’impostazione della CPU del servizio zammad-scheduler
  dovrebbe corrispondere alla somma di tutte le variabili di impostazione dei worker.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Permette di generare `1` worker indipendente per i job pianificati.

  Nel caso tu abbia applicato [limiti alle risorse hardware di Docker](docker-compose-scenarios#limit-resources), l’impostazione della CPU del servizio zammad-scheduler
  dovrebbe corrispondere alla somma di tutte le variabili di impostazione dei worker.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Permette di generare `n` processi worker per rilasciare.

  Nel caso tu abbia applicato [limiti alle risorse hardware di Docker](docker-compose-scenarios#limit-resources), l’impostazione della CPU del servizio zammad-scheduler
  dovrebbe corrispondere alla somma di tutte le variabili di impostazione dei worker.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKER_THREADS`
: Thread usati da **un** worker dei job ritardati.

## HTTP client settings

Impostazioni globali di timeout HTTP. Queste variabili controllano il
comportamento di timeout predefinito.

`ZAMMAD_HTTP_OPEN_TIMEOUT` <Badge type="tip" text="30" />
: Definisce il tempo massimo in secondi.

`ZAMMAD_HTTP_READ_TIMEOUT` <Badge type="tip" text="60" />
: Definisce il tempo massimo in secondi.

`ZAMMAD_HTTP_TOTAL_TIMEOUT` <Badge type="tip" text="60" />
: Defines the maximum total time in seconds for the complete HTTP request, wrapping connection establishment and
  response read. This is an additional hard ceiling on top of `ZAMMAD_HTTP_OPEN_TIMEOUT` and
  `ZAMMAD_HTTP_READ_TIMEOUT`.

## How to set environment variables

Dipende da come hai installato Zammad (pacchetto, Docker). Impostala tramite
`zammad config`.

Esempi per installazioni tramite pacchetto:

Imposta OPZIONE a "valore":

``` sh
zammad config:set OPTION=value
```

Ottieni OPZIONE:

``` sh
zammad config:get OPTION
```

Rimuovi OPZIONE:

``` sh
zammad config:unset OPTION
```

Riavvia Zammad dopo aver modificato le impostazioni:

``` sh
sudo systemctl restart zammad
```
