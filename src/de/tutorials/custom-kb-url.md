---
order: 14
title: 'Knowledge Base benutzerdefinierte URL'
---

# Knowledge Base benutzerdefinierte URL

Wenn Sie die Zammad Knowledge Base unter einer anderen URL als der
Standard-URL veröffentlichen möchten, können Sie unserem unten stehenden
Konfigurationsbeispiel folgen, das den [NPM (Nginx Proxy
Manager)](https://nginxproxymanager.com/){target=_blank} verwendet.

## Zammad konfigurieren

- Rufen Sie die **Knowledge Base** in den Admin-Einstellungen auf und wählen
  Sie den Tab **Benutzerdefinierte URL** aus.
- Geben Sie die URL ein, unter der Sie Ihre Knowledge Base veröffentlichen
  möchten, und klicken Sie auf die Schaltfläche `Übermitteln`.
- Klicken Sie auf die Schaltfläche `Webserver-Konfiguration`, um die
  Konfiguration für NPM abzurufen. Sie können das Snippet bereits kopieren
  oder die Seite einfach geöffnet lassen - es wird für die NPM-Konfiguration
  benötigt.

## NPM konfigurieren

Fügen Sie in NPM einen neuen Proxy-Host mit den folgenden Parametern hinzu:

### Details Tab

- **Domain Names**: die Domain, unter der Sie Ihre Knowledge Base
  veröffentlichen möchten
- **Forwarded Hostname / IP**: der Hostname bzw. die IP Ihrer Zammad-Instanz
- **Forward Port**: Der Port Ihres Zammad (standardmäßig `8080` bei einem
  Portainer-Setup)

![Screenshot zeigt Dialog der NPM-Konfiguration mit "Details"
Tab](/screenshots/tutorials/custom-kb-url/npm-details-tab.png)

### Custom location Tab

- **Define location**: `/`
- **Forward Hostname / IP**: wie oben
- **Forward Port**: wie oben
- Klicken Sie auf das Zahnrad, um das Textfeld für die "custom location
  configuration" zu öffnen, und fügen Sie `proxy_set_header X-ORIGINAL-URL
  $request_uri;` ein (der untere Teil aus dem Zammad-Snippet)

![Screenshot zeigt Dialog der NPM-Konfiguration mit "custom locations"
Tab](/screenshots/tutorials/custom-kb-url/npm-custom-locations-tab.png)

### Advanced Tab

**Custom Nginx Configuration**: Fügen Sie den oberen Teil des Zammad-Snippets hinzu,
der in etwa wie folgt aussehen sollte:

```text
# Add following lines to "server" directive
if ($host = help.your.domain ) {
  rewrite ^/(api|assets)/(.*)$ /$1/$2 last;
  rewrite ^(.*)$ /help$1 last;
}
```

![Screenshot zeigt Dialog der NPM-Konfiguration mit "advanced"
Tab](/screenshots/tutorials/custom-kb-url/npm-advanced-tab.png)

Nachdem Sie diese Schritte befolgt haben, sollte Ihre Knowledge Base unter
einer benutzerdefinierten URL veröffentlicht sein. Sie können dies testen,
indem Sie in Ihrer Knowledge Base auf die Vorschau-Schaltfläche klicken.
