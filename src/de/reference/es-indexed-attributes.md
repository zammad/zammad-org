---
order: 8
outline:
  - 2
  - 2
title: 'Elasticsearch indizierte Attribute'
---

# Elasticsearch indizierte Attribute

Sie finden unten eine Liste der wichtigsten Objektattribute, die von
Elasticsearch (ES) indiziert werden. Mit anderen Worten: Wenn Sie ein
Ticket, einen Artikel oder einen Benutzer über das Suchfeld von Zammad
finden möchten, kann ES in jedem der unten aufgeführten Felder suchen.

::: info

- This page lists Zammad's default object attributes which are indexed by ES. There are some more ES indexes, mainly
  about objects in the admin interface of Zammad. They are out of scope of this documentation.
- Attributes marked as <Badge type="info" text="SLA"/> are only set if the ticket is affected by SLA calculation.
  Please note that some attributes may not be set if specific conditions are not met.
- Also note that some attributes may be reset to `null` if no longer applicable.
- All timestamps provided by Zammad are UTC by default. This also applies to times provided by ES.

:::

## Übersicht

Einzelheiten zu den verschiedenen Attributen der Objekte finden Sie im
nächsten Abschnitt. In diesem Abschnitt erhalten Sie eine schnelle Übersicht
über die wichtigsten Objekte und wie sie als vollständige JSON-Ausgabe
aussehen.

:::: tabs

=== Ticket

::: details Show complete ticket structure <Badge type="danger" text="Huge content ahead!"/>

<<< @/fixtures/es-indexed-attributes/complete-ticket.json

:::

=== Artikel

Die folgende Struktur ist bereits im Ticket-Index enthalten (siehe erster Tab) und wird hier aus Gründen der
Übersicht separat aufgeführt.

::: details Show complete article structure

<<< @/fixtures/es-indexed-attributes/complete-article.json

:::

=== Benutzer

::: details Show complete user structure

<<< @/fixtures/es-indexed-attributes/complete-user.json

:::

=== Organisation

::: details Show complete organization structure

<<< @/fixtures/es-indexed-attributes/complete-organization.json

:::

::::

## Ticket

Der folgende Index enthält folgende Informationen: `*_ticket`

### `article`

Array mit allen zum Ticket gehörenden Artikeln. Siehe Abschnitt
[Artikel](#article-1) für weitere Details.

::: details Example

<<< @/fixtures/es-indexed-attributes/article.json

:::

### `article_count`

Anzahl der Artikel innerhalb des Tickets.

Beispiel: `1`

### `checklist`

Vollständige Struktur und Elemente der Checkliste.

::: details Example

<<< @/fixtures/es-indexed-attributes/checklist.json

:::

### `close_at`

Erste Schließzeit, einmalig festgelegt. Siehe `last_close_at` für die letzte
Schließzeit (wenn das Ticket erneut geöffnet und geschlossen wurde).

Beispiel: `"2025-03-20T06:48:46.438Z"`

### `close_diff_in_min` <Badge type="info" text="SLA"/>

Depends on `close_in_min` and tells how many minutes the ticket was closed
relative to SLAs solution time.

Beispiele: `239`, `-5`

### `close_escalation_at` <Badge type="info" text="SLA"/>

Zeitstempel, zu dem das Ticket eskaliert, wenn die Lösungszeit nicht
eingehalten wird.

Beispiele: `null`, `"2025-02-03T15:50:20.673Z"`

### `close_in_min` <Badge type="info" text="SLA"/>

Wert in Minuten, der angibt, wie lange das Ticket während der
Geschäftszeiten offen war.

Beispiele: `null`, `11`

### `create_article_sender`

Absender des Artikels (System, Agent, Kunde)

::: details Example

<<< @/fixtures/es-indexed-attributes/create_article_sender.json

:::

### `create_article_sender_id`

ID des Benutzers, der den Artikel erstellt hat.

Beispiele: `1`, `2`

### `create_article_type`

Informationen zum ersten Artikel eines Tickets.

::: details Example

<<< @/fixtures/es-indexed-attributes/create_article_type.json

:::

### `create_article_type_id`

ID des Typs des ersten Artikels.

Beispiel: `5`

### `created_at`

Zeitstempel der Erstellung des Tickets.

Beispiel: `"2025-02-24T16:17:27.210Z"`

### `created_by`

Angaben zu dem Benutzer, der das Ticket erstellt hat. Weitere Informationen
finden Sie im Abschnitt [Benutzer](#user).

::: details Example

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID des Benutzers, der das Ticket erstellt hat.

Beispiel: `3`

### `customer`

Angaben zum Kunden des Tickets. Weitere Informationen finden Sie im
Abschnitt [Benutzer](#user).

### `customer_id`

ID des Kunden, der das Ticket erstellt hat.

Beispiel: `8`

### `escalation_at` <Badge type="info" text="SLA"/>

Zeitstempel der nächsten anwendbaren Eskalation, unabhängig von der
Eskalationsart.

Beispiele: `null`, `"2025-02-24T16:28:38.535Z"`

### `first_response_at` <Badge type="info" text="SLA"/>

Zeitstempel der Ersten Reaktion auf den Kunden (vom Typ Kommunikation).

Beispiele: `null`, `"2025-02-24T16:28:38.303Z"`

### `first_response_diff_in_min` <Badge type="info" text="SLA"/>

Hängt von `first_response_in_min` ab und gibt an, wie viele Minuten die
erste Reaktion im Verhältnis zur ersten Antwortzeit Ihres SLAs gedauert hat.

Beispiele: `Null`, `10`, `-6`

### `first_response_in_min` <Badge type="info" text="SLA"/>

Wert in Minuten, der angibt, wie lange die erste Reaktion auf der Grundlage
der Geschäftszeiten gedauert hat.

Beispiele: `null`, `11`

### `group`

Details zur Gruppe des Tickets. Weitere Informationen finden Sie im
Abschnitt [Gruppe](#group-1).

::: details Example

<<< @/fixtures/es-indexed-attributes/group.json

:::

### `group_id`

ID der aktuellen Gruppe

Beispiel: `1`

### `id`

ID des Tickets

Beispiele: `1`, `111`

### `last_close_at`

Letzte Schließzeit, die bei jedem Schließen eines Tickets gesetzt wird.

Beispiele: `null`, `"2025-02-03T14:50:20.673Z"`

### `last_contact_agent_at`

Zeitstempel des letzten Kontakts vom Typ Kommunikation eines beliebigen
Agenten.

Beispiele: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_at`

Zeitstempel des letzten Kontakts/Artikels vom Typ Kommunikation, unabhängig
davon, wer ihn erstellt hat.

Beispiele: `null`, `"2025-02-24T16:28:38.303Z"`

### `last_contact_customer_at`

Zeitstempel des letzten Kontakts/Artikels des Typs Kommunikation vom Kunden.

Beispiele: `null`, `"2025-02-24T16:28:38.303Z"`

### `mention_user_ids`

Array mit den IDs der erwähnten oder abonnierenden Benutzer.

Beispiele: `[3, 5]`, `[]`

### `note`

Notizen zum Ticket, kann nur über die Konsole oder API gesetzt werden.

Beispiel: `null`

### `number`

Ticket-Nummer.

Beispiele: `1010138`, `202006231010138`

### `organization`

Details der Organisation des Kunden des Tickets. Weitere Informationen
finden Sie im Abschnitt [Organisation](#organization-2).

::: details Example

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID der Organisation des Kunden, die das Ticket erstellt hat.

Beispiele: `null`, `2`

### `owner`

Details zum Benutzer, der Besitzer des Tickets ist. Weitere Informationen
finden Sie im Abschnitt [Benutzer](#user).

::: details Example

<<< @/fixtures/es-indexed-attributes/owner.json

:::

### `owner_id`

ID des Benutzers, der Besitzer des Tickets ist.

Beispiele: `null`, `3`

### `pending_time`

Zeitstempel der hinterlegten "Warten auf..." Zeit. Nur wenn ein Status vom
Typ "Warten auf..." gesetzt ist.

Beispiele: `null`, `"2025-02-24T17:44:06.912Z"`

### `preferences`

Spezielle Informationen für interne Funktionen. Steht in Ihrem System
möglicherweise nicht zur Verfügung, enthält Informationen für interne
Systemfunktionen.

### `priority`

Details zur Priorität des Tickets. Weitere Informationen finden Sie im
Abschnitt [Priorität](#ticket-prioritat).

::: details Example

<<< @/fixtures/es-indexed-attributes/priority.json

:::

### `priority_id`

ID der Priorität des Tickets.

Beispiel: `2`

### `state`

Details über den Status des Tickets. Weitere Informationen finden Sie im
Abschnitt [Status](#ticket-status).

::: details Example

<<< @/fixtures/es-indexed-attributes/state.json

:::

### `state_id`

ID des aktuellen Status des Tickets.

Beispiele: `1`, `4`

### `tags`

Array mit allen Tags, die an das Ticket angehängt sind.

Beispiele: `["Bestellung", "Beschwerde"]`, `[]`

### `time_unit`

Erfasste Zeiteinheiten für das Ticket (gesamt).

Beispiele: `null`, `15`

### `title`

Titel/Betreff des Tickets.

Beispiele: `Feedback-Formular`, `Brauche Hilfe`

### `type` <Badge type="warning" text="veraltet"/>

Wert: `null`

### `update_diff_in_min` <Badge type="info" text="SLA"/>

Hängt von `update_in_min` ab und gibt an, wie viele Minuten die letzte
Aktualisierung eines Tickets im Verhältnis zur Aktualisierungszeit des SLAs
gedauert hat.

Beispiele: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_escalation_at` <Badge type="info" text="SLA"/>

Zeitstempel, zu dem das Ticket bei Verletzung der SLA-Aktualisierungsfrist
eskalieren würde.

Beispiele: `null`, `"2025-02-24T16:28:38.303Z"`

### `update_in_min` <Badge type="info" text="SLA"/>

Wert in Minuten, der angibt, wie lange die letzte Aktualisierung eines
Tickets gedauert hat, basierend auf den Geschäftszeiten und der
Aktualisierungszeit.

Beispiele: `Null`, `5`, `-10`

### `updated_at`

Zeitstempel der letzten Aktualisierung des Tickets.

Beispiel: `"2025-02-24T16:28:38.303Z"`

### `updated_by`

Details des Benutzers, der das Ticket aktualisiert hat. Weitere
Informationen finden Sie im Abschnitt [Benutzer](#user).

::: details Example

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID des Benutzers, der das Ticket aktualisiert hat.

Beispiele: `1`, `3`

## Ticket-Priorität

Der folgende Index enthält folgende Informationen: `*_ticket_priority`

### `active`

Legt fest, ob die Priorität aktiv ist oder nicht.

Werte: `true`, `false`

### `created_at`

Zeitstempel der Erstellung der Priorität.

Beispiel: `"2025-02-03T14:50:20.724Z"`

### `created_by_id`

ID des Benutzers, der die Priorität erstellt hat.

Beispiel: `1`

### `default_create`

Legt fest, ob die Priorität die Standardpriorität für die Erstellung von
Tickets ist oder nicht.

Werte: `false`, `true`

### `id`

ID der Priorität.

Beispiel: `3`

### `name`

Name der Priorität.

Beispiel: `"3 hoch"`

### `note`

Notiz zur Priorität, die über die Konsole oder API festgelegt wurde.

Beispiel: `"null"`

### `ui_color`

CSS-Klasse für die Farbe der Hervorhebung für Tickets mit dieser Priorität.

Beispiele: `"null"`, `"high-priority"`

### `ui_icon`

CSS-Klasse für das Symbol der Hervorhebung für Tickets mit dieser Priorität.

Beispiele: `"null"`, `"important"`

### `updated_at`

Zeitstempel der letzten Änderung.

Beispiel: `"2025-02-03T14:50:20.724Z"`

### `updated_by_id`

ID des Benutzers, der die letzte Aktualisierung durchgeführt hat.

Beispiel: `1`

## Ticket-Status

Der folgende Index enthält folgende Informationen: `*_ticket_state`

### `active`

Legt fest, ob der Status aktiv (verfügbar) ist oder nicht.

Werte: `true`, `false`

### `created_at`

Zeitstempel der Erstellung des Status.

Beispiel: `"2025-02-03T14:50:20.694Z"`

### `created_by_id`

ID des Benutzers, der den Status erstellt hat.

Beispiel: `1`

### `default_create`

Legt fest, ob der Status der Standardstatus bei der Erstellung von Tickets
ist.

Werte: `false`, `true`

### `default_follow_up`

Legt fest, ob der Status der Standardstatus für Rückfragen zu einem Ticket
ist.

Werte: `false`, `true`

### `id`

ID des Status.

Beispiel: `7`

### `ignore_escalation`

Legt fest, ob die SLA-Berechnung für diesen Status ignoriert wird.

Werte: `false`, `true`

### `name`

Name des Status.

Beispiel: `"Warten auf Schließen"`

### `next_state`

Enthält alle Informationen über den Status bei Rückfragen, falls zutreffend;
kann je nach Art des Status nicht verfügbar sein

::: details Example

<<< @/fixtures/es-indexed-attributes/next_state.json

:::

### `next_state_id`

ID des Status bei Rückfragen.

Beispiele: `null`, `4`

### `note`

Notiz, die über die Konsole oder API erstellt wurde.

Beispiel: `"null"`

### `state_type`

Enthält alle verfügbaren Informationen über den Statustyp

::: details Example

<<< @/fixtures/es-indexed-attributes/state_type.json

:::

### `state_type_id`

ID des Status-Typs.

Beispiel: `4`

### `updated_at`

Zeitstempel der letzten Aktualisierung des Status.

Beispiel: `"2025-02-03T14:50:20.694Z"`

### `updated_by_id`

ID des Benutzers, der die letzte Aktualisierung des Status vorgenommen hat.

Beispiel: `1`

## Artikel

Der folgende Index enthält folgende Informationen: `*_ticket`

Artikel sind Teil des Ticket-Indexes. Um die Übersicht zu wahren beschreiben
wir sie in einem eigenen Abschnitt.

### `body`

Text des Artikels als Plaintext.

Beispiel: `"Hallo, \n\nBitte schicken Sie mir:\n1 [...] \nDanke\n\nJohn
Doe"`

### `cc`

Die in CC eingetragenen E-Mail-Adressen.

Beispiele: `null`, `alias@domain.tld`

### `content_type`

Art des Inhalts des Artikels.

Beispiele: `"text/html"`, `"text/plain"`

### `created_at`

Zeitstempel der Erstellung des Artikels.

Beispiel: `"2025-02-22T03:47:59.290Z"`

### `created_by_id`

ID des Benutzers, der den Artikel erstellt hat.

Beispiel: `10`

### `detected_language`

Sprachcode der erkannten Sprache.

Beispiele: `"en"`, `"de"`, `null`

### `detected_language_name`

Sprachenname der erkannten Sprache.

Beispiele: `"English"`, `"German"``

### `from`

Name (und E-Mail-Adresse) des Verfassers des Artikels.

Beispiele: `"Nicole Braun <nicole.braun@zammad.org>"`, `"John Doe"`

### `id`

Interne ID des Artikels.

Beispiel: `16`

### `in_reply_to`

"In-Reply-To" Header der E-Mail, falls zutreffend.

Beispiel: `null`

### `internal`

Legt fest, ob ein Artikel intern ist oder nicht.

Werte: `false`, `true`

### `message_id`

Message ID der E-Mail, falls zutreffend.

Beispiel: `null`

### `origin_by_id`

ID des Benutzers, der den Artikel erstellt hat (oder des eigentlichen
Erstellers, falls im Namen eines anderen Benutzers erstellt wurde).

Beispiel: `null`

### `preferences`

Interne Einstellungen, kann leer sein.

Beispiel: `{}`

### `reply_to`

Enthält den "Reply-To" Header, falls zutreffend.

Beispiel: `null`

### `sender_id`

ID des Benutzers, der den Artikel gesendet/erstellt hat.

Beispiel: `2`

### `subject`

Betreff des Artikels.

Beispiel: `"Mein toller Betreff"`

### `ticket_id`

ID des Tickets, zu dem der Artikel gehört.

Beispiel: `9`

### `to`

E-Mail-Adresse aus dem "To" Header oder die Gruppe, die mit diesem Artikel
eingestellt wurde.

Beispiele: `support@example.com`,`"Support"`, `null`

### `type_id`

ID des Typs des Artikels (z.B. Telefon, E-Mail, Web).

Beispiel: `1`

### `updated_at`

Zeitstempel der letzten Aktualisierung des Artikels.

`"2025-02-22T03:47:59.290Z"`

### `updated_by_id`

ID des Benutzers, der den Artikel aktualisiert hat.

Beispiel: `10`

## Benutzer

### `active`

Definiert, ob ein Benutzer aktiv ist.

Werte: `true`, `false`

### `address`

Adresse des Benutzers.

Beispiele: `""`, `"Hauptstraße 100, 99999 Berlin"`

### `city`

Name der Stadt des Benutzers.

Beispiele: `""`, `"Berlin"`

### `country`

Name des Landes, das im Benutzer eingetragen ist.

Beispiele: `""`, `"Deutschland"`

### `created_at`

Zeitstempel der Erstellung des Benutzers.

Beispiel: `"2025-02-22T12:47:56.460Z"`

### `created_by_id`

ID des Benutzers, der den Benutzer erstellt hat.

Beispiel: `1`

### `department`

Name der Abteilung.

Beispiele: `""`, `"IT"`

### `email`

E-Mail-Adresse des Benutzers.

Beispiele: `""`, `"nicole.braun@zammad.org"`

### `fax`

Faxnummer des Benutzers.

Beispiele: `""`, `"+49 123 456 789 01"`

### `firstname`

Vorname des Benutzers.

Beispiele: `""`, `"John"`

### `id`

Interne ID des Benutzers.

Beispiel: `8`

### `last_login`

Zeitstempel der letzten Anmeldung des Benutzers.

Beispiele: `null`, `"2025-02-23T12:47:56.460Z"`

### `lastname`

Nachname des Benutzers.

Beispiele: `""`, `"Doe"`

### `login`

Der Login-Name des Benutzers. Ist immer festgelegt und eindeutig und kann
sich von der E-Mail-Adresse unterscheiden.

Beispiele: `"auto-1234567"`, `"jdoe"`

### `mobile`

Mobiltelefonnummer des Benutzers.

Beispiele: `""`, `"+49 123 456 789"`

### `note`

Notiz, die im Benutzer-Objekt eingetragen ist.

Beispiele: `""`, `"Ein Text."`

### `organization`

Details zur Organisation, in welcher der Benutzer Mitglied ist. Weitere
Informationen finden Sie im Abschnitt [Organisation](#organisation-2).

::: details Example

<<< @/fixtures/es-indexed-attributes/organization.json

:::

### `organization_id`

ID der Organisation, in welcher der Benutzer Mitglied ist.

Beispiel: `3`

### `out_of_office`

Legt fest, ob der Benutzer die Abwesenheitsfunktion aktiviert hat.

Werte: `false`, `true`

### `out_of_office_end_at`

Enddatum der Abwesenheitsperiode.

Beispiele: `null`, `"2025-02-26"`

### `out_of_office_replacement_id`

ID des Benutzers, der diesen Benutzer während des Abwesenheitszeitraums
vertritt.

Beispiele: `null`, `3`

### `out_of_office_start_at`

Datum des Beginns der Abwesenheitsperiode.

Beispiele: `null`, `"2025-02-24"`

### `permissions`

Die festgelegten Berechtigungen des Benutzers als Array.

::: details Example

<<< @/fixtures/es-indexed-attributes/permissions.json

:::

### `phone`

Telefonnummer des Benutzers.

Beispiele: `""`, `"+49 1234 567 890"`

### `preferences`

Details zu den Einstellungen des Benutzers, kann `notification_config`,
`locale` und andere interne Systeminformationen enthalten.

::: details Example

<<< @/fixtures/es-indexed-attributes/preferences.json

:::

### `role_ids`

Array mit Rollen IDs, die dem Benutzer zugewiesen sind.

Beispiel: `[1, 2]`

### `street`

Name der Straße des Benutzers.

Beispiele: `""`, `"Hauptstraße 100"`

### `updated_at`

Zeitstempel der letzten Aktualisierung des Benutzers.

Beispiel: `"2025-02-25T00:27:52.308Z"`

### `updated_by_id`

ID des Benutzers, der diesen Benutzer aktualisiert hat.

Beispiel: `3`

### `verified`

Legt fest, ob der Benutzer das Konto verifiziert hat oder nicht.

Werte: `false`, `true`

### `vip`

Legt fest, ob der Benutzer den Status VIP hat oder nicht.

Werte: `false`, `true`

### `web`

Web URL des Benutzers.

Beispiele: `""`, `"https://zammad.org"`

### `zip`

Postleitzahl des Benutzers.

Beispiele: `""`, `"123456"`

## Organisation

Der folgende Index enthält folgende Informationen: `*_Organisation`

### `active`

Definiert, ob die Organisation aktiv ist oder nicht.

Werte: `true`, `false`

### `created_at`

Zeitstempel des Erstellungsdatums der Organisation.

Beispiel: `"2025-02-22T12:47:54.807Z"`

### `created_by`

Details des Benutzers, der die Organisation erstellt hat. Weitere
Informationen finden Sie im Abschnitt [Benutzer](#benutzer).

::: details Example

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `created_by_id`

ID des Benutzers, der die Organisation erstellt hat.

Beispiel: `1`

### `domain`

Domain der Organisation.

Beispiele: `"null"`, `"beispiel.com"`

### `domain_assignment`

Legt fest, ob die Domainbasierte Zuweisung aktiv ist oder nicht, abhängig
von `domain`.

Werte: `false`, `true`

### `id`

Interne ID der Organisation.

Beispiel: `1`

### `members`

Array mit Details zu jedem Benutzer, der Mitglied der Organisation
ist. Weitere Informationen finden Sie im Abschnitt [Benutzer](#user).

::: details Example

<<< @/fixtures/es-indexed-attributes/members.json

:::

### `name`

Name der Organisation.

Beispiel: `"Fast Lane Hardware Inc."`

### `note`

Notiz zur Organisation.

Beispiel: `"IT-Hardware und Custom-PCs."`

### `shared`

Legt fest, ob es sich um eine "teilende Organisation" handelt oder nicht.

Werte: `false`, `true`

### `updated_at`

Zeitstempel der letzten Aktualisierung der Organisation.

Beispiel: `"2025-02-22T12:47:54.807Z"`

### `updated_by`

Angaben zu dem Benutzer, der die Organisation aktualisiert hat. Weitere
Informationen finden Sie im Abschnitt [Benutzer](#user).

::: details Example

<<< @/fixtures/es-indexed-attributes/updated_by.json

:::

### `updated_by_id`

ID des Benutzers, der die Organisation aktualisiert hat.

Beispiel: `1`

### `vip`

Legt fest, ob die Organisation VIP-Status hat oder nicht.

Werte: `false`, `true`

## Gruppe

Der folgende Index enthält folgende Informationen: `*_group`

### `active`

Legt fest, ob die Gruppe aktiv ist oder nicht.

Werte: `false`, `true`

### `assignment_timeout`

Zeit in Minuten, die ein Agent inaktiv sein kann, bis der Besitzer entfernt
wird.

Beispiele: `null`, `30`

### `created_at`

Zeitstempel der Erstellung der Gruppe.

Beispiel: `"2025-02-24T23:55:06.980Z"`

### `created_by_id`

ID des Benutzers, der die Gruppe erstellt hat.

Beispiel: `1`

### `email_address`

Details zur E-Mail-Adresse der Gruppe.

::: details Example

<<< @/fixtures/es-indexed-attributes/email_address.json

:::

### `email_address_id`

ID der E-Mail Adresse der Gruppe.

Beispiel: `3`

### `follow_up_assignment`

Legt fest, ob Besitzer von Tickets nach einer Rückfrage noch zugewiesen
werden.

Werte: `false`, `true`

### `follow_up_possible`

Legt fest, ob eine Rückfrage in einem geschlossenen Ticket möglich ist oder
nicht.

Werte: `"yes"`, `"no"`

### `id`

Interne ID der Gruppe.

Beispiel: `1`

### `name`

Name der Gruppe.

Beispiele: `"Support"`, `"IT"`

### `note`

Notiz zur Gruppe.

Beispiel: `null`

### `signature`

Details zur Signatur der Gruppe.

::: details Example

<<< @/fixtures/es-indexed-attributes/signature.json

:::

### `signature_id`

Interne ID der Signatur.

Beispiel: `1`

### `updated_at`

Zeitstempel der letzten Aktualisierung der Gruppe.

Beispiel: `"2025-02-24T23:55:06.980Z"`

### `updated_by_id`

ID des Benutzers, der die Gruppe aktualisiert hat.

Beispiel: `3`

## CTI-Protokoll

Der folgende Index enthält folgende Informationen: `*_cti_log`

### `call_id`

Eindeutige ID des Anrufs.

Beispiel: `6`

### `comment`

Optionaler Kommentar.

Beispiel: `""`

### `created_at`

Datum der Erstellung des Aufrufs.

Beispiel: `"2025-02-22T11:48:01.703Z"`

### `direction`

Richtung des Anrufs.

Werte: `in`, `out`

### `done`

Legt fest, ob der Anruf in der Benutzeroberfläche als "to do" angezeigt
wird.

Werte: `true`, `false`

### `duration_talking_time`

Dauer des Anrufs in Sekunden.

Beispiel: `27`

### `duration_waiting_time`

Wartezeit in Sekunden, bis der Anruf entgegengenommen wurde.

Beispiel: `77`

### `end_at`

Zeitstempel des Anrufendes.

Beispiel: `"2025-02-25T08:49:40.647Z"`

### `from`

Anrufende Nummer.

Beispiel: `491711234567890`

### `from_comment`

Name zur anrufenden Nummer, falls zutreffend.

Beispiele: `null`, `"John"`, `"Doe"`

### `from_pretty`

Hübsche Version von`from` mit Abständen und hinzugefügtem `+`.

Beispiel: `+49 171 1234567890`

### `id`

Interne ID des Protokolleintrags.

Beispiel: `8`

### `initialized_at`

Zeitstempel der Anrufinitialisierung, entspricht normalerweise `created_at`.

Beispiel: `"2025-02-25T08:47:56.753Z"`

### `preferences`

Details zu Einstellungen, interne Informationen.

::: details Example

<<< @/fixtures/es-indexed-attributes/call-log-preferences.json

:::

### `queue`

Warteschlange, in der der Anruf angenommen wurde.

Beispiele: `null`, `491711234567890`

### `start_at`

Zeitstempel, zu dem der Anruf entgegengenommen wurde.

Beispiel: `"2025-02-25T08:49:13.050Z"`

### `state`

Letzter Status des Anrufs.

Beispiele: `hangup`, `voicemail`

### `to`

Gewählte Nummer.

Beispiel: `491711234567890`

### `to_comment`

Anzeige des Namens zur angerufenen Nummer, falls zutreffend.

`"null"`, `"John"`, `"Doe"`

### `to_pretty`

Hübsche Version von `to`.

Beispiel: `+49 171 1234567890`

### `updated_at`

Letzte Aktualisierung des Eintrags.

Beispiel: `"2025-02-25T08:49:40.647Z"`

## Chat-Sitzung

Der folgende Index enthält folgende Informationen: `*_chat_session`

### `chat`

Details zum Thema des Chats.

::: details Example

<<< @/fixtures/es-indexed-attributes/chat.json

:::

### `chat_id`

ID des Chat-Themas.

Beispiel: `1`

### `created_at`

Zeitstempel der Chaterstellung

`"2025-02-25T10:26:24.376Z"`

### `created_by_id` <Badge type="warning" text="deprecated"/>

ID des Benutzers, der den Chat erstellt hat.

Wert: `null`

### `id`

ID der Chatsitzung.

Beispiel: `1`

### `messages`

Array mit allen Nachrichten des Chats.

::: details Example

<<< @/fixtures/es-indexed-attributes/messages.json

:::

### `name`

Der Name für den Benutzer des Chats, der ggf. vom Agenten festgelegt wurde.

Beispiele: `Null`, `"John Doe"`

### `preferences`

Verschiedene interne Metadaten der session_id

::: details Example

<<< @/fixtures/es-indexed-attributes/chat-session-preferences.json

:::

### `session_id`

Eindeutige ID der Chatsitzung.

Beispiel: `92f2909631f1ad5ff4d5d1e046952be8`

### `state`

Aktueller Status der Chatsitzung.

Beispiel: `closed`

### `tags`

Tags, die der Agent auf die Chatsitzung angewendet hat, falls zutreffend.

Beispiel: `["Bestellung", "Erstattung"]`

### `updated_at`

Zeitstempel der letzten Aktualisierung des Chats.

Beispiel: `"2025-02-25T10:27:03.341Z"`

### `updated_by_id`

ID des Benutzers, der die Chatsitzung das letzte Mal aktualisiert hat.

Beispiele: `null`, `3`

### `user`

Details zum Chat Agent. Siehe Abschnitt [Benutzer](#benutzer) für weitere
Informationen.

::: details Example

<<< @/fixtures/es-indexed-attributes/created_by.json

:::

### `user_id`

ID des Agenten des Chats.

Beispiel: `3`
