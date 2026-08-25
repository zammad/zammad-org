---
order: 5
title: CTI
---

# Општи CTI

## Увод

Ова страница описује опсег и функционалности API-ја за општи CTI.

::: warning

- Аутентификација на овом ендпоинту ради фундаментално другачије у поређењу са
  осталим деловима API-ја.
- API клијенти _не раде_ са CTI ендпоинтима осим ако експлицитно није наведено
  од стране произвођача клијента!
- CTI ендпоинти су релевантни само за PBX системе.
:::

## Функције

Ево кратког и сажетог списка могућности које овај CTI API пружа.

### Долазнo

- Функције дневника позивача за ваше оператере.
- Блокирање бројева позивача током сигнализације.

### Одлазнo

- Функције дневника позивача за ваше оператере.
- Подешавање одлазних бројева позивача у зависности од циља броја позивача.

### Путања

Крајња тачка се може пронаћи у интеграцији за општи CTI и садржи јединствени
токен који служи за аутентификацију. Побрините се да је ова URL адреса
крајње тачке безбедна.

::: info
Конфигурација за општи CTI и исправан ендпоинт могу се пронаћи у вашем
Zammad-у у администраторском интерфејсу под _Систем > Интеграције > CTI (опште)_.

Такође, имајте на уму наведене захтеве и ограничења.
Све опције које захтевају одговоре (нпр. блокирање, манипулисање одлазним
бројевима позивача) ослањају се на конфигурације у оквиру Zammad CTI интеграције
странице.
:::

::: tip
Постоје две опције како послати релевантне податке на Zammad путем `POST` методе:

- JSON (препоручено)
- Form-дата
:::

### Догађаји

Постоји више догађаја везаних за током позива. Ове акције увек потичу из
вашег PBX система и могу бити:

- "newCall" догађај (иницијализација позива)
- "хангуп" догађај (завршетак позива)
- "answer" догађај (такође познат као подизање слушалке)

У неким ситуацијама Zammad може послати одговор на ваше PBX позиве
(нпр. одбијање) ако сте блокирали одређеног позивача. Zammad никада неће
иницирати специфичне акције са вашим PBX-om. Zammad је пасивни компонент у
свим описаним случајевима.

### Коришћени примери

**Пример:**
У наставку су послати позиви са следећом конфигурацијом. Ово је
важно за вас да бисте разумели одговоре које приказујемо овде.

**Одлазни:**

- Циљани број позивача `4989*` подешава одлазни број позивача `498999998145`
  са напоменом "Сви из Минхена"
- Циљани број позивача `4930*` подешава одлазни број позивача `493023125877`
  "Сви из Berlin-а"

**Остала подешавања:**

- Подразумевани број позивача за одлазне позиве `496990009111`

## Догађај Новог Позива

### Уопштено

Доступни `атрибути` и <Badge type="info" text="примери" />:

`event` <Badge type="info" text="newCall"/>
:
  Tell Zammad there is a new call.

`from` <Badge type="info" text="4930555716000"/>
:
  Number that initiated the call. Can be `anonymous` as well.

`to` <Badge type="info" text="4930555716000"/>
:
  Number that is being called.

`direction` <Badge type="info" text="in"/>
:
  The call direction. If your agent initiates a call, this will be `out`. Calls
from external side to you are `in`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: ID који је јединствен за позив. Zammad ће користити овај ID да идентификује
  постојећи позив уз следеће акције (нпр. као одговор или прекид).

`user` <Badge type="info" text="John Doe"/>
: Стварно име учесника. Можда ћете морати да доставите параметре у облику низа (`[]`)
  у зависности од методе позива коју одаберете. Ако је смер `out`,
  ово је име особе/особа које звони. Ако је смер `in`, ово
  је име особе/особа која се зове.

`queue` <Badge type="info" text="support"/>
: Опционо име реда чекања, ова опција је релевантна за филтер дневника позивача.
  Ова вредност је опциона.

### Одлазнo

:::: details

::: tabs key:cti

=== JSON

Послат `POST` захтев:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.json

Одговор:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Пример цурл команде:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.sh

=== Form-дата

Послат `POST` захтев:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req

Повратне вредности:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Пример цурл команде:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req.sh

:::
::::

### Долазнo

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.json

Одговор:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Пример цурл команде:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.sh

=== Form-дата

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req

Повратне вредности:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Пример цурл команде:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req.sh

:::
::::

### Одговори Специфични за Ситуацију

У зависности од одабраног смера позива, Zammad ће вратити или (опционо)
конфигурисан ID позива или (опционо) блокирати позивача. Ако ваш Zammad није
конфигурисао једну или обе опције, одговор ће бити празан.

::: info
Ово мора да буде подржано од стране вашег PBX-a како би функционисало.
:::

#### Одбијање блокираних бројева позивача

Ако долазећи нови позив одговара броју за блокирање, Zammad ће вратити
следеће.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-blocked-res.json

Ако се не поклопи ниједан број за блокирање, Zammad ће вратити следеће.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

::: warning
Ваш PBX и даље мора да заврши позив (догађај хангуп). У супротном
позив неће само се појавити у Zammad дневнику позивача, већ ће се појавити као
позив у звону.
:::

#### Подешавање специфичног одлазног броја позивача

У случају да ваша инстанца има конфигурисан одговарајући пребрисани број
позивача, Zammad ће вратити следећи payload.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-caller-id-res.json

Ако се не пронађе подударност за пребрисивање или ништа нисте конфигурисали,
Zammad ће вратити следеће.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

## Догађај Одговарања на Позив

### Уопштено

Доступни `атрибути` и <Badge type="info" text="примери" />:

`event` <Badge type="info" text="answer" />:
:
  Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
:
  Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
:
  Number that is being called.

`direction` <Badge type="info" text="in" />:
:
  The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: ID који је јединствен за позив. Zammad ће користити овај ID за идентификацију
  постојећег позива при даљим акцијама (нпр. одговарање или прекид).

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad ће потражити корисника са датом вредношћу, следећи атрибути се процењују редом:
      - `user.phone`
      - `user.login`
      - `user.if`
    Ова вредност је опционална.

`user` <Badge type="info" text="John Doe" />:
: Право име (имена) укљученог корисника. Можда ћете морати да наведете параметре у облику низа (`[]`)
  у зависности од изабране методе позива. Ако је смер `out`,
  ово је име позивајуће особе/особа. Ако је смер `in`, ово је
  име биране особе/особа. Ова вредност је опционална.

Постоје две могућности за слање одговарајућих података на Zammad путем
`POST` методе.

### Одлазнo

:::: details

::: tabs key:cti

=== JSON

Послат `POST`-захтев:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Подаци:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.json

Одговор:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.sh

=== Form-дата

Послат `POST`-захтев:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Подаци:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req

Враћа се:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req.sh

:::
::::

### Долазнo

:::: details

::: tabs key:cti

=== JSON

Подаци:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.json

Одговор:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.sh

=== Form-дата

Подаци:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req

Враћа се:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req.sh

:::
::::

## Прекид позива

### Уопштено

`event` <Badge type="info" text="hangup" />:
:
  Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
:
  Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
:
  Number that is being called.

`direction` <Badge type="info" text="in" />:
:
  The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: ID који је јединствен за позив. Zammad ће користити овај ID за идентификацију
  постојећег позива при даљим акцијама (нпр. одговарање или прекид).

`cause`
:   Ово дефинише разлог прекида позива. Zammad процењује узрок и приказује
    нпр. пропуштене позиве у дневнику позиваца. Могуће вредности су:
    - `normalClearing` (једна од страна је прекинула везу након успостављања позива)
    - `busy` (бирена страна је била заузета)
    - `cancel` (позивач је прекинуо везу пре него што је бирена страна одговорила)
    - `noAnswer` (бирена страна је одбила позив, нпр. путем DND подешавања)
    - `congestion` (бирена страна није могла бити достигнута)
    - `notFound` (бирени број не постоји или бирена страна је ван мреже)
    - `forwarded` (позив је преусмерен на другу страну)

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad ће потражити корисника са датом вредношћу, следећи атрибути се процењују редом:
    - `user.phone`
    - `user.login`
    - `user.if`
    Ова вредност је опционална.

### Одлазнo

:::: details

::: tabs key:cti

=== JSON

Послат `POST`-захтев:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Подаци:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.json

Одговор:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.sh

=== Form-дата

Послат `POST`-захтев:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Подаци:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req

Враћа се:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req.sh

:::
::::

### Долазнo

:::: details

::: tabs key:cti

=== JSON

Подаци:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.json

Одговор:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.sh

=== Form-дата

Подаци:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req

Одговор:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Пример цУРЛ команде:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req.sh

:::
::::
