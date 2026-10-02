---
order: 10
title: 'Perfil de relatório'
---

# Perfil de relatório

::: info
Um perfil de relatório é um filtro/condição salvo e reutilizável para o módulo de
relatórios do Zammad. Ele não é uma automação e não faz nada por
si só. É uma condição nomeada que aparece como uma visualização selecionável ao
gerar relatórios com o recurso de relatórios do Zammad, restrita às
funções (`role_ids`) que podem vê-la.

Compare com os [fluxos de trabalho principais](/pt_BR/reference/rest-api/core-workflow), que
usam um objeto de condição de formato semelhante, mas não validam os campos
referenciados.
:::

## Listar

Permissão necessária: `admin.report_profile`

Solicitação `GET` enviada: `/api/v1/report_profiles`

::: details

<<< @/fixtures/rest-api/report_profiles/get-res.json

:::

::: info
A lista retorna o registro completo de cada perfil, com o mesmo conjunto de campos da
resposta de Show abaixo. A entrada `1` (`-all-`) é o perfil padrão
integrado ao Zammad.
:::

## Mostrar

Permissão necessária: `admin.report_profile`

Solicitação `GET` enviada: `/api/v1/report_profiles/{id}`

::: details

<<< @/fixtures/rest-api/report_profiles/get-id-res.json

:::

## Criar

Permissão necessária: `admin.report_profile`

Solicitação `POST` enviada: `/api/v1/report_profiles`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/report_profiles/post-req.json

=== Response

<<< @/fixtures/rest-api/report_profiles/post-res.json

:::

::::

::: info
Os IDs de funções não são garantidamente os mesmos entre instâncias. Consulte primeiro os
IDs das funções de que você precisa pela [API de funções](/pt_BR/reference/rest-api/role)
em vez de fixá-los no código.
:::

:::: info
Diferente dos fluxos de trabalho principais, a `condition` de um perfil de relatório _valida_
que os campos referenciados são campos de ticket reais e totalmente migrados.
Referenciar um campo personalizado que existe, mas cuja migração de schema ainda não
terminou (`to_create`/`to_migrate` ainda `true` nesse campo), falha
com:

::: details

<<< @/fixtures/rest-api/report_profiles/post-invalid-condition-res.json

:::
::::

## Atualização

Permissão necessária: `admin.report_profile`

Solicitação `PUT` enviada: `/api/v1/report_profiles/{id}`

O formato do payload é idêntico ao de Create. A resposta é o registro
atualizado, no mesmo formato da resposta de Create.

::: info
Enviar o payload completo de Create para o `id` de um perfil existente atualiza
esse registro no lugar. Não cria uma duplicata.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/report_profiles/put-id-req.json

=== Response

<<< @/fixtures/rest-api/report_profiles/put-id-res.json

:::

::::

## Excluir

Permissão necessária: `admin.report_profile`

::: danger
**Esta é uma remoção permanente**

Observe que remover perfis de relatório não pode ser desfeito.
:::

Solicitação `DELETE` enviada: `/api/v1/report_profiles/{id}`

::: details

<<< @/fixtures/rest-api/report_profiles/delete-id-res.json

:::
