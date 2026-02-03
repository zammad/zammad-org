---
order: 4
title: 'Напредне функције'
---

# Напредне функције

This page covers useful features that would not make sense to cover on
individual pages. Just keep reading, search the page or navigate to the
desired section in the table of content on the right.

## Понашање при освежавању тикета

![Снимак екрана приказује мени понашања након
освежавања](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Зашто?**

Могуће је аутоматски затворити прозор тикета у бочној траци
навигације. Зависи од ваших подешавања, али можете уштедети клик након
освежавања или освежавања тикета са стањем _затворено_.

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
[[shift]] [[c]] for changing the ticket state to closed and close the ticket tab.
:::

## Текстуални исечци

![Снимак екрана приказује функцију текстуалних
исечака](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Зашто?**

If you have to answer the same question again and again, ask your Zammad
admin to create such a text module for you.  They can even include variables
like customer name or any other available attribute which get replaced while
using it in a ticket. The usage of text modules has benefits like:

- Штедите време приликом одговарања на тикете
- Ваши и одговори ваших колега се поклапају јер користите идентичан текст за
  одговоре

**Како?**

Use the button in the toolbar of the editor or simply write [[:]][[:]] in
the editor. Both ways let you search for the desired text module by typing
some characters or words of the text or keywords of the text module.

You can pick one by clicking on it or by using the up and down arrows
followed by [[enter]] on your keyboard. There are some text modules in
Zammad which are shipped by default.

## Insert Knowledge Base Article

![Screenshot shows inserting knowledge base
article](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-insert-kba.png)

**Зашто?**

If you often have the same or very similar customer requests about an issue
of which a knowledge base article exists.  This saves you time because you
don't have to switch to the knowledge base and copy/paste content.

**Како?**

Use the button in the toolbar of the editor or simply write [[?]][[?]] in
the editor. Both ways let you search for the desired knowledge base article
by typing some characters or words.

## Помените колегу

![Screenshot shows mentioning a
colleague](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Зашто?**

Затражите информације од ваших колега или их помените у важним тикетима да
би добили обавештења о освежавању тикета и да би били аутоматски претплаћени
на тај тикет.

**Како?**

While writing a ticket article, use the button in the toolbar of the editor
or simply type [[@]][[@]]. Both ways let you search for the name of the
colleague you want to mention by typing some characters or the complete
name.

Zammad приказује листу свих корисника који одговарају вашем уносу и можете
их одабрати кликом или коришћењем стрелица на горе и доле а затим притиском
на [[enter]] на вашој тастатури.

## Претплатите се на тикет

![Снимак екрана приказује функцију
претплате](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Зашто?**

Уколико сте заинтересовани за прогрес тикета, а нисте власник тикета, можете
се претплатити на исти. Ово значи да ћете примати обавештења за свако
освежавање.

**Како?**

Укључите прекидач „Претплати се” у траци тикета са стране за добијање
обавештења. Уколико сте већ поменути у тикету, већ сте
претплаћени. Искључите прекидач за заустављање обавештења. Сличице испод вам
приказују ко је претплаћен на тикет и ко је обавештен о освежавањима.

## Макрои

![Снимак екрана који приказује мени радњи
макроа](/screenshots/cypress/usage-advanced-features.cy.js/ticket-macro.png)

**Зашто?**

If you have many steps you do over and over again, you should use a macro
for that. In such a macro, your admin can pre-define different ticket
actions you can apply with just a click. As an example, Zammad ships a
"Close & Tag as Spam" macro by default. If applied, the user who executes
the macro is assigned as owner, a tag `spam` is added and the ticket is
closed. It is even possible to run an [AI
agent](/en/documentation/use/guides/ai) within a macro on demand.

**Како?**

If your admin already created a macro, you can execute it in the ticket
detail view by clicking the `^` section of the `Update` button in the right
corner of the footer bar (see screenshot above) and select the macro you
want to execute.

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

У бочној траци тикета, можете пронаћи одељак под насловом
**Ознаке**. Додајте ознаку кликом на дугме ::+::. Можете изабрати између
постојећих и нових ознака (уколико ваш администратор није искључио додавање
нових ознака).

Уклоните их једноставним кликом на дугме ::x::. Обратите пажњу да неће бити
потврдног дијалога за брисање ознаке са тикета.

## Спискови задатака

![Снимак екрана приказује списак задатака у бочној
траци](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Зашто?**

- Да пратите тренутне задатке
- Да извршите задатке на структурисан начин
- Да ништа не заборавите
- Да напредак у раду буде видљивији

**Како?**

Одаберите језичак **Списак задатака** у бочној траци. Ако га не видите, ваш
Zammad администратор га је искључио. Списак задатака можете додати или
уређивати само ако имате дозволу да освежавате тикет.

У траци списка задатака можете:

- Додајте списак задатака: или додавањем новог кликом на `Додај празан
  списак` или на основу шаблона коришћењем `Додај по шаблону` (уколико не
  видите дугме за шаблон, не постоје).
- Уређивање постојећег списка:
  - Промените назив кликом на наслов или коришћењем падајућег менија ::a:: у
    заглављу траке.
  - Додајте задатке на списак кликом на дугме ::a::.
  - Промените текст задатка, или кликом на њега или коришћењем падајућег
    менија ::a:: поред ставке.
  - Кликом на дугме `Измени редослед` можете превући и пустити ставке за
    жељени распоред.
- Обришите комплетан списак задатака коришћењем падајућег менија ::a:: у
  заглављу траке.

Постоје две функције које нису директно видљиве:

- Можете рефернцирати друге тикете на списку коришћењем њиховог прикључка и
  броја у тексту задатка (нпр. `Ticket#123456`). Ове ставке се не могу ручно
  означити, већ ће одражавати стање референцираног тикета.
  ::: tip
  Нађите прикључак тикета са бројем одласком у жељени тикет и или кликом на дугме за копирање у заглављу
  или путем пречице на тастатури [[.]]. Онда га можете налепити у текст новог задатка.
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

У екрану отварања тикета, пронаћи ћете дугме `Примени шаблон ^` у подножју,
уколико су доступни шаблони. Одаберите шаблон који желите и примените жељене
измене.

## Заједнички нацрти

**Зашто?**

За дељење нацрта са другим оператерима ваше групе, нпр. да би сте покренули
QA процес, уместо додавања интерног чланка. У таквом нацрту можете убацити
чак и измењене атрибуте тикета као што су приоритет, стање и прилагођени
атрибути као и чланак са одговором за клијента.

Ово је опциона функција. Уколико је не видите, ваш администратор је
искључио.

**Како?**

Да бисте **сачували нацрт**, користите падајући мени ::a:: у подножју
прегледа тикета и одаберите „Сачувај нацрт”.

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

Have a look at the footer bar in the ticket detail view. When there is an
avatar from another agent in the live user section (see screenshot above),
you are not the only one viewing this ticket.

У зависности од одговарајуће иконица и да ли је аватар сличица изблеђена,
пронађите додатно значење:

- Други оператер гледа тикет (неизбледела аватар сличица без додатне
  иконице)
- Други оператер има отворен тикет али га не гледа активно (избледела аватар
  сличица са иконицом „спавања”, погледајте леви аватар на снимку)
- Други оператер тренутно активно ради на овом тикету (неизбледела аватар
  сличица са иконицом оловке, погледајте десни аватар на снимку)

## Monitoring Ticket Escalations

**Зашто?**

Service Level Agreements (SLAs) ensure timely responses to customer
requests. Your administrator sets such goals as responding to all inquiries
within eight hours, with optional custom deadlines for specific
customers. When such a deadline is passed, the ticket escalates.

**Како?**

Zammad notifies you by default when tickets approach or exceed their
deadlines. Configure these notifications in your [profile
settings](/en/documentation/use/manage-profile#notifications). Zammad also
ships a default overview called "Escalated Tickets". This overview includes
already escalated tickets and tickets which are expected to escalate within
the next 10 minutes.

SLA-relevant tickets display a timestamp in the ticket detail header. Hover
over this timestamp to see all escalation stages and deadlines in a
popup. It shows all upcoming or reached escalation times based on your SLA
configuration:

![Screenshot shows escalation panel by hovering over escalation
timestamp](/screenshots/cypress/usage-advanced-features.cy.js/escalation-panel.png)

:::info
The escalation times are calculated based on your business hours. This means when your business hours start at 9:00, a
ticket is created at 7:00 and you have an 1-hour deadline, it will escalate at 10:00, unless resolved earlier.
:::

The SLA feature requires a configuration from your admin. In case you don’t
see escalation timestamps, either the ticket is not SLA-relevant or the
feature is not configured.

## Масовне радње

![Screenshot shows the bulk action side
panel](/screenshots/cypress/usage-advanced-features.cy.js/bulk-side-panel-overviews.png)

**Зашто?**

Уколико морате да примените идентичне измене на више тикета, можете уштедети
време!

**Како?**

Постоје два _места_ одакле можете покренути масовне радње:

- Детаљни екран претраге
- Прегледи

Под претпоставком да се налазите у прегледима или на екрану детаљне
претраге, можете да масовно уредите тикете на два _начина_:

- Use the `Bulk Action` button in the top right corner and change/add
  attributes by using the fields in the side panel
- Превуците тикете за покретање режима масовне радње и пустите их на жељену
  радњу

За масовно уређивање тикета, морате их прво одабрати без обзира на начин
покретања радње. То можете урадити одабиром поља за потврду са леве стране
сваког реда у табели тикета. Одабрани тикети ће бити наглашени одмах до поља
за потврду.

Доступне промене које можете применити на тикете су:

- Промена групе
- Промена власника
- Промена стања
- Промена приоритета
- Додавање напомене
- Покретање макроа

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

Идите на тикет који желите да спојите са другим. У траци тикета, одаберите
`Споји` у падајућем менију ::a::. Ово ће отворити бочни панел у коме можете
одабрати тикет кликом на исти или уносом броја тикета у поље за
претрагу. Када одаберете циљни тикет, потврдите дугметом `Споји` при дну.

На крају, чланци ће бити пребачени у одабрани тикет. Тикет на коме сте
извршили радњу спајања и даље постоји са следећим изменама:

- Сви чланци су замењени ознаком „спојено”
- Стање је промењено у „спојено”
- Тикет је повезан са својим „надређеним” тикетом

## Раздели тикете

![Снимак екрана приказује радњу чланка за раздељивање у падајућем
менију](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Зашто?**

If you have a ticket which is about more than one issue, you might want to
split it in two or more separate tickets.  For example, this might be the
case if a customer has a technical question and wants to place an order.

**Како?**

За радељивање чланка, одаберите `Раздели` из падајућег менија ::a:: поред
чланка.

Ово ће резултовати у екрану отварања тикета са попуњеним атрибутима из
оригиналног тикета. Садржај чланка ће такође бити убачен. Можете прилагодити
све атрибуте својим потребама и кликнути на `Додај`.

Управо отворени тикет ће бити повезан са оригиналним као
подређени. Оригинални тикет је повезан са раздељеним као надређени.

## Повезивање тикета

**Зашто?**

Када се појаве тикети о сродним проблемима, могу бити међусобно повезани
ради лакшег референцирања. [Спојени](#спајање-тикета) и
[раздељени](#раздели-тикете) тикети ће бити аутоматски повезани.

**Како?**

У траци тикета, додајте везу на други тикет кликом на дугме ::+:: у одељку
`Везе`. Ово ће отворити траку са стране у којој можете одабрати тикет кликом
на исти или уносом броја тикета у поље за претрагу. Додатно, можете изабрати
између различитих типова веза:

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

Врсте активности се могу користити за разликовање активности и за груписање
обрачунатих времена. Уколико је ова опциона функција укључена, приказује
листу активности из које их можете одабрати у дијалогу обрачуна времена.

Уколико тикет већ има обрачуната времена, можете их видети при дну бочне
траке тикета са десне стране у детаљном приказу тикета. Можете пронаћи и
обрачунате збирове за сваку врсту активности (уколико су подешене) као и
укупан збир обрачунатог времена за све врсте активности.

![Снимак екрана приказује приказ обрачуна
времена](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)

## User Detail Panel

**Зашто?**

Преглед важних информација о клијенту/кориснику без напуштања тренутног
екрана вам омогућава да останете фокусирани на ваш задатак.

**Како?**

You might have seen it already: simply hover your mouse over an avatar icon,
no matter if it is in the header, footer, main content or the content
sidebar in the ticket detail view. To see more details, click on the user
avatar to open the [user detail page](#user-detail-page).

![Screenshot shows an avatar with opened user detail
panel](/screenshots/cypress/usage-advanced-features.cy.js/user-detail-panel.png)

Иначе, иконица круне на снимку екрана представља VIP стање клијента, које
можете бити укључено у детаљном приказу клијента и администраторском панелу.

## User Detail Page

![Screenshot shows user detail
page](/screenshots/cypress/usage-advanced-features.cy.js/user-detail-page.png)

**Зашто?**

It allows you to see all relevant user information in one place. Examples
what you can find and do there:

- See organization membership
- See a graph of recent tickets
- Add or edit a note
- Edit the customer (via ::a:: menu)
- See a history of changes (via ::a:: menu)
- Create a new ticket with this user as customer

**Како?**

Simply click on a user avatar (e.g. in the header of the ticket detail
view). This opens a new tab with the customer detail page. In case you also
have admin permissions, you can even create a deletion job for a user from
the ::a:: menu.

## Organization Detail Page

![Screenshot shows organization detail
page](/screenshots/cypress/usage-advanced-features.cy.js/organization-detail-page.png)

**Зашто?**

It allows you to see all relevant organization information in one
place. Examples what you can find and do there:

- See the members of the organization
- See a graph of the recent tickets of the whole organization
- Add or edit a note
- Edit the organization (via ::a:: menu)
- See a history of changes (via ::a:: menu)
- Create a new user as a member of this organization

**Како?**

Simply click on an organization avatar (e.g. in the header of the ticket
detail view next to the user avatar). This opens a new tab with the
organization detail page.

## External Issues and Assets

**Зашто?**

If you use i-doit and Zammad for IT support or you deal with Github or
Gitlab issues, you can link to these external systems to have all relevant
information in one place. Your Zammad admin has to activate and configure
these features in Zammad's settings.

**Како?**

![Screenshot shows Gitlab content sidebar with "Link Issue"
button](/screenshots/cypress/usage-advanced-features.cy.js/gitlab-content-sidebar.png)

If activated, simply open a ticket and choose the right content sidebar tab
with the respective icon (see Gitlab example in screenshot above). Click the
button to link to an issue by entering the URL of it or select the item from
a select field (i-doit). Afterwards, you can see the linked item with
additional metadata. By clicking on the linked item, you are redirected to
it in the respective system.
