---
order: 2
title: 'Fundamentos de tickets'
---

# Fundamentos de tickets

Novo em sistemas de tickets? Então continue lendo sobre os fundamentos. Isso
ajuda você a entender os principais conceitos e a começar com o Zammad. Se
você já está familiarizado com sistemas de tickets, pode ir direto para as
próximas páginas sobre como encontrar, criar e trabalhar com tickets.

## Introdução

No Zammad, **tickets** são usados para rastrear solicitações de atendimento
ao cliente. Na primeira vez que um cliente entra em contato com você sobre
algo, o Zammad cria um novo ticket. Cada mensagem trocada entre você e o
cliente é adicionada a esse ticket até que o assunto seja resolvido, o
cliente esteja satisfeito e o ticket seja finalmente fechado. Uma única
mensagem em um ticket é chamada de **artigo**. Basicamente, você pode pensar
em um **ticket** como uma **conversa** entre você e um cliente sobre um
único assunto.

Se você é completamente novo em um sistema de tickets e até agora tratava as
solicitações dos clientes com um cliente de email, pode achar que um sistema
de tickets é complicado. Mas é justamente o contrário:

- Todos os emails agora são coletados no Zammad (e solicitações de outros
  canais também podem ser).
- Você e seus colegas podem ver quem está trabalhando em qual solicitação de
  cliente ("ticket").
- O estado de cada solicitação, assim como o histórico (quem fez o quê?), é
  transparente.
- Não há trabalho duplicado e nada passa despercebido.
- Você pode pedir ajuda aos colegas diretamente no ticket em casos difíceis.
- Com a interface intuitiva do Zammad, você pode focar no que importa:
  resolver os problemas dos clientes e responder às perguntas deles.

Isso significa que você pode trabalhar com o Zammad de forma semelhante ao
seu cliente de email. Exceto que um ticket tem atributos
adicionais. Continue lendo para saber mais.

## Atributos do ticket

Além dos artigos, os tickets têm algumas metainformações adicionais chamadas
atributos. Use a **barra lateral do ticket** para visualizar e alterar os
atributos do ticket.

![Captura de tela mostra a barra lateral do
ticket](/screenshots/cypress/documentation/use/basics.cy.js/ticket-sidebar.png)

Para ocultar a barra lateral, clique no botão de recolher com a seta no lado
esquerdo da barra lateral. Clique em uma das abas para trazê-la de volta. As
opções disponíveis dependem dos seus privilégios e da configuração do seu
sistema.

É até possível criar campos personalizados para tickets (também para grupos,
usuários e organizações). Você acha que um campo personalizado desses faz
sentido? Converse com seu administrador do Zammad; pode ser configurado
facilmente.

### Estado

O estado reflete a situação atual de um ticket (principalmente se uma
solicitação do cliente está resolvida ou não). Pense nisso como uma
representação do progresso rumo à conclusão. Por padrão, há os seguintes
estados:

- **New**: estado para tickets novos nos quais ninguém trabalhou ainda. Ao
  atualizar um ticket pela primeira vez, ele muda automaticamente para
  aberto.
- **Open**: estado para tickets que ainda não foram resolvidos e algum
  trabalho precisa ser feito.
- **Pending Close**: estado para tickets que basicamente já estão
  resolvidos, mas você não quer fechá-los imediatamente. Esse estado exige
  que você informe uma data e hora em que o ticket muda automaticamente para
  fechado.
- **Pending Reminder**: estado para tickets abertos sobre os quais você quer
  ser lembrado em uma determinada data e hora. Exige que você informe uma
  data e hora em que deseja ser notificado. Por exemplo, útil se você tinha
  uma pergunta para terceiros e quer garantir que esse assunto não seja
  esquecido.
- **Merged**: estado para um ticket que foi mesclado em outro
  ticket. Consulte os [tickets
  vinculados](/pt_BR/documentation/use/advanced-features#link-tickets) para
  ver o ticket relacionado.

Os estados de ticket do Zammad têm código de cores. Isso ajuda você a
entender o estado do ticket muito mais rápido em geral, sem precisar olhar
os detalhes.

![Captura de tela mostra diferentes estados com código de
cores](/screenshots/documentation/use/overviews/states.png)

### Prioridade

A prioridade de um ticket é simplesmente uma classificação (de 1 a 3) de
quão urgente ou importante ele é. As três prioridades padrão são:

- 1 baixa
- 2 normal
- 3 alta

Caso essas prioridades não sejam suficientes, peça ao seu administrador do
Zammad para criar outras adicionais. As prioridades padrão permitem que você
reconheça imediatamente a importância dos seus tickets, pois têm código de
cores:

![Captura de tela mostra diferentes prioridades com código de
cores](/screenshots/documentation/use/overviews/priorities.png)

Você deve estar se perguntando para que serve essa prioridade de ticket. Por
padrão, ela não faz nada além do destaque visual. No entanto, os
administradores do Zammad podem configurar todo tipo de automação e análise
com base na prioridade.

Esteja ciente de que os clientes não podem definir uma prioridade para seus
próprios tickets. Caso contrário, alguns poderiam sempre definir seus
tickets como alta e esperar por um escalonamento imediato.

### Tags

Tags são rótulos personalizados que podem ser atribuídos a tickets para
facilitar encontrá-los no futuro. Elas podem ser usadas em condições, como
em gatilhos e visões gerais, e também podem ser atribuídas automaticamente
por macros, agendadores e gatilhos. É claro que você pode pesquisar pelo
texto das tags e encontrará os tickets que têm essa tag atribuída.

![Captura de tela mostra a área de tags na barra lateral do
ticket](/screenshots/cypress/documentation/use/advanced-features.cy.js/ticket-tags.png)

Na barra lateral do ticket, você encontra uma seção rotulada como
**Tags**. Adicione uma tag clicando no botão ::+::. Dependendo da
configuração do seu Zammad, você pode criar novas tags simplesmente
digitando e confirmando com [[enter]] ou [[tab]]. Em qualquer caso, você
pode escolher entre as tags já disponíveis. Comece a digitar e você verá uma
lista com sugestões correspondentes. Para removê-la, clique no botão ::x::
no lado direito da tag. Esse botão só aparece quando você move o mouse sobre
a tag.

### Grupo

Esse atributo de ticket é útil para organizações com mais de uma equipe. Um
uso comum é ter um grupo por departamento da empresa. Dependendo das
permissões, você pode não ver mais o ticket após trocar o grupo e salvar as
alterações. Se o campo de grupo não aparece, ou há apenas um grupo no seu
sistema Zammad, ou você não tem permissão para criar um ticket em outros
grupos.

### Responsável

Esta é a pessoa atualmente responsável pelo ticket. Caso você precise de
informações de outro colega, você pode mudar o responsável para essa pessoa
ou mencioná-la em um artigo digitando [[@]][[@]] e selecionando o
usuário. Nesse último caso, o usuário é notificado e automaticamente
inscrito para receber notificações sobre atualizações do ticket.

Para mudar o responsável para uma pessoa que só tem acesso aos tickets de
outro grupo, primeiro é preciso trocar o grupo adequadamente.

-----

Agora que você conhece os fundamentos, acesse uma das seguintes páginas:

- [Encontrar tickets](/pt_BR/documentation/use/basics/find-tickets)
- [Criar tickets](/pt_BR/documentation/use/basics/create-tickets)
- [Trabalhar com tickets](/pt_BR/documentation/use/basics/work-with-tickets)
