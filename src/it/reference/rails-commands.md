---
order: 2
title: 'Rails commands'
---

# Rails commands

Zammad usa Ruby on Rails quindi puoi usare la [console
Rails](http://guides.rubyonrails.org/command_line.html){target=_blank}.

::: warning
Controlla attentamente i tuoi comandi prima di eseguirli, poiché alcuni di questi
comandi potrebbero causare danni.
:::

## Starting Zammad's rails console

### Execute a single command

::: info
Sostituisci `{COMMAND}` con il comando che vuoi eseguire.
:::

::: tip
Se inserisci una `p` davanti al tuo comando (ad esempio come
`rails r 'p Delayed::Job.count'`),
:::

::: tabs key:installmethod

=== Installazione Docker

```sh
docker compose run --rm zammad-railsserver bundle exec rai

:::

### Run interactive rails console

::: tabs key:installmethod

=== Installazione Docker

```sh
docker compose run --rm zammad-railsserver bundle exec rai

:::

### Rails console safe mode

Normalmente, l'avvio della console Rails richiede che determinati servizi di
terze parti siano attivi e in esecuzione.

Tuttavia, è possibile avviare la console Rails in modalità sicura impostando
una speciale variabile d'ambiente.

```sh
ZAMMAD_SAFE_MODE=1 zammad run rails c
```

## Ticket commands

### Get the RAW email

Il seguente comando ti aiuta a controllare i file EML ricevuti che Zammad ha
recuperato. Questo comando.

Per ottenere il file EML del primo articolo, puoi usare il seguente
comando. Nel nostro esempio.

```ruby
Ticket.find_by(number:'101234').articles.first.as_raw.content
```

Se necessario, puoi anche ottenere il contenuto grezzo di articoli
successivi (dovrai trovare l'ID corrispondente).

Nel primo passaggio otteniamo tutti gli ID degli articoli del ticket:

```ruby
Ticket.find_by(number:'101234').article_ids
```

Output:

```ansi
[4, 3, 2]
```

Dall'elenco ottenuto, possiamo quindi ottenere il contenuto degli articoli:

```ruby
Ticket::Article.find(3).as_raw.content
```

::: info
Se usi semplicemente `Ticket::Article.find(3)` puoi vedere ulteriori
informazioni (come chi ha inviato).
:::

### Update all tickets of a specific customer

::: warning
Tieni presente che questa azione può essere costosa in termini di risorse, se
hai molti ticket, questa.
:::

```ruby
Ticket.where(customer_id: 4).update_all(customer_id: 1)
```

### Get ticket state types

Questo mostrerà tutti i tipi di stato necessari per creare nuovi stati
ticket:

```ruby
Ticket::StateType.pluck(:id, :name)
```

Quanto sopra restituirà sia l'ID che il nome del tipo - ad esempio:

```ansi
`[[1, "new"], [2, "open"], ...`.
```

## User commands

### Find user

Per lavorare sulle informazioni utente o controllare informazioni
specifiche, dovrai.

ID utente già conosciuto:

```ruby
User.find(4)
```

Ricerca dell'utente tramite il suo indirizzo email:

```ruby
User.find_by(email: 'your@email')
```

Ricerca dell'utente tramite il suo login:

```ruby
User.find_by(login: 'john.doe')
```

### Unlock a locked user account

::: tip
Sbloccare un account utente bloccato è supportato anche dall'interfaccia web di Zammad!
:::

A volte capita che un utente si blocchi da solo provando ripetutamente
la password sbagliata più volte.

L'utente non può più accedere (per sempre) se non cambia la password o tu
non resetti.

```ruby
u=User.find(**USERID**)
```

```ruby
u.login_failed=0
```

```ruby
u.save!
```

Puoi anche verificare se l'account è bloccato eseguendo il seguente comando
(risultato.

```ruby
User.find(**USERID**).login_failed
```

### Change / update email address of user

Se necessario, puoi semplicemente cambiare l'indirizzo email dell'utente.

::: info
Tieni presente che l'attributo login non viene influenzato da questo e
Zammad potrebbe quindi mostrare informazioni diverse.
:::

```ruby
u = User.find(**USERID**)
```

```ruby
u.email = 'user@exmaple.com'
```

```ruby
u.save!
```

Devi prima trovare l'ID dell'utente per questo.

### Change / update login name of user

Cambia il nome utente dell'utente (ad esempio se vuoi accedere con un nome
utente più breve invece di).

```ruby
u = User.find(**USERID**)
```

```ruby
u.login = 'user@exmaple.com'
```

```ruby
u.save!
```

Devi prima trovare l'ID dell'utente per questo.

### Set admin rights for user

Non hai più accesso a Zammad? Concedi a te stesso o a un altro utente
diritti amministrativi.

```ruby
u = User.find_by(email: 'you@example.com')
```

```ruby
u.roles = Role.where(name: ['Agent', 'Admin'])
```

```ruby
u.save!
```

### Set password for user

Tu o l'utente avete dimenticato la password? Nessun problema! Reimpostala
semplicemente a mano se necessario.

```ruby
User.find_by(email: 'you@example.com').update!(password: 'your_new_password')
```

### Remove password for user

Se hai aggiunto un secondo metodo di autenticazione (ad esempio LDAP) dopo
il lancio, potrebbe esserci ancora.

```ruby
User.find_by(email: 'you@example.com').update!(password: nil)
```

## Group commands

### Find a group

```ruby
Group.find_by(name: 'Users').follow_up_possible
```

## Chat commands

### Remove IP address logs

Usa il seguente comando per rimuovere tutti i record degli indirizzi IP
dalle chat chiuse che non sono.

```ruby
Chat::Session.where(state: 'closed').where('updated_at < ?', 7.days.ago).each do |session|
```

```ruby
session.preferences.delete('geo_ip')
```

```ruby
session.preferences.delete('remote_ip')
```

```ruby
session.save!(touch: false)
end
```

## Zammad settings

In questa sezione, puoi trovare alcune impostazioni che puoi impostare anche
nell'interfaccia di Zammad.

### Auto shutdown setting

Definisce se viene eseguito uno spegnimento automatico di Zammad quando il
database è stato modificato.

Impostare questo su `false` potrebbe avere senso solo in casi molto rari e
dovrai riavviare.

```ruby
Setting.set('auto_shutdown', 'true')
```

### Ticket_hook setting

Questo ti darà l'hook del ticket che troverai all'interno di `[]` davanti al
numero del ticket.

```ruby
Setting.get('ticket_hook')
```

### FQDN setting

Ottieni l'impostazione FQDN corrente di Zammad e, se necessario, regolala.

::: info
Questa impostazione non ha effetto sui certificati SSL o su qualsiasi configurazione del server web.
:::

Ottieni l'FQDN corrente:

```ruby
Setting.get('fqdn')
```

Imposta un nuovo FQDN:

```ruby
Setting.set('fqdn', 'new.domain.tld')
```

### HTTP(s) setting

Questa impostazione appartiene indirettamente alla tua impostazione FQDN ed
è rilevante per gli URL basati su variabili.

::: warning
Questa impostazione influisce anche sul comportamento del token CSRF di Zammad. Se imposti
questo su HTTPs ma.
:::

Ottieni il tipo http corrente:

```ruby
Setting.get('http_type')
```

Cambia il tipo http in HTTPs:

```ruby
Setting.set('http_type', 'https')
```

### Storage provider setting

L'impostazione del provider di archiviazione è impostata su `DB` nelle
installazioni predefinite.

Ottieni l'archiviazione allegati corrente:

```ruby
Setting.get('storage_provider')
```

Cambia l'archiviazione allegati nel database

```ruby
Setting.set('storage_provider', 'DB')
```

Se hai già file memorizzati e vuoi spostarli, puoi usare il seguente
esempio.

Sposta i file dal DB al File con un ritardo specificato dopo ogni file in
secondi:

```ruby
Store::File.move('DB', 'File', delay_in_sec)
```

Le seguenti impostazioni sono disponibili in un'installazione predefinita:

- `DB` (database)
- `File` (Filesystem (`/opt/zammad/storage/`))

### Configurazione di Elasticsearch

Se la tua installazione Elasticsearch cambia, puoi usare i seguenti comandi
per assicurarti che.

Cambia l'URL di Elasticsearch:

```ruby
Setting.set('es_url', 'http://127.0.0.1:9200')
```

Cambia l'utente Elasticsearch (ad esempio per l'autenticazione):

```ruby
Setting.set('es_user', 'elasticsearch')
```

Cambia la password di Elasticsearch per l'autenticazione:

```ruby
Setting.set('es_password', 'zammad')
```

Cambia il nome dell'indice:

```ruby
Setting.set('es_index', Socket.gethostname + '_zammad')
```

Ignora l'indicizzazione dei file in base all'estensione:

```ruby
Setting.set('es_attachment_ignore', %w[.png .jpg .jpeg .mpeg .mpg .mov .bin .exe .box .mbo
```

Limita la dimensione dell'allegato:

```ruby
Setting.set('es_attachment_max_size_in_mb', 50)
```

Attiva o disattiva la verifica SSL:

```ruby
Setting.set('es_ssl_verify', 'false')
```

### Enable proxy

Imposta un proxy da usare da Zammad:

```ruby
Setting.set('proxy', 'proxy.example.com:3128')
```

```ruby
Setting.set('proxy_username', 'some user')
```

```ruby
Setting.set('proxy_password', 'some pass')
```

### Disabilita Asciifold

Questa funzionalità è attiva per impostazione predefinita. Nel caso tu abbia
bisogno di una ricerca più precisa, puoi disattivarla.

```ruby
Setting.set('es_asciifolding', false)
```

Dopo aver modificato l'impostazione, assicurati di [ricostruire l'indice di
ricerca](/it/tutorials/connect-config-elasticsearch#costruisci-ricostruisci-
l-indice-di-ricerca).

## Hidden settings

In questa sezione puoi trovare alcune impostazioni che non troverai
nell'interfaccia di Zammad.

### Send all outgoing emails to a BCC-mailbox

Questa opzione ti permette di inviare tutte le email in uscita (non le
notifiche) a una specifica casella email.

```ruby
Setting.set('system_bcc', 'alias@domain.tld')
```

Puoi facilmente controllare l'impostazione BCC corrente eseguendo:

```ruby
Setting.get('system_bcc')
```

### Activate counter on grouped overviews

Questo abilita un valore del numero di ticket in ogni intestazione per gli
elementi raggruppati.

Abilita il contatore per le panoramiche raggruppate:

```ruby
Setting.set('ui_table_group_by_show_count', true)
```

Disabilita il contatore per le panoramiche raggruppate:

```ruby
Setting.set('ui_table_group_by_show_count', false)
```

Ottieni l'impostazione corrente (`nil` è false):

```ruby
Setting.get('ui_table_group_by_show_count')
```

### Default ticket type on creation

Zammad ti permette di definire il tipo di articolo predefinito alla
creazione del ticket. Per impostazione predefinita questo è.

Puoi scegliere tra

- `phone-in` (chiamata in entrata, **predefinito**),
- `phone-out` (chiamata in uscita) e
- `email-out` (invio di un'email).

```ruby
Setting.set('ui_ticket_create_default_type', 'email-out')
```

Per controllare quale impostazione è attualmente impostata, esegui
semplicemente:

```ruby
Setting.get('ui_ticket_create_default_type')
```

### Show a note during article creation

Se devi mostrare ai tuoi agenti una nota con informazioni importanti durante
la creazione dell'articolo.

![Screenshot che mostra una nota durante la creazione
dell'articolo](/screenshots/cypress/reference/rails-commands.cy.js/article-creation-note.png)

#### Ticket creation

```ruby
Setting.set('ui_ticket_create_notes', {
      :"phone-in"  => "Stai per annotare una chiamata in
```

#### New article in existing tickets

```ruby
Setting.set('ui_ticket_add_article_hint', {
      :"note-internal"  => "Stai scrivendo un
```

#### Check current configuration

```ruby
Setting.get('ui_ticket_create_notes')
```

```ruby
Setting.get('ui_ticket_add_article_hint')
```

#### Markup options

Per applicare la formattazione del testo, usa il seguente markup:

- `||corsivo||`
- `|grassetto|`
- `_sottolineato_`
- `//barrato//`
- `§tasto§` (rende un tasto della tastiera come [[tasto]])
- `¶` (nuova riga)
- `[testo link](/example.com)`

### Show email address of customer on customer selection (ticket creation)

Per impostazione predefinita, Zammad non mostrerà gli indirizzi email dei
clienti. L'opzione seguente.

```ruby
Setting.set('ui_user_organization_selector_with_email', true)
```

Ottieni lo stato corrente di questa impostazione con:

```ruby
Setting.get('ui_user_organization_selector_with_email')
```

### Change font settings for outgoing HTML emails

::: info
Alcuni client (come Outlook) potrebbero passare ad altre impostazioni mentre potrebbe funzionare per altri.
:::

L'impostazione seguente ti permette di regolare l'impostazione del font
email di Zammad. Questa impostazione non.

```ruby
Setting.set("html_email_css_font", "font-family:'Helvetica Neue', Helvetica, Arial, Geneva
```

Ottieni lo stato corrente di questa impostazione con:

```ruby
Setting.get('html_email_css_font')
```

### Highlight customer's open ticket count

Questa opzione migliora il conteggio dei ticket aperti del cliente
selezionato. Evidenzia il conteggio.

```ruby
Setting.set('ui_sidebar_open_ticket_indicator_colored', true)
```

Le impostazioni sopra hanno soglie specifiche come segue. **Non puoi**
regolare queste soglie.

| Situazione / Visualizzazione | nessuna indicazione | avviso (arancione) | pericolo (rosso) |
|-------------

### Activate attachment tab in sidebar

Questa opzione attiva una nuova scheda nella barra laterale destra nella
visualizzazione ticket che mostra tutti gli allegati.

```ruby
Setting.set('ui_ticket_zoom_sidebar_article_attachments', 'true')
```

### Time period for showing customer profile on new calls

Zammad mostra la finestra di dialogo del profilo cliente quando arriva una
chiamata di questo cliente e c'è.

Imposta il periodo di tempo a 90 giorni:

```ruby
Setting.set('cti_customer_last_activity', '90')
```

### Set public "notes" as SLA relevant

Normalmente, le note non sono rilevanti per SLA. Usa il seguente comando per
includere quelle visibili pubblicamente.

::: info
Per impostazione predefinita, i clienti non vengono notificati quando vengono aggiunte note pubbliche a un
ticket.
:::

Abilita SLA a contare le note come comunicazione:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: true)
```

Abilita SLA a ignorare le note come comunicazione:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: false)
```

### Activate priority icon

Per attivare icone aggiuntive che rappresentano la priorità, usa il comando
seguente:

```ruby
Setting.set('ui_ticket_priority_icons', true)
```

## Other useful commands

### Remove AI feature

La funzionalità AI di Zammad è completamente opzionale e richiede una
configurazione prima che qualsiasi richiesta AI.

Disabilita qualsiasi provider AI, nel caso tu l'abbia già configurato:

```ruby
Setting.set('ai_provider', false)
```

Disabilita il permesso di nascondere le impostazioni dall'interfaccia:

```ruby
Permission.where("name LIKE 'admin.ai%'").update!(active: false)
```

Per riattivarlo, imposta il flag `active` su `true`.

### Fetch emails

Il comando seguente eseguirà un recupero manuale dei canali email. Mostrerà
anche gli errori che.

```ruby
Channel.fetch
```

### Reprocess failed emails

Quando Zammad recupera un'email che non riesce ad analizzare (ad esempio a
causa di un bug del parser o di un messaggio malformato).

Nel caso di un messaggio malformato (ad esempio un indirizzo email non
valido in uno dei campi di intestazione).

#### Export all failed emails to a local folder

```sh
rake zammad:email_parser:failed_email:export_all`
```

Puoi trovare la posizione dell'email esportata nell'output della tua
console. Ogni volta.

#### Edit the email

L'email è stata esportata nel passaggio sopra. Ora puoi darle un'occhiata e
provare a.

#### Import and reprocess locally modified email

Dopo aver modificato l'email, esegui:

```sh
rake zammad:email_parser:failed_email:import path/to/your/email.eml
```

Questo applicherà le tue modifiche dal file al database. Puoi anche passare
l'intera cartella.

::: tip
Assicurati di eseguire questi comandi solo dalla cartella principale di Zammad
`/opt/zammad`. Potrebbero esserci.
:::

#### Delete unwanted emails

In caso di email indesiderate come spam, puoi eliminarle dal database dopo
l'esportazione.

```sh
rake zammad:email_parser:failed_email:delete path/to/your/email.eml
```

Se passi la cartella di esportazione come argomento, tutte le email
contenute verranno rimosse.

### Show and retry failed data privacy jobs

In rari casi, i job sulla privacy dei dati di Zammad potrebbero fallire. Per
mostrarli, puoi usare il seguente.

```sh
rake zammad:data_privacy:failed:show
```

Per riprovare i job sulla privacy dei dati falliti, puoi usare il seguente
comando. Tuttavia, senza modifiche.

```sh
rake zammad:data_privacy:failed:retry
```

### Fill a test system with test data

::: danger
Non eseguire questo in un ambiente di produzione! Questo può rallentare Zammad
ed è difficile da annullare.
:::

Il comando seguente aggiungerà `50` agenti, `1000` clienti, `20` gruppi,
`40` organizzazioni,

```ruby
FillDb.load(agents: 50,customers: 1000,groups: 20,organizations: 40,overviews: 5,tickets:
```

## Deleting records

::: danger
☠️ I comandi elencati qui causano una **perdita di dati irrecuperabile**! Procedi solo
se sai cosa stai facendo.
:::

### Removing tickets (and their articles)

Elimina un ticket (specificato tramite ID database):

```ruby
Ticket.find(4).destroy
```

Elimina tutti i ticket:

```ruby
Ticket.destroy_all
```

Mantieni alcuni ticket (specificati tramite ID database); elimina il resto:

```ruby
tickets_to_keep = [1, 2, 3]
```

```ruby
Ticket.where.not(id: tickets_to_keep).destroy_all
```

### Removing users

::: warning
I clienti **non possono** essere eliminati mentre hanno ticket rimanenti nel
sistema.

Comè tale
:::

::: tip
Se non sei sicuro di cosa fare e devi saperne di più su cosa fa Zammad
quando rimuove.
:::

Rimuovere utenti è possibile in 2 modi: un singolo utente e in blocco.

Rimuovi un singolo utente:

```ruby
User.find_by(email: '<email address>').destroy
```

Rimuovi più utenti:

```ruby
User.where(
      email: ['<email address 1>', '<email address 2>']
   ).destroy_all
```

### Removing organizations

::: info
Rimuovere un'organizzazione **non** elimina i clienti associati.
:::

#### Passo 1: Seleziona organizzazioni

Per stato "attivo":

```ruby
organizations = Organization.where(active: false)
```

Per nome:

```ruby
organizations = Organization.where(name: 'Acme')
```

Per corrispondenza parziale sulle note:

```ruby
organizations = Organization.where('note LIKE ?', '%foo%')
```

#### Passo 2: Anteprima delle organizzazioni interessate

```ruby
puts organizations.map { |org| "ORGANIZATION #{org.name}" }.join("\n")
```

#### Step 3: Proceed with deletion

```ruby
organizations.each do |org|
    puts %{Preparazione eliminazione organizzazione "#{org.name}"...
```

```ruby
org.members.each do |member|
    puts "  Rimozione di #{member.fullname} dall'organizzazione..."
```

```ruby
    puts "  Eliminazione di #{org.name}..."
    org.destroy
   end
```

### Removing system records

Rimuovi tutte le notifiche online:

```ruby
OnlineNotification.destroy_all
```

Rimuovi tutte le voci dall'Activity Stream (dashboard):

```ruby
ActivityStream.destroy_all
```

Rimuovi le voci per tutti gli oggetti visualizzati di recente (ticket,
utenti, organizzazioni):

```ruby
RecentView.destroy_all
```

Rimuovi tutte le informazioni di cronologia da ticket, utenti e
organizzazioni (pericoloso!):

```ruby
History.destroy_all
```

### Reset Zammad installation

::: danger

I comandi seguenti sono intenzionalmente incompleti, gli output di errore ti guideranno!
:::

Tronca il database:

```sh
rake zammad:db:truncate
```

Migra il database:

```sh
rake db:migrate
```

Carica i dati seed:

```sh
rake db:seed
```

Svuota la cache e ricarica le impostazioni:

```sh
rake zammad:db:rebuild
```

::: tip

Puoi anche usare il comando `zammad:db:reset` per reimpostare la tua istanza. Questo task
troncherà.
:::
