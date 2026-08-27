---
order: 13
title: 'Single sign-on with Kerberos'
---

# Single sign-on for Kerberos <Badge type="warning" text="on-premise only"/>

Questa guida tratterà come configurare il single sign-on usando Microsoft
Active Directory.

## Conceptual overview

Come ogni altra applicazione web, Zammad ha la propria logica per la
registrazione degli utenti.

Se il tuo reparto IT mantiene un proprio archivio di identità utente (come
Active Directory).

::: tip
If you don't have this IT infrastructure but still want one-click
login, you can use alternatives like GitHub, Google, Facebook and more.
:::

## How does it work?

Una volta abilitato, il single sign-on attiva un endpoint su
`https://your.zammad.host/auth/sso`.

- un'intestazione di richiesta `X-Forwarded-User`
- una variabile d'ambiente del server web `REMOTE_USER`
- una variabile d'ambiente del server web `HTTP_REMOTE_USER`

::: info
**Wait. SSO allows you to sign in with only a username?**

In principle, yes.

**How is that okay?**

In this guide, we configure our web server (Apache) to intercept all
requests to the `/auth/sso` endpoint. Instead of forwarding them to
Zammad, Apache initiates a three-sided login process (_Kerberos
authentication_) between the itself, the user, and the Active
Directory server.

If Active Directory doesn't recognize the user or their password,
Zammad never sees the request, and the session is never created.

**What does this all mean?**

It means there are many ways you could set up SSO, you don't need to
follow this guide or even use Active Directory or Kerberos, but if you
don't know what you're doing, you're going to end up with a _massive_
security hole.
:::

## Per iniziare

::: tip
**Troppo impegnato per occupartene da solo?**

Ci pensiamo noi. I nostri esperti offrono workshop personalizzati per
 aiutare il tuo team a essere operativo in modo rapido e sicuro.
[Scrivici un messaggio](https://zammad.com/contact){target=_blank}!
:::

Avrai bisogno di:

- un ambiente Microsoft Active Directory con
  - accesso root
  - supporto per crittografia AES a 256 bit
- un host Zammad con
  - accesso root
  - un nome di dominio completamente qualificato (FQDN)
- una certa familiarità con l'amministrazione di sistema (ad esempio
  configurazione Apache)

Per risultati ottimali, configura l'integrazione LDAP per assicurarti
che il tuo Active Directory e Zammad.

## Step 1: Configure active directory

Nello schema di autenticazione Kerberos, il **server di autenticazione**
(Active Directory) deve.

::: info
Queste istruzioni sono state confermate su Windows Server 2016.
:::

### 1a. Crea un account di servizio

Puoi usare un account di servizio esistente se ne hai uno. Non sono
richiesti privilegi amministrativi.

![Screenshot impostazioni account di servizio Active
Directory](/screenshots/tutorials/sso-kerberos/active-directory-service-account-settings.png)

### 1b. Reset password

Reimposta la password dell'account di servizio dopo aver abilitato l'opzione
"Questo account supporta Kerberos AES 256.

### 1c. Registra un SPN per Zammad

Sostituisci i seguenti segnaposto nei comandi seguenti:

- `<zammad-host>`: FQDN di Zammad
- `<service-acct>`: Nome di accesso dell'account di servizio
- `<password>`: Password dell'account di servizio (l'opzione `/pass *` si è
  dimostrata non funzionante)
- `<domain>`: Dominio Windows
- `<master-domain-controller>`: IP/FQDN del controller di dominio master

I comandi seguenti chiederanno la password dell'utente:

```sh
setspn -s HTTP/<zammad-host> <service-acct>
```

```sh
ktpass /princ HTTP/<zammad-host>@<DOMAIN> \
        /mapuser <service-acct> \
        /cry
```

### 1d. Annota la chiave segreta e il numero di versione

L'output del comando sopra contiene dati importanti per il Passo 2e di
seguito:

```sh
Usando il metodo legacy di impostazione password
Impossibile impostare la proprietà 'servicePrincipalName' su 'HTT
```

Sull'ultima riga, prendi nota di:

- la chiave segreta tra parentesi alla fine (**0x5ee827...**)
- il numero di versione della chiave segreta preceduto da `vno` (**3**)

## Step 2: Remove NGINX, set up Apache + Kerberos

Successivamente, l'host Zammad deve essere configurato per supportare
Kerberos (e accettare credenziali di autenticazione.

Nella maggior parte dei casi, dovresti ricompilare NGINX da sorgente con un
modulo aggiuntivo per abilitare.

::: info
Tutti i comandi in questa sezione devono essere eseguiti come root (o con `sudo`).
:::

### 2a. Turn off NGINX

::: warning
Questo metterà la tua istanza Zammad **offline** finché Apache non è completamente
configurato e in esecuzione.
:::

Disattiva Nginx:

```sh
sudo systemctl stop nginx
```

Mantienilo disattivato dopo il riavvio:

```sh
sudo systemctl disable nginx
```

Se vuoi minimizzare il downtime, puoi salvare questo passaggio per ultimo;
tieni solo presente che.

Se non riesci a completare questo tutorial per qualsiasi motivo, disattiva
semplicemente Apache e ripristina NGI

::: details

```sh
sudo systemctl stop apache2
```

```sh
sudo systemctl disable apache2
```

```sh
su

:::

### 2b. Pre-configure Apache

Questa documentazione presuppone una configurazione Apache già
funzionante. Prima di continuare, si consiglia di consultare la [guida alla
configurazione del server web](/en/tutorials/webserver-config).

### 2c. Install further Apache dependencies

::: tabs

=== Debian & Ubuntu

```sh
sudo apt update
```

```sh
sudo apt install krb5-user libapach

:::

### 2d. Enable Apache modules

SSO richiede moduli non abilitati per impostazione predefinita. Per
impostazione predefinita puoi usare `a2enmod` per.

::: tabs

=== a2enmod (Debian & Ubuntu)

```sh
a2enmod auth_gssapi rewrite
```

```sh
sudo systemct

:::

### 2e. Configura Kerberos

La configurazione del realm Kerberos è come dici al server Zammad come
raggiungere il _domain controller_.

Sostituisci i seguenti segnaposto nella configurazione di esempio sotto:

- `<domain>`: Dominio Windows
- `<domain-controller>`: IP/FQDN del controller di dominio
- `<master-domain-controller>`: IP/FQDN del controller di dominio master
  (non deve essere sola lettura, ma

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

### 2f. Generate keytab

Apache ha bisogno di un _keytab_ Kerberos (tabella chiavi) per gestire i
suoi segreti condivisi con il dominio.

Sostituisci i seguenti segnaposto nei comandi seguenti:

- `<zammad-host>`: FQDN di Zammad
- `<domain>`: Dominio Windows
- `<secret-key>`: Chiave segreta (**ometti lo** `0x` iniziale)
- `<vno>`: Numero di versione della chiave segreta

La chiave segreta e il numero di versione sono stati trovati in
`sso-register-spn` (Passo 1d) sopra.

Entra in ktutil:

```sh
ktutil
```

Aggiungi keytab:

```sh
ktutil: addent -key -p HTTP/<zammad-host>@<DOMAIN> -k <vno> -e aes256-cts
Key for HTTP/<za
```

Conferma che la voce sia stata aggiunta con successo:

```sh
ktutil: list
slot KVNO Principal
---- ---- -----------------------------------------------
```

Scrivi keytab su disco:

```sh
ktutil: wkt /root/zammad.keytab
```

Esci da ktutil:

```sh
ktutil: quit
```

Quindi, posiziona il keytab nella cartella di configurazione Apache e
imposta i permessi appropriati:

::: tabs

=== Debian, Ubuntu, OpenSUSE

```sh
sudo mv /root/zammad.keytab /etc/apache2/
```

```sh

:::

### 2g. Configura Apache

Aggiungi la seguente direttiva alla fine del file di configurazione del
virtual host per creare la tua.

Sostituisci i seguenti segnaposto nel comando seguente:

- `<zammad-host>`: FQDN di Zammad
- `<domain>`: Dominio Windows

::: tabs

=== Debian & Ubuntu

``` apache
# /etc/apache2/sites-available/zammad.conf

<LocationMatc

:::

### 2g. Restart Apache to apply changes

```sh
sudo systemctl restart apache2
```

## Passo 3: Abilita SSO in Zammad

Successivamente, abilita "Autenticazione tramite SSO" nel Pannello di amministrazione di Zammad sotto
_Impostazioni > Sicurezza >

::: tip
Nelle versioni più vecchie di Zammad, visita `https://your.zammad.host/auth/sso`
per accedere.
:::

## Step 4: Configure client system (Windows only)

Per l'esperienza SSO completa (ovvero per l'accesso con un clic senza
password), gli utenti Zammad devono:

1. essere sulla intranet locale del server Active Directory; e
2. modificare le proprie impostazioni di rete in modo che l'host Zammad sia
   trattato come un server intranet locale.

Senza questo passaggio, gli utenti devono inserire le proprie credenziali
Active Directory durante l'SSO.

:::: tabs

=== IE / Edge / Chromium

::: tip
Questa impostazione può essere gestita centralmente in tutta la intranet usando
un **oggetto criteri di gruppo.
:::

1. Aggiungi il tuo FQDN Zammad in Opzioni Internet sotto _Sicurezza > Intranet
   locale > Siti >

::: info
Questa opzione non può essere gestita centralmente perché è impostata nel
browser anziché in Windows.
:::

1. Inserisci `about:config` nella barra degli indirizzi. Fai clic su **Accetta il rischio e
   continua**.
2.

::::

## Risoluzione problemi

- Tutti gli FQDN/hostname rilevanti sono raggiungibili dai tuoi server
  Active Directory e Zammad (
- Gli orologi di sistema dei tuoi server Active Directory e Zammad sono
  sincronizzati entro cinque.

### Errors in Apache logs

::: tip
**Prova a innalzare temporaneamente il livello di log di Apache.**

Aggiungi `LogLevel debug` al tuo virtual host.
:::

#### È stato richiesto un meccanismo non supportato

Il tuo account di servizio Active Directory ha abilitata la **crittografia
Kerberos AES a 256 bit**?

Se per qualche motivo il tuo server non supporta la crittografia AES a 256
bit, la wiki di LDAP contiene [ulteriori informazioni sui tipi di
crittografia
Kerberos](https://ldapwiki.com/wiki/MsDS-SupportedEncryptionTypes){target=_blank}.

#### Impossibile verificare le credenziali krb5: la versione della chiave non è disponibile

Hai usato il **numero di versione** esatto (`vno`) fornito da `ktpass`
quando hai generato.

Prova a generarlo di nuovo, solo per essere sicuro.

#### Unspecified GSS failure. Minor code may provide more information (, no key table entry found for HTTP/FQDN@DOMAIN)

Il **nome del servizio** che hai fornito a `setspn` corrisponde esattamente a quello
che hai usato quando hai generato.

Prova a generarlo di nuovo, solo per essere sicuro.

#### Nessuna voce nella tabella chiavi trovata per HTTP/FQDN@DOMAIN

L'impostazione `KrbServiceName` della configurazione del tuo virtual host
corrisponde esattamente al **nome del servizio.

Questa impostazione fa distinzione tra maiuscole e minuscole.

#### Warning: Received token seems to be NTLM, which isn't supported by the Kerberos module. Check your IE configuration

Il tuo host Zammad è accessibile tramite un FQDN? Questo errore potrebbe
indicare che hai configurato il tuo.

#### Impossibile decrittografare il ticket per HTTP/FQDN@DOMAIN

Ti sei assicurato di cambiare la password sul tuo account di servizio Active
Directory _dopo aver.

E ti sei assicurato di registrare lo SPN (con `ktpass`) e generare il tuo
keytab (con.

Prova a eseguire `kinit -k -t <path to keytab> HTTP/<zammad-host>@<DOMAIN>`.
Se non viene restituito alcun output.

#### Fallito durante la verifica del KDC" e "impossibile verificare le credenziali krb5: controllo integrità decrittografia.

Assicurati che `KrbServiceName` sia il ServiceName corretto fornito tramite
setspn.

Assicurati che il tuo Active Directory supporti il metodo di crittografia
configurato.

Se tutto quanto sopra è corretto e il resto delle FAQ è anche garantito,
assicurati che il tuo client non.
