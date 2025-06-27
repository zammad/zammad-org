---
order: 3
title: Docker-Umgebungsvariablen
---

# Docker-Umgebungsvariablen

Nachfolgend finden Sie die verfügbaren Docker-Umgebungsvariablen mit
Standardwerten, falls zutreffend. Sie könnten auch an der
[Umgebungsvariablen-Dokumentation](/de/reference/env-vars) interessiert
sein.

::: tip
Wenn Sie eine `.env`-Datei verwenden wollen, können Sie die mitgelieferte `.env.dist`-Datei verwenden und sie nach `.env` kopieren. Auf diese Weise wird sie
automatisch von Docker-Compose berücksichtigt und nicht bei Aktualisierungen überschrieben.
:::

## Zammad

`VERSION` <Badge type="info" text="<current stable version of Zammad>"/>
: Allows customization of the Zammad image tag. Example: `6.3.1-54`. This default version may be increased when you
  update your Zammad docker stack. Please see the
  [example env template](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist) for more details on
  this variable.

`AUTOWIZARD_JSON`
: This variable allows you to provide initial configuration data for your instance. Autowizard JSON is out of scope of
  this documentation, however this example file should help.

`ZAMMAD_HTTP_TYPE` : Set the http type (http/https) for your instance.

`ZAMMAD_FQDN` : Set the FQDN for your instance.

`ZAMMAD_WEB_CONCURRENCY`
: Allows spawning `n` workers to allow more simultaneous connections for Zammad's web UI. See also:
  [Configuration via Environment Variables](env-vars).

  In case you applied [docker hardware resource limits](docker-compose-scenarios), the zammad-railsserver's CPU setting
  should match the value from this variable.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: Allows spawning `n` independent session jobs workers to release pressure from Zammad's background worker. See also:
  [Configuration via Environment Variables](env-vars).

  In case you applied [docker hardware resource limits](docker-compose-scenarios), the zammad-scheduler CPU setting
  should match the sum of all worker settings variables.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Allows spawning `1` independent scheduled job worker to reduce pressure from Zammad's background worker. See also:
  [Configuration via Environment Variables](env-vars).

  In case you applied [docker hardware resource limits](docker-compose-scenarios), the zammad-scheduler CPU setting
  should match the sum of all worker settings variables.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Allows spawning `n` delayed job workers to reduce pressure from Zammad's background worker. See also:
  [Configuration via Environment Variables](env-vars).

  In case you applied [docker hardware resource limits](docker-compose-scenarios), the zammad-scheduler CPU setting
  should match the sum of all worker settings variables.

`RAILS_TRUSTED_PROXIES` <Badge type="info" text="127.0.0.1,::1"/>
: This setting is important for the correct detection of client IP addresses and features based on it, like rate
  limiting.

  By default, Zammad trusts localhost proxies only. Any additional proxy servers will have to be added here, by IP address
  (if static) or by host name. Host names are resolved during the start of Zammad, so that a restart is required whenever
  the IP address of a proxy server changes.

  Note that in docker context, Zammad may see the network gateway IP address instead of the actual proxy server IP address,
  if it is placed in another network.

`MEMCACHE_SERVERS` <Badge type="info" text="zammad-memcached:11211"/>
: Stellen Sie Zammad Ihre eigene Memcached-Instanz zur Verfügung, wenn Sie bereits eine haben.

`REDIS_URL` <Badge type="info" text="redis://zammad-redis:6379"/>
: Provide your own Redis instance if you already have one. Please note that this method currently does not allow
  authentication.

## Elasticsearch

`ELASTICSEARCH_ENABLED` <Badge type="info" text="true"/>
: Setting this variable to false will allow you to run your Zammad without Elasticsearch. Please note that we strongly
  advise against doing so.

`ELASTICSEARCH_HOST` <Badge type="info" text="zammad-elasticsearch"/>
: Geben Sie einen Hostnamen oder eine Adresse für Ihr Elasticsearch-Cluster an.

`ELASTICSEARCH_PORT` <Badge type="info" text="9200"/>
: Geben Sie bei Bedarf einen anderen Port für Elasticsearch an.

`ELASTICSEARCH_SCHEMA` <Badge type="info" text="http"/>
: Standardmäßig ist Elasticsearch über HTTP erreichbar.

`ELASTICSEARCH_NAMESPACE` <Badge type="info" text="zammad"/>
: With this name space all Zammad related indexes will be created. Change this if you're using external clusters.

`ELASTICSEARCH_REINDEX`
: The searchindex automatically gets rebuilt when no index can be detected. If you need to rebuild the searchindex
  manually, either set this variable to `true` or run the reindex command via docker manually.

`ELASTICSEARCH_SSL_VERIFY` <Badge type="info" text="true"/>
: Allows you to let the compose scripts ignore self signed SSL certificates for your Elasticsearch installation if
  needed.

`ELASTICSEARCH_HEAP_SIZE` <Badge type="info" text="1G"/>
: Set the available memory for Elasticsearch. If you face issues with ES and its performance, you should increase this
  value to a reasonable size.

## PostgreSQL

`POSTGRESQL_HOST` <Badge type="info" text="zammad-postgresql"/>
: Der Hostname Ihres PostgreSQL-Servers. Verwenden Sie Ihren eigenen, wenn Sie bereits einen haben.

`POSTGRESQL_PORT` <Badge type="info" text="5432"/>
: Stellen Sie den Port Ihres PostgreSQL-Servers ein.

`POSTGRESQL_USER` <Badge type="info" text="zammad"/>
: Der Datenbank-Benutzer für Zammad.

`POSTGRESQL_PASS` <Badge type="info" text="zammad"/>
: The password of Zammad's database user.

`POSTGRESQL_DB` <Badge type="info" text="zammad_production"/>
: Zammad's database to use.

`POSTGRESQL_OPTIONS` <Badge type="info" text="?pool=50"/>
: Zusätzliche postgresql-Parameter, die an den Datenbank-URI angehängt werden.

`POSTGRESQL_DB_CREATE` <Badge type="info" text="true"/>
: Standardmäßig erstellt Zammad die gewünschte Datenbank.
  :::warning
  Auf dedizierten Datenbankservern kann diese Einstellung problematisch sein.
  :::

## Nginx

`NGINX_EXPOSE_PORT` <Badge type="info" text="8080"/>
: The port to be exposed for accessing the Zammad stack from outside. Change this to another value if you already have
  an existing service listening on this port.

`NGINX_PORT` <Badge type="info" text="8080"/>
: Der interne Port, an dem der nginx-Dienst lauschen soll.

`NGINX_SERVER_NAME` <Badge type="info" text="_"/>
: By default the Nginx container of Zammad will respond to all request. You can provide your IP / FQDN if you want to.

`NGINX_SERVER_SCHEME` <Badge type="info" text="\$scheme"/>
: If the Nginx container for Zammad is not the upstream server (means if you are using another proxy in front of nginx)
  you might want to change this. You can set the correct scheme `http` or `https` if needed.

`NGINX_CLIENT_MAX_BODY_SIZE` : Define the maximum size of data that a client
can send to the server.

ZAMMAD_RAILSSERVER_HOST` <Badge type="info" text="zammad-railsserver"/>
: Hostname des Rails-Server-Containers.

`ZAMMAD_RAILSSERVER_PORT` <Badge type="info" text="3000"/>
: Port of Zammad's rails server.

`ZAMMAD_WEBSOCKET_HOST` <Badge type="info" text="zammad-websocket"/>
: Host name of Zammad's websocket server.

`ZAMMAD_WEBSOCKET_PORT` <Badge type="info" text="6042"/>
: Port des Websocket-Servers von Zammad.
