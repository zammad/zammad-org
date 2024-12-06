---
order: 1
---

# Учествујте

Драго нам је да видимо да доприносите Zammad-у! Можете помоћи на неколико
начина. Доприноси се углавном обављају тако што се један од наших
репозиторија на GitHub-у форкује и направи pull request са вашим изменама
(осим за преводе, погледајте испод за детаље). 🚀

Можете допринети:
 * [изворном коду](contribute#zammad-source-code)
 * [документацији](contribute#documentation)
 * [преводу](contribute#translation)

Погледајте детаље о томе како да допринесете у наставку.

Све репозиторијуме можете пронаћи на [GitHub](https://github.com/zammad)-у.


## Zammad изворни кoд

Изворни код Zammad-а можете пронаћи на GitHub-у у [Zammad
репозиторију](https://github.com/zammad/zammad).

Прочитајте [уџбеник за
програме](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md)
за почетак.

### Подржани огранци/верзије

Централни [Zammad репозиториј](https://github.com/zammad/zammad) на GitHub-у
има неколико огранка.

#### `develop`

* This is the current (unreleased) development state of next major release
  (this will become the new `stable` branch).
* Не користите у продукцији!
* Подржано је са исправкама грешака и сигурносних пропуста – погледајте и
  нашу [безбедносну
  полису](https://github.com/zammad/zammad/blob/develop/SECURITY.md).

#### `stable`

* Ово је тренутно стабилно издање, нпр. Zammad 5.2.
* Користите овај огранак за инсталације у продукцији.
* Подржано је са исправкама грешака и сигурносних пропуста – погледајте и
  нашу [безбедносну
  полису](https://github.com/zammad/zammad/blob/develop/SECURITY.md).

#### `stable-x.y`

* These are the branches of old versions of Zammad like `stable-5.1` for
  Zammad 5.1.
* Нису подржане исправке грешака и сигурносних пропуста.

## Документација

Да ли желите да допринесете Zammad документацији?

Отворите нови GitHub pull request на

* https://github.com/zammad/zammad-org (документација коју управо читате)
* https://github.com/zammad/zammad-documentation (претходно издање)
* https://github.com/zammad/zammad-admin-documentation (претходно издање)
* https://github.com/zammad/zammad-user-documentation (претходно издање)

са вашим изменама.

Документација претходног издања је хостована на Read the Docs. Можете је
пронаћи под:

* https://docs.zammad.org
* https://admin-docs.zammad.org
* https://user-docs.zammad.org

The documentation you are reading is available on next.zammad.org and
zammad.org and is built via Vitepress. The source files are written in
Markdown.  Make sure to change the English source files only which are
placed under `/src/en/`. The translations are made via Weblate and will
overwrite any changes in the language specific folders (except `/src/eng/`).

### ReStructuredText код

Уколико желите да уређујете документацију претходног издања, користите
ReStructuredText језик.  Информације о овом језику можете пронаћи на:

  * http://www.sphinx-doc.org/en/stable/rest.html
  * http://docutils.sourceforge.net/docs/user/rst/quickref.html
  * http://docs.readthedocs.io/en/latest/_themes/sphinx_rtd_theme/demo_docs/source/demo.html

Хвала вам! ❤ ❤ ❤

Zammad тим

## Превод

Уколико желите да нам помогнете са преводом и побољшате вишејезичну подршку
у Zammad-у и/или документацији, ваш допринос је добродошао! Превод самог
Zammad-а и документације обавља се преко Weblate апликације, која представља
сервис за колаборацију на преводима пројеката.

Све што је неопходно је да се упутите на Zammad [Weblate
инстанцу](https://translations.zammad.org/).  Можете или отворити налог
(уколико га још немате) или да се пријавите путем вашег GitHub налога!

Представићемо неке основне кораке у следећим одељцима како бисте могли да
започнете са превођењем. Међутим, уколико желите да користите напредне
Weblate функције и да дубље уђете у проблематику, њихова [званична
документација](https://docs.weblate.org/en/latest/user/translating.htm) вам
може помоћи.

### Основе

Превод **Zammad-а** и документације су раздвојени у два пројекта у
Weblate апликацији. Преглед оба пројекта можете пронаћи кликом на
мени при врху под
„*Projects > Browse all projects*”:

![Снимак екрана који приказује пројекте превода у Weblate
менију](/screenshots/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

 * Документација
    * User Documentation (`latest`)
    * User Documentation (`pre-release`)
    * Admin Documentation (`latest`)
    * Admin Documentation (`pre-release`)
 * Zammad
    * Zammad (`develop`, development version)
    * Zammad (`stable` version)
    * *Some more which aren't relevant here*

::: tip

It is no big difference which branch you choose to translate. When Weblate
detects the same strings in different branches, they will be used for all
branches and only have to be translated once.
:::

After selecting a project (Documentation or Zammad), you will see different
sub-projects and their translation status summarized for all languages.
These overviews may show a quite low translation rate, which is due to the
amount of active languages.

Here you can select one of the "components", which is more or less the same as
different versions. After selecting one of them, you can see the status of
translation for the different languages, as you can see in the
following screenshot with an example from *Documentation > User
Documentation (latest)*:

![Screenshot showing translation status of different languages for the user
documentation ](/screenshots/weblate-translations-user-docs.png)

### Translating

After selecting your language you want to translate to, a good starting
point is to select "*Untranslated strings*" (or the same meaning in your
language, depending on what you have set in your profile).

After that, you will finally see the first untranslated string in the upper
field and, in theory, you can start to translate. First a brief overview of
the user interface of Weblate:

![Screenshot of Weblate translation user
interface](/screenshots/weblate-ui.png)

1. **Breadcrumbs with path** to the current project and language
2. **Translation area** itself. You can find the source string (*"English
   (United States)"*) at the top and the field for your translation
   (*"French"* in this example).
3. **Glossary**: here you can find common translations in Zammad
   context. The terms from the glossary are highlighted in the source
   strings, as well.
4. **Some useful tabs**:
    * **Nearby strings**: shows you the context of the word or string
    * **Automatic suggestions**: here you can find automatic suggestions
      from DeepL and suggestions from similar strings, which are already
      translated.  Use the "*Clone to translation*" button to insert it in
      the translation field to apply changes. Use the "*Accept*" button to
      accept the suggested translation and automatically switch to the next
      string.
    * **Other languages**: here you can get an overview, which languages are
      translated and you can also see the translated strings (could be
      useful for languages, which are similar).

### Решавање проблема

And finally some notes for "special" source strings, you might see in the
documentation projects (see RestructuredText_ for details):

- **\`\`example-string\`\`**

    This is rendered as `example-string`. Depending on the context, it can be
    translated or not. In any case, use the \`` before and after the string in
    your translation.

- **\:doc:\`example \<path/to/document>\`**

    This is a link to another page. Some links doesn't have the "example" part
    included, e.g. \:doc:\`path/to/document. The above "example" is the text,
    which is shown as link. This part can be translated. The path/to/document
    may not be translated, otherwise the link would not work anymore.

- **\`some text \<https://example.com\>`\_**

    This is a link which can refer to an external website. "some text" is the
    displayed text in the documentation, the part between \< and \> is the link
    target. The \_ at the end is important and must remain in the translated
    text.

- **\:admin-docs:\`some text \</manage-text-modules.html\>\`**

    This is a link which refers to external documentation. "some text" is the
    displayed text in the documentation, the part between \< and \> is the link
    target. Note the absence of \_ at the end, since this link is using a
    different construction mechanism.

- **\*\*example string\*\***

    Markup for text (e.g. bold, italics). Alternative: \*example string\*.
    These strings can be translated, but the markup labeling (e.g. one or
    more \*) should be adopted true to meaning.


