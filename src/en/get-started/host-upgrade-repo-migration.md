---
title: Host upgrade and repository migration
order: 4
---

# Host upgrade and repository migration

<!--@include: @/en/modules/zammad-services-hint.md-->

This page covers the required steps for a host upgrade and to switch to Zammad's new package repositories. If you just
want to update Zammad itself, please refer to [Updating Zammad](update). To just switch to the new repositories without
a host upgrade, skip the host upgrade steps.

Zammad packages are being built with a new toolchain and are hosted under another URL. The old toolchain is no longer
in use, so the packages in the old repositories no longer receive updates. This means you need to add a new repository
key and change your repository configuration.

The repository channel in the URL selects the release line: `stable` contains the current stable release, while release
lines that are out of support have a channel of their own, for example `stable-6.5`.

::: warning
Always make sure to have a [backup](/en/tutorials/backup-restore) of your data before performing an upgrade.
:::

<!-- TODO: remove this warning box with the next Zammad release (added for the 6.5.5 emergency release). -->

::: warning
Zammad 6.5.5 is an emergency release that fixes a security issue. Zammad 6.5 is out of support and its packages are only
available in the `stable-6.5` channel. See [Update an out-of-support release](#update-an-out-of-support-release) below
for the steps.
:::

The following operating systems are supported:

| Distribution         | Version              |
| -------------------- | :------------------- |
| CentOS/RHEL          | 9, 10                |
| Debian               | 12 & 13              |
| OpenSUSE Leap / SLES | 15 & 16              |
| Ubuntu               | 22.04, 24.04 & 26.04 |

## Stop Zammad

```sh
sudo systemctl stop zammad
```

## Host upgrade steps

### Disable updates for Zammad

::: tabs key:distros

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

### Perform host upgrade

Perform the host upgrade according to the documentation of your operating system. Because this is an advanced task, we
don't provide detailed steps here. After upgrading your operating system, proceed with the next steps.

### Reboot host

In case you did not reboot your system after the upgrade, make sure to reboot your system now. Afterwards, check if
everything is running as expected. In case Zammad starts automatically, stop it again before proceeding with the
next steps.

## Adjust package repository

### Remove old repository

Remove the old repository configuration file or disable/delete the old repository in your package manager.

::: tabs key:distros

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

### Remove old repository key

Remove the old repository key from your system. Depending on your operating system and version, the location or method
differs.

::: tabs key:distros

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

Delete the key(s) related to Zammad (and only those!), replace `<key-name>` with the actual key ID:

```sh
sudo rpm -e <key-name>
```

=== CentOS/RHEL

List the keys of your system:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Delete the key(s) related to Zammad (and only those!), replace `<key-name>` with the actual key ID:

```sh
sudo rpm -e <key-name>
```

:::

### Add new repository

If the repository key is different for the old and new version your distribution or your distribution expects it in a
different location, add the new one. Otherwise, you can add the new repository configuration directly.

:::: tabs key:distros

=== Ubuntu
Add repository key:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Add repository (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Ubuntu 26.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/26.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Add repository key:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Add repository (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Debian 13):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Add repository (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo"
```

Add repository (OpenSUSE/SLES 16):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/16.repo"
```

===CentOS/RHEL
Add repository key:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Add repository (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/9.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

Add repository (CentOS/RHEL 10):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/10.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

::::

### Install Zammad

::: tabs key:distros

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

:::

### Update Zammad

::: tip
If there is a new Zammad version available and you want to update to it, check the
[release notes](https://zammad.com/en/product/releases){target=_blank} for any required additional steps.
:::

Re-enable updates for Zammad and update Zammad to the latest version available for your operating system.

::: tabs key:distros

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

<!-- TODO: remove this section with the next Zammad release (added for the 6.5.5 emergency release). -->

## Update an out-of-support release

Zammad 6.5.5 is an emergency release that fixes a security issue. Zammad 6.5 has been out of support for some time and
no longer receives security updates, so updating to the current stable release is the recommended action. Follow the
steps below only if you cannot update to a supported release right now.

Zammad builds 6.5.5 packages for Ubuntu 20.04, 22.04 and 24.04, Debian 11 and 12, CentOS/RHEL 8 and 9, and OpenSUSE
Leap/SLES 15.

### Add the 6.5 repository

Remove the old repository and its key first, as described in Adjust package repository above. Otherwise your package
manager keeps reading the old repository, which offers packages of a newer release line.

Add the new repository with the `stable-6.5` channel:

:::: tabs key:distros

=== Ubuntu
Add repository key:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Add repository (Ubuntu 20.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/ubuntu/20.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/ubuntu/22.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/ubuntu/24.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Add repository key:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Add repository (Debian 11):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/debian/11.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Add repository (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/debian/12.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Add repository (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/sles/15.repo"
```

=== CentOS/RHEL

Add repository key:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Add repository (CentOS/RHEL 8):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/el/8.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

Add repository (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable-6.5/installer/el/9.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

::::

### Update Zammad to 6.5.5

Stop Zammad:

```sh
sudo systemctl stop zammad
```

:::: tabs key:distros

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

::::

Start Zammad:

```sh
sudo systemctl start zammad
```
