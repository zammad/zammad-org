---
order: 1
---

# Учествујте

Драго нам је да видимо да доприносите Zammad-у! Можете помоћи на неколико
начина. Доприноси се углавном обављају тако што се један од наших
репозиторија на GitHub-у форкује и направи pull request са вашим изменама
(осим за преводе, погледајте испод за детаље). 🚀

Можете допринети:

- [Изворном коду](contribute#zammad-source-code)
- [Документацији](/sr/documentation/use/general)
- [Преводу](contribute#translation)

Please have a look at our the sections below about how to contribute. All
repos can be found on [Github](https://github.com/zammad){target=_blank}.

## Zammad изворни кoд

Изворни код Zammad-а можете пронаћи на GitHub-у у [Zammad
репозиторију](https://github.com/zammad/zammad){target=_blank}.

Прочитајте [уџбеник за
програмере](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
за почетак.

### Подржани огранци/верзије

Централни [Zammad
репозиториј](https://github.com/zammad/zammad){target=_blank} на GitHub-у
има неколико огранка.

#### `develop`

- Ово је тренутно (необјављено) развојно стање следећег већег издања
  (постаће нови `stable` огранак).
- Не користите у продукцији!
- Подржано је са исправкама грешака и сигурносних пропуста – погледајте и
  нашу [безбедносну
  полису](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable`

- Ово је тренутно стабилно издање, нпр. Zammad 5.2.
- Користите овај огранак за инсталације у продукцији.
- Подржано је са исправкама грешака и сигурносних пропуста – погледајте и
  нашу [безбедносну
  полису](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable-x.y`

- Ово су огранци старих Zammad издања као `stable-5.1` за Zammad 5.1.
- Нису подржане исправке грешака и сигурносних пропуста.

## Документација

Да ли желите да допринесете Zammad документацији?

Open a new GitHub pull request at <https://github.com/zammad/zammad-org>
(targeting the `develop` branch) with your changes and make sure to follow
the [style and content guide](style-guide). Consider to have a look at the
[repo's
README.md](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}
too.

The documentation you are reading is available on zammad.org and
next.zammad.org and is built with Vitepress. The source files are written in
Markdown. Make sure to change the English source files only which are placed
under `/src/en/`. The translation is done via Weblate and will overwrite any
changes in the language specific folders (except `/src/en/`).

## Превод

Уколико желите да нам помогнете са преводом и побољшате вишејезичну подршку
у Zammad-у и/или документацији, ваш допринос је добродошао! Превод самог
Zammad-а и документације обавља се преко Weblate апликације, која представља
сервис за колаборацију на преводима пројеката.

Све што је неопходно је да се упутите на Zammad [Weblate
инстанцу](https://translations.zammad.org/){target=_blank}.  Можете или
отворити налог (уколико га још немате) или да се пријавите путем вашег
GitHub налога!

Представићемо неке основне кораке у следећим одељцима како бисте могли да
започнете са превођењем. Међутим, уколико желите да користите напредне
Weblate функције и да дубље уђете у проблематику, њихова [званична
документација](https://docs.weblate.org/en/latest/user/translating.html){target=_blank}
вам може помоћи.

### Основе

The translation of **Zammad** and the translation of the **documentation** are split into different projects in Weblate.
When you click in the top menu under "_Projects > Browse all projects_", you can find the overview of the projects:

![Снимак екрана који приказује пројекте превода у Weblate
менију](/screenshots/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

- Документација
  - Нова документација на next.zammad.org
  - New Documentation at zammad.org
- Zammad
  - Zammad (`develop`, развојна верзија)
  - Zammad (`stable` верзија)
  - _Додатне верзије које овде нису релевантне_

::: tip

It should be no big difference which branch you choose to translate. When Weblate detects the same strings in different
branches, they will be used for all branches and only have to be translated once. If in doubt, choose the `develop`
version.
:::

After selecting a project (Documentation or Zammad), you will see different
sub-projects and their translation status summarized for all
languages. These overviews may show a quite low translation rate, which is
due to the amount of active languages.

Here you can select one of the "components", which is more or less the same as different versions. After selecting one
of them, you can see the status of translation for the different languages, as you can see in the following screenshot
with an example from _Documentation > User Documentation (latest)_:

![Снимак екрана који приказује статус первода по различитим језицима за
корисничку документацију](/screenshots/weblate-translations-user-docs.png)

### Превођење

По одабиру вашег језика на који желите да преводите, добра почетна тачка је
одабир „_Untranslated strings_” (или слично значење у вашем језику, у
зависности шта сте подесили у свом профилу).

Након овога, коначно ћете добити први непреведен низ текста у горњем пољу, и
можете започети са преводом. Прво, кратак преглед корисничког интерфејса
Weblate апликације:

![Снимак екрана корисничког интерфејса превода у
Weblate-у](/screenshots/weblate-ui.png)

1. **Путања навигације** на тренутни пројекат и језик превода
2. Сам **Translation** одељак. Можете видети изворни низ текста (_„English
   (United States)”_) при врху и поље за унос вашег превода (_„French”_ у
   овом примеру).
3. **Glossary**: овде можете пронаћи уобичајене у контексту
   Zammad-а. Термини из речника ће бити наглашени у изворном тексту такође.
4. **Неке корисне картице**:
    - **Nearby strings**: вам приказује контекст речи или низа текста
    - **Automatic suggestions**: here you can find automatic suggestions
      from DeepL and suggestions from similar strings, which are already
      translated. Use the "_Clone to translation_" button to insert it in
      the translation field to apply changes. Use the "_Accept_" button to
      accept the suggested translation and automatically switch to the next
      string.
    - **Other languages**: овде можете добити преглед који језици већ садрже
      превод и саме преводе (може бити корисно за сличне језике).

### Решавање проблема

And finally some examples for "special" source strings, you might see in the
documentation projects. You should also have a look at the [style
guide](style-guide) where you can find more information about the syntax and
the usage of Markdown/Vitepress features.

- **\`example-string\`**

    This is rendered as `example-string`. Depending on the context, it can be translated or not. In any case, use the
    \` before and after the string in your translation.

- **\[example\](/en/path/to/document-or-website\)**

    This is a link to another page, including the language code. The above "example" is the text, which is shown as
    link text. This part can be translated. For the path, only the `en` may be replaced by the language code you are
    translating in. Make sure that your language is already present on zammad.org (check it by using the language
    switcher). Otherwise contact us if you want to have your language activated.

- **\*\*пример текста\*\***

    Markup for text (e.g. bold, italics). Alternative: \_example string\_. These strings can be translated, but the
    markup (e.g. `**` or `_`) should be adopted true to meaning.
