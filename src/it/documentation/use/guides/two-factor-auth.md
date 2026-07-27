---
order: 9
title: 'Two-factor authentication'
---

# Two-factor authentication

L'autenticazione a due fattori (2FA) migliora la sicurezza del tuo account
Zammad aggiungendo un ulteriore livello di verifica oltre alla
password. Richiede di fornire due diversi tipi di fattori di autenticazione,
tipicamente qualcosa che sai (come una password) e qualcosa che possiedi
(come un dispositivo mobile o un token di sicurezza), per garantire che tu
sia un individuo autorizzato che può accedere all'account.

L'autenticazione a due fattori è una **funzionalità opzionale**. Gli
amministratori devono attivarla per renderla visibile nelle impostazioni del
profilo. L'uso della 2FA potrebbe anche essere imposto dal tuo
amministratore. In questo caso, non puoi usare Zammad a meno che non
configuri almeno un metodo 2FA.

## Configurazione

Se l'amministratore di sistema ha abilitato questa funzionalità, puoi andare a _Avatar > Profilo > Autenticazione a due fattori_ per configurarla.
A seconda dei metodi a due fattori abilitati, potresti vedere una o più opzioni nella tabella.

Per configurare un metodo a due fattori, usa il pulsante ::+:: e segui i
passaggi.

![Screenshot che mostra i metodi 2FA nelle impostazioni del profilo
utente](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-setup.png)

In una finestra di dialogo modale, ti verrà chiesto di confermare la tua
password attuale.

A seconda del metodo a due fattori scelto, sarai guidato attraverso il
processo di configurazione, che include passaggi specifici. Continua usando
un'[App di autenticazione](#app-di-autenticazione) o una [Chiave di
sicurezza](#chiave-di-sicurezza).

### Authentication app

Il metodo dell'app di autenticazione è un tipo di autenticazione a due
fattori che usa un'applicazione mobile per generare codici monouso per la
verifica dell'account. Dopo aver configurato l'app di autenticazione sul tuo
dispositivo, la collegherai al tuo account Zammad.

![Screenshot che mostra la configurazione dell'autenticazione tramite
app](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup.png)

Prima di tutto, assicurati di aver installato un'app di autenticazione sul
tuo dispositivo mobile. Le app consigliate sono:

- [Google
  Authenticator](https://support.google.com/accounts/answer/1066447){target=_blank}
- [Authy](https://support.authy.com/hc/en-us/articles/115001945848-Installing-Authy-apps/){target=_blank}
- [Microsoft
  Authenticator](https://support.microsoft.com/en-us/account-billing/download-and-install-the-microsoft-authenticator-app-351498fc-850a-45da-b7b6-27e523b8702a){target=_blank}

Quindi, apri l'app di autenticazione sul tuo dispositivo e trova un'azione
**Scansiona codice QR** o simile. Punta la fotocamera verso lo schermo di
Zammad e scansiona il codice QR mostrato al centro.

::: tip
Se il tuo dispositivo non è in grado di scansionare il codice QR, fai prima clic su di esso per rivelare il tuo segreto. Quindi, aggiungi una voce manuale alla
tua app di autenticazione e inserisci il segreto fornito quando richiesto.
:::

La tua app di autenticazione dovrebbe aggiungere immediatamente la nuova
voce per il tuo account Zammad e verrà visualizzato un codice a 6 cifre
accanto ad essa insieme a un timer.

Tornando in Zammad, inserisci il codice fornito nel campo **Codice di
sicurezza** e fai clic su **Configura**. Procedi configurando un altro
metodo 2FA ([chiave di sicurezza](#chiave-di-sicurezza)) o controlla come
[accedere con 2FA](#accesso).

### Security key

Il metodo delle chiavi di sicurezza è un tipo di autenticazione a due
fattori che usa l'API di autenticazione Web nel browser per verificare la
tua identità. Puoi registrare più chiavi di sicurezza hardware o software
con il tuo account Zammad e poi possono essere usate durante il processo di
accesso.

Initially, you will be presented with an empty flyout instructing you to
**Set Up** your first key.

![Screenshot che mostra la configurazione dell'autenticazione con chiave di
sicurezza](/screenshots/documentation/use/two-factor-auth-usage/2fa-security-key-panel.png)

Quindi, inserisci un **Nome descrittivo per questa chiave di sicurezza** che
registrerai con il tuo account, in modo da poterla identificare in seguito
nell'elenco. Quindi, fai clic su **Avanti**.

Successivamente, a seconda del tuo browser, ti verranno presentate diverse
opzioni. Seleziona quella che fa riferimento alla tua chiave di sicurezza
scelta e segui le istruzioni sullo schermo.

![Screenshot che mostra la configurazione dell'autenticazione con chiave di
sicurezza](/screenshots/documentation/use/two-factor-auth-usage/2fa-passkey-auth.png)

Il browser potrebbe chiederti di interagire con una chiave o un dispositivo
per dimostrare che sei in possesso fisico di esso (ad esempio inserire il
suo PIN per sbloccarlo).

::: warning
Avrai tempo limitato (misurato in decine di secondi) per registrare la tua chiave. Meglio averla pronta prima di
procedere!
:::

Se la registrazione è riuscita, la finestra di dialogo modale si chiuderà e
sei pronto. In caso di errori, potrai **Riprovare** la registrazione della
chiave.

Una volta configurate, le chiavi di sicurezza possono essere gestite
scegliendo l'azione **Modifica** accanto al metodo di autenticazione a due
fattori.

Hai la possibilità di rimuovere una chiave o configurarne di aggiuntive. Non
c'è limite al numero di chiavi di sicurezza che puoi configurare, ma tieni
presente che non puoi registrare una chiave già registrata per il tuo
account. La rimozione dell'ultima chiave di sicurezza rimuoverà
effettivamente il metodo completo delle chiavi di sicurezza per il tuo
account.

## Accesso

Quando configuri l'autenticazione a due fattori per il tuo account Zammad,
durante il prossimo accesso ti verrà chiesto di fornire lo stesso metodo a
due fattori dopo aver inserito nome utente e password corretti. A seconda
del metodo a due fattori scelto, può essere un codice di sicurezza, una
chiave hardware, ecc.

Nel caso in cui riscontri problemi durante l'accesso con il tuo metodo di
autenticazione a due fattori preferito, puoi passare a un altro, a patto che
lo abbia configurato in precedenza.

Cerca il link **Prova un altro metodo** sotto il riquadro di accesso. Se non
vedi questo link, probabilmente non hai altri metodi a due fattori
disponibili configurati, o il tuo amministratore ha disabilitato questa
funzionalità.

![Schermata di accesso con link a "Prova un altro
metodo"](/screenshots/documentation/use/two-factor-auth-usage/2fa-link-another-method.png)

In alternativa, puoi anche usare uno dei tuoi codici di recupero, che
vengono generati automaticamente per il tuo account durante la
configurazione iniziale dell'autenticazione a due fattori. Fai clic su **O
usa uno dei tuoi codici di recupero**, inserisci uno dei tuoi codici non
utilizzati e fai clic su **Accedi**.

![Schermata di accesso con link ai codici di
recupero](/screenshots/documentation/use/two-factor-auth-usage/2fa-login-recovery-codes.png)

::: warning
Puoi usare un singolo codice di recupero solo una volta! Nel caso in cui esaurisca l'elenco dei tuoi codici di recupero, si consiglia
di rigenerarli per il tuo account.
:::

## Generate recovery codes

I codici di recupero sono codici di sicurezza monouso che possono essere
usati per accedere se perdi l'accesso agli altri metodi di autenticazione a
due fattori. Possono essere usati solo come **metodo di backup**.

Se la funzionalità è abilitata dall'amministratore, i codici di recupero
verranno generati automaticamente per te durante la configurazione del tuo
metodo iniziale di autenticazione a due fattori.

Ti verrà chiesto di stampare o salvare i codici di recupero generati in un
posto sicuro. Una volta usato, un codice di recupero non può essere
riutilizzato.

![Screenshot che mostra l'output dei codici di recupero durante la
configurazione
2FA](/screenshots/documentation/use/two-factor-auth-usage/2fa-app-setup-recovery-codes.png)

Hai anche la possibilità di rigenerare i tuoi codici di recupero in
qualsiasi momento, il che invalida i codici di recupero già esistenti e ti
fornisce un elenco di codici nuovi. Puoi farlo facendo clic sul pulsante
`Rigenera codici di recupero` nelle impostazioni 2FA del tuo profilo.

## Set a default 2FA method

Per impostare un metodo a due fattori già configurato come predefinito, usa
il menu azioni ::a:: accanto ad esso nelle impostazioni 2FA del tuo profilo
e scegli **Imposta come predefinito**.

Per identificare il tuo metodo di autenticazione a due fattori predefinito
corrente, cerca un piccolo badge blu accanto al nome del metodo.

![Screenshot che mostra l'elenco dei metodi 2FA e il metodo
predefinito](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-overview.png)

Un metodo di autenticazione a due fattori predefinito è semplicemente il tuo
metodo preferito durante il processo di accesso. Avrai sempre la possibilità
di provare ad accedere usando un altro metodo.

## Edit a 2FA method

![Screenshot che mostra il menu azioni per un metodo 2FA già
configurato](/screenshots/cypress/documentation/use/guide-2fa.cy.js/2fa-methods-profile-action-menu.png)

Per modificare un metodo a due fattori già configurato, usa il menu azioni
::a:: accanto ad esso e scegli **Modifica**. In una finestra di dialogo
modale, ti verrà chiesto di confermare la tua password attuale.

A seconda del metodo a due fattori scelto, sarai guidato nuovamente
attraverso il processo di configurazione. Normalmente, la modifica di un
metodo semplicemente lo rinnoverà e sostituirà la configurazione precedente,
ma alcuni metodi supportano funzioni avanzate (ad esempio l'aggiunta di più
chiavi di sicurezza).

## Remove a 2FA method

Per rimuovere un metodo a due fattori già configurato, usa il menu azioni
::a:: accanto ad esso e scegli **Rimuovi**. In una finestra di dialogo
modale, ti verrà chiesto di confermare la rimozione con la tua password
attuale.
