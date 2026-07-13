---
order: 4
title: 'Host-Upgrade und Paketquellenmigration'
---

# Host-Upgrade und Paketquellenmigration

<!--@include: @/de/modules/zammad-services-hint.md-->

Diese Seite beinhaltet die erforderlichen Schritte für ein Host-Upgrade und
den Wechsel zu Zammads neuen Paketquellen. Wenn Sie nur Zammad selbst
aktualisieren möchten, schauen Sie sich Sie bitte die [Aktualisierung von
Zammad](update) an. Um nur zu den neuen Paketquellen zu wechseln ohne ein
Host-Upgrade durchzuführen, überspringen Sie die Host-Upgrade-Schritte.

Ab Zammad 7 werden Pakete mit einer neuen Toolchain erstellt und unter einer
anderen URL gehostet. Die Pakete werden für eine Zeit lang zwar weiterhin
mit der alten Toolchain erstellt (mit Ausnahme von Debian 13), aber wir
empfehlen Ihnen, die neuen Paketquellen zeitnah zu verwenden. Dies bedeutet,
dass Sie einen neuen Paketquellen-Schlüssel hinzufügen und Ihre
Paketquellen-Konfiguration ändern müssen.

::: warning
Stellen Sie immer sicher, dass Sie eine [Sicherung](/de/tutorials/backup-restore) Ihrer Daten haben, bevor Sie ein Upgrade durchführen.
:::

Die folgenden Betriebssysteme werden unterstützt:

<!--@include: /installation/package.md{15,20}-->

## Zammad stoppen

```sh
sudo systemctl stop zammad
```

## Host-Upgrade-Schritte

### Aktualisierungen für Zammad deaktivieren

::: tabs key:distros

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

::: tabs key:distros

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

### Alten Paketquellen-Schlüssel entfernen

Entfernen Sie den alten Paketquellen-Schlüssel von Ihrem System. Je nach
Betriebssystem und Version ist der Ort bzw. die Methode unterschiedlich.

::: tabs key:distros

=== Ubuntu

```sh
sudo rm /etc/apt/keyrings/pkgr-zammad.gpg
```

=== Debian

```sh
sudo rm /etc/apt/trusted.gpg.d/pkgr-zammad.gpg
```

=== OpenSUSE/SLES

Zeigen Sie die Schlüssel auf Ihrem System an:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Löschen Sie den/die Zammad-relevanten Schlüssel (und nur diese(n)!), ersetzen Sie `<key-name>` mit der tatsächlichen Schlüssel- ID:

```sh
sudo rpm -e <key-name>
```

=== CentOS/RHEL

Zeigen Sie die Schlüssel auf Ihrem System an:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Löschen Sie den/die Zammad-relevanten Schlüssel (und nur diese(n)!), ersetzen Sie ``<key-name>`` mit der tatsächlichen Schlüssel- ID:

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

::: tip
Wenn eine neue Version von Zammad verfügbar ist und Sie auf diese aktualisieren möchten, lesen Sie die
[Release Notes](https://zammad.com/de/product/releases){target=_blank} für erforderliche zusätzliche Schritte.
:::

Aktivieren Sie die Updates für Zammad wieder und aktualisieren Sie Zammad
auf die neueste Version, die für Ihr Betriebssystem verfügbar ist.

::: tabs key:distros

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
sudo dnf upgrade zammad
```

:::

### Zammad starten

```sh
sudo systemctl start zammad
```
