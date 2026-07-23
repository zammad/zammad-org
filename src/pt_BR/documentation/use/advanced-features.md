---
order: 4
title: 'Recursos avançados'
---

# Recursos avançados

Esta página apresenta uma coleção de várias ferramentas úteis que não
precisam de páginas próprias separadas. Continue lendo, pesquise na página
ou navegue até a seção desejada usando o sumário à direita.

## Comportamento de atualização do ticket

![Captura de tela mostra o comportamento após o menu de
atualização](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-behavior-update.png)

**Por quê?**

É possível fechar automaticamente uma aba de ticket na barra lateral de
navegação após atualizar um ticket. Isso economiza um clique após atualizar
um ticket ou atualizá-lo para o estado _fechado_.

**Como?**

Na barra de rodapé da visualização de detalhes do ticket, clique no botão
`Stay on tab ^` e selecione a opção desejada (se o padrão ainda estiver
definido, caso contrário, é rotulado como as outras opções abaixo). Você tem
diferentes opções:

- **Stay on tab**: opção padrão. Você precisa fechar manualmente a aba se
  quiser removê-la da sua barra lateral de navegação.
- **Close tab**: essa opção fecha a aba a cada atualização do ticket. Pode
  ser uma boa opção se você tiver que lidar com muitos tickets e/ou os
  tickets exigirem muitas interações.
- **Close tab on ticket close**: essa opção só fecha a aba quando o ticket é
  atualizado para o estado _fechado_.

::: tip
Se a sua situação varia de ticket para ticket, você pode deixar **Stay on tab** e usar o atalho de teclado
[[shift]] [[c]] para mudar o estado do ticket para fechado e fechar a aba do ticket.
:::

## Módulos de texto

![Captura de tela mostra o recurso de módulos de
texto](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-article-text-template.png)

**Por quê?**

Se você tiver que responder à mesma pergunta repetidamente, peça ao seu
administrador do Zammad para criar um módulo de texto para você. Eles podem
até incluir variáveis, como o nome do cliente ou qualquer outro atributo
disponível, que são substituídas ao usá-lo em um ticket. O uso de módulos de
texto tem benefícios como:

- Você economiza tempo ao responder tickets
- As respostas suas e dos seus colegas ficam alinhadas porque vocês usam o
  mesmo texto para as respostas

**Como?**

Use o botão na barra de ferramentas do editor ou simplesmente escreva
[[:]][[:]] no editor. Ambas as formas permitem pesquisar o módulo de texto
desejado digitando alguns caracteres ou palavras do texto ou palavras-chave
do módulo de texto.

Você pode escolher um clicando nele ou usando as setas para cima e para
baixo seguidas de [[enter]] no seu teclado. Existem alguns módulos de texto
no Zammad que vêm por padrão.

## Inserir artigo da base de conhecimento

![Captura de tela mostra a inserção de artigo da base de
conhecimento](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-article-insert-kba.png)

**Por quê?**

Se você frequentemente tem as mesmas ou solicitações de clientes muito
semelhantes sobre um assunto para o qual já existe um artigo da base de
conhecimento. Isso economiza tempo porque você não precisa alternar para a
base de conhecimento e copiar/colar conteúdo.

**Como?**

Use o botão na barra de ferramentas do editor ou simplesmente escreva
[[?]][[?]] no editor. Ambas as formas permitem pesquisar o artigo de base de
conhecimento desejado digitando alguns caracteres ou palavras.

## Mencionar um usuário

![Captura de tela mostra a menção a um
usuário](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-article-mention.png)

**Por quê?**

Peça ou solicite informações aos seus colegas ou mencione-os em tickets
importantes para que recebam notificações de atualizações do ticket e sejam
automaticamente inscritos nele.

**Como?**

Ao escrever um artigo de ticket, use o botão na barra de ferramentas do
editor ou simplesmente digite [[@]][[@]]. Ambas as formas permitem pesquisar
o nome do usuário que você deseja mencionar digitando alguns caracteres ou o
nome completo.

O Zammad exibe uma lista com todas as correspondências possíveis, onde você
pode escolher uma clicando nela ou usando as setas para cima e para baixo
seguidas de [[enter]] no seu teclado.

## Inscrever-se em um ticket

![Captura de tela mostra o recurso de
inscrição](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-subscribe.png)

**Por quê?**

Se você está interessado no progresso de um ticket e não é o responsável,
você pode se inscrever nele. Isso significa que você receberá notificações a
cada atualização.

**Como?**

Ative a chave **Subscribe me** na barra lateral do ticket para receber
notificações. Se você foi mencionado em um ticket, você é automaticamente
inscrito. Desative a chave para parar a notificação. Os avatares exibidos
mostram quem está inscrito no ticket e, portanto, é notificado das
atualizações.

## Macros

![Captura de tela mostra o menu de ações de
macro](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-macro.png)

**Por quê?**

Se você tem muitas etapas que repete várias vezes, deve usar uma macro para
isso. Nessa macro, seu administrador pode predefinir diferentes ações de
ticket que você pode aplicar com apenas um clique. Como exemplo, o Zammad
vem com uma macro "Close & Tag as Spam" por padrão. Se aplicada, o usuário
que executa a macro é definido como responsável, uma tag **spam** é
adicionada e o ticket é fechado. É até possível executar um [agente de
IA](/pt_BR/documentation/use/guides/ai) dentro de uma macro sob demanda.

**Como?**

Se seu administrador já criou uma macro, você pode executá-la na
visualização de detalhes do ticket clicando na seção `^` do botão `Update`
no canto direito da barra de rodapé (veja a captura de tela acima) e
selecionando a macro que deseja executar.

::: warning
A macro é executada imediatamente e sem confirmação adicional!
:::

Você também pode aplicar uma macro a vários tickets de uma vez. Dê uma
olhada em [ações em massa](#bulk-actions) para saber como fazer isso.

## Checklists

![Captura de tela mostra uma checklist a partir da barra lateral de
checklist](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-checklist.png)

**Por quê?**

- Para acompanhar tarefas
- Para concluir tarefas de forma estruturada
- Para garantir que nada seja esquecido
- Para tornar o progresso do trabalho mais visível

**Como?**

Selecione a aba **Checklist** na barra lateral. Se você não conseguir vê-la,
o administrador do Zammad a desativou. Você só pode adicionar ou editar uma
checklist se tiver permissão para editar o ticket.

Na barra lateral de checklist, você pode:

- Adicionar uma checklist: seja criando uma nova clicando em `Add Empty
  Checklist`, seja a partir de um modelo usando `Add From a Template` (se
  você não vir o botão de modelo, não há nenhum).
- Editar a checklist atual:
  - Renomeá-la clicando no título ou usando o menu ::a:: no cabeçalho da
    barra lateral.
  - Adicionar itens à checklist clicando no botão ::+::.
  - Alterar o texto dos itens da checklist, seja clicando neles diretamente,
    seja usando o menu ::a:: ao lado do item.
  - `Reorder` os itens clicando neste botão e arrastando e soltando os
    itens.
- Excluir a checklist completa usando o menu ::a:: no cabeçalho da barra
  lateral.

Há dois recursos que não são diretamente visíveis:

- Você pode fazer referência a outros tickets como um item de checklist
  usando seu gancho e número no texto do item (por exemplo,
  `Ticket#123456`). Esses itens não podem ser marcados manualmente; eles
  refletem o estado do ticket referenciado.
  ::: tip
  Obtenha o gancho e o número do ticket indo até o ticket desejado e usando o botão de copiar ::c:: no cabeçalho ou
  o atalho de teclado [[.]]. Depois você pode colá-lo na checklist onde deseja incluí-lo.
  :::
- O Zammad verifica automaticamente se todos os itens da checklist foram
  concluídos. A verificação é feita quando você define um ticket como
  "fechado". Se nem todos os itens estiverem concluídos, o Zammad solicitará
  que você trabalhe nas tarefas restantes e mantenha o ticket aberto, ou que
  o feche mesmo assim. Ao referenciar outros tickets na sua checklist,
  apenas aqueles que estão fechados (com um círculo verde) são considerados
  concluídos.

## Modelos de ticket

**Por quê?**

Criar rapidamente um ticket com atributos predefinidos, como título, texto,
tags e mais, economiza seu tempo. Isso requer que seu administrador crie um
modelo de ticket.

**Como?**

Na tela de criação de ticket, você encontra um botão `Apply Template ^` na
barra de rodapé, se um modelo estiver disponível. Selecione o modelo que
deseja aplicar e aplique as alterações desejadas.

## Rascunhos compartilhados

**Por quê?**

Para compartilhar um rascunho com outros agentes do seu grupo, por exemplo,
para refletir um processo de QA, em vez de "apenas" adicionar um artigo
interno. Em tal rascunho, você pode até incluir atributos de ticket
alterados, como prioridade, estado e atributos personalizados, assim como um
artigo com uma resposta ao cliente.

Este é um recurso opcional. Se você não conseguir vê-lo, seu administrador o
desativou.

**Como?**

Para **salvar um rascunho**, use o menu ::a:: no rodapé da visualização de
detalhes do ticket e selecione "Save as draft".

Para **aplicar um rascunho já existente**, clique no botão `Draft Available`
no lado esquerdo do rodapé.

::: warning
Aplicar um rascunho sobrescreve suas alterações não salvas!
:::

## Monitorando escalonamentos de ticket

**Por quê?**

Acordos de Nível de Serviço (SLAs) garantem respostas oportunas às
solicitações dos clientes. Seu administrador define metas como responder a
todas as consultas em até oito horas, com prazos personalizados opcionais
para clientes específicos. Quando esse prazo é ultrapassado, o ticket
escalona.

**Como?**

O Zammad notifica você por padrão quando os tickets se aproximam ou
ultrapassam seus prazos. Configure essas notificações nas [configurações do
seu perfil](/pt_BR/documentation/use/user-profile#notifications). O Zammad
também vem com uma visão geral padrão chamada "Escalated Tickets". Essa
visão geral inclui tickets já escalonados e tickets que devem escalonar nos
próximos 10 minutos.

Tickets relevantes para SLA exibem um carimbo de hora no cabeçalho da
visualização de detalhes. Passe o mouse sobre esse carimbo de hora para ver
todas as etapas e prazos de escalonamento em um popup. Ele mostra todos os
horários de escalonamento futuros ou atingidos com base na configuração do
seu SLA:

![Captura de tela mostra o painel de escalonamento ao passar o mouse sobre o
carimbo de hora de
escalonamento](/screenshots/cypress/documentation/use/advanced-features.cy.js/escalation-panel.png)

::: info
Os horários de escalonamento são calculados com base no seu horário comercial. Isso significa que, quando seu horário comercial começa às 9:00, um
ticket é criado às 7:00 e você tem um prazo de 1 hora, ele escalonará às 10:00, a menos que seja resolvido antes.
:::

O recurso de SLA requer uma configuração do seu administrador. Caso você não
veja carimbos de hora de escalonamento, o ticket não é relevante para SLA ou
o recurso não está configurado.

## Ações em massa

**Por quê?**

Se você precisar aplicar as mesmas alterações a vários tickets, pode
economizar tempo!

**Como?**

Há 2 lugares onde você pode aplicar ações em massa:

- Na aba de tickets na [página de pesquisa detalhada](guides/search)
- Nas [Visões gerais](guides/overviews)

Em ambos os lugares, você pode aplicar ações em massa de diferentes formas:

- Usando o painel flutuante (flyout)
- Usando a sobreposição de arrastar e soltar

Para usar ações em massa, primeiro selecione os tickets aos quais deseja
aplicar as alterações. Selecione os tickets individualmente clicando na
caixa de seleção ao lado deles, ou use a caixa de seleção no cabeçalho para
selecionar todos os tickets da página atual. Depois de selecionar todos os
tickets da página, você pode até selecionar todos os tickets que
correspondem à sua consulta de pesquisa ou condição de visão geral atual
clicando no rótulo **Select all XX results**. O número máximo de tickets
selecionáveis para uma ação em massa é 2000.

Para selecionar uma seção de tickets consecutivos, clique na caixa de
seleção do primeiro ticket, depois segure [[shift]] e clique na caixa de
seleção do último ticket. Isso seleciona também todos os tickets entre
eles. Isso também funciona para desmarcar tickets.

Dependendo do número de tickets afetados, você pode ver uma pequena
notificação após acionar uma ação em massa, informando sobre o progresso. A
ação em massa é executada em segundo plano, então você pode trabalhar em
outros tickets. No entanto, até que a ação em massa seja concluída, você não
pode iniciar uma nova ação em massa.

**Painel flutuante:**

![Captura de tela mostra o painel flutuante de ação em
massa](/screenshots/cypress/documentation/use/advanced-features.cy.js/bulk-side-panel-overviews.png)

Depois de selecionar os tickets, clique no botão `Bulk Action` no canto
superior direito e altere/adicione atributos usando os campos no painel
flutuante à direita. As alterações disponíveis que você pode aplicar aos
tickets são:

- Definir grupo
- Definir responsável
- Definir estado
- Definir prioridade
- Adicionar uma nota
- Executar uma macro

**Arrastar e soltar com sobreposição em massa:**

![Captura de tela mostra a ação em massa via arrastar e
soltar](/screenshots/cypress/documentation/use/advanced-features.cy.js/bulk-action-drag-and-drop.png)

Depois de selecionar os tickets, arraste-os pressionando e segurando o botão
do mouse e solte-os na ação desejada na sobreposição de ação em massa. Você
sempre pode ignorar isso soltando os tickets no meio da página. As ações
disponíveis que você pode aplicar aos tickets são:

- Definir grupo
- Definir responsável
- Remover atribuição de responsável
- Remover atribuição de responsável e definir grupo
- Executar macro

Inicie sua ação de arrastar e soltar a partir de um dos tickets já
selecionados, caso você tenha selecionado todos os relevantes. Para incluir
outro ticket não selecionado, comece a arrastar a partir dele, e ele também
será incluído no processamento em lote.

## Mesclar tickets

![Captura de tela mostra o painel flutuante de mesclagem de
ticket](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-merge.png)

**Por quê?**

Se você tem dois ou mais tickets sobre o mesmo assunto, pode querer mesclar
esses tickets em um só. Isso pode acontecer se um cliente enviar um novo
email que não pode ser atribuído ao ticket existente (por exemplo, a
referência do ticket está ausente porque o cliente envia um email
completamente novo em vez de responder na thread existente).

Mesclar um ticket migra todas as mensagens e notas do ticket de onde você
seleciona a mesclagem para o ticket selecionado.

**Como?**

Vá até o ticket que deseja mesclar em outro. Na barra lateral do ticket, use
o menu ::a:: e selecione `Merge`. Isso abre um painel flutuante no qual você
pode selecionar um ticket clicando nele ou digitando um número de ticket no
campo de pesquisa. Ao selecionar um ticket de destino, confirme usando o
botão `Merge` na parte inferior.

Como resultado, os artigos são movidos para o ticket escolhido. O ticket no
qual você executou a mesclagem ainda existe, com as seguintes alterações:

- Os artigos foram substituídos por um rótulo "merged"
- O estado mudou para "merged"
- O ticket é vinculado ao seu ticket "pai"

## Dividir tickets

![Captura de tela mostra o menu de ação de divisão do
artigo](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-split.png)

**Por quê?**

Se você tem um ticket que trata de mais de um assunto, pode querer dividi-lo
em dois ou mais tickets separados. Por exemplo, isso pode acontecer se um
cliente tem uma pergunta técnica e quer fazer um pedido.

**Como?**

Para dividir um artigo, use o menu ::a:: ao lado de um artigo e selecione
`Split`.

Isso resulta em uma tela de criação de ticket com os mesmos atributos
definidos no ticket inicial. O conteúdo do artigo também é incluído. Você
pode alterar tudo conforme suas necessidades e depois clicar em `Create`.

O ticket recém-criado é vinculado ao original como filho. O ticket original
é vinculado ao ticket dividido como pai.

## Vincular tickets

**Por quê?**

Quando surgem tickets sobre assuntos relacionados, eles podem ser vinculados
entre si para facilitar a referência. Tickets [mesclados](#merge-tickets) e
[divididos](#split-tickets) são vinculados automaticamente.

**Como?**

Na barra lateral do ticket, adicione um link para outro ticket clicando no
botão ::+:: na seção **Related tickets**. Isso abre um painel flutuante no
qual você pode selecionar um ticket clicando nele ou digitando um número de
ticket no campo de pesquisa. Além disso, você pode escolher entre diferentes
tipos de vínculo:

- **Normal:** para tickets relacionados que não têm hierarquia.
- **Parent/Child**: para tickets relacionados em que um é o assunto
  principal e o outro é uma subtarefa. Esse tipo de vínculo é usado por
  padrão quando um ticket é dividido ou mesclado.

## Detecção de duplicados

![Captura de tela mostra o aviso de ticket duplicado durante a criação de
ticket](/screenshots/cypress/documentation/use/advanced-features.cy.js/duplicate-detection.png)

**Por quê?**

Às vezes, acontece de um cliente entrar em contato com você (ou colegas)
mais de uma vez sobre um único assunto. Para evitar a criação de tickets
duplicados, o Zammad pode avisá-lo quando outro ticket já estiver
presente. Esse recurso precisa ser ativado e configurado pelo seu
administrador.

**Como?**

Basta criar um novo ticket e fornecer algumas informações. Seu administrador
pode configurar quais atributos de ticket devem corresponder para que o
aviso apareça (por exemplo, cliente e título). Em caso de muitos avisos
desnecessários ou nenhum aviso, peça ao administrador para ajustar os
atributos a comparar.

Quando um duplicado é detectado, um aviso aparece no ticket (veja o exemplo
na captura de tela acima). Esse aviso pode conter um número de
ticket. Clique no link do ticket para ver do que se trata. Caso não seja um
duplicado, simplesmente ignore-o e continue com a criação do ticket.

## Contabilização de tempo

**Por quê?**

Com a contabilização de tempo integrada do Zammad, você pode ajudar a
acompanhar quanto tempo dedicou aos tickets. Com base nos tempos
contabilizados no ticket, isso é atribuído automaticamente a clientes e
organizações. Isso pode ser usado na sua empresa para faturamento ou para
acompanhar orçamentos de suporte.

**Como?**

Depois de atualizar um ticket, aparece um diálogo de contabilização de
tempo. Informe quanto tempo você dedicou ao ticket.

![Captura de tela mostra o diálogo de contabilização de
tempo](/screenshots/cypress/documentation/use/advanced-features.cy.js/time-accounting-dialog.png)

O recurso é **opcional**. Se você não o vir sempre que atualizar um ticket,
seu administrador ainda não o ativou, ou a regra para os tickets a serem
considerados não corresponde.

O tempo contabilizado é sempre registrado e armazenado sem unidade. Porém, o
administrador pode optar por exibir um rótulo opcional ao lado do campo para
indicar a você e seus colegas em qual unidade o tempo é esperado (veja a
captura de tela).

Os tipos de atividade podem ser usados para diferenciar entre atividades
diferentes e para agrupar os tempos contabilizados. Se esse recurso opcional
estiver ativo, ele mostra uma lista de atividades das quais você pode
selecionar no diálogo de contabilização de tempo.

Se um ticket já tem tempo(s) contabilizado(s), você pode vê-lo na barra
lateral do ticket, no lado direito da visualização de detalhes do ticket, na
parte inferior. Você encontra as somas calculadas de cada tipo de atividade
(se configurado), assim como a soma total dos tempos contabilizados de todos
os tipos de atividade.

![Captura de tela mostra a visão geral de contabilização de
tempo](/screenshots/cypress/documentation/use/advanced-features.cy.js/time-accounting-overview.png)

## Painel de detalhes do usuário

**Por quê?**

Visualizar informações importantes de clientes/usuários rapidamente, sem
sair da sua visualização atual, permite que você permaneça focado na sua
tarefa.

**Como?**

Você já deve ter visto: basta passar o mouse sobre um ícone de avatar, seja
no cabeçalho, rodapé, conteúdo principal ou na barra lateral de conteúdo na
visualização de detalhes do ticket. Para ver mais detalhes, clique no avatar
do usuário para abrir a [página de detalhes do usuário](#user-detail-page).

![Captura de tela mostra um avatar com o painel de detalhes do usuário
aberto](/screenshots/cypress/documentation/use/advanced-features.cy.js/user-detail-panel.png)

A propósito, a coroa na captura de tela representa o estado VIP do cliente,
que pode ser definido na visualização de detalhes do cliente e nas
configurações de administração.

## Página de detalhes do usuário

![Captura de tela mostra a página de detalhes do
usuário](/screenshots/cypress/documentation/use/advanced-features.cy.js/user-detail-page.png)

**Por quê?**

Ela permite que você veja todas as informações relevantes do usuário em um
só lugar. Exemplos do que você pode encontrar e fazer ali:

- Ver a associação a organizações
- Ver um gráfico dos tickets recentes
- Adicionar ou editar uma nota
- Editar o cliente (via menu ::a::)
- Ver um histórico de alterações (via menu ::a::)
- Criar um novo ticket com este usuário como cliente

**Como?**

Basta clicar no avatar de um usuário (por exemplo, no cabeçalho da
visualização de detalhes do ticket). Isso abre uma nova aba com a página de
detalhes do cliente. Caso você também tenha permissões de administrador,
você pode até criar uma tarefa de exclusão para um usuário a partir do menu
::a::.

## Página de detalhes da organização

![Captura de tela mostra a página de detalhes da
organização](/screenshots/cypress/documentation/use/advanced-features.cy.js/organization-detail-page.png)

**Por quê?**

Ela permite que você veja todas as informações relevantes da organização em
um só lugar. Exemplos do que você pode encontrar e fazer ali:

- Ver os membros da organização
- Ver um gráfico dos tickets recentes de toda a organização
- Adicionar ou editar uma nota
- Editar a organização (via menu ::a::)
- Ver um histórico de alterações (via menu ::a::)
- Criar um novo usuário como membro dessa organização

**Como?**

Basta clicar em um avatar de organização (por exemplo, no cabeçalho da
visualização de detalhes do ticket, ao lado do avatar do usuário). Isso abre
uma nova aba com a página de detalhes da organização.

## Issues e ativos externos

**Por quê?**

Se você usa o i-doit e o Zammad para suporte de TI, ou lida com issues do
Github ou Gitlab, você pode vincular a esses sistemas externos para ter
todas as informações relevantes em um só lugar. Seu administrador do Zammad
precisa ativar e configurar esses recursos nas configurações do Zammad.

**Como?**

![Captura de tela mostra a barra lateral de conteúdo do Gitlab com o botão
"Link
Issue"](/screenshots/cypress/documentation/use/advanced-features.cy.js/gitlab-content-sidebar.png)

Se ativado, basta abrir um ticket e escolher a aba de conteúdo da barra
lateral correta com o ícone correspondente (veja o exemplo do Gitlab na
captura de tela acima). Clique no botão para vincular a uma issue informando
a URL dela ou selecionando o item em um campo de seleção (i-doit). Depois,
você pode ver o item vinculado com metadados adicionais. Ao clicar no item
vinculado, você é redirecionado a ele no respectivo sistema.

## Destacar texto

**Por quê?**

Isso permite dar aos seus colegas uma dica sobre aspectos importantes do
ticket e garantir que partes importantes não passem despercebidas. Esteja
ciente de que esse recurso não é sobre destacar texto em novos artigos; é
sobre destacar texto em artigos existentes para você e outros agentes.

**Como?**

![Captura de tela mostra o menu de destaque da visualização de detalhes do
ticket](/screenshots/cypress/documentation/use/advanced-features.cy.js/text-highlighting.png)

Use a ferramenta de destaque com o ícone de lápis no canto superior direito
da visualização de detalhes do ticket. Para destacar texto, primeiro
selecione o texto e depois clique no botão, ou, como alternativa, clique no
botão de destaque primeiro e depois selecione o texto. Você pode escolher
uma cor diferente usando a seta para baixo no lado direito do botão. Para
remover o destaque, basta escolher o ícone de borracha no menu de cores.
