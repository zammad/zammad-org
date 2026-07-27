---
order: 10
title: Benachrichtigung
---

# Online notification

::: info
Die Verfügbarkeit von Benachrichtigungen hängt stark von der Berechtigung
des Benutzers und den gewählten Benachrichtigungseinstellungen ab.

Bitte beachten Sie, dass die besten Ergebnisse immer mit _Agenten_ erzielt werden.
:::

## Auflisten

Erforderliche Erlaubnis: `any`

`GET`-Anfrage gesendet: `/api/v1/online_notifications?expand=true`

::: tip
Verwenden Sie den Erweiterungs-Parameter, um die betroffenen Objekte zu ermitteln. Ansonsten
müssen Sie herausfinden, welche ID für welchen Objekttyp steht.
:::

::: details

<<< @/fixtures/rest-api/online_notifications/get-res.json

:::

## Anzeigen

Erforderliche Erlaubnis: `any`

`GET`-Anfrage gesendet: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/get-id-res.json

:::

## Aktualisierung

Erforderliche Erlaubnis: `any`

`PUT`-Anfrage gesendet: `/api/v1/online_notifications/{id}`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/online_notifications/put-id-req.json

=== Response

<<< @/fixtures/rest-api/online_notifications/put-id-res.json

:::
::::

## Löschen

Erforderliche Erlaubnis: `any`

`DELETE`-Anfrage gesendet: `/api/v1/online_notifications/{id}`

::: details

<<< @/fixtures/rest-api/online_notifications/delete-id-res.json

:::

## Mark all as read

Erforderliche Erlaubnis: `any`

`POST`-Anfrage gesendet: `/api/v1/online_notifications/mark_all_as_read`

::: details

<<< @/fixtures/rest-api/online_notifications/mark_all_as_read/post-res.json

:::
