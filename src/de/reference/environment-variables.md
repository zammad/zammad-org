---
order: 3
title: Umgebungsvariablen
---

# Umgebungsvariablen

Unten finden Sie die wichtigsten Umgebungsvariablen mit Standardwerten (als <Badge type="tip" text="badge" />), falls zutreffend.
Die Variablen für Docker- und Paketinstallationen können in einigen Fällen unterschiedlich sein. Sie können dazu ein weiteres
Badge an Variablennamen finden, das die folgende Bedeutung hat:

- Nur für Docker-Installationen verfügbar: ::d::
- Nur für Paketinstallationen verfügbar: ::p::
- Verfügbar für beide Installationsvarianten: kein Icon

::: tip

Wenn Sie eine `.env`-Datei in Docker Compose-Installationen verwenden möchten, können Sie die mitgelieferte `.env.dist`-Datei verwenden und sie
als `.env` kopieren. Auf diese Weise wird sie von Docker Compose automatisch übernommen und bei Aktualisierungen nicht überschrieben.

:::

## Verschiedenes

`GPG_PATH` ::p::
: Legen Sie den Pfad zu Ihrer GPG-Installation fest. Nur erforderlich, wenn Sie unterschiedliche Versionen von PGP verwenden möchten
  oder Ihre PGP-Installation von der Standardinstallation abweicht.

`RAILS_LOG_TO_STDOUT` ::p::
: Diese Einstellung kann während einer Aktualisierung bei Paketinstallationen überschrieben werden. Verwenden Sie `enabled`,
  um diese Option nur bis zur nächsten Aktualisierung zu aktivieren. Verwenden Sie `true`, um sie dauerhaft zu aktivieren.

`ZAMMAD_SAFE_MODE` ::p::
: Vorsicht beim Ausführen von Zammad-Befehlen im Safe-Mode. Obwohl dieser möglicherweise einen Ausweg für bestimmte
  Befehle bietet, kann die normale Ausführung von Zammad beeinträchtigt werden.

`ZAMMAD_BIND_IP` ::p:: <Badge type="tip" text="127.0.0.1" />
: Die IP-Adresse, an die der Webserver gebunden ist.

`S3_URL` ::p::
: Ermöglicht Ihnen die Angabe Ihrer S3-Speicheranbieter-Konfiguration. Beispiel für einen Wert:
  `https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true`

## Zammad

`VERSION` ::d:: <Badge type="tip" text="aktuelle stabile Version von Zammad" />
: Ermöglicht die Anpassung des Image-Tags. Beispiel: `6.3.1-54`. Diese Standardversion kann erhöht werden,
  wenn Sie Ihren Zammad-Docker-Stack aktualisieren. Weitere Informationen zu der Variablen finden Sie in der
  [Beispiel-env-Datei](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist).

`AUTOWIZARD_JSON` ::d::
: Diese Variable ermöglicht es Ihnen, eine initiale Konfiguration für Ihre Instanz bereitzustellen. Autowizard JSON ist
  nicht Bestandteil dieser Dokumentation, Sie können jedoch einen Blick in die
  [Beispiel-Datei](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json) werfen.

`ZAMMAD_HTTP_TYPE`
: Legen Sie den HTTP-Typ für Ihre Instanz fest. Mögliche Werte sind `http`
und `https`.

`ZAMMAD_FQDN`: Legen Sie den FQDN für Ihre Instanz fest.

`RAILS_TRUSTED_PROXIES` <Badge type="tip" text="127.0.0.1,::1" />
: Diese Einstellung ist wichtig für die korrekte Erkennung von Client-IP-Adressen und Funktionen, die darauf basieren,
  wie z.B. Rate-Limiting.

  Standardmäßig vertraut Zammad nur localhost-Proxys. Zusätzliche Proxyserver müssen hier hinzugefügt werden,
  entweder per IP-Adresse (wenn statisch) oder mit Hostnamen. Hostnamen werden beim Start von Zammad aufgelöst, sodass ein
  Neustart erforderlich ist, wenn sich die IP-Adresse eines Proxyservers ändert.

  Beachten Sie, dass Zammad im Docker-Kontext die IP-Adresse des Netzwerk-Gateways anstelle der tatsächlichen
  IP-Adresse des Proxyservers sehen kann, wenn es sich in einem anderen Netzwerk befindet.

`ZAMMAD_MANAGE_SESSIONS_JOBS_WORKERS` <Badge type="tip" text="0" />
: Ermöglicht das Abspalten des Jobs, der die Session-Jobs an die Worker verteilt, in einen Kindprozess. Erlaubter Wert
  zur Aktivierung: `1`.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS` <Badge type="tip" text="0" />
: Ein solcher Worker bearbeitet Zammads KI-Anfragen und holt die Antworten vom konfigurierten KI-Anbieter ab. Diese Variable
  erlaubt Ihnen, die Anzahl der gleichzeitig ausgeführten Worker anzugeben. `0` bedeutet, dass ein Thread im Hauptprozess verwendet wird, `1`
  bedeutet, dass ein separater Worker gestartet wird usw. Die maximale Anzahl von Workern beträgt `16`. Siehe auch
  `ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS`.

  Selbst hostende KI-Nutzer sollten bei der Erhöhung vorsichtig sein, da ihr KI-Dienst zusammenbrechen könnte.
  Für KI-Cloud-Dienst-Nutzer mit einer großen Zammad-Instanz kann eine Erhöhung sinnvoll sein, um eine Art Parallelisierung zu erreichen.

`ZAMMAD_PROCESS_DELAYED_AI_JOBS_WORKERS_THREADS` <Badge type="tip" text="5" />
: Wie viele Threads von einem **einzelnen** KI-Worker verarbeitet werden sollen (falls Sie mehrere Worker-Prozesse ausführen, wird diese Zahl multipliziert).
  Dies kann die KI-Verarbeitung beschleunigen, aber beachten Sie, dass ein Ruby-Worker ohnehin nicht mehr als einen Kern nutzen kann.
  Die maximale Anzahl an Threads beträgt `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKER` <Badge type="tip" text="0" />
: Ermöglicht das gleichzeitige Abrufen eingehender Kommunikationskanäle. Nützlich, wenn Sie viele Kanäle und/oder Postfächer hinzugefügt haben.
  `0` bedeutet, dass ein Thread im Hauptprozess verwendet wird, `1` bedeutet, dass ein separater Worker gestartet wird usw. Die maximale Anzahl an
  Workern beträgt `16`.

`ZAMMAD_PROCESS_DELAYED_COMMUNICATION_INBOUND_JOBS_WORKER_THREADS` <Badge type="tip" text="1" />
: Threads, die zum Abrufen eingehender Kommunikationskanäle verwendet werden. Wie viele Threads sollen von einem **einzelnen** Inbound-Jobs-Worker
  verarbeitet werden (falls Sie mehrere Worker-Prozesse ausführen, wird dies multipliziert). Die maximale Anzahl an Threads beträgt `16`.

`MEMCACHE_SERVERS` <Badge type="tip" text="Docker: zammad-memcached:11211" /> <Badge type="tip" text="Package: nicht gesetzt" />
: Stellen Sie Ihrem eigenen Memcached-Dienst zur Verfügung, falls Sie bereits einen haben. Der Fallback bei Paketinstallationen ist
  `/opt/zammad/tmp/cache*`.

`REDIS_URL` <Badge type="tip" text="Docker: redis://zammad-redis:6379" /> <Badge type="tip" text="Package: nicht gesetzt" />
: Geben Sie Ihre eigene Redis-Instanz an, falls Sie bereits eine haben. Der Fallback bei Paketinstallationen ist
  `/opt/zammad/tmp/websocket_*`. Informationen zur Sentinel-Konfiguration finden Sie unter [Redis-Variablen](/de/reference/redis).

## Elasticsearch

`ELASTICSEARCH_ENABLED` ::d:: <Badge type="tip" text="true" />
: Das Setzen dieser Variablen auf `false` ermöglicht es Ihnen, Zammad ohne Elasticsearch zu betreiben. Bitte beachten Sie,
  dass wir **dringend davon abraten**.

`ELASTICSEARCH_HOST` ::d:: <Badge type="tip" text="zammad-elasticsearch" />
: Geben Sie einen Hostnamen oder eine Adresse Ihres externen Elasticsearch-Clusters an.

`ELASTICSEARCH_PORT` ::d:: <Badge type="tip" text="9200" />
: Geben Sie einen anderen Port für Elasticsearch an, falls notwendig.

`ELASTICSEARCH_SCHEMA` ::d:: <Badge type="tip" text="http" />
: Ändern Sie es in `https`, falls Ihr Elasticsearch-Cluster für die Verwendung mit SSL konfiguriert ist.

`ELASTICSEARCH_NAMESPACE` ::d:: <Badge type="tip" text="zammad" />
: Mit diesem Namensraum werden alle Zammad-bezogenen Indizes erstellt. Ändern Sie dies, wenn Sie externe Cluster verwenden.

`ELASTICSEARCH_REINDEX` ::d::
: Der Suchindex wird automatisch neu aufgebaut, wenn kein Index gefunden werden kann. Wenn Sie den Suchindex
  manuell neu aufbauen müssen, setzen Sie diese Variable auf `true` oder führen Sie den Reindex-Befehl manuell per Docker aus.

`ELASTICSEARCH_SSL_VERIFY` ::d:: <Badge type="tip" text="true" />
: Ermöglicht, dass selbst signierte Zertifikate durch die Compose-Skripte ignoriert werden,
  falls erforderlich.

`ELASTICSEARCH_HEAP_SIZE` ::d:: <Badge type="tip" text="1G" />
: Legen Sie die verfügbare Speichermenge für Elasticsearch fest. Wenn Sie Probleme mit ES und dessen Leistung haben,
  sollten Sie diesen Wert auf eine angemessene Größe erhöhen.

## PostgreSQL

:::tip
Variablen für Docker- und Paketinstallationen sind teilweise unterschiedlich. Überprüfen Sie die entsprechende Kennzeichnung und stellen Sie sicher,
dass Sie die richtige auswählen. Beide Variablen am Ende dieses Bereichs sind für beide Installationstypen gültig.
:::

`POSTGRESQL_HOST` ::p:: <Badge type="tip" text="zammad-postgresql" />
: Hostname oder IP-Adresse Ihres PostgreSQL-Servers. Falls Sie eine IPv6-Adresse verwenden, setzen Sie diese in
  eckige Klammern (z.B. `[2001:db8::2]`).

`POSTGRESQL_PORT` ::p:: <Badge type="tip" text="5432" />
: Passen Sie den Port Ihres PostgreSQL-Servers an.

`POSTGRESQL_USER` ::p:: <Badge type="tip" text="zammad" />
: Der Datenbankbenutzer für Zammad.

`POSTGRESQL_PASS` ::p:: <Badge type="tip" text="zammad" />
: Das Passwort des Zammad-Datenbankbenutzers.

`POSTGRESQL_DB` ::p:: <Badge type="tip" text="zammad_production" />
: Die von Zammad verwendete Datenbank.

`POSTGRES_HOST` ::d:: <Badge type="tip" text="zammad-postgresql" />
: Hostname oder IP-Adresse Ihres PostgreSQL-Servers. Verwenden Sie im Falle einer IPv6-Adresse
  eckige Klammern (z. B. `[2001:db8::2]`).

`POSTGRES_PORT` ::d:: <Badge type="tip" text="5432" />
: Passen Sie den Port Ihres PostgreSQL-Servers an.

`POSTGRES_USER` ::d:: <Badge type="tip" text="zammad" />
: Der Datenbankbenutzer für Zammad.

`POSTGRES_PASS` ::d:: <Badge type="tip" text="zammad" />
: Das Passwort des Zammad-Datenbankbenutzers.

`POSTGRES_DB` ::d:: <Badge type="tip" text="zammad_production" />
: Die von Zammad zu verwendende Datenbank.

`POSTGRESQL_OPTIONS` <Badge type="tip" text="?pool=50" />
: Zusätzliche PostgreSQL-Parameter, die der Datenbank-URI angehängt werden.

`POSTGRESQL_DB_CREATE` <Badge type="tip" text="true" />
: Standardmäßig erstellt Zammad die benötigte Datenbank. Auf bereits existierenden Datenbankservern kann dies jedoch
  problematisch sein.

## Nginx

`NGINX_EXPOSE_PORT` ::d:: <Badge type="tip" text="8080" />
: Der Port, der für den Zugriff auf den Zammad-Stack von außen freigegeben wird. Ändern Sie diesen Wert, wenn bereits
  ein Dienst auf diesem Port läuft.

`NGINX_PORT` ::d:: <Badge type="tip" text="8080" />
: Der interne Port, auf dem der Nginx-Dienst lauscht.

`NGINX_SERVER_NAME` ::d:: <Badge type="tip" text="_" />
: Standardmäßig antwortet der Nginx-Container von Zammad auf alle Anfragen. Sie können Ihre IP / FQDN angeben, wenn Sie möchten.

`NGINX_SERVER_SCHEME` ::d:: <Badge type="tip" text="\$scheme" />
: Wenn der Nginx-Container für Zammad **nicht** der vorgelagerte Server ist (d.h. Sie verwenden einen anderen Proxy vor Nginx),
  könnte `$scheme` falsch sein. Sie können das korrekte Schema `http` oder `https` festlegen, falls erforderlich. Setzen Sie dies, wenn Sie eine
  `CSRF Token Verification Failed` Fehlermeldung erhalten.

`NGINX_CLIENT_MAX_BODY_SIZE` ::d::
 : Definieren Sie die maximale Größe der Daten, die ein Client an den Server
senden kann.

`ZAMMAD_RAILSSERVER_HOST` ::d:: <Badge type="tip" text="zammad-railsserver" />
: Hostname des Rails-Server-Containers.

`ZAMMAD_RAILSSERVER_PORT` ::d:: <Badge type="tip" text="3000" />
: Port des Zammad Rails-Servers.

`ZAMMAD_RAILS_PORT` ::p:: <Badge type="tip" text="3000" />
: Port des Zammad Rails-Servers.

`ZAMMAD_WEBSOCKET_HOST` ::d:: <Badge type="tip" text="zammad-websocket" />
: Hostname des Zammad-Websocket-Servers.

`ZAMMAD_WEBSOCKET_PORT` ::d:: <Badge type="tip" text="6042" />
: Port des Websocket-Servers von Zammad.

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
: Ermöglicht das Starten von `n` Workern, um mehr gleichzeitige Verbindungen für Zammads Web-Oberfläche zu ermöglichen. Falls Sie
  [Ressourcenbegrenzung für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die CPU-Einstellung des zammad-railsservers
  dem Wert dieser Variablen entsprechen.

`ZAMMAD_PROCESS_SESSION_JOBS_WORKERS`
: Wie viele Prozesse des Session-Workers gleichzeitig ausgeführt werden sollen. Das Erhöhen dieses Wertes kann
  Hintergrundaufgaben (wie die Automatisierung) beschleunigen, wenn viele Benutzer gleichzeitig Zammad nutzen. Es ist jedoch nicht sinnvoll,
  diese Einstellung anzupassen, wenn Sie weniger als 40 aktive Benutzer gleichzeitig haben. Das Erhöhen der Anzahl dieser Prozesse kann viele Ressourcen verbrauchen!

  Falls Sie [Ressourcenbegrenzung für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die
  CPU-Einstellung von zammad-scheduler mit der Summe aller Worker-Variablen übereinstimmen.

`ZAMMAD_PROCESS_SCHEDULED_JOBS_WORKER`
: Ermöglicht das Starten von `1` unabhängigem Aufgaben-Worker für geplante Jobs, um den Background-Worker zu entlasten.
  Maximale Anzahl an Workern: `1`.

  Falls Sie [Ressourcenbegrenzung für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die
  CPU-Einstellung von zammad-scheduler mit der Summe aller Worker-Variablen übereinstimmen.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKERS`
: Ermöglicht das Starten von `n` Worker-Prozessen zur Entlastung des Hintergrund-Workers von Zammad. `0` bedeutet,
  dass ein Thread im Hauptprozess verwendet wird, `1` bedeutet, dass ein separater Worker gestartet wird usw.
  Die maximale Anzahl von Workern beträgt `16`.

  Falls Sie [Ressourcenbegrenzung für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die
  CPU-Einstellung von zammad-scheduler mit der Summe aller Worker-Variablen übereinstimmen.

`ZAMMAD_PROCESS_DELAYED_JOBS_WORKER_THREADS`
: Threads, die von **einem** "Delayed Jobs Worker" verwendet werden (falls Sie mehr als einen Worker-Prozess haben,
  wird dies mit deren Anzahl multipliziert). Die maximale Anzahl von Threads beträgt `16`.

## HTTP Client Einstellungen

Globale HTTP-Timeout-Einstellungen. Diese Variablen steuern das
Standard-Timeout-Verhalten für den internen HTTP-Client von Zammad bei der
Verbindung mit externen Diensten (z.B. OAuth-Anbietern, Webhooks oder
Integrationen).

`ZAMMAD_HTTP_OPEN_TIMEOUT` <Badge type="tip" text="30" />
: Legt die maximale Zeit in Sekunden fest, die gewartet wird, bis eine Verbindung
  zu einem externen Server hergestellt wird (z.B. falls Sie eine langsame Verbindung haben).

`ZAMMAD_HTTP_READ_TIMEOUT` <Badge type="tip" text="60" />
: Legt die maximale Zeit in Sekunden fest, die nach dem Aufbau einer Verbindung auf eine Antwort gewartet wird
   (z.B. falls Sie eine langsame Verbindung oder langsame Antwortzeiten auf externer Seite haben).

`ZAMMAD_HTTP_TOTAL_TIMEOUT` <Badge type="tip" text="60" />
: Definiert die maximale Gesamtzeit in Sekunden für die komplette HTTP-Anfrage, einschließlich Verbindungsaufbau und
  Lesen der Antwort. Dies ist eine zusätzliche harte Obergrenze zusätzlich zu `ZAMMAD_HTTP_OPEN_TIMEOUT` und
 `ZAMMAD_HTTP_READ_TIMEOUT`.

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
