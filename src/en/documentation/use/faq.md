---
order: 10
title: FAQs
outline:
  - 2
  - 2
---

# FAQs

[[TOC]]

## General

### How to find tickets?

It depends on your use case. Zammad offers many possibilities to search and access tickets.

If you **search for a specific ticket or content**, the search is the best way. You can find the search field in the top
area of the navigation sidebar or activate it by using the keyboard shortcut [[s]]. The search even shows the tickets
you recently closed from your taskbar, maybe you can already find what you are searching for there. There is a separate
[search page](./guides/search) for more information.

If you want to **start working on tickets**, take a look at [the overviews](./guides/overviews), which are basically a
list of current tickets. These overviews should put you in a position where you can easily distinguish between what
needs to be done, what is in progress and what is currently on hold. In case you face issues with these overviews,
your Zammad admin should be able to help.

### How to get notified for ticket changes?

Adjust the [notification settings in your profile](user-profile#notifications). You can distinguish between the
action (e.g. ticket creation), the notification channel (email and/or browser), your relation to the ticket (e.g. if
you are the owner) and limit the notifications to a specific group.

### Why is the ticket open again? I closed it already

Depending on the settings of your Zammad instance, the reasons can differ. But usually the reason is that a customer
replied to the ticket after it was set to closed. Another reason could be that a colleague re-opened it. If you can't
see an article which fits to the description, you can take a look at the ticket history to find out more. Do so by
opening the ::a:: menu in the ticket sidebar tab and select **History**.

Your Zammad admin can adjust what should happen when a customer replies after a ticket got closed.

### What does the customer see in the ticket?

By default, customers only have a reduced interface. They can create tickets, view their own tickets (and maybe their
colleague's too, depending on the setting) and access their profile settings. Even the ticket detail view only includes
relevant elements for the customer. Elements, which have an internal purpose (like group, priority, internal notes, are
not visible to the customer.

::: warning
The explanation above is based on the default Zammad settings. Be aware that the configuration of your system might be
different. If in doubt, you should ask your admin.
:::

### I can't log in. What can I do?

- Forgot your password? Try resetting it in the login screen under the **Forgot password?** link by providing your email
  address.
- Lost the possibility to provide your 2nd factor for 2-factor-authentication (2FA)? Use a recovery code and set up a
  new 2FA method. See [2FA page](./guides/two-factor-auth) for more information.
- Lost your 2FA recovery codes? Get in touch with your Zammad admin. This also applies if your problem is not mentioned
  here.

### How can I use keyboard shortcuts?

Just use them! You can find an overview of the available shortcuts by pressing [[?]] on your keyboard or open the
overview from the avatar menu (click on your avatar in the bottom left corner and select **Keyboard shortcuts**).

Some of them depend on the location you are or action you perform (e.g. being in the editor or in the ticket
detail view).

### How to switch between dark and light mode for the user interface?

You can switch between light, dark and automatic mode (tries to adapt to your browser) in the avatar menu. Open it
by clicking your avatar in the bottom left corner and switch the toggle to the desired state.

Another possibility is to use the keyboard shortcut [[d]]. If no input field is activated, pressing it cycles between
the different modes.

## User Profile

### How to change my profile/avatar image?

Go to the [avatar section in you profile settings](user-profile#avatar) by opening the avatar menu in the bottom
left corner and select **Profile settings**. There you can upload an image, capture a photo (if your device has a
camera) or delete already present images.

### How to change the language of the Zammad user interface?

Go to the language section in you profile settings by opening the avatar menu in the bottom left corner and select
**Profile settings**.

### What should I do before going on vacation?

Go to the [out of office section](user-profile#out-of-office) in you profile settings by opening the avatar menu in
the bottom left corner and select **Profile settings**. There you can define a replacement agent.

### How to adjust the order of the overviews?

Read on in the [overview guide](guides/overviews#reorder-overviews).

## Work on Tickets

### How to assign somebody to a ticket?

In the ticket sidebar tab, you can find an **Owner** field. Choose from the offered agents and make sure to leave an
internal note so the other agent knows what it is about.

If you only have a question or need some information, you could also just
[mention a colleague](advanced-features#mention-a-colleague) in an article by using [[@]][[@]] and raise your question.

### How to delete a ticket?

First of all, tickets can't be deleted by agents. This is done for the reason of transparency and to prevent deletion
by accident and arbitrary deletion.

However, if customers want their data to be deleted (e.g. due to a GDPR deletion request), this can be done in Zammad.
Contact your Zammad admin and ask to execute the deletion job.

### How to use text templates?

Use Zammad's [text modules](advanced-features#text-modules) by typing [[:]][[:]] in the article editor or choose it
from the editor toolbar. If you need to have additional modules, ask your Zammad admin to add it for you.

### How to ask a colleague for help in the ticket?

The best way to do this is to [mention a colleague](advanced-features#mention-a-colleague) in an article by using
[[@]][[@]] and raise your question. This triggers a notification for your colleague. Depending on your internal
processes, switching the owner of the ticket could also be a possible option.

### How to cite the customer's email or parts of it?

To partially or selective cite the article or parts of it, mark the text, you want to cite, and click on the `Reply`
button next to the article. This can be done even multiple times (e.g. to answer different parts of the ticket).

The citation of the whole article depends on how your Zammad is configured. If you want to apply changes to this
behavior, ask your admin to change it.
