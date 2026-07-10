---
order: 5
title: 'Agentenbasierte Installation'
---

# Agentenbasierte Installation

::: danger
Beachten Sie, dass die Einrichtungsschritte für KI-Agenten keine Sicherheits-, Netzwerk- und Konfigurationsthemen abdecken (z.B. SSL-Zertifikate,
Hostnamen-Konfiguration, Elasticsearch-Einstellungen). Stattdessen geht es in diesen Schritten um eine einfache Grundeinrichtung von
Zammad. Um es in der Produktion zu verwenden, stellen Sie sicher, dass Sie es in Übereinstimmung mit den anderen Ressourcen in dieser
Dokumentation konfigurieren.
:::

Wenn Sie Zammad durch einen LLM-Agenten installieren lassen möchten,
verweisen Sie Ihren Agenten auf eine der Installationsanweisungen, die Sie
unten finden.

## Installation via Docker Compose

This file covers an installation via Docker Compose by fetching the default
[Docker Compose
repository](https://github.com/zammad/zammad-docker-compose){target=_blank}
of Zammad.

Voraussetzungen:

- Laufende Docker Compose-Umgebung
- Installiertes Git

Anweisungen:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-docker.md
```

## Installation via Paketmanager

Diese Datei umfasst eine Installation von Zammad einschließlich
Elasticsearch über den Paketmanager.

Voraussetzungen:

- Host-Betriebssystem: Ubuntu (22.04 oder 24.04) oder Debian (12 oder 13).
- `curl`, `apt-transport-https` und `gnupg` installiert.
- Eine Sprache mit UTF-8-Unterstützung.

Anweisungen:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-package.md
```
