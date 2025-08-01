---
order: 10
title: FAQ
---

# FAQ

## Уопштено

::: details How to find tickets?
У зависности од ваше ситуације, Zammad омогућава пуно начина за претрагу и приступ тикетима.

Уколико **тражите одрељен тикет или садржај**, претрага је најбољи начин. Можете пронаћи поље претраге при врху
бочне траке навигације или га активирајте пречицом [[s]] на тастатури. Претража вам чак приказује и ваше
последње виђене ставке, можда можете пронаћи шта тражите већ ту. Постоји посебна
[страна претраге](./guides/search) са више информација.

Уколико желите да **почнете да радите на тикетима**, погледајте [прегледе](./guides/overviews), који су једноставно
листе актуелних тикета. Ови прегледи вас стављају у позицију одакле можете лако направити разлику између
онога шта треба да се започне, шта је у процесу и на шта се тренутно чека. У случају да имате проблеме са овим ппрегледима
ваш Zammad администратор вам може помоћи.
:::

::: details How to get notified for ticket changes?
Подесите [подешавања обавештења у вашим личним подешавањима](manage-profile#обавештења). Моћете направите разлику између
радње (нпр. отварање тикета), канала обавештења (имејл и/или претраживач), ваш однос према тикету (нпр. да ли
сте његов власник) и ограничивање обавештења на одговорајућу групу.
:::

::: details Why is the ticket open again? I closed it already!
У зависности од подешавања ваше Zammad инстанце, узрок се може разликовати. Али обично је разлог што је клијент
одговорио на тикет накош што је био затворен. Још један резлог може бити то што га је колега поново отворио. Уколико не
видите чланак који објашњава ситуацију, погледајте у историјат тикета за више информација. Исти се може
отворити преко ::a:: менија у бочној траци тикета и одабиром радње **Историјат**.

Ваш Zammad администратор може подесити шта се тачно дешава када клијент одговори на затворени тикет.
:::

:::: details What does the customer see in the ticket?
By default, customers only have a reduced interface. They can create tickets, view their own tickets (and maybe their
colleague's too, depending on the setting) and access their profile settings. Even the ticket detail view only includes
relevant elements for the customer. Elements, which have an internal purpose (like group, priority, internal notes, are
not visible to the customer.

::: warning
The explanation above is based on the default Zammad settings. Be aware that the configuration of your system might be
different. If in doubt, you should ask your admin.
:::
::::

::: details I can't log in. What can I do?

- Forgot your password? Try resetting it in the login screen under the **Forgot password?** link by providing your email
  address.
- Lost the possibility to provide your 2nd factor for 2-factor-authentication (2FA)? Use a recovery code and set up a
  new 2FA method. See [2FA page](./guides/two-factor-auth) for more information.
- Lost your 2FA recovery codes? Get in touch with your Zammad admin. This also applies if your problem is not mentioned
  here.
:::

::: details How can I use keyboard shortcuts? I want to be more productive.
Just use them! You can find an overview of the available shortcuts by pressing [[?]] on your keyboard or open the
overview from the avatar menu (click on your avatar in the bottom left corner and select **Keyboard shortcuts**).

Some of them depend on the location you are or action you perform (e.g. being in the editor or in the ticket
detail view).
:::

::: details How to switch between dark and light mode for the user interface?
You can switch between light, dark and automatic mode (tries to adapt to your browser) in the avatar menu. Open it
by clicking your avatar in the bottom left corner and switch the toggle to the desired state.

Another possibility is to use the keyboard shortcut [[d]]. If no input field is activated, pressing it cycles between
the different modes.
:::

## Кориснички профил

::: details How to change my profile/avatar image?
Go to the [avatar section in you profile settings](manage-profile#avatar) by opening the avatar menu in the bottom
left corner and select **Profile settings**. There you can upload an image, capture a photo (if your device has a
camera) or delete already present images.
:::

::: details I want to change the language of the Zammad user interface. How can I do that?
Go to the language section in you profile settings by opening the avatar menu in the bottom left corner and select
**Profile settings**.
:::

::: details What should I do before going on vacation?
Go to the [out of office section](manage-profile#out-of-office) in you profile settings by opening the avatar menu in
the bottom left corner and select **Profile settings**. There you can define a replacement agent.
:::

::: details Can I adjust the order of the overviews?
Yes! Read on in [our Overviews guide](guides/overviews#reorder-overviews).
:::

## Рад на тикетима

::: details How to assign somebody to a ticket?
In the ticket sidebar tab, you can find an **Owner** field. Choose from the offered agents and make sure to leave an
internal note so the other agent knows what it is about.

If you only have a question or need some information, you could also just
[mention a colleague](advanced-features#mention-a-colleague) in an article by using [[@]][[@]] and raise your question.
:::

::: details How to delete a ticket?
First of all, tickets can't be deleted by agents. This is done for the reason of transparency and to prevent deletion
by accident and arbitrary deletion.

However, if customers want their data to be deleted (e.g. due to a GDPR deletion request), this can be done in Zammad.
Contact your Zammad admin and ask to execute the deletion job.
:::

::: details How to use text templates?
Use Zammad's [text modules](advanced-features#text-modules) by typing [[:]][[:]] in the article editor or choose it
from the editor toolbar. If you need to have additional modules, ask your Zammad admin to add it for you.
:::

::: details How to ask a colleague for help in the ticket?
The best way to do this is to [mention a colleague](advanced-features#mention-a-colleague) in an article by using
[[@]][[@]] and raise your question. This triggers a notification for your colleague. Depending on your internal
processes, switching the owner of the ticket could also be a possible option.
:::

::: details How to cite the customer's email or parts of it?
To partially or selective cite the article or parts of it, mark the text, you want to cite, and click on the `Reply`
button next to the article. This can be done even multiple times (e.g. to answer different parts of the ticket).

The citation of the whole article depends on how your Zammad is configured. If you want to apply changes to this
behavior, ask your admin to change it.
:::
