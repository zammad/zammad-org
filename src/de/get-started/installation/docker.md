---
order: 3
title: Docker
---

# Installation via Docker

Zammad can be deployed using Docker-Compose. You can even use graphical
docker front ends like
[Portainer](https://www.portainer.io/){target=_blank}.

::: info

We do not provide support in terms of Docker (-Compose) or Portainer specific
problems. If you choose to run Zammad via Docker, support is only provided for
the Zammad application.
:::

## Voraussetzungen

- Eine funktionierende Docker Compose-Umgebung
- Mindestens 4GB Arbeitsspeicher zum Ausführen der Container
- Passen Sie die Einstellungen Ihres Hosts an, damit Elasticsearch ordnungsgemäß läuft:
    ```sh
    sysctl -w vm.max_map_count=262144
    ```

## Installation mit Portainer

The easiest way to get Zammad running is via a graphical docker UI. We
recommend [Portainer](https://www.portainer.io/){target=_blank}. For
installation instructions, check out [Portainer's
documentation](https://docs.portainer.io/){target=_blank}.

### Schritt 1: Stack hinzufügen
Wählen Sie in der Portainer-GUI (z.B. `https://yourdomain.tld:9443`) Ihre
Zielumgebung aus, wählen Sie **Stacks** und wählen Sie `Add stack`, wie Sie
im Screenshot unten sehen können.

### Schritt 2: Aus dem Repository erstellen
Wechseln Sie zur Erstellungsmethode **Repository** und geben Sie die
folgenden Informationen an: - **Name**: Geben Sie den gewünschten Namen des
Stacks ein - **Repository URL**:
`https://github.com/zammad/zammad-docker-compose` - **Repository
reference**: `refs/heads/master` - **Compose path**: `docker-compose.yml`
(Standard)

Optional: if you need to provide environment variables, you can enter them
in the **Environment variable** section or even upload a .env file. See [env
template](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
as an example.

### Schritt 3: Starten des Stacks
Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten Host
und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

![Screenshot mit Abschnitt Stack und markiertem "Add Stack" in
Portainer.](/screenshots/installation/portainer-stacks.png)

![Stack-Erstellung mit Informationen aus der
Repository-Ansicht](/screenshots/installation/portainer-stack-creation.png)

## Installation mit Docker-Compose

### Schritt 1: Klonen des GitHub Repo

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```
Make sure to run `git pull` frequently to fetch updates. Alternatively, you
can download the files from the [releases
page](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}.

### Schritt 2: Umgebung nach Bedarf anpassen

In einigen Fällen ist unsere Standardumgebung nicht das, wonach ein Benutzer
von Docker-Compose sucht. Siehe [Docker
Umgebungsvariablen](/de/reference/docker-env-vars.md) für Details zu den
Einstellungen, die konfiguriert werden können.

::: tip
Wenn Sie eine `.env`-Datei verwenden wollen, können Sie die mitgelieferte `.env.dist`
Datei verwenden und sie nach `.env` kopieren. Auf diese Weise wird sie von Docker-Compose
automatisch übernommen und bei Aktualisierungen nicht überschrieben.

Zammad läuft standardmäßig auf Port `8080`. Wenn Sie einen anderen Port verwenden möchten,
können Sie ihn über die Variable `NGINX_EXPOSE_PORT` einstellen.
:::

### Schritt 3: Starten des Stacks
```sh
cd zammad-docker-compose
```
```sh
docker compose up -d
```

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten Host
und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

## Anpassen des Zammad-Stacks

Sometimes it's necessary to apply local changes to the Zammad docker stack,
e.g. to include additional services. If you plan to do so, we recommend that
you do not change the `docker-compose.yml` file, but instead create a local
`docker-compose.override.yml` that includes all your modifications.
Docker-Compose will [automatically load this file and merge its changes into
your
stack](https://docs.docker.com/compose/multiple-compose-files/merge/){target=_blank}.

## Befehle im Stack ausführen

Das Docker-Entrypoint-Skript richtet Umgebungsvariablen ein, die Zammad
benötigt, um ordnungsgemäß zu funktionieren. Deshalb sollte der Aufruf von
`rails` oder `rake` auf der Konsole über eine der folgenden Methoden
erfolgen:

Direktes Ausführen eines bestimmten Befehls:
```sh
docker compose run --rm zammad-railsserver rails r '...Ihr Rails Befehl...'
```
Führen Sie die interaktive Rails-Konsole aus, um Rails-Befehle manuell
einzugeben:
```sh
docker compose run --rm zammad-railsserver rails c
```
Über "docker exec":
```sh
docker exec zammad-docker-compose-zammad-railsserver-1 /docker-entrypoint.sh rails r '...Ihr Rails Befehl...'
```

::: tip
Wenn Sie Informationen vom Rails-Server abrufen müssen, können Sie z.B,
vor den Rails-Befehl `pp` (pretty print) setzen. Dies führt zu einer
Ausgabe in Ihrem Terminal.
:::