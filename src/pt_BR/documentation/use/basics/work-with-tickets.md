---
order: 5
title: 'Trabalhar com tickets'
---

# Trabalhar com tickets

Você encontrou o caminho até um ticket existente, parabéns! Agora vamos ver
o que você pode fazer e como fazê-lo.

Geralmente, trabalhar em tickets existentes significa acompanhar uma
correspondência com o cliente em uma thread/conversa na visualização de
detalhes do ticket. Toda vez que você abre um ticket, uma nova aba aparece
na sua barra de tarefas. Para fechar uma aba (no sentido de removê-la da
barra de tarefas, não de definir o estado do ticket como fechado), basta
clicar no botão ::X:: na aba. O Zammad salva automaticamente suas alterações
nas abas de ticket abertas, independentemente de você já ter aplicado as
alterações ou apenas editado coisas e mudado para outro lugar. Isso
significa que não há problema em criar um novo ticket enquanto edita um
existente. Basta voltar para a outra aba.

Para a maioria das alterações (exceto tags ou renomeação de título, por
exemplo), uma atualização explícita do ticket é necessária. Portanto,
certifique-se de clicar no botão `Update` no lado direito da barra de rodapé
quando estiver satisfeito com suas alterações.

## Alterando atributos do ticket

Como você já deve saber, há atributos de ticket adicionais, como grupo,
prioridade e responsável, que você pode definir. Se você ainda não leu
[ticket-basics](/pt_BR/documentation/use/basics/ticket-basics), confira para
saber mais.

## Criar um novo artigo

Não importa se você cria um novo artigo do zero ou responde a um artigo do
cliente, você pode escolher entre diferentes tipos de artigo:

- **Note**: escreva um lembrete para você e outros agentes, faça uma
  pergunta a um colega mencionando um usuário ou adicione novas informações
  ao ticket. A visibilidade padrão é "interna", o que significa que o
  cliente não pode ver a nota.
- **Call**: registre um resumo de uma chamada telefônica que você teve com o
  cliente.
- **Email**: envie um email para qualquer pessoa sobre o ticket. O título do
  ticket é usado como assunto do email.

Para escolher outro tipo de artigo, use as abas de canal (rotuladas
**Note**, **Phone**, **Email** etc.) e escolha um tipo diferente. Use a
chave **Visibility** para alternar o artigo entre visibilidade interna e
pública. Artigos com visibilidade interna são destacados com uma borda azul
tracejada; artigos públicos não têm destaque.

![Captura de tela mostra o seletor de tipo de artigo e a chave de
visibilidade](/screenshots/cypress/documentation/use/basics.cy.js/article-type-visibility.png)

Para escrever e editar texto, aproveite os recursos poderosos do
editor. Você pode usar a barra de ferramentas ou atalhos de teclado para
formatar texto e acionar funções especiais. Devido à quantidade de recursos
e sua importância, você pode encontrar mais informações na [página separada
do editor](/pt_BR/documentation/use/guides/editor).

Todo novo artigo aparece no final da conversa, ou seja, abaixo dos artigos
existentes. Para ver informações detalhadas de um artigo, basta clicar em um
artigo existente, o que abre metainformações adicionais.

Você deve estar se perguntando agora como excluir artigos. A resposta é que
você só pode excluir artigos que você mesmo criou e que não têm mais de 10
minutos. Para ver a função **Delete article** no menu ::a::, artigos de um
tipo de comunicação (emails, chamadas) precisam primeiro ser alterados para
visibilidade "interna".

### Adicionar um artigo do zero

Abaixo do último artigo, clique no botão `Add internal note` (ou `Add
reply`, se você for cliente). Isso abre o editor com o canal e a
visibilidade apropriados já selecionados. Você pode alterar o tipo ou a
visibilidade se quiser. Para responder ao cliente diretamente ou encaminhar
um artigo específico, use os botões correspondentes abaixo de um
artigo. Leia a próxima seção para mais informações.

![Captura de tela mostra a linha de ações abaixo do último artigo na
visualização de detalhes do
ticket](/screenshots/cypress/documentation/use/basics.cy.js/new-article.png)

### Responder a um artigo

Para encaminhar ou responder a um artigo, use um dos botões de resposta
abaixo de um artigo ou no menu ::a::. O comportamento é semelhante ao de um
cliente de email.

- **Reply**: permite responder ao artigo. O destinatário é preenchido
  automaticamente. A resposta é enviada pelo mesmo canal da mensagem
  original. Isso permite que você envie facilmente uma resposta a um cliente
  ou terceiro, se envolvido.
- **Reply all**: igual ao anterior, mas usa todos os endereços de
  destinatário da mensagem original como destinatários do seu novo
  artigo. Disponível apenas para canais de email.
- **Forward**: isso significa que você pode encaminhar a mensagem original
  para terceiros ou qualquer outra pessoa. A mensagem original e os anexos
  são incluídos no seu novo artigo.

![Captura de tela mostra as ações de resposta do
artigo](/screenshots/cypress/documentation/use/basics.cy.js/article-reply.png)

O Zammad até permite que você **cite texto** de um artigo existente. Isso é
especialmente útil se uma resposta se refere a diferentes partes da mensagem
original ou o texto é bem longo. Esse recurso é limitado a artigos do tipo
comunicação, como email, onde os botões de resposta estão disponíveis. Para
citar texto, basta selecionar o texto que deseja citar e usar a função
**Reply** ou **Reply all**. Isso adiciona o texto selecionado com um carimbo
de hora no seu editor de artigo, onde você pode respondê-lo. Você pode usar
a citação várias vezes para citar diferentes partes do texto. Basta
selecionar outra parte do texto, clicar na mesma ação de resposta de antes,
e ela será adicionada como outra citação ao seu editor. Você pode dividir
citações usando [[enter]] ou [[shift]] + [[enter]] no editor e desativar o
formato de citação para o seu texto.

Se o ticket tem um histórico de artigos longo, veja [Lidando com tickets
grandes](#handling-of-large-tickets) para as facilidades que o Zammad
oferece.

### Lidando com tickets grandes

Ao trabalhar em tickets com históricos de artigos longos - como longas
threads de email onde você precisa consultar mensagens anteriores - o Zammad
oferece duas facilidades:

- Uma barra de ações de ticket flutuante no canto inferior direito da lista
  de artigos mostra ações rápidas, dependendo da sua posição de rolagem e do
  estado do ticket. Ela contém botões com ícones para as seguintes ações:
  - **Add internal note** (ou **Add reply**, se você for cliente): abre o
    formulário de resposta do artigo para escrever uma nota.
  - **Scroll to start** e **Scroll to end**: pula para o topo ou final da
    lista de artigos. Se houver artigos não lidos, o botão **Scroll to end**
    exibe um selo e muda para **Scroll to unread article**.
  - A barra de ferramentas aparece sempre que a lista de artigos for mais
    alta que sua tela, para que ações essenciais permaneçam acessíveis.
- Um **formulário de resposta fixado** para que o editor permaneça visível
  enquanto você rola pelos artigos. Para fixar ou desafixar o formulário de
  resposta, clique no ícone de alfinete no cabeçalho do formulário de
  resposta do artigo. O formulário fixado gruda na parte inferior da
  visualização de detalhes do ticket. Redimensione a altura arrastando a
  linha na borda superior do formulário de resposta fixado. O estado de
  fixação, assim como o tamanho do painel, são salvos no seu navegador.

![Captura de tela mostra o formulário de resposta do artigo fixado na parte
inferior da visualização de detalhes do
ticket](/screenshots/cypress/documentation/use/basics.cy.js/article-reply-pinned.png)

## Renomear um ticket

Para renomear um ticket, basta clicar no título na barra de cabeçalho e
começar a digitar. Esse título é usado como assunto na comunicação por email
e aparece em vários lugares, como visões gerais. Confirme com [[enter]] ou
clique no botão no lado direito.

## Copiar número do ticket

Para copiar o número do ticket, incluindo um link para o ticket (por
exemplo, para colá-lo em um aplicativo de chat de terceiros), use o ícone
::c:: ao lado do título do ticket. Ele copia o número completo do ticket com
o identificador do ticket para a sua área de transferência, por exemplo,
`Ticket#50071`. Se você colar o conteúdo em um destino que possa lidar com
HTML, um link para o ticket é incluído. Se você quiser apenas colar o número
do ticket, use a colagem simples via [[ctrl]] [[shift]] [[v]].

![Captura de tela mostra o cabeçalho do ticket com o botão de copiar número
do ticket
destacado](/screenshots/cypress/documentation/use/basics.cy.js/copy-ticket-number-button.png)

Mas espere, há até um atalho de teclado para isso! Basta pressionar [[.]] na
visualização de detalhes do ticket, e o número do ticket é copiado para sua
área de transferência. Para incluir também o título do ticket, pressione
[[.]] duas vezes. Exemplo: `Ticket#31004: Onboarding new colleague`.

## Processamento simultâneo de ticket

Pode acontecer de dois ou mais agentes abrirem um ticket ao mesmo
tempo. Para evitar conflitos de edição e clientes recebendo respostas
contraditórias, o Zammad mostra quem está visualizando ou editando o ticket
no momento. Você pode encontrar essa informação na barra inferior, onde os
avatares de todos os agentes são exibidos.

![Captura de tela mostra outros agentes visualizando/editando o
ticket](/screenshots/documentation/use/advanced-features/simultaneous-work-detection.png)

Certifique-se de se comunicar com seus colegas para evitar esses problemas
antes que eles surjam. Dependendo do ícone adicional e se o ícone do avatar
está esmaecido, isso significa:

- Avatar: outro agente está visualizando o ticket.
- Avatar esmaecido: outro agente abriu o ticket, mas atualmente não está
  visualizando-o ativamente.
- Avatar com ícone de lápis: outro agente está atualmente trabalhando
  ativamente neste ticket.

Há ainda mais ícones que representam estados adicionais dos outros agentes
(por exemplo, visualizando o ticket pela interface mobile ou fora do
escritório). Basta passar o mouse se você não tiver certeza do que
significa.

## Ações do ticket

Ações adicionais estão disponíveis no menu ::a:: na barra lateral do ticket.

History
: veja uma lista abrangente de atualizações do ticket, realizadas por qualquer usuário, desde sua criação. Útil para verificar quem fez
  o quê e quando.

Merge
: migre todas as mensagens/notas para outro ticket. Útil se você tiver mais de um ticket sobre um único assunto do cliente.
  Veja [Mesclar tickets](/pt_BR/documentation/use/advanced-features#merge-tickets) para detalhes.

Alterar cliente: reatribua o ticket a outro cliente.

-----

Agora você já conhece os fundamentos e como trabalhar com tickets em
geral. No entanto, há muitos outros recursos no Zammad que podem ser muito
úteis no seu trabalho diário. Continue lendo em [Recursos
avançados](/pt_BR/documentation/use/advanced-features) para saber mais.
