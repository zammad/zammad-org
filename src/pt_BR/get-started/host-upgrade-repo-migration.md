---
order: 4
title: 'Atualização de host e migração de repositório'
---

# Atualização de host e migração de repositório

<!--@include: @/en/modules/zammad-services-hint.md-->

Esta página cobre as etapas necessárias para uma atualização de host e para
mudar para os novos repositórios de pacotes do Zammad. Se você só quer
atualizar o próprio Zammad, consulte [Atualizando o Zammad](update). Para
apenas mudar para os novos repositórios sem uma atualização de host, pule as
etapas de atualização de host.

A partir do Zammad 7, os pacotes estão sendo construídos usando uma nova
cadeia de ferramentas e hospedados em outra URL. Os pacotes também continuam
sendo construídos pela cadeia de ferramentas antiga (exceto para Debian 13)
por algum tempo, mas recomendamos que você mude para os novos repositórios
em tempo hábil. Isso significa que você precisa adicionar uma nova chave de
repositório e alterar a configuração do seu repositório.

::: warning
Sempre se certifique de ter um [backup](/pt_BR/tutorials/backup-restore) dos seus dados antes de realizar uma atualização.
:::

Os seguintes sistemas operacionais são suportados:

| Distribution         | Version              |
| -------------------- | :------------------- |
| CentOS/RHEL          | 9, 10                |
| Debian               | 11, 12 & 13          |
| OpenSUSE Leap / SLES | 15 & 16              |
| Ubuntu               | 22.04, 24.04 & 26.04 |

## Parar o Zammad

```sh
sudo systemctl stop zammad
```

## Etapas de atualização de host

### Desativar atualizações para o Zammad

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

### Realizar a atualização de host

Realize a atualização de host de acordo com a documentação do seu sistema
operacional. Como esta é uma tarefa avançada, não fornecemos etapas
detalhadas aqui. Depois de atualizar seu sistema operacional, prossiga com
as próximas etapas.

### Reiniciar o host

Caso você não tenha reiniciado seu sistema após a atualização, certifique-se
de reiniciá-lo agora. Depois, verifique se tudo está funcionando como
esperado. Caso o Zammad inicie automaticamente, pare-o novamente antes de
prosseguir com as próximas etapas.

## Ajustar o repositório de pacotes

### Remover repositório antigo

Remova o arquivo de configuração do repositório antigo ou desative/exclua o
repositório antigo no seu gerenciador de pacotes.

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

### Remover chave de repositório antiga

Remova a chave de repositório antiga do seu sistema. Dependendo do seu
sistema operacional e versão, o local ou método é diferente.

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

Liste as chaves do seu sistema:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Exclua a(s) chave(s) relacionada(s) ao Zammad (e somente essas!), substituindo `<key-name>` pelo ID real da chave:

```sh
sudo rpm -e <key-name>
```

=== CentOS/RHEL

Liste as chaves do seu sistema:

```sh
rpm -q gpg-pubkey --qf '%{name}-%{version}-%{release} --> %{summary}\n'
```

Exclua a(s) chave(s) relacionada(s) ao Zammad (e somente essas!), substituindo `<key-name>` pelo ID real da chave:

```sh
sudo rpm -e <key-name>
```

:::

### Adicionar novo repositório

Se a chave de repositório for diferente para a versão antiga e nova, ou se
sua distribuição espera que ela esteja em outro local, adicione a nova. Caso
contrário, você pode adicionar a nova configuração de repositório
diretamente.

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

:::

### Atualizar o Zammad

::: tip
Se houver uma nova versão do Zammad disponível e você quiser atualizá-la, verifique as
[notas de lançamento](https://zammad.com/en/product/releases){target=_blank} para quaisquer etapas adicionais necessárias.
:::

Reative as atualizações do Zammad e atualize-o para a versão mais recente
disponível para o seu sistema operacional.

::: tabs key:distros

=== Ubuntu

Atualizar índice de pacotes:

```sh
sudo apt update
```

Reativar atualizações para o Zammad:

```sh
sudo apt-mark unhold zammad
```

Atualizar o Zammad:

```sh
sudo apt upgrade zammad
```

=== Debian

Atualizar índice de pacotes:

```sh
sudo apt update
```

Reativar atualizações para o Zammad:

```sh
sudo apt-mark unhold zammad
```

Atualizar o Zammad:

```sh
sudo apt upgrade zammad
```

=== OpenSUSE/SLES

Atualizar índice de pacotes:

```sh
sudo zypper refresh
```

Reativar atualizações para o Zammad:

```sh
sudo zypper removelock zammad
```

Atualizar o Zammad:

```sh
sudo zypper update zammad
```

=== CentOS/RHEL

```sh
sudo dnf upgrade zammad
```

:::

### Iniciar o Zammad

```sh
sudo systemctl start zammad
```
