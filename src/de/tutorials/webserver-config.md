---
order: 3
---

# Webserver-Konfiguration

<!--@include: @/de/modules/zammad-services-hint.md-->

Diese Anleitung ist nur für Paket-Installationen relevant. Während der
Installation versucht Zammad, automatisch eine Konfigurationsdatei für Ihren
Nginx zu installieren.  Sie finden Beispielkonfigurationsdateien für Ihren
Webserver im Verzeichnis `contrib/` Ihrer Zammad-Installation.

Für den Fall, dass dieser Standardansatz bei Ihnen nicht funktioniert,
finden Sie hier einige Hinweise für Ihre Konfiguration. Sie können entweder
Nginx oder Apache 2 (im folgenden Text nur als Apache bezeichnet) verwenden.

## SSL-Zertifikat anfordern

Sie müssen eine benannte Konfiguration verwenden, die standardmäßig nicht
eingerichtet ist. Um dies zu tun, öffnen Sie die `zammad.conf` im
Konfigurationsverzeichnis Ihres Webservers und ersetzen Sie den `server_name
localhost` (Nginx) oder den `ServerName localhost` (Apache) durch Ihre
Zammad-Domain.

Die Konfigurationsverzeichnisse sind normalerweise:

- Nginx: `/etc/nginx/conf.d/`, `/etc/nginx/vhosts.d/`,
  `/etc/nginx/sites-available/`
- Apache: `/etc/apache2/conf.d/`, `/etc/httpd/vhosts.d/`,
  `/etc/apache2/sites-available/`

### Let's Encrypt

There are two common tools to get certificates, to which your find a basic
configuration below:
[Certbot](https://certbot.eff.org/instructions){target=_blank} and
[acme.sh](https://github.com/acmesh-official/acme.sh/wiki){target=_blank}.
Have a look at their documentation for further configuration details and
other examples.

:::tabs

===Certbot

If not happened automatically, you have to install the Nginx or Apache plugin
for Certbot: `python3-certbot-nginx` or `python3-certbot-apache`

During the first Certbot run it will request additional information once.
Replace `<webserver>` in below command by either `apache`, `httpd` or
`nginx` to match your setup.

```sh
certbot --<webserver> -d zammad.example.com
```

Certbot will now attempt to issue a certificate for you. If successful,
Certbot will ask you if you want to `[1] not redirect` or `[2] redirect`
automatically. You can choose to not redirect if you plan to use the sample
configuration of Zammad.

From now on, Certbot will automatically renew your installed certificates if
they’re valid for 30 days or less.

===acme.sh

Change the default certificate authority to Let's Encrypt:

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
    --reloadcmd     "sudo systemctl force-reload <webserver>"
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

Kopieren und überschreiben Sie die Standardkonfiguration
`zammad.conf`. Passen Sie Ihr Nginx-Konfigurationsverzeichnis entsprechend
Ihrem Setup an:

```sh
cp /opt/zammad/contrib/nginx/zammad_ssl.conf /etc/nginx/sites-available/zammad.conf
```

#### Schritt 2 - Anpassen der Konfig-Datei

Passen Sie die soeben kopierte Datei mit einem Texteditor Ihrer Wahl
(z.B. vi oder nano) an.

Suchen Sie den `server_name`-Parameter und passen Sie `example.com` an die
Domain Ihrer Zammad-Instanz an.

Nun müssen Sie die Pfad- und Dateinamen für die SSL-Zertifikate anpassen,
die Sie erhalten haben. Passen Sie die folgenden Parameter an Ihr Setup an:

- `ssl_certificate` (Ihr SSL-Zertifikat)
- `ssl_certificate_key` (der private Schlüssel des Zertifikats)
- `ssl_trusted_certificate` (das öffentliche CA-Zertifikat)

Wenn Sie noch keine `dhparam.pem`-Datei haben, können Sie das folgende
Beispiel leicht anpassen, um diese Datei zu erzeugen. Sie können den
korrekten Pfad in Ihrer Webserver-Konfiguration finden. Suchen Sie nach
`ssl_dhparam`.

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

Laden Sie Nginx mit `sudo systemctl reload nginx` neu, um die
Konfigurationsänderungen zu übernehmen.

Danach sollten Sie von unserem Einrichtungsassistenten begrüßt werden.
Fahren Sie mit den [ersten Schritten in Zammad](/de/tutorials/first-steps)
fort.

### Apache

#### Schritt 1 - Modul aktivieren

Zammad benötigt ein Modul (`a2enmod`), das standardmäßig nicht aktiviert
ist. Benutzer von CentOS müssen eine Konfigurationsdatei anpassen, da dieses
Modul dort nicht verfügbar ist.

```sh
a2enmod proxy proxy_html proxy_http proxy_wstunnel headers ssl
```

Wenn Sie Zammad unter HTTP/2 laufen lassen möchten, benötigen Sie außerdem:

```sh
a2enmod h2 proxy_http2 mpm_event
```

```sh
sudo systemctl restart apache2
```

Klicken Sie auf Details, um Infos der CentOS-Konfiguration zu öffnen:

:::details
Fügen Sie die entsprechenden `LoadModule`-Anweisungen in Ihrer Apache-Konfiguration hinzu bzw. entfernen Sie die Kommentare
in `/etc/httpd/conf/httpd.conf`:

```apache
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

Starten Sie Ihren Webserver neu, nachdem Sie die Konfiguration gespeichert haben.

:::

#### Schritt 2 - Abrufen einer aktuellen Konfigurationsdatei

Die Paket-Installation hat eine Datei `zammad.conf` in das
Konfigurationsverzeichnis Ihres Webservers kopiert. Prüfen Sie, ob sie
vorhanden ist und benennen Sie diese Datei nicht um!

Passen Sie Ihr Apache-Konfigurationsverzeichnis entsprechend Ihrem Setup an:

```sh
ls /etc/apache2/sites-available
```

#### Schritt 3 - Anpassen der Konfig-Datei

Passen Sie die soeben kopierte Datei mit einem Texteditor Ihrer Wahl
(z.B. vi oder nano) an.

Suchen Sie einen `ServerName`-Parameter und passen Sie `example.com` an die
Domain Ihrer Zammad-Instanz an.

Nun müssen Sie die Pfad- und Dateinamen für die SSL-Zertifikate anpassen,
die Sie erhalten haben. Passen Sie die folgenden Parameter an Ihr Setup an:

- `SSLCertificateFile` (Ihr SSL-Zertifikat)
- `SSLCertificateKeyFile` (der private Schlüssel des Zertifikats)
- `SSLCertificateChainFile` (das öffentliche CA-Zertifikat)

Wenn Sie noch keine `dhparam.pem`-Datei haben, können Sie das folgende
Beispiel leicht anpassen, um diese Datei zu erzeugen. Sie können den
korrekten Pfad in Ihrer Webserverkonfiguration finden. Suchen Sie nach
`SSLOpenSSLConfCmd DHParameters`.

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

Dieser Schritt hängt größtenteils von den ausgewählten Ordnern ab und sollte
nur die `sites-available`-Ordner betreffen.

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

Laden Sie Ihren Apache mit `sudo systemctl reload apache2` neu, um Ihre
Konfigurationsänderungen zu übernehmen.

Danach sollten Sie von unserem Einrichtungsassistenten begrüßt werden.
Fahren Sie mit den [ersten Schritten in Zammad](/de/tutorials/first-steps)
fort.
