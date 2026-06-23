---
order: 1
title: Prerequisiti
---

# Prerequisiti

<!--@include: @/en/modules/zammad-services-hint.md-->

## Hardware server

I requisiti hardware variano a seconda dello scenario. Questo rende
difficile fornire un'indicazione generale.

Come minimo assoluto per l'uso di base con un server PostgreSQL,
consideriamo:

- 2 core CPU
- 6 GB di RAM (+4 GB per Elasticsearch)

Per uno scenario di esempio con fino a 40 agenti, un buon punto di partenza
potrebbe essere:

- 6 core CPU
- 6 GB di RAM (+6 GB per Elasticsearch)

## Software server

A seconda del tipo di installazione, ci sono alcuni prerequisiti. Sono
inclusi nelle pagine seguenti:

- [Pacchetto](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Requisiti client

Poiché Zammad è un'applicazione web, è necessario solo un browser
aggiornato. I seguenti browser sono supportati:

- Firefox
- Chrome (e basati su Chromium)
- Opera
- Safari

Questo non significa che Zammad non funzioni con altri browser o versioni
più vecchie, solo che non sono ufficialmente supportati.

La comunicazione tra client e server si basa su web socket. Alcuni firewall
potrebbero bloccare questo traffico.
