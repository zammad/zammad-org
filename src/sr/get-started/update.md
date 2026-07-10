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

::: info
This page describes how to update Zammad only. In case you want to update your host operating system too, have a look
at [Host Upgrade and Repository Migration](host-upgrade-repo-migration) instructions.
:::

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

::: info
If you update your complete system and there are updates for Zammad **and** your
database server, this could lead to errors because your database may not be
online again when Zammad is updated.

In such a case, you might want to exclude Zammad from updating temporarily as
you can see in the commands below.
:::

::: tabs key:distros

=== Ubuntu
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

=== Debian
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

Update all packages except Zammad:

```sh
sudo dnf upgrade --exclude zammad
```

Update Zammad:

```sh
sudo dnf upgrade
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
changes. Always check the [Docker Compose release notes](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}
for update instructions first.
:::

::: tip
If you want to update Zammad to a specific version, use the `VERSION` environment variable
([example](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
with further explanation) and specify the version number.
:::

### Updating Portainer Based Installations

У вашем Zammad stack-у, кликните на Pull and redeploy`, укључите **Re-pull
image and redeploy** и кликните на `Update`.

![Highlighted stack update in
Portainer](/screenshots/get-started/installation/portainer-stack-update.png)

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

### Rebuild Elasticsearch Index <Badge type="tip" text="optional" />

Only needed if the release note tells you to rebuild the Elasticsearch
index.

::: tabs

=== Docker Compose

Without specifying CPU cores:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer GUI

Open the [console via Portainer's GUI](installation/docker#how-to-run-commands-in-the-stack) with the standard
entrypoint `/bin/bash` and run:

Without specifying CPU cores to use:

```sh
bundle exec rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
