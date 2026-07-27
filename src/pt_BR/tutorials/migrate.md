---
order: 10
title: 'Migrar para o Zammad'
---

# Migrar para o Zammad

Você pode migrar os seguintes dados de outro sistema de tickets para o
Zammad:

- Tickets e seus artigos
- Grupos/filas
- Organizações
- Agentes e clientes (se aplicável)

Após migrar para o Zammad, você deve primeiro ajustar suas configurações de FQDN e tipo
HTTP na interface de administração do Zammad, em _Settings > System > Base_.
Isso é importante porque o assistente de primeiros passos é pulado pela
migração.

Depois disso, você pode querer continuar com os [Primeiros
Passos](/pt_BR/tutorials/first-steps) para configurar o Zammad. Isso deve
ser feito após a migração.

## General limitations

Há algumas limitações gerais que você pode encontrar abaixo. Também pode
haver limitações dependendo de qual sistema você está vindo. Elas são
cobertas nas seções específicas.

Limitações gerais para todas as migrações:

- Migrações só são possíveis em instâncias novas.
- Migrações só são possíveis a partir de uma única origem. Várias origens de
  migração em uma instância não são suportadas.
- O Zammad não consegue migrar tipos de objeto que não conhece; as migrações
  falharão.
- O Zammad migra tudo ou nada. Isso significa que você não pode deixar de
  selecionar informações específicas, como grupos, tickets ou usuários
  específicos.

## Specific migration guides

::: info

**Falta uma origem de migração?**

Se seu sistema ainda não foi mencionado, você tem duas opções. Você pode
usar a poderosa API do Zammad, ou mandar uma
[mensagem para nossa equipe de vendas](https://zammad.com/en/company/contact){target=_blank} para um desenvolvimento
personalizado ou até patrocínio de migrador.

Migrações também estão disponíveis para configurações hospedadas! Entre em contato com o suporte para mais
informações!
:::

### Freshdesk

#### Limitações

Observe as limitações específicas do Freshdesk abaixo. Estas são limitações
adicionais às gerais listadas.

- Migrações diferenciais não são suportadas! A sugestão geral é executar uma
  importação de teste antes, para saber quanto tempo a migração levará.
- Importante: observe que a velocidade da migração depende muito do seu
  plano do Freshdesk (limites de taxa da API se aplicam).
- Devido a limitações da API, o Zammad não mostrará o número total de
  objetos a importar, mas os corrigirá em etapas de 100.
- Seu plano do Freshdesk precisa oferecer suporte a API. Isso pode não se
  aplicar a todos os planos disponíveis.
- As senhas de usuário não são migradas e exigirão que o usuário use o link
  de redefinição de senha na tela de login do Zammad.

#### Pré-requisitos

O Zammad requer acesso à API, por isso você precisará [criar uma chave de
API](https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key){target=_blank}
para a migração. O migrador solicitará seu subdomínio do Freshdesk e a chave
de API.

::: warning
Certifique-se de obter a chave de API com uma conta de administrador completo. Usuários
menos privilegiados resultarão em uma migração quebrada.
:::

#### Importar

Em geral, você tem duas opções de como migrar dados. Se você tem uma
instância bastante grande com muitos dados, pode considerar usar o console
em vez da versão do navegador.

:::: tabs

=== Via Browser

Depois de instalar o Zammad e
[configurar seu servidor web](./webserver-config), navegue até o FQDN do seu
Zammad no navegador e siga o assistente de migração. Você o encontra na
tela de login clicando no link "Or migrate from another system"
na parte inferior.

Dependendo do número de usuários, tickets e do plano do Freshdesk, isso pode levar um
tempo.

Vendo a mensagem "_Interrupted by scheduler restart. Please restart manually
or wait till next execution time._"?
Se essa mensagem aparecer depois de fornecer suas credenciais, seja paciente.
A migração deve começar em 5 minutos.

Se você receber a mensagem acima depois que a migração começar, considere usar
a abordagem via console em vez disso, e redefina a instalação.

=== Via Console

Abra o console:

```sh
zammad run rails c
```

Defina as variáveis, substituindo os valores em `{}` pelos seus próprios:

```ruby
subdomain = '{freshdesk subdomain}.freshdesk.com'
```

```ruby
token = '{freshdesk token}'
```

Atualize as configurações do Zammad para importação do Freshdesk:

```ruby
Setting.set('import_freshdesk_endpoint', "https://#{subdomain}/api/v2")
```

```ruby
Setting.set('import_freshdesk_endpoint_key', token)
```

```ruby
Setting.set('import_backend', 'freshdesk')
```

```ruby
Setting.set('import_mode', true)
```

Verifique sua configuração em um teste seco (dry run):

```ruby
Sequencer.process('Import::Freshdesk::ConnectionTest')
```

Execute a migração:

```ruby
job = ImportJob.create(name: 'Import::Freshdesk')
```

```ruby
AsyncImportJob.perform_later(job)
```

::: tip

Quer ver o progresso da migração?

Use

```ruby
pp ImportJob.find_by(name: 'Import::Freshdesk')
```

o que lhe dá uma saída do estado atual da tarefa.

:::
::::

#### After migration

Execute os seguintes comandos:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

Faça login com o usuário cujo token de API você forneceu. Use o endereço de
email do administrador e o token de API fornecidos durante a migração para
fazer login.

Todos os outros usuários terão que usar a função de redefinição de senha, ou
métodos de login como LDAP ou logins de um clique.

### Kayako

Observe as limitações específicas do Freshdesk abaixo. Estas são limitações
adicionais às gerais listadas.

- Migrações diferenciais não são suportadas! A sugestão geral é executar uma
  importação de teste antes, para saber quanto tempo a migração levará.
- Instalações auto-hospedadas (Kayako classic) não são suportadas.
- As seguintes personalizações de campo de ticket são ignoradas (afeta o
  plano "Scale"):
  - Estados de ticket personalizados
  - Prioridades de ticket personalizadas
  - Tipos de ticket personalizados
- Importante: observe que a velocidade da migração depende muito do seu
  plano do Kayako (limites de taxa da API se aplicam).
- Seu plano do Kayako precisa oferecer suporte a API. Isso pode não se
  aplicar a todos os planos disponíveis.
- As senhas de usuário não são migradas e exigirão que o usuário use o link
  de redefinição de senha na tela de login do Zammad.

#### Pré-requisitos

O Zammad requer acesso à API, por isso o migrador solicitará a URL do seu
Kayako, endereço de email e senha.

::: warning
Certifique-se de fornecer uma conta de usuário com permissões administrativas completas. Usuários
menos privilegiados resultarão em uma migração quebrada.
:::

#### Importar

Em geral, você tem duas opções de como migrar dados. Se você tem uma
instância bastante grande com muitos dados, pode considerar usar o console
em vez da versão do navegador.

:::: tabs

=== Via Browser

Depois de instalar o Zammad e
[configurar seu servidor web](/pt_BR/tutorials/webserver-config), navegue até o FQDN do seu
Zammad no navegador e siga o assistente de migração. Você o encontra na
tela de login clicando no link "Or migrate from another system"
na parte inferior.

Dependendo do número de usuários, tickets e do plano do Kayako, isso pode levar um tempo.

Vendo a mensagem "_Interrupted by scheduler restart. Please restart manually
or wait till next execution time._"?

Se essa mensagem aparecer depois de fornecer suas credenciais, seja paciente.
A migração deve começar em 5 minutos.

Se você receber a mensagem acima depois que a migração começar, considere
usar a abordagem via console em vez disso, e redefina a instalação.

=== Via Console

Abra o console:

```sh
zammad run rails c
```

Defina as variáveis, substituindo os valores em `{}` pelos seus próprios:

```ruby
subdomain = '{kayako subdomain}.kayako.com'
```

```ruby
email = '{kayako admin email address}'
```

```ruby
password = '{kayako admin password}'
```

Atualize as configurações do Zammad para importação do Kayako:

```ruby
Setting.set('import_kayako_endpoint', "https://#{subdomain}/api/v1")
```

```sh
Setting.set('import_kayako_endpoint_username', email)
```

```ruby
Setting.set('import_kayako_endpoint_password', password)
```

```ruby
Setting.set('import_backend', 'kayako')
```

```ruby
Setting.set('import_mode', true)
```

Verifique sua configuração em um teste seco (dry run):

```ruby
Sequencer.process('Import::Kayako::ConnectionTest')
```

Execute a migração:

```ruby
job = ImportJob.create(name: 'Import::Kayako')
```

```ruby
AsyncImportJob.perform_later(job)
```

::: tip

Quer ver o progresso da migração?

Use

```ruby
pp ImportJob.find_by(name: 'Import::Kayako')
```

o que lhe dá uma saída do estado atual da tarefa.

:::
::::

#### After migration

Execute os seguintes comandos:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

Faça login com o usuário cujas credenciais de login você forneceu. Use o
endereço de email do administrador e a senha fornecidos durante a migração
para fazer login.

Todos os outros usuários terão que usar a função de redefinição de senha, ou
métodos de login como LDAP ou logins de um clique.

### OTRS

#### Limitações

Limitações adicionais às gerais:

- As versões do OTRS suportadas são: 3.1 - 6.x
- A migração de senha funciona apenas para OTRS >= 3.3 (em instâncias mais
  antigas, será necessária uma redefinição de senha no Zammad)
- Se você planeja importar uma migração diferencial após a principal, não
  altere nenhum dado no Zammad!
- Apenas clientes de tickets são importados
- O Zammad espera que os carimbos de data/hora do seu OTRS sejam UTC e não
  os ajustará

#### Pré-requisitos

**Instale o repositório Znuny4OTRS que corresponde à sua versão do OTRS (dependência do plugin de migração do OTRS):**

- [OTRS
  6](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-6.0.76.opm){target=_blank}
- [OTRS
  5](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-5.0.56.opm){target=_blank}
- [OTRS
  4](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-4.0.25.opm){target=_blank}
- [OTRS
  3](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-Repo-3.3.2.opm){target=_blank}

**Instale o plugin de migração do OTRS que corresponde à sua versão do OTRS:**

- [OTRS
  6](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-6.0.7.opm){target=_blank}
- [OTRS
  5](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-5.0.4.opm){target=_blank}
- [OTRS
  4](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-4.1.12.opm){target=_blank}
- [OTRS
  3](https://ftp.zammad.com/otrs-migrator-plugins/Znuny4OTRS-ZammadMigrator-3.0.33.opm){target=_blank}

::: tip
Em alguns casos, reiniciar seu servidor web pode ajudar a resolver erros internos do
servidor.
:::

### Timeout adjustments

Se sua importação sofrer timeout, ou você já sabe que isso pode ser um
problema, você pode ajustar os timeouts via variáveis de ambiente. Para
isso, defina as variáveis de ambiente `ZAMMAD_OTRS_IMPORT_READ_TIMEOUT` e
`ZAMMAD_OTRS_IMPORT_TOTAL_TIMEOUT` com um timeout maior em segundos. Se não
definidas, os padrões se aplicam:

|                                    | Zammad < 7.0 | Zammad ≥ 7.0  |
|------------------------------------|--------------|---------------|
| `ZAMMAD_OTRS_IMPORT_READ_TIMEOUT`  | 120          | 600           |
| `ZAMMAD_OTRS_IMPORT_TOTAL_TIMEOUT` | 360          | 1200          |

#### Importar

::: tabs

=== Via Browser

Depois de instalar o Zammad e
[configurar seu servidor web](/pt_BR/tutorials/webserver-config), navegue até o FQDN do seu
Zammad no navegador e siga o assistente de migração. Você o encontra na
tela de login clicando no link "Or migrate from another system"
na parte inferior.

Dependendo do tamanho da sua instalação do OTRS, isso pode levar um tempo. Nesse
caso, considere usar a versão de linha de comando deste recurso. Isso também
se aplica se você enfrentar timeouts durante a migração.

=== Via Console

Abra o console:

```ruby
zammad run rails c
```

Defina as variáveis, substituindo os valores em `{}` pelos seus próprios:

```ruby
Setting.set('import_otrs_endpoint', 'https://{domain}/otrs/public.pl?Action=ZammadMigrator')
```

```ruby
Setting.set('import_otrs_endpoint_key', '{xxx}')
```

```ruby
Setting.set('import_mode', true)
```

Execute uma migração completa:

```ruby
Import::OTRS.start
```

Execute uma migração diferencial (só possível após concluir uma migração
completa anterior):

Todas as etapas de "Set variables" +

```ruby
Setting.set('system_init_done', false)
```

```ruby
Import::OTRS.diff_worker
```

:::

#### After migration

Execute os seguintes comandos:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

### Zendesk

#### Limitações

Limitações adicionais às gerais:

- Migrações diferenciais não são suportadas! A sugestão geral é executar uma
  importação de teste antes, para saber quanto tempo a migração levará.
- Importante: observe que a velocidade da migração depende muito do seu
  plano do Zendesk (limites de taxa da API se aplicam).
- Seu plano do Zendesk precisa oferecer suporte a API. Isso pode não se
  aplicar a todos os planos disponíveis.
- As senhas de usuário não são migradas e exigirão que o usuário use o link
  de redefinição de senha na tela de login.
- Objetos com strings em cirílico não podem ser migrados. Certifique-se de
  renomeá-los antes de iniciar a migração.

#### Pré-requisitos

O Zammad requer acesso à API, por isso você precisará [criar uma chave de
API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Generating-a-new-API-token){target=_blank}
para a migração. O migrador solicitará a URL do seu Zendesk, endereço de
email e chave de API.

::: warning
Certifique-se de obter a chave de API com uma conta de administrador completo. Usuários
menos privilegiados resultarão em uma migração quebrada.
:::

#### Importar

Em geral, você tem duas opções de como migrar dados. Se você tem uma
instância bastante grande com muitos dados, pode considerar usar o console
em vez da versão do navegador.

:::: tabs

=== Via Browser

Depois de instalar o Zammad e
[configurar seu servidor web](/pt_BR/tutorials/webserver-config), navegue até o FQDN do seu
Zammad no navegador e siga o assistente de migração. Você o encontra na
tela de login clicando no link "Or migrate from another system"
na parte inferior.

Dependendo do número de usuários, tickets e do plano do Zendesk, isso pode levar um
tempo.

=== Via Console

Abra o console:

```sh
zammad run rails c
```

Defina as variáveis, substituindo os valores em `{}` pelos seus próprios:

```ruby
subdomain = '{zendesk url}'
```

```ruby
email = '{zendesk admin email address}'
```

```ruby
token = '{zendesk token}'

```

Atualize as configurações do Zammad:

```ruby
Setting.set('import_zendesk_endpoint', "https://#{subdomain}/api/v2")
```

```ruby
Setting.set('import_zendesk_endpoint_username', email)
```

```ruby
Setting.set('import_zendesk_endpoint_key', token)
```

```ruby
Setting.set('import_backend', 'zendesk')
```

```ruby
Setting.set('import_mode', true)
```

Verifique sua configuração em um teste seco (dry run):

```ruby
Sequencer.process('Import::Zendesk::ConnectionTest')
```

Execute a migração:

```ruby
job = ImportJob.create(name: 'Import::Zendesk')
```

```ruby
AsyncImportJob.perform_later(job)
```

::: tip

Quer ver o progresso da migração?

Use

```ruby
pp ImportJob.find_by(name: 'Import::Freshdesk')
```

o que lhe dá uma saída do estado atual da tarefa.

:::

::::

#### After migration

Execute os seguintes comandos:

```ruby
Setting.set('import_mode', false)
```

```ruby
Setting.set('system_init_done', true)
```

```ruby
Rails.cache.clear
```

Faça login com o usuário cujo token de API você forneceu. Use o endereço de
email do administrador e o token de API fornecidos durante a migração para
fazer login.

Todos os outros usuários terão que usar a função de redefinição de senha, ou
métodos de login como LDAP ou logins de um clique.
