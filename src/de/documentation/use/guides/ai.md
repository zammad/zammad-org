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

If the feature is activated, a summary of the ticket is generated when the
ticket got updated and you either open the ticket or open the summary
sidebar tab of the ticket, depending on the configuration.

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

## KI-Assistent Text-Werkzeuge

Der neue KI-gesteuerte smarte Editor wurde entwickelt, um Ihren Workflow bei
der Beantwortung von Tickets zu vereinfachen und zu verbessern. Er hilft
Ihnen mit Text-Tools, während Sie einen Artikel erstellen.

Um eine der folgenden Funktionen zu nutzen, müssen Sie zunächst den Text
auswählen, auf den Sie die Änderungen anwenden möchten. Klicken Sie dann auf
die Schaltfläche **KI-Assistent Text-Werkzeuge** in der Editor-Symbolleiste
und wählen Sie eine der folgenden Funktionen, je nachdem, was Sie
durchführen möchten.

![Screenshot zeigt Zammads
Smart-Editor-Menü](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-smart-editor.png)

:::warning

- Beachten Sie, dass Ihr Text ersetzt wird, wenn Sie eines der Textwerkzeuge auswählen. Wenn Sie mit dem Ergebnis nicht zufrieden sind
  können Sie die Rückgängig-Funktion verwenden, indem Sie [[strg]] + [[z]] drücken.
- Prüfen Sie die Antwort immer gegen. Obwohl die Funktion sorgfältig entwickelt wurde, kann es in Einzelfällen zu kleineren Fehlern kommen,
  die in der Natur neuronaler Netze liegen.

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

## AI Agents

This is no feature which allows any agent interaction. However, if the
feature is configured, you may notice it at some points. This is why you can
find an explanation here.

AI agents can be configured to work on certain types of routine tasks. You
may notice the AI agents at different locations:

### Ticket History

If an AI agent applied changes, you can see a ticket history entry telling
you the name of the AI agent. If you notice ongoing issues with what the AI
agent did, inform your Zammad admin.

Example of a history entry of an AI agent:

![Screenshot shows AI agent ticket history
entry](/screenshots/ai/ai-agent-ticket-history.png)

### Erkennung gleichzeitige Ticketbearbeitung

AI agents which are currently working on a ticket are displayed like other
agents in the live user section in the bottom bar. This helps to avoid
duplicate work as well as losing unsaved changes. If you see an AI agent
avatar, wait for a moment or head over to another ticket.

Avatar of AI agent:

![Screenshot shows avatar of an AI agent](/screenshots/ai/ai-live-user.png)

### Overview Indicator

A running AI agent is indicated in the status column in overviews. The
status circle changes to a blue/pink gradient circle:

![Screenshot shows a status circle in overviews indicating an AI agent is
currently working on it](/screenshots/ai/overview-ai-agent-indicator.png)
