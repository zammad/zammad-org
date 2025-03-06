---
order: 3
title: Docker
---

# Installation via Docker

Zammad can be deployed using Docker-Compose. You can even use graphical
Docker front ends like
[Portainer](https://www.portainer.io/){target=_blank}.

::: info

Wir bieten keinen Support in Bezug auf Docker (-Compose) oder Portainer-spezifische Probleme. Wenn Sie sich dafür entscheiden, Zammad per Docker zu installieren, kann Support nur für Zammad als Anwendung geleistet werden.
:::

## Voraussetzungen

- Eine funktionierende Docker Compose-Umgebung
- Mindestens 4GB Arbeitsspeicher zum Ausführen der Container
- Adjust your host's settings to run Elasticsearch properly:

    ```sh
    sysctl -w vm.max_map_count=262144
    ```

## Installation mit Portainer

The easiest way to get Zammad running is via a graphical Docker UI. We
recommend [Portainer](https://www.portainer.io/){target=_blank}. For
installation instructions, check out [Portainer's
documentation](https://docs.portainer.io/){target=_blank}.

### Schritt 1: Stack hinzufügen

Wählen Sie in der Portainer-GUI (z.B. `https://yourdomain.tld:9443`) Ihre
Zielumgebung aus, wählen Sie **Stacks** und wählen Sie `Add stack`, wie Sie
im Screenshot unten sehen können.

![Screenshot mit Abschnitt Stack und markiertem "Add Stack" in
Portainer.](/screenshots/installation/portainer-stacks.png)

### Schritt 2: Aus dem Repository erstellen

Switch to **Repository** build method and provide the information below:

- **Name**: enter a desired name of the stack
- **Repository URL**: `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (default)

In some cases, our default environment is not what a Docker-Compose user is
looking for. You can customize the stack using pre-defined scenarios and
adjust environment variables. Jump to the [customization
section](#customizing-the-zammad-stack) below to find more information.

![Stack-Erstellung mit Informationen aus der
Repository-Ansicht](/screenshots/installation/portainer-stack-creation.png)

### Schritt 3: Starten des Stacks

Finally, click **Deploy the stack** button. The first time, it may take some
time until the Docker images are fetched.

After the stack is ready, you can access Zammad via the configured Docker
host and port, e.g. `http://localhost:8080/`.

## Installation mit Docker-Compose

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

In some cases, our default environment is not what a Docker-Compose user is
looking for. You can customize the stack using pre-defined scenarios and
adjust environment variables. Jump to the [Customizing the Zammad
Stack](#customizing-the-zammad-stack) section below to find more
information.

### Schritt 3: Starten des Stacks

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Optional: Use an additional `.yml` file to use a pre-defines scenario. Read
on in the [Customizing the Zammad Stack](#customizing-the-zammad-stack)
section.

Nachdem der Stack hochgefahren ist, können Sie über den konfigurierten Host
und -Port auf Zammad zugreifen, z.B. `http://localhost:8080/`.

## Exposing the Stack via HTTPS

To publish a Zammad stack on the internet, it needs be secured via the HTTPS
protocol. To achieve that without modifying the Zammad stack, you can:

- Use a reverse proxy like Nginx Proxy Manager (NPM). It has a GUI that
  provides an easy [Letsencrypt](https://letsencrypt.org/) integration.
- Use a cloudflare tunnel, which provides SSL termination.

Both scenarios are covered in the separate [Docker Compose
Scenarios](/en/reference/docker-compose-scenarios) page.

## Anpassen des Zammad-Stacks

The Zammad stack can be customized by loading additional scenario files for
common use cases. For example, you can deploy the stack with an included
Nginx Proxy Manager (NPM) or with disabled Postgres or Elasticsearch
services, in case you already have these services running.

Please see the [Docker compose scenarios
page](/en/reference/docker-compose-scenarios).

To adjust the stack and settings, use [Docker specific environment
variables](/en/reference/docker-env-vars).

## How to Run Commands in the Stack

Das Docker-Entrypoint-Skript richtet Umgebungsvariablen ein, die Zammad
benötigt, um ordnungsgemäß zu funktionieren. Deshalb sollte der Aufruf von
`rails` oder `rake` auf der Konsole über eine der folgenden Methoden
erfolgen:

Direktes Ausführen eines bestimmten Befehls:

::::tabs

=== Via Portainer GUI

In your Portainer GUI, go to the container view and select the running rails container from your Zammad stack. Click
on the **Exec Console** icon in the "Quick Actions" column.

![Portainer console execution](/screenshots/installation/portainer-exec-console.png){width=80%}

In the "Execute" dialog, select the "rails console" entry point as you can see in the screenshot:

![Portainer execution command](/screenshots/installation/portainer-execute-command.png){width=80%}

=== Via console

Directly execute a specific command:

```sh
docker compose run --rm zammad-railsserver rails r '...your rails command here...'
```

Run the interactive rails console to manually enter Rails commands:

```sh
docker compose run --rm zammad-railsserver rails c
```

Via `docker exec`:

```sh
docker exec zammad-docker-compose-zammad-railsserver-1 /docker-entrypoint.sh rails r '...your rails command here...'
```

::: tip
Wenn Sie Informationen vom Rails-Server abrufen müssen, können Sie z.B,
vor den Rails-Befehl `pp` (pretty print) setzen. Dies führt zu einer
Ausgabe in Ihrem Terminal.
:::

::::
