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

Standardwerte sind mit einem <Badge type="info" text="badge"/> gekennzeichnet, sofern vorhanden.

## Allgemeine Optionen

`GPG_PATH`
: Legt den Pfad zur GPG-Installation fest. Dies wird nur benötigt, wenn Sie
  Zammad aus dem Quellcode installiert haben, wenn Sie verschiedene Versionen von
  PGP auf Ihrem Rechner verwenden wollen oder wenn Ihre PGP-Installation von der
  Standard-Installation abweicht.

`RAILS_LOG_TO_STDOUT`
: Ausgabe direkt auf Standard Output anstatt in
  `/var/log/zammad/production.log`.

  Diese Einstellung kann bei der Aktualisierung von Paket-Installationen überschrieben werden.
  Verwenden Sie `enabled`, um diese Option nur bis zur nächsten Aktualisierung einzuschalten. Verwenden Sie
  `true`, um sie dauerhaft einzuschalten.

ZAMMAD_SAFE_MODE`
: Ignoriert die Verfügbarkeit von Third-Party-Diensten bei der Ausführung von
  Zammad- Befehlen. Mögliche Werte: `1` oder `true`

  ::: warning
  **Vorsicht** bei der Ausführung von Zammad-Befehlen auf Produktivsystemen im
  abgesicherten Modus.

  Dies kann zwar einen Ausweg für bestimmte Fälle bieten, hat aber
  das Potenzial, reguläre Zammad-Vorgänge zu unterbrechen.
  :::

`ZAMMAD_HTTP_TYPE`
: Bestimmt das HTTP-Protokoll Ihrer Instanz. Mögliche Werte: `http` oder
  `https`

`ZAMMAD_FQDN`: Legt den FQDN/Domainnamen des Systems fest.

## Netzwerk-Optionen

::: tip
Denken Sie daran, Ihre Webserverkonfiguration zu aktualisieren, damit alle Änderungen, die Sie
hier vorgenommen haben, wirksam werden.
:::

`ZAMMAD_BIND_IP` <Badge type="info" text="127.0.0.1"/>
: Die IP-Adresse, an die der Webserver gebunden ist.

`ZAMMAD_RAILS_PORT` <Badge type="info" text="3000"/>
: Der Port, auf dem der Webserver erreichbar ist.

`ZAMMAD_WEBSOCKET_PORT` <Badge type="info" text="6042"/>
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
: Wie viele Instanzen des Anwendungsservers gleichzeitig offen sein sollen.
  Eine Erhöhung kann die Ladezeiten verringern, wenn zu viele Benutzer gleichzeitig auf
  Zammad sind.

`ZAMMAD_SESSION_JOBS_CONCURRENT`
: Legt fest wie viele Instanzen des Sesstion Workers gleichzeitig ausgeführt werden sollen. 
  Eine Erhöhung kann Hintergrundaufgaben (wie die Automatisierung) beschleunigen,
  wenn zu viele Benutzer gleichzeitig in Zammad arbeiten.

  Im Allgemeinen ist es nur dann sinnvoll, diese Einstellung zu ändern, wenn
  Sie mehr als 40 aktive Benutzer gleichzeitig haben.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKERS`
: Ermöglicht das Erzeugen eines unabhängigen Prozesses nur für die Verarbeitung geplanter
  Aufgaben wie LDAP-Synchronisationen. Dies kann den Hintergrundprozess von Zammad für andere
  Aufgaben freigeben, falls solche Aufgaben ausgeführt werden, die ziemlich lange dauern.

  Maximale Anzahl von Workern: `1`

  Sie können die Verarbeitung von geplanten Aufgaben deaktivieren, indem Sie
  `ZAMMAD_PROCESS_SCHEDULED_JOBS_DISABLE` deaktivieren (nicht empfohlen!).

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Wie viele Prozesse sollen an verzögerten Aufgaben arbeiten? Eine Erhöhung dieser Zahl _kann_
  Probleme mit verzögerten Aufgaben verbessern, die sich in Ihrem System aufgestaut haben.
  Sie können vorher versuchen, `ZAMMAD_SESSION_JOBS_CONCURRENT` zu verwenden.

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
: Speichern Sie Ihre Web-Socket-Verbindungsinformationen in Redis.
  Dazu teilen Sie Zammad mit, wo Ihre Redis-Instanz zu finden ist:
  `redis://Ihr.redis.server:6379`
  Falls nicht angegeben, greift Zammad auf das Dateisystem zurück
  (`/opt/zammad/tmp/websocket_*`) zurück.

`MEMCACHE_SERVERS`
: Speichern Sie Ihre Anwendungs-Cache-Dateien in Memcached.
  Dazu teilen Sie Zammad mit, wo Ihre Memcached-Instanz zu finden ist:
  `Ihr.memcached.server:11211`
  Wenn nicht angegeben, greift Zammad auf das Dateisystem zurück
  (`/opt/zammad/tmp/cache*`) zurück.

  Mit Memcached können Sie die maximale Größe festlegen, die Zammad als
  Cache speichern kann. Dies ist sehr nützlich für die Leistung und um die
  Cache-Dateien klein zu halten. `1 GB` sollte eine angemessene Größe sein.

## Speicheroptionen

`S3_URL`: Hier können Sie Ihre S3-Konfiguration angeben.

  Format / Beispiel:

  ```sh
  https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true
  ```
