---
order: 15
title: 'Миграција на Zammad'
---

# Migrate To Zammad

You can migrate the following data from another ticketing system to Zammad:

- Tickets and their Articles
- Groups / Queues
- Организације
- Agents and Customers (if applicable)

After migrating to Zammad, you should first adjust your FQDN settings and HTTP
type in Zammad's admin interface under *Settings > System > Base*.
This is important because the getting started wizard is skipped by the
migration.

After that, you may want to continue with the [First
Steps](/en/tutorials/first-steps) to configure Zammad. This has to be done
after migration.

## General Limitations

There are some general limitations which you can find below. There could
also be limitations, depending from which system you are coming. These are
covered in the specific sections.

General limitations for all migrations:

- Migrations are only possible on new instances.
- Migrations are only possible from one source. Several migration sources on
  one instance are not supported.
- Zammad can't migrate object types it doesn't know, migrations will fail.
- Zammad migrates all or nothing. This means that you can't deselect
  specific information specific groups, tickets or users.

## Specific Migration Guides

:::info Missing a migration source?

If your system it not mentioned yet, you'll have two options. You can either
use Zammad's powerful API or drop our
[sales team a message](https://zammad.com/en/company/contact) for a custom
development or even migrator sponsoring.

Migrations are available for hosted setups too! Contact support for further
information!
:::

### Freshdesk

#### Limitations

Please note Freshdesk specific limitations below. These are additional
limitations to the general ones listed.

- Differential migrations are not supported! The general suggestion is to
  run a test import before to learn how long the migration will take.
- Important: Please note that migration speed highly depends on your
  Freshdesk plan (API rate limits apply).
- Due to API limitations, Zammad will not show the total number of objects
  to import, but instead correct them in steps of 100.
- Your Freshdesk plan has to provide API support. This may not apply to all
  available plans.
- User passwords are not migrated and will require the user to use the
  password reset link on Zammad's login page.

#### Предуслови

Zammad requires API access which is why you'll need to [create an API
key](https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key)
for the migration. The migrator will request your Freshdesk subdomain and
API key.

:::warning
Ensure to retrieve the API key with a full administrator account. Less
privileged users will end in a broken migration.
:::

#### Import

In general, you have two options on how to migrate data. If you have a
fairly big instance with a lot of data, you may want to consider using the
console over the browser version.

::::tabs

=== Via Browser

After installing Zammad and
[configuring your webserver](/en/tutorials/webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the number of users, tickets and Freshdesk plan this may take a
while.

Seeing the message "*Interrupted by scheduler restart. Please restart manually
or wait till next execution time.*"?

If this message appears after providing your credentials, please be patient.
The migration should start within 5 minutes.

If you receive above message after the migration begun, please consider using
the console approach instead and reset the installation.

=== Via Console

Open console:

```bash
zammad run rails c
```
Set variables:

```bash
subdomain = '{freshdesk subdomain}.freshdesk.com'
```
```bash
token = '{freshdesk token}'
```
Update Zammad settings for freshdesk import:
```bash
Setting.set('import_freshdesk_endpoint', "https://#{subdomain}/api/v2")
```
```bash
Setting.set('import_freshdesk_endpoint_key', token)
```
```bash
Setting.set('import_backend', 'freshdesk')
```
```bash
Setting.set('import_mode', true)
```

Check your configuration in a dry run:
```bash
Sequencer.process('Import::Freshdesk::ConnectionTest')
```

Run the migration:

```bash
job = ImportJob.create(name: 'Import::Freshdesk')
```
```bash
AsyncImportJob.perform_later(job)
```

:::tip

Want to see the progress of the migration?

Use

```bash
pp ImportJob.find_by(name: 'Import::Freshdesk')
```
which gives you an output of the current state of the job.

:::
::::

#### After Migration

Run the following commands:

```bash
Setting.set('import_mode', false)
```
```bash
Setting.set('system_init_done', true)
```
```bash
Rails.cache.clear
```

Log in with the user whose API token you provided. Use the admins email
address and API token provided during the migration to login.

All other users will have to use the password reset function or login
methods like LDAP or one click logins.

### Kayako


Please note Freshdesk specific limitations below. These are additional
limitations to the general ones listed.

- Differential migrations are not supported! The general suggestion is to
  run a test import before to learn how long the migration will take.
- Selfhosted installations (Kayako classic) are not supported.
- The following ticket field customizations are being ignored (affects
  “Scale” plan):
    - Custom ticket states
    - Custom ticket priorities
    - Custom ticket types
- Important: Please note that migration speed highly depends on your Kayako
  plan (API rate limits apply).
- Your Kayako plan has to provide API support. This may not apply to all
  available plans.
- User passwords are not migrated and will require the user to use the
  password reset link on Zammad's login page.


#### Предуслови

Zammad requires API access which is why the migrator will request your
Kayako-URL, email address and password.

:::warning
Ensure to provide an user account with full administrative permissions. Less
privileged users will end in a broken migration.
:::

#### Import

In general, you have two options on how to migrate data. If you have a
fairly big instance with a lot of data, you may want to consider using the
console over the browser version.

::::tabs

=== Via Browser

After installing Zammad and
[configuring your webserver](/en/tutorials/webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the number of users, tickets and Kayako plan this may take a while.

Seeing the message "*Interrupted by scheduler restart. Please restart manually
or wait till next execution time.*"?

If this message appears after providing your credentials, please be patient.
The migration should start within 5 minutes.

If you receive above message after the migration begun, please consider
using the console approach instead and reset the installation.

=== Via Console

Open console:

```bash
zammad run rails c
```
Set variables:

```bash
subdomain = '{kayako subdomain}.kayako.com'
```
```bash
email = '{kayako admin email address}'
```
```bash
password = '{kayako admin password}'
```
Update Zammad settings for Kayako import:
```bash
Setting.set('import_kayako_endpoint', "https://#{subdomain}/api/v1")
```
```bash
Setting.set('import_kayako_endpoint_username', email)
```
```bash
Setting.set('import_kayako_endpoint_password', password)
```
```bash
Setting.set('import_backend', 'kayako')
```
```bash
Setting.set('import_mode', true)
```

Check your configuration in a dry run:
```bash
Sequencer.process('Import::Kayako::ConnectionTest')
```

Run the migration:

```bash
job = ImportJob.create(name: 'Import::Kayako')
```
```bash
AsyncImportJob.perform_later(job)
```

:::tip

Want to see the progress of the migration?

Use

```bash
pp ImportJob.find_by(name: 'Import::Kayako')
```
which gives you an output of the current state of the job.

:::
::::

#### After Migration

Run the following commands:

```bash
Setting.set('import_mode', false)
```
```bash
Setting.set('system_init_done', true)
```
```bash
Rails.cache.clear
```

Log in with the user whose login credentials you provided. Use the admins
email address and password provided during the migration to login.

All other users will have to use the password reset function or login
methods like LDAP or one click logins.

### OTRS

#### Limitations

Additional limitations to the general one:

- Supported OTRS versions are: 3.1 - 6.x
- Password migration works for OTRS >= 3.3 only (on older instances a
  password reset within Zammad will be required)
- If you plan to import a differential migration after the main one, do not
  change any data in Zammad!
- Only customers of tickets are imported
- Zammad expects your OTRS timestamps to be UTC and won't adjust them

#### Предуслови

Install Znuny4OTRS-Repo:

:::tabs key:otrs

=== OTRS 6

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-6.0.76.opm
```

=== OTRS 5

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-5.0.56.opm
```

=== OTRS 4

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-4.0.25.opm
```

=== OTRS 3

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-3.3.2.opm
```

:::

Install OTRS migration plugin:

:::tabs key:otrs

=== OTRS 6

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-6.0.7.opm
```

=== OTRS 5

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-5.0.4.opm
```

=== OTRS 4

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-4.1.12.opm
```

=== OTRS 3

```
https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-3.0.33.opm
```

:::

::: tip
In some cases restarting your webserver may help to solve internal server
errors.
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

```bash
zammad run rails c
```
Set variables (ensure to replace *xxx* with your values):

```bash
Setting.set('import_otrs_endpoint', 'https://xxx/otrs/public.pl?Action=ZammadMigrator')
```
```bash
Setting.set('import_otrs_endpoint_key', 'xxx')
```
```bash
Setting.set('import_mode', true)
```

Run a full migration:

```bash
Import::OTRS.start
```

Run a differential migration (only possible after finishing an earlier full
migration):

All steps from "Set variables" +

```bash
Setting.set('system_init_done', false)
```

```bash
Import::OTRS.diff_worker
```

:::

#### After Migration

Run the following commands:

```bash
Setting.set('import_mode', false)
```
```bash
Setting.set('system_init_done', true)
```
```bash
Rails.cache.clear
```

### Zendesk

#### Limitations

Additional limitations to the general one:

- Differential migrations are not supported! The general suggestion is to
  run a test import before to learn how long the migration will take.
- Important: Please note that migration speed highly depends on your Zendesk
  plan (API rate limits apply).
- Your Zendesk plan has to provide API support. This may not apply to all
  available plans.
- User passwords are not migrated and will require the user to use the
  password reset link on the login page.
- Objects with cyrillic strings can't be migrated. Make sure to rename them
  before starting the migration.


#### Предуслови

Zammad requires API access which is why you’ll need to [create an API
key](https://support.zendesk.com/hc/en-us/articles/4408889192858-Generating-a-new-API-token)
for the migration. The migrator will request your Zendesk-URL, email address
and API key.

:::warning
Ensure to retrieve the API key with a full administrator account. Less
privileged users will end in a broken migration.
:::

#### Import

In general, you have two options on how to migrate data. If you have a
fairly big instance with a lot of data, you may want to consider using the
console over the browser version.

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

```bash
zammad run rails c
```
Set variables:

```bash
subdomain = '{zendesk url}'
```
```bash
email = '{zendesk admin email address}'
```
```bash
token = '{zendesk token}'

```

Update Zammad settings:
```bash
Setting.set('import_zendesk_endpoint', "https://#{subdomain}/api/v2")
```
```bash
Setting.set('import_zendesk_endpoint_username', email)
```
```bash
Setting.set('import_zendesk_endpoint_key', token)
```
```bash
Setting.set('import_backend', 'zendesk')
```
```bash
Setting.set('import_mode', true)
```
Check your configuration in a dry run:

```bash
Sequencer.process('Import::Zendesk::ConnectionTest')
```

Run the migration:

```bash
job = ImportJob.create(name: 'Import::Zendesk')
```
```bash
AsyncImportJob.perform_later(job)
```

:::tip

Want to see the progress of the migration?

Use

```bash
pp ImportJob.find_by(name: 'Import::Freshdesk')
```
which gives you an output of the current state of the job.

:::

::::

#### After Migration

Run the following commands:

```bash
Setting.set('import_mode', false)
```
```bash
Setting.set('system_init_done', true)
```
```bash
Rails.cache.clear
```

Log in with the user whose API token you provided. Use the admins email
address and API token provided during the migration to login.

All other users will have to use the password reset function or login
methods like LDAP or one click logins.
