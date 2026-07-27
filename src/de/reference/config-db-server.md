---
order: 6
title: 'Configure database server'
---

# Configure database server

Diese Seite soll nur die für Zammad relevanten Teile beleuchten und ist
nicht als vollständige Anleitung gedacht. Sie ist nur dann für Sie relevant,
wenn Sie einen bestehenden PostgreSQL-Server betreiben und die Datenbank von
Zammad auch darin laufen lassen wollen.

::: warning
Wenn Sie Software für das Pooling von Datenbankverbindungen wie PgBouncer verwenden, stellen Sie sicher, dass Sie
einen Pooling-Modus verwenden, der vollständig mit PostgreSQL kompatibel ist. Typischerweise wird dies
"session connection pooling" genannt. Transaktionsbasiertes connection pooling wird
nicht unterstützt und kann bei Datenbankmigrationen zu Fehlern führen.
:::

Nachfolgend finden Sie die Speicherorte der relevanten
PostgreSQL-Konfigurationsdateien, die Sie anpassen können. Denken Sie daran,
dass die Versionen von Ihrem Setup abweichen können - passen Sie sie bei
Bedarf an.

::: tabs

=== Debian & Ubuntu

```ansi
/etc/postgresql/{your version}/main/postgresql.conf
```

=== CentOS & OpenSUSE

```ansi
/var/lib/pgsql/data/postgresql.conf
```

=== Andere

Sie können Ihre Konfigurationsdateien nicht finden? Ermitteln Sie den Pfad mit folgendem Befehl:

``` sh
$ sudo -u postgres psql -c 'SHOW config_file'
```

:::

## Adjust pool size

In der Datei `database.yml` (Verzeichnis `config/`) können Sie die zulässige
Poolgröße festlegen. Standardmäßig nimmt jeder Zammad-Prozess bis zu `50`
Verbindungen auf (`Pool: 50`).

Dies sollte für _jeden_ Anwendungsfall ausreichend sein. Wenn Sie Timeouts
bei der Datenbankverbindung oder Pool-Fehler feststellen, deutet dies in der
Regel auf andere Probleme Ihres PostgreSQL-Servers hin.

## Anpassen von `max_connections` (erforderlich)

Zammad verwendet standardmäßig bis zu 200 Verbindungen. Abhängig von Ihrer
Umgebung und Auslastung möchten Sie diesen Wert eventuell ändern.

### Determine value

Um Ihnen bei der Ermittlung eines Wertes zu helfen, bietet Zammad eine
Funktion zur Berechnung eines Vorschlags. Wenn sie ausgeführt wird, fordert
sie Sie auf, ein paar ganzzahlige Werte einzugeben und verwendet zusätzlich
intern bekannte Werte für die Berechnung. Beachten Sie, dass der Vorschlag
instanzspezifisch ist. Das bedeutet, dass Sie die Berechnung auf dem System
durchführen müssen, auf dem Sie den `max_connection`-Wert anpassen wollen.

Führen Sie sie mit dem Befehl aus:

``` sh
rake zammad:db:max_connections
```

### Adjust value

Erhöhen Sie die maximal zulässige Anzahl von Verbindungen:

``` sh
sed -i "/max_connections/c\max_connections = 2000" <postgresql-configuration-file>
```

Wenden Sie die Änderungen an, indem Sie PostgreSQL und Zammad neu starten
(in dieser Reihenfolge):

```sh
sudo systemctl restart postgresql zammad
```

## PostgreSQL für größere Instanzen anpassen (optional)

::: warning
Überprüfen Sie zunächst die folgenden Einstellungen und stellen Sie sicher, dass Ihr System die
Anforderung erfüllt! Die folgenden Einstellungen haben wir als nützlich erachtet,
alles andere sprengt den Rahmen dieser Dokumentation!
:::

Einige Verbesserungen beim Caching:

``` sh
sed -i "/shared_buffers/c\shared_buffers = 2GB" <postgresql-configuration-file>
```

```sh
sed -i "/temp_buffers/c\temp_buffers = 256MB" <postgresql-configuration-file>
```

```sh
sed -i "/work_mem/c\work_mem = 10MB" <postgresql-configuration-file>
```

```sh
sed -i "/max_stack_depth/c\max_stack_depth = 5MB" <postgresql-configuration-file>
```

Wenden Sie die Änderungen an, indem Sie PostgreSQL und Zammad neu starten
(in dieser Reihenfolge):

```sh
sudo systemctl restart postgresql zammad
```
