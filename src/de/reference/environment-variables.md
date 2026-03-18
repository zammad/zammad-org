---
order: 3
title: Umgebungsvariablen
---

# Umgebungsvariablen

Nachfolgend finden Sie die wichtigsten Umgebungsvariablen mit
Standardwerten, falls vorhanden. Die Variablen für Docker- und paketbasierte
Installationen können in einigen Fällen unterschiedlich sein. In der Spalte
**Beschränkung** finden Sie Icons mit der folgenden Bedeutung:

- Nur für Docker-Installationen verfügbar: ::d::
- Nur für Paketinstallationen verfügbar: ::p::
- Verfügbar für beide Installationsvarianten: kein Icon

::: tip

Wenn Sie eine `.env`-Datei in Docker Compose-Installationen verwenden möchten, können Sie die mitgelieferte `.env.dist`-Datei verwenden und sie
als `.env` kopieren. Auf diese Weise wird sie von Docker Compose automatisch übernommen und bei Aktualisierungen nicht überschrieben.

:::

## Verschiedenes

| Variable            | Beschränkung | Standardwert  | Beschreibung                                                                                                                                                                                                        |
| ------------------- | ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPG_PATH            | ::p::        | nicht gesetzt | Legt den Pfad der GPG-Installation fest. Nur benötigt wenn die PGP-Installation vom Standard abweicht oder Sie verschiedene PGP-Installationen verwenden wollen.                                                    |
| RAILS_LOG_TO_STDOUT | ::p::        | nicht gesetzt | Dies Einstellung kann während einem Update einer Paketinstallation überschrieben werden. Verwenden Sie `enabled` für eine Aktivierung bis zum nächsten Update. Verwenden Sie `true` für eine dauerhaft Aktivierung. |
| ZAMMAD_SAFE_MODE    | ::p::        | nicht gesetzt | Seien Sie vorsichtig beim Ausführen von Befehlen im Safe-Mode in Produktivsystemen. Obwohl dieser Modus eine Rettung für manche Systeme sein kann, hat er auch das Potenzial, Systeme zu beschädigen.               |
| ZAMMAD_BIND_IP      | ::p::        | `127.0.0.1`   | Die IP-Adresse, auf die Ihr Webserver lauscht.                                                                                                                                                                      |
| S3_URL              | ::p::        | nicht gesetzt | Erlaubt es, eine S3 Speicher-Konfiguration zu setzen. Beispiel für einen Wert: `https://key:secret@s3.eu-central-1.amazonaws.com/zammad-storage-bucket?region=eu-central-1&force_path_style=true`                   |

## Zammad

| Variable                                                                  | Begrenzt | Standardwert                                                      | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VERSION                                                                   | ::d::    | Aktuelle stabile Version von Zammad                               | Ermöglicht die Anpassung des Zammad-Image-Tags. Beispiel: `6.3.1-54`. Diese Standardversion kann erhöht werden, wenn Sie Ihren Zammad-Docker-Stack aktualisieren. Weitere Informationen zu dieser Variablen finden Sie in der [Beispiel-Datei](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist).                                                                                                                                                                                                                                                                                                                                                                    |
| AUTOWIZARD_JSON                                                           | ::d::    | nicht gesetzt                                                     | Mit dieser Variablen können Sie die anfänglichen Konfigurationsdaten für Ihre Instanz bereitstellen. Autowizard JSON wird in dieser Dokumentation nicht behandelt, jedoch sollte [diese Beispieldatei](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json) Ihnen weiterhelfen.                                                                                                                                                                                                                                                                                                                                                                                            |
| ZAMMAD_HTTP_TYPE                                                          |          | nicht gesetzt                                                     | Legen Sie den HTTP-Typ für Ihre Instanz fest. Mögliche Werte sind „http“ und „https“.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ZAMMAD_FQDN                                                               |          | nicht gesetzt                                                     | Legen Sie den FQDN für Ihre Instanz fest.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| RAILS_TRUSTED_PROXIES                                                     |          | `127.0.0.1,::1`                                                   | Diese Einstellung ist wichtig für die korrekte Erkennung von Client-IP-Adressen und darauf basierenden Funktionen wie der Ratenbegrenzung. Standardmäßig vertraut Zammad nur Localhost-Proxys. Alle zusätzlichen Proxy-Server müssen hier hinzugefügt werden, entweder über die IP-Adresse (wenn statisch) oder über den Hostnamen. Hostnamen werden beim Start von Zammad aufgelöst, sodass ein Neustart erforderlich ist, wenn sich die IP-Adresse eines Proxy-Servers ändert. Beachten Sie, dass Zammad im Docker-Kontext möglicherweise die IP-Adresse des Netzwerk-Gateways anstelle der tatsächlichen IP-Adresse des Proxy-Servers sieht, wenn dieser in einem anderen Netzwerk platziert ist. |
| ZAMMAD_PROCESS_DELAYED_<br>AI_JOBS_WORKERS                                |          | nicht gesetzt                                                     | Wie viele Instanzen von AI-Workern gleichzeitig ausgeführt werden sollen. AI-Worker bearbeiten die AI-Anfragen von Zammad und holen die Antworten vom konfigurierten AI-Anbieter. Standardmäßig wird ein Worker ausgeführt. Selbst gehostete AI-Benutzer sollten bei der Erhöhung dieser Zahl vorsichtig sein, da Ihr AI-Dienst sonst zusammenbrechen könnte. Für Nutzer von KI-Cloud-Diensten mit einer großen Zammad-Instanz kann es sinnvoll sein, diese Zahl zu erhöhen, um eine gewisse Parallelisierung zu erreichen. Die maximale Anzahl von Arbeitern beträgt `16`.                                                                                                                          |
| ZAMMAD_PROCESS_DELAYED_<br>AI_JOBS_WORKERS_<br>THREADS                    |          | `5`                                                               | Wie viele Threads sollen von **einem** KI-Worker verarbeitet werden (wenn Sie mehr als einen Worker haben, wird dies mit der Anzahl der Worker multipliziert). Dies kann die KI-Verarbeitung beschleunigen, aber beachten Sie, dass ein Ruby-Worker ohnehin nur einen Kern umfassen kann. Die maximale Anzahl von Threads beträgt `16`.                                                                                                                                                                                                                                                                                                                                                              |
| ZAMMAD_PROCESS_DELAYED_<br>COMMUNICATION_INBOUND_<br>JOBS_WORKERS         |          | nicht gesetzt                                                     | Ermöglicht das gleichzeitige Abrufen eingehender Kommunikationskanäle. Nützlich, wenn Sie viele Kanäle und/oder Postfächer hinzugefügt haben. `0` bedeutet, dass es im Hauptprozess ausgeführt wird, `1` bedeutet einen zusätzlichen Prozess usw. Die maximale Anzahl von Arbeitern ist `16`.                                                                                                                                                                                                                                                                                                                                                                                                        |
| ZAMMAD_PROCESS_DELAYED_<br>COMMUNICATION_INBOUND_<br>JOBS_WORKER_THREADS  |          | `1`                                                               | Threads, die zum Abrufen eingehender Kommunikationskanäle verwendet werden. Wie viele Threads sollten von Arbeitern für eingehende Jobs verwendet werden? Die maximale Anzahl an Threads beträgt `16`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| MEMCACHE_SERVERS                                                          |          | - Docker: `zammad-memcached:11211`<br> - Paket: nicht gesetzt     | Stellen Sie Zammad Ihre eigene Memcached-Instanz zur Verfügung, wenn Sie bereits über eine verfügen. Der Fallback für die Paketinstallation ist `/opt/zammad/tmp/cache*`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| REDIS_URL                                                                 |          | - Docker: `redis://zammad-redis:6379`<br> - Paket: nicht gesetzt  | Stellen Sie Ihre eigene Redis-Instanz bereit, wenn Sie bereits über eine verfügen. Der Fallback für die Paketinstallation ist `/opt/zammad/tmp/websocket_*`. Informationen zur Sentinel-Konfiguration finden Sie unter [Redis-Variablen](/en/reference/redis).                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Elasticsearch

| Variable                 | Beschränkung | Standardwert           | Beschreibung                                                                                                                                                                                                                                      |
| ------------------------ | ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ELASTICSEARCH_ENABLED    | ::d::        | `true`                 | Wenn Sie diese Variable auf false setzen, können Sie Ihr Zammad ohne Elasticsearch betreiben. Bitte beachten Sie, dass wir dringend davon abraten, dies zu tun.                                                                                   |
| ELASTICSEARCH_HOST       | ::d::        | `zammad-elasticsearch` | Geben Sie einen Hostnamen oder eine Adresse für Ihre externes Elasticsearch-Cluster an.                                                                                                                                                           |
| ELASTICSEARCH_PORT       | ::d::        | `9200`                 | Geben Sie bei Bedarf einen anderen Port für Elasticsearch an.                                                                                                                                                                                     |
| ELASTICSEARCH_SCHEMA     | ::d::        | `http`                 | Standardmäßig ist Elasticsearch über HTTP erreichbar.                                                                                                                                                                                             |
| ELASTICSEARCH_NAMESPACE  | ::d::        | `zammad`               | Mit diesem Namensraum werden alle Zammad-bezogenen Indizes erstellt. Ändern Sie dies, wenn Sie externe Cluster verwenden.                                                                                                                         |
| ELASTICSEARCH_REINDEX    | ::d::        | nicht gesetzt          | Der Suchindex wird automatisch neu aufgebaut, wenn kein Index gefunden werden kann. Wenn Sie den Suchindex manuell neu aufbauen müssen, setzen Sie diese Variable entweder auf `true` oder führen Sie den Reindex-Befehl über Docker manuell aus. |
| ELASTICSEARCH_SSL_VERIFY | ::d::        | `true`                 | Erlaubt Ihnen, dass die Compose-Skripte bei Bedarf selbstsignierte SSL-Zertifikate für Ihre Elasticsearch-Installation ignorieren.                                                                                                                |
| ELASTICSEARCH_HEAP_SIZE  | ::d::        | `1G`                   | Legt den verfügbaren Speicher für Elasticsearch fest. Wenn Sie Probleme mit ES und seiner Leistung haben, sollten Sie diesen Wert auf eine angemessene Größe erhöhen.                                                                             |

## PostgreSQL

| Variable             | Limited | Default Value       | Description                                                                                                               |
| -------------------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| POSTGRES_HOST        | ::d::   | `zammad-postgresql` | Host name of your PostgreSQL server. Use your own if you already have one.                                                |
| POSTGRES_PORT        | ::d::   | `5432`              | Adjust the Port of your PostgreSQL server.                                                                                |
| POSTGRES_USER        | ::d::   | `zammad`            | The database user for Zammad.                                                                                             |
| POSTGRES_PASS        | ::d::   | `zammad`            | The password of Zammad's database user.                                                                                   |
| POSTGRES_DB          | ::d::   | `zammad_production` | Zammad's database to use.                                                                                                 |
| POSTGRESQL_OPTIONS   | ::d::   | `?pool=50`          | Additional PostgreSQL params to be appended to the database URI.                                                          |
| POSTGRESQL_DB_CREATE | ::d::   | `true`              | By default, Zammad creates the required database. On already existing database servers, the default might be troublesome. |

## Nginx

| Variable                   | Beschränkung | Standardwert         | Beschreibung                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NGINX_EXPOSE_PORT          | ::d::        | `8080`               | Der Port, der für den Zugriff auf den Zammad-Stack von außen freigegeben werden soll. Ändern Sie diesen Wert, wenn Sie bereits einen bestehenden Dienst haben, der auf diesen Port hört.                                                                                                                            |
| NGINX_PORT                 | ::d::        | `8080`               | Der interne Port, an dem der Nginx-Dienst lauschen wird.                                                                                                                                                                                                                                                            |
| NGINX_SERVER_NAME          | ::d::        | `_`                  | Standardmäßig wird der Nginx-Container von Zammad auf alle Anfragen antworten. Sie können Ihre IP / FQDN angeben, wenn Sie das möchten.                                                                                                                                                                             |
| NGINX_SERVER_SCHEME        | ::d::        | `\$scheme`           | Wenn der Nginx-Container für Zammad **nicht** der Upstream-Server ist (d.h. Sie verwenden einen anderen Proxy vor Nginx), kann `$scheme` falsch sein. Sie können das korrekte Schema `http` oder `https` einstellen, falls nötig. Setzen Sie dies, wenn Sie einen `CSRF Token Verification Failed` Fehler erhalten. |
| NGINX_CLIENT_MAX_BODY_SIZE | ::d::        | nicht gesetzt        | Definieren Sie die maximale Größe der Daten, die ein Client an den Server senden kann.                                                                                                                                                                                                                              |
| ZAMMAD_RAILSSERVER_HOST    | ::d::        | `zammad-railsserver` | Hostname des Rails-Server-Containers.                                                                                                                                                                                                                                                                               |
| ZAMMAD_RAILSSERVER_PORT    | ::d::        | `3000`               | Port des Rails-Servers von Zammad.                                                                                                                                                                                                                                                                                  |
| ZAMMAD_RAILS_PORT          | ::p::        | `3000`               | Port des Rails-Servers von Zammad.                                                                                                                                                                                                                                                                                  |
| ZAMMAD_WEBSOCKET_HOST      | ::d::        | `zammad-websocket`   | Hostname des Websocket-Servers von Zammad.                                                                                                                                                                                                                                                                          |
| ZAMMAD_WEBSOCKET_PORT      | ::d::        | `6042`               | Port des Websocket-Servers von Zammad.                                                                                                                                                                                                                                                                              |

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

| Variable                                  | Beschränkung | Standardwert  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------- | ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ZAMMAD_WEB_CONCURRENCY                    |              | nicht gesetzt | Erlaubt das Erstellen von `n` Workern, um mehr gleichzeitige Verbindungen für Zammads Web-UI zu ermöglichen. Falls Sie [Hardware-Begrenzungen für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die CPU-Einstellung des Zammad-Railsservers mit dem Wert dieser Variable übereinstimmen.                                                                                                                                                                                                                                                                                                                        |
| ZAMMAD_PROCESS_SESSION_<br>JOBS_WORKERS   |              | nicht gesetzt | Wie viele Instanzen des Session Workers gleichzeitig laufen sollen. Das Erhöhen dieses Wertes kann Hintergrundaufgaben (wie die Automatisierung) beschleunigen, wenn viele Benutzer gleichzeitig auf Zammad sind. Es ist jedoch nicht sinnvoll, diese Einstellung zu ändern, wenn Sie weniger als 40 gleichzeitig aktive Benutzer haben. Das Erhöhen der Anzahl der Worker kann eine Menge Ressourcen verbrauchen! Falls Sie [Hardware-Begrenzungen für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die CPU-Einstellung des Zammad-Schedulers der Summe aller Variablen der Worker-Einstellungen entsprechen. |
| ZAMMAD_PROCESS_SCHEDULED_<br>JOBS_WORKERS |              | nicht gesetzt | Erlaubt das Erstellen von `1` unabhängigem Worker für geplante Aufgaben, um Zammads Hintergrundworker zu entlasten. Maximale Anzahl von Workern: `1`. Falls Sie [Hardware-Begrenzungen für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die Zammad-Scheduler CPU-Einstellung der Summe aller Worker-Einstellungen entsprechen.                                                                                                                                                                                                                                                                                 |
| ZAMMAD_PROCESS_DELAYED_<br>JOBS_WORKERS   |              | nicht gesetzt | Erlaubt das Erstellen von `n` Delayed-Jobs Workern, um den Druck von Zammads Hintergrundworker zu nehmen. Falls Sie [Hardware-Begrenzungen für Docker](docker-compose-scenarios#ressourcen-begrenzen) angewendet haben, sollte die Zammad-Scheduler CPU-Einstellung der Summe aller Worker-Einstellungen entsprechen.                                                                                                                                                                                                                                                                                                                             |

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
