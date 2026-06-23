---
order: 4
title: 'Primi passi in Zammad'
---

# Primi passi in Zammad

Congratulazioni, sembra che tu abbia installato Zammad con successo. Per
iniziare con la tua nuova installazione.

- [Migra da un altro sistema di ticketing supportato](/it/tutorials/migrate)
- [Ripristina Zammad da un backup esistente](/it/tutorials/backup-restore)

## Procedura guidata Per iniziare

Se visiti la pagina web di Zammad per la prima volta, verrai accolto dalla
sua Procedura guidata Per iniziare.

### Passo 1: Crea il tuo primo account amministratore

Compila le informazioni richieste nella finestra di dialogo. Il tuo
indirizzo email e la password sono importanti.

Zammad applica la seguente politica password per impostazione predefinita:

- 10 caratteri o più
- Almeno 2 caratteri MAIUSCOLI e 2 minuscoli
- Una o più cifre

### Passo 2: Fornisci informazioni sull'azienda

Puoi caricare qui un logo personalizzato della tua azienda. L'indirizzo
dell'istanza viene rilevato automaticamente.

### Passo 3: Canale notifiche email

Per impostazione predefinita, Zammad usa sendmail. Questo può essere
cambiato in SMTP qui.

Zammad usa `noreply@<your-fqdn>` come indirizzo mittente predefinito. Le configurazioni SMTP
potrebbero fallire - tu.

### Passo 4: Il tuo primo canale email <Badge type="info" text="opzionale" />

Se vuoi iniziare subito, puoi già collegare il tuo account email.

:::danger
Per impostazione predefinita, Zammad reagisce alle email recuperate (ad esempio le elimina e invia
automaticamente generati.
:::

Dopo aver completato la procedura guidata, accedi automaticamente
all'account appena creato.

## Prossimi passi

L'elenco seguente potrebbe aiutarti a trovare la strada giusta. Tuttavia,
dovresti adattarlo al tuo.

- Configura i tuoi gruppi richiesti
- Regola i trigger secondo necessità
- Aggiungi filtri postmaster se necessario
- Configura gli SLA se necessario
- Aggiungi canali email / social media e firme
- Torna alle impostazioni del gruppo per aggiungere indirizzi email in
  uscita
- Aggiungi moduli di testo
- Aggiungi organizzazioni
- Configura i ruoli se necessario
- Considera login di terze parti o integrazione LDAP per accessi più
  semplici
- Aggiungi account agente
- Considera strategie di backup per Zammad

:::tip

**Sei ancora confuso?**

Se hai bisogno di aiuto o devi entrare in produzione molto più velocemente.
:::
