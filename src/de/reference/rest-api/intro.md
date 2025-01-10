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

- [Ruby Client](https://github.com/zammad/zammad-api-client-ruby)
  *(offiziell)*
- [PHP Client](https://github.com/zammad/zammad-api-client-php)
  *(offiziell)*
- [Python Client](https://pypi.org/project/zammad-py/) *(Third-Party)*
- [.NET Client](https://github.com/Asesjix/Zammad-Client) *(Third-Party)*
- [Android API-Client](https://github.com/KirkBushman/zammad-android)
  *(Third-Party)*
- [Go Client](https://github.com/AlessandroSechi/zammad-go) *(Third-Party;
  nur API-Client, keine "gebrauchsfertige" Anwendung)*

## Authentifizierung

Zammad unterstützt drei verschiedene Authentifizierungsmethoden für seine
API.

### HTTP-Basisauthentifizierung (Benutzername/Kennwort)

Der Benutzername / das Passwort muss als HTTP Header im HTTP-Aufruf
angegeben werden.  Diese Authentifizierungsmethode kann deaktiviert werden
und ist möglicherweise in Ihrem System nicht verfügbar.

```sh
$ curl -u {username}:{password} https://{fqdn}/{endpoint}
```

:::warning
Wir raten dringend von der Verwendung der Basisauthentifizierung ab. Verwenden Sie
Zugangs-Token, wann immer möglich!
:::

### HTTP-Token-Authentifizierung (Zugangs-Token)

Das Zugangs-Token muss als HTTP Header im HTTP-Aufruf angegeben werden.
Jeder Benutzer kann in seinen Benutzereinstellungen mehrere Zugangs-Token
erstellen.  Diese Authentifizierungsmethode kann deaktiviert werden und ist
möglicherweise in Ihrem System nicht verfügbar.

```sh
$ curl -H "Authorization: Token token={your_token}" https://{fqdn}/{endpoint}
```

### OAuth2 (Token-Zugang)
Das Token muss als HTTP Header in Ihren Aufrufen angegeben werden.  Dies
ermöglicht es Anwendungen von Drittanbietern, sich gegenüber Zammad zu
authentifizieren.

```sh
$ curl -H "Authorization: Bearer {your_token}" https://{fqdn}/{endpoint}
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

Zammad gibt JSON-Payloads zurück, wenn Sie Daten abrufen. Wenn Sie Daten
bereitstellen, unabhängig vom allgemeinen Anfragetyp, vergessen Sie nicht,
auch den Inhaltstyp `application/json` anzugeben.

## Antwort-Payloads (erweitern)

Zammad gibt immer Informationen einschließlich Hinweisen zu allen
Beziehungen zurück. Wenn Sie mehr Informationen benötigen (weil IDs
möglicherweise nicht ausreichen), können Sie Ihre Endpunktaufrufe auch mit
`?expand=true` erweitern.

Dieser Schalter liefert noch mehr Informationen - zumindest benannte
Beziehungen zusätzlich zu den ID-Beziehungen. Nachfolgend finden Sie zwei
Beispiele, eines für ein Ticket und eines für einen Benutzer:

:::: details
:::tabs

=== Benutzer Payload

<<< @/fixtures/rest-api/users/get-id-res.json

=== Ticket Payload

<<< @/fixtures/rest-api/tickets/get-id-res.json

:::
::::

:::tip
Bitte beachten Sie, dass Core Workflows den Zugriff auf Attribute oder
Werte beschränken können.
:::

## Pagination

Da Zammad die Anzahl der zurückgegebenen Objekte aus Leistungsgründen
begrenzt, müssen Sie an einigen Stellen eine Paginierung verwenden.

:::info
**Anzahl der zurückgegebenen Objekte:** Zammad hat eine harte Grenzen für die
maximal zurückgegebenen Objekte. Sie können diese Grenzen nicht überschreiten.

**Gesamtzahl der zurückzugebenden Objekte:** Zammad bietet keine
Gesamtanzahl der für Ihre Abfrage verfügbaren Objekte. Dies zwingt Sie dazu,
durch die Seiten zu blättern, bis Zammad keine weiteren Objekte mehr zurückgibt.
:::

Um die Paginierung zu verwenden, benötigen Sie zwei get-Optionen: `per_page`
und `page`. Kombinieren Sie sie, um 5 Ergebnisse von der ersten
Ergebnisseite zu erhalten: `?page=1&per_page=5`. Erhöhen Sie die Seitenzahl,
um mehr Ergebnisse zu erhalten.

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

:::tip
In der Regel werden Sie beide Parameter in Ihrer Suche kombinieren wollen,
z.B.: ?query={Suchstring}&sort_by={Zeilenname}&order_by={Richtung}`
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
Wikipedia-Artikel] (https://de.wikipedia.org/wiki/URL-Encoding) hilfreich
sein

[^1]: **Re**presentational **S**tate **T**ransfer - **A**pplication
**P**rogramming **I**nterface)
