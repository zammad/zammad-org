---
order: 7
title: Benutzerprofil
---

# Benutzerprofil verwalten

![Screenshot zeigt
Benutzerprofil-Einstellungen](/screenshots/cypress/user-profile.cy.js/user-profile-settings-full.png)

## Avatar-Menü

In der linken Navigationsleiste finden Sie in der unteren linken Ecke ein
Avatar-Symbol. Dieses Symbol kann Ihr Profilbild oder Ihre Initialen
anzeigen.

Wenn Sie auf dieses Symbol klicken, öffnet sich ein Menü, in dem Sie
verschiedene Dinge finden können:

![Screenshot zeigt
Benutzer-Menü](/screenshots/cypress/user-profile.cy.js/user-menu-popover.png)

- **Aussehen** mit Schalter zum Wechseln zwischen dunklem und hellem Modus
  (oder basierend auf Webbrowser-Einstellung)
- **Tastaturkürzel**: öffnet ein Popup, in dem Sie die verfügbaren
  Tastaturkürzel sehen können. Sie können dieses Popup auch durch Drücken
  der Taste <kbd>?</kbd> auf Ihrer Tastatur öffnen.
- **Profileinstellungen**: öffnet Ihre Profileinstellungen, wo Sie Ihren
  Avatar, Ihr Passwort, Ihre Benachrichtigungseinstellungen und vieles mehr
  anpassen können, siehe nächster Abschnitt.

## Profil-Einstellungen

In Ihren Profileinstellungen können Sie Einstellungen zu Ihrem Konto und
Ihren persönlichen Einstellungen vornehmen. Einige der Optionen stehen Ihnen
möglicherweise nicht zur Verfügung, je nachdem, wie Ihr System konfiguriert
ist und welche Rechte Sie haben.

### Aussehen

Ändern Sie das Aussehen von Zammad. Verfügbare Optionen:

- Dunkel
- Hell
- Mit Computer synchronisieren

Die letzte Option versucht, die Einstellung Ihres Browsers zu erkennen. Ob
das funktioniert hängt von Ihrem Webbrowser ab. Falls nicht können Sie eine
der anderen Optionen wählen.

::: tip
Wenn Sie schnell zwischen dunklem und hellem Modus wechseln möchten, können Sie auch
die Umschaltfunktion im [Avatar-Menü](#avatar-menu) verwenden oder das Tastaturkürzel dafür verwenden, indem Sie
einfach <kbd>d</kbd> drücken.
:::

### Sprache

Wählen Sie Ihre bevorzugte Sprache für Zammad.

### Avatar

In diesem Bereich können Sie Ihr Avatarbild anpassen. Standardmäßig werden
die Initialen Ihres Benutzers vor einem farbigen Hintergrund angezeigt. Wenn
Sie ein Bild hinzufügen möchten, laden Sie einfach eines hoch oder verwenden
Sie Ihre Kamera, wenn Sie eine haben.

Nachdem Sie ein Bild aufgenommen oder hochgeladen haben, können Sie es
zuschneiden. Werfen Sie einen Blick auf die Vorschau oben im rechten
Seiten-Panel.

### Abwesenheit

Definieren Sie Abwesenheitszeiten (z.B. für Ihren Urlaub) und bestimmen Sie
einen Vertreter, der Ihre Tickets während Ihrer Abwesenheit bearbeitet.

Ihre ausgewählte Vertretung erhält während Ihrer Abwesenheit
Benachrichtigungen für neue Tickets und Änderungen an bestehenden
Tickets. Außerdem stehen diesem Agenten Ihre benutzerdefinierten Übersichten
zur Verfügung, damit er den Überblick über Ihre Tickets behält. Sie erhalten
auch Benachrichtigungen, wenn Sie abwesend sind.

### Passwort

Ändern Sie das Passwort für Ihr Konto. Aktualisieren Sie es, indem Sie Ihr
altes Passwort und das neue Passwort eingeben und das neue Passwort durch
erneute Eingabe bestätigen.

### Zwei-Faktor-Authentifizierung

Richten Sie eine Zwei-Faktor-Authentifizierung (2FA) ein, um die Sicherheit
Ihres Kontos zu erhöhen. Ihr Administrator muss mindestens eine 2FA-Methode
aktiviert haben. Die Verwendung einer 2FA-Methode kann sogar von Ihrem
Administrator erzwungen werden.

Nachdem Sie die [2FA-Anleitung] (./guides/two-factor-auth) befolgt haben,
müssen Sie beim nächsten Login Ihren zweiten Faktor angeben. Wenn Sie Ihre
konfigurierte 2FA-Methode nicht angeben können, wenden Sie sich an Ihren
Administrator, der sie zurücksetzen kann.

### Geräte

Hier finden Sie eine Liste aller Geräte, die in Ihrem Zammad Konto
angemeldet sind.  Falls nötig, können Sie den Zugriff widerrufen, indem Sie
auf das Löschsymbol in der Spalte "Aktionen" klicken.

### Token-Zugriff

Generieren Sie einen persönlichen Zugangs-Token für eine Anwendung eines
Drittanbieters für den Zugriff auf die Zammad API. Nachdem Sie auf die
Schaltfläche **Neuer persönlicher Zugangs-Token** geklickt haben, können Sie
einen Namen und ein Ablaufdatum festlegen und die Berechtigungen für diesen
Token konfigurieren.

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

Außerdem können Sie einen Benachrichtigungston auswählen oder den Ton
deaktivieren.

::: tip
Um über Töne und Benachrichtigungen auf Ihrem Betriebssystem benachrichtigt zu werden, müssen Sie
Zammad erlauben, Ihnen Benachrichtigungen zu senden. Dies ist erforderlich, wenn Zammad
Ihnen zum ersten Mal eine Benachrichtigung senden möchte.

Wenn Sie dies abgelehnt haben und es jetzt erlauben wollen, hängt es von Ihrem Browser ab,
wie Sie das umstellen. Normalerweise gibt es ein Symbol in der Adressleiste, mit dem Sie die
Berechtigungen der Website anpassen können.
:::

### Übersichten

Ändern Sie die Reihenfolge der Übersichten für Ihr Konto. Ziehen Sie sie
einfach per Drag & Drop, indem Sie auf die Fläche auf der linken Seite
klicken.

Wenn Ihr Administrator die Reihenfolge ändert, bleibt Ihre individuelle
Reihenfolge erhalten. Sie können zurück zur Reihenfolge Ihres Administrators
wechseln, indem Sie auf die Schaltfläche `Reihenfolge der Übersichten
zurücksetzen` klicken.

### Kalender

Zammad ermöglicht es Ihnen, einen Kalender-Feed (ical) zu abonnieren, um
Tickets in Ihrer bevorzugten Kalenderanwendung zu sehen.

Verwenden Sie entweder die obere "Kombinierte Abonnement-URL", um alle
Tickets zu abonnieren, oder die untere "URL für Direktabonnement". Mit der
letzteren können Sie festlegen, welche Tickets basierend auf Ticketstatus
und -zuweisung Sie einbeziehen möchten.
