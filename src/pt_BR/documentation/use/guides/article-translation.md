---
order: 7
title: 'Tradução de artigos'
---

# Tradução de artigos

Os agentes podem traduzir os artigos do ticket para o idioma de sua
preferência. Esse recurso é opcional e precisa ser configurado e ativado
pelo seu administrador.

Dependendo da configuração, você pode traduzir artigos individuais por conta
própria ou fazer o Zammad traduzir todos os artigos dos tickets que você
abrir. Você sempre pode voltar ao conteúdo original.

Uma tradução substitui o conteúdo original do artigo, e uma nota abaixo do
artigo informa que você está lendo uma tradução. O Zammad mantém a
formatação do texto original sempre que possível, mas parte dela pode se
perder quando o texto muda.

Ao lado de um artigo traduzido, o Zammad mostra um botão de tradução na
linha de ações do artigo, cujo ícone fica azul enquanto você lê a
tradução. Esse botão permite alternar entre a tradução e o conteúdo
original.

![Captura de tela mostra um artigo de ticket
traduzido](/screenshots/cypress/documentation/use/guide-translation.cy.js/translation-article.png)

::: info
O [recurso de destaque de texto](../advanced-features#highlight-text) só está disponível no texto original. Volte
ao conteúdo original se quiser destacar algo no artigo.
:::

## Escolha o seu idioma

O botão de idioma na barra superior do ticket mostra o código do seu idioma
de destino para traduções, por exemplo `EN-US`, e o nome completo do idioma
em uma dica ao passar o mouse. Clique no botão para abrir o menu de idiomas,
que lista os idiomas suportados pelo serviço de tradução configurado. Use o
campo de pesquisa se estiver procurando um idioma específico.

![Captura de tela mostra o menu de idiomas com a lista de idiomas e a chave
para traduzir todos os
artigos](/screenshots/cypress/documentation/use/guide-translation.cy.js/translation-target-menu.png)

O Zammad usa o idioma das suas configurações pessoais como padrão. Se o
serviço de tradução não suportar esse idioma, ele é definido como o padrão
do sistema do Zammad ou, se o padrão do sistema também não for suportado,
como inglês.

O seu idioma de destino para traduções é uma configuração pessoal: o Zammad
o lembra para a sua conta de usuário e o aplica a todo ticket que você
abrir, inclusive tickets em outras abas do navegador.

O idioma de destino para traduções é independente do idioma da interface do
Zammad, que você define nas suas [configurações pessoais](../user-profile).

## Traduzir um único artigo

Clique no botão de tradução na linha de ações do artigo para traduzir esse
artigo para o seu idioma de destino. Clique novamente para voltar ao texto
original.

![Captura de tela mostra um artigo com o botão de tradução na linha de
ações, destacado com uma
moldura](/screenshots/cypress/documentation/use/guide-translation.cy.js/translation-button.png)

Se o idioma de destino não for aquele em que você quer ler o artigo,
altere-o na barra superior do ticket, conforme descrito acima.

## Traduzir todos os artigos automaticamente

Se o seu administrador ativou a tradução automática para a sua função, o
menu de idiomas na barra superior do ticket também contém a chave
**Translate all articles** (veja a captura de tela em **Escolha o seu
idioma**). Enquanto ela estiver ativada, o Zammad traduz os artigos de todo
ticket que você abrir, para que você não precise traduzi-los um por
um. Artigos que já estão no seu idioma de destino mantêm o texto original;
isso exige que a detecção de idioma do artigo esteja ativada pelo seu
administrador.

Desative a chave se preferir traduzir artigos individualmente. Assim como o
seu idioma de destino, essa configuração se aplica a todo ticket que você
visualizar.

Se quiser ler um único artigo no idioma original novamente enquanto a chave
continua ativada para os outros, use **Show original** nele.

## Qualidade da tradução e feedback

As traduções são geradas automaticamente, então confira o resultado antes de
confiar nele.

Use os botões de joinha para cima ou para baixo abaixo de um artigo
traduzido para ajudar o seu administrador a avaliar a qualidade do serviço
de tradução; o joinha para baixo abre um campo onde você pode explicar o que
deu errado. Se não estiver satisfeito com uma tradução, use o botão de gerar
novamente na mesma linha (dica **Regenerate**) para traduzir o artigo outra
vez.
