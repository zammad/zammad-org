---
order: 1
title: 'Installa Elasticsearch 9'
---

# Installa Elasticsearch 9

<!--@include: @/en/modules/zammad-services-hint.md-->

This guide shows a simple standard installation of Elasticsearch 9. The
intention is to get you up and running quickly.  However, in case you need a
more advanced configuration or face any issues, have a look at the [official
Elasticsearch installation
documentation](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch){target=_blank}.
Adapt it wherever needed in case your use-case differs.

## Installazione

### Aggiungi chiave del repository

::: tabs key:distros

=== Ubuntu/Debian

``` sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch |

:::

### Aggiungi repository

::: tabs key:distros

=== Ubuntu/Debian

``` sh
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.

:::

### Installa Elasticsearch

::: tabs key:distros

=== Ubuntu/Debian

``` sh
sudo apt update && sudo apt install elasticsearch
```

=== Open

:::

:::tip
Assicurati di controllare l'output e copiare la password del superuser integrato. Altrimenti.
:::

## Configurazione

Opzionalmente, controlla e configura il file di configurazione di
Elasticsearch che trovi sotto.

Consigliamo di regolare la dimensione massima del contesto che dovrebbe
essere indicizzata da Elasticsearch.

```yml
http.max_content_length: 400mb
```

Additional configuration is out of scope of this documentation. In case your
scenario needs additional configuration, have a look at [Elastic’s
configuration
reference](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference).

## Avvia e abilita Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

## Prossimi passi

Go on with the [installation of
Zammad](/en/get-started/installation/package#add-zammad-repository). After
the installation of Zammad is completed, you can [connect Zammad with
Elasticsearch](/en/tutorials/connect-config-elasticsearch).
