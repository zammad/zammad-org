---
order: 4
title: 'First steps in Zammad'
---

# First steps in Zammad

Congratulazioni, sembra che tu abbia installato Zammad con successo. Per
iniziare con la tua nuova installazione.

- [Migra da un altro sistema di ticketing supportato](/it/tutorials/migrate)
- [Ripristina Zammad da un backup esistente](/it/tutorials/backup-restore)

## Getting started wizard

Se visiti la pagina web di Zammad per la prima volta, verrai accolto dalla
sua Procedura guidata Per iniziare.

### Step 1: Create your first administrator account

Compila le informazioni richieste nella finestra di dialogo. Il tuo
indirizzo email e la password sono importanti.

Zammad applica la seguente politica password per impostazione predefinita:

- 10 caratteri o più
- Almeno 2 caratteri MAIUSCOLI e 2 minuscoli
- Una o più cifre

### Step 2: Provide company information

Puoi caricare qui un logo personalizzato della tua azienda. L'indirizzo
dell'istanza viene rilevato automaticamente.

### Step 3: Email notification channel

Per impostazione predefinita, Zammad usa sendmail. Questo può essere
cambiato in SMTP qui.

Zammad usa `noreply@<your-fqdn>` come indirizzo mittente predefinito. Le configurazioni SMTP
potrebbero fallire - tu.

### Step 4: Your first email channel <Badge type="info" text="optional" />

Se vuoi iniziare subito, puoi già collegare il tuo account email.

::: danger
Per impostazione predefinita, Zammad reagisce alle email recuperate (ad esempio le elimina e invia
automaticamente generati.
:::

Dopo aver completato la procedura guidata, accedi automaticamente
all'account appena creato.

## Next steps

L'elenco seguente potrebbe aiutarti a trovare la strada giusta. Tuttavia,
dovresti adattarlo al tuo.

- Configura i tuoi gruppi richiesti
- Regola i trigger secondo necessità
- Aggiungi filtri postmaster se necessario
- Configura gli SLA se necessario
- Aggiungi canali email / social media e firme
- Torna alle impostazioni del gruppo per aggiungere indirizzi email in
  uscita
- Aggiungere Moduli di Testo
- Aggiungi organizzazioni
- Configura i ruoli se necessario
- Considera login di terze parti o integrazione LDAP per accessi più
  semplici
- Aggiungi account agente
- Considera strategie di backup per Zammad

::: tip

**Sei ancora in difficoltà?**

Se hai bisogno di aiuto o devi andare in produzione molto più rapidamente, puoi anche
prenotare workshop con uno dei nostri
[consulenti Zammad](https://zammad.com/en/company/contact){target=_blank}.
:::
