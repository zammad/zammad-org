---
order: 2
title: Pesquisar
---

# Pesquisar

In Zammad, you can search for all available information like:

- Assunto e texto da mensagem
- Nomes e endereços de email
- Texto em anexos de arquivo
- User and organization details (like notes, names, etc.)

Dependendo do que você está pesquisando e da quantidade de dados na sua
instância do Zammad, você pode pesquisar de diferentes formas. Continue
lendo para conhecer os fundamentos de pesquisa, seguidos pela pesquisa
detalhada e o uso da sintaxe do Elasticsearch.

## Pesquisa básica

The search is located in the top left corner of the primary
navigation. Either select it via mouse or use the keyboard shortcut
[[s]]. After activation, you can see the tickets that were recently closed
from your taskbar as well as your recent search queries. To search, simply
type a term. The search then displays all matching items for which you have
at least view or read permissions, grouped by type like users and
tickets. Selecting one of those results opens the item as tab in the
taskbar.

Searching for a term also matches any values that begin with it. For
example, searching for `brooks` also finds values like `brookster`. This
does not apply when you use an attribute notation like
`owner.lastname:brooks` (described in the [Elasticsearch
syntax](#using-elasticsearch-syntax) section below), which matches exact
values only.

![Screenshot shows search results in the
taskbar](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

If you press [[enter]] or click on `detailed search`, Zammad opens the
detailed search as a tab in the taskbar. There you can narrow down your
search by selecting a specific object type (e.g. organization), using
advanced filters or even using Elasticsearch syntax. Read on for more
information.

## Pesquisa detalhada

Às vezes, um termo de pesquisa simples pode não fornecer os resultados que
você está procurando. O Zammad oferece diferentes opções para restringir a
pesquisa na página de pesquisa detalhada.

Advanced filters are not available for customer accounts. If your account
has customer permissions only, the **Search entity** selector and the
advanced filter options described below are not shown.

![Captura de tela mostra a pesquisa
detalhada](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Ordenar os resultados

Para ordenar os resultados com base nos valores da coluna, clique em um
cabeçalho de coluna. A ordenação é indicada por uma seta. Clique na coluna
novamente para alternar a ordenação de crescente para decrescente e
vice-versa.

### Limitar a pesquisa a um tipo de objeto

Limite a pesquisa a um tipo de objeto usando o seletor de abas **Search
entity** abaixo do campo de pesquisa (por exemplo, usuário ou ticket). Isso
limita a pesquisa ao tipo de objeto selecionado e seus dados
relacionados. Por exemplo, ao selecionar **Ticket**, a pesquisa também
retorna tickets onde o responsável ou cliente corresponde ao termo de
pesquisa.

### Usar filtros avançados

Unlike the search field, you can filter the search results based on specific
attributes and their values.  To do so, click on the `Advanced filters`
button on the right side, which opens an area where you can specify
additional conditions based on specific attributes and their values. Choose
an attribute and enter or select a value to match against. When using more
than one filter, all conditions must be met; they are logically connected by
AND. This also applies to the search term in the main search field.

Remove a single filter by hovering over it and clicking the ::x:: that
appears next to the value field. To remove all filters, click the `x` in the
main search bar at the top next to the `x filter(s)` label and confirm the
removal.

To add another filter, click `Add filter` below or between the existing
filter rows and pick an attribute from the selection list. The list only
offers attributes that are not used by any filter yet, so each attribute can
be used only once.

Caso você queira armazenar ou compartilhar seu filtro, pode fazer isso
copiando a URL. Ela inclui o filtro completo. Esteja ciente de que os
resultados da pesquisa podem ser diferentes para outros usuários devido a
permissões divergentes.

Se você ainda não encontrou o que procura, pode se beneficiar do fato de a
pesquisa ser alimentada pelo Elasticsearch. Você pode encontrar alguns
exemplos na próxima seção.

## Usando a sintaxe do Elasticsearch

This is an advanced topic for power users. By using Elasticsearch syntax,
you can exactly filter your data for specific attribute values. All indexed
attributes are supported. Read on to find examples of how to use it or head
over to the [indexed attributes by Elasticsearch
page](/en/reference/es-indexed-attributes) where you can find a list with
additional attributes.

### Informações importantes

- Certifique-se de selecionar o objeto relevante no seletor **Search
  entity**. Por exemplo, `customer.lastname` está disponível para tickets,
  mas não para usuários.
- Multiple search terms are combined by a logical AND by default, so `smith
  open` only finds results containing both terms. Use an explicit `OR` if
  you want either of them.
- Ao combinar uma consulta do Elasticsearch com filtros avançados, esteja
  ciente de que todas as condições dos filtros avançados e a sintaxe de
  pesquisa são conectadas logicamente por AND, então apenas os resultados
  que correspondem a todas as condições dos filtros avançados e ao seu termo
  de pesquisa serão exibidos.
- Para fornecer valores contendo um espaço, envolva-os em `"`, por exemplo,
  `priority.name:"2 normal"`.

### Operadores lógicos e intervalos

Você pode combinar condições usando `AND` e `OR` como operadores
lógicos. Use `TO` para especificar intervalos para valores com uma ordem
(por exemplo, inteiro ou data). Inclua um limite do intervalo especificado
usando colchetes. Exclua-o usando chaves. Você pode até combinar esses
colchetes, por exemplo, para incluir o limite inferior e excluir o limite
superior. Termos aninhados podem ser obtidos separando-os com parênteses
`()`.

`AND` e `OR` com parênteses:

```plain
owner.lastname:brooks AND tags:(internal OR onboarding)
```

`TO` com curinga de asterisco:

```plain
state.name:open AND article_count: [5 TO *]
```

`TO` excluindo um limite do intervalo:

```plain
article.created_at:[2025-03-21 TO 2026-05-19}
```

### Pesquisa aproximada (fuzzy)

Se você não tem certeza sobre a grafia exata de um valor, use o til (`~`)
como sufixo para realizar uma pesquisa aproximada.

```plain
owner.firstname:lawren~
```

### Negando pesquisa

Se você quiser excluir valores especificados, pode usar a negação `!`. Para
negar mais de um termo, use parênteses para todos eles.

Excluir responsável com sobrenome "brooks":

```plain
!owner.lastname:brooks
```

Excluir múltiplas condições:

```plain
owner.lastname:brooks AND !(tags:internal OR tags:onboarding)
```

### Regex

Você pode até usar regex para pesquisar. Envolva o termo regex em `/`.

```plain
customer.lastname:/(bra?.n|doe)/
```
