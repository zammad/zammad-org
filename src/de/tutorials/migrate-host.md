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
Sie sind sich nicht sicher, ob die oben genannten Maßnahmen wirklich erforderlich sind oder eine einfache Neuinstallation
ausreicht? Wenn Sie einen Installationsbefehl für Zammad ausführen und
die folgende Meldung erhalten, müssen Sie unbedingt den obigen Befehl ausführen, um Ihre
Installation zu reparieren.

``` sh
root@zammad:/# apt-get update && apt install zammad
  Reading package lists... Done
  Building dependency tree
  Reading state information... Done
  zammad is already the newest version (x.x.x-xxxxxx.xxxxxx.xxx).
  0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```
:::


#### Schritt 9.2: Löschen des Cache

```sh
zammad run rails r "Rails.cache.clear"
```

#### Schritt 9.3: Sicherstellen, dass Zammad ausgeführt wird

``` sh
systemctl status zammad
```

Wenn Zammad nicht läuft, führen Sie aus:
```sh
systemctl start zammad
```
:::tip
Von Zammad SaaS migriert oder den Anbieter gewechselt?

Bitte stellen Sie sicher, dass Ihr E-Mail-Benachrichtigungskanal und Ihre
FQDN-Konfiguration korrekt sind.
:::

## Schritt 10: Fehlende Umgebungseinstellungen übernehmen

Wenn Sie irgendwelche Umgebungseinstellungen vorgenommen haben, wenden Sie
diese jetzt wieder an.  Sie haben sie in [Schritt
1](#step-1-note-down-your-environmental-adjustments) gesichert.

Falls noch nicht geschehen, [installieren Sie
Elasticsearch](/de/tutorials/install-elasticsearch) und führen Sie nach der
Installation die Schritte für [verbinden und konfigurieren von
Elasticsearch](/de/tutorials/connect-config-elasticsearch) aus.

## Schritt 11: Kanäle wieder aktivieren und den Wartungsmodus deaktivieren

Setzen Sie die zuvor deaktivierten Kanäle wieder auf aktiv, wenn Sie sicher
sind, dass alles erfolgreich war. An diesem Punkt beginnt Zammad damit
*Daten zu ändern*!

Nachdem Sie die Funktionalität Ihrer Kanäle überprüft haben, erlauben Sie
Ihren Agenten und Kunden, sich wieder anzumelden, indem Sie den
Wartungsmodus deaktivieren.
