---
order: 2
title: 'Connect and configure Elasticsearch'
---

# Connect and configure Elasticsearch

<!--@include: @/sr/modules/zammad-services-hint.md-->

This guide shows you how to connect Zammad with Elasticsearch.

## Connect Elasticsearch with Zammad

### Set the Elasticsearch URL

Set the Elasticsearch server address; adapt it to your scenario.

```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Set the Elasticsearch user and password

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```

Replace `<password>` with the one you got during the installation of Elasticsearch. In case you need to create a new
password, run `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.

```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Add certificate to Zammad

#### Add it via rails console

In case you are installing a new Zammad and didn't run through the getting
started wizard already, add the certificate via console:

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt | zammad run rails r "SSLCertificate.create!(certificate: STDIN.read)"
```

#### Add it via UI

In case you already have a running and configured Zammad, you can add the certificate in Zammad's admin settings
(_Settings > Security > SSL Certificates_) as an alternative. To show and copy the auto-generated certificate from
Elasticsearch, run:

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

To add it in Zammad, either upload the certificate file or paste the content
in the dialog. Make sure to copy/paste the delimiters (e.g. `-----BEGIN
CERTIFICATE-----`) too.

### Build/rebuild the searchindex

Without specifying CPU cores to use:

```sh
zammad run rake zammad:searchindex:rebuild
```

With specifying CPU cores to use (example 8):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Optional settings

We collected some useful settings you may want to apply. For further
information please have a look at [Elastic's
documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

### Index namespacing

Useful when connecting multiple services or Zammad instances to a single
Elasticsearch server (to prevent name collisions during indexing).

```sh
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### File-attachment indexing rules

Zammad supports searching in file attachments, which means Elasticsearch has
to index those, too. Limiting such indexing can help preserve system
resources.

Files with these extensions will not be indexed:

```sh
zammad run rails r "Setting.set('es_attachment_ignore',\
[ '.png', '.jpg', '.jpeg', '.mpeg', '.mpg', '.mov', '.bin', '.exe', '.box', '.mbox' ] )"
```

Files larger than this size (in MB) will not be indexed:

```sh
zammad run rails r "Setting.set('es_attachment_max_size_in_mb', 50)"
```

### Asciifold

By default, the [Asciifold feature of
Elasticsearch](https://www.elastic.co/docs/reference/text-analysis/analysis-asciifolding-tokenfilter){target=_blank}
is enabled. This can be useful if you deal with text which includes
diacritics and/or umlauts.

In case you need a more exact search, you can turn it off via [Rails
console](/en/reference/rails-commands#disable-asciifold).

## Решавање проблема

::: tip
Troubleshooting unsuccessful or issue not described?

If you can't solve your issue using the provided troubleshooting steps
or can't find your particular issue described here, feel free to
[ask the community](https://community.zammad.org){target=_blank} for technical
assistance.
:::

### Data missing from the web-UI / search data missing or incomplete

A commonly reported issue is data missing from the Web-UI. This could be
tickets, articles, users or anything else [indexed by
Elasticsearch](/en/reference/es-indexed-attributes)  and can be caused by
missing or incomplete indexes.

If you are experiencing this issue and installed Elasticsearch according to
our [installation guide](/en/tutorials/install-elasticsearch), please follow
these steps to make sure Elasticsearch is working correctly.

#### Step 1: Verify Elasticsearch is running

```sh
sudo systemctl status elasticsearch
```

This should output something like the following, make sure it says `Active:
active (running)`:

```sh
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-07-20 09:38:21 UTC; 1h 4min ago
   Docs: https://www.elastic.co
   Main PID: 1790 (java)
```

Otherwise, try restarting it and check again:

```sh
sudo systemctl restart elasticsearch
```

::: warning
If this fails, your Elasticsearch installation is probably broken.
Try completely purging and reinstalling Elasticsearch according to
our [installation guide](/en/tutorials/install-elasticsearch).
:::

#### Step 2: Verify Zammad can access Elasticsearch and rebuild the indexes

Force Zammad to drop and rebuild the Elasticsearch indexes, optionally with
a specified number of CPU cores to use for re-indexing (example `[8]`):

```sh
zammad run rake zammad:searchindex:rebuild[8]
```

This should start rebuilding the indexes and output its progress:

```sh
Dropping indexes... done.
Deleting pipeline... done.
Creating indexes... done.
Creating pipeline... done.
Reloading data...
   - Chat::Session...
      done in 0 seconds.
   - Cti::Log...
      done in 0 seconds.

[...]
```

Depending on the system performance and amount of data, this can take a
while to complete. Please let this task finish completely and wait until it
drops you back to the console.

If this fails or throws an error, there might be something else wrong with
your installation. Make sure you followed the complete Elasticsearch set up
and integration procedure according to our [installation
guide](/en/tutorials/install-elasticsearch).

::: tip
In many situations where you're not successful with above steps, you
may want to check Elasticsearch's log file:
`/var/log/elasticsearch/elasticsearch.log`.
:::

After completing these steps, you should have verified your Elasticsearch
installation is running and rebuilt the indexes.
