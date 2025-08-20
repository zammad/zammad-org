---
order: 20
title: 'Ticket Zusammenfassung'
---

# Ticket Zusammenfassung

## Anzeigen/Generieren

Erforderliche Berechtigung: `ticket.agent`

`POST`-Request gesendet: `/api/v1/tickets/{ticket id}/enqueue_summarize`

Die folgende POST-Anfrage ruft eine vorhandene Zusammenfassung ab, sofern im
Ticket eine vorhanden ist. Wenn keine Zusammenfassung vorhanden ist oder das
Ticket nach der Erstellung der bestehenden Zusammenfassung geändert wurde,
wird eine neue Zusammenfassung getriggert. In einem solchen Fall erhalten
Sie keine Antwort mit der Zusammenfassung. Um eine Zusammenfassung zu
erhalten, müssen Sie die Anfrage mit einer kleinen Verzögerung erneut
senden, um der KI-Aufgabe einige Sekunden für die Erstellung zu geben.

Beispielantwort, wenn die Erstellung einer neuen Zusammenfassung gerade
durch die Anfrage ausgelöst wurde:

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-null.json

:::

Beispielantwort für eine bestehende Zusammenfassung (z.B. für dasselbe
Ticket wie oben nach einigen Sekunden Wartezeit):

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-summary.json

:::
