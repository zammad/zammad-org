---
order: 1
title: 'Erste Schritte in Zammad'
---

# Erste Schritte in Zammad

Herzlichen Glückwunsch, es scheint, als hätten Sie Zammad erfolgreich
installiert. Um mit dem frisch installierten Zammad zu beginnen, springen
Sie zum nächsten Abschnitt. Alternativ haben Sie folgende Möglichkeiten:

- [Migrieren von einem anderen unterstützten
  Ticket-System](/de/tutorials/migrate)
- [Zammad aus einer vorhandenen Sicherung
  wiederherstellen](/de/tutorials/backup-restore)

## Einrichtungsassistent

Wenn Sie die Webseite von Zammad zum ersten Mal besuchen, werden Sie von
seinem Einrichtungsassistenten begrüßt. Er wird Sie durch die ersten
wichtigen Schritte führen.

### Schritt 1: Erstellen Ihres ersten Administratorkontos

Geben Sie die erforderlichen Informationen im Dialogfeld an. Ihre E-Mail
Adresse und Ihr Passwort sind wichtig. Dies sind Ihre Zugangsdaten für die
Anmeldung.

Zammad wendet standardmäßig die folgende Passwort-Richtlinie an:

- 10 Zeichen oder mehr
- Mindestens 2 GROSSE und 2 kleine Buchstaben
- Eine oder mehrere Ziffern

### Schritt 2: Firmeninformationen hinterlegen

Sie können hier ein individuelles Logo Ihrer Firma hochladen. Die
Instanzadresse wird automatisch erkannt und muss nur dann angepasst werden,
falls sie falsch ist. Wenn Sie den Dialog überspringen, können Sie die
Anpassung auch später vornehmen.

### Schritt 3: E-Mail-Benachrichtigungskanal

Standardmäßig verwendet Zammad sendmail. Dies kann hier auf SMTP geändert
werden.

Zammad verwendet standardmäßig ``noreply@<Ihre-fqdn>`` als Absenderadresse. Die SMTP-Einrichtung
kann hier fehlschlagen - Sie können diesen Schritt mit der Auswahl von sendmail überspringen und später anpassen!

### Schritt 4: Ihr erster E-Mail-Kanal <Badge type="info" text="optional" />

Wenn Sie sofort loslegen wollen, können Sie Ihr E-Mail Konto bereits
verbinden.

:::danger
Standardmäßig reagiert Zammad auf abgeholte E-Mails (z.B. löscht sie und sendet
automatisch generierte Antworten). Wenn Sie das nicht wollen, überspringen Sie diesen Schritt
fürs Erste.
:::

Nach Beendigung des Assistenten sind Sie automatisch mit dem gerade
erstellten Konto angemeldet.

## Nächste Schritte

Die folgende Liste sollte Ihnen helfen, den richtigen Weg zu finden. Sie
sollten sie jedoch an Ihre Bedürfnisse anpassen. Weitere Informationen
finden Sie in dieser Dokumentation.

- Konfigurieren Sie die benötigten Gruppen
- Trigger nach Bedarf anpassen
- Postmaster-Filter hinzufügen, falls erforderlich
- Konfigurieren Sie bei Bedarf SLAs
- E-Mail-/Social-Media-Kanäle und Signaturen hinzufügen
- Gehen Sie zurück zu den Gruppeneinstellungen, um ausgehende
  E-Mail-Adressen hinzuzufügen
- Textbausteine hinzufügen
- Organisationen hinzufügen
- Konfigurieren Sie bei Bedarf Rollen
- Erwägen Sie Logins per Drittanbieter oder eine LDAP-Integration für
  einfachere Logins
- Konten für Agenten hinzufügen
- Erwägen Sie Backup-Strategien für Zammad

:::tip Are you still lost?

Wenn Sie Hilfe brauchen oder schneller produktiv sein wollen, können Sie auch
Workshops mit einem unserer
[Zammad-Berater](https://zammad.com/de/company/contact) buchen.
:::