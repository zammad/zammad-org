---
order: 5
title: 'Docker Compose-Szenarien'
---

# Docker Compose-Szenarien

## Übersicht

Wenn der "vanilla" Zammad Stack Ihren Anwendungsfall nicht abdeckt, können
Sie eines der vordefinierten Szenarien verwenden. Wir empfehlen, die
Compose-Dateien lokal nicht zu ändern, da es dann schwierig sein kann, die
Upstream-Änderungen des Stacks anzuwenden. Aus diesem Grund sollten Sie
entweder die Repository-Build-Methode von Portainer verwenden oder das
Repository klonen und regelmäßig aktualisieren, wenn Sie Docker Compose
verwenden.

Die folgenden Szenarien werden unterstützt und weiter unten erläutert:

- [Den Stack über HTTPS verfügbar
  machen](#stack-uber-https-erreichbar-machen)
  - Hinzufügen eines Cloudflare-Tunnel-Services zum Stack
  - Hinzufügen eines Nginx Proxy Managers (NPM) zum Stack
  - Hinzufügen eines externen Docker-Netzwerks zum Nginx-Container
- [Externe Dienste verwenden](#externe-dienste-verwenden)
  - Elasticsearch-Dienst deaktivieren
- [Dienste extern verfügbar machen](#dienste-extern-verfugbar-machen)
  - Hinzufügen eines externen Docker-Netzwerks zum Elasticsearch-Container
  - Einen Host-Port zu Elasticsearch hinzufügen
- [Zusätzliche Szenarien](#zusatzliche-szenarien)
  - Deaktivieren des Backup-Dienstes
  - Ollama zum Stack hinzufügen
  - LibreTranslate-Instanz hinzufügen
  - Hardware-Ressourcen des Stacks begrenzen

Sie finden die Dateien im [Zammad Docker
Compose-Repository](https://github.com/zammad/zammad-docker-compose){target=_blank}.

## Allgemeine Verwendung

:::: tabs

=== Docker Compose

Um ein Szenario zu verwenden, geben Sie dessen Compose-Datei in der Umgebungsvariablen `COMPOSE_FILE` an. Erstellen Sie entweder eine `.env` Datei oder
kopieren Sie die `.env.dist` Datei im geklonten Repository und benennen Sie sie um. Die Haupt-Compose-Datei muss an erster Stelle angegeben werden,
gefolgt von einem oder mehreren Szenarien, die durch einen Doppelpunkt getrennt sind (`:`). Die Dateien werden in der angegebenen Reihenfolge angewendet. Ersetzen Sie den
Platzhalter in geschweiften Klammern durch den Dateinamen des Szenarios, das Sie verwenden möchten.

**Beispiel mit zwei Szenario-Platzhaltern:**

``` sh
COMPOSE_FILE=docker-compose.yml:scenarios/{Szenario, das Sie verwenden möchten}.yml:scenarios/{ein weiteres Szenario, das Sie verwenden möchten}.yml
```

Nachdem Sie die Szenarien angegeben haben, starten Sie den Stack mit dem Befehl `docker compose up -d`.

::: info

Wenn Sie die `COMPOSE_FILE` Variable verwenden, wird die `docker-compose.override.yml` nicht automatisch berücksichtigt.
Wenn Sie sie verwenden wollen, stellen Sie sicher, dass Sie sie an die Liste der Umgebungsvariablen anhängen.

:::

=== Portainer

Folgen Sie der [allgemeinen Einrichtung](/de/get-started/installation/docker) und nehmen Sie die folgenden Änderungen vor.

Unter dem Feld "Compose path" klicken Sie auf die Schaltfläche `Add file`. Dadurch wird der Abschnitt "Additional paths" geöffnet, in dem Sie
das gewünschte Szenario angeben können. Fügen Sie `scenarios/{Szenario, das Sie verwenden möchten}.yml` hinzu und ersetzen Sie den letzten Teil in
`{}`-Klammern durch den Namen einer der Szenariodateien. Sie können die Szenarien sogar kombinieren, indem Sie zusätzliche Pfade hinzufügen.

![Portainer-Zusatzpfade-Konfiguration](/screenshots/get-started/installation/portainer-additional-paths.png)

::::

## Stack über HTTPS erreichbar machen

Wenn Sie Zammad für den produktiven Einsatz einrichten, muss es durch eine
HTTPS-Verbindung abgesichert werden. Es gibt verschiedene Szenarien, um dies
zu erreichen:

### Cloudflare-Tunnel hinzufügen

Wenn Sie Zammad auf eine sehr bequeme Weise veröffentlichen möchten, können
Sie einen [Cloudflare](https://www.cloudflare.com/){target=_blank}-Tunnel
verwenden.

- Verwenden Sie die Szenariodatei `scenarios/add-cloudflare-tunnel.yml` in
  Ihrem Stack
- Fügen Sie eine Sub-Domain zu einer bereits bestehenden Domain in Ihrem
  Cloudflare-Dashboard hinzu
- Erstellen Sie einen Tunnel für diese Subdomain und konfigurieren Sie ihn
  so, dass er den Datenverkehr an Ihren zammad-nginx-Dienst mit
  `http://zammad-nginx:8080` weiterleitet
- Geben Sie Ihr Cloudflare-Tunnel-Token an den Zammad-Stack weiter, indem
  Sie die Umgebungsvariable `CLOUDFLARE_TUNNEL_TOKEN` verwenden

### Nginx Proxy Manager hinzufügen

Eine sehr verbreitete Variante zur Veröffentlichung von Webdiensten ist die
Verwendung eines Reverse Proxy, der die SSL-Terminierung übernimmt. Ein
gängiges Tool ist der Nginx Proxy Manager (NPM), der über die
Benutzeroberfläche recht einfach konfiguriert werden kann. Wenn Sie noch
keinen Reverse-Proxy haben, könnte dies ein nützliches Szenario für Sie
sein. Wenn Sie bereits einen laufenden Reverse-Proxy haben, springen Sie zum
nächsten Abschnitt.

- Verwenden Sie die Szenariodatei `scenarios/add-nginx-proxy-manager.yml` in
  Ihrem Stack
- Geben Sie Ihren FQDN für Zammad an, indem Sie die Umgebungsvariable
  `ZAMMAD_FQDN` verwenden
- Konfigurieren Sie Ihren DNS. Der gewählte Zammad FQDN sollte auf die
  IP-Adresse des NPM-Hosts zeigen
- Konfigurieren Sie einen neuen Proxy-Host in Ihrem NPM und folgen Sie den
  Schritten, um ein SSL-Zertifikat zu erhalten

### Externes Docker-Netzwerk zu Nginx hinzufügen

Wenn Sie bereits einen Reverse-Proxy haben, der sich um die SSL-Terminierung
kümmert, ist dieses Szenario hilfreich. Es fügt dem in Zammad enthaltenen
Nginx-Dienst ein externes Docker-Netzwerk hinzu, um von einem Reverse-Proxy,
der nicht zum Netzwerk des Zammad-Stacks gehört, darauf zugreifen zu können.

- Verwenden Sie die Szenariodatei
  `scenarios/add-external-network-to-nginx.yml` in Ihrem Stack
- Geben Sie den Namen Ihres externen Netzes mit Hilfe der Umgebungsvariablen
  `ZAMMAD_NGINX_EXTERNAL_NETWORK` an

## Externe Dienste verwenden

### Elasticsearch-Dienst deaktivieren

Sie haben bereits eine Elasticsearch-Instanz laufen und möchten diese auch
für Zammad nutzen? Dann können Sie den Elasticsearch-Dienst im Zammad-Stack
deaktivieren, um Ressourcen zu sparen.

- Verwenden Sie die Szenariodatei
  `scenarios/disable-elasticsearch-service.yml` in Ihrem Stack - dies wird
  den enthaltenen Dienst für Elasticsearch deaktivieren
- Verwenden Sie die folgenden Umgebungsvariablen, um Informationen über die
  Verbindung zu Ihrer bestehenden Elasticsearch-Instanz bereitzustellen:
  - `ELASTICSEARCH_SCHEMA`
  - `ELASTICSEARCH_HOST`
  - `ELASTICSEARCH_PORT`
  - `ELASTICSEARCH_USER`
  - `ELASTICSEARCH_PASS`

## Dienste extern verfügbar machen

Diese Szenarien sind für die Verbindung von externen Anwendungen zu
Zammad-Diensten gedacht. Je nachdem, wo Ihr externer Dienst gehostet wird,
können Sie eines der folgenden Szenarien verwenden.

::: danger

Wenn Sie Elasticsearch außerhalb des Stacks erreichbar machen, stellen Sie sicher, dass Sie die Variable `ELASTICSEARCH_PASS` auf einen eigenen Wert setzen!
Andernfalls haben Sie ein großes Sicherheitsproblem, da der Elasticsearch-Index die meisten der Daten von Zammad enthält.

:::

::: tip

Wenn Sie TLS verwenden möchten, müssen Sie sich über einen Reverse-Proxy mit Elasticsearch verbinden.

:::

### Externes Docker-Netzwerk zum Elasticsearch-Container hinzufügen

Ein häufiger Anwendungsfall hierfür ist die Verwendung eines
Berichts/Visualisierungs-Tools wie Grafana auf demselben Host in einem
anderen Stack.  Da solche Tools auf den Elasticsearch-Index zugreifen
müssen, muss das Netzwerk des anderen Stacks zum Elasticsearch-Container von
Zammad hinzugefügt werden.

- Verwenden Sie die Szenariodatei
  `scenarios/add-external-network-to-elasticsearch.yml` in Ihrem Stack
- Geben Sie den Namen Ihres externen Netzes mit Hilfe der Umgebungsvariablen
  `ZAMMAD_ELASTICSEARCH_EXTERNAL_NETWORK` an

### Einen Host-Port zu Elasticsearch hinzufügen

Wenn Sie den Elasticsearch-Dienst des Zammad-Stacks im Netzwerk verfügbar
machen wollen, können Sie dem Container einen Host-Port zuweisen. Dies ist
nützlich, wenn Sie von einem anderen Host aus auf den
Elasticsearch-Container zugreifen müssen.

- Verwenden Sie die Szenariodatei
  `scenarios/add-hostport-to-elasticsearch.yml` in Ihrem Stack
- Der Standardport für Elasticsearch ist `9200`. Ändern Sie ihn auf einen
  anderen Port, indem Sie die Umgebungsvariable
  `ELASTICSEARCH_EXPOSE_HTTP_PORT` verwenden

## Zusätzliche Szenarien

### Backup-Dienst deaktivieren

Falls Sie Backups auf eine andere Art und Weise handhaben möchten, können
Sie den eingebauten Backup-Dienst im Stack deaktivieren, um Ressourcen zu
sparen.

Sie können dies tun, indem Sie einfach die Szenariodatei
`scenarios/disable-backup-service.yml` in Ihrem Stack verwenden.

### Ollama hinzufügen

Sie können einen zusätzlichen
[Ollama](https://ollama.com/){target=_blank}-Container starten, um die
KI-Funktionen von Zammad auf Ihrem Rechner zu nutzen.

::: info
Dies ist für Entwicklungs- oder Testzwecke gedacht, da der Betrieb eines produktiven LLM-Stacks komplex ist.
:::

Um einen Ollama-Container innerhalb des Zammad Stacks einzusetzen, verwenden
Sie die Szenario-Datei `scenarios/add-ollama.yml`. Dadurch wird ein
Ollama-Container erstellt, der automatisch `Llama3.2` abruft und
bereitstellt, um KI-Funktionen sofort nutzen und testen zu können.

Um ihn in Zammad zu verwenden, fügen Sie den Dienstnamen und den Port
(`http://ollama:11434`) in der Anbieterkonfiguration hinzu.

### LibreTranslate hinzufügen

Sie können einen zusätzlichen
[LibreTranslate](https://libretranslate.com/){target=_blank} Container
ausführen, um die Artikelübersetzung für Zammad auf Ihrer eigenen Hardware
zu betreiben. Weitere Informationen zur Integration finden Sie im Abschnitt
zum übersetzungsdienst in der Admin-Dokumentation.

Um einen LibreTranslate-Container innerhalb des Zammad-Stacks
bereitzustellen, verwenden Sie die Szenariodatei
`scenarios/add-libretranslate.yml`. Der Dienst öffnet keine Ports des Hosts;
Zammad greift innerhalb des Stack-Netzwerks über
`http://libretranslate:5000` darauf zu.

::: tip

Der erste Start dauert eine Weile, da der Container die Sprachmodelle herunterlädt, bevor der Dienst verfügbar ist.
Die Modelle werden in einem Docker-Volume gespeichert, so dass sie Stack-Neustarts überleben.

:::

Das Szenario unterstützt die folgenden Umgebungsvariablen:

LT_LOAD_ONLY
: Kommagetrennte Liste der zu ladenden Sprachen, z.B. `en,de,fr`. Ist dies nicht gesetzt, werden alle Sprachmodelle heruntergeladen, was
  bei einem ersten Start mehrere Minuten dauern kann.

LT_UPDATE_MODELS
: Setzen Sie den Wert auf `true`, um bei jedem Start des Stacks nach aktualisierten Sprachmodellen zu suchen. Es werden nur Modelle mit einer neueren verfügbaren
  Version erneut heruntergeladen. Ohne diese Einstellung werden die Modelle nur beim ersten Start heruntergeladen.

LT_API_KEYS
: Setzen Sie den Wert auf `true`, um die Unterstützung von API-Schlüsseln zu aktivieren. Jeder Schlüssel verfügt über eine eigene Obergrenze für zulässige Anfragen pro Minute. Um einen Schlüssel zu erstellen,
  starten Sie den Dienst und führen Sie folgenden Befehl aus:

  ``` sh
  docker compose exec libretranslate ltmanage keys add 120
  ```

  Die Zahl gibt die zulässige Anzahl von Anfragen pro Minute für diesen Schlüssel an. Der Befehl gibt den generierten Schlüssel aus, bei dem es sich um eine UUID handelt,
  die von LibreTranslate selbst erstellt wurde. Sie können stattdessen auch Ihren eigenen Schlüssel mit der Option `--key` angeben.

LT_REQUIRE_API_KEY_SECRET
: Setzen Sie den Wert auf `true`, um API-Schlüssel für alle Anfragen verpflichtend zu machen. Erfordert
 ` LT_API_KEYS=true`.

::: info

LibreTranslate unterstützt zahlreiche weitere Optionen. Diese werden in der
[offiziellen Dokumentation](https://docs.libretranslate.com/){target=_blank} beschrieben, in der auch die Umgebungsvariablen aufgeführt sind,
die der Container akzeptiert.

:::

Sobald der Stack eingerichtet ist und gestartet wurde, konfigurieren Sie den Dienst in den Admin-Einstellungen von Zammad (_System > Integrationen > Translation services_):
Geben Sie als URL `http://libretranslate:5000` an und geben Sie einen API-Schlüssel an, falls Ihre Instanz einen solchen erfordert.

### Ressourcen begrenzen

Wenn Sie die Hardwareressourcen, die der Zammad Stack verwenden darf,
einschränken möchten, verwenden Sie das Szenario
`scenarios/apply-resource-limits.yml`. Es werden dann Standardwerte für die
CPU- und Arbeitsspeichernutzung für jeden Container im Stack angewendet. Sie
können diese Standardwerte in der Datei `.env.dist` finden. Passen Sie die
gewünschten Variablen an und starten Sie den Stack.

### Andere Anwendungsfälle

Ihr Szenario ist noch nicht dabei? Schlagen Sie uns doch einfach Ihren
Anwendungsfall vor. Wir planen, den Stack in Zukunft um weitere gängige
Anwendungsfälle zu erweitern.

## Lokale Anpassung des Stacks

Der Standard-Stack eignet sich für die meisten Umgebungen, doch manchmal
müssen Sie ihn anpassen: einen weiteren Dienst hinzufügen, Einstellungen
ändern oder eigene Dateien verwenden. Unabhängig davon, was bei Ihnen
zutrifft, ändern Sie bitte nicht die Datei `docker-compose.yml` selbst. Wenn
Sie Ihre Änderungen in separaten Dateien speichern, können Sie mit `git
pull` den Stack ohne Konflikte aktualisieren.

Wie Sie dabei vorgehen, hängt davon ab, was Sie erreichen möchten:

### Einstellungen der bestehenden Dienste ändern

Manchmal ist es notwendig, lokale Änderungen am Zammad-Docker-Stack
vorzunehmen, z.B. um zusätzliche Dienste einzubinden. Wenn Sie dies planen,
empfehlen wir Ihnen, die Datei `docker-compose.yml` nicht zu ändern, sondern
eine lokale `docker-compose.override.yml` zu erstellen, die alle Ihre
Änderungen enthält. Docker Compose wird [diese Datei automatisch laden und
ihre Änderungen auf den Stack
anwenden](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/){target=_blank}.
Das Repository enthält eine inaktive Beispieldatei, die Sie kopieren und
anpassen können:

``` sh
cp docker-compose.override.yml.dist docker-compose.override.yml
```

Das Laden von Szenarien wird hier nicht unterstützt. Um ein Szenario zu
laden, verwenden Sie die Variable `COMPOSE_FILE` in Ihrer `.env` Datei, wie
im obigen Abschnitt [Allgemeine Verwendung](#general-usage) beschrieben.

### Eigene Dateien hinzufügen

Bei Verwendung von Docker Compose und dem Klonen des Repository können Sie
trotzdem eigene Dateien speichern, und zwar im `local/` Verzeichnis des
Stacks, z.B. Konfigurationsanpassungen, benutzerdefinierte Szenariodateien,
Skripte, Notizen oder Zertifikate. Git ignoriert den Inhalt des
Verzeichnisses, mit Ausnahme von README.md, sodass `git pull` diese Dateien
weder verfolgt noch überschreibt.

Dateien unter `local/` werden nicht automatisch geladen. Um eine
benutzerdefinierte Compose-Datei zu verwenden, verweisen Sie in Ihrer
.env-Datei über die Option `COMPOSE_FILE` auf diese Datei, beispielsweise
mit einem Pfad wie `./local/my-file`. Beachten Sie, dass die Verwendung der
Variable `COMPOSE_FILE` die automatische Berücksichtigung der Override-Datei
deaktiviert; siehe dazu [Allgemeine Verwendung](#general-usage) weiter
oben. Docker Compose löst relative Pfade relativ zum Verzeichnis auf, das
die Haupt-Compose-Datei enthält, einschließlich der Pfade, die von
benutzerdefinierten Szenariodateien in `local/` verwendet werden.
