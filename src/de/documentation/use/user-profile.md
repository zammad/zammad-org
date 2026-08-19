---
order: 7
title: Benutzerprofil
---

# Benutzerprofil

Passen Sie Ihr Konto und Ihre persönlichen Einstellungen in Ihrem
Benutzerprofil an. Einige der Optionen sind möglicherweise nicht verfügbar,
je nachdem, wie Ihr System konfiguriert ist und welche Rechte Sie
haben. Öffnen Sie es über das Avatar-Menü in der Seitenleiste. Lesen Sie
weiter für weitere Details.

## Avatar-Menü

Um das Avatar-Menü zu öffnen, klicken Sie auf Ihr Avatar-Symbol in der
unteren linken Ecke der Seitenleiste. Dieses Symbol zeigt entweder Ihre
Initialen oder ein Profilbild an.

![Screenshot zeigt
Benutzerinfo](/screenshots/cypress/documentation/use/user-profile.cy.js/avatar-menu.png)

Das Menü enthält die folgenden Einträge:

- **Link(s) zur Dokumentation**: Abhängig von den zugewiesenen Rollen können
  Sie einen oder mehrere Links zur Dokumentation sehen.
- **Aussehen**: Wechseln Sie zwischen dunklem, hellem und automatischem
  Modus. Im automatischen Modus wird Zammad entsprechend der aktuellen
  Einstellung Ihres Webbrowsers angezeigt.
- **Tastaturkürzel**: öffnet ein Popup mit den verfügbaren
  Tastaturkürzeln. Alternativ können Sie auch [[?]] auf Ihrer Tastatur
  drücken, um es ebenfalls anzuzeigen.
- **Profileinstellungen**: öffnet Ihre Profileinstellungen, wo Sie Ihren
  Avatar, Ihr Passwort, Ihre Benachrichtigungseinstellungen und vieles mehr
  anpassen können, siehe nächster Abschnitt.

## Profil-Einstellungen

![Screenshot zeigt
Benutzerprofil-Einstellungen](/screenshots/cypress/documentation/use/user-profile.cy.js/user-profile-settings-full.png)

### Aussehen

Ändern Sie das Aussehen von Zammad. Verfügbare Optionen:

- Dunkler Modus
- Hell
- Automatischer Modus

Die letzte Option versucht, die Einstellungen Ihres Browsers zu erkennen. Es
hängt von Ihrem Webbrowser ab, ob dies funktioniert.

::: tip
Wenn Sie schnell zwischen dunklem und hellem Modus umschalten möchten, können Sie auch die Umschaltfunktion im
[Avatar-Menü](#avatar-menu) oder das Tastaturkürzel [[d]] verwenden.
:::

### Sprache

Wählen Sie die Sprache, in der die Benutzeroberfläche von Zammad angezeigt
wird.

### Avatar

Passen Sie Ihr Avatarbild an. Standardmäßig werden die Initialen Ihres
Benutzers vor einem farbigen Hintergrund angezeigt. Wenn Sie ein Bild
hinzufügen möchten, laden Sie einfach eines hoch oder verwenden Sie Ihre
Kamera, falls Sie eine haben.

Nachdem Sie ein Bild aufgenommen oder hochgeladen haben, können Sie es
zuschneiden. Werfen Sie einen Blick auf die Vorschau oben im rechten
Seitenmenü.

### Abwesenheit

Definieren Sie Abwesenheitszeiten (z.B. für Ihren Urlaub) und bestimmen Sie
einen Vertreter, der Ihre Tickets während Ihrer Abwesenheit bearbeitet.

Ihre ausgewählte Vertretung erhält während Ihrer Abwesenheit
Benachrichtigungen für neue Tickets und Änderungen an bestehenden
Tickets. Außerdem stehen diesem Agenten Ihre benutzerdefinierten Übersichten
zur Verfügung, damit er den Überblick über Ihre Tickets behält. Sie erhalten
auch Benachrichtigungen, wenn Sie abwesend sind.

### Passwort

Ändern Sie das Passwort für Ihr Konto. Um es zu aktualisieren, geben Sie Ihr
altes Passwort und das neue Passwort ein und bestätigen Sie das neue, indem
Sie es wiederholen.

### Zwei-Faktor-Authentifizierung

Richten Sie eine Zwei-Faktor-Authentifizierung (2FA) ein, um die Sicherheit
Ihres Kontos zu erhöhen. Ihr Administrator muss mindestens eine 2FA-Methode
aktiviert haben. Die Verwendung einer 2FA-Methode kann sogar von Ihrem
Administrator erzwungen werden.

Nachdem Sie die [2FA-Anleitung](./guides/two-factor-auth) befolgt haben,
müssen Sie beim nächsten Login Ihren zweiten Faktor angeben. Wenn Sie Ihre
konfigurierte 2FA-Methode nicht angeben können, wenden Sie sich an Ihren
Administrator, der sie zurücksetzen kann.

### Geräte

Hier finden Sie eine Liste aller Geräte, auf denen Ihr Zammad Konto
angemeldet ist. Falls nötig, können Sie den Zugriff widerrufen, indem Sie
auf das Löschsymbol in der Spalte "Aktionen" klicken. Dies beendet die
Sitzung und verlangt eine neue Anmeldung auf dem Gerät.

### Token-Zugriff

Generieren Sie einen persönlichen Zugangs-Token für eine Anwendung eines
Drittanbieters für den Zugriff auf die Zammad API. Nachdem Sie auf die
Schaltfläche `Neuer persönlicher Zugangs-Token` geklickt haben, können Sie
einen Namen und ein Ablaufdatum festlegen und die Berechtigungen für diesen
Token konfigurieren.

Nachdem Sie das Token erstellt haben, wird es nur einmal in einem Dialogfeld
angezeigt. Achten Sie darauf, es zu kopieren, da es keine Möglichkeit gibt,
es erneut anzuzeigen.

![Screenshot zeigt Seitenmenü mit erstelltem Token und
Kopierschaltfläche](/screenshots/cypress/documentation/use/user-profile.cy.js/token-dialog.png)

### Benachrichtigungen

Passen Sie die Benachrichtigungen an, die Sie erhalten. Sie können
einstellen:

- Für welche Ticket-Aktionen Sie benachrichtigt werden (z.B. für neue
  Tickets, für eskalierte Tickets)
- Für welches Ticket Sie benachrichtigt werden basierend auf dessen
  Zuweisung und Ihrer Beziehung dazu (z.B. nur Ihre eigenen, nicht
  zugewiesene Tickets, abonnierte Tickets)
- Auf welchem Weg Sie benachrichtigt werden (nur im Browser oder zusätzlich
  per E-Mail)
- Für in welcher Gruppe befindliche Tickets Sie benachrichtigt werden

Außerdem können Sie einen Benachrichtigungston auswählen oder ihn
deaktivieren.

::: tip
Um auf Ihrem Betriebssystem per Ton und Benachrichtigung benachrichtigt zu werden, müssen Sie Zammad erlauben, Ihnen Benachrichtigungen zu senden.
Diese Berechtigung wird angefordert, wenn Zammad das erste Mal versucht, Ihnen eine Benachrichtigung zu senden.

Falls Sie diese Berechtigung abgelehnt haben und es jetzt erlauben wollen, suchen Sie nach einem Symbol in der Adressleiste, wo Sie die Berechtigungen der
Seite anpassen können. Es hängt von Ihrem Webbrowser ab, wie das genau funktioniert. Wenn Sie es nicht finden können, suchen Sie im Internet danach oder werfen Sie
einen Blick in die Einstellungen Ihres Browsers.
:::

::: info
Notifications you have already read are removed from the list automatically. Ones you marked as read yourself disappear
after about ten minutes. Ones Zammad marked as read for you - which happens when someone else changes the state of the
ticket the notification belongs to - remain for about eight hours. Independently of this, no notification is kept for
longer than nine months.

The clean-up runs every two hours, so a notification can stay visible somewhat longer than the times given above.
:::

### Übersichten

Ändern Sie die Reihenfolge der Übersichten für Ihr Konto. Ziehen Sie sie
einfach per Drag & Drop, indem Sie auf die Griffe auf der linken Seite
klicken. Falls Ihr Administrator die Reihenfolge ändert, bleibt Ihre
individuelle Reihenfolge erhalten. Sie können zur Reihenfolge Ihres
Administrators zurückkehren, indem Sie auf die Schaltfläche `Reihenfolge der
Übersichten zurücksetzen` klicken.

### Kalender

Zammad ermöglicht es Ihnen, einen Kalender-Feed (ical) zu abonnieren, um
Tickets in Ihrer bevorzugten Kalenderanwendung zu sehen.  Verwenden Sie
entweder die obere **Kombinierte Abonnement-URL**, um alle Tickets zu
abonnieren, oder die untere **URL für Direktabonnement**.  Wenn Sie
Letzteres wählen, können Sie anhand des Status und des Zuweisungsstatus
festlegen, welche Tickets Sie einbeziehen möchten.
