---
order: 10
title: Berichts-Profil
---

# Berichts-Profil

::: info
Ein Berichts-Profil ist ein gespeicherter, wiederverwendbarer Filter bzw. eine Bedingung für das
Berichtsmodul von Zammad. Es handelt sich dabei nicht um eine Automatisierung und es führt von
sich aus keine Aktionen aus. Es handelt sich um eine benannte Bedingung, die bei der
Erstellung von Berichten mit der Berichtsfunktion von Zammad als auswählbare Ansicht angezeigt wird,
wobei der Zugriff auf diejenigen Rollen beschränkt ist (`role_ids`), die diese einsehen dürfen.

Vergleichen Sie dies mit [Core Workflows](/de/reference/rest-api/core-workflow), die
ein ähnlich strukturiertes Bedingungsobjekt verwenden, jedoch die referenzierten
Felder nicht validieren.
:::

## Auflisten

Erforderliche Berechtigung: `admin.report_profile`

`GET`-Request gesendet: `/api/v1/report_profiles`

::: details

<<< @/fixtures/rest-api/report_profiles/get-res.json

:::

::: info
Die Liste gibt den vollständigen Datensatz für jedes Profil zurück,
mit denselben Feldern wie in der unten stehenden Show-Response.
Der Eintrag `1` (`-all-`) ist das in Zammad integrierte Standardprofil.
:::

## Anzeigen

Erforderliche Berechtigung: `admin.report_profile`

`GET`-Request gesendet: `/api/v1/report_profiles/{id}`

::: details

<<< @/fixtures/rest-api/report_profiles/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.report_profile`

`POST`-Request gesendet: `/api/v1/report_profiles`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/report_profiles/post-req.json

=== Response

<<< @/fixtures/rest-api/report_profiles/post-res.json

:::

::::

::: info
Es ist nicht gewährleistet, dass die Rollen-IDs in allen Instanzen identisch sind. Schauen Sie sich
daher zunächst die IDs der benötigten Rollen über die [Rollen-API](/de/reference/rest-api/role)
heraus, anstatt eine Annahme zu treffen.
:::

:::: info
Im Gegensatz zu Core Workflows überprüft die Berichts-Profils `condition` _nicht_,
ob die referenzierten Felder echte, vollständig migrierte Ticketfelder sind.
Der Verweis auf ein benutzerdefiniertes Feld, das zwar existiert, dessen Schemamigration jedoch
noch nicht abgeschlossen ist (`to_create`/`to_migrate` weiterhin `true` ), schlägt
mit folgender Fehlermeldung fehl:

::: details

<<< @/fixtures/rest-api/report_profiles/post-invalid-condition-res.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.report_profile`

`PUT`-Request gesendet: `/api/v1/report_profiles/{id}`

Die Struktur der Nutzlast entspricht der von Create. Die Antwort besteht aus
dem aktualisierten Datensatz, dessen Struktur mit der Create-Response
übereinstimmt.

::: info
Das Senden der vollständigen Create-Nutzlast an die `id` eines bestehenden Profils führt zu
dessen direkter Aktualisierung. Es wird kein Duplikat erstellt.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/report_profiles/put-id-req.json

=== Response

<<< @/fixtures/rest-api/report_profiles/put-id-res.json

:::

::::

## Löschen

Erforderliche Berechtigung: `admin.report_profile`

::: danger
**Dies ist eine dauerhafte Entfernung**

Bitte beachten Sie, dass das Entfernen von Berichts-Profilen nicht rückgängig gemacht werden kann.
:::

`DELETE`-Request gesendet: `/api/v1/report_profiles/{id}`

::: details

<<< @/fixtures/rest-api/report_profiles/delete-id-res.json

:::
