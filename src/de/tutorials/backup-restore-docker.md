---
order: 6
title: 'Backup & Restore (Docker)'
---

# Backup & Restore (Docker)

Dieser Abschnitt zeigt einige Grundlagen zum Sicherungs- und
Wiederherstellungsprozess für eine auf Docker Compose basierte Installation
von Zammad.

Wenn Sie mit Volume-basierten Backup- und Restore-Prozessen in Docker
vertraut sind und vielleicht bereits eine andere Methode oder ein anderes
Tool verwenden, können Sie diese weiterhin nutzen. Ein Backup würde
typischerweise bedeuten, den Stack herunterzufahren, um sicherzustellen,
dass alle Dateien aus dem Arbeitsspeicher auf die Festplatte geschrieben
werden, dann den Inhalt des Volumes zu sichern und anschließend den Stack
wieder zu starten. Wenn Sie eine solche Methode verwenden, können Sie in
Erwägung ziehen, das Szenario [Backup-Dienst
deaktivieren](/de/reference/docker-compose-scenarios) zu verwenden, damit
der integrierte Backup- und Restore-Prozess von Zammad nicht aktiviert wird.

Der Rest dieser Seite beschreibt den eingebauten Backup- und Restore-Prozess
von Zammads Docker Compose Stack.

Wenn Sie mit Docker vertraut sind, finden Sie im Abschnitt unten die
Informationen, die Sie benötigen. Die Seite [Docker Datei
Handling](/de/tutorials/docker-file-handling) enthält einige Beispiele für
den Umgang mit Sicherungsdateien und das Kopieren in ein Docker-Volume, um
es wiederherzustellen.

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

## Restore

1. Starten Sie den neuen Stack mindestens einmal, damit eine
   Zammad-Datenbank verfügbar ist.
2. Stoppen Sie den Stack.
3. Falls Sie auf einen produktiven Stack mit aktiviertem Dateisystemspeicher
   wiederherstellen, sollten Sie den Inhalt des Verzeichnisses
   `/opt/zammad/storage/` innerhalb des Volumes bereinigen. Der
   Wiederherstellungsprozess fügt dort nur Dateien hinzu bzw. überschreibt
   sie, es findet keine Bereinigung statt.
4. Kopieren oder verschieben Sie die Sicherungsdateien nach
   `/var/tmp/zammad/restore/` innerhalb des Volumes des Containers
   **zammad-backup**. Beachten Sie, dass der Wiederherstellungsprozess immer
   die neueste Sicherung gemäß dem Zeitstempel des Dateinamens
   verwendet. Nur Backups von Paket- und Docker-Installationen werden von
   dieser eingebauten Backup-Methode unterstützt. Kopieren Sie nicht die
   Dateien `latest_zammad_*.gz`, da sie auf einen für den
   Wiederherstellungsprozess unbekannten Ort verweisen.
5. Start the stack. The restore process is triggered in the `zammad-backup`
   service if the `restore` directory is detected and the backup files are
   in place. As a part of this process, the Rails cache will be cleared.
   All other containers wait for the restore to finish before they resume
   their normal operations.
6. Nachdem der Wiederherstellungsprozess abgeschlossen ist, wurde das
   Verzeichnis `restore` umbenannt. Sie können es jetzt löschen.
7. Rebuild the Elasticsearch index. You can use Zammad while the rebuild is
   running, but search performance is degraded and some data may be
   temporarily unavailable in search results. Use one of the commands below,
   depending on your deployment method.

::: tabs key:docker-portainer

=== Docker Compose

Without specifying CPU cores:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer

Open the [console via Portainer's GUI](/en/get-started/installation/docker#how-to-run-commands-in-the-stack) with the
standard entrypoint `/bin/bash` and run:

Without specifying CPU cores to use:

```sh
bundle exec rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
