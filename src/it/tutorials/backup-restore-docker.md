---
order: 6
title: 'Backup e ripristino (Docker)'
---

# Backup e ripristino (Docker)

Questa sezione mostra alcune nozioni di base sul processo di backup e
ripristino per una distribuzione Docker Compose.

Se hai familiarità con le procedure di backup e ripristino basate su volumi
in Docker, e forse.

Il resto di questa pagina descrive il meccanismo di backup e ripristino
integrato dello stack Docker di Zammad.

Se hai familiarità con Docker, le sezioni seguenti includono le informazioni
di cui avrai bisogno.

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
5. Avvia lo stack. Il processo di ripristino viene attivato se la cartella
   `restore` viene rilevata e.
6. Dopo che il processo di ripristino è terminato, la cartella `restore` è
   stata rinominata. Puoi tranquillamente.
