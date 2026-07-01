---
order: 9
title: 'Migra Zammad a un nuovo host'
---

# Migra Zammad a un nuovo host

Questa è solo una descrizione dei passaggi di base per eseguire una
migrazione verso un nuovo host. Il tuo ambiente potrebbe essere diverso,
quindi dovresti considerarla solo come punto di riferimento. Se qualcosa va
storto, consulta la [Zammad
Community](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank}
o considera le [opzioni di supporto a
pagamento](https://zammad.com/en/services/professional-services){target=_blank}.

I passaggi descritti in questa pagina sono un'aggiunta alla [guida di backup
e ripristino](/it/tutorials/backup-restore).

::: tip
Stai migrando da Zammad SaaS? Passa direttamente allo
[Step 7](#step-7-transfer-your-backup-files). Per il ripristino,
hai ricevuto un dump come allegato!
:::

## Passo 1: Annota le tue regolazioni ambientali

Se hai impostato variabili d'ambiente o simili, assicurati di farne il
backup.

## Passo 2: Installa Zammad sull'host di destinazione

Per il percorso di ripristino più semplice possibile, installa la stessa
versione del tuo originale.

## Passo 3: Attiva la modalità manutenzione

Questo termina tutte le sessioni di agenti e clienti. Attivala nell'interfaccia di amministrazione
di Zammad sotto _.

## Passo 4: Disabilita i tuoi canali di comunicazione

Lo script di ripristino avvia Zammad automaticamente, questo può aiutare a
evitare perdita di dati e incoerenze.

## Passo 5: Ferma e disabilita Zammad

Assicurati che nessun dato venga modificato _prima_ del backup.

```sh
sudo systemctl disable zammad
```

```sh
sudo systemctl stop zammad
```

## Passo 6: Backup

Segui la [guida al backup](/it/tutorials/backup-restore#) per creare il tuo
backup.

Ricorda se hai creato un dump completo del filesystem o hai solo fatto il
backup dei tuoi dati. Questo verrà.

Se vuoi prendere la via più semplice, considera di fare il dump solo dei
tuoi dati.

## Passo 7: Trasferisci i tuoi file di backup

Salva i tuoi file di backup in una directory e fornisci il percorso al file
`config`. Nella sezione [backup
configuration](/en/tutorials/backup-restore#backup-configuration) puoi
trovare come adattare il file di configurazione alle tue esigenze.

## Passo 8: Ripristina il tuo backup

Segui la [guida al
ripristino](/it/tutorials/backup-restore#ripristina-backup) fino a e
incluso.

Assicurati di fermare Zammad dopo che il ripristino è terminato.

## Passo 9: Esegui le attività di manutenzione richieste dopo il ripristino

Dopo un ripristino riuscito, continua di seguito a seconda che tu abbia solo
fatto il backup dei tuoi.

### Dump dati

#### Passo 9.1: Svuota la cache

```sh
zammad run rails r "Rails.cache.clear"
```

### Dump completo del filesystem

::: info
Questo passaggio è necessario solo se uno dei seguenti punti è soddisfatto:

- L'origine e la destinazione.
:::

#### Passo 9.1: Disinstalla e reinstalla Zammad senza risolvere le dipendenze

::: tabs

=== Debian & Ubuntu

```sh
sudo dpkg -r --force-depends zammad
```

```sh
sudo apt instal

:::

::: tip
Non sei sicuro che quanto sopra sia davvero necessario e una semplice reinstallazione sarebbe
sufficiente? Se esegui.

:::

#### Passo 9.2: Svuota la cache

```sh
zammad run rails r "Rails.cache.clear"
```

#### Passo 9.3: Assicurati che Zammad sia in esecuzione

``` sh
sudo systemctl status zammad
```

Se Zammad non è in esecuzione, esegui:

```sh
sudo systemctl start zammad
```

:::tip
Migrato da Zammad SaaS o cambio di provider?

Assicurati che le tue notifiche email.
:::

## Passo 10: Applica le impostazioni ambientali mancanti

Se hai impostato delle variabili d’ambiente, riapplica ora le tue
impostazioni. Le hai salvate nello [Step
1](#step-1-note-down-your-environmental-adjustments).

Se non l’hai già fatto, [installa
Elasticsearch](/en/tutorials/install-elasticsearch) ora ed esegui i passaggi
per [connettere e configurare
Elasticsearch](/en/tutorials/connect-config-elasticsearch) dopo
l’installazione.

## Passo 11: Riattiva i canali e disattiva la modalità manutenzione

Riporta i canali precedentemente disattivati ad attivi se sei sicuro che
tutto sia andato a buon fine.

Dopo aver verificato la funzionalità dei tuoi canali, permetti ai tuoi
agenti e clienti di accedere.
