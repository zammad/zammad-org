---
order: 1
title: 'Elasticsearch 9 installieren'
---

# Elasticsearch 9 installieren

<!--@include: @/de/modules/zammad-services-hint.md-->

Diese Anleitung zeigt eine einfache Standardinstallation von Elasticsearch 9
mit dem Ziel, Sie unkompliziert ans Laufen zu bringen. Sollten Sie jedoch
eine abweichende Konfiguration benötigen oder auf Probleme stoßen, werfen
Sie einen Blick in die [offizielle
Elasticsearch-Installationsanleitung](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch){target=_blank}.
Passen Sie die Schritte an, falls Ihr Anwendungsfall abweicht.

## Installation

### Add repository key

::: tabs key:distros

=== Ubuntu/Debian

```sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | sudo tee /usr/share/keyrings/elasticsearch-keyring.gpg \
  && sudo chmod 644 /usr/share/keyrings/elasticsearch-keyring.gpg
```

=== OpenSUSE/SLES

```sh
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

=== CentOS/RHEL

```sh
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

:::

### Add repository

::: tabs key:distros

=== Ubuntu/Debian

``` sh
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

=== OpenSUSE/SLES

```sh
sudo cat << EOF > /etc/zypp/repos.d/elasticsearch.repo
[elasticsearch]
name=Elasticsearch repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
autorefresh=1
type=rpm-md
EOF
```

=== CentOS/RHEL

```sh
sudo cat << EOF > /etc/yum.repos.d/elasticsearch.repo
[elasticsearch]
name=Elasticsearch repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
type=rpm-md
EOF
```

:::

### Elasticsearch installieren

::: tabs key:distros

=== Ubuntu/Debian

``` sh
sudo apt update && sudo apt install elasticsearch
```

=== OpenSUSE/SLES

```sh
sudo zypper modifyrepo --enable elasticsearch && sudo zypper install elasticsearch
```

=== CentOS/RHEL

RHEL 7 oder älter:

```sh
sudo yum install --enablerepo=elasticsearch elasticsearch
```

CentOS und RHEL 8 und neuer:

```sh
sudo dnf install --enablerepo=elasticsearch elasticsearch
```

:::

::: tip
Achten Sie darauf, die Ausgabe zu überprüfen und das Passwort des Superusers zu kopieren. Andernfalls müssen Sie es neu generieren, indem Sie
`/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic` ausführen.
:::

## Konfiguration

Optional können Sie die Konfigurationsdatei von Elasticsearch anpassen, die
Sie unter `/etc/elasticsearch/elasticsearch.yml` finden.

Wir empfehlen, die maximale Kontextgröße, die von Elasticsearch indiziert
werden soll, anzupassen. Passen Sie den Wert auf eine vernünftige Größe wie
im Beispiel an:

```yml
http.max_content_length: 400mb
```

Eine zusätzliche Konfiguration ist nicht Gegenstand dieser
Dokumentation. Falls Ihr Szenario eine abweichende Konfiguration erfordert,
schauen Sie sich bitte die [Konfigurations-Referenz von
Elastic](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference){target=_blank}
an.

## Start and enable Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

## Next steps

Fahren Sie mit der [Installation von
Zammad](/de/get-started/installation/package#zammad-paketquelle-hinzufugen)
fort. Nachdem die Installation von Zammad abgeschlossen ist, können Sie
[Zammad mit Elasticsearch
verbinden](/de/tutorials/connect-config-elasticsearch).
