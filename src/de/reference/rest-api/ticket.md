---
order: 19
title: Ticket
---

# Ticket

::: warning
Ticket-Endpunkte hängen von den Gruppenberechtigungen ab und ob der Benutzer, den Sie
verwenden, ein **Agent** ist. Aus diesem Grund können Tickets unter Umständen nicht
verfügbar sein.
:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/tickets`

::: details

<<< @/fixtures/rest-api/tickets/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: details

<<< @/fixtures/rest-api/tickets/get-ticket-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`POST`-Anfrage gesendet: `/api/v1/tickets`

::: tip
**Im Namen anderer Benutzer**

Wenn Sie Tickets im Namen anderer Benutzer erstellen möchten, verwenden Sie das
Attribut `customer_id`. Das Attribut `ticket.agent` ist dabei zwingend erforderlich. Verwenden Sie
`guess:{E-Mail-Adresse}`, um einen API-Aufruf zu speichern, wenn Sie die
ID des Benutzers nicht kennen oder den betreffenden Benutzer anlegen wollen
(`customer_id: "guess:jane@doe.com"`).

**Erwähnungen sofort hinzufügen**

Fügen Sie das Attribut `mentions` zu Ihrer Ticket-Nutzlast hinzu und übermitteln Sie ein
Array von Benutzer-IDs, um sie direkt bei der Erstellung des Tickets als Abonnenten anzulegen.

Z.B.: `"mentions": [1, 5, 7, 8],`

:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/post-req.json

=== Response

<<< @/fixtures/rest-api/tickets/post-res.json

:::
::::

::: tip
Weitere Artikel-Attribute und Optionen finden Sie unter
[Artikel](/de/reference/rest-api/articles).
:::

## Aktualisierung

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`PUT`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: tip
**Benachrichtigungen unterdrücken:** Um eine Aktualisierung eines Tickets ohne Benachrichtigungen an Agenten (per E-Mail und in der App) auszulösen, fügen Sie Ihrer Anfrage den
folgenden HTTP-Header hinzu:

```plain
X-Zammad-Suppress-Notifications: true
```

Dies ist nützlich für automatisierte Integrationen, die Tickets über Webhooks oder Trigger aktualisieren, um Benachrichtigungsschleifen zu vermeiden. Der
Header wirkt sich nur auf Administrator- und Agenten-Konten aus und wird für Kunden ignoriert. Der Header funktioniert auch für den `POST /api/v1/ticket_articles`
Endpunkt.
:::

::::: details

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/tickets/put-ticket-id-req.json

::: info
Das obige Beispiel liefert einen Artikel. Dieser Artikel ist ein _neuer Artikel_ und
hat keine Auswirkungen auf bestehende Artikel.
:::

=== Response

<<< @/fixtures/rest-api/tickets/put-ticket-id-res.json

::::
:::::

::: tip
**Anhänge hinzufügen**

Die Nutzlast von Anhängen ist identisch mit dem `POST`-Request, es wird stattdessen
lediglich `PUT` verwendet.
:::

## Löschen

Erforderliche Berechtigung: `admin`

`DELETE`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

::: danger

**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Tickets nicht rückgängig gemacht werden kann. Alle Daten (z.B.
Artikel & Anhänge) gehen dabei verloren.
:::

::: details

Response:

<<< @/fixtures/rest-api/tickets/delete-ticket-id-res.json

:::
