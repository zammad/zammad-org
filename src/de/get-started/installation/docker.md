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

- Eine funktionierende Docker Compose-Umgebung
- Mindestens 4GB Arbeitsspeicher zum Ausführen der Container
- Increase the memory limit for Elasticsearch on Linux hosts:

  ```sh
  sudo sysctl -w vm.max_map_count=262144
  ```

## Installation mit Portainer

Der einfachste Weg, Zammad zum Laufen zu bringen, ist über eine grafische
Docker-Oberfläche. Wir empfehlen
[Portainer](https://www.portainer.io/){target=_blank}.
Installationsanweisungen finden Sie in der [Portainer
Dokumentation](https://docs.portainer.io/){target=_blank}.

### Schritt 1: Stack hinzufügen

In the Portainer GUI (e.g. `https://yourdomain.tld:9443`), choose your
target environment, select **Stacks** and click on `Add stack` as you can
see in the screenshot below.

![Screenshot mit Abschnitt Stack und markiertem "Add Stack" in
Portainer.](/screenshots/installation/portainer-stacks.png)

### Schritt 2: Aus dem Repository erstellen

Wechseln Sie zur **Repository** "Build Method" und geben Sie die folgenden
Informationen an:

- **Name**: Geben Sie einen Namen für den Stack ein
- **Repository URL**: `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (default)

In case our default environment is not what you are looking for, you can
customize the stack using predefined scenarios and adjust environment
variables. Jump to the [customization
section](#customizing-the-zammad-stack) below to find more information.

![Stack-Erstellung mit Informationen aus der
Repository-Ansicht](/screenshots/installation/portainer-stack-creation.png)

### Schritt 3: Starten des Stacks

Klicken Sie schließlich auf die Schaltfläche `Deploy the stack`. Beim ersten
Mal kann es einige Zeit dauern, bis die Docker-Images abgerufen werden.

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten
Docker-Host und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

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

In case our default environment is not what you are looking for, you can
customize the stack using predefined scenarios and adjust environment
variables. Jump to the [customization
section](#customizing-the-zammad-stack) below to find more information.

### Schritt 3: Starten des Stacks

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Optional: Verwenden Sie eine zusätzliche `.yml`-Datei, um ein vordefiniertes
Szenario zu verwenden. Springen Sie zum Bereich [Anpassen des
Zammad-Stacks](#anpassen-des-zammad-stacks) für weitere Informationen.

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten
Docker-Host und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

## Stack per HTTPS freigeben

Um einen Zammad-Stack im Internet zu veröffentlichen, muss er über das
HTTPS-Protokoll gesichert werden. Um dies zu erreichen, ohne den
Zammad-Stack zu verändern, können Sie:

- Verwenden Sie einen Reverse-Proxy wie Nginx Proxy Manager (NPM). Er hat
  eine grafische Benutzeroberfläche, die eine einfache [Let's
  Encrypt](https://letsencrypt.org/)-Integration ermöglicht.
- Verwenden Sie einen Cloudflare-Tunnel, der eine SSL-Terminierung
  ermöglicht.

Beide Szenarien werden auf der separaten Seite [Docker Compose
Szenarien](/de/reference/docker-compose-scenarios) beschrieben.

## Anpassen des Zammad-Stacks

Der Zammad-Stack kann durch das Laden zusätzlicher Szenario-Dateien für
gängige Anwendungsfälle angepasst werden. Sie können den Stack zum Beispiel
mit einem integrierten Nginx Proxy Manager (NPM) oder mit deaktivierten
PostgreSQL- oder Elasticsearch-Diensten bereitstellen, falls Sie diese
Dienste bereits nutzen.

Bitte lesen Sie unter [Docker Compose
Szenarien](/de/reference/docker-compose-scenarios) weiter.

Um den Stack und die Einstellungen anzupassen, verwenden Sie
[Docker-spezifische
Umgebungsvariablen](/de/reference/environment-variables).

## Ausführen von Befehlen im Stack

Execute commands in your Docker stack by calling `rails` or `rake` via one
of the following methods by using `bundle exec`.

::::tabs

=== Via Portainer GUI

In your Portainer GUI, go to the container view and select the running Rails container from your Zammad stack. Click
on the **Exec Console** icon in the "Quick Actions" column, select the standard `/bin/bash` entrypoint and click
**Connect**.

![Portainer console execution](/screenshots/installation/portainer-exec-console.png){width=80%}

Run the interactive Rails console by executing:

```sh
bundle exec rails c
```

Directly execute a specific command:

```sh
bundle exec rails r '...your rails command here...'
```

=== Via console

Directly execute a specific command:

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '...your rails command here...'
```

Run the interactive Rails console to manually enter Rails commands:

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

::::
