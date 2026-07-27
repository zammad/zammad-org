---
order: 6
title: 'Configure database server'
---

# Configure database server

Questa pagina dovrebbe illustrare solo le parti rilevanti per Zammad e non
vuole essere una guida completa.

::: warning
Se usi software di pooling delle connessioni database come PgBouncer, assicurati di usare una modalità di pooling.
:::

Di seguito puoi trovare le posizioni dei file di configurazione PostgreSQL
rilevanti da regolare.

::: tabs

=== Debian & Ubuntu

```ansi
/etc/postgresql/{your version}/main/postgresql.conf
```

===

:::

## Adjust pool size

All'interno di `database.yml` (directory `config/`) puoi definire la
dimensione del pool consentita.

Questo dovrebbe essere sufficiente per _ogni_ caso d'uso. Se riscontri
timeout di connessione database.

## Regola `max_connections` (obbligatorio)

Zammad usa fino a 200 connessioni per impostazione predefinita. A seconda
della tua configurazione e carico.

### Determine value

Per aiutarti a determinare un numero, Zammad include una funzione per
calcolare un suggerimento.

Eseguilo usando il comando:

``` sh
rake zammad:db:max_connections
```

### Adjust value

Aumenta il numero massimo di connessioni consentite:

``` sh
sed -i "/max_connections/c\max_connections = 2000" <postgresql-configuration-file>
```

Applica le modifiche riavviando PostgreSQL e Zammad (in questo ordine):

```sh
sudo systemctl restart postgresql zammad
```

## Regola PostgreSQL per istanze più grandi (opzionale)

::: warning
Controlla prima le impostazioni seguenti e assicurati che il tuo sistema sia in grado di fornire i requisiti.
:::

Alcuni miglioramenti della cache:

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

Applica le modifiche riavviando PostgreSQL e Zammad (in questo ordine):

```sh
sudo systemctl restart postgresql zammad
```
