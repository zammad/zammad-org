---
order: 1
title: Introduction
---

# Introduction

Zammad provides a powerful REST-API[^1] which
allows all operations that are available via UI as well.

This page gives you a first impression for things that generally count
for all endpoints and how to adapt.

## API clients

There are API clients available. Please note that these clients may not
provide access to all available endpoints listed here.

- [Ruby Client](https://github.com/zammad/zammad-api-client-ruby){target=_blank}
  _(official)_
- [PHP Client](https://github.com/zammad/zammad-api-client-php){target=_blank}
  _(official)_
- [Python Client](https://pypi.org/project/zammad-py/){target=_blank} _(Third-Party)_
- [.NET Client](https://github.com/Asesjix/Zammad-Client){target=_blank}
  _(third-Party)_
- [Android API-Client](https://github.com/KirkBushman/zammad-android){target=_blank}
  _(third-Party)_
- [Go Client](https://github.com/AlessandroSechi/zammad-go){target=_blank}
  _(third-Party; API client only, no "ready to use" app)_

## Authentication

Zammad supports three different authentication methods for its API.

### HTTP Basic Authentication (username/password)

The username / password must be provided as HTTP header in the HTTP
call.
This authentication method can be disabled and may not be available in
your system.

```sh
curl -u {username}:{password} https://{fqdn}/{endpoint}
```

:::warning
We strongly suggest against using basic authentication. Use access
tokens when ever possible!
:::

### HTTP Token Authentication (access token)

The access token must be provided as HTTP header in the HTTP call.
Each user can create several access tokens in their user preferences.
This authentication method can be disabled and may not be available in
your system.

```sh
curl -H "Authorization: Token token={your_token}" https://{fqdn}/{endpoint}
```

### OAuth2 (token access)

The token must be provided as HTTP header in your calls.
This allows 3rd party applications to authenticate against Zammad.

```sh
curl -H "Authorization: Bearer {your_token}" https://{fqdn}/{endpoint}
```

## Endpoints and Example Data

For simplicity we'll not provide specific commands on the next pages,
but instead tell the possible call method (e.g. `GET`) and the endpoint
to use (e.g. `/api/v1/users`). In case Zammad expects information within
these endpoint urls, we'll put them into curly braces like so:
`/api/v1/users/{user id}`

The response format will be a complete JSON response from a default
Zammad instance. Please keep in mind that you may see more fields or
general information in case you added objects or other information.

## Content Type

Zammad returns JSON payloads whenever you retrieve data. If you're going
to provide data, no matter of the general request type, don't forget to
provide the content type `application/json` as well.

## Response Payloads (Expand)

Zammad always returns information including hints to all relations. If
you need more information than that (because IDs may not be enough) you
can also extend your endpoint calls with `?expand=true`.

This switch will provide even more information - at least named
relations on top of the ID ones. Below you can find two examples, one for
ticket and one for user:

**User payload:**

:::: details
:::tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-user-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-user-expand-false-res.json

:::
::::

**Ticket payload:**

:::: details
:::tabs

=== expand=true

<<< @/fixtures/rest-api/intro/get-ticket-expand-true-res.json

=== expand=false

<<< @/fixtures/rest-api/intro/get-ticket-expand-false-res.json

:::
::::

:::tip
Please note that Core Workflows may restrict access to attributes or
values.
:::

## Pagination

As Zammad limits the number of returned objects for performance reasons,
you may have to use pagination at some points.

:::info
**Number of returned objects:** Zammad has hard limits for the
maximum returned objects. You can't raise these limits.

**Number of total to return objects:** Zammad does not provide a total count of
objects available for your query, unless you explicitly request it. To include
the amount of search results, use the `with_total_count` or `only_total_count`
parameter.
:::

In order to use pagination you'll need two get options: `per_page` and
`page`. Combine them to receive 5 results from the first result
page: `?page=1&per_page=5` - increase page count to get more results.

## Search via API

### Endpoint Search

Some endpoints support a search query. These are:

- `Groups <group>`
- `Organizations <organization>`
- `Roles <role>`
- `Tickets <ticket>`
- `Users <user>`

The following endpoints support a search query as well, but they are not
explicitly covered in this documentation:

- Chat Sessions
- Knowledge base
- Macros
- Overview
- Templates
- Text module

#### Search Example

`GET`-Request sent: `/api/v1/tickets/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-basic-search-res.json
:::

#### Expand Parameter

If you want to have additional related information, you can use the
`expand` parameter. Using it resolves the IDs and outputs values/names
in addition.

`GET`-Request sent: `/api/v1/tickets/search?query=welcome&expand=true`

::: details
<<< @/fixtures/rest-api/intro/get-expand-search-res.json
:::

#### Full Parameter

You can even extend the response by using the `full` parameter. Be aware
that this response can be huge. It outputs all assets including related
attributes and a `total_count` of search results as well.

`GET`-Request sent: `/api/v1/tickets/search?query=welcome&full=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-res.json
:::

#### With Total Count Parameter

Using this parameter will additionally output the amount of search results.
It can be combined with `full` and `expand`.

`GET`-Request sent: `/api/v1/tickets/search?query=welcome&full=true&with_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-full-search-with-total-count-res.json
:::

#### Only Total Count Parameter

Using this `only_total_count` parameter will output only the amount of
search results.

`GET`-Request sent:
`/api/v1/tickets/search?query=welcome&only_total_count=true`

::: details
<<< @/fixtures/rest-api/intro/get-total-count-res.json
:::

### Global Search

If you need to search not only in a specific object type, you can do so
by using the global search without specifying an object. The response
may include users, tickets, organizations, knowledge base articles and
answers and chats, depending on your system and content. This global
search behaves like the search in Zammad's UI in the left task bar. The
available parameters are different to the ones for the endpoint search.

`GET`-Request sent: `/api/v1/search?query=welcome`

::: details
<<< @/fixtures/rest-api/intro/get-global-search-res.json
:::

### Condition Based Search

You can even use conditions like for triggers and schedulers to search
via API. If you don't want to build such conditions manually, you can
find a hint below how to quickly build a condition structure via UI and
fetch it for your API request.

So, how do I build such a condition based request?

- In Zammad, go to the admin interface and create a condition, e.g. by
  creating a new overview or trigger. It can be inactive so you won't
  have any unwanted actions or changes.
- Go to the `Rails console </admin/console>`, either by using `rails c`
  / `zammad run rails c` or adding the prefix `rails r` /
  `zammad run rails r` in front of the commands below, depending on your
  setup.
- Search for the created condition, adjust the following examples to
  your needs:

``` ruby
puts Overview.find_by(name: 'My test overview').attributes.slice('condition').to_json
```

``` ruby
puts Trigger.find_by(name: 'My new test trigger').attributes.slice('condition').to_json
```

This leads to an output like the following:

::: details
<<< @/fixtures/rest-api/intro/condition-based-search.json
:::

Use this as payload in your `POST`-Request in an endpoint search. The
response includes the same objects as the trigger or overview you
created.

## Sorting Search Results

Zammad allows you to sort your search results by field if needed.

### `sort_by`

Append `?sort_by={row name}` to your query to sort by a specific row
that appears in the search result.

### `order_by`

Append `?order_by={direction}` to your query to switch in between
ascending and descending order.

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

To do so, add a new HTTP header named `From` to your request. The value
of this header can be one of the following:

- user ID
- user login
- user email

`From` is available for all endpoints.

## Encoding

The API expects UTF-8 encoding. Keep in mind that especially when using
URLs with get options (e.g. `?query=this`) you may need to encode your
URL accordingly.

If you want to learn more about URL encoding, [this Wikipedia
article](https://en.wikipedia.org/wiki/Percent-encoding) may be of help

[^1]: **Re**presentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**nterface)
