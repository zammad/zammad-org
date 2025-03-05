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
sidebar.  It depends on your preferences, but you can save a click after
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
- **Close tab on ticket close**: This option only closes the tab when the
  ticket is updated and the state is set to _closed_.

::: tip
If your situation differs from ticket to ticket, you can leave **Stay on tab**
and use the keyboard shortcut [[Shift]] [[c]] for changing the
ticket state to closed and close the ticket tab.
:::

## Textbausteine verwenden

![Screenshot zeigt
Textbaustein-Funktion](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Warum?**

Die Verwendung von Textbausteinen hat Vorteile wie:

- Sie sparen Zeit bei der Beantwortung von Tickets
- Die Antworten von Ihnen und Ihren Kollegen sind aufeinander abgestimmt, da
  Sie denselben Text für die Antworten verwenden

**Wie? **

Um Textbausteine zu verwenden, geben Sie einfach `::` in den Editor ein,
gefolgt von Teilen des Namens oder dem Schlüsselwort des Textbausteins.

You can pick one by clicking on it or by using the up and down arrows
followed by [[Enter]] on your keyboard. There are some text modules in
Zammad which are shipped by default.

Wenn Sie immer wieder die gleiche Frage beantworten müssen, bitten Sie Ihren
Zammad-Administrator, einen solchen Textbaustein für Sie zu erstellen. Sie
können sogar Variablen wie den Namen des Kunden oder jedes andere verfügbare
Attribut einfügen, die bei der Verwendung in einem Ticket ersetzt werden.

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

Zammad displays a list with all possible matches where you can pick one by
clicking on it or by using the up and down arrows followed by [[enter]] on
your keyboard.

## Ein Ticket abonnieren

![Screenshot zeigt die Funktion Ticket
abonnieren](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Warum?**

Wenn Sie am Fortschritt eines Tickets interessiert sind, können Sie es
abonnieren.  Das bedeutet, dass Sie bei jeder Aktualisierung eine
Benachrichtigung erhalten.

**Wie? **

Aktivieren Sie den Schalter "Abonnieren" im seitlichen Bereich des Tickets,
um Benachrichtigungen zu erhalten. Wenn Sie in einem Ticket erwähnt wurden,
werden Sie automatisch benachrichtigt. Deaktivieren Sie den Schalter, um die
Benachrichtigung zu stoppen.  Die angezeigten Avatare zeigen Ihnen, wer das
Ticket abonniert hat und somit über Aktualisierungen benachrichtigt wird.

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
  - Rename it by clicking on the title or using the `︙` menu in the sidebar
      header.
  - Add checklist items by clicking the `+` button.
  - Change the text of the checklist items, either by just clicking on it
      or using the `︙` menu next to the item.
  - `Reorder` the items by clicking this button and drag & drop the items.
- Delete the complete checklist by using the `︙` menu in the sidebar header.

Es gibt zwei Funktionen, die nicht direkt sichtbar sind:

- Sie können auf andere Tickets in einem Checklisten-Element verweisen,
  indem Sie den Ticket-Hook und die Nummer im Elementtext verwenden
  (z.B. `Ticket#123456`). Solche Elemente können nicht manuell als erledigt
  gekennzeichnet werden, sie spiegeln den Status des Tickets wider, auf das
  sie verweisen.
  ::: tip
  Fetch the ticket hook and number by going to the desired ticket and either
  use the copy button in the header or use the keyboard shortcut [[.]].
  Then you can paste it in the checklist you want to have it included.
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

In der Ansicht zum Erstellen eines Tickets finden Sie in der Fußleiste eine
Schaltfläche "Vorlage anwenden", wenn eine Vorlage verfügbar ist. Wählen Sie
die Vorlage, die Sie anwenden möchten, und nehmen Sie gegebenenfalls
Änderungen vor.

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

TODO nach der Implementierung von Mehrfach-Aktionen in Übersichten

**Warum?**

**Wie? **

Per Drag & Drop Über Dropdown-Selektoren

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

Wenn Sie ein Ticket haben, bei dem es um mehr als ein Problem geht, möchten
Sie es vielleicht in zwei oder mehr separate Tickets aufteilen. Dies kann
zum Beispiel der Fall sein, wenn ein Kunde eine technische Frage hat und
eine Bestellung aufgeben möchte.

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

Wenn Tickets zu verwandten Themen auftauchen, können sie zur einfacheren
Auffindbarkeit und Referenz miteinander verknüpft
werden. [Zusammengefasste](#tickets-zusammenfassen) und
[abgespaltene](#ticket-abspalten) Tickets werden automatisch verknüpft.

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

## Account Time

**Warum?**

With Zammad's integrated time accounting, you can help to keep track of how
much time you spent on tickets. Based on the accounted times in the ticket,
it is automatically assigned to customers and organizations. This might be
used in your company for billing or to keep track of support budgets.

**Wie? **

After updating a ticket, a time accounting dialog will appear. Enter how
much time you spent on the ticket.

![Screenshot shows the time accounting
dialog](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-dialog.png)

The feature is **optional**. If you don't see it whenever you update a
ticket, your administrator hasn't enabled it yet or the rule for tickets to
be taken into consideration doesn't match.

The accounted time is always recorded and stored without a unit. However,
your administrator may decide to show an optional label next to the field to
hint you and your colleagues in which unit the time is expected (see
screenshot).

Activity types can be used to distinguish between different activities and
for grouping the accounted times. If this optional feature is active, it
shows a list of activities from which you can select in the time accounting
dialog.

If a ticket already has accounted time(s), you can see it in the ticket
sidebar on the right side in the ticket detail view at the bottom. You can
find the calculated sums of each activity type (if configured) as well as
the total sum of accounted times for all activity types.

![Screenshot shows the time accounting
overview](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)
