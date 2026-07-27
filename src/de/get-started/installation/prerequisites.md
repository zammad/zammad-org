---
order: 1
title: Voraussetzungen
---

# Voraussetzungen

<!--@include: @/de/modules/zammad-services-hint.md-->

## Server hardware

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

## Server software

Je nach Installationsart gibt es einige Voraussetzungen. Diese sind in den
jeweiligen Installationsanweisungen enthalten:

- [Paket](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Client requirements

### Browser

Da Zammad eine Webanwendung ist, wird nur ein aktueller Browser
benötigt. Die folgenden Browser werden in der jeweils neuesten stabilen
Version unterstützt:

- Firefox
- Chrome (und Chromium-basiert)
- Opera
- Safari

Das bedeutet nicht, dass Zammad mit anderen Browsern oder älteren Versionen
nicht funktioniert, sondern nur, dass wir sie nicht testen und supporten.

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
