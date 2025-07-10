---
order: 4
title: 'Zammad KI'
---

# Zammad KI

## Einführung

Zammad wird jetzt noch intelligenter! Wir erweitern die KI-Fähigkeiten von
Zammad, damit Sie Support-Tickets noch effizienter verwalten können. ✨🚀

::: info
Die KI-Funktionen müssen von Ihrem Administrator konfiguriert und aktiviert werden. Wenn Sie sie nicht sehen können, sind sie nicht konfiguriert.
Weitere Informationen über die Konfiguration und Aktivierung finden Sie im Admin-Bereich.
:::

## Ticket Zusammenfassung

Die Ticket-Zusammenfassung tut, was der Name sagt: Sie fasst den Inhalt des
Tickets zusammen. Dies kann bei großen Tickets und/oder vielen Wechseln
zwischen Agenten eine enorme Zeitersparnis bedeuten.

If the feature is activated, a summary of the ticket is generated when a
ticket is opened. An indicator shows up on the **AI summary** sidebar tab to
show you that a summary has been generated.

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

## AI Assistant Text Tools

Der neue KI-gesteuerte smarte Editor wurde entwickelt, um Ihren Workflow bei
der Beantwortung von Tickets zu vereinfachen und zu verbessern. Er hilft
Ihnen mit Text-Tools, während Sie einen Artikel erstellen.

To use any of the following features, you first have to select text you want
to apply the changes to. After that, click the **AI Assistant text tools**
button at the left side of the editor toolbar and choose one of the
following functions, depending on what you want to perform.

![Screenshot zeigt Zammads
Smart-Editor-Menü](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-smart-editor.png)

:::warning

- Be aware that your text gets replaced when you select one of the text tools. If you are not satisfied with the result,
  try using the undo feature by pressing [[ctrl]] + [[z]].
- Always double-check the response. Although the feature was carefully developed, there may still be minor problems in
  individual cases due to the nature of neural networks.

:::

- **Text verbessern**: Nimmt Ihren Text als Grundlage und versucht, ihn in
  Richtung Klarheit, Prägnanz und Struktur zu verbessern sowie Rechtschreib-
  und Grammatikfehler zu beseitigen.
- **Rechtschreibung und Grammatik korrigieren**: Prüft Ihren Text und
  entfernt automatisch Rechtschreib- und Grammatikfehler.
- **Erweitern**: Erweitert Ihren Text und behält dabei Ihre Botschaft
  bei. Nützlich, wenn Ihr Kunde mehr als ein paar Aufzählungspunkte als
  Antwort erwartet. Sie können diese Funktion sogar nutzen, indem Sie nur
  grundlegende Informationen bereitstellen (z.B. als Stichworte) und die KI
  die Antwort schreiben lassen.
- **Vereinfachen**: Führt das Gegenteil von "Erweitern" aus und vereinfacht
  und kürzt Ihren Text, während Ihre Botschaft erhalten bleibt.
