---
order: 2
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
  - Hardware-Ressourcen des Stacks begrenzen

Sie finden die Dateien im
[Zammad-Docker-Compose-Repository](https://github.com/zammad/zammad-docker-compose){target=_blank}.

## Allgemeine Verwendung

::: tabs

=== Portainer

Follow the [general deployment guide](/en/get-started/installation/docker) and apply the following changes.

Below the "Compose path" field, click on the `Add file` button. This opens the "Additional paths" section where you
can specify the scenario you want to use. Add `scenarios/{scenario you want to use}.yml` and replace the last part in
`{}` brackets with the name of one of the scenario files. You can even combine the scenarios by adding additional paths.

![Portainer additional paths configuration](/screenshots/installation/portainer-additional-paths.png)

=== Docker Compose

Follow the first 2 steps of the [general deployment guide](/en/get-started/installation/docker). To start the stack with
one or more additional scenarios, use the following command for step 3 in the cloned repository folder instead:

``` sh
docker compose -f docker-compose.yml -f scenarios/{scenario you want to use}.yml up -d
```

Replace the part in `{}` brackets with the file name of one of the scenario files. You can even combine the scenarios
by adding additional files according to the example above.

:::

## Stack über HTTPS erreichbar machen

Wenn Sie Zammad für den produktiven Einsatz einrichten, muss es durch eine
HTTPS-Verbindung abgesichert werden. Es gibt verschiedene Szenarien, um dies
zu erreichen:

### Cloudflare-Tunnel hinzufügen

Wenn Sie Zammad auf eine sehr bequeme Weise veröffentlichen möchten, können
Sie einen [Cloudflare](https://www.cloudflare.com/)-Tunnel verwenden.

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
  "ZAMMAD_NGINX_EXTERNAL_NETWORK" an

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

### Externes Docker-Netzwerk zu Elasticsearch hinzufügen

Ein häufiger Anwendungsfall hierfür ist die Verwendung eines
Berichts/Visualisierungs-Tools wie Grafana auf demselben Host in einem
anderen Stack.  Da solche Tools auf den Elasticsearch-Index zugreifen
müssen, muss das Netzwerk des anderen Stacks zum Elasticsearch-Container von
Zammad hinzugefügt werden.

- Verwenden Sie die Szenariodatei
  `scenarios/add-external-network-to-elasticsearch.yml` in Ihrem Stack
- Geben Sie den Namen Ihres externen Netzes mit Hilfe der Umgebungsvariablen
  `ZAMMAD_ELASTICSEARCH_EXTERNAL_NETWORK` an

### Host-Port zu Elasticsearch hinzufügen

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

Sie können einen zusätzlichen [Ollama](https://ollama.com/)-Container
starten, um die KI-Funktionen von Zammad auf Ihrem Rechner zu nutzen.

::: info
Dies ist für Entwicklungs- oder Testzwecke gedacht, da der Betrieb eines produktiven LLM-Stacks komplex ist.
:::

To deploy an Ollama container inside the Zammad stack, use the scenario file
`scenarios/add-ollama.yml`. This creates an Ollama container which
automatically pulls and serves `Llama3.2` to be ready to use/test AI
features out of the box.

Um ihn in Zammad zu verwenden, fügen Sie den Dienstnamen und den Port
(`http://ollama:11434`) in der Anbieterkonfiguration hinzu.

### Ressourcen begrenzen

If you want to limit the hardware resources the Zammad stack is allowed to
use, use the `scenarios/apply-resource-limits.yml` scenario. Default values
for CPU and memory usage for each container in the stack are applied
then. You can find these default values in the `.env.dist` file. Provide the
changed variables you want to use as environment variables and deploy the
stack.

### Andere Anwendungsfälle

Ihr Szenario ist noch nicht dabei? Schlagen Sie uns doch einfach Ihren
Anwendungsfall vor. Wir planen, den Stack in Zukunft um weitere gängige
Anwendungsfälle zu erweitern.

## Lokale Anpassung des Stacks

Manchmal ist es notwendig, lokale Änderungen am Zammad-Docker-Stack
vorzunehmen, z.B. um zusätzliche Dienste einzubinden. Wenn Sie dies planen,
empfehlen wir Ihnen, die Datei `docker-compose.yml` nicht zu ändern, sondern
eine lokale `docker-compose.override.yml` zu erstellen, die alle Ihre
Änderungen enthält. Docker-Compose wird [diese Datei automatisch laden und
ihre Änderungen am Stack
anwenden](https://docs.docker.com/compose/multiple-compose-files/merge/){target=_blank}.
