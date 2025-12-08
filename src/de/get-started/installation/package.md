---
order: 2
title: Paket
---

# Paket-Installation

<!--@include: @/de/modules/zammad-services-hint.md-->

## Unterstützte Betriebssysteme

Für die Paket-Installation werden die folgenden Linux-Distributionen
unterstützt:

| Distribution  | Version             |
| ------------- | :-----------------  |
| CentOS/RHEL   | 8 & 9               |
| Debian        | 11, 12 & 13          |
| OpenSUSE/SLES | Leap 15.x / 15      |
| Ubuntu        | 22.04, 24.04        |

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

Nur SLES - Nicht erforderlich für OpenSUSE:

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo yum install wget epel-release
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

Wenn die Ausgabe nicht `<lang_code>.utf8` ist, können Sie dieses
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

Nachdem Sie den Fehler behoben haben, überprüfen Sie die Ausgabe noch einmal auf
`<lang_code>.utf8`. Ein Neustart kann helfen, wenn dies nicht erfolgreich war.

=== Debian
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
locale | grep "LANG="
```

Wenn das obige Ergebnis nicht `<lang_code>.utf8` ist, können Sie dieses
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

Nachdem Sie den Fehler behoben haben, überprüfen Sie die Ausgabe noch einmal auf
`<lang_code>.utf8`. Ein Neustart kann helfen, wenn dies nicht erfolgreich war.

=== OpenSUSE/SLES
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
localectl status | grep LANG
```

Wenn das obige Ergebnis nicht `<lang_code>.utf8` ist, können Sie dieses
Problem wie folgt beheben:

```sh
sudo localectl set-locale LANG=de_US.UTF-8
```

Nachdem Sie den Fehler behoben haben, überprüfen Sie die Ausgabe noch einmal auf
`<lang_code>.utf8`. Ein Neustart kann helfen, wenn dies nicht erfolgreich war.

===CentOS/RHEL
Listen Sie Ihre aktuellen Einstellungen für die Sprache auf:

```sh
locale | grep "LANG="
```

Wenn das obige Ergebnis nicht `<lang_code>.utf8` ist, können Sie dieses
Problem wie folgt beheben:

```sh
sudo localectl set-locale LANG=de_US.UTF-8
```

Nachdem Sie den Fehler behoben haben, überprüfen Sie die Ausgabe noch einmal auf
`<lang_code>.utf8`. Ein Neustart kann helfen, wenn dies nicht erfolgreich war.

:::

### Elasticsearch installieren

Die empfohlene Methode ist die Verwendung von [Elastics offizieller
Installationsanleitung](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}.

Alternativ können Sie [unserem
Beispiel-Setup](/de/tutorials/install-elasticsearch.md) für Elasticsearch 9
folgen, das Sie auf einer anderen Seite finden, um die
Installationsanweisungen übersichtlich zu halten.

### Zammad-Repository hinzufügen

::: info
Es kann sein, dass Packager.io aus reinen IPv6-Umgebungen nicht erreichbar ist, daher sollten Sie
dies bei der Durchführung der folgenden Schritte berücksichtigen.
:::

::::tabs key:distros

=== Ubuntu
Repository-Schlüssel hinzufügen:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null \
&& sudo chmod 644 /etc/apt/keyrings/pkgr-zammad.gpg
```

Ubuntu 22.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

::: info
Beginnend mit Ubuntu 24.04 enthält diese Dokumentation den Befehl zum Hinzufügen des Repository im
[deb822-Format](https://repolib.readthedocs.io/en/latest/deb822-format.html).
:::

```sh
printf "Types: deb
URIs: https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu
Suites: 24.04
Components: main
Signed-By: /etc/apt/keyrings/pkgr-zammad.gpg" | \
sudo tee /etc/apt/sources.list.d/zammad.sources > /dev/null
```

=== Debian
::: info
Ab Debian 13 werden die Pakete unter einer anderen URL gehostet und der Signing-Key wird in einem anderen
Verzeichnis gespeichert.
:::

Repository-Key hinzufügen (Debian 11 & 12):

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null \
&& sudo chmod 644 /etc/apt/keyrings/pkgr-zammad.gpg
```

Repository-Key hinzufügen (Debian 13):

```sh
curl -fsSL https://go.packager.io/srv/deb/zammad/zammad/gpg-key.asc | \
gpg --dearmor | sudo tee /usr/share/keyrings/zammad.gpg> /dev/null \
&& sudo chmod 644 /etc/apt/keyrings/pkgr-zammad.gpg
```

Repository hinzufügen (Debian 11):

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 11 main"| \
sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Repository hinzufügen (Debian 12):

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 12 main"| \
sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Repository hinzufügen (Debian 13):

```sh
curl -fsSL https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list \
-o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES
Repository-Key hinzufügen:

```sh
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```

OpenSUSE 15.x / SLES15

```sh
sudo wget -O /etc/zypp/repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo
```

===CentOS/RHEL
Repository-Key hinzufügen:

```sh
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```

CentOS 8 / RHEL 8

```sh
sudo wget -O /etc/yum.repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/el/8.repo
```

CentOS 9 / RHEL 9

```sh
sudo wget -O /etc/yum.repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/el/9.repo
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
sudo zypper ref
```

```sh
sudo zypper install zammad
```

===CentOS/RHEL

```sh
sudo yum install zammad
```

Aufgrund eines Problems mit packager.io müssen Sie die Dateiberechtigungen für öffentliche Dateien unter CentOS korrigieren:

```sh
sudo chmod -R 755 /opt/zammad/public/
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
