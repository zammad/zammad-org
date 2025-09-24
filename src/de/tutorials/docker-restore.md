---
order: 5
title: 'Backup & Restore (Docker)'
---

# Backup & Restore (Docker)

This section shows some basics about the backup and restore process for a
Docker Compose based deployment of Zammad.

If you are familiar with volume based backup and restore procedures in
Docker, and perhaps already use a different method or tool, then you can
keep using it. A backup would typically mean shutting down the stack to
ensure all in-memory files get written to disk, then backing up the volume
contents, and then starting the stack again. When using such method, you can
consider using the [disable-backup-service
scenario](/en/reference/docker-compose-scenarios) so that the built-in
backup and restore mechanism of Zammad is not activated.

The rest of this page describes the built-in backup and restore mechanism of
Zammad's Docker Compose stack.

If you're familiar with Docker, the sections below include the information
you'll need. The [Docker file handling](/en/tutorials/docker-file-handling)
page covers some examples about how to handle the backup files and to copy
it into a Docker volume to restore it.

## Backup

Standardmäßig wird bei jedem Start des Stacks sowie nachts um 3 Uhr ein
Backup erstellt. Das Backup wird im Volume des Containers **zammad-backup**
unter `/var/tmp/zammad` gespeichert.

## Restore

1. Starten Sie den neuen Stack mindestens einmal, damit eine
   Zammad-Datenbank verfügbar ist.
2. Stoppen Sie den Stack.
3. Falls Sie auf einen produktiven Stack mit aktiviertem Dateisystemspeicher
   wiederherstellen, sollten Sie den Inhalt des Verzeichnisses
   `/opt/zammad/storage/` innerhalb des Volumes bereinigen. Der
   Wiederherstellungsprozess fügt dort nur Dateien hinzu bzw. überschreibt
   sie, es findet keine Bereinigung statt.
4. Copy or move the backup files to `/var/tmp/zammad/restore/` inside the
   volume of the **zammad-backup** container. Be aware that the restore
   process always uses the latest backup according to the timestamp of the
   file name. Only backups from package and Docker installations are
   supported by this built-in backup method. Don't provide the
   `latest_zammad_*.gz` files because they link to an unknown location for
   the restore process.
5. Starten Sie den Stack. Der Wiederherstellungsprozess wird angestoßen,
   wenn das Verzeichnis `restore` erkannt wird und die Sicherungsdateien
   vorhanden sind.
6. Nachdem der Wiederherstellungsprozess abgeschlossen ist, wurde das
   Verzeichnis `restore` umbenannt. Sie können es jetzt löschen.
