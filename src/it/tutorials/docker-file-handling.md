---
order: 8
title: 'Docker file handling examples'
---

# Docker file handling examples

Se non sei sicuro di come gestire i file di backup e come creare la cartella
`restore`.

## Restore inside the same stack

**Richiede:** accesso console al container zammad-backup.

Se vuoi ripristinare un backup dallo stesso stack, devi solo creare la
cartella.

``` sh
docker compose run --rm zammad-backup bash -c "mkdir /var/tmp/zammad/restore; cp /var/tmp/
```

Ora avvia lo stack per eseguire il processo di ripristino.

## Restore from another installation

**Richiede:** accesso console al sistema host e al container zammad-backup.

Per **ottenere** i tuoi file di backup da un'altra distribuzione Docker
Compose, un modo è copiarli.

``` sh
docker compose cp zammad-backup:/var/tmp/zammad/ /path/to/your/host/directory/
```

Se stai cercando i tuoi file di backup da un’installazione tramite
pacchetto, dai un’occhiata alla sezione [Backup & Restore
(Package)](/en/tutorials/backup-restore). Non hai bisogno di un dump
completo per ripristinare il tuo backup.

Per **ripristinare** il backup, posiziona i tuoi file in una cartella
chiamata `restore` sul sistema host.

``` sh
docker compose run --rm -v /path/to/your/host/directory:/restore zammad-backup bash -c "cp
```

Ora avvia lo stack per eseguire il processo di ripristino.

## Use a web GUI

**Richiede:** accesso console al sistema host o accesso Portainer con il permesso di.

Questo può essere utile se usi Portainer per distribuire Zammad e hai
accesso limitato all'host.

Our example uses the tool
[filebrowser](https://filebrowser.org/){target=_blank}, but any similar tool
should work too. If you'd like to use such a tool permanently, make sure to
provide additional volumes for persistence (e.g. for their database).

::: info

I passaggi seguenti coprono il processo di ripristino caricando i file. Per ottenere i tuoi file di backup in

:::

1. Distribuisci filebrowser

   ::: tabs

   === Tramite console

   Distribuisci il container e fornisci il volume di **zammad-backup**

   :::

2. Dopo che il container è avviato, vai all'interfaccia web usando
   l'indirizzo IP e la porta.
3. Accedi con le credenziali predefinite `admin` / `admin`.
4. Dovresti ora vedere almeno 2 file .gz incluso un timestamp.
5. Crea una `Nuova cartella` usando il pulsante sul lato sinistro. Chiamala
   **restore**.
6. Entra in questa cartella e carica i tuoi file di backup (in alto a destra
   con la freccia su).

Ora avvia lo stack per eseguire il processo di ripristino. Dopo, puoi
eliminare tranquillamente.
