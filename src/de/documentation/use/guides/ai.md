---
order: 4
title: KI-Features
---

# KI-Features

## Einführung

Zammad wird jetzt noch intelligenter! Wir erweitern die KI-Fähigkeiten von
Zammad, damit Sie Support-Tickets noch effizienter verwalten können. ✨🚀

::: info
Die KI-Funktionen müssen von Ihrem Administrator konfiguriert und aktiviert werden. Wenn Sie sie nicht sehen können, sind sie nicht konfiguriert.
Weitere Informationen über die Konfiguration und Aktivierung finden Sie im Admin-Bereich.
:::

## Ticket-Zusammenfassung

Die Ticket-Zusammenfassung tut, was der Name sagt: Sie fasst den Inhalt des
Tickets zusammen. Dies kann bei großen Tickets und/oder vielen Wechseln
zwischen Agenten eine enorme Zeitersparnis bedeuten.

Wenn die Funktion aktiviert ist wird eine Zusammenfassung des Tickets
generiert wenn das Ticket aktualisiert wurde und Sie es entweder öffnen oder
den Seitenleisten-Tab für die Zusammenfassung des Tickets anklicken,
abhängig von der Konfiguration.

![Screenshot zeigt Zammads Ticket Detailansicht mit hervorgehobenem Banner
für die Ticket-Zusammenfassung und der
Zusammenfassungs-Seitenleiste](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-ticket-summary-sidebar.png)

Abhängig von der Konfiguration Ihrer Zammad-Instanz enthält die
Zusammenfassung die folgenden Abschnitte:

- Anliegen des Kunden
- Zusammenfassung der Konversation
- Offene Fragen (optional)
- Anstehende Ereignisse (optional)
- Stimmung des Kunden (optional)

## Schreibassistent-Werkzeuge

Die KI-gestützten Schreibassistent-Werkzeuge wurden entwickelt, um Ihren
Workflow bei der Erstellung eines Artikels beim Beantworten von Ticket zu
vereinfachen. Um ein solches Werkzeug zu verwenden, markieren Sie zunächst
den Text, auf den Sie die Änderungen anwenden möchten. Klicken Sie dann auf
die Schaltfläche `Schreibassistent-Werkzeuge` auf der linken Seite der
Symbolleiste des Editors und wählen Sie abhängig von Ihrem Anwendungsfall
eines der Werkzeuge aus.

![Screenshot zeigt Zammads
Schreibassistent-Menü](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-writing-assistant-tools.png)

::: warning

- Beachten Sie, dass Ihr Text ersetzt wird, wenn Sie eines der Textwerkzeuge auswählen. Wenn Sie mit dem Ergebnis nicht zufrieden sind
  können Sie die Rückgängig-Funktion verwenden, indem Sie [[ctrl]] + [[z]] drücken.
- Prüfen Sie die Antwort immer gegen. Obwohl die Funktion sorgfältig entwickelt wurde, kann es in Einzelfällen zu kleineren Fehlern kommen,
  die in der Natur neuronaler Netze liegen.

:::

Zammad liefert standardmäßig Schreibassistent-Werkzeuge mit. Die
Verfügbarkeit hängt von der Konfiguration Ihrer Zammad-Instanz ab. Sie
können sogar zusätzliche benutzerdefinierte Tools sehen, falls Ihr
Administrator welche hinzugefügt hat.

- **Expand draft into well-written section**: Uses your draft as a base and
  tries to elaborate a proper text. It tries to add a structure and to
  enhance clarity and conciseness and removing misspellings and grammar
  errors. You can even use it by providing only basic information (e.g. via
  bullet points) and let the AI write the answer.
- **Rechtschreibung und Grammatik korrigieren**: Prüft Ihren Text und
  entfernt Rechtschreib- und Grammatikfehler.
- **Zusammenfassen des Abschnitts auf ca. die halbe Länge**: Fasst Ihren
  Text zusammen, wobei die Botschaft und der Ton des Textes erhalten
  bleiben.
- **Komplexen Abschnitt umformulieren und leicht verständlich machen**:
  Entfernt überflüssige Teile und schreibt Ihren Text in einer klaren und
  verständlichen Weise um.

## Knowledge Base Assistent

![Der Screenshot zeigt den Abschnitt "Verwandtes Wissen" in der
Ticket-Seitenleiste mit einer von der KI vorgeschlagenen Antwort aus der
Knowledge
Base](/screenshots/cypress/documentation/use/guide-ai.cy.js/ai-knowledge-base-assistant.png)

### Knowledge Base Antworterstellung

Mit dieser Funktion können Sie die KI-gestützte Erstellung einer Antwort in
der [Knowledge Base](/de/documentation/use/guides/knowledge-base) direkt aus
einem Ticket heraus anstoßen. Dies ist nützlich, wenn Sie häufig ähnliche
Tickets erhalten und für solche Fälle schnell einen Artikel für die
Knowledge Base erstellen möchten. Auf diese Weise können Sie und Ihre
Kollegen ähnliche Tickets in Zukunft effizienter bearbeiten. Es könnte sogar
dazu beitragen, das Volumen der eingehenden Tickets zu reduzieren, wenn
Kunden ihre Probleme direkt selbst über die veröffentlichte Knowledge Base
lösen können.

Diese Funktion ist im Abschnitt **Verwandtes Wissen** in der
Ticket-Seitenleiste verfügbar. Klicken Sie auf die Schaltfläche `KI-Entwurf
hinzufügen`, um die Generierung einer Antwort auszulösen.

Zu beachtende Punkte:

- Die Antwort in der Knowledge Base wird als Entwurf erstellt und nicht
  automatisch veröffentlicht.
- Sie sind als Verfasser der Antwort angegeben.
- Die Antwort wird in der Standardsprache Ihrer Knowledge Base erstellt.
- Die Antwort enthält eine Notiz im Inhaltsbereich und einen Tag
  (`ai-generated`) über die KI-Erstellung.
- Dem Ticket, über das Sie die Antwortgenerierung ausgelöst haben, wird ein
  Link zur Antwort hinzugefügt.
- Die Antwort wird in einer Kategorie der Knowledge Base erstellt, für die
  Sie Bearbeitungsrechte besitzen. Die KI wählt eine dieser Kategorien aus.

Falls bereits eine ähnliche Antwort in der Knowledge Base vorhanden ist,
zeigt Zammad diese in einem Dialogfeld an, bevor eine neue Antwort erstellt
wird. So haben Sie die Möglichkeit, bereits vorhandene, themenverwandte
Antworten zu prüfen, um doppelte Einträge zu vermeiden.

### Knowledge Base-Antwortvorschläge

Diese Funktion vergleicht den Inhalt des Tickets mit der Knowledge Base und
zeigt relevante Antworten unter **Vorgeschlagen von KI** an, sofern diese
den vom Administrator festgelegten Schwellenwert für die Relevanzbewertung
erreichen. Jeder Vorschlag zeigt den Titel der Antwort an; weitere Details
werden beim Bewegen des Mauszeigers über den Vorschlag angezeigt. Eine
zusätzliche Relevanzbewertung wird nur Benutzern mit den entsprechenden
Administratorrechten angezeigt. Klicken Sie auf den Titel, um die Antwort in
der Knowledge Base zu öffnen. Klicken Sie auf die Schaltfläche ::+:: auf der
rechten Seite, das beim Bewegen des Mauszeigers erscheint, um die Antwort
mit dem Ticket zu verknüpfen.

Sind keine Vorschläge verfügbar, wird stattdessen die Meldung "Keine
Vorschläge." angezeigt.

## KI-Agenten

KI-Agenten können so konfiguriert werden, dass sie bestimmte Arten von
Routineaufgaben übernehmen. Im Allgemeinen arbeitet diese Funktion im
Hintergrund, aber wenn sie konfiguriert ist, können Sie sie in einigen
Situationen bemerken (siehe Beispiele unten). Falls Ihr Administrator ein
Makro mit einer KI-Agent-Aktion erstellt hat, können Sie es auch manuell
ausführen. Fragen Sie Ihren Administrator nach Einzelheiten und werfen Sie
einen Blick auf die [Makro
Erklärung](/de/documentation/use/advanced-features#makros) auf der Seite mit
den erweiterten Funktionen.

### Ticket-Historie

Wenn ein KI-Agent Änderungen vorgenommen hat, sehen Sie einen Eintrag in der
Ticket Historie, der Ihnen den Namen des KI-Agenten nennt. Wenn Sie
feststellen, dass der KI-Agent häufig falsch liegt, informieren Sie Ihren
Zammad-Administrator. Beispiel für einen Eintrag in der Historie eines
KI-Agenten:

![Eintrag eines KI-Agenten in die
Ticket-Historie](/screenshots/documentation/use/ai/ai-agent-ticket-history.png)

### Erkennung gleichzeitige Ticketbearbeitung

AI agents which are currently working on a ticket are displayed like other
agents in the live user section in the bottom bar. This helps to avoid
duplicate work and losing unsaved changes. If you see an AI agent avatar,
wait for a moment or head over to another ticket.

Avatar eines KI Agenten:

![Screenshot zeigt Avatar eines
KI-Agenten](/screenshots/documentation/use/ai/ai-live-user.png)

### Indikator in Übersichten

Ein laufender KI-Agent wird in der Statusspalte in den Übersichten
angezeigt. Die Farbe des Kreises ändert sich zu einem blau/pinken
Farbverlauf:

![Screenshot zeigt einen Statuskreis in Übersichten, der anzeigt, dass ein
KI-Agent gerade daran
arbeitet](/screenshots/documentation/use/ai/overview-ai-agent-indicator.png)
