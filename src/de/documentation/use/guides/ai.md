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
- Upcoming events (optional)
- Customer sentiment (optional)

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
