---
order: 4
title: 'Erweiterte Funktionen'
---

# Erweiterte Funktionen

Dies Seite ist eine Sammlung verschiedener hilfreicher Tools, für die keine
eigene Seite erforderlich ist. Lesen Sie einfach weiter, durchsuchen Sie die
Seite oder navigieren Sie mit Hilfe des Inhaltsverzeichnisses auf der
rechten Seite zu dem von Ihnen gewünschten Abschnitt.

## Verhalten bei Ticket-Aktualisierung

![Screenshot zeigt Menü bzgl. Verhalten nach
Aktualisierung](/screenshots/cypress/usage-advanced-features.cy.js/ticket-behavior-update.png)

**Warum?**

Es ist möglich, einen Tab in der Navigations-Seitenleiste automatisch zu
schließen, nachdem ein Ticket aktualisiert wurde.  Dies erspart Ihnen einen
Klick nach der Aktualisierung oder dem Aktualisieren eines Tickets auf den
Status _geschlossen_.

**Wie?**

Klicken Sie in der Fußleiste der Ticket-Detailansicht auf die Schaltfläche
`Tab beibehalten` und wählen Sie die gewünschte Option aus (falls die
Standardeinstellung noch vorhanden ist, andernfalls ist sie wie die anderen
Optionen unten beschriftet). Sie haben verschiedene Möglichkeiten:

- **Tab beibehalten**: Standard-Option. Sie müssen den Tab manuell
  schließen, wenn Sie ihn aus Ihrer Navigations-Seitenleiste entfernen
  möchten.
- **Tab schließen**: Mit dieser Option wird der Tab bei jeder Aktualisierung
  des Tickets geschlossen. Dies kann eine gute Option sein, wenn Sie mit
  vielen Tickets zu tun haben und/oder die Tickets viele Interaktionen
  erfordern.
- **Tab schließen nach Ticket-Schließung**: Mit dieser Option wird der Tab
  nur geschlossen, wenn das Ticket aktualisiert wird und der Status auf
  _geschlossen_ gesetzt wird.

::: tip
Wenn sich Ihre Situation von Ticket zu Ticket unterscheidet, können Sie **Tab beibehalten** lassen und die Tastenkombination
[[shift]] [[c]] verwenden, um den Status des Tickets auf geschlossen zu setzen und den Tab des Tickets zu schließen.
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
schreiben Sie einfach [[:]][[:]] in den Editor. Auf beiden Wegen können Sie
nach dem gewünschten Textbaustein suchen, indem Sie einige Zeichen oder
Wörter des Textes oder Schlüsselwörter des Textbausteins eingeben.

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
schreiben Sie einfach [[?]][[?]] in den Editor. Auf beiden Wegen können Sie
nach dem gewünschten Knowledge Base Artikel suchen, indem Sie einige Zeichen
oder Wörter eingeben.

## Einen Benutzer erwähnen

![Screenshot zeigt Erwähnung eines
Benutzers](/screenshots/cypress/usage-advanced-features.cy.js/ticket-article-mention.png)

**Warum?**

Bitten Sie Ihre Kollegen um Informationen oder erwähnen Sie sie in wichtigen
Tickets, damit sie Benachrichtigungen über Ticket-Aktualisierungen erhalten
und dieses Ticket abonnieren.

**Wie?**

Verwenden Sie beim Schreiben eines Ticket-Artikels die Schaltfläche in der
Symbolleiste des Editors oder geben Sie einfach [[@]][[@]] ein. Auf beiden
Wegen können Sie nach dem Namen des Benutzers suchen, den Sie erwähnen
möchten, indem Sie einige Buchstaben oder den vollständigen Namen eingeben.

Zammad zeigt eine Liste mit allen möglichen Übereinstimmungen an, aus der
Sie eine auswählen können, indem Sie darauf klicken oder die Auf- und
Ab-Pfeiltasten gefolgt von [[enter]] auf Ihrer Tastatur verwenden.

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

If you have many steps you do over and over again, you should use a macro
for that. In such a macro, your admin can pre-define different ticket
actions you can apply with just a click. As an example, Zammad ships a
"Close & Tag as Spam" macro by default. If applied, the user who executes
the macro is assigned as owner, a tag **spam** is added and the ticket is
closed. It is even possible to run an [AI
agent](/en/documentation/use/guides/ai) within a macro on demand.

**Wie?**

Wenn Ihr Administrator bereits ein Makro erstellt hat, können Sie es in der
Ticket Detailansicht ausführen, indem Sie auf den Abschnitt `^` der
Schaltfläche `Aktualisierung` in der rechten Ecke der Fußleiste klicken
(siehe Screenshot oben) und das Makro auswählen, das Sie ausführen möchten.

::: warning
Das Makro wird sofort und ohne zusätzliche Bestätigung ausgeführt!
:::

Sie können ein Makro auch auf mehrere Tickets auf einmal anwenden. Sehen Sie
sich unter [Mehrfach-Aktionen](#mehrfach-aktionen) an, wie das geht.

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
  Rufen Sie die Ticket-Kennung ab, indem Sie zum gewünschten Ticket gehen und entweder die Kopierschaltfläche ::c:: in der Kopfzeile oder
  das Tastaturkürzel [[.]] verwenden. Dann können Sie den Wert in der Checkliste einfügen, die auf das Ticket verweisen soll.
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

## Überwachung von Ticket-Eskalationen

**Warum?**

Service Level Agreements (SLAs) gewährleisten eine zeitnahe Beantwortung von
Kundenanfragen. Ihr Administrator legt diese Ziele fest - z.B. die
Beantwortung aller Anfragen innerhalb von acht Stunden - mit optionalen
individuellen Fristen für bestimmte Kunden. Wenn eine solche Frist
überschritten wird, eskaliert das Ticket.

**Wie?**

Zammad benachrichtigt Sie standardmäßig, wenn sich Tickets ihren Fristen
nähern oder diese überschreiten. Konfigurieren Sie diese Benachrichtigungen
in Ihren
[Profileinstellungen](/de/documentation/use/user-profile#benachrichtigungen).
Zammad liefert auch eine Standardübersicht namens "Eskalierte Tickets"
aus. Diese Übersicht enthält bereits eskalierte Tickets und Tickets, bei
denen eine Eskalation innerhalb der nächsten 10 Minuten zu erwarten ist.

SLA-relevante Tickets zeigen einen Zeitstempel in der Kopfzeile des Tickets
an. Bewegen Sie den Mauszeiger über diesen Zeitstempel, um alle
Eskalationsstufen und Fristen in einem Popup zu sehen. Es zeigt alle
bevorstehenden oder überschrittenen Eskalationszeiten auf der Grundlage
Ihrer SLA-Konfiguration an:

![Screenshot zeigt Eskalationsberereich nach Überfahren des Zeitstempels mit
der
Maus](/screenshots/cypress/usage-advanced-features.cy.js/escalation-panel.png)

:::info
Die Eskalationszeiten werden auf der Grundlage Ihrer Geschäftszeiten berechnet. Das heißt, wenn Ihre Geschäftszeiten um 9:00 Uhr beginnen,
ein Ticket um 7:00 Uhr erstellt wird und Sie eine Frist von 1 Stunde haben, eskaliert es um 10:00 Uhr, sofern es nicht früher gelöst wird.
:::

Die SLA-Funktion erfordert eine Konfiguration durch Ihren
Administrator. Wenn Sie keine Zeitstempel für die Eskalation sehen, ist
entweder das Ticket nicht SLA-relevant oder die Funktion ist nicht
konfiguriert.

## Mehrfach-Aktionen

**Warum?**

Wenn Sie die gleichen Änderungen für viele Tickets vornehmen müssen, können
Sie Zeit sparen!

**Wie?**

Es gibt 2 Stellen, an denen Sie Mehrfach-Aktionen durchführen können:

- In the ticket tab in the [detailed search page](guides/search)
- In [Overviews](guides/overviews)

In both places, you can apply bulk actions in different ways:

- By using the side panel
- By using the drag & drop overlay

To use bulk actions, first select the tickets you want to apply the changes
to. Either select the tickets individually by clicking on the checkbox next
to them or use the checkbox in the header to select all tickets of the
current page. After selecting all tickets of the page, you can even select
all tickets which match your current search query or overview condition by
clicking on the **Select all XX results** label. The maximum number of
selectable tickets for a bulk action is 2000.

To select a section of consecutive tickets, click on the checkbox of the
first ticket, then hold [[shift]] and click on the checkbox of the last
ticket. This selects all tickets in between as well. This also works for
unselecting tickets.

Depending on the number of affected tickets, you might see a small
notification after triggering a bulk action, informing you about the
progress. The bulk action is performed in the background so you can work on
other tickets.  However, until the bulk action is finished, you are not able
to start a new bulk action.

**Side panel:**

![Screenshot zeigt Seitenleiste mit
Mehrfach-Aktionen](/screenshots/cypress/usage-advanced-features.cy.js/bulk-side-panel-overviews.png)

After you selected tickets, click the `Bulk Action` button in the top right
corner and change/add attributes by using the fields in the right side
panel. The available changes you can apply to tickets are:

- Gruppe festlegen
- Besitzer festlegen
- Status festlegen
- Priorität festlegen
- Eine Notiz hinzufügen
- Ausführen eines Makros

**Drag & drop with bulk overlay:**

![Screenshot shows the bulk action via drag and
drop](/screenshots/cypress/usage-advanced-features.cy.js/bulk-action-drag-and-drop.png)

After you selected tickets, drag them by pressing and holding the mouse
button and drop them on the desired action in the bulk action overlay. You
can always skip this by dropping the tickets in the middle of the page. The
available actions you can apply to tickets are:

- Gruppe festlegen
- Besitzer festlegen
- Unassign owner
- Unassign owner and set group
- Run macro

Start your drag and drop action from one of the already selected tickets in
case you selected all relevant ones.  To include another unselected ticket,
start dragging from there and so it is also included in the batch
processing.

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

## Tickets abspalten

![Screenshot zeigt das Menü zur Abspaltung eines
Artikels](/screenshots/cypress/usage-advanced-features.cy.js/ticket-split.png)

**Warum?**

Wenn Sie ein Ticket haben, bei dem es um mehr als ein Problem geht, möchten
Sie es vielleicht in zwei oder mehr separate Tickets aufteilen. Dies kann
zum Beispiel der Fall sein, wenn ein Kunde eine technische Frage hat und
eine Bestellung aufgeben möchte.

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

## Duplikaterkennung

![Screenshot zeigt Warnung der Duplikaterkennung bei der
Ticketerstellung](/screenshots/cypress/usage-advanced-features.cy.js/duplicate-detection.png)

**Warum?**

Manchmal kommt es vor, dass ein Kunde Sie (oder Kollegen) mehr als einmal
wegen eines einzigen Problems kontaktiert. Um die Erstellung doppelter
Tickets zu vermeiden, kann Zammad Sie warnen, wenn bereits ein anderes
Ticket vorhanden ist. Diese Funktion muss von Ihrem Administrator aktiviert
und konfiguriert werden.

**Wie?**

Erstellen Sie einfach ein neues Ticket und geben Sie einige Informationen
an. Ihr Administrator kann konfigurieren, welche Ticket-Attribute
übereinstimmen müssen, damit die Warnung angezeigt wird (z.B. Kunde und
Titel). Falls Sie viele unnötige Warnungen oder gar keine Warnung erhalten,
bitten Sie Ihren Administrator, die zu berücksichtigenden Attribute
anzupassen.

Wenn ein Duplikat erkannt wird, wird eine Warnung im Ticket angezeigt (siehe
Beispiel im Screenshot oben). Diese Warnung kann eine Ticket-Nummer
enthalten. Klicken Sie auf den Link zum Ticket, um zu sehen, worum es sich
handelt. Falls es sich nicht um ein Duplikat handelt, ignorieren Sie es
einfach und fahren Sie mit der Erstellung des Tickets fort.

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

## Benutzerinfo

**Warum?**

Sie sehen wichtige Kunden-/Benutzerinformationen auf einen Blick, ohne Ihre
aktuelle Ansicht zu verlassen und können sich auf Ihre Aufgabe
konzentrieren.

**Wie?**

Sie haben es vielleicht schon gesehen: Fahren Sie einfach mit der Maus über
ein Avatar-Symbol, egal ob es sich im Header, in der Fußzeile, im
Hauptinhalt oder in der Seitenleiste der Ticket-Detailansicht befindet. Um
weitere Details zu sehen, klicken Sie auf den Avatar eines Benutzers, um die
[Benutzer-Detailseite](#user-detail-page) zu öffnen.

![Screenshot zeigt einen Avatar mit geöffneter
Benutzerinfo](/screenshots/cypress/usage-advanced-features.cy.js/user-detail-panel.png)

Die Krone im Screenshot steht übrigens für den VIP-Status des Kunden, der in
der Kundendetailansicht und in den Admin-Einstellungen eingestellt werden
kann.

## Benutzer-Detailseite

![Screenshot zeigt
Benutzer-Detailseite](/screenshots/cypress/usage-advanced-features.cy.js/user-detail-page.png)

**Warum?**

Sie können alle relevanten Benutzerinformationen an einem Ort
einsehen. Beispiele dafür, was Sie dort finden und tun können:

- Mitgliedschaft in einer Organisation sehen
- Diagramm der letzten Tickets sehen
- Hinzufügen oder Bearbeiten einer Notiz
- Kundeninformationen bearbeiten (über das ::a:: Menü)
- Historie der Änderungen anzeigen (über das ::a:: Menü)
- Ein neues Ticket mit diesem Benutzer als Kunden erstellen

**Wie?**

Klicken Sie einfach auf einen Benutzer-Avatar (z.B. in der Kopfzeile der
Ticket-Detailansicht). Dadurch öffnet sich ein neuer Tab mit der
Kunden-Detailseite. Falls Sie auch Admin-Rechte haben, können Sie über das
::a:: Menü sogar eine Löschaufgabe für diesen Benutzer erstellen.

## Organisations-Detailseite

![Screenshot zeigt
Organisations-Detailseite](/screenshots/cypress/usage-advanced-features.cy.js/organization-detail-page.png)

**Warum?**

Hier können Sie alle relevanten Informationen über eine Organisation an
einem Ort einsehen. Beispiele dafür, was Sie dort finden und tun können:

- Mitglieder der Organisation sehen
- Ein Diagramm der letzten Tickets der gesamten Organisation sehen
- Hinzufügen oder Bearbeiten einer Notiz
- Die Organisation bearbeiten (über das ::a:: Menü)
- Historie der Änderungen anzeigen (über das ::a:: Menü)
- Einen neuen Benutzer als Mitglied dieser Organisation erstellen

**Wie?**

Klicken Sie einfach auf einen Organisationsavatar (z.B. in der Kopfzeile der
Ticket-Detailansicht neben dem Benutzeravatar). Dies öffnet die
Organisations-Detailseite als neuen Tab.

## Externe Issues und Inventar

**Warum?**

Wenn Sie i-doit und Zammad für den IT-Support nutzen oder sich mit Github-
oder Gitlab-Problemen befassen, können Sie sich mit diesen externen Systemen
verbinden, um alle relevanten Informationen an einem Ort zu haben. Ihr
Zammad-Administrator muss diese Funktionen in den Einstellungen von Zammad
aktivieren und konfigurieren.

**Wie?**

![Screenshot zeigt Gitlab Seitenleiste mit "Issue verknüpfen"
Schaltfläche](/screenshots/cypress/usage-advanced-features.cy.js/gitlab-content-sidebar.png)

Falls aktiviert, öffnen Sie einfach ein Ticket und wählen Sie den rechten
Seitenleisten-Tab mit dem entsprechenden Symbol (siehe Gitlab-Beispiel im
Screenshot oben). Klicken Sie auf die Schaltfläche, um einen Link zu einem
Issue zu erstellen und geben Sie die URL ein oder wählen das Element aus
einem Auswahlfeld aus (i-doit). Anschließend sehen Sie das verlinkte Element
mit zusätzlichen Metadaten. Wenn Sie auf das verlinkte Element klicken,
werden Sie zu diesem im jeweiligen System weitergeleitet.

## Text hervorheben

**Warum?**

Damit können Sie Ihren Kollegen einen Hinweis auf wichtige Aspekte des
Tickets geben und sicherstellen, dass wichtige Teile nicht übersehen
werden. Beachten Sie, dass es bei dieser Funktion nicht um die Hervorhebung
von Text in neuen Artikeln geht, sondern um die Hervorhebung von Text in
bestehenden Artikeln für Sie und andere Agenten.

**Wie?**

![Screenshot zeigt Hervorhebungsmenü in der
Ticket-Detailansicht](/screenshots/cypress/usage-advanced-features.cy.js/text-highlighting.png)

Verwenden Sie das Hervorhebungswerkzeug mit dem Stiftsymbol in der oberen
rechten Ecke in der Ticket-Detailansicht. Um Text zu markieren, wählen Sie
entweder zuerst den Text aus und klicken dann auf die
Schaltfläche. Alternativ können Sie auch zuerst auf die
Hervorhebungsschaltfläche klicken und dann den Text auswählen. Mit dem
Abwärtspfeil auf der rechten Seite der Schaltfläche können Sie eine andere
Farbe auswählen. Um die Hervorhebung zu entfernen, wählen Sie einfach das
Radiersymbol aus dem Farbmenü.
