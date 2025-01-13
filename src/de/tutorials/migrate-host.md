---
order: 12
title: 'Zammad auf einen neuen Host migrieren'
---

# Zammad auf einen neuen Host migrieren

Dies ist nur eine Beschreibung der grundlegenden Schritte zur Durchführung
einer Migration auf einen neuen Host. Ihre Umgebung kann anders sein, daher
sollten Sie dies nur als Anhaltspunkt betrachten. Wenn etwas schief geht,
wenden Sie sich bitte an die [Zammad Community]
(https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5)
oder ziehen Sie [bezahlte Support-Optionen]
(https://zammad.com/de/services/professional-services) in Betracht.

Die auf dieser Seite beschriebenen Schritte sind eine Ergänzung zur
[Anleitung zur Sicherung und
Wiederherstellung](/de/tutorials/backup-restore). Sie sind nicht dazu
gedacht, für sich allein zu stehen - wir verlinken und vermerken dies an den
entsprechenden Stellen.

::: tip
Migration von Zammad SaaS? Springen Sie zu
[Schritt 7](#schritt-7-transfer-der-backup-dateien). Zur Wiederherstellung haben Sie
einen Anhang-Dump erhalten!
:::

## Schritt 1: Notieren Sie Ihre Umgebungseinstellungen

Falls Sie Umgebungsvariablen oder ähnliches gesetzt haben, sollten Sie diese
nun sichern.

## Schritt 2: Installieren Sie Zammad auf dem Zielhost

Um die Wiederherstellung so einfach wie möglich zu gestalten, installieren
Sie bitte die gleiche Version wie Ihre Ursprungsinstanz. Sie können
ggf. erwägen, die alte Instanz vor der Migration zu aktualisieren. Die
folgende Anleitung geht davon aus, dass Sie die gleiche Version von Zammad
auf Ihrem alten und neuen Host haben.

## Schritt 3: Aktivieren des Wartungsmodus

Dadurch werden alle Sitzungen von Agenten und Kunden beendet. Aktivieren Sie es in Zammads Admin
Schnittstelle unter *System > Wartung*.

## Schritt 4: Deaktivieren Sie Ihre Kommunikationskanäle

Das Wiederherstellungsskript startet Zammad automatisch. Das Deaktivieren
trägt dazu bei, Datenverluste und Inkonsistenzen zu vermeiden.

## Schritt 5: Zammad beenden und deaktivieren

Stellen Sie sicher, dass keine Daten *vor* der Sicherung geändert werden.

```sh
systemctl disable zammad
```
```sh
systemctl stop zammad
```

## Schritt 6: Sicherung

Folgen Sie der [Backup Anleitung](/de/tutorials/backup-restore#), um Ihre
Sicherung zu erstellen.

Merken Sie sich, ob Sie ein vollständigen Dateisystem-Dump erstellt oder nur
Ihre Daten gesichert haben. Dies ist für die Wiederherstellung wichtig.

Wenn Sie den einfachsten Weg gehen wollen, erwägen Sie nur Ihre Daten zu
sichern.

## Schritt 7: Transfer der Backup Dateien

Speichern Sie Ihre Sicherungsdateien in einem Verzeichnis und geben Sie den
Pfad in der Datei `config` an. Unter
[Backup-Konfiguration](/de/tutorials/backup-restore#backup-konfiguration)
erfahren Sie, wie Sie die Konfigurationsdatei an Ihre Bedürfnisse anpassen
können.

## Schritt 8: Wiederherstellung der Sicherung

Folgen Sie der
[Wiederherstellungsanleitung](/de/tutorials/backup-restore#backup-wiederherstellen)
bis einschließlich "Backup wiederherstellen", um die Sicherung auf dem neuen
Host wiederherzustellen.

Stellen Sie sicher, dass Sie Zammad nach Abschluss der Wiederherstellung
beenden.

## Schritt 9: Erforderliche Wartungsaufgaben nach der Wiederherstellung ausführen

Nach erfolgreicher Wiederherstellung fahren Sie bitte unten fort, abhängig
davon, ob Sie nur Ihre Daten gesichert haben oder eine vollständige
Dateisystem-Sicherung haben.

### Daten-Sicherung

#### Schritt 9.1: Löschen Sie den Cache

```sh
zammad run rails r "Rails.cache.clear"
```

### Vollständige Dateisystem-Sicherung

::: info
Dieser Schritt ist nur erforderlich, wenn einer der folgenden Punkte erfüllt ist:

- Die Quell- und Zielversion von Zammad sind nicht identisch
- Die Zammad-Installation ist keine Quellcode-Installation
- Das Zammad-Backup ist kein Export von unserer gehosteten Installation

Vollständige Sicherungen für Quellcode-Installationen sind jedoch nicht abgedeckt,
Grundsätzlich gilt für Sie das Gleiche wie unten: Sie müssen sicherstellen, dass die
Umgebungen und Anwendungsdateien mit der neuen / richtigen
Version überschrieben werden.

Zammad-Dateien sind distributions- und versionsspezifisch!
:::

#### Schritt 9.1: Deinstallation und Neuinstallation von Zammad ohne Auflösen der Abhängigkeiten

::: tabs

=== Debian & Ubuntu

```sh
dpkg -r --force-depends zammad
```
```sh
apt install zammad
```

=== OpenSUSE

``` sh
zypper remove -R zammad
```
```sh
zypper install zammad
```
:::

::: tip
You're unsure if above is really required and a mere reinstall would be
enough? If you run a dedicated install command on for Zammad and receive
the following, you absolutely have to run above to fix your
installation.

``` sh
root@zammad:/# apt-get update && apt install zammad
  Reading package lists... Done
  Building dependency tree
  Reading state information... Done
  zammad is already the newest version (x.x.x-xxxxxx.xxxxxx.xxx).
  0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```
:::


#### Step 9.2: Clear the Cache

```sh
zammad run rails r "Rails.cache.clear"
```

#### Step 9.3: Ensure Zammad is Running

``` sh
systemctl status zammad
```

If Zammad is not running, run:
```sh
systemctl start zammad
```
:::tip
Migrated from Zammad SaaS or switching provider?

Please make sure that your email notification channel and
FQDN configuration is correct.
:::

## Step 10: Apply Missing Environmental Settings

If you've set any environmental settings please re-apply your settings now.
You backed them up in [Step
1](#step-1-note-down-your-environmental-adjustments).

If not already done, please [install
Elasticsearch](/en/tutorials/install-elasticsearch) now and perform the
steps to [connect to and configure
Elasticsearch](/en/tutorials/connect-config-elasticsearch) after
installation.

## Step 11: Re-enable Channels and Deactivate Maintenance Mode

Set the previous deactivated channels back to active if you're sure
everything was successful. At this point Zammad will start to *change data*!

After verifying the functionality of your channels, allow your agents and
customers to log in again by disabling the maintenance mode.
