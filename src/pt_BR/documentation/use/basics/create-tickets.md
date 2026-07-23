---
order: 4
title: 'Criar tickets'
---

# Criar tickets

Quando um cliente envia uma mensagem por um canal que o Zammad busca
automaticamente, um ticket é criado automaticamente (a menos que o Zammad o
reconheça como um acompanhamento, e então ele é adicionado como um artigo a
um ticket existente). No entanto, pode haver casos em que você precisa criar
um ticket manualmente. Exemplos:

- Um cliente liga para você por telefone.
- Você recebe uma carta em papel de um cliente.
- Um cliente vai até um balcão de atendimento físico.
- Você precisa informar proativamente um cliente enviando uma mensagem.

Em situações como essas, você precisa criar um novo ticket manualmente e
clicar no botão ::+:: na parte inferior da navegação principal. Isso mostra
uma tela de criação de ticket onde você pode adicionar todas as informações
necessárias.

![Captura de tela mostra a tela de criação de
ticket](/screenshots/cypress/documentation/use/basics.cy.js/ticket-create.png)

## Seletor de tipo

Na caixa de diálogo de criação de ticket, você pode escolher entre
diferentes tipos de artigo:

- Chamada recebida: para assuntos iniciados por um cliente por telefone.
- Chamada realizada: para assuntos iniciados por um agente por telefone.
- Enviar email: para assuntos iniciados por um agente por email.

Ao escolher **Send Email**, o cliente recebe um email com o título como
assunto e o texto como conteúdo do email.

## Título

Este é o título de um ticket, que é exibido em muitos lugares no Zammad. Por
exemplo, ele é exibido nas visões gerais. Também é usado como assunto para
comunicação por email. Para emails, um identificador de ticket é
automaticamente adicionado (por exemplo, `Ticket#901234 - I need help!`).

## Cliente

Informe um nome ou endereço de email de um cliente para pesquisar contas
existentes. Você pode até pesquisar organizações e seus membros. Selecione
uma opção no menu suspenso ou crie um novo cliente clicando no botão `+
Create new Customer` no lado direito do campo. Isso abre uma caixa de
diálogo onde você pode fornecer todas as informações relevantes do
cliente. Um ticket só pode ter um cliente.

Depois de definir um cliente na caixa de diálogo de criação de ticket, a
barra lateral do cliente abre automaticamente. Você pode ver metainformações
adicionais do cliente, incluindo uma dica sobre os tickets atualmente
abertos do cliente.

## Texto

Esta é a seção de conteúdo onde os detalhes atualmente conhecidos do assunto
são registrados. Para o tipo "Send Email", este é o conteúdo/mensagem do
email. Para saber mais sobre o editor e seus recursos, consulte a
[documentação do editor](/pt_BR/documentation/use/guides/editor).

## Atributos do ticket

Como você já deve saber, há atributos de ticket adicionais, como grupo,
prioridade e responsável, que você pode definir. Se você ainda não leu os
[fundamentos de tickets](ticket-basics), confira para saber mais.

-----

Depois de fornecer as informações relevantes, finalmente crie o ticket
clicando no botão `Create`. Continue lendo [como trabalhar com tickets
existentes](work-with-tickets).
