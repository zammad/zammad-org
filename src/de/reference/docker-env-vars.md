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
  Stack aktualisieren. Weitere Details zu dieser Variable finden Sie in der (Beispiel env Datei](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist).

`AUTOWIZARD_JSON`
: Diese Variable ermöglicht es Ihnen, die anfänglichen Konfigurationsdaten für Ihre Instanz bereitstellen. Autowizard JSON ist nicht Gegenstand dieser Dokumentation,
  aber diese Beispiel-Datei sollte helfen.

`ZAMMAD_HTTP_TYPE`: Legt den http-Typ (http/https) Ihrer Instanz fest.

`ZAMMAD_FQDN`: Legen Sie den FQDN für Ihre Instanz fest.

`ZAMMAD_WEB_CONCURRENCY`
: Erlaubt das Erzeugen von `n` Workern, um mehrere gleichzeitige Verbindungen für
  Zammads Web-UI zu ermöglichen. Siehe auch: [Konfiguration per Umgebungsvariablen](env-vars).

  Falls Sie eine [Begrenzung der Hardwareressourcen in Docker](docker-compose-scenarios) angewendet haben, sollte die CPU-Einstellung von zammad-railsserver
  dem Wert dieser Variable entsprechen.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Erlaubt das Erzeugen von `1` unabhängigen Worker für geplanten Aufgaben, um Zammads Background-Worker zu entlasten.
  Siehe auch: [Konfiguration via Umgebungsvariablen](env-vars).

  Falls Sie eine [Begrenzung der Hardwareressourcen in Docker](docker-compose-scenarios) angewendet haben, sollte die CPU-Einstellung von zammad-scheduler
  mit der Summe aller Variablen der Worker-Einstellungen übereinstimmen.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Erlaubt das Erzeugen von `1` unabhängigen Worker für geplanten Aufgaben, um Zammads Background-Worker zu entlasten.
  Siehe auch: [Konfiguration via Umgebungsvariablen](env-vars).

  Falls Sie eine [Begrenzung der Hardwareressourcen in Docker](docker-compose-scenarios) angewendet haben, sollte die CPU-Einstellung von zammad-scheduler
  mit der Summe aller Variablen der Worker-Einstellungen übereinstimmen.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Erlaubt das Erzeugen von n Workern für verzögerten Aufgaben, um Zammads
  Background-Worker zu entlasten. Siehe auch: [Konfiguration via Umgebungsvariablen](env-vars).

  Falls Sie eine [Begrenzung der Hardwareressourcen in Docker](docker-compose-scenarios) angewendet haben, sollte die CPU-Einstellung von zammad-scheduler
  mit der Summe aller Variablen der Worker-Einstellungen übereinstimmen.

`RAILS_TRUSTED_PROXIES` <Badge type="info" text="127.0.0.1,::1"/>
: Diese Einstellung ist wichtig für die korrekte Erkennung von Client IP Adressen und darauf basierenden Funktionen, wie z.B. Rate
  Limiting.

  Standardmäßig vertraut Zammad nur Localhost-Proxys. Zusätzliche Proxyserver müssen hier hinzugefügt werden, entweder mit IP-Adresse
  (falls statisch) oder über den Hostnamen. Hostnamen werden beim Start von Zammad aufgelöst, so dass ein Neustart erforderlich ist,
  wenn sich die IP-Adresse eines Proxy-Servers ändert.

  Beachten Sie, dass Zammad im Docker-Kontext möglicherweise die IP-Adresse des Netzwerk-Gateways anstelle der tatsächlichen IP-Adresse des Proxy-Servers sieht,
  wenn er sich in einem anderen Netzwerk befindet.

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

`ELASTICSEARCH_REINDEX`
: Der Suchindex wird automatisch neu aufgebaut, wenn kein Index gefunden werden kann. Wenn Sie den Suchindex manuell neu aufbauen müssen,
  setzen Sie entweder diese Variable auf `true` oder führen Sie den Reindex-Befehl über Docker manuell aus.

`ELASTICSEARCH_SSL_VERIFY` <Badge type="info" text="true"/>
: Ermöglicht es Ihnen, dass die Compose-Skripte selbstsignierte SSL-Zertifikate
  für Ihre Elasticsearch-Installation ignorieren, falls erforderlich.

`ELASTICSEARCH_HEAP_SIZE` <Badge type="info" text="1G"/>
: Legt den verfügbaren Arbeitsspeicher für Elasticsearch fest. Wenn Sie Probleme mit ES und seiner Leistung haben, sollten Sie diesen
  Wert auf eine angemessene Größe erhöhen.

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

`NGINX_EXPOSE_PORT` <Badge type="info" text="8080"/>
: Der Port, der für den Zugriff auf den Zammad-Stack von außen freigegeben werden soll. Ändern
  Sie diesen Wert auf einen anderen, wenn Sie bereits einen Dienst haben, der auf diesem Port lauscht.

`NGINX_PORT` <Badge type="info" text="8080"/>
: Der interne Port, an dem der nginx-Dienst lauschen soll.

`NGINX_SERVER_NAME` <Badge type="info" text="_"/>
: Standardmäßig wird der Nginx-Container von Zammad auf alle Anfragen antworten. Sie können Ihre IP / FQDN angeben, wenn Sie das möchten.

`NGINX_SERVER_SCHEME` <Badge type="info" text="\$scheme"/>
: Wenn der Nginx-Container für Zammad nicht der Upstream-Server ist (d.h. wenn Sie einen anderen Proxy vor Nginx verwenden), möchten Sie
  dies vielleicht ändern. Sie können das richtige Schema `http` oder `https` einstellen, falls nötig.

`NGINX_CLIENT_MAX_BODY_SIZE`: Definiert die maximale Größe der Daten, die
ein Client an den Server senden kann.

ZAMMAD_RAILSSERVER_HOST` <Badge type="info" text="zammad-railsserver"/>
: Hostname des Rails-Server-Containers.

`ZAMMAD_RAILSSERVER_PORT` <Badge type="info" text="3000"/>
: Port von Zammads Rails-Server.

`ZAMMAD_WEBSOCKET_HOST` <Badge type="info" text="zammad-websocket"/>
: Hostname von Zammads Websocket-Server.

`ZAMMAD_WEBSOCKET_PORT` <Badge type="info" text="6042"/>
: Port des Websocket-Servers von Zammad.
