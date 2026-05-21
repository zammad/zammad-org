---
order: 1
---

# Учествујте

We are happy to see you contribute to Zammad! You can do this in several
ways. Contributions are mainly done by cloning one of our repos on GitHub
and creating a pull request with your changes (except for translations, see
below). 🚀

Можете допринети:

- [Изворном коду](contribute#zammad-изворни-кoд)
- [Документацији](contribute#документација)
- [Преводу](contribute#превод)

Погледајте наш одељак како можете да допринесете. Све репозиторије можете
пронаћи на [GitHub](https://github.com/zammad){target=_blank}-у.

## Zammad изворни кoд

Изворни код Zammad-а можете пронаћи на GitHub-у у [Zammad
репозиторијуму](https://github.com/zammad/zammad){target=_blank}. Прочитајте
[уџбеник за
програмере](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
за почетак.

### Подржани огранци/верзије

GitHub репозиторијум Zammad-а има неколико огранака:

#### `develop`

- Ово је тренутно (необјављено) развојно стање следећег већег издања
  (постаће нови `stable` огранак).
- Не користите у продукцији!
- Овај огранак има активну подршку и добија редовне исправке грешака и
  сигурносних пропуста (погледајте [безбедносну
  полису](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  за детаље).

#### `stable`

- Ово је тренутно стабилно издање, нпр. Zammad 5.2.
- Користите овај огранак за инсталације у продукцији.
- Овај огранак има активну подршку и добија редовне исправке грешака и
  сигурносних пропуста (погледајте [безбедносну
  полису](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  за детаље).

#### `stable-x.y`

- Ово су огранци старих Zammad издања као `stable-5.1` за Zammad 5.1.
- Не користите у продукцији!
- Исправке грешака и сигурносних пропуста се не примењују на ове огранке.

## Документација

Документација коју читате је доступна под zammad.org и next.zammad.org и
направљена је у Vitepress систему. Изворне датотеке су написане у Markdown
формату. Обратите пажњу да мењате само изворне датотеке на енглеском језику
које су под `/src/en/` директоријумом. Преводи се обрађују преко Weblate
апликације и преписаће све измене направљене под директоријумима специфичних
језика (осим `/src/en/`).

Отворите нови GitHub pull request на <https://github.com/zammad/zammad-org>
(заснован на `develop` огранку) са вашим изменама и обавезно испратите
[водич кроз стил и садржај](style-guide). Узмите у обзир и инструкције у
[README.md датотеци
репозиторија](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Превод

If you want to help us with translation and improve the multi-language
support of Zammad or the documentation, you are welcome to contribute as
well! The translation of Zammad and the documentation is done via Weblate,
which is a service for the collaborative translation of projects. Just head
over to Zammad's [Weblate
instance](https://translations.zammad.org/){target=_blank}.  You can either
create an account (if you don't have one already) or even sign in with your
Github account!

Представићемо неке основне кораке у следећим одељцима како бисте могли да
започнете са превођењем. Међутим, уколико желите да користите напредне
Weblate функције и да дубље уђете у проблематику, њихова [званична
документација](https://docs.weblate.org/en/latest/user/translating.html){target=_blank}
вам може помоћи.

### Основе

The translation of **Zammad** and the translation of the **documentation** are split into different projects in Weblate.
When you click in the top menu under _Projects > Browse all projects_, you can find the overview of the projects:

![Screenshot showing translation projects in Weblate and
menu](/screenshots/contribute/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

- Документација
  - Нова документација на next.zammad.org
  - Нова документација на next.zammad.org
- Zammad
  - Zammad (`develop`, развојна верзија)
  - Zammad (`stable` верзија)
  - Some more which aren't relevant here

Select a project (documentation or Zammad) and switch to the **Components**
tab. Select the one you want to translate.  After that, you can see the
status of translation for the different languages, as you can see in the
following screenshot:

![Screenshot showing translation status of different languages for the user
documentation](/screenshots/contribute/weblate-project-overview.png)

::: tip
It should be no big difference which component/branch you choose to translate. When Weblate detects the same strings in
different components, they will be used for all branches and only have to be translated once. If in doubt, choose
`develop`.
:::

### Превођење

Now check the "Unfinished" column of your language and click on the number
there. This opens the first untranslated string and, in theory, you can
start translating. But let's first have a brief look at the user interface
of Weblate:

![Screenshot of Weblate translation user
interface](/screenshots/contribute/weblate-ui.png)

1. **Breadcrumbs with path** to the current project, component and language
2. **Translation area** itself. You can find the source string at the top
   and the field for your translation below.
3. **Glossary**: when a string or parts of it is detected as being present
   in the glossary, you can find additional information there. It is also
   highlighted in the source strings.
4. **Неке корисне картице**:
    - **Nearby strings**: вам приказује контекст речи или низа текста
    - **Automatic suggestions**: here you can find automatic suggestions
      from DeepL and suggestions from similar strings, which are already
      translated. Use the `Clone to translation` button to insert it in the
      translation field to apply changes. Use the `Accept` button to accept
      the suggested translation and automatically switch to the next string.
    - **Other languages**: here you see an list if and how the string is
      translated into other languages (could be useful for languages, which
      are similar).

### Ознаке у тексту

Find some examples for special source strings below with a badge indicating
where such a string can be found. Try to keep the (adjusted) markup and make
sure to keep the variables. The **Source string location** section in
Weblate (on the right side) gives you a hint where to search for the
context. Also have a look at the [style guide of the
documentation](style-guide) where you can find more information about the
syntax and the usage of Markdown/Vitepress features.

`%s created ticket |%s|` <Badge type="tip" text="Zammad" />
: The string contains variables (`%s`) and markup (`||`). Make sure that the variable and markup is included in the
  translation. The position may vary depending on the translation.

`` `example-string` `` <Badge type="tip" text="Documentation" />
: This is rendered as inline code (`example-string`). Depending on the context, it can be translated or not. In any
  case, use a backtick (`` ` ``) before and after the string in your translation as well.

`[example](/en/path/to/document-or-website)` <Badge type="tip" text="Documentation" />
: This is a link to another page, including the language code. The above "example" is the text, which is shown as
  link text. This part can be translated. For the path, only the `en` may be replaced by the language code you are
  translating in. Make sure that your language is already present on zammad.org (check it by using the language
  switcher). Otherwise contact us if you want to have your language activated.

`**example string**` <Badge type="tip" text="Documentation" />
: Markup for text (e.g. bold, italics). Alternative: `_example string_`. Try to keep the markup in general but adjust
  it to keep the meaning.
