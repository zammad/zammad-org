---
order: 2
---

# Style and Content Guide

This guide provides an overview of the content that should be included in the Zammad documentation, as well as
formatting and style guidelines to ensure clarity and readability.

The first sections are about general information and rules. A [section with examples](#examples) follows at the end.

If you have questions, feel free to ask in our community. If you want to contribute, you may also want to have a look at
our [contribution page](contribute) or [ask in an issue](https://github.com/zammad/zammad-org/issues){target=_blank}
to get started.

## Audience Assumptions

The documentation is written assuming that **users** have a basic understanding of web browser usage and common software
design concepts. This means for example that features are described in detail, but not on a level of how to open a
dropdown field.

The **Zammad administrator** additionally should have a basic technical understanding and should also know the workflows
and communication processes in its company.

For self-hosted instances, **system administrators** should also be familiar with Linux system administration basics.
Access to the host system (e.g. via SSH) and administrative permissions are taken for granted for system administrators.

## Content

The documentation aims to include information about:

- How to use Zammad
- How to manage Zammad as an admin (e.g. setting it up after installation, adjust settings, configure features)
- Different ways how to install Zammad
- Additional guides if (host) system configuration and/or configuration of third party systems is needed.

Regarding the **level of detail**, the [audience assumptions](#audience-assumptions) should be considered. Because one
of the goals of Zammad is to be intuitive and user friendly, there is no need to describe each click in detail. However,
important steps should be included. The readers should achieve their goals as quickly and easily as possible without
having to read a lot.

Due to the fact that a documentation can't cover everything (otherwise it would be on a code-like detail level), the
relevance has to be considered. If parts with a common use case are missing, it should be intended to include them in
the documentation.

## Style and Rules

The next sections cover general things to consider writing the documentation. After these you can find a section
with some [examples](#examples) about how to format and structure the content.

### Basics

- The documentation is written in the Markdown markup language. The source files have the extension `.md`.
- The system uses [Vitepress](https://vitepress.dev/){target=_blank} to build the website.
- The language of the source files is American English.
- The translation of the documentation is done via Weblate, see [translation section](contribute#translation) in the
  contribute page for more details.

### Style

- Use short and clear sentences and prioritize information over complexity.
- Page title and headings: capitalize the first letter of all words except minor words
  (see [title case](https://en.wikipedia.org/wiki/Title_case){target=_blank}).
- Use breadcrumb separation for paths and locations with `>` as separator and format path in italics, e.g.
  _Settings > Channels > Chat_.
- Use code highlighting to emphasize programming snippets.
- Use [info, tip, warning and danger boxes](#custom-boxes) when needed.
- Use a [detail box](#custom-boxes) when content may not be relevant for all the readers or may break the reading
  flow otherwise.
- If available, use icons for important UI buttons like ::+:: and ::x:: (see [examples](#text-and-ui) below).
- Include screenshots when necessary. The preferred way of adding screenshots of Zammad is by creating them
  automatically
  [using Cypress](https://github.com/zammad/zammad-org?tab=readme-ov-file#automatic-screenshots-cypress){target=_blank}.
  This supports the maintainability of the documentation because the screenshots are re-generated each time the build
  pipeline runs. Please note that the usage of Cypress is not part of this documentation.
- Provide step-by-step instructions with clear explanations.
- Use examples or scenarios to illustrate concepts.
- Include relevant images or diagrams when necessary.
- Spell abbreviations full the first time they are used or include them in the glossary and link to them. Broadly used
  and common abbreviations may be excluded from this rule.
- If in doubt, align it to the existing documentation.

### Conventions

The documentation stack includes automated checks (linting) to ensure compliance with the style guide and common rules
for Markdown files. To check if your changes are compliant, run `pnpm lint` to perform the check. Some of the
recognized problems can be even fixed automatically by running `pnpm lint:fix`. Make sure to run the check before
committing your changes. Otherwise the build of the documentation will fail.

The used linting has some built in rules which you can find
[here](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#rules--aliases){target=_blank}. Some
important rules and customized ones are mentioned below.

- Line length of 120 characters in the source file may not be exceeded for standard text. Make sure to use a line break
  before reaching this limit. A visual indicator in your editor may be helpful. This does not apply for special content
  like paths to screenshots and long links.
- Multiple consecutive empty lines are not allowed.
- Empty lines before and after headings and fenced code blocks are required.
- Use `` ``` `` (backticks) for fenced code blocks, followed by a mandatory language tag, e.g. `ruby` or
  `sh`. If no language is applicable, use `plain`.
- Use `-` for bullet point lists (unordered lists) like this one.
- To easily distinguish between **bold** and _italics_, use `_` around the text for italics and `**` for bold (e.g.
  `_italic_` vs. `**bold**`).
- Multiple headings with the same content are not allowed.
- Each document must have exactly one `h1` heading as title.
- Resolution of manual full page screenshots for _mobile view_ is 400x867 pixels.
- Resolution of manual full page screenshots for _desktop view_ is 1920x1080 pixels.

### Examples

#### Text and UI

| Type                      | Highlighting in documentation | Markdown syntax                 |
|-------------------------- |-------------------------------|---------------------------------|
| Labeled buttons           | `Sign in`                     | \`Sign in\`                     |
| Fields and UI elements    | **Name**                      | \*\*Name\*\*                    |
| Locations/paths           | _Settings > Channels > Email_ | \_Settings > Channels > Email\_ |
| Keyboard shortcuts        | [[x]]                         | \[\[x\]\]                       |
| Add button                | ::+::                         | \:\:\+\:\:                      |
| Delete button             | ::x::                         | \:\:x\:\:                       |
| Action menu               | ::a::                         | \:\:a\:\:                       |

#### Heading Structure

Every documentation file must include exactly one title on top level (like `# Title`). Levels below should always
contain at least two sections. If only one section exists, consider merging it with the higher-level content.

Example:

`# Title of page`

`## Section 1`

`### Section 1.1`

`### Section 1.2`

`## Section 2`

#### Section with Badge <Badge type="warning" text="custom text" />

This section title uses a badge of the type "warning". There are other badges available, see
<https://vitepress.dev/reference/default-theme-badge#usage>.

::: details Usage

```md
Text/title to add a badge <Badge type="warning" text="custom text" />
```

:::

#### Custom boxes

::::: info
This is an info box.

:::: details Usage

```md
::: info
This is an info box.
:::
```

::::
:::::

::::: tip
This is a tip.

:::: details Usage

```md
::: tip
This is a tip box.
:::
```

::::
:::::

::::: warning
This is a warning.

:::: details Usage

```md
::: warning
This is a warning box.
:::
```

::::
:::::

::::: danger
This is a dangerous warning.

:::: details Usage

```md
::: warning
This is a dangerous warning.
:::
```

::::
:::::

:::: details
This is a details block.

Usage:

```md

::: details Box title shown in collapsed state
This is the content shown in the expanded state.
:::

```

::::

#### Definition lists

First Term <Badge type="info" text="tag1" />
: This is the definition of the first term.

Second Term <Badge type="info" text="tag1" /> <Badge type="tip" text="tag1" />
: This is one definition of the second term.
: This is another definition of the second term.

::: details Usage

```md
First Term <Badge type="info" text="tag1" />
: This is the definition of the first term
  with another line.
```

:::
