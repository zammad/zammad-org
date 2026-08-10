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

=== Nginx (Standard)

**Platzieren Sie die Beispielkonfiguration**

Kopieren Sie die SSL-Beispielkonfiguration in Ihr Nginx-Konfigurationsverzeichnis:

```sh
sudo cp /opt/zammad/contrib/nginx/zammad_ssl.conf \
    /etc/nginx/sites-available/zammad.conf
```

Die gängigsten Nginx-Konfigurationsverzeichnisse:

- `/etc/nginx/conf.d/`
- `/etc/nginx/vhosts.d/`
- `/etc/nginx/sites-available/`

**Passen Sie den Servernamen und die Zertifikatspfade an**

Bearbeiten Sie die soeben kopierte Datei mit einem Texteditor Ihrer Wahl (z.B.
vi oder nano). Suchen Sie die beiden `server_name` Direktiven (eine im HTTP-
Serverblock auf Port 80, eine im HTTPS-Serverblock auf Port 443)
und passen Sie `example.com` an die von Ihnen gewählte Subdomain an.

Nun müssen Sie den Pfad und die Dateinamen für Ihre SSL-Zertifikate anpassen,
die Sie in den vorherigen Schritten erhalten haben. Passen Sie die folgenden
Anweisungen entsprechend Ihrer Konfiguration an:

- `ssl_certificate` (Ihr SSL-Zertifikat)
- `ssl_certificate_key` (der private Schlüssel des Zertifikats)
- `ssl_trusted_certificate` (das öffentliche CA-Zertifikat)

Um die SSL-Sicherheit zu verbessern, konfigurieren Sie außerdem eine Diffie-Hellman-Parameterdatei
und verweisen Sie `ssl_dhparam` darauf:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Neu laden und prüfen**

Überprüfen Sie die Konfiguration:

```sh
sudo nginx -t
```

Laden Sie Nginx neu:

```sh
sudo systemctl reload nginx
```

=== Apache 2

**Aktivieren Sie die erforderlichen Module**

Zammad benötigt Module, die standardmäßig nicht aktiviert sind. Unter Ubuntu,
Debian und openSUSE verwenden Sie `a2enmod`:

```sh
sudo a2enmod proxy proxy_html proxy_http proxy_wstunnel headers SSL
```

Für die HTTP/2-Unterstützung aktivieren Sie außerdem:

```sh
sudo a2enmod h2 proxy_http2 mpm_event
```

Unter CentOS / RHEL fügen Sie stattdessen die entsprechenden Zeilen `LoadModule` Zeilen in die Dateien
`/etc/httpd/conf/httpd.conf` ein:

```apache
LoadModule headers_module modules/mod_headers.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

Starten Sie Apache nach der Aktivierung der Module neu:

``````sh
sudo systemctl restart apache2
```

**Platzieren Sie die Beispielkonfiguration**

Kopieren Sie die SSL-Beispielkonfiguration in Ihr Apache-Konfigurationsverzeichnis:

```sh
sudo cp /opt/zammad/contrib/apache2/zammad_ssl.conf \
    /etc/apache2/sites-available/zammad.conf
```

Die gängigsten Apache-Konfigurationsverzeichnisse:

- `/etc/apache2/conf.d/`
- `/etc/httpd/vhosts.d/`
- `/etc/apache2/sites-available/`

Die Paketinstallation versucht, diese Datei für Sie zu kopieren. Benennen Sie sie nicht
um.

**Passen Sie den Servernamen und die Zertifikatspfade an**

Bearbeiten Sie die soeben kopierte Datei mit einem Texteditor Ihrer Wahl (z.B.
vi oder nano). Suchen Sie alle `ServerName` Direktiven und passen Sie `example.com`
an die gewählte Subdomain an. Die erste
`ServerName` Direktive (im HTTP-VirtualHost) ist standardmäßig auf `example.com` gesetzt und
die zweite (im HTTPS-VirtualHost) auf `localhost`.

Nun müssen Sie den Pfad und die Dateinamen für Ihre SSL-Zertifikate anpassen,
die Sie in den vorherigen Schritten erhalten haben. Passen Sie die folgenden
Direktiven entsprechend Ihrer Konfiguration an:

- `SSLCertificateFile` (Ihr SSL-Zertifikat)
- `SSLCertificateKeyFile` (der private Schlüssel des Zertifikats)
- `SSLCertificateChainFile` (das öffentliche CA-Zertifikat)

Um die HTTPS-Sicherheit zu verbessern, konfigurieren Sie außerdem eine Diffie-Hellman-Parameterdatei
und verweisen Sie `SSLOpenSSLConfCmd DHParameters` darauf:

```sh
sudo openssl dhparam -out /etc/ssl/dhparam.pem 4096
```

**Aktivieren Sie die Seite**

Unter Ubuntu, Debian und openSUSE:

```sh
sudo a2ensite Zammad
```

Unter CentOS / RHEL:

```sh
sudo ln -s /etc/httpd/sites-available/zammad_ssl.conf /etc/httpd/sites-enabled/
```

Stellen Sie sicher, dass die Zeile `IncludeOptional sites-enabled/*.conf` in der Datei
`/etc/apache2/apache2.conf` (Ubuntu, Debian, openSUSE) oder
`/etc/httpd/conf/httpd.conf` (CentOS / RHEL) vorhanden ist.

**Neu laden und prüfen**

Laden Sie Apache neu und überprüfen Sie die Konfiguration:

```sh
sudo systemctl reload apache2
```

=== Lokales Testen oder andere Proxy-Server

Die Hauptanwendung von Zammad lauscht auf Port `3000` und der WebSocket-
Server auf Port `6042`. Wenn Sie einen eigenen Reverse-Proxy vor
Zammad schalten, leiten Sie beide weiter.

Sollten die Standardports mit anderen Anwendungen auf Ihrem Host in Konflikt stehen, finden Sie auf
der [Seite zu den Umgebungsvariablen](/de/reference/environment-variables) Informationen dazu, wie Sie
diese ändern können.

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

### CSRF-Token-Fehler

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
