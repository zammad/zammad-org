---
features:
  - 
    details: 'Lorem ipsum...'
    icon: 🛠️
    link: https://zammad.com
    linkText: 'This is a link'
    target: _blank
    title: 'Simple and minimal, always'
  - 
    details: 'Lorem ipsum...'
    icon:
      src: /assets/logo.svg
    link: https://zammad.com
    title: 'Another cool feature'
  - 
    details: 'Lorem ipsum...'
    icon:
      dark: /assets/logo-flat-dark.svg
      light: /assets/logo-flat-light.svg
    link: https://zammad.com
    title: 'Another cool feature'
order: 2
---

# Водич кроз стил и садржај

Овај водич вам пружа преглед садржаја Zammad документације, као и упутства
за форматирање и стилизовање текста ради јасноће и читљивости.

Први одељци садрже уопштене информације и правила. [Одељак са
примерима](#примери) је на крају.

Уколико имате додатних питања, слободно се обратите нашој онлајн
заједници. Ако желите да учествујете, можете погледати нашу страницу о
[доприносима](contribute) или [отворите проблем са
питањем](https://github.com/zammad/zammad-org/issues){target=_blank} за
смернице.

## Претпоставке о публици

Документација је написана у стилу који подразумева да наши **корисници**
поседују основно знање о употреби претраживача и концептима софтверског
дизајна. Ово на пример значи да су функције описане до детаља, али не на
нивоу како приступити падајућем менију.

**Zammad администратор** треба додатно да поседује основно техничко
разумевање радних токова и процеса комуникације у својој фирми.

За инстанце које сами хостују, **администратори система** такође треба да
буду упознати са основама администрације Linux система. Приступ систему који
хостује (нпр. путем SSH) и администраторске дозволе се подразумевају.

## Садржај

Циљ документације да садржи информације о:

- Начину коришћења Zammad-а
- Како управљати Zammad-ом као администратор (нпр. поставка након
  инсталације, подешавања, конфигурација функција)
- Различити начини како инсталирати Zammad
- Додатни водичи уколико је неопходна конфигурација система (за хостовање)
  и/или конфигурација сервиса трећих лица.

У зависности од **нивоа детаља**, неопходно је узети у обзир [претпоставке о
публици](#претпоставке-о-публици). Управо из разлога зато што је један од
циљева Zammad-а да буде интуитиван и прилагођен кориснику, није неопходно
објашњавати сваки посебан клик мишем. Међутим, важни кораци морају бити
укључени. Читаоци би требало да постигну своје циљеве што брже и
једноставније без потребе да пуно читају.

Due to the fact that a documentation can't cover everything (otherwise it
would be on a code-like detail level), the relevance has to be
considered. If parts with a common use case are missing, it should be
intended to include them in the documentation.

## Стил и правила

The next sections cover general things to consider writing the
documentation. After these you can find a section with some
[examples](#examples) about how to format and structure the content.

### Основе

- Документација је написана у Markdown језику описа страна. Изворне датотеке
  имају `.md` екстензију.
- Систем користи [Vitepress](https://vitepress.dev/){target=_blank} за
  прављење веб сајта.
- Изворни језик датотека је амерички енглески.
- The translation of the documentation is done via Weblate, see [translation
  section](contribute#translation) in the contribute page for more details.

### Стил

- Користите кратке и јасне реченице, дајући предност информацијама у односу
  на сложеност.
- Наслови страна и поднаслови: започните великим словом све речи осим
  изузетих (погледајте [title
  case](https://en.wikipedia.org/wiki/Title_case){target=_blank}).
- Одвојите путање навигације са `>` сепаратором и користите форматирање у
  курзиву, нпр. _Подешавања > Канали > Ћаскање_.
- Користите назначавање изворног кода да бисте нагласили секције о
  програмском језику.
- Користите [оквире са информацијама, саветима и
  упозорењима](#прилагођени-оквири) по потреби.
- Користите [одељак са детаљима](#прилагођени-оквири) када садржај можда
  није релевантан за све читаоце и има потенцијал да прекине ток мисли).
- If available, use icons for important UI buttons like ::+:: and ::x:: (see
  [examples](#text-and-ui) below).
- Убаците снимке екрана по потреби. Пожељан начин додавања снимака екрана из
  Zammad-а је њиховим аутоматским креирањем [коришћењем Cypress
  апликације](https://github.com/zammad/zammad-org?tab=readme-ov-file#automatic-screenshots-cypress){target=_blank}.
  Ово доприноси лакшем одржавању документације јер ће свежи снимци екрана
  бити аутоматски направљени сваки пут кад се генерише
  документација. Обратите пажњу да је начин коришћења Cypress-а изван обима
  ове документације.
- Приложите упутства корак по корак са јасним објашњењима.
- Користите примере или сценарије да илуструјете концепте.
- Убаците релевантне слике или дијаграме по потреби.
- Дефинишите скраћенице када се први пут користе или их укључите у речник и
  убаците везу на њих. Нашироко коришћене и уобичајене скраћенице могу бити
  искључене из овог правила.
- Ако сте у недоумици, ускладите се са постојећом документацијом.

### Конвенције

Алати за прављење документације укључују аутоматске провере (linting) да би
осигурали усклађеност са водичем кроз стил и основним правилима за Markdown
садржај. Да бисте проверили усклађеност, покрените `pnpm lint` за покретање
провере. Неки уобичајени проблеми се чак могу и аутоматски поправити
покретањем `pnpm lint:fix`. Обратите пажњу да покренете проверу пре слања
ваших измена. У супротном, генерисање документације неће успети.

The used linting has some built in rules which you can find in [the official
repository](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#rules--aliases){target=_blank}.
Some important rules and customized ones are mentioned below.

- Дужина линије у изворној датотеци не би требало да прелази 120 карактера
  за стандардан текст. Обратите пажњу да убаците ред пре постизања ове
  границе. Визуелни индикатор у вашем уреднику текста вам може помоћи. Ово
  се не односи на специјалан садржај као путање на снимке екрана и дугачке
  везе.
- Више узастопних празних редова није дозвољено.
- Празни редови пре и после наслова и блокова кôда су обавезни.
- Use `` ``` `` (backticks) for fenced code blocks, followed by a mandatory
  language tag, e.g. `ruby` or `sh`. If no language is applicable, use
  `plain`.
- Use `-` for bullet point lists (unordered lists) like this one.
- To easily distinguish between **bold** and _italics_, use `_` around the
  text for italics and `**` for bold (e.g.  `_italic_` vs. `**bold**`).
- Multiple headings with the same content are not allowed.
- Each document must have exactly one `h1` heading as title.
- Resolution of manual full page screenshots for _mobile view_ is 400x867
  pixels.
- Resolution of manual full page screenshots for _desktop view_ is 1920x1080
  pixels.

### Examples

#### Text and UI

| Type                      | Highlighting in documentation | Markdown syntax                 |
|-------------------------- |-------------------------------|---------------------------------|
| Labeled buttons           | `Sign in`                     | \`Sign in\`                     |
| Fields and UI elements    | **Name**                      | \*\*Name\*\*                    |
| Locations/paths           | _Settings > Channels > Email_ | \_Settings > Channels > Email\_ |
| Keyboard shortcuts        | [[x]]                         | \[\[x\]\]                       |
| Add button                | ::+::                         | \:\:\+\:\:                      |
| Delete button             | ::x::                         | \:\:x\:\:                       |
| Action menu               | ::a::                         | \:\:a\:\:                       |

#### Структура наслова

Every documentation file must include exactly one title on top level (like
`# Title`). Levels below should always contain at least two sections. If
only one section exists, consider merging it with the higher-level content.

Пример:

`# Наслов стране`

`## Одељак 1`

`### Одељак 1.1`

`### Одељак 1.2`

`## Одељак 2`

#### Section with Badge <Badge type="warning" text="custom text" />

Наслов овог одељка користи значку „упозорења”. Доступне су и остале значке,
погледајте <https://vitepress.dev/reference/default-theme-badge#usage>.

::: details Usage

```md
Одељак са значком <Badge type="warning" text="прилагођен текст" />
```

:::

#### Прилагођени оквири

::::: info
Ово је информациони оквир.

:::: details Usage

```md
::: info
Ово је информациони оквир.
:::
```

::::
:::::

::::: tip
Ово је савет.

:::: details Usage

```md
::: tip
This is a tip box.
:::
```

::::
:::::

::::: warning
Ово је упозорење.

:::: details Usage

```md
::: warning
This is a warning box.
:::
```

::::
:::::

::::: danger
Ово је упозорење на опасност.

:::: details Usage

```md
::: warning
Ово је упозорење на опасност.
:::
```

::::
:::::

:::: details
Ово је одељак са детаљима.

Начин коришћења:

```md

::: details Box title shown in collapsed state
This is the content shown in the expanded state.
:::

```

::::

#### Листе дефиниција

Први термин <Badge type="info" text="tag1" />
: Ово је дефиниција првог термина.

Други термин <Badge type="info" text="tag1" /> <Badge type="tip" text="tag2" />
: Ово је дефиниција другог термина.
: Ово је додатна дефиниција другог термина.

::: details Usage

```md
Први термин <Badge type="info" text="tag1" />
: Ово је дефиниција првог термина
  са додатном линијом текста.
```

:::

#### Highlighting with Boxes

To highlight different options or variants, clickable boxes can be used.

<VPDocFeatures />

The definition of the content is done via frontmatter, see following example
(reflects the boxes above):

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

To place it within the content area, simply insert the reference `<VPDocFeatures />` at the point where it has to be
rendered.
