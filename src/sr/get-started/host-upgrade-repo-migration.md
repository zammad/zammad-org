---
order: 4
title: 'Надоградња хоста и миграција repo-зиторијума'
---

# Надоградња хоста и миграција repo-зиторијума

<!--@include: @/sr/modules/zammad-services-hint.md-->

Ова страница покрива потребне кораке за надоградњу хоста и прелазак на нове
пакетне repo-зиторијуме Zammad-а. Ако желите само да ажурирате Zammad,
погледајте [Ажурирање Zammad-а](update). Да бисте се пребацили само на нове
repo-зиторијуме без надоградње хоста, прескочите кораке за надоградњу хоста.

Почев од Zammad-а 7, пакети се граде новом алатном линијом и хостују на
другој URL адреси. Пакети ће се градити и старом алатном линијом (осим за
Debian 13) још неко време, али вас подстичемо да правовремено пређете на
нове repo-зиторијуме. То значи да морате додати нови кључ repo-зиторијума и
променити конфигурацију.

::: warning
Увек се уверите да имате [резервну копију](/en/tutorials/backup-restore) података пре извршавања надоградње.
:::

Следеће опције проксија приступа су подржане:

| Дистрибуција  | Верзија             |
| ------------- | :-----------------  |
| CentOS/RHEL   | 8 и 9               |
| Debian        | 11 и 12             |
| OpenSUSE/SLES | Leap 15.x / 15      |
| Ubuntu        | 20.04, 22.04, 24.04 |

## Преузмите Zammad

```sh
systemctl старт заммад
```

## Кораци надоградње хоста

### Коришћење Zammad-а

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

### Извршите надоградњу хоста

Извршите надоградњу хоста према документацији вашег оперативног система. С
обзиром на то што је ово напредан задатак, не пружамо детаљне кораке
овде. Након надоградње оперативног система, наставите са следећим корацима.

### Рестартујте хост

Ако нисте рестартовали систем након надоградње, сада га обавезно
рестартујте. Затим проверите да ли све ради како треба. Ако се Zammad
покрене аутоматски, поново га зауставите пре наставка са следећим корацима.

## Додајте Zammad репозиториј

### Додајте Zammad репозиториј

Уклоните стари фајл конфигурације repo-зиторијума или онемогућите/обришите
стари repo-зиторијум у управљачу пакета.

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

### Додајте Zammad репозиториј

Уклоните стари кључ repo-зиторијума са вашег система. Зависно од оперативног
система и верзије, локација или метод се разликују.

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

Прикажите листе кључева на вашем систему:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Обришите кључ/кључеве везане за Zammad (и само њих!), замените `<key-name>` стварним ID-ом кључа:

```sh
sudo rpm -e <key-name>
```

=== CentOS/RHEL

Прикажите листе кључева на вашем систему:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Обришите кључ/кључеве везане за Zammad (и само њих!), замените `<key-name>` стварним ID-ом кључа:

```sh
sudo rpm -e <key-name>
```

:::

### Додајте Zammad репозиториј

Ако се кључ repo-зиторијума разликује између старе и нове верзије вашег
дистрибуција или га ваше дистрибуција очекује на другој локацији, додајте
нови. У супротном, можете директно додати нову конфигурацију
repo-зиторијума.

:::: tabs key:distros

=== Ubuntu
Инсталирајте кључ репозиторија:

```sh
curl -fsSL https://dl.packager.io/srv/zammad/zammad/key | \
gpg --dearmor | sudo tee /etc/apt/keyrings/pkgr-zammad.gpg> /dev/null
```

Ubuntu 20.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 20.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 22.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 22.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

Ubuntu 24.04

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/ubuntu 24.04 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

=== Debian
Инсталирајте кључ репозиторија:

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

```sh
echo "deb [signed-by=/etc/apt/keyrings/pkgr-zammad.gpg] https://dl.packager.io/srv/deb/zammad/zammad/stable/debian 12 main"| \
   sudo tee /etc/apt/sources.list.d/zammad.list > /dev/null
```

=== OpenSUSE/SLES
Инсталирајте кључ репозиторија:

```sh
sudo rpm --import https://dl.packager.io/srv/zammad/zammad/key
```

OpenSUSE 15.x / SLES15

```sh
sudo wget -O /etc/zypp/repos.d/zammad.repo \
https://dl.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo
```

===CentOS/RHEL
Инсталирајте кључ репозиторија:

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

### Инсталација Zammad-а

::: tabs key:distros

=== Debian & Ubuntu

```sh
sudo dpkg -r --force-depends zammad
```

```sh
sudo apt install zammad
```

=== openSUSE

``` sh
sudo zypper remove -R zammad
```

```sh
sudo zypper install zammad
```

:::

### Коришћење Zammad-а

::: tip
Ако је доступна нова верзија Zammad-а и желите да се ажурирате, проверите [белешке уз издање](https://zammad.com/en/product/releases) за било какве додатне потребне кораке.
:::

Поново омогужите ажурирања за Zammad и ажурирајте га на најновију верзију
доступну за ваш оперативни систем.

::: tabs key:distros

=== Ubuntu

Ажурирајте индекс пакета:

```sh
sudo apt update
```

Поново омогући ажурирања за Zammad:

```sh
sudo apt-mark unhold zammad
```

Ажурирај Zammad:

```sh
sudo apt upgrade zammad
```

=== Debian

Ажурирајте индекс пакета:

```sh
sudo apt update
```

Поново омогући ажурирања за Zammad:

```sh
sudo apt-mark unhold zammad
```

Ажурирај Zammad:

```sh
sudo apt upgrade zammad
```

=== OpenSUSE/SLES

Ажурирајте индекс пакета:

```sh
sudo zypper refresh
```

Поново омогући ажурирања за Zammad:

```sh
sudo zypper removelock zammad
```

Ажурирај Zammad:

```sh
sudo zypper update zammad
```

=== CentOS/RHEL

```sh
sudo dnf upgrade zammad
```

:::

### Преузмите Zammad

```sh
systemctl старт заммад
```
