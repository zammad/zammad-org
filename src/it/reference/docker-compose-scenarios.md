---
order: 5
title: 'Docker Compose scenarios'
---

# Docker Compose scenarios

## Panoramica

Se lo stack Zammad "vanilla" non copre il tuo caso d'uso, puoi usare uno
degli scenari predefiniti.

I seguenti scenari sono supportati e spiegati più avanti:

- [Rendere lo stack disponibile tramite
  HTTPS](#rendere-lo-stack-disponibile-tramite-https)
  - Aggiungi un servizio tunnel Cloudflare allo stack
  - Aggiungi un Nginx Proxy Manager (NPM) allo stack
  - Aggiungi una rete Docker esterna a Nginx
- [Usare servizi esterni](#usare-servizi-esterni)
  - Disabilita il servizio Elasticsearch
- [Rendere i servizi disponibili
  esternamente](#rendere-i-servizi-disponibili-esternamente)
  - Aggiungi una rete Docker esterna a Elasticsearch
  - Aggiungi una porta host a Elasticsearch
- [Scenari aggiuntivi](#scenari-aggiuntivi)
  - Disabilita il servizio di backup
  - Aggiungi un'istanza Ollama allo stack
  - Add a LibreTranslate instance to the stack
  - Limita le risorse hardware dello stack

You can find the files in the [Zammad Docker Compose
repository](https://github.com/zammad/zammad-docker-compose){{target=_blank}}.

## General usage

:::: tabs

=== Docker Compose

To use a scenario, list its compose file in the `COMPOSE_FILE` environment variable. Either create a `.env` file or
copy and rename the `.env.dist` in the cloned repository folder. The main compose file must be specified first,
followed by one or more scenarios, separated by a colon (`:`). The files are applied in the order given. Replace the
placeholder in curly brackets with the filename of the scenario you want to use.

**Example with two scenario placeholders:**

``` sh
COMPOSE_FILE=docker-compose.yml:scenarios/{scenario you want to use}.yml:scenarios/{another scenario you want to use}.yml
```

After specifying the scenarios, start the stack with `docker compose up -d`.

::: info

When using the `COMPOSE_FILE` variable, the `docker-compose.override.yml` is not automatically picked up. If you want
to use it, make sure to append it to the environment variable's list.

:::

=== Portainer

Follow the [general deployment guide](/en/get-started/installation/docker) and apply the following changes.

Below the "Compose path" field, click on the `Add file` button. This opens the "Additional paths" section where you
can specify the scenario you want to use. Add `scenarios/{scenario you want to use}.yml` and replace the last part in
`{}` brackets with the name of one of the scenario files. You can even combine the scenarios by adding additional paths.

![Portainer additional paths configuration](/screenshots/get-started/installation/portainer-additional-paths.png)

::::

## Making the stack available via HTTPS

Se configuri Zammad per l'uso in produzione, deve essere protetto usando una
connessione HTTPS.

### Add Cloudflare tunnel

If you want to publish Zammad in a very convenient way, you can use a
[Cloudflare](https://www.cloudflare.com/){target=_blank} tunnel.

- Usa il file di scenario `scenarios/add-cloudflare-tunnel.yml` per la
  distribuzione
- Aggiungi un sotto-dominio a un dominio già esistente nella tua dashboard
  Cloudflare
- Crea un tunnel per questo sottodominio e configuralo per inoltrare il
  traffico al tuo zammad-ngin
- Fornisci il tuo token tunnel Cloudflare allo stack Zammad usando la
  variabile d'ambiente

### Add Nginx proxy manager

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

### Add external Docker network to Nginx

Se hai già un reverse proxy che si occupa della terminazione SSL, questo
scenario fa per te.

- Usa il file di scenario `scenarios/add-external-network-to-nginx.yml` per
  la distribuzione
- Fornisci il nome della tua rete esterna usando la variabile d'ambiente
  `ZAMMAD_NGINX_

## Using external services

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

## Making services externally available

Questi scenari servono a collegare applicazioni esterne ai servizi di
Zammad. A seconda

::: danger

Quando esponi Elasticsearch fuori dallo stack, assicurati di impostare la variabile `ELASTICSEAR

:::

::: tip

Se vuoi usare TLS, devi connetterti a Elasticsearch tramite reverse proxy.

:::

### Add external Docker network to Elasticsearch

Un caso d'uso comune per questo è usare uno strumento di
reporting/visualizzazione come Grafana sulla stessa rete.

- Usa il file di scenario
  `scenarios/add-external-network-to-elasticsearch.yml` per la distribuzione
- Fornisci il nome della tua rete esterna usando la variabile d'ambiente
  `ZAMMAD_ELASTI

### Add host port to Elasticsearch

Nel caso tu voglia esporre il servizio Elasticsearch dello stack Zammad
nella rete.

- Usa il file di scenario `scenarios/add-hostport-to-elasticsearch.yml` per
  la distribuzione
- La porta predefinita per Elasticsearch è `9200`. Cambiala con un'altra
  porta usando la variabile d'ambiente.

## Additional scenarios

### Disable backup service

Nel caso tu voglia gestire i backup in modo diverso, puoi disabilitare il
servizio di backup integrato.

Puoi farlo semplicemente usando il file di scenario
`scenarios/disable-backup-service.yml`.

### Aggiungi Ollama

You can spin up an additional [Ollama](https://ollama.com/){target=_blank}
container to use Zammad's AI features on your machine.

::: info
Questo è pensato per scopi di sviluppo o test, poiché eseguire uno stack LLM produttivo è.
:::

Per distribuire un container Ollama all'interno dello stack Zammad, usa il
file di scenario `scenarios/ad`.

Per usarlo in Zammad, aggiungi il nome del servizio e la porta
(`http://ollama:11434`) al provider.

### Add LibreTranslate

You can run an additional
[LibreTranslate](https://libretranslate.com/){target=_blank} container to
power Zammad's article translation on your own hardware. For details on the
integration itself, see the translation services section of the admin
documentation.

To deploy a LibreTranslate container inside the Zammad stack, use the
scenario file `scenarios/add-libretranslate.yml`. The service doesn't
publish any ports to the host; Zammad reaches it inside the stack network as
`http://libretranslate:5000`.

::: tip

The first start takes a while, as the container downloads the language models before the service becomes available.
The models are kept in a Docker volume, so they survive stack restarts.

:::

The scenario supports the following environment variables:

LT_LOAD_ONLY
: Comma-separated list of languages to load, e.g. `en,de,fr`. If unset, all language models are downloaded, which can
  take minutes on cold starts.

LT_UPDATE_MODELS
: Set to `true` to check for updated language models on every stack startup. Only models with a newer available
  version are redownloaded. Without it, the models are downloaded on the first start only.

LT_API_KEYS
: Set to `true` to enable API key support. Each key carries its own allowed requests per minute. To issue a key,
  start the service and run:

  ``` sh
  docker compose exec libretranslate ltmanage keys add 120
  ```

  The number is the allowed requests per minute for this key. The command prints the generated key, which is a UUID
  created by LibreTranslate itself. You can also provide your own key with the `--key` option instead.

LT_REQUIRE_API_KEY_SECRET
: Set to `true` to make API keys mandatory for all requests. Requires
  `LT_API_KEYS=true`.

::: info

LibreTranslate supports many more options. They are described in the
[official documentation](https://docs.libretranslate.com/){target=_blank}, which also lists the environment variables
the container accepts.

:::

Once the stack is up, configure the service in Zammad's admin settings (_System > Integrations > Translation services_):
point the URL to `http://libretranslate:5000` and provide an API key if your instance requires one.

### Limit resources

Se vuoi limitare le risorse hardware che lo stack Zammad può usare, usa il
file `s`.

### Other use cases

Il tuo scenario non è ancora coperto? Suggerisci pure il tuo caso
d'uso. Prevediamo di aggiungerne altri.

## Customize the stack locally

Sometimes it's necessary to apply local changes to the Zammad Docker stack,
e.g. to include additional services. If you plan to do so, we recommend that
you do not change the `docker-compose.yml` file, but instead create a local
`docker-compose.override.yml` that includes all your modifications. Docker
Compose will [automatically load this file and merge its changes into your
stack](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/){target=_blank}.
The stack repository ships an inactive example file you can copy and adjust:

``` sh
cp docker-compose.override.yml.dist docker-compose.override.yml
```

Keep in mind that this file is for changing settings of the services that
`docker-compose.yml` already defines. Loading scenarios here is not
supported, use the `COMPOSE_FILE` variable in your `.env` file instead, as
described in the [general usage](#general-usage) section above. If you do,
append this file to that list as well: setting `COMPOSE_FILE` turns off the
automatic pickup of `docker-compose.override.yml`, so your changes here
would otherwise go unused without any warning.
