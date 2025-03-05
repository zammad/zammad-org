---
order: 2
title: CTI
---

# Allgemeine CTI

## Einführung

Auf dieser Seite werden die allgemeinen CTI-API-Bereiche und -Funktionen
beschrieben.

::: warning

- Authentication on this endpoint works fundamentally different compared to
  the rest of the API.
- API clients _do not_ work with the CTI endpoints unless explicitly stated
  by the client vendor!
- The CTI endpoints are relevant for PBX systems only.
:::

## Features

Hier ist eine kleine, komprimierte Liste der Möglichkeiten, die diese CTI
API bietet.

### Eingehend

- Anruferprotokollfunktionen für Ihre Agenten.
- Blockieren von Caller IDs während der Anruf-Signalisierung.

### Ausgehend

- Anruferprotokollfunktionen für Ihre Agenten.
- Stellen Sie ausgehende Caller IDs je nach Ziel der Caller ID ein.

### Endpunkt

Der Endpunkt ist in der generischen CTI-Integration zu finden und enthält
ein eindeutiges Token, das zur Authentifizierung dient. Achten Sie darauf,
dass Sie die URL dieses Endpunkts sicher aufbewahren.

::: info
Generic CTI configuration and the correct endpoint can be found in your
Zammad in the admin interface under _System > Integrations > CTI (generic)_.

Please also note the there listed requirements and limitations.
All options that require returns (e.g. blocking, manipulating outgoing
caller IDs) rely on configurations within the Zammad CTI integration
page.
:::

::: tip
There are two options how to `POST` the relevant data to Zammad:

- JSON (recommended)
- Form-data
:::

### Ereignisse

Es gibt mehrere Ereignisse im Zusammenhang mit einem laufenden Anruf. Diese
Aktionen kommen immer von Ihrem PBX-System und können sein:

- Ereignis "newCall" (Einleitung eines Anrufs)
- Ereignis "hangup" (Beendigung des Anrufs)
- Ereignis "answer" (d.h. Annehmen des Gesprächs)

In einigen Situationen kann Zammad eine Rückmeldung an Ihre PBX-Anlage geben
(z.B. eine Ablehnung), wenn Sie einen bestimmten Anrufer blockiert
haben. Zammad wird jedoch niemals eine Aktion an Ihrer Telefonanlage
initiieren. Zammad ist in allen beschriebenen Fällen eine passive
Komponente.

### Verwendete Beispiele

**Beispiel:**
Die nachstehenden Anrufe wurden mit der folgenden Konfiguration gesendet. Dies ist
wichtig für Sie, um die hier gezeigten Antworten zu verstehen.

**Ausgehend:**

- Ziel-ID Anrufer `4989*` setzt für ausgehende Anrufer ID `498999998145` den
  Hinweis "Alle aus München"
- Ziel-ID Anrufer `4930*` setzt für ausgehende Anrufer ID `493023125877` den
  Hinweis "Alle aus Berlin"

**Andere Einstellungen:**

- Standard-Anrufer-ID für ausgehende Anrufe `496990009111`

## Neues Anrufereignis

### Allgemein

Verfügbare `Attribute` und <Badge type="info" text="Beispiel-Daten" />:

`event` <Badge type="info" text="newCall"/>
: Zammad mitteilen, dass es einen neuen Anruf gibt.

`from` <Badge type="info" text="4930555716000"/>
: Nummer, von der der Anruf ausgeht. Kann auch `anonymous` sein.

`to` <Badge type="info" text="4930555716000"/>
: Nummer, die aufgerufen wird.

`direction` <Badge type="info" text="in"/>
: Die Richtung des Anrufs. Wenn Ihr Agent einen Anruf initiiert, ist dies `out`. Anrufe
von externer Seite an Sie sind `in`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: Eine ID, die für den Anruf eindeutig ist. Zammad verwendet diese ID zur Identifizierung eines
  bestehenden Anrufs mit folgenden Aktionen (z.B. Annehmen oder Auflegen).

`user` <Badge type="info" text="John Doe"/>
: Der echte Name des/der beteiligten Benutzer(s). Sie müssen die Parameter möglicherweise im Array-Stil (`[]`) angeben,
  abhängig von der von Ihnen gewählten Aufrufmethode. Wenn die Richtung `out` ist,
  ist dies der Name der anrufenden Person(en). Wenn die Richtung `in` ist, ist dies
  der Name der angerufenen Person(en).

`queue` <Badge type="info" text="support"/>
: Ein optionaler Name der Warteschlange; diese Option ist für den Anruferprotokollfilter relevant.
  Dieser Wert ist optional.

### Ausgehend

::::details Show examples

::: tabs key:cti

=== JSON

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.sh

=== Form-Daten

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req.sh

:::
::::

### Eingehend

::::details Show examples

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.sh

=== Form-Daten

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req.sh

:::
::::

### Situationsbezogene Antworten

Je nach gewählter Rufrichtung gibt Zammad entweder eine (optional)
konfigurierte Call ID zurück oder blockiert einen Anrufer (optional) . Wenn
Ihr Zammad eine oder beide Optionen nicht konfiguriert hat, ist der
Rückgabewert leer.

:::info
Dies muss von Ihrer Telefonanlage unterstützt werden, damit es funktioniert.
:::

#### Ablehnen blockierter Anrufer IDs

Wenn ein eingehender neuer Anruf mit einer zu blockierenden Nummer
übereinstimmt, gibt Zammad folgendes zurück.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-blocked-res.json

Wenn keine der zu blockierenden Nummern übereinstimmen, gibt Zammad
folgendes zurück.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

:::warning
Ihre Telefonanlage muss den Anruf noch beenden (hangup-Ereignis). Andernfalls wird der
Anruf nicht nur in der Anruferliste von Zammad erscheinen, sondern auch als
klingelnder Anruf.
:::

#### Festlegen einer bestimmten ID für ausgehende Anrufe

Falls Ihre Instanz eine passende, überschreibende Caller ID konfiguriert
hat, wird Zammad folgende Payload zurückgeben.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-caller-id-res.json

Wenn keine Übereinstimmung beim Überschreiben gefunden wird oder Sie nichts
konfiguriert haben, gibt Zammad Folgendes zurück.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

## Anrufannahme-Ereignis

### Allgemein

Verfügbare `Attribute` und <Badge type="info" text="Beispiel-Daten" />:

`event` <Badge type="info" text="answer" />:
: Sagt Zammad, dass jemand den Anruf entgegengenommen hat.

`from` <Badge type="info" text="493055571600" />:
: Nummer, von der der Anruf ausgeht.

`to` <Badge type="info" text="493055571600" />:
: Nummer, die angerufen wird.

`direction` <Badge type="info" text="in" />:
: Die Richtung des Anrufs - wenn Ihr Agent einen Anruf initiiert, ist dies `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: Eine ID, die für den Anruf eindeutig ist. Zammad verwendet diese ID zur Identifizierung eines
  bestehenden Anrufs mit folgenden Aktionen (z.B. Annehmen oder Auflegen).

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad will look up for a user with given value, the following attributes will be evaluated in given order:
      - `user.phone`
      - `user.login`
      - `user.if`
    This value is optional.

`user` <Badge type="info" text="John Doe" />:
: Der echte Name des/der betreffenden Benutzer(s). Sie müssen die Parameter eventuell im Array-Stil (`[]`) angeben,
  abhängig von der von Ihnen gewählten Aufrufmethode. Wenn die Richtung `out` ist,
  ist dies der Name der anrufenden Person(en). Wenn die Richtung `in` ist, ist dies
  der Name der angerufenen Person(en). Dieser Wert ist optional.

Es gibt zwei Möglichkeiten, wie Sie die relevanten Daten an Zammad "posten"
(`POST`) können.

### Ausgehend

::::details Show examples

::: tabs key:cti

=== JSON

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.sh

=== Form-Daten

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req.sh

:::
::::

### Eingehend

::::details Show examples

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.sh

=== Form-Daten

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req.sh

:::
::::

## Beenden eines Anrufs

### Allgemein

`event` <Badge type="info" text="hangup" />:
: Teilt Zammad mit, dass jemand den Anruf entgegengenommen hat.

`from` <Badge type="info" text="493055571600" />:
: Nummer, von der der Anruf ausgeht.

`to` <Badge type="info" text="493055571600" />:
: Nummer, die angerufen wird.

`direction` <Badge type="info" text="in" />:
: Die Richtung des Anrufs - wenn Ihr Agent einen Anruf initiiert, ist dies `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: Eine ID, die für den Anruf eindeutig ist. Zammad verwendet diese ID zur Identifizierung eines
  bestehenden Anrufs mit folgenden Aktionen (z.B. Annehmen oder Auflegen).

`cause`
:   This defines the reason of the hangup. Zammad evaluates the cause and indicates
    e.g. missed calls accordingly in the caller log. Possible values are:
    - `normalClearing` (one of the parties hung up after the call was established)
    - `busy` (the called party was busy)
    - `cancel` (the caller hung up before the called party picked up)
    - `noAnswer` (the called party rejected the call. E.g. through a DND setting)
    - `congestion` (the called party could not be reached)
    - `notFound` (the called number does not exist or called party is offline)
    - `forwarded` (the call was forwarded to a different party)

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad will look up for a user with given value, the following attributes will be evaluated in given order:
    - `user.phone`
    - `user.login`
    - `user.if`
    This value is optional.

### Ausgehend

::::details Show examples

::: tabs key:cti

=== JSON

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.sh

=== Form-Daten

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req.sh

:::
::::

### Eingehend

::::details Show examples

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.sh

=== Form-Daten

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req.sh

:::
::::
