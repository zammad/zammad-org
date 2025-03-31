---
order: 2
title: 'Mit Zammad starten'
---

# Mit Zammad starten

## Benutzeroberfläche

### Allgemein

Die Benutzeroberfläche (User Interface, UI) von Zammad ist so konzipiert,
dass Benutzer sie intuitiv nutzen können. Sie ist nach den Prinzipien
Einfachheit, Klarheit und Zugänglichkeit aufgebaut.

There are basic modular components for different features to keep the UI
consistent. These components are described in the section [Main UI
Elements](#main-ui-elements) as well as [Navigating](#navigating) below.

Abhängig von der aktuell geöffneten Ansicht gibt es interaktive Komponenten
wie Tooltips und eine kontextbezogene Hilfe. Verwenden Sie diese bei Bedarf.

In jedem Fall basiert die Benutzeroberfläche auf gängigen
Software-Design-Prinzipien und ist weitgehend selbsterklärend.

### Haupt UI-Elemente

![Screenshot zeigt eine
Ticket-Detailansicht](/screenshots/cypress/zammad-ui.cy.js/zammad-ui-full.png)

Der Screenshot oben zeigt eine Ticket-Detailansicht in Zammad. Lesen Sie
weiter, um eine Beschreibung der verschiedenen Elemente von Zammad zu
erhalten.

Navigation sidebar
: This is the left sidebar which includes the search, notifications, overviews, ticket tabs, your avatar and the ticket
  create button.

Navigation tab
: Each item of the navigation sidebar is called navigation tab. Depending on the content, it can be a ticket tab (with
  the ticket detail view) or the overview tab which opens the list of available overviews.

Ticket detail view
: This is where you handle your customer requests. It is located in the middle of the screen if a ticket tab is
  selected in the navigation sidebar.

Sidebar
: This is the right sidebar in the ticket detail view. It contains sidebar tabs like customers and checklists and
  displays the currently selected tab.

Sidebar tabs
: On the right side of the sidebar, you can find small icons to switch between the different tabs. The availability of
  these tabs depends on your system configuration, your permissions and the ticket attributes (e.g. if the ticket
  customer has an assigned organization).

Active sidebar
: The selected sidebar tab. Displays the content of the tab. It can show things like customer sidebar, organization
  sidebar, checklist sidebar and more.

### Navigieren

The navigation sidebar is your central place to access all main parts of
Zammad. It includes:

- Suchleiste
- Benachrichtigungen
- Übersichten
- Chat (falls aktiviert)
- Telefon (falls aktiviert)
- Ticket Tabs
- Avatar mit Menü
- Einstellungen (wenn Sie die entsprechenden Rechte haben)
- Ticket erstellen Schaltfläche

Die Hauptnavigation in Zammad findet in dieser Seitenleiste statt. Sie ist
immer sichtbar und Sie können z.B. zwischen Ticket, Übersichten und der
Suche wechseln.

Zammad speichert Ihren aktuellen Arbeitsfortschritt sofort, so dass Sie
leicht zwischen den verschiedenen Bereichen von Zammad wechseln können und
keine Angst haben müssen, Daten zu verlieren, z.B. eine noch nicht
abgeschickte Antwort in einem Ticket.

## Tickets finden

Es gibt verschiedene Möglichkeiten, Tickets zu finden, abhängig vom
Anwendungsfall.

### Über Übersichten

If you search for new tickets to work on, your first look should be in the
overview section. You can either open it by clicking the **Overviews**
button in the navigation bar or use the keyboard shortcut [[o]]. You can see
overviews as a kind of ticket lists.

By default, there are some built in overviews, you can use. For example,
there is an overview called "Open Tickets".  This might be a good starting
point. Your Zammad admin may have created additional overviews. These are
based on conditions, which are basically rules, to define which ticket
appears in which overview.

Eine detaillierte Erklärung finden Sie in der [Beschreibung der
Übersichten](/de/documentation/use/guides/overviews).

### Über die Suche

Wenn Sie jedoch ein bestimmtes Ticket suchen, das in den Übersichten
sichtbar sein könnte oder auch nicht, sollten Sie die Suche verwenden. Sie
finden diese in der linken oberen Ecke der Navigationsleiste. Wählen Sie sie
entweder mit der Maus aus oder benutzen Sie das Tastaturkürzel [[s]].

Nachdem Sie das Suchfeld aktiviert haben, können Sie Ihre zuletzt
angesehenen Elemente sowie Ihre letzten Suchanfragen sehen.

Wenn Sie einen Suchbegriff eingeben, sehen Sie sofort eine Vorschau der
Suchergebnisse. Wenn Sie [[Enter]] drücken oder auf `Erweiterte Suche`
klicken, zeigt Zammad eine Seite mit Suchergebnissen an. Dort können Sie die
Suche basierend auf dem Objekttyp (z.B. Benutzer) durchführen.

Weitere Einzelheiten finden Sie in den [Details zur Suche](guides/search).

### Benachrichtigungen

Abhängig von den
[Benachrichtigungseinstellungen](/de/documentation/use/manage-profile#benachrichtigungen)
in Ihrem Profil erhalten Sie Aktualisierungen für verschiedene
ticketbasierte Ereignisse wie die Erstellung oder die Aktualisierung eines
Tickets. So wird sichergestellt, dass keine wichtige Änderung an einem
Ticket übersehen wird.

Sie können sie öffnen, indem Sie auf den Benachrichtigungszähler in der
oberen linken Ecke klicken. Wenn ein Label mit einem Zähler vorhanden ist,
zeigt der Zähler die Anzahl der ungelesenen Benachrichtigungen an.

Standardmäßig werden Sie benachrichtigt, wenn eines Ihrer Tickets (das
heißt, Sie sind der Besitzer) aktualisiert wurde. Wenn Sie auf den Link in
der Benachrichtigung klicken, wird dieses Ticket in der
Navigations-Seitenleiste als Tab geöffnet und die Ticket-Detailansicht wird
angezeigt.

## Ticket-Grundlagen

### Einführung

Wenn Sie ganz neu in Ticket-Systemen sind und Ihre Kundenanfragen bisher mit
einem E-Mail-Client bearbeitet haben, denken Sie vielleicht, dass ein
Ticket-System kompliziert ist. Aber das Gegenteil ist der Fall:

- Alle E-Mails werden nun in Zammad gesammelt (und Anfragen aus anderen
  Kanälen möglicherweise auch).
- Sie und Ihre Kollegen können sehen, wer an welcher Kundenanfrage
  ("Ticket") arbeitet.
- Der Status jeder Anfrage sowie die Historie (wer hat was getan?) sind
  transparent.
- Es gibt keine doppelte Arbeit und nichts wird übersehen.
- In schwierigen Fällen können Sie Ihre Kollegen direkt im Ticket um Hilfe
  bitten.
- Mit der intuitiven Benutzeroberfläche von Zammad können Sie sich auf das
  Wesentliche konzentrieren: die Lösung von Kundenproblemen und die
  Beantwortung von Kundenfragen.

Im Grunde können Sie mit Zammad also ähnlich wie mit Ihrem E-Mail Client
arbeiten. Sie haben jedoch einige zusätzliche Attribute, die Sie im
Seitenleisten-Tab _Ticket_ einstellen können:

- **Status**: spiegelt den aktuellen Status eines Tickets wider
  (hauptsächlich, ob eine Kundenanfrage gelöst ist oder
  nicht). Standardmäßig gibt es die folgenden Status:
  - **New**: State for new tickets on which no one has worked on. When
    updating a ticket the first time, it automatically switches to _open_.
  - **Offen**: Status für Tickets, die noch nicht gelöst sind und an denen
    noch gearbeitet werden muss.
  - **Pending Close**: State for tickets which are basically resolved but
    you don't want to close immediately. This state requires you to enter a
    date and time at which the ticket automatically switches to _closed_.
  - **Warten auf Erinnerung**: Status für offene Tickets, an die Sie zu
    einem bestimmten Datum und einer bestimmten Uhrzeit erinnert werden
    möchten. Hier müssen Sie ein Datum und eine Uhrzeit eingeben, zu der Sie
    benachrichtigt werden möchten. Dies ist z.B. nützlich, wenn Sie eine
    Frage an einen Dritten hatten und sicherstellen möchten, dass dieses
    Problem nicht vergessen wird.
- **Owner**: This is the person who is currently responsible for the
  ticket. In case you need to have an information from another colleague,
  you can either change to owner to this person or mention the person in an
  article by typing `@@` and selecting the user. In the later case, the user
  gets notified and is automatically subscribed to receive notifications on
  ticket updates.
- **Gruppe**: Dieses Ticket-Attribut ist nützlich für Organisationen mit
  mehr als einem Team. Abhängig von den Berechtigungen sehen Sie das Ticket
  möglicherweise nicht, nachdem Sie die Gruppe geändert und die Änderungen
  gespeichert haben.

### Ticket Detailansicht

Da Sie nun über einige Attribute Bescheid wissen, lassen Sie uns einen Blick
auf die Ticket Detailansicht werfen.

Die Ticket Detailansicht liefert alle relevanten Informationen zu einem
Ticket. Als Hauptbestandteil werden hier alle Artikel des Tickets
angezeigt. Der älteste Artikel (der das Ticket erstellt hat) ganz oben, der
neueste ganz unten. Je nach Art des Artikels bietet Ihnen Zammad
verschiedene Reaktionsmöglichkeiten an. Bei Artikeln, die auf
Textkommunikation basieren, können Sie direkt eine Antwort erstellen, indem
Sie den **Antworten**-Button unter dem Artikel verwenden oder die
**Weiterleiten**-Funktion nutzen.

Regardless of the customer's article type, you can always add internal
notes. These are useful to add information to the ticket or ask a colleague.

### Aktualisierung Ihres Tickets

Nachdem Sie Ihre Änderungen vorgenommen haben, z.B. eine Antwort an einen
Kunden geschrieben und den Status des Tickets geändert haben, sehen Sie in
der rechten Fußzeile eine hervorgehobene Schaltfläche
**Aktualisieren**. Wenn Sie auf diese Schaltfläche klicken, werden Ihre
Änderungen übernommen, und wenn Sie eine Antwort erstellt haben, wird diese
nun an den Kunden gesendet. Wenn Sie das Problem als gelöst betrachten,
sollten Sie den Status auf _geschlossen_ setzen.

## Abschluss

This was a brief introduction about how to work with Zammad if you are
completely new to ticket systems. Knowing the basics of Zammad now, you can
either start working or have a look at the [advanced features
section](advanced-features)  to become even more productive and use the full
potential of Zammad. 🚀
