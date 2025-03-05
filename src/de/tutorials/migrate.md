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

After migrating to Zammad, you should first adjust your FQDN settings and HTTP
type in Zammad's admin interface under _Settings > System > Base_.
This is important because the getting started wizard is skipped by the
migration.

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

:::info Missing a migration source?

Wenn Ihr System noch nicht aufgeführt ist, haben Sie zwei Möglichkeiten. Sie können entweder
die leistungsstarke API von Zammad nutzen oder unserem
[Vertriebsteam eine Nachricht](https://zammad.com/de/company/contact){target=_blank} schicken für eine kundenspezifische
Entwicklung oder sogar für das Sponsoring eines Migrations-Features..

Migrationen sind auch für von Zammad gehostete Installationen verfügbar! Kontaktieren Sie den Support für weitere
Informationen!
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

=== Via Browser

After installing Zammad and
[configuring your webserver](./webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the number of users, tickets and Freshdesk plan this may take a
while.

Seeing the message "_Interrupted by scheduler restart. Please restart manually
or wait till next execution time._"?

If this message appears after providing your credentials, please be patient.
The migration should start within 5 minutes.

If you receive above message after the migration begun, please consider using
the console approach instead and reset the installation.

=== Via Console

Open console:

```sh
zammad run rails c
```

Set variables:

```sh
subdomain = '{freshdesk subdomain}.freshdesk.com'
```

```sh
token = '{freshdesk token}'
```

Update Zammad settings for freshdesk import:

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

Check your configuration in a dry run:

```sh
Sequencer.process('Import::Freshdesk::ConnectionTest')
```

Run the migration:

```sh
job = ImportJob.create(name: 'Import::Freshdesk')
```

```sh
AsyncImportJob.perform_later(job)
```

:::tip

Want to see the progress of the migration?

Use

```sh
pp ImportJob.find_by(name: 'Import::Freshdesk')
```

which gives you an output of the current state of the job.

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

=== Via Browser

After installing Zammad and
[configuring your webserver](/en/tutorials/webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the number of users, tickets and Kayako plan this may take a while.

Seeing the message "_Interrupted by scheduler restart. Please restart manually
or wait till next execution time._"?

If this message appears after providing your credentials, please be patient.
The migration should start within 5 minutes.

If you receive above message after the migration begun, please consider
using the console approach instead and reset the installation.

=== Via Console

Open console:

```sh
zammad run rails c
```

Set variables:

```sh
subdomain = '{kayako subdomain}.kayako.com'
```

```sh
email = '{kayako admin email address}'
```

```sh
password = '{kayako admin password}'
```

Update Zammad settings for Kayako import:

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

Check your configuration in a dry run:

```sh
Sequencer.process('Import::Kayako::ConnectionTest')
```

Run the migration:

```sh
job = ImportJob.create(name: 'Import::Kayako')
```

```sh
AsyncImportJob.perform_later(job)
```

:::tip

Want to see the progress of the migration?

Use

```sh
pp ImportJob.find_by(name: 'Import::Kayako')
```

which gives you an output of the current state of the job.

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

=== Via Browser

After installing Zammad and
[configuring your webserver](/en/tutorials/webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the size of your OTRS installation this may take a while. In such
a case, consider using the command line version of this feature. This also
applies if you experience timeouts during the migration.

=== Via Console

Open console:

```sh
zammad run rails c
```

Set variables (ensure to replace _xxx_ with your values):

```sh
Setting.set('import_otrs_endpoint', 'https://xxx/otrs/public.pl?Action=ZammadMigrator')
```

```sh
Setting.set('import_otrs_endpoint_key', 'xxx')
```

```sh
Setting.set('import_mode', true)
```

Run a full migration:

```sh
Import::OTRS.start
```

Run a differential migration (only possible after finishing an earlier full
migration):

All steps from "Set variables" +

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

=== Via Browser

After installing Zammad and
[configuring your webserver](/en/tutorials/webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the the number of users, tickets and Zendesk plan, this may take a
while.

=== Via Console

Open console:

```sh
zammad run rails c
```

Set variables:

```sh
subdomain = '{zendesk url}'
```

```sh
email = '{zendesk admin email address}'
```

```sh
token = '{zendesk token}'

```

Update Zammad settings:

```sh
Setting.set('import_zendesk_endpoint', "https://#{subdomain}/api/v2")
```

```sh
Setting.set('import_zendesk_endpoint_username', email)
```

```sh
Setting.set('import_zendesk_endpoint_key', token)
```

```sh
Setting.set('import_backend', 'zendesk')
```

```sh
Setting.set('import_mode', true)
```

Check your configuration in a dry run:

```sh
Sequencer.process('Import::Zendesk::ConnectionTest')
```

Run the migration:

```sh
job = ImportJob.create(name: 'Import::Zendesk')
```

```sh
AsyncImportJob.perform_later(job)
```

:::tip

Want to see the progress of the migration?

Use

```sh
pp ImportJob.find_by(name: 'Import::Freshdesk')
```

which gives you an output of the current state of the job.

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
