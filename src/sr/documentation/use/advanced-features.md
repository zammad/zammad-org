---
order: 4
title: 'Напредне функције'
---

# Напредне функције

## Пречице на тастатури

TODO

## Ticket Update Behavior

![Снимак екрана приказује мени понашања након
освежавања](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Зашто?**

It is possible to automatically close a ticket tab in the navigation
sidebar. It depends on your preferences, but you can save a click after
updating or updating a ticket to _closed_ state.

**Како?**

У доњој траци детаљног приказа тикета, кликните на дугме `Остани у прозору
^` и одаберите жељену опцију (уколико је на подразумеваној вредности, у
супротном имаће један од назива опција испод). Имате неколико различитих
опција:

- **Остани у прозору**: Подразумевана опција. Мораћете ручно да затворите
  прозор уколико желите да буде уклоњен из ваше бочне траке навигације.
- **Затвори прозор**: Ова опција затвара прозор по сваком освежавању
  тикета. Може бити добра опција ако обрађујете пуно тикета и/или тикети
  захтевају пуно интеракције.
- **Затвори прозор по затварању тикета**: Ова опција затвара прозор само
  када је тикет освежен и стање је постављено на _затворено_.

::: tip
If your situation differs from ticket to ticket, you can leave **Stay on tab** and use the keyboard shortcut
[[Shift]] [[c]] for changing the ticket state to closed and close the ticket tab.
:::

## Текстуални исечци

![Screenshot shows text modules
feature](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Зашто?**

Коришћење текстуалних исечака доноси предности као што су:

- Штедите време приликом одговарања на тикете
- Ваши и одговори ваших колега се поклапају јер користите идентичан текст за
  одговоре

**Како?**

За коришћење текстуалних исечака, једноставно унесите `::` у уредник текста
а затим део назива или кључну реч исечка.

Можете одабрати исечак кликом на њега или коришћењем стрелица на горе и доле
а затим притиском на [[Enter]] на вашој тастатури. Zammad долази са неким
подразумеваним текстуалним исечцима.

If you have to answer the same question again and again, ask your Zammad
admin to create such a text module for you.  They can even include variables
like customer name or any other available attribute which get replaced while
using it in a ticket.

## Помените колегу

![Снимак екрана приказује функцију
помињања](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Зашто?**

Затражите информације од ваших колега или их помените у важним тикетима да
би добили обавештења о освежавању тикета и да би били аутоматски претплаћени
на тај тикет.

**Како?**

While writing a ticket article, simply type `@@` and enter some letters of
the name of the colleague you want to mention.

Zammad приказује листу свих корисника који одговарају вашем уносу и можете
их одабрати кликом или коришћењем стрелица на горе и доле а затим притиском
на [[enter]] на вашој тастатури.

## Претплатите се на тикет

![Снимак екрана приказује функцију
претплате](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Зашто?**

If you are interested in the progress of a ticket, you are not the owner,
you can subscribe to it. This means you will receive notifications for each
update.

**Како?**

Activate the "Subscribe me" toggle in the ticket side panel to get
notifications. If you have been mentioned in a ticket, you are automatically
subscribed. Switch the toggle off to stop the notification. The avatars
displayed show you who has subscribed to the ticket and is therefore
notified of updates.

## Макрои

![Снимак екрана који приказује мени радњи
макроа](/screenshots/cypress/usage-advanced-features.cy.js/ticket-macro.png)

**Зашто?**

Уколико стално понављате велики број корака, размислите о употреби макроа за
њих. У таквом макроу, ваш администратор може да дефинише одређене радње на
тикетима које можете покренути једним кликом. На пример, Zammad
подразумевано долази са макроом „Затвори и означи као непожељно”. По
активацији, корисник који изврши макро ће постати власник тикета, ознака
`spam` ће бити додата и тикет затворен.

**Како?**

If your admin already created a macro, you can execute it in the ticket
detail view by clicking the three dots button ::a:: in the right corner of
the footer bar and select the macro you want to execute.

::: warning
Макро ће бити моментално извршен без додатне потврде!
:::

Такође можете извршити макро над неколико тикета одједном. Погледајте
[масовне радње](#масовне-радње) за упутство.

## Ознаке

![Снимак екрана приказује одељак ознака у траци тикета са
стране](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

**Зашто?**

Ознаке су један од начина категоризације тикета. О ознакама можете
размишљати као о некој врсти тагова. Могу се користити у условима окидача и
прегледа и могу бити додељени аутоматски од стране макроа, планера и
окидача.  Наравно, можете вршити претрагу по тексту ознаке и пронаћи тикете
који имају додељену ознаку.

**Како?**

In the ticket sidebar, you can find a section which is labeled as
**Tags**. Add a tag by clicking on the ::+:: button. You can select existing
tags and add new ones (if your admin didn't disable to add new tags).

Remove them by simply click on the ::x:: button. Be aware that there is no
confirmation dialog for deleting a tag from a ticket.

## Checklists

![Снимак екрана приказује списак задатака у бочној
траци](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Зашто?**

- Да пратите тренутне задатке
- Да извршите задатке на структурисан начин
- Да ништа не заборавите
- Да напредак у раду буде видљивији

**Како?**

Select the **Checklist** tab in the sidebar. If you can't see it, your
Zammad admin disabled it. You can only add or edit a checklist, if you have
the permission to edit the ticket.

У траци списка задатака можете:

- Додајте списак задатака: или додавањем новог кликом на `Додај празан
  списак` или на основу шаблона коришћењем `Додај по шаблону` (уколико не
  видите дугме за шаблон, не постоје).
- Уређивање постојећег списка:
  - Rename it by clicking on the title or using the ::a:: menu in the
    sidebar header.
  - Add checklist items by clicking the ::+:: button.
  - Change the text of the checklist items, either by just clicking on it or
    using the ::a:: menu next to the item.
  - Кликом на дугме `Измени редослед` можете превући и пустити ставке за
    жељени распоред.
- Delete the complete checklist by using the ::a:: menu in the sidebar
  header.

Постоје две функције које нису директно видљиве:

- You can refer to other tickets as a checklist item by using its hook and
  number in the item text (e.g.  `Ticket#123456`). Such items can't be
  checked manually, they reflect the state of the referred ticket.
  ::: tip
  Fetch the ticket hook and number by going to the desired ticket and either use the copy button in the header or use
  the keyboard shortcut [[.]]. Then you can paste it in the checklist you want to have it included.
  :::
- Zammad врши аутоматску проверу да ли су сви задаци са списка
  обављени. Провера се врши приликом затварања тикета. Уколико нису сви
  задаци обављени, Zammad ће вас упитати за наставак рада на остатку и
  чувања отвореног тикета, или да га свакако затворите. Када имате
  референциране тикета у вашем списку, само они који су затворени (са
  зеленим кругом) ће бити сматрани као обављени.

## Шаблони тикета

**Зашто?**

Експресно отварање тикета са предефинисаним атрибутима као што су наслов,
текст, ознаке и више вам штеди време. Ова функција захтева да ваш
администратор дефинише шаблоне тикета.

**Како?**

In the ticket create screen, you can find an `Apply Template ^` button in
the footer bar, if a template is available.  Select the template you want to
apply and apply changes if desired.

## Заједнички нацрти

**Зашто?**

За дељење нацрта са другим оператерима ваше групе, нпр. да би сте покренули
QA процес, уместо додавања интерног чланка. У таквом нацрту можете убацити
чак и измењене атрибуте тикета као што су приоритет, стање и прилагођени
атрибути као и чланак са одговором за клијента.

Ово је опциона функција. Уколико је не видите, ваш администратор је
искључио.

**Како?**

To **save a draft**, use the ::a:: menu in the footer of the ticket details
view and select "Save as draft".

Да би сте **применили постојећи нацрт**, кликните на дугме `Доступан нацрт`
на левој страни подножја.

::: warning
Примена нацрта преиначиће ваше неснимљене измене!
:::

## Откривање истовремене обраде

![Снимак екрана приказује друге оператере како гледају/уређују
тикет](/screenshots/advanced-features/simultaneous-work-detection.png)

**Зашто?**

Ствари за избегавање:

- Непотребан рад
- Опречни одговори од других оператера
- Преиначене/поништене измене од других оператера

Из овог разлога можете одмах да видите ко гледа и уређује тренутни тикет.

**Како?**

Погледајте траку у подножју прегледа тиекта. Када видите аватар сличицу
другог оператера (погледајте снимак изнад), нисте једини који тренутно раде
на тикету.

У зависности од одговарајуће иконица и да ли је аватар сличица изблеђена,
пронађите додатно значење:

- Други оператер гледа тикет (неизбледела аватар сличица без додатне
  иконице)
- Други оператер има отворен тикет али га не гледа активно (избледела аватар
  сличица са иконицом „спавања”, погледајте леви аватар на снимку)
- Други оператер тренутно активно ради на овом тикету (неизбледела аватар
  сличица са иконицом оловке, погледајте десни аватар на снимку)

## Масовне радње

![Screenshot shows the bulk action
flyout](/screenshots/cypress/usage-advanced-features.cy.js/bulk-flyout-overviews.png)

**Зашто?**

If you have to apply the same changes for many ticket, you can save time!

**Како?**

There are 2 _places_ where you can perform bulk actions:

- Detail search page
- Прегледи

Assuming you are in the overviews or in the detail search page, you can bulk
edit tickets in 2 _ways_:

- Use the **Bulk Action** button in the top right corner and change/add
  attributes by using the fields in the flyout
- Drag the tickets with the mouse to invoke the bulk action overlay and drop
  them on the desired action

To bulk edit tickets in either way, you have to select them before. Do so by
clicking the checkbox on the left side of each row in the ticket
table. Selected tickets are highlighted next to the checkbox.

The available changes you can apply to tickets are:

- Set group
- Set owner
- Set state
- Set priority
- Add a note
- Execute a macro

## Спајање тикета

![Снимак екрана приказује бочну траку спајања
тикета](/screenshots/cypress/usage-advanced-features.cy.js/ticket-merge.png)

**Зашто?**

Уколико имате два или више тикета о истом проблему, можда ћете желети да их
спојите у један. До овога може доћи ако вам клијент пошаље нову поруку која
не може да се додели постојећем тикету (нпр. референца тикета недостаје јер
је клијент послао потпуно нову поруку уместо одговара на постојећу
конверзацију).

Спајање тикета мигрира све поруке и напомене из тикета који спајате у
одабрани.

**Како?**

Go to the ticket you want to merge into another one. In the ticket sidebar,
use the ::a:: menu and select `Merge`. This opens a side panel in which you
can select a ticket by clicking on it or enter a ticket number in search
field.  When you selected a target ticket, confirm by using the `Merge`
button at the bottom.

На крају, чланци ће бити пребачени у одабрани тикет. Тикет на коме сте
извршили радњу спајања и даље постоји са следећим изменама:

- Сви чланци су замењени ознаком „спојено”
- Стање је промењено у „спојено”
- Тикет је повезан са својим „надређеним” тикетом

## Split Tickets

![Снимак екрана приказује радњу чланка за раздељивање у падајућем
менију](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Зашто?**

If you have a ticket which is about more than one issue, you might want to
split it in two or more separate tickets.  For example this might be the
case if a customer has a technical question and wants to place an order.

**Како?**

To split an article off, use the ::a:: menu next to an article and select
`Split`.

Ово ће резултовати у екрану отварања тикета са попуњеним атрибутима из
оригиналног тикета. Садржај чланка ће такође бити убачен. Можете прилагодити
све атрибуте својим потребама и кликнути на `Додај`.

Управо отворени тикет ће бити повезан са оригиналним као
подређени. Оригинални тикет је повезан са раздељеним као надређени.

## Повезивање тикета

**Зашто?**

When tickets about related issues arise, they can be linked to each other
for easier reference.  [Merged](#merge-tickets) and [split](#split-tickets)
tickets are automatically linked.

**Како?**

In the ticket sidebar, add a link to another ticket by clicking the ::+::
button in the "Links" section. This opens a side panel in which you can
select a ticket by clicking on it or enter a ticket number in search
field. Additionally, you can choose between different link types:

- **Нормално:** за сродне тикете који немају хијерархију.
- **Надређени/подређени**: за сродне тикете где је основни проблем а други
  је задатак. Ова врста везе се подразумевано користи приликом раздељивања
  или спајања тикета.

## Обрачун времена

**Зашто?**

За Zammad-овим интегрисаним обрачуном времена, можете водити евиденцију
колико времена трошите на обраду тикета. На основу обрачунатог времена у
тикету, време ће бити аутоматски припојено клијентима и организацијама. Ово
можете користити у вашој фирми за наплату или за вођење буџета.

**Како?**

По освежавању тикета, биће приказан дијалог обрачуна времена. Унесите колико
времена сте провели на тикету.

![Снимак екрана приказује дијалог обрачуна
времена](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-dialog.png)

Ова функција је **опциона**. Уколико је не видите по сваком освежавању
тикета, ваш администратор је још није укључио или је услов за приказ на
тикетима неиспуњен.

Обрачунато време се увек бележи и снима без јединице времена. Међутим, ваш
администратор може одлучити да прикаже додатан приказ јединице поред поља да
наговести вама и вашим колегама у којим јединицима је очекивано време
(погледајте снимак екрана).

Activity types can be used to distinguish between different activities and
for grouping the accounted times. If this optional feature is active, it
shows a list of activities from which you can select in the time accounting
dialog.

If a ticket already has accounted time(s), you can see it in the ticket
sidebar on the right side in the ticket detail view at the bottom. You can
find the calculated sums of each activity type (if configured) as well as
the total sum of accounted times for all activity types.

![Screenshot shows the time accounting
overview](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)
