---
order: 8
title: 'Elasticsearch indizierte Attribute'
---

# Elasticsearch indizierte Attribute

Sie finden unten eine umfassende Liste aller Standard-Objektattribute, die
von Elasticsearch indiziert werden. Mit anderen Worten, wenn Sie ein Ticket,
einen Artikel oder einen Benutzer über das Zammad-Suchfeld finden möchten,
kann Elasticsearch auf jedes der unten aufgeführten Felder zugreifen.

:::info

- <Badge type="info" text="SLA"/>: Mit SLA markierte Attribute zeigen an, ob
  das Attribut von der SLA-Berechnung betroffen ist. Bitte beachten Sie, dass einige Attribute
  möglicherweise nicht gesetzt werden, wenn bestimmte Bedingungen nicht erfüllt sind.
- Beachten Sie auch, dass einige Attribute auf `null` zurückgesetzt werden können, wenn sie nicht mehr zutreffen.
- `Notiz` Attribute: Notiz-Attribute sind normalerweise leer, wenn sie nicht über die Konsole oder API angegeben werden.
- Zeitstempel: Alle von Zammad augegebenen Zeitstempel sind standardmäßig UTC. Dies gilt auch
  für die von Elasticsearch ausgegebenen Zeiten
:::

Die nachstehenden Attribute, Beispielwerte und Beschreibungen sind auf diese
Weise aufgebaut:

`Attribut`
: - `1`, `null`
  - Dies ist die Beschreibung des Attributs, falls vorhanden.

## Ticket

Der folgende Index enthält folgende Informationen: `*_ticket`

`article`
  - Array mit allen zum Ticket gehörenden Artikeln
  - Siehe [Artikel](#artikel) für weitere Details.

`article_count`
: - `1`
  - Anzahl der Artikel innerhalb des Tickets

`checklist`
: - Enthält diese Attribute:
    - name: `null`, `Checklist Titel`;
    - items: `(array)`
  - Das Elemente-Array enthält den Text der Elemente

`close_at`
: - `null`, `2021-03-03T14:50:20.673Z`
  - Erste Schließzeit, einmalig festgelegt

`close_diff_in_min` <Badge type="info" text="SLA"/>
: - `null`, `239`, `-5`
  -Hängt von close_in_min ab und gibt an, wie viele Minuten das Ticket relativ
   zur SLA-Lösungszeit geschlossen wurde.

`close_escalation_at` <Badge type="info" text="SLA"/>
: - `null`, `2021-03-03T15:50:20.673Z`
  - Zeitstempel, zu dem das Ticket eskaliert, wenn die Zeit für die Lösung überschritten wird.

`close_in_min` <Badge type="info" text="SLA"/>
: - `null`, `11`
  - Wert in Minuten, der angibt, wie lange das Ticket geöffnet war, basierend auf den Geschäftszeiten.

`create_article_sender`
: - Enthält diese Attribute:
      - note: `null`
      - updated_at: `2021-03-03T14:50:20.812Z`
      - name: `Customer`
      - created_at: `2021-03-03T14:50:20.812Z`
      - updated_by_id: `1`
      - id: `2`
      - created_by_id: `1`
  - Absender des Artikels (System, Agent, Kunde)

`create_article_sender_id`
: - `1`, `2`
  - ID des Benutzers, der den Artikel erstellt hat.

`create_article_type`
: - Contains these attributes:
    - note: `null`
    - updated_at: `2021-03-03T14:50:20.812Z`
    - name: `phone`, `email`, `web`
    - active: `true`
    - created_at: `2021-03-03T14:50:20.812Z`
    - updated_by_id: `1`
    - id: `5`
    - created_by_id: `1`
    - communication: `true`, `false`
    - Informationen über die Art und Beschaffenheit des ersten Artikels

`create_article_type_id`
: - `5`
  - Typ-ID des ersten Artikels

`created_at`
: - `2021-03-24T16:17:27.210Z`
  - Zeitstempel der Ticketerstellung

`created_by`
: - \#\{user object\}
  - Vollständiger Payload des Benutzers, der das Ticket erstellt hat. Schauen Sie sich den
    Abschnitt [Benutzer](#benutzer) an für weitere Informationen.

`created_by_id`
: - `3`
  - ID des Benutzers, der das Ticket erstellt hat.

`customer`
: - \#\{user object\}
  - Vollständiger Payload des Kunden, der das Ticket erstellt hat. Schauen Sie sich den
    Abschnitt [Benutzer](#benutzer) an für weitere Informationen.

`customer_id`
: - `8`
  - Benutzer-ID des Kunden

`escalation_at` <Badge type="info" text="SLA"/>
: - `null`, `2021-03-24T16:28:38.535Z`
  - Zeitstempel der nächsten anwendbaren Eskalation. Eines der folgenden
    Attribute:
      - `close_escalation_at`
      - `first_response_escalation_at`
      - `update_escalation_at`

`first_response_at` <Badge type="info" text="SLA"/>
: - `null`, `2021-03-24T16:28:38.303Z`
  - Zeitstempel der ersten Reaktion der Art Kommunikation an den Kunden.

`first_response_diff_in_min` <Badge type="info" text="SLA"/>
: - `null`, `10`, `-6`
  - Hängt von `first_response_in_min` ab und gibt an, wie viele Minuten die
    Erstreaktion relativ zur ersten Antwortzeit Ihres SLA war.

`first_response_in_min` <Badge type="info" text="SLA"/>
: - `null`, `11`
  - Wert in Minuten, der angibt, wie lange die erste Reaktion innerhalb der
    Geschäftszeiten gebraucht hat.

`group`
: - \#\{group object\}
  - Vollständiger Payload der aktuellen Gruppe. Werfen Sie einen Blick in den
    Abschnitt [Gruppe] (#gruppe) für weitere Informationen.

`group_id`
: - `1`
  - ID der aktuellen Gruppe

`id`
- : `1`, `111`
  - ID des Tickets

`last_close_at`
: - `null`, `2021-03-03T14:50:20.673Z`
  - Letzter Schließzeitpunkt, der bei jedem Schließen eines Tickets festgelegt wird.

`last_contact_agent_at`
: - `null`, `2021-03-24T16:28:38.303Z`
  - Zeitstempel des letzten Kontakts des Typs Kommunikation eines beliebigen Agenten.

`last_contact_at`
: - `null`, `2021-03-24T16:28:38.303Z`
  - Zeitstempel des letzten Kontakts des Typs Kommunikation. Hängt ab von
    `last_contact_agent_at`, `last_contact_customer_at` und der Einstellung
    "Verhalten der Aktualisierung des letzter Kundenkontakts".

`last_contact_customer_at`
: - `null`, `2021-03-24T16:28:38.303Z`
  - Zeitstempel des letzten Kontakts des Typs Kommunikations des Kunden.

`mention_user_ids`
: - `[3, 5]`
  - Array mit den IDs der erwähnten oder abonnierten Benutzer.

`note`
: - `null`
  - Notiz des Tickets, nur über die Konsole oder API gesetzt.

`number`
: - `1010138`, `202006231010138`
  - Ticketnummer

`organization`
: - `null`, \#\{organization object\}
  - Vollständiger Payload des Benutzers, der Eigentümer des Tickets ist. Schauen Sie sich den
    Abschnitt [Organisation](#organisation) an für weitere Informationen.

`organization_id`
: - `null`, `2`
  - ID der Organisation des Kunden

`owner`
: - `null`, \#\{user object\}
  - Vollständiger Payload des Benutzers, der Eigentümer des Tickets ist. Schauen Sie sich den
    Abschnitt [Benutzer](#benutzer) an für weitere Informationen.

`owner_id`
: - `null`, `3`
  - ID des Benutzers, der das Ticket besitz

`pending_time`
: - `null`, `2021-03-24T17:44:06.912Z`
  - Hängt vom Status "Warten auf ..." und dem Zeitstempel ab.

`preferences`
: - n/a, spezielle Informationen für interne Funktionen
  - Kann in Ihrem System nicht verfügbar sein, enthält Informationen für interne
    Systemfunktionen.

`priority`
: - \#\{priority object\}
  - Vollständiger Payload der Priorität des Tickets. Werfen Sie einen Blick in den
    Abschnitt [Priorität](#priorität) für weitere Informationen.

`priority_id`
: - `2`
  - ID der Priorität des Tickets.

`state`
: - \#\{state object\}
  - Vollständiger Payload des aktuellen Status des Tickets. Werfen Sie einen Blick in den
    Abschnitt [Status](#status) für weitere Informationen.

`state_id`
: - `1`, `4`
  - ID des aktuellen Status des Tickets

`tags`
: - `["Bestellung", "Beschwerde"]`
  - Array mit allen angehängten Tags.

`time_unit`
: - `null`, `15`
  -  Erfasste Zeiten für das Ticket (gesamt).

`title`
: - `Feedback Formular`, `Brauche Hilfe`
  - Titel/Betreff des Tickets

`type`
: - `null`
  - Ticket-Typ (veraltet)

`update_diff_in_min` <Badge type="info" text="SLA"/>
: - `null`, `2021-03-24T16:28:38.303Z`
  - Hängt von `update_in_min` ab und gibt an, wie viele Minuten die letzte Ticket-
    Aktualisierung relativ zur definierten Aktualisierungszeit gedauert hat.

`update_escalation_at` <Badge type="info" text="SLA"/>
: - `null`, `2021-03-24T16:28:38.303Z`
  - Zeitpunkt, bei dem das Ticket eskaliert, wenn die Aktualisierungszeit verletzt wird.

`update_in_min` <Badge type="info" text="SLA"/>
: - `null`, `5`, `-10`
  - Wert in Minuten, der angibt, wie lange die letzte Aktualisierung eines Tickets gedauert hat, basierend auf den
    Geschäftszeiten und der Aktualisierungszeit.

`updated_at`
: - `2021-03-24T16:28:38.303Z`
  - Letzte Aktualisierung des Tickets

`updated_by`
: - \#\{user object\}
  - Vollständiger Payload des Benutzers, der das Ticket aktualisiert hat. Schauen Sie sich den
    Abschnitt [Benutzer](#benutzer) an für weitere Informationen.

`updated_by_id`
: - `1`, `3`
  - ID des Benutzers, der das Ticket aktualisiert hat.

## Ticket-Priorität

Der folgende Index enthält folgende Informationen: `*_ticket_priority`

`active`
: - `true`, `false`
  - Legt fest, ob die Priorität aktiv (verfügbar) ist.

`created_at`
: - `2021-03-03T14:50:20.724Z`
  - Erstellungsdatum der Priorität

`created_by_id`
: - `1`
  - Benutzer, der die Priorität erstellt hat

`default_create`
: - `false`, `true`
  - Legt fest, ob die Priorität bei der Erstellung eines Tickets die Standardpriorität ist.

`id`
: - `3`
  - ID der Priorität

`name`
: - `3 high`
  - Name der Priorität

`note`
: - `null`
  - Notiz für die Priorität, die über die Konsole oder API gesetzt wurde.

`ui_color`
: - `null`, `high-priority`
  - CSS-Klasse für Tickets mit hoher Priorität.

`ui_icon`
: - `null`, `important`
  - CSS-Klasse für Ticket-Symbole der Priorität.

`updated_at`
: - `2021-03-03T14:50:20.724Z`
  - Datum der letzten Änderung

`updated_by_id`
: - `1`
  - Benutzer ID des Benutzers, der die Priorität zuletzt aktualisiert hat


## Ticket-Status

Der folgende Index enthält folgende Informationen: `*_ticket_state`

`active`
: - `true`, `false`
  - Legt fest, ob der Status aktiv (verfügbar) ist

`created_at`
: - `2021-03-03T14:50:20.694Z`
  -  Datum der Erstellung

`created_by_id`
: - `1`
  - ID des Benutzers, der den Status erstellt hat

`default_create`
: - `false`, `true`
  - Legt fest, ob der Status bei der Erstellung eines Tickets der Standardstatus ist.

`default_follow_up`
: - `false`, `true`
  - Legt fest, ob der Status der Standardstatus bei Rückfragen in Tickets ist.

`id`
: - `7`
  - ID des Status

`ignore_escalation`
: - `false`, `true`
  - Legt fest, ob die SLA-Berechnung für diesen Status generell ignoriert wird.

`name`
: - `pending close`
  - Name des Status

`next_state`
: - n/a, \#\{state object\}
  - Enthält alle Informationen zum folgenden Status (bei "Warten auf" Status). Möglicherweise nicht
    verfügbar je nach Status-Typ

`next_state_id`
: - `null`, `4`
  - Status ID des folgenden Status

`note`
: - `null`
  - Notiz, die über die Konsole oder API gesetzt wurde.

`state_type`
: - Enthält diese Attribute:
     - created_at: `2021-03-03T14:50:20.582Z`
     - created_by_id: `1`
     - id: `4`
     - name: `pending action`
     - note: `null`
     - updated_at: `2021-03-03T14:50:20.582Z`
     - updated_by_id: `1`
  - Enthält alle verfügbaren Informationen zum Statustyp

`state_type_id`
: - `4`
  - ID des Statustyps

`updated_at`
: - `2021-03-03T14:50:20.694Z`
  - Letztes Update des Status

`updated_by_id`
: - `1`
  - ID des Benutzers, der den Status zuletzt aktualisiert hat

## Artikel

Der folgende Index enthält folgende Informationen: `*_ticket`

Artikel sind Teil des Ticket-Indexes. Um die Komplexität zu verringern,
haben wir sie in einen eigenen Bereich verschoben.

`body`
: - `Hi,\n\nplease send me:\n1 [...] \nThank you\n\nJohn Doe`
  - Artikeltext als Klartext

`cc`
: - `null`, `alias@domain.tld`
  - Als CC gesetzte Email-Adresse

`content_type`
: - `text/html`
  - Inhaltstyp des Artikels

`created_at`
: - `2021-03-22T03:47:59.290Z`
  - Erstellungszeitpunkt des Artikels

`created_by_id`
: - `10`
  - Benutzer ID des Benutzers, der den Artikel erstellt hat

`from`
: - `John Doe <john.doe@example.com>`
  - Von-Feld des Artikel-Erstellers

`id`
: - `16`
  - Interne Artikel ID

`in_reply_to`
: - `null`
  - In-Reply-To Header von E-Mails, falls zutreffend

`internal`
: - `false`, `true`
  - Legt fest, ob ein Artikel intern ist

`message_id`
: - `null`
  - Message ID der E-Mail, falls zutreffend

`origin_by_id`
: - `null`
  - ID des Benutzers oder des ursprünglichen Erstellers, wenn er im Auftrag eines anderen Benutzers erstellt wurde

`preferences`
: - `{}`
  -  Interne Präferenzen, ggf. leer

`reply_to`
: - `null`
  - Enthält den reply to Header, falls vorhanden

`sender_id`
: - `2`
  -  ID des Absendertyps (Kunde, System, Agent)

`subject`
: - `My amazing subject`
  -Artikel-Betreff

`ticket_id`
: - `9`
  - Ticket ID, zu dem der Artikel gehört

`to`
: - `support@example.com`
  - E-Mail-Adresse aus dem TO-Header

`type_id`
: - `1`
  - ID des Artikels Typ (Telefon, E-Mail, Web, ...)

`updated_at`
: - `2021-03-22T03:47:59.290Z`
  - Letztes Update

`updated_by_id`
: - `10`
  - Benutzer, der den Artikel aktualisiert hat


## Benutzer

`active`
: - `true`, `false`
  - Legt fest, ob der Benutzer aktiv ist

`address`
: - `""`, `Unter den Linden 1,\n10178 Berlin`
  - Zeichenkette der Adresse

`city`
: - `""`, `Berlin`
  - Zeichenkette der Stadt

`country`
: - `""`, `Germany`
  - Zeichenkette Land

`created_at`
: - `2021-03-22T12:47:56.460Z`
  - Erstellungsdatum des Benutzers

`created_by_id`
: - `1`
  - ID des Benutzers, der den Benutzer erstellt hat

`department`
: - `""`, `IT`
  - Zeichenkette Abteilung

`email`
: - `""`, `alias@domain.tld`
  - E-Mail-Adresse des Benutzers, falls zutreffend

`fax`
: - `""`, `1234`
  - Fax-Nummer

`firstname`
: - `null`, `John`
  - Vorname des Benutzers

`id`
: - `8`
  - Interne ID des Benutzers

`last_login`
: - `null`, `2021-03-23T12:47:56.460Z`
  - Aktualisiert bei jeder Anmeldung eines Benutzers

`lastname`
: - `null`, `Doe`
  - Nachname des Benutzers

`login`
: - `auto-1234567`, `jdoe`
  - Login-Name, immer gesetzt und eindeutig, kann von der E-Mail abweichen

`mobile`
: - `""`, `1232`
  - Telefonnummer mobil

`note`
: - `""`
  - Notizen sind über Web, Konsole und API verfügbar

`organization`
: - \#\{organization object\}
  - Vollständiger Payload der Organisation, in der der Benutzer Mitglied ist. Schauen Sie sich
    den Abschnitt [Organisation] (#organisation) an für weitere Informationen.

`organization_id`
: - `3`
  - ID der Organisation, in der der Benutzer Mitglied ist

`out_of_office`
: - `false`, `true`
  - Zeigt an, ob der Benutzer die Abwesenheitsfunktion aktiviert hat

`out_of_office_end_at`
: - `null`, `2021-03-26`
  - End-Datum der Abwesenheit

`out_of_office_replacement_id`
: - `null`, `3`
  - ID des Benutzers, der diesen Benutzer während seiner Abwesenheit vertritt

`out_of_office_start_at`
: - `null`, `2021-03-24`
  - Datum des Beginns der Abwesenheit

`permissions`
: - (Array)
  - Array mit allen Berechtigungen des Benutzers

`phone`
: - `""`, `0049 30 1234 5666`
  - Telefonnummer des Benutzers

`preferences`
: - `{}`, \#\{several preference attributes\}
  - Hängt vom Benutzer und der Situation ab, kann `notification_config`,
    `locale` und andere interne Systeminformationen enthalten.

`role_ids`
: - (Array), `[1, 2]`
  - Enthält ein Array mit den dem Benutzer zugewiesenen Rollen IDs.

`street`
: - `""`
  - Straße

`updated_at`
: - `2021-03-25T00:27:52.308Z`
  - Zeitstempel der letzten Aktualisierung

`updated_by_id`
: - `3`
  - ID des Benutzers, der diesen Eintrag aktualisiert hat

`verified`
: - `false`, `true`
  - Legt fest, ob der Benutzer das Konto verifiziert hat

`vip`
: - `false`, `true`
  - Legt fest, ob der Benutzer den Status VIP hat

`web`
: - `""`, `https://zammad.org`
  - Web URL des Benutzers

`zip`
: - `""`, `10123`
  - Postleitzahl


## Organisation

Der folgende Index enthält folgende Informationen: `*_Organisation`


`active`
: - `true`, `false`
  - Legt fest, ob die Organisation aktiv ist

`created_at`
: - `2021-03-22T12:47:54.807Z`
  - Erstelldatum

`created_by`
: - \#\{user object\}
  - Vollständiger Payload des Benutzers, der die Organisation erstellt hat. Werfen Sie einen Blick in
    den Bereich [Benutzer](#benutzer) für weitere Informationen.

`created_by_id`
: - `1`
  - ID des Benutzers, der die Organisation erstellt hat

`domain`
: - `null`, `example.com`
  - Domain der Organisation

`domain_assignment`
: - `false`, `true`
  - Domainbasierte Zuordnung

`id`
: - `1`
  - Organisations-ID

`members`
: - \#\{Array der Benutzer-Objekte\}
  - Array mit dem kompletten Benutzer-Payload der Benutzer, die Mitglied der Organisation sind.
    Schauen Sie sich den Bereich [Benutzer](#benutzer) an für weitere Informationen.

`name`
: - `Fast Lane Hardware Inc.`
  - Name der Organisation

`note`
: - `IT hardware and custom PC builds`
  - Über Web, Konsole und API verfügbar

`shared`
: - `true`, `false`
  - Legt fest, ob es sich um eine teilende Organisation handelt

`updated_at`
: - `2021-03-22T12:47:54.807Z`
  - Zeitpunkt der letzten Aktualisierung

`updated_by`
: - \#\{user object\}
  - Vollständiger Payload des Benutzers, der die Organisation aktualisiert hat. Sehen Sie sich
    den Bereich [Benutzer](#benutzer) an für weitere Informationen.

`updated_by_id`
: - `1`
  - ID des Benutzers, der die Organisation aktualisiert hat

`vip`
: - `true`, `false`
  - Legt fest, ob die Organisation VIP-Status hat.

## Gruppe

Der folgende Index enthält folgende Informationen: `*_group`

`active`
: - `true`, `false`
  - Legt fest, ob die Gruppe aktiv/verfügbar ist

`assignment_timeout`
: - `null`, `30`
  - Zeit in Minuten, die ein Agent inaktiv sein kann, bis er als Eigentümer entfernt wird

`created_at`
: - `2021-03-24T23:55:06.980Z`
  - Zeitpunkt der Erstellung der Gruppe

`created_by_id`
: - `1`
  - ID des Benutzers, der die Gruppe erstellt hat

`email_address`
: - Enthält diese Attribute:
    - active: `true`
    - channel_id: `3`
    - created_at: `2021-03-24T23:54:58.187Z`
    - created_by_id: `3`
    - email: `alias@domain.tld`
    - id: `1`
    - note: `null`
    - realname: `Zammad GmbH`
    - updated_at: `2021-03-24T23:54:58.187Z`
    - updated_by_id: `3`
    - preferences: `null`
  - Enthält alle verfügbaren Informationen über die E-Mail-Adresse der Gruppe

`email_address_id`
: - `3`
  - ID der E-Mail Adresse

`follow_up_assignment`
: - `true`, f`alse
  - Legt fest, ob Besitzer bei Nachfragen zugewiesen werden.

`follow_up_possible`
: - `yes`, `no`
  - Legt fest, ob eine Nachfrage möglich ist, wenn ein Ticket geschlossen ist

`id`
: - `1`
  - ID der Gruppe

`name`
: - `Support`, `IT`
  - Name der Gruppe

`note`
: - `null`
  - Notizen für die Gruppe, verfügbar über Web, Konsole und API

`signature`
: - Enthält diese Attribute:
    - active: `true`
    - body: `<br>  #{user.firstname} #{user.lastname}<br>--<br>Fast Lane Hardware`
    - created_at: 2`021-03-03T14:50:19.775Z`
    - created_by_id: `1`
    - id: `1`
    - name: `default`
    - note: `null`
    - updated_at: `2021-03-03T14:50:19.775Z`
    - updated_by_id: `1`
  - Enthält alle verfügbaren Informationen über die Signatur der Gruppe

`signature_id`
: - `1`
  - ID der Signatur

`updated_at`
: - `2021-03-24T23:55:06.980Z`
  - Zeitpunkt der letzten Aktualisierung der Gruppe

`updated_by_id`
: - `3`
  - ID des Benutzers, der die Gruppe aktualisiert hat

## CTI-Protokoll

Der folgende Index enthält folgende Informationen: `*_cti_log`

`call_id`
: - `6`
  - Eindeutige Anruf ID

`comment`
: - `""`
  - Optionaler Kommentar

`created_at`
: - `2021-03-22T11:48:01.703Z`
  - Erstelldatum des Anrufs

`direction`
: - `in`, `out`
  - Anruf Richtung

`done`
: - `true`, `false`
  - Legt fest, ob der Aufruf in der Benutzeroberfläche als "to do" angezeigt wird

`duration_talking_time`
: - `27`
  - Anrufdauer in Sekunden

`duration_waiting_time`
: - `77`
  - Dauer in Sekunden, die der Anrufer auf die Antwort gewartet hat

`end_at`
: - `2021-03-25T08:49:40.647Z`
  - Zeitpunkt des Anruf-Endes

`from`
: - `491711234567890`
  - Anrufende Nummer

`from_comment`
: - `null`, `John`, `Doe`
  - Name zur anrufenden Nummer anzeigen, falls möglich

`from_pretty`
: - `+49 171 1234567890`
  - "Hübsche" Version von `from`

`id`
: - `8`
  - Interne ID des Eintrags

`initialized_at`
: - `2021-03-25T08:47:56.753Z`
  - Zeitstempel der Aufrufinitialisierung, entspricht normalerweise `created_at`

`preferences`
: - (Array)
  - Enthält interne Informationen, falls erforderlich

`queue`
: - `null`, `491711234567890`
  - Warteschlange, in der der Anruf angenommen wurde

`start_at`
: - `2021-03-25T08:49:13.050Z`
  - Zeitpunkt, zu dem der Anruf angenommen wurde

`state`
: - `hangup`, `voicemail`
  - Letzter Status des Anrufs

`to`
: - `491711234567890`
  - Gewählte Nummer

`to_comment`
: - null, John, Doe
  -  Name zur angerufenen Nummer anzeigen, falls vorhanden

`to_pretty`
: - `491711234567890`
  - "Hübsche" Version von `to`

`updated_at`
: - `2021-03-25T08:49:40.647Z`
  - Letzte Aktualisierung des Eintrags


## Chat-Sitzung

Der folgende Index enthält folgende Informationen: `*_chat_session`

`chat`
: - Enthält diese Attribute:
    - active: `true`
    - block_country: `null`
    - block_ip: `null`
    - created_at: `2021-03-03T14:50:22.607Z`
    - created_by_id: `1`
    - id: `1`
    - max_queue: `5`
    - name: `default`
    - note: `""`
    - preferences: `{}`
    - public: `false`
    - updated_at: `2021-03-03T14:50:22.607Z`
    - updated_by_id: `1`
    - whitelisted_websites: `null`
  - Enthält diverse Einstellungen des zuständigen Chat-Themas

`chat_id`
: - `1`
  - ID des Chat-Themas

`created_at`
: - `2021-03-25T10:26:24.376Z`
  - Zeitpunkt der Chaterstellung

`created_by_id`
: - `null`
  - Benutzer, der den Chat erstellt hat, Platzhalter, derzeit immer null

`id`
: - `1`
  - ID der Chat-Sitzung

`messages`
: - (Array) - Array-Einträge enthalten diese Attribute:
    - chat_session_id: `1`
    - content: `Hello dear customer`
    - created_at: `2021-03-25T10:26:35.977Z`
    - created_by_id: `null`, `3`
    - id: 1 updated_at: `2021-03-25T10:26:35.977Z`
  - Array mit allen Nachrichten des Chats

`name`
: - `null`, `John Doe`
  - Name, den Agent für den Benutzer des Chats vergeben hat, falls vorhanden

`preferences`
: - Enthält dies Attribute:
    - dns_name: `host.domain.tld`
    - geo_ip: `{}`
    - participants: Array, `["47118371175780", "47118371850300"]`
    - remote_ip: `192.168.2.19`
    - url: `https://zammad.com/en/company/contact`
  - Verschiedene interne Metadaten der `session_id`

`session_id`
: - `92f2909631f1ad5ff4d5d1e046952be8`
  - Eindeutige Session-ID

`state`
: - `closed`
  - Aktueller Status der Chatsitzung

`tags`
: - (Array), `["order", "refund"]`
  - Tags, die der Agent auf die Chat-Sitzung anwendet, falls vorhanden

`updated_at`
: - `2021-03-25T10:27:03.341Z`
  - Letzte Aktualisierung

`updated_by_id`
: - `null`, `3`
  - ID des Benutzers, der die Sitzung zuletzt aktualisiert hat, kann `null` sein

`user`
: - \#\{user object\}
  - Vollständiger Payload des Chat-Agenten. Siehe Benutzer für weitere Informationen

`user_id`
: - `3`
  - Benutzer-ID des Chat-Agenten
