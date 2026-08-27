---
order: 5
title: 'Mobile view'
---

# Mobile view

## Introduzione

Lo sviluppo di una visualizzazione mobile dedicata per Zammad è stato
guidato dalla crescente necessità di accesso durante gli
spostamenti. L'applicazione desktop offre funzionalità responsive per
schermi più piccoli, ma è risultata troppo complessa per un uso mobile
ottimale. Questa visualizzazione mobile si concentra sulla presentazione
delle informazioni più critiche in un design touch-friendly e moderno, dando
priorità a un'esperienza utente semplificata.

::: info
Non forniamo intenzionalmente istruzioni specifiche e documentazione completa per la visualizzazione mobile! L'esperienza 

utente complessiva dovrebbe essere intuitiva e autoesplicativa nella maggior parte dei casi.
:::

Di seguito trovi screenshot per avere un'idea di come appare la
visualizzazione mobile.

::: tabs

=== Login e Home

| Login | Home |
|:-------------------------:|:-------------------------:|
| ![Screenshot che mostra la schermata di accesso della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/login.png) | ![Screenshot che mostra la schermata home della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/home.png) |

=== Ricerca e Panoramica

| Ricerca | Panoramica |
|:-------------------------:|:-------------------------:|
| ![Screenshot che mostra la schermata di ricerca della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/search.png) | ![Screenshot che mostra la schermata panoramica della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/overview.png) |

=== Dettagli ticket

| Articoli | Dettagli |
|:-------------------------:|:-------------------------:|
| ![Screenshot che mostra la schermata ticket della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/ticket-articles.png) | ![Screenshot che mostra la visualizzazione dettagli ticket della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/ticket-details.png) |

=== Notifiche e Account

| Notifiche | Account |
|:-------------------------:|:-------------------------:|
| ![Screenshot che mostra la schermata notifiche della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/notifications.png) | ![Screenshot che mostra la schermata impostazioni account della visualizzazione mobile di Zammad](/screenshots/documentation/use/mobile-view/profile.png) |

:::

## Funzionalità

La visualizzazione mobile ti fornisce un modo per eseguire le tue attività
quotidiane comuni di Zammad in mobilità:

- Gestisci e usa le panoramiche dei tuoi ticket
- Cerca record esistenti
- Crea un nuovo ticket
- Rispondi in un ticket già esistente
- Modifica gli attributi del ticket
- Modifica gli attributi del cliente
- Modifica gli attributi dell'organizzazione

## Limitazioni

La visualizzazione mobile manca attualmente anche di alcune funzionalità
fornite dalla visualizzazione desktop:

- Contabilità del tempo
- Dividi articolo
- Collega ticket e visualizza i ticket collegati
- Esecuzione di macro
- Cronologia ticket
- Creazione modelli e bozze condivise

Additionally, certain features were intentionally omitted to improve the
focus on important information:

- La maggior parte delle funzionalità di gestione (ad eccezione della
  gestione degli utenti ticket e delle organizzazioni)
- La maggior parte delle funzionalità della base di conoscenza (ad eccezione
  dell'integrazione dei ticket)
- La maggior parte delle funzioni del profilo utente (ad eccezione delle
  preferenze di avatar e lingua)
- Rapporti
- Registro chiamate
- Chat in tempo reale

## Switch the views

Zammad implementa un rilevamento del dispositivo mobile, che risulta in un
reindirizzamento automatico alla visualizzazione mobile. Anche con questo
meccanismo attivo, è possibile passare esplicitamente tra le visualizzazioni
usando i link dell'app.

Nelle schermate di accesso sia della visualizzazione desktop che mobile,
puoi trovare un link sotto il pulsante `Accedi` per passare esplicitamente
all'altra visualizzazione.

Mentre sei connesso e vuoi passare dalla visualizzazione mobile a quella
desktop, vai al tuo profilo selezionando il tuo avatar in basso e seleziona
**Continua al desktop**. Il contrario è simile: nel menu avatar, puoi
trovare una voce per passare alla visualizzazione mobile.
