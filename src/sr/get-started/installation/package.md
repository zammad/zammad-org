---
order: 2
title: Package
---

# Package Installation

<!--@include: @/en/modules/zammad-services-hint.md-->

## Prerequisites

### Operating Systems

For package installation, the following Linux distributions are supported:

| Distribution  | Version             |
| ------------- | :-----------------  |
| CentOS/RHEL   | 8 & 9               |
| Debian        | 11 & 12             |
| OpenSUSE/SLES | Leap 15.x / 15      |
| Ubuntu        | 20.04, 22.04, 24.04 |

If your distribution is not supported, feel free to use a different
installation method or consider using [Zammad's cloud
service](https://zammad.com/en/pricing).

### Software

#### Dependencies

The following dependencies need to be installed on your system and will
automatically be installed with the Zammad package installation.

- imlib2
- Node.js

#### Database Server

Zammad will store all content in a Database. You can choose between the
following database servers:

- PostgreSQL 10+
- MySQL 5.7+ / MariaDB 10.3+ <Badge type="danger" text="deprecated with
  Zammad 7"/>

If you are using MySQL/MariaDB, you should [migrate to
PostgreSQL](/en/tutorials/migrate-database).

::: warning
If you use database connection pooling software like PgBouncer, make sure to
use a pooling mode that is fully compatible with PostgreSQL. Typically this is
called “session connection pooling”. Transaction-based connection pooling is
not supported and may lead to errors during database migrations.
:::

For **MySQL/MariaDB**, the following configuration is required:

- Use ``UTF-8`` encoding - others won't work
- Set ``max_allowed_packet`` to a value larger than the default of 4 MB (64
MB+ recommended).

For MySQL, the following additional configuration is required:

``` bash
innodb_file_format = Barracuda
innodb_file_per_table = on
innodb_default_row_format = dynamic
innodb_large_prefix = 1
innodb_file_format_max = Barracuda
```

#### Reverse Proxy

In a typical web environment today, you use a reverse proxy to deliver the
static content of your application. Only the “expensive” app required HTTP
requests are forwarded to the application server.

The following reverse proxies are supported:

- Nginx 1.3+
- Apache 2.2+

You can find a config guide [here](/en/tutorials/webserver-config).

#### Redis

Redis is required for realtime communication via web socket.

The installation and configuration is out of our scope of this
documentation.  Please follow the [official
guides](https://redis.io/docs/latest/operate/rs/installing-upgrading/).

#### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="highly recommended"/>

Zammad uses Elasticsearch to:

- make the search faster
- support advanced features like reports
- search for content of email attachments

This becomes increasingly important with higher numbers of tickets in your
system.

The following versions are supported:

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 5.2+          | >= 7.8, <9     |
| 5.0-5.1       | >= 7.8, <8     |
| 4.0-4.1       | >=6.5, <=7.12  |
| 3.4-3.6       | >=5.5, <=7.9   |
| 3.3           | >=2.4, <=7.6   |
| 3.2           | >=2.4, <=7.5   |
| 3.1           | >=2.4, <=7.4   |
| 2.0-3.0       | >=2.4, <=5.6   |

The Elasticsearch plugin ``ingest-attachment`` is required for version 7 or
older to index the contents of email attachments. Starting with
Elasticsearch 8, it is included by default.

#### Memcached <Badge type="info" text="optional"/>

Instead of storing Zammads cache files within your filesystem, they can be
cached in memory with Memcached.

The installation and configuration is out of our scope of this
documentation.  Please follow the [official
guides](https://docs.memcached.org/).

#### GnuPG <Badge type="info" text="optional"/>

If you want to use the PGP integration for sending and receiving signed and
encrypted emails, you need to install the GnuPG-Tool. Please have a look at
the official [GnuPG website](https://www.gnupg.org/index.html).

## Installation

### Install Required Tools

To download and handle the installation package, there are some tools
needed.  Make sure that they are installed. If in doubt, just try to install
them.

:::tabs key:distros

=== Ubuntu

``` bash
sudo apt install curl apt-transport-https gnupg
```
=== Debian

``` bash
sudo apt install curl apt-transport-https gnupg
```
=== OpenSUSE/SLES
``` bash
# Only SLES - Not required for OpenSUSE
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```
===CentOS/RHEL
``` bash
sudo yum install wget epel-release
```
:::

### Install Elasticsearch

The recommended method is to use [Elastic's official
guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
for installing Elasticsearch.

Alternatively, you can follow [our example
setup](/en/tutorials/install-elasticsearch.md) of Elasticsearch 7, which we
included in another page to keep the install instructions as lean as
possible.

### Ensure Correct Locale

:::tabs key:distros

=== Ubuntu
List your current locale settings:

``` bash
locale | grep "LANG="
```
If above does not return ``<lang_code>.utf8``, you can correct this
issue as follows:

``` bash
sudo apt install locales
sudo locale-gen en_US.UTF-8
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```
=== Debian
List your current locale settings:

``` bash
locale | grep "LANG="
```
If above does not return ``<lang_code>.utf8``, you can correct this
issue as follows:

``` bash
sudo apt install locales
sudo locale-gen en_US.UTF-8
echo "LANG=en_US.UTF-8" > sudo /etc/default/locale
```
=== OpenSUSE/SLES
List your current locale settings:

``` bash
localectl status | grep LANG
```
If above does not return ``<lang_code>.utf8``, you can correct this
issue as follows:

``` bash
sudo localectl set-locale LANG=en_US.UTF-8
```
===CentOS/RHEL
List your current locale settings:

``` bash
locale | grep "LANG="
```
If above does not return ``<lang_code>.utf8``, you can correct this
issue as follows:

``` bash
sudo localectl set-locale LANG=en_US.UTF-8
```
:::

### Add Repository

::: info
Packager.io may not be accessible from IPv6-only environments, so make sure
to consider this when performing the steps below.
:::

:::tabs key:distros

=== Ubuntu
Install repository key:
``` bash
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```
Ubuntu 20.04

``` bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 20.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 22.04

``` bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

``` bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 24.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```
=== Debian
Install repository key:
``` bash
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
   gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```
Debian 11

``` bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 11 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Debian 12

``` bash
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 12 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```
=== OpenSUSE/SLES
Install repository key:
``` bash
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```
OpenSUSE 15.x / SLES15

``` bash
sudo wget -O /etc/zypp/repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo
```
===CentOS/RHEL
Install repository key:
``` bash
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```
CentOS 8 / RHEL 8

``` bash
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

``` bash
sudo apt update
```
``` bash
sudo apt install zammad
```
=== Debian

``` bash
sudo apt update
```
``` bash
sudo apt install zammad
```
=== OpenSUSE/SLES
``` bash
sudo zypper ref
```
```bash
sudo zypper install zammad
```
===CentOS/RHEL
``` bash
sudo yum install zammad
```

Due to an issue with packager.io, you'll need to correct file permissions for public files on CentOS:

```bash
sudo chmod -R 755 /opt/zammad/public/
```
:::

### Manage Services of Zammad

Zammad uses three services. They can be (re)started & stopped with the
parent ``zammad``.

```bash
# Zammad service to start all services at once
systemctl (status|start|stop|restart) zammad
```
```bash
# Zammads internal puma server (relevant for displaying the web app)
systemctl (status|start|stop|restart) zammad-web

# Zammads background worker - relevant for all delayed- and background jobs
systemctl (status|start|stop|restart) zammad-worker

# Zammads websocket server for session related information
systemctl (status|start|stop|restart) zammad-websocket
```

### Next Steps

- Adjust your firewall
- Adjust your SELinux rules
- Connect Zammad with Elasticsearch
- Configure the Webserver
