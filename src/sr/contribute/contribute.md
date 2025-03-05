---
order: 1
---

# Учествујте

Драго нам је да видимо да доприносите Zammad-у! Можете помоћи на неколико
начина. Доприноси се углавном обављају тако што се један од наших
репозиторија на GitHub-у форкује и направи pull request са вашим изменама
(осим за преводе, погледајте испод за детаље). 🚀

You can contribute to:

- [Source-code](contribute#zammad-source-code)
- [Documentation](contribute#documentation)
- [Translation](contribute#translation)

Погледајте детаље о томе како да допринесете у наставку.

Све репозиторије можете пронаћи на
[GitHub](https://github.com/zammad){target=_blank}-у.

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
with your changes and make sure to follow the prerequisites and instructions
in the repo's README.

The documentation you are reading is available on next.zammad.org and
zammad.org and is built via Vitepress. The source files are written in
Markdown.  Make sure to change the English source files only which are
placed under `/src/en/`. The translation is done via Weblate and will
overwrite any changes in the language specific folders (except `/src/en/`).

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
документација](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
вам може помоћи.

### Основе

The translation of **Zammad** and the translation of the **documentation**
are split into different projects in Weblate. When you click in the top menu under
"_Projects > Browse all projects_", you can find the overview of the
projects:

![Снимак екрана који приказује пројекте превода у Weblate
менију](/screenshots/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

- Документација
  - Нова документација на next.zammad.org
- Zammad
  - Zammad (`develop`, развојна верзија)
  - Zammad (`stable` верзија)
  - _Some more which aren't relevant here_

::: tip

Одлука у ком огранку желите да преводите не прави велику разлику. Када Weblate
детектује идентичне низове текста у различитим огранцима, користиће исти превод за све
огранке и тиме се преводи само једном. Уколико нисте сигурни, одаберите `develop`
верзију.
:::

По одабиру пројекта (Documentation или Zammad), видећете различите
под-пројекте и њихов статус превода разложен по свим језицима.  Могуће је да
ови прегледи прикажу ниску стопу превода, услед броја активних преводиоца за
различите језике.

Here you can select one of the "components", which is more or less the same as
different versions. After selecting one of them, you can see the status of
translation for the different languages, as you can see in the
following screenshot with an example from _Documentation > User
Documentation (latest)_:

![Screenshot showing translation status of different languages for the user
documentation](/screenshots/weblate-translations-user-docs.png)

### Превођење

After selecting your language you want to translate to, a good starting
point is to select "_Untranslated strings_" (or the same meaning in your
language, depending on what you have set in your profile).

Након овога, коначно ћете добити први непреведен низ текста у горњем пољу, и
можете започети са преводом. Прво, кратак преглед корисничког интерфејса
Weblate апликације:

![Снимак екрана корисничког интерфејса превода у
Weblate-у](/screenshots/weblate-ui.png)

1. **Путања навигације** на тренутни пројекат и језик превода
2. **Translation area** itself. You can find the source string (_"English
   (United States)"_) at the top and the field for your translation
   (_"French"_ in this example).
3. **Glossary**: овде можете пронаћи уобичајене у контексту
   Zammad-а. Термини из речника ће бити наглашени у изворном тексту такође.
4. **Неке корисне картице**:
    - **Nearby strings**: вам приказује контекст речи или низа текста
    - **Automatic suggestions**: here you can find automatic suggestions
      from DeepL and suggestions from similar strings, which are already
      translated.  Use the "_Clone to translation_" button to insert it in
      the translation field to apply changes. Use the "_Accept_" button to
      accept the suggested translation and automatically switch to the next
      string.
    - **Other languages**: овде можете добити преглед који језици већ садрже
      превод и саме преводе (може бити корисно за сличне језике).

### Решавање проблема

И коначно, пар напомена за „посебне” изворне низове текста, које можете
видети у пројектима документације:

- **\`example-string\`**

    Ово ће бити приказано као `example-string`. У зависности од контекста, ово се може
    превести, или не. У сваком случају, користите \` пре и после низа текста у
    вашем преводу.

- **\[example\](/en/path/to/document-or-website\)**

    Ово је линк на другу страницу, и укључује код језика
    Текст „example” изнад биће приказан као текст линка. Овај део
    можете превести. Што се тиче путање, само замените `en` са кодом језика
    на који преводите. Обратите пажњу да ли је ваш језик
    већ омогућен на zammad.org (проверите преко избора језика).
    У супротном обратите нам се уколико желите да омогућимо ваш језик
    (у случају да је већина текста већ преведена).

- **\*\*пример текста\*\***

    Ознака текста (нпр. подебљано, курзив=. Алтернатива: \*пример текста\*.
    Ови низови текста се могу преводити, али ознаке (нпр. једна или
    више \*) би требало прилагодити правом значењу.
