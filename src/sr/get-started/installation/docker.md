---
order: 3
title: Docker
---

# Docker инсталација

Zammad се може покренути преко Docker Compose. Можете чак користити и
графички интерфејс за Docker као што је
[Portainer](https://www.portainer.io/).

::: info

Не пружамо техничку подршку у вези проблема са Docker (Compose) или Portainer инсталацијама. Уколико одлучите да користите Zammad путем Docker-а, подршка је могућа само за Zammad апликацију.
:::

## Предуслови

- Радно Docker Compose окружење
- Најмање 4 GB RAM за контејнере
- Подесите ваш сервер да правилно извршава Elasticsearch сервис:
    ```bash
    sysctl -w vm.max_map_count=262144
    ```

## Покретање преко Portainer-а

Најлакши начин да покренете Zammad је преко графичког Docker
интерфејса. Препоручујемо [Portainer](https://www.portainer.io/). За
упутство инсталације, погледајте [званичну Portainer
документацију](https://docs.portainer.io/).

### Корак 1: Додавање stack-а
У графичком интерфејсу Portainer-а (нпр. `https://yourdomain.tld:9443`),
идите на циљно окружење, одаберите **Stacks** и кликните на `Add stack` као
на снимку екрана испод.

### Корак 2: Инсталација из репозиторија
Пребаците се на **Repository** метод инсталације и унесите податке испод: -
**Name**: унесите жељено име stack-а - **Repository URL**:
`https://github.com/zammad/zammad-docker-compose` - **Repository
reference**: `refs/heads/master` - **Compose path**: `docker-compose.yml`
(подразумевано)

Optional: if you need to provide environment variables, you can enter them
in the **Environment variable** section or even upload a .env file. See [env
template](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist)
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

```bash
git clone https://github.com/zammad/zammad-docker-compose.git
```
Обавезно често извршавајте `git pull` команду за ажурирање. Алтернативно,
можете преузети датотеке са [странице
издања](https://github.com/zammad/zammad-docker-compose/releases).

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
```bash
cd zammad-docker-compose
```
```bash
docker compose up -d
```

Након што је stack спреман, можете приступити Zammad-у преко подешеног
Docker хоста и порта, нпр. `http://localhost:8080/`.

## Прилагођавање Zammad stack-а

Понекад је неопходно применити локалне измене за Zammad docker stack,
нпр. укључити додатне сервисе. Уколико планирате то да урадите,
препоручујемо да не мењате `docker-compose.yml` датотеку, већ да додате
локалну `docker-compose.override.yml` која укључује све ваше измене.  Docker
compose ће [аутоматски учитати ову датотеку и применити измене на ваш
stack](https://docs.docker.com/compose/multiple-compose-files/merge/).

## Извршавање команди у stack-у

Docker извршна скрипта поставља променљиве окружења које су неопходне за
исправно функционисање Zammad-а. Из овог разлога извршавање `rails` или
`rake` конзолних команди је неопходно одрадити на један од следећих начина:

Директно извршавање одговарајуће команде:
```bash
docker compose run --rm zammad-railsserver rails r '...ваша rails команда овде...'
```
Извршавање интерактивне rails конзоле за ручни унос команди:
```bash
docker compose run --rm zammad-railsserver rails c
```
Преко „docker exec”:
```bash
docker exec zammad-docker-compose-zammad-railsserver-1 /docker-entrypoint.sh rails r '...ваша rails команда овде...'
```

::: tip
Уколико желите да добијете информације од вашег rails сервера, можете, нпр.
да укључите `pp` (pretty print) испред ваших rails команди. Ово ће довести до
излаза на вашем терминалу.
:::