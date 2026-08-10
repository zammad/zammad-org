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

Standardmäßig wird jede Nacht um 3 Uhr eine Sicherung erstellt. Die
Sicherung wird im Volume des Containers **zammad-backup** im Verzeichnis
`/var/tmp/zammad` gespeichert. Um eine einmalige Sicherung manuell
auszuführen, verwenden Sie je nach Installationsmethode einen der folgenden
Befehle.

::: tabs key:docker-portainer

=== Docker Compose

Führen Sie in Ihrem Docker-Compose-Verzeichnis folgenden Befehl aus:

```sh
docker compose run --rm --env BACKUP_ONCE=true zammad-backup
```

=== Portainer

Öffnen Sie die [Konsole über die Portainer-Benutzeroberfläche](/de/get-started/installation/docker#ausfuhren-von-befehlen-im-stack) für den
**zammad-backup** Container mit dem Standard-Entrypoint `/bin/bash` und führen Sie Folgendes aus:

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
5. Starten Sie den Stack. Der Wiederherstellungsprozess wird im Dienst
   `zammad-backup` ausgelöst, wenn das Verzeichnis `restore` erkannt wird
   und die Sicherungsdateien vorhanden sind. Im Rahmen dieses Vorgangs wird
   der Rails-Cache geleert. Alle anderen Container warten, bis die
   Wiederherstellung abgeschlossen ist, bevor sie ihren normalen Betrieb
   wieder aufnehmen.
6. Nachdem der Wiederherstellungsprozess abgeschlossen ist, wurde das
   Verzeichnis `restore` umbenannt. Sie können es jetzt löschen.
7. Erstellen Sie den Elasticsearch-Index neu. Sie können Zammad während des
   Neuaufbaus weiterhin nutzen, allerdings ist die Suchleistung
   beeinträchtigt und einige Daten sind in den Suchergebnissen
   möglicherweise vorübergehend nicht verfügbar. Verwenden Sie abhängig von
   Ihrer Installationsmethode einen der folgenden Befehle.

::: tabs key:docker-portainer

=== Docker Compose

Ohne Angabe von CPU-Kernen:

``````sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

Mit Angabe der zu verwendenden CPU-Kerne (Beispiel: 8):

``````sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer

Öffnen Sie die [Konsole über die Portainer-Benutzeroberfläche](/de/get-started/installation/docker#ausfuhren-von-befehlen-im-stack) mit dem
Standard-Entrypoint `/bin/bash` und führen Sie Folgendes aus:

Ohne Angabe der zu verwendenden CPU-Kerne:

``````sh
bundle exec rake zammad:searchindex:rebuild
```

Mit Angabe der zu verwendenden CPU-Kerne (Beispiel: 8):

``````sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
