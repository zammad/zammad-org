---
order: 1
title: 'Installa Elasticsearch 9'
---

# Installa Elasticsearch 9

<!--@include: @/en/modules/zammad-services-hint.md-->

Questa guida mostra una semplice installazione standard di Elasticsearch
9. L’intenzione è quella di permetterti di iniziare rapidamente. Tuttavia,
nel caso tu abbia bisogno di una configurazione più avanzata o riscontri
problemi, dai un’occhiata alla [documentazione ufficiale di installazione di
Elasticsearch](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch){target=_blank}.
Adattala dove necessario nel caso il tuo caso d’uso sia diverso.

## Installazione

### Add repository key

::: tabs key:distros

=== Ubuntu/Debian

``` sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch |

:::

### Add repository

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

::: tip
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
reference](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference){target=_blank}.

## Start and enable Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

## Next steps

Procedi con l’[installazione di
Zammad](/en/get-started/installation/package#add-zammad-repository). Dopo
che l'installazione di Zammad è stata completata, puoi [collegare Zammad con
Elasticsearch](/en/tutorials/connect-config-elasticsearch).
