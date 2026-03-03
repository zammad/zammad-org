---
order: 1
---

# Учествујте

Драго нам је да видимо да доприносите Zammad-у! Можете помоћи на неколико
начина. Доприноси се углавном обављају тако што се један од наших
репозиторија на GitHub-у форкује и направи pull request са вашим изменама
(осим за преводе, погледајте испод за детаље). 🚀

Можете допринети:

- [Изворном коду](contribute#zammad-изворни-кoд)
- [Документацији](contribute#документација)
- [Преводу](contribute#превод)

Погледајте наш одељак како можете да допринесете. Све репозиторије можете
пронаћи на [GitHub](https://github.com/zammad){target=_blank}-у.

## Zammad изворни кoд

The Zammad source code can be found on GitHub in the [Zammad
repository](https://github.com/zammad/zammad){target=_blank}. Have a look at
the [developer
manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
to get started.

### Подржани огранци/верзије

Zammad's Github repository has several branches:

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

Open a new GitHub pull request at <https://github.com/zammad/zammad-org>
(targeting the `develop` branch) with your changes and make sure to follow
the [style and content guide](style-guide) and read the [repo's
README.md](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

## Превод

If you want to help us with translation and improve the multi-language
support of Zammad and/or the documentation, you are welcome to contribute as
well! The translation of Zammad and the documentation is done via Weblate,
which is a service for the collaborative translation of projects.  Just head
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

Превод **Zammad-а** и **документације** су раздвојени у различите пројекте у Weblate апликацији.
Преглед пројеката можете пронаћи кликом на мени при врху под „_Projects > Browse all projects_”:

![Снимак екрана који приказује пројекте превода у Weblate
менију](/screenshots/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

- Документација
  - Нова документација на next.zammad.org
  - Нова документација на next.zammad.org
- Zammad
  - Zammad (`develop`, развојна верзија)
  - Zammad (`stable` верзија)
  - _Додатне верзије које овде нису релевантне_

::: tip

Одлука у ком огранку желите да преводите не прави велику разлику. Када Weblate детектује идентичне низове текста у различитим
огранцима, користиће исти превод за све огранке и тиме се преводи само једном. Уколико нисте сигурни, одаберите `develop`
верзију.
:::

After selecting a project (Documentation or Zammad), you will see different
sub-projects and their translation status summarized for all languages. Here
you can select one of the "components", which is more or less the same as
different versions. After selecting one of them, you can see the status of
translation for the different languages, as you can see in the following
screenshot:

![Screenshot showing translation status of different languages for the user
documentation](/screenshots/weblate-project-overview.png)

### Превођење

After selecting your language you want to translate to, a good starting
point is to select "_Untranslated strings_" (or the same meaning in your
language, depending on what you have set in your profile).  After that, you
will finally see the first untranslated string in the upper field and, in
theory, you can start to translate. But let's first have a brief look at the
user interface of Weblate:

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
    - **Automatic suggestions**: овде можете пронаћи аутоматизоване предлоге
      од DeepL сервиса и предлоге на основу сличног текста, који је већ
      преведен. Користите дугме „_Clone to translation_” да убаците текст у
      поље превода и снимите измене. Користите дугме „_Accept_” да
      прихватите предложен предлог и одмах пређене на следећи низ текста.
    - **Other languages**: овде можете добити преглед који језици већ садрже
      превод и саме преводе (може бити корисно за сличне језике).

### Markup in Strings

Find some examples for special source strings with applied markup
below. Depending on the string, it can be important to keep the markup
and/or variables. Also have a look at the [style guide](style-guide) where
you can find more information about the syntax and the usage of
Markdown/Vitepress features.

**\`пример-текста\`**
: Ово ће бити приказано као `пример-текста`. У зависности од контекста, ово се може превести или не.
  У сваком случају, користите \` пре и после низа текста у вашем преводу.

**\[пример\](/en/path/to/document-or-website\)**
: Ово је линк на другу страницу, укључујучи и код језика Текст „пример” изнад биће приказан као
  текст линка. Овај део можете превести. Што се тиче путање, само замените `en` са кодом језика на који
  преводите. Обратите пажњу да ли је ваш језик већ омогућен на zammad.org (проверите преко избора
  језика). У супротном обратите нам се уколико желите да омогућимо ваш језик.

**\*\*пример текста\*\***
: Ознака текста (нпр. подебљано, курзив). Алтернатива: \_пример текста\_. Ови низови текста се могу преводити, али
  ознаке (нпр. `**` ili `_`) би требало прилагодити правом значењу.
