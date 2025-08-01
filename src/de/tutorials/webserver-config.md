---
order: 3
---

# Webserver-Konfiguration

<!--@include: @/de/modules/zammad-services-hint.md-->

This guide is only relevant for package installations. During the
installation, Zammad tries to automatically install a configuration file to
your nginx.  You can find example configuration files for your webserver in
the `contrib/` directory of your Zammad installation.

Für den Fall, dass dieser Standardansatz bei Ihnen nicht funktioniert,
finden Sie hier einige Hinweise für Ihre Konfiguration. Sie können entweder
Nginx oder Apache 2 (im folgenden Text nur als Apache bezeichnet) verwenden.

## SSL-Zertifikat anfordern

You have to use a named configuration which is not configured by default. To
fix this, open the `zammad.conf` in your webserver's config directory and
replace the `server_name localhost` (Nginx) or `ServerName localhost`
(Apache)  with your Zammad domain.

Die Konfigurationsverzeichnisse sind normalerweise:

- Nginx: `/etc/nginx/conf.d/`, `/etc/nginx/vhosts.d/`,
  `/etc/nginx/sites-available/`
- Apache: `/etc/apache2/conf.d/`, `/etc/httpd/vhosts.d/`,
  `/etc/apache2/sites-available/`

### Let's Encrypt

Es gibt zwei gängige Tools zum Abrufen von Zertifikaten, zu denen Sie unten
eine Grundkonfiguration finden:
[certbot](https://certbot.eff.org/instructions){target=_blank} und
[acme.sh](https://github.com/acmesh-official/acme.sh/wiki){target=_blank}.
Schauen Sie sich die Dokumentation dieser Tools an, um weitere
Konfigurationsdetails und Beispiele zu finden.

:::tabs

===certbot

If not happened automatically, you have to install the nginx or apache plugin
for certbot: `python3-certbot-nginx` or `python3-certbot-apache`

During the first certbot run it will request additional information once.
Replace `<webserver>` in below command by either `apache`, `httpd` or
`nginx` to match your setup.

```sh
certbot --<webserver> -d zammad.example.com
```

Certbot will now attempt to issue a certificate for you. If successful,
certbot will ask you if you want to `[1] not redirect` or `[2] redirect`
automatically. You can choose to not redirect if you plan to use the sample
configuration of Zammad.

From now on, certbot will automatically renew your installed certificates if
they’re valid for 30 days or less.

===acme.sh

Change the default certificate authority to Let's encrypt:

```sh
acme.sh --set-default-ca  --server letsencrypt
```

Issue your certificate and replace `<webserver>` in the following command
with either `apache` or `nginx` or `standalone` for other webserver.

```sh
acme.sh --issue --<webserver> -d zammad.example.com
```

It is not recommended to use the stored certificates directly. You should
install the certificate to a directory of your choice instead as you can see
in the next command below. We’re using `/etc/ssl/private/` in this case,
but you can use any directory you like.

Replace `<webserver>` with `apache2`, `httpd` or `nginx`.

```sh
acme.sh --install-cert -d zammad.example.com \
    --cert-file      /etc/ssl/private/zammad.example.com.pem  \
    --key-file       /etc/ssl/private/zammad.example.com.key  \
    --fullchain-file /etc/ssl/private/zammad.example.com.full.pem \
    --reloadcmd     "systemctl force-reload <webserver>"
```

From now on, acme.sh will automatically renew your installed certificates if
they’re valid for 30 days or less.

:::

### Kommerzielle CA

Wenn Sie es vorziehen, Zertifikate von einer anderen offiziellen
Zertifizierungsstelle (CA) als Let's Encrypt zu verwenden, können Sie dies
ebenfalls tun. Holen Sie sich einfach Ihr Zertifikatspaket, installieren Sie
es gemäß der Dokumentation und fahren Sie mit der Anpassung der
Webserver-Konfiguration fort.

## Anpassen der Webserver-Konfiguration

:::warning
Stellen Sie sicher, dass Sie niemals HTTP-Verbindungen verwenden - wir empfehlen Ihnen die Verwendung von HTTPS!
:::

### Nginx

#### Schritt 1 - Abrufen einer aktuellen Konfigurationsdatei

Copy & overwrite the default `zammad.conf`. Adjust your Nginx config
directory according to your setup:

```sh
cp /opt/zammad/contrib/nginx/zammad_ssl.conf /etc/nginx/sites-available/zammad.conf
```

#### Schritt 2 - Anpassen der Konfig-Datei

Passen Sie die soeben kopierte Datei mit einem Texteditor Ihrer Wahl
(z.B. vi oder nano) an.

Locate any `server_name` directive and adjust `example.com` to the domain of
your Zammad instance.

Nun müssen Sie die Pfad- und Dateinamen für die SSL-Zertifikate anpassen,
die Sie erhalten haben. Passen Sie die folgenden Parameter an Ihr Setup an:

- `ssl_certificate` (your ssl certificate)
- `ssl_certificate_key` (the certificates private key)
- `ssl_trusted_certificate` (the public CA certificate)

If you don't have a `dhparam.pem` file yet, you can easily adapt the example
below to generate this file. You can find the correct path in your webserver
config. Search for `ssl_dhparam`.

```sh
openssl dhparam -out <path>/dhparam.pem 4096

```

#### Schritt 3 - Anpassen der HTTPS-Konfiguration

Unsere Standardkonfiguration zielt auf eine breite Unterstützung von
Endbenutzer-Geräten ab. Dies entspricht möglicherweise nicht Ihren
Anforderungen. Mozilla hat einen großartigen
[SSL-Generator](https://ssl-config.mozilla.org/){target=_blank}, der Ihnen
helfen sollte, Ihre Anforderungen zu erfüllen!

#### Schritt 4 - Speichern und neu laden

Reload your nginx with `systemctl reload nginx` to apply your configuration
changes.

Danach sollten Sie von unserem Einrichtungsassistenten begrüßt werden.
Fahren Sie mit den [ersten Schritten in Zammad](/de/tutorials/first-steps)
fort.

### Apache

#### Schritt 1 - Modul aktivieren

Zammad requires a module (`a2enmod`) which is not enabled by default. CentOS
users have to adjust a config file because this module is not available
there.

```sh
a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```

```sh
systemctl restart apache2
```

:::details Config for CentOS
Add/uncomment the appropriate `LoadModule` statements in your Apache config
in `/etc/httpd/conf/httpd.conf`:

```apache
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

Restart your webserver after saving the configuration.

:::

#### Schritt 2 - Abrufen einer aktuellen Konfigurationsdatei

The package installation copied a `zammad.conf` file to your webserver
config directory. Check if it is present and do not rename this file!

Passen Sie Ihr Apache-Konfigurationsverzeichnis entsprechend Ihrem Setup an:

```sh
ls /etc/apache2/sites-available
```

#### Schritt 3 - Anpassen der Konfig-Datei

Passen Sie die soeben kopierte Datei mit einem Texteditor Ihrer Wahl
(z.B. vi oder nano) an.

Locate any `ServerName` directive and adjust `example.com` to the domain of
your Zammad instance.

Nun müssen Sie die Pfad- und Dateinamen für die SSL-Zertifikate anpassen,
die Sie erhalten haben. Passen Sie die folgenden Parameter an Ihr Setup an:

- `SSLCertificateFile` (your ssl certificate)
- `SSLCertificateKeyFile`(the certificates private key)
- `SSLCertificateChainFile` (the public CA certificate)

If you don't have a `dhparam.pem` file yet, you can easily adapt the example
below to generate this file. You can find the correct path in your webserver
config. Search for `SSLOpenSSLConfCmd DHParameters`.

```sh
openssl dhparam -out <path>/dhparam.pem 4096

```

#### Schritt 4 - Anpassen der HTTPS-Konfiguration

Unsere Standardkonfiguration zielt auf eine breite Unterstützung von
Endbenutzer-Geräten ab. Dies entspricht möglicherweise nicht Ihren
Anforderungen. Mozilla hat einen großartigen
[SSL-Generator](https://ssl-config.mozilla.org/){target=_blank}, der Ihnen
helfen sollte, Ihre Anforderungen zu erfüllen!

#### Schritt 5 - Aktivieren der Website

This step mostly depends on your selected folders and should only affect
`sites-available` folders.

:::tabs

=== Ubuntu, Debian, OpenSUSE

Stellen Sie sicher, dass die folgende Zeile in Ihrer Apache-Konfiguration (``/etc/apache2/apache2.conf``)
vorhanden ist:

```
IncludeOptional sites-enabled/*.conf
```

Aktivieren Sie es:

```sh
a2ensite zammad
```

=== CentOS

Stellen Sie sicher, dass die folgende Zeile in Ihrer Apache-Konfiguration (``/etc/httpd/conf/httpd.conf``)
vorhanden ist:

```
IncludeOptional sites-enabled/*.conf
```

Aktivieren Sie es:

```sh
ln -s /etc/httpd/sites-available/zammad_ssl.conf /etc/httpd/sites-enabled/
```

:::

#### Schritt 6 - Speichern und neu laden

Reload your apache with `systemctl reload apache2` to apply your
configuration changes.

Danach sollten Sie von unserem Einrichtungsassistenten begrüßt werden.
Fahren Sie mit den [ersten Schritten in Zammad](/de/tutorials/first-steps)
fort.
