---
order: 10
title: 'Migra a Zammad'
---

# Migra a Zammad

Puoi migrare i seguenti dati da un altro sistema di ticketing a Zammad:

- Ticket e i loro articoli
- Gruppi / Code
- Organizzazioni
- Agenti e clienti (se applicabile)

Dopo la migrazione a Zammad, dovresti prima regolare le impostazioni FQDN e il tipo HTTP
in Zam

After that, you may want to continue with the [First
Steps](/en/tutorials/first-steps) to configure Zammad. This has to be done
after migration.

## Limitazioni generali

Ci sono alcune limitazioni generali che trovi di seguito. Potrebbero esserci
anche limitazioni.

Limitazioni generali per tutte le migrazioni:

- Le migrazioni sono possibili solo su nuove istanze.
- Le migrazioni sono possibili solo da una sorgente. Più sorgenti di
  migrazione su un'istanza non sono.
- Zammad non può migrare tipi di oggetto che non conosce, le migrazioni
  falliranno.
- Zammad migra tutto o niente. Ciò significa che non puoi deselezionare
  informazioni specifiche.

## Guide di migrazione specifiche

:::info

**Manca una sorgente di migrazione?**

Se il tuo sistema non è ancora menzionato, hai due opzioni.
:::

### Freshdesk

#### Limitazioni

Tieni presente le limitazioni specifiche di Freshdesk di seguito. Queste
sono limitazioni aggiuntive a quelle.

- Le migrazioni differenziali non sono supportate! Il suggerimento generale
  è eseguire un'importazione di test.
- Importante: tieni presente che la velocità di migrazione dipende
  fortemente dal tuo piano Freshdesk (limiti API.
- A causa delle limitazioni API, Zammad non mostrerà il numero totale di
  oggetti da importare, ma in.
- Il tuo piano Freshdesk deve fornire supporto API. Questo potrebbe non
  applicarsi a tutti i piani disponibili.
- Le password utente non vengono migrate e richiederanno all'utente di usare
  il link di reimpostazione password o.

#### Prerequisiti

Zammad richiede accesso API, motivo per cui dovrai [creare una chiave
API](https://support

:::warning
Assicurati di recuperare la chiave API con un account amministratore completo. Utenti con meno
privilegi.
:::

#### Importazione

In generale, hai due opzioni su come migrare i dati. Se hai un'istanza
piuttosto grande.

::::tabs

=== Tramite browser

Dopo aver installato Zammad e
[configurato il tuo server web](./webserver-con

:::tip

Vuoi vedere il progresso della migrazione?

Usa

```ruby
pp ImportJob.find_by(name: 'Impo

:::
::::

#### Dopo la migrazione

Esegui i seguenti comandi:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

Accedi con l'utente di cui hai fornito il token API. Usa l'indirizzo email
dell'amministratore e il token API.

Tutti gli altri utenti dovranno usare la funzione di reimpostazione password
o metodi di accesso come LDAP o.

### Kayako

Tieni presente le limitazioni specifiche di Freshdesk di seguito. Queste
sono limitazioni aggiuntive a quelle.

- Le migrazioni differenziali non sono supportate! Il suggerimento generale
  è eseguire un'importazione di test.
- Le installazioni self-hosted (Kayako classic) non sono supportate.
- Le seguenti personalizzazioni dei campi ticket vengono ignorate (riguarda
  il piano "Scale"):
  - Stati ticket personalizzati
  - Priorità ticket personalizzate
  - Tipi ticket personalizzati
- Importante: tieni presente che la velocità di migrazione dipende
  fortemente dal tuo piano Kayako (limiti tasso API.
- Il tuo piano Kayako deve fornire supporto API. Questo potrebbe non
  applicarsi a tutti i piani disponibili.
- Le password utente non vengono migrate e richiederanno all'utente di usare
  il link di reimpostazione password o.

#### Prerequisiti

Zammad richiede accesso API, motivo per cui il migratore richiederà il tuo
URL Kayako, email e.

:::warning
Assicurati di fornire un account utente con permessi amministrativi completi. Utenti con meno
privilegi.
:::

#### Importazione

In generale, hai due opzioni su come migrare i dati. Se hai un'istanza
piuttosto grande.

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

Set variables, replace the values in `{}` with your own:

```ruby
subdomain = '{kayako subdomain}.kayako.com'
```

```ruby
email = '{kayako admin email address}'
```

```ruby
password = '{kayako admin password}'
```

Update Zammad settings for Kayako import:

```ruby
Setting.set('import_kayako_endpoint', "https://#{subdomain}/api/v1")
```

```sh
Setting.set('import_kayako_endpoint_username', email)
```

```ruby
Setting.set('import_kayako_endpoint_password', password)
```

```ruby
Setting.set('import_backend', 'kayako')
```

```ruby
Setting.set('import_mode', true)
```

Check your configuration in a dry run:

```ruby
Sequencer.process('Import::Kayako::ConnectionTest')
```

Run the migration:

```ruby
job = ImportJob.create(name: 'Import::Kayako')
```

```ruby
AsyncImportJob.perform_later(job)
```

:::tip

Vuoi vedere il progresso della migrazione?

Usa

```ruby
pp ImportJob.find_by(name: 'Impo

:::
::::

#### Dopo la migrazione

Esegui i seguenti comandi:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

Accedi con l'utente di cui hai fornito le credenziali di accesso. Usa
l'indirizzo email dell'amministratore e.

Tutti gli altri utenti dovranno usare la funzione di reimpostazione password
o metodi di accesso come LDAP o.

### OTRS

#### Limitazioni

Limitazioni aggiuntive a quella generale:

- Le versioni OTRS supportate sono: 3.1 - 6.x
- La migrazione della password funziona solo per OTRS >= 3.3 (su istanze più
  vecchie è necessaria una reimpostazione password).
- Se prevedi di importare una migrazione differenziale dopo quella
  principale, non modificare nessun dato.
- Vengono importati solo i clienti dei ticket
- Zammad si aspetta che i tuoi timestamp OTRS siano UTC e non li regolerà

#### Prerequisiti

**Installa Znuny4OTRS-Repo che corrisponde alla tua versione OTRS (dipendenza del plugin di migrazione OTRS):**

- [OTRS
  6](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-6.0.76.opm)
- [OTRS
  5](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-5.0.56.opm)
- [OTRS
  4](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-4.0.25.opm)
- [OTRS
  3](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-3.3.2.opm)

**Installa il plugin di migrazione OTRS che corrisponde alla tua versione OTRS:**

- [OTRS
  6](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-6.0.7.opm)
- [OTRS
  5](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-5.0.4.opm)
- [OTRS
  4](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-4.1.12.opm
- [OTRS
  3](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-3.0.33.opm

::: tip
In alcuni casi riavviare il tuo server web può aiutare a risolvere errori interni del
server.
:::

### Regolazioni timeout

Se la tua importazione va in timeout o sai già che questo potrebbe essere un
problema, puoi.

|                                    | Zammad < 7.0 | Zammad ≥ 7.0  |
|-------------------

#### Importazione

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

```ruby
zammad run rails c
```

Set variables, replace the values in `{}` with your own:

```ruby
Setting.set('import_otrs_endpoint', 'https://{domain}/otrs/public.pl?Action=ZammadMigrator')
```

```ruby
Setting.set('import_otrs_endpoint_key', '{xxx}')
```

```ruby
Setting.set('import_mode', true)
```

Run a full migration:

```ruby
Import::OTRS.start
```

Run a differential migration (only possible after finishing an earlier full
migration):

All steps from "Set variables" +

```ruby
Setting.set('system_init_done', false)
```

```ruby
Import::OTRS.diff_worker
```

:::

#### Dopo la migrazione

Esegui i seguenti comandi:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

### Zendesk

#### Limitazioni

Limitazioni aggiuntive a quella generale:

- Le migrazioni differenziali non sono supportate! Il suggerimento generale
  è eseguire un'importazione di test.
- Importante: tieni presente che la velocità di migrazione dipende
  fortemente dal tuo piano Zendesk (limiti tasso API.
- Il tuo piano Zendesk deve fornire supporto API. Questo potrebbe non
  applicarsi a tutti i piani disponibili.
- Le password utente non vengono migrate e richiederanno all'utente di usare
  il link di reimpostazione password o.
- Gli oggetti con stringhe cirilliche non possono essere migrati. Assicurati
  di rinominarli prima di iniziare.

#### Prerequisiti

Zammad richiede accesso API, motivo per cui dovrai [creare una chiave
API](https://support

:::warning
Assicurati di recuperare la chiave API con un account amministratore completo. Utenti con meno
privilegi.
:::

#### Importazione

In generale, hai due opzioni su come migrare i dati. Se hai un'istanza
piuttosto grande.

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

Set variables, replace the values in `{}` with your own:

```ruby
subdomain = '{zendesk url}'
```

```ruby
email = '{zendesk admin email address}'
```

```ruby
token = '{zendesk token}'

```

Update Zammad settings:

```ruby
Setting.set('import_zendesk_endpoint', "https://#{subdomain}/api/v2")
```

```ruby
Setting.set('import_zendesk_endpoint_username', email)
```

```ruby
Setting.set('import_zendesk_endpoint_key', token)
```

```ruby
Setting.set('import_backend', 'zendesk')
```

```ruby
Setting.set('import_mode', true)
```

Check your configuration in a dry run:

```ruby
Sequencer.process('Import::Zendesk::ConnectionTest')
```

Run the migration:

```ruby
job = ImportJob.create(name: 'Import::Zendesk')
```

```ruby
AsyncImportJob.perform_later(job)
```

:::tip

Vuoi vedere il progresso della migrazione?

Usa

```ruby
pp ImportJob.find_by(name: 'Impo

:::

::::

#### Dopo la migrazione

Esegui i seguenti comandi:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

Accedi con l'utente di cui hai fornito il token API. Usa l'indirizzo email
dell'amministratore e il token API.

Tutti gli altri utenti dovranno usare la funzione di reimpostazione password
o metodi di accesso come LDAP o.
