---
order: 10
title: 'Proxy e connessioni'
---

# Proxy e connessioni

## Proxy

Questa sezione copre la configurazione del proxy tramite variabili
d'ambiente. In alternativa,

|                                             | Configurazione GUI | Variabile d'ambiente

Le seguenti variabili d'ambiente possono essere usate per configurare le
impostazioni proxy. Regola il valore.

`HTTP_PROXY`
: Variabile per il traffico HTTP. Impostala sull'indirizzo del tuo server proxy, incl.

  ```sh
  export HTTP_PROXY="http://127.0.0.1:8080"
  ```

`HTTPS_PROXY`
: Variabile per il traffico HTTPS. Impostala sull'indirizzo del tuo server proxy, in.

  ```sh
  export HTTPS_PROXY="http://127.0.0.1:8080"
  ```

`NO_PROXY`
: Variabile per gli indirizzi a cui accedere direttamente e senza proxy. Es.

  ```sh
  export NO_PROXY="localhost,127.0.0.1,.example.com"
  ```

`ES_JAVA_OPTS`
: Variabile per impostare un proxy per Elasticsearch. Per impostazione predefinita, Elasticsearch non comunica con sistemi esterni
  durante il funzionamento. Tuttavia, possono esserci casi in cui ciò è necessario. Esempio:

  ```sh
  export ES_JAVA_OPTS="-Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=8080 -Dhttps.proxyHost=
  ```

:::tip
A seconda del tuo ambiente, potresti voler usare le varianti minuscole delle variabili.

:::

## Connessioni esterne

Durante l'installazione e il funzionamento di Zammad, sono necessarie alcune
connessioni a servizi online.

| [Address]                                        | Comment                                               |
|------------------------------|-------------------------------------------------------|
| dl.packager.io               | Download del pacchetto OS (installazione del pacchetto) |
| go.packager.io               | Come sopra; nuovo servizio di hosting dei pacchetti     |
| geo.zammad.com               | Utilizzato per i dati geografici                        |
| google.com                   | Download dei giorni festivi per il calendario           |
| index.rubygems.org           | Download delle gem per Ruby                             |
| registry.npmjs.org           | Download delle dipendenze JS                            |

Puoi usare uno script per controllare lo stato di connessione del tuo
sistema. Cerca di connettersi a.

**Recupera lo script da remoto:**

```sh
curl -fsSL https://raw.githubusercontent.com/zammad/zammad/refs/heads/stable/contrib/packa
```

**Usa lo script locale:**

```sh
/opt/zammad/contrib/packager.io/test_download_dependencies_connection.sh
```
