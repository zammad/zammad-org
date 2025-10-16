---
order: 10
outline:
  - 2
  - 2
title: FAQs
---

# FAQs

[[TOC]]

## Allgemein

### Wie finde ich Tickets?

Das hängt von Ihrem Anwendungsfall ab. Zammad bietet mehrere Möglichkeiten,
Tickets zu suchen und auf sie zuzugreifen.

Wenn Sie **nach einem bestimmten Ticket oder Inhalt** suchen, ist die Suche
der beste Weg. Sie finden das Suchfeld im oberen Bereich der
Navigations-Seitenleiste oder können sie mit dem Tastaturkürzel [[s]
aktivieren]. Die Suche zeigt sogar Ihre zuletzt angesehenen Elemente an,
vielleicht finden Sie dort schon, was Sie suchen. Für weitere Informationen
gibt es eine eigene [Suchseite](./guides/search).

Wenn Sie **mit der Arbeit an Tickets** beginnen wollen, werfen Sie einen
Blick auf die [Übersichten](./guides/overviews), die im Grunde eine Liste
der aktuellen Tickets sind. Diese Übersichten sollten Sie in die Lage
versetzen, leicht zu unterscheiden, was zu tun ist, was in Bearbeitung ist
und was derzeit keine Bearbeitung erfordert. Falls Sie Probleme mit diesen
Übersichten haben, kann Ihnen Ihr Zammad-Administrator weiterhelfen.

### Wie kann ich über Ticket-Änderungen informiert werden?

Passen Sie die [Benachrichtigungseinstellungen in Ihrem
Profil](manage-profile#benachrichtigungen) an. Sie können unterscheiden
zwischen der Aktion (z.B. Ticketerstellung), dem Benachrichtigungskanal
(E-Mail und/oder Browser) und Ihrer Beziehung zum Ticket (z.B. ob Sie der
Besitzer sind) sowie die Benachrichtigungen auf eine bestimmte Gruppe
beschränken.

### Warum ist das Ticket wieder offen? Ich habe es bereits geschlossen

Abhängig von den Einstellungen Ihrer Zammad-Instanz können die Gründe dafür
unterschiedlich sein. In der Regel liegt der Grund jedoch darin, dass ein
Kunde auf das Ticket geantwortet hat, nachdem es auf geschlossen gesetzt
wurde. Ein anderer Grund könnte sein, dass ein Kollege es wieder geöffnet
hat. Wenn Sie keinen Artikel sehen, der auf die Beschreibung passt, können
Sie einen Blick in die Ticket-Historie werfen, um mehr zu erfahren. Öffnen
Sie dazu das ::a:: Menü im Ticket-Tab der Seitenleiste und wählen Sie
**Historie**.

Ihr Zammad-Administrator kann einstellen, was passieren soll, wenn ein Kunde
auf ein bereits geschlossenes Ticket antwortet.

### Was sieht ein Kunde im Ticket?

Standardmäßig steht den Kunden nur eine reduzierte Oberfläche zur
Verfügung. Sie können Tickets erstellen, ihre eigenen Tickets einsehen (und
je nach Einstellung auch die ihrer Kollegen) und auf ihre
Profileinstellungen zugreifen. Auch die Ticket Detailansicht enthält nur
relevante Elemente für den Kunden. Elemente, die einen internen Zweck haben
(wie Gruppe, Priorität, interne Notizen), sind für Kunden nicht sichtbar.

::: warning
Die obige Erklärung basiert auf den Standardeinstellungen von Zammad. Beachten Sie, dass die Konfiguration Ihres Systems möglicherweise
anders sein kann. Im Zweifelsfall sollten Sie Ihren Administrator fragen.
:::

### Ich kann mich nicht anmelden. Was kann ich tun?

- Haben Sie Ihr Passwort vergessen? Versuchen Sie, es auf der Anmeldeseite
  unter dem Link **Passwort vergessen?** zurückzusetzen, indem Sie Ihre
  E-Mail-Adresse angeben.
- Haben Sie die Möglichkeit verloren, Ihren zweiten Faktor für die
  2-Faktor-Authentifizierung (2FA) bereitzustellen? Verwenden Sie einen
  Wiederherstellungscode und richten Sie eine neue 2FA-Methode ein. Weitere
  Informationen finden Sie auf der [2FA-Seite](./guides/two-factor-auth).
- Haben Sie Ihre 2FA-Wiederherstellungscodes verloren? Wenden Sie sich an
  Ihren Zammad-Administrator. Dies gilt auch, wenn Ihr Problem hier nicht
  aufgeführt ist.

### How can I use keyboard shortcuts?

Benutzen Sie sie einfach! Sie finden eine Übersicht der verfügbaren
Tastaturkürzel, indem Sie [[?]] auf Ihrer Tastatur drücken oder die
Übersicht über das Avatar-Menü öffnen (klicken Sie auf Ihren Avatar in der
unteren linken Ecke und wählen Sie **Tastaturkürzel**).

Einige davon hängen davon ab, wo Sie sich befinden oder welche Aktion Sie
durchführen (z.B. im Editor oder in der Ticket Detailansicht).

### Wie schaltet man die Benutzeroberfläche zwischen Dunkel- und Hellmodus um?

Sie können im Avatar-Menü zwischen hellem, dunklem und automatischem Modus
(versucht, sich an Ihren Browser anzupassen) umschalten. Öffnen Sie es,
indem Sie auf Ihren Avatar in der linken unteren Ecke klicken und den
Schalter auf den gewünschten Status stellen.

Eine andere Möglichkeit ist die Verwendung des Tastaturkürzels [[d]]. Wenn
kein Eingabefeld aktiviert ist, wird durch Drücken dieser Taste zwischen den
verschiedenen Modi gewechselt.

## Benutzerprofil

### Wie kann ich mein Profil-/Avatarbild ändern?

Gehen Sie zum [Avatar-Bereich in Ihren
Profileinstellungen](manage-profile#avatar), indem Sie das Avatar-Menü in
der unteren linken Ecke öffnen und **Profileinstellungen** wählen. Dort
können Sie ein Bild hochladen, ein Foto aufnehmen (sofern Ihr Gerät über
eine Kamera verfügt) oder bereits vorhandene Bilder löschen.

### How to change the language of the Zammad user interface?

Gehen Sie in Ihren Profileinstellungen in den Bereich Sprache, indem Sie das
Avatar-Menü in der linken unteren Ecke öffnen und wählen Sie
**Profileinstellungen**.

### Was sollte ich in Zammad tun, bevor ich meinen Urlaub antrete?

Gehen Sie in Ihren Profileinstellungen in den Bereich
[Abwesenheit](manage-profile#abwesenheit), indem Sie das Avatar-Menü in der
in der linken unteren Ecke öffnen und **Profileinstellungen** wählen. Dort
können Sie einen anderen Agenten als Vertretung festlegen.

### How to adjust the order of the overviews?

Read on in the [overview guide](guides/overviews#reorder-overviews).

## Mit Tickets arbeiten

### Wie weise ich einem Ticket eine Person zu?

Im Ticket Seitenleisten-Tab finden Sie das Feld **Besitzer**. Wählen Sie die
gewünschte Person aus den verfügbaren Agenten aus und stellen Sie sicher,
dass Sie eine interne
Notiz hinterlassen, damit der andere Agent weiß, worum es geht.

Wenn Sie nur eine Frage haben oder eine Information benötigen, können Sie
auch einfach einen Kollegen in einem Artikel
[erwähnen](advanced-features#erwahnen-von-kollegen), indem Sie [[@]][[@]]
verwenden und Ihre Frage stellen.

### Wie löscht man ein Ticket?

Zunächst einmal können Tickets nicht von Agenten gelöscht werden. Dies
geschieht aus Gründen der Transparenz und um versehentliches und
willkürliches Löschen zu verhindern.

Wenn Kunden jedoch möchten, dass ihre Daten gelöscht werden (z.B. aufgrund
einer DSGVO-Löschanfrage), kann Sie dies in Zammad veranlassen. Wenden Sie
sich an Ihren Zammad-Administrator und bitten Sie ihn, die Löschung
vorzunehmen.

### Wie verwendet man Textbausteine?

Verwenden Sie Zammads [Textbausteine](advanced-features#textbausteine),
indem Sie im Artikel-Editor [[:]][[:]] eingeben. Wenn Sie zusätzliche
Textbausteine benötigen, bitten Sie Ihren Zammad-Administrator, sie für Sie
hinzuzufügen.

### Wie kann man einen Kollegen im Ticket um Hilfe bitten?

Das geht am besten, indem Sie in einem Artikel einen [Kollegen
erwähnen](advanced-features#erwahnen-von-kollegen), indem Sie [[@]][[@]]
verwenden und Ihre Frage stellen. Dies löst eine Benachrichtigung an Ihren
Kollegen aus. Abhängig von Ihren internen Abläufen könnte auch ein Wechsel
des Besitzers des Tickets eine Möglichkeit sein.

### Wie zitiert man die E-Mail des Kunden oder Teile davon?

Um den Artikel oder Teile davon teilweise oder selektiv zu zitieren,
markieren Sie den Text, den Sie zitieren möchten, und klicken Sie auf die
Schaltfläche `Antworten` neben dem Artikel. Dies kann auch mehrfach
geschehen (z.B. um verschiedene Teile des Tickets zu beantworten).

Die Zitierung des gesamten Artikels hängt davon ab, wie Ihr Zammad
konfiguriert ist. Wenn Sie dieses Verhalten ändern möchten, bitten Sie Ihren
Administrator, dies zu tun.
