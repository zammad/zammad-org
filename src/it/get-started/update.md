---
order: 3
title: Aggiornamento
---

# Aggiornare Zammad

<!--@include: @/en/modules/zammad-services-hint.md-->

Prima di aggiornare Zammad, consigliamo vivamente di consultare le nostre
[note di rilascio](https://zammad.com/en/releases){target=_blank}. Troverete
informazioni su nuove funzionalità e correzioni, nonché osservazioni
tecniche e modifiche incompatibili con le versioni precedenti.

Tieni presente che non dovresti saltare le versioni principali di Zammad
durante l'aggiornamento. Ciò significa, ad esempio, che il tuo percorso di
aggiornamento dalla versione `2.4` alla `5.1` (supponendo che questa sia la
versione stabile attuale) sarebbe: `2.4` → `3.0` → `4.0` → `5.0` → `ultima
versione stabile (5.1)`

::: info
Questa pagina descrive come aggiornare solo Zammad. Se desideri aggiornare anche il sistema operativo host, consulta le istruzioni per [Aggiornamento host e migrazione repository](host-upgrade-repo-migration).
:::

## Aggiorna installazione tramite pacchetto

### Controlla le dipendenze

Prima di procedere, verifica che il tuo ambiente di sistema corrisponda ai
requisiti di Zammad (vedi [Prerequisiti](installation/prerequisites) e
[Installazione del pacchetto](installation/package)).

### Ferma Zammad

```sh
sudo systemctl stop zammad
```

### Backup di Zammad

Crea un backup. Puoi usare lo [script di
backup](/it/tutorials/backup-restore) incluso.

### Aggiorna Zammad

::: info
Se aggiorni l'intero sistema e sono disponibili aggiornamenti sia per Zammad ** e** per il tuo server di database, potrebbero verificarsi degli errori perché il database potrebbe non essere nuovamente online dopo l'aggiornamento di Zammad.

In tal caso, potresti voler escludere temporaneamente Zammad dagli aggiornamenti, come puoi vedere nei comandi seguenti.
:::

::: tabs key:distros

=== Ubuntu
Aggiorna gli elenchi dei pacchetti:

```sh
sudo apt update
```

Disabilita gli aggiornamenti per Zammad:

```sh
sudo apt-mark hold zammad
```

Aggiorna tutti i pacchetti tranne Zammad:

```sh
sudo apt upgrade
```

Riattiva gli aggiornamenti per Zammad:

```sh
sudo apt-mark unhold zammad
```

Aggiorna Zammad:

```sh
sudo apt upgrade
```

=== Debian
Aggiorna gli elenchi dei pacchetti:

```sh
sudo apt update
```

Disabilita gli aggiornamenti per Zammad:

```sh
sudo apt-mark hold zammad
```

Aggiorna tutti i pacchetti tranne Zammad:

```sh
sudo apt upgrade
```

Riattiva gli aggiornamenti per Zammad Zammad:

```sh
sudo apt-mark unhold zammad
```

Aggiorna Zammad:

```sh
sudo apt upgrade
```

=== OpenSUSE/SLES

Aggiorna gli elenchi dei pacchetti:

```sh
sudo zypper refresh
```

Disabilita gli aggiornamenti per Zammad:

```sh
sudo zypper addlock zammad
```

Aggiorna tutti i pacchetti tranne Zammad:

```sh
sudo zypper update
```

Riabilita gli aggiornamenti per Zammad:

```sh
sudo zypper removelock zammad
```

Aggiorna Zammad:

```sh
sudo zypper update
```

=== CentOS/RHEL

Aggiorna tutti i pacchetti tranne Zammad:

```sh
sudo dnf upgrade --exclude zammad
```

Aggiornamento di Zammad:

```sh
sudo dnf upgrade
```

:::

### Passaggi aggiuntivi

Potrebbe essere rilevante anche l'aggiornamento di Elasticsearch. Assicurati
di avere installata una versione supportata di Elasticsearch (vedi
[installazione del
pacchetto](/it/get-started/installation/package#elasticsearch) per le
versioni supportate).

Se devi aggiornare Elasticsearch, consulta la [loro
documentazione](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html){target=_blank}
e segui le istruzioni.

### Ricostruisci l'indice Elasticsearch <Badge type="tip" text="opzionale" />

Necessario solo se le note di rilascio ti dicono di ricostruire l'indice
Elasticsearch.

Senza specificare i core CPU da usare:

```sh
zammad run rake zammad:searchindex:rebuild
```

Specificando i core CPU da usare (esempio 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

### Avvia Zammad

```sh
sudo systemctl start zammad
```

## Aggiorna installazione Docker

::: warning
Docker Compose stack updates may require extra steps or introduce breaking
changes. Always check the [Docker Compose release notes](https://github.com/zammad/zammad-docker-compose/releases){target=_blank}
for update instructions first.
:::

::: tip
If you want to update Zammad to a specific version, use the `VERSION` environment variable
([example](https://github.com/zammad/zammad-docker-compose/blob/master/.env.dist){target=_blank}
with further explanation) and specify the version number.
:::

### Aggiornare installazioni basate su Portainer

Nel tuo stack Zammad, fai clic su `Pull and redeploy`, attiva **Re-pull
image and redeploy**.

![Aggiornamento dello stack evidenziato in
Portainer](/screenshots/get-started/installation/portainer-stack-update.png)

### Aggiornare installazioni basate su Docker Compose

```sh
cd zammad-docker-compose
```

```sh
git pull
```

```sh
docker compose pull
```

```sh
docker compose up -d
```

### Ricostruisci l'indice Elasticsearch <Badge type="tip" text="opzionale" />

Necessario solo se le note di rilascio ti dicono di ricostruire l'indice
Elasticsearch.

::: tabs

=== Docker Compose

Senza specificare i core della CPU:

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild
```

Con la specifica dei core della CPU da utilizzare (esempio 8):

```sh
docker compose run --rm zammad-railsserver bundle exec rake zammad:searchindex:rebuild[8]
```

=== Interfaccia grafica di Portainer

Apri la [console tramite l'interfaccia grafica di Portainer](installation/docker#come-eseguire-comandi-nello-stack) con il punto di ingresso standard
`/bin/bash` ed esegui:

Senza specificare i core della CPU da utilizzare:

```sh
bundle exec rake zammad:searchindex:rebuild
```

Con la specifica dei core della CPU da utilizzare (esempio 8):

```sh
bundle exec rake zammad:searchindex:rebuild[8]
```

:::
