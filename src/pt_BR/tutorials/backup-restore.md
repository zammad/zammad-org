---
order: 7
title: 'Backup e restauração (Pacote)'
---

# Backup e restauração (Pacote)

O Zammad vem com scripts em instalações via pacote para backup e
restauração, que você pode usar.

::: warning
Esses scripts não vêm com nenhuma garantia e podem não funcionar no seu caso de uso
específico. Isso depende da configuração e do tipo de instalação da sua
instância.

Você deve sempre testar e revisar a funcionalidade regularmente! Se a funcionalidade ou
escopo do script não funcionar para seus casos, sinta-se à vontade para copiá-los
para um local independente e ajustar os scripts conforme necessário.
:::

Há algumas limitações que você deve conhecer:

- Esses scripts não funcionarão em instalações baseadas em container.
- Eles só funcionam para instalações PostgreSQL.
- O backup é sempre um dump completo (sem backup incremental).
- Backup e restauração parciais (por exemplo, apenas dados específicos, como
  tickets, usuários) não são possíveis.
- Trocar o sistema de banco de dados não é possível.
- Configurações do sistema (como variáveis de ambiente) não são incluídas no
  backup.
- Restaurar para uma versão mais antiga do Zammad não é possível.
- Não restaure arquivos de backup de scripts personalizados com os scripts
  fornecidos pelo Zammad. Isso pode causar problemas.

## Fundamentos

Os scripts estão localizados em `/opt/zammad/contrib/backup`. Os seguintes
arquivos são relevantes:

- Arquivo de configuração de backup: `config.dist`
- Script para fazer backup dos seus dados: `zammad_backup.sh`
- Script para restaurar seus dados: `zammad_restore.sh`

Para executar um backup baseado na configuração padrão, siga as etapas
abaixo:

1. Copie o arquivo `config.dist` para `config`.
1. Altere os parâmetros padrão no arquivo de configuração, se
   necessário. Veja [Configuração de backup](#backup-configuration) para
   detalhes.
1. Pare o Zammad `systemctl stop zammad`
1. Execute `/opt/zammad/contrib/backup/zammad_backup.sh` (como usuário
   `root` ou `zammad`)

## Configuração de backup

Você pode encontrar abaixo detalhes sobre os parâmetros de configuração com
valores padrão.

`BACKUP_DIR` <Badge type="info" text="/var/tmp/zammad_backup"/>
: local onde o script grava os arquivos de backup. O diretório será
  criado se não existir. Certifique-se de ter espaço suficiente, pois o
  script grava dumps completos.

`HOLD_DAYS` <Badge type="info" text="10"/>
: define quantos dias o script de backup deve manter backups antigos. Esse valor
  contém um período de tolerância de 60 minutos (por exemplo, 10 dias mais 1 hora) por motivos
  de segurança. Backups antigos são removidos antes de criar um novo backup.

  Exemplos:
    - `1` manterá backups das últimas 25 horas
    - `-1` removerá todos os backups disponíveis (exceto o novo)

`FULL_FS_DUMP` <Badge type="info" text="yes"/>
:   - `yes`: o backup inclui também arquivos da aplicação.
    - `no`: o backup inclui apenas dados do usuário.

  Em qualquer caso, ele inclui o banco de dados do Zammad e os anexos, se você os
  armazenou no sistema de arquivos. Em caso de dúvida, defina isso como no.

`DEBUG` <Badge type="info" text="no"/>
: definir essa opção como `yes` exibirá mensagens de depuração úteis.
  ::: warning
  Esta opção pode retornar informações sensíveis na saída padrão! Não
  use essa opção em ambientes de produção, ou certifique-se de desativá-la após
  os testes.
  :::

## Restaurar backups

### Informações importantes

Leia as informações a seguir com atenção antes de começar a restaurar seus
dados.

- Esta seção **não** é sobre **migrar de um host para outro**. Você pode
  encontrar instruções sobre esse tópico na página [Migrar o
  Zammad](migrate-host).
- Este guia espera uma versão do Zammad totalmente instalada
- Ele também espera que você restaure o Zammad no mesmo host e versão do
  Zammad
- O processo de restauração para e reinicia o Zammad. Portanto, você precisa
  executar o script de restauração com as permissões apropriadas (por
  exemplo, como root).
- Instalações baseadas em PostgreSQL vão descartar e recriar o banco de
  dados!
- É necessário pelo menos o dobro do tamanho da instância do Zammad de
  backup em espaço de armazenamento livre. Se você tiver apenas o dump, o
  fator 3 pode ser um bom número.

::: tip
Se o seu cenário for diferente do descrito acima, consulte a
[Comunidade Zammad](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank}
ou considere
[opções de suporte pago](https://zammad.com/en/services/professional-services){target=_blank}.
:::

### Copiar arquivos de backup para um local adequado

Certifique-se de que o usuário que você está usando para a restauração tem
permissão para ler os arquivos de backup e para gravar em `/opt/zammad/`.

O backup do Zammad consiste em dois arquivos. Eles são nomeados assim:

```plain
<timestamp>_zammad_db.psql.gz
<timestamp>_zammad_files.tar.gz
```

Há também dois links simbólicos no seu diretório de backup, apontando para o
backup mais recente criado:

```plain
latest_zammad_db.psql.gz
latest_zammad_files.tar.gz
```

Copie-os para um local adequado, acessível ao usuário que executa o script
de restauração.

### Configurar o script de backup

Para uma nova instalação, isso é necessário. Pelo menos você precisa
fornecer um diretório onde seus backups são armazenados. Veja [Configuração
de backup](#backup-configuration) para mais informações.

### Limpar a pasta de armazenamento

Caso você esteja restaurando para um ambiente de produção com armazenamento
em sistema de arquivos ativado, você deve limpar o conteúdo do diretório
`/opt/zammad/storage/` dentro do volume. O processo de restauração só
adiciona/sobrescreve arquivos lá; nenhuma limpeza acontecerá.

### Executar a restauração

Esteja ciente de que restaurar backups pode sobrescrever seu `database.yml`. Você pode
verificar isso olhando dentro do arquivo `[...]_zammad_files.tar.gz`. Se
houver um `database.yml` no diretório _config > database_, certifique-se de salvar a
versão original **antes de restaurar**.

A restauração funciona de duas formas possíveis, dependendo de quão
interativo você quer que seja:

:::: tabs

=== Interactive restore (recommended)
Execute o script:

```sh
/opt/zammad/contrib/backup/zammad_restore.sh
```

Forneça as informações solicitadas ao script e aguarde o processo de restauração
terminar. Dependendo do tamanho do seu backup e do desempenho do host,
isso pode levar algum tempo.

=== Non-interactive restore

::: warning
Use a opção a seguir apenas se souber o que está fazendo! O seguinte
comando sobrescreverá dados existentes sem mais avisos!
:::
Quando chamado com um argumento de timestamp (correspondendo ao nome do arquivo dos backups),
o Zammad prosseguirá imediatamente para restaurar o backup especificado.

```sh
/opt/zammad/contrib/backup/zammad_restore.sh 20170507121848
```

::::

O resultado deve se parecer com isto:

```ansi
# Zammad restore started - Fri Jan 21 17:54:13 CET 2022!

The restore will delete your current database!
Be sure to have a backup available!

Please ensure to have twice the storage of the uncompressed backup size!

Note that the restoration USUALLY requires root permissions as services are stopped!

Enter 'yes' if you want to proceed!
Restore?: yes
Enter file date to restore:
20220120124714
20220121175344
File date: 20220121175344
Enter db date to restore:
20220120124714
20220121175344
DB date: 20220121175344
# Stopping Zammad
# Checking requirements
# ... Dropping current database zammad
Dropped database 'zammad'
# ... Creating database zammad for owner zammad
CREATE DATABASE
# Restoring PostgreSQL DB
# Restoring Files
# Ensuring correct file permissions ...
# Clearing Cache ...
# Starting Zammad

# Zammad restored successfully - Fri Jan 21 17:54:34 CET 2022!
```

### Etapas adicionais

- Se você definiu alguma configuração ambiental, reaplique-a agora.
- Se ainda não fez isso, [instale o
  Elasticsearch](/pt_BR/tutorials/install-elasticsearch) agora.
- [Conecte o Elasticsearch ao Zammad e reconstrua seu índice de
  pesquisa](/pt_BR/tutorials/connect-config-elasticsearch). A reconstrução
  pode ser executada com segurança durante o seu trabalho, mas causará um
  desempenho de pesquisa degradado e pode levar a dados temporariamente não
  encontrados.

## Solução de problemas de backup e restauração

Você pode encontrar alguns problemas comuns abaixo. Se o seu problema não
estiver listado, sinta-se à vontade para consultar a [Comunidade
Zammad](https://community.zammad.org/c/trouble-running-zammad-this-is-your-place/5){target=_blank}
para assistência técnica.

### Códigos de saída

Nossos scripts de backup e restauração vêm com códigos de saída para
ajudá-lo a encontrar uma solução. No entanto, não garantimos um tratamento
de erros completo.

Além dos códigos de saída, também há mensagens de erro retornadas para a
saída padrão.

| Code | Description / Situation                                                                                                                                                                |
|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`  | O script terminou com sucesso (ou o erro não é tratado).                                                                                                                        |
| `1`  | Este é um erro geral. Usado com mais frequência para interrupções do script devido a informações incorretas fornecidas ou informações ausentes.                                                               |
| `2`  | Houve um erro no tratamento do banco de dados. Isso geralmente acontece se o servidor de banco de dados não atender aos requisitos do script, os dados de login forem inválidos ou os dumps do banco de dados estiverem "corrompidos". |
| `3`  | Houve problemas com permissões de arquivo/pasta.                                                                                                                                      |

### Problemas comuns

#### Falha na autenticação por senha / Falha na autenticação peer

Isso indica que a senha do seu usuário do banco de dados do Zammad é
diferente da do seu `database.yml`, ou que o servidor de banco de dados
errado pode estar sendo contatado.

Se a sua instância do Zammad estiver em execução, isso pode ser causado por
um fallback para conexão via socket, motivo pelo qual você não notou.

**O que fazer?**

Certifique-se de que as credenciais de usuário fornecidas estão
corretas. Você também pode considerar usar o script `reset_db_password`, que
você encontra no diretório de backup.

#### Falha na autenticação Ident para usuário

Isso indica que seu servidor de banco de dados exige autenticação
`ident`. Esse método de autenticação não é suportado pelos nossos scripts.

**O que fazer?**

Verifique o `pg_hba.conf` do seu servidor PostgreSQL e ajuste-o se
necessário.

Geralmente, a autenticação pode ser permitida assim:

```sh
# THIS IS A SAMPLE AND MAY NOT FIT YOUR ENVIRONMENT
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

Consulte a [documentação oficial do
PostgreSQL](https://www.postgresql.org/docs/){target=_blank} para isso, pois
isso está fora do escopo da nossa documentação.

#### AVISO: Você não parece ter nenhum anexo no sistema de arquivos

Isso indica que sua instância atualmente não salva anexos no sistema de
arquivos.

Este aviso será mostrado uma vez antes de criar um diretório vazio, para
permitir que o processo de backup continue com sucesso.

Verifique e ajuste suas
[configurações de armazenamento via console](/pt_BR/reference/rails-commands#storage-provider-setting)
ou na interface de administração do Zammad em _Settings > System > Storage_.

## Script auxiliar

### Aviso

Um script pode potencialmente ser destrutivo! Você **nunca** deve executar
scripts cujos escopos você não entende.

Esteja ciente de que você está executando esses scripts por sua própria
conta e risco.

### Auxiliar de banco de dados: (re)definir senha

#### Limitações

- Este script funciona apenas para instalações PostgreSQL.
- Apenas servidores de banco de dados locais são suportados (o script altera
  o usuário).
- Este script precisa ser executado como `root` ou usuário privilegiado
  similar.
- Esteja ciente de que o script irá parar e iniciar o Zammad
  automaticamente!

#### Scopes

O escopo deste script é principalmente instalações via pacote, e
especialmente sistemas operacionais CentOS e SUSE. Ele pode funcionar em
instalações de código-fonte/desenvolvimento também, mas isso depende muito
da sua configuração e está fora do escopo.

#### Funcionalidade

O script realizará as seguintes ações automaticamente para você, dependendo
da situação. Ele pedirá sua confirmação antes de realizar ações.

- Se `database.yml` contiver uma linha de senha vazia, uma nova senha será
  gerada e definida para o usuário do banco de dados do Zammad. Ela também
  será salva no arquivo de configuração.
- Se `database.yml` contiver uma senha, ela será usada para definir a senha
  do usuário do banco de dados do Zammad.

#### Uso

Execute o script com o comando abaixo e siga as instruções. Nenhuma
configuração específica é necessária.

```sh
/opt/zammad/contrib/backup/zammad_db_user_helper.sh
```

Se ocorrerem erros, o script tentará colocar o Zammad de volta online antes
de sair.
