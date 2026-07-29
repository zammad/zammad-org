---
order: 7
title: 'API GraphQL'
---

# API GraphQL

## Introdução

Além da [API REST](rest-api/intro) do Zammad, você também pode buscar,
manipular e criar dados via a poderosa e de código aberto [API
GraphQL](https://graphql.org/){target=_blank}.

Esta documentação não pretende cobrir tudo sobre o GraphQL. Ela deve dar a
você um entendimento básico sobre como buscar e criar/manipular dados para
construir a partir daí. Para um guia abrangente, consulte a [documentação do
GraphQL](https://graphql.org/learn/){target=_blank}.

O GraphQL é usado por muitos serviços web, até grandes. Ele se tornou uma
espécie de padrão da indústria por sua eficiência e recursos. Você pode
solicitar precisamente os dados que precisa, o que minimiza transferências
de dados desnecessárias e a busca da agulha no palheiro.

Buscar o schema GraphQL do Zammad (chamado de introspecção) permite
autocompletar e validação do lado do cliente ao escrever solicitações.

## Começando

Seguir as próximas etapas permite que você envie com sucesso uma solicitação
simples e receba dados do Zammad.

### Clientes

Para enviar solicitações e receber respostas, você precisa de um cliente de
API. Se você já lida com APIs, pule esta seção. Se você é novo no assunto,
procure um cliente que se encaixe nas suas necessidades. Dependendo do seu
sistema operacional, você pode ter opções diferentes. Alguns exemplos de
clientes populares com suporte a GraphQL são:

- [Bruno](https://www.usebruno.com/downloads){target=_blank}
- [Insomnia](https://insomnia.rest/download){target=_blank}
- [Postman](https://www.postman.com/downloads/){target=_blank}

### Autenticação

Se ainda não estiver presente, crie um [token no perfil do
Zammad](/pt_BR/documentation/use/user-profile#token-access) que deseja usar
como usuário de API. Dependendo do que você deseja fazer via API, defina as
permissões adequadamente.

Certifique-se de copiá-lo antes de fechar a caixa de diálogo, pois você não
pode visualizá-lo novamente. Caso algo dê errado, basta criar um novo token.

### Prepare your client

Abra seu cliente de API e configure-o.

- Adicione seu token do Zammad como token bearer.
- Crie uma solicitação e adicione seu domínio do Zammad com o sufixo
  `/graphql`, por exemplo, `https://fastlane.inc/graphql`.
- Busque o schema GraphQL do Zammad via introspecção ou carregue-o de um
  arquivo.

::: warning
A introspecção do schema é habilitada para o Zammad em ambiente de desenvolvimento. Para habilitá-la em sistemas de produção, defina
a variável de ambiente `ZAMMAD_GRAPHQL_INTROSPECTION` como `true`. Fazer isso aumenta a superfície de ataque potencial e
**não é recomendado**.
:::

### Create a request

Todas as solicitações e respostas estão em formato JSON. Isso significa que
todas as informações devem ser encapsuladas em chaves e ter uma estrutura
hierárquica.

Vamos dar uma olhada em uma solicitação para buscar informações do
Zammad. Essa solicitação começa com a string `query`, seguida de um objeto
que você deseja consultar.

Exemplo básico para buscar usuários com seu primeiro e último nome:

```gql :line-numbers
query userName (
  $userId: ID!
  ) {
  user(userId: $userId) {
    firstname
    lastname
  }
}
```

O `$userId` na linha 2 define uma variável usada como ID. Na seção de
variáveis do seu cliente, forneça o valor para ela. Neste exemplo, a seção
de variáveis se parece com isto:

```json
{
  "userId": "gid://zammad/User/2"
}
```

O valor acima está no formato de ID global da implementação GraphQL do
Zammad. Dependendo do tipo de objeto com o qual você deseja lidar, substitua
`User` por outro objeto, como `Ticket`, `Organization`, `Group`, etc. O
Zammad espera um valor numérico como ID.

Começando na linha 4 no bloco de código acima, está a solicitação real. Este
exemplo simples apenas busca os atributos `firstname` e `lastname` do
usuário com o ID 2.

Para criar ou alterar dados, substitua `query` por `mutation` no corpo da
solicitação.

## Exemplos

Os exemplos usam variáveis para os diferentes tipos de objeto. Certifique-se
de defini-la ao usar os exemplos.

:::: tabs

==== Ticket

::: tabs

=== Request

<<< @/fixtures/graphql/ticket-req.gql

=== Response

<<< @/fixtures/graphql/ticket-res.json

:::

==== User

::: tabs

=== Request

<<< @/fixtures/graphql/user-req.gql

=== Response

<<< @/fixtures/graphql/user-res.json

:::

==== Organization

::: tabs

=== Request

<<< @/fixtures/graphql/organization-req.gql

=== Response

<<< @/fixtures/graphql/organization-res.json

:::

::::

## Apêndice

### Global ids

::: info

Substitua o `{ID}` por um valor numérico.

:::

- `gid://zammad/Ticket/{ID}`
- `gid://zammad/User/{ID}`
- `gid://zammad/Organization/{ID}`
