---
order: 12
title: 'Berichte mit Grafana'
---

# Berichte mit Grafana

::: info
Diese Anleitung bezieht sich auf Grafana. Wenn Sie ein anderes Tool verwenden möchten, prüfen Sie, ob es
Elasticsearch-Indizes unterstützt. Wenn ja, dann sind Sie startklar!
:::

Grafana ist eine Analyse-/Visualisierungsanwendung eines Drittanbieters, die
Sie mit Zammad (genauer: Elasticsearch) verbinden können. Sie kann auf den
Elasticsearch-Index zugreifen und Ihre Zammad-Daten visualisieren.

Diese Anleitung bietet Ihnen einige Schritte für den Einstieg. Für einen
tieferen Einblick sollten Sie einen Blick auf die von [Elasticsearch
indizierten Attribute](/de/reference/es-indexed-attributes) werfen und die
[Dokumentation von Grafana](https://grafana.com/docs/){target=_blank} lesen.

In dieser Dokumentation wird davon ausgegangen, dass alle Anforderungen
erfüllt sind und funktionieren. Wir werden nicht auf die Kernkonfigurationen
der einzelnen Tools eingehen. Bitte beachten Sie auch, dass wir Sie bei der
Konfiguration Ihres spezifischen Drittanbieter-Tools nicht unterstützen
können.

## Voraussetzungen

Sie benötigen:

- Eine laufende Instanz von Grafana (SaaS oder selbst gehostet) in Version
  10.3 oder höher
- Lesezugriff auf Ihren Elasticsearch-Index
- Eine Zammad-Instanz in Version 4 oder höher

::: warning
Veröffentlichen Sie Ihren Elasticsearch-Index niemals, wenn Sie nicht sicher sind, was
Sie tun. Sie sollten das insbesondere **niemals** ohne Authentifizierung tun! Zammad
speichert **sehr sensible** Informationen innerhalb des Elasticsearch
Index.
:::

## Einrichten der erforderlichen Datenquellen

**Vor dem Start:** Die Datenquellen folgen immer dem gleichen Schema. Wir
haben die folgenden Informationen auf `name`, `time field name` und `index name` reduziert.
Alles andere hängt von Ihrer Umgebung ab und ist nicht Gegenstand dieser Dokumentation.

:::: tip
Ersetzen Sie `zammad_production_` durch Ihr passendes Präfix.

::: details How to query the index?
Passen Sie den folgenden Befehl an Ihre Umgebung an:

```sh
curl http://localhost:9200/_aliases?pretty=true
```

Daraufhin erhalten Sie eine Ausgabe wie die folgende:
```json
{
  "zammad_production_knowledge_base_translation" : {
    "aliases" : { }
  },
  "zammad_production_ticket_priority" : {
    "aliases" : { }
  },
  "zammad_production_stats_store" : {
    "aliases" : { }
  },
  "zammad_production_organization" : {
    "aliases" : { }
  },
  "zammad_production_cti_log" : {
    "aliases" : { }
  },
  "zammad_production_group" : {
    "aliases" : { }
  },
  "zammad_production_knowledge_base_answer_translation" : {
    "aliases" : { }
  },
  "zammad_production_ticket" : {
    "aliases" : { }
  },
  "zammad_production_ticket_state" : {
    "aliases" : { }
  },
  "zammad_production_chat_session" : {
    "aliases" : { }
  },
  "zammad_production_user" : {
    "aliases" : { }
  },
  "zammad_production_knowledge_base_category_translation" : {
    "aliases" : { }
  }
}
```

:::
::::

### ES - Chat-Sitzungen

- Indexname: `zammad_production_chat_session`
- Zeitfeldname: `created_at`

### ES - CTI-Protokoll

- Indexname: `zammad_production_cti_log`
- Zeitfeldname: `start_at`

### ES - Ticket Artikel

- Indexname: `zammad_production_ticket`
- Zeitfeldname: `article.created_at`

### ES - Tickets closed_at

- Indexname: `zammad_production_ticket`
- Zeitfeldname: `close_at`

### ES - Tickets created_at

- Indexname: `zammad_production_ticket`
- Zeitfeldname: `created_at`

### ES - Tickets first_response_at

- Indexname: `zammad_production_ticket`
- Zeitfeldname: `first_response_at`

Mit den oben genannten Datenquellen haben Sie im Grunde alles, was Sie
brauchen, um mit der Erstellung Ihrer eigenen Dashboards zu beginnen.

## Schnellstart mit Dashboard-Vorlage

Wenn Sie sich inspirieren lassen möchten, können Sie unsere unten
aufgeführten Beispiel-Dashboards verwenden. Diese Dashboards sind auch auf
[GitHub](https://github.com/zammad/grafana-dashboards){target=_blank} zu
finden.

### Importieren eines Dashboards

Wählen Sie in Grafana _➕ > Import_ (oder eine andere Stelle, die Ihnen den Import
eines Dashboards erlaubt) und laden Sie entweder die json-Datei hoch, die Sie
von Github heruntergeladen haben, oder verwenden Sie die grafana.com ID, die als Badge
wie <Badge type="tip" text="12345"/> den Überschriften der nächsten Abschnitte angehängt ist.

Während des Imports können Sie einen Dashboard-Namen und einen Ordner
angeben. Sie werden auch aufgefordert, die Datenquellen Ihrer Umgebung
zuzuordnen. Wenn Sie unsere Datenquellennamen oben verwendet haben, können
Sie einfach nach demselben Namen suchen.

### Ticket-Statistik Dashboard <Badge type="tip" text="14222"/>

![Grafana Ticket Dashboard](/screenshots/reporting/tickets.png)

#### Dashboard-Grafiken

- Ticket öffnen und schließen[^1]
- Erstellte Artikel
- Ticket SLA (in Zeit _und_ Verletzung) pro Typ[^1][^2]

#### Ticket und Artikel Meta-Informationen

- Verteilung der Tickets nach Gruppe
- Absenderverhältnis (z.B. Kunde / Agent)[^3]
- Verhältnis der Artikelarten (z.B. E-Mail, Telefon)[^3]
- Typ des Artikelinhalts
- Eskalationsquoten[^1]
- Durchschnittliche Erstreaktion, Aktualisierungszeit und Schließzeit[^2]
- Top 10 von:
  - Organisation des Ticket-Kunden[^1]
  - Ticket-Kunden[^1]
  - Besitzer von Tickets[^1]
  - Durchschnittlich erfasste Zeit auf dem Ticket
  - Ticket-Tags[^1]
- die letzten 10 eskalierten Tickets

#### Erforderliche Datenquellen

- `ES - Ticket Articles`
- `ES - Tickets by created_at`
- `ES - Tickets by closed_at`

### Chat-Sitzungsstatistik Dashboard <Badge type="tip" text="14224"/>

![Grafana Chat Dashboard](/screenshots/reporting/chat-sessions.png)

#### Dashboard-Grafiken

Erstellung von Chatsitzungen.

#### Meta-Informationen zur Chat-Sitzung

- Top 10 von:
  - Chat-Tags
  - Chat-Agenten
  - Chat-Exit-Seiten
  - Verteilung über Städte
- Verhältnis Chat-Themen
- Durchschnittliche Anzahl von Nachrichten innerhalb von Chat-Sitzungen
- Durchschnittliche Chatdauer
- Weltkarte mit Chat-Ursprungsländern

#### Erforderliche Datenquellen

- `ES - Chat Sessions`

### CTI-Log Statistik Dashboard <Badge type="tip" text="14223"/>

![Grafana Call Dashboard](/screenshots/reporting/calls.png)

#### Dashboard-Grafiken

Anzahl der Anrufe pro Richtung (ein-/ausgehend).

#### Meta-Informationen zur Chat-Sitzung

- Gesprächsverhältnis (ein-/ausgehend)
- Durchschnittliche Wartezeit
- Durchschnittliche Gesprächsdauer
- Top 10 von:
  - Anrufer (eingehend)
  - Abnehmer der Anrufe (eingehend)

#### Erforderliche Datenquellen

- `ES - CTI Log`

[^1]: Einige Werte sind nicht als Zeitreiheninformation verfügbar. Das
    means we can only display the _last_ value of the field in question.

[^2]: Erfordert, dass die SLA-Funktion aktiv ist. Negative Werte bedeuten SLA
    Verletzung.

[^3]: Spezifische Referenz-IDs sind nicht bei jeder Instanz gleich und daher
    funktioniert der Bereich möglicherweise nicht oder zeigt falsche Daten an. Prüfen Sie in der Panel-Beschreibung,
    wie Sie die Beziehungen auf Ihrem System herausfinden können.
