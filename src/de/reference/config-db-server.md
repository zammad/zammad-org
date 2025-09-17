---
order: 8
title: 'Datenbank-Server konfigurieren'
---

# Datenbank-Server konfigurieren

Diese Seite soll nur die für Zammad relevanten Teile beleuchten und ist
nicht als vollständige Anleitung gedacht. Sie ist nur dann für Sie relevant,
wenn Sie einen bestehenden PostgreSQL-Server betreiben und die Datenbank von
Zammad auch darin laufen lassen wollen.

::: warning
If you use database connection pooling software like PgBouncer, make sure to use a pooling mode that is fully
compatible with PostgreSQL. Typically this is called "session connection pooling". Transaction-based connection pooling
is not supported and may lead to errors during database migrations.
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

=== Others

Can't find your configuration files? You can run the following command to get the path:

``` sh
sudo -u postgres psql -c 'SHOW config_file'
```

:::

## Poolgröße anpassen

In der Datei `database.yml` (Verzeichnis `config/`) können Sie die zulässige
Poolgröße festlegen. Standardmäßig nimmt jeder Zammad-Prozess bis zu `50`
Verbindungen auf (`Pool: 50`).

Dies sollte für _jeden_ Anwendungsfall ausreichend sein. Wenn Sie Timeouts
bei der Datenbankverbindung oder Pool-Fehler feststellen, deutet dies in der
Regel auf andere Probleme Ihres PostgreSQL-Servers hin.

## Anpassen von `max_connections` (erforderlich)

Zammad uses up to 200 connections by default. Depending on your setup and
load, you may want to change this value.

### Determine Value

To help you determine a number, Zammad ships a function to calculate a
suggestion. If executed, it asks you to input some integer values and
additionally uses internally known values for the calculation. Be aware that
the suggestion is instance specific. That means you must run the calculation
on the system you want to adjust the `max_connection` value.

Run it by using the command:

``` sh
rake zammad:db:max_connections
```

### Adjust Value

Erhöhen Sie die maximal zulässige Anzahl von Verbindungen:

``` sh
sed -i "/max_connections/c\max_connections = 2000" <postgresql-configuration-file>
```

Wenden Sie die Änderungen an, indem Sie postgresql und Zammad neu starten
(in dieser Reihenfolge):

```sh
sudo systemctl restart postgresql zammad
```

## PostgreSQL für größere Instanzen anpassen (optional)

::: warning
Check below settings first and ensure your system is able to provide the requirements! Below settings are what we found
to be useful, everything else is out of scope of this documentation!
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

Wenden Sie die Änderungen an, indem Sie postgresql und Zammad neu starten
(in dieser Reihenfolge):

```sh
sudo systemctl restart postgresql zammad
```
