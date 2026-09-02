---
order: 2
title: 'Log de auditoria'
---

# Log de auditoria

O log de auditoria registra alterações relevantes para a segurança no seu
sistema Zammad: quem alterou o quê e quando. O log de auditoria é somente
leitura.

## Listar

Permissão necessária: `admin.audit_log`

Solicitação `GET` enviada: `/api/v1/audit_logs`

O endpoint suporta paginação. O tamanho de página padrão é `500`. As
entradas são retornadas ordenadas por `id` (crescente). Passe `?sort_by=id`
e `?order_by=DESC` para retornar as entradas mais recentes primeiro.

::: details

<<< @/fixtures/rest-api/audit_logs/get-list-res.json

:::

## Mostrar

Permissão necessária: `admin.audit_log`

Solicitação `GET` enviada: `/api/v1/audit_logs/{id}`

::: details

<<< @/fixtures/rest-api/audit_logs/get-id-res.json

:::

## Pesquisar

Permissão necessária: `admin.audit_log`

O endpoint de pesquisa aceita a sintaxe `query` do backend de pesquisa do
Zammad. O caso mais simples é uma substring literal em um único campo
indexado, como `auditable_name`, `auditable_type` ou `user_fullname`:

Solicitação `GET` enviada: `/api/v1/audit_logs/search?query={search-string}`

::: details

<<< @/fixtures/rest-api/audit_logs/get-search-res.json

:::

Para filtrar por um atributo específico em vez de buscar por substring no
registro inteiro, prefixe o nome do atributo. Você pode até usar o conector
lógico `AND` para refinar os resultados:

Solicitação `GET` enviada:
`/api/v1/audit_logs/search?query=auditable_type:Macro AND user_id:3`

::: warning
As correspondências de pesquisa diferenciam maiúsculas de minúsculas e pesquisam apenas os
campos de atributo indexados (`auditable_name`, `auditable_type`,
`user_fullname` e assim por diante). Os payloads `value_from` e `value_to`
não são pesquisáveis.
:::

::: tip
Por padrão, a resposta é um array JSON simples com as entradas correspondentes.
Passe `with_total_count=true` na URL (ou `with_total_count:
true` no corpo de uma solicitação `POST`) para envolver a resposta em
um objeto que também contém o `total_count`. Envie uma solicitação `POST`
quando a consulta for muito longa ou complexa para uma URL.
:::

## Referência de campos

`id`
:
  Chave primária inteira da entrada do log de auditoria.

`user_id`
: ID do usuário que acionou a alteração. `null` quando a entrada
  foi gravada por uma tarefa em segundo plano sem um usuário atual.

`user_fullname`
: Nome completo do usuário no momento em que a entrada foi gravada. Armazenado
  separadamente para que continue legível mesmo após a conta do usuário ser
  removida.

`action_type`
: Tipo da alteração registrada. Um dos seguintes: `create` (um registro foi
  adicionado), `update` (um registro existente foi modificado), `destroy`
  (um registro foi removido), `switch_to` (um usuário assumiu a sessão de outro
  usuário via _View from user's perspective_),
  `switch_back_to` (a sessão original foi retomada).

`auditable_id`
:
  ID do registro que foi alterado.

`auditable_type`
: Nome da classe do registro que foi alterado (ex.: `Macro`,
  `Setting`, `KnowledgeBase`, `ChecklistTemplate`, `Job`).

`auditable_name`
: Nome de exibição do registro alterado no momento em que a entrada foi
  gravada. Armazenado separadamente para que continue legível mesmo depois que o
  registro em si deixa de existir.

`value_from`
: Objeto (JSON) contendo o estado anterior dos atributos
  auditados. Vazio (`{}`) em entradas `create`.

`value_to`
: Objeto (JSON) contendo o novo estado dos atributos auditados.
  Vazio (`{}`) em entradas `destroy`.

`source_ip`
: Endereço IP que originou a solicitação subjacente. `Rails console`
  ou `Rails runner` é armazenado quando a entrada foi gravada a partir de um
  script de manutenção.

`preferences`
: Objeto (JSON) contendo metadados adicionais por entrada. Para
  entradas `update`, isso contém um array `changed_attributes`
  listando os atributos que de fato mudaram.

`created_at`
: Timestamp em que a entrada foi gravada. Entradas do log de auditoria são
  somente de inserção (append-only).

`updated_at`
: O mesmo que `created_at` para entradas do log de auditoria. Entradas do log de auditoria
  são somente de inserção (append-only).

## Ciclo de vida

Uma tarefa agendada remove entradas com mais de **12 meses** todos os
dias. Use `AuditLog.cleanup` no console Rails para acionar uma limpeza
manualmente.
