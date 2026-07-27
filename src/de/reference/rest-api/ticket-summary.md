---
order: 20
title: 'Ticket summary'
---

# Ticket summary

## Anzeigen/Generieren

Erforderliche Berechtigung: `ticket.agent`

`POST`-Request gesendet: `/api/v1/tickets/{ticket id}/summarize`

Der "Ticket summarize" Endpunkt verwendet `POST`, da das Erstellen und
Abrufen der Zusammenfassung in einem einzigen Vorgang erfolgt:

- Wenn eine Zusammenfassung existiert, wird sie ausgegeben.
- Wenn keine Zusammenfassung vorhanden ist, wird die Erstellung im
  Hintergrund angestoßen (asynchrone Aufgabe).

Die Verwendung von `GET` wäre falsch, da der Aufruf auch Daten erzeugen
kann. Wenn Sie möchten, dass eine Zusammenfassung vorhanden ist, rufen Sie
den Endpunkt auf; wenn die Zusammenfassung noch nicht verfügbar ist,
versuchen Sie es nach mindestens 30 Sekunden erneut.

Beispielantwort, wenn die Erstellung einer neuen Zusammenfassung gerade
durch die Anfrage ausgelöst wurde:

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-null.json

:::

Beispielantwort für eine bestehende Zusammenfassung (z.B. für dasselbe
Ticket wie oben nachdem die Zusammenfassung erstellt wurde):

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-summary.json

:::
