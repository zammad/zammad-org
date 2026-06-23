---
order: 3
title: Docker
---

# Docker Installation

Zammad can be deployed using Docker Compose. You can even use graphical
Docker front ends like
[Portainer](https://www.portainer.io/){target=_blank}.

::: info

We do not provide support in terms of Docker (-Compose) or Portainer specific
problems. If you choose to run Zammad via Docker, support is only provided for
the Zammad application.
:::

## Prerequisites

- A working Docker Compose environment
- At least 4 GB of RAM to run the containers
- Increase the memory limit for Elasticsearch on Linux hosts:

  ```sh
  sudo sysctl -w vm.max_map_count=262144
  ```

## Deployment with Portainer

The easiest way to get Zammad running is via a graphical Docker UI. We
recommend [Portainer](https://www.portainer.io/){target=_blank}. For
installation instructions, check out [Portainer's
documentation](https://docs.portainer.io/){target=_blank}.

### Step 1: Add Stack

In the Portainer GUI (e.g. `https://yourdomain.tld:9443`), choose your
target environment, select **Stacks** and click on `Add stack` as you can
see in the screenshot below.

![Screenshot in the Stacks section and highlighted "Add
stack".](/screenshots/get-started/installation/portainer-stacks.png)

### Step 2: Build From Repository

Switch to **Repository** build method and provide the information below:

- **Name**: enter a desired name of the stack
- **Repository URL**: `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (default)

In case our default environment is not what you are looking for, you can
customize the stack using predefined scenarios and adjust environment
variables. Jump to the [customization
section](#customizing-the-zammad-stack) below to find more information.

![Stack creation with provided information in Repository
screen](/screenshots/get-started/installation/portainer-stack-creation.png)

### Step 3: Deploy the Stack

Finally, click `Deploy the stack` button. The first time, it may take some
time until the Docker images are fetched.

After the stack is ready, you can access Zammad via the configured Docker
host and port, e.g. `http://localhost:8080/`.

## Deployment with Docker Compose

### Step 1: Clone the GitHub Repo

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Make sure to run `git pull` frequently to fetch updates. Alternatively, you
can download the files from the [releases
page](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}.

### Step 2: Adjust Environment as Needed

In case our default environment is not what you are looking for, you can
customize the stack using predefined scenarios and adjust environment
variables. Jump to the [customization
section](#customizing-the-zammad-stack) below to find more information.

### Step 3: Start the Stack

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Optional: Use an additional `.yml` file to use a pre-defines scenario. Read
on in the [Customizing the Zammad Stack](#customizing-the-zammad-stack)
section.

After the stack is ready, you can access Zammad via the configured Docker
host and port, e.g. `http://localhost:8080/`.

## Exposing the Stack via HTTPS

To publish a Zammad stack on the internet, it needs be secured via the HTTPS
protocol. To achieve that without modifying the Zammad stack, you can:

- Use a reverse proxy like Nginx Proxy Manager (NPM). It has a GUI that
  provides an easy [Let's Encrypt](https://letsencrypt.org/) integration.
- Use a Cloudflare tunnel, which provides SSL termination.

Both scenarios are covered in the separate [Docker Compose
Scenarios](/en/reference/docker-compose-scenarios) page.

## Customizing the Zammad Stack

The Zammad stack can be customized by loading additional scenario files for
common use cases. For example, you can deploy the stack with an included
Nginx Proxy Manager (NPM) or with disabled PostgreSQL or Elasticsearch
services, in case you already have these services running.

Please see the [Docker Compose scenarios
page](/en/reference/docker-compose-scenarios).

To adjust the stack and settings, use [Docker specific environment
variables](/en/reference/environment-variables).

## How to Run Commands in the Stack

Execute commands in your Docker stack by calling `rails` or `rake` via one
of the following methods by using `bundle exec`.

::::tabs

=== Via Portainer GUI

In your Portainer GUI, go to the container view and select the running Rails container from your Zammad stack. Click
on the **Exec Console** icon in the "Quick Actions" column, select the standard `/bin/bash` entrypoint and click
**Connect**.

![Portainer console execution](/screenshots/get-started/installation/portainer-exec-console.png){width=80%}

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
If you need to retrieve information from the Rails server, you can, for example,
place `pp` (pretty print) in front of your Rails command. This leads to an
output in your terminal.
:::

::::
