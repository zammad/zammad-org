---
order: 1
title: Einführung
---

# Einführung

Zammad bietet eine leistungsstarke REST-API[^1], die alle Operationen
ermöglicht, die auch über die Benutzeroberfläche verfügbar sind.

Auf dieser Seite erhalten Sie einen ersten Eindruck von den Dingen, die
generell für alle Endpunkte gelten und wie Sie sie anpassen können.

## API-Clients

Es sind einige API Clients verfügbar. Bitte beachten Sie, dass diese Clients
möglicherweise nicht Zugang zu allen hier aufgeführten Endpunkten bieten.

- [Ruby
  Client](https://github.com/zammad/zammad-api-client-ruby){target=_blank}
  (offiziell)
- [PHP
  Client](https://github.com/zammad/zammad-api-client-php){target=_blank}
  (offiziell)
- [Python Client](https://pypi.org/project/zammad-py/){target=_blank} (third
  party)
- [.NET Client](https://github.com/Asesjix/Zammad-Client){target=_blank}
  (third party)
- [Android
  API-Client](https://github.com/KirkBushman/zammad-android){target=_blank}
  (third party)
- [Go Client](https://github.com/AlessandroSechi/zammad-go){target=_blank}
  (third party; nur API-Client, keine "gebrauchsfertige" Anwendung)

## Authentifizierung

Zammad unterstützt drei verschiedene Authentifizierungsmethoden für seine
API.

### HTTP-Basisauthentifizierung (Benutzername/Kennwort)

Der Benutzername / das Passwort muss als HTTP Header im HTTP-Aufruf
angegeben werden.  Diese Authentifizierungsmethode kann deaktiviert werden
und ist möglicherweise in Ihrem System nicht verfügbar.

```sh
curl -u {username}:{password} https://{fqdn}/{endpoint}
```

::: warning
Wir raten dringend von der Verwendung der Basisauthentifizierung ab. Verwenden Sie
Zugangs-Token, wann immer möglich!
:::

### HTTP-Token-Authentifizierung (Zugangs-Token)

Das Zugangs-Token muss als HTTP Header im HTTP-Aufruf angegeben werden.
Jeder Benutzer kann in seinen Benutzereinstellungen mehrere Zugangs-Token
erstellen.  Diese Authentifizierungsmethode kann deaktiviert werden und ist
möglicherweise in Ihrem System nicht verfügbar.

```sh
curl -H "Authorization: Token token={your_token}" https://{fqdn}/{endpoint}
```

### OAuth2 (Token-Zugang)

Das Token muss als HTTP Header in Ihren Aufrufen angegeben werden.  Dies
ermöglicht es Anwendungen von Drittanbietern, sich gegenüber Zammad zu
authentifizieren.

```sh
curl -H "Authorization: Bearer {your_token}" https://{fqdn}/{endpoint}
```

## Endpunkte und Beispieldaten

Der Einfachheit halber werden wir auf den nächsten Seiten keine spezifischen
Befehle angeben, sondern stattdessen die mögliche Aufrufmethode (z.B. `GET`)
und den zu verwendenden Endpunkt (z.B. `/api/v1/users`). Für den Fall, dass
Zammad Informationen innerhalb dieser Endpunkt-URLs erwartet, setzen wir sie
in geschweifte Klammern wie folgt: `/api/v1/users/{user id}`

Das Antwortformat ist eine vollständige JSON-Antwort von einer
Standardinstanz von Zammad. Bitte denken Sie daran, dass Sie möglicherweise
weitere Felder oder allgemeine Informationen sehen, falls Sie Objekte oder
andere Informationen hinzugefügt haben.

## Inhalts-Typ

Zammad gibt JSON-Nutzlast zurück, wenn Sie Daten abrufen. Wenn Sie Daten
bereitstellen, unabhängig vom allgemeinen Anfragetyp, vergessen Sie nicht,
auch den Inhaltstyp `application/json` anzugeben.

## Antwort-Nutzlast (erweitern)

Zammad gibt immer Informationen einschließlich Hinweisen zu allen
Beziehungen zurück. Wenn Sie mehr Informationen benötigen (weil IDs
möglicherweise nicht ausreichen), können Sie Ihre Endpunktaufrufe auch mit
`?expand=true` erweitern.

Dieser Schalter liefert noch mehr Informationen - zumindest benannte
Beziehungen zusätzlich zu den ID-Beziehungen. Nachfolgend finden Sie zwei
Beispiele, eines für ein Ticket und eines für einen Benutzer:

**Benutzer Nutzlast:**

:::: details
::: tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-user-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-user-expand-false-res.json

:::
::::

**Ticket Nutzlast:**

:::: details
::: tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-ticket-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-ticket-expand-false-res.json

:::
::::

::: tip
Bitte beachten Sie, dass Core Workflows den Zugriff auf Attribute oder
Werte beschränken können.
:::

## Pagination

Da Zammad die Anzahl der zurückgegebenen Objekte aus Leistungsgründen
begrenzt, müssen Sie an einigen Stellen eine Paginierung verwenden.

::: info
**Anzahl der zurückgegebenen Objekte:** Zammad hat eine fest programmierte Grenze für die
maximal zurückgegebenen Objekte. Sie können diese Grenze nicht überschreiten.

**Gesamtzahl der zurückzugebenden Objekte:** Zammad gibt keine Gesamtzahl der
Objekte zurück, die in der Antwort enthalten sind, es sei denn, Sie fordern dies ausdrücklich an. Um
die Anzahl der Suchergebnisse einzubeziehen, verwenden Sie den Parameter `with_total_count` oder `only_total_count`.
:::

Um die Paginierung zu verwenden, benötigen Sie zwei get-Optionen: `per_page`
und `page`. Kombinieren Sie sie, um 5 Ergebnisse von der ersten
Ergebnisseite zu erhalten: `?page=1&per_page=5`. Erhöhen Sie die Seitenzahl,
um mehr Ergebnisse zu erhalten.

## Suche per API

### Endpunkt-Suche

Einige Endpunkte unterstützen eine Suchanfrage. Diese sind:

- `Gruppen <group>`
- `Organisationen <organization>`
- `Rollen <role>`
- `Tickets <ticket>`
- `Benutzer <user>`

Die folgenden Endpunkte unterstützen ebenfalls eine Suchanfrage, werden aber
in dieser Dokumentation nicht explizit behandelt:

- Chat-Sitzungen
- Knowledge Base
- Makros
- Übersicht
- Vorlagen
- Textbaustein

#### Beispiel für eine Suche

`GET`-Request gesendet: `/api/v1/tickets/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-basic-search-res.json
:::

#### Expand Parameter

Wenn Sie zusätzliche erweiterte Informationen wünschen, können Sie den
Parameter `expand` verwenden. Mit ihm werden die IDs aufgelöst und
zusätzlich Werte/Namen ausgegeben.

`GET`-Request gesendet: `/api/v1/tickets/search?query=welcome&expand=true`

::: details
<<< @/fixtures/rest-api/intro/get-expand-search-res.json
:::

#### Full Parameter

Sie können die Antwort sogar noch erweitern, indem Sie den Parameter `full`
verwenden. Seien Sie sich bewusst, dass diese Antwort sehr umfangreich sein
kann. Sie gibt alle Assets aus, einschließlich der zugehörigen Attribute und
einer `total_count` genannten Gesamtzahl der Suchergebnisse.

`GET`-Request gesendet: `/api/v1/tickets/search?query=welcome&full=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-res.json
:::

#### With Total Count Parameter

Mit diesem Parameter wird zusätzlich die Anzahl der Suchergebnisse
ausgegeben.  Er kann mit `full` und `expand` kombiniert werden.

`GET`-Request gesendet:
`/api/v1/tickets/search?query=welcome&full=true&with_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-with-total-count-res.json
:::

#### Only Total Count Parameter

Mit dem Parameter `only_total_count` wird nur die Anzahl der Suchergebnisse
ausgegeben.

`GET`-Request gesendet:
`/api/v1/tickets/search?query=welcome&only_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-total-count-res.json
:::

### Globale Suche

Wenn Sie nicht nur in einem bestimmten Objekttyp suchen möchten, können Sie
dies mit der globalen Suche ohne Angabe eines Objekts tun. Die Antwort kann
Benutzer, Tickets, Organisationen, Knowledge Base-Artikel und -Antworten
sowie Chats umfassen, je nach System und Inhalt. Diese globale Suche verhält
sich wie die Suche in Zammads UI in der linken Taskleiste. Die verfügbaren
Parameter unterscheiden sich von denen der Endpunktsuche.

`GET`-Request gesendet: `/api/v1/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-global-search-res.json
:::

### Bedingungsabhängige Suche

Sie können sogar Bedingungen wie in Triggern und Automatisierungen
verwenden, um über die API zu suchen. Wenn Sie solche Bedingungen nicht
manuell erstellen möchten, finden Sie unten einen Hinweis, wie Sie schnell
eine Bedingungsstruktur über die Benutzeroberfläche erstellen und für Ihre
API-Anfrage abrufen können.

Wie kann ich also eine solche bedingungsabhängige Anfrage erstellen?

- Rufen Sie in Zammad die Verwaltungsoberfläche auf und erstellen Sie eine
  Bedingung, z.B. indem Sie eine neue Übersicht oder einen neuen Trigger
  erstellen. Die erstellte Logik kann inaktiv sein, damit keine unerwünschte
  Aktion oder Änderung ausgeführt wird.
- Rufen Sie die `Rails-Konsole </admin/console>` auf, indem Sie entweder
  `rails c` / `zammad run rails c` verwenden oder den Präfix `rails r` /
  `zammad run rails r` vor den unten stehenden Befehlen hinzufügen, abhängig
  von Ihrem Setup.
- Suchen Sie nach der erstellten Bedingung, passen Sie die folgenden
  Beispiele an Ihr Szenario an:

``` ruby
puts Overview.find_by(name: 'My test overview').attributes.slice('condition').to_json
```

``` ruby
puts Trigger.find_by(name: 'My new test trigger').attributes.slice('condition').to_json
```

Dies führt zu einer Ausgabe wie der folgenden:

::: details
<<< @/fixtures/rest-api/intro/condition-based-search.json
:::

Verwenden Sie dies als Nutzlast in Ihrem `POST`-Request in einer
Endpunktsuche. Die Antwort enthält die gleichen Objekte wie der Trigger oder
die Übersicht, die Sie erstellt haben.

## Sortierung der Suchergebnisse

Zammad ermöglicht es Ihnen, Ihre Suchergebnisse bei Bedarf nach Feldern zu
sortieren.

### `sort_by`

Fügen Sie `?sort_by={Zeilenname}` an Ihre Abfrage an, um nach einer
bestimmten Zeile zu sortieren, die im Suchergebnis erscheint.

### `order_by`

Fügen Sie `?order_by={Richtung}` an Ihre Abfrage an, um zwischen
aufsteigender und absteigender Reihenfolge zu wechseln.

Die Richtungen sind: `asc` und `desc`.

::: tip
In der Regel werden Sie beide Parameter in Ihrer Suche kombinieren wollen,
z.B.: `?query={suchstring}&sort_by={row name}&order_by={direction}`
:::

## Handlungen im Namen anderer Benutzer

**Voraussetzung:** Der Benutzer, der die Abfrage ausführt, benötigt
die Berechtigung `admin.user`.

Wenn Sie API-Abfragen im Namen anderer Benutzer ausführen, können Sie
z.B. Tickets von einem anderen Benutzer erstellen lassen.

Fügen Sie dazu einen neuen HTTP Header mit dem Namen `From` zu Ihrer Anfrage
hinzu. Der Wert dieses Headers kann einer der folgenden sein:

- Benutzer ID
- Benutzer-Login
- Benutzer E-Mail

Die Option `from` ist für alle Endpunkte verfügbar.

## Kodierung

Die API erwartet eine UTF-8-Kodierung. Beachten Sie, dass Sie insbesondere
bei der Verwendung von URLs mit Get-Optionen (z. B. `?query=this`) Ihre URL
entsprechend kodieren müssen.

Wenn Sie mehr über die Kodierung von URLs erfahren möchten, könnte [dieser
Wikipedia-Artikel](https://de.wikipedia.org/wiki/URL-Encoding){target=_blank}
hilfreich sein

[^1]: **Re**presentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**nterface)
