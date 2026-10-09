---
order: 10
outline:
  - ','
  - ','
title: FAQ
---

# FAQ

,

## Уопштено

### Како пронаћи тикете?

То зависи од вашег случаја употребе. Zammad нуди много могућности за
претрагу тикета и приступ њима.

Уколико **тражите одређен тикет или садржај**, претрага је најбољи
начин. Поље претраге можете пронаћи при врху бочне траке навигације или га
активирајте пречицом [[s]] на тастатури. Претрага вам чак приказује и тикете
које сте недавно затворили из своје радне траке, можда већ тамо можете
пронаћи оно што тражите. Постоји посебна [страна претраге](./guides/search)
са више информација.

Уколико желите да **почнете да радите на тикетима**, погледајте
[прегледе](./guides/overviews), који су у основи листа актуелних тикета. Ови
прегледи треба да вас доведу у позицију у којој лако можете разликовати шта
треба да се уради, шта је у току и шта тренутно чека. У случају да имате
проблема са овим прегледима, ваш Zammad администратор би требало да може да
помогне.

### Како добити обавештења за промене тикета?

Adjust the [notification settings](personal-settings#notifications). You can
distinguish between the action (e.g. ticket creation), the notification
channel (email and/or browser), your relation to the ticket (e.g. if you are
the owner) and limit the notifications to a specific group.

### Зашто је тикет поново отворен? Већ сам га затворио

У зависности од подешавања ваше Zammad инстанце, узрок се може
разликовати. Али обично је разлог што је клијент одговорио на тикет након
што је био затворен. Још један разлог може бити то што га је колега поново
отворио. Уколико не видите чланак који објашњава ситуацију, погледајте у
историјат тикета за више информација. Исти се може отворити преко ::a::
менија у бочној траци тикета и одабиром радње **Историјат**.

Ваш Zammad администратор може да прилагоди шта треба да се деси када клијент
одговори након што је тикет затворен.

### Шта клијент види у тикету?

By default, customers only have a reduced interface. They can create
tickets, view their own tickets (and maybe their colleague's too, depending
on the setting) and access their personal settings. Even the ticket detail
view only includes relevant elements for the customer. Elements, which have
an internal purpose (like group, priority, internal notes, are not visible
to the customer.

::: warning
Објашњење изнад заснива се на подразумеваним Zammad подешавањима. Имајте на уму да подешавање вашег система може бити
другачије. Ако сте у недоумици, требало би да питате свог администратора.
:::

### Не могу да се пријавим. Шта да радим?

- Заборавили сте лозинку? Пробајте да је поништите на екрану за пријаву
  преко линка **Forgot password?** уносом своје имејл адресе.
- Изгубили сте могућност да унесете други фактор за двофакторску
  аутентификацију (2FA)? Употребите код за поврат и подесите нови метод
  двофакторске аутентификације. Погледајте [страну о
  2FA](./guides/two-factor-auth) за више информација.
- Изгубили сте своје кодове за поврат за 2FA? Обратите се свом Zammad
  администратору. Ово важи и ако ваш проблем није поменут овде.

### Како да користим пречице на тастатури?

Just use them! You can find an overview of the available shortcuts by
pressing [[?]] on your keyboard or open the overview from the [avatar
menu](personal-settings#avatar-menu) (click on your avatar in the bottom
left corner and select **Keyboard shortcuts**).

Неки од њих зависе од локације на којој се налазите или радње коју
извршавате (нпр. када сте у едитору или у приказу детаља тикете).

### Како да пребаците корисничко сучеље између тамног и светлог режима?

You can switch between light, dark and automatic mode (tries to adapt to
your browser) in the [avatar menu](personal-settings#avatar-menu). Open it
by clicking your avatar in the bottom left corner and switch the toggle to
the desired state or use the keyboard shortcut [[d]]. If no input field is
activated, it cycles between the different modes.

### How can I read a ticket that is written in another language?

Agents can have the ticket articles translated into a language of their
choice, either per article or automatically for every ticket they open. See
the [article translation guide](./guides/article-translation).

## Personal settings

### How to change my avatar image?

Open the avatar menu in the bottom left corner, select **Personal settings**
and go to the [avatar section](personal-settings#avatar). There you can
upload an image, capture a photo (if your device has a camera) or delete
already present images.

### Како да променим језик корисничког сучеља Zammad-а?

Open the avatar menu in the bottom left corner, select **Personal settings**
and go to the [language section](personal-settings#language).

### Шта треба да урадим пре одласка на одмор?

Open the avatar menu in the bottom left corner, select **Personal settings**
and go to the [out of office
section](personal-settings#out-of-office). There you can define a
replacement agent.

### Како прилагодити редослед прегледа?

Прочитајте даље у [водичу за преглед](guides/overviews#reorder-overviews).

## Рад на тикетима

### Како некоме доделити тикет?

На картици бочне траке тикете можете пронаћи поље **Власник**. Изаберите
између понуђених агената и обавезно оставите интерни коментар како би други
оператер знао о чему се ради.

Ако само имате питање или вам је потребна информација, можете и само
[поменути колегу](advanced-features#mention-a-user) у чланку коришћењем
[[@]][[@]] и поставити своје питање.

### Како да обришем тику?

Пре свега, оператере не могу да обришу тикете. То је због транспарентности и
спречавања случајног или произвољног брисања. Међутим, ако клијенти желе да
им се подаци обришу (нпр. због захтева за брисање према GDPR-у), то се може
учинити у Zammad-у. Контактирајте свог администратора Замма и затражите
извршавање посла брисања.

### Како користити текстуалне исечке?

Користите [текстуалне исечке](advanced-features#text-modules) у Zammad-у
тако што ћете куцати [[:]][[:]] у уређивачу чланка или их изаберите у траци
са алаткама. Ако вам требају додатни исечци, затражите од администратора да
их дода за вас.

### Како да замолим колегу за помоћ у тики?

Најбољи начин је да [поменете колегу](advanced-features#mention-a-user) у
чланку помоћу [[@]][[@]] и поставите питање. То шаље обавештење вашем
колеги. У зависности од ваших интерних процеса, промена власника тикете може
бити такође могућа опција.

### Како да цитирам имејл клијента или њен део?

Да бисте делимично или селективно цитирали чланак или његов део, означите
текст који желите да цитирате и кликните на дугме `Odgovori` поред
чланка. Ово се може учинити више пута (нпр. за одговарање на различите
делове тикете).

Цитирање целог чланка зависи од конфигурације вашег Замма. Ако желите да
промените ово понашање, затражите од администратора да га измени.
