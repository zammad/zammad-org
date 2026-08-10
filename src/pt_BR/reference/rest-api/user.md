---
order: 22
title: User
---

# User

::: info
Observe que os exemplos abaixo foram fornecidos com permissões `admin` e
`ticket.agent`. Alguns atributos/informações podem não estar
disponíveis em situações específicas.
:::

## Eu - usuário atual

Permissão necessária: any

Solicitação `GET` enviada: `/api/v1/users/me`

::: details

<<< @/fixtures/rest-api/users/me/get-res.json

:::

## Listar

Permissão necessária: `ticket.agent` **ou** `admin.user`

Solicitação `GET` enviada: `/api/v1/users`

::: details

<<< @/fixtures/rest-api/users/get-res.json

:::

## Mostrar

Permissão necessária: `ticket.agent` **ou** `admin.user` **ou**
`ticket.customer` (organização compartilhada)

::: info
Tecnicamente, quaisquer listagens retornarão apenas as informações do próprio usuário.
:::

Solicitação `GET` enviada: `/api/v1/users/{id}`

::: details

<<< @/fixtures/rest-api/users/get-user-id-res.json

:::

## Criar

Permissão necessária: `admin.user` **ou** `ticket.agent`

Solicitação `POST` enviada: `/api/v1/users`

::: tip
**Isso depende das permissões**

Agentes não podem definir senhas, funções ou permissões de grupo de usuário. Em vez disso,
o Zammad aplicará a função padrão de cadastro. Verifique a interface de administração do Zammad
em _Manage > Roles_ e veja qual está selecionada como **Default at signup**.

Tecnicamente, a criação de usuário não autenticada é possível, se você conseguir
fornecer o token CSRF necessário (fora do escopo desta
documentação). Se você não quiser isso, considere
desativar o registro de usuários em _Settings > Security > Base_, definindo
**New user accounts** como no.
:::

::: tip
Não tem certeza de quais atributos você pode usar ou definir? Execute uma consulta GET em
qualquer usuário adequado já existente na sua instância.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/post-req.json

=== Response

<<< @/fixtures/rest-api/users/post-res.json

:::
::::

## Atualização

Permissão necessária: `admin.user` **ou** `ticket.agent`

Solicitação `PUT` enviada: `/api/v1/users/{id}`

::: tip
**Isso depende das permissões**

Agentes não podem definir senhas, funções ou permissões de grupo de usuário. Em vez disso,
o Zammad aplicará a função padrão de cadastro. Verifique a interface de administração do Zammad
em _Manage > Roles_ e veja qual está selecionada como **Default at signup**.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/put-id-req.json

=== Response

<<< @/fixtures/rest-api/users/put-id-res.json

:::
::::

## Excluir

::: danger
**Esta é uma remoção permanente**

Observe que remover usuários não pode ser desfeito. O Zammad também
removerá referências - portanto, possivelmente tickets!
:::

Tecnicamente, você pode excluir usuários via `/api/v1/users/{id}`. No
entanto, recomendamos fortemente que você use a privacidade de dados na
interface do Zammad ou o endpoint de privacidade de dados em vez disso (veja
a seção abaixo). Usar um deles garante que informações relacionadas, como
tickets, também sejam excluídas.

### Via endpoint de privacidade de dados

Permissão necessária: `admin.data_privacy`

Solicitação `POST` enviada: `/api/v1/data_privacy_task`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/post-privacy-task-req.json

=== Response

<<< @/fixtures/rest-api/users/post-privacy-task-res.json

:::
::::

### Via endpoint de usuário <Badge type="danger" text="not recommended" />

Permissão necessária: `admin.user`

Solicitação `DELETE` enviada: `/api/v1/users/{id}`

::: details

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
