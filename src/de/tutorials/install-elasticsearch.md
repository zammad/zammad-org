---
order: 1
title: 'Elasticsearch 7 installieren'
---

# Elasticsearch 7 installieren

<!--@include: @/de/modules/zammad-services-hint.md-->

## Einführung

Elasticsearch ist technisch nicht erforderlich, um Zammad auszuführen, wird
aber _dringend_ empfohlen.

Elasticsearch bietet zwei Versionen an. Derzeit werden die Versionen 7 und 8
gepflegt. Für die Installationsanweisungen sollten Sie in erster Linie die
[Dokumentation von
Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#elasticsearch-install-packages){target=_blank}
beachten.  Verwenden Sie das Dropdown-Menü in der oberen linken Ecke, um die
Version auszuwählen, die Sie installieren möchten.

Wenn Sie jedoch Elasticsearch 7 verwenden möchten (das etwas einfacher zu
installieren ist), finden Sie unten die konsolidierten
Installationsschritte. Beachten Sie, dass die Wartung von Version 7
möglicherweise früher eingestellt wird als bei Version 8, die außerdem
einige zusätzliche Sicherheitsfunktionen enthält.

:::info
Wenn Sie Elasticsearch 8 installieren und unserer
[Standardkonfiguration](/de/tutorials/connect-config-elasticsearch) folgen wollen, stellen Sie sicher
dass Sie das Passwort, das bei der Installation von Elasticsearch angezeigt wird, kopieren/speichern.
:::

## Elasticsearch 7 installieren

:::::tabs

==== Ubuntu/Debian

```sh
apt install apt-transport-https sudo wget curl gnupg
```

```sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
gpg --dearmor | tee /etc/apt/trusted.gpg.d/elasticsearch.gpg> /dev/null
```

::::tabs

=== Deb822 Format

:::info
In diesem Tab wird das Repository mit im
[deb822-Format](https://repolib.readthedocs.io/en/latest/deb822-format.html)
hinzugefügt. Wenn Sie eine Distribution einsetzen, die dieses Format nicht unterstützt,
verwenden Sie stattdessen das Legacy-Format.
:::

```sh
printf "Types: deb
URIs: https://artifacts.elastic.co/packages/7.x/apt
Suites: stable
Components: main
Signed-By: /etc/apt/trusted.gpg.d/elasticsearch.gpg" | \
sudo tee /etc/apt/sources.list.d/elastic-7.x.sources > /dev/null
```

=== Legacy Format

```sh
echo "deb [signed-by=/etc/apt/trusted.gpg.d/elasticsearch.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main"| \
tee -a /etc/apt/sources.list.d/elastic-7.x.list > /dev/null
```

::::

=== Ubuntu

```sh
apt install apt-transport-https sudo wget curl gnupg
```

```sh
echo "deb [signed-by=/etc/apt/trusted.gpg.d/elasticsearch.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main"| \
  tee -a /etc/apt/sources.list.d/elastic-7.x.list > /dev/null
```

```sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | tee /etc/apt/trusted.gpg.d/elasticsearch.gpg> /dev/null
```

```sh
apt update
```

```sh
apt install elasticsearch
```

=== Debian

```sh
apt install apt-transport-https sudo wget curl gnupg
```

```sh
echo "deb [signed-by=/etc/apt/trusted.gpg.d/elasticsearch.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main"| \
  tee -a /etc/apt/sources.list.d/elastic-7.x.list > /dev/null
```

```sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | tee /etc/apt/trusted.gpg.d/elasticsearch.gpg> /dev/null
```

```sh
apt update
```

```sh
apt install elasticsearch
```

=== OpenSUSE

```sh
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

```sh
echo "[elasticsearch-7.x]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md"| tee /etc/zypp/repos.d/elasticsearch-7.x.repo
```

```sh
zypper install elasticsearch
```

=== CentOS

```sh
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

```sh
echo "[elasticsearch-7.x]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md"| tee /etc/yum.repos.d/elasticsearch-7.x.repo
```

```sh
yum install -y elasticsearch
```

=== Direkt Download

:::::

Installieren Sie das Plugin "ingest-attachment":
:   ```sh
    /usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-attachment
    ```

Erhöhen Sie das Virtual Memory Map Limit:
:   ```sh
    sysctl -w vm.max_map_count=262144
    ```
<!-- markdownlint-disable MD046 -->
Passen Sie `/etc/elasticsearch/elasticsearch.yml` an:
:   ```
    # /etc/elasticsearch/elasticsearch.yml

    # Tickets above this size (articles + attachments + metadata)
    # may fail to be properly indexed (Default: 100mb).
    #
    # When Zammad sends tickets to Elasticsearch for indexing,
    # it bundles together all the data on each individual ticket
    # and issues a single HTTP request for it.
    # Payloads exceeding this threshold will be truncated.
    #
    # Performance may suffer if it is set too high.
    http.max_content_length: 400mb

    # Allows the engine to generate larger (more complex) search queries.
    # Elasticsearch will raise an error or deprecation notice if this value is
    # too low, but setting it too high can overload system
    # resources (Default: 1024).
    #
    # Available in version 6.6+ only.
    indices.query.bool.max_clause_count: 2000
    ```
<!-- markdownlint-enable MD046 -->

Aktivieren Sie es standardmäßig und starten Sie es:
:   ```sh
    systemctl enable elasticsearch --now
    ```

## Nächste Schritte

 Fahren Sie fort indem Sie
 [Elasticsearch mit Zammad verbinden](/de/tutorials/connect-config-elasticsearch).
