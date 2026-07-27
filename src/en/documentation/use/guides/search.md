---
order: 2
title: Search
---

# Search

In Zammad, you can search for basically all available information like:

- Message subject and text
- Names and email addresses
- Text in file attachments
- User and organizations details (like notes, names, etc.)

Depending on what you are searching for and the amount of data in your Zammad instance, you can search in different
ways. Read on to learn about the search basics, followed by the detailed search and the usage of Elasticsearch syntax.

## Basic search

The search is located in the top left corner of the primary navigation. Either select it via mouse or use the
keyboard shortcut [[s]]. After activation, you can see the tickets which got recently closed from your taskbar as well
as your recent search queries. To search, simply type a term. The search then displays all matching items for which you
have at least view or read permissions, grouped by type like users and tickets. Selecting one of those results opens the
item as tab in the taskbar.

![Screenshot shows search results in primary navigation](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

If you press [[enter]] or click on `detailed search`, Zammad opens the detailed search as a tab in the primary
navigation. There you can narrow down your search by selecting a specific object type (e.g. organization), use advanced
filters or even use Elasticsearch syntax. Read on for more information.

## Detailed search

Sometimes, a simple search term may not give you the results you are looking for. Zammad provides different options to
narrow down the search in the detailed search page.

![Screenshot shows detailed search](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Sort the results

To sort the results based on the column's values, click on a column header. The sorting is indicated by an
arrow. Click on the column again to change the sorting from ascending to descending and back.

### Limit search to object type

Limit the search to an object type by using the **Search entity** tab selector below the search field (e.g. user or
ticket). This limits the search to the selected object type and its related data. For example, when you select
**Ticket**, the search also returns tickets where the owner or customer matches the search term.

### Use advanced filters
<!--Screenshot skipped for now. Will be added after more attributes are available-->
In comparison to the search field, you can filter the search results based on specific attributes and their values.
To do so, click on the `Advanced filters` button on the right side, which opens an area where you can specify additional
conditions based on specific attributes and their values. Choose an attribute and enter or select a value which the
search results have to match. Each attribute is available only once. When using more than one filter, be aware that
they all have to be met because they are logically connected by an AND operator. This also applies to the search term
in the main search field.

Remove a single filter by clicking the ::x:: next to the value field. To remove all filters, click the `x` in the
main search bar at the top next to the `x filter(s)` label.

In case you want to store or share your filter, you can do so by copying the URL. It includes the complete filter. Be
aware that the search results may be different for other users due to divergent permissions.

If you still haven't found what you are looking for, you can benefit from the search being powered by Elasticsearch.
You can find some examples in the next section.

## Using Elasticsearch syntax

This topic has its own section because it is an advanced topic for power users. By using Elasticsearch syntax, you can
exactly filter your data for specific attribute values. Basically, all indexed attributes are supported. Read on to find
examples how to use it or head over to the
[indexed attributes by Elasticsearch page](/en/reference/es-indexed-attributes) where you can find a list with
additional attributes.

### Important information

- Make sure to select the relevant object in the **Search entity** switcher. For example `customer.lastname` is
  available for tickets, but not for users.
- When combining an Elasticsearch query with advanced filters, be aware that all of the advanced filter conditions and
  the search syntax are logically connected by AND, so only results which match all of the advanced filter conditions
  and your search term will be displayed.
- To provide values containing a space, wrap them in `"`, e.g. `priority.name:"2 normal"`.

### Logic operators and ranges

You can combine conditions by using `AND` & `OR` as logical operators. Use `TO` to specify ranges for values with an
order (e.g. integer or date). Include a limit of the specified range by using square brackets. Exclude it by using curly
brackets. You can even combine those brackets, e.g. to include the lower limit and to exclude the upper limit. Nested
terms can be achieved by separating them with parentheses `()`.

`AND` & `OR` with parentheses:

```plain
owner.lastname:brooks AND tags:(internal OR onboarding)
```

`TO` with asterisk wildcard:

```plain
state.name:open AND article_count: [5 TO *]
```

`TO` with excluding one limit of a range:

```plain
article.created_at:[2025-03-21 TO 2026-05-19}
```

### Fuzzy search

If you are not sure about the exact spelling of a value, use the tilde (`~`) as suffix to perform a fuzzy search.

```plain
owner.firstname:lawren~
```

### Negating search

If you want to exclude specified values, you can use negation `!`. To negate more than one term, use parentheses for all
of them.

Exclude owner with last name "brooks":

```plain
!owner.lastname:brooks
```

Exclude multiple conditions:

```plain
owner.lastname:brooks AND !(tags:internal OR tags:onboarding)
```

### Regex

You can even use regex to search. Wrap the regex term in `/`.

```plain
customer.lastname:/(bra?.n|doe)/
```
