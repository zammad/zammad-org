---
order: 4
title: 'Напредне функције'
---

# Напредне функције

This page features a collection of various helpful tools that don't need
their own separate pages. Just keep reading, search the page or navigate to
the section you want using the table of contents on the right.

## Понашање при освежавању тикета

![Снимак екрана приказује мени понашања након
освежавања](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Зашто?**

It is possible to automatically close a ticket tab in the navigation sidebar
after updating a ticket.  This saves you a click after updating or updating
a ticket to _closed_ state.

**Како?**

У доњој траци детаљног приказа тикета, кликните на дугме `Остани у прозору
^` и одаберите жељену опцију (уколико је на подразумеваној вредности, у
супротном имаће један од назива опција испод). Имате неколико различитих
опција:

- **Stay on tab**: Default option. You have to manually close the tab if you
  want to remove it from your navigation sidebar.
- **Затвори прозор**: Ова опција затвара прозор по сваком освежавању
  тикета. Може бити добра опција ако обрађујете пуно тикета и/или тикети
  захтевају пуно интеракције.
- **Close tab on ticket close**: This option only closes the tab when the
  ticket is updated to the _closed_ state.

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

## Mention a User

![Screenshot shows mentioning a
user](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Зашто?**

Затражите информације од ваших колега или их помените у важним тикетима да
би добили обавештења о освежавању тикета и да би били аутоматски претплаћени
на тај тикет.

**Како?**

While writing a ticket article, use the button in the toolbar of the editor
or simply type [[@]][[@]]. Both ways let you search for the name of the user
you want to mention by typing some characters or the complete name.

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
the macro is assigned as owner, a tag **spam** is added and the ticket is
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
  Fetch the ticket hook and number by going to the desired ticket and either use the copy button ::c:: in the header or
  use the keyboard shortcut [[.]]. Then you can paste it in the checklist you want to have it included.
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

## Надгледање ескалација тикета

**Зашто?**

Service Level Agreements (SLAs) ensure timely responses to customer
requests. Your administrator sets such goals as responding to all inquiries
within eight hours, with optional custom deadlines for specific
customers. When such a deadline is passed, the ticket escalates.

**Како?**

Zammad notifies you by default when tickets approach or exceed their
deadlines. Configure these notifications in your [profile
settings](/en/documentation/use/user-profile#notifications). Zammad also
ships a default overview called "Escalated Tickets". This overview includes
already escalated tickets and tickets which are expected to escalate within
the next 10 minutes.

Тикети са додељеним SLA приказују временску ознаку у свом заглављу. Пређите
курсором преко ове ознаке да видите све етапе и рокове ескалација у
прозору. Приказани су сва предстојећа и достигнута времена ескалација на
основу ваше SLA конфигурације:

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

**Зашто?**

Уколико морате да примените идентичне измене на више тикета, можете уштедети
време!

**Како?**

There are 2 places where you can apply bulk actions:

- In the ticket tab in the [detailed search page](guides/search)
- In [Overviews](guides/overviews)

In both places, you can apply bulk actions in different ways:

- By using the side panel
- By using the drag & drop overlay

To use bulk actions, first select the tickets you want to apply the changes
to. Either select the tickets individually by clicking on the checkbox next
to them or use the checkbox in the header to select all tickets of the
current page. After selecting all tickets of the page, you can even select
all tickets which match your current search query or overview condition by
clicking on the **Select all XX results** label. The maximum number of
selectable tickets for a bulk action is 2000.

To select a section of consecutive tickets, click on the checkbox of the
first ticket, then hold [[shift]] and click on the checkbox of the last
ticket. This selects all tickets in between as well. This also works for
unselecting tickets.

Depending on the number of affected tickets, you might see a small
notification after triggering a bulk action, informing you about the
progress. The bulk action is performed in the background so you can work on
other tickets.  However, until the bulk action is finished, you are not able
to start a new bulk action.

**Side panel:**

![Screenshot shows the bulk action side
panel](/screenshots/cypress/usage-advanced-features.cy.js/bulk-side-panel-overviews.png)

After you selected tickets, click the `Bulk Action` button in the top right
corner and change/add attributes by using the fields in the right side
panel. The available changes you can apply to tickets are:

- Промена групе
- Промена власника
- Промена стања
- Промена приоритета
- Додавање напомене
- Покретање макроа

**Drag & drop with bulk overlay:**

![Screenshot shows the bulk action via drag and
drop](/screenshots/cypress/usage-advanced-features.cy.js/bulk-action-drag-and-drop.png)

After you selected tickets, drag them by pressing and holding the mouse
button and drop them on the desired action in the bulk action overlay. You
can always skip this by dropping the tickets in the middle of the page. The
available actions you can apply to tickets are:

- Промена групе
- Промена власника
- Unassign owner
- Unassign owner and set group
- Run macro

Start your drag and drop action from one of the already selected tickets in
case you selected all relevant ones.  To include another unselected ticket,
start dragging from there and so it is also included in the batch
processing.

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

In the ticket sidebar, add a link to another ticket by clicking the ::+::
button in the **Related tickets** section.  This opens a side panel in which
you can select a ticket by clicking on it or enter a ticket number in search
field.  Additionally, you can choose between different link types:

- **Нормално:** за сродне тикете који немају хијерархију.
- **Надређени/подређени**: за сродне тикете где је основни проблем а други
  је задатак. Ова врста везе се подразумевано користи приликом раздељивања
  или спајања тикета.

## Duplicate Detection

![Screenshot shows duplicate ticket warning during ticket
creation](/screenshots/cypress/usage-advanced-features.cy.js/duplicate-detection.png)

**Зашто?**

Sometimes, it happens that a customer reaches out to you (or colleagues)
more than once about a single issue. To avoid creating duplicate tickets,
Zammad can warn you when another ticket is already present. This feature has
to be activated and configured by your admin.

**Како?**

Just create a new ticket and provide some information. Your admin can
configure which ticket attributes must match for the warning to show up
(e.g. customer and title). In case of many unnecessary warnings or no
warning at all, ask your admin to adjust the attributes to compare.

When a duplicate is detected, a warning in the ticket shows up (see the
example in screenshot above). This warning can contain a ticket
number. Click on the ticket link to see what it is about. In case it is no
duplicate, simply ignore it and continue with the ticket creation.

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

## Highlight Text

**Зашто?**

It allows you to give your colleagues a hint about important aspects of the
ticket and to make sure important parts aren't getting overlooked. Be aware
that this feature is not about text highlighting for new articles, it is
about highlighting text in existing articles for you and other agents.

**Како?**

![Screenshot shows highlight menu from ticket detail
view](/screenshots/cypress/usage-advanced-features.cy.js/text-highlighting.png)

Use the highlighting tool with the pencil icon in the upper right corner in
the ticket detail view. To highlight text, either select text first and then
click the button. As an alternative, you can click the highlighting button
first and then select text. You can choose a different color by using the
down arrow on the right side of the button. To remove the highlighting,
simply choose the rubber icon from the color menu.
