---
order: 6
title: 'Docker Datei Handling Beispiele'
---

# Docker Datei Handling Beispiele

Wenn Sie nicht sicher sind, wie Sie mit den Sicherungsdateien umgehen und
wie Sie das Verzeichnis `restore` im Docker-Volume erstellen, finden Sie
unten einige Beispiele.

## Wiederherstellung innerhalb eines Stacks

**Erfordert:** Konsolenzugriff auf den Container zammad-backup.

Wenn Sie eine Sicherung innerhalb eines Stacks wiederherstellen möchten,
müssen Sie nur das Verzeichnis erstellen und die Dateien dorthin
kopieren/verschieben. Das folgende Beispiel startet den Container
**zammad-backup** und kopiert _alle_ .gz-Dateien aus dem Backup- in das
Restore-Verzeichnis:

``` sh
docker compose run --rm zammad-backup bash -c "mkdir /var/tmp/zammad/restore; cp /var/tmp/zammad/*.gz /var/tmp/zammad/restore -v"
```

Starten Sie nun den Stack, um den Wiederherstellungsprozess durchzuführen.

## Wiederherstellen von einer anderen Installation

**Erfordert:** Konsolenzugriff auf das Hostsystem und den Container zammad-backup.

Um Ihre Sicherungsdateien aus einer anderen Docker Compose Installation zu
**holen**, können Sie diese mit `docker compose cp` auf das Hostsystem
kopieren:

``` sh
docker compose cp zammad-backup:/var/tmp/zammad/ /path/to/your/host/directory/
```

Falls Sie Ihre Sicherungsdateien aus einer Paketinstallation suchen, finden
Sie auf der Seite[Backup & Restore (Paket)](/de/tutorials/backup-restore)
weitere Informationen. Sie brauchen keinen vollständigen Dump, um Ihre
Sicherung wiederherzustellen.

Um die Sicherung **wiederherzustellen**, legen Sie Ihre Dateien in einem
Ordner namens `restore` auf dem Host-System ab. Dieser Ordner wird
vorübergehend in das Verzeichnis `/restore` im Backup-Container
eingebunden. Das temporäre Verzeichnis wird dann in das aktuelle Verzeichnis
kopiert:

``` sh
docker compose run --rm -v /path/to/your/host/directory:/restore zammad-backup bash -c "cp -rv /restore /var/tmp/zammad/"
```

Starten Sie nun den Stack, um den Wiederherstellungsprozess durchzuführen.

## Verwendung einer Web-GUI

**Erfordert:** Konsolenzugriff auf das Hostsystem oder Portainer-Zugriff mit der Berechtigung, einen Container zu starten.

Dies kann nützlich sein, wenn Sie Portainer zur Bereitstellung von Zammad
verwenden und nur begrenzten Zugriff auf das Hostsystem haben.

Unser Beispiel verwendet das Tool [filebrowser](https://filebrowser.org/),
aber jedes ähnliche Tool sollte ebenfalls funktionieren. Wenn Sie ein
solches Tool dauerhaft verwenden möchten, stellen Sie sicher, dass Sie
zusätzliche Volumes für die Persistenz bereitstellen (z.B. für deren
Datenbank).

::: info

Die folgenden Schritte beschreiben den Wiederherstellungsprozess durch Hochladen von Dateien. Um Ihre Sicherungsdateien auf die gleiche Weise aus einem anderen
Stack zu bekommen, können Sie die Schritte 1-4 unten ausführen und einfach das Volume **zammad-backup** Ihres _alten_ Stacks mounten. Dann können Sie
die Dateien herunterladen, den Filebrowser-Container stoppen, entfernen und ihn erneut mit den folgenden Schritten ausführen.

:::

1. Filebrowser starten

   ::: tabs

   === Via console

   Deploy the container and provide the volume of **zammad-backup** and
   a port under which you want to access the web UI:

   ``` sh
   docker run -v zammad-docker-compose_zammad-backup:/srv -p 8089:80 filebrowser/filebrowser
   ```

   === Via Portainer

   In your Portainer web UI, go to **Containers** in the left menu and
   click the `Add container` button.

   Add the following information:

   - Name: enter a name which is not already in use.
   - Image: `filebrowser/filebrowser`
   - Map additional port: choose a port and map it to port `80` in the container.
   - Advanced container settings:
     - Switch to **Volumes** and click the `map additional volume` button.
     - Enter `/srv` in the container section and select the volume containing `zammad-backup`
   - Finally, click on **Deploy the container**.

   :::

2. Nach dem Start des Containers rufen Sie die Weboberfläche über die
   IP-Adresse und den Port auf, den Sie festgelegt haben.
3. Melden Sie sich mit den Standard-Zugangsdaten `admin` / `admin` an.
4. Sie sollten nun mindestens 2 .gz-Dateien sehen, deren Namen einen
   Zeitstempel beinhaltet.
5. Erstellen Sie einen neuen Ordner, indem Sie die Schaltfläche auf der
   linken Seite verwenden. Nennen Sie ihn `restore`.
6. Öffnen Sie diesen Ordner und laden Sie Ihre Sicherungsdateien hoch (oben
   rechts mit dem Pfeil nach oben). Wenn der Upload fehlschlägt, müssen Sie
   möglicherweise die Berechtigungen der Dateien ändern (z.B. auf lesbar für
   alle).

Starten Sie nun den Stack, um den Wiederherstellungsprozess
auszuführen. Danach können Sie den umbenannten Ordner löschen und
Filebrowser beenden.
