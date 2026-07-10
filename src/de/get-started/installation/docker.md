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
- Erhöhen Sie das Speicherlimit für Elasticsearch auf Linux-Hosts:

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
Szenario zu verwenden. Springen Sie zum Bereich [Anpassen des
Zammad-Stacks](#anpassen-des-zammad-stacks) für weitere Informationen.

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten
Docker-Host und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

## Stack per HTTPS freigeben

Um einen Zammad-Stack im Internet zu veröffentlichen, muss er über das
HTTPS-Protokoll gesichert werden. Um dies zu erreichen, ohne den
Zammad-Stack zu verändern, haben Sie folgende Möglichkeiten:

- Use a reverse proxy like Nginx Proxy Manager (NPM). It has a GUI that
  provides an easy [Let's Encrypt](https://letsencrypt.org/){target=_blank}
  integration.
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

Führen Sie Befehle in Ihrem Docker Stack aus, indem Sie `rails` oder `rake`
über eine der folgenden Methoden mit Hilfe von `bundle exec` aufrufen.

:::: tabs

=== Via Portainer GUI

Suchen Sie den laufenden Rails-Container In der Portainer GUI und klicken Sie auf das
**Exec Console** Icon in der Spalte "Quick Actions", wählen Sie den Standard-Entrypoint `/bin/bash`
und klicken **Connect**.

![Portainer Ausführung Console](/screenshots/get-started/installation/portainer-exec-console.png){width=80%}

Rufen Sie die interaktive Rails-Konsole auf, indem Sie folgenden Befehl ausführen:

```sh
bundle exec rails c
```

Führen Sie einen Befehl direkt aus:

```sh
bundle exec rails r '...Ihren Rails-Befehl...'
```

=== Via Konsole

Führen Sie einen Befehl direkt aus:

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '...Ihren Rails-Befehl...'
```

Rufen Sie die interaktive Rails-Konsole auf um Rails-Befehle einzugeben:

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

Via `docker compose exec`:

```sh
docker compose exec zammad-railsserver bundle exec rails r '...Ihren Rails-Befehl...'
```

::: tip
Wenn Sie Informationen vom Rails-Server abrufen müssen, können Sie z.B,
vor den Rails-Befehl `pp` (pretty print) setzen. Dies führt zu einer
Ausgabe in Ihrem Terminal.
:::

::::
