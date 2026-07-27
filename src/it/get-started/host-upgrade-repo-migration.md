---
order: 4
title: 'Host upgrade and repository migration'
---

# Host upgrade and repository migration

<!--@include: @/en/modules/zammad-services-hint.md-->

Questa pagina descrive i passaggi necessari per aggiornare l'host e passare
ai nuovi repository di pacchetti di Zammad. Se desideri aggiornare solo
Zammad, consulta la sezione [Aggiornamento di Zammad](update). Per passare
ai nuovi repository senza aggiornare l'host, salta i passaggi relativi
all'aggiornamento dell'host.

A partire da Zammad 7, i pacchetti vengono creati usando una nuova toolchain
e ospitati con un altro URL.

::: warning
Assicurati sempre di avere un [backup](/it/tutorials/backup-restore) dei tuoi dati prima di eseguire un aggiornamento.
:::

I seguenti sistemi operativi sono supportati:

| Distribution         | Version              |
| -------------------- | :------------------- |
| CentOS/RHEL          | 9, 10                |
| Debian               | 11, 12 & 13          |
| OpenSUSE Leap / SLES | 15 & 16              |
| Ubuntu               | 22.04, 24.04 & 26.04 |

## Ferma Zammad

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

Esegui l'aggiornamento dell'host secondo la documentazione del tuo sistema
operativo.

### Reboot host

Nel caso in cui tu non abbia riavviato il sistema dopo l'aggiornamento,
assicurati di riavviarlo ora.

## Adjust package repository

### Remove old repository

Rimuovi il vecchio file di configurazione del repository o
disabilita/elimina il vecchio repository nel tuo gestore pacchetti.

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

Rimuovi la vecchia chiave del repository dal tuo sistema. A seconda del tuo
sistema operativo e versione.

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

Se la chiave del repository è diversa per la vecchia e nuova versione, la
tua distribuzione potrebbe richiedere passaggi aggiuntivi.

:::: tabs key:distros

=== Ubuntu
Aggiungi la chiave del repository:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \

-o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Aggiungi il repository (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi il repository (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi repository (Ubuntu 26.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/26.04.list" \

-o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Aggiungi chiave repository:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \

-o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Aggiungi repository (Debian 11):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/11.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi repository (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi repository (Debian 13):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \

-o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Aggiungi repository (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
"https://go.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo"
```

Aggiungi repository (OpenSUSE/SLES 16):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \

"https://go.packager.io/srv/zammad/zammad/stable/installer/sles/16.repo"
```

===CentOS/RHEL
Aggiungi la chiave del repository:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Aggiungi il repository (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/9.repo" \

-o /etc/yum.repos.d/zammad.repo
```

Aggiungi il repository (CentOS/RHEL 10):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/10.repo" \ 
-o /etc/yum.repos.d/zammad.repo
```

::::

### Installa Zammad

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

### Aggiorna Zammad

::: tip
If there is a new Zammad version available and you want to update to it, check the
[release notes](https://zammad.com/en/product/releases){target=_blank} for any required additional steps.
:::

Riattiva gli aggiornamenti per Zammad e aggiornalo all'ultima versione
disponibile per il tuo sistema operativo.

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

### Avvia Zammad

```sh
sudo systemctl start zammad
```
