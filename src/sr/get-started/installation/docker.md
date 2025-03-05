---
order: 3
title: Docker
---

# Docker инсталација

Zammad can be deployed using Docker-Compose. You can even use graphical
docker front ends like
[Portainer](https://www.portainer.io/){target=_blank}.

::: info

Не пружамо техничку подршку у вези проблема са Docker (Compose) или Portainer инсталацијама.
Уколико одлучите да користите Zammad путем Docker-а, подршка је могућа
само за Zammad апликацију.
:::

## Предуслови

- Радно Docker Compose окружење
- Најмање 4 GB RAM за контејнере
- Adjust your host's settings to run Elasticsearch properly:

    ```sh
    sysctl -w vm.max_map_count=262144
    ```

## Покретање преко Portainer-а

The easiest way to get Zammad running is via a graphical docker UI. We
recommend [Portainer](https://www.portainer.io/){target=_blank}. For
installation instructions, check out [Portainer's
documentation](https://docs.portainer.io/){target=_blank}.

### Корак 1: Додавање stack-а

У графичком интерфејсу Portainer-а (нпр. `https://yourdomain.tld:9443`),
идите на циљно окружење, одаберите **Stacks** и кликните на `Add stack` као
на снимку екрана испод.

### Корак 2: Инсталација из репозиторија

Switch to **Repository** build method and provide the information below:

- **Name**: enter a desired name of the stack
- **Repository URL**: `https://github.com/zammad/zammad-docker-compose`
- **Repository reference**: `refs/heads/master`
- **Compose path**: `docker-compose.yml` (default)

Optional: if you need to provide environment variables, you can enter them
in the **Environment variable** section or even upload a .env file. See [env
template](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
as an example.

### Корак 3: Покретање stack-а

Након што је stack спреман, можете приступити Zammad-у преко подешеног
Docker хоста и порта, нпр. `http://localhost:8080/`.

![Снимак екрана у одељку Stacks са наглашеним "Add stack"
дугметом.](/screenshots/installation/portainer-stacks.png)

![Додавање stack-а са обезбеђеним подацима у Repository
екрану](/screenshots/installation/portainer-stack-creation.png)

## Покретање преко Docker Compose

### Корак 1: Клонирање GitHub репозиторија

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Make sure to run `git pull` frequently to fetch updates. Alternatively, you
can download the files from the [releases
page](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}.

### Корак 2: Подешавање окружења по потреби

У неким случајевима наше подразумевано окружење није оно што docker-compose
корисник очекује. Погледајте [променљиве Docker
окружења](/en/reference/docker-env-vars.md) за детаље која подешавања је
могуће поставити.

::: tip
Уколико желите да користите `.env` датотеку, можете икористити приложену `.env.dist`
датотеку и ископирати је у `.env`. На тај начин биће аутоматски препозната од стране Docker Compose
и преживеће ажурирања.

Zammad се подразумевано покреће на порту број `8080`. Уколико желите да користите други порт,
можете га подесити преко променљиве `NGINX_EXPOSE_PORT`.
:::

### Корак 3: Покретање stack-а

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Након што је stack спреман, можете приступити Zammad-у преко подешеног
Docker хоста и порта, нпр. `http://localhost:8080/`.

## Прилагођавање Zammad stack-а

Sometimes it's necessary to apply local changes to the Zammad docker stack,
e.g. to include additional services. If you plan to do so, we recommend that
you do not change the `docker-compose.yml` file, but instead create a local
`docker-compose.override.yml` that includes all your modifications.
Docker-Compose will [automatically load this file and merge its changes into
your
stack](https://docs.docker.com/compose/multiple-compose-files/merge/){target=_blank}.

## Извршавање команди у stack-у

Docker извршна скрипта поставља променљиве окружења које су неопходне за
исправно функционисање Zammad-а. Из овог разлога извршавање `rails` или
`rake` конзолних команди је неопходно одрадити на један од следећих начина:

Директно извршавање одговарајуће команде:

```sh
docker compose run --rm zammad-railsserver rails r '...ваша rails команда овде...'
```

Извршавање интерактивне rails конзоле за ручни унос команди:

```sh
docker compose run --rm zammad-railsserver rails c
```

Преко „docker exec”:

```sh
docker exec zammad-docker-compose-zammad-railsserver-1 /docker-entrypoint.sh rails r '...ваша rails команда овде...'
```

::: tip
Уколико желите да добијете информације од вашег rails сервера, можете, нпр.
да укључите `pp` (pretty print) испред ваших rails команди. Ово ће довести до
излаза на вашем терминалу.
:::
