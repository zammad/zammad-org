---
order: 14
title: 'Função (Role)'
---

# Papéis

## Listar

Permissão necessária: `admin.role`

Solicitação `GET` enviada: `/api/v1/roles`

::: details

<<< @/fixtures/rest-api/roles/get-res.json

:::

## Mostrar

Permissão necessária: `admin.role`

Solicitação `GET` enviada: `/api/v1/roles/{id}`

::: details

<<< @/fixtures/rest-api/roles/get-id-res.json

:::

## Criar

Permissão necessária: `admin.role`

Solicitação `POST` enviada: `/api/v1/roles`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/post-req.json

=== Response

<<< @/fixtures/rest-api/roles/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.role`

Solicitação `PUT` enviada: `/api/v1/roles/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/put-id-req.json

=== Response

<<< @/fixtures/rest-api/roles/put-id-res.json

:::
::::
