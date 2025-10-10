---
order: 2
title: 'Verbinden und konfigurieren von Elasticsearch'
---

# Verbinden und konfigurieren von Elasticsearch

<!--@include: @/de/modules/zammad-services-hint.md-->

This guide shows you how to connect Zammad with Elasticsearch 8 or newer.

## Elasticsearch mit Zammad verbinden

### Festlegen der Elasticsearch URL

Legen Sie die Adresse des Elasticsearch-Servers fest; passen Sie diese an
Ihr Szenario an.

```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Set the Elasticsearch User and Password

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```

Replace `<password>` with the one you got during the installation of Elasticsearch. In case you need to create a new
password, run `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.

```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Add Certificate to Zammad

This step requires a running Zammad. If you are installing a new Zammad
instance, [go on with the
installation](/en/get-started/installation/package#add-zammad-repository)
and come back here when you can access the admin settings in the browser.

Zeigen und kopieren Sie das automatisch generierte Zertifikat von
Elasticsearch und fügen Sie es zu Zammad hinzu. Achten Sie darauf, auch die
Begrenzungszeichen zu kopieren/einzufügen (z.B. `-----BEGIN
CERTIFICATE-----`).

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

To add it in Zammad, go to _Settings > Security > SSL Certificates_ in the admin settings and add your copied
certificate. Either upload the certificate file or paste the content in the dialog.
After saving the certificate, Zammad is now able to connect to and access the Elasticsearch index.

### Den Suchindex aufbauen/neu erstellen

Ohne Vorgabe der zu verwendenden CPU-Kerne:

```sh
zammad run rake zammad:searchindex:rebuild
```

Mit Vorgabe der zu verwendenden CPU-Kerne (Beispiel 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Optionale Einstellungen

Wir haben einige nützliche Einstellungen gesammelt, die Sie vielleicht auch
anwenden möchten. Weitere Informationen finden Sie in der
[Elastic-Dokumentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

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

### Asciifold

Standardmäßig ist die [Asciifold-Funktion von
Elasticsearch](https://www.elastic.co/docs/reference/text-analysis/analysis-asciifolding-tokenfilter){target=_blank}
aktiviert. Dies kann nützlich sein, wenn Sie mit Text arbeiten, der
Diakritika und/oder Umlaute enthält.

Falls Sie eine genauere Suche benötigen, können Sie diese über
[Rails-Konsole](/de/reference/console#asciifold-deaktivieren) deaktivieren.

## Fehlerbehebung

:::tip
Fehlersuche erfolglos oder Problem nicht beschrieben?

Wenn Sie Ihr Problem nicht anhand der angegebenen Schritte zur Fehlerbehebung lösen können
oder Ihr spezielles Problem hier nicht beschrieben ist, können Sie [in
der Community](https://community.zammad.org){target=_blank} nachfragen.
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

#### Schritt 1: Überprüfen Sie, ob Elasticsearch läuft

```sh
sudo systemctl status elasticsearch
```

Die Ausgabe sollte in etwa wie folgt aussehen. Achten Sie darauf, dass dort
`Active: active (running)` steht:

```sh
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-07-20 09:38:21 UTC; 1h 4min ago
   Docs: https://www.elastic.co
   Main PID: 1790 (java)
```

Andernfalls versuchen Sie, den Service neu zu starten und prüfen Sie dann
erneut:

```sh
sudo systemctl restart elasticsearch
```

::: warning
Wenn dies fehlschlägt, ist Ihre Elasticsearch-Installation wahrscheinlich defekt.
Versuchen Sie, Elasticsearch vollständig zu bereinigen und neu zu installieren, wie in
unserer [Installationsanleitung](/de/tutorials/install-elasticsearch) beschrieben.
:::

#### Step 2: Verify Zammad can Access Elasticsearch and Rebuild the Indexes

Erzwingen, dass Zammad die Elasticsearch-Indizes löscht und neu aufbaut,
optional mit einer definierten Anzahl von CPU-Kernen, die für die
Neuindizierung verwendet werden sollen (Beispiel `[8]`):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

Dies sollte den Wiederaufbau der Indizes starten und den Fortschritt
ausgeben:

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

Je nach Systemleistung und Datenmenge kann dies eine Weile dauern. Bitte
warten Sie bis diese Aufgabe vollständig abgeschlossen ist und Sie wieder in
die Konsole sind.

Wenn dieser Vorgang fehlschlägt oder einen Fehler ausgibt, ist
möglicherweise etwas anderes mit Ihrer Installation nicht in
Ordnung. Vergewissern Sie sich, dass Sie die vollständige Einrichtung und
Integration von Elasticsearch gemäß unserer
[Installationsanleitung](/de/tutorials/install-elasticsearch) durchgeführt
haben.

::: tip
Falls Sie mit den obigen Schritten keinen Erfolg haben,
sollten Sie die Elasticsearch-Protokolldatei überprüfen:
`/var/log/elasticsearch/elasticsearch.log`.
:::

Nachdem Sie diese Schritte durchgeführt haben, sollten Sie sicherstellen,
dass Ihre Elasticsearch-Installation läuft und die Indizes neu erstellt
wurden.
