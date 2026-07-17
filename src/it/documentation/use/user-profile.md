---
order: 7
title: 'Profilo utente'
---

# Profilo utente

Regola le impostazioni del tuo account e quelle personali nel tuo profilo
utente. Alcune opzioni potrebbero non essere disponibili, a seconda di come
è configurato il sistema e dei tuoi permessi. Aprilo dal menu avatar nella
barra laterale. Continua a leggere per ulteriori dettagli.

## Menu avatar

Per aprire il menu avatar, fai clic sulla tua icona avatar nell'angolo in
basso a sinistra nella barra laterale. Questa icona mostra le tue iniziali o
un'immagine del profilo.

![Screenshot che mostra il pannello dettagli
utente](/screenshots/cypress/documentation/use/user-profile.cy.js/avatar-menu.png)

Il menu contiene le seguenti voci:

- **Link/i alla documentazione**: a seconda dei tuoi ruoli puoi vedere uno o
  più link alla documentazione.
- **Aspetto**: passa tra la modalità scura, chiara e automatica. La modalità
  automatica visualizza Zammad in base alla preferenza attuale del tuo
  browser.
- **Scorciatoie da tastiera**: apre un popup con le scorciatoie da tastiera
  disponibili. In alternativa, premi [[?]] sulla tastiera per mostrarle.
- **Impostazioni profilo**: apre le impostazioni del profilo dove puoi
  regolare il tuo avatar, la password, le impostazioni di notifica e molto
  altro, vedi la sezione successiva.

## Impostazioni profilo

![Screenshot che mostra le impostazioni del profilo
utente](/screenshots/cypress/documentation/use/user-profile.cy.js/user-profile-settings-full.png)

### Aspetto

Cambia l'aspetto di Zammad. Opzioni disponibili:

- Modalità scura
- Modalità chiara
- Modalità automatica

L'ultima opzione cerca di rilevare la preferenza del tuo browser. Dipende
dal tuo browser se funziona.

::: tip
Se vuoi passare rapidamente tra la modalità scura e quella chiara, puoi anche usare il pulsante nel
[menu avatar](#menu-avatar) o usare la scorciatoia da tastiera premendo semplicemente [[d]].
:::

### Lingua

Scegli la lingua in cui viene visualizzata l'interfaccia utente di Zammad.

### Avatar

Regola la tua immagine avatar. Per impostazione predefinita, le iniziali del
tuo utente vengono visualizzate su uno sfondo colorato. Se vuoi aggiungere
un'immagine, caricane semplicemente una o usa la tua fotocamera, se ne hai
una.

After capturing or uploading an image, you can crop it. Have a look at the
preview at the top of the right flyout.

### Fuori ufficio

Definisci periodi di assenza (ad esempio per le tue vacanze) e designa un
sostituto per gestire i tuoi ticket mentre sei assente.

Il tuo sostituto designato riceverà aggiornamenti sui nuovi ticket e le
modifiche a quelli esistenti mentre sei assente. Inoltre, le tue panoramiche
personalizzate sono disponibili per questo agente per tenere traccia dei
tuoi ticket. Ricevi anche notifiche mentre sei assente.

### Password

Cambia la password del tuo account. Per aggiornarla, fornisci la vecchia
password, la nuova password e conferma la nuova digitandola di nuovo.

### Autenticazione a due fattori

Configura un'autenticazione a due fattori (2FA) per aumentare la sicurezza
del tuo account. Il tuo amministratore deve aver attivato almeno un metodo
2FA. Potrebbe anche essere imposto dal tuo amministratore l'uso di un metodo
2FA.

Dopo aver seguito la [guida 2FA](./guides/two-factor-auth), devi fornire il
tuo secondo fattore al prossimo accesso. Se non riesci a fornire il tuo
metodo 2FA configurato, contatta il tuo amministratore per reimpostarlo.

### Dispositivi

Qui puoi trovare un elenco di tutti i dispositivi connessi al tuo account
Zammad. Se necessario, puoi revocare l'accesso facendo clic sull'icona di
eliminazione nella colonna "Azioni". Questo termina la sessione su questo
dispositivo e richiede un nuovo accesso su questo dispositivo.

### Accesso token

Genera un token di accesso personale per un'applicazione di terze parti per
accedere all'API di Zammad. Dopo aver fatto clic sul pulsante `Nuovo token
di accesso personale`, puoi impostare un nome, una data di scadenza e
configurare i permessi per questo token.

Dopo aver creato il token, viene visualizzato in una finestra di dialogo
solo una volta. Assicurati di copiarlo perché non c'è la possibilità di
accedervi di nuovo.

![Screenshot shows flyout with created token and copy
button](/screenshots/cypress/documentation/use/user-profile.cy.js/token-dialog.png)

### Notifiche

Regola le notifiche che ricevi. Puoi regolare:

- Per quali azioni del ticket ricevi notifiche (ad esempio per nuovi ticket,
  per ticket escalati)
- Per quale ticket ricevi notifiche in base all'assegnazione e alla tua
  relazione con esso (ad esempio solo i tuoi, non assegnati, ticket
  iscritti)
- In quale modo ricevi notifiche (solo nel browser o anche tramite email)
- Per i ticket in quale gruppo ricevi notifiche

Inoltre, puoi selezionare un suono di notifica o disabilitarlo.

::: tip
Per ricevere notifiche tramite suono e notifica sul tuo sistema operativo, devi consentire a Zammad di inviarti notifiche.
Questo viene richiesto quando Zammad cerca di inviarti una notifica per la prima volta.

Se l'hai rifiutato e vuoi consentirlo ora, cerca un'icona nella barra degli indirizzi dove puoi regolare i permessi del
sito. Dipende dal tuo browser come farlo esattamente. Se non riesci a trovarlo, cercalo nel web o
dai un'occhiata alle impostazioni del tuo browser.
:::

### Panoramiche

Cambia l'ordine delle panoramiche per il tuo account. Trascinale
semplicemente facendo clic sulle maniglie sul lato sinistro. Se il tuo
amministratore cambia l'ordine, il tuo ordine personalizzato rimane. Puoi
tornare all'ordine del tuo amministratore facendo clic sul pulsante
`Reimposta ordine panoramiche`.

### Calendario

Zammad ti permette di iscriverti a un feed calendario (ical) per vedere i
ticket nella tua applicazione calendario preferita. Usa l'**URL di
abbonamento combinato** superiore per iscriverti a tutti i ticket o l'**URL
di abbonamento diretto** inferiore. Scegliendo quest'ultimo, puoi definire
quali ticket vuoi includere in base allo stato e allo stato di assegnazione.
