---
order: 10
title: E-Mail-Benachrichtigung
---

# E-Mail-Benachrichtigung

::: info
Diese Seite beschreibt die Konfiguration des E-Mail-Kanals für ausgehenden _Benachrichtigungen_:
die SMTP- (oder lokale MTA-) Einstellungen, die Zammad zum Senden seiner
eigenen internen Benachrichtigungen verwendet, wie z.B. dass Ihnen ein Ticket zugewiesen wurde, sowie die
zugehörige lokale Absenderidentität (`EmailAddress`). Dies unterscheidet sich von einem normal E-Mail-Kanal, was eine
separate Funktion ist und auf dieser Seite nicht behandelt wird.
:::

## Auflisten

Erforderliche Berechtigung: `admin.channel_email`

`GET`-Request gesendet: `/api/v1/channels_email`

Hierbei handelt es sich um einen kombinierten Index: Er gibt den bzw. die
Benachrichtigungskanäle, den bzw. die Ticket-Postfachkanäle sowie die
lokalen Absenderadressen in einer einzigen Antwort zurück. Die nachstehende
Antwort wurde auf die Felder gekürzt, die für die Konfiguration von
Benachrichtigungs-E-Mails relevant sind.

::: details

<<< @/fixtures/rest-api/email_notification/get-res.json

:::

::: info
Pro Benachrichtigungseinrichtung kann jeweils nur ein Kanal `active: true` sein.
Die Konfiguration eines neuen Kanals (siehe _Konfigurieren_ unten) deaktiviert automatisch
den zuvor aktiven Kanal. In der obigen Antwort ist `sendmail`
(ID `2`) nun `active: false`, da `smtp` (ID `1`)
danach konfiguriert wurde.
:::

## Konfigurieren

Erforderliche Berechtigung: `admin.channel_email`

`POST`-Request gesendet: `/api/v1/channels_email_notification`

::: info
übergeben Sie die Adaptereinstellungen in einem Top-Level-`options`-Schlüssel wie unten gezeigt.
Andere Key-Namen wie `new_configuration` (der Parametername der
internen Service-Klasse `Service::System::SetEmailNotificationConfiguration`),
scheitern nicht mit einem Validierungsfehler. Die Anfrage schlägt stattdessen mit einem
`undefined method 'downcase' for nil` Fehler fehl.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/post-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/post-res.json

:::

::::

::: info
Dieser Aufruf erfüllt zwei Aufgaben: Er testet die Verbindung live und versendet
dabei als Nebeneffekt eine echte
Test-E-Mail. Ist der Test erfolgreich, wird die
Konfiguration im selben Aufruf als aktiver Benachrichtigungskanal gespeichert. Es
gibt keinen separaten "Speichern"-Schritt; `notification_channel_ids` in
`/api/v1/channels_email` spiegelt den neuen Kanal sofort wider.

Kann die Verbindung nicht hergestellt werden, lautet die Antwort `200 OK` mit
`result: invalid` und die gespeicherte Konfiguration bleibt unverändert.
:::

::: details

<<< @/fixtures/rest-api/email_notification/post-invalid-connection-res.json

:::

::: info
`POST /api/v1/channels_email_probe` ist keine Alternative zu diesem
Endpunkt für eine ausschließliche Benachrichtigungs-Einrichtung. Es validiert immer ein _vollständiges_
eingehendes und ausgehendes Postfach (`EmailHelper::Probe.full`). Das Senden
einzeln ausgehender SMTP-Einstellungen dazu gibt
`{"result": "failed", "reason": "inbound failed"}` zurück, selbst wenn die
ausgehenden Einstellungen korrekt sind.
:::

::: details

<<< @/fixtures/rest-api/email_notification/probe-outbound-only-res.json

:::

## Absenderadresse

Die lokale Absenderidentität, die für ausgehende Benachrichtigungs-E-Mails
verwendet wird, wird als `EmailAddress` verwaltet.

### Auflisten

Erforderliche Berechtigungen: `admin.channel_email` **oder** `ticket.agent`

`GET`-Request gesendet: `/api/v1/email_addresses`

Gibt ein Array von Objekten zurück, die jeweils der Struktur des einzelnen
Objekts entsprechen, das in der untenstehenden_Show_ Response dargestellt
ist.

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/get-res.json

:::

### Anzeigen

Erforderliche Berechtigungen: `admin.channel_email` **oder** `ticket.agent`

`GET`-Request gesendet: `/api/v1/email_addresses/{id}`

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/get-id-res.json

:::

### Erstellen

Erforderliche Berechtigung: `admin.channel_email`

`POST`-Request gesendet: `/api/v1/email_addresses`

::: info
`channel_id` ist eine Referenz und kein Validierungsziel: Eine ID, die nicht
besteht, wird akzeptiert, und die Adresse wird dann mit `channel_id: null`
und `active: false` gespeichert. Adressen werden üblicherweise einem Ticket-Postfach-Kanal
und nicht dem Benachrichtigungskanal zugeordnet.
:::

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/email_addresses/post-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/email_addresses/post-res.json

:::

::::

### Aktualisierung

Erforderliche Berechtigung: `admin.channel_email`

`PUT`-Request gesendet: `/api/v1/email_addresses/{id}`

Die Form der Nutzlast ist identisch mit Create. Durch das Senden der
vollständigen Create-Nutzlast an die `id` einer bestehenden Adresse wird
dieser Datensatz direkt aktualisiert. Es wird kein Duplikat erstellt. Die
Antwort ist der aktualisierte Datensatz, der die gleiche Form wie die
Create-Antwort hat.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/email_notification/email_addresses/put-id-req.json

=== Response

<<< @/fixtures/rest-api/email_notification/email_addresses/put-id-res.json

:::

::::

### Löschen

Erforderliche Berechtigung: `admin.channel_email`

::: danger
**Dies ist eine permanente Entfernung**

Bitte beachten Sie, dass das Entfernen von E-Mail-Adressen nicht rückgängig gemacht werden kann.

Gruppen, die die gelöschte Adresse als Absenderadresse verwenden
(`email_address_id`) werden auf keine Absenderadresse zurückgesetzt.
:::

`DELETE`-Request gesendet: `/api/v1/email_addresses/{id}`

::: details

<<< @/fixtures/rest-api/email_notification/email_addresses/delete-id-res.json

:::
