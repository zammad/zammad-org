---
order: 4
title: 'Host Upgrade'
---

# Host Upgrade

<!--@include: @/de/modules/zammad-services-hint.md-->

If you installed Zammad via [package manager](installation/package) and need
to upgrade your host operating system, make sure to read the steps
below. Some additional steps are required compared to just updating Zammad
itself.

:::warning
Always make sure to have a [backup](/en/tutorials/backup-restore) of your data before performing an upgrade.
:::

The following operating systems are supported:

<!--@include: /installation/package.md{15,20}-->

## Allgemein

The general steps, no matter which operating system you are using, are:

1. Zammad stoppen
1. Disable updates for Zammad
1. Perform host upgrade
1. Reboot host
1. Adjust package repository
1. Zammad aktualisieren
1. Zammad starten

## Detailed Steps

### Zammad stoppen

```sh
sudo systemctl stop zammad
```

### Disable Updates for Zammad

:::tabs key:distros

=== Ubuntu

```sh
sudo apt-mark hold zammad
```

=== Debian

```sh
sudo apt-mark hold zammad
```

=== OpenSUSE/SLES

```sh
sudo zypper addlock zammad
```

=== CentOS/RHEL

```sh
sudo yum upgrade --exclude zammad
```

:::

### Perform Host Upgrade

Perform the host upgrade according to the documentation of your operating
system. Because this is an advanced task, we don't provide detailed steps
here. After upgrading your operating system, proceed with the next steps.

### Reboot Host

In case you did not reboot your system after the upgrade, make sure to
reboot your system now. Afterwards, check if everything is running as
expected. In case Zammad starts automatically, stop it again before
proceeding with the next steps.

### Adjust Package Repository

#### Remove Old Repository

Remove the old repository configuration file or disable/delete the old
repository in your package manager.

:::tabs key:distros

=== Ubuntu

Ubuntu 22.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.list
```

Ubuntu 20.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.sources
```

=== Debian

```sh
sudo rm /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

```sh
sudo rm /etc/zypp/repos.d/zammad.repo
```

=== CentOS/RHEL

```sh
sudo rm /etc/yum.repos.d/zammad.repo
```

:::

#### Add New Repository

If the repository key is different for the old and new version your
distribution or your distribution expects it in a different location, add
the new one. Otherwise, you can add the new repository configuration
directly.

<!--@include: /installation/package.md{171,283}-->

### Zammad aktualisieren

:::tip
If there is a new Zammad version available and you want to update to it, check the
[release notes](https://zammad.com/en/product/releases) for any required additional steps.
:::

Re-enable updates for Zammad and update Zammad to the latest version
available for your operating system.

:::tabs key:distros

=== Ubuntu

Update package index:

```sh
sudo apt update
```

Re-enable updates for Zammad:

```sh
sudo apt-mark unhold zammad
```

Update Zammad:

```sh
sudo apt upgrade zammad
```

=== Debian

Update package index:

```sh
sudo apt update
```

Re-enable updates for Zammad:

```sh
sudo apt-mark unhold zammad
```

Update Zammad:

```sh
sudo apt upgrade zammad
```

=== OpenSUSE/SLES

Update package index:

```sh
sudo zypper refresh
```

Re-enable updates for Zammad:

```sh
sudo zypper removelock zammad
```

Update Zammad:

```sh
sudo zypper update zammad
```

=== CentOS/RHEL

```sh
sudo yum upgrade zammad
```

:::

### Zammad starten

```sh
sudo systemctl start zammad
```
