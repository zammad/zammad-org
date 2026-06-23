---
order: 1
title: 'Installa Elasticsearch 9'
---

# Installa Elasticsearch 9

<!--@include: @/en/modules/zammad-services-hint.md-->

Questa guida mostra una semplice installazione standard di Elasticsearch
9. L'intenzione è di farti.

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

Una configurazione aggiuntiva esula dall'ambito di questa
documentazione. Nel caso il tuo scenario richieda.

## Avvia e abilita Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

## Prossimi passi

Go on with the [installation of
Zammad](/en/get-started/installation/package#add-zammad-repository). After
the installation of Zammad is completed, you can [connect Zammad with
Elasticsearch](/en/tutorials/connect-config-elasticsearch).
