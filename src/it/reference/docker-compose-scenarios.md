---
order: 5
title: 'Scenari Docker Compose'
---

# Scenari Docker Compose

## Panoramica

Se lo stack Zammad "vanilla" non copre il tuo caso d'uso, puoi usare uno
degli scenari predefiniti.

I seguenti scenari sono supportati e spiegati più avanti:

- [Rendere lo stack disponibile tramite
  HTTPS](#making-the-stack-available-via-https)
  - Aggiungi un servizio tunnel Cloudflare allo stack
  - Aggiungi un Nginx Proxy Manager (NPM) allo stack
  - Aggiungi una rete Docker esterna a Nginx
- [Usare servizi esterni](#using-external-services)
  - Disabilita il servizio Elasticsearch
- [Rendere i servizi disponibili
  esternamente](#making-services-externally-available)
  - Aggiungi una rete Docker esterna a Elasticsearch
  - Aggiungi una porta host a Elasticsearch
- [Scenari aggiuntivi](#additional-scenarios)
  - Disabilita il servizio di backup
  - Aggiungi un'istanza Ollama allo stack
  - Limita le risorse hardware dello stack

Puoi trovare i file nel [repository
Zammad-Docker-Compose](https://github.com/zammad

## Utilizzo generale

::: tabs

=== Portainer

Follow the [general deployment guide](/en/get-started/installation/docker) and apply the following changes.

Below the "Compose path" field, click on the `Add file` button. This opens the "Additional paths" section where you
can specify the scenario you want to use. Add `scenarios/{scenario you want to use}.yml` and replace the last part in
`{}` brackets with the name of one of the scenario files. You can even combine the scenarios by adding additional paths.

![Portainer additional paths configuration](/screenshots/get-started/installation/portainer-additional-paths.png)

=== Docker Compose

Follow the first 2 steps of the [general deployment guide](/en/get-started/installation/docker). To start the stack with
one or more additional scenarios, use the following command for step 3 in the cloned repository folder instead:

``` sh
docker compose -f docker-compose.yml -f scenarios/{scenario you want to use}.yml up -d
```

Replace the part in `{}` brackets with the file name of one of the scenario files. You can even combine the scenarios
by adding additional files according to the example above.

:::

## Rendere lo stack disponibile tramite HTTPS

Se configuri Zammad per l'uso in produzione, deve essere protetto usando una
connessione HTTPS.

### Aggiungi un tunnel Cloudflare

Se vuoi pubblicare Zammad in modo molto comodo, puoi usare un tunnel
[Cloudflare](https:/

- Usa il file di scenario `scenarios/add-cloudflare-tunnel.yml` per la
  distribuzione
- Aggiungi un sotto-dominio a un dominio già esistente nella tua dashboard
  Cloudflare
- Crea un tunnel per questo sottodominio e configuralo per inoltrare il
  traffico al tuo zammad-ngin
- Fornisci il tuo token tunnel Cloudflare allo stack Zammad usando la
  variabile d'ambiente

### Aggiungi Nginx Proxy Manager

Una configurazione molto comune per pubblicare servizi web è usare un
reverse proxy.

- Usa il file di scenario `scenarios/add-nginx-proxy-manager.yml` per la
  distribuzione
- Fornisci il tuo FQDN per Zammad usando la variabile d'ambiente
  `ZAMMAD_FQDN`
- Configura il tuo DNS. Il FQDN di Zammad scelto dovrebbe puntare
  all'indirizzo IP dell'host NPM.
- Configura un nuovo host proxy nel tuo NPM e segui i passaggi per ottenere
  un certificato SSL

### Aggiungi una rete Docker esterna a Nginx

Se hai già un reverse proxy che si occupa della terminazione SSL, questo
scenario fa per te.

- Usa il file di scenario `scenarios/add-external-network-to-nginx.yml` per
  la distribuzione
- Fornisci il nome della tua rete esterna usando la variabile d'ambiente
  `ZAMMAD_NGINX_

## Usare servizi esterni

### Disabilita il servizio Elasticsearch

Hai già un'istanza Elasticsearch in esecuzione e vuoi usarla anche per
Zammad?

- Usa il file di scenario `scenarios/disable-elasticsearch-service.yml` per
  la distribuzione - questo
- Usa le seguenti variabili d'ambiente per fornire informazioni sulla
  connessione alla tua istanza:
  - `ELASTICSEARCH_SCHEMA`
  - `ELASTICSEARCH_HOST`
  - `ELASTICSEARCH_PORT`
  - `ELASTICSEARCH_USER`
  - `ELASTICSEARCH_PASS`

## Rendere i servizi disponibili esternamente

Questi scenari servono a collegare applicazioni esterne ai servizi di
Zammad. A seconda

::: danger

Quando esponi Elasticsearch fuori dallo stack, assicurati di impostare la variabile `ELASTICSEAR

:::

::: tip

Se vuoi usare TLS, devi connetterti a Elasticsearch tramite reverse proxy.

:::

### Aggiungi una rete Docker esterna a Elasticsearch

Un caso d'uso comune per questo è usare uno strumento di
reporting/visualizzazione come Grafana sulla stessa rete.

- Usa il file di scenario
  `scenarios/add-external-network-to-elasticsearch.yml` per la distribuzione
- Fornisci il nome della tua rete esterna usando la variabile d'ambiente
  `ZAMMAD_ELASTI

### Aggiungi una porta host a Elasticsearch

Nel caso tu voglia esporre il servizio Elasticsearch dello stack Zammad
nella rete.

- Usa il file di scenario `scenarios/add-hostport-to-elasticsearch.yml` per
  la distribuzione
- La porta predefinita per Elasticsearch è `9200`. Cambiala con un'altra
  porta usando la variabile d'ambiente.

## Scenari aggiuntivi

### Disabilita il servizio di backup

Nel caso tu voglia gestire i backup in modo diverso, puoi disabilitare il
servizio di backup integrato.

Puoi farlo semplicemente usando il file di scenario
`scenarios/disable-backup-service.yml`.

### Aggiungi Ollama

Puoi avviare un container [Ollama](https://ollama.com/) aggiuntivo per usare
le funzionalità AI di Zammad.

::: info
Questo è pensato per scopi di sviluppo o test, poiché eseguire uno stack LLM produttivo è.
:::

Per distribuire un container Ollama all'interno dello stack Zammad, usa il
file di scenario `scenarios/ad`.

Per usarlo in Zammad, aggiungi il nome del servizio e la porta
(`http://ollama:11434`) al provider.

### Limita le risorse

Se vuoi limitare le risorse hardware che lo stack Zammad può usare, usa il
file `s`.

### Altri casi d'uso

Il tuo scenario non è ancora coperto? Suggerisci pure il tuo caso
d'uso. Prevediamo di aggiungerne altri.

## Personalizza lo stack localmente

A volte è necessario applicare modifiche locali allo stack Docker di Zammad,
ad esempio per includere.
