---
order: 2
title: 'Docker Environment Variables'
---

# Docker Environment Variables

Find the available docker environment variables below with default values,
if applicable. You might also be interested in the [environment variables
documentation](/en/reference/env-vars).

## Zammad

VERSION (\<current stable version of Zammad\>)
: Allows customization of the Zammad image tag. Example: ``6.3.1-54``.
  This default version may be increased when you update your Zammad docker
  stack. Please see the example env template for more details on this variable.

AUTOWIZARD_JSON
: This variable allows you to provide initial configuration data for your
  instance. Autowizard JSON is out of scope of this documentation, however this
  example file should help.

ZAMMAD_WEB_CONCURRENCY
: Allows spawning ``n`` workers to allow more simultaneous connections for
  Zammad's  web UI.

ZAMMAD_SESSION_JOBS_CONCURRENT
: Allows spawning ``n`` session job workers to release pressure from Zammad's
  background worker.

ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS
: Allows spawning ``1`` independent scheduled job worker to reduce pressure
  from Zammad's background worker.

ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS
: Allows spawning n delayed job workers to reduce pressure from Zammad's
  background worker.

RAILS_TRUSTED_PROXIES (``['127.0.0.1', '::1']``)  : By default Zammad trusts
localhost proxies only.

MEMCACHE_SERVERS (``zammad-memcached:11211``)  : Provide your own Memcached
instance to Zammad if you already have one.

REDIS_URL (``redis://zammad-redis:6379``)  : Provide your own Redis instance
if you already have one. Please note that this method currently does not
allow authentication.

## Elasticsearch

ELASTICSEARCH_ENABLED (``true``)  : Setting this variable to false will
allow you to run your Zammad without Elasticsearch. Please note that we
strongly advise against doing so.

ELASTICSEARCH_HOST ()``zammad-elasticsearch``)  : Provide a host name or
address to your external Elasticsearch cluster.

ELASTICSEARCH_PORT (``9200``)  : Provide a different port for Elasticsearch
if needed.

ELASTICSEARCH_SCHEMA (``http``)  : By default, Elasticsearch is reachable
via HTTP.

ELASTICSEARCH_NAMESPACE (``zammad``)
: With this name space all Zammad related indexes will be created. Change this
  if you're using external clusters.

ELASTICSEARCH_REINDEX (``true``)
: By default the docker-compose will always re-index upon a restart. On big
  installations, this may be troublesome.
  :::warning
  Disabling this setting requires you to re-index your search index manually
  whenever you upgrade to a new Zammad version!
  :::

ELASTICSEARCH_SSL_VERIFY (``true``)
: Allows you to let the compose scripts ignore self signed SSL certificates
  for your Elasticsearch installation if needed.

## PostgreSQL

POSTGRESQL_HOST (``zammad-postgresql``)  : Host name of your PostgreSQL
server. Use your own if you already have one.

POSTGRESQL_PORT (``5432``)  : Adjust the Port of your PostgreSQL server.

POSTGRESQL_USER (``zammad``)  : The database user for Zammad.

POSTGRESQL_PASS (``zammad``)  : The password of Zammads database user.

POSTGRESQL_DB (``zammad_production``)  : Zammads database to use.

POSTGRESQL_OPTIONS (``?pool=50``)  : Additional postgresql parameters to be
appended to the database URI.

POSTGRESQL_DB_CREATE (``true``)  : By default Zammad creates the required
database.
  :::warning
  On dedicated database servers, this setting might be troublesome.
  :::

## Nginx

NGINX_EXPOSE_PORT (``8080``)
: The port to be exposed for accessing the Zammad stack from outside. Change
  this to another value if you already have an existing service listening on
  this port.

NGINX_PORT (``8080``)  : The internal port the nginx service will listen on.

NGINX_SERVER_NAME (``_``)
: By default the Nginx container of Zammad will respond to all request. You
  can provide your IP / FQDN if you want to.

NGINX_SERVER_SCHEME (``\$scheme``)
: If the Nginx container for Zammad is not the upstream server (means if you
  are using another proxy in front of nginx) you might want to change this.
  You can set the correct scheme ``http`` or ``https`` if needed.

ZAMMAD_RAILSSERVER_HOST (``zammad-railsserver``)  : Host name of the rails
server container.

ZAMMAD_RAILSSERVER_PORT (``3000``)  : Port of Zammads rails server.

ZAMMAD_WEBSOCKET_HOST (``zammad-websocket``)  : Host name of Zammads
websocket server.

ZAMMAD_WEBSOCKET_PORT (``6042``)  : Port of Zammad's websocket server.
