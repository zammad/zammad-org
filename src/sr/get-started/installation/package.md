---
order: 2
title: Пакет
---

# Инсталација пакета

<!--@include: @/sr/modules/zammad-services-hint.md-->

## Подржани оперативни системи

За инсталацију пакета, подржане су следеће дистрибуције Linux платформе:

| Дистрибуција  | Верзија             |
| ------------- | :-----------------  |
| CentOS/RHEL   | 8 и 9               |
| Debian        | 11 и 12             |
| OpenSUSE/SLES | Leap 15.x / 15      |
| Ubuntu        | 20.04, 22.04, 24.04 |

Уколико ваша дистрибуција тренутно није подржана, пробајте други метод
инсталације или размотрите претплату на [Zammad сервис у
облаку](https://zammad.com/en/pricing){target=_blank}.

Да бисте пратили кораке инсталације испод, потребни су алати као што су
цурл, гнупг и други. Ако их нема на вашем систему, инсталирајте их:

::: tabs key:distros

=== Ubuntu

```sh
sudo apt install curl apt-transport-https gnupg
```

=== Debian

```sh
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

Само SLES - није обавезно за OpenSUSE:

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo yum install wget epel-release
```

:::

## Основе

### Обезбедите исправан locale

::: tabs key:distros

=== Ubuntu
Излистајте ваша тренутна locale подешавања:

```sh
locale | grep "LANG="
```

Уколико горња команда не врати `<lang_code>.utf8`, ово можете исправити
на следећи начин:

```sh
sudo apt install locales
```

```sh
sudo locale-gen en_US.UTF-8
```

```sh
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```

Након промене, обавезно поново излистајте подешавање и проверите да ли враћа
`<lang_code>.utf8`. Уколико буде неуспешно, рестартовање може помоћи.

=== Debian
Излистајте ваша тренутна locale подешавања:

```sh
locale | grep "LANG="
```

Уколико горња команда не врати `<lang_code>.utf8`, ово можете исправити
на следећи начин:

```sh
sudo apt install locales
```

```sh
sudo locale-gen en_US.UTF-8
```

```sh
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```

Након промене, обавезно поново излистајте подешавање и проверите да ли враћа
`<lang_code>.utf8`. Уколико буде неуспешно, рестартовање може помоћи.

=== OpenSUSE/SLES
Излистајте ваша тренутна locale подешавања:

```sh
localectl status | grep LANG
```

Уколико горња команда не врати `<lang_code>.utf8`, ово можете исправити
на следећи начин:

```sh
sudo localectl set-locale LANG=en_US.UTF-8
```

Након промене, обавезно поново излистајте подешавање и проверите да ли враћа
`<lang_code>.utf8`. Уколико буде неуспешно, рестартовање може помоћи.

=== CentOS/RHEL
Излистајте ваша тренутна locale подешавања:

```sh
locale | grep "LANG="
```

Уколико горња команда не врати `<lang_code>.utf8`, ово можете исправити
на следећи начин:

```sh
sudo localectl set-locale LANG=en_US.UTF-8
```

Након промене, обавезно поново излистајте подешавање и проверите да ли враћа
`<lang_code>.utf8`. Уколико буде неуспешно, рестартовање може помоћи.

:::

### Elasticsearch инсталација

Препоручени метод је да користите [званичан Elastic
водич](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}
за инсталацију Elasticsearch.

Алтернативно, можете погледати [наш
пример](/en/tutorials/install-elasticsearch) за Elasticsearch 7, који се
налази на посебној страници да би упутство остало што прегледније.

### Додајте Zammad репозиториј

::: info
Packager.io можда није доступан из окружења са искључиво IPv6 адресама, тако да
имајте ово на уму приликом извршавања корака испод.
:::
:::: tabs key:distros

=== Ubuntu
Инсталирајте кључ репозиторија:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```

Ubuntu 20.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 20.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 22.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 24.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

=== Debian
Инсталирајте кључ репозиторија:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
   gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```

Debian 11

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 11 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Debian 12

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 12 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

=== OpenSUSE/SLES
Инсталирајте кључ репозиторија:

```sh
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```

OpenSUSE 15.x / SLES15

```sh
sudo wget -O /etc/zypp/repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo
```

===CentOS/RHEL
Инсталирајте кључ репозиторија:

```sh
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```

CentOS 8 / RHEL 8

```sh
sudo wget -O /etc/yum.repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/el/8.repo
```

CentOS 9 / RHEL 9

```sh
sudo wget -O /etc/yum.repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/el/9.repo
```

::::

### Инсталација Zammad-а

::: tabs key:distros

=== Ubuntu

```sh
sudo apt update
```

```sh
sudo apt install zammad
```

=== Debian

```sh
sudo apt update
```

```sh
sudo apt install zammad
```

=== OpenSUSE/SLES

```sh
sudo zypper ref
```

```sh
sudo zypper install zammad
```

===CentOS/RHEL

```sh
sudo yum install zammad
```

Услед ограничења packager.io, биће вам неопходне пермисије за јавне датотеке на CentOS:

```sh
sudo chmod -R 755 /opt/zammad/public/
```

:::

### Управљање Zammad сервисима

Zammad користи три сервиса. Они могу бити (ре)стартовани и стопирани за
основним `zammad` процесом:

- заммад: укључује следеће сервисе
  - Само интерни puma сервис (одговоран за приказ веб апликације):
  - Само позадински процес - одговоран за извршавање свих одложених и
    задатке у позадини:
  - Само websocker сервис за информације о сесији:

Управљајте сервисима командама `start`, `restart`, `stop`, `status` програма
`systemctl`.

Пример за покретање Zammad-а са свим под-сервисима:

```sh
systemctl старт заммад
```

Да бисте зауставили или поново покренули сервис или проверили његов статус,
прилагодите команду како је наведено горе.

### Следећи кораци

- Повежите Zammad са Elasticsearch ([основни
  водич](/sr/tutorials/connect-config-elasticsearch))
- Подесите ваша SELinux правила и firewall ([основни
  водич](/sr/tutorials/firewall-selinux))
- Подесите веб сервис ([основни водич](/sr/tutorials/webserver-config))

## Предуслови

Под претпоставком да систем није прилагођен, следећи предуслови ће бити
аутоматски инсталирати приликом инсталације Zammad пакета. Додатно, испод
можете пронаћи неке информације о Elasicsearch, који неће бити аутоматски
инсталиран.

- imlib2
- Node.js
- PostgreSQL
- Nginx
- Redis

### Сервис базе података

Zammad чува свој садржај у бази података. Подржани систем база података је
[PostgreSQL](https://www.postgresql.org/){target=_blank} 15 или новији. Ако
PostgreSQL сервер није детектован, биће аутоматски инсталиран током
инсталације пакета.

::: warning
Уколико користите софтвер за организацију конекција на базу података као што је PgBouncer, обратите пажњу
да користите начин организације који је потпуно подржан у оквиру PostgreSQL. Обично је под
називом „session connection pooling”. Начин организација на основу трансакција није
подржан и може довести до грешака приликом миграције базе података.
:::

### Прокси приступа

Следеће опције проксија приступа су подржане:

- Nginx
- Apache

Скрипт за инсталацију покушава да детектује Apache или Nginx током
инсталације. У случају да ниједан није пронађен, Nginx се аутоматски
инсталира. Основан пример можете наћи у [нашем водичу за конфигурацију web
сервера](/en/tutorials/webserver-config).

### Redis

За комуникацију у реалном времену преко web сокета потребан је
[Redis](https://redis.io/). Zammad захтева Redis 7 или новији.  Аутоматски
се инсталира (пакет) или је укључен у стацк-у (Docker Compose) са радном
конфигурацијом.  Међутим, инсталација и конфигурација су изван опсега ове
документације. Пратите званичне водиче и осигурајте да га поставите на
сигуран начин.

Доступне променљиве окружења за стандардна и Sentinel подешавања су кратко
поменуте на страници [Redis Варијабле](/en/reference/redis).

::: info
CentOS и RHEL 10 користе [Valkey](https://valkey.io/) као замену за Redis. Током инсталације Zammad-а на тим дистрибуцијама, аутоматски се инсталира као зависност.
:::

### Elasticsearch <Badge type="info" text="opciono"/> <Badge type="danger" text="toplo preporučeno"/>

Elasticsearch се не инсталира аутоматски. Пошто је кључан за исправно
подешавање Zammad-а, укључен је у горе наведена упутства за инсталацију. Ако
желите да повежете Zammad са већ постојећом Elasticsearch инстанцом,
проверите да ли користите подржану верзију и погледајте наш [пример
конфигурације](/en/tutorials/connect-config-elasticsearch).

Подржане Elasticsearch верзије су `8.11` - `9.x`.

Први кораци са Zammad-ом

::: details

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 7.2+          | >= 8.11, <10   |
| 7.0-7.1       | >= 7.8, <10    |
| 5.2-6.5       | >= 7.8, <9     |
| 5.0-5.1       | >= 7.8, <8     |
| 4.0-4.1       | >= 6.5, <=7.12 |
| 3.4-3.6       | >= 5.5, <=7.9  |
| 3.3           | >= 2.4, <=7.6  |
| 3.2           | >= 2.4, <=7.5  |
| 3.1           | >= 2.4, <=7.4  |
| 2.0-3.0       | >= 2.4, <=5.6  |

:::

### Memcached

Zammad се у великој мери ослања на кеширање за побољшање перформанси. Овај
кеш може бити сачуван у фајл систему без ослањања на екстерне
сервисе. Међутим, ово је могуће само ако сви Zammad-ови сервиси раде на
истом фајл систему!

У свим осталим случајевима попут деплоувања Zammad-а путем контејнера
(Docker или Kubernetes) или на одвојеним чворовима кластера, потребан је
[Memcached](https://memcached.org/){target=_blank} сервис за чување кеша и
ислуживање свим Zammad инстанцама.  Docker и Kubernetes стацк-ови већ
укључују овај сервис.

Међутим, чак и локалне инсталације на фајл систему могу имати користи од
Memcached-ових побољшања перформанси. Такође бисте могли погледати нашу
секцију [подешавање
перформанси](/en/reference/environment-variables#performance-tuning).

Инсталација и конфигурација су изван опсега ове документације. У случају да
морате ручно инсталирати Memcached, пратите [званичну документацију
Memcached-а](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="opciono"/>

Ако желите да користите PGP интеграцију за слање и примање потписаних и
шифрованих емаилова, морате инсталирати GnuPG-алат. Погледајте званичну
[GnuPG веб страницу](https://www.gnupg.org/index.html){target=_blank}.
