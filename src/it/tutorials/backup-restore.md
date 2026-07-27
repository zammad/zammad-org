---
order: 7
title: 'Backup & restore (package)'
---

# Backup & restore (package)

Zammad include script nelle installazioni tramite pacchetto per backup e
ripristino che puoi usare.

::: warning
Questi script non sono coperti da alcuna garanzia e potrebbero non funzionare nel tuo specifico
caso d'uso.
:::

Ci sono alcune limitazioni che dovresti conoscere:

- Questi script non funzioneranno nelle installazioni basate su container.
- Funzionano solo per installazioni PostgreSQL.
- Il backup è sempre un dump completo (nessun backup incrementale).
- Il backup e ripristino parziale (ad esempio solo dati specifici come
  ticket, utenti) non è possibile.
- Cambiare sistema database non è possibile.
- Le impostazioni di sistema (come le variabili d'ambiente) non vengono
  salvate nel backup.
- Il ripristino su una versione Zammad precedente non è possibile.
- Non ripristinare file di backup da script personalizzati con gli script
  forniti da Zammad. Questo.

## Nozioni di base

Gli script si trovano in `/opt/zammad/contrib/backup`. I seguenti file sono
rilevanti:

- File di configurazione backup: `config.dist`
- Script per il backup dei tuoi dati: `zammad_backup.sh`
- Script per il ripristino dei tuoi dati: `zammad_restore.sh`

Per eseguire un backup basato sulla configurazione predefinita, segui i
passaggi seguenti:

1. Copia il file `config.dist` in `config`.
1. Modifica i parametri predefiniti nel file di configurazione se
   necessario. Vedi [Backup Configuration](#backup-configuration) per i
   dettagli.
1. Ferma Zammad `systemctl stop zammad`
1. Esegui `/opt/zammad/contrib/backup/zammad_backup.sh` (come utente `root`
   o `zammad`)

## Backup configuration

Puoi trovare dettagli sui parametri di configurazione con valori predefiniti
di seguito.

`BACKUP_DIR` <Badge type="info" text="/var/tmp/zammad_backup"/>
: Posizione dove lo script.

`HOLD_DAYS` <Badge type="info" text="10"/>
: Definisce per quanti giorni lo script di backup dovrebbe.

  Esempi:
    - `1` manterrà i backup delle ultime 25 ore
    - `-1` rimuoverà tutti i backup disponibili.

`FULL_FS_DUMP` <Badge type="info" text="yes"/>
:   - `yes`: il backup include anche l'applicazione.

  In ogni caso, include il database Zammad e gli allegati, se li
  hai memorizzati.

`DEBUG` <Badge type="info" text="no"/>
: Impostare questa opzione su `yes` produrrà output di debug utili.
  ::: warning
  Questa opzione potrebbe restituire informazioni sensibili sull'output standard! Non
  usarla.
  :::

## Restore backups

### Important information

Leggi attentamente le seguenti informazioni prima di iniziare a ripristinare
i tuoi dati.

- Questa sezione **non** riguarda la **migrazione da un host a un
  altro**. Puoi trovare istruzioni su questo argomento nella pagina [Migrate
  Zammad](migrate-host).
- Questa guida si aspetta una versione di Zammad completamente installata
- Si aspetta anche che tu ripristini Zammad sullo stesso host e versione
  Zammad
- Il processo di ripristino ferma e riavvia Zammad. Pertanto devi eseguire
  lo script di ripristino.
- Le installazioni basate su PostgreSQL elimineranno e ricreeranno il
  database!
- È richiesto almeno il doppio della dimensione dell'istanza Zammad
  sottoposta a backup di spazio libero.

::: tip
If your scenario is different from the one described above, please consult the
[Zammad Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank}
or consider
[paid support options](https://zammad.com/en/services/professional-services){target=_blank}.
:::

### Copy backup files to a fitting location

Assicurati che l'utente che stai usando per il ripristino sia autorizzato a
leggere i file di backup e.

Il backup di Zammad consiste in due file. Sono denominati così:

```plain
<timestamp>_zammad_db.psql.gz
<timestamp>_zammad_files.tar.gz
```

Ci sono anche due collegamenti simbolici nella tua cartella di backup che
puntano al backup più recente creato.

```plain
latest_zammad_db.psql.gz
latest_zammad_files.tar.gz
```

Copiali in una posizione adatta accessibile per l'utente che esegue il
ripristino.

### Configure backup script

Per una nuova installazione, questo è necessario. Devi almeno fornire una
directory in cui verranno archiviati i tuoi backup. Consulta [Backup
Configuration](#backup-configuration) per maggiori informazioni.

### Clean up the storage folder

Nel caso tu ripristini su un ambiente di produzione con archiviazione
filesystem attivata, dovresti.

### Run the restore

Tieni presente che il ripristino dei backup può sovrascrivere il tuo `database.yml`. Puoi
verificarlo.

Il ripristino funziona in due modi possibili, a seconda di quanto vuoi
essere interattivo:

:::: tabs

=== Ripristino interattivo (consigliato)
Esegui lo script:

```sh
/opt/zammad/contrib/backup/z

::: warning
Usa l'opzione seguente solo se sai cosa stai facendo! Il comando
seguente sovrascriverà.
:::
Se chiamato con un argomento timestamp (corrispondente al nome file del backup),
Zammad procederà.

::::

Il risultato dovrebbe assomigliare a questo:

```ansi
# Zammad restore started - Fri Jan 21 17:54:13 CET 2022!

Il ripristino eliminerà il tuo attuale.
```

### Additional steps

- Se hai impostato impostazioni ambientali, riapplicale ora.
- Se non già fatto, [installa
  Elasticsearch](/it/tutorials/install-elasticsearch) ora.
- [Collega Elasticsearch a Zammad e ricostruisci il suo indice di
  ricerca](/en/tutorials/connect-config-elasticsearch). La ricostruzione può
  essere eseguita in sicurezza durante il tuo lavoro, ma causerà prestazioni
  di ricerca degradate e potrebbe portare a dati temporaneamente non
  trovati.

## Troubleshooting backup & restore

Di seguito sono elencati alcuni problemi comuni. Se il tuo problema non è
presente nell'elenco, non esitare a consultare la [Community di
Zammad](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank}
per assistenza tecnica.

### Exit codes

I nostri script di backup e ripristino includono codici di uscita per
aiutarti a trovare una soluzione.

Oltre ai codici di uscita, ci sono anche messaggi di errore restituiti allo
standard output.

| Codice | Descrizione / Situazione

### Common problems

#### Password authentication failed / peer authentication failed

Questo indica che la password del tuo utente database Zammad è diversa dal
tuo `dat

Se la tua istanza Zammad è in esecuzione, può essere causata da un fallback
alla connessione socket.

**Cosa fare?**

Assicurati che le credenziali utente fornite siano corrette. Puoi anche
considerare di usare `r

#### Ident authentication failed for user

Questo indica che il tuo server database richiede l'autenticazione
`ident`. Quel tipo di autenticazione.

**Cosa fare?**

Controlla il `pg_hba.conf` del tuo server PostgreSQL e regolalo se
necessario.

Solitamente, l'autenticazione può essere consentita così:

```sh
# QUESTO È UN ESEMPIO E POTREBBE NON ADATTARSI AL TUO AMBIENTE
host    all             all
```

Per questo, consulta la documentazione ufficiale di
[PostgreSQL](https://www.postgresql.org/docs/){target=_blank}, poiché è al
di fuori dell’ambito della nostra documentazione.

#### WARNING: You don't seem to have any attachments in the file system

Questo indica che la tua istanza attualmente non salva gli allegati nel
filesystem.

Questo avviso verrà mostrato una volta prima di creare una cartella vuota
per permettere al processo di backup.

Controlla e modifica le tue
[impostazioni di archiviazione tramite console](/en/reference/rails-commands#storage-provider-setting)
o nell’interfaccia di amministrazione di Zammad sotto _Settings > System > Storage_.

## Helper script

### Avviso

Uno script può potenzialmente essere distruttivo! Non dovresti **mai**
eseguire script di cui non conosci l'ambito.

Tieni presente che esegui questi script a tuo rischio.

### Database helper: (Re)set password

#### Limitazioni

- Questo script funziona solo per installazioni PostgreSQL.
- Sono supportati solo server database locali (lo script cambia utente).
- Questo script richiede di essere eseguito come `root` o utente con
  privilegi simili.
- Tieni presente che lo script fermerà e avvierà automaticamente Zammad!

#### Ambiti

L'ambito di questo script sono principalmente le installazioni tramite
pacchetto, specialmente CentOS e SUSE.

#### Funzionalità

Lo script eseguirà automaticamente le seguenti azioni per te, a seconda
della situazione.

- Se `database.yml` contiene una riga password vuota, verrà generata e
  impostata una nuova password.
- Se `database.yml` contiene una password, verrà usata per impostare la
  password dell'utente database Zammad.

#### Utilizzo

Esegui lo script con il comando seguente e segui le istruzioni. Non è
richiesta nessuna configurazione specifica.

```sh
/opt/zammad/contrib/backup/zammad_db_user_helper.sh
```

Se si verificano errori, lo script proverà a riportare Zammad online prima
di uscire.
