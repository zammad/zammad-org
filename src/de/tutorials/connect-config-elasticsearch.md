---
order: 2
title: 'Verbinden und konfigurieren von Elasticsearch'
---

# Verbinden und konfigurieren von Elasticsearch

<!--@include: @/de/modules/zammad-services-hint.md-->

## Elasticsearch mit Zammad verbinden

### Festlegen der Elasticsearch URL

Legen Sie die Adresse des Elasticsearch-Servers fest; passen Sie diese an
Ihr Szenario an.

Elasticsearch 7 / ohne `https`:
```sh
zammad run rails r "Setting.set('es_url', 'http://localhost:9200')"
```
Elasticsearch 8 / mit `https`:
```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Festlegen von Elasticsearch-Benutzer und -Passwort <Badge type="warning" text="only ES8" />

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```
```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Zertifikat zu Zammad hinzufügen <Badge type="warning" text="only ES8" />

Zeigen und kopieren Sie das automatisch generierte Zertifikat von
Elasticsearch und fügen Sie es zu Zammad hinzu. Achten Sie darauf, auch die
Begrenzungszeichen zu kopieren/einzufügen (z.B. `-----BEGIN
CERTIFICATE-----`).

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

Gehen Sie in den Admin-Bereich von Zammad und fügen Sie Ihr kopiertes Zertifikat unter
*Einstellungen > Sicherheit > SSL-Zertifikate* ein.

### Den Suchindex aufbauen/neu erstellen

Ohne Angabe der zu verwendenden CPU-Kerne:
```sh
zammad run rake zammad:searchindex:rebuild
```
Mit Angabe der zu verwendenden CPU-Kerne (Beispiel 8):
```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Optionale Einstellungen

Wir haben einige nützliche Einstellungen gesammelt, die Sie vielleicht auch
anwenden möchten. Weitere Informationen finden Sie in der
[Elastic-Dokumentation]
(https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html).

### Index Namespacing

Nützlich, wenn mehrere Dienste oder Zammad-Instanzen mit einem einzigen
Elasticsearch-Server verbunden werden (um Namenskollisionen bei der
Indizierung zu vermeiden).
```sh
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### Regeln für die Indizierung von Dateianhängen

Zammad unterstützt die Suche in Dateianhängen, was bedeutet, dass
Elasticsearch auch diese indizieren muss. Eine Einschränkung dieser
Indizierung kann helfen, Systemressourcen zu schonen.


Dateien mit diesen Erweiterungen werden nicht indiziert:
```sh
zammad run rails r "Setting.set('es_attachment_ignore',\
[ '.png', '.jpg', '.jpeg', '.mpeg', '.mpg', '.mov', '.bin', '.exe', '.box', '.mbox' ] )"
```

Dateien, die diese Größe (in MB) überschreiten, werden nicht indiziert:
```sh
zammad run rails r "Setting.set('es_attachment_max_size_in_mb', 50)"
```

## Fehlerbehebung

:::tip
Fehlersuche erfolglos oder Problem nicht beschrieben?

Wenn Sie Ihr Problem nicht anhand der angegebenen Schritte zur Fehlerbehebung lösen können
oder Ihr spezielles Problem hier nicht beschrieben ist, können Sie [in
der Community](https://community.zammad.org) nachfragen.
:::

### Fehlende Daten in der Web-Benutzeroberfläche / Fehlende oder unvollständige Suchdaten

Ein häufig berichtetes Problem sind fehlende Daten in der Web-UI. Dabei kann
es sich um Tickets, Artikel, Benutzer oder andere [von Elasticsearch
indizierte] Daten handeln (/de/reference/es-indexed-attributes), die durch
fehlende oder unvollständige Indizes verursacht werden können.

Wenn Sie dieses Problem haben und Elasticsearch gemäß unserer
[Installationsanleitung](/de/tutorials/install-elasticsearch) installiert
haben, führen Sie bitte die folgenden Schritte aus, um sicherzustellen, dass
Elasticsearch korrekt funktioniert.

#### Step 1: Verify Elasticsearch is Running

```sh
systemctl status elasticsearch
```

This should output something like the following, make sure it says `Active:
active (running)`:

```sh
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-07-20 09:38:21 UTC; 1h 4min ago
   Docs: https://www.elastic.co
   Main PID: 1790 (java)
```

Otherwise, try restarting it and check again:

```sh
systemctl restart elasticsearch
```

::: warning
If this fails, your Elasticsearch installation is probably broken.
Try completely purging and reinstalling Elasticsearch according to
our [installation guide](/en/tutorials/install-elasticsearch).
:::

#### Step 2: Verify the Ingest-Attachment Plugin is Installed Correctly <Badge type="warning" text="only ES7" />

List installed elasticsearch plugins:
```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin list
```

The output should include `ingest-attachment`.

Otherwise, try reinstalling the `ingest-attachment` plugin and check again:

```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin remove ingest-attachment
```
```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-attachment
```
```sh
systemctl restart elasticsearch
```
```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin list
```

#### Step 3: Verify Zammad can Access Elasticsearch and Rebuild the Indexes

Force Zammad to drop and rebuild the elasticsearch indexes, optionally with
a specified number of CPU cores to use for re-indexing (example `[8]`):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```
This should start rebuilding the indexes and output its progress:

```sh
Dropping indexes... done.
Deleting pipeline... done.
Creating indexes... done.
Creating pipeline... done.
Reloading data...
   - Chat::Session...
      done in 0 seconds.
   - Cti::Log...
      done in 0 seconds.

[...]
```
Depending on the system performance and amount of data, this can take a
while to complete. Please let this task finish completely and wait until it
drops you back to the console.

If this fails or throws an error, there might be something else wrong with
your installation. Make sure you followed the complete Elasticsearch set up
and integration procedure according to our [installation
guide](/en/tutorials/install-elasticsearch).

::: tip
In many situations where you're not successful with above steps, you
may want to check Elasticsearch's log file:
`/var/log/elasticsearch/elasticsearch.log`.
:::

After completing these steps, you should have verified your Elasticsearch
installation is running and rebuilt the indexes.
