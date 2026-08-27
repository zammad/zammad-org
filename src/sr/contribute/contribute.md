---
order: 1
---

# Учествујте

Драго нам је да видимо да доприносите Zammad-у! Можете помоћи на неколико
начина. Доприноси се углавном обављају тако што се направи fork једног од
наших репозиторија на GitHub-у и отвори pull request са вашим изменама (осим
за преводе, погледајте испод за детаље). 🚀

Можете допринети:

- [Изворном коду](contribute#zammad-изворни-кoд)
- [Документацији](contribute#документација)
- [Преводу](contribute#превод)

Please have a look at our the sections below about how to contribute. All
repos can be found on [GitHub](https://github.com/zammad){target=_blank}.

## Изворни код Zammad-а

Изворни код Zammad-а можете пронаћи на GitHub-у у [Zammad
репозиторијуму](https://github.com/zammad/zammad){target=_blank}. Прочитајте
[уџбеник за
програмере](https://github.com/zammad/zammad/blob/develop/doc/developer_manual/index.md){target=_blank}
за почетак.

### Подржани огранци/верзије

Zammad's GitHub repository has several branches:

#### `develop`

- Ово је тренутно (необјављено) развојно стање следећег већег издања
  (постаће нови `stable` огранак).
- Не користите у продукцији!
- This branch is actively supported and receives regular bug fixes and
  security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable`

- Ово је тренутно стабилно издање, нпр. Zammad 5.2.
- Користите овај огранак за инсталације у продукцији.
- This branch is actively supported and receives regular bug fixes and
  security updates (see [Security
  Policy](https://github.com/zammad/zammad/blob/develop/SECURITY.md){target=_blank}
  for more details).

#### `stable-x.y`

- Ово су огранци старих Zammad издања као `stable-5.1` за Zammad 5.1.
- Не користите у продукцији!
- Исправке грешака и сигурносних пропуста се не примењују на ове огранке.

## Документација

The documentation you are reading is available on zammad.org and
next.zammad.org and is built with VitePress. The source files are written in
Markdown. Make sure to change the English source files only which are placed
under `/src/en/`. The translation is done via Weblate and will overwrite any
changes in the language specific folders (except `/src/en/`).

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
GitHub account!

We will cover some basic steps in the following sections to get you started
with translating. However, if you want to use some additional features of
Weblate and want to dive deeper into it, their [translation
documentation](https://docs.weblate.org/en/latest/user/translating.html){target=_blank}
is a good starting point.

### Основе

Превод **Zammad-а** и **документације** су раздвојени у различите пројекте у Weblate апликацији.
Преглед пројеката можете пронаћи кликом на мени при врху под _Projects > Browse all projects_:

![Снимак екрана који приказује пројекте превода у Weblate
менију](/screenshots/contribute/weblate-overview-docs.png)

Структура пројекта превода у Weblate-у:

- Документација
  - Нова документација на next.zammad.org
  - Нова документација на next.zammad.org
- Zammad
  - Zammad (`develop`, развојна верзија)
  - Zammad (`stable` верзија)
  - Додатне верзије које овде нису релевантне

Одаберите пројекат (документације или Zammad-а) и пређите на језичак
**Components**. Одаберите ону коју желите да преведете.  Након тога, можете
видети статус превода по различитим језицима, по узору на следећи снимак
екрана:

![Снимак екрана који приказује статус превода за корисничку документацију по
различитим језицима](/screenshots/contribute/weblate-project-overview.png)

::: tip
Одлука у ком огранку желите да преводите не прави велику разлику. Када Weblate детектује идентичне низове текста у
различитим компонентама користиће исти превод за све огранке и тиме се преводи само једном. Уколико нисте сигурни, одаберите
`develop` верзију.
:::

### Превођење

Сада проверите „Unfinished” колону вашег језика и кликните на број из
ње. Ово ће отворити први непреведен низ текста, и можете започети са
преводом. Али прво, кратак преглед корисничког интерфејса Weblate
апликације:

![Снимак екрана корисничког интерфејса превода у
Weblate-у](/screenshots/contribute/weblate-ui.png)

1. **Путања навигације** на тренутни пројекат, компоненту и језик превода
2. Сам **Translation** одељак. Можете видети изворни низ текста при врху и
   поље за унос вашег превода испод њега.
3. **Glossary**: када се у низу текста или његовим деловима детектује нешто
   из речника, овде можете пронаћи додатне информације. Такође, биће
   назначено у изворном низу текста.
4. **Неке корисне картице**:
    - **Nearby strings**: вам приказује контекст речи или низа текста
    - **Automatic suggestions**: овде можете пронаћи аутоматизоване предлоге
      од DeepL сервиса и предлоге на основу сличног текста, који је већ
      преведен. Користите дугме `Clone to translation` да убаците текст у
      поље превода и снимите измене. Користите дугме `Accept` да прихватите
      предложен превод и одмах пређете на следећи низ текста.
    - **Other languages**: овде можете добити листу где и како је низ текста
      преведен на другим језицима (може бити корисно за сличне језике).

### Ознаке у тексту

Find some examples for special source strings below with a badge indicating
where such a string can be found. Try to keep the (adjusted) markup and make
sure to keep the variables. The **Source string location** section in
Weblate (on the right side) gives you a hint where to search for the
context. Also have a look at the [style guide of the
documentation](style-guide) where you can find more information about the
syntax and the usage of Markdown/VitePress features.

`%s created ticket |%s|` <Badge type="tip" text="Zammad" />
: Текст садржи променљиве (`%s`) и ознаке (`||`). Обратите пажњу да се променљива и ознаке нађу у
  преводу. Тачна позиција може зависити од превода.

`` `example-string` `` <Badge type="tip" text="Documentation" />
: Ово ће бити приказано као линијски кôд (`example-string`). У зависности од контекста, ово се може превести или не. У сваком
  случају, користите задње наводнике (`` ` ``) пре и после низа текста у вашем преводу.

`[example](/en/path/to/document-or-website)` <Badge type="tip" text="Documentation" />
: Ово је линк на другу страницу, укључујући и код језика. Текст „example” изнад биће приказан као
  текст линка. Овај део можете превести. Што се тиче путање, само замените `en` са кодом језика на који
  преводите. Обратите пажњу да ли је ваш језик већ омогућен на zammad.org (проверите преко избора
  језика). У супротном обратите нам се уколико желите да омогућимо ваш језик.

`**пример текста**` <Badge type="tip" text="Документација" />
: Ознака за текст (нпр. подебљано, курзив). Алтернатива: `_пример текста_`. Начелно задржите
  ознаке, али их прилагодите тако да значење остане исто.
