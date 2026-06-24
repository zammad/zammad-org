---
order: 2
title: Pacchetto
---

# Installazione del pacchetto

<!--@include: @/en/modules/zammad-services-hint.md-->

## Sistemi operativi supportati

Per l'installazione del pacchetto, sono supportate le seguenti distribuzioni Linux:
<!-- tabella inclusa in host-upgrade.md; a cui si fa riferimento alle righe 15-20. Assicurarsi di mantenerla o
modificarla lì -->
| Distribuzione | Versione |

-------------------- | :------------------- |

| CentOS/RHEL | 9, 10 |

| Debian | 11, 12 e 13 |

| OpenSUSE Leap / SLES | 15 e 16 |

| Ubuntu | 22.04, 24.04 e 26.04 |

Se la tua distribuzione non è supportata, puoi utilizzare un metodo di
installazione diverso o valutare l'utilizzo del [servizio cloud di
Zammad](https://zammad.com/en/pricing){target=_blank}.

Per seguire i passaggi di installazione descritti di seguito, sono necessari
strumenti come curl, gnupg e altri. Se non sono presenti sul sistema,
installateli:

:::tabs key:distros

=== Ubuntu

```sh
sudo apt install curl apt-transport-https gnupg
```

=== Debian

```sh
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

OpenSUSE non richiede passaggi aggiuntivi!

SLES 15 richiede l'attivazione di repository aggiuntivi. Per farlo, eseguire i seguenti comandi.

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo dnf install curl epel-release
```

:::

## Nozioni di base

### Assicurati della localizzazione corretta

:::tabs key:distros

=== Ubuntu

```sh
sudo apt install curl apt-transport-https gnupg
```

=== Debian

```sh
sudo apt install curl apt-transport-https gnupg
```

=== OpenSUSE/SLES

OpenSUSE non richiede passaggi aggiuntivi!

SLES 15 richiede l'attivazione di repository aggiuntivi. Per farlo, eseguire i seguenti comandi.

```sh
sudo SUSEConnect --product sle-module-desktop-applications/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

```sh
sudo SUSEConnect --product PackageHub/$(. /etc/os-release; echo $VERSION_ID)/$(uname -i)
```

=== CentOS/RHEL

```sh
sudo dnf install curl epel-release
```

:::

### Installa Elasticsearch

Il metodo consigliato è quello di utilizzare la [guida ufficiale di
Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){target=_blank}
per installare Elasticsearch.

Alternatively, you can follow [our example
setup](/en/tutorials/install-elasticsearch) of Elasticsearch 9, which is
separated to keep the install instructions as lean as possible.

### Aggiungi il repository Zammad

::: info
Packager.io potrebbe non essere accessibile da ambienti solo IPv6, quindi assicurati
di considerare questo aspetto.
:::
<!-- istruzioni del repository incluse in host-upgrade.md; a cui si fa riferimento alle righe 171-283. Assicurati di mantenerle o
modificarle lì -->
::::tabs key:distros

=== Ubuntu
Aggiungi la chiave del repository:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \

-o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Aggiungi il repository (Ubuntu 22.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi il repository (Ubuntu 24.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi repository (Ubuntu 26.04):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/26.04.list" \

-o /etc/apt/sources.list.d/zammad.list
```

=== Debian

Aggiungi chiave repository:

```sh
sudo curl -fsSL "https://go.packager.io/srv/deb/zammad/zammad/gpg-key.gpg" \

-o /usr/share/keyrings/zammad.gpg && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

Aggiungi repository (Debian 11):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/11.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi repository (Debian 12):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \

-o /etc/apt/sources.list.d/zammad.list
```

Aggiungi repository (Debian 13):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \

-o /etc/apt/sources.list.d/zammad.list
```

=== OpenSUSE/SLES

Aggiungi repository (OpenSUSE/SLES 15):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \
"https://go.packager.io/srv/zammad/zammad/stable/installer/sles/15.repo"
```

Aggiungi repository (OpenSUSE/SLES 16):

```sh
sudo curl -o /etc/zypp/repos.d/zammad.repo \

"https://go.packager.io/srv/zammad/zammad/stable/installer/sles/16.repo"
```

===CentOS/RHEL
Aggiungi la chiave del repository:

```sh
sudo rpm --import https://go.packager.io/srv/rpm/zammad/zammad/gpg-key.asc
```

Aggiungi il repository (CentOS/RHEL 9):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/9.repo" \

-o /etc/yum.repos.d/zammad.repo
```

Aggiungi il repository (CentOS/RHEL 10):

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/el/10.repo" \ 
-o /etc/yum.repos.d/zammad.repo
```

::::

### Installa Zammad

:::tabs key:distros

=== Ubuntu

```sh
sudo apt update
```

```sh
sudo apt install zammad
```

=== Debian

```sh
sudo apt update
```

```sh
sudo apt install zammad
```

=== OpenSUSE/SLES

```sh
sudo zypper refresh
```

```sh
sudo zypper install zammad
```

=== CentOS/RHEL

```sh
sudo dnf install zammad
```

:::

### Gestisci i servizi di Zammad

Zammad utilizza tre servizi. Questi servizi possono essere gestiti
singolarmente o tutti insieme tramite il servizio principale **zammad**.

- zammad: include i servizi seguenti
  - **zammad-web**: server puma interno (rilevante per visualizzare la web
    app)
  - **zammad-worker**: worker in background - rilevante per tutti i job
    ritardati e in background
  - **zammad-websocket**: server websocket per informazioni relative alla
    sessione

Gestisci i servizi con i comandi `systemctl` `start`, `restart`, `stop`,
`status`.

Esempio per avviare Zammad con tutti i sotto-servizi:

```sh
sudo systemctl start zammad
```

Per fermare o riavviare un servizio o controllare il suo stato, regola il
comando come indicato sopra.

### Prossimi passi

- [Collega Zammad con
  Elasticsearch](/it/tutorials/connect-config-elasticsearch)
- [Regola le tue regole SELinux e il
  firewall](/it/tutorials/firewall-selinux)
- [Configura il server web](/it/tutorials/webserver-config)

## Dipendenze

Supponendo un sistema standard, le seguenti dipendenze verranno installate
automaticamente durante l'installazione del pacchetto Zammad. Inoltre, di
seguito sono riportate alcune informazioni su Elasticsearch, che non viene
installato automaticamente.

- imlib2
- Node.js
- PostgreSQL
- Nginx
- Redis

### Server database

Zammad memorizza i suoi contenuti in un database. Il sistema di database
supportato è [PostgreSQL](https://www.postgresql.org/){target=_blank}
versione 13 o successiva. Se non viene rilevato alcun server PostgreSQL,
verrà installato automaticamente durante l'installazione del pacchetto.

::: warning
Se utilizzi un software di pooling delle connessioni al database come PgBouncer, assicurati di utilizzare una modalità di pooling completamente compatibile con PostgreSQL. In genere, questa modalità viene chiamata "session connection pooling". Il connection pooling basato sulle transazioni non è supportato e potrebbe causare errori durante le migrazioni del database.
:::

### Reverse proxy

I seguenti reverse proxy sono supportati:

- Nginx 1.3+
- Apache 2.2+

Lo script di installazione tenta di rilevare Apache o Nginx durante
l'installazione. Se non ne trova nessuno, Nginx viene installato
automaticamente. Puoi trovare un esempio di base nella [nostra guida alla
configurazione del server web](/it/tutorials/webserver-config).

### Redis

[Redis](https://redis.io/) è necessario per la comunicazione in tempo reale
tramite WebSocket. Zammad richiede Redis 6 o versioni successive. Viene
installato automaticamente (tramite pacchetto) oppure è incluso nello stack
(Docker Compose) con una configurazione funzionante. Tuttavia,
l'installazione e la configurazione esulano dall'ambito di questa
documentazione. Si prega di seguire le guide ufficiali e di assicurarsi di
configurarlo in modo sicuro.

Le variabili d'ambiente disponibili per le configurazioni standard e
Sentinel sono brevemente menzionate nella pagina [Variabili
Redis](/it/reference/redis).

:::info
CentOS e RHEL 10 utilizzano [Valkey](https://valkey.io/) come sostituto diretto di Redis. Durante l'installazione di Zammad su queste distribuzioni, viene installato automaticamente come dipendenza.
:::

### Elasticsearch <Badge type="info" text="opzionale"/> <Badge type="danger" text="altamente consigliato"/>

Elasticsearch non viene installato automaticamente. Poiché è fondamentale
per una corretta configurazione di Zammad, è incluso nelle istruzioni di
installazione sopra riportate. Se si desidera connettere Zammad a un'istanza
di Elasticsearch già esistente, assicurarsi di utilizzare una versione
supportata e consultare il nostro [esempio di
configurazione](/it/tutorials/connect-config-elasticsearch).

Le versioni di Elasticsearch supportate sono `7.8` - `9.x`.

Cronologia versioni di Elasticsearch per Zammad:

:::details

| Zammad        | Elasticsearch  |
| ------------- | :------------- |
| 7+            | >= 7.8, <10    |
| 5.2-6.5       | >= 7.8, <9     |
| 5.0-5.1       | >= 7.8, <8     |
| 4.0-4.1       | >= 6.5, <=7.12 |
| 3.4-3.6       | >= 5.5, <=7.9  |
| 3.3           | >= 2.4, <=7.6  |
| 3.2           | >= 2.4, <=7.5  |
| 3.1           | >= 2.4, <=7.4  |
| 2.0-3.0       | >= 2.4, <=5.6  |

:::

Il plugin Elasticsearch `ingest-attachment` è richiesto per la versione 7 o
precedente per indicizzare gli allegati.

### Memcached

Zammad fa ampio ricorso alla cache per migliorare le prestazioni. Questa
cache può essere memorizzata nel file system senza dipendere da servizi
esterni. Tuttavia, ciò è possibile solo se tutti i servizi di Zammad sono in
esecuzione sullo stesso file system!

In tutti gli altri casi, come la distribuzione di Zammad tramite container
(Docker o Kubernetes) o su nodi cluster separati, è necessario un servizio
[Memcached](https://memcached.org/){target=_blank} per memorizzare la cache
e fornirla a tutte le istanze di Zammad. Gli stack Docker e Kubernetes
includono già questo servizio.

Tuttavia, anche le installazioni su file system locali possono beneficiare
dei miglioramenti prestazionali di Memcached. Potresti voler dare
un'occhiata anche alla nostra sezione [ottimizzazione delle
prestazioni](/it/reference/environment-variables#performance-tuning).

L'installazione e la configurazione non rientrano nell'ambito di questa
documentazione. Qualora fosse necessario installare Memcached manualmente,
si prega di consultare la [documentazione ufficiale di
Memcached](https://docs.memcached.org/){target=_blank}.

### GnuPG <Badge type="info" text="opzionale"/>

Se desideri utilizzare l'integrazione PGP per inviare e ricevere email
firmate e crittografate, devi installare GnuPG-Tool. Consulta il sito
ufficiale di GnuPG all'indirizzo
[https://www.gnupg.org/index.html]{target=_blank}.
