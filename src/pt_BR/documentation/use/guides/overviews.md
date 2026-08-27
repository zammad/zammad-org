---
order: 1
title: 'Visões gerais'
---

# Visões gerais

![Captura de tela mostra a seção de visão geral
aberta](/screenshots/cypress/documentation/use/guide-overview.cy.js/overview-full.png)

## Introdução

As visões gerais são um componente central do Zammad. Abra-as clicando no
botão `Overviews` na navegação principal ou use o atalho de teclado
[[o]]. Você pode pensar nas visões gerais como um tipo de caixa de entrada
de email com diferentes pastas. Use-as para encontrar novos tickets que você
deseja processar e para acompanhar os tickets que ainda não foram
concluídos.

Dependendo da configuração do seu sistema e do que seu administrador do
Zammad configurou, você pode encontrar diferentes visões gerais ali, por
exemplo:

- Seus tickets atribuídos
- Tickets não atribuídos e abertos
- Tickets com tempo pendente atingido
- Tickets escalonados

Selecionar uma visão geral na navegação de segundo nível mostra uma tabela
que inclui os tickets correspondentes.

## Uso e recursos

As visões gerais podem ser definidas pelos administradores com base em
regras e condições. Isso significa que, se um ticket foi alterado e a
condição da visão geral não corresponde mais, o ticket não fica mais visível
nessa visão geral.

Overviews are updated automatically. You don't have to reload your browser
to observe changes. You can adjust the order temporarily by clicking on one
of the column headers and change their width by dragging the column
dividers.  The order is only preserved until you switch to another overview
or reload the page.

Para cada visão geral, você encontra um selo anexado. O número nesse selo
informa quantos tickets há em cada visão geral.

As listas de tickets nas visões gerais também podem ser agrupadas por um
atributo específico (por exemplo, cliente, organização, responsável). Isso
precisa ser ajustado pelo seu administrador do Zammad. Se um agrupamento
estiver ativado, você também encontra um selo com um contador dos tickets
incluídos ali.

Dependendo do que você está procurando, selecione uma visão geral adequada e
comece a trabalhar em um ticket.

::: tip
Se você sentir falta de uma visão geral ou quiser configurações diferentes, avise seu administrador do Zammad!
:::

### Estado e prioridade com código de cores

Para visualizar diferentes estados e prioridades de ticket, as entradas na
tabela têm código de cores.

O ícone ao lado do título do ticket representa principalmente a necessidade
de ação:

![Captura de tela mostra os estados de
ticket](/screenshots/documentation/use/overviews/states.png)

- Círculo amarelo: ação necessária (por exemplo, novo, aberto, pendência
  atingida)
- Círculo cinza: pausado, nenhuma ação necessária no momento (por exemplo,
  pendente)
- Círculo verde: nenhuma ação mais necessária (por exemplo, fechado,
  mesclado)
- Triângulo vermelho: ação imediata necessária (ticket escalonado devido a
  uma violação de SLA)

Se você notar um círculo com gradiente azul/rosa, isso indica que um [agente
de IA](ai#ai-agents) está atualmente trabalhando no ticket.

A **prioridade** é representada pela cor do título do ticket:

![Captura de tela mostra prioridades de
ticket](/screenshots/documentation/use/overviews/priorities.png)

- 1 baixa: cinza
- 2 normal: azul
- 3 alta: vermelho

### Abrir um ticket

Abra um ticket simplesmente clicando na linha. Isso abre o ticket como uma
aba na sua barra de tarefas e mostra a visualização de detalhes do
ticket. Se esse ticket já estiver presente na sua barra de tarefas, ele
ativa essa aba em vez de abrir uma aba duplicada.

Se uma visão geral contém mais de um ticket e você abre um dos tickets, você
encontra setas no cabeçalho da visualização de detalhes do ticket para
alternar para o próximo/anterior ticket dessa visão geral.

### Ações em massa

Execute ações em massa selecionando vários tickets e usando o painel
flutuante de ação em massa ou arrastando-os com o mouse para acionar a
sobreposição de ação em massa. Você encontra mais informações sobre isso na
seção [Ações em massa](../advanced-features#bulk-actions) na página de
recursos avançados.

### Reordenar visões gerais

Se a ordem das visões gerais não refletir seu processo de trabalho, ou você
simplesmente prefira uma ordem diferente, você pode reorganizá-las para sua
conta. Use o botão `reorder items` bem no topo da navegação de segundo
nível, que abre as [configurações do seu
perfil](/pt_BR/documentation/use/user-profile#overviews), onde você pode
definir uma ordem personalizada para suas visões gerais. Para alterar a
ordem, basta arrastar e soltar usando as alças no lado esquerdo.

Se o seu administrador alterar a ordem, sua ordem personalizada é
preservada. Você pode voltar à ordem do administrador clicando no botão
`Reset Overview Order`.
