---
order: 5
title: 'Mobilansicht verwenden'
---

# Mobilansicht verwenden

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
|![Screenshot zeigt die Login-Ansicht von Zammads Mobilansicht](/screenshots/mobile-view/login.png) | ![Screenshot zeigt den Startbildschirm von Zammads Mobilansicht](/screenshots/mobile-view/home.png) |

=== Suche & Übersichten

| Suche | Übersichten |
|:-------------------------:|:-------------------------:|
|![Screenshot zeigt Suchansicht von Zammads Mobilansicht](/screenshots/mobile-view/search.png) | ![Screenshot zeigt Übersichten in Zammads Mobilansicht](/screenshots/mobile-view/overview.png) |

=== Ticket-Details

| Artikel | Details |
|:-------------------------:|:-------------------------:|
|![Screenshot zeigt Ticketansicht in Zammads Mobilansicht](/screenshots/mobile-view/ticket-articles.png) | ![Screenshot zeigt Ticket-Details in Zammad Mobilansicht](/screenshots/mobile-view/ticket-details.png) |

=== Benachrichtigungen & Konto

| Benachrichtigungen | Konto |
|:-------------------------:|:-------------------------:|
|![Screenshot zeigt Benachrichtigungen in Zammads Mobilansicht](/screenshots/mobile-view/notifications.png) | ![Screenshot zeigt Kontoeinstellungen in Zammads Mobilansicht](/screenshots/mobile-view/profile.png) |

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

## Einschränkungen

Der mobilen Ansicht fehlen aktuell Features, die in der Desktop-Oberfläche
vorhanden sind:

- Zeiterfassung
- Artikel abspalten
- Tickets verknüpfen und verknüpfte Tickets anzeigen
- Ausführung von Makros
- Ticket-Historie
- Erstellung von Vorlagen und gemeinsamen Entwürfen

Außerdem wurden bestimmte Features weggelassen, um Ihren Fokus auf die
wichtigsten Informationen zu richten:

- Die meisten Verwaltungs-Funktionen (außer Benutzer- und
  Organisations-Verwaltung)
- Ein Großteil der Knowledge Base Features (außer Ticketintegration)
- Die meisten Profilfunktionen für Benutzer (außer Avatar- und
  Spracheinstellungen)
- Berichte
- Anrufprotokoll
- Live-Chat

## Ansichten wechseln

Zammad prüft, ob es sich um ein Mobilgerät handelt und leitet automatisch
auf die Mobilansicht um. Sie können allerdings weiterhin manuell zwischen
den Ansichten wechseln, indem Sie die entsprechenden Links aufrufen.

Sowohl in der Desktop- als auch in der Mobilansicht finden Sie unter der
Schaltfläche **Anmelden** einen Link, über den Sie explizit in die andere
Ansicht wechseln können (siehe Login-Screenshot von oben als Beispiel).

Wenn Sie angemeldet sind und von der Mobilansicht zur Desktop-Ansicht
wechseln möchten, gehen Sie zu Ihrem Profil, indem Sie unten Ihren Avatar
auswählen und **Weiter mit Desktop** wählen (siehe Screenshot zum Konto oben
als Beispiel). Der umgekehrte Weg ist ähnlich: im Avatar-Menü finden Sie
einen Eintrag, um zur Mobilansicht zu wechseln.
