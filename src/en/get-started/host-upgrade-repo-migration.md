---
title: Host Upgrade and Repository Migration
order: 4
---

# Host Upgrade and Repository Migration

<!--@include: @/en/modules/zammad-services-hint.md-->

This page covers the required steps for a host upgrade and to switch to Zammad's new package repositories. If you just
want to update Zammad itself, please refer to [Updating Zammad](update). To just switch to the new repositories without
a host upgrade, skip the host upgrade steps.

Starting with Zammad 7, packages are being built using a new toolchain and hosted under another URL. The packages are
being built via old toolchain as well (except for Debian 13) for some time, but we encourage you to switch to the new
repositories in a timely manner. This means you need to add a new repository key and change your repository
configuration.

:::warning
Always make sure to have a [backup](/en/tutorials/backup-restore) of your data before performing an upgrade.
:::

The following operating systems are supported:

<!--@include: /installation/package.md{15,20}-->

## Stop Zammad

```sh
sudo systemctl stop zammad
```

## Host Upgrade Steps

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
sudo dnf upgrade --exclude zammad
```

:::

### Perform Host Upgrade

Perform the host upgrade according to the documentation of your operating system. Because this is an advanced task, we
don't provide detailed steps here. After upgrading your operating system, proceed with the next steps.

### Reboot Host

In case you did not reboot your system after the upgrade, make sure to reboot your system now. Afterwards, check if
everything is running as expected. In case Zammad starts automatically, stop it again before proceeding with the
next steps.

## Adjust Package Repository

### Remove Old Repository

Remove the old repository configuration file or disable/delete the old repository in your package manager.

:::tabs key:distros

=== Ubuntu

Ubuntu 22.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.sources
```

Ubuntu 24.04:

```sh
sudo rm /etc/apt/sources.list.d/zammad.list
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

### Remove Old Repository Key

Remove the old repository key from your system. Depending on your operating system and version, the location or method
differs.

:::tabs key:distros

=== Ubuntu

```sh
sudo rm /etc/apt/keyrings/pkgr-zammad.gpg
```

=== Debian

```sh
sudo rm /etc/apt/trusted.gpg.d/pkgr-zammad.gpg
```

=== OpenSUSE/SLES

List the keys of your system:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Delete the key(s) related to Zammad (and only those!), replace ``<key-name>`` with the actual key ID:

```sh
sudo rpm -e <key-name>
```

=== CentOS/RHEL

List the keys of your system:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Delete the key(s) related to Zammad (and only those!), replace ``<key-name>`` with the actual key ID:

```sh
sudo rpm -e <key-name>
```

:::

### Add New Repository

If the repository key is different for the old and new version your distribution or your distribution expects it in a
different location, add the new one. Otherwise, you can add the new repository configuration directly.

<!--@include: /installation/package.md{172,296}-->

### Update Zammad

:::tip
If there is a new Zammad version available and you want to update to it, check the
[release notes](https://zammad.com/en/product/releases) for any required additional steps.
:::

Re-enable updates for Zammad and update Zammad to the latest version available for your operating system.

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
sudo dnf upgrade zammad
```

:::

### Start Zammad

```sh
sudo systemctl start zammad
```
