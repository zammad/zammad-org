---
order: 3
title: Zwei-Faktor-Authentifizierung
---

# Einführung

Die Zwei-Faktor-Authentifizierung (2FA) erweitert die Sicherheit Ihres
Zammad-Kontos, indem eine zusätzliche Prüfung neben Ihrem Passwort
erforderlich ist. Sie müssen über zwei verschiedene Komponenten verfügen, um
sicherzustellen, dass Sie berechtigt sind, auf das Konto
zuzugreifen. Typischerweise ist das etwas, was Sie wissen (wie ein Passwort)
und etwas, das Sie besitzen (wie ein Mobilgerät oder ein Security-Token).

Two-Factor Authentication is an **optional feature**. Administrators must
activate it to be visible in your profile settings. The 2FA usage may be
even enforced by your admin. In this case, you can't use Zammad unless you
set up at least one 2FA method.

## Einrichtung

If the system admin has enabled this feature, you can head to _Avatar > Profile > Two-factor Authentication_ to set it
up. Depending on the enabled two-factor methods, you may see one or more options in the table.

Um eine Zwei-Faktor-Methode einzurichten, verwenden Sie das
Schraubenschlüssel-Symbol und befolgen Sie die Schritte.

![Screenshot zeigt 2FA-Methoden in den Einstellungen des
Benutzerprofils](/screenshots/cypress/usage-guide-2fa.cy.js/2FA-methods-profile.png)

In einem Dialogfenster werden Sie aufgefordert, Ihr aktuelles Passwort zu
bestätigen.

Depending on the chosen two-factor method, you will be guided through the
setup process, which includes specific steps.  Continue with using an
[Authentication App](#authentication-app) or a [Security
Key](#security-key).

### Authentifizierungs-App

Die Authentifizierungs-App ist eine Methode der
Zwei-Faktor-Authentifizierung, bei der eine mobile App
("Authentifizierungs-App") Einmal-Codes generiert, die beim Anmelden geprüft
werden. Nachdem Sie eine Authentifizierungs-App auf Ihrem Gerät eingerichtet
haben, können Sie diese mit Ihrem Zammad-Konto verknüpfen.

![Screenshot zeigt die Konfiguration der
Authentifizierungs-App](/screenshots/two-factor-auth-usage/2fa-app-setup.png)

Stellen Sie bitte zunächst sicher, dass Sie eine Authentifizierungs-App auf
Ihrem Mobilgerät installiert haben. Empfohlene Apps sind:

- [Aegis
  Authenticator](https://play.google.com/store/apps/details?id=com.beemdevelopment.aegis&hl=de)
  (nur Android)
- [Google Authenticator](https://support.google.com/accounts/answer/1066447)
- [Authy](https://support.authy.com/hc/en-us/articles/115001945848-Installing-Authy-apps/)
- [Microsoft
  Authenticator](https://support.microsoft.com/de-de/account-billing/download-and-install-the-microsoft-authenticator-app-351498fc-850a-45da-b7b6-27e523b8702a)

Öffnen Sie die Authentifizierungs-App auf Ihrem Mobilgerät und wählen Sie
die Funktion **QR-Code scannen** (oder ähnlich bezeichnet). Richten Sie dann
die Kamera auf den Bildschirm und scannen den angezeigten QR-Code.

::: tip
If your device is not able to scan the QR code, first click on it to reveal your secret. Next, add a manual entry to
your authenticator app and enter the provided secret when asked.
:::

Ihre Authentifizierungs-App sollte sofort den neuen Eintrag für Ihr
Zammad-Konto angelegt haben und einen 6-stelligen Code mit einem Timer
anzeigen.

Back in Zammad, enter the provided code to the **Security Code** field and
click on **Set Up**. Go on either by setting up another 2FA method
([security key](#security-key)) or check how to [log in with 2FA](#sign-in).

### Sicherheits-Schlüssel

The security keys method is a type of a two-factor authentication that uses
Web Authentication API in the browser for verifying your identity. You may
register multiple hardware or software security keys with your Zammad
account and then they can be used during the sign-in process.

Zunächst wird Ihnen ein leeres Seiten-Panel angezeigt, in dem Sie
aufgefordert werden, das **Einrichten** Ihres ersten Schlüssel zu starten.

![Screenshots zeigt die Konfiguration der
Sicherheits-Schlüssel-Authentifizierung](/screenshots/two-factor-auth-usage/2fa-security-key-panel.png)

Geben Sie als erstes einen **Name für diesen Sicherheitsschlüssel** im
entsprechenden Feld ein, damit Sie diesen später in einer Übersicht
identifizieren können. Klicken Sie anschließend auf **Weiter**.

Abhängig von Ihrem Browser können Ihnen verschiedene Optionen angeboten
werden. Wählen Sie die, die der Ihres angegebenen Sicherheits-Schlüssels
entspricht und folgen den weiteren Anweisungen.

![Screenshot zeigt die Konfiguration der
Sicherheits-Schlüssel-Authentifizierung](/screenshots/two-factor-auth-usage/2fa-passkey-auth.png)

Ihr Browser bittet Sie daraufhin, mit Ihrem Sicherheitsschlüssel oder Gerät
zu interagieren (z.B. PIN-Eingabe zur Entsperrung), um zu prüfen, ob Sie in
physischem Besitz des Geräts sind.

::: warning
You will have limited time (measured in tens of seconds) to register your key. Better to have it ready before you
proceed!
:::

Wenn die Registrierung erfolgreich war, wird der Dialog geschlossen und Sie
können loslegen. Im Falle von Fehlern können Sie die Registrierung des
Schlüssels **wiederholen**.

Sobald Sie Sicherheits-Schlüssel eingerichtet haben, können Sie diese über
die **Bearbeiten** Funktion neben der Zwei-Faktor-Methode verwalten.

You have an option to remove a key or set up additional ones. There is no
limit in number of security keys you can set up, but keep in mind you cannot
register an already registered key for your account. Removal of the last
security key will effectively remove the complete security keys method for
your account.

## Anmelden

Wenn Sie die Zwei-Faktor-Authentifizierung für Ihr Zammad Konto einrichten,
werden Sie bei der nächsten Anmeldung aufgefordert, nach der Eingabe des
korrekten Benutzernamens und Passworts die gleiche Zwei-Faktor-Methode
anzugeben. Je nach gewählter Zwei-Faktor-Methode kann dies ein
Sicherheits-Code, ein Hardware-Schlüssel, etc. sein.

Sollten Sie bei der Anmeldung Probleme mit Ihrer bevorzugten
Zwei-Faktor-Authentifizierungsmethode haben, können Sie zu einer anderen
Methode wechseln, sofern Sie diese zuvor eingerichtet haben.

Suchen Sie nach dem Link **Eine andere Methode verwenden** unterhalb des
Anmeldefeldes. Falls Sie diesen Link nicht sehen, haben Sie vermutlich keine
andere Zwei-Faktor-Methode eingerichtet oder Ihr Administrator hat diese
Funktion deaktiviert.

![Anmeldebildschirm mit Link zu "Versuchen Sie eine andere
Methode"](/screenshots/two-factor-auth-usage/2fa-link-another-method.png)

Alternativ können Sie auch einen Ihrer Wiederherstellungscodes verwenden,
die bei der Ersteinrichtung der Zwei-Faktor-Authentifizierung automatisch
für Ihr Konto generiert werden. Klicken Sie auf **Oder verwenden Sie einen
Ihrer Wiederherstellungs-Codes.**, geben Sie einen Ihrer nicht verwendeten
Codes ein und klicken Sie auf **Anmelden**.

![Anmelde-Screen mit Link zur Nutzung von
Wiederherstellungs-Codes](/screenshots/two-factor-auth-usage/2fa-login-recovery-codes.png)

::: warning
You can use a single recovery code only once! In case you exhaust the list of your recovery codes, it is recommended
you regenerate them for your account.
:::

## Wiederherstellungs-Codes erzeugen

Recovery codes are one-time use security codes that can be used to sign in
if you lose access to your other two-factor authentication methods. They can
only be used as a **backup method**.

Falls die Funktion von Ihrem Administrator aktiviert wurde, werden die
Wiederherstellungs-Codes automatisch bei der Einrichtung einer
Zwei-Faktor-Methode generiert.

Sie werden gebeten, die Wiederherstellungs-Codes zu speichern oder zu
drucken und an einem sicheren Ort aufzubewahren. Ein bereits genutzter
Wiederherstellungs-Code kann nicht mehr genutzt werden.

![Screenshot zeigt die Ausgabe von Wiederherstellungs-Codes während der
2FA-Einrichtung](/screenshots/two-factor-auth-usage/2fa-app-setup-recovery-codes.png)

Sie haben auch die Möglichkeit, Ihre Wiederherstellungs-Codes jederzeit neu
zu generieren, wodurch bereits vorhandene Wiederherstellungs-Codes ungültig
werden und Sie eine Liste mit neuen Codes erhalten. Sie können dies tun,
indem Sie in den 2FA-Einstellungen Ihres Profils auf die Schaltfläche
**Wiederherstellungs-Codes neu erzeugen** klicken.

## Festlegen einer Standard-2FA-Methode

Um eine bereits eingerichtete Zwei-Faktor-Methode als Standard einzustellen,
verwenden Sie das Menü ⋮ **Aktionen** neben der Methode in den
2FA-Einstellungen Ihres Profils und wählen Sie **Als Standard festlegen**.

Ein kleines, blaues Label ("Standard") zeigt Ihnen an, welche Methode für
Ihr Konto als Standard festgelegt ist.

![Screenshot zeigt Liste der 2FA-Methoden und
Standardmethode](/screenshots/two-factor-auth-usage/2fa-profile-overview.png)

Die Standard Zwei-Faktor-Methode bedeutet, dass dies Ihre bevorzugte Methode
beim Anmelden ist. Sie können beim Anmelden immer auf eine andere Methode
wechseln.

## Bearbeiten einer 2FA-Methode

![Screenshot zeigt die Ausgabe von Wiederherstellungscodes während der
2FA-Einrichtung](/screenshots/two-factor-auth-usage/2fa-profile-overview-action.png)

Um eine bereits eingerichtete Zwei-Faktor-Methode zu bearbeiten, verwenden
Sie das Menü ⋮ **Aktionen** neben der Methode und wählen Sie
**Bearbeiten**. In einem Dialog werden Sie aufgefordert, Ihr aktuelles
Passwort zu bestätigen.

Sie werden abhängig von der gewählten Zwei-Faktor-Methode nochmal durch den
Einrichtungs-Prozess geführt. Im Normalfall ersetzt eine bearbeitete Methode
die bisherige Konfiguration, aber manche Methoden unterstützen erweiterte
Funktionen (z.B. mehrere Sicherheits-Schlüssel).

## Entfernen einer 2FA-Methode

Um eine bereits eingerichtete Zwei-Faktor-Methode zu entfernen, verwenden
Sie das Menü ⋮ **Aktionen** neben der Methode und wählen Sie
**Entfernen**. In einem Dialog werden Sie aufgefordert, die Entfernung mit
Ihrem aktuellen Passwort zu bestätigen.
