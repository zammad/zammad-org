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

## Search via API

### Endpoint Search

Some endpoints support a search query. These are:

- `Groups <group>`
- `Organizations <organization>`
- `Roles <role>`
- `Tickets <ticket>`
- `Users <user>`

The following endpoints support a search query as well, but they are not
explicitly covered in this documentation:

- Chat Sessions
- Knowledgebase
- Macros
- Overview
- Templates
- Text module

#### Search Example

`GET`-Request sent: `/api/v1/tickets/search?query=welcome`

::: details Show response
<<< @/fixtures/rest-api/intro/get-basic-search.json
:::

#### Expand Parameter

If you want to have additional related information, you can use the `expand`
parameter. Using it resolves the IDs and outputs values/names in addition.

`GET`-Request sent: `/api/v1/tickets/search?query=welcome&expand=true`

::: details Show response
<<< @/fixtures/rest-api/intro/get-expand-search.json
:::

#### Full Parameter

You can even extend the response by using the `full` parameter. Be aware
that this response can be huge. It outputs all assets including related
attributes and a `total_count` of search results as well.

`GET`-Request sent: `/api/v1/tickets/search?query=welcome&full=true`

::: details Show response
<<< @/fixtures/rest-api/intro/get-full-search.json
:::


#### Only Total Count Parameter

Using this `only_total_count` parameter will output only the amount of
search results.

`GET`-Request sent:
`/api/v1/tickets/search?query=welcome&only_total_count=true`

::: details Show response
<<< @/fixtures/rest-api/intro/get-total-count.json
:::

### Global Search

If you need to search not only in a specific object type, you can do so by
using the global search without specifying an object. The response may
include users, tickets, organizations, knowledgebase articles and answers
and chats, depending on your system and content. This global search behaves
like the search in Zammad's UI in the left task bar. The available
parameters are different to the ones for the endpoint search.

`GET`-Request sent: `/api/v1/search?query=welcome`

::: details Show response
<<< @/fixtures/rest-api/intro/get-global-search.json
:::

### Condition Based Search

You can even use conditions like for triggers and schedulers to search via
API. If you don't want to build such conditions manually, you can find a
hint below how to quickly build a condition structure via UI and fetch it
for you API request.

So, how do I build such a condition based request?

- In Zammad, go to the admin interface and create a condition, e.g. by
  creating a new overview or trigger. It can be inactive so you won't have
  any unwanted actions or changes.
- Go to the `Rails console </admin/console>`, either by using `rails c` /
  `zammad run rails c` or adding the prefix `rails r` / `zammad run rails r`
  in front of the commands below, depending on your setup.
- Search for the created condition, adjust the following examples to your
  needs:

``` ruby
puts Overview.find_by(name: 'My test overview').attributes.slice('condition').to_json
```

``` ruby
puts Trigger.find_by(name: 'My new test trigger').attributes.slice('condition').to_json
```

This leads to an output like the following:

::: details Show output
<<< @/fixtures/rest-api/intro/condition-based-search.json
:::

Use this as payload in your `POST`-Request in an endpoint search. The
response includes the same objects as the trigger or overview you created.

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
