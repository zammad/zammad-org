---
order: 9
title: Speicherzuweisung
---

# Speicherzuweisung

Bei der Paketinstallation wird
[jemalloc](https://jemalloc.net/){target=_blank} gemäß der Empfehlung von
Rails zur Speicherzuweisung für alle Zammad-Ruby-Prozesse verwendet. Dies
reduziert den Speicherverbrauch und die Fragmentierung. Das
Paket-Postinstallationsskript lädt die jemalloc-Bibliothek automatisch vor,
sofern sie auf Ihrem System vorhanden ist. Dies geschieht bei jeder
Paketinstallation und jedem Upgrade.

Bei Docker-Installationen ist jemalloc standardmäßig aktiviert (im Image
integriert). Um dies zu deaktivieren, setzen Sie die Umgebungsvariable auf
einen leeren Wert (z.B. `LD_PRELOAD=""` in Ihrer Compose- oder env-Datei).

## Verfügbarkeit

- Debian und Ubuntu: libjemalloc2 wird automatisch als Paketabhängigkeit
  installiert.
- CentOS und RHEL: jemalloc wird automatisch aus der EPEL-Paketquelle
  installiert (bereits eine Abhängigkeit von Zammad).
- SLES: jemalloc wird **nicht** automatisch installiert (verfügbar über den
  SUSE Package Hub oder SLE-Module). Wenn Sie es manuell über `zypper
  install jemalloc` installieren, aktiviert Zammad es automatisch bei der
  nächsten Paketinstallation oder -aktualisierung.

## Aktivierung und Deaktivierung

So deaktivieren Sie die Verwendung von jemalloc:

```sh
zammad config:set ZAMMAD_USE_JEMALLOC=no
```

Die Änderung tritt bei der nächsten Paketinstallation oder -aktualisierung
in Kraft. Das Postinstallationsskript entfernt anschließend die
`LD_PRELOAD`-Variable vollständig; ein bereits vorhandener Systemwert wird
beibehalten. Zur sofortigen Umstellung:

```sh
zammad config:unset LD_PRELOAD
```

```sh
sudo systemctl restart zammad
```

Um die Funktion wieder zu aktivieren, setzen Sie die Variable erneut zurück
(jeder Wert außer `no` aktiviert jemalloc bei der nächsten Paketinstallation
oder -aktualisierung wieder):

```sh
zammad config:unset ZAMMAD_USE_JEMALLOC
```

Um zu überprüfen, ob jemalloc aktiv ist, führen Sie folgenden Befehl aus:

```sh
zammad run ruby -e 'puts File.read("/proc/self/maps").match?(/jemalloc/) ? "jemalloc active" : "jemalloc NOT active"'
```
