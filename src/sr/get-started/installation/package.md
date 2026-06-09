---
order: 2
title: Пакет
---

# Инсталација пакета

<!--@include: @/sr/modules/zammad-services-hint.md-->

## Подржани оперативни системи

For package installation, the following Linux distributions are supported:
<!-- table included in host-upgrade.md; referenced with line numbers 15-20. Make sure to keep it or
adjust it over there -->
| Distribution         | Version              |
| -------------------- | :------------------- |
| CentOS/RHEL          | 9, 10                |
| Debian               | 11, 12 & 13          |
| OpenSUSE Leap / SLES | 15 & 16              |
| Ubuntu               | 22.04, 24.04 & 26.04 |

Уколико ваша дистрибуција тренутно није подржана, пробајте други метод
инсталације или размотрите претплату на [Zammad сервис у
облаку](https://zammad.com/en/pricing){target=_blank}.

To follow the installation steps below, tools like curl, gnupg and others
are required. If they are not present on your system, install them:

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

OpenSUSE doesn't require any additional steps here!

SLES 15 requires additional repositories to be activated. To do so, run the following commands.

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo dnf install curl epel-release
```

:::

## Основе

### Обезбедите исправан locale

:::tabs key:distros

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

Alternatively, you can follow [our example
setup](/en/tutorials/install-elasticsearch.md) of Elasticsearch 9, which is
separated to keep the install instructions as lean as possible.

### Додајте Zammad репозиториј

::: info
Packager.io можда није доступан из окружења са искључиво IPv6 адресама, тако да
имајте ово на уму приликом извршавања корака испод.
:::
<!-- repo instructions included in host-upgrade.md; referenced with line numbers 171-283. Make sure to keep it or
adjust it over there -->
::::tabs key:distros

=== Ubuntu
Add repository key:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Add repository (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Ubuntu 26.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/26.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Add repository key:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Add repository (Debian 11):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/11.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Debian 13):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Add repository (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo"
```

Add repository (OpenSUSE/SLES 16):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/16.repo"
```

===CentOS/RHEL
Add repository key:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Add repository (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/9.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

Add repository (CentOS/RHEL 10):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/10.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

::::

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
sudo zypper refresh
```

```sh
sudo zypper install zammad
```

===CentOS/RHEL

```sh
sudo dnf install zammad
```

:::

### Управљање Zammad сервисима

Zammad uses three services. These services can be managed individually or
all at once by using the parent **zammad**.

- zammad: includes the services below
  - **zammad-web**: internal puma server (relevant for displaying the web
    app)
  - **zammad-worker**: background worker - relevant for all delayed- and
    background jobs
  - **zammad-websocket**: websocket server for session related information

Manage the services with `systemctl`'s commands `start`, `restart`, `stop`,
`status`.

Example to start Zammad with all sub-services:

```sh
sudo systemctl start zammad
```

To stop or restart a service or to check its status, adjust the command as
mentioned above.

### Следећи кораци

- [Connect Zammad with
  Elasticsearch](/en/tutorials/connect-config-elasticsearch)
- [Adjust your SELinux rules and firewall](/en/tutorials/firewall-selinux)
- [Configure the webserver](/en/tutorials/webserver-config)

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

Zammad stores its content in a database. The supported database system is
[PostgreSQL](https://www.postgresql.org/){target=_blank} 13 or newer. If no
PostgreSQL server could be detected, it will be installed automatically
during the package installation.

::: warning
Уколико користите софтвер за организацију конекција на базу података као што је PgBouncer, обратите пажњу
да користите начин организације који је потпуно подржан у оквиру PostgreSQL. Обично је под
називом „session connection pooling”. Начин организација на основу трансакција није
подржан и може довести до грешака приликом миграције базе података.
:::

### Прокси приступа

Следеће опције проксија приступа су подржане:

- Nginx 1.3+
- Apache 2.2+

The installation script tries to detect a Apache or Nginx during the
installation. In case none is found, Nginx is automatically installed.  You
can find a basic example in [our Webserver configuration
guide](/en/tutorials/webserver-config).

### Redis

[Redis](https://redis.io/) is required for realtime communication via web
socket. Zammad requires Redis 6 or newer.  It gets installed automatically
(package) or is included in the stack (Docker Compose) with a working
configuration.  However, the installation and configuration is out of scope
of this documentation. Please follow the official guides and ensure to set
it up in a secure way.

Available environment variables for standard and Sentinel setups are briefly
mentioned in the [Redis Variables](/en/reference/redis) page.

:::info
CentOS and RHEL 10 use [Valkey](https://valkey.io/) as a drop-in-replacement for Redis. During the Zammad installation
on those distros, it gets installed automatically as a dependency.
:::

### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="highly recommended"/>

Elasticsearch is not automatically installed. Because it is crucial for a
proper Zammad setup, it is included in the installation instructions
above. If you want to connect Zammad to an already existing Elasticsearch
instance, make sure to use a supported version and have a look at our
[config example](/en/tutorials/connect-config-elasticsearch).

Supported Elasticsearch versions are `7.8` - `9.x`.

Elasticsearch version history for Zammad:

:::details

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 7+            | >= 7.8, <10    |
| 5.2-6.5       | >= 7.8, <9     |
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

### Memcached

Zammad heavily relies on caching to improve performance. This cache can be
stored in the file system without relying on externals services. However,
this is only possible if all services of Zammad are running on the same file
system!

In all other cases like deploying Zammad via containers (Docker or
Kubernetes) or on separate cluster nodes, a
[Memcached](https://memcached.org/){target=_blank} service is required to
store the cache and serve it to all Zammad instances.  The Docker and
Kubernetes stacks already include this service.

However, even local file system installations may benefit from Memcached's
performance improvements. You might want to have a look at our [performance
tuning](/en/reference/environment-variables#performance-tuning) section too.

The installation and configuration is out of scope of this documentation. In
case you have to install Memcached manually, please follow the [official
documentation of Memcached](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="optional"/>

If you want to use the PGP integration for sending and receiving signed and
encrypted emails, you need to install the GnuPG-Tool. Please have a look at
the official [GnuPG
website](https://www.gnupg.org/index.html){target=_blank}.
