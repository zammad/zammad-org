---
order: 11
title: 'Zu Zammad migrieren'
---

# Zu Zammad migrieren

Sie können die folgenden Daten von einem anderen Ticket-System zu Zammad
migrieren:

- Tickets und ihre Artikel
- Gruppen / Warteschlangen
- Organisationen
- Agenten und Kunden (falls zutreffend)

Nach der Migration zu Zammad sollten Sie zunächst Ihre FQDN-Einstellungen und den HTTP-Typ
in der Verwaltungsoberfläche von Zammad unter _Einstellungen > System > Basis_ anpassen.
Dies ist wichtig, da der Einrichtungsassistent bei der Umstellung auf Zammad übersprungen wird.

Danach können Sie mit den [Ersten Schritten](/de/tutorials/first-steps)
fortfahren, um Zammad zu konfigurieren. Dies muss nach der Migration
durchgeführt werden.

## Allgemeine Einschränkungen

Es gibt einige allgemeine Einschränkungen, die Sie unten finden. Je nachdem,
von welchem System Sie kommen, kann es auch spezifische Einschränkungen
geben. Diese werden in den jeweiligen Abschnitten behandelt.

Allgemeine Einschränkungen für alle Migrationen:

- Migrationen sind nur auf neuen Instanzen möglich.
- Migrationen sind nur von einer Quelle aus möglich. Mehrere
  Migrationsquellen auf einer Instanz werden nicht unterstützt.
- Zammad kann keine Objekttypen migrieren, die es nicht kennt, Migrationen
  werden fehlschlagen.
- Zammad migriert alles oder nichts. Das bedeutet, dass Sie bestimmte
  Informationen aus Gruppen, Tickets oder Benutzer nicht abwählen können.

## Spezifische Migrationsanleitungen

:::info

**Missing a migration source?**

If your system it not mentioned yet, you'll have two options. You can either
use Zammad's powerful API or drop our
[sales team a message](https://zammad.com/en/company/contact){target=_blank} for a custom
development or even migrator sponsoring.

Migrations are available for hosted setups too! Contact support for further
information!
:::

### Freshdesk

#### Einschränkungen

Bitte beachten Sie die folgenden Freshdesk-spezifischen
Einschränkungen. Dies sind zusätzliche Einschränkungen zu den allgemein
aufgeführten.

- Differenzielle Migrationen werden nicht unterstützt! Im Allgemeinen wird
  empfohlen, vorher einen Testimport durchzuführen, um zu erfahren, wie
  lange die Migration dauern wird.
- Wichtig: Bitte beachten Sie, dass die Migrationsgeschwindigkeit stark von
  Ihrem Freshdesk-Tarif abhängt (es gibt API-Beschränkungen).
- Aufgrund von API-Beschränkungen zeigt Zammad nicht die Gesamtzahl der zu
  importierenden Objekte an, sondern korrigiert sie in 100er-Schritten.
- Ihr Freshdesk-Tarif muss API-Unterstützung bieten. Dies gilt
  möglicherweise nicht für alle verfügbaren Tarife.
- Die Passwörter der Benutzer werden nicht migriert und der Benutzer muss
  den Link zum Zurücksetzen des Passworts auf der Anmeldeseite von Zammad
  verwenden.

#### Voraussetzungen

Zammad erfordert API-Zugriff, weshalb Sie für die Migration einen
[API-Schlüssel](https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key){target=_blank}
erstellen müssen. Der Migrator wird Ihre Freshdesk-Subdomain und Ihren
API-Schlüssel anfordern.

:::warning
Stellen Sie sicher, dass Sie den API-Schlüssel mit einem vollständigen Administratorkonto abrufen. Weniger
privilegierte Benutzer führen zu einer fehlerhaften Migration.
:::

#### Import

Im Allgemeinen haben Sie zwei Möglichkeiten, wie Sie Daten migrieren
können. Wenn Sie eine ziemlich große Instanz mit vielen Daten haben, sollten
Sie die Konsole der Browser-Version vorziehen.

::::tabs

=== Per Browser

Nach der Installation von Zammad und der
[Konfiguration des Webservers](./webserver-config) rufen Sie
den FQDN in Ihrem Browser auf und folgen dem Migrations-Assistenten. Sie finden
diesen im Login-Screen, indem Sie auf den Link "Oder migrieren Sie von einem anderen System"
unten klicken.

Abhängig von der Anzahl der Benutzer, Tickets und Ihres Freshdesk-Plans kann dies
eine Weile dauern.

Sehen Sie die Meldung "_Interrupted by scheduler restart. Please restart manually
or wait till next execution time._"?

Falls diese Meldung erscheint, nachdem Sie Ihre Zugangsdaten eingegeben haben, haben Sie
bitte ein wenig Geduld. Die Migration sollte innerhalb von 5 Minuten starten.

Falls Sie diese Meldung erscheint, nachdem die Migration bereits begonnen hat, sollten Sie
es per Konsole versuchen und Ihre Installation zurücksetzen.

=== Per Konsole

Konsole öffnen:

```sh
zammad run rails c
```

Variablen angeben:

```sh
subdomain = '{freshdesk subdomain}.freshdesk.com'
```

```sh
token = '{freshdesk token}'
```

Zammad-Einstellungen für Freshdesk-Import aktualisieren:

```sh
Setting.set('import_freshdesk_endpoint', "https://#{subdomain}/api/v2")
```

```sh
Setting.set('import_freshdesk_endpoint_key', token)
```

```sh
Setting.set('import_backend', 'freshdesk')
```

```sh
Setting.set('import_mode', true)
```

Prüfen Sie die Einstellungen in einem Testlauf:

```sh
Sequencer.process('Import::Freshdesk::ConnectionTest')
```

Auführen der Migration:

```sh
job = ImportJob.create(name: 'Import::Freshdesk')
```

```sh
AsyncImportJob.perform_later(job)
```

:::tip

Möchten Sie den Fortschritt der Migration verfolgen?

Verwenden Sie

```sh
pp ImportJob.find_by(Name: 'Import::Freshdesk')
```

Damit erhalten Sie eine Ausgabe des aktuellen Status der Aufgabe.

:::
::::

#### Nach der Migration

Führen Sie die folgenden Befehle aus:

```sh
Setting.set('import_mode', false)
```

```sh
Setting.set('system_init_done', true)
```

```sh
Rails.cache.clear
```

Melden Sie sich mit dem Benutzer an, dessen API-Token Sie genutzt
haben. Melden Sie sich mit der E-Mail-Adresse und dem API-Token des
Administrators an.

Alle anderen Benutzer müssen die Funktion zum Zurücksetzen des Passworts
oder Anmeldemethoden wie LDAP oder One-Click-Logins verwenden.

### Kayako

Bitte beachten Sie die folgenden Freshdesk-spezifischen
Einschränkungen. Dies sind zusätzliche Einschränkungen zu den allgemein
aufgeführten.

- Differenzielle Migrationen werden nicht unterstützt! Im Allgemeinen wird
  empfohlen, vorher einen Testimport durchzuführen, um zu erfahren, wie
  lange die Migration dauern wird.
- Selbst gehostete Installationen (Kayako classic) werden nicht unterstützt.
- Die folgenden Anpassungen der Ticket-Felder werden ignoriert (betrifft den
  "Scale"-Tarif):
  - Benutzerdefinierte Ticket-Status
  - Benutzerdefinierte Ticket-Prioritäten
  - Benutzerdefinierte Ticket-Typen
- Wichtig: Bitte beachten Sie, dass die Migrationsgeschwindigkeit stark von
  Ihrem Kayako-Tarif abhängt (es gelten API-Beschränkungen).
- Ihr Kayako-Tarif muss API-Unterstützung bieten. Dies gilt möglicherweise
  nicht für alle verfügbaren Tarife.
- Die Passwörter der Benutzer werden nicht migriert und der Benutzer muss
  den Link zum Zurücksetzen des Passworts auf der Anmeldeseite von Zammad
  verwenden.

#### Voraussetzungen

Zammad benötigt API-Zugang, weshalb der Migrator Ihre Kayako-URL, Ihre
E-Mail-Adresse und Ihr Passwort abfragt.

:::warning
Stellen Sie sicher, dass Sie ein Benutzerkonto mit vollen administrativen Rechten zur Verfügung stellen. Weniger
privilegierte Benutzer führen zu einer fehlerhaften Migration.
:::

#### Import

Im Allgemeinen haben Sie zwei Möglichkeiten, wie Sie Daten migrieren
können. Wenn Sie eine ziemlich große Instanz mit vielen Daten haben, sollten
Sie die Konsole der Browser-Version vorziehen.

::::tabs

=== Per Browser

Nachdem Sie Zammad installiert und Ihren
[Webserver konfiguriert haben](/de/tutorials/webserver-config), öffnen Sie
den FQDN Ihres Zammads im Browser und folgen Sie dem Migrations-Assistenten.
Sie können diesen unten im Login Screen finden, indem Sie
"Oder migrieren Sie von einem anderen System" anklicken.

Abhängig von den vorhandenen Benutzern, Tickets und des Kayako-Tarifs kann dies eine Weile dauern.

Erscheint die Meldunge "*Interrupted by scheduler restart. Please restart manually
or wait till next execution time.*"?

Falls diese Meldung erscheint, nachdem Sie Ihre Zugangsdaten eingegeben haben, haben Sie
bitte ein wenig Geduld. Die Migration sollte innerhalb von 5 Minuten starten.

Falls Sie die Meldung erhalten haben, nachdem die Migration begonnen hat, sollten
Sie die Migration per Konsole versuchen und Ihre Installation zurücksetzen.

=== Per Console

Konsole öffnen:

```sh
zammad run rails c
```

Variablen setzen:

```sh
subdomain = '{kayako subdomain}.kayako.com'
```

```sh
email = '{kayako admin email address}'
```

```sh
password = '{kayako admin password}'
```

Zammad-Einstellungen für Kayako-Import anpassen:

```sh
Setting.set('import_kayako_endpoint', "https://#{subdomain}/api/v1")
```

```sh
Setting.set('import_kayako_endpoint_username', email)
```

```sh
Setting.set('import_kayako_endpoint_password', password)
```

```sh
Setting.set('import_backend', 'kayako')
```

```sh
Setting.set('import_mode', true)
```

Prüfen Sie Ihre Konfiguration mit einem Testlauf:

```sh
Sequencer.process('Import::Kayako::ConnectionTest')
```

Ausführen der Migration:

```sh
job = ImportJob.create(name: 'Import::Kayako')
```

```sh
AsyncImportJob.perform_later(job)
```

:::tip

Möchten Sie den Fortschritt der Migration verfolgen?

Verwenden Sie

```sh
pp ImportJob.find_by(Name: 'Import::Kayako')
```

Damit erhalten Sie eine Ausgabe des aktuellen Status der Aufgabe.

:::
::::

#### Nach der Migration

Führen Sie die folgenden Befehle aus:

```sh
Setting.set('import_mode', false)
```

```sh
Setting.set('system_init_done', true)
```

```sh
Rails.cache.clear
```

Melden Sie sich mit dem Benutzer an, dessen Zugangsdaten Sie angegeben
haben. Verwenden Sie die E-Mail Adresse und das Passwort des Administrators,
mit dem Sie die Migration durchgeführt haben.

Alle anderen Benutzer müssen die Funktion zum Zurücksetzen des Passworts
oder Anmeldemethoden wie LDAP oder One-Click-Logins verwenden.

### OTRS

#### Einschränkungen

Zusätzliche Einschränkungen zu den allgemeinen:

- Unterstützte OTRS Versionen sind: 3.1 - 6.x
- Die Passwort-Migration funktioniert nur für OTRS >= 3.3 (auf älteren
  Instanzen ist ein Passwort-Reset in Zammad erforderlich)
- Wenn Sie vorhaben, einen differentiellen Import nach der Hauptmigration
  vorzunehmen, ändern Sie keine Daten in Zammad!
- Nur Kunden von Tickets werden importiert
- Zammad erwartet, dass Ihre OTRS-Zeitstempel UTC sind und wird sie nicht
  anpassen

#### Voraussetzungen

Installieren Sie Znuny4OTRS-Repo:

:::tabs key:otrs

=== OTRS 6

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-6.0.76.opm
```

=== OTRS 5

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-5.0.56.opm
```

=== OTRS 4

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-4.0.25.opm
```

=== OTRS 3

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-3.3.2.opm
```

:::

Installieren Sie das OTRS Migrations-Plugin:

:::tabs key:otrs

=== OTRS 6

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-6.0.7.opm
```

=== OTRS 5

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-5.0.4.opm
```

=== OTRS 4

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-4.1.12.opm
```

=== OTRS 3

```plain
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-3.0.33.opm
```

:::

::: tip
In einigen Fällen kann ein Neustart des Webservers helfen, interne Serverfehler zu beheben.
:::

#### Import

:::tabs

=== Per Browser

Nach der Installation von Zammad und der
[Konfiguration Ihres Webservers](/de/tutorials/webserver-config), navigieren Sie zu
Zammads FQDN in Ihrem Browser und folgen Sie dem Assistenten für die Migration. Sie finden
ihn im Anmeldebildschirm, indem Sie auf den Link "Oder von einem anderen System migrieren"
am unteren Rand klicken.

Abhängig von der Größe Ihrer OTRS-Installation kann dies eine Weile dauern. In einem solchen
sollten Sie die Migration per Konsole verwenden. Dies gilt auch,
 wenn Sie während der Migration Timeouts feststellen.


=== Per Konsole

Öffnen Sie die Konsole:

```sh
zammad run rails c
```

Variablen setzen (stellen Sie sicher, dass Sie *xxx* durch passende Werte ersetzen):


```sh
Setting.set('import_otrs_endpoint', 'https://xxx/otrs/public.pl?Action=ZammadMigrator')
```

```sh
Setting.set('import_otrs_endpoint_key', 'xxx')
```

```sh
Setting.set('import_mode', true)
```

Eine vollständige Migration durchführen:

```sh
Import::OTRS.start
```

Führen Sie eine differenzielle Migration durch (nur möglich nach Abschluss einer früheren vollständigen
Migration):

Alle Schritte ab "Variablen setzen" +

```sh
Setting.set('system_init_done', false)
```

```sh
Import::OTRS.diff_worker
```

:::

#### Nach der Migration

Führen Sie die folgenden Befehle aus:

```sh
Setting.set('import_mode', false)
```

```sh
Setting.set('system_init_done', true)
```

```sh
Rails.cache.clear
```

### Zendesk

#### Einschränkungen

Zusätzliche Einschränkungen zu den allgemeinen:

- Differenzielle Migrationen werden nicht unterstützt! Im Allgemeinen wird
  empfohlen, vorher einen Testimport durchzuführen, um zu erfahren, wie
  lange die Migration dauern wird.
- Wichtig: Bitte beachten Sie, dass die Migrationsgeschwindigkeit stark von
  Ihrem Zendesk-Tarif abhängt (es gelten API-Beschränkungen).
- Ihr Zendesk-Tarif muss API-Unterstützung bieten. Dies ist möglicherweise
  nicht in allen Tarifen der Fall.
- Die Passwörter der Benutzer werden nicht migriert und der Benutzer muss
  den Link zum Zurücksetzen des Passworts auf der Anmeldeseite verwenden.
- Objekte mit kyrillischen Zeichen können nicht migriert werden. Stellen Sie
  sicher, dass Sie sie umbenennen, bevor Sie die Migration starten.

#### Voraussetzungen

Zammad erfordert einen API-Zugang, weshalb Sie für die Migration einen
[API-Schlüssel](https://support.zendesk.com/hc/en-us/articles/4408889192858-Generating-a-new-API-token){target=_blank}
erstellen müssen. Die Migration wird Ihre Zendesk-URL, Ihre E-Mail-Adresse
und Ihren API-Schlüssel abfragen.

:::warning
Stellen Sie sicher, dass Sie den API-Schlüssel mit einem vollständigen Administratorkonto abrufen. Weniger
privilegierte Benutzer führen zu einer fehlerhaften Migration.
:::

#### Import

Im Allgemeinen haben Sie zwei Möglichkeiten, wie Sie Daten migrieren
können. Wenn Sie eine ziemlich große Instanz mit vielen Daten haben, sollten
Sie die Konsole der Browser-Version vorziehen.

::::tabs

=== Per Browser

Nach der Installation von Zammad und der
[Konfiguration Ihres Webservers](/de/tutorials/webserver-config) rufen Sie
Zammads FQDN in Ihrem Browser auf und folgen dem Assistenten für die Migration. Sie finden
ihn im Anmeldebildschirm, indem Sie auf den Link "Oder von einem anderen System migrieren"
am unteren Rand klicken.

Je nach Anzahl der Benutzer, Tickets und des Zendesk-Tarifs kann dies eine
eine Weile dauern.

=== Per Konsole

Öffnen Sie die Konsole:

```sh
zammad run rails c
```

Variablen setzen:

```sh
subdomain = '{zendesk url}'
```

```sh
email = '{zendesk admin email-Adresse}'
```

````sh
token = '{zendesk token}'

```

Zammad-Einstellungen aktualisieren:

```sh
Setting.set('import_zendesk_endpoint', "https://#{subdomain}/api/v2")
```

```sh
Setting.set('import_zendesk_endpoint_username', email)
```

````sh
Setting.set('import_zendesk_endpoint_key', token)
```

````sh
Setting.set('import_backend', 'zendesk')
```

````sh
Setting.set('import_mode', true)
```

Überprüfen Sie Ihre Konfiguration in einem Testlauf:

```sh
Sequencer.process('Import::Zendesk::ConnectionTest')
```

Führen Sie die Migration aus:

```sh
Aufgabe = ImportJob.create(Name: 'Import::Zendesk')
```

```sh
AsyncImportJob.perform_later(aufgabe)
```

:::tip

Möchten Sie den Fortschritt der Migration verfolgen?

Verwenden Sie

```sh
pp ImportJob.find_by(Name: 'Import::Freshdesk')
```

Damit erhalten Sie eine Ausgabe des aktuellen Status der Aufgabe.

:::

::::

#### Nach der Migration

Führen Sie die folgenden Befehle aus:

```sh
Setting.set('import_mode', false)
```

```sh
Setting.set('system_init_done', true)
```

```sh
Rails.cache.clear
```

Melden Sie sich mit dem Benutzer an, dessen API-Token Sie genutzt
haben. Melden Sie sich mit der E-Mail-Adresse und dem API-Token des
Administrators an.

Alle anderen Benutzer müssen die Funktion zum Zurücksetzen des Passworts
oder Anmeldemethoden wie LDAP oder One-Click-Logins verwenden.
