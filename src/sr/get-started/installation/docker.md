---
order: 3
title: Docker
---

# Инсталација пакета

Zammad се може покренути преко Docker Compose. Можете чак користити и
графички интерфејс за Docker као што је
[Portainer](https://www.portainer.io/).

::: info

Не пружамо техничку подршку у вези проблема са Docker (Compose) или Portainer инсталацијама.
Уколико одлучите да користите Zammad путем Docker-а, подршка је могућа
само за Zammad апликацију.
:::

## Предуслови

- Радно Docker Compose окружење
- Најмање 4 GB RAM за контејнере
- Повећајте меморијско ограничење за Elasticsearch на Linux хостовима:

  ```sh
  sudo sysctl -w vm.max_map_count=262144
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

![Снимак екрана у одељку Stacks са наглашеним "Add stack"
дугметом.](/screenshots/get-started/installation/portainer-stacks.png)

### Корак 2: Инсталација из репозиторија

Пребаците се на метод изградње **Репозиторијум** и унесите информације
испод:

- **Име**: унесите жељено име стацк-а
- **URL адреса репозиторија**:
  `https://github.com/zammad/zammad-docker-compose`
- **Референца repo-зиторијума**: `refs/heads/master`
- **Путања Compose-а**: `docker-compose.yml` (подразумевано)

Ако ваше подразумевано окружење није оно које тражите, можете прилагодити
стацк користећи унапред дефинисане сценарије и подесити променљиве
окружења. Погледајте [секцију за
прилагођавање](#customizing-the-zammad-stack) испод за више информација.

![Додавање stack-а са обезбеђеним подацима у Repository
екрану](/screenshots/get-started/installation/portainer-stack-creation.png)

### Корак 3: Покретање stack-а

На крају, кликните на дугме `Deploy the stack`. Први пут може потрајати неко
време док се Docker имиџи не преузму.

Након што је stack спреман, можете приступити Zammad-у преко подешеног
Docker хоста и порта, нпр. `http://localhost:8080/`.

## Покретање преко Docker Compose

### Корак 1: Клонирање GitHub репозиторија

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Обавезно често извршавајте `git pull` команду за ажурирање. Алтернативно,
можете преузети датотеке са [странице
издања](https://github.com/zammad/zammad-docker-compose/releases).

### Корак 2: Подешавање окружења по потреби

Ако ваше подразумевано окружење није оно које тражите, можете прилагодити
стацк користећи унапред дефинисане сценарије и подесити променљиве
окружења. Погледајте [секцију за
прилагођавање](#customizing-the-zammad-stack) испод за више информација.

### Корак 3: Покретање stack-а

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Опционално: Користите додатни `.yml` фајл за коришћење унапред дефинисаног
сценарија. Прочитајте више у секцији [Прилагођавање Zammad
стацк-а](#customizing-the-zammad-stack).

Након што је stack спреман, можете приступити Zammad-у преко подешеног
Docker хоста и порта, нпр. `http://localhost:8080/`.

## Излагање стацк-а преко HTTPS-а

Да бисте објавили Zammad стацк на интернету, мора бити заштићен путем HTTPS
протокола. Да бисте то постигли без измене Zammad стацк-а, можете:

- Користите реверзни прокси као што је Nginx Proxy Manager (NPM). Он има GUI
  који омогућава једноставну интеграцију са [Let'с
  Encrypt](https://letsencrypt.org/).
- Користите Cloudflare тунел, који пружа SSL терминацију.

Оба сценарија су објашњена на одвојеној страници [Docker Compose
Scenarios](/en/reference/docker-compose-scenarios).

## Прилагођавање Zammad stack-а

Zammad стацк се може прилагодити учитавањем додатних фајлова са сценаријима
за честе случајеве употребе. На пример, можете деплоуовати стацк са
укљученим Nginx Proxy Manager-ом (NPM) или са онемогућеним PostgreSQL или
Elasticsearch сервисима, ако већ имате те сервисе у раду.

Молимо погледајте страницу [Сценарији за Docker
Compose](/en/reference/docker-compose-scenarios).

За подешавање стацк-а и поставки користите [Docker специфичне променљиве
окружења](/en/reference/environment-variables).

## Извршавање команди у stack-у

Покрените команде у вашем Docker стацк-у тако што ћете позвати `rails` или
`rake` путем једне од следећих метода користећи `bundle exec`.

:::: tabs key:docker-portainer

=== Docker Compose

Директно извршите одређену команду:

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '...your rails command here...'
```

Покрените интерактивну Rails конзолу да бисте ручно унели Rails команде:

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

Преко `docker compose exec`:

```sh
docker compose exec zammad-railsserver bundle exec rails r '...your rails command here...'
```

::: tip
Уколико желите да добијете информације од вашег rails сервера, можете, нпр.
да укључите `pp` (pretty print) испред ваших rails команди. Ово ће довести до
излаза на вашем терминалу.
:::

=== Portainer

У вашем Portainer GUI-у, идите на преглед контејнера и изаберите покренути Rails контејнер вашег Zammad стека. Кликните
на иконицу **Exec Console** у колони „Quick Actions”, изаберите стандардни `/bin/bash` entrypoint и кликните
**Connect**.

![Покретање Portainer конзоле](/screenshots/get-started/installation/portainer-exec-console.png){width=80%}

Покрените интерактивну Rails конзолу извршавањем:

```sh
bundle exec rails c
```

Директно извршите специфичну команду:

```sh
bundle exec rails r '...your rails command here...'
```

::::
