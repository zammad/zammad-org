---
order: 4
outline:
  - 2
  - 2
title: 'Atributos indexados pelo Elasticsearch'
---

# Atributos indexados pelo Elasticsearch

Você pode encontrar abaixo uma lista dos principais atributos de objeto
indexados pelo Elasticsearch (ES). Em outras palavras, se você quiser
encontrar um ticket, artigo ou usuário pela caixa de pesquisa do Zammad, o
ES pode pesquisar em qualquer um dos campos abaixo.

::: info

- Esta página lista os atributos de objeto padrão do Zammad que são indexados pelo ES. Há mais alguns índices do ES, principalmente
  sobre objetos na interface de administração do Zammad. Eles estão fora do escopo desta documentação.
- Atributos marcados como <Badge type="info" text="SLA"/> só são definidos se o ticket for afetado pelo cálculo de SLA.
  Observe que alguns atributos podem não ser definidos se condições específicas não forem atendidas.
- Observe também que alguns atributos podem ser redefinidos para `null` se não forem mais aplicáveis.
- Todos os carimbos de data/hora fornecidos pelo Zammad são UTC por padrão. Isso também se aplica aos horários fornecidos pelo ES.

:::

## Visão geral

Você pode encontrar detalhes sobre cada atributo de objeto na próxima
seção. Nesta seção, você pode ter uma visão geral rápida sobre os objetos
mais importantes e como eles aparecem como saída JSON completa.

:::: tabs

=== Ticket

Abra os detalhes para mostrar a estrutura completa do ticket: <Badge type="danger" text="Huge content ahead!"/>

::: details

<<< @/fixtures/es-indexed-attributes/complete-ticket.json

:::

=== Article

A seguinte estrutura já está incluída no índice do ticket (veja a primeira aba) e é adicionada aqui separadamente por
motivos de visão geral. Abra os detalhes para ver o conteúdo do artigo:

::: details

<<< @/fixtures/es-indexed-attributes/complete-article.json

:::

=== User

Abra os detalhes para mostrar a estrutura completa do usuário:

::: details

<<< @/fixtures/es-indexed-attributes/complete-user.json

:::

=== Organization

Abra os detalhes para mostrar a estrutura completa da organização:

::: details

<<< @/fixtures/es-indexed-attributes/complete-organization.json

:::

::::

## Ticket

O seguinte índice contém as informações mencionadas abaixo: `*_ticket`

### `article`

Array com todos os artigos pertencentes ao ticket. Veja a [seção de
artigo](#article-1) para detalhes.

::: details

<<< @/fixtures/es-indexed-attributes/article.json

:::

### `article_count`

Número de artigos dentro do ticket.

Exemplo: `1`

### `checklist`

Estrutura completa da checklist e seus elementos.

::: details

<<< @/fixtures/es-indexed-attributes/checklist.json

:::

### `close_at`

Primeiro horário de fechamento, definido uma vez. Veja `last_close_at` para
o último horário de fechamento (se o ticket foi reaberto e fechado
novamente).

Exemplo: `"2025-03-20T06:48:46.438Z"`

### `close_diff_in_min` <Badge type="info" text="SLA"/>

Depende de `close_in_min` e informa quantos minutos o ticket foi fechado em
relação ao tempo de solução do SLA.

Exemplos: `239`, `-5`

### `close_escalation_at` <Badge type="info" text="SLA"/>

Carimbo de data/hora de quando o ticket escalonaria caso o tempo de solução
seja violado.

Exemplos: `null`, `"2025-02-03T15:50:20.673Z"`

### `close_in_min` <Badge type="info" text="SLA"/>

Valor em minutos de quanto tempo o ticket ficou aberto com base no horário
comercial.

Exemplos: `null`, `11`

### `create_article_sender`

Remetente do artigo (Sistema, Agente, Cliente)

::: details

<<< @/fixtures/es-indexed-attributes/create_article_sender.json

:::

### `create_article_sender_id`

ID do usuário que criou o artigo.

Exemplos: `1`, `2`

### `create_article_type`

Informações do primeiro artigo de um ticket.

::: details

<<< @/fixtures/es-indexed-attributes/create_article_type.json

:::

### `create_article_type_id`

ID do tipo do primeiro artigo.

Exemplo: `5`

### `created_at`

Carimbo de data/hora da criação do ticket.

Exemplo: `"2025-02-24T16:17:27.210Z"`

### `created_by`

Detalhes do usuário que criou o ticket. Veja a [seção de usuário](#user)
para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID do usuário que criou o ticket.

Exemplo: `3`

### `customer`

Detalhes do cliente do ticket. Veja a [seção de usuário](#user) para mais
informações.

### `customer_id`

ID do cliente que criou o ticket.

Exemplo: `8`

### `escalation_at` <Badge type="info" text="SLA"/>

Carimbo de data/hora do próximo escalonamento aplicável, independentemente
do tipo de escalonamento.

Exemplos: `null`, `"2025-02-24T16:28:38.535Z"`

### `first_response_at` <Badge type="info" text="SLA"/>

Carimbo de data/hora da primeira resposta ao cliente (tipo comunicação).

Exemplos: `null`, `"2025-02-24T16:28:38.303Z"`

### `first_response_diff_in_min` <Badge type="info" text="SLA"/>

Depende de `first_response_in_min` e informa quantos minutos a primeira
resposta levou em relação ao tempo de primeira resposta do seu SLA.

Exemplos: `null`, `10`, `-6`

### `first_response_in_min` <Badge type="info" text="SLA"/>

Valor em minutos sobre quanto tempo a primeira resposta levou com base no
horário comercial.

Exemplos: `null`, `11`

### `group`

Detalhes do grupo do ticket. Veja a [seção de grupo](#group-1) para mais
informações.

::: details

<<< @/fixtures/es-indexed-attributes/group.json

:::

### `group_id`

ID do grupo atual

Exemplo: `1`

### `id`

ID do ticket

Exemplos: `1`, `111`

### `last_close_at`

Último horário de fechamento, definido a cada fechamento do ticket.

Exemplos: `null`, `"2025-02-03T14:50:20.673Z"`

### `last_contact_agent_at`

Carimbo de data/hora do último contato do tipo comunicação de qualquer
agente.

Exemplos: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_at`

Carimbo de data/hora do último contato/artigo do tipo comunicação,
independentemente de quem o criou.

Exemplos: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_customer_at`

Carimbo de data/hora do último contato/artigo do tipo comunicação do
cliente.

Exemplos: `null`, `"2025-02-24T16:28:38.303Z"`

### `mention_user_ids`

Array com IDs de usuários mencionados ou inscritos.

Exemplos: `[3, 5]`, `[]`

### `note`

Nota do ticket, definida apenas via console ou API.

Exemplo: `null`

### `number`

Número do ticket.

Exemplos: `1010138`, `202006231010138`

### `organization`

Detalhes da organização do cliente do ticket. Veja a [seção de
organização](#organization-2) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID da organização do cliente do ticket.

Exemplos: `null`, `2`

### `owner`

Detalhes do usuário que é responsável pelo ticket. Veja a [seção de
usuário](#user) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/owner.json

:::

### `owner_id`

ID de usuário do responsável pelo ticket.

Exemplos: `null`, `3`

### `pending_time`

Carimbo de data/hora do horário pendente definido. Apenas se um estado
pendente estiver definido, independentemente do tipo de estado pendente.

Exemplos: `null`, `"2025-02-24T17:44:06.912Z"`

### `preferences`

Informações especiais para funções internas. Pode não estar disponível no
seu sistema; contém informações para funções internas do sistema.

### `priority`

Detalhes do estado de prioridade do ticket. Veja a [seção de
prioridade](#ticket-priority) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/priority.json

:::

### `priority_id`

ID de prioridade do ticket.

Exemplo: `2`

### `state`

Detalhes do estado do ticket. Veja a [seção de estado](#ticket-state) para
mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/state.json

:::

### `state_id`

ID do estado atual do ticket.

Exemplos: `1`, `4`

### `tags`

Array com todas as tags anexadas ao ticket.

Exemplos: `["order", "complaint"]`, `[]`

### `time_unit`

Unidades de tempo contabilizadas para o ticket (total).

Exemplos: `null`, `15`

### `title`

Título/assunto do ticket.

Exemplos: `Feedback Form`, `Need help`

### `type` <Badge type="warning" text="deprecated"/>

Valor: `null`

### `update_diff_in_min` <Badge type="info" text="SLA"/>

Depende de `update_in_min` e informa quantos minutos a última atualização do
ticket levou em relação à configuração de tempo de atualização do SLA.

Exemplos: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_escalation_at` <Badge type="info" text="SLA"/>

Carimbo de data/hora de quando o ticket escalonaria caso o período de
atualização do SLA seja violado.

Exemplos: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_in_min` <Badge type="info" text="SLA"/>

Valor em minutos de quanto tempo a última atualização do ticket levou, com
base no horário comercial e no horário de atualização.

Exemplos: `null`, `5`, `-10`

### `updated_at`

Carimbo de data/hora da última atualização do ticket.

Exemplo: `"2025-02-24T16:28:38.303Z"`

### `updated_by`

Detalhes do usuário que atualizou o ticket. Veja a [seção de usuário](#user)
para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID do usuário que atualizou o ticket.

Exemplos: `1`, `3`

## Prioridade

O seguinte índice contém as informações mencionadas abaixo:
`*_ticket_priority`

### `active`

Define se a prioridade está ativa ou não.

Valores: `true`, `false`

### `created_at`

Carimbo de data/hora da criação da prioridade.

Exemplo: `"2025-02-03T14:50:20.724Z"`

### `created_by_id`

ID do usuário que criou a prioridade.

Exemplo: `1`

### `default_create`

Define se a prioridade é a prioridade padrão para a criação de tickets ou
não.

Valores: `false`, `true`

### `id`

ID da prioridade.

Exemplo: `3`

### `name`

Nome da prioridade.

Exemplo: `"3 high"`

### `note`

Nota da prioridade que foi definida via console ou API.

Exemplo: `"null"`

### `ui_color`

Classe CSS para a cor de destaque de tickets com essa prioridade.

Exemplos: `"null"`, `"high-priority"`

### `ui_icon`

Classe CSS para o ícone de destaque de tickets com essa prioridade.

Exemplos: `"null"`, `"important"`

### `updated_at`

Carimbo de data/hora da última alteração.

Exemplo: `"2025-02-03T14:50:20.724Z"`

### `updated_by_id`

ID do usuário que realizou a última atualização.

Exemplo: `1`

## Atributos do ticket

O seguinte índice contém as informações mencionadas abaixo: `*_ticket_state`

### `active`

Define se o estado está ativo (disponível) ou não.

Valores: `true`, `false`

### `created_at`

Carimbo de data/hora da criação do estado.

Exemplo: `"2025-02-03T14:50:20.694Z"`

### `created_by_id`

ID do usuário que criou o estado.

Exemplo: `1`

### `default_create`

Define se o estado é o estado padrão para criação de tickets.

Valores: `false`, `true`

### `default_follow_up`

Define se o estado é o estado padrão de acompanhamento em acompanhamentos de
ticket.

Valores: `false`, `true`

### `id`

ID do estado.

Exemplo: `7`

### `ignore_escalation`

Define se o cálculo de SLA é ignorado para este estado.

Valores: `false`, `true`

### `name`

Nome do estado.

Exemplo: `"pending close"`

### `next_state`

Contém todas as informações de estado de acompanhamento, se aplicável; pode
não estar disponível dependendo do tipo de estado

::: details

<<< @/fixtures/es-indexed-attributes/next_state.json

:::

### `next_state_id`

ID do estado de acompanhamento.

Exemplos: `null`, `4`

### `note`

Nota que foi definida via console ou API.

Exemplo: `"null"`

### `state_type`

Contém todas as informações disponíveis do tipo do estado

::: details

<<< @/fixtures/es-indexed-attributes/state_type.json

:::

### `state_type_id`

ID do tipo de estado.

Exemplo: `4`

### `updated_at`

Carimbo de data/hora da última atualização do estado.

Exemplo: `"2025-02-03T14:50:20.694Z"`

### `updated_by_id`

ID do usuário que realizou a última atualização do estado.

Exemplo: `1`

## Article

O seguinte índice contém as informações mencionadas abaixo: `*_ticket`

Os artigos fazem parte do índice do ticket. Para reduzir a complexidade,
decidimos fornecê-lo em sua própria seção.

### `body`

Corpo do artigo em texto simples.

Exemplo: `"Hi,\n\nplease send me:\n1 [...] \nThank you\n\nJohn Doe"`

### `cc`

Os endereços de email definidos como CC.

Exemplos: `null`, `alias@domain.tld`

### `content_type`

Tipo de conteúdo do artigo.

Exemplos: `"text/html"`, `"text/plain"`

### `created_at`

Carimbo de data/hora da criação do artigo.

Exemplo: `"2025-02-22T03:47:59.290Z"`

### `created_by_id`

ID do usuário que criou o artigo.

Exemplo: `10`

### `detected_language`

Código do idioma detectado.

Exemplos: `"en"`, `"de"`, `null`

### `detected_language_name`

Nome do idioma detectado.

Exemplos: `"English"`, `"German"`

### `from`

Nome (e endereço de email) do criador do artigo.

Exemplos: `"Nicole Braun <nicole.braun@zammad.org>"`, `"John Doe"`

### `id`

ID interno do artigo.

Exemplo: `16`

### `in_reply_to`

Cabeçalho "In-Reply-To" do email, se aplicável.

Exemplo: `null`

### `internal`

Define se o artigo é interno ou não.

Valores: `false`, `true`

### `message_id`

ID da mensagem do email, se aplicável.

Exemplo: `null`

### `origin_by_id`

ID do usuário (ou ID do criador original, se criado em nome de outro
usuário) que criou o artigo.

Exemplo: `null`

### `preferences`

Preferências internas, podem estar vazias.

Exemplo: `{}`

### `reply_to`

Contém o cabeçalho "Reply-To", se aplicável.

Exemplo: `null`

### `sender_id`

ID do usuário que enviou/criou o artigo.

Exemplo: `2`

### `subject`

Assunto do artigo.

Exemplo: `"My amazing subject"`

### `ticket_id`

ID do ticket ao qual o artigo pertence.

Exemplo: `9`

### `to`

Endereço de email do cabeçalho "To" ou grupo definido com esse artigo.

Exemplos: `support@example.com`,`"Support"`, `null`

### `type_id`

ID do tipo de artigo (por exemplo, telefone, email, web).

Exemplo: `1`

### `updated_at`

Carimbo de data/hora da última atualização do artigo.

`"2025-02-22T03:47:59.290Z"`

### `updated_by_id`

ID do usuário que atualizou o artigo.

Exemplo: `10`

## User

### `active`

Define se um usuário está ativo.

Valores: `true`, `false`

### `address`

Endereço do usuário.

Exemplos: `""`, `"Hauptstraße 100, 99999 Berlin"`

### `city`

Nome da cidade do usuário.

Exemplos: `""`, `"Berlin"`

### `country`

Nome do país do usuário.

Exemplos: `""`, `"Germany"`

### `created_at`

Carimbo de data/hora de criação do usuário.

Exemplo: `"2025-02-22T12:47:56.460Z"`

### `created_by_id`

ID do usuário que criou o usuário.

Exemplo: `1`

### `department`

Nome do departamento.

Exemplos: `""`, `"IT"`

### `email`

Endereço de email do usuário.

Exemplos: `""`, `"nicole.braun@zammad.org"`

### `fax`

Número de fax do usuário.

Exemplos: `""`, `"+49 123 456 789 01"`

### `firstname`

Primeiro nome do usuário.

Exemplos: `""`, `"John"`

### `id`

ID interno do usuário.

Exemplo: `8`

### `last_login`

Carimbo de data/hora do último login do usuário.

Exemplos: `null`, `"2025-02-23T12:47:56.460Z"`

### `lastname`

Sobrenome do usuário.

Exemplos: `""`, `"Doe"`

### `login`

Nome de login do usuário, sempre definido e único, pode ser diferente do
email.

Exemplos: `"auto-1234567"`, `"jdoe"`

### `mobile`

Número de celular do usuário.

Exemplos: `""`, `"+49 123 456 789"`

### `note`

Nota do objeto de usuário.

Exemplos: `""`, `"Some text."`

### `organization`

Detalhes da organização da qual o usuário é membro. Veja a [seção de
organização](#organization-2) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID da organização da qual o usuário é membro.

Exemplo: `3`

### `out_of_office`

Define se o usuário ativou a função de fora do escritório.

Valores: `false`, `true`

### `out_of_office_end_at`

Data de término do período de fora do escritório.

Exemplos: `null`, `"2025-02-26"`

### `out_of_office_replacement_id`

ID do usuário que substitui este usuário durante o período de fora do
escritório.

Exemplos: `null`, `3`

### `out_of_office_start_at`

Data de início do período de fora do escritório.

Exemplos: `null`, `"2025-02-24"`

### `permissions`

Define as permissões do usuário como array.

::: details

<<< @/fixtures/es-indexed-attributes/permissions.json

:::

### `phone`

Número de telefone do usuário.

Exemplos: `""`, `"+49 1234 567 890"`

### `preferences`

Detalhes das preferências do usuário; pode conter `notification_config`,
`locale` e outras informações internas do sistema.

::: details

<<< @/fixtures/es-indexed-attributes/preferences.json

:::

### `role_ids`

Array com IDs de função atribuídos ao usuário.

Exemplo: `[1, 2]`

### `street`

Nome da rua do usuário.

Exemplos: `""`, `"Hauptstraße 100"`

### `updated_at`

Carimbo de data/hora da última atualização do usuário.

Exemplo: `"2025-02-25T00:27:52.308Z"`

### `updated_by_id`

ID do usuário que atualizou este usuário.

Exemplo: `3`

### `verified`

Define se o usuário verificou a conta ou não.

Valores: `false`, `true`

### `vip`

Define se o usuário tem estado VIP ou não.

Valores: `false`, `true`

### `web`

URL web do usuário.

Exemplos: `""`, `"https://zammad.org"`

### `zip`

CEP do usuário.

Exemplos: `""`, `"123456"`

## Organization

O seguinte índice contém as informações mencionadas abaixo: `*_organization`

### `active`

Define se a organização está ativa ou não.

Valores: `true`, `false`

### `created_at`

Carimbo de data/hora da data de criação da organização.

Exemplo: `"2025-02-22T12:47:54.807Z"`

### `created_by`

Detalhes do usuário que criou a organização. Veja a [seção de
usuário](#user) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID do usuário que criou a organização.

Exemplo: `1`

### `domain`

Domínio da organização.

Exemplos: `"null"`, `"example.com"`

### `domain_assignment`

Define se a atribuição por domínio está ativa ou não; depende de `domain`.

Valores: `false`, `true`

### `id`

ID interno da organização.

Exemplo: `1`

### `members`

Array com detalhes de cada usuário que é membro da organização. Veja a
[seção de usuário](#user) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/members.json

:::

### `name`

Nome da organização.

Exemplo: `"Fast Lane Hardware Inc."`

### `note`

Nota do objeto de organização.

Exemplo: `"IT hardware and custom PC builds."`

### `shared`

Define se é uma "organização compartilhada" ou não.

Valores: `false`, `true`

### `updated_at`

Carimbo de data/hora da última atualização da organização.

Exemplo: `"2025-02-22T12:47:54.807Z"`

### `updated_by`

Detalhes do usuário que atualizou a organização. Veja a [seção de
usuário](#user) para mais informações.

::: details

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID do usuário que atualizou a organização.

Exemplo: `1`

### `vip`

Define se a organização tem status VIP ou não.

Valores: `false`, `true`

## Grupo

O seguinte índice contém as informações mencionadas abaixo: `*_group`

### `active`

Define se o grupo está ativo ou não.

Valores: `false`, `true`

### `assignment_timeout`

Tempo em minutos que um agente pode ficar inativo até que a atribuição de
responsável seja removida.

Exemplos: `null`, `30`

### `created_at`

Carimbo de data/hora da criação do grupo.

Exemplo: `"2025-02-24T23:55:06.980Z"`

### `created_by_id`

ID do usuário que criou o grupo.

Exemplo: `1`

### `email_address`

Detalhes sobre o endereço de email do grupo.

::: details

<<< @/fixtures/es-indexed-attributes/email_address.json

:::

### `email_address_id`

ID do endereço de email do grupo.

Exemplo: `3`

### `follow_up_assignment`

Define se os responsáveis pelo ticket continuam atribuídos após um
acompanhamento.

Valores: `false`, `true`

### `follow_up_possible`

Define se um acompanhamento em um ticket fechado é possível ou não.

Valores: `"yes"`, `"no"`

### `id`

ID interno do grupo.

Exemplo: `1`

### `name`

Nome do grupo.

Exemplos: `"Support"`, `"IT"`

### `note`

Nota do objeto de grupo.

Exemplo: `null`

### `signature`

Detalhes da assinatura do grupo.

::: details

<<< @/fixtures/es-indexed-attributes/signature.json

:::

### `signature_id`

ID interno da assinatura.

Exemplo: `1`

### `updated_at`

Carimbo de data/hora da última atualização do grupo.

Exemplo: `"2025-02-24T23:55:06.980Z"`

### `updated_by_id`

ID do usuário que atualizou o grupo.

Exemplo: `3`

## CTI Log

O seguinte índice contém as informações mencionadas abaixo: `*_cti_log`

### `call_id`

ID único da chamada.

Exemplo: `6`

### `comment`

Comentário opcional.

Exemplo: `""`

### `created_at`

Data de criação da chamada.

Exemplo: `"2025-02-22T11:48:01.703Z"`

### `direction`

Direção da chamada.

Valores: `in`, `out`

### `done`

Define se a chamada é exibida como "a fazer" na interface.

Valores: `true`, `false`

### `duration_talking_time`

Duração da chamada em segundos.

Exemplo: `27`

### `duration_waiting_time`

Tempo de espera em segundos até a chamada ser atendida.

Exemplo: `77`

### `end_at`

Carimbo de data/hora do fim da chamada.

Exemplo: `"2025-02-25T08:49:40.647Z"`

### `from`

Número que originou a chamada.

Exemplo: `491711234567890`

### `from_comment`

Nome do número de origem, se aplicável.

Exemplos: `null`, `"John"`, `"Doe"`

### `from_pretty`

Versão formatada de `from` com espaçamento e `+` adicionado.

Exemplo: `+49 171 1234567890`

### `id`

ID interno da entrada de log.

Exemplo: `8`

### `initialized_at`

Carimbo de data/hora da inicialização da chamada, geralmente corresponde a
`created_at`.

Exemplo: `"2025-02-25T08:47:56.753Z"`

### `preferences`

Detalhes de preferências, informações internas.

::: details

<<< @/fixtures/es-indexed-attributes/call-log-preferences.json

:::

### `queue`

Fila na qual a chamada foi atendida.

Exemplos: `null`, `491711234567890`

### `start_at`

Carimbo de data/hora de quando a chamada foi atendida.

Exemplo: `"2025-02-25T08:49:13.050Z"`

### `state`

Último estado da chamada.

Exemplos: `hangup`, `voicemail`

### `to`

Número discado.

Exemplo: `491711234567890`

### `to_comment`

Nome de exibição do número chamado, se aplicável.

`"null"`, `"John"`, `"Doe"`

### `to_pretty`

Versão formatada de `to`.

Exemplo: `+49 171 1234567890`

### `updated_at`

Última atualização da entrada.

Exemplo: `"2025-02-25T08:49:40.647Z"`

## Chat Session

O seguinte índice contém as informações mencionadas abaixo: `*_chat_session`

### `chat`

Detalhes do tópico do chat.

::: details

<<< @/fixtures/es-indexed-attributes/chat.json

:::

### `chat_id`

ID do tópico do chat.

Exemplo: `1`

### `created_at`

Carimbo de data/hora da criação do chat

`"2025-02-25T10:26:24.376Z"`

### `created_by_id` <Badge type="warning" text="deprecated"/>

ID do usuário que criou o chat.

Valor: `null`

### `id`

ID da sessão de chat.

Exemplo: `1`

### `messages`

Array com todas as mensagens do chat.

::: details

<<< @/fixtures/es-indexed-attributes/messages.json

:::

### `name`

O nome do usuário do chat definido pelo agente, se aplicável.

Exemplos: `null`, `"John Doe"`

### `preferences`

Vários metadados internos do session_id

::: details

<<< @/fixtures/es-indexed-attributes/chat-session-preferences.json

:::

### `session_id`

ID único da sessão de chat.

Exemplo: `92f2909631f1ad5ff4d5d1e046952be8`

### `state`

Estado atual da sessão de chat.

Exemplo: `closed`

### `tags`

Tags aplicadas à sessão de chat pelo agente, se aplicável.

Exemplo: `["order", "refund"]`

### `updated_at`

Carimbo de data/hora da última atualização do chat.

Exemplo: `"2025-02-25T10:27:03.341Z"`

### `updated_by_id`

ID do usuário que atualizou a sessão de chat pela última vez.

Exemplos: `null`, `3`

### `user`

Detalhes do agente do chat. Veja a [seção de usuário](#user) para mais
informações.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `user_id`

ID do agente do chat.

Exemplo: `3`
