---
order: 3
---

# Configurazione server web

<!--@include: @/en/modules/zammad-services-hint.md-->

Questa guida è rilevante solo per le installazioni tramite
pacchetto. Durante l'installazione, Zammad cerca.

Nel caso questo approccio predefinito non funzioni per te, puoi trovare
alcuni suggerimenti per la tua.

## Ottieni un certificato SSL

Devi usare una configurazione con nome che non è configurata per
impostazione predefinita. Per risolvere, apri.

Le cartelle di configurazione sono solitamente:

- Nginx: `/etc/nginx/conf.d/`, `/etc/nginx/vhosts.d/`,
  `/etc/nginx/sites-available/`
- Apache: `/etc/apache2/conf.d/`, `/etc/httpd/vhosts.d/`,
  `/etc/apache2/sites-available/`

### Let's Encrypt

Ci sono due strumenti comuni per ottenere certificati, per cui trovi una
configurazione di base sotto.

:::tabs

===Certbot

Se non è avvenuto automaticamente, devi installare il plugin Nginx o Apache.

:::

### CA commerciale

Se preferisci usare certificati da un'Autorità di Certificazione (CA)
ufficiale diversa.

## Regolazione della configurazione del server web

:::warning
Assicurati di non usare mai connessioni HTTP - ti incoraggiamo a usare HTTPS!
:::

### Nginx

#### Passo 1 - Ottieni un file di configurazione attuale

Copia e sovrascrivi il `zammad.conf` predefinito. Regola la tua cartella di
configurazione Nginx in base.

```sh
cp /opt/zammad/contrib/nginx/zammad_ssl.conf /etc/nginx/sites-available/zammad.conf
```

#### Passo 2 - Regola il file di configurazione

Regola il file appena copiato con un editor di testo a tua scelta (ad
esempio vi o nano).

Individua qualsiasi direttiva `server_name` e regola `example.com` al
dominio della tua istanza Zammad.

Ora dovrai regolare il percorso e i nomi dei file per i tuoi certificati SSL
ottenuti.

- `ssl_certificate` (il tuo certificato SSL)
- `ssl_certificate_key` (la chiave privata del certificato)
- `ssl_trusted_certificate` (il certificato CA pubblico)

Se non hai ancora un file `dhparam.pem`, puoi facilmente adattare l'esempio
sotto per generarlo.

```sh
openssl dhparam -out <path>/dhparam.pem 4096

```

#### Passo 3 - Regola la configurazione HTTPS

La nostra configurazione predefinita mira a un ampio supporto dei
dispositivi degli utenti finali. Questo potrebbe non adattarsi.

#### Passo 4 - Salva e ricarica

Ricarica il tuo Nginx con `sudo systemctl reload nginx` per applicare le
modifiche alla configurazione.

Dopo di che, dovresti essere accolto dalla nostra procedura guidata Per
iniziare. Continua con i [primi pass

### Apache

#### Passo 1 - Abilita modulo

Zammad richiede un modulo (`a2enmod`) non abilitato per impostazione
predefinita. Gli utenti CentOS devono.

```sh
a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```

Se vuoi eseguire Zammad sotto HTTP/2, avrai bisogno anche di:

```sh
a2enmod h2 proxy_http2 mpm_event
```

```sh
sudo systemctl restart apache2
```

Fai clic per aprire i dettagli per la configurazione CentOS:

:::details
Aggiungi/decommenta le istruzioni `LoadModule` appropriate nella tua configurazione Apache
in `/etc/httpd

:::

#### Passo 2 - Ottieni un file di configurazione attuale

L'installazione del pacchetto ha copiato un file `zammad.conf` nella
cartella di configurazione del tuo server web.

Regola la tua cartella di configurazione Apache in base alla tua
configurazione:

```sh
ls /etc/apache2/sites-available
```

#### Passo 3 - Regola il file di configurazione

Regola il file appena copiato con un editor di testo a tua scelta (ad
esempio vi o nano).

Individua qualsiasi direttiva `ServerName` e regola `example.com` al dominio
della tua istanza Zammad.

Ora dovrai regolare il percorso e i nomi dei file per i tuoi certificati SSL
ottenuti.

- `SSLCertificateFile` (il tuo certificato SSL)
- `SSLCertificateKeyFile` (la chiave privata del certificato)
- `SSLCertificateChainFile` (il certificato CA pubblico)

Se non hai ancora un file `dhparam.pem`, puoi facilmente adattare l'esempio
sotto per generarlo.

```sh
openssl dhparam -out <path>/dhparam.pem 4096

```

#### Passo 4 - Regola la configurazione HTTPS

La nostra configurazione predefinita mira a un ampio supporto dei
dispositivi degli utenti finali. Questo potrebbe non adattarsi.

#### Passo 5 - Abilita il sito

Questo passaggio dipende principalmente dalle cartelle selezionate e
dovrebbe riguardare solo `sites-available`.

:::tabs

=== Ubuntu, Debian, OpenSUSE

Assicurati che la seguente riga sia presente nella tua configurazione Apache.

:::

#### Passo 6 - Salva e ricarica

Ricarica il tuo Apache con `sudo systemctl reload apache2` per applicare le
modifiche alla configurazione.

Dopo di che, dovresti essere accolto dalla nostra procedura guidata Per
iniziare. Continua con i [primi pass
