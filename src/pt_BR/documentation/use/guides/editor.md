---
order: 3
title: Editor
---

# Editor

O editor do Zammad oferece uma experiência de edição de texto rico para
criar artigos. Deve ser autoexplicativo e simples de usar. Devido à
importância desse elemento central no Zammad, esta página cobre alguns
recursos que podem não ser visíveis à primeira vista.

![Captura de tela mostra o editor do
Zammad](/screenshots/cypress/documentation/use/guide-editor.cy.js/editor-overview.png)

## Special functions

O editor do Zammad inclui alguns recursos inteligentes. Você os encontra no
lado esquerdo da barra de ferramentas no editor. Como já são descritos em
outro lugar, aqui apenas fazemos referência a esses lugares para evitar
conteúdo duplicado.

- [Ferramentas de texto do assistente de IA](ai#writing-assistant-tools )
- [Mencionar usuários](../advanced-features#mention-a-user)
- [Inserir módulos de texto](../advanced-features#text-modules)
- [Inserir artigos da base de
  conhecimento](../advanced-features#insert-knowledge-base-article)

## Pasting complex content

Ao colar conteúdo de outras fontes, especialmente documentos contendo
tabelas, formatação complexa ou imagens, esteja ciente de que a aparência no
Zammad pode ser diferente. O editor tenta preservar sua formatação, se
possível, mas inconsistências podem ocorrer. Se você enfrentar essa
situação, tente copiar/colar o conteúdo aos poucos ou cole texto simples e
aplique a formatação no editor (veja a [seção de
formatação](#apply-formatting) abaixo).

## Parágrafos

Para separar parágrafos no editor, use a tecla [[enter]] **uma vez**. Isso é
renderizado como parágrafos com ou sem uma linha vazia, dependendo do
software usado pelo destinatário. Se você adicionar uma linha vazia
adicional, isso pode ser renderizado como duas linhas vazias do lado do
cliente.

## Cite text

Você pode querer citar o texto do seu cliente para se referir exatamente à
sua resposta e para que seu cliente não perca o fio em conversas
longas. Para usar esse recurso, basta selecionar o texto que deseja citar e
clicar no botão `reply` ou `forward` ao lado do artigo. Se você já inseriu
texto, ele é preservado, e o texto selecionado é inserido
adicionalmente. Isso significa que você pode repetir isso para citar
diferentes seções sem perder o texto já escrito.

## Apply formatting

Você pode formatar texto no editor de diferentes formas:

- Usando a barra de ferramentas integrada
- Usando atalhos de teclado
- Usando a sintaxe [Markdown](https://www.markdownguide.org){target=_blank}

A **barra de ferramentas** do editor inclui botões para tarefas comuns de
formatação. Passar o mouse sobre cada botão exibe uma dica explicando sua
função. Como alternativa, você pode usar **atalhos de teclado** (veja as
próximas duas seções). Ative a formatação previamente ou selecione o texto
depois de escrever e use a formatação que deseja aplicar.

### General keyboard shortcuts

O editor também suporta atalhos de teclado para agilizar seu fluxo de
trabalho. Esses atalhos são comuns em muitas ferramentas de processamento de
texto. Atalhos importantes são:

 Shortcut/command              | Formatting
-------------------------------|---------------
[[ctrl]] + [[b]]               | **Negrito**
[[ctrl]] + [[i]]               | _Itálico_
[[ctrl]] + [[u]]               | <u>Sublinhado</u>

Dê uma olhada nos atalhos de teclado no Zammad, onde você pode encontrar
todos os atalhos. Abra-o pelo [menu do
avatar](/pt_BR/documentation/use/user-profile#avatar-menu) no canto inferior
esquerdo ou digite [[?]].

Dê uma olhada na próxima seção para usar ainda mais formatação via
teclado. Independentemente de você estar acostumado a escrever em Markdown
ou não, alguns deles ainda podem ser úteis no seu trabalho diário.

### Markdown usage

Para usuários familiarizados com a sintaxe Markdown, o editor oferece
suporte básico para formatar conteúdo com Markdown. Ao usar a sintaxe
Markdown, ela é aplicada imediatamente ou após o delimitador de fechamento,
para que você veja o resultado diretamente no editor. Para voltar ao texto
padrão, basta usar o mesmo delimitador novamente ou usar [[enter]],
dependendo da opção.

Não é intenção suportar todos os recursos do Markdown, mas ajudar os
usuários a realizar as tarefas com mais facilidade. Portanto, as coisas mais
importantes são suportadas, como cabeçalhos, listas, links, blocos de código
e mais. Confira os exemplos de formatação não exaustivos abaixo.

Markdown Syntax                | Formatting
-------------------------------|---------------
`**`                           | Delimitador para **negrito**
`_`                            | Delimitador para _itálico_
`#`, `##`, `###`               | Cabeçalho, nível dependendo do número de `#`
`>`                            | Citação
`` ` ``                        | Delimitador para `código inline`
`` ``` ``                      | Bloco de código
`---`                          | Linha horizontal como divisor
