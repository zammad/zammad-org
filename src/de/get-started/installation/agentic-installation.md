---
order: 5
title: 'Installation durch Agent'
---

# Installation durch Agent

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

Diese Datei deckt eine Installation per Docker Compose ab, bei der [Zammads
Standard Docker Compose
Repository](https://github.com/zammad/zammad-docker-compose) abgerufen wird.

Voraussetzungen:

- Laufende Docker Compose-Umgebung
- Installiertes Git

Instructions:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-docker.md
```

## Installation via Paketmanager

Diese Datei umfasst eine Installation von Zammad einschließlich
Elasticsearch über den Paketmanager.

Voraussetzungen:

- Host-Betriebssystem: Ubuntu (22.04 oder 24.04) oder Debian (12 oder 13).
- Installed `curl`, `apt-transport-https` and `gnupg`.
- Eine Sprache mit UTF-8-Unterstützung.

Instructions:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-package.md
```
