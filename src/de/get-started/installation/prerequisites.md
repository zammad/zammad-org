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

## Server-Software

Je nach Installationsart gibt es einige Voraussetzungen. Diese sind in den
jeweiligen Installationsanweisungen enthalten:

- [Paket](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Anforderungen an Clients

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

### Netzwerk

Bitte beachten Sie, dass die Kommunikation zwischen Client und Server über
WebSockets erfolgt. Einige Firewalls und Proxys filtern diese Verbindungen
möglicherweise heraus. Dies könnte zu Leistungseinbußen führen oder
Echtzeit-Aktualisierungen verhindern.

### Anzeige

Zammad passt sein Layout an unterschiedliche Bildschirmgrößen an. Für ein
optimales Erlebnis empfehlen wir die Verwendung eines Bildschirms mit
ausreichender Größe und Auflösung. Bei der Nutzung kleiner Bildschirme
blendet Zammad Elemente wie die Seitenleiste aus, um die
Benutzerfreundlichkeit zu gewährleisten. Sollten diese Maßnahmen nicht
ausreichen, erscheint oben auf dem Bildschirm eine Warnmeldung. Sie können
diese ausblenden, indem Sie auf die entsprechende Schaltfläche klicken.

Die Standard-Desktop-Oberfläche ist für Bildschirme mit einer Breite von
mindestens 640 px ausgelegt. Auf schmaleren Bildschirmen nutzen Sie bitte
die [Mobilansicht](/de/documentation/use/guides/mobile-view).
