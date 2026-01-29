---
order: 1
title: 'Install Elasticsearch 9'
---

# Install Elasticsearch 9

<!--@include: @/sr/modules/zammad-services-hint.md-->

This guide shows a simple standard installation of Elasticsearch 9. The
intention is to get you up and running quickly.  However, in case you need a
more advanced configuration or face any issues, have a look at the [official
Elasticsearch installation
documentation](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch){target=_blank}.
Adapt it wherever needed in case your use-case differs.

## Инсталација

### Download and Add the Public Signing Key

::: tabs key:distros

=== Ubuntu/Debian

Install required tools:

```sh
sudo apt-get install apt-transport-https
```

Add repo key:

``` sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
gpg --dearmor | sudo tee /usr/share/keyrings/elasticsearch-keyring.gpg \
&& sudo chmod 644 /usr/share/keyrings/elasticsearch-keyring.gpg
```

=== OpenSUSE/SLES

``` sh
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

=== CentOS/RHEL

``` sh
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

:::

### Add the Repository

::: tabs key:distros

=== Ubuntu/Debian

``` sh
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

=== OpenSUSE/SLES

Create the file `/etc/zypp/repos.d/elasticsearch.repo` and add:

```sh
[elasticsearch]
name=Elasticsearch repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
autorefresh=1
type=rpm-md
```

=== CentOS/RHEL

Create the file `/etc/yum.repos.d/elasticsearch.repo` and add:

```sh
[elasticsearch]
name=Elasticsearch repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
type=rpm-md
```

:::

### Elasticsearch инсталација

::: tabs key:distros

=== Ubuntu/Debian

``` sh
sudo apt-get update && sudo apt-get install elasticsearch
```

=== OpenSUSE/SLES

```sh
sudo zypper modifyrepo --enable elasticsearch && \
  sudo zypper install elasticsearch; \
  sudo zypper modifyrepo --disable elasticsearch
```

=== CentOS/RHEL

CentOS and RHEL 7 or earlier:

```sh
sudo yum install --enablerepo=elasticsearch elasticsearch
```

RHEL 8 and later:

```sh
sudo dnf install --enablerepo=elasticsearch elasticsearch
```

:::

:::tip
Make sure to check the output and to copy the password of the built-in superuser. Otherwise, you have to recreate it by
running `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.
:::

## Подешавања

Optionally, check and configure Elasticsearch’s configuration file which you
can find under ``/etc/elasticsearch/elasticsearch.yml``.

We recommend to adjust the maximum context size which should get indexed by
Elasticsearch. Adjust it to a reasonable size like in the example:

```yml
http.max_content_length: 400mb
```

Additional configuration is out of scope of this documentation. In case your
scenario needs additional configuration, have a look at [Elastic’s
configuration
reference](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference).

## Start and Enable Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

## Следећи кораци

Go on with the [installation of
Zammad](/en/get-started/installation/package#add-zammad-repository). After
the installation of Zammad is completed, you can [connect Zammad with
Elasticsearch](/en/tutorials/connect-config-elasticsearch).
