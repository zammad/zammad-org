---
order: 5
title: Mobilansicht
---

# Mobilansicht

## Einführung

Die Entwicklung einer eigenen Mobilansicht für Zammad wurde durch den immer
größer werdenden Bedarf des Zugriffs von unterwegs getrieben. Die
Desktop-Anwendung bietet zwar responsive Funktionen für kleinere
Bildschirme, wurde jedoch für eine optimale Nutzung auf Mobilgeräten als zu
komplex eingestuft. Die Mobilansicht konzentriert sich darauf, die
wichtigsten Informationen in einem auf Touchscreens optimierten und modernen
Design zu präsentieren, bei dem die Benutzererfahrung im Vordergrund steht.

::: info
Wir stellen bewusst keine ausführliche Dokumentation für die Mobilansicht zur Verfügung. Das Layout und die Funktionen sollten
intuitiv und selbsterklärend sein.
:::

Sie finden unten Screenshots, um einen Eindruck davon zu bekommen, wie die
Mobilansicht aussieht.

::: tabs

=== Login & Start

| Login | Start |
|:-------------------------:|:-------------------------:|
| ![Screenshot zeigt die Login-Ansicht von Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/login.png) | ![Screenshot zeigt den Startbildschirm von Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/home.png) |

=== Suche & Übersichten

| Suche | Übersichten |
|:-------------------------:|:-------------------------:|
| ![Screenshot zeigt Suchansicht von Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/search.png) | ![Screenshot zeigt Übersichten in Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/overview.png) |

=== Ticket-Details

| Artikel | Details |
|:-------------------------:|:-------------------------:|
| ![Screenshot zeigt Ticketansicht in Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/ticket-articles.png) | ![Screenshot zeigt Ticket-Details in Zammad Mobilansicht](/screenshots/documentation/use/mobile-view/ticket-details.png) |

=== Benachrichtigungen & Konto

| Benachrichtigungen | Konto |
|:-------------------------:|:-------------------------:|
| ![Screenshot zeigt Benachrichtigungen in Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/notifications.png) | ![Screenshot zeigt Kontoeinstellungen in Zammads Mobilansicht](/screenshots/documentation/use/mobile-view/profile.png) |

:::

## Features

Die Mobilansicht bietet Ihnen die Möglichkeit, Ihre täglichen Aufgaben mit
Zammad auch unterwegs zu erledigen:

- Verwalten und nutzen Sie Ihre Ticket-Übersichten
- Suche nach vorhandenen Datensätzen
- Erstellen eines neuen Tickets
- Antworten in einem existierenden Ticket
- Ändern von Ticketattributen
- Ändern von Kundenattributen
- Ändern von Organisations-Attributen
- Zeiterfassung für Ticket-Artikel

## Einschränkungen

Der mobilen Ansicht fehlen aktuell Features, die in der Desktop-Oberfläche
vorhanden sind:

- Artikel abspalten
- Tickets verknüpfen und verknüpfte Tickets anzeigen
- Ausführung von Makros
- Ticket-Historie
- Artikel-Übersetzung
- Erstellung von Vorlagen und gemeinsamen Entwürfen

Außerdem wurden bestimmte Features weggelassen, um Ihren Fokus auf die
wichtigsten Informationen zu richten:

- Die meisten Verwaltungs-Funktionen (außer Benutzer- und
  Organisations-Verwaltung)
- Ein Großteil der Knowledge Base Features (außer Ticketintegration)
- Most account functions (except avatar and language preferences)
- Berichte
- Anrufprotokoll
- Live-Chat

## Ansichten wechseln

Zammad prüft, ob es sich um ein Mobilgerät handelt und leitet automatisch
auf die Mobilansicht um. Sie können allerdings weiterhin manuell zwischen
den Ansichten wechseln, indem Sie die entsprechenden Links aufrufen.

Sowohl in der Desktop- als auch in der Mobilansicht finden Sie unter der
Schaltfläche `Anmelden` einen Link, über den Sie explizit in die andere
Ansicht wechseln können (siehe Login-Screenshot von oben als Beispiel).

While you are signed in and want to switch from the mobile to the desktop
view, go to your account by selecting your avatar at the bottom and select
**Continue to desktop** (see account screenshot from above as an
example). The other way round is similar: in the avatar menu, you can find
an entry to switch to the mobile view.
