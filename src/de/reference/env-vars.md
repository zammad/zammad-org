---
order: 3
title: Umgebungsvariablen
---

# Konfiguration über Umgebungsvariablen

Verwenden Sie diese Umgebungsvariablen, um das Verhalten von Zammad zur
Laufzeit zu konfigurieren. Sie sollten auch einen Blick auf die [Sammlung
von Rails-Befehlen](/de/reference/console) werfen.

::: warning
Bitte beachten Sie, dass die Umgebungsvariablen für
Installationen auf Basis von [Docker](/de/reference/docker-env-vars) und Kubernetes unterschiedlich benannt sein können.
:::

Default values are tagged with a <Badge type="info" text="badge"/>, if present.

## Allgemeine Optionen

`GPG_PATH`
: Defines the path to the GPG installation. This is only needed if you
  installed Zammad from Source, if you want to use different versions of
  PGP on your machine or if your PGP installation differs from the
  standard installation.

`RAILS_LOG_TO_STDOUT`
: Print output directly to standard output instead of
  `/var/log/zammad/production.log`.

  Diese Einstellung kann bei der Aktualisierung von Paket-Installationen überschrieben werden.
  Verwenden Sie `enabled`, um diese Option nur bis zur nächsten Aktualisierung einzuschalten. Verwenden Sie
  `true`, um sie dauerhaft einzuschalten.

`ZAMMAD_SAFE_MODE`
: Ignore availability of third-party services when running Zammad
  commands. Possible values: `1` or `true`

  ::: warning
  **Vorsicht** bei der Ausführung von Zammad-Befehlen auf Produktivsystemen im
  abgesicherten Modus.

  Dies kann zwar einen Ausweg für bestimmte Fälle bieten, hat aber
  das Potenzial, reguläre Zammad-Vorgänge zu unterbrechen.
  :::

`ZAMMAD_HTTP_TYPE`
: Defines the HTTP protocol of your instance. Possible values: `http` or
  `https`

`ZAMMAD_FQDN` : Defines the fully qualified domain name of the system.

## Netzwerk-Optionen

::: tip
Denken Sie daran, Ihre Webserverkonfiguration zu aktualisieren, damit alle Änderungen, die Sie
hier vorgenommen haben, wirksam werden.
:::

`ZAMMAD_BIND_IP` <Badge type="info" text="127.0.0.1"/>
: Die IP-Adresse, an die der Webserver gebunden ist.

`ZAMMAD_RAILS_PORT` <Badge type="info" text="3000"/>
: Der Port, auf dem der Webserver erreichbar ist.

ZAMMAD_WEBSOCKET_PORT` <Badge type="info" text="6042"/>
: Der Port, auf dem der Web-Socket-Server betrieben wird.

## Leistungsoptimierung

Jede der unten aufgeführten Einstellungen bringt ihre eigenen Kompromisse
mit sich. Es gibt hier keine "empfohlenen Werte"; die optimale Konfiguration
hängt von den Ressourcen Ihres Systems und der typischen Anwendungslast ab.

Die folgenden Einstellungen _können_ alle verfügbaren Datenbankverbindungen
beanspruchen. Bitte prüfen Sie die Konfiguration Ihres Datenbankservers.

::: danger
Seien Sie vorsichtig und verwenden Sie die Einstellungen nur, wenn Sie wissen, was Sie tun!
Die folgenden Einstellungen können zu einer sehr hohen Systemauslastung führen und/oder
relevante Teile von Zammad deaktivieren.
:::

Um herauszufinden, wie viele Benutzer derzeit auf Zammad sind, können Sie
den folgenden Rails-Befehl verwenden:

```sh
zammad run rails r "p Sessions.list.uniq.count"
```

`WEB_CONCURRENCY`
: How many instances of the application server to keep open at a time.
  Increasing this can reduce loading times when too many users are on
  Zammad at once.

`ZAMMAD_SESSION_JOBS_CONCURRENT`
: How many instances of the session worker to run at a time. Increasing this
  can speed up background jobs (like the scheduler) when too many users are on
  Zammad at once.

  Im Allgemeinen ist es nur dann sinnvoll, diese Einstellung zu ändern, wenn
  Sie mehr als 40 aktive Benutzer gleichzeitig haben.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Allows spawning an independent process just for processing scheduled
  jobs like LDAP syncs. This can free up Zammad's background worker for
  other tasks when running tasks that take fairly long.

  Maximale Anzahl von Workern: `1`

  Sie können die Verarbeitung von geplanten Aufgaben deaktivieren, indem Sie
  `ZAMMAD_PROCESS_SCHEDULED_JOBS_DISABLE` deaktivieren (nicht empfohlen!).

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: How many processes should work on delayed jobs? Increasing this _can_
  improve issues with delayed jobs stacking up in your system. You may want to
  try to use `ZAMMAD_SESSION_JOBS_CONCURRENT` before though.

  Maximale Anzahl von Workern: `16`

  Sie können die Verarbeitung von geplanten Aufgaben deaktivieren, indem Sie
  `ZAMMAD_PROCESS_SCHEDULED_JOBS_DISABLE` deaktivieren (nicht empfohlen!).

## Zusätzliche Performance-Anpassungen

::: info
Mit den unten aufgeführten Optionen können Sie die Zammad-Prozesse über
mehrere Anwendungsknoten zu verteilen. Auch wenn das nicht Ihr Ziel ist,
können sie bei größeren Installationen von großem Nutzen sein.

Bitte beachten Sie, dass die Verteilung von Prozessen auf mehrere Knoten nicht
Inhalt dieser Dokumentation ist.
:::

`REDIS_URL`
: Store your web socket connection information within Redis.
  To do so, tell Zammad where to find your Redis instance:
  `redis://your.redis.server:6379`
  If not provided, Zammad falls back to file system
  (`/opt/zammad/tmp/websocket_*`).

`MEMCACHE_SERVERS`
: Store your application cache files within Memcached.
  To do so, tell Zammad where to find your Memcached instance:
  `your.memcached.server:11211`
  If not provided, Zammad falls back to file system
  (`/opt/zammad/tmp/cache*`).

  Mit Memcached können Sie die maximale Größe festlegen, die Zammad als
  Cache speichern kann. Dies ist sehr nützlich für die Leistung und um die
  Cache-Dateien klein zu halten. `1 GB` sollte eine angemessene Größe sein.

## Speicheroptionen

`S3_URL`: Hier können Sie Ihre S3-Konfiguration angeben.

  Format / Beispiel:

  ```sh
  https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true
  ```
