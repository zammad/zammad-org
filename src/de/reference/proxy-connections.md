---
order: 10
title: 'Proxy und Verbindungen'
---

# Proxy und Verbindungen

## Proxy

Dieser Abschnitt beinhaltet die Proxy-Konfiguration mittels
Umgebungsvariablen. Alternativ ist die Proxy-Konfiguration auch über die
Zammad-Benutzeroberfläche möglich. Weitere Informationen dazu finden Sie im
Netzwerk-Abschnitt der Admin-Dokumentation.

|                                              | GUI Konfiguration | Umgebungsvariable         |
|----------------------------------------------|-------------------|---------------------------|
| Zugriff auf Host-OS erforderlich             | Nein              | Ja                        |
| Automatische Ausnahme von Loopback-Adressen  | Ja                | Nein                      |
| Konfigurationsprüfung                        | Ja                | Manuell per Test-Skript   |
| Ausnahmen                                    | Ja                | Nein                      |

Die folgenden Umgebungsvariablen können zur Konfiguration der
Proxy-Einstellungen verwendet werden. Passen Sie die Werte entsprechend
Ihrer Umgebung an.

`HTTP_PROXY`
: Variable für HTTP-Verkehr. Setzen Sie sie auf die Adresse Ihres Proxy-Servers, einschließlich des Ports. Funktioniert nicht im
  Docker-Kontext. Beispiel:

  ```sh
  export HTTP_PROXY="http://127.0.0.1:8080"
  ```

`HTTPS_PROXY`
: Variable für HTTPS-Verkehr. Setzen Sie sie auf die Adresse Ihres Proxy-Servers, einschließlich des Ports. Funktioniert nicht im
  Docker-Kontext. Beispiel:

  ```sh
  export HTTPS_PROXY="http://127.0.0.1:8080"
  ```

`NO_PROXY`
: Variable für Adressen, auf die direkt und ohne Proxy zugegriffen werden soll. Erwartet eine kommagetrennte Liste von Adressen
  und unterstützt Wildcards. Verwenden Sie einen führenden `.` als Platzhalter für Subdomains. Das Beispiel `.example.com`
  schließt example.com und alle seine Subdomains ein. Achten Sie darauf, dass Sie Loopback-Adressen einschließen, damit sie nicht über den
  Proxy geleitet werden. Beispiel:

  ```sh
  export NO_PROXY="localhost,127.0.0.1,.example.com"
  ```

`ES_JAVA_OPTS`
: Variable für die Einstellung eines Proxys für Elasticsearch. Standardmäßig kommuniziert Elasticsearch nicht mit externen Systemen
  während des Betriebs. Es kann jedoch Fälle geben, in denen dies erforderlich ist, zum Beispiel beim Herunterladen des Ingest-Plugins
  für Elasticsearch-Versionen unter 8. Beispiel:

  ```sh
  export ES_JAVA_OPTS="-Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=8080 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=8080"
  ```

:::tip
Je nach Ihrer Umgebung benötigen Sie vielleicht auch die klein geschriebene Variante der Variablen. Im Zweifelsfall setzen Sie
beide Varianten, indem Sie sie zusätzlich mit den Werten der großgeschriebenen Varianten angeben:

```sh
export http_proxy=$HTTP_PROXY
```

:::

## Externe Verbindungen

Während der Installation und des Betriebs von Zammad sind einige
Verbindungen zu Online-Diensten erforderlich. Abhängig von Ihrer
Installationsmethode und der Konfiguration von Zammad wird eine Verbindung
zu den folgenden Diensten hergestellt (vielleicht auch hilfreich für die
Firewall-Konfiguration):

| Addresse                     | Kommentar                                             |
|------------------------------|-------------------------------------------------------|
| artifacts.elastic.co         | Download des Ingest-Plugins (nur für ES < 8)          |
| dl.packager.io               | Download des OS-Pakets (Paketinstallation)            |
| go.packager.io               | Wie oben; neuer Paket-Hosting-Dienst                  |
| geo.zammad.com               | Wird für Geodaten verwendet                            |
| google.com                   | Download von Feiertagen für den Kalender              |
| index.rubygems.org           | Download von Gems für Ruby                             |
| registry.npmjs.org           | Download von JS-Abhängigkeiten                         |

Sie können ein Skript verwenden, um den Verbindungsstatus Ihres Systems zu
überprüfen. Es versucht, eine Verbindung zu den oben genannten Diensten
herzustellen und zeigt das Ergebnis an. Wenn alle Verbindungen erfolgreich
waren, zeigt es für jeden kontaktierten Dienst ein Häkchen an. Führen Sie es
aus, indem Sie es entweder aus der Paketquelle von Zammad abrufen oder die
lokale Version auf Ihrem Zammad-Server ausführen.

**Skript online abrufen:**

```sh
curl -fsSL https://raw.githubusercontent.com/zammad/zammad/refs/heads/stable/contrib/packager.io/test_download_dependencies_connection.sh | sh
```

**Lokales Skript verwenden:**

```sh
/opt/zammad/contrib/packager.io/test_download_dependencies_connection.sh
```
