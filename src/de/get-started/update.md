---
order: 3
title: Aktualisierung
---

# Updating Zammad

<!--@include: @/de/modules/zammad-services-hint.md-->

Before updating Zammad, we strongly recommend to take a look at our [release
notes](https://zammad.com/en/releases). You can find information about
features and fixes as well as technical remarks and breaking changes.

Be aware that you should not skip major Zammad versions while updating. That
means, for example, your upgrade path from version `2.4` to `5.1` (assuming
this is the current stable) would be: `2.4` → `3.0` → `4.0` → `5.0` →
`latest stable (5.1)`

## Update Package Installation

### Stop Zammad
```bash
systemctl stop zammad
```

### Backup Zammad
Create a backup. You can use the [backup
script](/en/tutorials/backup-restore) which is shipped with the Zammad
package.

### Update Zammad

:::info
If you update your complete system and there are updates for Zammad **and** your
database server, this could lead to errors because your database may not be
online again when Zammad is updated.

In such a case, you might want to exclude Zammad from updating temporarily as
you can see in the commands below.
:::

:::tabs

=== Ubuntu/Debian
Update package lists:
```bash
apt update
```
Disable updates for Zammad:
```bash
apt-mark hold zammad
```
Update all packages except Zammad:
```bash
apt upgrade
```
Re-enable updates for Zammad:
```bash
apt-mark unhold zammad
```
Update Zammad:
```bash
apt upgrade
```

=== OpenSUSE/SLES

Update package lists:
```bash
zypper refresh
```
Disable updates for Zammad:
```bash
zypper addlock zammad
```
Update all packages except Zammad:
```bash
zypper update
```
Re-enable updates for Zammad:
```bash
zypper removelock zammad
```
Update Zammad:
```bash
zypper update
```
=== CentOS/RHEL

Update package lists:
```bash
yum check-update
```
Update all packages except Zammad:
```bash
yum upgrade --exclude zammad
```
Update Zammad:
```bash
yum upgrade
```
:::

### Additional Steps

Updating Elasticsearch may be relevant, too. Make sure to have a supported
version of Elasticsearch installed (see [package
installation](/en/get-started/installation/package#elasticsearch)  for
supported versions).

If you have to update Elasticsearch, please have a look at [their
documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html)
and follow the instructions.

In case your are using plugins for Elasticsearch, make sure they are updated
as well (note: starting with Elasticsearch 8, the ingest-attachment is no
longer a plugin, it’s now included in Elasticsearch).

### Start Zammad
```bash
systemctl start zammad
```

## Update Docker Installation

::: warning
Docker-Compose stack updates may require extra steps or introduce breaking
changes. Always check the docker compose release notes for updating
instructions first.
:::

### Updating Portainer Based Installations

In your Zammad stack, click on `Pull and redeploy`, activate **Re-pull image
and redeploy** and click on `Update`.

![Highlighted stack update in
Portainer](/screenshots/installation/portainer-stack-update.png)

### Updating Docker Compose Based Installations

```bash
cd zammad-docker-compose
```
```bash
git pull
```
```bash
docker-compose pull
```
```bash
docker-compose up -d
```