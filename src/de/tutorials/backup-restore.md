---
order: 4
title: 'Sichern & Wiederherstellen'
---

# Sichern & Wiederherstellen

Zammad liefert Skripte zur Sicherung und Wiederherstellung bei
Paket-Installationen mit, die Sie verwenden können.

:::warning
Diese Skripte sind ohne jegliche Garantie und funktionieren möglicherweise nicht in Ihrem speziellen
Anwendungsfall. Dies hängt von der Konfiguration und dem Installationstyp Ihrer
Instanz ab.

Sie sollten die Funktionalität immer regelmäßig testen und überprüfen! Falls eine
Funktionalität oder der Umfang in Ihrem Fall nicht funktioniert, können Sie diese Skripte
an einen unabhängigen Ort kopieren und nach Bedarf anpassen.
:::

Es gibt einige Einschränkungen, die Sie kennen sollten:

- Diese Skripte funktionieren nicht in Container-basierten Installationen.
- Sie funktionieren nur für PostgreSQL-Installationen.
- Bei der Sicherung handelt es sich immer um einen vollständigen Dump (keine
  inkrementelle Sicherung).
- Eine partielle Sicherung und Wiederherstellung (z.B. nur bestimmter Daten
  wie Tickets, Benutzer) ist nicht möglich.
- Ein Wechsel des Datenbanksystems ist nicht möglich.
- Systemeinstellungen (wie Umgebungsvariablen) werden nicht gesichert.
- Eine Wiederherstellung in einer älteren Zammad-Version ist nicht möglich.
- Stellen Sie Sicherungsdateien aus benutzerdefinierten Skripten nicht mit
  den Standard-Skripten von Zammad wieder her. Dies könnte Probleme
  verursachen.

## Schnellstart

Die Skripte befinden sich in `/opt/zammad/contrib/backup`. Die folgenden
Dateien sind relevant:

- Konfigurationsdatei für Sicherungen: `config.dist`
- Skript zum Sichern Ihrer Daten: `zammad_backup.sh`
- Skript zum Wiederherstellen Ihrer Daten: `zammad_restore.sh`

Gehen Sie wie folgt vor, um eine Sicherung auf Basis einer
Standardkonfiguration durchzuführen:

1. Kopieren Sie die Datei `config.dist` nach `config`.
1. Ändern Sie bei Bedarf die Standardparameter in der
   Konfigurationsdatei. Siehe [Backup-Konfiguration](#backup-konfiguration)
   für Details.
1. Zammad stoppen `systemctl stop zammad`
1. Ausführen von `/opt/zammad/contrib/backup/zammad_backup.sh` (als `root`
   oder `zammad` Benutzer)

## Backup-Konfiguration

Einzelheiten zu den Konfigurationsparametern mit Standardwerten finden Sie
weiter unten.

`BACKUP_DIR` <Badge type="info" text="/var/tmp/zammad_backup"/>
: Verzeichnis, in das das Skript die Sicherungsdateien schreibt. Das Verzeichnis wird
  erstellt, wenn es nicht existiert. Stellen Sie sicher, dass Sie genügend Speicherplatz haben, da das
  Skript vollständige Dumps schreibt.

`HOLD_DAYS` <Badge type="info" text="10"/>
: Legen Sie fest, wie viele Tage das Backup-Skript alte Backups aufbewahren soll. Dieser Wert
  enthält aus Sicherheitsgründen eine 60-minütige Karenzzeit (z.B. 10 Tage plus 1 Stunde).
  Alte Backups werden vor der Erstellung eines neuen Backups entfernt.

  Beispiele:
    - `1` behält Backups der letzten 25 Stunden
    - `-1` entfernt alle vorhandenen Sicherungen (außer der neuen)

`FULL_FS_DUMP` <Badge type="info" text="yes"/>
:   - `yes`: die Sicherung umfasst auch Anwendungsdateien.
    - `no`: das Backup enthält nur Benutzerdaten.

  In jedem Fall umfasst sie die Datenbank von Zammad und die Anhänge, wenn Sie
  diese im Dateisystem gespeichert haben. Wenn Sie unsicher sind, setzen Sie dies auf nein.

``DEBUG`` <Badge type="info" text="no"/>
: Wenn Sie diese Option auf ``yess`` setzen, werden nützliche Debug-Meldungen ausgegeben.
  :::warning
  Diese Option gibt potenziell sensible Informationen über die Standardausgabe aus! Verwenden Sie
  diese Option nicht in Produktivumgebungen oder schalten Sie sie nach dem
  testen wieder ab.
  :::

## Sicherungen wiederherstellen

### Wichtige Informationen

Bitte lesen Sie die folgenden Informationen sorgfältig durch, bevor Sie mit
der Wiederherstellung Ihrer Daten beginnen.

- This section is **not** about **migrating from one host to another**. You
  can find instructions about this topic on the [Migrate Zammad
  page](migrate-host).
- Diese Anleitung setzt eine vollständig installierte Zammad-Version voraus
- Außerdem wird erwartet, dass Sie Zammad auf demselben Host und derselben
  Zammad-Version wiederherstellen
- Der Wiederherstellungsprozess stoppt Zammad an und startet es neu. Daher
  müssen Sie das Wiederherstellungsskript mit den entsprechenden Rechten
  (z.B. als root) ausführen.
- PostgreSQL-basierte Installationen löschen und erstellen die Datenbank
  neu!
- Es ist mindestens die doppelte Größe der Sicherung als freier
  Speicherplatz erforderlich. Wenn Sie nur den Dump haben, könnte der Faktor
  3 eine gute Zahl sein.

:::tip
Wenn Ihr Szenario anders ist als oben beschrieben, konsultieren Sie bitte die
[Zammad Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank} oder erwägen Sie
[bezahlte Support-Optionen](https://zammad.com/de/services/professional-services){target=_blank}.
:::

### Kopieren von Sicherungsdateien an einen passenden Ort

Stellen Sie sicher, dass der Benutzer, den Sie für die Wiederherstellung
verwenden, berechtigt ist, die Sicherungsdateien zu lesen und in
`/opt/zammad/` zu schreiben.

Die Zammad-Sicherung besteht aus zwei Dateien. Sie sind wie folgt benannt:

```plain
<timestamp>_zammad_db.psql.gz
<timestamp>_zammad_files.tar.gz
```

Es gibt auch zwei Symlinks in Ihrem Backup-Verzeichnis, die auf das zuletzt
erstellte Backup verweisen:

```plain
latest_zammad_db.psql.gz
latest_zammad_files.tar.gz
```

Kopieren Sie diese an einen passenden Ort, der für den Benutzer, der das
Wiederherstellungsskript ausführt, zugänglich ist.

### Backup-Skript konfigurieren

Bei einer Neuinstallation ist dies erforderlich. Sie müssen mindestens ein
Verzeichnis angeben, in dem Ihre Backups gespeichert werden. Siehe
[Backup-Konfiguration](#backup-konfiguration) für weitere Informationen.

### Die Wiederherstellung ausführen

Beachten Sie, dass das Wiederherstellen von Sicherungskopien Ihre `database.yml` überschreiben kann. Sie können
dies überprüfen, indem Sie in die Datei `[...]_zammad_files.tar.gz` schauen. Wenn es
die Datei `database.yml` im Verzeichnis _config > database_ gibt, stellen Sie sicher, dass Sie die
Originalversion **vor dem Wiederherstellen** sichern.

Die Wiederherstellung kann auf zwei Arten erfolgen, je nachdem, wie
interaktiv Sie vorgehen möchten:

::::tabs

=== Interaktive Wiederherstellung (empfohlen)
Führen Sie das Skript aus:

```sh
/opt/zammad/contrib/backup/zammad_restore.sh
```

Geben Sie dem Skript die angeforderten Informationen und warten Sie, bis die Wiederherstellung
beendet ist. Abhängig von der Größe des Backups und der Leistung des Rechners
kann dies einige Zeit dauern.

=== Nicht-interaktive Wiederherstellung

:::warning
Verwenden Sie die folgende Option nur, wenn Sie wissen, was Sie tun! Der folgende
Befehl überschreibt vorhandene Daten ohne weitere Rückfragen!
:::
Beim Aufruf mit einem Zeitstempel-Argument (das mit dem Dateinamen des Backups übereinstimmt),
beginnt Zammad sofort mit der Wiederherstellung des angegebenen Backups.

```sh
/opt/zammad/contrib/backup/zammad_restore.sh 20170507121848
```

::::

Das Ergebnis sollte wie folgt aussehen:

```ansi
# Zammad restore started - Fri Jan 21 17:54:13 CET 2022!

The restore will delete your current database!
Be sure to have a backup available!

Please ensure to have twice the storage of the uncompressed backup size!

Note that the restoration USUALLY requires root permissions as services are stopped!

Enter 'yes' if you want to proceed!
Restore?: yes
Enter file date to restore:
20220120124714
20220121175344
File date: 20220121175344
Enter db date to restore:
20220120124714
20220121175344
DB date: 20220121175344
# Stopping Zammad
# Checking requirements
# ... Dropping current database zammad
Dropped database 'zammad'
# ... Creating database zammad for owner zammad
CREATE DATABASE
# Restoring PostgreSQL DB
# Restoring Files
# Ensuring correct file permissions ...
# Clearing Cache ...
# Starting Zammad

# Zammad restored successfully - Fri Jan 21 17:54:34 CET 2022!
```

### Zusätzliche Schritte

- Falls Sie irgendwelche Umgebungseinstellungen vorgenommen haben, wenden
  Sie diese jetzt an.
- Falls noch nicht geschehen, [installieren Sie jetzt
  Elasticsearch](/de/tutorials/install-elasticsearch).
- [Verbinden Sie Elasticsearch mit Zammad und bauen Sie den Suchindex neu
  auf](/de/tutorials/connect-config-elasticsearch). Der Neuaufbau kann
  gefahrlos während der Arbeit durchgeführt werden, führt aber zu einer
  verminderten Suchleistung und kann zu vorübergehend nicht gefundenen Daten
  führen.

## Fehlerbehebung Sicherung & Wiederherstellung

Nachstehend finden Sie einige häufig auftretende Probleme. Falls Ihr Problem
nicht aufgeführt ist, wenden Sie sich bitte an die [Zammad
Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank},
um nach Unterstützung zu fragen.

### Exit Codes

Unsere Sicherungs- und Wiederherstellungsskripte enthalten Exit-Codes, die
Ihnen helfen, eine Lösung zu finden. Eine vollständiges Handling aller
Fehler können wir jedoch nicht garantieren.

Neben den Exit-Codes gibt es auch Fehlermeldungen, die über standard out
ausgegeben werden.

| Code | Beschreibung / Situation |
|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0` | Das Skript wurde erfolgreich beendet (oder der Fehler wird nicht abgedeckt).                                                                                                                        |
| `1` | Dies ist ein allgemeiner Fehler. Wird meist für Skriptabbrüche aufgrund von falschen oder fehlenden Informationen verwendet.                                                               |
| `2` | Es gab einen Fehler im Zusammenhang mit der Datenbank. Dies geschieht in der Regel entweder, wenn Ihr Datenbankserver die Anforderungen des Skripts nicht erfüllt, wenn die Anmeldedaten ungültig sind oder wenn Datenbank-Dumps "kaputt" sind. |
| `3` | Es gab Probleme mit Datei-/Ordnerberechtigungen.                                                                                                                                      |

### Häufige Probleme

#### Password Authentication Failed / Peer Authentication Failed

Dies deutet darauf hin, dass das Passwort Ihres Zammad DB Benutzers entweder
nicht mit Ihrer `database.yml` übereinstimmt oder der falsche
Datenbankserver kontaktiert wurde.

Wenn Ihre Zammad-Instanz läuft, kann dies durch einen Rückfall auf eine
Socket-Verbindung verursacht werden, weshalb Sie es nicht bemerkt haben.

**Was ist zu tun?**

Vergewissern Sie sich, dass die angegebenen Zugangsdaten des Benutzers
korrekt sind. Sie können auch das Skript `reset_db_password` verwenden, das
Sie im Backup-Verzeichnis finden.

#### Ident Authentication Failed for User

Dies bedeutet, dass Ihr Datenbankserver eine `ident`-Authentifizierung
erfordert.  Diese Authentifizierungsmethode wird von unseren Skripten nicht
unterstützt.

**Was ist zu tun?**

Überprüfen Sie die `pg_hba.conf` Ihres PostgreSQL-Servers und passen Sie sie
bei Bedarf an.

In der Regel kann die Authentifizierung auf diese Weise zugelassen werden:

```sh
# DIES IST EIN BEISPIEL UND PASST MÖGLICHERWEISE NICHT ZU IHRER UMGEBUNG
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

Bitte konsultieren Sie dazu die offizielle
[PostgreSQL-Dokumentation](https://www.postgresql.org/docs/){target=_blank},
da dies nicht Gegenstand dieser Dokumentation ist.

#### WARNING: You don't Seem to Have Any Attachments in the File System

Dies bedeutet, dass Ihre Instanz derzeit keine Anhänge im Dateisystem
speichert.

Diese Warnung wird einmal angezeigt, bevor ein leeres Verzeichnis erstellt
wird, damit der Sicherungsvorgang erfolgreich fortgesetzt werden kann.

Check and adjust your
[storage settings via console](/en/reference/console#storage-provider-setting)
or in Zammad's admin interface under _Settings > System > Storage_.

## Hilfsskript

### Warnung

Ein Skript kann potenziell zerstörerisch sein! Sie sollten **niemals**
Skripte ausführen, deren Anwendungsbereich Sie nicht verstehen.

Seien Sie sich bewusst, dass Sie diese Skripte auf eigenes Risiko ausführen.

### Datenbank Hilfsskript: Passwort (neu) setzen

#### Einschränkungen

- Dieses Skript ist nur für PostgreSQL-Installationen geeignet.
- Es werden nur lokale Datenbankserver unterstützt (Skript ändert Benutzer).
- Dieses Skript muss als `root` oder als ähnlich privilegierter Benutzer
  ausgeführt werden.
- Beachten Sie, dass das Skript Zammad automatisch stoppt und startet!

#### Scopes

Anwendungsbereiche dieses Skripts sind hauptsächlich Paket-Installationen
und dabei insbesondere CentOS und SUSE Betriebssysteme. Es könnte auch bei
Quellcode-/Entwicklungsinstallationen funktionieren, aber das hängt stark
von Ihrer Einrichtung ab und ist nicht Gegenstand dieser Dokumentation.

#### Funktionsweise

Das Skript führt die folgenden Aktionen je nach Situation automatisch für
Sie aus. Vor der Ausführung von Aktionen wird es Sie um eine Bestätigung
bitten.

- Wenn `database.yml` eine leere Passwort-Zeile enthält, wird ein neues
  Passwort für den Datenbank Benutzer von Zammad generiert und
  festgelegt. Es wird auch in der Konfigurationsdatei gespeichert.
- Wenn `database.yml` ein Passwort enthält, wird es verwendet, um das
  Passwort des Benutzers der Datenbank Zammad festzulegen.

#### Verwendung

Führen Sie das Skript mit dem unten stehenden Befehl aus und folgen Sie den
Anweisungen. Es ist keine spezielle Konfiguration erforderlich.

```sh
/opt/zammad/contrib/backup/zammad_db_user_helper.sh
```

Wenn Fehler auftreten, versucht das Skript vor dem Beenden, Zammad wieder zu
starten.
