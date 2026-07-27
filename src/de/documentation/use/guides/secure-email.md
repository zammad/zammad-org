---
order: 3
title: 'Secure email'
---

# Secure email

Zammad unterstützt zwei Systeme für sichere E-Mail-Kommunikation:

- **PGP** (Pretty Good Privacy)
- **S/MIME** (Secure/Multipurpose Internet Mail Extensions)

Mit beiden Systemen können Sie **signierte** und **verschlüsselte**
Nachrichten mit anderen austauschen.

## Voraussetzungen

- Beide Funktionen sind optional. Wenn die Schaltflächen `Verschlüsseln` und
  `Signieren` im E-Mail-Artikel-Editor nicht angezeigt werden, hat Ihr
  Administrator diese noch nicht aktiviert.
- PGP und S/MIME funktionieren nur, wenn Kommunikationspartner das
  entsprechende Verfahren ebenfalls nutzen.
- Ihr Administrator ist dafür verantwortlich, alle erforderlichen
  Zertifikate und Schlüssel in den Einstellungen von Zammad hinzuzufügen.

Sind diese Voraussetzungen erfüllt, sollte die Funktion sofort einsatzbereit
sein, und Zammad führt die Verschlüsselung, Entschlüsselung, Signierung und
Signaturprüfung von E-Mails durch, sofern dies möglich ist. Ihr
Administrator kann für jede Gruppe ein Standardverhalten festlegen. Sie
können die Standardeinstellung jedoch für jeden ausgehenden E-Mail-Artikel
individuell überschreiben, indem Sie die Verschlüsselung und Signierung
aktivieren oder deaktivieren (siehe Beispiel im Screenshot unten mit
deaktivierter Verschlüsselung und aktivierter Signierung). Lesen Sie weiter,
um mehr darüber zu erfahren und häufige Fehler zu erkennen.

![Screenshot zeigt ausgehende Email, die nur signiert und nicht
verschlüsselt
wird](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signing-only.png)

## Signing & encryption

Signatur
: Eine Signatur ist ein Nachweis dafür, dass eine Nachricht auf ihrem Weg nicht manipuliert wurde. Sie gewährleistet die **Integrität**
  sowie die **Authentizität** der Nachricht.

Verschlüsselung
: Bei der Verschlüsselung wird eine Nachricht so unleserlich gemacht, dass sie nur vom vorgesehenen Empfänger wieder entschlüsselt werden kann. Sie gewährleistet die **Vertraulichkeit**
  sowie den **Datenschutz** der Nachricht .

## Incoming email

Das Schloss- und Haken-Symbol oben in einer Nachricht zeigen den Status der
Verschlüsselung und der Signatur an. Klicken Sie auf einen eingehenden
Artikel, um dessen Details anzuzeigen. In den Details können Sie den
Mauszeiger über den Sicherheitsstatus bewegen, um weitere Informationen
anzuzeigen.

![Screenshot zeigt Verschlüsselungs- und Signatur-Icons in einem eingehenden
E-Mail-Artikel](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-incoming-article.png)

### Status icons for incoming emails

| Symbol | Bedeutung |
|---|---|
| ![Symbol "Verschlüsselt"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-encrypted.png) | **Für Sie verschlüsselt.** Selbst wenn die E-Mail von einem Dritten abgefangen wird, kann dieser sie nicht lesen. |
| ![Symbol "Nicht verschlüsselt"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-encrypted.png) | **Kann nicht entschlüsselt werden.** Zammad verfügt nicht über den erforderlichen Schlüssel, um diese Nachricht zu entschlüsseln. |
| ![Symbol "Signiert"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signed.png) | **Erfolgreich verifiziert.** Sie können sicher sein, dass die E-Mail authentisch ist und der Inhalt nicht verändert wurde. |
| ![Symbol "Nicht signiert"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-signed.png) | **Die Signaturüberprüfung ist fehlgeschlagen.** Bewegen Sie den Mauszeiger über das Symbol, um weitere Informationen zu erhalten. |

## Outgoing email

Verwenden Sie die Schaltflächen `Verschlüsseln` und `Signieren`, um die
Verschlüsselung und Signatur für ausgehende E-Mails zu aktivieren. Diese
Optionen stehen für neue Tickets und Antworten zur Verfügung. Bewegen Sie
den Mauszeiger über die Schaltflächen, um Details anzuzeigen.

![Screenshot zeigt Verschlüsseln- und Signieren-Schaltflächen im
Email-Artikel-Editor](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-outgoing-article.png)

::: info
Ausgehende E-Mails können nur für einen einzelnen Empfänger verschlüsselt werden.
:::

### Status icons for outgoing emails

| Symbol | Bedeutung |
|---|---|
| ![Symbol "Verschlüsselt"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-encrypted.png) | **Wird durch Verschlüsselung geschützt.** Selbst wenn die E-Mail von einem Dritten abgefangen wird, kann dieser den Inhalt nicht lesen. |
| ![Symbol "Nicht verschlüsselt"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-encrypted.png) | **Wird nicht verschlüsselt.** |
| ![Symbol "Signiert"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-signed.png) | **Wird signiert.** Die Empfänger können überprüfen, ob die E-Mail tatsächlich von Ihnen stammt und ob der Inhalt nicht verändert wurde. |
| ![Symbol "Nicht signiert"](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-not-signed.png) | **Wird nicht signiert.** |

## Fehlerbehebung

### Signieren: Zertifikat für Validierung nicht auffindbar

![Screenshot zeigt Banner mit einer Sicherheits-Warnung für einen
Artikel](/screenshots/cypress/documentation/use/guide-secure-email.cy.js/secure-email-error-banner.png)

Ohne das Zertifikat des Absenders kann Zammad die Signatur der Nachricht
nicht überprüfen. Bitten Sie Ihren Administrator, das Zertifikat des
Absenders zum Zertifikatsspeicher von Zammad hinzuzufügen.

::: warning
Überprüfen Sie Zertifikate stets persönlich oder telefonisch! Der Sinn der Signaturprüfung besteht darin, Sie zu warnen,
falls jemand versucht, sich als eine andere Person auszugeben. Akzeptieren Sie niemals ein Zertifikat von einer Person im Internet,
ohne es zuvor zu überprüfen.
:::

### Verschlüsselung: Kann keinen privaten Schlüssel zum Entschlüsseln finden

Diese Nachricht wurde mit einem Zertifikat verschlüsselt, das mit keinem in
der Datenbank gespeicherten Zertifikat übereinstimmt. Ohne einen passenden
privaten Schlüssel kann Zammad die Nachricht nicht entschlüsseln. Bitten Sie
Ihren Administrator, den privaten Schlüssel Ihrer Organisation im
Zertifikatsspeicher von Zammad zu überprüfen, und bitten Sie den Absender,
den öffentlichen Schlüssel, den er zur Verschlüsselung der Nachricht
verwendet hat, noch einmal zu überprüfen.

### Die `Verschlüsseln`-Schaltfläche ist deaktiviert

Bitten Sie Ihren Administrator, das Zertifikat des Empfängers zum
Zertifikatsspeicher von Zammad hinzuzufügen.

### Die `Signieren`-Schaltfläche ist deaktiviert

Bitten Sie Ihren Administrator, den privaten Schlüssel Ihrer Organisation im
Zertifikatsspeicher von Zammad zu überprüfen.

### Multiple security types configured

Möglicherweise werden Ihnen die Schaltflächen `PGP` und `S/MIME`
angezeigt. Dies ist der Fall, wenn beide Optionen in Ihrem System
konfiguriert sind und ein Kunde ebenfalls beide nutzt. In diesem Fall steht
Ihnen eine zusätzliche Schaltfläche zur Verfügung, mit der Sie zwischen den
Sicherheitstypen PGP und S/MIME wechseln können. Wählen Sie einfach eine
Option aus, stellen Sie sicher, dass die Verschlüsselung und Signierung
aktiviert sind und versenden Sie Ihre E-Mail.
