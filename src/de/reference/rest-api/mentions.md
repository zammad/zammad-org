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
If you want to mention/subscribe other users, you can do so by sending
an additional `From`-header in your request. You can either
provide the user ID or the user email address as value.
:::

## Löschen

Erforderliche Berechtigung: `ticket.agent`

`DELETE`-Anfrage gesendet: `/api/v1/mentions/{id}`

::: details Show response

<<< @/fixtures/rest-api/mentions/delete-id-res.json

:::
