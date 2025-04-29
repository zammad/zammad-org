---
order: 3
title: 'Zammad KI'
---

# Zammad KI

## Einführung

Zammad wird jetzt noch intelligenter! Wir erweitern die KI-Fähigkeiten von
Zammad, damit Sie Support-Tickets noch effizienter verwalten können. Der
Schwerpunkt liegt zunächst auf Ticket-Zusammenfassungen, aber weitere
Funktionen werden bald hinzukommen! ✨🚀

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
