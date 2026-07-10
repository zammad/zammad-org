---
order: 5
title: CTI
---

# CTI generico

## Introduzione

Questa pagina descrive gli ambiti e le funzionalità generiche dell'API CTI.

::: warning

- L'autenticazione su questo endpoint funziona in modo fondamentalmente diverso rispetto
  al resto.
:::

## Funzionalità

Ecco un piccolo elenco condensato delle possibilità che questa API CTI
fornisce.

### In entrata

- Funzioni del registro chiamante per i tuoi agenti.
- Blocco degli ID chiamante durante la segnalazione.

### In uscita

- Funzioni del registro chiamante per i tuoi agenti.
- Imposta gli ID chiamante in uscita a seconda dell'ID chiamante di
  destinazione.

### Endpoint

L'endpoint si trova nell'integrazione CTI generica e contiene un token
univoco che.

::: info
La configurazione CTI generica e l'endpoint corretto si trovano nel tuo
Zammad nell'amministrazione.
:::

::: tip
Ci sono due opzioni su come inviare con `POST` i dati rilevanti a Zammad:

- JSON (consigliato)
- F
:::

### Eventi

Ci sono diversi eventi in termini di una chiamata in corso. Queste azioni
provengono sempre dal tuo.

- Evento "newCall" (inizio di una chiamata)
- Evento "hangup" (fine chiamata)
- Evento "answer" (ovvero rispondere al telefono)

In alcune situazioni Zammad potrebbe fornire una risposta sulle tue chiamate
PBX (ad esempio un rifiuto) se blocchi.

### Esempi usati

**Esempio:**
Le chiamate seguenti sono state inviate con la seguente configurazione. Questo è importante.

**In uscita:**

- ID chiamante destinazione `4989*` imposta ID chiamante in uscita
  `498999998145` con nota "Tutto da mu
- ID chiamante destinazione `4930*` imposta ID chiamante in uscita
  `493023125877` "Tutto da Berlino"

**Altre impostazioni:**

- ID chiamante predefinito per chiamate in uscita `496990009111`

## Evento nuova chiamata

### Generale

`attributes` disponibili e <Badge type="info" text="dati di esempio" />:

`event` <Badge type="info" text="newCall"/>
: Dice a Zammad che c'è una nuova chiamata.

`from` <Badge type="info" text="4930555716000"/>
: Numero che ha avviato la chiamata. Può essere.

`to` <Badge type="info" text="4930555716000"/>
: Numero che viene chiamato.

`direction` <Badge type="info" text="in"/>
: La direzione della chiamata. Se il tuo agente avvia.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070"/>
: Un ID univoco.

`user` <Badge type="info" text="John Doe"/>
: Il nome reale dell'utente coinvolto. Potresti avere.

`queue` <Badge type="info" text="support"/>
: Un nome di coda opzionale, questa opzione è rilevante.

### In uscita

:::: details

::: tabs key:cti

=== JSON

`POST`-Request inviato:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-req.sh

=== Form-data

`POST`-Request inviata:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req

Restituisce:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-form-req.sh

:::
::::

### In entrata

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req

Restituisce:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-form-req.sh

:::
::::

### Risposte specifiche per situazione

A seconda della direzione di chiamata scelta, Zammad restituirà un
(opzionalmente) configurato.

::: info
Questo deve essere supportato dal tuo PBX per funzionare.
:::

#### Rifiuta ID chiamante bloccati

Se una nuova chiamata in entrata corrisponde a un numero da bloccare, Zammad
restituirà quanto segue.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-blocked-res.json

Se nessun numero da bloccare corrisponde, Zammad restituirà quanto segue.

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

::: warning
Il tuo PBX deve comunque terminare la chiamata (evento hangup). Altrimenti la
chiamata non apparirà semplicemente.
:::

#### Imposta ID chiamante in uscita specifico

Nel caso la tua istanza abbia un ID chiamante di sovrascrittura
corrispondente configurato, Zammad restituirà.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-caller-id-res.json

Se non viene trovata nessuna corrispondenza di sovrascrittura o non hai
configurato nulla, Zammad restituirà.

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

## Evento risposta chiamata

### Generale

`attributes` disponibili e <Badge type="info" text="dati di esempio" />:

`event` <Badge type="info" text="answer" />:
: Dice a Zammad che qualcuno ha risposto alla chiamata.

`from` <Badge type="info" text="493055571600" />:
: Numero che ha avviato la chiamata.

`to` <Badge type="info" text="493055571600" />:
: Numero che viene chiamato.

`direction` <Badge type="info" text="in" />:
: La direzione della chiamata - se il tuo agente avvia.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: Un ID univoco.

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad cercherà un.

`user` <Badge type="info" text="John Doe" />:
: Il nome reale dell'utente coinvolto. Potresti avere.

Ci sono due opzioni su come inviare con `POST` i dati rilevanti a Zammad.

### In uscita

:::: details

::: tabs key:cti

=== JSON

`POST`-Request inviato:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-req.sh

=== Form-data

`POST`-Request inviato:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req

Restituisce:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-answer-form-req.sh

:::
::::

### In entrata

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req

Restituisce:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-answer-form-req.sh

:::
::::

## Fine chiamata

### Generale

`event` <Badge type="info" text="hangup" />:
: Dice a Zammad che qualcuno ha risposto alla chiamata.

`from` <Badge type="info" text="493055571600" />:
: Numero che ha avviato la chiamata.

`to` <Badge type="info" text="493055571600" />:
: Numero che viene chiamato.

`direction` <Badge type="info" text="in" />:
: La direzione della chiamata - se il tuo agente avvia.

`callId` <Badge type="info" text="53ba82e2bd6d12d9fb2d3838f0cfb070" />:
: Un ID univoco.

`cause`
:   Definisce il motivo della fine chiamata. Zammad valuta la causa e indica.

`answeringNumber` <Badge type="info" text="493055571600" />:
:   Zammad cercherà un.

### In uscita

:::: details

::: tabs key:cti

=== JSON

`POST`-Request inviato:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-req.sh

=== Form-data

`POST`-Request inviato:
`https://{FQDN-Zammad}/api/v1/cti/{instance specific token}`

Payload:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req

Restituisce:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-outbound-instance-specific-token-hangup-form-req.sh

:::
::::

### In entrata

:::: details

::: tabs key:cti

=== JSON

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.json

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-req.sh

=== Form-data

Payload:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req

Response:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-empty-res.json

Comando curl di esempio:

<<< @/fixtures/rest-api/cti/post-inbound-instance-specific-token-hangup-form-req.sh

:::
::::
