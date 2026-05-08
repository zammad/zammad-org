---
title: Editor
order: 3
---

# Editor

The Zammad editor provides a rich text editing experience for creating articles. It should be self-explanatory and
simple to use. Because of the importance of this central element in Zammad, this page covers some features which may not
be visible at the first glance.

![Screenshot shows Zammad's editor](/screenshots/cypress/documentation/use/guide-editor.cy.js/editor-overview.png)

## Special Functions

Zammad's editor includes some smart features. You can find them on the left side of the toolbar in the editor. Because
they are already described somewhere else, we only refer to these places here to avoid duplicate content.

- [AI assistant text tools](ai#ai-assistant-text-tools)
- [Mention users](../advanced-features#mention-a-colleague)
- [Insert text modules](../advanced-features#text-modules)
- [Insert knowledge base articles](../advanced-features#insert-knowledge-base-article)

## Pasting Complex Content

When pasting content from other sources, especially documents containing tables, complex formatting or images, be aware
that the appearance in Zammad might differ. The editor attempts to preserve your formatting if possible, but
inconsistencies can occur. If you face such a situation, try to copy/paste the content one by one or paste plain text
and apply the formatting in the editor (see [formatting section](#apply-formatting) below).

## Paragraphs

To separate paragraphs in the editor, use the [[enter]] key **once**. This gets rendered as paragraphs either
with an empty line or without, depending on the recipient's used software. If you add an additional empty line, this can
get rendered as two empty lines on client side.

## Cite Text

You may want to quote text of your customer to exactly refer your answer to and your customer doesn't lose
track in long conversations. To use this feature, simply select the text you want to cite and click on the `reply` or
`forward` button next to the article. If you already inserted text, it gets preserved and the selected text gets
inserted additionally. This means you can repeat this to cite different sections without losing your written text.

## Apply Formatting

You can format text in the editor in different ways:

- Use the integrated toolbar
- Use keyboard shortcuts
- Use [Markdown](https://www.markdownguide.org) syntax

The editor **toolbar** includes buttons for common formatting tasks. Hovering over each button will display a tooltip
explaining its function. As an alternative you can use **keyboard shortcuts** (see next two sections). Either activate
the formatting in advance or select the text after writing and use the formatting you want to apply.

### General Keyboard Shortcuts

The editor also supports keyboard shortcuts to streamline your workflow. These shortcuts are common across many text
processing tools. Important shortcuts are:

 Shortcut/command              | Formatting
-------------------------------|---------------
[[ctrl]] + [[b]]               | **Bold**
[[ctrl]] + [[i]]               | _Italics_
[[ctrl]] + [[u]]               | <u>Underline</u>

Have a look at the keyboard shortcuts in Zammad where you can find all shortcuts. Open it via the
[avatar menu](/en/documentation/use/user-profile#avatar-menu) in the bottom left corner or type [[?]].

Have a look at the next section to use even more formatting via keyboard. Regardless if you are used to write Markdown
or not, some of them might still be helpful in your daily work.

### Markdown Usage

For users familiar with Markdown syntax, the editor provides basic support for formatting content with Markdown. When
using Markdown syntax, it gets immediately applied immediately or after the closing limiter so you can see the result
directly in the editor. To go back to standard text, simply use the same limiter again or use [[enter]], depending on
the option.

It is not intended to support all Markdown features, but to help users getting things done more easily. Therefore, the
most important things are supported like headings, lists, links, code blocks and more. Have a look at the non-exhaustive
formatting examples below.

Markdown Syntax                | Formatting
-------------------------------|---------------
`**`                           | Limiter for **bold**
`_`                            | Limiter for _italics_
`#`, `##`, `###`               | Heading, level depending on number of `#`
`>`                            | Quoted
`` ` ``                        | Limiter for `inline code`
`` ``` ``                      | Code block
`---`                          | Horizontal line as divider
