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
: Variable for setting a proxy for Elasticsearch. By default, Elasticsearch does not communicate to external systems
  during the operation. However, there can be cases where this is needed. Example:

  ```sh
  export ES_JAVA_OPTS="-Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=8080 -Dhttps.proxyHost=
  ```

:::tip
A seconda del tuo ambiente, potresti voler usare le varianti minuscole delle variabili.

:::

## Connessioni esterne

Durante l'installazione e il funzionamento di Zammad, sono necessarie alcune
connessioni a servizi online.

| Address                      | Comment                                               |
|------------------------------|-------------------------------------------------------|
| dl.packager.io               | Download of OS package (package installation)         |
| go.packager.io               | As above; new package hosting service                 |
| geo.zammad.com               | Used for geo data                                     |
| google.com                   | Download of feast days for the calendar               |
| index.rubygems.org           | Download of gems for ruby                             |
| registry.npmjs.org           | Download of js dependencies                           |

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
