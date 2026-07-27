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

## Main UI elements

A captura de tela acima mostra uma visualização de detalhes do ticket no
Zammad. Continue lendo para uma descrição dos diferentes elementos
principais do Zammad.

Primary navigation
: This is the whole left sidebar which includes the search, notifications, overviews, the taskbar, your avatar, the
  ticket create button and maybe more, depending on your system (see next section).

Ticket detail view
: This is where you handle your customer requests. It appears in the main content in the middle of the screen when a
  ticket tab is selected in the navigation sidebar.

Sidebar
: esta é a barra lateral direita na visualização de detalhes do ticket. Contém abas de barra lateral como clientes e checklists e
  exibe a aba atualmente selecionada.

## Primary navigation

A barra lateral de navegação principal é o seu local central para acessar
todas as principais partes do Zammad. Você pode não ver todas elas, pois
algumas dependem da configuração do seu Zammad. A barra lateral de navegação
está sempre visível. Isso significa que, se você não souber onde está,
sempre pode voltar ao painel, suas visões gerais ou um ticket aberto, por
exemplo.

Search and notification area
: Includes the search where you can search for users, organizations, tickets and basically every in Zammad available
  information. Next to the search you can find the Zammad logo. In case there is a notification, it shows you a badge
  with a count about how many notifications you got.

Navigation tabs
: Allows you to switch to different Zammad screens like the dashboard, overviews, knowledge base or phone screen
  depending on your system.

Taskbar tabs
: You can find tabs for your opened tickets, users, organizations and the detailed search in the taskbar. So if you
  read about a user tab, this means an opened user tab in your sidebar.

Bottom bar
: Profile settings and create new ticket button. In case you have additional permissions, there might be a settings and
  a reporting button as well.

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

Ticket tab
: This tab shows the ticket information like owner, group, priority and state and lets you edit these values.
  Additionally, the following actions are available when you click on the ::a:: button in the top section:

  - History: mostra uma caixa de diálogo com o histórico do ticket atual. É
    aqui que você pode encontrar quando e quais ações foram realizadas e por
    quem.
  - Merge: mescla o ticket com outro, caso um cliente tenha enviado vários
    emails sobre o mesmo assunto.
  - Change customer: define outro cliente para o ticket.

Customer tab
: View customer details including a reference to the customer's other tickets. You can change the ticket customer here
  as well by clicking on the ::a:: button in the top section.

Organization tab
: This tab is only shown if the customer is member of an organization. It shows the organization's details including all
  members. By clicking on the ::a:: button in the top section, you can edit the organization.
