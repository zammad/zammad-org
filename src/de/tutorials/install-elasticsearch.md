---
order: 1
title: 'Install Elasticsearch 7'
---

# Install Elasticsearch 7

<!--@include: @/de/modules/zammad-services-hint.md-->

## Einführung

Elasticsearch is technically not required to run Zammad, but *highly*
recommended.

Elasticsearch offers two versions. Currently, the versions 7 and 8 are
maintained. For installation instructions, you should first and foremost
follow [Elastic’s installation
documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#elasticsearch-install-packages).
Use the dropdown in the top left corner to choose which version you want to
install.

However, if you want go with Elasticsearch 7 (which is slightly easier to
install), you can find the consolidated installation steps below. Be aware
that the maintenance of version 7 might be stopped earlier than for version
8, which also comes with some additional security features.

:::info
If you are installing Elasticsearch 8 and want to follow our
[standard configuration](/en/tutorials/connect-config-elasticsearch), make sure
to copy/save the password which is shown while installing Elasticsearch.
:::

## Install Elasticsearch 7

:::tabs

=== Ubuntu

```bash
apt install apt-transport-https sudo wget curl gnupg
```
```bash
echo "deb [signed-by=/etc/apt/trusted.gpg.d/elasticsearch.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main"| \
  tee -a /etc/apt/sources.list.d/elastic-7.x.list > /dev/null
```
```bash
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | tee /etc/apt/trusted.gpg.d/elasticsearch.gpg> /dev/null
```
```bash
apt update
```
```bash
apt install elasticsearch
```

=== Debian

```bash
apt install apt-transport-https sudo wget curl gnupg
```
```bash
echo "deb [signed-by=/etc/apt/trusted.gpg.d/elasticsearch.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main"| \
  tee -a /etc/apt/sources.list.d/elastic-7.x.list > /dev/null
```
```bash
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | tee /etc/apt/trusted.gpg.d/elasticsearch.gpg> /dev/null
```
```bash
apt update
```
```bash
apt install elasticsearch
```

=== OpenSUSE

```bash
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```
```bash
echo "[elasticsearch-7.x]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md"| tee /etc/zypp/repos.d/elasticsearch-7.x.repo
```
```bash
zypper install elasticsearch
```

=== CentOS

```bash
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```
```bash
echo "[elasticsearch-7.x]
name=Elasticsearch repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md"| tee /etc/yum.repos.d/elasticsearch-7.x.repo
```
```bash
yum install -y elasticsearch
```
=== Direct Download

:::

Install the ingest-attachment plugin:
: ```bash
  /usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-attachment
  ```

Increase Virtual Memory Map Limit:
: ```bash
  sysctl -w vm.max_map_count=262144
  ```

Adjust ``/etc/elasticsearch/elasticsearch.yml``:
: ```yml
  # /etc/elasticsearch/elasticsearch.yml

  # Tickets above this size (articles + attachments + metadata)
  # may fail to be properly indexed (Default: 100mb).
  #
  # When Zammad sends tickets to Elasticsearch for indexing,
  # it bundles together all the data on each individual ticket
  # and issues a single HTTP request for it.
  # Payloads exceeding this threshold will be truncated.
  #
  # Performance may suffer if it is set too high.
  http.max_content_length: 400mb

  # Allows the engine to generate larger (more complex) search queries.
  # Elasticsearch will raise an error or deprecation notice if this value is
  # too low, but setting it too high can overload system
  # resources (Default: 1024).
  #
  # Available in version 6.6+ only.
  indices.query.bool.max_clause_count: 2000
  ```

Enable it by default and start it:
: ```bash
  systemctl enable elasticsearch --now
  ```

## Next Steps

 Go on with
 [connecting Elasticsearch with Zammad](/en/tutorials/connect-config-elasticsearch).
