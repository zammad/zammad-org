---
order: 7
title: Organisation
---

# Organisation

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.organization`

::: info
Technisch können Kunden nur ihre eigene Organisation sehen, sofern zutreffend.
:::

`GET`-Anfrage gesendet: `/api/v1/organizations`

::: details Show response

<<< @/fixtures/rest-api/organizations/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.organization`

`GET`-Anfrage gesendet: `/api/v1/organizations/{id}`

::: info
Technisch können die betreffenden Benutzer nur ihre eigene Organisation sehen.
:::

::: details Show response

<<< @/fixtures/rest-api/organizations/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.organization`

`POST`-Anfrage gesendet: `/api/v1/organizations`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/post-req.json

=== Response

<<< @/fixtures/rest-api/organizations/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.organization`

`PUT`-Anfrage gesendet: `/api/v1/organizations/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/organizations/put-id-req.json

=== Response

<<< @/fixtures/rest-api/organizations/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.organization`

`DELETE`-Anfrage gesendet: `/api/v1/organizations/{id}`

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Organisationen nicht rückgängig gemacht werden kann.

Das Entfernen von Organisationen mit Referenzen in z.B. Aktivitäts-Verläufen oder Benutzern
ist über die API nicht möglich - dies wird angezeigt durch
`"Fehler": "Kann nicht gelöscht werden, Objekt hat Referenzen."`. Dies ist _kein_ Fehler.

Erwägen Sie die Verwendung von Zammads Datenschutzfunktion über die Benutzeroberfläche für
mehr Kontrolle.
:::

::: details Show response

Response:

<<< @/fixtures/rest-api/organizations/delete-id-res.json

:::
