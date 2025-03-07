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

Es gibt grundlegende modulare Komponenten für verschiedene Funktionen, um
die Benutzeroberfläche einheitlich zu halten. Diese Komponenten werden unter
[UI-Elemente](#main-ui-elements) sowie unter [Navigation](#navigating)
beschrieben.

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

Navigations-Seitenleiste
: Dies ist die linke Seitenleiste, die die Suche, Benachrichtigungen, Übersichten,
  Tabs für Tickets, Ihren Avatar und die Schaltfläche zum Erstellen von Tickets enthält.

Navigations-Tab
: Jedes Element der Navigations-Seitenleiste wird als Navigations-Tab bezeichnet. Je nach
  Inhalt kann es ein Ticket-Tab sein (mit der Ticket-Detailansicht) oder der Übersichten-
  Tab sein, der die Liste der verfügbaren Übersichten öffnet.

Ticket-Detailansicht
: Hier bearbeiten Sie Ihre Kundenanfragen. Sie befindet sich in der Mitte
  des Bildschirms, wenn ein Ticket-Tab in der Navigations-Seitenleiste ausgewählt ist.

Seitenleiste
: Dies ist die rechte Seitenleiste in der Ticket-Detailansicht. Sie enthält Seitenleisten- Tabs
  wie Kunde und Checkliste und zeigt den aktuell ausgewählten Tab an.

Seitenleisten-Tabs
: Auf der rechten Seite der Seitenleiste finden Sie kleine Icons, mit denen Sie zwischen
  den verschiedenen Tabs wechseln können. Die Verfügbarkeit dieser Tabs hängt von Ihrer System-Konfiguration,
  Ihren Rechten und den Ticket-Attributen ab (z.B. ob der
  Ticket-Kunde eine zugewiesene Organisation hat).

Aktive Seitenleiste
: Der ausgewählte Seitenleisten-Tab. Zeigt den Inhalt des Tabs an. Sie kann Dinge beinhalten
  wie die Kunden-, Organisationns- oder Checklisten-Seitenleiste und mehr.

### Navigieren

Die Navigations-Seitenleiste ist Ihr zentraler Ort, um auf alle wichtigen
Bereiche von Zammad zuzugreifen.  Sie umfasst:

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

Wenn Sie nach neuen Tickets suchen, an denen Sie arbeiten möchten, sollten
Sie zuerst einen Blick
in die Übersichten werfen. Sie können ihn entweder durch Klicken auf die
Schaltfläche **Übersichten**
in der Navigationsleiste oder das Tastaturkürzel [[o]] öffnen.
Sie können Übersichten als eine Art Ticket-Listen betrachten.

Standardmäßig gibt es einige integrierte Übersichten, die Sie verwenden
können. Zum Beispiel gibt es eine Übersicht namens "Offene Tickets". Dies
könnte ein guter Ausgangspunkt sein.  Ihr Zammad-Administrator hat
möglicherweise zusätzliche Übersichten erstellt. Diese basieren auf
Bedingungen/Regeln, um festzulegen, welches Ticket in welcher Übersicht
erscheint.

Eine detaillierte Erklärung finden Sie in der [Beschreibung der
Übersichten](/de/documentation/use/guides/overviews).

### Über die Suche

Wenn Sie jedoch ein bestimmtes Ticket suchen, das in den Übersichten
sichtbar sein kann oder auch nicht,
können Sie die Suche verwenden. Sie finden diese in der oberen
linken Ecke in der Navigations-Seitenleiste. Wählen Sie sie entweder mit der
Maus aus oder verwenden Sie das
Tastaturkürzel, indem Sie einfach [[s]] drücken.

After activating the search field, you can see your last viewed items as
well as your last search queries.

By entering a search term, you immediately see a preview of the search
results. If you press [[enter]] or click on `detailed search`, Zammad
displays a page with search results. There you can differentiate by object
type (e.g.  customer), what you are searching.

Have a look at the [search guide](guides/search) for more details.

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

So, basically you can work with Zammad similar as with your email
client. Except that you have some additional attributes you can set in the
_Ticket_ sidebar tab:

- **Status**: spiegelt den aktuellen Status eines Tickets wider
  (hauptsächlich, ob eine Kundenanfrage gelöst ist oder
  nicht). Standardmäßig gibt es die folgenden Status:
  - **New**: State for new tickets on which no one has worked on. When
      updating a ticket the first time, it automatically switches to _open_.
  - **Open**: State for tickets which aren't resolved yet and some
      work needs to be done.
  - **Pending Close**: State for tickets which are basically resolved but
      you don't want to close immediately. This state requires you to enter
      a date and time at which the ticket automatically switches to _closed_.
  - **Pending Reminder**: State for open tickets which you want to get
      reminded to a certain date and time. Requires you to enter a date and time
      at which you want to get notified. For example useful if you had a
      question to a third party and want to make sure that this issue won't
      be forgotten.
- **Owner**: This is the person who is currently responsible for the ticket.
  In case you need to have an information from another colleague, you can either
  change to owner to this person or mention the person in an article by
  typing `@@` and selecting the user. In the later case, the user gets notified
  and is automatically subscribed to receive notifications on ticket updates.
- **Group**: This ticket attribute is useful for organizations with more than
  one team. Depending on the permissions, you might not see the ticket after
  changing the group and saving the changes.

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

Unabhängig vom Artikeltyp des Kunden können Sie immer interne Notizen
hinzufügen.  Diese sind nützlich, um dem Ticket Informationen hinzuzufügen
oder einen Kollegen zu fragen.

### Aktualisierung Ihres Tickets

After you have done your changes like writing an answer to a customer and
change the state of the ticket, you can see a highlighted **Update** button
in the right footer. By clicking it, your changes are applied and if you
created an answer, it is now sent out to the customer. If you consider the
issue as resolved, you should set the state to _closed_ now.

## Abschluss

Dies war eine kurze Einführung in die Arbeit mit Zammad, wenn Sie völlig neu
im Umgang mit Ticketsystemen sind. Wenn Sie nun die Grundlagen von Zammad
kennen, können Sie entweder anfangen zu arbeiten oder einen Blick auf die
[erweiterten Features](advanced-features) werfen, um noch produktiver zu
werden und das volle Potential von Zammad zu nutzen. 🚀
