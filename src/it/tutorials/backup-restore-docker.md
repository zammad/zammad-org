---
order: 6
title: 'Backup e ripristino (Docker)'
---

# Backup e ripristino (Docker)

Questa sezione mostra alcune nozioni di base sul processo di backup e
ripristino per una distribuzione Docker Compose.

Se hai familiarità con le procedure di backup e ripristino basate su volumi
in Docker, e magari utilizzi già un metodo o uno strumento diverso, puoi
continuare a usarlo. Un backup in genere significa spegnere lo stack per
assicurarsi che tutti i file in memoria vengano scritti su disco, quindi
eseguire il backup dei contenuti del volume e infine riavviare lo
stack. Quando utilizzi questo metodo, puoi considerare l’uso dello scenario
[disable-backup-service](/en/reference/docker-compose-scenarios) in modo che
il meccanismo integrato di backup e ripristino di Zammad non venga attivato.

Il resto di questa pagina descrive il meccanismo di backup e ripristino
integrato dello stack Docker di Zammad.

Se hai familiarità con Docker, le sezioni seguenti includono le informazioni
di cui avrai bisogno. La pagina [Docker file
handling](/en/tutorials/docker-file-handling) copre alcuni esempi su come
gestire i file di backup e copiarli in un volume Docker per ripristinarli.

## Backup

By default, a backup is created at 3 o'clock each night. The backup is
stored in the volume of the **zammad-backup** container under
`/var/tmp/zammad`. To trigger a one-time backup manually, use one of the
commands below, depending on your deployment method.

::: tabs key:docker-portainer

=== Docker Compose

In your Docker Compose directory, run:

```sh
docker compose run --rm --env BACKUP_ONCE=true zammad-backup
```

=== Portainer

Open the [console via Portainer's GUI](/en/get-started/installation/docker#how-to-run-commands-in-the-stack) for the
**zammad-backup** container with the standard entrypoint `/bin/bash` and run:

```sh
BACKUP_ONCE=true bin/docker-entrypoint zammad-backup
```

:::

## Ripristino

1. Avvia il nuovo stack almeno una volta in modo che un database Zammad sia
   disponibile.
2. Ferma lo stack.
3. Nel caso tu ripristini su uno stack di produzione con archiviazione
   filesystem attivata, dovresti.
4. Copia o sposta i file di backup in `/var/tmp/zammad/restore/` all'interno
   del volume del container **zam
5. Start the stack. The restore process is triggered in the `zammad-backup`
   service if the `restore` directory is detected and the backup files are
   in place. As a part of this process, the Rails cache will be cleared.
   All other containers wait for the restore to finish before they resume
   their normal operations.
6. Dopo che il processo di ripristino è terminato, la cartella `restore` è
   stata rinominata. Puoi tranquillamente.
7. Rebuild the Elasticsearch index. You can use Zammad while the rebuild is
   running, but search performance is degraded and some data may be
   temporarily unavailable in search results. Use one of the commands below,
   depending on your deployment method.

<!--@include: ../get-started/update.md{243,276}-->
