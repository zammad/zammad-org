---
features:
  - 
    details: 'Lorem ipsum...'
    icon: 🛠️
    link: https://zammad.com
    linkText: 'This is a link'
    target: _blank
    title: 'Simples e minimalista, sempre'
  - 
    details: 'Lorem ipsum...'
    icon:
      src: /assets/logo.svg
    link: https://zammad.com
    title: 'Outro recurso legal'
  - 
    details: 'Lorem ipsum...'
    icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    link: https://zammad.com
    title: 'Outro recurso legal'
order: 2
---

# Style and content guide

Este guia fornece uma visão geral do conteúdo que deve ser incluído na
documentação do Zammad, além de diretrizes de formatação e estilo para
garantir clareza e legibilidade.

As primeiras seções tratam de informações e regras gerais. Uma [seção com
exemplos](#examples) segue no final.

Se você tiver dúvidas, sinta-se à vontade para perguntar em nossa
comunidade. Se quiser contribuir, também pode conferir nossa [página de
contribuição](contribute) ou [perguntar em uma
issue](https://github.com/zammad/zammad-org/issues){target=_blank} para
começar.

## Audience assumptions

A documentação presume que os **usuários** têm um entendimento básico de
como usar navegadores web e estão familiarizados com conceitos comuns de
design de software. Isso significa, por exemplo, que os recursos são
descritos em detalhes, mas não a ponto de explicar como abrir um menu
suspenso.

O **administrador do Zammad** também deve ter um entendimento técnico básico
e estar familiarizado com os fluxos de trabalho e processos de comunicação
da sua empresa.

Para instâncias auto-hospedadas, os **administradores de sistema** também
devem estar familiarizados com noções básicas de administração de sistemas
Linux. O acesso ao sistema hospedeiro (por exemplo, via SSH) e as permissões
administrativas são considerados garantidos.

## Conteúdo

A documentação tem como objetivo incluir informações sobre:

- Como usar o Zammad
- Como gerenciar o Zammad como administrador (por exemplo, configurá-lo após
  a instalação, ajustar configurações, configurar recursos)
- Diferentes formas de instalar o Zammad
- Guias adicionais caso seja necessária configuração do sistema (hospedeiro)
  e/ou configuração de sistemas de terceiros.

Quanto ao **nível de detalhe**, as [suposições sobre o
público](#audience-assumptions) devem ser consideradas. Como um dos
objetivos do Zammad é ser intuitivo e amigável, não há necessidade de
descrever cada clique em detalhes. No entanto, etapas importantes devem ser
incluídas. Os leitores devem alcançar seus objetivos da forma mais rápida e
fácil possível, sem precisar ler muito.

Devido ao fato de que uma documentação não pode cobrir tudo (caso contrário,
estaria em um nível de detalhe quase de código), a relevância também deve
ser considerada. Se partes com um caso de uso comum estiverem faltando,
deve-se pretender incluí-las.

## Style and rules

As próximas seções cobrem coisas gerais a considerar ao escrever a
documentação. Depois delas, você encontra uma seção com alguns
[exemplos](#examples) sobre como formatar e estruturar o conteúdo.

### Fundamentos

- A documentação é escrita na linguagem de marcação Markdown. Os
  arquivos-fonte têm a extensão `.md`.
- O sistema usa o [Vitepress](https://vitepress.dev/){target=_blank} para
  construir o site.
- O idioma dos arquivos-fonte é inglês americano.
- A tradução da documentação é feita via Weblate, consulte a [seção de
  tradução](contribute#translation) na página de contribuição para mais
  detalhes.

### Estilo

- Use frases curtas e claras e priorize a informação em vez da complexidade.
- Use sentence case for page titles and headings. Capitalize the first word
  and the first letter of any proper noun (e.g. Zammad, Elasticsearch,
  Docker, GitLab) and acronym (SLA, SSO, API, JSON, etc.).
- Use separação em trilha de navegação para caminhos e locais com `>` como
  separador e formate o caminho em itálico, por exemplo, _Settings >
  Channels > Chat_.
- Use destaque de código para enfatizar trechos de programação.
- Use [caixas de informação, dica, aviso e perigo](#custom-boxes) quando
  necessário.
- Use uma [caixa de detalhes](#custom-boxes) quando o conteúdo pode não ser
  relevante para todos os leitores ou pode quebrar o fluxo de leitura de
  outra forma.
- Se disponível, use ícones para botões importantes da interface, como ::+::
  e ::x:: (veja [exemplos](#text-and-ui) abaixo).
- Use marcação de tecla como [[ctrl]] e [[x]] para destacar o pressionar de
  uma tecla (veja [exemplos](#text-and-ui) abaixo).
- Inclua capturas de tela quando necessário. A forma preferida de adicionar
  capturas de tela do Zammad é criá-las automaticamente [usando o
  Cypress](https://github.com/zammad/zammad-org?tab=readme-ov-file#automatic-screenshots-cypress){target=_blank}.
  Isso apoia a manutenibilidade da documentação, pois as capturas de tela
  são regeneradas a cada execução do pipeline de build. Observe que o uso do
  Cypress não faz parte desta documentação.
- Forneça instruções passo a passo com explicações claras.
- Use exemplos ou cenários para ilustrar conceitos.
- Inclua imagens ou diagramas relevantes quando necessário.
- Escreva abreviações por extenso na primeira vez que forem usadas, ou
  inclua-as no glossário e link para elas. Abreviações amplamente usadas e
  comuns podem ser excluídas desta regra.
- Em caso de dúvida, alinhe-se à documentação existente.

### Convenções

A stack da documentação inclui verificações automatizadas (linting) para
garantir conformidade com o guia de estilo e regras comuns para arquivos
Markdown. Para verificar se suas alterações estão em conformidade, execute
`pnpm lint` para realizar a verificação. Alguns dos problemas identificados
podem até ser corrigidos automaticamente executando `pnpm
lint:fix`. Certifique-se de executar a verificação antes de fazer commit das
suas alterações. Caso contrário, o build da documentação falhará.

O linting usado tem algumas regras integradas que você pode encontrar no
[repositório
oficial](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#rules--aliases){target=_blank}.
Algumas regras importantes e personalizadas são mencionadas abaixo.

- O comprimento de linha de 120 caracteres no arquivo-fonte não pode ser
  excedido para texto padrão. Certifique-se de usar uma quebra de linha
  antes de atingir esse limite. Um indicador visual no seu editor pode ser
  útil. Isso não se aplica a conteúdo especial, como caminhos para capturas
  de tela e links longos.
- Múltiplas linhas vazias consecutivas não são permitidas.
- Linhas vazias antes e depois de cabeçalhos e blocos de código cercados são
  obrigatórias.
- Use `` ``` `` (crases) para blocos de código cercados, seguidos de uma tag
  de linguagem obrigatória, por exemplo, `ruby` ou `sh`. Se nenhuma
  linguagem for aplicável, use `plain`.
- Use `-` para listas com marcadores (listas não ordenadas) como esta.
- Para distinguir facilmente entre **negrito** e _itálico_, use `_` ao redor
  do texto para itálico e `**` para negrito (por exemplo, `_itálico_`
  vs. `**negrito**`).
- Múltiplos cabeçalhos com o mesmo conteúdo não são permitidos.
- Cada documento deve ter exatamente um cabeçalho `h1` como título.
- A resolução das capturas de tela de página inteira manuais para
  _visualização mobile_ é 400x867 pixels.
- A resolução das capturas de tela de página inteira manuais para
  _visualização desktop_ é 1920x1080 pixels.

### Exemplos

#### Texto e interface

| Type                                      | Highlighting in documentation | Markdown syntax                     |
|-------------------------------------------|-------------------------------|-------------------------------------|
| Labeled buttons                           | `Sign in`                     | `` `Sign in` ``                     |
| Fields, labeled UI elements, menu items   | **Name**                      | `**Name**`                          |
| Breadcrumb paths / navigation chains      | _Settings > Channels > Email_ | `_Settings > Channels > Email_`     |
| File and directory paths                  | `/opt/zammad`                 | `` `/opt/zammad` ``                 |
| Placeholder values for configuration      | `<your-fqdn>`                 | `` `<your-fqdn>` ``                 |
| Placeholder values for API requests       | `{ticket id}`                 | `` `{ticket id}` ``                 |
| Commandline config values, ports, keys    | `9200`                        | `` `9200` ``                        |
| Keyboard shortcuts                        | [[x]]                         | `[[x]]`                             |
| Add button                                | ::+::                         | `::+::`                             |
| Delete button                             | ::x::                         | `::x::`                             |
| Action menu                               | ::a::                         | `::a::`                             |
| Copy to clipboard button                  | ::c::                         | `::c::`                             |

#### Heading structure

Todo arquivo de documentação deve incluir exatamente um título de nível
superior (como `# Title`). Níveis abaixo devem sempre conter pelo menos duas
seções. Se existir apenas uma seção, considere mesclá-la com o conteúdo de
nível superior.

Exemplo:

`# Título da página`

`## Seção 1`

`### Seção 1.1`

`### Seção 1.2`

`## Seção 2`

#### Seção com selo <Badge type="warning" text="custom text" />

Este título de seção usa um selo do tipo "warning". Há outros selos
disponíveis, veja
<https://vitepress.dev/reference/default-theme-badge#usage>.

**Uso:**

::: details

```md
Texto/título para adicionar um selo <Badge type="warning" text="custom text" />
```

:::

#### Caixas personalizadas

::::: info
Esta é uma caixa de informação.

**Uso:**

:::: details

```md
::: info
Esta é uma caixa de informação.
:::
```

::::
:::::

::::: tip
Esta é uma dica.

**Uso:**

:::: details

```md
::: tip
Esta é uma caixa de dica.
:::
```

::::
:::::

::::: warning
Este é um aviso.

**Uso:**

:::: details

```md
::: warning
Esta é uma caixa de aviso.
:::
```

::::
:::::

::::: danger
Este é um aviso perigoso.

**Uso:**

:::: details

```md
::: warning
Esta é uma caixa de aviso perigoso.
:::
```

::::
:::::

:::: details
Este é um bloco de detalhes.

**Uso:**

```md
::: details
Este é o conteúdo mostrado no estado expandido.
:::

```

::::

#### Listas de definição

First term <Badge type="info" text="tag1" />
: This is the definition of the first term.

Second term <Badge type="info" text="tag1" /> <Badge type="tip" text="tag1" />
: This is one definition of the second term.
: This is another definition of the second term.

**Uso:**

::: details

```md
First term <Badge type="info" text="tag1" />
: This is the definition of the first term
  with another line.
```

:::

#### Highlighting with boxes

Para destacar diferentes opções ou variantes, caixas clicáveis podem ser
usadas.

<VPDocFeatures />

A definição do conteúdo é feita via frontmatter, veja o exemplo a seguir
(reflete as caixas acima):

```yml

features:
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
    link: https://zammad.com
    linkText: This is a link
    target: _blank
  - icon:
      src: /assets/logo.svg
    title: Another cool feature
    details: Lorem ipsum...
    link: https://zammad.com
  - icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    title: Another cool feature
    details: Lorem ipsum...
    link: https://zammad.com

```

Para colocá-lo na área de conteúdo, simplesmente insira a referência `<VPDocFeatures />` no ponto onde ela deve ser
renderizada.

#### Theme specific images

Para direcionar recursos de imagem específicos a um único tema, você pode
atribuir a classe CSS `.dark-only` ou `.light-only` à imagem correspondente:

```md
![Imagem apenas para tema escuro](/assets/logo-flat-dark.svg){.dark-only}
![Imagem apenas para tema claro](/assets/logo-flat-light.svg){.light-only}
```

![Imagem apenas para tema escuro](/assets/logo-flat-dark.svg){.dark-only
width=240} ![Imagem apenas para tema
claro](/assets/logo-flat-light.svg){.light-only width=240}
