---
order: 11
title: Objeto
---

# Objeto

::: danger
Ajustar objetos via API pode causar problemas sérios na sua instância.
Prossiga com extrema cautela e certifique-se de ajustar quaisquer
campos padrão do Zammad.

Se você quiser ocultar campos, considere usar os core workflows do Zammad em vez disso!
:::

## Listar

Permissão necessária: `admin.object`

Solicitação `GET` enviada: `/api/v1/object_manager_attributes`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/get-res.json

:::

## Mostrar

Permissão necessária: `admin.object`

Solicitação `GET` enviada: `/api/v1/object_manager_attributes/{id}`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/get-id-res.json

:::

## Criar

Permissão necessária: `admin.object`

Solicitação `POST` enviada: `/api/v1/object_manager_attributes`

### Boolean

:::: details

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-res.json

:::
::::

### Data

:::: details

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-date-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-date-res.json

:::
::::

### Date time

:::: details

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-res.json

:::
::::

### Inteiro

:::: details

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-res.json

:::
::::

### Select

:::: details

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-select-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-select-res.json

:::
::::

### Texto

::::: details

:::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-text-req.json

::: tip

Os campos de entrada do Zammad podem ter 4 tipos diferentes:

- `email`
- `tel`
- `text`
- `url` (não suporta templates de link)

Dependendo do tipo de entrada escolhido, o Zammad espera formatos diferentes de
dados. Por exemplo: email exige que um endereço de email seja fornecido.
:::

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-text-res.json

::::
:::::

### Tree select

:::: details

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-res.json

:::
::::

:::: info
Observe que os payloads acima cobrem objetos de ticket. Isso está correto na
maioria das situações, exceto se você estiver olhando para as permissões
padrão de objeto. É por isso que estamos listando-as separadamente para você visualizar.

O atributo `object` controla qual contexto está sendo usado:

- `Ticket`
- `User`
- `Organisation`
- `Group`

::: tabs

=== Ticket

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-ticket-req.json

=== User

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-user-req.json

=== Organization

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-organization-req.json

=== Group

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-group-req.json

:::
::::

## Atualização

Permissão necessária: `admin.object`

Exceto pelo método de solicitação, os payloads para atualizar e criar
objetos são idênticos. Para exemplos completos de payload, role para cima
até `create_object`.

O Zammad retornará dois atributos durante a atualização: `data_option` e
`data_option_new`. O primeiro atributo contém os valores atualmente ativos,
e o segundo, os novos valores que serão ativados (eles se tornarão ativos
após executar as migrações do banco de dados).

Solicitação `PUT` enviada: `/api/v1/object_manager_attributes/{id}`

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/put-id-req.json

::: info
Certifique-se de fornecer `data_option`. O Zammad é bastante exigente se você omitir
esse atributo. Observe que alterar o tipo de objeto _após_
a criação não é possível.
:::

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/put-id-res.json

::::
:::::

## Excluir

Permissão necessária: `admin.object`

Solicitação `DELETE` enviada: `/api/v1/object_manager_attributes/{id}`

::: details

<<< @/fixtures/rest-api/object_manager_attributes/delete-id-res.json

:::

## Execute database migrations

Permissão necessária: `admin.object`

::: warning
Após executar as migrações do banco de dados, um reinício do Zammad é
_obrigatório_. Se não desativado via
[configuração de desligamento automático](/pt_BR/reference/rails-commands#auto-shutdown-setting),
o Zammad reinicia automaticamente - espere uma pequena indisponibilidade.
:::

Solicitação `POST` enviada:
`/api/v1/object_manager_attributes_execute_migrations`

::: details

<<< @/fixtures/rest-api/object_manager_attributes_execute_migrations/post-res.json

:::
