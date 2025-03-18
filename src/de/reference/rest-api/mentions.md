---
order: 9
title: Erwähnungen
---

# Erwähnungen

::: warning
Der Erwähnungsendpunkt hängt von den Gruppenberechtigungen ab und davon, ob der Benutzer
ein **Agent** ist. Aus diesem Grund können Tickets verfügbar sein
oder auch nicht.
:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/mentions`

::: details Show response

<<< @/fixtures/rest-api/mentions/get-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/mentions`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/mentions/post-req.json

=== Response

<<< @/fixtures/rest-api/mentions/post-res.json

:::
::::

Die Erwähnung wird für den Benutzer der aktuellen Sitzung erstellt.

::: tip
Wenn Sie andere Benutzer erwähnen oder ein Ticket für sie abbonieren möchten, können Sie dies tun, indem Sie
einen zusätzlichen `X-On-Behalf-Of`-Header in Ihrer Anfrage senden. Sie können entweder
die ID des Benutzers oder die E-Mail-Adresse des Benutzers als Wert angeben.
:::

## Löschen

Erforderliche Berechtigung: `ticket.agent`

`DELETE`-Anfrage gesendet: `/api/v1/mentions/{id}`

::: details Show response

<<< @/fixtures/rest-api/mentions/delete-id-res.json

:::
