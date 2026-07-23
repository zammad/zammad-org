---
order: 1
title: 'Interface do Zammad'
---

# Interface do Zammad

A interface do usuário (UI) do Zammad foi projetada para oferecer uma
experiência intuitiva aos usuários. Ela é construída em torno do conceito de
simplicidade, clareza e acessibilidade, e é baseada em princípios comuns de
design de software, o que deve tornar a UI bastante autoexplicativa.

Há componentes modulares básicos para diferentes recursos, para manter a UI
consistente. Esses componentes são descritos nas seções abaixo. Dependendo
da tela atualmente aberta, há componentes interativos, como dicas de
ferramentas e ajuda contextual. Use-os sempre que necessário.

![Captura de tela mostra a visualização de detalhes do
ticket](/screenshots/cypress/documentation/use/basics-zammad-ui.cy.js/zammad-ui-full.png)

## Principais elementos da UI

A captura de tela acima mostra uma visualização de detalhes do ticket no
Zammad. Continue lendo para uma descrição dos diferentes elementos
principais do Zammad.

Primary Navigation
: esta é toda a barra lateral esquerda, que inclui a pesquisa, notificações, visões gerais, a barra de tarefas, seu avatar, o
  botão de criar ticket e talvez mais, dependendo do seu sistema (veja a próxima seção).

Ticket Detail View
: é aqui que você lida com as solicitações dos seus clientes. Aparece no conteúdo principal, no meio da tela, quando uma
  aba de ticket é selecionada na barra lateral de navegação.

Sidebar
: esta é a barra lateral direita na visualização de detalhes do ticket. Contém abas de barra lateral como clientes e checklists e
  exibe a aba atualmente selecionada.

## Navegação principal

A barra lateral de navegação principal é o seu local central para acessar
todas as principais partes do Zammad. Você pode não ver todas elas, pois
algumas dependem da configuração do seu Zammad. A barra lateral de navegação
está sempre visível. Isso significa que, se você não souber onde está,
sempre pode voltar ao painel, suas visões gerais ou um ticket aberto, por
exemplo.

Search and Notification Area
: inclui a pesquisa, onde você pode pesquisar usuários, organizações, tickets e basicamente qualquer informação disponível no
  Zammad. Ao lado da pesquisa, você encontra o logo do Zammad. Caso haja uma notificação, ele mostra um selo
  com uma contagem de quantas notificações você tem.

Navigation Tabs
: permite que você mude para diferentes telas do Zammad, como o painel, visões gerais, base de conhecimento ou tela de telefone,
  dependendo do seu sistema.

Taskbar Tabs
: você encontra abas para seus tickets, usuários, organizações abertos e a pesquisa detalhada na barra de tarefas. Então, se você
  ler sobre uma aba de usuário, isso significa uma aba de usuário aberta na sua barra lateral.

Bottom Bar
: configurações de perfil e botão de criar novo ticket. Caso você tenha permissões adicionais, também pode haver um botão de configurações e
  um botão de relatórios.

O Zammad salva imediatamente seu progresso de trabalho atual, para que você
possa alternar facilmente entre as diferentes áreas do Zammad e não precise
se preocupar em perder dados, como uma resposta ainda não enviada em um
ticket.

## Barra lateral

A barra lateral direita na visualização de detalhes do ticket contém
diferentes abas de barra lateral, como **Ticket**, **Customer** e
**Checklist**, dependendo do estado do ticket, do cliente e da configuração
do seu Zammad. Alterne entre essas abas de barra lateral clicando no ícone
correspondente no lado direito da barra lateral.

<!-- markdownlint-disable MD007 -->

Ticket Tab
: essa aba mostra as informações do ticket, como responsável, grupo, prioridade e estado, e permite que você edite esses valores.
  Além disso, as seguintes ações estão disponíveis ao clicar no botão ::a:: na seção superior:

  - History: mostra uma caixa de diálogo com o histórico do ticket atual. É
    aqui que você pode encontrar quando e quais ações foram realizadas e por
    quem.
  - Merge: mescla o ticket com outro, caso um cliente tenha enviado vários
    emails sobre o mesmo assunto.
  - Change customer: define outro cliente para o ticket.

Customer Tab
: veja os detalhes do cliente, incluindo uma referência aos outros tickets do cliente. Você também pode alterar o cliente do ticket aqui,
  clicando no botão ::a:: na seção superior.

Organization Tab
: essa aba só é exibida se o cliente for membro de uma organização. Ela mostra os detalhes da organização, incluindo todos os
  membros. Ao clicar no botão ::a:: na seção superior, você pode editar a organização.
