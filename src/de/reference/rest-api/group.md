---
order: 2
title: Gruppe
---

# Gruppe

::: info
- Bitte beachten Sie, dass `follow_up_possible` möglicherweise nicht wie
  erwartet funktioniert. Die möglichen Werte sind `yes` oder `new_ticket`!
- Wenn Sie **Untergruppen** erstellen oder aktualisieren möchten, verwenden
  Sie `::` als Trennzeichen für die Namen. Sie müssen auch die gesamte
  Hierarchie im Namen nennen. Beispiel: "Vertrieb::Europa::Süd"
:::

## Auflisten

Erforderliche Berechtigung: `admin.group`

`GET`-Anfrage gesendet: `/api/v1/groups`

::: details Show response

<<< @/fixtures/rest-api/groups/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.group`

`GET`-Anfrage gesendet: `/api/v1/groups/{id}`

::: details Show response

<<< @/fixtures/rest-api/groups/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.group`

`POST`-Anfrage gesendet: `/api/v1/groups`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/post-req.json

=== Response

<<< @/fixtures/rest-api/groups/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.group`

`PUT`-Anfrage gesendet: `/api/v1/groups/{id}`

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/groups/put-id-req.json

=== Response

<<< @/fixtures/rest-api/groups/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.group`

`DELETE`-Anfrage gesendet: `/api/v1/groups/{id}`

::: danger

**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Gruppen nicht rückgängig gemacht werden kann.

Das Entfernen von Organisationen mit Referenzen in z.B. Aktivitäts-Verläufen oder
Tickets ist über die API nicht möglich - dies wird angezeigt durch
`"Fehler": "Kann nicht gelöscht werden, Objekt hat Referenzen."`. Dies ist *kein* Fehler.

Erwägen Sie stattdessen, betroffene Gruppen auf inaktiv zu setzen oder sicherzustellen, dass
alle bestehenden Tickets in neue Gruppen verschoben werden.

:::

::: details Show response

<<< @/fixtures/rest-api/groups/delete-id-res.json

:::
