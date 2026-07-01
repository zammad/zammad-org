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

Per eliminare **manualmente** gli utenti e tutti i ticket a loro associati (ad esempio in
conformità con una richiesta di “Diritto all’oblio” ai sensi del GDPR), puoi utilizzare
le funzioni per la privacy dei dati nel pannello di amministrazione sotto _Sistema > Privacy dei dati_
oppure [utilizzare la console](/en/reference/rails-commands#deleting-records).

### Sessioni chat

Una volta che una sessione di chat è stata contrassegnata come **chiusa**,
viene programmata per l’eliminazione automatica dopo 12 mesi. I log degli
indirizzi IP delle sessioni di chat possono essere eliminati manualmente
seguendo i [passaggi indicati nella pagina della console
Rails](/en/reference/rails-commands#remove-ip-address-logs).

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
Per impostazione predefinita, i servizi di terze parti su cui Zammad si basa sono per lo più
quelli ospitati e gestiti direttamente dalla Zammad Foundation, ma Zammad
può essere esteso per interfacciarsi con altri servizi.

Il codice sorgente per queste integrazioni con servizi di terze parti si trova
nel
[nostro repository](https://github.com/zammad/zammad/tree/develop/lib/service){target=_blank}.
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

Il servizio di geolocalizzazione di Zammad si basa su OpenStreetMap (OSM) a
meno che tu non lo abbia disattivato. Se fornisci un indirizzo (o parti di
un indirizzo) in un oggetto utente, viene effettuata una ricerca delle
coordinate tramite OSM che vengono memorizzate nel database di Zammad. Dai
un’occhiata alla loro [informativa sulla
privacy](https://osmfoundation.org/wiki/Privacy_Policy){target=_blank} per
maggiori informazioni.
