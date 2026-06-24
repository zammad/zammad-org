---
order: 2
title: Paket
---

# Paket-Installation

<!--@include: @/de/modules/zammad-services-hint.md-->

## Unterstützte Betriebssysteme

Für Paketinstallationen werden die folgenden Linux-Distributionen unterstützt:
<!-- table included in host-upgrade.md; referenced with line numbers 15-20. Make sure to keep it or
adjust it over there -->
| Distribution         | Version              |
| -------------------- | :------------------- |
| CentOS/RHEL          | 9, 10                |
| Debian               | 11, 12 & 13          |
| OpenSUSE Leap / SLES | 15 & 16              |
| Ubuntu               | 22.04, 24.04 & 26.04 |

Wenn Ihre Distribution nicht unterstützt wird, können Sie eine andere
Installationsmethode verwenden oder [Zammads Cloud
Service](https://zammad.com/de/pricing){target=_blank} in Betracht ziehen.

Für die folgenden Installationsschritte werden Tools wie curl, gnupg und
andere benötigt. Wenn sie nicht auf Ihrem System vorhanden sind,
installieren Sie diese:

:::tabs key:distros

=== Ubuntu

```sh
sudo apt install curl apt-transport-https gnupg
```

=== Debian

```sh
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

OpenSUSE benötigt hier keine zusätzlichen Schritte!

Für SLES 15 müssen zusätzliche Paketquellen aktiviert werden. Verwenden Sie dazu den folgenden Befehl:

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo dnf install curl epel-release
```

:::

## Grundlagen

### Korrekte Sprache/Gebietsschema sicherstellen

:::tabs key:distros

=== Ubuntu
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
locale | grep "LANG="
```

Wenn die Ausgabe nicht `.utf8` enthält, können Sie dieses
Problem wie folgt beheben:

```sh
sudo apt install locales
```

```sh
sudo locale-gen en_US.UTF-8
```

```sh
echo "LANG=de_US.UTF-8" > sudo /etc/default/locale
```

Nachdem Sie dies durchgeführt haben, überprüfen Sie die Ausgabe noch einmal auf
`.utf8`. Ein Neustart kann helfen, sofern nicht erfolgreich.

=== Debian
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
locale | grep "LANG="
```

Wenn die Ausgabe nicht `.utf8` enthält, können Sie dieses
Problem wie folgt beheben:

```sh
sudo apt install locales
```

```sh
sudo locale-gen en_US.UTF-8
```

```sh
echo "LANG=de_US.UTF-8" > sudo /etc/default/locale
```


Nachdem Sie dies durchgeführt haben, überprüfen Sie die Ausgabe noch einmal auf
`.utf8`. Ein Neustart kann helfen, sofern nicht erfolgreich.

=== OpenSUSE/SLES
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
localectl status | grep LANG
```
Wenn die Ausgabe nicht `.utf8` enthält, können Sie dieses
Problem wie folgt beheben:

```sh
sudo localectl set-locale LANG=de_US.UTF-8
```


Nachdem Sie dies durchgeführt haben, überprüfen Sie die Ausgabe noch einmal auf
`.utf8`. Ein Neustart kann helfen, sofern nicht erfolgreich.

===CentOS/RHEL
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
locale | grep "LANG="
```

Wenn die Ausgabe nicht `.utf8` enthält, können Sie dieses
Problem wie folgt beheben:

```sh
sudo localectl set-locale LANG=de_US.UTF-8
```


Nachdem Sie dies durchgeführt haben, überprüfen Sie die Ausgabe noch einmal auf
`.utf8`. Ein Neustart kann helfen, sofern nicht erfolgreich.

:::

### Elasticsearch installieren

Die empfohlene Methode ist die Verwendung von [Elastics offizieller
Installationsanleitung](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}.

Alternatively, you can follow [our example
setup](/en/tutorials/install-elasticsearch) of Elasticsearch 9, which is
separated to keep the install instructions as lean as possible.

### Zammad-Paketquelle hinzufügen

::: info
Es kann sein, dass Packager.io aus reinen IPv6-Umgebungen nicht erreichbar ist, daher sollten Sie
dies bei der Durchführung der folgenden Schritte berücksichtigen.
:::
<!-- repo instructions included in host-upgrade.md; referenced with line numbers 171-283. Make sure to keep it or
adjust it over there -->
::::tabs key:distros

=== Ubuntu
Paketquellen-Schlüssel hinzufügen:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Paketquelle hinzufügen (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Paketquelle hinzufügen (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Paketquelle hinzufügen (Ubuntu 26.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/26.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Paketquellen-Schlüssel hinzufügen:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Paketquelle hinzufügen (Debian 11):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/11.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Paketquelle hinzufügen (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Paketquelle hinzufügen (Debian 13):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Paketquelle hinzufügen (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo"
```

Paketquelle hinzufügen (OpenSUSE/SLES 16):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/16.repo"
```

===CentOS/RHEL
Paketquellen-Schlüssel hinzufügen:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Paketquelle hinzufügen (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/9.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

Paketquelle hinzufügen (CentOS/RHEL 10):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/10.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

::::

### Zammad installieren

:::tabs key:distros

=== Ubuntu

```sh
sudo apt update
```

```sh
sudo apt install zammad
```

=== Debian

```sh
sudo apt update
```

```sh
sudo apt install zammad
```

=== OpenSUSE/SLES

```sh
sudo zypper refresh
```

```sh
sudo zypper install zammad
```

===CentOS/RHEL

```sh
sudo dnf install zammad
```

:::

### Zammad Services verwalten

Zammad verwendet drei Dienste. Diese Dienste können einzeln oder alle auf
einmal verwaltet werden, indem der übergeordnete Dienst **zammad** verwendet
wird.

- zammad: umfasst die folgenden Dienste
  - **zammad-web**: interner Puma-Server (relevant für die Anzeige der
    Webanwendung)
  - **zammad-worker**: Hintergrund-Worker - relevant für alle verzögerten
    Aufgaben sowie Hintergrundaufgaben
  - **zammad-websocket**: Websocket-Server für sitzungsbezogene
    Informationen

Verwalten Sie die Dienste mit den `systemctl`-Befehlen `start`, `restart`,
`stop`, `status`.

Beispiel für den Start von Zammad mit allen Diensten:

```sh
sudo systemctl start zammad
```

Um einen Dienst anzuhalten, neu zu starten oder dessen Status zu prüfen,
passen Sie den Befehl wie oben beschrieben an.

### Nächste Schritte

- [Zammad mit Elasticsearch
  verbinden](/de/tutorials/connect-config-elasticsearch)
- [Passen Sie Ihre SELinux-Regeln und Ihre Firewall
  an](/de/tutorials/firewall-selinux)
- [Konfigurieren Sie den Webserver](/de/tutorials/webserver-config)

## Abhängigkeiten

Sofern Sie eine Standardinstallation verwenden werden die folgenden
Abhängigkeiten während der Installation des Zammad-Pakets automatisch
installiert. Zusätzlich finden Sie unten einige Informationen über
Elasticsearch, das nicht automatisch installiert wird.

- imlib2
- Node.js
- PostgreSQL
- Nginx
- Redis

### Datenbank-Server

Zammad speichert seinen Inhalt in einer Datenbank. Das unterstützte
Datenbanksystem ist [PostgreSQL](https://www.postgresql.org/){target=_blank}
13 oder neuer. Wenn kein PostgreSQL-Server gefunden wird, wird er
automatisch während der Paketinstallation installiert.

::: warning
Wenn Sie Software für das Pooling von Datenbankverbindungen wie PgBouncer verwenden, stellen Sie sicher, dass Sie
einen Pooling-Modus verwenden, der vollständig mit PostgreSQL kompatibel ist. Typischerweise wird dies
"session connection pooling" genannt. Transaktionsbasiertes connection pooling wird
nicht unterstützt und kann bei Datenbankmigrationen zu Fehlern führen.
:::

### Reverse Proxy

Die folgenden Reverse-Proxys werden unterstützt:

- Nginx 1.3+
- Apache 2.2+

Das Installationsskript versucht, während der Installation einen Apache oder
Nginx zu erkennen. Falls keiner gefunden wird, wird automatisch Nginx
installiert.  Eine Grundkonfiguration finden Sie in unserem
[Webserver-Tutorial](/de/tutorials/webserver-config).

### Redis

[Redis](https://redis.io/) wird für die Echtzeitkommunikation über Websocket
benötigt. Zammad benötigt Redis 6 oder neuer. Es wird automatisch
installiert (Paket) oder ist im Stack (Docker Compose) enthalten mit einer
funktionierenden Konfiguration.  Die Installation und Konfiguration ist
allerdings nicht Gegenstand dieser Dokumentation. Bitte folgen Sie den
offiziellen Anleitungen und stellen Sie sicher, dass Sie es auf sichere
Weise einrichten.

Die verfügbaren Umgebungsvariablen für Standard- und Sentinel-Setups sind
auf der Seite [Redis Variablen](/de/reference/redis) aufgeführt.

:::info
CentOS und RHEL 10 verwenden [Valkey](https://valkey.io/) als Drop-In-Ersatz für Redis. Während der Zammad-Installation
wird es auf diesen Distributionen automatisch als Abhängigkeit installiert.
:::

### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="dringend empfohlen"/>

Elasticsearch wird nicht automatisch installiert. Da es für eine
ordnungsgemäße Einrichtung von Zammad entscheidend ist, ist es in den obigen
Installationsanweisungen enthalten. Wenn Sie Zammad mit einer bereits
existierenden Elasticsearch-Instanz verbinden wollen, stellen Sie sicher,
dass Sie eine unterstützte Version verwenden und werfen Sie einen Blick auf
unser [Beispiel-Konfiguration](/de/tutorials/connect-config-elasticsearch).

Unterstützte Elasticsearch-Versionen sind `7.8` - `9.x`.

Elasticsearch-Versionsverlauf für Zammad:

:::details

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 7+            | >= 7.8, <10    |
| 5.2-6.5       | >= 7.8, <9     |
| 5.0-5.1       | >= 7.8, <8     |
| 4.0-4.1       | >= 6.5, <=7.12 |
| 3.4-3.6       | >= 5.5, <=7.9  |
| 3.3           | >= 2.4, <=7.6  |
| 3.2           | >= 2.4, <=7.5  |
| 3.1           | >= 2.4, <=7.4  |
| 2.0-3.0       | >= 2.4, <=5.6  |

:::

Das Elasticsearch-Plugin `ingest-attachment` wird für Version 7 oder älter
benötigt, um den Inhalt von E-Mail-Anhängen zu indizieren. Ab Elasticsearch
8 ist es standardmäßig in der Installation enthalten.

### Memcached

Zammad verwendet ausgiebig Caching, um die Leistung zu verbessern. Dieser
Cache kann im Dateisystem gespeichert werden, ohne auf externe Dienste
angewiesen zu sein. Dies ist jedoch nur möglich, wenn alle Dienste von
Zammad auf demselben Dateisystem laufen!

In allen anderen Fällen, wie der Bereitstellung von Zammad über Container
(Docker oder Kubernetes) oder auf separaten Clusterknoten, ist ein
[Memcached](https://memcached.org/){target=_blank}-Dienst erforderlich, um
den Cache zu speichern und ihn allen Zammad-Instanzen zur Verfügung zu
stellen.  Die Docker- und Kubernetes-Stacks enthalten diesen Dienst bereits.

Aber auch lokale Dateisysteminstallationen können von den
Leistungsverbesserungen von Memcached profitieren. Sie sollten auch einen
Blick auf den Abschnitt
[Leistungsoptimierung](/de/reference/environment-variables#leistungsoptimierung)
werfen.

Die Installation und Konfiguration ist nicht Gegenstand dieser
Dokumentation. Falls Sie Memcached manuell installieren müssen, folgen Sie
bitte der [offiziellen Dokumentation von
Memcached](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="optional"/>

Wenn Sie die PGP-Integration zum Senden und Empfangen von signierten und
verschlüsselten E-Mails nutzen möchten, müssen Sie das GnuPG-Tool
installieren. Bitte werfen Sie einen Blick auf die offizielle
[GnuPG-Website](https://www.gnupg.org/index.html){target=_blank}.
