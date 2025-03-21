---
order: 4
title: 'Erweiterte Funktionen'
---

# Erweiterte Funktionen

## Tastaturkürzel verwenden

TODO

## Verhalten nach Ticketaktualisierung anpassen

![Screenshot zeigt Menü bzgl. Verhalten nach
Aktualisierung](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Warum?**

It is possible to automatically close a ticket tab in the navigation
sidebar. It depends on your preferences, but you can save a click after
updating or updating a ticket to _closed_ state.

**Wie? **

Klicken Sie in der Fußleiste der Ticket-Detailansicht auf die Schaltfläche
`Tab beibehalten` und wählen Sie die gewünschte Option aus (falls die
Standardeinstellung noch vorhanden ist, andernfalls ist sie wie die anderen
Optionen unten beschriftet). Sie haben verschiedene Möglichkeiten:

- **Tab beibehalten**: Standardoption. Sie müssen den Tab manuell schließen,
  wenn Sie ihn aus Ihrer Navigationsseitenleiste entfernen möchten.
- **Tab schließen**: Mit dieser Option wird der Tab bei jeder Aktualisierung
  des Tickets geschlossen. Dies kann eine gute Option sein, wenn Sie mit
  vielen Tickets zu tun haben und/oder die Tickets viele Interaktionen
  erfordern.
- **Tab schließen bei Ticket-Schließung**: Mit dieser Option wird der Tab
  nur geschlossen, wenn das Ticket aktualisiert wird und der Status auf
  _geschlossen_ gesetzt wird.

::: tip
If your situation differs from ticket to ticket, you can leave **Stay on tab** and use the keyboard shortcut
[[Shift]] [[c]] for changing the ticket state to closed and close the ticket tab.
:::

## Use Text Modules

![Screenshot shows text modules
feature](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Warum?**

Die Verwendung von Textbausteinen hat Vorteile wie:

- Sie sparen Zeit bei der Beantwortung von Tickets
- Die Antworten von Ihnen und Ihren Kollegen sind aufeinander abgestimmt, da
  Sie denselben Text für die Antworten verwenden

**Wie? **

Um Textbausteine zu verwenden, geben Sie einfach `::` in den Editor ein,
gefolgt von Teilen des Namens oder dem Schlüsselwort des Textbausteins.

Sie können eine auswählen, indem Sie sie anklicken oder die Pfeiltasten nach
oben und unten benutzen, gefolgt von
[[Enter]] auf Ihrer Tastatur. Es gibt einige Textbausteine in Zammad
die standardmäßig mitgeliefert werden.

If you have to answer the same question again and again, ask your Zammad
admin to create such a text module for you.  They can even include variables
like customer name or any other available attribute which get replaced while
using it in a ticket.

## Erwähnen von Kollegen

![Screenshot zeigt
Erwähnungs-Funktion](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Warum?**

Bitten Sie Ihre Kollegen um Informationen oder erwähnen Sie sie in wichtigen
Tickets, damit sie Benachrichtigungen über Ticket-Aktualisierungen erhalten
und dieses Ticket abonnieren.

**Wie? **

Wenn Sie einen Ticket-Artikel schreiben, geben Sie einfach `@@` und einige
Buchstaben des Namens des Kollegen ein, den Sie erwähnen möchten.

Zammad zeigt eine Liste mit allen möglichen Übereinstimmungen an, aus der
Sie einen Eintrag
auswählen können, indem Sie darauf klicken oder die Pfeiltasten nach oben
und unten benutzen, gefolgt von
[[enter]] auf Ihrer Tastatur.

## Ein Ticket abonnieren

![Screenshot zeigt die Funktion Ticket
abonnieren](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Warum?**

If you are interested in the progress of a ticket, you can subscribe to
it. This means you will receive notifications for each update.

**Wie? **

Activate the "Subscribe me" toggle in the ticket side panel to get
notifications. If you have been mentioned in a ticket, you are automatically
subscribed. Switch the toggle off to stop the notification. The avatars
displayed show you who has subscribed to the ticket and is therefore
notified of updates.

## Ein Makro verwenden

![Screenshot zeigt
Makro-Aktionsmenü](/screenshots/cypress/usage-advanced-features.cy.js/ticket-macro.png)

**Warum?**

Wenn Sie viele Schritte immer wieder durchführen müssen, sollten Sie dafür
ein Makro verwenden. In einem solchen Makro kann Ihr Administrator
verschiedene Ticket-Aktionen vordefinieren, die Sie mit nur einem Klick
anwenden können. Zammad liefert zum Beispiel standardmäßig ein Makro
"Schließen & als Spam markieren". Wenn es angewendet wird, wird der
Benutzer, der das Makro ausführt, als Besitzer zugewiesen, ein Tag `spam`
wird hinzugefügt und das Ticket wird geschlossen.

**Wie? **

Wenn Ihr Administrator bereits ein Makro erstellt hat, können Sie es in der
Ticket-Detailansicht ausführen, indem Sie auf die Schaltfläche mit den drei
Punkten `︙` in der rechten Ecke der Fußleiste klicken und das auszuführende
Makro auswählen.

::: warning
Das Makro wird sofort und ohne zusätzliche Bestätigung ausgeführt!
:::

Sie können ein Makro auch auf mehrere Tickets auf einmal anwenden. Sehen Sie
sich unter [Mehrfach-Aktionen](#mehrfach-aktionen) an, wie das geht.

## Tags verwenden

![Screenshot zeigt Tag-Bereich in der
Ticket-Seitenleiste](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

**Warum?**

Tags sind eine Möglichkeit, ein Ticket zu kategorisieren. Sie können sich
die Tags als eine Art Etikett vorstellen. Sie können in Bedingungen, wie
z.B. in Triggern und Übersichten, verwendet werden und sie können auch
automatisch von Makros, Automatisierungen und Triggern zugewiesen werden.
Natürlich können Sie nach dem Text der Tags suchen und finden so Tickets,
die mit dem Tag versehen sind.

**Wie? **

In der Seitenleiste des Tickets finden Sie einen Abschnitt mit der
Bezeichnung "Tags". Fügen Sie einen Tag hinzu, indem Sie auf die
Schaltfläche `+` klicken. Sie können vorhandene Tags auswählen und neue
hinzufügen (wenn Ihr Administrator das Hinzufügen neuer Tags nicht
deaktiviert hat).

Entfernen Sie sie, indem Sie einfach auf die Schaltfläche `X`
klicken. Beachten Sie, dass es keinen Bestätigungsdialog für das Löschen
eines Tags aus einem Ticket gibt.

## Verwenden einer Checkliste

![Screenshot zeigt eine Checkliste aus der
Checklisten-Seitenleiste](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Warum?**

- Um den Überblick über Ihre Aufgaben zu behalten
- Um Aufgaben auf strukturierte Weise zu erledigen
- Um sicherzustellen, dass nichts vergessen wird
- Um den Fortschritt der Arbeiten besser sichtbar machen

**Wie? **

Wählen Sie den Tab "Checkliste" in der Seitenleiste. Wenn Sie sie nicht
sehen können, hat Ihr Zammad-Administrator sie deaktiviert. Sie können eine
Checkliste nur hinzufügen oder bearbeiten, wenn Sie die Berechtigung haben,
das Ticket zu bearbeiten.

In der Checklisten-Seitenleiste können Sie:

- Fügen Sie eine Checkliste hinzu: entweder durch Erstellen einer neuen
  Checkliste, indem Sie auf `Leere Checkliste hinzufügen` klicken, oder aus
  einer Vorlage, indem Sie `Aus einer Vorlage hinzufügen` verwenden (wenn
  Sie die Schaltfläche für die Vorlage nicht sehen, gibt es keine).
- Bearbeiten Sie die aktuelle Checkliste:
  - Benennen Sie sie um, indem Sie auf den Titel klicken oder das `︙` Menü
    im im Header der Seitenleiste verwenden.
  - Fügen Sie Elemente der Checkliste hinzu, indem Sie auf die Schaltfläche
    `+` klicken.
  - Ändern Sie den Text der Elemente der Checkliste, entweder durch
    einfaches Anklicken oder über das `︙` Menü neben dem Element.
  - Ordnen Sie die Elemente neu an, indem Sie auf die Schaltfläche
    `Reihenfolge ändern` klicken und die Elemente per Drag & Drop
    verschieben.
- Löschen Sie die komplette Checkliste über das `︙` Menü im Header der
  Seitenleiste.

Es gibt zwei Funktionen, die nicht direkt sichtbar sind:

- You can refer to other tickets as a checklist item by using its hook and
  number in the item text (e.g.  `Ticket#123456`). Such items can't be
  checked manually, they reflect the state of the referred ticket.
  ::: tip
  Fetch the ticket hook and number by going to the desired ticket and either use the copy button in the header or use
  the keyboard shortcut [[.]]. Then you can paste it in the checklist you want to have it included.
  :::
- Zammad prüft automatisch, ob alle Elemente der Checkliste abgeschlossen
  sind. Die Prüfung wird durchgeführt, wenn Sie ein Ticket auf "geschlossen"
  setzen. Wenn nicht alle Elemente erledigt sind, fordert Zammad Sie auf,
  entweder die verbleibenden Aufgaben zu bearbeiten und das Ticket offen zu
  lassen oder es trotzdem zu schließen. Wenn Sie in Ihrer Checkliste auf
  andere Tickets verweisen, gelten nur diejenigen als erledigt, die
  geschlossen sind (mit einem grünen Kreis).

## Ticket-Vorlagen

**Warum?**

Erstellen Sie schnell ein Ticket mit vordefinierten Attributen wie Titel,
Text, Tags und mehr und sparen Sie Zeit. Dafür muss Ihr Administrator
bereits eine Ticket-Vorlage erstellt haben.

**Wie? **

In the ticket create screen, you can find an `Apply Template ^` button in
the footer bar, if a template is available.  Select the template you want to
apply and apply changes if desired.

## Gemeinsame Entwürfe

**Warum?**

Um einen Entwurf mit anderen Agenten Ihrer Gruppe zu teilen, z.B. um einem
Qualitätssicherungsprozess zu entsprechen, anstatt "nur" einen internen
Artikel hinzuzufügen. In einen solchen Entwurf können Sie sogar geänderte
Ticket-Attribute wie Priorität, Status und benutzerdefinierte Attribute
sowie einen Artikel mit einer Antwort an den Kunden aufnehmen.

Dies ist eine optionale Funktion. Wenn Sie sie nicht sehen können, hat Ihr
Administrator sie ausgeschaltet.

**Wie? **

Zum **Speichern eines Entwurfs** verwenden Sie das `︙` Menü in der Fußzeile
der Ticket-Detailansicht und wählen "Als Entwurf speichern".

Um **einen bereits vorhandenen Entwurf zu übernehmen**, klicken Sie auf die
Schaltfläche `Entwurf verfügbar` auf der linken Seite der Fußzeile.

::: warning
Das Anwenden eines Entwurfs überschreibt Ihre nicht gespeicherten Änderungen!
:::

## Erkennung gleichzeitige Ticketbearbeitung

![Screenshot zeigt andere Agenten, die das Ticket gerade
sehen/bearbeiten](/screenshots/advanced-features/simultaneous-work-detection.png)

**Warum?**

Dinge, die man vermeiden sollte:

- Überflüssige Arbeit
- Widersprüchliche Antworten von verschiedenen Agenten
- Überschriebene/zurückgenommene Änderungen durch verschiedene Agenten

Deshalb können Sie sofort sehen, wer das aktuell angezeigte Ticket ansieht
und bearbeitet.

**Wie? **

Werfen Sie einen Blick auf die Fußleiste in der Detailansicht des
Tickets. Wenn dort ein Avatar eines anderen Agenten zu sehen ist (siehe
Screenshot oben), sind Sie nicht der einzige, der dieses Ticket betrachtet.

Je nach zusätzlichem Icon und ob der Avatar abgedunkelt ist, bedeutet dies:

- Ein anderer Agent sieht sich das Ticket an (nicht abgedunkelter Avatar
  ohne zusätzliches Icon)
- Ein anderer Agent hat das Ticket geöffnet, ist aber momentan nicht aktiv
  mit dem Ticket beschäftigt (abgedunkelter Avatar mit einem Schlummer-Icon,
  siehe linker Avatar im Screenshot)
- Ein anderer Agent arbeitet gerade aktiv an diesem Ticket (nicht
  abgedunkelter Avatar mit einem Bleistift-Icon, siehe rechter Avatar im
  Screenshot)

## Mehrfach-Aktionen

![Screenshot shows the bulk action
flyout](/screenshots/cypress/usage-advanced-features.cy.js/bulk-flyout-overviews.png)

**Warum?**

If you have to apply the same changes for many ticket, you can save time!

**Wie? **

There are 2 _places_ where you can perform bulk actions:

- Detail search page
- Übersichten

Assuming you are in the overviews or in the detail search page, you can bulk
edit tickets in 2 _ways_:

- Use the **Bulk Action** button in the top right corner and change/add
  attributes by using the fields in the flyout
- Drag the tickets with the mouse to invoke the bulk action overlay and drop
  them on the desired action

To bulk edit tickets in either way, you have to select them before. Do so by
clicking the checkbox on the left side of each row in the ticket
table. Selected tickets are highlighted next to the checkbox.

The available changes you can apply to tickets are:

- Set group
- Set owner
- Set state
- Set priority
- Add a note
- Execute a macro

## Tickets zusammenfassen

![Screenshot zeigt das Seiten-Panel zur
Ticket-Zusammenführung](/screenshots/cypress/usage-advanced-features.cy.js/ticket-merge.png)

**Warum?**

Wenn Sie zwei oder mehr Tickets zu demselben Problem haben, möchten Sie
diese möglicherweise zu einem einzigen Ticket zusammenführen. Dies kann der
Fall sein, wenn ein Kunde Ihnen eine neue E-Mail schickt, die nicht dem
bestehenden Ticket zugeordnet werden kann (z.B. fehlt die Ticket-Referenz,
weil der Kunde Ihnen eine völlig neue E-Mail schickt, anstatt auf die
bestehende Kommunikation zu antworten).

Beim Zusammenfassen von Tickets werden alle Nachrichten und Notizen des
Tickets, von dem Sie das Zusammenfassen ausgewählt haben, in das ausgewählte
Ticket übernommen.

**Wie? **

Gehen Sie zu dem Ticket, das Sie mit einem anderen zusammenführen
möchten. Wählen Sie in der Seitenleiste des Tickets im `︙` Menü
`Zusammenfassen`. Dadurch öffnet sich ein Seiten-Panel, in dem Sie ein
Ticket durch Anklicken auswählen oder eine Ticketnummer in das Suchfeld
eingeben können.  Wenn Sie ein Ticket ausgewählt haben, bestätigen Sie es
mit der Schaltfläche `Zusammenfassen` am unteren Rand.

Als Ergebnis werden die Artikel in das gewählte Ticket verschoben. Das
Ticket, in dem Sie die Zusammenfassung durchgeführt haben, existiert
weiterhin mit den folgenden Änderungen:

- Die Artikel wurden durch ein `merged` Label ersetzt
- Der Status hat sich auf "zusammengefasst" geändert
- Das Ticket ist mit seinem "Eltern"-Ticket verknüpft

## Ticket Abspalten

![Screenshot zeigt das Menü zur Abspaltung eines
Artikels](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Warum?**

If you have a ticket which is about more than one issue, you might want to
split it in two or more separate tickets.  For example this might be the
case if a customer has a technical question and wants to place an order.

**Wie? **

Um einen Artikel abzuspalten, benutzen Sie das Menü `︙` an dem Artikel und
wählen Sie `Abspalten`.

Im Ergebnis sehen Sie die Ansicht zum Erstellen eines Tickets mit denselben
Attributen wie im ursprünglichen Ticket. Der Inhalt des Artikels ist
ebenfalls enthalten. Sie können alles nach Ihren Wünschen ändern und dann
auf `Erstellen` klicken.

Das soeben erstellte Ticket ist im ursprünglichen Ticket als "Kind"-Ticket
verlinkt. Das ursprüngliche Ticket ist im abgespaltenen Ticket als
"Eltern"-Ticket verknüpft.

## Tickets verknüpfen

**Warum?**

When tickets about related issues arise, they can be linked to each other
for easier reference.  [Merged](#merge-tickets) and [split](#split-ticket)
tickets are automatically linked.

**Wie? **

Fügen Sie in der Ticket-Seitenleiste einen Link zu einem anderen Ticket
hinzu, indem Sie auf die Schaltfläche `+` im Abschnitt "Links"
klicken. Dadurch öffnet sich ein Seiten-Panel, in dem Sie ein Ticket durch
Anklicken auswählen oder eine Ticketnummer in das Suchfeld eingeben
können. Außerdem können Sie zwischen verschiedenen Link-Typen wählen:

- **Normal:** für verwandte Tickets, die keine Hierarchie haben.
- **Eltern/Kinder**: für verwandte Tickets, von denen eines das Hauptthema
  und das andere eine Unteraufgabe ist. Dieser Verknüpfungstyp wird
  standardmäßig verwendet, wenn ein Ticket geteilt oder zusammengefasst
  wird.

## Zeit erfassen

**Warum?**

Mit der integrierten Zeiterfassung von Zammad können Sie den Überblick über
die Zeit behalten, die Sie für Tickets aufgewendet haben. Basierend auf den
erfassten Zeiten im Ticket wird es automatisch Kunden und Organisationen
zugeordnet. Dies kann in Ihrer Firma für die Rechnungsstellung oder zur
Verfolgung von Support-Kontingenten verwendet werden.

**Wie? **

Nach der Aktualisierung eines Tickets wird ein Dialog zur Zeiterfassung
angezeigt. Geben Sie ein, wie viel Zeit Sie für diese Bearbeitung des
Tickets gebraucht haben.

![Screenshot zeigt Dialog zur
Zeiterfassung](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-dialog.png)

Die Funktion ist **optional**. Wenn Sie das nach einer Ticketaktualisierung
nicht sehen, hat Ihr Administrator die Funktion noch nicht aktiviert oder
die Regel für die zu berücksichtigenden Tickets greift bei diesem Ticket
nicht.

Die erfasste Zeit wird immer ohne Einheit erfasst und gespeichert. Ihr
Administrator kann jedoch entscheiden, eine optionale Beschriftung neben dem
Feld anzuzeigen, um Ihnen und Ihren Kollegen einen Hinweis darauf zu geben,
in welcher Einheit die Zeit erwartet wird (siehe Screenshot).

Aktivitäts-Typen können zur Unterscheidung zwischen verschiedenen
Tätigkeiten und zur Gruppierung der erfassten Zeiten verwendet werden. Wenn
diese optionale Funktion aktiviert ist, wird eine Liste von Aktivitäten
angezeigt, aus der Sie im Erfassungsdialog auswählen können.

Wenn ein Ticket bereits abgerechnete Zeit(en) hat, können Sie diese in der
Ticket Detailansicht in der rechten Seitenleiste unten sehen. Hier finden
Sie die berechneten Summen der einzelnen Aktivitäts-Typen (sofern
konfiguriert) sowie die Gesamtsumme der erfassten Zeiten über alle
Aktivitäts-Typen.

![Screenshot zeigt eine Übersicht über erfasste
Zeiten](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)
