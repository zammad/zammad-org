---
order: 2
title: Benutzer
---

# Benutzer

::: info
Bitte beachten Sie, dass die folgenden Beispiele mit den Berechtigungen `admin` und
`ticket.agent` erstellt wurden. Einige Attribute/Informationen sind andernfalls möglicherweise nicht
verfügbar.
:::

## Ich - Aktueller Benutzer

Erforderliche Berechtigung: beliebig

`GET`-Anfrage gesendet: `/api/v1/users/me`

::: details Show response

<<< @/fixtures/rest-api/users/me/get-res.json

:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.user`

`GET`-Anfrage gesendet: `/api/v1/users`

::: details Show response

<<< @/fixtures/rest-api/users/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.user` **oder**
`ticket.customer` (teilende Organisation)

::: info
Technisch gesehen werden bei allen Auflistungen nur die Informationen des Benutzers selbst angezeigt.
:::

`GET`- Anfrage gesendet: `/api/v1/users/{id}`

::: details Show response

<<< @/fixtures/rest-api/users/get-user-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.user` **oder** `ticket.agent`

`POST`-Anfrage gesendet: `/api/v1/users`

::: tip
**Dies hängt von den Berechtigungen ab**

Agenten können keine Benutzer-Passwörter, Rollen oder Gruppenberechtigungen festlegen. Stattdessen
verwendet Zammad die Standardrolle für neue Anmeldungen. Prüfen Sie in Zammads Verwaltungsoberfläche
unter _Verwaltung > Rollen_, welche Rolle als **Aktiv bei Neuanmeldung** ausgewählt ist.

Technisch gesehen ist die Erstellung nicht authentifizierter Benutzer möglich, wenn Sie es schaffen
das erforderliche CSRF Token bereitzustellen (dies ist nicht Gegenstand dieser
Dokumentation). Wenn Sie das nicht wollen, sollten Sie
die Registrierung von Benutzern unter _Einstellungen > Sicherheit > Basis_ deaktivieren, indem Sie
**Neue Benutzer-Konten** auf nein setzen.
:::

::: tip
Sind Sie unsicher, welche Attribute Sie verwenden oder einstellen können? Führen Sie eine GET-Abfrage für einen
Benutzer aus, der bereits in Ihrer Instanz vorhanden ist.
:::

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/post-req.json

=== Response

<<< @/fixtures/rest-api/users/post-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.user` **oder** `ticket.agent`

`PUT`-Anfrage gesendet: `/api/v1/users/{id}`

::: tip
**Dies hängt von den Berechtigungen ab**

Agenten können keine Benutzer-Passwörter, Rollen oder Gruppenberechtigungen festlegen. Stattdessen
wendet Zammad die Standardrolle für die Neunnmeldung an. Prüfen Sie in Zammads Verwaltungsoberfläche
unter _Verwaltung > Rollen_, welche Rolle als **Aktiv bei Neuanmeldung** ausgewählt ist.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/put-id-req.json

=== Response

<<< @/fixtures/rest-api/users/put-id-res.json

:::
::::

## Löschen

Erforderliche Berechtigung: `admin.user`

`DELETE`-Anfrage gesendet: `/api/v1/users/{id}`

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Benutzern nicht rückgängig gemacht werden kann. Zammad wird auch
Referenzen entfernen - also möglicherweise auch Tickets!

Das Entfernen von Benutzern mit Referenzen in z.B. Aktivitäts-Verläufen ist nicht möglich
über API - dies wird angezeigt durch
`"Fehler": "Kann nicht gelöscht werden, Objekt hat Referenzen"`. Dies ist _kein_ Fehler.

Erwägen Sie die Verwendung von Zammads Datenschutzfunktion über die Benutzeroberfläche für
mehr Kontrolle (Admin-Interface unter _System > Datenschutz_).
:::

::: details Show response

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
