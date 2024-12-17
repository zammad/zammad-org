---
order: 2
title: Artikel
---

# Artikel

## Allgemein

Some attributes of articles might not be straight forward or come with
fairly many options - below list hopefully helps you on this journey.

### `content_type`

Zammad supports `text/html` for HTML formatted text or `text/plain` for
plain text. This allows you to have better formatting options if you need
them.

Zammad web UI usually uses `text/html`.

### `type`

Zammad supports a huge number of article types. Below list may be incomplete
depending on your instance and possibly installed add-ons / custom changes.

If not stated otherwise, all article types below are **communication
articles** and thus affecting SLA calculation in Zammad defaults.

The difference is that communication articles provide the option to reply
automatically. Which actions exactly are available depends on the article
type and e.g. recipient lists.

`email`
: This allows you to create incoming or outgoing email articles.
  However, this highly depends on the chosen `sender`.

`phone` : Indicates phone notes.

`web`
: Usually used by customers only. This type is being used when ever your
  customer uses the web UI to create articles.

`note`
: When ever a communication does not fit (e.g.: internal notes) choose
  note. Zammad also uses this article type as default fall back.

  This is **not a communication article**.

`sms` : This type is being used for Zammad's SMS integration.

`chat`
: This article type is technically a place holder and is only available
  via API.

`fax`
: This article type is technically a place holder and is only available
  via API.

`twitter status` & `twitter direct-message`
: These articles types are used by Zammad's twitter channel. Technically
  you can use these to automatically respond to existing requests via
  twitter.

`facebook feed post` & `facebook feed comment`
: These articles types are used by Zammad's facebook channel. Technically
  you can use these to automatically respond to existing requests via
  facebook.

`telegram personal-message`
: Used by Zammad's Telegram channel. Technically you can use these to
  automatically respond to existing requests via Telegram.

### `internal`

This attribute allows you to set the visibility of your articles. For
internal visible only use `true`, for visibly for your customers as well use
`false`.

::: warning
**Visibility: internal doesn't mean it's silent**

If you set an article to `internal: true` but choose to send an email,
please be aware that said Email is still being sent out!
:::

### `sender`

Indicates which use did create the article. You can choose from:

- `Agent`
- `Customer`
- `System`

::: warning
Depending of above selection, some article types may not be available
or behave different. Please be aware that `System` causes users not
being able to read the bodies (this works similar to Zammads trigger
displaying in tickets).
:::

## List Articles by Ticket

Required permission: `ticket.agent` **or** `ticket.customer`

`GET`-Request sent: `/api/v1/ticket_articles/by_ticket/{ticket id}`

::: details Show response

<<< @/fixtures/rest-api/ticket_articles/by_ticket/get-ticket-id-res.json

:::

## List Specific Article

Required permission: `ticket.agent` **or** `ticket.customer`

`GET`-Request sent: `/api/v1/ticket_articles/{article id}`

::: details Show response

<<< @/fixtures/rest-api/ticket_articles/get-article-id-res.json

:::

## Create

Required permission: `ticket.agent` **or** `ticket.customer`

`POST`-Request sent: `/api/v1/ticket_articles`

::: tip
If you want to create articles on behalf of other users (e.g. for a
phone note), use the `origin_by_id` attribute. `ticket.agent`
permission is mandatory for this.
:::

### Plain Article

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-plain-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-plain-res.json

:::
::::

### Article with Attached Files

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-file-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-file-res.json

:::
::::

### Article with Inline Images

Inline images can be used by providing data URIs in your HTML markup.

:::: details Show request/response

::: tabs key:reqres

=== Request

<<< @/fixtures/rest-api/ticket_articles/post-inline-req.json

=== Response

<<< @/fixtures/rest-api/ticket_articles/post-inline-res.json

:::
::::

## Receive Attachments

Now that you have all those fancy attachments within your tickets, you may
want to download specific ones.

`GET`-Request sent: `/api/v1/ticket_attachment/{ticket id}/{article
id}/{attachment id}`

Response: `{image file}`

::: tip
If you're not sure which articles an article contains, please
[list](#list-articles-by-ticket) affected articles first.
:::
