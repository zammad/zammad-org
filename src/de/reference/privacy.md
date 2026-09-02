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

Um die **automatische** Löschung von Tickets nach einem bestimmten Intervall zu aktivieren,
verwenden Sie die Automatisierung von Zammad. Sie können sie in Zammads Admin-Oberfläche konfigurieren unter
_Verwalten > Automatisierung_.

Um Benutzer und alle mit ihnen verbundenen Tickets **manuell** zu löschen (z.B.
auf Grund eines Lösch-Wunschs gemäß DSGVO) können Sie
die Datenschutzfunktionen im Admin-Bereich unter _System > Datenschutz_
nutzen oder [per Konsole löschen](/de/reference/rails-commands#daten-loschen).

### Chat-Sitzungen

Sobald eine Chatsitzung als **geschlossen** markiert wurde, ist sie für eine
automatische Löschung nach 12 Monaten vorgesehen. IP-Adressprotokolle für
Chatsitzungen können manuell gelöscht werden, indem Sie [diese Schritte auf
der
Rails-Befehle-Seite](/de/reference/rails-commands#protokolle-der-ip-adressen-entfernen)
ausführen.

### CTI-Anruferprotokoll

In der Anruferliste werden nur die 60 aktuellsten Einträge angezeigt. Jeder
Eintrag in der Anruferliste wird nach 12 Monaten automatisch gelöscht.

### Protokoll-Dateien

Zammad schreibt Protokolldateien auf die Festplatte (normalerweise unter
`/opt/zammad/log/`).

Bei Paket-Installationen wird ein separates Dienstprogramm namens
`logrotate` eingerichtet, das die Protokolldateien jede Nacht umbenennt und
archiviert (oder _rotiert_) und alte Protokolle nach 14 Tagen entfernt.

Bei einer Source-/Entwickler-Installation wird dringend empfohlen,
`logrotate` oder ein ähnliches Dienstprogramm zur Protokollverwaltung zu
konfigurieren; Zammad löscht alte Protokolle nicht von selbst.

### Benutzer-Sitzungen

Zammad speichert Sitzungsinformationen über jeden aktuell angemeldeten
Benutzer.

Diese Informationen werden automatisch gelöscht, wenn sich ein Benutzer abmeldet, und
können über den Admin-Bereich eingesehen oder manuell gelöscht werden (unter _System >
Sitzungen_). Benutzer können ihre eigenen Sitzungsinformationen auch über die
Benutzereinstellungen unter _Geräte_ löschen.

Zu den Sitzungsdaten gehören die IP-Adresse (und möglicherweise der
Standort), der Browser, der Zeitpunkt der ursprünglichen Anmeldung und der
Zeitpunkt des letzten Besuchs.

### Datenschutzaufgaben

Jeder Eintrag in der Liste der Datenschutzaufgaben wird nach 12 Monaten
automatisch gelöscht.

## Externe Dienste

Zammad nutzt für bestimmte Funktionen Webdienste Dritter, was bedeutet
dass Benutzerdaten gelegentlich an Dritte gesendet oder offengelegt werden können.
Diese Funktionen können im Admin-Bereich unter
_Einstellungen > System > Services_ deaktiviert werden.

::: info
Standardmäßig sind die Services von Drittanbietern, auf die Zammad zurückgreift, meist
von der Zammad Foundation selbst gehostet und verwaltet, aber Zammad
kann angepasst werden, um stattdessen mit anderen Diensten zu kommunizieren.

Der Quellcode für diese Integrationen der Drittanbieter-Services befindet
sich in unserem [Repository](https://github.com/zammad/zammad/tree/develop/lib/service){target=_blank}.
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

Als Teil seiner Service-Level-Agreement (SLA)-Funktionalität benötigt Zammad
detaillierte, lokale Kalenderinformationen (z.B. um die Zeitzone festzulegen
und nationale Feiertage und Zeitzonen zu berücksichtigen). Der
Geo-Kalendar-Dienst wird verwendet, um diese Informationen abzurufen.

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
