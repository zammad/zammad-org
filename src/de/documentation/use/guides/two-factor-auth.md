---
order: 9
title: Zwei-Faktor-Authentifizierung
---

# Zwei-Faktor-Authentifizierung

Die Zwei-Faktor-Authentifizierung (2FA) erweitert die Sicherheit Ihres
Zammad-Kontos, indem eine zusätzliche Prüfung neben Ihrem Passwort
erforderlich ist. Sie müssen über zwei verschiedene Komponenten verfügen, um
sicherzustellen, dass Sie berechtigt sind, auf das Konto
zuzugreifen. Typischerweise ist das etwas, was Sie wissen (wie ein Passwort)
und etwas, das Sie besitzen (wie ein Mobilgerät oder ein Security-Token).

Die Zwei-Faktor-Authentifizierung ist eine **optionale
Funktion**. Administratoren müssen sie aktivieren, damit sie in Ihren
Profileinstellungen sichtbar ist. Die 2FA-Verwendung kann sogar von Ihrem
Administrator erzwungen werden. In diesem Fall können Sie Zammad nicht
verwenden, wenn Sie nicht mindestens eine 2FA-Methode eingerichtet haben.

## Einrichtung

Wenn der Systemadministrator diese Funktion aktiviert hat, können Sie sie unter _Avatar > Profil-Einstellungen > Zwei-Faktor-Authentifizierung_
einrichten. Je nach aktivierten Zwei-Faktor-Methoden sehen Sie eine oder mehrere Optionen in der Tabelle.

Um eine Zwei-Faktor-Methode einzurichten, klicken Sie auf die ::+::
Schaltfläche und folgenden Sie den Schritten.

![Screenshot shows 2FA methods in user profile
settings](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-setup.png)

In einem Dialogfenster werden Sie aufgefordert, Ihr aktuelles Passwort zu
bestätigen.

Je nach gewählter Zwei-Faktor-Methode werden Sie durch den
Einrichtungsprozess geführt, der bestimmte Schritte umfasst. Fahren Sie mit
der Verwendung einer [Authentifizierungs-App](#authentifizierungs-app) oder
eines [Sicherheits-Schlüssels](#sicherheits-schlussel) fort.

### Authentifizierungs-App

Die Authentifizierungs-App ist eine Methode der
Zwei-Faktor-Authentifizierung, bei der eine mobile App
("Authentifizierungs-App") Einmal-Codes generiert, die beim Anmelden geprüft
werden. Nachdem Sie eine Authentifizierungs-App auf Ihrem Gerät eingerichtet
haben, können Sie diese mit Ihrem Zammad-Konto verknüpfen.

![Screenshot shows app authentication
configuration](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup.png)

Stellen Sie bitte zunächst sicher, dass Sie eine Authentifizierungs-App auf
Ihrem Mobilgerät installiert haben. Empfohlene Apps sind:

- [Google Authenticator](https://support.google.com/accounts/answer/1066447)
- [Authy](https://support.authy.com/hc/en-us/articles/115001945848-Installing-Authy-apps/)
- [Microsoft
  Authenticator](https://support.microsoft.com/de-de/account-billing/download-and-install-the-microsoft-authenticator-app-351498fc-850a-45da-b7b6-27e523b8702a)

Öffnen Sie die Authentifizierungs-App auf Ihrem Mobilgerät und wählen Sie
die Funktion **QR-Code scannen** (oder ähnlich bezeichnet). Richten Sie dann
die Kamera auf den Bildschirm und scannen den angezeigten QR-Code.

::: tip
Wenn Ihr Gerät nicht in der Lage ist, den QR-Code zu scannen, klicken Sie zunächst darauf, um das Secret anzuzeigen. Fügen Sie dann einen manuellen Eintrag in
Ihrer Authentifizierungs-App hinzu und geben Sie den Code ein, wenn Sie dazu aufgefordert werden.
:::

Ihre Authentifizierungs-App sollte sofort den neuen Eintrag für Ihr
Zammad-Konto angelegt haben und einen 6-stelligen Code mit einem Timer
anzeigen.

Zurück in Zammad, geben Sie den bereitgestellten Code in das Feld
**Sicherheitscode** ein und klicken Sie auf **Einrichten**. Fahren Sie
entweder mit der Einrichtung einer anderen 2FA-Methode fort
([Sicherheits-Schlüssel](#sicherheits-schlussel)) oder lesen Sie, wie man
2FA [bei der Anmeldung verwendet](#anmelden).

### Sicherheits-Schlüssel

Die Zwei-Faktor-Methode mit Sicherheits-Schlüssel nutzt das Web
Authentication API im Browser, um Ihre Identität zu bestätigen. Sie können
mehrere Hardware- oder Software-Sicherheits-Schlüssel in Ihrem Zammad-Konto
hinterlegen und für die Anmeldung nutzen.

Zunächst wird Ihnen ein leeres Seiten-Panel angezeigt, in dem Sie
aufgefordert werden, das **Einrichten** Ihres ersten Schlüssel zu starten.

![Screenshot shows security key authentication
configuration](/screenshots/documentation/use/two-factor-auth-usage/2fa-security-key-panel.png)

Geben Sie als erstes einen **Name für diesen Sicherheitsschlüssel** im
entsprechenden Feld ein, damit Sie diesen später in einer Übersicht
identifizieren können. Klicken Sie anschließend auf **Weiter**.

Abhängig von Ihrem Browser können Ihnen verschiedene Optionen angeboten
werden. Wählen Sie die, die der Ihres angegebenen Sicherheits-Schlüssels
entspricht und folgen den weiteren Anweisungen.

![Screenshot shows security key authentication
configuration](/screenshots/documentation/use/two-factor-auth-usage/2fa-passkey-auth.png)

Ihr Browser bittet Sie daraufhin, mit Ihrem Sicherheitsschlüssel oder Gerät
zu interagieren (z.B. PIN-Eingabe zur Entsperrung), um zu prüfen, ob Sie in
physischem Besitz des Geräts sind.

::: warning
Sie haben begrenzt Zeit (einige zehn Sekunden), um den Sicherheits-Schlüssel als Methode
zu bestätigen. Am besten haben Sie Ihr Gerät einsatzbereit vor sich, bevor Sie loslegen!
:::

Wenn die Registrierung erfolgreich war, wird der Dialog geschlossen und Sie
können loslegen. Im Falle von Fehlern können Sie die Registrierung des
Schlüssels **wiederholen**.

Sobald Sie Sicherheits-Schlüssel eingerichtet haben, können Sie diese über
die **Bearbeiten** Funktion neben der Zwei-Faktor-Methode verwalten.

Sie haben die Möglichkeit, einen Schlüssel zu entfernen oder zusätzliche
Schlüssel einzurichten. Die Anzahl der Sicherheits-Schlüssel, die Sie
einrichten können, ist nicht begrenzt. Beachten Sie jedoch, dass Sie einen
bereits registrierten Schlüssel nicht erneut für Ihr Konto registrieren
können. Wenn Sie den letzten Sicherheits-Schlüssel entfernen, wird die
gesamte Sicherheits-Schlüssel-Methode für Ihr Konto entfernt.

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

![Log in screen with link to "Try another
method"](/screenshots/documentation/use/two-factor-auth-usage/2fa-link-another-method.png)

Alternativ können Sie auch einen Ihrer Wiederherstellungscodes verwenden,
die bei der Ersteinrichtung der Zwei-Faktor-Authentifizierung automatisch
für Ihr Konto generiert werden. Klicken Sie auf **Oder verwenden Sie einen
Ihrer Wiederherstellungs-Codes.**, geben Sie einen Ihrer nicht verwendeten
Codes ein und klicken Sie auf **Anmelden**.

![Log in screen with recovery codes
link](/screenshots/documentation/use/two-factor-auth-usage/2fa-login-recovery-codes.png)

::: warning
Sie können einen einzelnen Wiederherstellungs-Code nur einmal verwenden! Falls Sie alle Codes Ihrer Liste aufgebraucht haben,
können Sie diese in Ihrem Profil neu erstellen.
:::

## Wiederherstellungs-Codes erzeugen

Wiederherstellungs-Codes sind einmalig verwendbare Sicherheitscodes, mit
denen Sie sich anmelden können, wenn Sie den Zugriff auf Ihre anderen
Zwei-Faktor-Authentifizierungsmethoden verlieren. Sie können nur als
**Backup-Methode** verwendet werden.

Falls die Funktion von Ihrem Administrator aktiviert wurde, werden die
Wiederherstellungs-Codes automatisch bei der Einrichtung einer
Zwei-Faktor-Methode generiert.

Sie werden gebeten, die Wiederherstellungs-Codes zu speichern oder zu
drucken und an einem sicheren Ort aufzubewahren. Ein bereits genutzter
Wiederherstellungs-Code kann nicht mehr genutzt werden.

![Screenshot shows output of recovery codes during 2FA
setup](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup-recovery-codes.png)

Sie haben auch die Möglichkeit, Ihre Wiederherstellungs-Codes jederzeit neu
zu generieren, wodurch bereits vorhandene Wiederherstellungs-Codes ungültig
werden und Sie eine Liste mit neuen Codes erhalten. Sie können dies tun,
indem Sie in den 2FA-Einstellungen Ihres Profils auf die Schaltfläche
`Wiederherstellungs-Codes neu erzeugen` klicken.

## Festlegen einer Standard-2FA-Methode

Um eine bereits eingerichtete Zwei-Faktor-Methode als Standard einzustellen,
verwenden Sie das Aktionsmenü ::a:: neben der Methode in den
2FA-Einstellungen Ihres Profils und wählen Sie **Als Standard festlegen**.

Ein kleines, blaues Label ("Standard") zeigt Ihnen an, welche Methode für
Ihr Konto als Standard festgelegt ist.

![Screenshot shows list of 2FA methods and default
method](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-overview.png)

Die Standard Zwei-Faktor-Methode bedeutet, dass dies Ihre bevorzugte Methode
beim Anmelden ist. Sie können beim Anmelden immer auf eine andere Methode
wechseln.

## Bearbeiten einer 2FA-Methode

![Screenshot shows the action menu for an already set up 2FA
method](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-action-menu.png)

Um eine bereits eingerichtete Zwei-Faktor-Methode zu bearbeiten, verwenden
Sie das Menü Aktionsmenü ::a:: neben der Methode und wählen Sie
**Bearbeiten**. In einem Dialog werden Sie aufgefordert, Ihr aktuelles
Passwort zu bestätigen.

Sie werden abhängig von der gewählten Zwei-Faktor-Methode nochmal durch den
Einrichtungs-Prozess geführt. Im Normalfall ersetzt eine bearbeitete Methode
die bisherige Konfiguration, aber manche Methoden unterstützen erweiterte
Funktionen (z.B. mehrere Sicherheits-Schlüssel).

## Entfernen einer 2FA-Methode

Um eine bereits eingerichtete Zwei-Faktor-Methode zu entfernen, verwenden
Sie das Menü Aktionsmenü ::a:: neben der Methode und wählen Sie
**Entfernen**. In einem Dialog werden Sie aufgefordert, die Entfernung mit
Ihrem aktuellen Passwort zu bestätigen.
