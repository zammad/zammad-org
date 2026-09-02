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

::: tip
**Benachrichtigungen unterdrücken:** Um ein Ticket zu erstellen oder eine Aktualisierung durchzuführen, ohne Benachrichtigungen an Agenten (per E-Mail und in der App) auszulösen, fügen Sie
Ihrer Anfrage den folgenden HTTP-Header hinzu:

```plain
X-Zammad-Suppress-Notifications: true
```

Dies ist nützlich für automatisierte Integrationen, die Tickets über Webhooks oder Trigger verwalten, um Benachrichtigungsschleifen zu vermeiden. Der
Header wirkt sich nur auf Administrator- und Agenten-Konten aus und wird für Kunden ignoriert.
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
**Im Namen von Benutzern**

Wenn Sie Tickets im Namen anderer Benutzer erstellen möchten, verwenden Sie das Attribut `customer_id`. Hierfür ist die Berechtigung `ticket.agent`
erforderlich. Ohne diese Berechtigung wird `customer_id` ignoriert und das Feld **Kunde** des Tickets auf den aktuellen Benutzer gesetzt. Verwenden Sie
`guess:{E-Mail-Adresse}`, um einen API-Aufruf zu sparen, falls Sie die Benutzer-ID nicht kennen oder den betreffenden Benutzer anlegen möchten
(`"customer_id": "guess:jane@doe.com"`).

Wenn Sie im Auftrag eines Kunden ein Ticket mit einem ersten Artikel erstellen, müssen Sie `article.sender` explizit auf "Customer" setzen. Ohne
diese Angabe wird der Absender standardmäßig auf "Agent" gesetzt (basierend auf den Berechtigungen des aktuellen Benutzers). Dies wirkt sich auf die
`create_article_sender_id` des Tickets und die Berechnungen des Zeitstempels für den Kontakt aus.

Das Gleiche gilt für Artikel, die später per PUT hinzugefügt werden: Legen Sie den Absender auch dort explizit fest, wenn Sie im Auftrag eines Kunden handeln.
Da der Absender eines Artikels nach der Erstellung nicht mehr geändert werden kann, ist es wichtig, dies bei der Artikelerstellung korrekt mitzugeben.

Weitere Einzelheiten zum Attribut "sender" finden Sie unter [Artikel](/de/reference/rest-api/articles).

:::

::: tip
**Fügen Sie das Benachrichtigungs-Abonnement gleich hinzu:**

Fügen Sie das Attribut `mentions` zu Ihrer Ticket-Nutzlast hinzu und geben Sie ein Array mit Benutzer-IDs an, um für diese
direkt bei der Ticket-Erstellung ein Benachrichtigungs-Abonnement zu erstellen.

Beispiel: `mentions: [1, 5, 7, 8],`

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
Das Attribut `sender` des ursprünglichen Artikels bestimmt die `create_article_sender_id` und Kontakt-Zeitstempel des Tickets.
Eine vollständige Liste der Artikelattribute und deren Funktionsweise finden Sie unter [Artikel](/de/reference/rest-api/articles).
:::

## Aktualisierung

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`PUT`-Anfrage gesendet: `/api/v1/tickets/{ticket id}`

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
