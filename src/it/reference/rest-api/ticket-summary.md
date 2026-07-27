---
order: 20
title: 'Ticket summary'
---

# Ticket summary

## Mostra/Attiva

Permesso richiesto: `ticket.agent`

Richiesta `POST` inviata: `/api/v1/tickets/{ticket id}/summarize`

L'endpoint di riepilogo ticket usa `POST` perché creare e recuperare il
riepilogo avviene.

- Se esiste un riepilogo, viene restituito.
- Se non esiste un riepilogo, la creazione viene attivata in background (job
  asincrono).

Usare `GET` sarebbe scorretto poiché la chiamata può anche creare dati. Se
vuoi un riepilogo.

Risposta di esempio se la generazione di un nuovo riepilogo è stata appena
attivata dalla richiesta:

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-null.json

:::

Risposta di esempio per un riepilogo esistente (ad esempio per lo stesso
ticket sopra dopo aver atteso.

::: details

<<< @/fixtures/rest-api/ticket-summary/post-res-summary.json

:::
