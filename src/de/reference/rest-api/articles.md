---
order: 2
title: Artikel
---

# Artikel

## Allgemein

Einige Attribute von Artikeln sind vielleicht nicht ganz einfach oder bieten
ziemlich viele Optionen - die folgende Liste hilft Ihnen hoffentlich auf
diesem Weg.

### `content_type`

Zammad unterstützt `text/html` für HTML-formatierten Text oder `text/plain`
für einfachen Text. Damit haben Sie bessere Formatierungsmöglichkeiten, wenn
Sie diese benötigen.

Zammad web UI verwendet normalerweise `text/html`.

### `type`

Zammad unterstützt eine große Anzahl von Artikeltypen. Die nachfolgende
Liste kann unvollständig sein, abhängig von Ihrer Instanz und eventuell
installierten Add-ons / kundenspezifischen Änderungen.

Wenn nicht anders angegeben, handelt es sich bei allen nachstehenden
Artikelarten um **Kommunikations-Artikel**, die sich auf die SLA-Berechnung
gemäß Ihren Vorgaben auswirken.

Der Unterschied besteht darin, dass Kommunikations-Artikel die Möglichkeit
bieten, automatisch zu antworten. Welche Aktionen genau zur Verfügung
stehen, hängt vom Artikeltyp und z.B. von den Empfängerlisten ab.

`email`
: Damit können Sie eingehende oder ausgehende E-Mail-Artikel erstellen.
  Dies hängt jedoch stark von dem gewählten "Absender" ab.

`phone`
:
  Indicates phone notes.

`web`
: Wird normalerweise nur von Kunden verwendet. Dieser Typ wird immer dann verwendet, wenn Ihr
  Kunde die Web-Benutzeroberfläche verwendet, um Artikel zu erstellen.

`note`
: Wenn eine Kommunikation nicht passt , wählen Sie
  Notiz. Zammad verwendet diesen Artikeltyp auch als Standard-Fallback.

  Dies ist **kein Kommunikationsartikel**.

`sms`
:
  This type is being used for Zammad's SMS integration.

`chat`
: Dieser Artikeltyp ist technisch gesehen ein Platzhalter und steht nur
  über API verfügbar.

`fax`
: Dieser Artikeltyp ist technisch gesehen ein Platzhalter und steht nur
  über API verfügbar.

`twitter status` & `twitter direct-message`
: Diese Artikelarten werden von Zammads Twitter-Kanal verwendet. Technisch gesehen
  können Sie diese verwenden, um automatisch auf bestehende Anfragen über
  Twitter zu antworten.

`facebook feed post` & `facebook feed comment`
: Diese Artikeltypen werden von Zammads Facebook-Kanal verwendet. Technisch gesehen
  können Sie diese verwenden, um automatisch auf bestehende Anfragen über
  Facebook zu antworten.

`telegram personal-message`
: Wird von Zammads Telegram-Kanal verwendet. Technisch können Sie diese verwenden, um
  automatisch auf bestehende Anfragen über Telegram zu antworten.

### `internal`

Mit diesem Attribut können Sie die Sichtbarkeit Ihrer Artikel festlegen. Für
die interne Sichtbarkeit verwenden Sie `true`, für die Sichtbarkeit auch für
Ihre Kunden verwenden Sie `false`.

::: warning
**Sichtbarkeit: Intern bedeutet nicht, dass nichts passiert**

Wenn Sie einen Artikel auf `internal: true` setzen, aber eine E-Mail versenden,
beachten Sie bitte dass diese E-Mail trotzdem verschickt wird!
:::

### `sender`

Zeigt an, wer den Artikel erstellt hat. Sie können wählen zwischen:

- `Agent`
- `Customer`
- `System`

::: warning
Abhängig von der obigen Auswahl sind einige Artikelarten möglicherweise nicht verfügbar
oder verhalten sich anders. Bitte beachten Sie, dass `System` dazu führt, dass Benutzer nicht
in der Lage sind, die Artikel zu lesen (ähnlich wie Zammads Trigger,
die in Tickets angezeigt werden).
:::

## Artikel je Ticket auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_articles/by_ticket/{ticket id}`

::: details

<<< @/fixtures/rest-api/ticket_articles/by_ticket/get-ticket-id-res.json

:::

## Spezifische Artikel auflisten

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`GET`-Anfrage gesendet: `/api/v1/ticket_articles/{article id}`

::: details

<<< @/fixtures/rest-api/ticket_articles/get-article-id-res.json

:::

## Erstellen

Erforderliche Berechtigung: `ticket.agent` **oder** `ticket.customer`

`POST`-Anfrage gesendet: `/api/v1/ticket_articles`

::: tip
Wenn Sie Artikel im Namen anderer Benutzer erstellen wollen (z.B. für eine
Telefonnotiz), verwenden Sie das Attribut `origin_by_id`. Die Berechtigung
`ticket.agent` ist hierfür zwingend erforderlich.
:::

### Einfacher Artikel

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-plain-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-plain-res.json

:::
::::

### Artikel mit angehängten Dateien

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-file-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-file-res.json

:::
::::

### Artikel mit Inline-Bildern

Inline-Bilder können durch Angabe von Daten-URIs in Ihrem HTML-Markup
verwendet werden.

:::: details

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-inline-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-inline-res.json

:::
::::

## Anhänge empfangen

Jetzt, wo Sie all diese schicken Anhänge in Ihren Tickets haben, möchten Sie
vielleicht bestimmte Anhänge herunterladen.

`GET`-Anfrage gesendet: `/api/v1/ticket_attachment/{ticket id}/{article
id}/{attachment id}`

Response: `{image file}`

::: tip
Wenn Sie sich nicht sicher sind, welche Artikel ein Ticket enthält,
[listen Sie die Artikel](#artikel-per-ticket-auflisten) zuerst auf.
:::
