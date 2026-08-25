---
order: 6
title: 'База знања'
---

# База знања

The knowledge base is Zammad's built-in content library for organizing FAQs,
how-tos, internal processes, and more.  Customers can browse published
answers (articles) for self-service, while agents can use answers as
internal references or insert them directly into ticket replies.

This guide is written for agents who want to edit the knowledge base or use
it in their daily work. Customers should be able to browse through the
public knowledge base without detailed instructions.

This feature is optional and must be activated by your administrator.

![Screenshot shows knowledge base
overview](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/knowledge-base-full.png)

## Основе

Click **Knowledge Base** in the primary navigation to open it. The knowledge
base opens in preview mode, which looks similar to the published version
customers see.

The knowledge base is organized into **categories** that can contain
subcategories and **answers**.  Each category requires an icon and a
title. Answers consist of a title and rich text content with formatting,
images, videos, file attachments, and links.

## Видљивост

Each answer has a visibility level that controls who can see it:

| Боја   | Видљивост                    | Ко има приступ.                                         |
|--------|------------------------------|---------------------------------------------------------|
| Зелена | **Јавно**                    | Сви, укључујући непријављене посетиоце јавне базе знања |
| Плава  | **Интерно**                  | Само оператери и уредници                               |
| Сива   | **Нацрт** или **Архивирано** | Само уредници                                           |

Changes to visibility take effect immediately.

::: warning
Public answers are always visible to everyone. Internal answers require the **Knowledge Base Reader** permission.
Choose visibility carefully when publishing answers.
:::

## Editing the knowledge base

Open the knowledge base and switch to edit mode using the `Edit` button in
the top toolbar. If you can't see the `Edit` button, your administrator
needs to grant you the appropriate permissions.

To create a new category, click the `+` button on the main page. To create a
new answer, navigate into a category and click the `+` button there. Enter a
title and content, set the visibility level, and save your changes.

The knowledge base editor provides the same rich text capabilities as the
ticket article editor. You can format text, add links to other knowledge
base answers or external websites, embed images and videos, attach files,
and use tags to improve searchability.

## Using the knowledge base in tickets

### Inserting answers into replies

You can insert knowledge base article content directly into a ticket reply
without leaving the ticket:

1. Start composing a reply in the ticket editor.
2. Click the `Insert text from knowledge base answer` button in the editor
   toolbar or type [[?]][[?]].
3. Search for the relevant answer by title or content.
4. Select the article to insert its content at the cursor position.

The inserted content preserves formatting and can be edited before sending.

### Knowledge base assistant

When the AI-based knowledge base assistant is enabled, Zammad can suggest
relevant knowledge base answers based on the ticket content. These
suggestions appear in the **Related knowledge** section of the ticket
sidebar. If a suggested answer solves the problem, it can be linked
permanently to the ticket.

The knowledge base assistant also offers a way to automatically create a
knowledge base answer from the ticket based on its content.
