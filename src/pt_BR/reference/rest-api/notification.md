---
order: 10
title: 'Notificação online'
---

# Notificação online

::: info
A disponibilidade de notificações depende muito das permissões do usuário
e das configurações de notificação escolhidas.

Observe que os melhores resultados são sempre obtidos com _Agentes_.
:::

## Listar

Permissão necessária: `any`

Solicitação `GET` enviada: `/api/v1/online_notifications?expand=true`

::: tip
Use a solicitação com expand para saber os objetos afetados. Caso contrário, você
precisará descobrir qual ID corresponde a qual tipo de objeto.
:::

::: details

<<< @/fixtures/rest-api/online_notifications/get-res.json

:::

## Mostrar

Permissão necessária: `any`

Solicitação `GET` enviada: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/get-id-res.json

:::

## Atualização

Permissão necessária: `any`

Solicitação `PUT` enviada: `/api/v1/online_notifications/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/online_notifications/put-id-req.json

=== Response

<<< @/fixtures/rest-api/online_notifications/put-id-res.json

:::
::::

## Excluir

Permissão necessária: `any`

Solicitação `DELETE` enviada: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/delete-id-res.json

:::

## Marcar tudo como lido

Permissão necessária: `any`

Solicitação `POST` enviada: `/api/v1/online_notifications/mark_all_as_read`

::: details

<<< @/fixtures/rest-api/online_notifications/mark_all_as_read/post-res.json

:::

## Clear all

Permissão necessária: `any`

`DELETE`-Request sent: `/api/v1/online_notifications/clear_all`

::: details

<<< @/fixtures/rest-api/online_notifications/clear_all/delete-res.json

:::
