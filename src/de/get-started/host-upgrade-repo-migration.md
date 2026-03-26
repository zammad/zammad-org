---
order: 4
title: 'Host Upgrade and Repository Migration'
---

# Host Upgrade and Repository Migration

<!--@include: @/de/modules/zammad-services-hint.md-->

This page covers the required steps for a host upgrade and to switch to
Zammad's new package repositories. If you just want to update Zammad itself,
please refer to [Updating Zammad](update). To just switch to the new
repositories without a host upgrade, skip the host upgrade steps.

Starting with Zammad 7, packages are being built using a new toolchain and
hosted under another URL. The packages are being built via old toolchain as
well (except for Debian 13) for some time, but we encourage you to switch to
the new repositories in a timely manner. This means you need to add a new
repository key and change your repository configuration.

:::warning
Stellen Sie immer sicher, dass Sie eine [Sicherung](/de/tutorials/backup-restore) Ihrer Daten haben, bevor Sie ein Upgrade durchführen.
:::

Die folgenden Betriebssysteme werden unterstützt:

<!--@include: /installation/package.md{15,20}-->

## Zammad stoppen

```sh
sudo systemctl stop zammad
```

## Host Upgrade Steps

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
sudo dnf upgrade --exclude zammad
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

## Paketquelle anpassen

### Alte Paketquelle entfernen

Entfernen Sie die alte Konfigurationsdatei der Paketquelle oder
deaktivieren/löschen Sie die alte Paketquelle in Ihrem Paketmanager.

:::tabs key:distros

=== Ubuntu

Ubuntu 22.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.sources
```

Ubuntu 24.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.list
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

### Remove Old Repository Key

Remove the old repository key from your system. Depending on your operating
system and version, the location or method differs.

:::tabs key:distros

=== Ubuntu

```sh
sudo rm /etc/apt/keyrings/pkgr-zammad.gpg
```

=== Debian

```sh
sudo rm /etc/apt/trusted.gpg.d/pkgr-zammad.gpg
```

=== OpenSUSE/SLES

List the keys of your system:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Delete the key(s) related to Zammad (and only those!), replace ``<key-name>`` with the actual key ID:

```sh
sudo rpm -e <key-name>
```

=== CentOS/RHEL

List the keys of your system:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Delete the key(s) related to Zammad (and only those!), replace ``<key-name>`` with the actual key ID:

```sh
sudo rpm -e <key-name>
```

:::

### Neue Paketquelle hinzufügen

Wenn der Paketquellen-Schlüssel für die alte und die neue Version Ihrer
Distribution unterschiedlich ist oder Ihre Distribution diesen an einem
anderen Ort erwartet, fügen Sie den neuen Schlüssel hinzu. Andernfalls
können Sie direkt die neue Konfiguration der Paketquelle hinzufügen.

<!--@include: /installation/package.md{172,296}-->

### Zammad aktualisieren

:::tip
Wenn eine neue Version von Zammad verfügbar ist und Sie auf diese aktualisieren möchten, lesen Sie die
[Release Notes](https://zammad.com/de/product/releases) für erforderliche zusätzliche Schritte.
:::

Aktivieren Sie die Updates für Zammad wieder und aktualisieren Sie Zammad
auf die neueste Version, die für Ihr Betriebssystem verfügbar ist.

:::tabs key:distros

=== Ubuntu

Update package index:

```sh
sudo apt update
```

Re-enable updates for Zammad:

```sh
sudo apt-mark unhold zammad
```

Update Zammad:

```sh
sudo apt upgrade zammad
```

=== Debian

Update package index:

```sh
sudo apt update
```

Re-enable updates for Zammad:

```sh
sudo apt-mark unhold zammad
```

Update Zammad:

```sh
sudo apt upgrade zammad
```

=== OpenSUSE/SLES

Update package index:

```sh
sudo zypper refresh
```

Re-enable updates for Zammad:

```sh
sudo zypper removelock zammad
```

Update Zammad:

```sh
sudo zypper update zammad
```

=== CentOS/RHEL

```sh
sudo dnf upgrade zammad
```

:::

### Zammad starten

```sh
sudo systemctl start zammad
```
