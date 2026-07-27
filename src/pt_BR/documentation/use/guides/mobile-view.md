---
order: 5
title: 'Use mobile view'
---

# Use mobile view

## Introdução

O desenvolvimento de uma visualização mobile dedicada para o Zammad foi
motivado pela necessidade crescente de acesso durante o deslocamento. A
aplicação desktop oferece funcionalidade responsiva para telas menores, mas
foi determinado que seria complexa demais para o uso mobile ideal. Essa
visualização mobile foca em apresentar as informações mais críticas em um
design moderno e adequado ao toque, priorizando uma experiência de usuário
simplificada.

::: info
Intencionalmente, não fornecemos instruções específicas e documentação abrangente para a visualização mobile! A UX geral
deve ser intuitiva e autoexplicativa na maioria dos casos.
:::

Você pode encontrar capturas de tela abaixo para ter uma ideia de como é a
visualização mobile.

::: tabs

=== Login & Home

| Login | Home |
|:-------------------------:|:-------------------------:|
| ![Captura de tela mostra a tela de login da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/login.png) | ![Captura de tela mostra a tela inicial da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/home.png) |

=== Search & Overview

| Search | Overview |
|:-------------------------:|:-------------------------:|
| ![Captura de tela mostra a tela de pesquisa da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/search.png) | ![Captura de tela mostra a tela de visão geral da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/overview.png) |

=== Ticket Details

| Articles | Details |
|:-------------------------:|:-------------------------:|
| ![Captura de tela mostra a tela de ticket da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/ticket-articles.png) | ![Captura de tela mostra a visualização de detalhes de ticket da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/ticket-details.png) |

=== Notifications & Account

| Notifications | Account |
|:-------------------------:|:-------------------------:|
| ![Captura de tela mostra a tela de notificações da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/notifications.png) | ![Captura de tela mostra a tela de configurações de conta da visualização mobile do Zammad](/screenshots/documentation/use/mobile-view/profile.png) |

:::

## Recursos

A visualização mobile oferece uma forma de realizar suas tarefas diárias
comuns do Zammad enquanto está em movimento:

- Gerencie e use suas visões gerais de tickets
- Pesquisar registros existentes
- Criar um novo ticket
- Responder em um ticket já existente
- Modificar atributos do ticket
- Modificar atributos do cliente
- Modificar atributos da organização

## Limitações

A visualização móvel também ainda não tem alguns recursos oferecidos pela
visualização desktop:

- Contabilização de tempo
- Dividir artigo
- Vincular tickets e ver tickets vinculados
- Execução de macros
- Histórico do ticket
- Criação de modelos e rascunhos compartilhados

Além disso, certos recursos foram intencionalmente omitidos para melhorar o
foco em informações importantes:

- A maioria dos recursos de gerenciamento (exceto gerenciamento de usuários
  e organizações do ticket)
- A maioria dos recursos da base de conhecimento (exceto integração com
  ticket)
- A maioria das funções de perfil de usuário (exceto preferências de avatar
  e idioma)
- Relatórios
- Registro de chamadas
- Chat ao vivo

## Switch the views

O Zammad implementa uma detecção de dispositivo móvel, que resulta em
redirecionamento automático para a visualização mobile. Mesmo com esse
mecanismo em vigor, é possível alternar explicitamente entre as
visualizações usando links de aplicativo.

Tanto na tela de login desktop quanto na mobile, você encontra um link
abaixo do botão `Sign in` para alternar explicitamente para a outra
visualização (veja a captura de tela de login acima como exemplo).

Enquanto estiver conectado e quiser mudar da visualização mobile para a
desktop, vá até seu perfil selecionando seu avatar na parte inferior e
selecione **Continue to desktop** (veja a captura de tela de conta acima
como exemplo). O caminho inverso é semelhante: no menu do avatar, você
encontra uma opção para mudar para a visualização mobile.
