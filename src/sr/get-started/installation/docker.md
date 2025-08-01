---
order: 3
title: Docker
---

# Docker Installation

Zammad can be deployed using Docker-Compose. You can even use graphical
Docker front ends like
[Portainer](https://www.portainer.io/){target=_blank}.

::: info

Не пружамо техничку подршку у вези проблема са Docker (Compose) или Portainer инсталацијама.
Уколико одлучите да користите Zammad путем Docker-а, подршка је могућа
само за Zammad апликацију.
:::

## Предуслови

- Радно Docker Compose окружење
- Најмање 4 GB RAM за контејнере
- Подесите ваш сервер да правилно извршава Elasticsearch сервис:

    ```sh
    sysctl -w vm.max_map_count=262144
    ```

## Покретање преко Portainer-а

The easiest way to get Zammad running is via a graphical Docker UI. We
recommend [Portainer](https://www.portainer.io/){target=_blank}. For
installation instructions, check out [Portainer's
documentation](https://docs.portainer.io/){target=_blank}.

### Корак 1: Додавање stack-а

У графичком интерфејсу Portainer-а (нпр. `https://yourdomain.tld:9443`),
идите на циљно окружење, одаберите **Stacks** и кликните на `Add stack` као
на снимку екрана испод.

![Снимак екрана у одељку Stacks са наглашеним "Add stack"
дугметом.](/screenshots/installation/portainer-stacks.png)

### Корак 2: Инсталација из репозиторија

Switch to **Repository** build method and provide the information below:

- **Name**: enter a desired name of the stack
- **URL адреса репозиторија**:
  `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (default)

In some cases, our default environment is not what a Docker-Compose user is
looking for. You can customize the stack using pre-defined scenarios and
adjust environment variables. Jump to the [customization
section](#customizing-the-zammad-stack) below to find more information.

![Додавање stack-а са обезбеђеним подацима у Repository
екрану](/screenshots/installation/portainer-stack-creation.png)

### Корак 3: Покретање stack-а

Finally, click `Deploy the stack` button. The first time, it may take some
time until the Docker images are fetched.

After the stack is ready, you can access Zammad via the configured Docker
host and port, e.g. `http://localhost:8080/`.

## Покретање преко Docker Compose

### Корак 1: Клонирање GitHub репозиторија

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Make sure to run `git pull` frequently to fetch updates. Alternatively, you
can download the files from the [releases
page](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}.

### Корак 2: Подешавање окружења по потреби

In some cases, our default environment is not what a Docker-Compose user is
looking for. You can customize the stack using pre-defined scenarios and
adjust environment variables. Jump to the [Customizing the Zammad
Stack](#customizing-the-zammad-stack) section below to find more
information.

### Корак 3: Покретање stack-а

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Optional: Use an additional `.yml` file to use a pre-defines scenario. Read
on in the [Customizing the Zammad Stack](#customizing-the-zammad-stack)
section.

Након што је stack спреман, можете приступити Zammad-у преко подешеног
Docker хоста и порта, нпр. `http://localhost:8080/`.

## Exposing the Stack via HTTPS

To publish a Zammad stack on the internet, it needs be secured via the HTTPS
protocol. To achieve that without modifying the Zammad stack, you can:

- Use a reverse proxy like Nginx Proxy Manager (NPM). It has a GUI that
  provides an easy [Letsencrypt](https://letsencrypt.org/) integration.
- Use a cloudflare tunnel, which provides SSL termination.

Both scenarios are covered in the separate [Docker Compose
Scenarios](/en/reference/docker-compose-scenarios) page.

## Прилагођавање Zammad stack-а

The Zammad stack can be customized by loading additional scenario files for
common use cases. For example, you can deploy the stack with an included
Nginx Proxy Manager (NPM) or with disabled Postgres or Elasticsearch
services, in case you already have these services running.

Please see the [Docker compose scenarios
page](/en/reference/docker-compose-scenarios).

To adjust the stack and settings, use [Docker specific environment
variables](/en/reference/docker-env-vars).

## How to Run Commands in the Stack

Docker извршна скрипта поставља променљиве окружења које су неопходне за
исправно функционисање Zammad-а. Из овог разлога извршавање `rails` или
`rake` конзолних команди је неопходно одрадити на један од следећих начина:

Директно извршавање одговарајуће команде:

::::tabs

=== Via Portainer GUI

In your Portainer GUI, go to the container view and select the running rails container from your Zammad stack. Click
on the **Exec Console** icon in the "Quick Actions" column and on the `Connect` button.

![Portainer console execution](/screenshots/installation/portainer-exec-console.png){width=80%}

Run the interactive rails console by executing:

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

Run the interactive rails console to manually enter Rails commands:

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

Via `docker compose exec`:

```sh
docker compose exec zammad-railsserver bundle exec rails r '...your rails command here...'
```

::: tip
Уколико желите да добијете информације од вашег rails сервера, можете, нпр.
да укључите `pp` (pretty print) испред ваших rails команди. Ово ће довести до
излаза на вашем терминалу.
:::

::::
