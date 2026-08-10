---
order: 2
title: 'Comandos Rails'
---

# Comandos Rails

O Zammad usa Ruby on Rails, então você pode usar o [console
Rails](http://guides.rubyonrails.org/command_line.html){target=_blank}.

::: warning
Verifique novamente seus comandos antes de executar, pois alguns desses
comandos podem causar perda de dados ou tickets danificados! Se você não tiver certeza,
**use um sistema de teste primeiro**!
:::

## Iniciando o console Rails do Zammad

### Executar um único comando

::: info
Substitua `{COMMAND}` pelo comando que deseja executar.
:::

::: tip
Se você inserir um `p` antes do seu comando (por exemplo, como
`rails r 'p Delayed::Job.count'`), você realmente receberá uma saída
impressa (sem ele, não!).
:::

::: tabs key:installmethod

=== Docker Installation

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '{COMMAND}'
```

=== Package Installation

```sh
zammad run rails r '{COMMAND}'

```

=== Source / Development Installation

```sh
rails r '{COMMAND}'
```

:::

### Executar o console Rails interativo

::: tabs key:installmethod

=== Docker Installation

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

=== Package Installation

```sh
zammad run rails c

```

=== Source / Development Installation

```sh
rails c
```

:::

### Modo seguro do console Rails

Normalmente, iniciar o console Rails requer que certos serviços de terceiros
estejam ativos e funcionando. Você pode receber erros e o console se
recusará a iniciar caso não estejam disponíveis.

No entanto, é possível iniciar o console Rails em modo seguro definindo uma
variável de ambiente especial. Com `ZAMMAD_SAFE_MODE=1` definido, essas
verificações são ignoradas.

```sh
ZAMMAD_SAFE_MODE=1 zammad run rails c
```

## Comandos de ticket

### Obter o email bruto (RAW)

O seguinte comando ajuda a verificar arquivos EML recebidos que o Zammad
buscou. Isso é útil se você excluir emails ao buscá-los e precisar verificar
o próprio arquivo EML.

Para obter o arquivo EML do primeiro artigo, você pode usar o seguinte
comando. No nosso exemplo, o número do ticket em questão é `101234`.

```ruby
Ticket.find_by(number:'101234').articles.first.as_raw.content
```

Se necessário, você também pode obter o conteúdo bruto de artigos
posteriores (você precisará encontrar o artigo correto). Novamente,
esperamos que `101234` seja o número do nosso ticket.

Na primeira etapa, obtemos todos os IDs de artigo do ticket:

```ruby
Ticket.find_by(number:'101234').article_ids
```

Saída:

```ansi
[4, 3, 2]
```

Da lista obtida, podemos então obter o conteúdo dos artigos:

```ruby
Ticket::Article.find(3).as_raw.content
```

::: info
Se você apenas usar `Ticket::Article.find(3)`, você pode ver mais
informações (como quem enviou o email, quando o buscamos, ...).
:::

### Atualizar todos os tickets de um cliente específico

::: warning
Observe que essa ação pode ser cara em termos de recursos; se você
tem muitos tickets, isso pode deixar o Zammad lento.
:::

```ruby
Ticket.where(customer_id: 4).update_all(customer_id: 1)
```

### Obter tipos de estado de ticket

Isso mostrará todos os tipos de estado necessários para criar novos estados
de ticket:

```ruby
Ticket::StateType.pluck(:id, :name)
```

O comando acima retornará tanto o ID quanto o nome do tipo - por exemplo:

```ansi
`[[1, "new"], [2, "open"], ...`.
```

## Comandos de usuário

### Encontrar usuário

Para trabalhar com informações de usuário ou verificar informações
específicas, você precisará encontrá-lo primeiro.

ID de usuário já conhecido:

```ruby
User.find(4)
```

Procurando o usuário pelo endereço de email:

```ruby
User.find_by(email: 'your@email')
```

Procurando o usuário pelo login:

```ruby
User.find_by(login: 'john.doe')
```

### Desbloquear uma conta de usuário bloqueada

::: tip
Desbloquear uma conta de usuário bloqueada também é suportado pela interface web do Zammad!
:::

Às vezes acontece de um usuário se bloquear tentando repetidamente a
senha errada várias vezes. Dependendo do seu número máximo de tentativas de login
falhas (<span class="title-ref">padrão: 10 vezes</span>), o Zammad pode
bloquear a conta.

O usuário não consegue mais fazer login (para sempre) se não alterar a senha
ou você redefinir o contador.

```ruby
u=User.find(**USERID**)
```

```ruby
u.login_failed=0
```

```ruby
u.save!
```

Você também pode verificar novamente se a conta está bloqueada executando o
seguinte comando (o resultado precisa ser 1 acima do seu limite, então 11
para o padrão de 10 tentativas de login falhas):

```ruby
User.find(**USERID**).login_failed
```

### Alterar/atualizar endereço de email do usuário

Se necessário, você pode simplesmente alterar o endereço de email do
usuário.

::: info
Observe que o atributo login não é afetado por isso e
o Zammad pode, portanto, mostrar informações diferentes na interface.
:::

```ruby
u = User.find(**USERID**)
```

```ruby
u.email = 'user@exmaple.com'
```

```ruby
u.save!
```

Você precisa encontrar o ID do usuário primeiro para isso.

### Alterar/atualizar nome de login do usuário

Altere o nome de usuário do usuário (por exemplo, se você quiser fazer login
com um nome de usuário mais curto em vez de um endereço de email)

```ruby
u = User.find(**USERID**)
```

```ruby
u.login = 'user@exmaple.com'
```

```ruby
u.save!
```

Você precisa encontrar o ID do usuário primeiro para isso.

### Definir direitos de administrador para o usuário

Não tem mais acesso ao Zammad? Conceda a si mesmo ou a outro usuário
direitos administrativos.

```ruby
u = User.find_by(email: 'you@example.com')
```

```ruby
u.roles = Role.where(name: ['Agent', 'Admin'])
```

```ruby
u.save!
```

### Definir senha para o usuário

Você ou o usuário esqueceram a senha? Sem problemas! Basta redefini-la
manualmente se necessário.

```ruby
User.find_by(email: 'you@example.com').update!(password: 'your_new_password')
```

### Remover senha do usuário

Se você adicionou um segundo método de autenticação (por exemplo, LDAP) após
o lançamento, ainda pode haver uma senha no gerenciamento próprio de
usuários do Zammad. Em casos assim, os usuários poderão fazer login com sua
senha (local) do Zammad, além das credenciais armazenadas no provedor de
autenticação externo. Basta remover a senha armazenada pelo Zammad.

```ruby
User.find_by(email: 'you@example.com').update!(password: nil)
```

## Comandos de grupo

### Encontrar um grupo

```ruby
Group.find_by(name: 'Users').follow_up_possible
```

## Comandos de chat

### Remover registros de endereço IP

Use o seguinte comando para remover todos os registros de endereço IP de
chats fechados que não foram atualizados nos últimos sete dias:

```ruby
Chat::Session.where(state: 'closed').where('updated_at < ?', 7.days.ago).each do |session|
next if session.preferences['remote_ip'].blank?
```

```ruby
session.preferences.delete('geo_ip')
```

```ruby
session.preferences.delete('remote_ip')
```

```ruby
session.save!(touch: false)
end
```

## Configurações do Zammad

Nesta seção, você pode encontrar algumas configurações que também pode
definir na interface do Zammad.

### Configuração de desligamento automático

Define se um desligamento automático do Zammad é realizado quando o banco de
dados é alterado (por exemplo, após atributos personalizados serem criados
no gerenciador de objetos). O sistema subjacente (Systemd, Docker,
Kubernetes) reiniciará os processos/containers após esse desligamento. A
configuração padrão é `true`.

Definir isso como `false` pode fazer sentido apenas em casos muito raros, e
você terá que reiniciar os serviços do Zammad manualmente.

```ruby
Setting.set('auto_shutdown', 'true')
```

### Configuração Ticket_hook

Isso lhe dará o gancho de ticket que você encontra dentro do `[]` antes do
número do ticket. Por padrão, isso será `Ticket#` - você não deve alterar
essa configuração em um sistema produtivo.

```ruby
Setting.get('ticket_hook')
```

### Configuração FQDN

Obtenha a configuração atual de FQDN do Zammad e, se necessário, ajuste-a.

::: info
Esta configuração não tem efeito sobre certificados SSL ou quaisquer configurações
de servidor web.
:::

Obter o FQDN atual:

```ruby
Setting.get('fqdn')
```

Definir um novo FQDN:

```ruby
Setting.set('fqdn', 'new.domain.tld')
```

### Configuração HTTP(s)

Essa configuração pertence indiretamente à sua configuração de FQDN e é
relevante para URLs baseadas em variáveis (por exemplo, em notificações)
geradas pelo Zammad.

::: warning
Essa configuração também afeta o comportamento de token CSRF do Zammad. Se você
definir isso como, por exemplo, HTTPs, mas estiver usando HTTP, o login
falhará!

Não tem efeito sobre certificados SSL ou qualquer configuração de servidor web.
:::

Obter o tipo http atual:

```ruby
Setting.get('http_type')
```

Alterar o tipo http para HTTPs:

```ruby
Setting.set('http_type', 'https')
```

### Configuração de provedor de armazenamento

A configuração de provedor de armazenamento é definida como `DB` em
instalações padrão. No entanto, se você recebe muitos anexos ou tem uma
instalação bastante movimentada, usar o banco de dados para armazenar anexos
não é a melhor abordagem.

Obter o armazenamento de anexo atual:

```ruby
Setting.get('storage_provider')
```

Alterar o armazenamento de anexo para banco de dados

```ruby
Setting.set('storage_provider', 'DB')
```

Se você já armazenou arquivos e quer movê-los, pode usar o exemplo a
seguir. Esteja ciente de que essa operação só deve ser executada em
ambientes não produtivos. Caso você precise realizá-la em ambientes de
produção, deve especificar um atraso de espera - caso contrário, seu Zammad
pode ficar sem resposta.

Mover arquivos de DB para File com um atraso especificado após cada arquivo,
em segundos:

```ruby
Store::File.move('DB', 'File', delay_in_sec)
```

As seguintes configurações estão disponíveis em uma instalação padrão:

- `DB` (banco de dados)
- `File` (sistema de arquivos (`/opt/zammad/storage/`))

### Configurando o Elasticsearch

Se sua instalação do Elasticsearch mudar, você pode usar os seguintes
comandos para garantir que o Zammad ainda possa acessar o Elasticsearch.

Alterar a URL do Elasticsearch:

```ruby
Setting.set('es_url', 'http://127.0.0.1:9200')
```

Alterar o usuário do Elasticsearch (por exemplo, para autenticação):

```ruby
Setting.set('es_user', 'elasticsearch')
```

Alterar a senha do Elasticsearch para autenticação:

```ruby
Setting.set('es_password', 'zammad')
```

Alterar o nome do índice:

```ruby
Setting.set('es_index', Socket.gethostname + '_zammad')
```

Ignorar arquivos por extensão de arquivo para não serem indexados:

```ruby
Setting.set('es_attachment_ignore', %w[.png .jpg .jpeg .mpeg .mpg .mov .bin .exe .box .mbox])
```

Limitar o tamanho do anexo:

```ruby
Setting.set('es_attachment_max_size_in_mb', 50)
```

Ativar ou desativar verificação SSL:

```ruby
Setting.set('es_ssl_verify', 'false')
```

### Ativar proxy

Definir um proxy para uso pelo Zammad:

```ruby
Setting.set('proxy', 'proxy.example.com:3128')
```

```ruby
Setting.set('proxy_username', 'some user')
```

```ruby
Setting.set('proxy_password', 'some pass')
```

### Desativar Asciifold

Esse recurso está ativado por padrão. Caso você precise de uma pesquisa mais
exata, pode desativá-lo:

```ruby
Setting.set('es_asciifolding', false)
```

Depois de alterar a configuração, certifique-se de [reconstruir o índice de
pesquisa](/pt_BR/tutorials/connect-config-elasticsearch#build-rebuild-the-searchindex).

## Configurações ocultas

Nesta seção, você pode encontrar algumas configurações que não encontrará na
interface do Zammad. Essas configurações podem ser úteis, pois podem mudar o
comportamento do Zammad.

### Enviar todos os emails de saída para uma caixa de correio BCC

Essa opção permite enviar todos os emails de saída (não notificações) para
uma caixa de correio específica. Observe que essa não deve ser uma caixa de
correio que você já esteja importando! Isso se aplicará a todos os grupos e
é uma configuração global.

```ruby
Setting.set('system_bcc', 'alias@domain.tld')
```

Você pode verificar facilmente a configuração de BCC atual executando o
seguinte:

```ruby
Setting.get('system_bcc')
```

### Ativar contador em visões gerais agrupadas

Isso ativa um valor de número de ticket em cada cabeçalho para elementos
agrupados.

Ativar contador para visões gerais agrupadas:

```ruby
Setting.set('ui_table_group_by_show_count', true)
```

Desativar contador para visões gerais agrupadas:

```ruby
Setting.set('ui_table_group_by_show_count', false)
```

Obter configuração atual (`nil` é false):

```ruby
Setting.get('ui_table_group_by_show_count')
```

### Tipo de ticket padrão na criação

O Zammad permite definir o tipo de artigo padrão na criação do ticket. Por
padrão, isso será uma chamada telefônica recebida.

Você pode escolher entre

- `phone-in` (chamada recebida, **padrão**),
- `phone-out` (chamada realizada) e
- `email-out` (enviar um email).

```ruby
Setting.set('ui_ticket_create_default_type', 'email-out')
```

Para verificar qual configuração está definida atualmente, basta executar:

```ruby
Setting.get('ui_ticket_create_default_type')
```

### Mostrar uma nota durante a criação do artigo

Se você precisar mostrar aos seus agentes uma nota com informações
importantes durante a criação do artigo, pode criar uma nota estática para
diferentes tipos de artigo. Esteja ciente de que há duas configurações: uma
para criação de ticket e outra para criação de artigo em um ticket
existente. Ajuste os comandos abaixo para usá-los nos tipos de artigo
desejados e substitua o texto pelo seu. Caso você não queira uma nota para
todos os tipos de artigo, simplesmente omita esses tipos.

![Captura de tela mostra uma nota durante a criação de
artigo](/screenshots/cypress/reference/rails-commands.cy.js/article-creation-note.png)

#### Criação de ticket

```ruby
Setting.set('ui_ticket_create_notes', {
      :"phone-in"  => "You're about to note a incoming phone call.",
      :"phone-out" => "You're about to note an outgoing phone call.",
      :"email-out" => "You're going to send out an email."
   })
```

#### Novo artigo em tickets existentes

```ruby
Setting.set('ui_ticket_add_article_hint', {
      :"note-internal"  => "You are writing an |internal note|, only people of your organization will see it.",
      :"note-public"    => "You are writing a |public note|.",
      :"phone-internal" => "You are writing an |internal phone note|, only people of your organization will see it.",
      :"phone-public"   => "You are writing a |public phone note|.",
      :"email-internal" => "You are writing an |internal email|, only people of your organization will see it.",
      :"email-public"   => "You are writing a |public email|."
   })
```

#### Verificar configuração atual

```ruby
Setting.get('ui_ticket_create_notes')
```

```ruby
Setting.get('ui_ticket_add_article_hint')
```

#### Opções de marcação

Para aplicar formatação de texto, use a seguinte marcação:

- `||italic||`
- `|bold|`
- `_underline_`
- `//strikethrough//`
- `§key§` (renderiza uma tecla de teclado como [[key]])
- `¶` (nova linha)
- `[link text](/example.com)`

### Mostrar endereço de email do cliente na seleção de cliente (criação de ticket)

Por padrão, o Zammad não exibirá os endereços de email dos clientes. A opção
abaixo permite alterar esse comportamento.

```ruby
Setting.set('ui_user_organization_selector_with_email', true)
```

Obtenha o estado atual dessa configuração com:

```ruby
Setting.get('ui_user_organization_selector_with_email')
```

### Alterar configurações de fonte para emails HTML de saída

::: info
Alguns clientes (como o Outlook) podem recorrer a outras configurações, enquanto
pode funcionar para outros clientes.
:::

A configuração abaixo permite ajustar a configuração de fonte de email do
Zammad. Essa configuração não requer reinicialização do serviço.

```ruby
Setting.set("html_email_css_font", "font-family:'Helvetica Neue', Helvetica, Arial, Geneva, sans-serif; font-size: 12px;")
```

Obtenha o estado atual dessa configuração com:

```ruby
Setting.get('html_email_css_font')
```

### Destacar contagem de tickets abertos do cliente

Essa opção realça a contagem de tickets abertos do cliente selecionado. Ela
destaca a contagem em cores diferentes se atingir um limite.

```ruby
Setting.set('ui_sidebar_open_ticket_indicator_colored', true)
```

A configuração acima tem limites específicos, como segue. Você **não pode**
ajustar esses limites.

| Situation / View      | no indication | warning (orange) | danger (red) |
|-----------------------|---------------|------------------|--------------|
| **Ticket Zoom**       | \< 2          | 2                | \>= 3        |
| **New Ticket dialog** | 0             | 1                | \>= 2        |

### Ativar aba de anexos na barra lateral

Essa opção ativa uma nova aba na barra lateral direita na visualização do
ticket, que mostra todos os anexos do ticket atualmente visualizado.

```ruby
Setting.set('ui_ticket_zoom_sidebar_article_attachments', 'true')
```

### Período de tempo para mostrar o perfil do cliente em novas chamadas

O Zammad mostra o diálogo de perfil do cliente quando uma chamada desse
cliente está chegando e há um ticket existente desse cliente nesse
período. O período padrão é 30 dias. Se não houver ticket nesse período, o
diálogo do cliente não é mostrado automaticamente.

Definir o período de tempo para 90 dias:

```ruby
Setting.set('cti_customer_last_activity', '90')
```

### Definir "Notes" públicas como relevantes para SLA

Normalmente, notas não são relevantes para SLA. Use o seguinte comando para
incluir notas visíveis publicamente ao rastrear a conformidade de SLA (notas
internas _nunca_ afetarão os cálculos de SLA). Esteja ciente de que essa
configuração desativará a opção de excluir notas públicas.

::: info
Por padrão, os clientes não são notificados quando notas públicas são adicionadas a um
ticket. Configure um gatilho se quiser alterar esse comportamento.
:::

Ativar SLA para contar notas como comunicação:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: true)
```

Ativar SLA para ignorar notas como comunicação:

```ruby
Ticket::Article::Type.find_by(name:'note').update!(communication: false)
```

### Ativar ícone de prioridade

Para ativar ícones adicionais que representam a prioridade, use o comando
abaixo:

```ruby
Setting.set('ui_ticket_priority_icons', true)
```

## Outros comandos úteis

### Remover recurso de IA

O recurso de IA do Zammad é completamente opcional e requer uma configuração
antes que qualquer solicitação de IA seja feita. No entanto, se você não
quiser ver o recurso, pode fazê-lo definindo a permissão como inativa.

Desativar qualquer provedor de IA, caso você já o tenha configurado:

```ruby
Setting.set('ai_provider', false)
```

Desativar a permissão para ocultar as configurações da interface:

```ruby
Permission.where("name LIKE 'admin.ai%'").update!(active: false)
```

Para reativá-lo, defina o sinalizador `active` como `true`.

### Buscar emails

O comando abaixo fará uma busca manual dos canais de email. Isso também
mostrará erros que possam aparecer durante esse processo.

```ruby
Channel.fetch
```

### Reprocessar emails com falha

Quando o Zammad busca um email que não consegue analisar (por exemplo,
devido a um bug no analisador ou a uma mensagem malformada), ele armazenará
o email no banco de dados e avisará na seção de monitoramento sobre isso.

No caso de uma mensagem malformada (por exemplo, um endereço de email
inválido em um dos campos de cabeçalho), pode ser necessário editar
manualmente o email antes que o Zammad possa processá-lo. Para fazer isso,
siga as etapas abaixo.

#### Exportar todos os emails com falha para uma pasta local

```sh
rake zammad:email_parser:failed_email:export_all`
```

Você pode encontrar o local do email exportado na saída do seu console. Toda
vez que você realiza uma exportação de emails com falha (não processáveis),
ela cria uma pasta contendo todos os emails com falha no momento da
execução.

#### Editar o email

O email foi exportado na etapa acima. Agora você pode dar uma olhada nele e
tentar consertá-lo. Certifique-se de deixar o nome do arquivo inalterado, ou
a importação falhará.

#### Importar e reprocessar email modificado localmente

Após editar o email, execute:

```sh
rake zammad:email_parser:failed_email:import path/to/your/email.eml
```

Isso aplicará suas alterações do arquivo ao banco de dados. Você também pode
passar a pasta inteira como argumento, para que todos os arquivos `.eml`
nela sejam importados e reprocessados. Se o reprocessamento do email for
bem-sucedido, o(s) arquivo(s) será(ão) excluído(s), e a pasta vazia será
removida.

::: tip
Certifique-se de executar esses comandos apenas a partir da pasta principal do Zammad
`/opt/zammad`. Pode haver problemas se você tentar executá-los de dentro
da subpasta gerada.
:::

#### Excluir emails indesejados

Em caso de emails indesejados, como spam, você pode excluí-los do banco de
dados após exportá-los com o seguinte comando:

```sh
rake zammad:email_parser:failed_email:delete path/to/your/email.eml
```

Se você passar a pasta de exportação como argumento, todos os emails
contidos serão removidos do banco de dados, seus arquivos excluídos e, por
fim, a pasta vazia removida.

### Mostrar e tentar novamente tarefas de privacidade de dados com falha

Em casos raros, as tarefas de privacidade de dados do Zammad podem
falhar. Para mostrá-las, você pode usar o seguinte comando rake:

```sh
rake zammad:data_privacy:failed:show
```

Para tentar novamente tarefas de privacidade de dados com falha, você pode
usar o seguinte comando. No entanto, sem alterar o problema subjacente que
causou a falha, a tarefa falhará novamente. Portanto, certifique-se de
verificar os logs para a causa raiz da falha e corrigi-la antes de tentar
novamente a tarefa.

```sh
rake zammad:data_privacy:failed:retry
```

### Preencher um sistema de teste com dados de teste

::: danger
Não execute isso em um ambiente produtivo! Isso pode deixar o Zammad lento
e é difícil de reverter!
:::

O comando abaixo adicionará `50` agentes, `1000` clientes, `20` grupos, `40`
organizações, `5` novas visões gerais e `100` tickets. Você sempre pode usar
`0` para não criar itens específicos. O Zammad criará dados aleatórios que
não fazem sentido lógico.

```ruby
FillDb.load(agents: 50,customers: 1000,groups: 20,organizations: 40,overviews: 5,tickets: 100,)
```

## Excluindo registros

::: danger
☠️ Os comandos listados aqui causam **perda de dados irrecuperável**! Só
prossiga se souber o que está fazendo e tiver
[um backup](/pt_BR/tutorials/backup-restore)!
:::

### Removendo tickets (e seus artigos)

Excluir um ticket (especificado pelo ID do banco de dados):

```ruby
Ticket.find(4).destroy
```

Excluir todos os tickets:

```ruby
Ticket.destroy_all
```

Manter alguns tickets (especificados pelo ID do banco de dados); excluir o
resto:

```ruby
tickets_to_keep = [1, 2, 3]
```

```ruby
Ticket.where.not(id: tickets_to_keep).destroy_all
```

### Removendo usuários

::: warning
Clientes **não podem** ser excluídos enquanto tiverem tickets restantes no
sistema.

Como tal, os exemplos abaixo excluirão não apenas os clientes
especificados, mas **todos os tickets associados a eles** também. Os
comandos abaixo excluem sem quaisquer outros avisos.
:::

::: tip
Se você não tem certeza do que fazer e precisa aprender mais sobre o que o Zammad
faz ao remover usuários, considere usar as opções da interface do Zammad em vez disso.
Você pode encontrar o recurso de privacidade de dados na interface de administração do Zammad em
_System > Data Privacy_.
:::

Remover usuários é possível de 2 formas: um único usuário e em massa.

Remover um único usuário:

```ruby
User.find_by(email: '<email address>').destroy
```

Remover vários usuários:

```ruby
User.where(
      email: ['<email address 1>', '<email address 2>']
   ).destroy_all
```

### Removendo organizações

::: info
Remover uma organização **não** exclui os clientes associados.
:::

#### Etapa 1: selecionar organizações

Por status "ativo":

```ruby
organizations = Organization.where(active: false)
```

Por nome:

```ruby
organizations = Organization.where(name: 'Acme')
```

Por correspondência parcial em notas:

```ruby
organizations = Organization.where('note LIKE ?', '%foo%')
```

#### Etapa 2: pré-visualizar organizações afetadas

```ruby
puts organizations.map { |org| "ORGANIZATION #{org.name}" }.join("\n")
```

#### Etapa 3: prosseguir com a exclusão

```ruby
organizations.each do |org|
    puts %{Preparing deletion of organization "#{org.name}"...}
```

```ruby
org.members.each do |member|
    puts "  Removing #{member.fullname} from organization..."
    member.update!(organization_id: nil)
end
```

```ruby
    puts "  Deleting #{org.name}..."
    org.destroy
   end
```

### Removendo registros do sistema

Remover todas as notificações online:

```ruby
OnlineNotification.destroy_all
```

Remover todas as entradas do Feed de atividades (painel):

```ruby
ActivityStream.destroy_all
```

Remover entradas de todos os objetos visualizados recentemente (tickets,
usuários, organizações):

```ruby
RecentView.destroy_all
```

Remover todas as informações de histórico de tickets, usuários e
organizações (perigoso!):

```ruby
History.destroy_all
```

### Redefinir instalação do Zammad

::: danger

Os comandos abaixo são intencionalmente incompletos, as saídas de erro vão orientá-lo!
As seguintes operações causarão perda de dados e são apenas para
desenvolvimento/teste.

Não esqueça de parar o Zammad antes de tentar excluir o banco de dados!
:::

Truncar o banco de dados:

```sh
rake zammad:db:truncate
```

Migrar o banco de dados:

```sh
rake db:migrate
```

Carregar os dados de seed:

```sh
rake db:seed
```

Limpar o cache e recarregar as configurações:

```sh
rake zammad:db:rebuild
```

::: tip

Você também pode usar o comando `zammad:db:reset` para redefinir sua instância. Essa tarefa
truncará o banco de dados, executará as migrações, populará o banco de dados, limpará o
cache e recarregará as configurações. No entanto, ela não pedirá sua confirmação
entre cada etapa, então você deve usá-la com cuidado.
:::
