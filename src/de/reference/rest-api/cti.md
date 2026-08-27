---
order: 5
title: CTI
---

# Allgemeine CTI

## Einführung

Auf dieser Seite werden die allgemeinen CTI-API-Bereiche und -Funktionen
beschrieben.

::: warning

- Die Authentifizierung an diesem Endpunkt funktioniert grundlegend anders als
  der Rest der API.
- API-Clients arbeiten _nicht_ mit den CTI-Endpunkten, es sei denn, dies wird ausdrücklich
  vom Client-Anbieter angegeben!
- Die CTI-Endpunkte sind nur für PBX-Systeme relevant.
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
Die generische CTI-Konfiguration und den richtigen Endpunkt finden Sie in Ihrem
Zammad in der Verwaltungsoberfläche unter _System > Integrationen > CTI (generic)_.

Bitte beachten Sie auch die dort aufgeführten Anforderungen und Einschränkungen.
Alle Optionen, die Rückgaben erfordern (z.B. Blockieren, Manipulation von ausgehenden
Anrufer IDs) sind abhängig von Konfigurationen innerhalb der Zammad CTI Integration
Seite.
:::

::: tip
Es gibt zwei Möglichkeiten, wie man die relevanten Daten an Zammad "posten" (`POST`) kann:

- JSON (empfohlen)
- Form-Daten
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
:
  Tell Zammad there is a new call.

`from` <Badge type="info" text="4930555716000"/>
:
  Number that initiated the call. Can be `anonymous` as well.

`to` <Badge type="info" text="4930555716000"/>
:
  Number that is being called.

`direction` <Badge type="info" text="in"/>
:
  The call direction. If your agent initiates a call, this will be `out`. Calls
from external side to you are `in`.

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

:::: details

::: tabs key:cti

=== JSON

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Nutzlast:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.sh

=== Form-Daten

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Nutzlast:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req.sh

:::
::::

### Eingehend

:::: details

::: tabs key:cti

=== JSON

Nutzlast:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.sh

=== Form-Daten

Nutzlast:

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

::: info
This has to be supported by your PBX to work.
:::

#### Ablehnen blockierter Anrufer IDs

Wenn ein eingehender neuer Anruf mit einer zu blockierenden Nummer
übereinstimmt, gibt Zammad folgendes zurück.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-blocked-res.json

Wenn keine der zu blockierenden Nummern übereinstimmen, gibt Zammad
folgendes zurück.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

::: warning
Ihre Telefonanlage muss den Anruf noch beenden (hangup-Ereignis). Andernfalls wird der
Anruf nicht nur in der Anruferliste von Zammad erscheinen, sondern auch als
klingelnder Anruf.
:::

#### Festlegen einer bestimmten ID für ausgehende Anrufe

Falls Ihre Instanz eine passende, überschreibende Caller ID konfiguriert
hat, wird Zammad folgende Nutzlast zurückgeben.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-caller-id-res.json

Wenn keine Übereinstimmung beim Überschreiben gefunden wird oder Sie nichts
konfiguriert haben, gibt Zammad Folgendes zurück.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

## Anrufannahme-Ereignis

### Allgemein

Verfügbare `Attribute` und <Badge type="info" text="Beispiel-Daten" />:

`event` <Badge type="info" text="answer" />:
:
  Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
:
  Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
:
  Number that is being called.

`direction` <Badge type="info" text="in" />:
:
  The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: Eine ID, die für den Anruf eindeutig ist. Zammad verwendet diese ID zur Identifizierung eines
  bestehenden Anrufs mit folgenden Aktionen (z.B. Annehmen oder Auflegen).

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad sucht nach einem Benutzer mit dem angegebenen Wert; die folgenden Attribute werden in der angegebenen Reihenfolge ausgewertet:
      - `user.phone`
      - `user.login`
      - `user.if`
    Dieser Wert ist optional.

`user` <Badge type="info" text="John Doe" />:
: Der echte Name des/der betreffenden Benutzer(s). Sie müssen die Parameter eventuell im Array-Stil (`[]`) angeben,
  abhängig von der von Ihnen gewählten Aufrufmethode. Wenn die Richtung `out` ist,
  ist dies der Name der anrufenden Person(en). Wenn die Richtung `in` ist, ist dies
  der Name der angerufenen Person(en). Dieser Wert ist optional.

Es gibt zwei Möglichkeiten, wie Sie die relevanten Daten an Zammad "posten"
(`POST`) können.

### Ausgehend

:::: details

::: tabs key:cti

=== JSON

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Nutzlast:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.sh

=== Form-Daten

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Nutzlast:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req

Rückgabe:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req.sh

:::
::::

### Eingehend

:::: details

::: tabs key:cti

=== JSON

Nutzlast:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.sh

=== Form-Daten

Nutzlast:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req.sh

:::
::::

## Beenden eines Anrufs

### Allgemein

`event` <Badge type="info" text="hangup" />:
:
  Tell Zammad that someone answered the call.

`from` <Badge type="info" text="493055571600" />:
:
  Number that initiated the call.

`to` <Badge type="info" text="493055571600" />:
:
  Number that is being called.

`direction` <Badge type="info" text="in" />:
:
  The call direction - if your agent initiates a call, this will be `out`.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: Eine ID, die für den Anruf eindeutig ist. Zammad verwendet diese ID zur Identifizierung eines
  bestehenden Anrufs mit folgenden Aktionen (z.B. Annehmen oder Auflegen).

`cause`
:   Hier wird der Grund für die Beendigung angegeben. Zammad wertet den Grund aus und
    zeigt z.B. verpasste Anrufe entsprechend im Anruferprotokoll an. Mögliche Werte sind:
    - `normalClearing` (eine der Parteien hat aufgelegt, nachdem das Gespräch zustande gekommen ist)
    - `busy` (der angerufene Teilnehmer war besetzt)
    - `cancel` (der Anrufer hat aufgelegt, bevor der angerufene Teilnehmer abgenommen hat)
    - `noAnswer` (der angerufene Teilnehmer hat den Anruf abgelehnt, z.B. durch eine DND-Einstellung)
    - `congestion` (der angerufene Teilnehmer konnte nicht erreicht werden)
    - `notFound` (die angerufene Nummer existiert nicht oder der angerufene Teilnehmer ist offline)
    - `forwarded` (der Anruf wurde an einen anderen Teilnehmer weitergeleitet)

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad sucht nach einem Benutzer mit einem entsprechenden Wert. Die folgenden Attribute
    werden in der angegebenen Reihenfolge ausgewertet:
    - `user.phone`
    - `user.login`
    - `user.if`
    Dieser Wert ist optional.

### Ausgehend

:::: details

::: tabs key:cti

=== JSON

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Nutzlast:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.sh

=== Form-Daten

`POST`-Request gesendet:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Nutzlast:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req.sh

:::
::::

### Eingehend

:::: details

::: tabs key:cti

=== JSON

Nutzlast:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.sh

=== Form-Daten

Nutzlast:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Beispiel curl Befehl:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req.sh

:::
::::
