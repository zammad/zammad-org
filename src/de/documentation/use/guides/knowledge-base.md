---
order: 6
title: 'Knowledge Base'
---

# Knowledge Base

Die Knowledge Base ist Zammads integrierte Inhaltsbibliothek zur
Organisation von FAQs, Anleitungen, internen Prozessen und vielem
mehr. Kunden können veröffentlichte Antworten (Artikel) selbst durchsuchen,
während Agenten die Antworten als interne Referenz nutzen oder direkt in
Ticket-Antworten einfügen können.

Dieser Leitfaden richtet sich an Agenten, die die Knowledge Base bearbeiten
oder in ihrer täglichen Arbeit nutzen möchten. Kunden sollten in der Lage
sein, die öffentliche Knowledge Base ohne detaillierte Anweisungen zu
durchsuchen.

Diese Funktion ist optional und muss von Ihrem Administrator aktiviert
werden.

![Der Screenshot zeigt die geöffnete Knowledge
Base](/screenshots/cypress/documentation/use/guide-knowledge-base.cy.js/knowledge-base-full.png)

## Grundlagen

Klicken Sie in der primären Navigation auf **Knowledge Base**, um diese zu
öffnen. Die Knowledge Base wird im Vorschaumodus geöffnet, welcher der
veröffentlichten Version ähnelt, die Kunden sehen.

Die Knowledge Base ist in **Kategorien** organisiert, welche Unterkategorien
und **Antworten** enthalten können. Jede Kategorie muss mit einem Symbol und
einem Titel versehen sein. Antworten bestehen aus einem Titel und
Rich-Text-Inhalten mit Formatierungen, Bildern, Videos, Anhängen und Links.

## Sichtbarkeit

Jede Antwort verfügt über eine Sichtbarkeitseinstellung, die festlegt, wer
sie sehen kann:

| Farbe | Stufe                       | Wer kann sie sehen                                                     |
|-------|---------------------------  |--------------------------------------------------------------------|
| Grün | **Öffentlich**                 | Alle, einschließlich Kunden, die die öffentliche Knowledge Base durchsuchen   |
| Blau  | **Intern**               | Nur Agenten und Bearbeiter                                            |
| Grau  | **Entwurf** oder **Archiviert**  | Nur Bearbeiter                                                       |

Änderungen an den Sichtbarkeitseinstellungen sind sofort wirksam.

::: warning
Öffentliche Antworten sind stets für alle sichtbar. Für interne Antworten ist die Berechtigung **Knowledge Base-Leser** erforderlich.
Wählen Sie die Sichtbarkeit sorgfältig aus, wenn Sie Antworten veröffentlichen.
:::

## Bearbeiten der Knowledge Base

Öffnen Sie die Knowledge Base und wechseln Sie mithilfe der Schaltfläche
`Bearbeiten` in der oberen Symbolleiste in den Bearbeitungsmodus. Falls
diese Schaltfläche nicht angezeigt wird, muss Ihr Administrator Ihnen die
entsprechende Berechtigung erteilen.

Um eine neue Kategorie zu erstellen, klicken Sie auf der Hauptseite auf die
Schaltfläche `+`. Um eine neue Antwort zu erstellen, navigieren Sie in eine
Kategorie und klicken Sie dort auf die Schaltfläche `+`. Geben Sie einen
Titel und den Inhalt ein, legen Sie die Sichtbarkeit fest und speichern Sie
Ihre Änderungen.

Der Knowledge Base-Editor bietet dieselben Rich-Text-Funktionen wie der
Editor für Ticket-Artikel. Sie können Text formatieren, Links zu anderen
Knowledge Base-Antworten oder externen Websites einfügen, Bilder und Videos
einbetten, Anhänge hinzufügen und Tags verwenden, um die Auffindbarkeit zu
verbessern.

## Nutzung der Knowledge Base in Tickets

### Antworten in Artikel einfügen

Sie können den Inhalt eines Knowledge Base-Artikels direkt in eine
Ticket-Antwort einfügen, ohne das Ticket verlassen zu müssen:

1. Beginnen Sie im Ticket-Editor mit der Erstellung einer Antwort.
2. Klicken Sie in der Symbolleiste des Editors auf die Schaltfläche `Text
   aus Knowledge Base-Antwort einfügen` oder geben Sie [[?]][[?]] ein.
3. Suchen Sie die entsprechende Antwort anhand des Titels oder des Inhalts.
4. Wählen Sie den Artikel aus, um dessen Inhalt an der Cursorposition
   einzufügen.

Der eingefügte Inhalt behält seine Formatierung bei und kann vor dem
Absenden bearbeitet werden.

### Knowledge Base Assistent

Wenn der KI-basierte Knowledge Base-Assistent aktiviert ist, kann Zammad
anhand des Ticketinhalts relevante Antworten aus der Knowledge Base
vorschlagen. Diese Vorschläge werden im Bereich **Verwandtes Wissen** in der
Ticket-Seitenleiste angezeigt. Wenn eine vorgeschlagene Antwort das Problem
löst, kann sie dauerhaft mit dem Ticket verknüpft werden.

Der Knowledge Base-Assistent bietet zudem die Möglichkeit, anhand des
Inhalts eines Tickets automatisch eine Antwort für die Knowledge Base zu
erstellen.
