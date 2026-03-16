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

## Schreibassistent-Werkzeuge

Die KI-gestützten Schreibassistent-Werkzeuge wurden entwickelt, um Ihren
Workflow bei der Erstellung eines Artikels beim Beantworten von Ticket zu
vereinfachen. Um ein solches Werkzeug zu verwenden, markieren Sie zunächst
den Text, auf den Sie die Änderungen anwenden möchten. Klicken Sie dann auf
die Schaltfläche **Schreibassist-Werkzeuge** auf der linken Seite der
Symbolleiste des Editors und wählen Sie eines der Werkzeuge aus, je nachdem,
was Sie durchführen möchten.

![Screenshot zeigt Zammads
Schreibassistent-Menü](/screenshots/cypress/usage-guide-ai.cy.js/ai-writing-assistant-tools.png)

:::warning

- Beachten Sie, dass Ihr Text ersetzt wird, wenn Sie eines der Textwerkzeuge auswählen. Wenn Sie mit dem Ergebnis nicht zufrieden sind
  können Sie die Rückgängig-Funktion verwenden, indem Sie [[ctrl]] + [[z]] drücken.
- Prüfen Sie die Antwort immer gegen. Obwohl die Funktion sorgfältig entwickelt wurde, kann es in Einzelfällen zu kleineren Fehlern kommen,
  die in der Natur neuronaler Netze liegen.

:::

Zammad liefert standardmäßig Schreibassistent-Werkzeuge mit. Die
Verfügbarkeit hängt von der Konfiguration Ihrer Zammad-Instanz ab. Sie
können sogar zusätzliche benutzerdefinierte Tools sehen, falls Ihr
Administrator welche hinzugefügt hat.

- **Entwurf in wohlformulierten Abschnitt wandeln**: Verwendet Ihren Entwurf
  als Grundlage und versucht, einen ordentlichen Text auszuarbeiten. Das
  Werkzeug versucht, eine Struktur hinzuzufügen, die Klarheit und Prägnanz
  zu verbessern und Rechtschreib- sowie Grammatikfehler zu entfernen. Sie
  können diese Funktion auch nutzen, indem Sie nur grundlegende
  Informationen (z.B. in Form einer Auflistung) bereitstellen und die KI die
  Antwort schreiben lassen.
- **Rechtschreibung und Grammatik korrigieren**: Prüft Ihren Text und
  entfernt Rechtschreib- und Grammatikfehler.
- **Zusammenfassen des Abschnitts auf ca. die halbe Länge**: Fasst Ihren
  Text zusammen, wobei die Botschaft und der Ton des Textes erhalten
  bleiben.
- **Komplexen Abschnitt umformulieren und leicht verständlich machen**:
  Entfernt überflüssige Teile und schreibt Ihren Text in einer klaren und
  verständlichen Weise um.

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
