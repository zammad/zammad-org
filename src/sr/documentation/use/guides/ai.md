---
order: 4
title: Функције
---

# Функције

## Увод

Zammad постаје све паметнији! Проширујемо Zammad-ове AI могућности да вам
помогнемо у ефикаснијој обради тикета подршке. ✨🚀

::: info
Функције вештачке интелигенције мора подесити и активирати ваш администратор. Ако је не видите, она није подешена.
Више информација о томе како је конфигурисати и активирати можете пронаћи у одељку за администраторе.
:::

## Сажети опис тикета

Функција сажетог описа тикета се понаша у складу са својим именом: резимира
садржај тикета. Ово може бити велика уштеда времена при великих тикета и/или
пуно примопредаја између оператера.

Уколико је функција укључена, сажети опис тикета ће бити припремљен при
освежавању тикета и или отварањем детаљног прегледа тикета или бочне траке
сажетог описа тикета, у зависности од подешавања.

![Снимак екрана приказује одељак ознака у траци тикета са
стране](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-ticket-summary-sidebar.png)

У зависности од ваше Zammad конфигурације, сажети опис може садржати следеће
одељке:

- Намера клијента
- Сажети опис конверзације
- Отворена питања (опционо)
- Предстојећи догађаји (опционо)
- Расположење клијента (опционо)

## Алатке помоћника писања

За коришћење излистаних функција, прво морате да обележите текст на који
желите да се измене примене. Након тога, кликните на **Smart Editor** дугме
при дну новог чланка и изаберите једну од следећих функција, у зависности од
жељеног понашања.

![Снимак екрана који приказује мени радњи
макроа](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-writing-assistant-tools.png)

::: warning

- Имајте на уму да се ваш текст замењује када изаберете један од текстуалних алата. Ако нисте задовољни резултатом,
  покушајте да користите опцију за поништавање притискањем [[ctrl]] + [[z]].
- Увек проверите одговор двапут. Иако је функција пажљиво развијена, у појединачним случајевима и даље могу постојати мањи проблеми
  због природе неуронских мрежа.

:::

Zammad долази са подразумеваним алаткама помоћника за писање. Доступност
зависи од конфигурације ваше Zammad инстанце. Можете чак добити приступ и
прилагођеним алаткама у случају да их је ваш администратор дефинисао.

- **Препиши сложени одељак и учини га лаким за разумевање**: Користи ваш
  нацрт као основу и покушава да га прошири у исполиран текст. Покушава да
  одреди структуру и побољша јасноћу и прецизност као и да уклони грешке у
  правопису и граматици. Могуће је искористити је прилагањем само основних
  информација (нпр. путем листе са тачкама) и пуштањем вештачке
  интелигенције да употпуни одговор.
- **Исправи правопис и граматику**: Лекторише ваш текст и отклања грешке у
  правопису и граматици.
- **Сажми одељак на отприлике половину његове тренутне величине**: Скраћује
  ваш текст уз задржавање поруке и тона оригиналног текста.
- **Препиши сложени одељак и учини га лаким за разумевање**: Уклања
  необавезне делове и преписује ваш текст у јасном и разумљивом стилу.

## Knowledge base assistant

![Screenshot shows the related knowledge section of the ticket sidebar with
an AI-suggested knowledge base
answer](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-knowledge-base-assistant.png)

### Knowledge base answer generation

This feature allows you to trigger an AI-based generation of a [knowledge
base](/en/documentation/use/guides/knowledge-base)  answer from a
ticket. This is useful if you often get similar tickets and want to quickly
create a knowledge base article for such cases. Doing so helps you and your
colleagues solve similar tickets more efficiently in the future. It might
even reduce incoming ticket volume when customers can resolve their issues
directly from the published knowledge base.

This feature is available in the **Related knowledge** section of the ticket
sidebar. Click the **Add AI draft** button to trigger the answer generation.

Things to consider:

- Чланак базе знања се генерише као нацрт и неће бити аутоматски објављен.
- Ви ћете бити постављени као аутор чланка.
- The answer is generated in the default language of your knowledge base.
- The answer includes a note in the content and a tag (`ai-generated`) about
  the AI generation.
- A link to the answer is added to the ticket from which you triggered the
  answer generation.
- The answer is created in a knowledge base category for which you have
  editor permissions. The AI chooses one of these categories.

If a similar knowledge base answer already exists, Zammad shows it in a
dialog before creating a new one. This gives you the chance to review
existing related answers to prevent duplicate submissions.

### Knowledge base answer suggestion

This feature compares the ticket content against the knowledge base and
shows relevant answers under **Suggested by AI** if they meet the
admin-configured score threshold. Each suggestion shows the title of the
answer and more details on hover. An additional relevance score is only
shown to users with the corresponding admin permissions. Click on the title
to open the answer in the knowledge base. Click the ::+:: on the right side
which appears when hovering with the mouse to link it to the ticket.

Уколико нема релевантних предлога, биће приказана порука „Без предлога”.

## AI агенти

Оператери вештачке интелигенције могу бити подешени за рад на одређеним
врстама рутинских задатака. Генерално, ова функција ради у позадини, али ако
је конфигурисана, можете је приметити у неким ситуацијама (види примера
испод). Ако је ваш администратор креирао макро са акцијом оператера вештачке
интелигенције, можете га чак покренути и ручно. Затражите детаље од
администратора и погледајте [опис
макроа](/en/documentation/use/advanced-features#macros) на страници за
напредне функције.

### Историјат тикета

Уколико AI агент освежи тикет, можете то и видети у евиденцији историјата
тикета под називом AI агента. Уколико приметите проблеме са начином рада AI
агента, обавестите о томе свог Zammad администратора.

![Пример снимка екрана (пуна
страна)](/screenshots/documentation/use/ai/ai-agent-ticket-history.png)

### Откривање истовремене обраде

AI агенти који тренутно раде на тикету су приказани као и други оператери у
доњој траци присутних корисника. Ово ће вам помоћи да избегнете истовремени
рад као и губитак несачуваних измена. Уколико приметите сличицу AI агента,
сачекајте тренутак или пређите на други тикет.

Сличица AI агента:

![Пример снимка екрана (пуна
страна)](/screenshots/documentation/use/ai/ai-live-user.png)

### Индикатор прегледа

AI агент који се извршава има индикатор у колони стања у прегледима. Кружић
стања ће бити приказан у плаво-љубичастом градијенту:

![Snimak ekrana prikazuje krug statusa u pregledima koji ukazuje da agent
veštačke inteligencije trenutno radi na
njoj](/screenshots/documentation/use/ai/overview-ai-agent-indicator.png)
