---
order: 10
title: Trigger
---

# Trigger

::: info
Trigger können eine `notification.webhook`-Aktion ausführen, die einen
[Webhook](/de/reference/rest-api/webhook) anhand der ID
(`{"notification.webhook": {"webhook_id": <id>}}`) anstelle von oder
parallel zu `notification.email` ausführt. Erstellen Sie den Webhook zuerst und
verweisen Sie dann in der Trigger-Aktionsausführung auf diese `id`.
:::

## Auflisten

Erforderliche Berechtigung: `admin.trigger`

`GET`-Request gesendet: `/api/v1/triggers`

::: details

<<< @/fixtures/rest-api/triggers/get-res.json

:::

::: info
`recipient: "article_last_sender"` sendet eine E-Mail an jeden, der den auslösenden
Artikel verfasst hat. In diesem Beispiel ist dies immer der Kunde, da die
Bedingung `article.sender_id` auf `2` (Kunde) gesetzt sein muss. Wenn ein
Agent den Artikel verfasst hat, erhält der Agent die E-Mail stattdessen. Verwenden
Sie `recipient: "ticket_customer"` (siehe Create unten), um immer den
Kunden anzusprechen, ungeachtet dessen, wer die Aktion ausgeführt hat.
:::

## Anzeigen

Erforderliche Berechtigung: `admin.trigger`

`GET`-Request gesendet: `/api/v1/triggers/{id}`

::: details

<<< @/fixtures/rest-api/triggers/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.trigger`

`POST`-Request gesendet: `/api/v1/triggers`

`condition` akzeptiert zwei Formen: ein flaches Objekt, das über Feldnamen
indiziert (wie im List-Beispiel oben, das Zammads Standard-Trigger
entspricht), und die explizite `{"operator": "AND", "conditions": [...]}`
Form, die unten verwendet wird.

Im folgenden Beispiel führt das Schließen eines Tickets dazu, dass der Kunde
des Tickets eine Bestätigungs-E-Mail empfängt, weil `recipient:
"ticket_customer"` immer auf den Kunden aufgelöst wird, unabhängig davon,
wer die Schließaktion ausgeführt hat.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/triggers/post-req.json

=== Response

<<< @/fixtures/rest-api/triggers/post-res.json

:::

::::

## Aktualisierung

Erforderliche Berechtigung: `admin.trigger`

`PUT`-Request gesendet: `/api/v1/triggers/{id}`

Die Struktur der Nutzlast entspricht der von Create. Die Antwort besteht aus
dem aktualisierten Datensatz, dessen Struktur der von Show/Create
entspricht, wobei `updated_at` aktualisiert wird.

::: tip
Eine teilweise Nutzlast funktioniert ebenfalls, z.B. `{"active": false}`, um nur dieses
Feld umzuschalten. Um einen Trigger auf Basis seines Namens zu aktualisieren, suchen
Sie zuerst dessen `ID` mit `GET /api/v1/triggers`, und senden dann einen `PUT`-Request
an `/api/v1/triggers/{id}`.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/triggers/put-id-req.json

=== Response

<<< @/fixtures/rest-api/triggers/put-id-res.json

:::

::::

## Löschen

Erforderliche Berechtigung: `admin.trigger`

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Triggern nicht rückgängig gemacht werden kann.
:::

`DELETE`-Request gesendet: `/api/v1/triggers/{id}`

::: details

<<< @/fixtures/rest-api/triggers/delete-id-res.json

:::
