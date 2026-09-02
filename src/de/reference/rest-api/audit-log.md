---
order: 2
title: Audit-Protokoll
---

# Audit-Protokoll

Das Audit-Protokoll erfasst sicherheitsrelevante Änderungen an Ihrem
Zammad-System: wer hat was wann geändert. Das Audit-Protokoll ist
schreibgeschützt.

## Auflisten

Erforderliche Berechtigung: `admin.audit_log`

`GET`-Anfrage gesendet: `/api/v1/audit_logs`

Der Endpunkt unterstützt die Paginierung. Die Standardseitengröße beträgt
`500`. Die Einträge werden nach `id` (aufsteigend) sortiert
zurückgegeben. Geben Sie `?sort_by=id` und `?order_by=DESC` an, um die
neuesten Einträge zuerst anzuzeigen.

::: details

<<< @/fixtures/rest-api/audit_logs/get-list-res.json

:::

## Anzeigen

Erforderliche Berechtigung: `admin.audit_log`

`GET`-Anfrage gesendet: `/api/v1/audit_logs/{id}`

::: details

<<< @/fixtures/rest-api/audit_logs/get-id-res.json

:::

## Suche

Erforderliche Berechtigung: `admin.audit_log`

Der Such-Endpunkt akzeptiert die `query` Syntax des
Zammad-Such-Backends. Der einfachste Fall ist eine wörtliche Zeichenfolge in
einem einzelnen indexierten Feld wie beispielsweise `auditable_name`,
`auditable_type` oder `user_fullname`:

`GET`-Anfrage gesendet: `/api/v1/audit_logs/search?query={search-string}`

::: details

<<< @/fixtures/rest-api/audit_logs/get-search-res.json

:::

Um nach einem bestimmten Attribut zu filtern anstatt den gesamten Datensatz
nach Teilzeichenfolgen abzugleichen, setzen Sie dem Attributnamen ein Präfix
voran. Sie können sogar die logische `AND` Verknüpfung verwenden, um die
Ergebnisse einzugrenzen:

`GET`-Anfrage gesendet:
`/api/v1/audit_logs/search?query=auditable_type:Macro AND user_id:3`

::: warning
Bei der Suche wird die Groß-/Kleinschreibung berücksichtigt und es werden
ausschließlich die indizierten Attributfelder durchsucht (`auditable_name`, `auditable_type`,
`user_fullname` usw.). Die Nutzlast der Felder `value_from` und `value_to` sind
nicht durchsuchbar.
:::

::: tip
Standardmäßig besteht die Antwort aus einem einfachen JSON-Array mit den übereinstimmenden Einträgen.
Übergeben Sie `with_total_count=true` in der URL (oder `with_total_count:
true` im Body einer `POST*-Anfrage), um die Antwort in
ein Objekt zu verpacken, das auch einen `total_count` enthält. Senden Sie eine `POST`-Anfrage,
wenn die Abfrage für eine URL zu lang oder zu komplex ist.
:::

## Feldreferenz

`id`
:
  Ganzzahliger Primärschlüssel des Eintrags im Audit-Protokoll.

`user_id`
: ID des Benutzers, der die Änderung ausgelöst hat. `null`, wenn der Eintrag
  von einem Hintergrundjob ohne aktuellen Benutzer geschrieben wurde.

`user_fullname`
: Vollständiger Name des Benutzers zum Zeitpunkt der Erstellung des Eintrags. Wird
  separat gespeichert, damit er auch nach der Löschung des Kontos
  lesbar bleibt.

`action_type`
: Art der erfassten Änderung. Eine der folgenden Optionen: `create` (ein Datensatz wurde
  hinzugefügt), `update` (ein bestehender Datensatz wurde geändert), `destroy`
  (ein Datensatz wurde entfernt), `switch_to` (ein Benutzer hat die Sitzung eines anderen
  Benutzers per _aus Sicht des Benutzers ansehen_ übernommen),
 `switch_back_to` (die ursprüngliche Sitzung wurde wieder aufgenommen).

`auditable_id`
:
  ID des Datensatzes, der geändert wurde.

`auditable_type`
: Klassenname des Datensatzes, der geändert wurde (z.B. `Macro`,
  `Setting`, `KnowledgeBase`, `ChecklistTemplate`, `Job`).

`auditable_name`
: Anzeigename des geänderten Datensatzes zum Zeitpunkt des
  Schreibvorgangs. Wird separat gespeichert, damit er auch dann noch lesbar ist, wenn der Datensatz
  selbst nicht mehr vorhanden ist.

`value_from`
: Objekt (JSON), das den vorherigen Status des geänderten
  Attributs enthält. Leer (`{}`) bei `create` Einträgen.

`value_to`
: Objekt (JSON), das den neuen Status des geänderten Attributs enthält.
  Leer (`{}`) bei `destroy` Einträge.

`source_ip`
: IP-Adresse, von der die zugrunde liegende Anfrage stammt. `Rails console`
  oder `Rails runner` wird gespeichert, wenn die Änderung von einem
  Wartungsskript geschrieben wurde.

`preferences`
: Objekt (JSON), das zusätzliche Metadaten pro Eintrag enthält. Bei
  Aktualisierungen von Einträgen per `update` enthält dies ein Array `changed_attributes`,
  das die tatsächlich geänderten Attribute auflistet.

`created_at` 
: Zeitstempel, zu dem der Eintrag erstellt wurde. Einträge im Audit-Protokoll sind
  unveränderbar und werden einmalig hinzugefügt.

`updated_at`
: Entspricht `created_at` für Einträge im Audit-Protokoll. Einträge im Audit-Protokoll sind
  unveränderbar und werden einmalig hinzugefügt.

## Lebenszyklus

Eine geplante Aufgabe löscht täglich Einträge, die älter als **12 Monate**
sind. Verwenden Sie `AuditLog.cleanup` in der Rails-Konsole, um eine
Bereinigung manuell auszulösen.
