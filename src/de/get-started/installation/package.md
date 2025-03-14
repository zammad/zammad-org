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
| Debian        | 11 & 12             |
| OpenSUSE/SLES | Leap 15.x / 15      |
| Ubuntu        | 20.04, 22.04, 24.04 |

Wenn Ihre Distribution nicht unterstützt wird, können Sie eine andere
Installationsmethode verwenden oder [Zammads Cloud
Service](https://zammad.com/de/pricing){target=_blank} in Betracht ziehen.

Um die folgenden Installationsschritte durchzuführen, müssen Sie
möglicherweise zusätzliche Tools wie curl, gnupg und andere installieren.

::::details Required Tools
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
::::

## Schnellstart

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
Beispiel-Setup](/de/tutorials/install-elasticsearch.md) für Elasticsearch 7
folgen, das Sie auf einer anderen Seite finden, um die
Installationsanweisungen so schlank wie möglich zu halten.

### Zammad-Repository hinzufügen

::: info
Es kann sein, dass Packager.io von reinen IPv6-Umgebungen aus nicht zugänglich ist, daher sollten Sie
dies bei der Durchführung der folgenden Schritte berücksichtigen.
:::

:::tabs key:distros

=== Ubuntu
Repository-Key hinzufügen:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```

Ubuntu 20.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 20.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 22.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 24.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

=== Debian
Repository-Key hinzufügen:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
   gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```

Debian 11

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 11 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Debian 12

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 12 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
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

:::

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

Zammad verwendet drei Dienste. Sie können mit dem übergeordneten Dienst
`zammad` (neu)gestartet und gestoppt werden:

```sh
systemctl (status|start|stop|restart) zammad
```

Nur interner Puma-Server (relevant zum Anzeigen der Web-App):

```sh
systemctl (status|start|stop|restart) zammad-web
```

Nur Background Worker - relevant für alle verzögerten und Hintergrund-Jobs:

```sh
systemctl (status|start|stop|restart) zammad-worker
```

Nur Websocket-Server für sitzungsbezogene Informationen:

```sh
systemctl (status|start|stop|restart) zammad-websocket
```

### Nächste Schritte

- Zammad mit Elasticsearch verbinden ([Basis
  Anleitung](/de/tutorials/connect-config-elasticsearch))
- Passen Sie Ihre SELinux-Regeln und Ihre Firewall an ([Basis
  Anleitung](/de/tutorials/firewall-selinux))
- Konfigurieren Sie den Webserver ([Basis
  Anleitung](/de/tutorials/webserver-config))

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

Zammad speichert alle Inhalte in einer Datenbank. Wir unterstützen
PostgreSQL in Version 10 oder höher. Das Installationsskript versucht,
während der Installation einen MySQL/MariaDB- oder PostgreSQL-Server zu
finden. Falls kein solcher gefunden wird, wird automatisch PostgreSQL
installiert.

::: warning
Wenn Sie Software für das Pooling von Datenbankverbindungen wie PgBouncer verwenden, stellen Sie sicher, dass Sie
einen Pooling-Modus verwenden, der vollständig mit PostgreSQL kompatibel ist. Typischerweise wird dies
"session connection pooling" genannt. Transaktionsbasiertes connection pooling wird
nicht unterstützt und kann bei Datenbankmigrationen zu Fehlern führen.
:::

Wenn Sie noch MySQL/MariaDB verwenden, sollten Sie auf PostgreSQL
umsteigen.  MySQL/MariaDB werden ab Zammad 7 **nicht mehr** unterstützt.

### Reverse Proxy

Die folgenden Reverse-Proxys werden unterstützt:

- Nginx 1.3+
- Apache 2.2+

Das Installationsskript versucht, während der Installation einen Apache oder
Nginx zu erkennen. Falls keiner gefunden wird, wird automatisch Nginx
installiert.  Eine Anleitung zur Grundkonfiguration finden Sie
[hier](/de/tutorials/webserver-config).

### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="dringend empfohlen"/>

Elasticsearch wird nicht automatisch installiert. Da es für eine
ordnungsgemäße Einrichtung von Zammad entscheidend ist, ist es in den obigen
Installationsanweisungen enthalten. Wenn Sie Zammad mit einer bereits
existierenden Elasticsearch-Instanz verbinden wollen, stellen Sie sicher,
dass Sie eine unterstützte Version verwenden und werfen Sie einen Blick auf
unser [Beispiel-Konfiguration](/de/tutorials/connect-config-elasticsearch).

Unterstützte Elasticsearch-Versionen sind `7.8` - `8.x`.

:::details Elasticsearch version history

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 5.2+          | >= 7.8, <9     |
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

### Memcached <Badge type="info" text="optional"/>

Anstatt Zammads Cache-Dateien in Ihrem Dateisystem zu speichern, können sie
mit Memcached im Arbeitsspeicher zwischengespeichert werden.

Die Installation und Konfiguration ist nicht Bestandteil dieser
Dokumentation .  Bitte folgen Sie der [offiziellen
Anleitung](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="optional"/>

Wenn Sie die PGP-Integration zum Senden und Empfangen von signierten und
verschlüsselten E-Mails nutzen möchten, müssen Sie das GnuPG-Tool
installieren. Bitte werfen Sie einen Blick auf die offizielle
[GnuPG-Website](https://www.gnupg.org/index.html){target=_blank}.
