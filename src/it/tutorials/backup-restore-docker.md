---
order: 6
title: 'Backup e ripristino (Docker)'
---

# Backup e ripristino (Docker)

Questa sezione mostra alcune nozioni di base sul processo di backup e
ripristino per una distribuzione Docker Compose.

If you are familiar with volume based backup and restore procedures in
Docker, and perhaps already use a different method or tool, then you can
keep using it. A backup would typically mean shutting down the stack to
ensure all in-memory files get written to disk, then backing up the volume
contents, and then starting the stack again. When using such method, you can
consider using the [disable-backup-service
scenario](/en/reference/docker-compose-scenarios) so that the built-in
backup and restore mechanism of Zammad is not activated.

Il resto di questa pagina descrive il meccanismo di backup e ripristino
integrato dello stack Docker di Zammad.

If you're familiar with Docker, the sections below include the information
you'll need. The [Docker file handling](/en/tutorials/docker-file-handling)
page covers some examples about how to handle the backup files and to copy
it into a Docker volume to restore it.

## Backup

Per impostazione predefinita, un backup viene creato ad ogni avvio dello
stack nonché alle 3 di ogni notte.

## Ripristino

1. Avvia il nuovo stack almeno una volta in modo che un database Zammad sia
   disponibile.
2. Ferma lo stack.
3. Nel caso tu ripristini su uno stack di produzione con archiviazione
   filesystem attivata, dovresti.
4. Copia o sposta i file di backup in `/var/tmp/zammad/restore/` all'interno
   del volume del container **zam
5. Start the stack. The restore process is triggered in the
   ``zammad-backup`` service if the ``restore`` directory is detected and
   the backup files are in place.

   ::: info
   As a part of this process, the cache will be cleared and any pre-existing
   Elasticsearch indexes will be dropped.
   All other containers will be waiting for the restore to finish. When that is the case,
   they will resume their normal operations, which includes an automatic Elasticsearch
   reindexing (depending on the ENV variables). You can check the container logs for
   details.
   :::

6. Dopo che il processo di ripristino è terminato, la cartella `restore` è
   stata rinominata. Puoi tranquillamente.
