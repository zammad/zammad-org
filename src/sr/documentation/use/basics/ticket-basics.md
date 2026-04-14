---
order: 2
title: 'Основе тикета'
---

# Основе тикета

New to ticket systems? Then read on about the basics. This helps you to
understand the main concepts and to get started with Zammad. If you are
already familiar with ticket systems, you can jump directly to the next
pages about finding, creating and working with tickets.

## Увод

In Zammad, **tickets** are used to track customer service requests. The
first time a customer contacts you about something, Zammad creates a new
ticket. Each message sent between you and the customer is added to that
ticket until the issue is resolved, the customer is happy and the ticket is
finally closed. Such a single message in a ticket is called an
**article**. Basically, you can think of a **ticket** as a **conversation**
between you and a customer about a single issue.

Уколико сте потпуно нови у водама тикетинг система и до сада сте решавали
захтеве клијента уз помоћ имејл клијента, можете помислити да је тикет
систем компликован. Али супротно је тачно:

- Све имејл поруке се сада сливају у Zammad (као и остали захтеви са других
  канала).
- Ви и ваше колеге можете видети ко обрађује који захтев клијента („тикет”).
- Стање сваког захтева као и историјат (ко је урадио шта?) је транспарентно.
- Нема дуплиране обраде и ништа се не превиђа.
- Можете питати колеге за помоћ око компликованих случајева директно у
  тикету.
- За Zammad-овим иновативним корисничким интерфејсом, можете се усредсредити
  на оно најбитније: да решите проблеме клијената и одговорите на њихова
  питања.

Ово значи да можете наставити рад са Zammad-ом на сличан начин као у вашем
имејл клијенту. Осим што тикет има додатне атрибуте. Читајте даље да сазнате
више.

## Атрибути тикета

Поред чланака, тикети поседују и неке додатне мета податке који се зову
атрибути. Користите **бочну траку тикета** за преглед и измену атрибута
тикета.

![Screenshot shows ticket
sidebar](/screenshots/cypress/usage-basics.cy.js/ticket-sidebar.png)

To hide the sidebar, click the collapse button with the arrow on the left
side of the sidebar. Click on one of the tabs to bring it back. The
available options depend on your privileges and the configuration of your
system.

It is even possible to create custom fields for tickets (for groups, users
and organizations too). You think such a custom field makes sense? Talk with
your Zammad admin, it can be set up easily.

### Стање

Стање одражава тренутни статус тикета (углавном да ли је клијентов захтев
решен или не). Можете га сматрати репрезентацијом прогреса на путу
решења. Подразумевано, доступна су следећа стања:

- **New**: State for new tickets on which no one has worked on. When
  updating a ticket for the first time, it automatically switches to open.
- **Отворено**: Стање за тикете који још нису решени и захтевају обраду.
- **Pending Close**: State for tickets which are basically resolved but you
  don't want to close immediately. This state requires you to enter a date
  and time at which the ticket automatically switches to closed.
- **Pending Reminder**: State for open tickets which you want to get
  reminded about at a certain date and time. Requires you to enter a date
  and time at which you want to get notified. For example useful if you had
  a question to a third party and want to make sure that this issue won't be
  forgotten.
- **Merged**: State for a ticket which was merged into another ticket. Check
  the [linked tickets](/en/documentation/use/advanced-features#link-tickets)
  to see the related ticket.

Zammad's ticket states are color coded. This helps you to understanding the
state of the ticket much faster in general - without having a look into
details.

![Screenshot shows different color-coded
states](/screenshots/overviews/states.png)

### Приоритет

Приоритет тикета је једноставно рангирање (од 1 до 3) колико је хитан или
важан. Три подразумевана приоритета су:

- 1 low
- 2 нормалан
- 3 висок

In case these priorities aren't enough, ask your Zammad admin to create
additional ones. The default priorities allow you to immediately recognize
the importance of your tickets because they are color coded:

![Screenshot shows different color-coded
priorities](/screenshots/overviews/priorities.png)

Можта се питате чему служи приоритет тикета. Сам по себи, заправо ништа не
чини осим наглашавања. Међутим, Zammad администратори могу да подесе разне
врсте аутоматизаиција и статистика на основу приоритета.

Be aware that customers can't set a priority for their own
tickets. Otherwise, some might set their tickets always to high and hope for
an immediate escalation.

### Ознаке

Tags are custom labels that can be assigned to tickets to make it easier to
find them in the future.  They can be used in conditions like in triggers
and in overviews and they can also be assigned automatically by macros,
schedulers and triggers. Of course you can search for the text of the tags
and you will find the tickets which have the tag assigned.

![Снимак екрана приказује одељак ознака у траци тикета са
стране](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

In the ticket sidebar, you can find a section which is labeled as
**Tags**. Add a tag by clicking on the ::+:: button.  Depending on your
Zammad's configuration, you can create new tags by simply type and confirm
them with [[enter]] or [[tab]]. In any case, you can choose from already
available tags. Start typing and you see a list with matching
suggestions. To remove it, click the ::X:: button on the right side of the
tab.

### Група

Овај атрибут тикета је користан за организација са више од једног
тима. Стандардан начин за коришћење група је да имате по једну за свако
одељење ваше фирме. У зависности од дозвола, можда нећете видети тикет након
промене групе и снимања измена. У случају да не видите поље групе, или
постој исамо једна у вашем Zammad систему или немате дозволу за отварање
тикета у другим групама.

### Власник

This is the person who is currently responsible for the ticket. In case you
need information from another colleague, you can either change the owner to
this person or mention the person in an article by typing [[@]][[@]] and
selecting the user. In the latter case, the user gets notified and is
automatically subscribed to receive notifications on ticket updates.

За промену власника на особу која има приступ само некој другој групи
тикета, морате прво променити групу.

-----

Now that you know the basics, head over to one of the following pages:

- [Find Tickets](/en/documentation/use/basics/find-tickets)
- [Create tickets](/en/documentation/use/basics/create-tickets)
- [Work with tickets](/en/documentation/use/basics/work-with-tickets)
