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

| Variable                                               | Limited | Default Value                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------ | ------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VERSION                                                | ::d::   | current stable version of Zammad    | Allows customization of the Zammad image tag. Example: `6.3.1-54`. This default version may be increased when you update your Zammad Docker stack. Please see the [example env template](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist)_for more details on this variable.                                                                                                                                                                                                                                                                                |
| AUTOWIZARD_JSON                                        | ::d::   | unset                               | This variable allows you to provide initial configuration data for your instance. Autowizard JSON is out of scope of this documentation, however [this example file](https://github.com/zammad/zammad/blob/stable/contrib/auto_wizard_example.json) should help.                                                                                                                                                                                                                                                                                                                  |
| ZAMMAD_HTTP_TYPE                                       |         | unset                               | Set the http type for your instance. Possible values are `http` and `https`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ZAMMAD_FQDN                                            |         | unset                               | Set the FQDN for your instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| RAILS_TRUSTED_PROXIES                                  |         | `127.0.0.1,::1`                     | This setting is important for the correct detection of client IP addresses and features based on it, like rate limiting. By default, Zammad trusts localhost proxies only. Any additional proxy servers will have to be added here, by IP address (if static) or by host name. Host names are resolved during the start of Zammad, so that a restart is required whenever the IP address of a proxy server changes. Note that in Docker context, Zammad may see the network gateway IP address instead of the actual proxy server IP address, if it is placed in another network. |
| ZAMMAD_PROCESS_DELAYED_<br>AI_JOBS_WORKERS             |         | unset                               | How many instances of AI workers to run simultaneously. AI workers handle Zammad's AI requests and fetch the responses from the configured AI provider. By default, one worker is running. Self hosted AI users should be careful in increasing it, your AI service might collapse. For AI cloud service users with a big Zammad instance, it could make sense to increase it to have some kind of parallelization. The maximum number of workers is `16`.                                                                                                                        |
| ZAMMAD_PROCESS_DELAYED_<br>AI_JOBS_WORKERS_<br>THREADS |         | `5`                                 | How many threads should be processed by **one** AI worker (if you have more than one worker, it is multiplied by the amount of workers). This may speed up the AI processing, but be aware that a Ruby worker can only span across 1 core anyway. The maximum number of threads is `16`.                                                                                                                                                                                                                                                                                          |
| MEMCACHE_SERVERS                                       |         | - Docker: `zammad-memcached:11211`<br> - Package: unset   | Provide your own Memcached instance to Zammad if you already have one. The package installation fallback is `/opt/zammad/tmp/cache*`.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| REDIS_URL                                              |         | - Docker: `redis://zammad-redis:6379`<br> - Package: unset | Provide your own Redis instance if you already have one. The package installation fallback is `/opt/zammad/tmp/websocket_*`. See [Redis Variables](/en/reference/redis) for a Sentinel setup.                                                                                                                                                                                                                                                                                                                                                              |

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

| Variable             | Beschränkung | Standardwert        | Beschreibung                                                                                                                                      |
| -------------------- | ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| POSTGRESQL_HOST      | ::d::        | `zammad-postgresql` | Hostname Ihres PostgreSQL-Servers. Verwenden Sie Ihren eigenen, wenn Sie bereits einen haben.                                                     |
| POSTGRESQL_PORT      | ::d::        | `5432`              | Stellen Sie den Port Ihres PostgreSQL-Servers ein.                                                                                                |
| POSTGRESQL_USER      | ::d::        | `zammad`            | Der Datenbank Benutzer für Zammad.                                                                                                                |
| POSTGRESQL_PASS      | ::d::        | `zammad`            | Das Passwort des Datenbank-Benutzers von Zammad.                                                                                                  |
| POSTGRESQL_DB        | ::d::        | `zammad_production` | Zammads zu verwendende Datenbank.                                                                                                                 |
| POSTGRESQL_OPTIONS   | ::d::        | `?pool=50`          | Zusätzliche PostgreSQL-Parameter, die an den Datenbank-URI angehängt werden.                                                                      |
| POSTGRESQL_DB_CREATE | ::d::        | `true`              | Standardmäßig erstellt Zammad die erforderliche Datenbank. Auf bereits existierenden Datenbankservern kann die Voreinstellung problematisch sein. |

## Nginx

| Variable                   | Beschränkung | Standardwert         | Beschreibung                                                                                                                                                                                                                      |
| -------------------------- | ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NGINX_EXPOSE_PORT          | ::d::        | `8080`               | Der Port, der für den Zugriff auf den Zammad-Stack von außen freigegeben werden soll. Ändern Sie diesen Wert, wenn Sie bereits einen bestehenden Dienst haben, der auf diesen Port hört.                                          |
| NGINX_PORT                 | ::d::        | `8080`               | Der interne Port, an dem der Nginx-Dienst lauschen wird.                                                                                                                                                                          |
| NGINX_SERVER_NAME          | ::d::        | `_`                  | Standardmäßig wird der Nginx-Container von Zammad auf alle Anfragen antworten. Sie können Ihre IP / FQDN angeben, wenn Sie das möchten.                                                                                           |
| NGINX_SERVER_SCHEME        | ::d::        | `\$scheme`           | Wenn der Nginx-Container für Zammad **nicht** der Upstream-Server ist (d.h. Sie verwenden einen anderen Proxy vor Nginx), kann `$scheme` falsch sein. Sie können das korrekte Schema `http` oder `https` einstellen, falls nötig. |
| NGINX_CLIENT_MAX_BODY_SIZE | ::d::        | nicht gesetzt        | Definieren Sie die maximale Größe der Daten, die ein Client an den Server senden kann.                                                                                                                                            |
| ZAMMAD_RAILSSERVER_HOST    | ::d::        | `zammad-railsserver` | Hostname des Rails-Server-Containers.                                                                                                                                                                                             |
| ZAMMAD_RAILSSERVER_PORT    | ::d::        | `3000`               | Port des Rails-Servers von Zammad.                                                                                                                                                                                                |
| ZAMMAD_RAILS_PORT          | ::p::        | `3000`               | Port des Rails-Servers von Zammad.                                                                                                                                                                                                |
| ZAMMAD_WEBSOCKET_HOST      | ::d::        | `zammad-websocket`   | Hostname des Websocket-Servers von Zammad.                                                                                                                                                                                        |
| ZAMMAD_WEBSOCKET_PORT      | ::d::        | `6042`               | Port des Websocket-Servers von Zammad.                                                                                                                                                                                            |

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
