---
order: 3
title: 'Zammad KI'
---

# Zammad KI

## Einführung

Zammad is getting even smarter! We are expanding Zammad's AI capabilities to
help you manage support tickets even more efficiently. ✨🚀

::: info
Die KI-Funktionen müssen von Ihrem Administrator konfiguriert und aktiviert werden. Wenn Sie sie nicht sehen können, sind sie nicht konfiguriert.
Weitere Informationen über die Konfiguration und Aktivierung finden Sie im Admin-Bereich.
:::

## Ticket Zusammenfassung

Die Ticket-Zusammenfassung tut, was der Name sagt: Sie fasst den Inhalt des
Tickets zusammen. Dies kann bei großen Tickets und/oder vielen Wechseln
zwischen Agenten eine enorme Zeitersparnis bedeuten.

Wenn die Funktion aktiviert ist, wird in der Ticket Detailansicht ein Banner
unter den Artikeln angezeigt. Wenn Sie auf die Schaltfläche `Zusammenfassung
ansehen` klicken, wird der Seitenleisten-Tab **Zusammenfassung** geöffnet
und Sie können die Zusammenfassung lesen. Die Zusammenfassung wird erstellt,
wenn Sie ein Ticket öffnen.

![Screenshot zeigt Zammads Ticket Detailansicht mit hervorgehobenem Banner
für die Ticket-Zusammenfassung und der
Zusammenfassungs-Seitenleiste](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-summary-sidebar.png)

Abhängig von der Konfiguration Ihrer Zammad-Instanz enthält die
Zusammenfassung die folgenden Abschnitte:

- Anliegen des Kunden
- Zusammenfassung der Konversation
- Offene Fragen (optional)
- Vorgeschlagene nächste Schritte (optional)

Wenn die vorgeschlagenen nächsten Schritte und die Checklistenfunktion
aktiviert sind, können Sie sogar einzelne Elemente oder alle vorgeschlagenen
nächsten Schritte zu einer [Checkliste](../advanced-features#checklists)
hinzufügen, um den Überblick über die offenen Aufgaben in diesem Ticket zu
behalten.

Wenn Sie das Banner unter den Artikeln nicht sehen möchten, können Sie es
dauerhaft ausblenden. Um das Banner wieder zu sehen, gehen Sie zu
**Aussehen** in Ihren [Profileinstellungen](../manage-profile) und
aktivieren Sie es wieder, indem Sie das Kontrollkästchen anklicken.

## Smart Editor

The new AI-powered smart editor is designed to simplify and enhance your
ticket response workflow. It helps you with text tools while you create an
article.

To use any of the following features, you first have to select text you want
to apply the changes to. After that, click the **Smart Editor** link at the
bottom of the article creation and choose one of the following features,
depending on what you want to perform.

![Screenshot shows Zammad's smart editor
menu](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-smart-editor.png)

:::warning

- Be aware that your text gets replaced when you select one of the text tools. If you are not satisfied with the result,
  try using the undo feature by pressing [[Ctrl]] + [[z]].
- Always double-check the response. Although the feature was carefully developed, there may still be minor problems in
  individual cases due to the nature of neural networks.

:::

- **Improve writing**: Uses your text as a base and tries to improve it by
  enhancing clarity, conciseness and structure as well as removing
  misspellings and grammar issues.
- **Fix spelling and grammar**: Just proofreads your text and automatically
  removes spelling and grammar mistakes.
- **Expand**: Expands your text while keeping your message. Useful if your
  customer expects more than some bullet points as an answer. You can even
  use it by providing only basic information (e.g. via bullet points) and
  let the AI write the answer.
- **Simplify**: Does the opposite of the expansion and shrinks your text
  while keeping your message.
