---
order: 2
title: 'Tickets verknüpfen'
---

# Tickets verknüpfen

## Abrufen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin`

`GET`-Anfrage gesendet: `/api/v1/links`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/get-req.json

=== Response

<<< @/fixtures/rest-api/links/get-res.json

:::
::::

## Hinzufügen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin`

`POST`-Anfrage gesendet: `/api/v1/links/add`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/post-req.json

:::info
The value for `link_object_target` has to be the _ticket ID_. The
value for the `link_object_source_number` has to be the _ticket
number_.
:::

=== Response

<<< @/fixtures/rest-api/links/post-res.json

::::
:::::

## Löschen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin`

`DELETE`-Anfrage gesendet: `/api/v1/links/remove`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/links/remove/delete-req.json

=== Response

<<< @/fixtures/rest-api/links/remove/delete-res.json

:::
::::
