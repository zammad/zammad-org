---
order: 3
title: Aktualisierung
---

# Zammad aktualisieren

<!--@include: @/de/modules/zammad-services-hint.md-->

Bevor Sie Zammad aktualisieren, empfehlen wir Ihnen dringend, einen Blick in
unsere [Release Notes](https://zammad.com/de/releases){target=_blank} zu
werfen. Dort finden Sie Informationen über Funktionen und Fehlerbehebungen
sowie Anmerkungen zu Änderungen und Breaking Changes.

Beachten Sie, dass Sie bei der Aktualisierung keine Hauptversionen von
Zammad überspringen sollten. Das bedeutet zum Beispiel, dass Ihr
Upgrade-Pfad von Version `2.4` auf `5.1` (unter der Annahme, dass dies die
aktuelle stabile Version ist) folgendermaßen aussehen würde: `2.4` → `3.0` →
`4.0` → `5.0` → `letzte stabile Version (5.1)`

## Paket-Installation aktualisieren

### Abhängigkeiten prüfen

Bevor Sie fortfahren, überprüfen Sie, ob Ihre Systemumgebung den
Anforderungen von Zammad entspricht (siehe
[Voraussetzungen](installation/prerequisites) und
[Paketinstallation](installation/package)).

### Zammad stoppen

```sh
sudo systemctl stop zammad
```

### Backup von Zammad

Erstellen Sie ein Backup. Sie können das
[Backup-Skript](/de/tutorials/backup-restore) verwenden, das mit dem
Zammad-Paket ausgeliefert wird.

### Zammad aktualisieren

:::info
Wenn Sie Ihr gesamtes System aktualisieren und es gibt Updates für Zammad **und** Ihren
Datenbankserver, kann dies zu Fehlern führen, da Ihre Datenbank möglicherweise nicht
wieder online ist, wenn Zammad aktualisiert wird.

In einem solchen Fall sollten Sie Zammad vorübergehend von der Aktualisierung ausschließen, wie
in den folgenden Befehlen zu sehen.
:::

:::tabs key:distros

=== Ubuntu

Paketlisten aktualisieren:

```sh
sudo apt update
```

Aktualisierung für Zammad deaktivieren:

```sh
sudo apt-mark hold zammad
```

Alle Pakete außer Zammad aktualisieren:

```sh
sudo apt upgrade
```

Aktivieren der Aktualisierung für Zammad:

```sh
sudo apt-mark unhold zammad
```

Zammad aktualisieren:

```sh
sudo apt upgrade
```

=== Debian

Paketlisten aktualisieren:

```sh
sudo apt update
```

Aktualisierung für Zammad deaktivieren:

```sh
sudo apt-mark hold zammad
```

Alle Pakete außer Zammad aktualisieren:

```sh
sudo apt upgrade
```

Aktivieren der Aktualisierung für Zammad:

```sh
sudo apt-mark unhold zammad
```

Zammad aktualisieren:

```sh
sudo apt upgrade
```

=== OpenSUSE/SLES

Paketlisten aktualisieren:

```sh
sudo zypper refresh
```

Aktualisierung für Zammad deaktivieren:

```sh
sudo zypper addlock zammad
```

Alle Pakete außer Zammad aktualisieren:

```sh
sudo zypper update
```

Aktivieren der Aktualisierung für Zammad:

```sh
sudo zypper removelock zammad
```

Zammad aktualisieren:

```sh
sudo zypper update
```

=== CentOS/RHEL

Paketlisten aktualisieren:

```sh
sudo yum check-update
```

Alle Pakete außer Zammad aktualisieren:

```sh
sudo yum upgrade --exclude zammad
```

Zammad aktualisieren:

```sh
sudo yum upgrade
```

:::

### Zusätzliche Schritte

Auch die Aktualisierung von Elasticsearch kann relevant sein. Stellen Sie
sicher, dass Sie eine unterstützte Version von Elasticsearch installiert
haben (siehe
[Paket-Installation](/de/get-started/installation/package#elasticsearch) für
unterstützte Versionen).

Wenn Sie Elasticsearch aktualisieren müssen, werfen Sie bitte einen Blick
auf [deren
Dokumentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html){target=_blank}
und folgen Sie den Anweisungen.

### Elasticsearch-Index erneuern <Badge type="tip" text="optional" />

Wird nur benötigt, wenn Sie in den Release-Notes aufgefordert werden, den
Elasticsearch-Index neu zu erstellen.

Ohne Vorgabe der zu verwendenden CPU-Kerne:

```sh
zammad run rake zammad:searchindex:rebuild
```

Mit Vorgabe der zu verwendenden CPU-Kerne (Beispiel 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

### Zammad starten

```sh
sudo systemctl start zammad
```

## Docker-Installation aktualisieren

::: warning
Aktualisierungen des Docker Compose Stacks können zusätzliche Schritte erfordern
oder Breaking Changes beinhalten. Prüfen Sie immer zuerst die [Docker Compose Release-Notes](https://github.com/zammad/zammad-docker-compose/releases)
auf Hinweise für die Aktualisierungen.
:::

### Portainer-basierte Installation aktualisieren

Klicken Sie in Ihrem Zammad-Stack auf `Pull and redeploy`, aktivieren Sie
**Re-pull image and redeploy** und klicken Sie auf `Update`.

![Hervorhebung der Stack-Aktualisierung in
Portainer](/screenshots/installation/portainer-stack-update.png)

### Docker Compose-basierten Installation aktualisieren

```sh
cd zammad-docker-compose
```

```sh
git pull
```

```sh
docker compose pull
```

```sh
docker compose up -d
```

### Elasticsearch-Index erneuern <Badge type="tip" text="optional" />

Wird nur benötigt, wenn Sie in den Release-Notes aufgefordert werden, den
Elasticsearch-Index neu zu erstellen.

:::tabs

=== Docker Compose

Ohne Angabe von CPU-Kernen:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

Mit Angabe von CPU-Kernen (Beispiel 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer GUI

Open the [console via Portainer's GUI](installation/docker#how-to-run-commands-in-the-stack) with the standard
entrypoint `/bin/bash` and run:

Ohne Angabe von CPU-Kernen:

```sh
bundle exec rake zammad:searchindex:rebuild
```

Mit Angabe von CPU-Kernen (Beispiel 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
