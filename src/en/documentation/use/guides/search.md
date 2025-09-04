---
order: 2
title: Search
---

# Search

## Basics

If you search for tickets, user and organizations, you can use the search. It is located in the top left corner in the
primary navigation bar. Either select it via mouse or use the keyboard shortcut [[s]]. Zammad returns all fitting items
for which you have at least view or read permissions.

![Screenshot shows search results in navigation bar](/screenshots/cypress/usage-guide-search.cy.js/search-sidebar.png)

The search covers basically all information which is stored in Zammad and which got
[indexed by Elasticsearch](/en/reference/es-indexed-attributes), like:

- Message subject and text
- Names and email addresses
- Text in file attachments
- User and organizations details (like notes, names, etc.)

When the search field is active, you can see your last viewed items as well as your recent search queries.

After entering a search term, you immediately see a preview of the search results. These results are separated by type
to make sure you won't get lost in the results. Selecting one of those results will open a new navigation tab (if not
already opened) with the item.

If you press [[enter]] or click on `detailed search`, Zammad displays a page with search results. There you can narrow
down your search by selecting a specific object type (e.g. customer) in the tab bar below the search bar.

![Screenshot shows detailed search](/screenshots/cypress/usage-guide-search.cy.js/search-detail.png)

If you are still facing many results, try to narrow down your search by adding additional terms or use the sorting of
the columns. To sort the results based on the column's values, click on a column header. The sorting is indicated by an
arrow. Click on the column again to change the sorting from ascending to descending and back. If you still can't find
what you are looking for, have a look at the next section where you can learn how to search for specific attributes like
creation date or the ticket owner's email address.

## Advanced

You can narrow down your search results to specific attributes, even in the search field in the navigation bar. Read on
for some examples and explanations. For a more detailed list of available attributes, please take a look at the
[indexed attributes by Elasticsearch](/en/reference/es-indexed-attributes).

### Syntax

Search for a ticket of a specific customer:

```plain
customer.firstname: John
```

or:

```plain
customer.lastname: Doe
```

### Combining Search Phrases

You can combine search phrases by using `AND`, `OR` and `TO` and even separate them with `()`. If you want to exclude
search results, you can use negation `!`.

| Search phrase                                                                               | Description                                                                                                       |
|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| state.name:(closed OR open) AND (priority.name:"2 normal" OR tags:feedback)                 | Show every ticket that state is either closed or open and has priority normal or the tag feedback.                |
| state.name:(closed OR open) AND (priority.name:"2 normal" OR tags:feedback) AND !(_Zammad_) | This gets the same result as above, expect that we don't want the ticket to contain anything matching to "Zammad" |
| owner.email:<bob@example.net> AND state.name:(open OR new)                                  | Show Tickets from <bob@example.net> that are either open or new                                                   |
| state.name:pending\* AND article_count:\[1 TO 5\]                                           | Show everything with any pending state and an article count of 1 to 5.                                            |

### Additional Examples

| Attribute     | possible Values                       | Example                                                                                        | Description                                                                                                                                                                                                                                          |
|---------------|---------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| number        | 1118566                               | number:1118566 number:11185\*                                                                  | Search for a ticket number                                                                                                                                                                                                                            |
| title         | some title                            | title:"some title" title:Printer title: "some ti\*"                                            | If you need to use spacings in the search phrase, use quotes. Zammad will do a AND-Search over the given words. You can also use a single keyword without quotation.                                                                                 |
| created_at    | 2018-11-18                            | created_at:2018-11-18 created_at:\[2018-11-15 TO 2018-11-18\] created_at:\>now-1h              | You can either use a simple date, a date-range or \>now-xh. Please note that the date format needs to be YYYY-MM-DD                                                                                                                                  |
| state.name    | new open closed                       | state.name: new state.name:new OR open                                                         | You can filter for specific ticket states (and even combine them with an OR). Please note that you need to use the english namings for states, unless you have custom ticket states defined in your instance.                                        |
| article_count | 5 \[5 TO 10\] \[5 TO \*\] \[\* TO 5\] | article_count:5 article_count: \[5 TO 10\] article_count:\[5 TO \*\] article_count:\[\* TO 5\] | You can search for Tickets with a specific number of articles (you can even search for everything with 5 or more articles or even up to 5 articles, if needed).                                                                                      |
| article.from  | \*bob\*                               | article.from:\*bob\*                                                                           | Show all tickets that contain articles from "Bob"                                                                                                                                                                                                    |
| article.body  | heat heat~ /joh?n(ath\[oa\]n)/        | article.body:heat article.body:heat~ articlebody:/joh?n(ath\[oa\]n)/                           | First example shows every ticket containing the word "heat" - you can also use the fuzzy operator "~" to search for similar words like e.g. like "head". Zammad will also allow you to use regular expressions, where ever the attributes allows it. |
