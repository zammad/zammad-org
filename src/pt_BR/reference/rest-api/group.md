---
order: 6
title: Grupo
---

# Grupo

::: info

- Observe que `follow_up_possible` pode não funcionar como esperado. Os
  valores possíveis são `yes` ou `new_ticket`!
- Se você quiser criar ou atualizar **subgrupos**, use `::` como delimitador
  para os nomes. Você também precisa nomear a hierarquia completa no
  nome. Exemplo: `Sales::Europe::South`
:::

## Listar

Permissão necessária: `admin.group`

Solicitação `GET` enviada: `/api/v1/groups`

::: details

<<< @/fixtures/rest-api/groups/get-res.json

:::

## Mostrar

Permissão necessária: `admin.group`

Solicitação `GET` enviada: `/api/v1/groups/{id}`

::: details

<<< @/fixtures/rest-api/groups/get-id-res.json

:::

## Criar

Permissão necessária: `admin.group`

Solicitação `POST` enviada: `/api/v1/groups`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/post-req.json

=== Response

<<< @/fixtures/rest-api/groups/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.group`

Solicitação `PUT` enviada: `/api/v1/groups/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/put-id-req.json

=== Response

<<< @/fixtures/rest-api/groups/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `admin.group`

Solicitação `DELETE` enviada: `/api/v1/groups/{id}`

::: danger

**Esta é uma remoção permanente**:

Observe que remover grupos não pode ser desfeito.

Remover organizações com referências, por exemplo, em feeds de atividade ou
tickets, não é possível via API - isso será indicado por
`"error": "Can't delete, object has references."`. Isso _não_ é um bug.

Considere definir os grupos afetados como inativos, ou garanta mover
todos os tickets existentes para novos grupos.

:::

::: details

<<< @/fixtures/rest-api/groups/delete-id-res.json

:::
