---
order: 1
title: 'Instalar o Elasticsearch 9'
---

# Instalar o Elasticsearch 9

<!--@include: @/en/modules/zammad-services-hint.md-->

Este guia mostra uma instalação padrão simples do Elasticsearch 9. A
intenção é colocá-lo em funcionamento rapidamente. No entanto, caso você
precise de uma configuração mais avançada ou enfrente algum problema, dê uma
olhada na [documentação oficial de instalação do
Elasticsearch](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch){target=_blank}.
Adapte-a onde necessário, caso seu caso de uso seja diferente.

## Instalação

### Adicionar chave do repositório

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

### Adicionar repositório

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

### Instalar o Elasticsearch

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

RHEL 7 or earlier:

```sh
sudo yum install --enablerepo=elasticsearch elasticsearch
```

CentOS and RHEL 8 and later:

```sh
sudo dnf install --enablerepo=elasticsearch elasticsearch
```

:::

::: tip
Certifique-se de verificar a saída e copiar a senha do superusuário integrado. Caso contrário, você terá que recriá-la
executando `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.
:::

## Configuração

Opcionalmente, verifique e configure o arquivo de configuração do
Elasticsearch, que você pode encontrar em
`/etc/elasticsearch/elasticsearch.yml`.

Recomendamos ajustar o tamanho máximo de contexto que deve ser indexado pelo
Elasticsearch. Ajuste-o para um tamanho razoável, como no exemplo:

```yml
http.max_content_length: 400mb
```

Configuração adicional está fora do escopo desta documentação. Caso seu
cenário precise de configuração adicional, dê uma olhada na [referência de
configuração da
Elastic](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference){target=_blank}.

## Iniciar e habilitar o Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

## Próximas etapas

Continue com a [instalação do
Zammad](/pt_BR/get-started/installation/package#add-zammad-repository).
Depois que a instalação do Zammad estiver concluída, você pode [conectar o
Zammad ao Elasticsearch](/pt_BR/tutorials/connect-config-elasticsearch).
