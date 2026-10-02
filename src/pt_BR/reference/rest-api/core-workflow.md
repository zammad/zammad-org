---
order: 10
title: 'Fluxo de trabalho principal'
---

# Fluxo de trabalho principal

::: info
Os fluxos de trabalho principais são diferentes dos [gatilhos](/pt_BR/reference/rest-api/trigger):
eles controlam o formulário de criação/edição de ticket enquanto alguém o preenche, por
exemplo restringindo quais valores podem ser selecionados em outro campo. O
formulário envia seus valores atuais ao Zammad, que avalia os fluxos de trabalho
e retorna as alterações de campo resultantes. Diferente dos gatilhos, eles não atuam
em tickets existentes em segundo plano.

Compare com os [perfis de relatório](/pt_BR/reference/rest-api/report-profile), cujo
campo `condition`, diferente do fluxo de trabalho principal, valida que os campos
referenciados realmente existem.
:::

## Listar

Permissão necessária: `admin.core_workflow`

Solicitação `GET` enviada: `/api/v1/core_workflows`

::: details

<<< @/fixtures/rest-api/core_workflows/get-res.json

:::

::: info
Este endpoint retorna apenas fluxos de trabalho com `changeable: true`. Os fluxos
de trabalho de sistema integrados ao Zammad não são alteráveis e não são incluídos, então
a resposta em uma instância nova é um array vazio. Show, Update e
Delete também operam apenas em fluxos de trabalho alteráveis.
:::

## Mostrar

Permissão necessária: `admin.core_workflow`

Solicitação `GET` enviada: `/api/v1/core_workflows/{id}`

::: details

<<< @/fixtures/rest-api/core_workflows/get-id-res.json

:::

::: details

<<< @/fixtures/rest-api/core_workflows/get-non-changeable-res.json

:::

## Criar

Permissão necessária: `admin.core_workflow`

Solicitação `POST` enviada: `/api/v1/core_workflows`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/core_workflows/post-req.json

=== Response

<<< @/fixtures/rest-api/core_workflows/post-res.json

:::

::::

::: info
O fluxo de trabalho principal _não_ valida se os campos referenciados em
`condition_selected` ou `perform` existem. Um fluxo de trabalho que referencia um
campo que ainda não existe é salvo sem erro. Ele não tem efeito visível
no formulário do ticket até que o campo referenciado exista.
:::

## Atualização

Permissão necessária: `admin.core_workflow`

Solicitação `PUT` enviada: `/api/v1/core_workflows/{id}`

O formato do payload é idêntico ao de Create. A resposta é o registro
atualizado, no mesmo formato de Show/Create.

::: info
Enviar o payload completo de Create para o `id` de um fluxo de trabalho existente atualiza
esse registro no lugar. Não cria uma duplicata.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/core_workflows/put-id-req.json

=== Response

<<< @/fixtures/rest-api/core_workflows/put-id-res.json

:::

::::

## Excluir

Permissão necessária: `admin.core_workflow`

::: danger
**Esta é uma remoção permanente**

Observe que remover fluxos de trabalho principais não pode ser desfeito.
:::

Solicitação `DELETE` enviada: `/api/v1/core_workflows/{id}`

::: details

<<< @/fixtures/rest-api/core_workflows/delete-id-res.json

:::
