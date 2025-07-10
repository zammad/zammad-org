---
order: 5
title: 'Use Mobile View'
---

# Use Mobile View

## Intro

The development of a dedicated mobile view for Zammad was driven by the
increasing need for access while on the move.  The desktop application
offers responsive functionality for smaller screens, but it was determined
to be too complex for optimal mobile use. This mobile view focuses on
presenting the most critical information in a touch-friendly and modern
design, prioritizing a streamlined user experience.

::: info
We intentionally do not provide specific instructions and comprehensive documentation for the mobile view! The overall
UX should be intuitive and self-explanatory in most cases.
:::

You can find screenshots below to get an impression how the mobile view
looks like.

::: tabs

=== Login & Home

| Login | Home |
|:-------------------------:|:-------------------------:|
|![Screenshot shows login screen of Zammad's mobile view](/screenshots/mobile-view/login.png) | ![Screenshot shows home screen of Zammad's mobile view](/screenshots/mobile-view/home.png) |

=== Search & Overview

| Search | Overview |
|:-------------------------:|:-------------------------:|
|![Screenshot shows search screen of Zammad's mobile view](/screenshots/mobile-view/search.png) | ![Screenshot shows overview screen of Zammad's mobile view](/screenshots/mobile-view/overview.png) |

=== Ticket Details

| Articles | Details |
|:-------------------------:|:-------------------------:|
|![Screenshot shows ticket screen of Zammad's mobile view](/screenshots/mobile-view/ticket-articles.png) | ![Screenshot shows ticket detail view of Zammad's mobile view](/screenshots/mobile-view/ticket-details.png) |

=== Notifications & Account

| Notifications | Account |
|:-------------------------:|:-------------------------:|
|![Screenshot shows notifications screen of Zammad's mobile view](/screenshots/mobile-view/notifications.png) | ![Screenshot shows account settings screen of Zammad's mobile view](/screenshots/mobile-view/profile.png) |

:::

## Функције

Мобилни приказ вам пружа начин да обављате уобичајене дневне Zammad задатке
док сте у покрету:

- Управљајте и користите прегледе тикета
- Потражите постојеће уносе
- Отворите нови тикет
- Reply in an already existing ticket
- Modify ticket attributes
- Измените атрибуте клијента
- Modify organization attributes

## Ограничења

Мобилном приказу такође тренутно недостају неке функције које пружа основни
приказ:

- Time accounting
- Раздели чланак
- Link tickets and see linked tickets
- Execution of macros
- Историјат тикета
- Template creation & shared drafts

Додатно, одређене функције су намерно изостављене да би се побољшао фокус на
важне информације:

- Most management features (except ticket user and organization management)
- Most knowledge base features (except ticket integration)
- Most user profile functions (except avatar and language preferences)
- Извештаји
- Caller log
- Live chat

## Switch the Views

Zammad implements a mobile device detection, which results in automatic
redirection to mobile view. Even with this mechanism in place, it's possible
to explicitly switch between the views by using app links.

In both desktop and mobile view login screens, you can find a link below the
**Sign in** button to explicitly switch to the other view (see login
screenshot from above as an example).

While you are signed in and want to switch from the mobile to the desktop
view, go to your profile by selecting your avatar at the bottom and select
**Continue to desktop** (see account screenshot from above as an
example). The other way round is similar: in the avatar menu, you can find
an entry to switch to the mobile view.
