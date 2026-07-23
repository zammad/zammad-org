---
order: 4
title: 'Recursos de IA'
---

# Recursos de IA

## Introdução

O Zammad está ficando ainda mais inteligente! Estamos expandindo as
capacidades de IA do Zammad para ajudá-lo a gerenciar tickets de suporte de
forma ainda mais eficiente. ✨🚀

::: info
Os recursos de IA precisam ser configurados e ativados pelo seu administrador. Se você não conseguir vê-los, é porque não estão configurados.
Mais informações sobre como configurar e ativar isso podem ser encontradas na seção de administração.
:::

## Resumo do ticket

O recurso de resumo do ticket faz o que o nome diz: resume o conteúdo do
ticket. Isso pode economizar muito tempo ao lidar com tickets grandes e/ou
muitas transferências entre agentes.

Se o recurso estiver ativado, um resumo do ticket é gerado quando o ticket é
atualizado e você abre o ticket ou abre a aba lateral de resumo do ticket,
dependendo da configuração.

![Captura de tela mostra a visualização de detalhes do ticket do Zammad com
o banner de resumo do ticket destacado e a barra lateral de
resumo](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-ticket-summary-sidebar.png)

Dependendo da configuração da sua instância do Zammad, o resumo inclui as
seguintes seções:

- Intenção do cliente
- Resumo da conversa
- Perguntas em aberto (opcional)
- Eventos futuros (opcional)
- Sentimento do cliente (opcional)

## Ferramentas do assistente de escrita

As ferramentas de assistente de escrita com IA são projetadas para
simplificar e aprimorar seu fluxo de trabalho de resposta a tickets enquanto
você cria um artigo. Para usar essa ferramenta, primeiro você precisa
selecionar o texto ao qual deseja aplicar as alterações. Depois disso,
clique no botão `Writing Assistant Tools` no lado esquerdo da barra de
ferramentas do editor e escolha uma das ferramentas a seguir, dependendo do
que deseja realizar.

![Captura de tela mostra o menu inteligente do editor do
Zammad](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-writing-assistant-tools.png)

::: warning

- Esteja ciente de que seu texto é substituído quando você seleciona uma das ferramentas de texto. Se não estiver satisfeito com o resultado,
  tente usar o recurso de desfazer pressionando [[ctrl]] + [[z]].
- Sempre verifique novamente a resposta. Embora o recurso tenha sido desenvolvido com cuidado, ainda pode haver pequenos problemas em
  casos individuais devido à natureza das redes neurais.

:::

O Zammad vem com ferramentas de assistente de escrita padrão. A
disponibilidade depende da configuração da sua instância do Zammad. Você
pode até ter ferramentas personalizadas adicionais, caso seu administrador
as tenha adicionado.

- **Expand draft into well-written section**: usa seu rascunho como base e
  tenta elaborar um texto adequado. Tenta adicionar uma estrutura e melhorar
  a clareza e concisão, além de remover erros de ortografia e
  gramática. Você pode até usá-lo fornecendo apenas informações básicas (por
  exemplo, em tópicos) e deixar a IA escrever a resposta.
- **Fix spelling and grammar**: revisa seu texto e remove erros de
  ortografia e gramática.
- **Summarize section to about half its current size**: reduz seu texto para
  cerca de metade do tamanho atual, mantendo a mensagem e o tom do texto.
- **Rewrite complex section and make it easy to understand**: remove partes
  desnecessárias e reescreve seu texto de forma clara e compreensível.

## Agentes de IA

Os agentes de IA podem ser configurados para trabalhar em certos tipos de
tarefas rotineiras. Em geral, esse recurso opera nos bastidores, mas se
configurado, você pode notá-lo em algumas situações (veja exemplos
abaixo). Caso seu administrador tenha criado uma macro com uma ação de
agente de IA, você pode até executá-la manualmente. Pergunte ao seu
administrador para mais detalhes e dê uma olhada na [descrição de
macro](/pt_BR/documentation/use/advanced-features#macros) na página de
recursos avançados.

### Histórico do ticket

Se um agente de IA aplicou alterações, você pode ver uma entrada no
histórico do ticket informando o nome do agente de IA. Se notar problemas
contínuos com o que o agente de IA fez, informe seu administrador do
Zammad. Exemplo de uma entrada de histórico de um agente de IA:

![Captura de tela mostra a entrada de histórico do ticket do agente de
IA](/screenshots/documentation/use/ai/ai-agent-ticket-history.png)

### Detecção de trabalho simultâneo

Agentes de IA que estão trabalhando atualmente em um ticket são exibidos
como outros agentes na seção de usuários ao vivo na barra inferior. Isso
ajuda a evitar trabalho duplicado, assim como a perda de alterações não
salvas. Se você vir um avatar de agente de IA, aguarde um momento ou vá para
outro ticket.

Avatar de agente de IA:

![Captura de tela mostra o avatar de um agente de
IA](/screenshots/documentation/use/ai/ai-live-user.png)

### Indicador na visão geral

Um agente de IA em execução é indicado na coluna de status nas visões
gerais. O círculo de status muda para um círculo gradiente azul/rosa:

![Captura de tela mostra um círculo de status nas visões gerais indicando
que um agente de IA está atualmente trabalhando
nele](/screenshots/documentation/use/ai/overview-ai-agent-indicator.png)
