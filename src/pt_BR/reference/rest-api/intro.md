---
order: 1
title: Introdução
---

# Introdução

O Zammad oferece uma poderosa API REST[^1], que permite todas as operações
também disponíveis via interface.

Esta página dá uma primeira impressão sobre coisas que geralmente valem para
todos os endpoints e como se adaptar.

## Clientes de API

Há clientes de API disponíveis. Observe que esses clientes podem não
fornecer acesso a todos os endpoints disponíveis listados aqui.

- [Cliente
  Ruby](https://github.com/zammad/zammad-api-client-ruby){target=_blank}
  (oficial)
- [Cliente
  PHP](https://github.com/zammad/zammad-api-client-php){target=_blank}
  (oficial)
- [Cliente Python](https://pypi.org/project/zammad-py/){target=_blank}
  (terceiros)
- [Cliente .NET](https://github.com/Asesjix/Zammad-Client){target=_blank}
  (terceiros)
- [Cliente de API
  Android](https://github.com/KirkBushman/zammad-android){target=_blank}
  (terceiros)
- [Cliente Go](https://github.com/AlessandroSechi/zammad-go){target=_blank}
  (terceiros; apenas cliente de API, sem app "pronto para uso")

## Autenticação

O Zammad suporta três métodos diferentes de autenticação para sua API.

### Autenticação HTTP Basic (usuário/senha)

O usuário/senha deve ser fornecido como cabeçalho HTTP na chamada HTTP. Esse
método de autenticação pode ser desativado e pode não estar disponível no
seu sistema.

```sh
curl -u {username}:{password} https://{fqdn}/{endpoint}
```

::: warning
Recomendamos fortemente contra o uso de autenticação básica. Use tokens
de acesso sempre que possível!
:::

### Autenticação HTTP Token (token de acesso)

O token de acesso deve ser fornecido como cabeçalho HTTP na chamada
HTTP. Cada usuário pode criar vários tokens de acesso em suas preferências
de usuário. Esse método de autenticação pode ser desativado e pode não estar
disponível no seu sistema.

```sh
curl -H "Authorization: Token token={your_token}" https://{fqdn}/{endpoint}
```

### OAuth2 (acesso por token)

O token deve ser fornecido como cabeçalho HTTP nas suas chamadas. Isso
permite que aplicações de terceiros se autentiquem no Zammad.

```sh
curl -H "Authorization: Bearer {your_token}" https://{fqdn}/{endpoint}
```

## Endpoints e dados de exemplo

Para simplificar, não forneceremos comandos específicos nas próximas
páginas, mas em vez disso indicaremos o método de chamada possível (por
exemplo, `GET`) e o endpoint a usar (por exemplo, `/api/v1/users`). Caso o
Zammad espere informações dentro dessas URLs de endpoint, vamos colocá-las
entre chaves assim: `/api/v1/users/{user id}`

O formato de resposta será uma resposta JSON completa de uma instância
padrão do Zammad. Tenha em mente que você pode ver mais campos ou
informações gerais caso tenha adicionado objetos ou outras informações.

## Tipo de conteúdo

O Zammad retorna payloads JSON sempre que você recupera dados. Se você for
fornecer dados, independentemente do tipo geral de solicitação, não esqueça
de fornecer também o tipo de conteúdo `application/json`.

## Payloads de resposta (expandir)

O Zammad sempre retorna informações incluindo dicas para todas as
relações. Se você precisar de mais informações que isso (porque os IDs podem
não ser suficientes), você também pode estender suas chamadas de endpoint
com `?expand=true`.

Essa opção fornecerá ainda mais informações - pelo menos relações nomeadas,
além das de ID. Abaixo você encontra dois exemplos, um para ticket e um para
usuário:

**Payload de usuário:**

:::: details
::: tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-user-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-user-expand-false-res.json

:::
::::

**Payload de ticket:**

:::: details
::: tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-ticket-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-ticket-expand-false-res.json

:::
::::

::: tip
Observe que Core Workflows podem restringir o acesso a atributos ou
valores.
:::

## Paginação

Como o Zammad limita o número de objetos retornados por motivos de
desempenho, você pode precisar usar paginação em alguns pontos.

::: info
**Número de objetos retornados:** o Zammad tem limites rígidos para o
máximo de objetos retornados. Você não pode aumentar esses limites.

**Número total de objetos a retornar:** o Zammad não fornece uma contagem total de
objetos disponíveis para sua consulta, a menos que você solicite explicitamente. Para incluir
a quantidade de resultados de pesquisa, use o parâmetro `with_total_count` ou
`only_total_count`.
:::

To use pagination you'll need two get options: `per_page` and
`page`. Combine them to receive 5 results from the first result page:
`?page=1&per_page=5` - increase page count to get more results.

## Pesquisar via API

### Pesquisa de endpoint

Alguns endpoints suportam uma consulta de pesquisa. São eles:

- [Audit Log](audit-log)
- [Groups](group)
- [Organizations](organization)
- [Roles](role)
- [Tickets](ticket)
- [Users](user)

Os seguintes endpoints também suportam uma consulta de pesquisa, mas não são
explicitamente cobertos nesta documentação:

- Sessões de chat
- Base de conhecimento
- Macros
- Visão geral
- Modelos
- Módulo de texto

#### Exemplo de pesquisa

Solicitação `GET` enviada: `/api/v1/tickets/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-basic-search-res.json
:::

#### Parâmetro Expand

Se você quiser ter informações relacionadas adicionais, pode usar o
parâmetro `expand`. Usá-lo resolve os IDs e exibe valores/nomes
adicionalmente.

Solicitação `GET` enviada:
`/api/v1/tickets/search?query=welcome&expand=true`

::: details
<<< @/fixtures/rest-api/intro/get-expand-search-res.json
:::

#### Parâmetro Full

Você pode até estender a resposta usando o parâmetro `full`. Esteja ciente
de que essa resposta pode ser enorme. Ela exibe todos os ativos, incluindo
atributos relacionados e também um `total_count` dos resultados da pesquisa.

Solicitação `GET` enviada: `/api/v1/tickets/search?query=welcome&full=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-res.json
:::

#### Parâmetro With Total Count

Usar esse parâmetro exibirá adicionalmente a quantidade de resultados da
pesquisa. Pode ser combinado com `full` e `expand`.

Solicitação `GET` enviada:
`/api/v1/tickets/search?query=welcome&full=true&with_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-with-total-count-res.json
:::

#### Parâmetro Only Total Count

Usar esse parâmetro `only_total_count` exibirá apenas a quantidade de
resultados da pesquisa.

Solicitação `GET` enviada:
`/api/v1/tickets/search?query=welcome&only_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-total-count-res.json
:::

### Pesquisa global

Se você precisar pesquisar não apenas em um tipo de objeto específico, pode
fazer isso usando a pesquisa global sem especificar um objeto. A resposta
pode incluir usuários, tickets, organizações, artigos e respostas da base de
conhecimento e chats, dependendo do seu sistema e conteúdo. Essa pesquisa
global se comporta como a pesquisa na interface do Zammad, na barra de
tarefas esquerda. Os parâmetros disponíveis são diferentes dos usados na
pesquisa de endpoint.

Solicitação `GET` enviada: `/api/v1/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-global-search-res.json
:::

### Pesquisa baseada em condição

Você pode até usar condições, como para gatilhos e agendadores, para
pesquisar via API. Se você não quiser construir tais condições manualmente,
encontra abaixo uma dica de como construir rapidamente uma estrutura de
condição via interface e buscá-la para sua solicitação de API.

Então, como faço para construir uma solicitação baseada em condição?

- No Zammad, vá até a interface de administração e crie uma condição, por
  exemplo, criando uma nova visão geral ou gatilho. Ela pode ser inativa,
  para que você não tenha ações ou alterações indesejadas.
- Vá até o `console Rails </admin/console>`, seja usando `rails c`/`zammad
  run rails c`, ou adicionando o prefixo `rails r`/`zammad run rails r`
  antes dos comandos abaixo, dependendo da sua configuração.
- Procure pela condição criada, ajuste os exemplos a seguir conforme
  necessário:

``` ruby
puts Overview.find_by(name: 'My test overview').attributes.slice('condition').to_json
```

``` ruby
puts Trigger.find_by(name: 'My new test trigger').attributes.slice('condition').to_json
```

Isso resulta em uma saída como a seguinte:

::: details
<<< @/fixtures/rest-api/intro/condition-based-search.json
:::

Use isso como payload na sua solicitação `POST` em uma pesquisa de
endpoint. A resposta inclui os mesmos objetos que o gatilho ou visão geral
que você criou.

## Ordenando resultados de pesquisa

O Zammad permite ordenar seus resultados de pesquisa por campo, se
necessário.

### `sort_by`

Adicione `?sort_by={row name}` à sua consulta para ordenar por uma coluna
específica que aparece no resultado da pesquisa.

### `order_by`

Adicione `?order_by={direction}` à sua consulta para alternar entre ordem
crescente e decrescente.

As direções são: `asc` e `desc`.

::: tip
Geralmente você vai querer combinar ambos os parâmetros nas suas pesquisas -
por exemplo: `?query={search string}&sort_by={row name}&order_by={direction}`
:::

## Ações em nome de outros usuários

**Requisito:** o usuário usado para executar a consulta em nome de outro precisa
da permissão `admin.user`.

Executar consultas de API em nome de outros usuários permite, por exemplo,
criar tickets em nome de outro usuário.

Para fazer isso, adicione um novo cabeçalho HTTP chamado `From` à sua
solicitação. O valor desse cabeçalho pode ser um dos seguintes:

- ID do usuário
- login do usuário
- email do usuário

`From` está disponível para todos os endpoints.

## Codificação

A API espera codificação UTF-8. Tenha em mente que, especialmente ao usar
URLs com opções get (por exemplo, `?query=this`), você pode precisar
codificar sua URL adequadamente.

Se você quiser saber mais sobre codificação de URL, [este artigo da
Wikipédia](https://en.wikipedia.org/wiki/Percent-encoding){target=_blank}
pode ajudar

[^1]: **Re**presentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**nterface)
