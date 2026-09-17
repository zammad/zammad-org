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
  - Hardware-Ressourcen des Stacks begrenzen

Sie finden die Dateien im [Zammad Docker
Compose-Repository](https://github.com/zammad/zammad-docker-compose){target=_blank}.

## Allgemeine Verwendung

:::: tabs

=== Docker Compose

To use a scenario, list its compose file in the `COMPOSE_FILE` environment variable. Either create a `.env` file or
copy and rename the `.env.dist` in the cloned repository folder. The main compose file must be specified first,
followed by one or more scenarios, separated by a colon (`:`). The files are applied in the order given. Replace the
placeholder in curly brackets with the filename of the scenario you want to use.

**Example with two scenario placeholders:**

``` sh
COMPOSE_FILE=docker-compose.yml:scenarios/{scenario you want to use}.yml:scenarios/{another scenario you want to use}.yml
```

After specifying the scenarios, start the stack with `docker compose up -d`.

::: info

When using the `COMPOSE_FILE` variable, the `docker-compose.override.yml` is not automatically picked up. If you want
to use it, make sure to append it to the environment variable's list.

:::

=== Portainer

Follow the [general deployment guide](/en/get-started/installation/docker) and apply the following changes.

Below the "Compose path" field, click on the `Add file` button. This opens the "Additional paths" section where you
can specify the scenario you want to use. Add `scenarios/{scenario you want to use}.yml` and replace the last part in
`{}` brackets with the name of one of the scenario files. You can even combine the scenarios by adding additional paths.

![Portainer additional paths configuration](/screenshots/get-started/installation/portainer-additional-paths.png)

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

Sometimes it's necessary to apply local changes to the Zammad Docker stack,
e.g. to include additional services. If you plan to do so, we recommend that
you do not change the `docker-compose.yml` file, but instead create a local
`docker-compose.override.yml` that includes all your modifications. Docker
Compose will [automatically load this file and merge its changes into your
stack](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/){target=_blank}.
The stack repository ships an inactive example file you can copy and adjust:

``` sh
cp docker-compose.override.yml.dist docker-compose.override.yml
```

Keep in mind that this file is for changing settings of the services that
`docker-compose.yml` already defines. Loading scenarios here is not
supported, use the `COMPOSE_FILE` variable in your `.env` file instead, as
described in the [general usage](#general-usage) section above. If you do,
append this file to that list as well: setting `COMPOSE_FILE` turns off the
automatic pickup of `docker-compose.override.yml`, so your changes here
would otherwise go unused without any warning.
