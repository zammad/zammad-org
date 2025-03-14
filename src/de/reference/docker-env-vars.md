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

`VERSION` <Badge type="info" text="<aktuelle stabile Version von Zammad>"/>
: Ermöglicht die Anpassung des Zammad Image Tags. Beispiel: `6.3.1-54`.
  Diese Standardversion kann erhöht werden, wenn Sie Ihren Zammad-Docker
  Stack aktualisieren. Weitere Details zu dieser Variable finden Sie in der Beispiel env Datei.

`AUTOWIZARD_JSON`
: Diese Variable ermöglicht es Ihnen, die anfänglichen Konfigurationsdaten für Ihre
  Instanz bereitstellen. Autowizard JSON ist nicht Gegenstand dieser Dokumentation, aber diese
  Beispiel-Datei sollte helfen.

ZAMMAD_WEB_CONCURRENCY`
: Erlaubt das Erzeugen von `n` Workern, um mehrere gleichzeitige Verbindungen für
  Zammads Web-UI zu ermöglichen.

ZAMMAD_SESSION_JOBS_CONCURRENT`
: Erlaubt das Erzeugen von `n` Session-Workern, um Zammads
  Background-Worker zu entlasten.

ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Erlaubt das Erzeugen von `1` unabhängigen Worker für geplanten Aufgaben, um
  Zammads Background-Worker zu entlasten.

ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Erlaubt das Erzeugen von n Workern für verzögerten Aufgaben, um Zammads
  Background-Worker zu entlasten.

`RAILS_TRUSTED_PROXIES` <Badge type="info" text="['127.0.0.1', '::1']"/>
: Standardmäßig vertraut Zammad nur localhost-Proxies.

`MEMCACHE_SERVERS` <Badge type="info" text="zammad-memcached:11211"/>
: Stellen Sie Zammad Ihre eigene Memcached-Instanz zur Verfügung, wenn Sie bereits eine haben.

`REDIS_URL` <Badge type="info" text="redis://zammad-redis:6379"/>
: Geben Sie Ihre eigene Redis-Instanz an, wenn Sie bereits eine haben. Bitte beachten Sie, dass
 diese Methode derzeit keine Authentifizierung erlaubt.

## Elasticsearch

`ELASTICSEARCH_ENABLED` <Badge type="info" text="true"/>
: Wenn Sie diese Variable auf false setzen, können Sie Ihr Zammad ohne
Elasticsearch verwenden. Bitte beachten Sie, dass wir dringend davon abraten.

`ELASTICSEARCH_HOST` <Badge type="info" text="zammad-elasticsearch"/>
: Geben Sie einen Hostnamen oder eine Adresse für Ihr Elasticsearch-Cluster an.

`ELASTICSEARCH_PORT` <Badge type="info" text="9200"/>
: Geben Sie bei Bedarf einen anderen Port für Elasticsearch an.

`ELASTICSEARCH_SCHEMA` <Badge type="info" text="http"/>
: Standardmäßig ist Elasticsearch über HTTP erreichbar.

`ELASTICSEARCH_NAMESPACE` <Badge type="info" text="zammad"/>
: Mit diesem Namensraum werden alle Zammad-bezogenen Indizes erstellt. Ändern Sie dies
  wenn Sie externe Cluster verwenden.

`ELASTICSEARCH_REINDEX` <Badge type="info" text="true"/>
: Standardmäßig wird docker-compose bei einem Neustart immer neu indizieren. Bei großen
  Installationen kann dies problematisch sein.
  :::warning
  Wenn Sie diese Einstellung deaktivieren, müssen Sie Ihren Suchindex manuell neu indizieren
  wenn Sie auf eine neue Zammad-Version aktualisieren!
  :::

`ELASTICSEARCH_SSL_VERIFY` <Badge type="info" text="true"/>
: Ermöglicht es Ihnen, dass die Compose-Skripte selbstsignierte SSL-Zertifikate
  für Ihre Elasticsearch-Installation ignorieren, falls erforderlich.

## PostgreSQL

`POSTGRESQL_HOST` <Badge type="info" text="zammad-postgresql"/>
: Der Hostname Ihres PostgreSQL-Servers. Verwenden Sie Ihren eigenen, wenn Sie bereits einen haben.

`POSTGRESQL_PORT` <Badge type="info" text="5432"/>
: Stellen Sie den Port Ihres PostgreSQL-Servers ein.

`POSTGRESQL_USER` <Badge type="info" text="zammad"/>
: Der Datenbank-Benutzer für Zammad.

`POSTGRESQL_PASS` <Badge type="info" text="zammad"/>
: Das Passwort von Zammads Datenbank-Benutzer.

`POSTGRESQL_DB` <Badge type="info" text="zammad_production"/>
: Zammads zu verwendende Datenbank.

`POSTGRESQL_OPTIONS` <Badge type="info" text="?pool=50"/>
: Zusätzliche postgresql-Parameter, die an den Datenbank-URI angehängt werden.

`POSTGRESQL_DB_CREATE` <Badge type="info" text="true"/>
: Standardmäßig erstellt Zammad die gewünschte Datenbank.
  :::warning
  Auf dedizierten Datenbankservern kann diese Einstellung problematisch sein.
  :::

## Nginx

NGINX_EXPOSE_PORT` <Badge type="info" text="8080"/>
: Der Port, der für den Zugriff auf den Zammad-Stack von außen freigegeben werden soll. Ändern
  Sie diesen Wert auf einen anderen, wenn Sie bereits einen Dienst haben, der auf
  diesem Port lauscht.

`NGINX_PORT` <Badge type="info" text="8080"/>
: Der interne Port, an dem der nginx-Dienst lauschen soll.

`NGINX_SERVER_NAME` <Badge type="info" text="_"/>
: Standardmäßig wird der Nginx-Container von Zammad auf alle Anfragen antworten. Sie
  können Ihre IP / FQDN angeben, wenn Sie das möchten.

`NGINX_SERVER_SCHEME` <Badge type="info" text="\$scheme"/>
: Wenn der Nginx-Container für Zammad nicht der Upstream-Server ist (d.h. wenn Sie
  einen anderen Proxy vor Nginx verwenden), möchten Sie dies vielleicht ändern.
  Sie können das richtige Schema `http` oder `https` einstellen, falls nötig.

ZAMMAD_RAILSSERVER_HOST` <Badge type="info" text="zammad-railsserver"/>
: Hostname des Rails-Server-Containers.

`ZAMMAD_RAILSSERVER_PORT` <Badge type="info" text="3000"/>
: Port von Zammads Rails-Server.

ZAMMAD_WEBSOCKET_HOST` <Badge type="info" text="zammad-websocket"/>
: Hostname von Zammads Websocket-Server.

ZAMMAD_WEBSOCKET_PORT` <Badge type="info" text="6042"/>
: Port des Websocket-Servers von Zammad.
