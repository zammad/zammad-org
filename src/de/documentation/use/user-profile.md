---
order: 7
title: Benutzerprofil
---

# Benutzerprofil

Adjust your account and personal settings in your user profile. Some of the
options may not be available, depending on how your system is configured and
your permissions. Open it from the avatar menu in the sidebar. Read on for
more details.

## Avatar-Menü

To open the avatar menu, click on your avatar icon in the bottom left corner
in the sidebar. This icon either shows your initials or a profile picture.

![Screenshot shows user detail
panel](/screenshots/cypress/user-profile.cy.js/avatar-menu.png)

The menu contains the following entries:

- **Link(s) to documentation**: depending on your roles you can see one or
  more documentation links.
- **Appearance**: switch between dark, light and automatic mode. The
  automatic mode displays Zammad according to your web browser's current
  preference.
- **Keyboard shortcuts**: opens a popup with the available keyboard
  shortcuts. Alternatively, press [[?]] on your keyboard to show it too.
- **Profileinstellungen**: öffnet Ihre Profileinstellungen, wo Sie Ihren
  Avatar, Ihr Passwort, Ihre Benachrichtigungseinstellungen und vieles mehr
  anpassen können, siehe nächster Abschnitt.

## Profil-Einstellungen

![Screenshot zeigt
Benutzerprofil-Einstellungen](/screenshots/cypress/user-profile.cy.js/user-profile-settings-full.png)

### Aussehen

Ändern Sie das Aussehen von Zammad. Verfügbare Optionen:

- Dunkler Modus
- Hell
- Automatic mode

The last option tries to detect your browser's preference. It depends on
your web browser if it works.

::: tip
If you want to switch quickly between dark and light mode, you can also use the toggle in the
[avatar menu](#avatar-menu) or use the keyboard shortcut by simply pressing [[d]].
:::

### Sprache

Choose the language in which Zammad's UI is displayed.

### Avatar

Adjust your avatar image. By default, the initials of your user are
displayed on a colored background. If you want to add an image, simply
upload one or use your camera, if you have one.

Nachdem Sie ein Bild aufgenommen oder hochgeladen haben, können Sie es
zuschneiden. Werfen Sie einen Blick auf die Vorschau oben im rechten
Seiten-Panel.

### Abwesenheit

Define absence periods (e.g. for your vacation) and designate a substitute
to handle your tickets while you are away.

Your designated substitute will receive updates on new tickets and changes
to existing ones while you're away.  Additionally, your custom overviews are
available for this agent to keep track of your tickets. You receive
notifications while you are absent, too.

### Passwort

Change the password of your account. To update it, provide your old
password, the new password and confirm the new one by typing it again.

### Zwei-Faktor-Authentifizierung

Richten Sie eine Zwei-Faktor-Authentifizierung (2FA) ein, um die Sicherheit
Ihres Kontos zu erhöhen. Ihr Administrator muss mindestens eine 2FA-Methode
aktiviert haben. Die Verwendung einer 2FA-Methode kann sogar von Ihrem
Administrator erzwungen werden.

After following the [2FA guide](./guides/two-factor-auth), you have to
provide your second factor at the next login.  If you can't provide your
configured 2FA method, contact your admin to reset it.

### Geräte

Here you can find a list of all devices logged into your Zammad account. If
necessary, you can revoke the access by clicking the delete icon in the
"Actions" column. This ends the session on this device and requires a new
login on this device.

### Token-Zugriff

Generieren Sie einen persönlichen Zugangs-Token für eine Anwendung eines
Drittanbieters für den Zugriff auf die Zammad API. Nachdem Sie auf die
Schaltfläche `Neuer persönlicher Zugangs-Token` geklickt haben, können Sie
einen Namen und ein Ablaufdatum festlegen und die Berechtigungen für diesen
Token konfigurieren.

Nachdem Sie das Token erstellt haben, wird es nur einmal in einem Dialogfeld
angezeigt. Achten Sie darauf, es zu kopieren, da es keine Möglichkeit gibt,
es erneut anzuzeigen.

![Screenshot zeigt Seiten-Panel mit erstelltem Token und
Kopierschaltfläche](/screenshots/cypress/user-profile.cy.js/token-dialog.png)

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

Additionally, you can select a notification sound or disable it.

::: tip
To get notified via sound and notification on your operating system, you have to allow Zammad to send you notifications.
This is requested when Zammad tries to send you a notification the first time.

If you refused it and want to allow it now, look for an icon in the address bar where you can adjust the permissions of
the site. It depends on your web browser, how to do it exactly. If you can't find it, search for it in the web or have
a look at your browser's settings.
:::

### Übersichten

Change the order of overviews for your account. Simply drag & drop them by
clicking the handles on the left side.  If your admin changes the order,
your custom order remains. You can switch back to your admin's order by
clicking the `Reset Overview Order` button.

### Kalender

Zammad allows you to subscribe to a calendar feed (ical) to see tickets in
your favorite calendar application.  Use either the upper **Combined
subscription URL** to subscribe to all tickets or the lower **Direct
subscription URL**.  By choosing the latter, you can define which tickets
based on ticket you want to include based on the state and assignment
status.
