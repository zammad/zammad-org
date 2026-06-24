---
order: 99
title: 'Conservazione dati e servizi esterni'
---

# Conservazione dati e servizi esterni

Per quanto tempo Zammad memorizza i dati utente? Come posso gestire il
comportamento di conservazione dei dati utente?

## Conservazione dati

I seguenti dati vengono memorizzati localmente sul sistema di produzione:

### Ticket e utenti

Per impostazione predefinita, Zammad non elimina mai automaticamente ticket
o utenti.

Per abilitare l'eliminazione **automatica** dei ticket dopo un dato intervallo,
usa lo scheduler di Zammad.

To **manually** delete users and all their associated tickets (e.g. in
compliance with a "Right to Forget" request under the GDPR), you can use
the data privacy functions in the admin panel under _System > Data Privacy_
or [use the console](/en/reference/rails-commands#deleting-records).

### Sessioni chat

Once a chat session has been marked **closed**, it is scheduled for
automatic deletion 12 months later. IP address logs for chat sessions can be
deleted manually by following the [steps from the rails console
page](/en/reference/rails-commands#remove-ip-address-logs).

### Registro chiamante CTI

Il registro chiamante mostra solo le 60 voci più recenti. Ogni voce nel
registro chiamante viene eliminata automaticamente.

### File di log

Zammad scrive file di log su disco (tipicamente in `/opt/zammad/log/`).

Le installazioni tramite pacchetto configurano un'utility di sistema
separata chiamata `logrotate` per rinominare e.

Se installi da sorgente, è fortemente consigliato configurare `logrotate` o
uno strumento simile.

### Sessioni utente

Zammad mantiene informazioni di sessione su ogni utente attualmente
connesso.

Queste informazioni vengono automaticamente eliminate quando un utente esce, e possono
essere visualizzate o eliminate manualmente.

Le informazioni di sessione includono indirizzo IP (e possibilmente
posizione geografica), browser, orario.

### Attività sulla privacy dei dati

Ogni voce nell'elenco delle attività sulla privacy dei dati viene eliminata
automaticamente dopo 12 mesi.

## Servizi Esterni

Zammad utilizza servizi web di terze parti per determinate funzioni, il che significa
che i dati utente possono.

::: info
By default, the third party services that Zammad relies on are mostly
ones hosted and managed by the Zammad Foundation itself, but Zammad
can be extended to interface with other services instead.

The source code for these third party service integrations can be
found in
[our repository](https://github.com/zammad/zammad/tree/develop/lib/service){target=_blank}.
:::

### Immagini

Nessuna immagine privata o informazione di identificazione personale viene
memorizzata su images.zammad.com.

Il servizio Immagini mette in cache immagini disponibili pubblicamente da
fonti come Gravatar e serve.

### GeoCalendar

Nessuna informazione utente viene memorizzata o messa in cache su
geo.zammad.com.

Come parte della sua funzionalità di accordo sul livello di servizio (SLA),
Zammad richiede informazioni dettagliate e locali.

### GeoIP

Nessuna informazione utente viene memorizzata o messa in cache su
geo.zammad.com.

Una delle funzionalità di sicurezza di Zammad è tracciare le sessioni utente
in base al browser e.

### Geolocalizzazione

Zammad's geolocation service relies on OpenStreetMap (OSM) unless you turned
it off. If you provide an address (or parts of an address) in a user object,
there is a lookup of coordinates from OSM which are stored in Zammad's
database. Have a look at their [privacy
policy](https://osmfoundation.org/wiki/Privacy_Policy){target=_blank} for
more information.
