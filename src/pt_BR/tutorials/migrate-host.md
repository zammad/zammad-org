---
order: 9
title: 'Migrar o Zammad para um novo host'
---

# Migrar o Zammad para um novo host

Esta é apenas uma descrição das etapas básicas para realizar uma migração
para um novo host. Seu ambiente pode ser diferente, então você deve
considerar isso apenas como um ponto de referência. Se algo der errado,
consulte a [Comunidade
Zammad](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank},
ou considere [opções de suporte
pago](https://zammad.com/en/services/professional-services){target=_blank}.

As etapas descritas nesta página são um complemento ao [guia de backup e
restauração](/pt_BR/tutorials/backup-restore). Elas não pretendem ser
autossuficientes - vamos vincular e observar isso nas partes relevantes.

::: tip
Migrando do Zammad SaaS? Vá direto para o
[Passo 7](#step-7-transfer-your-backup-files). Para a restauração, você recebeu
um dump de anexos!
:::

## Passo 1: anote seus ajustes ambientais

Se você definiu quaisquer variáveis de ambiente ou similares, certifique-se
de fazer backup delas.

## Passo 2: instalar o Zammad no host de destino

Para o caminho de restauração mais fácil possível, instale a mesma versão da
sua instância de origem. Você também pode considerar atualizar a instância
antiga antes de migrar. O guia a seguir assume que você tem a mesma versão
do Zammad no seu host antigo e novo.

## Passo 3: ativar o modo de manutenção

Isso encerra todas as sessões de agentes e clientes. Ative-o na interface de administração do Zammad,
em _System > Maintenance_.

## Passo 4: desativar seus canais de comunicação

O script de restauração inicia o Zammad automaticamente; isso pode ajudar a
evitar perda de dados e inconsistências.

## Passo 5: parar e desativar o Zammad

Certifique-se de que nenhum dado será alterado _antes_ do backup.

```sh
sudo systemctl disable zammad
```

```sh
sudo systemctl stop zammad
```

## Passo 6: backup

Siga o [guia de backup](/pt_BR/tutorials/backup-restore#) para criar seu
backup.

Lembre-se se você criou um dump completo do sistema de arquivos ou apenas
fez backup dos seus dados. Isso será importante para a restauração.

Se você quiser seguir pelo caminho mais fácil, considere fazer o dump apenas
dos seus dados.

## Passo 7: transferir seus arquivos de backup

Salve seus arquivos de backup em um diretório e forneça o caminho para o
arquivo `config`. Em [configuração de
backup](/pt_BR/tutorials/backup-restore#backup-configuration) você encontra
como ajustar o arquivo de configuração às suas necessidades.

## Passo 8: restaurar seu backup

Siga o [guia de
restauração](/pt_BR/tutorials/backup-restore#restore-backups) até e
incluindo "Executar a restauração", para restaurar o backup no novo host.

Certifique-se de parar o Zammad depois que a restauração terminar.

## Passo 9: executar tarefas de manutenção necessárias após a restauração

Após a restauração bem-sucedida, continue abaixo dependendo se você fez
backup apenas dos seus dados ou tem um dump completo do sistema de arquivos.

### Dump de dados

#### Passo 9.1: limpar o cache

```sh
zammad run rails r "Rails.cache.clear"
```

### Dump completo do sistema de arquivos

::: info
Esta etapa só é necessária se um dos seguintes pontos for atendido:

- As versões de origem e destino do Zammad não são as mesmas
- A instalação do Zammad não é uma instalação de código-fonte
- O backup do Zammad não é uma exportação da nossa configuração hospedada

Dumps completos para instalações de código-fonte não são cobertos; no entanto,
basicamente o mesmo abaixo se aplica a você: você deve garantir que os
ambientes e arquivos da aplicação sejam sobrescritos com a versão nova/
correta.

Os arquivos do Zammad são específicos de distribuição e versão!
:::

#### Passo 9.1: desinstalar e reinstalar o Zammad sem resolver dependências

::: tabs

=== Debian & Ubuntu

```sh
sudo dpkg -r --force-depends zammad
```

```sh
sudo apt install zammad
```

=== OpenSUSE

``` sh
sudo zypper remove -R zammad
```

```sh
sudo zypper install zammad
```

:::

::: tip
Você não tem certeza se o acima é realmente necessário e uma simples reinstalação seria
suficiente? Se você executar um comando de instalação dedicado para o Zammad e receber
o seguinte, você absolutamente precisa executar o acima para corrigir sua
instalação.

``` sh
root@zammad:/# apt update && apt install zammad
  Reading package lists... Done
  Building dependency tree
  Reading state information... Done
  zammad is already the newest version (x.x.x-xxxxxx.xxxxxx.xxx).
  0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

:::

#### Passo 9.2: limpar o cache

```sh
zammad run rails r "Rails.cache.clear"
```

#### Passo 9.3: garantir que o Zammad esteja em execução

``` sh
sudo systemctl status zammad
```

Se o Zammad não estiver em execução, execute:

```sh
sudo systemctl start zammad
```

::: tip
Migrou do Zammad SaaS ou está trocando de provedor?

Certifique-se de que seu canal de notificação por email e a
configuração de FQDN estejam corretos.
:::

## Passo 10: aplicar configurações ambientais ausentes

Se você definiu quaisquer configurações ambientais, reaplique-as agora. Você
as fez backup no [Passo
1](#step-1-note-down-your-environmental-adjustments).

Se ainda não fez isso, [instale o
Elasticsearch](/pt_BR/tutorials/install-elasticsearch) agora e realize as
etapas para [conectar e configurar o
Elasticsearch](/pt_BR/tutorials/connect-config-elasticsearch) após a
instalação.

## Passo 11: reativar canais e desativar o modo de manutenção

Defina os canais previamente desativados de volta como ativos, se tiver
certeza de que tudo deu certo. Neste ponto, o Zammad começará a _alterar
dados_!

Depois de verificar a funcionalidade dos seus canais, permita que seus
agentes e clientes façam login novamente, desativando o modo de manutenção.
