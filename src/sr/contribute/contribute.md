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
- This branch is actively supported and receives regular bug fixes as well
  as security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable`

- Ово је тренутно стабилно издање, нпр. Zammad 5.2.
- Користите овај огранак за инсталације у продукцији.
- This branch is actively supported and receives regular bug fixes as well
  as security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable-x.y`

- Ово су огранци старих Zammad издања као `stable-5.1` за Zammad 5.1.
- Не користите у продукцији!
- Bug fixes and security updates are not applied to these branches.

## Документација

Да ли желите да допринесете Zammad документацији?

Отворите нови GitHub pull request на <https://github.com/zammad/zammad-org>
(заснован на `develop` огранку) са вашим изменама и обавезно испратите
[водич кроз стил и садржај](style-guide). Узмите у обзир и инструкције у
[README датотеци
репозиторија](https://github.com/zammad/zammad-org?tab=readme-ov-file#zammad-hub){target=_blank}.

Документација коју читате је доступна под zammad.org и next.zammad.org и
направљена је у Vitepress систему. Изворне датотеке су написане у Markdown
формату. Обратите пажњу да мењате само изворне датотеке на енглеском језику
које су под `/src/en/` директоријумом. Преводи се обрађују преко Weblate
апликације и преписаће све измене направљене под директоријумима специфичних
језика (осим `/src/en/`).

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

По одабиру пројекта (Documentation или Zammad), видећете различите
под-пројекте и њихов статус превода разложен по свим језицима. Могуће је да
ови прегледи прикажу ниску стопу превода, услед броја активних преводиоца за
различите језике.

Овде можете одабрати једну од „компонената”, које су мање или више идентичне различитим верзијама. По одабиру једне,
можете видети статус превода по различитим језицима, по узору на следећи снимак екрана
са примером из _Documentation > User Documentation (latest)_:

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
    - **Automatic suggestions**: овде можете пронаћи аутоматизоване предлоге
      од DeepL сервиса и предлоге на основу сличног текста, који је већ
      преведен. Користите дугме „_Clone to translation_” да убаците текст у
      поље превода и снимите измене. Користите дугме „_Accept_” да
      прихватите предложен предлог и одмах пређене на следећи низ текста.
    - **Other languages**: овде можете добити преглед који језици већ садрже
      превод и саме преводе (може бити корисно за сличне језике).

### Решавање проблема

Коначно, ево пар примера за „специјалне” низове текста на које можете наићи
у пројектима документације. Обавезно погледајте и [водич кроз
стил](style-guide) где можете пронаћи више информација о синтакси и
коришћењу Markdown/Vitepress функција.

**\`example-string\`**
: This is rendered as `example-string`. Depending on the context, it can be translated or not. In any case, use the
  \` before and after the string in your translation.

**\[example\](/en/path/to/document-or-website\)**
: This is a link to another page, including the language code. The above "example" is the text, which is shown as
  link text. This part can be translated. For the path, only the `en` may be replaced by the language code you are
  translating in. Make sure that your language is already present on zammad.org (check it by using the language
  switcher). Otherwise contact us if you want to have your language activated.

**\*\*example string\*\***
: Markup for text (e.g. bold, italics). Alternative: \_example string\_. These strings can be translated, but the
  markup (e.g. `**` or `_`) should be adopted true to meaning.
