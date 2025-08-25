---
order: 13
title: 'Single Sign-on mit Kerberos'
---

# Single Sign-On für Kerberos <Badge type="warning" text="on-premise only"/>

In dieser Anleitung wird beschrieben, wie Sie Single Sign-On mit Microsoft
Active Directory einrichten.

## Konzeptionelle Übersicht

Wie jede andere Webanwendung hat auch Zammad seine eigene Logik, um Benutzer
anzumelden, ihre Passwörter zu speichern, sie zu authentifizieren und ihre
Sitzungen zu verwalten.

Wenn Ihre IT-Abteilung ein eigenes System für Benutzeridentitäten (wie
Active Directory) unterhält, können Sie mit der SSO-Unterstützung von Zammad
dieses bestehende Autorisierungssystem nutzen, so dass jeder, der ein Konto
in Ihrer Firma hat, 1) automatisch ein Konto in Zammad hat und 2) sich mit
einem einzigen Klick anmelden kann.

::: tip
Wenn Sie nicht über diese IT-Infrastruktur verfügen, aber trotzdem eine Ein-Klick
Anmeldung wünschen, können Sie Alternativen wie Github, Google, Facebook und andere nutzen.
:::

## Wie funktioniert das?

Einmal aktiviert, stellt das Single Sign-On Feature einen Endpunkt unter
`https://your.zammad.host/auth/sso` bereit. Wenn der Zammad-Server an diesem
Endpunkt eine GET-Anfrage mit einem gültigen Benutzernamen in **einer der
folgenden** Entitäten erhält, erstellt er eine neue Sitzung für diesen
Benutzer:

- einen `X-Forwarded-User` Request Header
- eine `REMOTE_USER` Webserver Umgebungsvariable
- eine `HTTP_REMOTE_USER` Webserver-Umgebungsvariable

::: info
**Moment, mit SSO ist es möglich, sich nur mit einem Benutzernamen anzumelden?**

Im Prinzip ja.

**Wie kann das richtig sein?**

In dieser Anleitung konfigurieren wir unseren Webserver (Apache) so, dass er alle
Anfragen an den Endpunkt `/auth/sso` abfängt. Anstatt sie an
Zammad weiterzuleiten, initiiert Apache einen dreiseitigen Anmeldeprozess (_Kerberos
Authentifizierung_) zwischen ihm selbst, dem Benutzer und dem Active
Directory-Server.

Wenn Active Directory den Benutzer oder sein Passwort nicht erkennt,
sieht Zammad die Anfrage nie, und die Sitzung wird nie erstellt.

**Was bedeutet das alles?**

Es bedeutet, dass es viele Möglichkeiten gibt, SSO einzurichten - Sie müssen weder
diesem Leitfaden folgen noch Active Directory oder Kerberos verwenden. Aber Sie
sollten unbedingt wissen, was Sie tun. Andernfalls kann leicht eine Sicherheitslücke
entstehen.
:::

## Erste Schritte

::: tip
**Zu beschäftigt, um es selbst zu machen?**

Wir sind für Sie da. Unsere Experten bieten maßgeschneiderte Workshops an, damit
Ihr Team schnell und sicher starten kann. [Schreiben Sie uns einfach eine
Nachricht](https://zammad.com/contact){target=_blank}!
:::

Sie benötigen:

- eine Microsoft Active Directory-Umgebung mit
  - Root-Zugang
  - Unterstützung für AES 256-bit Verschlüsselung
- einen Zammad-Host mit
  - Root-Zugang
  - einem vollständigen Domänennamen (FQDN)
- gewisse Kenntnisse in der Systemverwaltung (z.B. Apache-Konfiguration)

Am besten richten Sie auch eine LDAP-Integration ein, um sicherzustellen,
dass Ihre Active Directory- und Zammad-Benutzerkonten immer synchronisiert sind. Sie
finden Sie in der Verwaltungsoberfläche von Zammad unter
_Einstellungen > Sicherheit > Anwendungen von Drittanbietern_.

## Schritt 1: Konfigurieren Sie Active Directory

Im Kerberos-Authentifizierungsschema muss der **Authentifizierungsserver**
(Active Directory) gemeinsame Geheimnisse mit dem **Service** (Zammad)
verwalten. Um dies zu ermöglichen, müssen wir einen **service principal
name** (SPN) für Zammad im Active Directory registrieren.

:::info
Diese Anweisungen wurden für Windows Server 2016 bestätigt.
:::

### 1a. Erstellen Sie einen Service-Account

Sie können ein bestehendes Konto verwenden, wenn Sie eines
haben. Admin-Rechte sind nicht erforderlich; ein normales Benutzerkonto ist
ausreichend.

![Screenshot Active Directory Service Account
Einstellungen](/screenshots/sso-kerberos/active-directory-service-account-settings.png)

### 1b. Passwort zurücksetzen

Passwort des Service Accounts zurücksetzen, nachdem die Option "This account
supports Kerberos AES 256 bit encryption" aktiviert wurde.

### 1c. Registrieren eines SPN für Zammad

Ersetzen Sie die folgenden Platzhalter in den nachstehenden Befehlen:

- `<zammad-host>`: Zammad FQDN
- `<service-acct>`: Service-Account Login Name
- `<password>`: Passwort des Service-Accounts (Option `/pass *` hat sich als
  unbrauchbar erwiesen)
- `<domain>`: Windows Domäne
- `<master-domain-controller>`: IP/FQDN des Master Domain Controllers

Mit den folgenden Befehlen wird das Passwort des Benutzers abgefragt:

```sh
setspn -s HTTP/<zammad-host> <service-acct>
```

```sh
ktpass /princ HTTP/<zammad-host>@<DOMAIN> \
        /mapuser <service-acct> \
        /crypto AES256-SHA1 \
        /ptype KRB5_NT_PRINCIPAL \
        /pass <password> -SetPass +DumpSalt \
        /target <master-domain-controller> \
        /out zammad.keytab
```

### 1d. Notieren Sie den geheimen Schlüssel und die Versionsnummer

Die Ausgabe des obigen Befehls enthält wichtige Daten für den folgenden
Schritt 2e:

```ansi
Using legacy password setting method
Failed to set property 'servicePrincipalName' to 'HTTP/<zammad-host>' on Dn 'CN=Zammad Service,DC=<domain>,DC=<tld>': 0x13.
WARNING: Unable to set SPN mapping data.
If <service-acct> already has an SPN mapping installed for HTTP/<zammad-host>, this is no cause for concern.
Building salt with principalname HTTP/<zammad-host> and domain <domain> (encryption type 18)...
Hashing password with salt "<domain><service-acct>".
Key created.
Output keytab to zammad.keytab:
Keytab version: 0x502
keysize 67 <service-acct>@<domain> ptype 1 (KRB5_NT_PRINCIPAL) vno 3 etype 0x12 (AES256-SHA1) keylength 32 (0x5ee827c30c736dd4095c9cbe146eabc216415b1ddb134db6aabd61be8fdf7fb1) // [!code focus]
```

Die letzte Zeile ist zu beachten:

- den geheimen Schlüssel in Klammern am Ende (**0x5ee827...**)
- die Versionsnummer des geheimen Schlüssels mit vorangestelltem `vno`
  (**3**)

## Schritt 2: NGINX entfernen, Apache + Kerberos einrichten

Als nächstes muss der Zammad-Host so konfiguriert werden, dass er Kerberos
unterstützt (und die vom Active Directory-Server bereitgestellten
Zugangsdaten akzeptiert).

In den meisten Fällen müssten Sie NGINX aus dem Quellcode mit einem
zusätzlichen Modul neu kompilieren, um die Kerberos-Unterstützung zu
aktivieren. Um dies zu umgehen, werden wir Apache verwenden, der
Kerberos-Unterstützung durch ein Plug-in-Modul bietet.

::: info
Alle Befehle in diesem Abschnitt müssen als root (oder mit `sudo`) ausgeführt werden.
:::

### 2a. NGINX ausschalten

::: warning
Dadurch ist Ihre Zammad-Instanz **offline**, bis Apache vollständig
konfiguriert ist und läuft.
:::

Schalten Sie nginx aus:

```sh
systemctl stop nginx
```

Lassen Sie es nach einem Neustart ausgeschaltet:

```sh
systemctl disable nginx
```

Wenn Sie die Ausfallzeit minimieren möchten, können Sie diesen Schritt zum
Schluss ausführen; bedenken Sie jedoch, dass Apache nicht startet, wenn der
Port, auf dem gelauscht werden soll, von NGINX verwendet wird.

Wenn Sie dieses Tutorial aus irgendeinem Grund nicht abschließen können,
schalten Sie einfach Apache aus und stellen NGINX wieder her:

::: details

```sh
systemctl stop apache2
```

```sh
systemctl disable apache2
```

```sh
systemctl enable nginx
```

```sh
systemctl start nginx
```

:::

### 2b. Apache vorkonfigurieren

Diese Dokumentation setzt eine bereits funktionierende Apache-Konfiguration
voraus.  Sie sollten einen Blick in die [Webserver
Konfiguration](/de/tutorials/webserver-config) werfen, bevor Sie fortfahren.

### 2c. Weitere Apache-Abhängigkeiten installieren

::: tabs

=== Debian & Ubuntu

```sh
apt update
```

```sh
apt install krb5-user libapache2-mod-auth-gssapi
```

=== CentOS

```sh
yum install krb5-workstation mod_auth_kerb
```

=== OpenSUSE

```sh
zypper ref
```

```sh
zypper install krb5-client apache2-mod_auth_kerb
```

:::

### 2d. Apache-Module einschalten

SSO erfordert Module, die standardmäßig nicht aktiviert sind. Standardmäßig
können Sie dafür `a2enmod` verwenden.

::: tabs

=== a2enmod (Debian & Ubuntu)

```sh
a2enmod auth_gssapi rewrite
```

```sh
systemctl restart apache2
```

=== a2enmod (OpenSUSE)

```sh
a2enmod auth_kerb rewrite
```

```sh
systemctl restart apache2
```

=== per Konfigurationsdatei (CentOS)

Ergänzen Sie oder entfernen Sie den Kommentar für `LoadModule` in
der Apache Konfiguration:

```apache
# /etc/httpd/conf/httpd.conf

LoadModule auth_kerb_module /usr/lib/apache2/modules/mod_auth_kerb.so
LoadModule rewrite_module modules/mod_rewrite.so
```

:::

### 2e. Kerberos konfigurieren

Mit der Kerberos-Realm-Konfiguration teilen Sie dem Zammad-Server mit, wie
er den _Domänencontroller_ (Active Directory-Server) erreichen kann.

Ersetzen Sie die folgenden Platzhalter in der untenstehenden
Beispielkonfiguration:

- `<domain>`: Windows Domäne
- `<domain-controller>`: IP/FQDN(s) des Domain-Controllers
- `<master-domain-controller>`: IP/FQDN des Master Domain-Controllers (darf
  nicht read-only sein; kann identisch zum `<domain-controller>` sein)

```ini
# /etc/krb5.conf

[libdefaults]
   default_realm = <DOMAIN>

   default_tkt_enctypes = aes256-cts-hmac-sha1-96
   default_tgs_enctypes = aes256-cts-hmac-sha1-96
   permitted_enctypes = aes256-cts-hmac-sha1-96

   kdc_timesync = 1
   ccache_type = 4
   forwardable = false
   proxiable = false
   fcc-mit-ticketflags = false

[realms]
         # multiple KDCs ok (one `kdc = ...` definition per line)
         <DOMAIN> = {
                  kdc = <domain-controller>
                  admin_server = <master-domain-controller>
                  default_domain = <domain>

                  # below is only for GSSAPI
                  auth_to_local = RULE:[1:$1@$0](.*@<domain>)s/@<domain>$//
                  auth_to_local = DEFAULT
         }

[domain_realm]
         .<domain> = <DOMAIN>
         <domain> = <DOMAIN>
```

### 2f. Keytab generieren

Apache benötigt eine Kerberos _keytab_ (Schlüsseltabelle), um seine
gemeinsamen Geheimnisse mit dem Domain Controller zu verwalten.

Ersetzen Sie die folgenden Platzhalter in den nachstehenden Befehlen:

- `<zammad-host>`: Zammad FQDN
- `<domain>`: Windows Domäne
- `<secret-key>`: Geheimer Schlüssel (**lassen Sie die führende** `0x`
  **weg**)
- `<vno>`: Versionsnummer des geheimen Schlüssels

Der geheime Schlüssel und die Versionsnummer wurden in `sso-register-spn`
(Schritt 1d) oben ermittelt.

Führen Sie ktutil aus:

```sh
ktutil
```

Keytab hinzufügen:

```sh
ktutil: addent -key -p HTTP/<zammad-host>@<DOMAIN> -k <vno> -e aes256-cts
Key for HTTP/<zammad-host>@<domain> (hex): <secret-key>
```

Prüfen Sie, ob der Eintrag erfolgreich hinzugefügt wurde:

```sh
ktutil: list
slot KVNO Principal
---- ---- ---------------------------------------------------------------
   1    3 HTTP/<zammad-host>@<DOMAIN>
```

Keytab speichern:

```sh
ktutil: wkt /root/zammad.keytab
```

Verlassen Sie ktutil:

```sh
ktutil: quit
```

Legen Sie die keytab in das Apache-Konfigurationsverzeichnis und setzen Sie
die entsprechenden Berechtigungen:

::: tabs

=== Debian, Ubuntu, OpenSUSE

```sh
mv /root/zammad.keytab /etc/apache2/
```

```sh
chown root:www-data /etc/apache2/zammad.keytab
```

```sh
chmod 640 /etc/apache2/zammad.keytab
```

=== CentOS

```sh
mv /root/zammad.keytab /etc/httpd/
```

```sh
chown root:apache /etc/httpd/zammad.keytab
```

```sh
chmod 640 /etc/httpd/zammad.keytab
```

:::

### 2g. Apache konfigurieren

Fügen Sie die folgende Parameter am Ende der Konfigurationsdatei des
virtuellen Hosts hinzu, um Ihren Kerberos-SSO-Endpunkt unter `/auth/sso` zu
erstellen:

Ersetzen Sie die folgenden Platzhalter in dem unten stehenden Befehl:

- `<zammad-host>`: Zammad FQDN
- `<domain>`: Windows Domäne

::: tabs

=== Debian & Ubuntu

```apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatch "/auth/sso">
   SSLRequireSSL
   AuthType GSSAPI
   AuthName "Your Zammad"
   GssapiBasicAuth On
   GssapiCredStore keytab:/etc/apache2/zammad.keytab
   GssapiLocalName On
   require valid-user

   RewriteEngine On
   RewriteCond %{LA-U:REMOTE_USER} (.+)
   RewriteRule . - [E=RU:%1,NS]
   RequestHeader set X-Forwarded-User "%{RU}e" env=RU
</LocationMatch>
```

=== CentOS & OpenSUSE

The configuration for CentOS and OpenSUSE below contains two
`Krb5KeyTab` lines! Keep only the one you need.

```apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatch "/auth/sso">
   SSLRequireSSL
   AuthType Kerberos
   AuthName "Your Zammad"
   KrbMethodNegotiate On
   KrbVerifyKDC On
   KrbMethodK5Passwd On
   KrbAuthRealms <DOMAIN>
   KrbLocalUserMapping on                 # strips @REALM suffix from REMOTE_USER variable
   KrbServiceName HTTP/<zammad-host>@<DOMAIN>
   Krb5KeyTab /etc/apache2/zammad.keytab  # Ubuntu, Debian, & openSUSE
   Krb5KeyTab /etc/httpd/zammad.keytab    # CentOS
   require valid-user

   RewriteEngine On
   RewriteCond %{LA-U:REMOTE_USER} (.+)
   RewriteRule . - [E=RU:%1,NS]
   RequestHeader set X-Forwarded-User "%{RU}e" env=RU
</LocationMatch>
```

:::

### 2g. Apache neu starten, um Änderungen zu übernehmen

```sh
systemctl restart apache2
```

## Schritt 3: Aktivieren Sie SSO in Zammad

Als Nächstes aktivieren Sie "Anmeldung über SSO" in Zammads Admin Bereich unter
_Einstellungen > Sicherheit > Anwendungen von Drittanbietern_.

::: tip
Öffnen Sie bei älteren Versionen von Zammad `https://your.zammad.host/auth/sso`,
um sich anzumelden.
:::

## Schritt 4: Client-System konfigurieren (nur Windows)

Für die vollständige SSO-Erfahrung (d.h. für die passwortlose Anmeldung mit
einem Klick) müssen Benutzer von Zammad:

1. sich im lokalen Intranet des Active Directory-Servers befinden; und
2. ihre Netzwerkeinstellungen so ändern, dass der Zammad-Host wie ein
   lokaler Intranet-Server behandelt wird.

Ohne diesen Schritt müssen die Benutzer ihre Zugangsdaten für Active
Directory während des SSO eingeben.

:::: tabs

=== IE / Edge / Chromium

::: tip
Diese Einstellung kann zentral für das gesamte Intranet verwaltet werden, indem
ein **Gruppenrichtlinienobjekt** (GPO) verwendet wird.
:::

1. Fügen Sie Ihren Zammad FQDN in den Internetoptionen unter _Security > Local
   Intranet > Sites > Advanced_ hinzu.
2. Wählen Sie "Require server verification (https:) for all sites in this
   zone"
3. Wählen Sie unter _Security level for this zone > Custom level... > Settings
   \> User Authentication > Logon_ die Option "Automatic logon only in
   Intranet Zone".

=== Firefox

::: info
Diese Option kann nicht zentral verwaltet werden, da sie im
Browser und nicht in den Windows-Einstellungen festgelegt wird.
:::

1. Geben Sie `about:config` in die Adressleiste ein. Klicken Sie auf **Das Risiko akzeptieren und
   fortfahren**.
2. Suchen Sie nach der Option `network.negotiate-auth.trusted-uris`.
3. Doppelklicken Sie darauf, um sie zu bearbeiten, und fügen Sie Ihren Zammad FQDN hinzu.
4. Starten Sie Firefox neu, damit Ihre Änderungen wirksam sind.

::::

## Fehlerbehebung

- Sind alle relevanten FQDNs/Hostnamen von Ihren Active Directory- und
  Zammad-Servern (auch die beiden gegenseitig) erreichbar?
- Sind die Systemuhren Ihrer Active Directory- und Zammad-Server innerhalb
  von fünf Minuten zueinander synchronisiert? Kerberos ist ein
  zeitkritisches Protokoll!

### Fehler in Apache-Protokollen

::: tip
**Versuchen Sie, das Apache-Log-Level vorübergehend zu erhöhen.**

Fügen Sie `LogLevel debug` zur Konfiguration Ihres virtuellen Hosts hinzu und starten Sie dann
den Dienst neu, um die Änderungen zu übernehmen.
:::

#### An unsupported mechanism was requested

Ist in Ihrem Active Directory-Serviceaccount die **Kerberos AES 256-bit
encryption** aktiviert?

Wenn Ihr Server aus irgendeinem Grund keine AES 256-Bit-Verschlüsselung
unterstützt, finden Sie im
[LDAP-Wiki](https://ldapwiki.com/wiki/MsDS-SupportedEncryptionTypes){target=_blank}
weitere Informationen über Kerberos-Verschlüsselungsarten.

#### Failed to verify krb5 credentials: Key version is not available

Haben Sie die genaue **Versionsnummer** (`vno`) verwendet, die von `ktpass`
ausgegeben wurde, als Sie Ihre `sso-generate-keytab`-Schlüsseltabelle erzeugt haben?

Versuchen Sie sicherheitshalber, sie erneut zu erzeugen.

#### Unspecified GSS failure. Minor code may provide more information (, No key table entry found for HTTP/FQDN@DOMAIN)

Stimmt der **service name**, den Sie bei `setspn` angegeben haben, genau mit dem überein,
den Sie beim Generieren Ihrer Keytab `<sso-generate-keytab>` verwendet haben?

Versuchen Sie sicherheitshalber, sie erneut zu erzeugen.

#### No key table entry found for HTTP/FQDN@DOMAIN

Stimmt die Einstellung `KrbServiceName` Ihrer virtuellen Hostkonfiguration
genau mit dem **service name** überein, den Sie in `setspn` angegeben haben?

Bei dieser Einstellung wird zwischen Groß- und Kleinschreibung
unterschieden.

#### Warning: received token seems to be NTLM, which isn't supported by the Kerberos module. Check your IE configuration

Ist Ihr Zammad-Host unter einem FQDN erreichbar? Dieser Fehler kann darauf
hinweisen, dass Sie Ihren Zammad-Host stattdessen als IP-Adresse
konfiguriert haben.

#### Cannot decrypt ticket for HTTP/FQDN@DOMAIN

Haben Sie sichergestellt, dass Sie das Passwort für Ihr Konto beim Active
Directory-Dienst _nach der Aktivierung der 256-Bit-AES-Verschlüsselung_
geändert haben?

Und haben Sie darauf geachtet, _nach dem Ändern Ihres Passwortes_ den SPN zu
registrieren (mit `ktpass`) und Ihre Keytab zu generieren (mit `ktutil`)?

Versuchen Sie, `kinit -k -t <Pfad zu keytab Schlüsseltabelle> HTTP/<zammad-host>@<DOMAIN>` auszuführen.
Wenn keine Ausgabe zurückgegeben wird, ist alles gut - wenn Sie "kinit:
Preauthentication failed while getting initial credentials" sehen, waren entweder Ihre
Zugangsdaten falsch oder Sie haben `/pass *` während des ktpass-Befehls
verwendet.

#### Failed when verifying KDC" and "failed to verify krb5 credentials: Decrypt integrity check failed

Vergewissern Sie sich, dass `KrbServiceName` der richtige, über setspn
bereitgestellte ServiceName ist.

Stellen Sie sicher, dass Ihr Active Directory die konfigurierte
Verschlüsselungsmethode unterstützt.

Wenn alles oben genannte korrekt ist und Sie die Anleitung befolgt haben,
stellen Sie sicher, dass Ihr Client die Ergebnisse nicht im Cache
speichert. `klist purge` löscht den Cache des Clients - alternativ können
Sie auch einen Neustart des Clients durchführen.
