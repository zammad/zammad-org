---
order: 10
title: 'Core Workflow'
---

# Core Workflow

::: info
Core Workflows unterscheiden sich von [Triggern](/de/reference/rest-api/trigger):
Sie steuern das Formular zum Erstellen bzw. Bearbeiten von Tickets, während es ausgefüllt wird,
beispielsweise indem sie einschränken, welche Werte in einem anderen Feld ausgewählt werden können. Das
Formular übermittelt seine aktuellen Werte an Zammad, das die Workflows auswertet
und die daraus resultierenden Feldänderungen zurückgibt. Im Gegensatz zu Triggen wirken sie nicht
im Hintergrund auf bestehende Tickets ein.

Vergleichen Sie dies mit [Berichts-Profilen](/de/reference/rest-api/report-profile), deren `condition`
im Gegensatz zum Core Workflow überprüft, ob die referenzierten
Felder tatsächlich vorhanden sind.
:::

## Auflisten

Erforderliche Berechtigung: `admin.core_workflow`

`GET`-Anfrage gesendet: `/api/v1/core_workflows`

::: details

<<< @/fixtures/rest-api/core_workflows/get-res.json

:::

::: info
Dieser Endpunkt gibt ausschließlich Workflows zurück, bei denen `changeable: true` gesetzt ist. Die
eingebauten System-Workflows von Zammad sind nicht änderbar und werden daher nicht berücksichtigt, sodass
die Antwort bei einer neu installierten Instanz ein leeres Array ist. Die Funktionen Show, Update und
Delete wirken sich ebenfalls nur auf änderbare Workflows aus.
:::

## Anzeigen

Erforderliche Berechtigung: `admin.core_workflow`

`GET`-Anfrage gesendet: `/api/v1/core_workflows/{id}`

::: details

<<< @/fixtures/rest-api/core_workflows/get-id-res.json

:::

::: details

<<< @/fixtures/rest-api/core_workflows/get-non-changeable-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.core_workflow`

`POST`-Anfrage gesendet: `/api/v1/core_workflows`

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/roles/post-req.json

=== Response

<<< @/fixtures/rest-api/roles/post-res.json

:::

::::

::: info
Der Core Workflow validiert _nicht_, ob die in
`condition_selected` oder `perform` referenzierten Felder
existieren. Ein Workflow, der ein nicht existierendes Feld referenziert,
wird ohne Fehler gespeichert. Er hat keine sichtbaren Auswirkungen in der Ticket-Maske,
bis das referenzierte Feld existiert.
:::

## Aktualisierung

Erforderliche Berechtigung: `admin.core_workflow`

`PUT`-Request gesendet: `/api/v1/core_workflows/{id}`

Die Nutzlast-Struktur ist identisch mit Erstellen. Die Antwort ist der
aktualisierte Datensatz, in der gleichen Form wie Show/Create.

::: info
Das Senden einer vollständigen Create-Nutzlast an die `id` eines bestehenden Workflows aktualisiert
diesen Datensatz direkt. Es wird kein Duplikat erstellt.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/core_workflows/put-id-req.json

=== Response

<<< @/fixtures/rest-api/core_workflows/put-id-res.json

:::

::::

## Löschen

Erforderliche Berechtigung: `admin.core_workflow`

::: danger
**Dies ist eine endgültige Entfernung**

Bitte beachten Sie, dass das Löschen von Core Workflows nicht rückgängig gemacht werden kann.
:::

`DELETE`-Request gesendet: `/api/v1/core_workflows/{id}`

::: details

<<< @/fixtures/rest-api/core_workflows/delete-id-res.json

:::
