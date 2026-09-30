---
order: 10
title: Benutzer
---

# Benutzer

::: info
Bitte beachten Sie, dass die folgenden Beispiele mit den Berechtigungen `admin` und
`ticket.agent` erstellt wurden. Einige Attribute/Informationen sind andernfalls möglicherweise nicht
verfügbar.
:::

## Me - Aktueller Benutzer

Erforderliche Berechtigung: beliebig

`GET`-Anfrage gesendet: `/api/v1/users/me`

::: details

<<< @/fixtures/rest-api/users/me/get-res.json

:::

## Auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.user`

`GET`-Anfrage gesendet: `/api/v1/users`

::: details

<<< @/fixtures/rest-api/users/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `ticket.agent` **oder** `admin.user` **oder**
`ticket.customer` (teilende Organisation)

::: info
Technisch gesehen werden bei allen Auflistungen nur die Informationen des Benutzers selbst angezeigt.
:::

`GET`- Anfrage gesendet: `/api/v1/users/{id}`

::: details

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

:::: details

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
**This depends on permissions**

Agents can't set user passwords, roles or group permission. Instead
Zammad will apply the default sign up role. Check Zammad's admin interface
under _Manage > Roles_ and check which is selected as **Default at signup**.

Zammad strips `group_ids` and `roles` from an agent's request before it
writes anything, then answers `200 Ok` as if the update had gone through.
Re-read the record to see whether the change actually landed.

Agents can only edit customer-role targets. Sending a request for an
agent-role target fails with `403 Not authorized` and changes nothing.
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

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Benutzern nicht rückgängig gemacht werden kann. Zammad wird auch
Referenzen entfernen - also möglicherweise Tickets!
:::

Technisch gesehen können Sie Benutzer über `/api/v1/users/{id}` löschen. Wir
empfehlen Ihnen jedoch dringend, stattdessen eine Datenschutz-Löschaufgabe
in der Benutzeroberfläche von Zammad oder den Privacy-Endpunkt zu verwenden
(siehe Abschnitt unten). Die Verwendung einer der beiden Möglichkeiten
stellt sicher, dass auch zugehörige Informationen wie Tickets gelöscht
werden.

### Per Data Privacy-Endpunkt

Erforderliche Berechtigung: `admin.data_privacy`

`POST`-Request gesendet: `/api/v1/data_privacy_task`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/users/post-privacy-task-req.json

=== Response

<<< @/fixtures/rest-api/users/post-privacy-task-res.json

:::
::::

### Per User Endpunkt <Badge type="danger" text="not recommended" />

Erforderliche Berechtigung: `admin.user`

`DELETE`-Anfrage gesendet: `/api/v1/users/{id}`

::: details

<<< @/fixtures/rest-api/users/delete-id-res.json

:::
