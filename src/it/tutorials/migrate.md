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

Dopodiché, potresti voler continuare con i [Primi
Passi](/en/tutorials/first-steps) per configurare Zammad. Questo deve essere
fatto dopo la migrazione.

## General limitations

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

## Specific migration guides

::: info

**Ti manca una sorgente di migrazione?**

Se il tuo sistema non è ancora menzionato, hai due opzioni. Puoi
utilizzare la potente API di Zammad oppure inviare un messaggio al nostro
[team di vendita](https://zammad.com/en/company/contact){target=_blank} per uno sviluppo
personalizzato o anche per sponsorizzare un migratore.

Le migrazioni sono disponibili anche per installazioni hosted! Contatta il supporto per ulteriori 
 informazioni!
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

Zammad richiede l’accesso API, motivo per cui dovrai [creare una API
key](https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key){target=_blank}
per la migrazione. Il migratore richiederà il tuo sottodominio Freshdesk e
la tua API key.

::: warning
Assicurati di recuperare la chiave API con un account amministratore completo. Utenti con meno
privilegi.
:::

#### Importazione

In generale, hai due opzioni su come migrare i dati. Se hai un'istanza
piuttosto grande.

:::: tabs

=== Tramite browser

Dopo aver installato Zammad e
[configurato il server web](./webserver-config), accedi al tuo FQDN di Zammad tramite browser e segui la procedura guidata di migrazione. Puoi trovarla nella schermata di accesso cliccando sul link "O migra da un altro sistema"
in basso.

A seconda del numero di utenti, ticket e del piano Freshdesk, la procedura potrebbe richiedere del tempo.

Visualizza il messaggio "_Interrotto dal riavvio dello scheduler. Riavvia manualmente
o attendi la prossima esecuzione._"?

Se questo messaggio viene visualizzato dopo aver inserito le credenziali, si prega di attendere.
La migrazione dovrebbe iniziare entro 5 minuti.

Se ricevi il messaggio precedente dopo l'avvio della migrazione, valuta la possibilità di utilizzare
la procedura da console e ripristinare l'installazione.

=== Tramite console

Apri la console:

```sh
zammad run rails c
```

Imposta le variabili, sostituisci i valori tra `{}` con i tuoi:

```ruby
subdomain = '{freshdesk subdomain}.freshdesk.com'
```

```ruby
token = '{freshdesk token}'
```

Aggiorna le impostazioni di Zammad per l'importazione di Freshdesk:

```ruby
Setting.set('import_freshdesk_endpoint', "https://#{subdomain}/api/v2")
```

```ruby
Setting.set('import_freshdesk_endpoint_key', token)
```

```ruby
Setting.set('import_backend', 'freshdesk')
```

```ruby
Setting.set('import_mode', vero)
```

Verifica la configurazione con una simulazione:

```ruby
Sequencer.process('Import::Freshdesk::ConnectionTest')
```

Esegui la migrazione:

```ruby
job = ImportJob.create(name: 'Import::Freshdesk')
```

```ruby
AsyncImportJob.perform_later(job)
```

::: tip

Vuoi vedere il progresso della migrazione?

Usa

```ruby
pp ImportJob.find_by(name: 'Impo

:::
::::

#### After migration

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

::: warning
Assicurati di fornire un account utente con permessi amministrativi completi. Utenti con meno
privilegi.
:::

#### Importazione

In generale, hai due opzioni su come migrare i dati. Se hai un'istanza
piuttosto grande.

:::: tabs

=== Tramite browser

Dopo aver installato Zammad e
[configurato il server web](/en/tutorials/webserver-config), accedi al tuo FQDN di Zammad tramite browser e segui la procedura guidata di migrazione. Puoi trovarla nella schermata di accesso cliccando sul link "Oppure migra da un altro sistema"
in basso.

A seconda del numero di utenti, ticket e del piano Kayako, l'operazione potrebbe richiedere del tempo.

Visualizza il messaggio "_Interrotto dal riavvio dello scheduler. Riavvia manualmente
o attendi la prossima esecuzione._"?

Se questo messaggio viene visualizzato dopo aver inserito le credenziali, si prega di attendere.
La migrazione dovrebbe iniziare entro 5 minuti.

Se ricevi il messaggio sopra indicato dopo l'avvio della migrazione, valuta la possibilità di utilizzare la procedura da console e ripristinare l'installazione.

=== Tramite console

Apri la console:

```sh
zammad run rails c
```

Imposta le variabili, sostituendo i valori tra `{}` con i tuoi:

```ruby
subdomain = '{kayako subdomain}.kayako.com'
```

```ruby
email = '{kayako admin email address}'
```

```ruby
password = '{kayako admin password}'
```

Aggiorna le impostazioni di Zammad per l'importazione di Kayako:

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

Verifica la configurazione con una simulazione:

```ruby
Sequencer.process('Import::Kayako::ConnectionTest')
```

Esegui la migrazione:

```ruby
job = ImportJob.create(name: 'Import::Kayako')
```

```ruby
AsyncImportJob.perform_later(job)
```

::: tip

Vuoi vedere il progresso della migrazione?

Usa

```ruby
pp ImportJob.find_by(name: 'Impo

:::
::::

#### After migration

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
  6](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-6.0.76.opm){target=_blank}
- [OTRS
  5](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-5.0.56.opm){target=_blank}
- [OTRS
  4](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-4.0.25.opm){target=_blank}
- [OTRS
  3](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-3.3.2.opm){target=_blank}

**Installa il plugin di migrazione OTRS che corrisponde alla tua versione OTRS:**

- [OTRS
  6](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-6.0.7.opm){target=_blank}
- [OTRS
  5](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-5.0.4.opm){target=_blank}
- [OTRS
  4](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-4.1.12.opm){target=_blank}
- [OTRS
  3](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-3.0.33.opm){target=_blank}

::: tip
In alcuni casi riavviare il tuo server web può aiutare a risolvere errori interni del
server.
:::

### Timeout adjustments

Se la tua importazione va in timeout o sai già che questo potrebbe essere un
problema, puoi.

|                                    | Zammad < 7.0 | Zammad ≥ 7.0  |
|-------------------

#### Importazione

::: tabs

=== Via Browser

Dopo aver installato Zammad e
[la configurazione del server web](/en/tutorials/webserver-config), navigare verso il tuo
Zammads FQDN nel tuo browser e segui la procedura guidata di migrazione. Puoi trovarlo
nella schermata di accesso, fai clic sul link "Oppure migra da un altro sistema"
in basso.

A seconda delle dimensioni dell'installazione OTRS, potrebbe volerci un po' di tempo. In tal caso,
si consiglia di utilizzare la versione a riga di comando di questa funzionalità. Ciò vale anche nel caso
in cui si verifichino timeout durante la migrazione.

=== Via Console

Aprire console:

```ruby
zammad run rails c
```

Imposta le variabili, sostituisci i valori in `{}` con le tue:

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

Eseguire una migrazione differenziale (possibile solo dopo aver completato una completa)
migrazione):

Tutti i passaggi da "Set variables" +

```ruby
Setting.set('system_init_done', false)
```

```ruby
Import::OTRS.diff_worker
```

:::

#### After migration

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

Zammad richiede l'accesso all'API, motivo per cui dovrai [creare una chiave
API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Generating-a-new-API-token){target=_blank}
per la migrazione. Lo strumento di migrazione richiederà il tuo URL Zendesk,
l'indirizzo email e la chiave API.

::: warning
Assicurati di recuperare la chiave API con un account amministratore completo. Utenti con meno
privilegi.
:::

#### Importazione

In generale, hai due opzioni su come migrare i dati. Se hai un'istanza
piuttosto grande.

:::: tabs

=== Via Browser

After installing Zammad and
[configuring your webserver](/en/tutorials/webserver-config), navigate to your
Zammads FQDN in your browser and follow the migration wizard. You can find
it in the log in screen by clicking the "Or migrate from another system"
link at the bottom.

Depending on the number of users, tickets and Zendesk plan, this may take a
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

::: tip

Vuoi vedere il progresso della migrazione?

Usa

```ruby
pp ImportJob.find_by(name: 'Impo

:::

::::

#### After migration

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
