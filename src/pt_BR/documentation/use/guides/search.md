---
order: 2
title: Pesquisar
---

# Pesquisar

No Zammad, você pode pesquisar praticamente todas as informações
disponíveis, como:

- Assunto e texto da mensagem
- Nomes e endereços de email
- Texto em anexos de arquivo
- Detalhes de usuários e organizações (como notas, nomes, etc.)

Dependendo do que você está pesquisando e da quantidade de dados na sua
instância do Zammad, você pode pesquisar de diferentes formas. Continue
lendo para conhecer os fundamentos de pesquisa, seguidos pela pesquisa
detalhada e o uso da sintaxe do Elasticsearch.

## Basic search

A pesquisa está localizada no canto superior esquerdo da navegação
principal. Selecione-a com o mouse ou use o atalho de teclado [[s]]. Depois
de ativada, você pode ver os tickets fechados recentemente na sua barra de
tarefas, assim como suas consultas de pesquisa recentes. Para pesquisar,
basta digitar um termo. A pesquisa então exibe todos os itens
correspondentes para os quais você tem pelo menos permissão de visualização
ou leitura, agrupados por tipo, como usuários e tickets. Selecionar um
desses resultados abre o item como aba na barra de tarefas.

![Captura de tela mostra os resultados da pesquisa na navegação
principal](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

Se você pressionar [[enter]] ou clicar em `detailed search`, o Zammad abre a
pesquisa detalhada como uma aba na navegação principal. Ali você pode
restringir sua pesquisa selecionando um tipo de objeto específico (por
exemplo, organização), usar filtros avançados ou até usar a sintaxe do
Elasticsearch. Continue lendo para mais informações.

## Detailed search

Às vezes, um termo de pesquisa simples pode não fornecer os resultados que
você está procurando. O Zammad oferece diferentes opções para restringir a
pesquisa na página de pesquisa detalhada.

![Captura de tela mostra a pesquisa
detalhada](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Sort the results

Para ordenar os resultados com base nos valores da coluna, clique em um
cabeçalho de coluna. A ordenação é indicada por uma seta. Clique na coluna
novamente para alternar a ordenação de crescente para decrescente e
vice-versa.

### Limit search to object type

Limite a pesquisa a um tipo de objeto usando o seletor de abas **Search
entity** abaixo do campo de pesquisa (por exemplo, usuário ou ticket). Isso
limita a pesquisa ao tipo de objeto selecionado e seus dados
relacionados. Por exemplo, ao selecionar **Ticket**, a pesquisa também
retorna tickets onde o responsável ou cliente corresponde ao termo de
pesquisa.

### Use advanced filters
<!--Screenshot skipped for now. Will be added after more attributes are available-->
Em comparação com o campo de pesquisa, você pode filtrar os resultados da pesquisa com base em atributos específicos e seus valores.
Para isso, clique no botão `Advanced filters` no lado direito, que abre uma área onde você pode especificar condições
adicionais com base em atributos específicos e seus valores. Escolha um atributo e informe ou selecione um valor que os
resultados da pesquisa devem corresponder. Cada atributo está disponível apenas uma vez. Ao usar mais de um filtro, esteja ciente de que
todos precisam ser atendidos, pois são conectados logicamente por um operador AND. Isso também se aplica ao termo de pesquisa
no campo de pesquisa principal.

Remova um único filtro clicando no ::x:: ao lado do campo de valor. Para
remover todos os filtros, clique no `x` na barra de pesquisa principal no
topo, ao lado do rótulo `x filter(s)`.

Caso você queira armazenar ou compartilhar seu filtro, pode fazer isso
copiando a URL. Ela inclui o filtro completo. Esteja ciente de que os
resultados da pesquisa podem ser diferentes para outros usuários devido a
permissões divergentes.

Se você ainda não encontrou o que procura, pode se beneficiar do fato de a
pesquisa ser alimentada pelo Elasticsearch. Você pode encontrar alguns
exemplos na próxima seção.

## Using Elasticsearch syntax

Este tópico tem sua própria seção porque é um tópico avançado para usuários
avançados. Usando a sintaxe do Elasticsearch, você pode filtrar exatamente
seus dados por valores de atributo específicos. Basicamente, todos os
atributos indexados são suportados. Continue lendo para encontrar exemplos
de como usá-lo, ou acesse a [página de atributos indexados pelo
Elasticsearch](/pt_BR/reference/es-indexed-attributes), onde você encontra
uma lista com atributos adicionais.

### Important information

- Certifique-se de selecionar o objeto relevante no seletor **Search
  entity**. Por exemplo, `customer.lastname` está disponível para tickets,
  mas não para usuários.
- Ao combinar uma consulta do Elasticsearch com filtros avançados, esteja
  ciente de que todas as condições dos filtros avançados e a sintaxe de
  pesquisa são conectadas logicamente por AND, então apenas os resultados
  que correspondem a todas as condições dos filtros avançados e ao seu termo
  de pesquisa serão exibidos.
- Para fornecer valores contendo um espaço, envolva-os em `"`, por exemplo,
  `priority.name:"2 normal"`.

### Logic operators and ranges

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

### Fuzzy search

Se você não tem certeza sobre a grafia exata de um valor, use o til (`~`)
como sufixo para realizar uma pesquisa aproximada.

```plain
owner.firstname:lawren~
```

### Negating search

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
