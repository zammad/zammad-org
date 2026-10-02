---
order: 6
title: 'Knowledge Base'
---

# Knowledge Base

Die Knowledge Base ist die in Zammad integrierte Bibliothek für FAQs,
Anleitungen und interne Dokumentation. Kunden durchsuchen die
veröffentlichten Antworten zur eigenen Problemlösung, während Agenten diese
als Nachschlagewerk nutzen oder direkt in Ticket-Antworten einfügen.

![Der Screenshot zeigt eine Kategorie der Knowledge Base mit ihren
Unterkategorien und
Antworten](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/knowledge-base-full.png)

## Grundlagen

Ihr Administrator muss die Knowledge Base aktivieren und Ihnen die
Berechtigung als Leser oder Bearbeiter erteilen, bevor Sie damit arbeiten
können. Ob Sie interne Antworten lesen oder Inhalte bearbeiten können, hängt
von dieser Konfiguration ab. Zammad unterstützt eine Knowledge Base pro
System, die Inhalte in mehreren Sprachen enthalten kann. Um die Knowledge
Base zu öffnen, klicken Sie in der primären Navigation auf **Knowledge
Base**.

### Struktur

Die Knowledge Base besteht aus zwei Arten von Inhalten. **Kategorien**
funktionieren wie Ordner in einem Dateisystem: Sie gruppieren Inhalte,
können weitere Unterkategorien enthalten und benötigen jeweils einen Titel
sowie ein Symbol. **Antworten** sind die Seiten bzw. Artikel selbst und
bestehen aus einem Titel sowie diversen Inhalten, die einer Kategorie
zugeordnet sind.

### Mehrere Sprachen

Falls Ihr Administrator mehrere Sprachen für die Knowledge Base
freigeschaltet hat, kann eine Antwort in mehr als einer Sprache vorliegen,
wobei pro Sprache jeweils eine Übersetzung möglich ist. Um die Sprache zu
wechseln, nutzen Sie die Auswahl in der oberen Leiste, um eine andere
Sprache anzuschauen oder zu bearbeiten. Eine Antwort, für die noch keine
Übersetzung in der ausgewählten Sprache vorliegt, wird im Editor als leer
angezeigt.

### Sichtbarkeit

Jede Antwort weist eine von vier Sichtbarkeiten auf. Dieser
Sichtbarkeits-Status wird als farbiges Symbol auf der Antwort und auf der
zugehörigen Kategorie-Kachel angezeigt:

| Farbe | Sichtbarkeit     | Wer kann es sehen                                        |
|-------|-----------|--------------------------------------------------------|
| Grün | Veröffentlicht | Alle, einschließlich Kunden in der öffentlichen Hilfe-Website  |
| Blau  | Intern  | Agenten mit Leseberechtigung für die Knowledge Base           |
| Grau  | Entwurf     | Nur Bearbeiter                                           |
| Grau  | Archiviert  | Nur Bearbeiter                                           |

Wenn Sie eine Antwort anzeigen oder bearbeiten, zeigt Ihnen ein Symbol in
der oberen Leiste zudem die aktuelle oder geplante Sichtbarkeit an.

### Verwendung in Tickets

Die Knowledge Base entfaltet einen Teil ihres Nutzens innerhalb von Tickets:
Fügen Sie eine Antwort mithilfe von [[?]][[?]] in einen Artikel ein,
verknüpfen Sie relevante Antworten mit einem Ticket und lassen Sie die KI
auf Grundlage des Ticketinhalts Antworten aus der Knowledge Base vorschlagen
oder entwerfen. Diese Abläufe werden in [Knowledge Base-Artikel
einfügen](/de/documentation/use/advanced-features#insert-knowledge-base-article)
sowie in [Knowledge
Base-Assistent](/de/documentation/use/guides/ai#knowledge-base-assistant)
des KI-Leitfadens behandelt.

## Die Knowledge Base lesen

### Anschauen

Auf der Startseite der Knowledge Base wird für jede Kategorie der obersten
Ebene eine Kachel in einem Raster angezeigt. Jede Kachel zeigt das
Kategoriesymbol, den Titel, den Status der Veröffentlichung sowie zwei
Zahlen an: die Anzahl der Unterkategorien und die Anzahl der Antworten, die
in der Kategorie und allen Unterkategorien enthalten sind.

Um eine Kategorie zu öffnen, klicken Sie einfach auf die entsprechende
Kachel. Die Unterkategorien werden oben als Kacheln angezeigt, die Antworten
darunter als Liste. Wählen Sie eine Antwort aus, um sie zu lesen. Verwenden
Sie die Schaltflächen für die nächste und vorherige Antwort in der oberen
Leiste, um zwischen vorherigen und nächsten Antworten in dieser Kategorie zu
wechseln.

Verwenden Sie die Suchleiste oben, um die Knowledge Base zu durchsuchen. Mit
der Sprachauswahl können Sie zwischen den übersetzten Inhalten wechseln. Das
Symbol der Knowledge Base am Anfang der Pfad-Navigation in der oberen Leiste
führt Sie zurück zur Startseite der Knowledge Base. Die
Vorschau-Schaltfläche mit dem Tooltip **Öffentliche Knowledge Base
anzeigen** auf der rechten Seite der oberen Leiste zeigt die Knowledge Base
so an, wie sie Ihren Kunden angezeigt wird.

### Suche

Die Suchleiste oben in der Knowledge Base durchsucht sowohl die Titel und
Inhalte der Antworten als auch die Titel der Kategorien. Wenn Sie die Suche
innerhalb einer Kategorie starten, wird nur diese Kategorie und ihre
Unterkategorien durchsucht.

Suchbegriffe erlauben die Verwendung von Elasticsearch-Syntax. Alle
Suchbegriffe müssen übereinstimmen und einfache Suchbegriffe liefern auch
Treffer wenn sie einem Wortanfang entsprechen. So findet die Suchanfrage
`refund` auch die Ergebnisse `refunds`. Um nach einem spezifischen Feld zu
filtern, geben Sie den Feldnamen in Ihrer Suche an:

| Beispiel                   | Findet                                   |
|---------------------------|------------------------------------------|
| `created_at:>now-14d`    | Antworten, die in den letzten 14 Tagen erstellt wurden  |
| `edited_at:>now-3d`      | Antworten, die innerhalb der letzten 3 Tage aktualisiert wurden   |
| `tags:ai-generated`      | Antworten mit dem Tag `ai-generated` versehen sind           |
| `publication_state:draft` | Alle Antwortentwürfe                        |

Die `tags:` und `publication_state:` Felder erfordern
Elasticsearch. Suchanfragen, bei denen ein spezifisches Feld angegeben wird,
müssen exakt übereinstimmen; es findet kein Präfix-Matching statt.

Wählen Sie das Glühbirnen-Symbol in der Suchleiste aus, um Suchvorschläge
anzuzeigen. Dort finden Sie die gängigsten Filter als
Ein-Klick-Verknüpfungen sowie einen Link zu dieser Dokumentation.

Antworten aus der Knowledge Base werden ebenfalls in der globalen Suche
angezeigt. In der erweiterten Suche stehen sie als eigenständiger
Suchbereich zur Verfügung, wobei Titel, Sichtbarkeit und Datum der
Aktualisierung als Ergebnisspalten angezeigt werden. Informationen zur
erweiterten Suche und zur vollständigen Elasticsearch-Syntax finden Sie
unter [Suche](/de/documentation/use/guides/search).

## Die Knowledge Base bearbeiten

### Kategorien

![Screenshot zeigt das Bearbeitungs-Seitenmenü mit Titel, Symbol und
übergeordneter
Kategorie](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/kb-category-flyout.png)

Um eine **Kategorie** anzulegen, wählen Sie die Karte `+ Kategorie
hinzufügen` Kachel aus. Dies funktioniert sowohl auf der Startseite der
Knowledge Base für Kategorien der obersten Ebene als auch innerhalb einer
Kategorie für Unterkategorien. Eine weitere Möglichkeit, eine neue Kategorie
innerhalb einer anderen Kategorie anzulegen, besteht darin, die Schaltfläche
::a:: auf einer Kategorie-Kachel zu verwenden und **Unterkategorie
hinzufügen** auszuwählen.

Jede Kategorie besteht aus einem Titel und einem Symbol. Symbole helfen den
Benutzern, Kategorien auf einen Blick zu erkennen; wählen Sie daher das
Symbol aus, das am besten zum Inhalt passt.

Um eine Kategorie zu bearbeiten, klicken Sie auf das ::a::-Menü auf der
entsprechenden Kachel und wählen Sie **Kategorie bearbeiten** oder verwenden
Sie die entsprechende Schaltfläche oben in der rechten Seitenleiste, wenn
Sie sich in einer Kategorie befinden.

### Kategorie-Berechtigungen

Das Kategorie-Seitenmenü enthält eine Matrix unter **Berechtigungen**, die
Zugriffe für die einzelnen Rollen zuweist. Es stehen drei Ebenen zur
Verfügung: **Bearbeiter** zum Lesen und Bearbeiten der Inhalte der
Kategorie, **Leser** zum Lesen der Inhalte einschließlich intern
veröffentlichter Antworten und **Keine**, um die Inhalte vor der jeweiligen
Rolle auszublenden (veröffentlichte Antworten sind in der veröffentlichten
Knowledge Base stets sichtbar). Rollen ohne die Knowledge Base-Leser-oder
-Bearbeiter-Berechtigung haben keinen Eintrag in der Matrix.

Standardmäßig erfolgt die Zugriffsverwaltung global: Alle Benutzer mit der
Berechtigung Knowledge Base-Leser sehen alle intern veröffentlichten
Antworten, während Bearbeiter auf alle Inhalte zugreifen können. Wenn Sie
eine Berechtigungsmatrix für die Knowledge Base oder eine einzelne Kategorie
speichern, die von diesen Standardeinstellungen abweicht, wird die gesamte
Knowledge Base auf granularen Zugriff umgestellt: Die Sichtbarkeit der
Inhalte richtet sich dann nach den berechtigungsspezifischen Einstellungen
pro Kategorie. Die Auswahl der Zugriffsrechte, über die eine Rolle
standardmäßig bereits verfügt, behält das globale Verhalten bei.

Die Berechtigungen einer übergeordneten Kategorie werden von deren
Unterkategorien geerbt. Eine vererbte **Bearbeiter**- oder
**Keine**-Berechtigung kann in der Unterkategorie nicht überschrieben
werden; die entsprechenden Optionen sind gesperrt. Eine vererbte
**Leser**-Berechtigung kann geändert werden. Die **Bearbeiter**-Option ist
für Rollen gesperrt, die lediglich über die Leseberechtigung verfügen. Eine
Änderung, durch die Ihnen der eigene Bearbeitungs-Zugriff auf eine Kategorie
entzogen würde, wird abgelehnt, unabhängig von Ihren sonstigen
Rollen. Veröffentlichte Antworten bleiben für alle verfügbar; granulare
Berechtigungen wirken sich nur auf interne Antworten und die Bearbeitung von
Inhalten aus.

### Antworten

Um eine **Antwort** hinzuzufügen, öffnen Sie eine Kategorie und wählen Sie
die Karte `+ Antwort hinzufügen` aus, oder nutzen Sie das ::a::-Menü der
Kategorie und wählen Sie dort **Antwort hinzufügen** aus. Eine Antwort
besteht aus einem Titel und diversen Inhalten. Der Editor bietet dieselben
Formatierungsmöglichkeiten wie der Editor für Ticket-Artikel. Weitere
Informationen finden Sie im [Abschnitt
Formatierung](/de/documentation/use/guides/editor#apply-formatting) des
Editor-Leitfadens. Tags erleichtern das Auffinden von Antworten, sowohl bei
der Suche in der Knowledge Base als auch bei der Arbeit mit Tickets.

Innerhalb einer Antwort können Sie auf andere Antworten in der Knowledge
Base verweisen. Wählen Sie dazu das entsprechende Symbol in der Symbolleiste
des Editors aus und wählen Sie die Antwort aus, auf die Sie verweisen
möchten. Verweise auf die Knowledge Base bleiben auch dann korrekt, wenn die
Zielantwort in eine andere Kategorie verschoben wird.

Antworten unterstützen die Zusammenarbeit in Echtzeit: Wenn mehrere
Bearbeiter dieselbe Antwort bearbeiten, zeigt Zammad an, wer sonst noch
daran arbeitet, und fasst die Änderungen aller Beteiligten zusammen.

Während Ihrer Bearbeitung wird der aktuelle Stand automatisch als Entwurf
gespeichert. Wenn Sie den Tab oder den Browser schließen, können Sie später
zurückkehren und dort weitermachen, wo Sie aufgehört haben. Solange Sie die
Antwort nicht ausdrücklich speichern, können Sie die nicht gespeicherten
Änderungen verwerfen.

Der Editor bietet mehr als nur formatierten Text. Sie können Bilder von
Ihrem Computer direkt in den Antworttext einbetten, Videos über eine
Video-URL einbinden und Anhänge hinzufügen, die die Leser im Anhangsbereich
unterhalb der Antwort herunterladen können.  Bei Videos funktionieren
YouTube und Vimeo standardmäßig, während selbst gehostete PeerTube- und
MediaCMS-Instanzen von Ihrem Administrator hinzugefügt werden können. Leser
können ein Bild in einer Antwort anklicken, um eine größere Vorschau davon
zu öffnen.

### Inhalt verschieben

Um eine Kategorie einschließlich ihres Inhalts in eine andere Kategorie zu
verschieben, öffnen Sie das ::a:: Menü der Kategorie und wählen Sie
**Kategorie bearbeiten**. Wählen Sie im Feld **Übergeordnete Kategorie** die
neue übergeordnete Kategorie aus und speichern Sie die Änderung. Die
Kategorie sowie alle ihre Unterkategorien und Antworten werden dabei
ebenfalls verschoben.

Um eine Antwort zu verschieben, bearbeiten Sie die Antwort und wählen Sie in
der rechten Seitenleiste eine andere Kategorie aus.

### Inhalt löschen

Kategorien und Antworten können über ihre jeweiligen ::a:: Menüs gelöscht
werden (**Kategorie löschen**, **Antwort löschen**). Bevor Sie eine
Kategorie löschen können, müssen Sie deren Unterkategorien und Antworten
löschen. Ein Löschvorgang kann nicht rückgängig gemacht werden; erwägen Sie
daher stattdessen, eine Antwort zu archivieren, um deren Inhalt nicht zu
verlieren.

### Inhalt sortieren

![Der Screenshot zeigt die Sortierleiste mit hervorgehobenem
Modus-Umschalter und aktivem
Antworten-Tab](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/kb-sort-content.png)

Kategorien und Antworten können pro Kategorie sortiert werden. Öffnen Sie
das ::a:: Menü in der oberen Leiste und wählen Sie **Inhalt sortieren**. Die
Sortierleiste erscheint am unteren Bildschirmrand. Wechseln Sie innerhalb
einer Kategorie zwischen den Tabs **Kategorien** und **Antworten**, um die
beiden Bereiche separat anzuordnen; auf der Startseite der Knowledge Base
werden die Haupt-Kategorien sortiert.

Sowohl für Antworten als auch für Kategorien stehen drei Sortiermodi zur
Verfügung. Antworten und Kategorien können unabhängig voneinander sortiert
werden.

| Modus                       | Auswirkung                                                               |
|----------------------------|----------------------------------------------------------------------|
| **Alphabetisch sortieren** | Einträge nach Titel sortiert, unabhängig von manuellen Änderungen               |
| **Nach neuesten Aktualisierungen sortieren** | Zuletzt aktualisierte Einträge zuerst                                  |
| **Per Drag & Drop sortieren**   | Ihre selbst gewählte Reihenfolge; ziehen Sie die Einträge an die gewünschte Stelle                  |

Für Kategorien bedeutet _neueste Aktualisierung_, dass die Kategorie eigene
Änderungen wie eine geänderte Bezeichnung oder ein neues Symbol bekommen
hat. Änderungen an den darin enthaltenen Antworten beeinflussen nicht die
Position der Kategorie. Antworten werden anhand der Bearbeitungen ihres
Inhalts datiert.

Wählen Sie den Modus aus, ordnen Sie die Einträge bei Bedarf an und
speichern Sie die Änderungen. Die Reihenfolge gilt für alle, die die
Knowledge Base ansehen.

### Sichtbarkeit und Planung

![Screenshot zeigt die hervorgehobene geplante Sichtbarkeit in der
Antwort-Seitenleiste](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/kb-scheduled-visibility.png)

Um die Sichtbarkeit einer Antwort zu ändern, bearbeiten Sie die Antwort und
wählen Sie die neue Sichtbarkeit aus; die Aktualisierung wird sofort
wirksam, sobald Sie auf `Aktualisieren` klicken. Nutzen Sie Entwürfe, um
Inhalte vorzubereiten, die noch nicht zur Veröffentlichung bereit sind, und
die Archivierung, um veraltete Antworten nicht mehr sichtbar für Leser zu
machen, ohne sie zu löschen.

Anstatt die Sichtbarkeit manuell zu ändern können Sie eine Veränderung der
Sichtbarkeit planen: Eine Antwort kann zu einem bestimmten Datum automatisch
veröffentlicht oder archiviert werden, sobald sie veraltet ist. Geplante
Änderungen werden in der Seitenleiste der Antwort aufgelistet und sind nur
für Bearbeiter sichtbar. Erstellen Sie einen neuen Zeitplan, indem Sie im
Bearbeitungsmodus der Antwort auf die Schaltfläche ::+:: im Abschnitt
**Geplante Sichtbarkeit** klicken.

Die Zeitpläne richten sich nach dem Reihenfolge der Sichtbarkeit: Eine
Antwort kann zunächst den Status intern erhalten, anschließend
veröffentlicht und schließlich archiviert werden, wobei jede
Sichtbarkeitsänderung mit einem eigenen Datum versehen werden kann. Entwürfe
können nicht geplant werden und eine Sichtbarkeit, die die Antwort bereits
erreicht hat, kann nicht erneut geplant werden.

## Erweitert

### Aktualisierungs-Verhalten

Neben den Schaltflächen **Erstellen** und **Aktualisierung** können Sie
wählen, was beim Speichern einer Antwort passiert: **Tab beibehalten** lässt
den Editor öffnen, **Tab schließen und Antwort öffnen** kehrt zur
gespeicherten Antwort zurück, **Tab schließen und Kategorie öffnen** kehrt
zur Kategorie zurück und die Option **Tab schließen und weitere Antwort
hinzufügen** bei der Erstellung einer neuen Antwort öffnet die Erstellung
einer neuen Antwort in derselben Kategorie. Ihre Auswahl wird für die
zukünftigen Speicher- und Aktualisierungsvorgänge gespeichert.

### Die öffentliche Hilfeseite

Kunden können auf veröffentlichte Antworten entweder direkt in Zammad selbst
oder auf der öffentlichen Hilfeseite zugreifen, je nachdem, wie Ihr
Administrator die Knowledge Base konfiguriert hat. Standardmäßig ist die
öffentliche Seite unter `/help` auf Ihrem Zammad-Host erreichbar, zum
Beispiel unter `https://zammad.example.com/help/de-de`. Die öffentliche
Seite zeigt genau die veröffentlichten Inhalte, geordnet nach Kategorien,
und funktioniert auch ohne Zammad-Konto.

Um die Knowledge Base so zu sehen, wie Ihre Kunden sie sehen, verwenden Sie
die Vorschau-Funktion über die Schaltfläche, die im obigen Abschnitt
beschrieben ist. Im Gegensatz zur öffentlichen Website enthält die Vorschau
auch noch nicht veröffentlichte Antworten, sodass Sie Entwürfe vor ihrer
Veröffentlichung überprüfen können.

### Feeds

Die Knowledge Base erlaubt es, die gesamte Knowledge Base oder einzelne
Kategorien per Atom-/RSS-Feed zu abonnieren. Diese Funktion ist optional und
muss von Ihrem Administrator aktiviert werden.

Für **Agenten**: Navigieren Sie zu der Ebene Ihrer Knowledge Base, die Sie
abonnieren möchten, und wählen Sie **RSS-Feed einrichten** aus dem ::a::
Menü in der oberen Leiste oder aus dem ::a:: Menü in der
Antwort-Seitenleiste, wenn Sie eine Antwort lesen. Im Seitenmenü können Sie
zwischen einem Feed für die gesamte Knowledge Base und einem Feed der
Kategorie wählen, in der Sie sich gerade befinden. Die Feed-URL enthält ein
persönliches Token, und der Feed umfasst interne Antworten entsprechend
Ihren Berechtigungen. Behandeln Sie die Feed-URL wie ein Passwort. Sollte
sie bekannt werden, erneuern Sie das Token, wodurch die bisherigen URLs
ungültig werden.

**Kunden**, die sich auf der öffentlichen Hilfeseite unter befinden, erhalten ausschließlich einen Feed mit den veröffentlichten Inhalten, ohne dass ein Token erforderlich ist. Sie können
eine Feed-Datei herunterladen, indem sie auf das Feed-Symbol in der Fußzeile klicken.

### Titel kopieren

Über die ::c:: Schaltfläche neben dem Titel in der oberen Leiste kopieren
Sie den Namen der Kategorie oder der Antwort, die Sie gerade betrachten, in
die Zwischenablage, sodass Sie ihn in ein Ticket oder eine Suche einfügen
können.
