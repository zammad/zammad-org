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

Wenn die Funktion aktiviert ist wird eine Zusammenfassung des Tickets
generiert wenn das Ticket aktualisiert wurde und Sie es entweder öffnen oder
den Seitenleisten-Tab für die Zusammenfassung des Tickets anklicken,
abhängig von der Konfiguration.

![Screenshot zeigt Zammads Ticket Detailansicht mit hervorgehobenem Banner
für die Ticket-Zusammenfassung und der
Zusammenfassungs-Seitenleiste](/screenshots/cypress/usage-guide-ai.cy.js/ai-ticket-summary-sidebar.png)

Abhängig von der Konfiguration Ihrer Zammad-Instanz enthält die
Zusammenfassung die folgenden Abschnitte:

- Anliegen des Kunden
- Zusammenfassung der Konversation
- Offene Fragen (optional)
- Anstehende Ereignisse (optional)
- Stimmung des Kunden (optional)

## Writing Assistant Tools

The AI-powered writing assistant tools are designed to simplify and enhance
your ticket response workflow while you create an article.  To use such a
tool, you first have to select text you want to apply the changes to. After
that, click the **Writing Assistant Tools** button at the left side of the
editor toolbar and choose one of the following tools, depending on what you
want to perform.

![Screenshot shows Zammad's smart editor
menu](/screenshots/cypress/usage-guide-ai.cy.js/ai-writing-assistant-tools.png)

:::warning

- Beachten Sie, dass Ihr Text ersetzt wird, wenn Sie eines der Textwerkzeuge auswählen. Wenn Sie mit dem Ergebnis nicht zufrieden sind
  können Sie die Rückgängig-Funktion verwenden, indem Sie [[strg]] + [[z]] drücken.
- Prüfen Sie die Antwort immer gegen. Obwohl die Funktion sorgfältig entwickelt wurde, kann es in Einzelfällen zu kleineren Fehlern kommen,
  die in der Natur neuronaler Netze liegen.

:::

Zammad ships default writing assistant tools. The availability depends on
the configuration of your Zammad instance. You might even have additional
custom tools in case your admin added them.

- **Expand draft into well-written section**: Uses your draft as a base and
  tries to elaborate a proper text. It tries to add a structure and to
  enhance clarity and conciseness and as well as removing misspellings and
  grammar errors. You can even use it by providing only basic information
  (e.g. via bullet points) and let the AI write the answer.
- **Fix spelling and grammar**: Proofreads your text and removes spelling
  and grammar mistakes.
- **Summarize section to about half its current size**: Shrinks your text
  while keeping the message and the tone of the text.
- **Rewrite complex section and make it easy to understand**: Removes
  unnecessary parts and rewrites your text in a clear and understandable
  way.

## KI-Agenten

Dies ist keine Funktion, die eine Interaktion mit Agenten ermöglicht. Wenn
die Funktion jedoch konfiguriert ist, können Sie sie an einigen Stellen
bemerken. Deshalb finden Sie hier eine Erklärung.

KI Agenten können so konfiguriert werden, dass sie bestimmte Arten von
Routineaufgaben übernehmen. Sie werden die KI-Agenten an verschiedenen
Stellen bemerken:

### Ticket-Historie

Wenn ein KI-Agent Änderungen vorgenommen hat, sehen Sie einen Eintrag in der
Ticket-Historie, der Ihnen den Namen des KI-Agenten nennt. Wenn Sie
anhaltende Probleme mit der Arbeit des KI-Agenten feststellen, informieren
Sie Ihren Zammad-Administrator.

Beispiel für einen Eintrag in die Ticket-Historie eines KI Agenten:

![Eintrag eines KI-Agenten in die
Ticket-Historie](/screenshots/ai/ai-agent-ticket-history.png)

### Erkennung gleichzeitige Ticketbearbeitung

KI-Agenten, die gerade an einem Ticket arbeiten, werden wie andere Agenten
im Live-Benutzer-Bereich in der unteren Leiste angezeigt. Dies hilft,
doppelte Arbeit und den Verlust von nicht gespeicherten Änderungen zu
vermeiden. Wenn Sie einen Avatar eines KI-Agenten sehen, warten Sie einen
Moment oder wechseln Sie zu einem anderen Ticket.

Avatar eines KI Agenten:

![Screenshot zeigt Avatar eines
KI-Agenten](/screenshots/ai/ai-live-user.png)

### Indikator in Übersichten

Ein laufender KI-Agent wird in der Statusspalte in den Übersichten
angezeigt. Die Farbe des Kreises ändert sich zu einem blau/pinken
Farbverlauf:

![Screenshot zeigt einen Statuskreis in Übersichten, der anzeigt, dass ein
KI-Agent gerade daran
arbeitet](/screenshots/ai/overview-ai-agent-indicator.png)
