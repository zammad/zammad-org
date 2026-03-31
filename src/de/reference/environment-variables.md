---
order: 3
title: Umgebungsvariablen
---

# Umgebungsvariablen

Find the most important environment variables below with default values (as <Badge type="tip" text="badge" />), if
applicable. The variables for Docker and package based installations can be different in some cases. You can find
another badge appended to variable names with the following meaning:

- Nur für Docker-Installationen verfügbar: ::d::
- Nur für Paketinstallationen verfügbar: ::p::
- Verfügbar für beide Installationsvarianten: kein Icon

::: tip

Wenn Sie eine `.env`-Datei in Docker Compose-Installationen verwenden möchten, können Sie die mitgelieferte `.env.dist`-Datei verwenden und sie
als `.env` kopieren. Auf diese Weise wird sie von Docker Compose automatisch übernommen und bei Aktualisierungen nicht überschrieben.

:::

## Verschiedenes

`GPG_PATH` ::p::
: Defines the path of your GPG installation. Only needed if you want to use different versions of PGP or if your PGP
  installation differs from the standard installation.

`RAILS_LOG_TO_STDOUT` ::p::
: This setting can be overwritten during update on package installations. Use `enabled` to turn this option on only
  until the next update. Use `true` to turn it on permanently.

`ZAMMAD_SAFE_MODE` ::p::
: Be careful when running Zammad commands on production systems in safe mode. While it may allow an escape hatch for
  certain commands, it has a potential to break regular Zammad operations.

`ZAMMAD_BIND_IP` ::p:: <Badge type="tip" text="127.0.0.1" />
: The IP address that the web server is bound to.

`S3_URL` ::p::
: Allows you to provide your S3 storage provider configuration. Example for value:
  `https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true`

## Zammad

`VERSION` ::d:: <Badge type="tip" text="current stable version of Zammad" />
: Allows customization of the Zammad image tag. Example: `6.3.1-54`. This default version may be increased when you
  update your Zammad Docker stack. Please see the
  [example env file](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist) for more details on this
  variable.

`AUTOWIZARD_JSON` ::d::
: This variable allows you to provide initial configuration data for your instance. Autowizard JSON is out of scope of
  this documentation, however
  [this example file](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json) should help.

`ZAMMAD_HTTP_TYPE` : Set the http type for your instance. Possible values
are `http` and `https`.

`ZAMMAD_FQDN`: Legen Sie den FQDN für Ihre Instanz fest.

`RAILS_TRUSTED_PROXIES` <Badge type="tip" text="127.0.0.1,::1" />
: This setting is important for the correct detection of client IP addresses and features based on it, like rate
  limiting.

  By default, Zammad trusts localhost proxies only. Any additional proxy servers will have to be added here,
  by IP address (if static) or by host name. Host names are resolved during the start of Zammad, so that a restart is
  required whenever the IP address of a proxy server changes.

  Note that in Docker context, Zammad may see the network   gateway IP address instead of the actual proxy server
  IP address, if it is placed in another network.

`ZAMMAD_MANAGE_SESSIONS_JOBS_WORKERS` <Badge type="tip" text="0" />
: Allows to fork the job that dispatches the session jobs to their workers to a child process. Allowed value to enable
  it: `1`.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS` <Badge type="tip" text="0" />
: Such a worker handles Zammad’s AI requests and fetches the responses from the configured AI provider. This variable
  allows you to specify the number of workers to run simultaneously. `0` means a thread in the main process is used, `1`
  means a separate worker gets spawned, etc. The maximum number of workers is `16`. See also
  `ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS`.

  Self hosted AI users should be careful in increasing it, your AI service might collapse. For AI cloud service users
  with a big Zammad instance, it could make sense to increase it to have some kind of parallelization.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS` <Badge type="tip" text="5" />
: How many threads should be processed by a **single** AI worker (if you run more than one worker process, it gets
  multiplied). This may speed up the AI processing, but be aware that a Ruby worker can only span across 1 core anyway.
  The maximum number of threads is `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKERS` <Badge type="tip" text="0" />
: Allows concurrent fetching of inbound communication channels. Useful if you have many channels and/or mailboxes added.
  `0` means a thread in the main process is used, `1` means a separate worker gets spawned, etc. The maximum number of
  workers is `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKER_THREADS` <Badge type="tip" text="1" />
: Threads used for fetching inbound communication channels. How many threads should be processed by a **single** inbound
  jobs worker (if you run more than one worker process, it gets multiplied). The maximum number of threads is `16`.

`MEMCACHE_SERVERS` <Badge type="tip" text="Docker: zammad-memcached:11211" /> <Badge type="tip" text="Package: unset" />
: Provide your own Memcached instance to Zammad if you already have one. The package installation fallback is
  `/opt/zammad/tmp/cache*`.

`REDIS_URL` <Badge type="tip" text="Docker: redis://zammad-redis:6379" /> <Badge type="tip" text="Package: unset" />
: Provide your own Redis instance if you already have one. The package installation fallback is
  `/opt/zammad/tmp/websocket_*`. See [Redis Variables](/en/reference/redis) for a Sentinel setup.

## Elasticsearch

`ELASTICSEARCH_ENABLED` ::d:: <Badge type="tip" text="true" />
: Setting this variable to false will allow you to run your Zammad without Elasticsearch. Please note that we strongly
  advise **against** doing so.

`ELASTICSEARCH_HOST` ::d:: <Badge type="tip" text="zammad-elasticsearch" />
: Provide a host name or address to your external Elasticsearch cluster.

`ELASTICSEARCH_PORT` ::d:: <Badge type="tip" text="9200" />
: Provide a different port for Elasticsearch if needed.

`ELASTICSEARCH_SCHEMA` ::d:: <Badge type="tip" text="http" />
: Change it to `https` if your Elasticsearch cluster is configured to use SSL.

`ELASTICSEARCH_NAMESPACE` ::d:: <Badge type="tip" text="zammad" />
: With this name space all Zammad related indexes will be created. Change this if you're using external clusters.

`ELASTICSEARCH_REINDEX` ::d::
: The searchindex automatically gets rebuilt when no index can be detected. If you need to rebuild the searchindex
  manually, either set this variable to `true` or run the reindex command via Docker manually.

`ELASTICSEARCH_SSL_VERIFY` ::d:: <Badge type="tip" text="true" />
: Allows you to let the Compose scripts ignore self signed SSL certificates for your Elasticsearch installation if
  needed.

`ELASTICSEARCH_HEAP_SIZE` ::d:: <Badge type="tip" text="1G" />
: Set the available memory for Elasticsearch. If you face issues with ES and its performance, you should increase this
  value to a reasonable size.

## PostgreSQL

:::tip
Variables for Docker and package installation are partially different. Check the limitation badge and make sure to pick
the right one. The both variables at the end of the list are valid for both installation types.
:::

`POSTGRESQL_HOST` ::p:: <Badge type="tip" text="zammad-postgresql" />
: Host name or IP address of your PostgreSQL server. In case you use an IPv6 address, enclose the address in square
  brackets (e.g. `[2001:db8::2]`).

`POSTGRESQL_PORT` ::p:: <Badge type="tip" text="5432" />
: Adjust the port of your PostgreSQL server.

`POSTGRESQL_USER` ::p:: <Badge type="tip" text="zammad" />
: The database user for Zammad.

`POSTGRESQL_PASS` ::p:: <Badge type="tip" text="zammad" />
: The password of Zammad's database user.

`POSTGRESQL_DB` ::p:: <Badge type="tip" text="zammad_production" />
: Zammad's database to use.

`POSTGRES_HOST` ::d:: <Badge type="tip" text="zammad-postgresql" />
: Host name or IP address of your PostgreSQL server. In case you use an IPv6 address, enclose the address in square
brackets (e.g. `[2001:db8::2]`).

`POSTGRES_PORT` ::d:: <Badge type="tip" text="5432" />
: Adjust the port of your PostgreSQL server.

`POSTGRES_USER` ::d:: <Badge type="tip" text="zammad" />
: The database user for Zammad.

`POSTGRES_PASS` ::d:: <Badge type="tip" text="zammad" />
: The password of Zammad's database user.

`POSTGRES_DB` ::d:: <Badge type="tip" text="zammad_production" />
: Zammad's database to use.

`POSTGRESQL_OPTIONS` <Badge type="tip" text="?pool=50" />
: Additional PostgreSQL params to be appended to the database URI.

`POSTGRESQL_DB_CREATE` <Badge type="tip" text="true" />
: By default, Zammad creates the required database. On already existing database servers, the default might be
  troublesome.

## Nginx

`NGINX_EXPOSE_PORT` ::d:: <Badge type="tip" text="8080" />
: The port to be exposed for accessing the Zammad stack from outside. Change this to another value if you already have
  an existing service listening on this port.

`NGINX_PORT` ::d:: <Badge type="tip" text="8080" />
: The internal port the Nginx service will listen on.

`NGINX_SERVER_NAME` ::d:: <Badge type="tip" text="_" />
: By default, the Nginx container of Zammad will respond to all request. You can provide your IP / FQDN if you want to.

`NGINX_SERVER_SCHEME` ::d:: <Badge type="tip" text="\$scheme" />
: If the Nginx container for Zammad **is not** the upstream server (aka you're using another proxy in front of Nginx)
  `$scheme` may be wrong. You can set the correct scheme `http` or `https` if needed. Set this if you face a
  `CSRF Token Verification Failed` error.

`NGINX_CLIENT_MAX_BODY_SIZE` ::d:: : Define the maximum size of data that a
client can send to the server.

`ZAMMAD_RAILSSERVER_HOST` ::d:: <Badge type="tip" text="zammad-railsserver" />
: Host name of the Rails server container.

`ZAMMAD_RAILSSERVER_PORT` ::d:: <Badge type="tip" text="3000" />
: Port of Zammad's Rails server.

`ZAMMAD_RAILS_PORT` ::p:: <Badge type="tip" text="3000" />
: Port of Zammad's Rails server.

`ZAMMAD_WEBSOCKET_HOST` ::d:: <Badge type="tip" text="zammad-websocket" />
: Host name of Zammad's websocket server.

`ZAMMAD_WEBSOCKET_PORT` ::d:: <Badge type="tip" text="6042" />
: Port of Zammad's websocket server.

## Leistungsoptimierung

Jede der unten aufgeführten Einstellungen bringt ihre eigenen Kompromisse
mit sich. Es gibt hier keine empfohlenen Werte; die optimale Konfiguration
hängt von den Ressourcen Ihres Systems und der typischen Anwendungslast ab.

Gehen Sie mit Vorsicht vor. Wenn Sie eine dieser Einstellungen anpassen,
gibt es einen Punkt, an dem sich die Leistung eher verschlechtert als
verbessert, oder andere Probleme auftreten.

Die nachstehenden Einstellungen können alle verfügbaren
Datenbank-Verbindungen verwenden. Bitte beachten Sie die
[Datenbankserver-Konfiguration](config-db-server) für weitere Informationen.

`ZAMMAD_WEB_CONCURRENCY`
: Allows spawning `n` workers to allow more simultaneous connections for Zammad's web UI. In case you applied
  [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-railsserver's CPU setting
  should match the value from this variable.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: How many processes of the session worker to run at a time. Increasing this value can speed up background jobs (like
  the scheduler) when many users are on Zammad at once. However, it is not useful to adjust this setting if you have
  less than 40 active users at a time. Increasing the amount of these processes can consume a lot of resources!

  In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-scheduler
  CPU setting should match the sum of all worker settings variables.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Allows spawning `1` independent scheduled jobs worker to release pressure from Zammad's background worker. Maximum
  number of workers: `1`.

  In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-scheduler
  CPU setting should match the sum of all worker settings variables.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Allows spawning `n` worker processes to release pressure from Zammad’s background worker. `0` means a thread in the
  main process is used, `1` means a separate worker gets spawned, etc. The maximum number of workers is `16`.

  In case you applied [Docker hardware resource limits](docker-compose-scenarios#limit-resources), the zammad-scheduler
  CPU setting should match the sum of all worker settings variables.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKER_THREADS`
: Threads used by **one** delayed jobs worker process (if you have more than one worker process, it is multiplied by
  their amount). The maximum number of threads is `16`.

## Umgebungsvariablen setzen

Es hängt davon ab, wie Sie Zammad installiert haben (Paket,
Docker). Entweder setzen Sie sie über den Befehl `zammad config`, wie Sie
unten sehen können, verwenden die Art und Weise Ihres Systems, Variablen
über die Kommandozeile zu setzen (z.B. `export VARIABLE=wert)`, legen eine
`.env` Datei in das Verzeichnis oder Sie verwenden sogar eine GUI wie
Portainer, um Variablen für eine Docker-Installation zu setzen.

Beispiele für Paketinstallationen:

Setzen Sie OPTION auf "wert":

``` sh
zammad config:set OPTION=wert
```

OPTION abfragen:

``` sh
zammad config:get OPTION
```

OPTION entfernen:

``` sh
zammad config:unset OPTION
```

Starten Sie Zammad nach der Änderung der Einstellungen neu:

``` sh
sudo systemctl restart zammad
```
