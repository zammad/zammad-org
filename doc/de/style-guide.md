# Style and Content Guide

This guide provides an overview of the content that should be included in
the Zammad documentation, as well as formatting guidelines to ensure clarity
and readability.

If you have questions, feel free to ask in our community. If you want to
contribute, have a look on our contribution page to get started.

## Audience Assumptions and Content

The documentation is written assuming our **users** have a basic
understanding of web browser usage and common software design concepts.

The **Zammad administrator** additionally should have a basic understanding
of the workflows and communication process in its company.

For self-hosted instances, **system administrators** should also be familiar
with Linux system administration basics.

## Stil

American English is the original source language for the documentation.
Translations are made via Weblate, see contribution section for more
information.

* Use short and clear sentences, prioritizing information over complexity
* Capitalize all words except minor ones in the page title and sections
(see [title case](https://en.wikipedia.org/wiki/Title_case))
* Line length of 80 characters in the source file should not be exceeded if
possible
* Proper breadcrumb separation for paths and locations with `>`
* Use code highlighting to emphasize programming snippets
* Include screenshots when necessary
* Provide step-by-step instructions with clear explanations
* Use examples or scenarios to illustrate concepts
* Include relevant images or diagrams when necessary
* Abbreviations should be explained the first time they are used or included
in the glossary and linked to
* If in doubt, align it to the existing documentation


## Formatierung

| Type in Zammad | Highlighting                  | Markdown syntax                 |
|----------------|-------------------------------|---------------------------------|
| Buttons        | ``Sign in``                   | \`\`Sign in\`\`                 |
| Fields         | **Name**                      | \*\*Name\*\*                    |
| Location/path  | *Settings > Channels > Email* | \*Settings > Channels > Email\* |


## Heading Structure

Every documentation file should include a title on top level (#). Lower
levels should contain at least two sections. If only one section exists,
consider merging it with the higher-level content.

Beispiel:

`# Title of page`

`## Section 1`

`### Section 1.1`

`### Section 1.2`

`## Section 2`

