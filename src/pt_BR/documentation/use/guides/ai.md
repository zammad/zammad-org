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

- **Expand draft into well-written section**: Uses your draft as a base and
  tries to elaborate a proper text. It tries to add a structure and to
  enhance clarity and conciseness and removing misspellings and grammar
  errors. You can even use it by providing only basic information (e.g. via
  bullet points) and let the AI write the answer.
- **Fix spelling and grammar**: revisa seu texto e remove erros de
  ortografia e gramática.
- **Summarize section to about half its current size**: reduz seu texto para
  cerca de metade do tamanho atual, mantendo a mensagem e o tom do texto.
- **Rewrite complex section and make it easy to understand**: remove partes
  desnecessárias e reescreve seu texto de forma clara e compreensível.

## Assistente da base de conhecimento

![Captura de tela mostra a seção de conhecimento relacionado na barra
lateral do ticket com uma resposta da base de conhecimento sugerida por
IA](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-knowledge-base-assistant.png)

### Geração de respostas da base de conhecimento

Este recurso permite acionar a geração de uma resposta da [base de
conhecimento](/en/documentation/use/guides/knowledge-base) baseada em IA a
partir de um ticket. Isso é útil se você recebe tickets semelhantes com
frequência e quer criar rapidamente um artigo da base de conhecimento para
esses casos. Isso ajuda você e seus colegas a resolver tickets semelhantes
de forma mais eficiente no futuro. Pode até reduzir o volume de tickets
recebidos quando os clientes conseguem resolver seus problemas diretamente
pela base de conhecimento publicada.

Este recurso está disponível na seção **Related knowledge** da barra lateral
do ticket. Clique no botão `Add AI draft` para acionar a geração da
resposta.

Pontos a considerar:

- A resposta da base de conhecimento é gerada como rascunho e não é
  publicada automaticamente.
- Você é definido como autor da resposta.
- A resposta é gerada no idioma padrão da sua base de conhecimento.
- A resposta inclui uma nota no conteúdo e uma tag (`ai-generated`) sobre a
  geração por IA.
- Um link para a resposta é adicionado ao ticket a partir do qual você
  acionou a geração da resposta.
- A resposta é criada em uma categoria da base de conhecimento para a qual
  você tem permissões de editor. A IA escolhe uma dessas categorias.

Se uma resposta semelhante já existir na base de conhecimento, o Zammad a
exibe em uma caixa de diálogo antes de criar uma nova. Isso dá a você a
chance de revisar respostas relacionadas existentes para evitar envios
duplicados.

### Sugestão de resposta da base de conhecimento

Este recurso compara o conteúdo do ticket com a base de conhecimento e
mostra respostas relevantes em **Suggested by AI** se elas atingirem o
limite de pontuação configurado pelo administrador. Cada sugestão mostra o
título da resposta e mais detalhes ao passar o mouse. Uma pontuação de
relevância adicional só é exibida para usuários com as permissões de
administrador correspondentes. Clique no título para abrir a resposta na
base de conhecimento. Clique no ::+:: do lado direito, que aparece ao passar
o mouse, para vinculá-la ao ticket.

Se não houver sugestões disponíveis, a mensagem "No suggestions." é exibida
em seu lugar.

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

AI agents which are currently working on a ticket are displayed like other
agents in the live user section in the bottom bar. This helps to avoid
duplicate work and losing unsaved changes. If you see an AI agent avatar,
wait for a moment or head over to another ticket.

Avatar de agente de IA:

![Captura de tela mostra o avatar de um agente de
IA](/screenshots/documentation/use/ai/ai-live-user.png)

### Indicador na visão geral

Um agente de IA em execução é indicado na coluna de status nas visões
gerais. O círculo de status muda para um círculo gradiente azul/rosa:

![Captura de tela mostra um círculo de status nas visões gerais indicando
que um agente de IA está atualmente trabalhando
nele](/screenshots/documentation/use/ai/overview-ai-agent-indicator.png)
