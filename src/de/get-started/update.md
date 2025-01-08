---
order: 3
title: Aktualisierung
---

# Zammad aktualisieren

<!--@include: @/de/modules/zammad-services-hint.md-->

Bevor Sie Zammad aktualisieren, empfehlen wir Ihnen dringend, einen Blick in
unsere [Release Notes](https://zammad.com/de/releases) zu werfen. Dort
finden Sie Informationen über Funktionen und Fehlerbehebungen sowie
Anmerkungen zu Änderungen und Breaking Changes.

Beachten Sie, dass Sie bei der Aktualisierung keine Hauptversionen von
Zammad überspringen sollten. Das bedeutet zum Beispiel, dass Ihr
Upgrade-Pfad von Version `2.4` auf `5.1` (unter der Annahme, dass dies die
aktuelle stabile Version ist) folgendermaßen aussehen würde: `2.4` → `3.0` →
`4.0` → `5.0` → `letzte stabile Version (5.1)`

## Paketinstallation aktualisieren

### Zammad stoppen
```sh
systemctl stop zammad
```

### Backup von Zammad
Erstellen Sie ein Backup. Sie können das [Backup
Script](/de/tutorials/backup-restore) verwenden, das mit dem Zammad-Paket
ausgeliefert wird.

### Zammad aktualisieren

:::info
Wenn Sie Ihr gesamtes System aktualisieren und es gibt Updates für Zammad **und** Ihren
Datenbankserver, kann dies zu Fehlern führen, da Ihre Datenbank möglicherweise nicht
wieder online ist, wenn Zammad aktualisiert wird.

In einem solchen Fall sollten Sie Zammad vorübergehend von der Aktualisierung ausschließen, wie
in den folgenden Befehlen zu sehen.
:::

:::tabs

=== Ubuntu/Debian
Update Packet-Liste:
```sh
apt update
```
Update für Zammad deaktivieren:
```sh
apt-mark hold zammad
```
Alle Pakete außer Zammad aktualisieren:
```sh
apt upgrade
```
Re-Aktivierung der Updates für Zammad:
```sh
apt-mark unhold zammad
```
Update von Zammad:
```sh
apt upgrade
```

=== OpenSUSE/SLES

Update Packet-Liste
```sh
zypper refresh
```
Update für Zammad deaktivieren:
```sh
zypper addlock zammad
```
Alle Pakete außer Zammad aktualisieren:
```sh
zypper update
```
Re-Aktivierung der Updates für Zammad:
```sh
zypper removelock zammad
```
Update von Zammad:
```sh
zypper update
```
=== CentOS/RHEL

Update Packet-Liste:
```sh
yum check-update
```
Alle Pakete außer Zammad aktualisieren:
```sh
yum upgrade --exclude zammad
```
Update von Zammad:
```sh
yum upgrade
```
:::

### Zusätzliche Schritte

Auch die Aktualisierung von Elasticsearch kann relevant sein. Stellen Sie
sicher, dass Sie eine unterstützte Version von Elasticsearch installiert
haben (siehe
[Paket-Installation](/de/get-started/installation/package#elasticsearch) für
unterstützte Versionen).

Wenn Sie Elasticsearch aktualisieren müssen, werfen Sie bitte einen Blick
auf [deren Dokumentation]
(https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html)
und folgen Sie den Anweisungen.

Falls Sie Plugins für Elasticsearch verwenden, stellen Sie sicher, dass
diese ebenfalls aktualisiert werden (Hinweis: Ab Elasticsearch 8 ist das
Ingest-Attachment-Plugin nicht mehr notwendig, sondern ist Bestandteil von
Elasticsearch selbst).

### Zammad starten
```sh
systemctl start zammad
```

## Docker-Installation aktualisieren

::: warning
Aktualisierungen des Docker-Compose Stacks können zusätzliche Schritte erfordern
oder Breaking Changes beinhalten. Prüfen Sie immer zuerst die Docker-Compose
Versionshinweise auf Hinweise für die Aktualisierungen.
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
docker-compose pull
```
```sh
docker-compose up -d
```