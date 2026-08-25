---
order: 2
title: Articolo
---

# Articolo

## Generale

Alcuni attributi degli articoli potrebbero non essere immediati o avere
parecchie opzioni.

### `content_type`

Zammad supporta `text/html` per testo formattato HTML o `text/plain` per
testo semplice. Questo.

L'interfaccia web di Zammad solitamente usa `text/html`.

### `type`

Zammad supporta un gran numero di tipi di articolo. L'elenco seguente
potrebbe essere incompleto a seconda.

Se non diversamente specificato, tutti i tipi di articolo seguenti sono
**articoli di comunicazione** e quindi.

La differenza è che gli articoli di comunicazione forniscono l'opzione di
rispondere automaticamente.

`email`
: Questo ti permette di creare articoli email in entrata o in uscita.
  Tuttavia, questo.

`phone`
:
  Indicates phone notes.

`web`
: Solitamente usato solo dai clienti. Questo tipo viene usato ogni volta che il tuo
  cliente.

`note`
: Ogni volta che una comunicazione non si adatta (ad esempio: note interne) scegli
  note.

  Questo **non è un articolo di comunicazione**.

`sms`
:
  This type is being used for Zammad's SMS integration.

`chat`
: Questo tipo di articolo è tecnicamente un segnaposto ed è disponibile solo
  tramite API.

`fax`
: Questo tipo di articolo è tecnicamente un segnaposto ed è disponibile solo
  tramite API.

`twitter status` & `twitter direct-message`
: Questi tipi di articolo sono usati dal canale Twitter di Zammad.

`facebook feed post` & `facebook feed comment`
: Questi tipi di articolo sono usati dal canale Facebook di Zammad.

`telegram personal-message`
: Usato dal canale Telegram di Zammad. Tecnicamente puoi usare.

### `internal`

Questo attributo ti permette di impostare la visibilità dei tuoi
articoli. Per la visibilità interna solo.

::: warning
**Visibilità: interno non significa che sia silenzioso**

Se imposti un articolo su `internal: tru
:::

### `sender`

Indica quale utente ha creato l'articolo. Puoi scegliere tra:

- `Agent`
- `Customer`
- `System`

::: warning
A seconda della selezione sopra, alcuni tipi di articolo potrebbero non essere disponibili
o comportarsi diversamente.
:::

## List articles by ticket

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `GET` inviata: `/api/v1/ticket_articles/by_ticket/{ticket id}`

::: details

<<< @/fixtures/rest-api/ticket_articles/by_ticket/get-ticket-id-res.json

:::

## List specific article

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `GET` inviata: `/api/v1/ticket_articles/{article id}`

::: details

<<< @/fixtures/rest-api/ticket_articles/get-article-id-res.json

:::

## Crea

Permesso richiesto: `ticket.agent` **o** `ticket.customer`

Richiesta `POST` inviata: `/api/v1/ticket_articles`

::: tip
Se vuoi creare articoli per conto di altri utenti (ad esempio per una
nota telefonica), usa il.
:::

### Plain article

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_articles/post-plain-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_articles/post-plain-res.json

:::
::::

### Article with attached files

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_articles/post-file-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_articles/post-file-res.json

:::
::::

### Article with inline images

Le immagini inline possono essere usate fornendo data URI nel tuo markup
HTML.

:::: details

::: tabs key:reqres

=== Richiesta

<<< @/fixtures/rest-api/ticket_articles/post-inline-req.json

=== Risposta

<<< @/fixtures/rest-api/ticket_articles/post-inline-res.json

:::
::::

## Receive attachments

Ora che hai tutti quei fantastici allegati nei tuoi ticket, potresti voler
scaricarli.

Richiesta `GET` inviata: `/api/v1/ticket_attachment/{ticket id}/{article
id}/{attachment id}`

Risposta: `{image file}`

::: tip
Se non sei sicuro di quali articoli contenga un ticket, per favore
[elenca](#list-articles-by-ticket) prima gli articoli interessati.
:::
