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

All repos can be found on
[Github](https://github.com/zammad){target=_blank}.


## Zammad изворни кoд

The Zammad source code can be found on GitHub in the [Zammad
repository](https://github.com/zammad/zammad){target=_blank}.

Have a look at the [developer
manual](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
to get started.

### Подржани огранци/верзије

The main [Zammad
repository](https://github.com/zammad/zammad){target=_blank} at Github has
several branches.

#### `develop`

* Ово је тренутно (необјављено) развојно стање следећег већег издања
  (постаће нови `stable` огранак).
* Не користите у продукцији!
* Supported with bug and security fixes - see also our [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable`

* Ово је тренутно стабилно издање, нпр. Zammad 5.2.
* Користите овај огранак за инсталације у продукцији.
* Supported with bug and security fixes - see also our [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}.

#### `stable-x.y`

* Ово су огранци старих Zammad издања као `stable-5.1` за Zammad 5.1.
* Нису подржане исправке грешака и сигурносних пропуста.

## Документација

Да ли желите да допринесете Zammad документацији?

Open a new GitHub pull request at https://github.com/zammad/zammad-org with
your changes and make sure to follow the prerequisites and instructions in
the repo's README.

The documentation you are reading is available on next.zammad.org and
zammad.org and is built via Vitepress. The source files are written in
Markdown.  Make sure to change the English source files only which are
placed under `/src/en/`. The translation is done via Weblate and will
overwrite any changes in the language specific folders (except `/src/eng/`).

## Превод

Уколико желите да нам помогнете са преводом и побољшате вишејезичну подршку
у Zammad-у и/или документацији, ваш допринос је добродошао! Превод самог
Zammad-а и документације обавља се преко Weblate апликације, која представља
сервис за колаборацију на преводима пројеката.

You just have to head over to Zammad's [Weblate
instance](https://translations.zammad.org/){target=_blank}.  You can either
create an account (if you don't have one already) or even sign in with your
Github account!

We will cover some basic steps in the following sections to get you started
with translating. However, if you want to use some additional features of
Weblate and want to dive deeper into it, their [translation
documentation](https://docs.weblate.org/en/latest/user/translating.htm){target=_blank}
is a good starting point.

### Основе

The translation of **Zammad** and the translation of the **documentation**
are split into different projects in Weblate. When you click in the top menu under
"*Projects > Browse all projects*", you can find the overview of the
projects:

![Снимак екрана који приказује пројекте превода у Weblate
менију](/screenshots/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

 * Документација
    * New Documentation at next.zammad.org
 * Zammad
    * Zammad (`develop`, развојна верзија)
    * Zammad (`stable` верзија)
    * *Додатне верзије које овде нису релевантне*

::: tip

It should be no big difference which branch you choose to translate. When Weblate
detects the same strings in different branches, they will be used for all
branches and only have to be translated once. If in doubt, choose the `develop`
version.
:::

По одабиру пројекта (Documentation или Zammad), видећете различите
под-пројекте и њихов статус превода разложен по свим језицима.  Могуће је да
ови прегледи прикажу ниску стопу превода, услед броја активних преводиоца за
различите језике.

Овде можете одабрати једну од „компонената”, које су мање или више идентичне
различитим верзијама. По одабиру једне, можете видети статус
превода по различитим језицима, по узору на
следећи снимак екрана са примером из *Documentation > User
Documentation (latest)*:

![Снимак екрана који приказује статус первода по различитим језицима за
корисничку документацију](/screenshots/weblate-translations-user-docs.png)

### Превођење

По одабиру вашег језика на који желите да преводите, добра почетна тачка је
одабир „*Untranslated strings*” (или слично значење у вашем језику, у
зависности шта сте подесили у свом профилу).

Након овога, коначно ћете добити први непреведен низ текста у горњем пољу, и
можете започети са преводом. Прво, кратак преглед корисничког интерфејса
Weblate апликације:

![Снимак екрана корисничког интерфејса превода у
Weblate-у](/screenshots/weblate-ui.png)

1. **Путања навигације** на тренутни пројекат и језик превода
2. Сам **Translation** одељак. Можете видети изворни низ текста („English
   (United States)”*) при врху и поље за унос вашег превода (*„French”* у
   овом примеру).
3. **Glossary**: овде можете пронаћи уобичајене у контексту
   Zammad-а. Термини из речника ће бити наглашени у изворном тексту такође.
4. **Неке корисне картице**:
    * **Nearby strings**: вам приказује контекст речи или низа текста
    * **Automatic suggestions**: овде можете пронаћи аутоматизоване предлоге
      од DeepL сервиса и предлоге на основу сличног текста, који је већ
      преведен.  Користите дугме „*Clone to translation*” да убаците текст у
      поље превода и снимите измене. Користите дугме „*Accept*” да
      прихватите предложен предлог и одмах пређене на следећи низ текста.
    * **Other languages**: овде можете добити преглед који језици већ садрже
      превод и саме преводе (може бити корисно за сличне језике).

### Решавање проблема

And finally some notes for "special" source strings, you might see in the
documentation projects:

- **\`example-string\`**

    This is rendered as `example-string`. Depending on the context, it can be
    translated or not. In any case, use the \` before and after the string in
    your translation.

- **\[example\](/en/path/to/document-or-website\)**

    This is a link to another page, including the language code.
    The above "example" is the text, which is shown as link text. This part can
    be translated. For the path, only the `en` may be replaced by the
    language code you are translating in. Make sure that your language is
    already present on zammad.org (check it by using the language switcher).
    Otherwise contact us if you want to have your language activated (and a
    substantial amount of the strings are already translated).

- **\*\*пример текста\*\***

    Ознака текста (нпр. подебљано, курзив=. Алтернатива: \*пример текста\*.
    Ови низови текста се могу преводити, али ознаке (нпр. једна или
    више \*) би требало прилагодити правом значењу.


