---
order: 3
title: Docker
---

# Installazione Docker

Zammad può essere distribuito usando Docker Compose. Puoi anche usare
interfacce grafiche Docker come [Portainer](https://www.portainer.io/).

::: info

Non forniamo supporto per problemi specifici relativi a Docker (-Compose) o Portainer.   
Se si sceglie di eseguire Zammad tramite Docker, il supporto è fornito solo per l'applicazione Zammad.
:::

## Prerequisiti

- Un ambiente Docker Compose funzionante
- Almeno 4 GB di RAM per eseguire i container
- Aumenta il limite di memoria per Elasticsearch su host Linux:

  ```sh
  sudo sysctl -w vm.max_map_count=262144
  ```

## Distribuzione con Portainer

Il modo più semplice per avviare Zammad è tramite un'interfaccia grafica
Docker. Consigliamo
[Portainer](https://www.portainer.io/){target=_blank}. Per le istruzioni di
installazione, consultare la [documentazione di
Portainer](https://docs.portainer.io/){target=_blank}.

### Passo 1: Aggiungi stack

Nell'interfaccia di Portainer (ad esempio `https://yourdomain.tld:9443`),
scegli il tuo ambiente di destinazione, seleziona **Stacks**.

![Screenshot nella sezione Stack e evidenziata "Aggiungi
stack".](/screenshots/get-started/installation/portainer-stacks.png)

### Passo 2: Build da repository

Passa al metodo di build **Repository** e fornisci le informazioni seguenti:

- **Nome**: inserisci il nome desiderato dello stack
- **URL repository**: `https://github.com/zammad/zammad-docker-compose`
- **Riferimento repository**: `refs/heads/master`
- **Percorso compose**: `docker-compose.yml` (predefinito)

Nel caso in cui l'ambiente predefinito non sia quello che stai cercando,
puoi personalizzare lo stack utilizzando scenari predefiniti e regolando le
variabili d'ambiente. Vai alla [sezione di
personalizzazione](#personalizzare-lo-stack-Zammad) qui sotto per trovare
maggiori informazioni.

![Creazione dello stack con le informazioni fornite nella schermata
Repository](/screenshots/get-started/installation/portainer-stack-creation.png)

### Passo 3: Distribuisci lo stack

Infine, fai clic sul pulsante `Deploy the stack`. La prima volta, potrebbe
volerci del tempo per scaricare le immagini Docker.

Una volta che lo stack è pronto, è possibile accedere a Zammad tramite
l'host e la porta Docker configurati, ad esempio `http://localhost:8080/`.

## Distribuzione con Docker Compose

### Passo 1: Clona il repository GitHub

```sh
git clone https://github.com/zammad/zammad-docker-compose.git
```

Assicurati di eseguire `git pull` frequentemente per scaricare gli
aggiornamenti. In alternativa, puoi scaricare i file dalla [pagina delle
release](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}.

### Passo 2: Regola l'ambiente secondo necessità

Nel caso in cui l'ambiente predefinito non sia quello che stai cercando,
puoi personalizzare lo stack utilizzando scenari predefiniti e regolando le
variabili d'ambiente. Vai alla [sezione di
personalizzazione](#personalizzare-lo-stack-Zammad) qui sotto per trovare
maggiori informazioni.

### Passo 3: Avvia lo stack

```sh
cd zammad-docker-compose
```

```sh
docker compose up -d
```

Opzionale: utilizzare un file `.yml` aggiuntivo per utilizzare uno scenario
predefinito. Per ulteriori informazioni, consultare la sezione
[Personalizzazione dello stack Zammad](#personalizzare-lo-stack-zammad).

Una volta che lo stack è pronto, è possibile accedere a Zammad tramite
l'host e la porta Docker configurati, ad esempio `http://localhost:8080/`.

## Esporre lo stack tramite HTTPS

Per pubblicare uno stack Zammad su Internet, è necessario proteggerlo
tramite il protocollo HTTPS. Per farlo senza modificare lo stack Zammad, è
possibile:

- Utilizza un proxy inverso come Nginx Proxy Manager (NPM). Dispone di
  un'interfaccia grafica che offre una facile integrazione con [Let's
  Encrypt](https://letsencrypt.org/).
- Usa un tunnel Cloudflare, che fornisce la terminazione SSL.

Entrambi gli scenari sono descritti nella pagina separata [Scenari di Docker
Compose](/it/reference/docker-compose-scenarios).

## Personalizzare lo stack Zammad

Lo stack Zammad può essere personalizzato caricando file di scenario
aggiuntivi per casi d'uso comuni.

Consulta la [pagina degli scenari Docker
Compose](/it/reference/docker-compose-scenarios).

Per regolare lo stack e le impostazioni, utilizzare le [variabili d'ambiente
specifiche di Docker](/it/reference/environment-variables).

## Come eseguire comandi nello stack

Esegui comandi nel tuo stack Docker chiamando `rails` o `rake` tramite uno
dei seguenti metodi.

::::tabs

=== Tramite l'interfaccia grafica di Portainer

Nella tua interfaccia grafica di Portainer, vai alla vista dei container e seleziona il container Rails in esecuzione dal tuo stack Zammad. Fai clic sull'icona **Console di esecuzione** nella colonna "Azioni rapide", seleziona il punto di ingresso standard `/bin/bash` e fai clic su
**Connetti**.


![Esecuzione della console di Portainer](/screenshots/get-started/installation/portainer-exec-console.png){width=80%}

Esegui la console interattiva di Rails eseguendo:

```sh
bundle exec rails c
```

Esegui direttamente un comando specifico:

```sh
bundle exec rails r '...il tuo comando Rails qui...'
```

=== Tramite console

Esegui direttamente un comando specifico:

```sh
docker compose run --rm zammad-railsserver bundle exec rails r '...il tuo comando Rails qui...'
```

Esegui la console interattiva di Rails per inserire manualmente i comandi Rails:

```sh
docker compose run --rm zammad-railsserver bundle exec rails c
```

Tramite `docker compose exec`:

```sh
docker componi exec zammad-railsserver bundle exec rails r '...il tuo comando rails qui...'
```

::: tip
Se devi recuperare informazioni dal server Rails, puoi, ad esempio,
inserire `pp` (pretty print) davanti al tuo comando Rails. Questo genera un output nel tuo terminale.
:::

::::
