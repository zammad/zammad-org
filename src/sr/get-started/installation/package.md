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

If your distribution is not supported, feel free to use a different
installation method or consider using [Zammad's cloud
service](https://zammad.com/en/pricing){target=_blank}.

Да бисте испратили инсалационе кораке испод, може бити неопходно да
инсталирате додатне алате као curl, gnupg и остале.

::::details Required Tools
:::tabs key:distros

=== Ubuntu

```sh
sudo apt install curl apt-transport-https gnupg
```
=== Debian

```sh
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

Only SLES - Not required for OpenSUSE:
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
::::

## Брзи почетак

### Обезбедите исправан locale

:::tabs key:distros

=== Ubuntu
List your current locale settings:

```sh
locale | grep "LANG="
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```sh
sudo apt install locales
```
```sh
sudo locale-gen en_US.UTF-8
```
```sh
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```

After fixing it, make sure to check the output again for including
`<lang_code>.utf8`. A reboot may help if unsuccessful.

=== Debian
List your current locale settings:

```sh
locale | grep "LANG="
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```sh
sudo apt install locales
```
```sh
sudo locale-gen en_US.UTF-8
```
```sh
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```

After fixing it, make sure to check the output again for including
`<lang_code>.utf8`. A reboot may help if unsuccessful.

=== OpenSUSE/SLES
List your current locale settings:

```sh
localectl status | grep LANG
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```sh
sudo localectl set-locale LANG=en_US.UTF-8
```

After fixing it, make sure to check the output again for including
`<lang_code>.utf8`. A reboot may help if unsuccessful.

===CentOS/RHEL
List your current locale settings:

```sh
locale | grep "LANG="
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```sh
sudo localectl set-locale LANG=en_US.UTF-8
```

After fixing it, make sure to check the output again for including
`<lang_code>.utf8`. A reboot may help if unsuccessful.

:::

### Elasticsearch инсталација

The recommended method is to use [Elastic's official
guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}
for installing Elasticsearch.

Алтернативно, можете погледати [наш
пример](/en/tutorials/install-elasticsearch.md) за Elasticsearch 7, који се
налази на посебној страници да би упутство остало што прегледније.

### Додајте Zammad репозиториј

::: info
Packager.io можда није доступан из окружења са искључиво IPv6 адресама, тако да
имајте ово на уму приликом извршавања корака испод.
:::

:::tabs key:distros

=== Ubuntu
Install repository key:
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
Install repository key:
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
Install repository key:
```sh
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```
OpenSUSE 15.x / SLES15

```sh
sudo wget -O /etc/zypp/repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo
```
===CentOS/RHEL
Install repository key:
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
:::

### Инсталација Zammad-а

:::tabs key:distros

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

Due to an issue with packager.io, you'll need to correct file permissions for public files on CentOS:

```sh
sudo chmod -R 755 /opt/zammad/public/
```
:::

### Управљање Zammad сервисима

Zammad користи три сервиса. Они могу бити (ре)стартовани и стопирани за
основним `zammad` процесом:
```sh
systemctl (status|start|stop|restart) zammad
```
Само интерни puma сервис (одговоран за приказ веб апликације):
```sh
systemctl (status|start|stop|restart) zammad-web
```
Само позадински процес - одговоран за извршавање свих одложених и задатке у
позадини:
```sh
systemctl (status|start|stop|restart) zammad-worker
```
Само websocker сервис за информације о сесији:
```sh
systemctl (status|start|stop|restart) zammad-websocket
```

### Следећи кораци

- Повежите Zammad са Elasticsearch ([основни
  водич](/en/tutorials/connect-config-elasticsearch))
- Подесите ваша SELinux правила и firewall ([соновни
  водич](/en/tutorials/firewall-selinux))
- Подесите веб сервис ([основни водич](/en/tutorials/webserver-config))


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

Zammad ће снимати сав садржај у базу података. Подржавамо PostgreSQL верзије
10 и навише. Инсталациона скрипта ће покушати да детектује MySQL/MariaDB или
PostgreSQL сервис приликом инсталације. У случају да не буде пронађен,
PostgreSQL ће бити аутоматски инсталиран.

::: warning
Уколико користите софтвер за организацију конекција на базу података као што је PgBouncer, обратите пажњу
да користите начин организације који је потпуно подржан у оквиру PostgreSQL. Обично је под
називом „session connection pooling”. Начин организација на основу трансакција није
подржан и може довести до грешака приликом миграције базе података.
:::

Уколико још увек користите MySQL/MariaDB, требало би да мигрирате на
PosgreSQL. Подршка за MySQL/MariaDB ће бити избачена почевши са Zammad 7.

### Прокси приступа

Следеће опције проксија приступа су подржане:

- Nginx 1.3+
- Apache 2.2+

The installation script tries to detect a Apache or Nginx during the
installation. In case none is found, Nginx is automatically installed.  You
can find a basic configuration guide [here](/en/tutorials/webserver-config).


### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="highly recommended"/>

Elasticsearch is not automatically installed. Because it is crucial for a
proper Zammad setup, it is included in the installation instructions
above. If you want to connect Zammad to an already existing Elasticsearch
instance, make sure to use a supported version and have a look at our
[config example](/en/tutorials/connect-config-elasticsearch).

Supported Elasticsearch versions are `7.8` - `8.x`.

:::details Elasticsearch version history

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 5.2+          | >= 7.8, <9     |
| 5.0-5.1       | >= 7.8, <8     |
| 4.0-4.1       | >= 6.5, <=7.12 |
| 3.4-3.6       | >= 5.5, <=7.9  |
| 3.3           | >= 2.4, <=7.6  |
| 3.2           | >= 2.4, <=7.5  |
| 3.1           | >= 2.4, <=7.4  |
| 2.0-3.0       | >= 2.4, <=5.6  |
:::

The Elasticsearch plugin `ingest-attachment` is required for version 7 or
older to index the contents of email attachments. Starting with
Elasticsearch 8, it is included by default.

### Memcached <Badge type="info" text="optional"/>

Instead of storing Zammads cache files within your filesystem, they can be
cached in memory with Memcached.

The installation and configuration is out of our scope of this
documentation.  Please follow the [official
guides](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="optional"/>

If you want to use the PGP integration for sending and receiving signed and
encrypted emails, you need to install the GnuPG-Tool. Please have a look at
the official [GnuPG
website](https://www.gnupg.org/index.html){target=_blank}.
