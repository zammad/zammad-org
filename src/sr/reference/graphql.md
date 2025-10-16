---
order: 7
title: 'GraphQL API'
---

# GraphQL API

## Увод

In addition to Zammad's [REST API](rest-api/intro), you can fetch,
manipulate and create data via the powerful and open-source [GraphQL
API](https://graphql.org/) too.

This documentation isn't intended to cover everything about GraphQL. It
should give you a basic understanding about how you can fetch and
create/manipulate data to build upon. For a comprehensive guide, have a look
at [GraphQL's documentation](https://graphql.org/learn/).

GraphQL is used by many web services, even big ones. It became some kind of
industry standard because of its efficiency and features. You can precisely
request the data you require which minimizes unnecessary data transfers and
searching the needle in a haystack.

Fetching the GraphQL schema of Zammad (called introspection) allows you to
have an autocomplete feature and logic checks in your client while writing a
request.

## Getting Started

Following the next steps enables you to successfully send a simple request
and receive data from Zammad.

### Clients

To send request and receive responses, you need an API client. If you are
already dealing with APIs, skip this section.  If you are new to the topic,
search for a client which fits your needs. Depending on your operating
system, you may have different options. Some examples for popular clients
with GraphQL support are:

- [Bruno](https://www.usebruno.com/downloads)
- [Insomnia](https://insomnia.rest/download)
- [Postman](https://www.postman.com/downloads/)

### Аутентификација

If not already present, create a [token in the Zammad
profile](/en/documentation/use/manage-profile#token-access) you want to use
as API user. Depending what you want to achieve via API, set the permissions
accordingly.

Make sure to copy it before closing the dialog because you can't view it
again. In case it went wrong, simply create a new token.

### Prepare your Client

Open your API client and set it up.

- Add your token from Zammad as bearer token.
- Create a request and add your Zammad domain with `/graphql` suffix,
  e.g. `https://fastlane.inc/graphql`.
- Fetch Zammad's GraphQL schema from introspection or load it from file.

Click on details to watch a screencast showing the basic steps using Bruno
as client.

::: details
<video controls="controls" src="/public/videos/graphql-client-setup-bruno.mp4" />
:::

### Create a Request

All requests and responses are in JSON format. This means all information
must be encapsulated in brackets and have a hierarchical structure.

Let's have a look at a request to fetch information from Zammad. Such a
request starts with the string `query`, followed by an object you want to
query.

Basic example to fetch users with their first and last name:

```gql :line-numbers
query userName (
  $userId: ID!
  ) {
  user(userId: $userId) {
    firstname
    lastname
  }
}
```

The `$userId` from line 2 defines a variable which is used as an ID. In the
variables section of your client, provide the value for it. In this example,
the variables section looks like this:

```json
{
  "userId": "gid://zammad/User/2"
}
```

The value above is in the global ID format of Zammad's GraphQL
implementation. Depending on which object type you want to deal with,
replace the `User` by another object like `Ticket`, `Organization`, `Group`,
etc. Zammad expects a numeric value as ID.

Starting with line 4 in the code block above is the actual request. This
simple example just fetches the attributes `firstname` and `lastname` from
the user with the ID 2.

Click on details to watch a screencast showing a basic request using a
variable in Bruno.

::: details
<video controls="controls" src="/public/videos/graphql-user-request-variable.mp4" />
:::

To create or change data, replace the `query` by `mutation` in the request
body.

## Примери

The examples use variables for the different object types. Make sure to set
it when using the examples.

::::tabs

==== Ticket

:::tabs

=== Request

<<< @/fixtures/graphql/ticket-req.gql

=== Response

<<< @/fixtures/graphql/ticket-res.json

:::

==== User

:::tabs

=== Request

<<< @/fixtures/graphql/user-req.gql

=== Response

<<< @/fixtures/graphql/user-res.json

:::

==== Organization

:::tabs

=== Request

<<< @/fixtures/graphql/organization-req.gql

=== Response

<<< @/fixtures/graphql/organization-res.json

:::

::::

## Appendix

### Global IDs

:::info

Replace the `{ID}` with a numeric value.

:::

- `gid://zammad/Ticket/{ID}`
- `gid://zammad/User/{ID}`
- `gid://zammad/Organization/{ID}`
