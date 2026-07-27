---
order: 4
outline:
  - 2
  - 2
title: 'Elasticsearch indexed attributes'
---

# Elasticsearch indexed attributes

Di seguito trovi un elenco dei principali attributi degli oggetti
indicizzati da Elasticsearch (ES).

::: info

- Questa pagina elenca gli attributi predefiniti degli oggetti di Zammad indicizzati da ES.

:::

## Panoramica

Puoi trovare i dettagli su ogni attributo dell'oggetto nella sezione
successiva.

:::: tabs

=== Ticket

Apri i dettagli per mostrare la struttura completa del ticket: <Badge type="danger" text="Hu

::: details

<<< @/fixtures/es-indexed-attributes/complete-ticket.json

:::

=== Articolo

La seguente struttura è già inclusa nell'indice del ticket (vedi la prima

::: details

<<< @/fixtures/es-indexed-attributes/complete-article.json

:::

=== Utente

Apri i dettagli per mostrare la struttura completa dell'utente:

::: details

<<< @/fixtures/es-indexed-attributes/complete-user.json

:::

=== Organizzazione

Apri i dettagli per mostrare la struttura completa dell'organizzazione:

::: details

<<< @/fixtures/es-indexed-attributes/complete-organization.json

:::

::::

## Ticket

Il seguente indice contiene le informazioni menzionate di seguito:
`*_ticket`

### `article`

Array con tutti gli articoli appartenenti al ticket. Vedi la [sezione
articolo](#article-1) per i dettagli.

::: details

<<< @/fixtures/es-indexed-attributes/article.json

:::

### `article_count`

Numero di articoli all'interno del ticket.

Esempio: `1`

### `checklist`

Struttura completa della checklist ed elementi.

::: details

<<< @/fixtures/es-indexed-attributes/checklist.json

:::

### `close_at`

Primo orario di chiusura, impostato una volta. Vedi `last_close_at` per
l'ultimo orario di chiusura (se il ticket è stato riaperto).

Esempio: `"2025-03-20T06:48:46.438Z"`

### `close_diff_in_min` <Badge type="info" text="SLA"/>

Dipende da `close_in_min` e indica quanti minuti il ticket è stato chiuso
rispetto all'SLA.

Esempi: `239`, `-5`

### `close_escalation_at` <Badge type="info" text="SLA"/>

Timestamp in cui il ticket subirebbe escalation nel caso venga violato il
tempo di soluzione.

Esempi: `null`, `"2025-02-03T15:50:20.673Z"`

### `close_in_min` <Badge type="info" text="SLA"/>

Valore in minuti per quanto tempo il ticket è rimasto aperto in base agli
orari di lavoro.

Esempi: `null`, `11`

### `create_article_sender`

Mittente dell'articolo (Sistema, Agente, Cliente)

::: details

<<< @/fixtures/es-indexed-attributes/create_article_sender.json

:::

### `create_article_sender_id`

ID dell'utente che ha creato l'articolo.

Esempi: `1`, `2`

### `create_article_type`

Informazioni del primo articolo di un ticket.

::: details

<<< @/fixtures/es-indexed-attributes/create_article_type.json

:::

### `create_article_type_id`

ID del tipo del primo articolo.

Esempio: `5`

### `created_at`

Timestamp di creazione del ticket.

Esempio: `"2025-02-24T16:17:27.210Z"`

### `created_by`

Dettagli dell'utente che ha creato il ticket. Consulta la [sezione
utente](#utente) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID dell'utente che ha creato il ticket.

Esempio: `3`

### `customer`

Dettagli del cliente del ticket. Consulta la [sezione utente](#utente) per
maggiori informazioni.

### `customer_id`

ID del cliente che ha creato il ticket.

Esempio: `8`

### `escalation_at` <Badge type="info" text="SLA"/>

Timestamp della prossima escalation applicabile, indipendentemente dal tipo
di escalation.

Esempi: `null`, `"2025-02-24T16:28:38.535Z"`

### `first_response_at` <Badge type="info" text="SLA"/>

Timestamp della prima risposta al cliente (tipo comunicazione).

Esempi: `null`, `"2025-02-24T16:28:38.303Z"`

### `first_response_diff_in_min` <Badge type="info" text="SLA"/>

Dipende da `first_response_in_min` e indica quanti minuti ha impiegato la
prima risposta rispetto all'SLA.

Esempi: `null`, `10`, `-6`

### `first_response_in_min` <Badge type="info" text="SLA"/>

Valore in minuti su quanto tempo ha impiegato la prima risposta in base agli
orari di lavoro.

Esempi: `null`, `11`

### `group`

Dettagli del gruppo del ticket. Consulta la [sezione gruppo](#group-1) per
maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/group.json

:::

### `group_id`

ID del gruppo corrente

Esempio: `1`

### `id`

ID del ticket

Esempi: `1`, `111`

### `last_close_at`

Ultimo orario di chiusura, impostato ad ogni chiusura del ticket.

Esempi: `null`, `"2025-02-03T14:50:20.673Z"`

### `last_contact_agent_at`

Timestamp dell'ultimo contatto di tipo comunicazione di qualsiasi agente.

Esempi: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_at`

Timestamp dell'ultimo contatto/articolo di tipo comunicazione,
indipendentemente da chi l'ha creato.

Esempi: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_customer_at`

Timestamp dell'ultimo contatto/articolo di tipo comunicazione dal cliente.

Esempi: `null`, `"2025-02-24T16:28:38.303Z"`

### `mention_user_ids`

Array con ID utente degli utenti menzionati o iscritti.

Esempi: `[3, 5]`, `[]`

### `note`

Nota del ticket, impostata solo tramite console o API.

Esempio: `null`

### `number`

Numero del ticket.

Esempi: `1010138`, `202006231010138`

### `organization`

Dettagli dell’organizzazione del cliente del ticket. Dai un’occhiata alla
[sezione sull’organizzazione](#organization-2) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID dell'organizzazione del cliente del ticket.

Esempi: `null`, `2`

### `owner`

Dettagli dell'utente proprietario del ticket. Consulta la [sezione
utente](#utente) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/owner.json

:::

### `owner_id`

ID utente del proprietario del ticket.

Esempi: `null`, `3`

### `pending_time`

Timestamp dell'orario di attesa impostato. Solo se è impostato uno stato di
attesa.

Esempi: `null`, `"2025-02-24T17:44:06.912Z"`

### `preferences`

Informazioni speciali per funzioni interne. Potrebbe non essere disponibile
nel tuo sistema.

### `priority`

Dettagli dello stato di priorità del ticket. Dai un’occhiata alla [sezione
sulla priorità](#ticket-priority) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/priority.json

:::

### `priority_id`

ID priorità del ticket.

Esempio: `2`

### `state`

Dettagli dello stato del ticket. Consulta la [sezione
stato](#stato-del-ticket) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/state.json

:::

### `state_id`

ID dello stato corrente del ticket.

Esempi: `1`, `4`

### `tags`

Array con tutti i tag associati al ticket.

Esempi: `["order", "complaint"]`, `[]`

### `time_unit`

Unità di tempo registrate per il ticket (totale).

Esempi: `null`, `15`

### `title`

Titolo/oggetto del ticket.

Esempi: `Feedback Form`, `Need help`

### `type` <Badge type="warning" text="deprecato"/>

Valore: `null`

### `update_diff_in_min` <Badge type="info" text="SLA"/>

Dipende da `update_in_min` e indica quanti minuti ha impiegato l'ultimo
aggiornamento del ticket rispetto all'SLA.

Esempi: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_escalation_at` <Badge type="info" text="SLA"/>

Timestamp in cui il ticket subirebbe escalation nel caso venga violato il
periodo di aggiornamento SLA.

Esempi: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_in_min` <Badge type="info" text="SLA"/>

Valore in minuti per quanto tempo ha impiegato l'ultimo aggiornamento del
ticket in base agli orari di lavoro.

Esempi: `null`, `5`, `-10`

### `updated_at`

Timestamp dell'ultimo aggiornamento del ticket.

Esempio: `"2025-02-24T16:28:38.303Z"`

### `updated_by`

Dettagli dell'utente che ha aggiornato il ticket. Consulta la [sezione
utente](#utente) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID dell'utente che ha aggiornato il ticket.

Esempi: `1`, `3`

## Ticket priority

Il seguente indice contiene le informazioni menzionate di seguito:
`*_ticket_priority`

### `active`

Definisce se la priorità è attiva o meno.

Valori: `true`, `false`

### `created_at`

Timestamp di creazione della priorità.

Esempio: `"2025-02-03T14:50:20.724Z"`

### `created_by_id`

ID dell'utente che ha creato la priorità.

Esempio: `1`

### `default_create`

Definisce se la priorità è quella predefinita per la creazione del ticket o
meno.

Valori: `false`, `true`

### `id`

ID della priorità.

Esempio: `3`

### `name`

Nome della priorità.

Esempio: `"3 high"`

### `note`

Nota per la priorità impostata tramite console o API.

Esempio: `"null"`

### `ui_color`

Classe CSS per il colore di evidenziazione dei ticket con questa priorità.

Esempi: `"null"`, `"high-priority"`

### `ui_icon`

Classe CSS per l'icona di evidenziazione dei ticket con questa priorità.

Esempi: `"null"`, `"important"`

### `updated_at`

Timestamp dell'ultima modifica.

Esempio: `"2025-02-03T14:50:20.724Z"`

### `updated_by_id`

ID dell'utente che ha eseguito l'ultimo aggiornamento.

Esempio: `1`

## Ticket state

Il seguente indice contiene le informazioni menzionate di seguito:
`*_ticket_state`

### `active`

Definisce se lo stato è attivo (disponibile) o meno.

Valori: `true`, `false`

### `created_at`

Timestamp di creazione dello stato.

Esempio: `"2025-02-03T14:50:20.694Z"`

### `created_by_id`

ID dell'utente che ha creato lo stato.

Esempio: `1`

### `default_create`

Definisce se lo stato è quello predefinito per la creazione del ticket.

Valori: `false`, `true`

### `default_follow_up`

Definisce se lo stato è quello predefinito di follow up sui follow up dei
ticket.

Valori: `false`, `true`

### `id`

ID dello stato.

Esempio: `7`

### `ignore_escalation`

Definisce se il calcolo SLA viene ignorato per questo stato.

Valori: `false`, `true`

### `name`

Nome dello stato.

Esempio: `"pending close"`

### `next_state`

Contiene tutte le informazioni sullo stato di follow up se applicabile,
potrebbe non essere disponibile a seconda della configurazione.

::: details

<<< @/fixtures/es-indexed-attributes/next_state.json

:::

### `next_state_id`

ID dello stato di follow up.

Esempi: `null`, `4`

### `note`

Nota impostata tramite console o API.

Esempio: `"null"`

### `state_type`

Contiene tutte le informazioni disponibili sul tipo di stato

::: details

<<< @/fixtures/es-indexed-attributes/state_type.json

:::

### `state_type_id`

ID del tipo di stato.

Esempio: `4`

### `updated_at`

Timestamp dell'ultimo aggiornamento dello stato.

Esempio: `"2025-02-03T14:50:20.694Z"`

### `updated_by_id`

ID dell'utente che ha eseguito l'ultimo aggiornamento dello stato.

Esempio: `1`

## Articolo

Il seguente indice contiene le informazioni menzionate di seguito:
`*_ticket`

Gli articoli fanno parte dell'indice del ticket. Per ridurre la complessità
abbiamo deciso di fornirlo nella propria sezione.

### `body`

Corpo dell'articolo in testo semplice.

Esempio: `"Ciao,\n\nper favore inviami:\n1 [...] \nGrazie\n\nJohn Doe"`

### `cc`

Gli indirizzi email impostati come CC.

Esempi: `null`, `alias@domain.tld`

### `content_type`

Tipo di contenuto dell'articolo.

Esempi: `"text/html"`, `"text/plain"`

### `created_at`

Timestamp di creazione dell'articolo.

Esempio: `"2025-02-22T03:47:59.290Z"`

### `created_by_id`

ID dell'utente che ha creato l'articolo.

Esempio: `10`

### `detected_language`

Codice lingua della lingua rilevata.

Esempi: `"en"`, `"de"`, `null`

### `detected_language_name`

Nome della lingua rilevata.

Esempi: `"English"`, `"German"`

### `from`

Nome (e indirizzo email) di chi ha creato l'articolo.

Esempi: `"Nicole Braun <nicole.braun@zammad.org>"`, `"John Doe"`

### `id`

ID interno dell'articolo.

Esempio: `16`

### `in_reply_to`

Intestazione "In-Reply-To" dall'email, se applicabile.

Esempio: `null`

### `internal`

Definisce se l'articolo è interno o meno.

Valori: `false`, `true`

### `message_id`

ID messaggio dell'email, se applicabile.

Esempio: `null`

### `origin_by_id`

ID dell'utente (o ID del creatore originale se creato per conto di un altro
utente) che ha creato.

Esempio: `null`

### `preferences`

Preferenze interne, potrebbero essere vuote.

Esempio: `{}`

### `reply_to`

Contiene l'intestazione "Reply-To", se applicabile.

Esempio: `null`

### `sender_id`

ID dell'utente che ha inviato/creato l'articolo.

Esempio: `2`

### `subject`

Oggetto dell'articolo.

Esempio: `"My amazing subject"`

### `ticket_id`

ID del ticket a cui appartiene l'articolo.

Esempio: `9`

### `to`

Indirizzo email dell'intestazione "To" o gruppo impostato con questo
articolo.

Esempi: `support@example.com`,`"Support"`, `null`

### `type_id`

ID del tipo di articolo (ad esempio telefono, email, web).

Esempio: `1`

### `updated_at`

Timestamp dell'ultimo aggiornamento dell'articolo.

`"2025-02-22T03:47:59.290Z"`

### `updated_by_id`

ID dell'utente che ha aggiornato l'articolo.

Esempio: `10`

## Utente

### `active`

Definisce se un utente è attivo.

Valori: `true`, `false`

### `address`

Indirizzo dell'utente.

Esempi: `""`, `"Hauptstraße 100, 99999 Berlin"`

### `city`

Nome della città dell'utente.

Esempi: `""`, `"Berlin"`

### `country`

Nome del paese dell'utente.

Esempi: `""`, `"Germany"`

### `created_at`

Timestamp di creazione dell'utente.

Esempio: `"2025-02-22T12:47:56.460Z"`

### `created_by_id`

ID dell'utente che ha creato l'utente.

Esempio: `1`

### `department`

Nome del dipartimento.

Esempi: `""`, `"IT"`

### `email`

Indirizzo email dell'utente.

Esempi: `""`, `"nicole.braun@zammad.org"`

### `fax`

Numero di fax dell'utente.

Esempi: `""`, `"+49 123 456 789 01"`

### `firstname`

Nome dell'utente.

Esempi: `""`, `"John"`

### `id`

ID interno dell'utente.

Esempio: `8`

### `last_login`

Timestamp dell'ultimo accesso dell'utente.

Esempi: `null`, `"2025-02-23T12:47:56.460Z"`

### `lastname`

Cognome dell'utente.

Esempi: `""`, `"Doe"`

### `login`

Nome di accesso dell'utente, sempre impostato e univoco, può differire
dall'email.

Esempi: `"auto-1234567"`, `"jdoe"`

### `mobile`

Numero di cellulare dell'utente.

Esempi: `""`, `"+49 123 456 789"`

### `note`

Nota dell'oggetto utente.

Esempi: `""`, `"Some text."`

### `organization`

Dettagli dell’organizzazione di cui l’utente è membro. Dai un’occhiata alla
[sezione sull’organizzazione](#organization-2) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID dell'organizzazione di cui l'utente è membro.

Esempio: `3`

### `out_of_office`

Definisce se l'utente ha attivato la funzione fuori ufficio.

Valori: `false`, `true`

### `out_of_office_end_at`

Data di fine del periodo fuori ufficio.

Esempi: `null`, `"2025-02-26"`

### `out_of_office_replacement_id`

ID dell'utente che sostituisce questo utente durante il periodo fuori
ufficio.

Esempi: `null`, `3`

### `out_of_office_start_at`

Data di inizio del periodo fuori ufficio.

Esempi: `null`, `"2025-02-24"`

### `permissions`

Permessi impostati dell'utente come array.

::: details

<<< @/fixtures/es-indexed-attributes/permissions.json

:::

### `phone`

Numero di telefono dell'utente.

Esempi: `""`, `"+49 1234 567 890"`

### `preferences`

Dettagli delle preferenze dell'utente, può contenere `notification_config`,
`locale` e altri.

::: details

<<< @/fixtures/es-indexed-attributes/preferences.json

:::

### `role_ids`

Array con gli ID dei ruoli assegnati all'utente.

Esempio: `[1, 2]`

### `street`

Nome della via dell'utente.

Esempi: `""`, `"Hauptstraße 100"`

### `updated_at`

Timestamp dell'ultimo aggiornamento dell'utente.

Esempio: `"2025-02-25T00:27:52.308Z"`

### `updated_by_id`

ID dell'utente che ha aggiornato questo utente.

Esempio: `3`

### `verified`

Definisce se l'utente ha verificato l'account o meno.

Valori: `false`, `true`

### `vip`

Definisce se l'utente ha lo stato VIP o meno.

Valori: `false`, `true`

### `web`

URL web dell'utente.

Esempi: `""`, `"https://zammad.org"`

### `zip`

Codice postale dell'utente.

Esempi: `""`, `"123456"`

## Organizzazione

Il seguente indice contiene le informazioni menzionate di seguito:
`*_organization`

### `active`

Definisce se l'organizzazione è attiva o meno.

Valori: `true`, `false`

### `created_at`

Timestamp di creazione dell'organizzazione.

Esempio: `"2025-02-22T12:47:54.807Z"`

### `created_by`

Dettagli dell'utente che ha creato l'organizzazione. Consulta la [sezione
utente](#utente).

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID dell'utente che ha creato l'organizzazione.

Esempio: `1`

### `domain`

Dominio dell'organizzazione.

Esempi: `"null"`, `"example.com"`

### `domain_assignment`

Definisce se l'assegnazione del dominio è attiva o meno, dipende da
`domain`.

Valori: `false`, `true`

### `id`

ID interno dell'organizzazione.

Esempio: `1`

### `members`

Array con i dettagli di ogni utente che è membro dell’organizzazione. Dai
un’occhiata alla [sezione utente](#user) per maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/members.json

:::

### `name`

Nome dell'organizzazione.

Esempio: `"Fast Lane Hardware Inc."`

### `note`

Nota dell'oggetto organizzazione.

Esempio: `"IT hardware and custom PC builds."`

### `shared`

Definisce se è un'"organizzazione condivisa" o meno.

Valori: `false`, `true`

### `updated_at`

Timestamp dell'ultimo aggiornamento dell'organizzazione.

Esempio: `"2025-02-22T12:47:54.807Z"`

### `updated_by`

Dettagli dell'utente che ha aggiornato l'organizzazione. Consulta la
[sezione utente](#utente).

::: details

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID dell'utente che ha aggiornato l'organizzazione.

Esempio: `1`

### `vip`

Definisce se l'organizzazione ha lo stato VIP o meno.

Valori: `false`, `true`

## Gruppo

Il seguente indice contiene le informazioni menzionate di seguito: `*_group`

### `active`

Definisce se il gruppo è attivo o meno.

Valori: `false`, `true`

### `assignment_timeout`

Tempo in minuti in cui un agente può essere inattivo prima che la proprietà
venga rimossa.

Esempi: `null`, `30`

### `created_at`

Timestamp di creazione del gruppo.

Esempio: `"2025-02-24T23:55:06.980Z"`

### `created_by_id`

ID dell'utente che ha creato il gruppo.

Esempio: `1`

### `email_address`

Dettagli sull'indirizzo email del gruppo.

::: details

<<< @/fixtures/es-indexed-attributes/email_address.json

:::

### `email_address_id`

ID dell'indirizzo email del gruppo.

Esempio: `3`

### `follow_up_assignment`

Definisce se i proprietari dei ticket restano assegnati dopo un follow up.

Valori: `false`, `true`

### `follow_up_possible`

Definisce se è possibile un follow up su un ticket chiuso o meno.

Valori: `"yes"`, `"no"`

### `id`

ID interno del gruppo.

Esempio: `1`

### `name`

Nome del gruppo.

Esempi: `"Support"`, `"IT"`

### `note`

Nota dell'oggetto gruppo.

Esempio: `null`

### `signature`

Dettagli della firma del gruppo.

::: details

<<< @/fixtures/es-indexed-attributes/signature.json

:::

### `signature_id`

ID interno della firma.

Esempio: `1`

### `updated_at`

Timestamp dell'ultimo aggiornamento del gruppo.

Esempio: `"2025-02-24T23:55:06.980Z"`

### `updated_by_id`

ID dell'utente che ha aggiornato il gruppo.

Esempio: `3`

## CTI log

Il seguente indice contiene le informazioni menzionate di seguito:
`*_cti_log`

### `call_id`

ID univoco della chiamata.

Esempio: `6`

### `comment`

Commento opzionale.

Esempio: `""`

### `created_at`

Data di creazione della chiamata.

Esempio: `"2025-02-22T11:48:01.703Z"`

### `direction`

Direzione della chiamata.

Valori: `in`, `out`

### `done`

Definisce se la chiamata viene mostrata come "da fare" nell'interfaccia.

Valori: `true`, `false`

### `duration_talking_time`

Durata della chiamata in secondi.

Esempio: `27`

### `duration_waiting_time`

Tempo di attesa in secondi fino alla risposta alla chiamata.

Esempio: `77`

### `end_at`

Timestamp di fine chiamata.

Esempio: `"2025-02-25T08:49:40.647Z"`

### `from`

Numero chiamante.

Esempio: `491711234567890`

### `from_comment`

Nome del numero chiamante, se applicabile.

Esempi: `null`, `"John"`, `"Doe"`

### `from_pretty`

Versione formattata di `from` con spaziatura e `+` aggiunto.

Esempio: `+49 171 1234567890`

### `id`

ID interno della voce di registro.

Esempio: `8`

### `initialized_at`

Timestamp di inizializzazione della chiamata, di solito corrisponde a
`created_at`.

Esempio: `"2025-02-25T08:47:56.753Z"`

### `preferences`

Dettagli delle preferenze, informazioni interne.

::: details

<<< @/fixtures/es-indexed-attributes/call-log-preferences.json

:::

### `queue`

Coda in cui è stata risposta la chiamata.

Esempi: `null`, `491711234567890`

### `start_at`

Timestamp di risposta alla chiamata.

Esempio: `"2025-02-25T08:49:13.050Z"`

### `state`

Ultimo stato della chiamata.

Esempi: `hangup`, `voicemail`

### `to`

Numero chiamato.

Esempio: `491711234567890`

### `to_comment`

Nome visualizzato del numero chiamato, se applicabile.

`"null"`, `"John"`, `"Doe"`

### `to_pretty`

Versione formattata di `to`.

Esempio: `+49 171 1234567890`

### `updated_at`

Ultimo aggiornamento della voce.

Esempio: `"2025-02-25T08:49:40.647Z"`

## Chat session

Il seguente indice contiene le informazioni menzionate di seguito:
`*_chat_session`

### `chat`

Dettagli dell'argomento della chat.

::: details

<<< @/fixtures/es-indexed-attributes/chat.json

:::

### `chat_id`

ID dell'argomento della chat.

Esempio: `1`

### `created_at`

Timestamp di creazione della chat

`"2025-02-25T10:26:24.376Z"`

### `created_by_id` <Badge type="warning" text="deprecato"/>

ID dell'utente che ha creato la chat.

Valore: `null`

### `id`

ID della sessione chat.

Esempio: `1`

### `messages`

Array con tutti i messaggi della chat.

::: details

<<< @/fixtures/es-indexed-attributes/messages.json

:::

### `name`

Il nome per l'utente chat impostato dall'agente, se applicabile.

Esempi: `null`, `"John Doe"`

### `preferences`

Vari metadati interni del session_id

::: details

<<< @/fixtures/es-indexed-attributes/chat-session-preferences.json

:::

### `session_id`

ID univoco della sessione chat.

Esempio: `92f2909631f1ad5ff4d5d1e046952be8`

### `state`

Stato attuale della sessione chat.

Esempio: `closed`

### `tags`

Tag applicati alla sessione chat dall'agente, se applicabile.

Esempio: `["order", "refund"]`

### `updated_at`

Timestamp dell'ultimo aggiornamento della chat.

Esempio: `"2025-02-25T10:27:03.341Z"`

### `updated_by_id`

ID dell'utente che ha aggiornato la sessione chat l'ultima volta.

Esempi: `null`, `3`

### `user`

Dettagli dell'agente della chat. Consulta la [sezione utente](#utente) per
maggiori informazioni.

::: details

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `user_id`

ID dell'agente della chat.

Esempio: `3`
