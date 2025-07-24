---
order: 4
title: 'Erweiterte Funktionen'
---

# Erweiterte Funktionen

## Tastaturkürzel

TODO

## Verhalten bei Ticket-Aktualisierung

![Screenshot zeigt Menü bzgl. Verhalten nach
Aktualisierung](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Warum?**

Es ist möglich, einen Tab für ein Ticket in der Navigationsleiste
automatisch zu schließen. Es hängt von Ihren Präferenzen ab, aber Sie können
sich einen Klick nach der Aktualisierung oder der Aktualisierung auf den
Status _geschlossen_ sparen.

**Wie?**

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
Wenn sich Ihre Situation von Ticket zu Ticket unterscheidet, können Sie **Tab beibehalten** lassen und die Tastenkombination
[[umschalt]] [[c]] verwenden, um den Status des Tickets auf geschlossen zu setzen und den Tab des Tickets zu schließen.
:::

## Textbausteine

![Screenshot zeigt
Textbausteine-Funktion](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-text-template.png)

**Warum?**

Wenn Sie immer wieder die gleiche Frage beantworten müssen, bitten Sie Ihren
Zammad-Administrator, einen solchen Textbaustein für Sie zu erstellen. Sie
können sogar Variablen wie den Namen des Kunden oder jedes andere verfügbare
Attribut einfügen, die bei der Verwendung in einem Ticket ersetzt
werden. Die Verwendung von Textbausteinen hat Vorteile wie:

- Sie sparen Zeit bei der Beantwortung von Tickets
- Die Antworten von Ihnen und Ihren Kollegen sind aufeinander abgestimmt, da
  Sie denselben Text für die Antworten verwenden

**Wie?**

Verwenden Sie die Schaltfläche in der Symbolleiste des Editors oder
schreiben Sie einfach `::` in den Editor. Auf beiden Wegen können Sie nach
dem gewünschten Textbaustein suchen, indem Sie einige Zeichen oder Wörter
des Textes oder Schlüsselwörter des Textbausteins eingeben.

Sie können einen auswählen, indem Sie ihn anklicken oder die Pfeiltasten
nach oben und unten, gefolgt von [[enter]], auf Ihrer Tastatur benutzen. Es
gibt einige Textbausteine in Zammad, die standardmäßig mitgeliefert werden.

## Knowledge Base Artikel einfügen

![Screenshot zeigt Einfügen eines Knowledge Base
Artikels](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-insert-kba.png)

**Warum?**

Wenn Sie häufig dieselben oder sehr ähnliche Kundenanfragen zu einem Problem
haben, zu dem ein Artikel in der Knowledge Base existiert.  So sparen Sie
Zeit, weil Sie nicht zur Knowledge Base wechseln und Inhalte
kopieren/einfügen müssen.

**Wie?**

Verwenden Sie die Schaltfläche in der Symbolleiste des Editors oder
schreiben Sie einfach `??` in den Editor. Auf beiden Wegen können Sie nach
dem gewünschten Knowledge Base Artikel suchen, indem Sie einige Zeichen oder
Wörter eingeben.

## Erwähnen von Kollegen

![Screenshot zeigt Erwähnung eines
Kollegen](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Warum?**

Bitten Sie Ihre Kollegen um Informationen oder erwähnen Sie sie in wichtigen
Tickets, damit sie Benachrichtigungen über Ticket-Aktualisierungen erhalten
und dieses Ticket abonnieren.

**Wie?**

Verwenden Sie beim Schreiben eines Ticket-Artikels die Schaltfläche in der
Symbolleiste des Editors oder geben Sie einfach `@@` ein. Auf beiden Wegen
können Sie nach dem Namen des Kollegen suchen, den Sie erwähnen möchten,
indem Sie einige Buchstaben oder den vollständigen Namen eingeben.

Zammad zeigt eine Liste mit allen möglichen Übereinstimmungen an, aus der
Sie eine auswählen können, indem Sie darauf klicken oder die Auf- und
Ab-Pfeiltasten gefolgt von [[Enter]] auf Ihrer Tastatur verwenden.

## Ein Ticket abonnieren

![Screenshot zeigt die Funktion Ticket
abonnieren](/screenshots/cypress/usage-advanced-features.cy.js/ticket-subscribe.png)

**Warum?**

Wenn Sie sich für den Fortschritt eines Tickets interessieren, Sie aber
nicht der Besitzer sind, können Sie es abonnieren. Das bedeutet, dass Sie
bei jeder Aktualisierung eine Benachrichtigung erhalten.

**Wie?**

Aktivieren Sie den Schalter "Abonnieren" im seitlichen Bereich des Tickets,
um Benachrichtigungen zu erhalten. Wenn Sie in einem Ticket erwähnt wurden,
werden Sie automatisch benachrichtigt. Deaktivieren Sie den Schalter, um die
Benachrichtigung zu stoppen. Die angezeigten Avatare zeigen Ihnen, wer das
Ticket abonniert hat und somit über Aktualisierungen benachrichtigt wird.

## Makros

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

**Wie?**

Wenn Ihr Administrator bereits ein Makro erstellt hat, können Sie es in der
Ticket-Detailansicht ausführen, indem Sie auf die Schaltfläche mit den drei
Punkten ::a:: in der rechten Ecke der Fußleiste klicken und das
auszuführende Makro auswählen.

::: warning
Das Makro wird sofort und ohne zusätzliche Bestätigung ausgeführt!
:::

Sie können ein Makro auch auf mehrere Tickets auf einmal anwenden. Sehen Sie
sich unter [Mehrfach-Aktionen](#mehrfach-aktionen) an, wie das geht.

## Tags

![Screenshot zeigt Tag-Bereich in der
Ticket-Seitenleiste](/screenshots/cypress/usage-advanced-features.cy.js/ticket-tags.png)

**Warum?**

Tags sind eine Möglichkeit, ein Ticket zu kategorisieren. Sie können sich
die Tags als eine Art Etikett vorstellen. Sie können in Bedingungen, wie
z.B. in Triggern und Übersichten, verwendet werden und sie können auch
automatisch von Makros, Automatisierungen und Triggern zugewiesen werden.
Natürlich können Sie nach dem Text der Tags suchen und finden so Tickets,
die mit dem Tag versehen sind.

**Wie?**

In der Seitenleiste des Tickets finden Sie einen Abschnitt mit der
Bezeichnung **Tags**. Fügen Sie einen Tag hinzu, indem Sie auf die
Schaltfläche ::+:: klicken. Sie können vorhandene Tags auswählen und neue
hinzufügen (wenn Ihr Administrator das Hinzufügen neuer Tags nicht
deaktiviert hat).

Entfernen Sie sie, indem Sie einfach auf die Schaltfläche ::x::
klicken. Beachten Sie, dass es keinen Bestätigungsdialog für das Löschen
eines Tags aus einem Ticket gibt.

## Checklisten

![Screenshot zeigt eine Checkliste aus der
Checklisten-Seitenleiste](/screenshots/cypress/usage-advanced-features.cy.js/ticket-checklist.png)

**Warum?**

- Um den Überblick über Ihre Aufgaben zu behalten
- Um Aufgaben auf strukturierte Weise zu erledigen
- Um sicherzustellen, dass nichts vergessen wird
- Um den Fortschritt der Arbeiten besser sichtbar machen

**Wie?**

Wählen Sie den Tab **Checkliste** in der Seitenleiste. Wenn Sie sie nicht
sehen können, hat Ihr Zammad-Administrator sie deaktiviert. Sie können eine
Checkliste nur hinzufügen oder bearbeiten, wenn Sie die Berechtigung haben,
das Ticket zu bearbeiten.

In der Checklisten-Seitenleiste können Sie:

- Fügen Sie eine Checkliste hinzu: entweder durch Erstellen einer neuen
  Checkliste, indem Sie auf `Leere Checkliste hinzufügen` klicken, oder aus
  einer Vorlage, indem Sie `Aus einer Vorlage hinzufügen` verwenden (wenn
  Sie die Schaltfläche für die Vorlage nicht sehen, gibt es keine).
- Bearbeiten Sie die aktuelle Checkliste:
  - Benennen Sie sie um, indem Sie auf den Titel klicken oder das ::a:: Menü
    im Header der Seitenleiste verwenden.
  - Fügen Sie Elemente der Checkliste hinzu, indem Sie auf die Schaltfläche
    ::+:: klicken.
  - Ändern Sie den Text der Elemente der Checkliste, entweder durch
    einfaches Anklicken oder über das ::a:: Menü neben dem Element.
  - Ordnen Sie die Elemente neu an, indem Sie auf die Schaltfläche
    `Reihenfolge ändern` klicken und die Elemente per Drag & Drop
    verschieben.
- Löschen Sie die komplette Checkliste über das ::a:: Menü im Header der
  Seitenleiste.

Es gibt zwei Funktionen, die nicht direkt sichtbar sind:

- Sie können auf andere Tickets in einem Checklisten-Element verweisen,
  indem Sie den Ticket-Hook und die Nummer im Elementtext verwenden
  (z.B. `Ticket#123456`). Solche Elemente können nicht manuell als erledigt
  gekennzeichnet werden, sie spiegeln den Status des Tickets wider, auf das
  sie verweisen.
  ::: tip
  Kopieren Sie den Ticket-Hook und die Ticket-Nummer, indem Sie zum gewünschten Ticket gehen und entweder die Kopierknopf in der Kopfzeile benutzen oder mit
  ddem Tastaturkürzel [[.]]. Dann können Sie es in die Checkliste einfügen, in der Sie darauf verweisen möchten.
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

**Wie?**

In der Ansicht zum Erstellen eines Tickets finden Sie in der Fußleiste eine
Schaltfläche `Vorlage anwenden ^`, wenn eine Vorlage verfügbar ist. Wählen
Sie die Vorlage, die Sie anwenden möchten, und nehmen Sie gegebenenfalls
Änderungen vor.

## Gemeinsame Entwürfe

**Warum?**

Um einen Entwurf mit anderen Agenten Ihrer Gruppe zu teilen, z.B. um einem
Qualitätssicherungsprozess zu folgen, anstatt "nur" einen internen Artikel
hinzuzufügen. In einen solchen Entwurf können Sie sogar geänderte
Ticket-Attribute wie Priorität, Status und benutzerdefinierte Attribute
sowie einen Artikel mit einer Antwort an den Kunden aufnehmen.

Dies ist eine optionale Funktion. Wenn Sie sie nicht sehen können, hat Ihr
Administrator sie ausgeschaltet.

**Wie?**

Zum **Speichern eines Entwurfs** verwenden Sie das ::a:: Menü in der
Fußzeile der Ticket-Detailansicht und wählen "Als Entwurf speichern".

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

**Wie?**

Have a look at the footer bar in the ticket detail view. When there is an
avatar from another agent in the live user section (see screenshot above),
you are not the only one viewing this ticket.

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

![Screenshot shows the bulk action side
panel](/screenshots/cypress/usage-advanced-features.cy.js/bulk-side-panel-overviews.png)

**Warum?**

Wenn Sie die gleichen Änderungen für viele Tickets vornehmen müssen, können
Sie Zeit sparen!

**Wie?**

Es gibt 2 _Orte_, an denen Sie Mehrfach-Aktionen durchführen können:

- Erweiterte Suche
- Übersichten

Wenn Sie sich in den Übersichten oder auf der Seite für die erweiterte Suche
befinden, können Sie Tickets auf 2 _Arten_ bearbeiten:

- Use the **Bulk Action** button in the top right corner and change/add
  attributes by using the fields in the side panel
- Ziehen Sie die Tickets mit der Maus, um die Mehrfach-Aktion einzublenden,
  und legen Sie sie auf der gewünschten Aktion ab

Um Tickets in beiden Fällen zu bearbeiten, müssen Sie sie vorher
auswählen. Klicken Sie dazu auf das Kontrollkästchen auf der linken Seite
einer Zeile in der Ticket-Tabelle. Ausgewählte Tickets werden neben dem
Kontrollkästchen hervorgehoben.

Folgende Änderungen können Sie an Tickets vornehmen:

- Gruppe festlegen
- Besitzer festlegen
- Status festlegen
- Priorität festlegen
- Eine Notiz hinzufügen
- Ausführen eines Makros

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

**Wie?**

Gehen Sie zu dem Ticket, das Sie mit einem anderen zusammenführen
möchten. Wählen Sie in der Seitenleiste des Tickets im ::a:: Menü
`Zusammenfassen`. Dadurch öffnet sich ein Seiten-Panel, in dem Sie ein
Ticket durch Anklicken auswählen oder eine Ticketnummer in das Suchfeld
eingeben können.  Wenn Sie ein Ticket ausgewählt haben, bestätigen Sie es
mit der Schaltfläche `Zusammenfassen` am unteren Rand.

Als Ergebnis werden die Artikel in das gewählte Ticket verschoben. Das
Ticket, in dem Sie die Zusammenfassung durchgeführt haben, existiert
weiterhin mit den folgenden Änderungen:

- Die Artikel wurden mit dem Text "zusammengefasst" ersetzt
- Der Status hat sich auf "zusammengefasst" geändert
- Das Ticket ist mit seinem "Eltern"-Ticket verknüpft

## Tickets Abspalten

![Screenshot zeigt das Menü zur Abspaltung eines
Artikels](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Warum?**

If you have a ticket which is about more than one issue, you might want to
split it in two or more separate tickets.  For example, this might be the
case if a customer has a technical question and wants to place an order.

**Wie?**

Um einen Artikel abzuspalten, benutzen Sie das ::a:: Menü an dem Artikel und
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
[abgespaltene](#tickets-abspalten) Tickets werden automatisch verknüpft.

**Wie?**

Fügen Sie in der Ticket-Seitenleiste einen Link zu einem anderen Ticket
hinzu, indem Sie auf die Schaltfläche ::+:: im Abschnitt "Links"
klicken. Dadurch öffnet sich ein Seiten-Panel, in dem Sie ein Ticket durch
Anklicken auswählen oder eine Ticketnummer in das Suchfeld eingeben
können. Außerdem können Sie zwischen verschiedenen Link-Typen wählen:

- **Normal:** für verwandte Tickets, die keine Hierarchie haben.
- **Eltern/Kinder**: für verwandte Tickets, von denen eines das Hauptthema
  und das andere eine Unteraufgabe ist. Dieser Verknüpfungstyp wird
  standardmäßig verwendet, wenn ein Ticket geteilt oder zusammengefasst
  wird.

## Zeiterfassung

**Warum?**

Mit der integrierten Zeiterfassung von Zammad können Sie den Überblick über
die Zeit behalten, die Sie für Tickets aufgewendet haben. Basierend auf den
erfassten Zeiten im Ticket wird es automatisch Kunden und Organisationen
zugeordnet. Dies kann in Ihrer Firma für die Rechnungsstellung oder zur
Verfolgung von Support-Kontingenten verwendet werden.

**Wie?**

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

Wenn ein Ticket bereits erfasste Zeiten hat, sehen Sie diese in der Ticket
Detailansicht in der rechten Seitenleiste unten. Hier finden Sie die
berechneten Summen der einzelnen Aktivitäts-Typen (sofern konfiguriert),
sowie die Gesamtsumme der erfassten Zeiten über alle Aktivitäts-Typen.

![Screenshot zeigt eine Übersicht über erfasste
Zeiten](/screenshots/cypress/usage-advanced-features.cy.js/time-accounting-overview.png)

## User Detail Panel

**Warum?**

Sie sehen wichtige Kunden-/Benutzerinformationen auf einen Blick, ohne Ihre
aktuelle Ansicht zu verlassen und können sich auf Ihre Aufgabe
konzentrieren.

**Wie?**

Sie haben es vielleicht schon gesehen: Fahren Sie einfach mit der Maus über
ein Avatar-Symbol, egal ob es sich im Header, in der Fußzeile, dem
Hauptinhalt oder in der Inhalts-Seitenleiste der Ticket Detailansicht
befindet.

![Screenshot shows an avatar with opened user detail
panel](/screenshots/cypress/usage-advanced-features.cy.js/user-detail-panel.png)

Die Krone im Screenshot steht übrigens für den VIP-Status des Kunden, der in
der Kundendetailansicht und in den Admin-Einstellungen eingestellt werden
kann.

## External Issues and Assets

**Warum?**

If you use i-doit and Zammad for IT support or you deal with Github or
Gitlab issues, you can link to these external systems to have all relevant
information in one place. Your Zammad admin has to activate and configure
these features in Zammad's settings.

**Wie?**

![Screenshot shows Gitlab content sidebar with "Link Issue"
button](/screenshots/cypress/usage-advanced-features.cy.js/gitlab-content-sidebar.png)

If activated, simply open a ticket and choose the right content sidebar tab
with the respective icon (see Gitlab example in screenshot above). Click the
button to link to an issue by entering the URL of it or select the item from
a select field (i-doit). Afterwards, you can see the linked item with
additional metadata. By clicking on the linked item, you are redirected to
it in the respective system.
