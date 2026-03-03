---
order: 3
title: Освежавање
---

# Updating Zammad

<!--@include: @/sr/modules/zammad-services-hint.md-->

Before updating Zammad, we strongly recommend to take a look at our [release
notes](https://zammad.com/en/releases){target=_blank}. You can find
information about features and fixes as well as technical remarks and
breaking changes.

Be aware that you should not skip major Zammad versions while updating. That
means, for example, your upgrade path from version `2.4` to `5.1` (assuming
this is the current stable) would be: `2.4` → `3.0` → `4.0` → `5.0` →
`latest stable (5.1)`

## Update Package Installation

### Check Dependencies

Before proceeding, double-check that your system environment matches
Zammad's requirements (see [Prerequisites](installation/prerequisites) and
[Package Installation](installation/package)).

### Stop Zammad

```sh
sudo systemctl stop zammad
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

```sh
sudo apt update
```

Disable updates for Zammad:

```sh
sudo apt-mark hold zammad
```

Update all packages except Zammad:

```sh
sudo apt upgrade
```

Re-enable updates for Zammad:

```sh
sudo apt-mark unhold zammad
```

Update Zammad:

```sh
sudo apt upgrade
```

=== OpenSUSE/SLES

Update package lists:

```sh
sudo zypper refresh
```

Disable updates for Zammad:

```sh
sudo zypper addlock zammad
```

Update all packages except Zammad:

```sh
sudo zypper update
```

Re-enable updates for Zammad:

```sh
sudo zypper removelock zammad
```

Update Zammad:

```sh
sudo zypper update
```

=== CentOS/RHEL

Update package lists:

```sh
sudo yum check-update
```

Update all packages except Zammad:

```sh
sudo yum upgrade --exclude zammad
```

Update Zammad:

```sh
sudo yum upgrade
```

:::

### Additional Steps

Updating Elasticsearch may be relevant, too. Make sure to have a supported
version of Elasticsearch installed (see [package
installation](/en/get-started/installation/package#elasticsearch)  for
supported versions).

If you have to update Elasticsearch, please have a look at [their
documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html){target=_blank}
and follow the instructions.

### Rebuild Elasticsearch Index <Badge type="tip" text="optional" />

Only needed if the release note tells you to rebuild the Elasticsearch
index.

Without specifying CPU cores to use:

```sh
zammad run rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

### Start Zammad

```sh
sudo systemctl start zammad
```

## Update Docker Installation

::: warning
Docker Compose stack updates may require extra steps or introduce breaking
changes. Always check the [Docker Compose release notes](https://github.com/zammad/zammad-docker-compose/releases)
for update instructions first.
:::

### Updating Portainer Based Installations

У вашем Zammad stack-у, кликните на Pull and redeploy`, укључите **Re-pull
image and redeploy** и кликните на `Update`.

![Highlighted stack update in
Portainer](/screenshots/installation/portainer-stack-update.png)

### Updating Docker Compose Based Installations

```sh
cd zammad-docker-compose
```

```sh
git pull
```

```sh
docker compose pull
```

```sh
docker compose up -d
```
