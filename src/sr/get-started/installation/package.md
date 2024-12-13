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
облаку](https://zammad.com/en/pricing).

Да бисте испратили инсалационе кораке испод, може бити неопходно да
инсталирате додатне алате као curl, gnupg и остале.

::::details Required Tools
:::tabs key:distros

=== Ubuntu

```bash
sudo apt install curl apt-transport-https gnupg
```
=== Debian

```bash
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

Only SLES - Not required for OpenSUSE:
```bash
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```
```bash
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```bash
sudo yum install wget epel-release
```
:::
::::

## Брзи почетак

### Обезбедите исправан locale

:::tabs key:distros

=== Ubuntu
List your current locale settings:

```bash
locale | grep "LANG="
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```bash
sudo apt install locales
```
```bash
sudo locale-gen en_US.UTF-8
```
```bash
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```
=== Debian
List your current locale settings:

```bash
locale | grep "LANG="
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```bash
sudo apt install locales
```
```bash
sudo locale-gen en_US.UTF-8
```
```bash
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```
=== OpenSUSE/SLES
List your current locale settings:

```bash
localectl status | grep LANG
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```bash
sudo localectl set-locale LANG=en_US.UTF-8
```
===CentOS/RHEL
List your current locale settings:

```bash
locale | grep "LANG="
```
If above does not return `<lang_code>.utf8`, you can correct this
issue as follows:

```bash
sudo localectl set-locale LANG=en_US.UTF-8
```
:::

### Elasticsearch инсталација

Препоручени метод је да користите [званичан Elastic
водич](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
за инсталацију Elasticsearch.

Alternatively, you can follow [our example
setup](/en/tutorials/install-elasticsearch.md) of Elasticsearch 7, which we
included in another page to keep the install instructions as lean as
possible.

### Add Zammad Repository

::: info
Packager.io may not be accessible from IPv6-only environments, so make sure
to consider this when performing the steps below.
:::

:::tabs key:distros

=== Ubuntu
Install repository key:
```bash
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```
Ubuntu 20.04

```bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 20.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 22.04

```bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

```bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 24.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```
=== Debian
Install repository key:
```bash
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
   gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```
Debian 11

```bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 11 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Debian 12

```bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 12 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```
=== OpenSUSE/SLES
Install repository key:
```bash
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```
OpenSUSE 15.x / SLES15

```bash
sudo wget -O /etc/zypp/repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo
```
===CentOS/RHEL
Install repository key:
```bash
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```
CentOS 8 / RHEL 8

```bash
sudo wget -O /etc/yum.repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/el/8.repo
```

CentOS 9 / RHEL 9

```bash
sudo wget -O /etc/yum.repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/el/9.repo
```
:::

### Инсталација Zammad-а

:::tabs key:distros

=== Ubuntu

```bash
sudo apt update
```
```bash
sudo apt install zammad
```
=== Debian

```bash
sudo apt update
```
```bash
sudo apt install zammad
```
=== OpenSUSE/SLES
```bash
sudo zypper ref
```
```bash
sudo zypper install zammad
```
===CentOS/RHEL
```bash
sudo yum install zammad
```

Due to an issue with packager.io, you'll need to correct file permissions for public files on CentOS:

```bash
sudo chmod -R 755 /opt/zammad/public/
```
:::

### Manage Services of Zammad

Zammad uses three services. They can be (re)started & stopped with the
parent `zammad`:
```bash
systemctl (status|start|stop|restart) zammad
```
Only internal puma server (relevant for displaying the web app):
```bash
systemctl (status|start|stop|restart) zammad-web
```
Only background worker - relevant for all delayed- and background jobs:
```bash
systemctl (status|start|stop|restart) zammad-worker
```
Only websocket server for session related information:
```bash
systemctl (status|start|stop|restart) zammad-websocket
```

### Next Steps

- Connect Zammad with Elasticsearch ([basic
  guide](/en/tutorials/connect-config-elasticsearch))
- Adjust your SELinux rules and firewall ([basic
  guide](/en/tutorials/firewall-selinux))
- Configure the Webserver ([basic guide](/en/tutorials/webserver-config))


## Dependencies

Assuming a vanilla system, the following dependencies will automatically be
installed during the Zammad package installation. Additionally, you can find
some information about Elasticsearch below, which is not automatically
installed.

- imlib2
- Node.js
- PostgreSQL
- Nginx
- Redis

### Database Server

Zammad will store all content in a Database. We supported PostgreSQL in
version 10 or higher. The installation script tries to detect a
MySQL/MariaDB or PostgreSQL server during the installation. In case none is
found, PostgreSQL is automatically installed.

::: warning
If you use database connection pooling software like PgBouncer, make sure to
use a pooling mode that is fully compatible with PostgreSQL. Typically this is
called “session connection pooling”. Transaction-based connection pooling is
not supported and may lead to errors during database migrations.
:::

If you are still using MySQL/MariaDB, you should migrate to PostgreSQL.
MySQL/MariaDB are **no longer** supported starting with Zammad 7.

### Reverse Proxy

The following reverse proxies are supported:

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
guides](https://docs.memcached.org/).

### GnuPG <Badge type="info" text="optional"/>

If you want to use the PGP integration for sending and receiving signed and
encrypted emails, you need to install the GnuPG-Tool. Please have a look at
the official [GnuPG website](https://www.gnupg.org/index.html).
