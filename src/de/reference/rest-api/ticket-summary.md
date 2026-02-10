---
order: 20
title: 'Ticket Zusammenfassung'
---

# Ticket Zusammenfassung

## Anzeigen/Generieren

Erforderliche Berechtigung: `ticket.agent`

`POST`-Request gesendet: `/api/v1/tickets/{ticket id}/summarize`

The ticket summarize endpoint uses `POST` because creating and fetching the
summary happen in a single operation:

- Wenn eine Zusammenfassung existiert, wird sie ausgegeben.
- Wenn keine Zusammenfassung vorhanden ist, wird die Erstellung im
  Hintergrund angestoßen (asynchrone Aufgabe).

Using `GET` would be incorrect since the call may also create data. If you
want a summary to exist, call the endpoint; if it's not ready yet, retry
after at least 30 seconds.

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
