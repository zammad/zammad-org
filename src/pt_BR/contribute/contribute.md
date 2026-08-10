---
order: 1
---

# Contribuir

Ficamos felizes em ver você contribuir com o Zammad! Você pode fazer isso de
várias formas. As contribuições geralmente são feitas clonando um dos nossos
repositórios no GitHub e criando um pull request com suas alterações (exceto
para traduções, veja abaixo). 🚀

Você pode contribuir com:

- [Código-fonte](contribute#zammad-source-code)
- [Documentação](contribute#documentation)
- [Tradução](contribute#translation)

Dê uma olhada nas seções abaixo sobre como contribuir. Todos os repositórios
podem ser encontrados no [Github](https://github.com/zammad){target=_blank}.

## Código-fonte do Zammad

O código-fonte do Zammad pode ser encontrado no GitHub, no [repositório do
Zammad](https://github.com/zammad/zammad){target=_blank}. Consulte o [manual
do
desenvolvedor](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
para começar.

### Branches/versões suportadas

O repositório do Zammad no Github tem várias branches:

#### `develop`

- Este é o estado de desenvolvimento atual (ainda não lançado) do próximo
  lançamento principal (que se tornará a nova branch `stable`).
- Não use isso em produção!
- Esta branch é suportada ativamente e recebe correções de bugs regulares,
  além de atualizações de segurança (consulte a [Política de
  Segurança](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  para mais detalhes).

#### `stable`

- Este é o lançamento estável atual, por exemplo, Zammad 5.2.
- Use esta branch para instalações de produção.
- Esta branch é suportada ativamente e recebe correções de bugs regulares,
  além de atualizações de segurança (consulte a [Política de
  Segurança](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  para mais detalhes).

#### `stable-x.y`

- Estas são as branches de versões antigas do Zammad, como `stable-5.1` para
  o Zammad 5.1.
- Não use isso em produção!
- Correções de bugs e atualizações de segurança não são aplicadas a essas
  branches.

## Documentação

A documentação que você está lendo está disponível em zammad.org e
next.zammad.org e é construída com o Vitepress. Os arquivos-fonte são
escritos em Markdown. Certifique-se de alterar apenas os arquivos-fonte em
inglês, localizados em `/src/en/`. A tradução é feita via Weblate e
sobrescreverá quaisquer alterações nas pastas específicas de idioma (exceto
`/src/en/`).

Abra um novo pull request no GitHub em
<https://github.com/zammad/zammad-org> (visando a branch `develop`) com suas
alterações e certifique-se de seguir o [guia de estilo e
conteúdo](style-guide) e ler o [README.md do
repositório](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Tradução

Se você quiser nos ajudar com a tradução e melhorar o suporte multilíngue do
Zammad ou da documentação, você é bem-vindo para contribuir também! A
tradução do Zammad e da documentação é feita via Weblate, um serviço para
tradução colaborativa de projetos. Basta acessar a [instância
Weblate](https://translations.zammad.org/){target=_blank} do Zammad. Você
pode criar uma conta (se ainda não tiver uma) ou até entrar com sua conta do
Github!

Vamos cobrir alguns passos básicos nas seções a seguir para você começar a
traduzir. No entanto, se você quiser usar alguns recursos adicionais do
Weblate e se aprofundar mais, a [documentação de
tradução](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
deles é um bom ponto de partida.

### Fundamentos

A tradução do **Zammad** e a tradução da **documentação** são divididas em projetos diferentes no Weblate.
Quando você clica no menu superior em _Projects > Browse all projects_, você encontra a visão geral dos projetos:

![Captura de tela mostrando os projetos de tradução no Weblate e o
menu](/screenshots/contribute/weblate-overview-docs.png)

Estrutura dos projetos de tradução no Weblate:

- Documentação
  - Nova documentação em next.zammad.org
  - Nova documentação em zammad.org
- Zammad
  - Zammad (`develop`, versão de desenvolvimento)
  - Zammad (versão `stable`)
  - Alguns outros que não são relevantes aqui

Selecione um projeto (documentação ou Zammad) e mude para a aba
**Components**. Selecione o que deseja traduzir. Depois disso, você pode ver
o status da tradução para os diferentes idiomas, como visto na captura de
tela a seguir:

![Captura de tela mostrando o status de tradução de diferentes idiomas para
a documentação do
usuário](/screenshots/contribute/weblate-project-overview.png)

::: tip
Não deve fazer muita diferença qual componente/branch você escolhe para traduzir. Quando o Weblate detecta as mesmas strings em
diferentes componentes, elas serão usadas para todas as branches e só precisam ser traduzidas uma vez. Em caso de dúvida, escolha
`develop`.
:::

### Traduzindo

Agora verifique a coluna "Unfinished" do seu idioma e clique no número
ali. Isso abre a primeira string não traduzida e, em teoria, você pode
começar a traduzir. Mas primeiro vamos dar uma breve olhada na interface do
usuário do Weblate:

![Captura de tela da interface de tradução do
Weblate](/screenshots/contribute/weblate-ui.png)

1. **Trilha de navegação (breadcrumbs)** com o caminho até o projeto,
   componente e idioma atuais
2. A **área de tradução** em si. Você encontra a string de origem no topo e
   o campo para sua tradução abaixo.
3. **Glossário**: quando uma string ou parte dela é detectada como presente
   no glossário, você encontra informações adicionais ali. Também é
   destacada nas strings de origem.
4. **Algumas abas úteis**:
    - **Strings próximas**: mostra o contexto da palavra ou string
    - **Sugestões automáticas**: aqui você encontra sugestões automáticas do
      DeepL e sugestões de strings semelhantes que já foram traduzidas. Use
      o botão `Clone to translation` para inseri-las no campo de tradução e
      aplicar as alterações. Use o botão `Accept` para aceitar a tradução
      sugerida e passar automaticamente para a próxima string.
    - **Outros idiomas**: aqui você vê uma lista se e como a string foi
      traduzida para outros idiomas (pode ser útil para idiomas
      semelhantes).

### Marcação nas strings

Encontre abaixo alguns exemplos de strings de origem especiais, com um selo
indicando onde essa string pode ser encontrada. Tente manter a marcação
(ajustada) e certifique-se de manter as variáveis. A seção **Source string
location** no Weblate (no lado direito) oferece uma dica de onde procurar o
contexto. Consulte também o [guia de estilo da documentação](style-guide)
para mais informações sobre a sintaxe e o uso dos recursos do
Markdown/Vitepress.

`%s created ticket |%s|` <Badge type="tip" text="Zammad" />
: A string contém variáveis (`%s`) e marcação (`||`). Certifique-se de que a variável e a marcação estejam incluídas na
  tradução. A posição pode variar dependendo da tradução.

`` `example-string` `` <Badge type="tip" text="Documentation" />
: Isso é renderizado como código inline (`example-string`). Dependendo do contexto, pode ser traduzido ou não. Em qualquer
  caso, use um crase (`` ` ``) antes e depois da string na sua tradução também.

`[example](/en/path/to/document-or-website)` <Badge type="tip" text="Documentation" />
: Este é um link para outra página, incluindo o código do idioma. O "example" acima é o texto exibido como texto do
  link. Esta parte pode ser traduzida. Para o caminho, apenas o `en` pode ser substituído pelo código do idioma para o qual você está
  traduzindo. Certifique-se de que seu idioma já está presente no zammad.org (verifique usando o seletor de idioma).
  Caso contrário, entre em contato conosco se quiser que seu idioma seja ativado.

`**example string**` <Badge type="tip" text="Documentation" />
: Marcação para texto (por exemplo, negrito, itálico). Alternativa: `_example string_`. Tente manter a marcação em geral, mas ajuste-a
  para manter o sentido.
