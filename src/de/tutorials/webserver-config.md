---
order: 3
---

# Webserver-Konfiguration

<!--@include: @/de/modules/zammad-services-hint.md-->

Diese Anleitung ist nur für Paket-Installationen relevant. Während der
Installation versucht Zammad, automatisch eine Konfigurationsdatei für Ihren
nginx zu installieren.  Sie finden Beispielkonfigurationsdateien für Ihren
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

Es gibt zwei gängige Tools zum Abrufen von Zertifikaten, zu denen Sie unten
eine Grundkonfiguration finden:
[certbot](https://certbot.eff.org/instructions){target=_blank} und
[acme.sh](https://github.com/acmesh-official/acme.sh/wiki){target=_blank}.
Schauen Sie sich die Dokumentation dieser Tools an, um weitere
Konfigurationsdetails und Beispiele zu finden.

:::tabs

===Certbot

Falls nicht automatisch geschehen, müssen Sie das nginx- oder apache-Plugin für certbot
installieren:
`python3-certbot-nginx` oder `python3-certbot-apache`

Während des ersten certbot-Laufs werden einmalig zusätzliche Informationen abgefragt.
Ersetzen Sie `<webserver>` im folgenden Befehl entweder durch `apache`, `httpd` oder
`nginx`, je nach Ihrer Konfiguration.

```sh
certbot --<webserver> -d zammad.example.com
```

Certbot wird nun versuchen, ein Zertifikat für Sie auszustellen. Falls erfolgreich,
wird certbot Sie fragen, ob Sie `[1] nicht umleiten` oder automatisch `[2] umleiten` wollen.
Sie können `nicht umleiten` wählen, wenn Sie unserem Beispiel folgen wollen.

Von nun an erneuert certbot automatisch Ihre installierten Zertifikate, wenn
sie noch 30 Tage oder kürzer gültig sind.

===acme.sh

Ändern Sie die Standard-Zertifizierungsstelle in Let's encrypt:

```sh
acme.sh --set-default-ca --server letsencrypt
```

Stellen Sie Ihr Zertifikat aus und ersetzen Sie `<webserver>` in dem folgenden Befehl
entweder durch `apache` oder `nginx` oder `standalone` für andere Webserver.

```sh
acme.sh --issue --<webserver> -d zammad.example.com
```

Es wird nicht empfohlen, die gespeicherten Zertifikate direkt zu verwenden. Sie sollten
das Zertifikat stattdessen in ein Verzeichnis Ihrer Wahl installieren, wie Sie
im nächsten Befehl unten sehen können. Wir verwenden in diesem Fall `/etc/ssl/private/`,
aber Sie können jedes beliebige Verzeichnis verwenden.

Ersetzen Sie `<webserver>` durch `apache2`, `httpd` oder `nginx`.

```sh
acme.sh --install-cert -d zammad.example.com \
    --cert-datei /etc/ssl/private/zammad.example.com.pem \
    --key-file /etc/ssl/private/zammad.example.com.key \
    --fullchain-file /etc/ssl/private/zammad.example.com.full.pem \
    --reloadcmd "systemctl force-reload <webserver>"
```

Von nun an erneuert acme.sh automatisch Ihre installierten Zertifikate, wenn
sie noch 30 Tage oder kürzer gültig sind.

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

Laden Sie Ihr nginx mit `systemctl reload nginx` neu, um Ihre
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

```sh
systemctl restart apache2
```

:::details Config for CentOS
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

Laden Sie Ihren Apache mit `systemctl reload apache2` neu, um Ihre
Konfigurationsänderungen zu übernehmen.

Danach sollten Sie von unserem Einrichtungsassistenten begrüßt werden.
Fahren Sie mit den [ersten Schritten in Zammad](/de/tutorials/first-steps)
fort.
