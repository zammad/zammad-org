---
order: 1
title: Prerequisiti
---

# Prerequisiti

<!--@include: @/en/modules/zammad-services-hint.md-->

## Server hardware

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

## Server software

A seconda del tipo di installazione, ci sono alcuni prerequisiti. Sono
inclusi nelle pagine seguenti:

- [Pacchetto](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Client requirements

### Browser

Poiché Zammad è un'applicazione web, è necessario solo un browser
aggiornato. I seguenti browser sono supportati:

- Firefox
- Chrome (e basati su Chromium)
- Opera
- Safari

Questo non significa che Zammad non funzioni con altri browser o versioni
più vecchie, solo che non sono ufficialmente supportati.

### Network

Be aware that communication between client and server uses WebSockets. Some
firewalls and proxies may filter these connections. This could reduce
performance or prevent real-time updates.

### Display

Zammad adapts its layout to different screen sizes. For the best experience,
we recommend using a display with sufficient screen size and
resolution. When using small screens, Zammad collapses elements like the
sidebar to maintain usability. If these measures are not sufficient, a toast
warning shows up at the top of the screen. You can hide it by clicking the
corresponding button.

The standard desktop interface is intended for screens at least 640 px
wide. On narrower screens, use the [mobile
view](/en/documentation/use/guides/mobile-view).
