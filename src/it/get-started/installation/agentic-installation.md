---
order: 5
title: 'Installazione agentica'
---

# Installazione agentica

::: danger
Tieni presente che le fasi di configurazione per gli agenti AI non trattano argomenti relativi a sicurezza, rete e configurazione (ad esempio, certificati SSL, configurazione del nome host, impostazioni di Elasticsearch). Queste fasi riguardano invece una semplice configurazione di base di Zammad. Per utilizzarlo in produzione, assicurati di configurarlo correttamente seguendo le altre risorse presenti in questa documentazione.
:::

Se vuoi installare Zammad tramite un agente LLM, fallo indirizzando il tuo
agente a una delle pagine di installazione.

## Installazione tramite Docker Compose

This file covers an installation via Docker Compose by fetching the default
[Docker Compose
repository](https://github.com/zammad/zammad-docker-compose){target=_blank}
of Zammad.

Prerequisiti:

- Configurazione Docker Compose in esecuzione
- Git installato

Istruzioni:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-docker.md
```

## Installazione tramite gestore pacchetti

Questo file copre un'installazione tramite gestore pacchetti, incluso
Elasticsearch.

Prerequisiti:

- Sistema operativo host: Ubuntu (22.04 o 24.04) o Debian (12 o 13).
- `curl`, `apt-transport-https` e `gnupg` installati.
- Un locale con supporto UTF-8.

Istruzioni:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-package.md
```
