---
title: Connect and Configure Elasticsearch
order: 2
---

# Connect and Configure Elasticsearch

<!--@include: @/en/modules/zammad-services-hint.md-->

## Connect Elasticsearch with Zammad

### Set the Elasticsearch URL

Set the Elasticsearch server address; adapt it to your scenario.

Elasticsearch 7 / without `https`:
```sh
zammad run rails r "Setting.set('es_url', 'http://localhost:9200')"
```
Elasticsearch 8 / with `https`:
```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Set the Elasticsearch User and Password <Badge type="warning" text="only ES8" />

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```
```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Add Certificate to Zammad <Badge type="warning" text="only ES8" />

Show and copy the auto-generated certificate from Elasticsearch and add it to
Zammad. Make sure to copy/paste the delimiters
(e.g. `-----BEGIN CERTIFICATE-----`) too.

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

Go to the admin panel of Zammad and add your copied certificate under
*Settings > Security > SSL Certificates*.

### Build/Rebuild the Searchindex

Without specifying CPU cores to use:
```sh
zammad run rake zammad:searchindex:rebuild
```
With specifying CPU core to use (example 8):
```sh
zammad run rake zammad:searchindex:rebuild[8]
```

## Optional Settings

We collected some useful settings you may want to apply. For further
information please have a look at
[Elastic's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){target=_blank}.

### Index Namespacing

Useful when connecting multiple services or Zammad instances to a single
Elasticsearch server (to prevent name collisions during indexing).
```sh
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### File-Attachment Indexing Rules

Zammad supports searching in file attachments, which means Elasticsearch
has to index those, too. Limiting such indexing can help preserve system
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

## Troubleshooting

:::tip
Troubleshooting unsuccessful or issue not described?

If you can't solve your issue using the provided troubleshooting steps
or can't find your particular issue described here, feel free to
[ask the community](https://community.zammad.org){target=_blank} for technical
assistance.
:::

### Data Missing From the Web-UI / Search Data Missing or Incomplete

A commonly reported issue is data missing from the Web-UI. This could be
tickets, articles, users or anything else
[indexed by Elasticsearch](/en/reference/es-indexed-attributes)
and can be caused by missing or incomplete indexes.

If you are experiencing this issue and installed Elasticsearch according
to our [installation guide](/en/tutorials/install-elasticsearch), please follow
these steps to make sure Elasticsearch is working correctly.

#### Step 1: Verify Elasticsearch is Running

```sh
systemctl status elasticsearch
```

This should output something like the following, make sure it says
`Active: active (running)`:

```sh
● elasticsearch.service - Elasticsearch
   Loaded: loaded (/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-07-20 09:38:21 UTC; 1h 4min ago
   Docs: https://www.elastic.co
   Main PID: 1790 (java)
```

Otherwise, try restarting it and check again:

```sh
systemctl restart elasticsearch
```

::: warning
If this fails, your Elasticsearch installation is probably broken.
Try completely purging and reinstalling Elasticsearch according to
our [installation guide](/en/tutorials/install-elasticsearch).
:::

#### Step 2: Verify the Ingest-Attachment Plugin is Installed Correctly <Badge type="warning" text="only ES7" />

List installed elasticsearch plugins:
```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin list
```

The output should include `ingest-attachment`.

Otherwise, try reinstalling the `ingest-attachment` plugin and check
again:

```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin remove ingest-attachment
```
```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-attachment
```
```sh
systemctl restart elasticsearch
```
```sh
/usr/share/elasticsearch/bin/elasticsearch-plugin list
```

#### Step 3: Verify Zammad can Access Elasticsearch and Rebuild the Indexes

Force Zammad to drop and rebuild the elasticsearch indexes, optionally
with a specified number of CPU cores to use for re-indexing (example `[8]`):

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
Depending on the system performance and amount of data, this can take
a while to complete. Please let this task finish completely and wait
until it drops you back to the console.

If this fails or throws an error, there might be something else wrong
with your installation. Make sure you followed the complete
Elasticsearch set up and integration procedure according to
our [installation guide](/en/tutorials/install-elasticsearch).

::: tip
In many situations where you're not successful with above steps, you
may want to check Elasticsearch's log file:
`/var/log/elasticsearch/elasticsearch.log`.
:::

After completing these steps, you should have verified your
Elasticsearch installation is running and rebuilt the indexes.