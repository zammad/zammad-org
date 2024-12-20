---
order: 1
title: Einführung
---

# Einführung

Zammad provides a powerful REST-API[^1] which allows all operations that are
available via UI as well.

This page gives you a first impression for things that generally count for
all endpoints and how to adapt.

## API clients

There are API clients available. Please note that these clients may not
provide access to all available endpoints listed here.

- [Ruby Client](https://github.com/zammad/zammad-api-client-ruby)
  *(official)*
- [PHP Client](https://github.com/zammad/zammad-api-client-php)
  *(official)*
- [Python Client](https://pypi.org/project/zammad-py/) *(Third-Party)*
- [.NET Client](https://github.com/Asesjix/Zammad-Client)  *(third-Party)*
- [Android API-Client](https://github.com/KirkBushman/zammad-android)
  *(third-Party)*
- [Go Client](https://github.com/AlessandroSechi/zammad-go)  *(third-Party;
  API client only, no "ready to use" app)*

## Authentication

Zammad supports three different authentication methods for its API.

### HTTP Basic Authentication (username/password)

The username / password must be provided as HTTP header in the HTTP call.
This authentication method can be disabled and may not be available in your
system.

```sh
$ curl -u {username}:{password} https://{fqdn}/{endpoint}
```

:::warning
We strongly suggest against using basic authentication. Use access
tokens when ever possible!
:::

### HTTP Token Authentication (access token)

The access token must be provided as HTTP header in the HTTP call.  Each
user can create several access tokens in their user preferences.  This
authentication method can be disabled and may not be available in your
system.

```sh
$ curl -H "Authorization: Token token={your_token}" https://{fqdn}/{endpoint}
```

### OAuth2 (token access)
The token must be provided as HTTP header in your calls.  This allows 3rd
party applications to authenticate against Zammad.

```sh
$ curl -H "Authorization: Bearer {your_token}" https://{fqdn}/{endpoint}
```

## Endpoints and Example Data

For simplicity we'll not provide specific commands on the next pages, but
instead tell the possible call method (e.g. `GET`) and the endpoint to use
(e.g. `/api/v1/users`). In case Zammad expects information within these
endpoint urls, we'll put them into curly braces like so:
`/api/v1/users/{user id}`

The response format will be a complete JSON response from a default Zammad
instance. Please keep in mind that you may see more fields or general
information in case you added objects or other information.

## Content Type

Zammad returns JSON payloads whenever you retrieve data. If you're going to
provide data, no matter of the general request type, don't forget to provide
the content type `application/json` as well.

## Response Payloads (Expand)

Zammad always returns information including hints to all relations. If you
need more information than that (because IDs may not be enough) you can also
extend your endpoint calls with `?expand=true`.

This switch will provide even more information - at least named relations on
top of the ID ones. Below you can find two examples, one for ticket and one
for user:

:::: details
:::tabs

=== User payload

<<< @/fixtures/rest-api/users/get-id-res.json

=== Ticket payload

<<< @/fixtures/rest-api/tickets/get-id-res.json

:::
::::

:::tip
Please note that Core Workflows may restrict access to attributes or
values.
:::

## Pagination

As Zammad limits the number of returned objects for performance reasons, you
may have to use pagination at some points.

:::info
**Number of returned objects:** Zammad has hard limits for the
maximum returned objects. You can't raise these limits.

**Number of total to return objects:** Zammad does not provide a
total count of objects available for your query. This forces you to
cycle through the pages until Zammad no longer returns further
objects.
:::

In order to use pagination you'll need two get options: `per_page` and
`page`. Combine them to receive 5 results from the first result page:
`?page=1&per_page=5` - increase page count to get more results.

## Sorting Search Results

Zammad allows you to sort your search results by field if needed.

### `sort_by`
Append `?sort_by={row name}` to your query to sort by a specific row that
appears in the search result.

### `order_by`
Append `?order_by={direction}` to your query to switch in between ascending
and descending order.

Directions are: `asc` and `desc`.

:::tip
Usually you'll want to combine both parameters in your searches -
e.g.: `?query={search string}&sort_by={row name}&order_by={direction}`
:::

## Actions On Behalf of Other Users

**Requirement:** the user used for running the query on behalf requires
`admin.user` permission.

Running API queries on behalf of other users allows you to e.g. create
tickets by a different user.

To do so, add a new HTTP header named `From` to your request. The value of
this header can be one of the following:

- user ID
- user login
- user email

`From` is available for all endpoints.

## Encoding

The API expects UTF-8 encoding. Keep in mind that especially when using URLs
with get options (e.g. `?query=this`) you may need to encode your URL
accordingly.

If you want to learn more about URL encoding, [this Wikipedia
article](https://en.wikipedia.org/wiki/Percent-encoding) may be of help

[^1]: **Re**presentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**nterface)
