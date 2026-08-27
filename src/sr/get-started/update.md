---
order: 3
title: Освежавање
---

# Проба Zammad-а

<!--@include: @/sr/modules/zammad-services-hint.md-->

Before updating Zammad, we strongly recommend to take a look at our [release
notes](https://zammad.com/en/releases){target=_blank}. You can find
information about features, fixes and technical remarks and breaking
changes.

Имајте на уму да не бисте требали прескакати главне верзије Zammad-а током
ажурирања. То значи, на пример, путања надоградње са верзије `2.4` на `5.1`
(под претпоставком да је ово тренутна стабилна) би била: `2.4` → `3.0` →
`4.0` → `5.0` → `najnovija stabilna (5.1)`

::: info
Ова страница описује само ажурирање Zammad-а. У случају да желите да ажурирате и ваш хостске оперативни систем, погледајте
упутства за [Надоградњу хоста и миграцију repo-зиторијума](host-upgrade-repo-migration).
:::

## Инсталација пакета

### Предуслови

Пре него што наставите, проверите да ли ваше системско окружење задовољава
Захтеве Zammad-а (види [Предуслове](installation/prerequisites) и
[Инсталацију пакета](installation/package)).

### Преузмите Zammad

```sh
systemctl старт заммад
```

### Zammad

Направите резервну копију. Можете користити [скрипту за
бекап](/en/tutorials/backup-restore) која је укључена у Zammad пакет.

### Коришћење Zammad-а

::: info
Ако ажурирате цео систем и постоје ажурирања за Zammad **и** ваш
сервер базе података, ово може довести до грешака јер ваша база података можда неће бити
поново доступна када се Zammad ажурира.

У таквом случају, можда ћете хтети да привремено изузмете Zammad из ажурирања како
можете видети у командама испод.
:::

::: tabs key:distros

=== Ubuntu
Ажурирајте листе пакета:

```sh
sudo apt update
```

Онемогућите ажурирања за Zammad:

```sh
sudo apt-mark hold zammad
```

Ажурирајте све пакете осим Zammad-а:

```sh
sudo apt upgrade
```

Омогућите поново ажурирања за Zammad:

```sh
sudo apt-mark unhold zammad
```

Ажурирајте Zammad:

```sh
sudo apt upgrade
```

=== Debian
Ажурирајте листе пакета:

```sh
sudo apt update
```

Онемогућите ажурирања за Zammad:

```sh
sudo apt-mark hold zammad
```

Ажурирајте све пакете осим Zammad-а:

```sh
sudo apt upgrade
```

Омогућите поново ажурирања за Zammad:

```sh
sudo apt-mark unhold zammad
```

Ажурирајте Zammad:

```sh
sudo apt upgrade
```

=== OpenSUSE/SLES

Ажурирајте листе пакета:

```sh
sudo zypper refresh
```

Онемогућите ажурирања за Zammad:

```sh
sudo zypper addlock zammad
```

Ажурирајте све пакете осим Zammad-а:

```sh
sudo zypper update
```

Омогућите поново ажурирања за Zammad:

```sh
sudo zypper removelock zammad
```

Ажурирајте Zammad:

```sh
sudo zypper update
```

=== CentOS/RHEL

Ажурирајте све пакете осим Zammad-а:

```sh
sudo dnf upgrade --exclude zammad
```

Ажурирајте Zammad:

```sh
sudo dnf upgrade
```

:::

### Додатни кораци

Ажурирање Elasticsearch-а може бити такође релевантно. Уверите се да имате
инсталирану подржану верзију Elasticsearch-а (види [инсталацију
пакета](/en/get-started/installation/package#elasticsearch) за подржане
верзије).

Ако морате ажурирати Elasticsearch, погледајте [њихову
документацију](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html){target=_blank}
и пратите упутства.

### Одељак са значком <Badge type="warning" text="прилагођен текст" />

Потребно само ако извештај о издању наводи да треба поново изградити
Elasticsearch индекс.

Без навођења језгара процесора која ће се користити:

```sh
zammad run rake zammad:searchindex:rebuild
```

Са навођењем језгара процесора која ће се користити (пример 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

### Преузмите Zammad

```sh
systemctl старт заммад
```

## Инсталација пакета

::: warning
Ажурирања Docker Compose стацк-а могу захтевати додатне кораке или увести промене које нарушавају компатибилност. Увек прво проверите [Docker Compose белешке о издању](https://github.com/zammad/zammad-docker-compose/releases) за упутства за ажурирање.
:::

::: tip
Ако желите да ажурирате Zammad на одређену верзију, користите `VERSION` окружењску променљиву
([пример](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist) са даљим објашњењем) и наведите
број верзије.
:::

### Ажурирање инсталација заснованих на Portainer-у

У вашем Zammad stack-у, кликните на Pull and redeploy`, укључите **Re-pull
image and redeploy** и кликните на `Update`.

![Додавање stack-а са обезбеђеним подацима у Repository
екрану](/screenshots/get-started/installation/portainer-stack-update.png)

### Ажурирање инсталација заснованих на Docker Compose-у

```sh
cd zammad-docker-compose
```

```sh
git pull
```

```sh
docker цомпосе уп -д
```

```sh
docker compose up -d
```

### Одељак са значком <Badge type="warning" text="прилагођен текст" />

Потребно само ако извештај о издању наводи да треба поново изградити
Elasticsearch индекс.

::: tabs key:docker-portainer

=== Docker Compose

Без навођења језгара процесора:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

Са навођењем језгара процесора која ће се користити (пример 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer GUI

Отворите [консолу путем Portainer GUI-ја](/en/get-started/installation/docker#how-to-run-commands-in-the-stack) са стандардним
entrypoint `/bin/bash` и покрените:

Без навођења језгара процесора:

```sh
bundle exec rake zammad:searchindex:rebuild
```

Са навођењем језгара процесора која ће се користити (пример 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
