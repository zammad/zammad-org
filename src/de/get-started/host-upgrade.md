---
order: 4
title: Host-Upgrade
---

# Host-Upgrade

<!--@include: @/de/modules/zammad-services-hint.md-->

Wenn Sie Zammad über den [Paketmanager](installation/package) installiert
haben und Ihr Host-Betriebssystem aktualisieren müssen, lesen Sie bitte die
folgenden Schritte. Es sind einige zusätzliche Schritte im Vergleich zur
Aktualisierung von Zammad selbst erforderlich.

:::warning
Stellen Sie immer sicher, dass Sie eine [Sicherung](/de/tutorials/backup-restore) Ihrer Daten haben, bevor Sie ein Upgrade durchführen.
:::

Die folgenden Betriebssysteme werden unterstützt:

<!--@include: /installation/package.md{15,20}-->

## Allgemein

Die allgemeinen Schritte, unabhängig davon, welches Betriebssystem Sie
verwenden, sind:

1. Zammad stoppen
1. Aktualisierungen für Zammad deaktivieren
1. Host-Upgrade durchführen
1. Host neu starten
1. Paketquelle anpassen
1. Zammad aktualisieren
1. Zammad starten

## Detaillierte Schritte

### Zammad stoppen

```sh
sudo systemctl stop zammad
```

### Aktualisierungen für Zammad deaktivieren

:::tabs key:distros

=== Ubuntu

```sh
sudo apt-mark hold zammad
```

=== Debian

```sh
sudo apt-mark hold zammad
```

=== OpenSUSE/SLES

```sh
sudo zypper addlock zammad
```

=== CentOS/RHEL

```sh
sudo yum upgrade --exclude zammad
```

:::

### Host-Upgrade durchführen

Führen Sie das Host-Upgrade gemäß der Dokumentation Ihres Betriebssystems
durch. Da es sich hierbei um eine anspruchsvolle und umfangreiche Aufgabe
handelt, gibt es dazu hier keine Anleitung. Nach dem Upgrade Ihres
Betriebssystems fahren Sie mit den nächsten Schritten fort.

### Host neu starten

Falls Sie Ihr System nach dem Upgrade nicht neu gestartet haben, müssen Sie
es jetzt neu starten. Prüfen Sie anschließend, ob alles wie erwartet
läuft. Falls Zammad automatisch startet, stoppen Sie es wieder, bevor Sie
mit den nächsten Schritten fortfahren.

### Paketquelle anpassen

#### Alte Paketquelle entfernen

Entfernen Sie die alte Konfigurationsdatei der Paketquelle oder
deaktivieren/löschen Sie die alte Paketquelle in Ihrem Paketmanager.

:::tabs key:distros

=== Ubuntu

Ubuntu 22.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.list
```

Ubuntu 20.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.sources
```

=== Debian

```sh
sudo rm /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

```sh
sudo rm /etc/zypp/repos.d/zammad.repo
```

=== CentOS/RHEL

```sh
sudo rm /etc/yum.repos.d/zammad.repo
```

:::

#### Neue Paketquelle hinzufügen

Wenn der Paketquellen-Schlüssel für die alte und die neue Version Ihrer
Distribution unterschiedlich ist oder Ihre Distribution diesen an einem
anderen Ort erwartet, fügen Sie den neuen Schlüssel hinzu. Andernfalls
können Sie direkt die neue Konfiguration der Paketquelle hinzufügen.

<!--@include: /installation/package.md{171,283}-->

### Zammad aktualisieren

:::tip
Wenn eine neue Version von Zammad verfügbar ist und Sie auf diese aktualisieren möchten, lesen Sie die
[Release Notes](https://zammad.com/de/product/releases) für erforderliche zusätzliche Schritte.
:::

Aktivieren Sie die Updates für Zammad wieder und aktualisieren Sie Zammad
auf die neueste Version, die für Ihr Betriebssystem verfügbar ist.

:::tabs key:distros

=== Ubuntu

Aktualisierung des Paketindexes:

```sh
sudo apt update
```

Aktivieren der Aktualisierung für Zammad:

```sh
sudo apt-mark unhold zammad
```

Zammad aktualisieren:

```sh
sudo apt upgrade zammad
```

=== Debian

Aktualisierung des Paketindexes:

```sh
sudo apt update
```

Aktivieren der Aktualisierung für Zammad:

```sh
sudo apt-mark unhold zammad
```

Zammad aktualisieren

```sh
sudo apt upgrade zammad
```

=== OpenSUSE/SLES

Aktualisierung des Paketindexes:

```sh
sudo zypper refresh
```

Aktivieren der Aktualisierung für Zammad:

```sh
sudo zypper removelock zammad
```

Zammad aktualisieren

```sh
sudo zypper update zammad
```

=== CentOS/RHEL

```sh
sudo yum upgrade zammad
```

:::

### Zammad starten

```sh
sudo systemctl start zammad
```
