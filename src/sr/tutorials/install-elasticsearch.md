---
order: 1
title: 'Elasticsearch инсталација'
---

# Elasticsearch инсталација

<!--@include: @/sr/modules/zammad-services-hint.md-->

Овај водич приказује једноставну стандардну инсталацију Elasticsearch 9. Циљ
је да вас брзо покренете. Међутим, у случају да вам је потребна напреднија
конфигурација или се суочите са било којим проблемом, погледајте [званичну
документацију за инсталацију
Elasticsearch](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch){target=_blank}.
Прилагодите је где год је потребно у случају да се ваш случај употребе
разликује.

## Инсталација

### Додајте Zammad репозиториј

::: tabs key:distros

=== Ubuntu/Debian

``` sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | sudo tee /usr/share/keyrings/elasticsearch-keyring.gpg \
  && sudo chmod 644 /usr/share/keyrings/elasticsearch-keyring.gpg
```

=== OpenSUSE/SLES

``` sh
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

=== CentOS/RHEL

``` sh
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

:::

### Додајте Zammad репозиториј

::: tabs key:distros

=== Ubuntu/Debian

``` sh
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

=== OpenSUSE/SLES

```sh
sudo cat << EOF > /etc/zypp/repos.d/elasticsearch.repo
[elasticsearch]
name=Elasticsearch repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
autorefresh=1
type=rpm-md
EOF
```

=== CentOS/RHEL

```sh
sudo cat << EOF > /etc/yum.repos.d/elasticsearch.repo
[elasticsearch]
name=Elasticsearch repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
type=rpm-md
EOF
```

:::

### Elasticsearch инсталација

::: tabs key:distros

=== Ubuntu/Debian

``` sh
sudo apt update && sudo apt install elasticsearch
```

=== OpenSUSE/SLES

```sh
sudo zypper modifyrepo --enable elasticsearch && sudo zypper install elasticsearch
```

=== CentOS/RHEL

RHEL 7 или раније:

```sh
sudo yum install --enablerepo=elasticsearch elasticsearch
```

CentOS и RHEL 8 и новији:

```sh
sudo dnf install --enablerepo=elasticsearch elasticsearch
```

:::

::: tip
Проверите излаз и копирајте лозинку уграђеног суперкорисника. Иначе, мораћете је поново креирати покретањем `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.
:::

## Подешавања

Опционо, проверите и конфигуришите конфигурациони фајл Elasticsearch који
можете пронаћи на `/etc/elasticsearch/elasticsearch.yml`.

Препоручујемо да подесите максималну величину контекста која треба да се
индексира у Elasticsearch. Подесите је на разумну величину као у примеру:

```yml
http.max_content_length: 400mb
```

Додатна конфигурација је ван опсега ове документације. У случају да ваш
сценарио захтева додатну конфигурацију, погледајте [Еластичну референцу
конфигурације](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference).

## Elasticsearch инсталација

```sh
systemctl рестарт elasticsearch
```

## Следећи кораци

Наставите са [инсталацијом
Zammad](/en/get-started/installation/package#add-zammad-repository). Након
што је инсталација Zammad завршена, можете [повезати Zammad са
Elasticsearch](/en/tutorials/connect-config-elasticsearch).
