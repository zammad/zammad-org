---
title: Package
order: 2
---

# Package Installation

<!--@include: @/en/modules/zammad-services-hint.md-->

## Supported Operating Systems

For package installation, the following Linux distributions are supported:

| Distribution  | Version             |
| ------------- | :-----------------  |
| CentOS/RHEL   | 8 & 9               |
| Debian        | 11 & 12             |
| OpenSUSE/SLES | Leap 15.x / 15      |
| Ubuntu        | 22.04, 24.04        |

If your distribution is not supported, feel free to use a different installation
method or consider using
[Zammad's cloud service](https://zammad.com/en/pricing){target=_blank}.

To follow the installation steps below, tools like curl, gnupg and others are
required. If they are not present on your system, install them:

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

## Basics

### Ensure Correct Locale

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

### Install Elasticsearch

The recommended method is to use
[Elastic's official guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}
for installing Elasticsearch.

Alternatively, you can follow [our example setup](/en/tutorials/install-elasticsearch.md) of Elasticsearch 7, which we
included in another page to keep the install instructions as lean as possible.

### Add Zammad Repository

::: info
Packager.io may not be accessible from IPv6-only environments, so make sure
to consider this when performing the steps below.
:::

::::tabs key:distros

=== Ubuntu
Install repository key:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```

Ubuntu 22.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

::: info
Starting with Ubuntu 24.04, we provide the command to add the repository in the
[deb822 format](https://repolib.readthedocs.io/en/latest/deb822-format.html).
:::

```sh

printf "Types: deb
URIs: https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu
Suites: 22.04
Components: main
Signed-By: /etc/apt/keyrings/pkgr-zammad.gpg" | \
sudo tee /etc/apt/sources.list.d/zammad.sources > /dev/null
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

::: info
Starting with Debian 12, we provide the command to add the repository in the
[deb822 format](https://repolib.readthedocs.io/en/latest/deb822-format.html).
:::

```sh

printf "Types: deb
URIs: https://dl.packager.io/srv/deb/zammad/zammad/stable/debian
Suites: 12
Components: main
Signed-By: /etc/apt/keyrings/pkgr-zammad.gpg" | \
sudo tee /etc/apt/sources.list.d/zammad.sources > /dev/null
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

::::

### Install Zammad

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

### Manage Services of Zammad

Zammad uses three services. They can be (re)started & stopped with the parent
`zammad`:

```sh
systemctl (status|start|stop|restart) zammad
```

Only internal puma server (relevant for displaying the web app):

```sh
systemctl (status|start|stop|restart) zammad-web
```

Only background worker - relevant for all delayed- and background jobs:

```sh
systemctl (status|start|stop|restart) zammad-worker
```

Only websocket server for session related information:

```sh
systemctl (status|start|stop|restart) zammad-websocket
```

### Next Steps

- Connect Zammad with Elasticsearch ([basic guide](/en/tutorials/connect-config-elasticsearch))
- Adjust your SELinux rules and firewall ([basic guide](/en/tutorials/firewall-selinux))
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

Zammad stores its content in a database. The supported database system is
[PostgreSQL](https://www.postgresql.org/){target=_blank} 13 or newer. If no PostgreSQL server could be detected, it
will be installed automatically during the package installation.

::: warning
If you use database connection pooling software like PgBouncer, make sure to
use a pooling mode that is fully compatible with PostgreSQL. Typically this is
called “session connection pooling”. Transaction-based connection pooling is
not supported and may lead to errors during database migrations.
:::

### Reverse Proxy

The following reverse proxies are supported:

- Nginx 1.3+
- Apache 2.2+

The installation script tries to detect a Apache or Nginx during the
installation. In case none is found, Nginx is automatically installed.
You can find a basic example in [our Webserver configuration guide](/en/tutorials/webserver-config).

### Redis

[Redis](https://redis.io/) is required for realtime communication via web socket. Zammad requires Redis 6 or newer.
The installation and configuration is out of scope of this documentation. Please follow the official guides and ensure
to set it up in a secure way or consider another installation method or Zammad's hosting services.

### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="highly recommended"/>

Elasticsearch is not automatically installed. Because it is crucial for a proper
Zammad setup, it is included in the installation instructions above. If you want
to connect Zammad to an already existing Elasticsearch instance, make sure to
use a supported version and have a look at our
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
older to index the contents of email attachments. Starting with Elasticsearch 8,
it is included by default.

### Memcached

Zammad heavily relies on caching to improve performance. This cache can be stored in the file system without relying on
externals services. However, this is only possible if all services of Zammad are running on the same file system!

In all other cases like deploying Zammad via containers (Docker or Kubernetes) or on separate cluster nodes, a
[Memcached](https://memcached.org/){target=_blank} service is required to store the cache and serve it to all Zammad instances.
The Docker and Kubernetes stacks already include this service.

However, even local file system installations may benefit from Memcached's performance improvements. You might want to
have a look at our [performance tuning](/en/reference/environment-variables#performance-tuning) section too.

The installation and configuration is out of scope of this documentation. In case you have to install Memcached manually,
please follow the [official documentation of Memcached](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="optional"/>

If you want to use the PGP integration for sending and receiving signed and
encrypted emails, you need to install the GnuPG-Tool. Please have a look at
the official
[GnuPG website](https://www.gnupg.org/index.html){target=_blank}.
