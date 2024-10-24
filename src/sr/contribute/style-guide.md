# Водич кроз стил и садржај

Овај водич вам пружа преглед садржаја Zammad документације, као и упутства
за форматирање текста ради јасноће и читљивости.

Уколико имате додатних питања, слободно се обратите нашој онлајн
заједници. Ако желите да учествујете, консултујте нашу документацију за прве
кораке.

## Претпоставке о публици и садржај

Документација је написана у стилу који подразумева да наши **корисници**
поседују основно знање о употреби претраживача и концептима софтверског
дизајна.

**Zammad администратор** треба додатно да поседује основно разумевање радних
токова и процеса комуникације у својој фирми.

За инстанце које сами хостују, **администратори система** такође треба да
буду упознати са основама администрације Linux система.

## Стил

Амерички енглески је изворни језик документације. Преводи се врше преко
Weblate апликације, погледајте одељак о преводима за више информација.

* Користите кратке и јасне реченице, дајући предност информацијама у односу
  на сложеност
* Све речи у наслову и одељцима (осим мањих) започните великим словом
(погледајте [правила о насловима](https://en.wikipedia.org/wiki/Title_case))
* Уколико је могуће, немојте прекорачивати дужину линије од 80 карактера
у изворној датотеци
* Одвајате правилно путање и локације са `>`
* Користите истицање кода да бисте нагласили исечке текста који садрже инструкције
* Убаците снимке екрана када је потребно
* Дајте упутства корак-по-корак са јасним објашњењима
* Користите примере или сценарије да илуструјете концепте
* Укључите релевантне слике или дијаграме када је потребно
* Скраћенице треба објаснити први пут када се користе или укључују
у речнику и повезати их
* Ако сте у недоумици, ускладите се са постојећом документацијом


## Форматирање текста

| Тип у Zammad-у  | Истицање                      | Markdown синтакса               |
|-----------------|-------------------------------|---------------------------------|
| Дугмићи         | ``Пријава``                   | \`\`Пријава\`\`                 |
| Поља            | **Назив**                     | \*\*Назив\*\*                   |
| Путања/локације | *Подешавања > Канали > Имејл* | \*Подешавања > Канали > Имејл\* |


## Структура наслова

Свака страна документације треба да поседује наслов највишег нивоа (#). Нижи
нивои треба да садрже најмање два одељка. Уколико постоји само један одељак,
размотрите да га припојите садржају вишег нивоа.

Пример:

`# Наслов стране`

`## Одељак 1`

`### Одељак 1.1`

`### Одељак 1.2`

`## Одељак 2`

