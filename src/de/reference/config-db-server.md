---
order: 8
title: 'Configure Database Server'
---

# Configure Database Server

This page should only enlighten the relevant parts for Zammad and is not
meant to be a complete guide. It is only relevant for you if you are running
an existing PostgreSQL server and want to run Zammad's database there as
well.

::: warning
Wenn Sie Software für das Pooling von Datenbankverbindungen wie PgBouncer verwenden, stellen Sie sicher, dass Sie
einen Pooling-Modus verwenden, der vollständig mit PostgreSQL kompatibel ist. Typischerweise wird dies
"session connection pooling" genannt. Transaktionsbasiertes connection pooling wird
nicht unterstützt und kann bei Datenbankmigrationen zu Fehlern führen.
:::

Below you can the locations of the relevant PostgreSQL configuration files
to adjust. Keep in mind that versions may differ from your setup - adapt
where needed.

::: tabs

=== Debian & Ubuntu

```sh
/etc/postgresql/{your version}/main/postgresql.conf
```

=== CentOS & OpenSUSE

```
/var/lib/pgsql/data/postgresql.conf
```

=== Others

Can't find your configuration files? You can run the following command
to get the path:

``` sh
$ sudo -u postgres psql -c 'SHOW config_file'
```
:::

## Adjust Pool Size

Within `database.yml` (`config/` directory) you can define the allowed pool
size. By default each Zammad process takes up to `50` connections (`pool:
50`).

This should be fairly enough for *every* use case. If you experience
database connection timeouts or similar pool errors, this usually indicates
to other issues that are relevant to your PostgreSQL.


## Adjust `max_connections` (mandatory)
Zammad will take up to 200 connections by default, with below command you
can raise this limit fairly high.

Raise maximum allowed number of connections:
``` sh
sed -i "/max_connections/c\max_connections = 2000" <postgresql-configuration-file>
```
Apply changes by restarting postgresql and Zammad (in this order):
```sh
systemctl restart postgresql zammad
```

## Adjust PostgreSQL for bigger instances (optional)

::: warning
Check below settings first and ensure your system is able to provide
the requirements! Below settings are what we found to be useful,
everything else is out of scope of this documentation!
:::

Some caching improvements:
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

Apply changes by restarting postgresql and Zammad (in this order):
```sh
systemctl restart postgresql zammad
```
