---
order: 5
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
deaktivieren](/de/reference/docker-compose-scenarios) zu verwenden, damit der
integrierte Backup- und Restore-Prozess von Zammad nicht aktiviert wird.

Der Rest dieser Seite beschreibt den eingebauten Backup- und Restore-Prozess
von Zammads Docker Compose Stack.

Wenn Sie mit Docker vertraut sind, finden Sie im Abschnitt Schnellstart
unten die Informationen, die Sie benötigen. Die Seite [Docker Datei
Handling](/de/tutorials/docker-file-handling) enthält einige Beispiele für
den Umgang mit Sicherungsdateien und das Kopieren in ein Docker-Volume, um
es wiederherzustellen.

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
4. Kopieren oder verschieben Sie die Sicherungsdateien nach
   `/var/tmp/zammad/restore/` innerhalb des Volumes des Containers
   **zammad-backup**. Beachten Sie, dass der Wiederherstellungsprozess immer
   die neueste Sicherung gemäß dem Zeitstempel des Dateinamens
   verwendet. Nur Backups von Paket- und Docker-Installationen werden von
   dieser eingebauten Backup-Methode unterstützt. Kopieren Sie nicht die
   Dateien `latest_zammad_*.gz`, da sie auf einen für den
   Wiederherstellungsprozess unbekannten Ort verweisen.
5. Starten Sie den Stack. Der Wiederherstellungsprozess wird angestoßen,
   wenn das Verzeichnis `restore` erkannt wird und die Sicherungsdateien
   vorhanden sind.
6. Nachdem der Wiederherstellungsprozess abgeschlossen ist, wurde das
   Verzeichnis `restore` umbenannt. Sie können es jetzt löschen.
