---
order: 6
title: Objekt
---

# Objekt

::: danger
Das Anpassen von Objekten über API kann zu ernsthaften Problemen mit Ihrer Instanz führen.
Gehen Sie mit absoluter Vorsicht vor und stellen Sie sicher, dass Sie keine Standardfelder von Zammad
anpassen.

Wenn Sie Felder ausblenden möchten, sollten Sie stattdessen die Core-Workflows von Zammad verwenden!
:::

## Auflisten

Erforderliche Berechtigung: `admin.object`

`GET`-Anfrage gesendet: `/api/v1/object_manager_attributes`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes/get-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.object`

`GET`-Anfrage gesendet: `/api/v1/object_manager_attributes/{id}`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes/get-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `admin.object`

`POST`-Anfrage gesendet: `/api/v1/object_manager_attributes`

### Boolean

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-res.json

:::
::::

### Datum

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-date-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-date-res.json

:::
::::

### Datum & Zeit

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-datetime-res.json

:::
::::

### Integer

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-integer-res.json

:::
::::

### Einfachauswahl

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-select-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-select-res.json

:::
::::

### Text

::::: details Show request/response

:::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-text-req.json

:::tip

Zammad-Eingabefelder können 4 verschiedene Typen haben:

- `E-Mail`
- `Tel`
- `Text`
- `Url` (unterstützt keine Link-Templates)

Je nach gewähltem Eingabetyp erwartet Zammad unterschiedliche Formate von
Daten. Z.B.: verlangt E-Mail die Angabe einer E-Mail-Adresse.
:::

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-text-res.json

::::
:::::

### Einfach-Baumauswahl

:::: details Show request/response

::: tabs key:regres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-req.json

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/post-treeselect-res.json

:::
::::

::::info
Bitte beachten Sie, dass sich die oben genannten Payloads auf Ticket-Objekte beziehen. Dies ist in
den meisten Situationen in Ordnung, außer wenn es um die Standardobjekt-Berechtigungen
geht. Deshalb führen wir diese hier separat auf.

Das Attribut `object` steuert, welcher Kontext verwendet wird:

- `Ticket`
- `User`
- `Organisation`
- `Group`.

::: tabs

=== Ticket

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-ticket-req.json

=== User

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-user-req.json

=== Organization

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-organization-req.json

=== Group

<<< @/fixtures/rest-api/object_manager_attributes/post-screens-group-req.json

:::
::::

## Aktualisierung

Erforderliche Berechtigung: `admin.object`

Abgesehen von der Request-Methode sind die Payloads zum Aktualisieren und
Erstellen von Objekten identisch. Für vollständige Payload-Beispiele
scrollen Sie also bis zu `create_object`.

Zammad gibt während der Aktualisierung zwei Attribute zurück: `data_option`
und `data_option_new`. Das erste Attribut enthält die aktuellen aktiven
Werte und das zweite die neuen Werte (sie werden nach der Ausführung der
Datenbankmigrationen aktiv).

`PUT`-Anfrage gesendet: `/api/v1/object_manager_attributes/{id}`

::::: details Show request/response

:::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/object_manager_attributes/put-id-req.json

::: info
Stellen Sie sicher, dass Sie `data_option` angeben. Zammad ist sehr wählerisch, wenn Sie dieses Attribut weglassen.
Bitte beachten Sie, dass eine Änderung des Objekttyps *nach* der
Erstellung nicht mehr möglich ist.
:::

=== Response

<<< @/fixtures/rest-api/object_manager_attributes/put-id-res.json

::::
:::::

## Löschen

Erforderliche Berechtigung: `admin.object`

`DELETE`-Anfrage gesendet: `/api/v1/object_manager_attributes/{id}`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes/delete-id-res.json

:::

## Ausführen von Datenbank-Migrationen

Erforderliche Berechtigung: `admin.object`

::: warning
After executing the database migrations, a restart of Zammad is
*mandatory*. If not deactivated via
[auto shutdown setting](/en/reference/console#auto-shutdown-setting),
Zammad automatically restarts - expect a short downtime.
:::

`POST`-Anfrage gesendet:
`/api/v1/object_manager_attributes_execute_migrations`

::: details Show response

<<< @/fixtures/rest-api/object_manager_attributes_execute_migrations/post-res.json

:::
