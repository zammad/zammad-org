---
order: 99
title: 'Datenspeicherung und externe Dienste'
---

# Datenspeicherung und externe Dienste

Wie lange speichert Zammad Benutzerdaten? Wie kann ich die Speicherung von
Benutzerdaten verwalten? Zu welchen Diensten verbindet sich Zammad?

## Speicherung von Daten

Die folgenden Daten werden lokal auf dem Produktivsystem gespeichert:

### Tickets und Benutzer

Standardmäßig löscht Zammad niemals automatisch Tickets oder Benutzer.

To enable **automatic** deletion of tickets after a given interval,
use Zammad's scheduler. You can configure it in Zammad's admin interface under
_Manage > Scheduler_.

To **manually** delete users and all their associated tickets (e.g. in
compliance with a "Right to Forget" request under the GDPR), you can use
the data privacy functions in the admin panel under _System > Data Privacy_
or [use the console](/en/reference/console#deleting-records).

### Chat-Sitzungen

Sobald eine Chatsitzung als **geschlossen** markiert wurde, wird sie 12
Monate später automatisch gelöscht.

IP-Adressen aus Chatsitzungen können manuell gelöscht werden, indem Sie die
Schritte im [Abschnitt Chat](/de/reference/console#remove-ip-address-logs)
per Konsole ausführen.

### CTI-Anruferprotokoll

In der Anruferliste werden nur die 60 aktuellsten Einträge angezeigt. Jeder
Eintrag in der Anruferliste wird nach 12 Monaten automatisch gelöscht.

### Protokoll-Dateien

Zammad schreibt Protokolldateien auf die Festplatte (normalerweise unter
`/opt/zammad/log/`).

Package installations will set up a separate system utility called
`logrotate` to rename and archive (or _rotate_) log files on a nightly basis
and remove old logs after 14 days.

Bei einer Source-/Entwickler-Installation wird dringend empfohlen,
`logrotate` oder ein ähnliches Dienstprogramm zur Protokollverwaltung zu
konfigurieren; Zammad löscht alte Protokolle nicht von selbst.

### Benutzer-Sitzungen

Zammad speichert Sitzungsinformationen über jeden aktuell angemeldeten
Benutzer.

This information is automatically purged when a user logs out, and can
be viewed or manually deleted via the admin panel (under _System >
Sessions_). Users may also delete their own session information via the
user preferences menu, under _Devices_.

Zu den Sitzungsdaten gehören die IP-Adresse (und möglicherweise der
Standort), der Browser, der Zeitpunkt der ursprünglichen Anmeldung und der
Zeitpunkt des letzten Besuchs.

### Datenschutzaufgaben

Jeder Eintrag in der Liste der Datenschutzaufgaben wird nach 12 Monaten
automatisch gelöscht.

## Externe Dienste

Zammad utilizes third-party web services for certain functions, meaning
that user data may occasionally be sent or exposed to third parties.
These functions can be individually disabled in the admin panel under
_Settings > System > Services_.

::: info
Standardmäßig sind die Services von Drittanbietern, auf die Zammad zurückgreift, meist
von der Zammad Foundation selbst gehostet und verwaltet, aber Zammad
kann angepasst werden, um stattdessen mit anderen Diensten zu kommunizieren.

Der Quellcode für diese Integrationen von Drittanbieter-Services befindet
sich unter
[hier](https://github.com/zammad/zammad/tree/develop/lib/service){target=_blank}.
:::

### Bilder

Auf images.zammad.com werden keine privaten Bilder oder persönlich
identifizierende Informationen gespeichert.

Der Bilderdienst speichert öffentlich verfügbare Bilder aus Quellen wie
Gravatar und stellt sie der Zammad-Anwendung als Benutzeravatare und
Organisationslogos zur Verfügung. Diese Bilder werden anhand von MD5-Hashes
der E-Mail-Adressen von Benutzern und der Domänennamen von Organisationen
ermittelt. Benutzer-Avatare werden 7 Tage lang zwischengespeichert; Logos
von Organisationen werden 30 Tage lang zwischengespeichert.

### Geo-Kalendar

Es werden keine Benutzerinformationen auf geo.zammad.com gespeichert oder
zwischengespeichert.

As part of its service-level agreement (SLA) functionality, Zammad requires
detailed, localized calendar information (_e.g.,_ to set the time zone and
accommodate national holidays and daylight savings time).  The GeoCalendar
service is used to retrieve this information.

### Geo-IP

Es werden keine Benutzerinformationen auf geo.zammad.com gespeichert oder
zwischengespeichert.

Eine der Sicherheitsfunktionen von Zammad besteht darin, Benutzersitzungen
auf der Grundlage des Browsers und des Herkunftslandes des Benutzers zu
speichern. Verdächtige Login-Aktivitäten von einem anderen Browser oder Land
aus können Zammad dazu veranlassen, eine Warn-E-Mail an den betroffenen
Benutzer zu senden. Der Geo-IP-Dienst wird verwendet, um IP-Adressen einem
geografischen Gebiet zuzuordnen.

### Geo-Lokalisierung

Der Geo-Lokalisierungsdienst von Zammad stützt sich auf OpenStreetMap (OSM),
es sei denn, Sie haben es ausgeschaltet. Wenn Sie eine Adresse (oder Teile
einer Adresse) in einem Benutzerobjekt angeben, werden die Koordinaten von
OSM in der Datenbank von Zammad gespeichert. Weitere Informationen finden
Sie in den [Datenschutzbestimmungen von
OSM](https://osmfoundation.org/wiki/Privacy_Policy){target=_blank}.
