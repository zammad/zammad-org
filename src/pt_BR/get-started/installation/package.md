---
order: 2
title: Pacote
---

# Instalação via pacote

<!--@include: @/en/modules/zammad-services-hint.md-->

## Sistemas operacionais suportados

Para instalação via pacote, as seguintes distribuições Linux são suportadas:

| Distribution         | Version              |
| -------------------- | :------------------- |
| CentOS/RHEL          | 9, 10                |
| Debian               | 11, 12 & 13          |
| OpenSUSE Leap / SLES | 15 & 16              |
| Ubuntu               | 22.04, 24.04 & 26.04 |

Se sua distribuição não for suportada, sinta-se à vontade para usar outro
método de instalação, ou considere usar o [serviço de nuvem do
Zammad](https://zammad.com/en/pricing){target=_blank}.

Para seguir as etapas de instalação abaixo, ferramentas como curl, gnupg e
outras são necessárias. Se elas não estiverem presentes no seu sistema,
instale-as:

::: tabs key:distros

=== Ubuntu

```sh
sudo apt install curl apt-transport-https gnupg
```

=== Debian

```sh
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

O OpenSUSE não requer nenhuma etapa adicional aqui!

O SLES 15 requer que repositórios adicionais sejam ativados. Para isso, execute os seguintes comandos.

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo dnf install curl epel-release
```

:::

Zammad uses [jemalloc](https://jemalloc.net/){target=_blank} as memory
allocator out of the box on Debian, Ubuntu, CentOS and RHEL. For SLES,
opt-out and verification details, see the [Memory
allocator](/en/reference/memory-allocator)  page.

## Fundamentos

### Garantir a localidade correta

::: tabs key:distros

=== Ubuntu
Liste suas configurações de localidade atuais:

```sh
locale | grep "LANG="
```

Se o comando acima não retornar `<lang_code>.utf8`, você pode corrigir esse
problema da seguinte forma:

```sh
sudo apt install locales
```

```sh
sudo locale-gen en_US.UTF-8
```

```sh
echo "LANG=en_US.UTF-8" | sudo tee /etc/default/locale
```

Depois de corrigir, certifique-se de verificar a saída novamente para incluir
`<lang_code>.utf8`. Uma reinicialização pode ajudar se não for bem-sucedido.

=== Debian
Liste suas configurações de localidade atuais:

```sh
locale | grep "LANG="
```

Se o comando acima não retornar `<lang_code>.utf8`, você pode corrigir esse
problema da seguinte forma:

```sh
sudo apt install locales
```

```sh
sudo locale-gen en_US.UTF-8
```

```sh
echo "LANG=en_US.UTF-8" | sudo tee /etc/default/locale
```

Depois de corrigir, certifique-se de verificar a saída novamente para incluir
`<lang_code>.utf8`. Uma reinicialização pode ajudar se não for bem-sucedido.

=== OpenSUSE/SLES
Liste suas configurações de localidade atuais:

```sh
localectl status | grep LANG
```

Se o comando acima não retornar `<lang_code>.utf8`, você pode corrigir esse
problema da seguinte forma:

```sh
sudo localectl set-locale LANG=en_US.UTF-8
```

Depois de corrigir, certifique-se de verificar a saída novamente para incluir
`<lang_code>.utf8`. Uma reinicialização pode ajudar se não for bem-sucedido.

===CentOS/RHEL
Liste suas configurações de localidade atuais:

```sh
locale | grep "LANG="
```

Se o comando acima não retornar `<lang_code>.utf8`, você pode corrigir esse
problema da seguinte forma:

```sh
sudo localectl set-locale LANG=en_US.UTF-8
```

Depois de corrigir, certifique-se de verificar a saída novamente para incluir
`<lang_code>.utf8`. Uma reinicialização pode ajudar se não for bem-sucedido.

:::

### Instalar o Elasticsearch

O método recomendado é usar o [guia oficial da
Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}
para instalar o Elasticsearch.

Como alternativa, você pode seguir [nosso exemplo de
configuração](/pt_BR/tutorials/install-elasticsearch) do Elasticsearch 9,
que é separado para manter as instruções de instalação o mais simples
possível.

### Adicionar repositório do Zammad

::: info
O Packager.io pode não estar acessível a partir de ambientes somente IPv6, então certifique-se
de considerar isso ao realizar as etapas abaixo.
:::
:::: tabs key:distros

=== Ubuntu
Adicione a chave do repositório:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Adicione o repositório (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Adicione o repositório (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Adicione o repositório (Ubuntu 26.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/26.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Adicione a chave do repositório:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \
  -o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Adicione o repositório (Debian 11):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/11.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Adicione o repositório (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Adicione o repositório (Debian 13):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Adicione o repositório (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo"
```

Adicione o repositório (OpenSUSE/SLES 16):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
  "https://go.packager.io/srv/zammad/zammad/stable/installer/sles/16.repo"
```

===CentOS/RHEL
Adicione a chave do repositório:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Adicione o repositório (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/9.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

Adicione o repositório (CentOS/RHEL 10):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/10.repo" \
  -o /etc/yum.repos.d/zammad.repo
```

::::

### Instalar o Zammad

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

=== OpenSUSE/SLES

```sh
sudo zypper refresh
```

```sh
sudo zypper install zammad
```

===CentOS/RHEL

```sh
sudo dnf update
```

```sh
sudo dnf install zammad
```

:::

### Gerenciar os serviços do Zammad

O Zammad usa três serviços. Esses serviços podem ser gerenciados
individualmente ou todos de uma vez usando o serviço pai **zammad**.

- zammad: inclui os serviços abaixo
  - **zammad-web**: servidor puma interno (relevante para exibir a aplicação
    web)
  - **zammad-worker**: worker em segundo plano - relevante para todas as
    tarefas atrasadas e em segundo plano
  - **zammad-websocket**: servidor WebSocket para informações relacionadas à
    sessão

Gerencie os serviços com os comandos `start`, `restart`, `stop`, `status` do
`systemctl`.

Exemplo para iniciar o Zammad com todos os subserviços:

```sh
sudo systemctl start zammad
```

Para parar ou reiniciar um serviço, ou verificar seu status, ajuste o
comando conforme mencionado acima.

### Próximas etapas

- [Conectar o Zammad ao
  Elasticsearch](/pt_BR/tutorials/connect-config-elasticsearch)
- [Ajustar suas regras do SELinux e
  firewall](/pt_BR/tutorials/firewall-selinux)
- [Configurar o servidor web](/pt_BR/tutorials/webserver-config)

## Dependências

Assumindo um sistema limpo, as seguintes dependências serão automaticamente
instaladas durante a instalação do pacote Zammad. Além disso, você pode
encontrar algumas informações sobre o Elasticsearch abaixo, que não é
instalado automaticamente.

- imlib2
- Node.js
- PostgreSQL
- Nginx
- Redis

### Servidor de banco de dados

O Zammad armazena seu conteúdo em um banco de dados. O sistema de banco de
dados suportado é o [PostgreSQL](https://www.postgresql.org/){target=_blank}
15 ou mais recente. Se nenhum servidor PostgreSQL for detectado, ele será
instalado automaticamente durante a instalação do pacote.

::: warning
Se você usa um software de pooling de conexão de banco de dados como o PgBouncer, certifique-se de
usar um modo de pooling totalmente compatível com o PostgreSQL. Normalmente, isso é
chamado de "session connection pooling". O pooling de conexão baseado em transação não é
suportado e pode levar a erros durante as migrações de banco de dados.
:::

### Proxy reverso

Os seguintes proxies reversos são suportados em suas versões atualmente
mantidas:

- Nginx
- Apache

O script de instalação tenta detectar um Apache ou Nginx durante a
instalação. Caso nenhum seja encontrado, o Nginx é instalado
automaticamente. Você pode encontrar um exemplo básico no nosso [guia de
configuração de servidor web](/pt_BR/tutorials/webserver-config).

### Redis

O [Redis](https://redis.io/){target=_blank} é necessário para comunicação em
tempo real via web socket. O Zammad requer o Redis 7 ou mais recente. Ele é
instalado automaticamente (pacote) ou incluído na stack (Docker Compose) com
uma configuração funcional. No entanto, a instalação e configuração estão
fora do escopo desta documentação. Siga os guias oficiais e certifique-se de
configurá-lo de forma segura.

As variáveis de ambiente disponíveis para configurações padrão e Sentinel
são brevemente mencionadas na página de [Variáveis do
Redis](/pt_BR/reference/redis).

::: info
O CentOS e o RHEL 10 usam o [Valkey](https://valkey.io/){target=_blank} como substituto direto do Redis.
Durante a instalação do Zammad nessas distribuições, ele é instalado automaticamente como dependência.
:::

### Elasticsearch <Badge type="info" text="optional"/> <Badge type="danger" text="highly recommended"/>

O Elasticsearch não é instalado automaticamente. Como é crucial para uma
configuração adequada do Zammad, ele está incluído nas instruções de
instalação acima. Se você quiser conectar o Zammad a uma instância já
existente do Elasticsearch, certifique-se de usar uma versão suportada e dê
uma olhada no nosso [exemplo de
configuração](/pt_BR/tutorials/connect-config-elasticsearch).

As versões suportadas do Elasticsearch são `8.11` - `9.x`.

Histórico de versões do Elasticsearch para o Zammad:

::: details

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 7.2+          | >= 8.15, <10   |
| 7.0-7.1       | >= 7.8, <10    |
| 5.2-6.5       | >= 7.8, <9     |
| 5.0-5.1       | >= 7.8, <8     |
| 4.0-4.1       | >= 6.5, <=7.12 |
| 3.4-3.6       | >= 5.5, <=7.9  |
| 3.3           | >= 2.4, <=7.6  |
| 3.2           | >= 2.4, <=7.5  |
| 3.1           | >= 2.4, <=7.4  |
| 2.0-3.0       | >= 2.4, <=5.6  |

:::

### Memcached

O Zammad depende muito de cache para melhorar o desempenho. Esse cache pode
ser armazenado no sistema de arquivos, sem depender de serviços externos. No
entanto, isso só é possível se todos os serviços do Zammad estiverem sendo
executados no mesmo sistema de arquivos!

Em todos os outros casos, como implantar o Zammad via containers (Docker ou
Kubernetes) ou em nós de cluster separados, um serviço
[Memcached](https://memcached.org/){target=_blank} é necessário para
armazenar o cache e disponibilizá-lo para todas as instâncias do Zammad. As
stacks do Docker e Kubernetes já incluem esse serviço.

No entanto, mesmo instalações em sistema de arquivos local podem se
beneficiar das melhorias de desempenho do Memcached. Talvez você queira dar
uma olhada na nossa seção de [ajuste de
desempenho](/pt_BR/reference/environment-variables#performance-tuning)
também.

A instalação e configuração estão fora do escopo desta documentação. Caso
você precise instalar o Memcached manualmente, siga a [documentação oficial
do Memcached](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="optional"/>

Se você quiser usar a integração PGP para enviar e receber emails assinados
e criptografados, precisa instalar a ferramenta GnuPG. Dê uma olhada no
[site oficial do GnuPG](https://www.gnupg.org/index.html){target=_blank}.
