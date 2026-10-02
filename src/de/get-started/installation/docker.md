---
order: 3
title: Docker
---

# Docker-Installation

Zammad kann per Docker Compose installiert werden. Sie können sogar
grafische Docker-Oberflächen wie
[Portainer](https://www.portainer.io/){target=_blank} verwenden.

::: info

Wir bieten keinen Support in Bezug auf Docker (-Compose) oder Portainer-spezifische Probleme.
Wenn Sie sich dafür entscheiden, Zammad per Docker zu installieren, kann Support nur für Zammad
als Anwendung geleistet werden.
:::

## Voraussetzungen

- Stellen Sie sicher, dass Ihre Docker-Compose-Konfiguration den
  [Anforderungen](https://github.com/zammad/zammad-docker-compose#requirements){target=_blank}
  entspricht, die Sie in der README-Datei des Docker-Compose-Repositorys von
  Zammad finden.
- Stellen Sie sicher, dass mindestens 4 GB RAM zur Verfügung stehen, um die
  Container auszuführen.
- Passen Sie die Einstellungen Ihres Hosts an, damit Elasticsearch
  ordnungsgemäß läuft:

  ```sh
  sudo sysctl -w vm.max_map_count=262144
  ```

## Installation per Docker Compose

### Schritt 1: Klonen des GitHub Repo

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Stellen Sie sicher, dass Sie `git pull` regelmäßig ausführen, um
Aktualisierungen zu erhalten. Alternativ können Sie die Dateien auch von der
[Release
Seite](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}
herunterladen.

### Schritt 2: Umgebung nach Bedarf anpassen

Falls unsere Standardumgebung nicht Ihren Vorstellungen entspricht, können
Sie den Stack mithilfe von vordefinierten Szenarien anpassen und
Umgebungsvariablen verwenden. Weitere Informationen finden Sie im Abschnitt
[Anpassung](#anpassen-des-zammad-stacks) weiter unten.

### Schritt 3: Starten des Stacks

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Optional: Verwenden Sie eine zusätzliche `.yml`-Datei, um ein vordefiniertes
Szenario zu verwenden. Lesen Sie im Abschnitt [Anpassung des
Stacks](#customizing-the-zammad-stack) weiter.

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten
Docker-Host und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

## Installation mit Portainer

Der einfachste Weg, Zammad zum Laufen zu bringen, ist über eine grafische
Docker-Oberfläche. Wir empfehlen
[Portainer](https://www.portainer.io/){target=_blank}.
Installationsanweisungen finden Sie in der [Portainer
Dokumentation](https://docs.portainer.io/){target=_blank}.

### Schritt 1: Stack hinzufügen

Wählen Sie in der Portainer-GUI (z.B. `https://yourdomain.tld:9443`) Ihre
Zielumgebung aus, wählen Sie **Stacks** und klicken Sie auf `Add stack`, wie
Sie im Screenshot unten sehen können.

![Screenshot mit Abschnitt Stack und markiertem "Add Stack" in
Portainer.](/screenshots/get-started/installation/portainer-stacks.png)

### Schritt 2: Aus dem Repository erstellen

Wechseln Sie zur **Repository** "Build Method" und geben Sie die folgenden
Informationen an:

- **Name**: Geben Sie einen Namen für den Stack ein
- **Repository URL**: `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (default)

Falls unsere Standardumgebung nicht Ihren Vorstellungen entspricht, können
Sie den Stack mithilfe von vordefinierten Szenarien anpassen und
Umgebungsvariablen verwenden. Weitere Informationen finden Sie im Abschnitt
[Anpassung](#anpassen-des-zammad-stacks) weiter unten.

![Stack-Erstellung mit Informationen aus der
Repository-Ansicht](/screenshots/get-started/installation/portainer-stack-creation.png)

### Schritt 3: Starten des Stacks

Klicken Sie schließlich auf die Schaltfläche `Deploy the stack`. Beim ersten
Mal kann es eine Weile dauern, bis die Docker-Images heruntergeladen wurden.

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten
Docker-Host und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

## Stack per HTTPS freigeben

Um einen Zammad-Stack im Internet zu veröffentlichen, muss dieser über das
HTTPS-Protokoll gesichert sein. Um dies zu erreichen, ohne den Zammad-Stack
zu ändern, haben Sie folgende Möglichkeiten:

- Verwenden Sie einen Reverse-Proxy wie Nginx Proxy Manager (NPM). Er hat
  eine grafische Benutzeroberfläche, die eine einfache [Let's
  Encrypt](https://letsencrypt.org/){target=_blank}-Integration ermöglicht.
- Verwenden Sie einen Cloudflare-Tunnel, der eine SSL-Terminierung
  ermöglicht.

Beide Szenarien werden auf der separaten Seite [Docker Compose
Szenarien](/de/reference/docker-compose-scenarios) beschrieben.

## Anpassen des Zammad-Stacks

Der Zammad-Docker-Compose-Stack ist mit seinen Standardeinstellungen
einsatzbereit. Sie können ihn an Ihre Umgebung anpassen, indem Sie
vordefinierte Szenariodateien laden, Umgebungsvariablen anpassen und für
Ihre Instanz spezifische Dateien hinzufügen.

Sehen Sie sich die [Docker Compose Szenario
Seite](/de/reference/docker-compose-scenarios) für unterstützte
Anwendungsfälle und detaillierte Anweisungen zum Laden von Szenarios
an. Ändern Sie einzelne Einstellungen über [Docker-spezifische
Umgebungsvariablen](/de/reference/environment-variables).

Wenn Sie Docker Compose für den Stack verwenden und das Repository geklont
haben, verwenden Sie dessen `local/` Verzeichnis für eigene Dateien. Weitere
Details finden Sie im Abschnitt [Stack lokal
anpassen](/de/reference/docker-compose-scenarios#customize-the-stack-locally].

## Ausführen von Befehlen im Stack

Führen Sie Befehle in Ihrem Docker Stack aus, indem Sie `rails` oder `rake`
über eine der folgenden Methoden mit Hilfe von `bundle exec` aufrufen.

:::: tabs key:docker-portainer

=== Docker Compose

Einen bestimmten Befehl direkt ausführen:

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '...your rails command here...'
```

Die Rails-Console starten, um Rails-Befehle auszuführen:

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

Via `docker compose exec`:

```sh
docker compose exec zammad-railsserver bundle exec rails r '...your rails command here...'
```

::: tip
Wenn Sie Informationen vom Rails-Server abrufen müssen, können Sie z.B,
vor den Rails-Befehl `pp` (pretty print) setzen. Dies führt zu einer
Ausgabe in Ihrem Terminal.
:::

=== Portainer

Wechseln Sie in Ihrer Portainer-Benutzeroberfläche zur Containeransicht und wählen Sie den laufenden
Rails-Container aus Ihrem Zammad-Stack aus. Klicken Sie in der Spalte "Quick Actions" auf das Symbol **Exec Console**,
wählen Sie den Standard-Entrypoint `/bin/bash` aus und klicken Sie auf **Connect**.

![Portainer Console Ausführung](/screenshots/get-started/installation/portainer-exec-console.png)

Führen Sie die interaktive Rails-Konsole aus, indem Sie folgenden Befehl ausführen:

```sh
bundle exec rails c
```

Führen Sie direkt einen bestimmten Befehl aus:

```sh
bundle exec rails r '...Ihr Rails-Befehl hier...'
```

::::
