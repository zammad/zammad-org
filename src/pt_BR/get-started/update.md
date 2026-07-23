---
order: 3
title: Atualização
---

# Atualizando o Zammad

<!--@include: @/en/modules/zammad-services-hint.md-->

Antes de atualizar o Zammad, recomendamos fortemente dar uma olhada nas
nossas [notas de
lançamento](https://zammad.com/en/releases){target=_blank}. Você pode
encontrar informações sobre recursos e correções, assim como observações
técnicas e alterações que quebram compatibilidade.

Esteja ciente de que você não deve pular versões principais do Zammad ao
atualizar. Isso significa que, por exemplo, seu caminho de atualização da
versão `2.4` para `5.1` (assumindo que essa é a atual estável) seria: `2.4`
→ `3.0` → `4.0` → `5.0` → `latest stable (5.1)`

::: info
Esta página descreve apenas como atualizar o Zammad. Caso você também queira atualizar seu sistema operacional hospedeiro, dê uma olhada
nas instruções de [Atualização de host e migração de repositório](host-upgrade-repo-migration).
:::

## Atualização via instalação por pacote

### Verificar dependências

Antes de prosseguir, verifique novamente se o ambiente do seu sistema
corresponde aos requisitos do Zammad (veja
[Pré-requisitos](installation/prerequisites) e [Instalação via
pacote](installation/package)).

### Parar o Zammad

```sh
sudo systemctl stop zammad
```

### Fazer backup do Zammad

Crie um backup. Você pode usar o [script de
backup](/pt_BR/tutorials/backup-restore) que vem com o pacote do Zammad.

### Atualizar o Zammad

::: info
Se você atualizar todo o seu sistema e houver atualizações tanto para o Zammad **quanto** para o seu
servidor de banco de dados, isso pode levar a erros, porque seu banco de dados pode não estar
de volta online quando o Zammad for atualizado.

Nesse caso, você pode querer excluir o Zammad da atualização temporariamente,
como você pode ver nos comandos abaixo.
:::

::: tabs key:distros

=== Ubuntu
Atualizar listas de pacotes:

```sh
sudo apt update
```

Desativar atualizações para o Zammad:

```sh
sudo apt-mark hold zammad
```

Atualizar todos os pacotes exceto o Zammad:

```sh
sudo apt upgrade
```

Reativar atualizações para o Zammad:

```sh
sudo apt-mark unhold zammad
```

Atualizar o Zammad:

```sh
sudo apt upgrade
```

=== Debian
Atualizar listas de pacotes:

```sh
sudo apt update
```

Desativar atualizações para o Zammad:

```sh
sudo apt-mark hold zammad
```

Atualizar todos os pacotes exceto o Zammad:

```sh
sudo apt upgrade
```

Reativar atualizações para o Zammad:

```sh
sudo apt-mark unhold zammad
```

Atualizar o Zammad:

```sh
sudo apt upgrade
```

=== OpenSUSE/SLES

Atualizar listas de pacotes:

```sh
sudo zypper refresh
```

Desativar atualizações para o Zammad:

```sh
sudo zypper addlock zammad
```

Atualizar todos os pacotes exceto o Zammad:

```sh
sudo zypper update
```

Reativar atualizações para o Zammad:

```sh
sudo zypper removelock zammad
```

Atualizar o Zammad:

```sh
sudo zypper update
```

=== CentOS/RHEL

Atualizar todos os pacotes exceto o Zammad:

```sh
sudo dnf upgrade --exclude zammad
```

Atualizar o Zammad:

```sh
sudo dnf upgrade
```

:::

### Etapas adicionais

Atualizar o Elasticsearch também pode ser relevante. Certifique-se de ter
uma versão suportada do Elasticsearch instalada (veja [instalação via
pacote](/pt_BR/get-started/installation/package#elasticsearch) para versões
suportadas).

Se você precisar atualizar o Elasticsearch, dê uma olhada na [documentação
deles](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html){target=_blank}
e siga as instruções.

### Reconstruir o índice do Elasticsearch <Badge type="tip" text="optional" />

Necessário apenas se a nota de lançamento pedir para reconstruir o índice do
Elasticsearch.

Sem especificar núcleos de CPU a usar:

```sh
zammad run rake zammad:searchindex:rebuild
```

Especificando núcleos de CPU a usar (exemplo 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

### Iniciar o Zammad

```sh
sudo systemctl start zammad
```

## Atualizando instalação via Docker

::: warning
Atualizações da stack do Docker Compose podem exigir etapas extras ou introduzir alterações que quebram
compatibilidade. Sempre verifique primeiro as [notas de lançamento do Docker Compose](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}
para instruções de atualização.
:::

::: tip
Se você quiser atualizar o Zammad para uma versão específica, use a variável de ambiente `VERSION`
([exemplo](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
com explicação adicional) e especifique o número da versão.
:::

### Atualizando instalações baseadas no Portainer

Na sua stack do Zammad, clique em `Pull and redeploy`, ative **Re-pull image
and redeploy** e clique em `Update`.

![Atualização de stack destacada no
Portainer](/screenshots/get-started/installation/portainer-stack-update.png)

### Atualizando instalações baseadas em Docker Compose

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

### Reconstruir o índice do Elasticsearch <Badge type="tip" text="optional" />

Necessário apenas se a nota de lançamento pedir para reconstruir o índice do Elasticsearch.
<!--referenced in tutorials/backup-restore-docker.md {243,276}. If content moves, adjust line numbers over there-->
::: tabs

=== Docker Compose

Sem especificar núcleos de CPU:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

Especificando núcleos de CPU a usar (exemplo 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Portainer GUI

Abra o [console via interface gráfica do Portainer](/pt_BR/get-started/installation/docker#how-to-run-commands-in-the-stack) com o
ponto de entrada padrão `/bin/bash` e execute:

Sem especificar núcleos de CPU a usar:

```sh
bundle exec rake zammad:searchindex:rebuild
```

Especificando núcleos de CPU a usar (exemplo 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
