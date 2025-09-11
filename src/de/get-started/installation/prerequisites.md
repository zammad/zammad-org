---
order: 1
title: Voraussetzungen
---

# Voraussetzungen

<!--@include: @/de/modules/zammad-services-hint.md-->

## Server-Hardware

Die Hardwareanforderungen variieren je nach Szenario. Das macht es schwer,
spezifische CPU- und Speicherangaben zu nennen, die für alle Anwendungsfälle
geeignet sind. Auf jeden Fall sorgt mehr und bessere Hardware dafür, dass
Zammad reibungslos läuft und auch die Wartungspausen für Aktualisierungen
kürzer sind.

Als absolutes Minimum für die grundlegende Verwendung mit einem
PostgreSQL-Server betrachten wir:

- 2 CPU-Kerne
- 6 GB RAM (+4 GB für Elasticsearch)

Für ein Beispielszenario mit bis zu 40 Agenten könnte ein gute Basis sein:

- 6 CPU-Kerne
- 6 GB RAM (+6 GB für Elasticsearch)

## Server Software

Je nach Installationsart gibt es einige Voraussetzungen. Diese sind in den
jeweiligen Installationsanweisungen enthalten:

- [Docker](docker)
- [Kubernetes](kubernetes)
- [Paket](package)

## Anforderungen an Clients

Because Zammad is a web application, only an up-to-date browser is
needed. The following browsers are supported in their latest stable version:

- Firefox
- Chrome (and Chromium-based)
- Opera
- Safari

This does not mean that Zammad will not work with other browsers or older
versions, just that we do not test against or provide support for them.

Die Kommunikation zwischen Client und Server erfolgt über
Web-Sockets. Einige Firewalls können diese Verbindungen filtern. Dies kann
zu einer reduzierten Browserleistung führen.
