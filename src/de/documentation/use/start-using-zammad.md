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
die Benutzeroberfläche konsistent zu halten. Diese Komponenten werden in den
Abschnitten [Haupt-UI-Elemente](#haupt-ui-elemente) sowie
[Navigieren](#navigieren) unten beschrieben.

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
: Jedes Element der Navigations-Seitenleiste wird als Navigations-Tab bezeichnet. Je nach Inhalt kann es z.B. ein Ticket-Tab sein (mit
  der Ticket-Detailansicht) oder ein Übersichten-Tab sein, der die Liste der verfügbaren Übersichten öffnet.

Ticket-Detailansicht
: Hier bearbeiten Sie Ihre Kundenanfragen. Sie befindet sich in der Mitte
  des Bildschirms, wenn ein Ticket-Tab in der Navigations-Seitenleiste ausgewählt ist.

Seitenleiste
: Dies ist die rechte Seitenleiste in der Ticket-Detailansicht. Sie enthält Seitenleisten- Tabs
  wie Kunde und Checkliste und zeigt den aktuell ausgewählten Tab an.

Seitenleisten-Tabs
: Auf der rechten Seite der Seitenleiste finden Sie kleine Icons, mit denen Sie zwischen
  den verschiedenen Tabs wechseln können. Die Verfügbarkeit dieser Tabs hängt von Ihrer System-Konfiguration,
  Ihren Rechten und den Ticket-Attributen ab (z.B. ob der Kunde des Tickets einer Organisation angehört).

Aktive Seitenleiste
: Der ausgewählte Seitenleisten-Tab. Zeigt den Inhalt des Tabs an. Sie kann Dinge beinhalten
  wie die Kunden-, Organisations- oder Checklisten-Seitenleiste und mehr.

### Navigieren

Die Navigations-Seitenleiste ist Ihr zentraler Ort, um auf alle wichtigen
Bereiche von Zammad zuzugreifen. Sie umfasst:

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

Wenn Sie nach neuen Tickets suchen, die Sie bearbeiten möchten, sollten Sie
zuerst im Bereich Übersichten nachsehen. Sie können ihn entweder durch
Klicken auf die Schaltfläche **Übersichten** in der Navigationsleiste öffnen
oder das Tastaturkürzel [[o]] verwenden. Sie können die Übersichten als eine
Art von Ticket-Listen betrachten.

Standardmäßig gibt es einige integrierte Übersichten, die Sie verwenden
können. Zum Beispiel gibt es eine Übersicht namens "Offene Tickets". Dies
könnte ein guter Ausgangspunkt sein. Ihr Zammad-Administrator hat
möglicherweise zusätzliche Übersichten erstellt. Diese basieren auf
Bedingungen/Regeln, um festzulegen, welches Ticket in welcher Übersicht
erscheint.

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
  - **Neu**: Status für neue Tickets, an denen noch niemand gearbeitet
    hat. Wenn ein Ticket zum ersten Mal aktualisiert wird, wechselt es
    automatisch zu _offen_.
  - **Offen**: Status für Tickets, die noch nicht gelöst sind und an denen
    noch gearbeitet werden muss.
  - **Warten auf Schließen**: Status für Tickets, die grundsätzlich gelöst
    sind, die Sie aber nicht sofort schließen möchten. Für diesen Status
    müssen Sie ein Datum und eine Uhrzeit eingeben, zu der das Ticket
    automatisch auf _geschlossen_ wechselt.
  - **Warten auf Erinnerung**: Status für offene Tickets, an die Sie zu
    einem bestimmten Datum und einer bestimmten Uhrzeit erinnert werden
    möchten. Hier müssen Sie ein Datum und eine Uhrzeit eingeben, zu der Sie
    benachrichtigt werden möchten. Dies ist z.B. nützlich, wenn Sie eine
    Frage an einen Dritten hatten und sicherstellen möchten, dass dieses
    Problem nicht vergessen wird.
- **Besitzer**: Dies ist die Person, die derzeit für das Ticket
  verantwortlich ist. Falls Sie eine Information von einem anderen Kollegen
  benötigen, können Sie entweder den Besitzer auf diese Person ändern oder
  sie in einem Artikel erwähnen, indem Sie `@@` eingeben und den Benutzer
  auswählen. Im letzteren Fall wird der Benutzer benachrichtigt und erhält
  automatisch Benachrichtigungen über Aktualisierungen von Tickets.
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

Unabhängig vom Artikeltyp des Kunden können Sie immer interne Notizen
hinzufügen. Diese sind nützlich, um dem Ticket Informationen hinzuzufügen
oder einen Kollegen zu fragen.

### Aktualisierung Ihres Tickets

Nachdem Sie Ihre Änderungen vorgenommen haben, z.B. eine Antwort an einen
Kunden geschrieben und den Status des Tickets geändert haben, sehen Sie in
der rechten Fußzeile eine hervorgehobene Schaltfläche
**Aktualisieren**. Wenn Sie auf diese Schaltfläche klicken, werden Ihre
Änderungen übernommen, und wenn Sie eine Antwort erstellt haben, wird diese
nun an den Kunden gesendet. Wenn Sie das Problem als gelöst betrachten,
sollten Sie den Status auf _geschlossen_ setzen.

## Abschluss

Dies war eine kurze Einführung in die Arbeit mit Zammad, wenn Sie völlig neu
im Umgang mit Ticketsystemen sind. Wenn Sie nun die Grundlagen von Zammad
kennen, können Sie entweder anfangen zu arbeiten oder einen Blick auf die
[erweiterten Features](advanced-features) werfen, um noch produktiver zu
werden und das volle Potential von Zammad zu nutzen. 🚀
