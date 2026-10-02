---
order: 10
title: Webhook
---

# Webhook

::: info
Webhooks werden von [Triggern](/de/reference/rest-api/trigger) über
den Parameter `notification.webhook` zur Aktions-Ausführung angesprochen
(`{"notification.webhook": {"webhook_id": <id>}}`). Erstellen Sie
zunächst den Webhook und verweisen Sie anschließend in einem oder mehreren
Triggern auf dessen `id`.
:::

## Auflisten

Erforderliche Berechtigung: `admin.webhook`

`GET`-Request gesendet: `/api/v1/webhooks`

::: details

<<< @/fixtures/rest-api/webhooks/get-res.json

:::

::: info
`signature_token`, `basic_auth_password` und `bearer_token` werden
nach ihrer Festlegung als `**********` zurückgegeben. Die API gibt die gespeicherten
Geheimnisse niemals aus. Felder, die nicht gesetzt sind, werden als `null` ausgegeben.
:::

## Anzeigen

Erforderliche Berechtigung: `admin.webhook`

`GET`-Request gesendet: `/api/v1/webhooks/{id}`

::: details

<<< @/fixtures/rest-api/webhooks/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.webhook`

`POST`-Request gesendet: `/api/v1/webhooks`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/webhooks/post-req.json

=== Response

<<< @/fixtures/rest-api/webhooks/post-res.json

:::

::::

::: info
`ssl_verify` ist für `https://` Endpunkte von Bedeutung; setzen Sie den Wert
auf `true`, um das TLS-Zertifikat des Endpunkts zu überprüfen. Es ist nur für einen
reinen `http://` Endpunkt sinnvoll, den Wert auf `false` zu setzen, falls dieser gar kein
Zertifikat besitzt, das überprüft werden kann.
:::

## Aktualisierung

Erforderliche Berechtigung: `admin.webhook`

`PUT`-Request gesendet: `/api/v1/webhooks/{id}`

Die Struktur der Nutzlast entspricht der von Create. Die Antwort besteht aus
dem aktualisierten Datensatz, dessen Struktur der von Show/Create
entspricht, wobei `updated_at` aktualisiert wird.

::: tip
Auch eine teilweise Nutzlast funktioniert, z.B. `{"active": false}`, um nur
dieses Feld umzuschalten.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/webhooks/put-id-req.json

=== Response

<<< @/fixtures/rest-api/webhooks/put-id-res.json

:::

::::

## Löschen

Erforderliche Berechtigung: `admin.webhook`

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Webhooks nicht rückgängig gemacht werden kann.
:::

Ein Webhook, der noch von der `perform` Aktion eines anderen Objekts
(z.B. einem [Trigger](/de/reference/rest-api/trigger)) referenziert wird,
kann nicht gelöscht werden. Die API antwortet mit `422 Unprocessable Entity`
und listet die referenzierenden Objekte auf. Entfernen Sie zuerst diese
Referenzen.

`DELETE`-Request gesendet: `/api/v1/webhooks/{id}`

::: details

<<< @/fixtures/rest-api/webhooks/delete-id-res.json

:::

::: details

<<< @/fixtures/rest-api/webhooks/delete-referenced-res.json

:::
