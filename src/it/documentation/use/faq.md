---
order: 10
outline:
  - 2
  - 2
title: FAQ
---

# FAQ

[[TOC]]

## Generale

### Come trovare i ticket?

Dipende dal tuo caso d'uso. Zammad offre molte possibilità per cercare e
accedere ai ticket.

Se **cerchi un ticket o un contenuto specifico**, la ricerca è il modo
migliore. Puoi trovare il campo di ricerca nell'area superiore della barra
laterale di navigazione o attivarlo usando la scorciatoia da tastiera
[[s]]. La ricerca mostra anche i ticket che hai chiuso di recente dalla tua
taskbar. C'è una [pagina di ricerca](./guides/search) separata per maggiori
informazioni.

Se vuoi **iniziare a lavorare sui ticket**, dai un'occhiata alle
[panoramiche](./guides/overviews), che sono essenzialmente un elenco dei
ticket correnti. Queste panoramiche dovrebbero metterti in una posizione in
cui puoi facilmente distinguere tra cosa deve essere fatto, cosa è in corso
e cosa è attualmente in attesa. In caso di problemi con queste panoramiche,
il tuo amministratore Zammad dovrebbe essere in grado di aiutare.

### Come ricevere notifiche per le modifiche ai ticket?

Adjust the [notification settings](personal-settings#notifications). You can
distinguish between the action (e.g. ticket creation), the notification
channel (email and/or browser), your relation to the ticket (e.g. if you are
the owner) and limit the notifications to a specific group.

### Perché il ticket è di nuovo aperto? L'ho già chiuso

A seconda delle impostazioni della tua istanza Zammad, i motivi possono
variare. Ma di solito il motivo è che un cliente ha risposto al ticket dopo
che era stato impostato su chiuso. Un altro motivo potrebbe essere che un
collega l'ha riaperto. Se non riesci a vedere un articolo che corrisponde
alla descrizione, puoi dare un'occhiata alla cronologia del ticket per
saperne di più. Fallo aprendo il menu ::a:: nella scheda della barra
laterale del ticket e selezionando **Cronologia**.

Il tuo amministratore Zammad può regolare cosa dovrebbe accadere quando un
cliente risponde dopo che un ticket è stato chiuso.

### Cosa vede il cliente nel ticket?

By default, customers only have a reduced interface. They can create
tickets, view their own tickets (and maybe their colleague's too, depending
on the setting) and access their personal settings. Even the ticket detail
view only includes relevant elements for the customer. Elements, which have
an internal purpose (like group, priority, internal notes, are not visible
to the customer.

::: warning
La spiegazione sopra è basata sulle impostazioni predefinite di Zammad. Tieni presente che la configurazione del tuo sistema potrebbe essere
diversa. In caso di dubbio, dovresti chiedere al tuo amministratore.
:::

### Non riesco ad accedere. Cosa posso fare?

- Hai dimenticato la password? Prova a reimpostarla nella schermata di
  accesso sotto il link **Password dimenticata?** fornendo il tuo indirizzo
  email.
- Hai perso la possibilità di fornire il tuo 2° fattore per l'autenticazione
  a due fattori (2FA)? Usa un codice di recupero e configura un nuovo metodo
  2FA. Vedi la [pagina 2FA](./guides/two-factor-auth) per maggiori
  informazioni.
- Hai perso i codici di recupero 2FA? Contatta il tuo amministratore
  Zammad. Questo vale anche se il tuo problema non è menzionato qui.

### Come posso usare le scorciatoie da tastiera?

Just use them! You can find an overview of the available shortcuts by
pressing [[?]] on your keyboard or open the overview from the [avatar
menu](personal-settings#avatar-menu) (click on your avatar in the bottom
left corner and select **Keyboard shortcuts**).

Alcune di esse dipendono dalla posizione in cui ti trovi o dall'azione che
esegui (ad esempio essere nell'editor o nella visualizzazione dettagli
ticket).

### Come passare dalla modalità scura a quella chiara per l'interfaccia utente?

You can switch between light, dark and automatic mode (tries to adapt to
your browser) in the [avatar menu](personal-settings#avatar-menu). Open it
by clicking your avatar in the bottom left corner and switch the toggle to
the desired state or use the keyboard shortcut [[d]]. If no input field is
activated, it cycles between the different modes.

### How can I read a ticket that is written in another language?

Agents can have the ticket articles translated into a language of their
choice, either per article or automatically for every ticket they open. See
the [article translation guide](./guides/article-translation).

## Personal settings

### How to change my avatar image?

Open the avatar menu in the bottom left corner, select **Personal settings**
and go to the [avatar section](personal-settings#avatar). There you can
upload an image, capture a photo (if your device has a camera) or delete
already present images.

### Come cambiare la lingua dell'interfaccia utente di Zammad?

Open the avatar menu in the bottom left corner, select **Personal settings**
and go to the [language section](personal-settings#language).

### Cosa dovrei fare prima di andare in vacanza?

Open the avatar menu in the bottom left corner, select **Personal settings**
and go to the [out of office
section](personal-settings#out-of-office). There you can define a
replacement agent.

### Come regolare l'ordine delle panoramiche?

Continua a leggere nella [guida alle
panoramiche](guides/overviews#riordina-panoramiche).

## Work on tickets

### Come assegnare qualcuno a un ticket?

Nella scheda della barra laterale del ticket, puoi trovare un campo
**Proprietario**. Scegli tra gli agenti offerti e assicurati di lasciare una
nota interna in modo che l'altro agente sappia di cosa si tratta.

Se hai solo una domanda o hai bisogno di informazioni, puoi anche
[menzionare un collega](funzionalità avanzate#menzionare un utente) in un
articolo usando [[@]][[@]] e porre la tua domanda.

### Come eliminare un ticket?

Prima di tutto, i ticket non possono essere eliminati dagli agenti. Questo
viene fatto per ragioni di trasparenza e per prevenire l'eliminazione
accidentale e arbitraria. Tuttavia, se i clienti vogliono che i loro dati
vengano eliminati (ad esempio a causa di una richiesta di eliminazione
GDPR), questo può essere fatto in Zammad. Contatta il tuo amministratore
Zammad e chiedi di eseguire il job di eliminazione.

### Come usare i modelli di testo?

Usa i [moduli di testo](advanced-features#moduli-di-testo) di Zammad
digitando [[:]][[:]] nell'editor degli articoli o sceglilo dalla barra degli
strumenti dell'editor. Se hai bisogno di moduli aggiuntivi, chiedi al tuo
amministratore Zammad di aggiungerli per te.

### Come chiedere aiuto a un collega nel ticket?

Il modo migliore per farlo è [menzionare un collega](funzionalità
avanzate#menzionare-un-utente) in un articolo usando [[@]][[@]] e porre la
tua domanda. Questo attiverà una notifica per il tuo collega. A seconda dei
tuoi processi interni, cambiare il responsabile del ticket potrebbe anche
essere un'opzione possibile.

### Come citare l'email del cliente o parti di essa?

Per citare parzialmente o selettivamente l'articolo o parti di esso,
seleziona il testo che vuoi citare e fai clic sul pulsante `Rispondi`
accanto all'articolo. Questo può essere fatto anche più volte (ad esempio
per rispondere a parti diverse del ticket).

La citazione dell'intero articolo dipende da come è configurato il tuo
Zammad. Se vuoi applicare modifiche a questo comportamento, chiedi al tuo
amministratore di cambiarlo.
