---
title: Connect and Configure Elasticsearch
order: 2
---

# Connect and Configure Elasticsearch

## Connect Elasticsearch with Zammad

### Set the Elasticsearch URL

Set the Elasticsearch server address; adapt it to your scenario.

Elasticsearch 7 / without `https`:
```bash
zammad run rails r "Setting.set('es_url', 'http://localhost:9200')"
```
Elasticsearch 8 / with `https`:
```bash
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

### Set the Elasticsearch User and Password <Badge type="warning" text="only ES8" />

```bash
zammad run rails r "Setting.set('es_user', 'elastic')"
```
```bash
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Add Certificate to Zammad <Badge type="warning" text="only ES8" />

Show and copy the auto-generated certificate from Elasticsearch and add it to
Zammad. Make sure to copy/paste the delimiters
(e.g. `-----BEGIN CERTIFICATE-----`) too.

```bash
sudo cat /etc/elasticsearch/certs/http_ca.crt
```

Go to the admin panel of Zammad and add your copied certificate under
*Settings > Security > SSL Certificates*.

### Build/Rebuild the Searchindex

Without specifying CPU cores to use:
```bash
zammad run rake zammad:searchindex:rebuild
```
With specifying CPU core to use (example 8):
```bash
zammad run rake zammad:searchindex:rebuild[8]
```

## Optional Settings

We collected some useful settings you may want to apply. For further
information please have a look at
[Elastic's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html).

### Index Namespacing

Useful when connecting multiple services or Zammad instances to a single
Elasticsearch server (to prevent name collisions during indexing).
```bash
zammad run rails r "Setting.set('es_index', Socket.gethostname.downcase + '_zammad')"
```

### File-Attachment Indexing Rules

Zammad supports searching in file attachments, which means Elasticsearch
has to index those, too. Limiting such indexing can help preserve system
resources.


Files with these extensions will not be indexed:
```bash
zammad run rails r "Setting.set('es_attachment_ignore',\
[ '.png', '.jpg', '.jpeg', '.mpeg', '.mpg', '.mov', '.bin', '.exe', '.box', '.mbox' ] )"
```

Files larger than this size (in MB) will not be indexed:
```bash
zammad run rails r "Setting.set('es_attachment_max_size_in_mb', 50)"
```

