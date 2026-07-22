---
order: 3
---

# Webserver-Konfiguration

<!--@include: @/de/modules/zammad-services-hint.md-->

Konfigurieren Sie Ihren Webserver so, dass er als Reverse-Proxy für den
Zammad-Application-Server fungiert. Diese Anleitung behandelt die
Beschaffung eines SSL-Zertifikats, die Anpassung der Beispielkonfiguration
für Nginx und Apache 2 sowie das Neuladen des Webservers, um die Änderungen
zu übernehmen.

Beispielkonfigurationsdateien für Ihren Webserver finden Sie im Verzeichnis
`contrib/` Ihrer Zammad-Installation. Pro Webserver sind zwei
Beispieldateien vorhanden: `zammad.conf` (plain HTTP) und `zammad_ssl.conf`
(HTTPS). Die Nicht-SSL-Datei ist ausschließlich für lokale Testzwecke
vorgesehen und darf nicht in Produktivumgebungen verwendet werden. Bei einer
Paketinstallation von Zammad kopiert das Paket automatisch die
Nicht-SSL-Datei `zammad.conf` in das Konfigurationsverzeichnis Ihres
Webservers. Für den produktiven Einsatz ersetzen Sie diese bitte durch
`zammad_ssl.conf` und befolgen Sie die Schritte auf dieser Seite.

::: info
**Benutzer von Docker Compose / Kubernetes:**

Überspringen Sie diese Seite. Konfigurieren Sie den Webserver-Port, den Hostnamen und das Schema über die
Variablen `NGINX_*` und `ZAMMAD_RAILSSERVER_*`, die Sie auf der Seite der
[Umgebungsvariablen](/de/reference/environment-variables) finden können.
:::

## Beziehen Sie ein SSL-Zertifikat

Zammad erfordert in HTTPS in einer produktiven Umgebung. Nutzen Sie eine der
unten aufgeführten Optionen, um ein Zertifikat zu beziehen, bevor Sie mit
der Konfiguration des Webservers fortfahren.

### Kommerzielle Zertifizierungsstelle

Erwerben Sie ein Jahreszertifikat bei einer beliebigen vertrauenswürdigen
öffentlichen Zertifizierungsstelle (kurz CA, *Certificate Authority*). Zu
den gängigen Anbietern zählen
[Sectigo](https://sectigo.com/ssl-certificates-tls){target=_blank},
[GlobalSign](https://www.globalsign.com/en/managed-ssl){target=_blank} oder
[DigiCert](https://www.digicert.com/tls-ssl/){target=_blank}. Installieren
Sie das resultierende Zertifikat, den Schlüssel und die Zertifikatskette auf
Ihrem Server wie bei jedem anderen HTTPS-Dienst und fahren Sie anschließend
mit der unten beschriebenen Webserver-Konfiguration fort.

### Let's Encrypt

Let’s Encrypt stellt kostenlose, automatisch verlängerbare Zertifikate
aus. Zwei Clients werden dafür häufig verwendet.

::: tabs

=== Certbot

Certbot ist der am häufigsten verwendete ACME-Client. Befolgen Sie die
[Certbot-Installationsanleitung](https://certbot.eff.org/instructions){target=_blank},
wählen Sie Ihre Distribution und das passende Webserver-Plugin in der
Auswahl aus und schließen Sie die Installation ab. Nach der Installation fordern Sie ein Zertifikat an,
indem Sie `<WEBSERVER>` durch `nginx` oder `apache` und
`zammad.example.com` durch Ihre Subdomain ersetzen:

```sh
sudo certbot --<WEBSERVER> -d zammad.example.com
```

Certbot stellt das Zertifikat aus und fragt, ob HTTP auf HTTPS umgeleitet werden soll
(wählen Sie `[1] not redirect`, wenn Sie die Zammad-Beispielkonfiguration
verwenden möchten, die die Umleitung bereits übernimmt; andernfalls wählen Sie
`[2] redirect`) und richten Sie die automatische Verlängerung ein, sobald das Zertifikat
weniger als 30 Tage gültig ist.

=== acme.sh

[acme.sh](https://github.com/acmesh-official/acme.sh){target=_blank} ist
ein schlanker, shellbasierter ACME-Client und eine Alternative zu Certbot,
verwendet jedoch standardmäßig nicht mehr Let’s Encrypt. Legen Sie die Standard-Zertifizierungsstelle auf Let’s
Encrypt fest:

```sh
acme.sh --set-default-ca --server letsencrypt
```

Stellen Sie das Zertifikat aus, indem Sie `<WEBSERVER-plugin>` durch `nginx`,
`apache` oder `standalone` sowie `zammad.example.com` durch Ihre Subdomain ersetzen:

```sh
acme.sh --issue --<WEBSERVER-plugin> -d zammad.example.com
```

Installieren Sie das Zertifikat in einem Verzeichnis Ihrer Wahl (z.B.
`/etc/ssl/private/`) und starten Sie den Webserver nach jeder Erneuerung neu.
Ersetzen Sie `<WEBSERVER-service>` im folgenden Befehl durch den entsprechenden
systemd-Dienstnamen (`nginx`, `apache2` oder `httpd`):

```sh
acme.sh --install-cert -d zammad.example.com \
    --cert-file      /etc/ssl/private/zammad.example.com.pem  \
    --key-file       /etc/ssl/private/zammad.example.com.key  \
    --fullchain-file /etc/ssl/private/zammad.example.com.full.pem \
    --reloadcmd     "sudo systemctl force-reload <WEBSERVER-service>"
```

Weitere Anwendungsbeispiele finden Sie in der
[acme.sh-Dokumentation](https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert){target=_blank}.

:::

## Anpassen der Webserver-Konfiguration

<!-- markdownlint-disable MD036 -->

:::: tabs

=== Nginx (default)

**Get the sample config into place**

Copy the SSL sample configuration to your Nginx config directory:

```sh
sudo cp /opt/zammad/contrib/nginx/zammad_ssl.conf \
    /etc/nginx/sites-available/zammad.conf
```

Most common Nginx config directories:

- `/etc/nginx/conf.d/`
- `/etc/nginx/vhosts.d/`
- `/etc/nginx/sites-available/`

**Adjust server name and certificate paths**

Adjust the just copied file with a text editor of your choice (e.g.
vi or nano). Locate both `server_name` directives (one in the HTTP
server block on port 80, one in the HTTPS server block on port 443)
and adjust `example.com` to the subdomain you have chosen for your
Zammad instance.

Now you'll need to adjust the path and file names for your SSL
certificates you obtained on the prior steps. Adjust the following
directives to match your setup:

- `ssl_certificate` (your SSL certificate)
- `ssl_certificate_key` (the certificate's private key)
- `ssl_trusted_certificate` (the public CA certificate)

To improve HTTPS security, also configure a Diffie-Hellman parameter
file and point `ssl_dhparam` at it:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Reload and verify**

Verify the configuration:

```sh
sudo nginx -t
```

Reload Nginx:

```sh
sudo systemctl reload nginx
```

=== Apache 2

**Enable the required modules**

Zammad requires modules that are not enabled by default. On Ubuntu,
Debian and openSUSE use `a2enmod`:

```sh
sudo a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```

For HTTP/2 support also enable:

```sh
sudo a2enmod h2 proxy_http2 mpm_event
```

On CentOS / RHEL add the matching `LoadModule` lines to
`/etc/httpd/conf/httpd.conf` instead:

```apache
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

Restart Apache after enabling the modules:

```sh
sudo systemctl restart apache2
```

**Get the sample config into place**

Copy the SSL sample configuration to your Apache config directory:

```sh
sudo cp /opt/zammad/contrib/apache2/zammad_ssl.conf \
    /etc/apache2/sites-available/zammad.conf
```

Most common Apache config directories:

- `/etc/apache2/conf.d/`
- `/etc/httpd/vhosts.d/`
- `/etc/apache2/sites-available/`

The package installation attempts to copy this file for you. Do not
rename it.

**Adjust server name and certificate paths**

Adjust the just copied file with a text editor of your choice (e.g.
vi or nano). Locate any `ServerName` directive and adjust `example.com`
to the subdomain you have chosen for your Zammad instance. The first
`ServerName` (in the HTTP VirtualHost) defaults to `example.com` and
the second (in the HTTPS VirtualHost) to `localhost`.

Now you'll need to adjust the path and file names for your SSL
certificates you obtained on the prior steps. Adjust the following
directives to match your setup:

- `SSLCertificateFile` (your SSL certificate)
- `SSLCertificateKeyFile` (the certificate's private key)
- `SSLCertificateChainFile` (the public CA certificate)

To improve HTTPS security, also configure a Diffie-Hellman parameter
file and point `SSLOpenSSLConfCmd DHParameters` at it:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Enable the site**

On Ubuntu, Debian and openSUSE:

```sh
sudo a2ensite zammad
```

On CentOS / RHEL:

```sh
sudo ln -s /etc/httpd/sites-available/zammad_ssl.conf /etc/httpd/sites-enabled/
```

Make sure `IncludeOptional sites-enabled/*.conf` is present in
`/etc/apache2/apache2.conf` (Ubuntu, Debian, openSUSE) or
`/etc/httpd/conf/httpd.conf` (CentOS / RHEL).

**Reload and verify**

Reload Apache and verify the configuration:

```sh
sudo systemctl reload apache2
```

=== Local testing or other proxy servers

Zammad's main application listens on port `3000` and the WebSocket
server on port `6042`. If you put your own reverse proxy in front of
Zammad, forward both.

If the default ports conflict with other applications on your host, see
the [environment variables page](/en/reference/environment-variables) to
change them.

::: warning
Machen Sie Zammad nicht direkt erreichbar aus dem Internet. Zammad unterstützt lediglich
plain HTTP und wäre ohne Authentifizierung erreichbar.
:::

::::

<!-- markdownlint-enable MD036 -->

Rufen Sie nun Ihre konfigurierte Zammad-Domain in einem Browser auf, um zur
Zammad-Benutzeroberfläche zu gelangen. Falls der
Zammad-Einrichtungsassistent oder die Zammad-Benutzeroberfläche überhaupt
nicht angezeigt wird, lesen Sie bitte den Abschnitt
[Fehlerbehebung](#fehlerbehebung) weiter unten.

## Fehlerbehebung

### Standard Landing-Page anstelle von Zammad

Falls Sie statt Zammad die Standard-Startseite des Webservers sehen, wird
Ihre `zammad.conf` Datei möglicherweise durch eine andere
Konfigurationsdatei überschrieben. Überprüfen Sie das vhust-Verzeichnis auf
die Dateien `000-default.conf` oder `default.conf` und deaktivieren Sie
diese.

### DNS-Auflösung fehlgeschlagen

Sollte die Subdomain nicht aufgelöst werden, überprüfen Sie bitte noch
einmal die DNS-Einträge Ihrer Domain und warten Sie, bis diese übernommen
wurden. Ersetzen Sie im folgenden Befehl die Angaben `zammad.example.com`
durch Ihre konfigurierte Zammad-Domain und überprüfen Sie, ob die Domain auf
den richtigen Server verweist:

```sh
host zammad.example.com
```

### Fehler CSRF-Token

Falls sich Benutzer aufgrund von CSRF-Token-Fehlern nicht anmelden können,
gibt Ihre Webserver-Kette den ursprünglichen Verbindungstyp möglicherweise
nicht an Zammad weiter. Weisen Sie den Proxy an, dass es sich um eine
HTTPS-Verbindung handelt.

Nginx
: Suchen Sie in Ihrer Virtual-Host-Konfiguration die Zeile
 ` proxy_set_header X-Forwarded-Proto` und ersetzen Sie `$scheme` durch
 ` https`.

Apache 2
: Fügen Sie in Ihrer Virtual-Host-Konfiguration direkt über der ersten
  `ProxyPass`-Direktive folgendes ein:

  ```apache
  RequestHeader set X_FORWARDED_PROTO 'https'
  RequestHeader set X-Forwarded-Ssl on
  ```
