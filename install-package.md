# Zammad Installation

> Documentation and setup instructions for Zammad.

I want you to install Zammad for me. Execute all the steps below autonomously.

OBJECTIVE: Install Zammad.

DONE WHEN: Zammad is running and accessible via web browser under hostname or IP address.

## Prerequisites

- Host operating system: Ubuntu (22.04 or 24.04) or Debian (12 or 13).
- Installed curl, apt-transport-https and gnupg.
- A locale with UTF-8 support.
- At least 4 GB of RAM.

## High-Level Steps

1. Install Elasticsearch
2. Install Zammad
3. Configure Zammad
4. Run Zammad and check if installation was successful

## Agentic Guidance

- Present a concrete step plan, required privileges, and a rollback plan; request confirmation before applying changes.
- After each major step, verify outcome and report success/failure.

## TODO

### Add Elasticsearch Repository Key

```sh
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | \
  gpg --dearmor | sudo tee /usr/share/keyrings/elasticsearch-keyring.gpg \
  && sudo chmod 644 /usr/share/keyrings/elasticsearch-keyring.gpg
```

### Add Elasticsearch Repository

```sh
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
```

### Install Elasticsearch

```sh
sudo apt update && sudo apt install elasticsearch
```

Make sure to remember or save the password which gets shown during installation.

### Start Elasticsearch

```sh
sudo systemctl enable elasticsearch.service --now
```

### Add Zammad Repository Key

Ubuntu & Debian:

```sh
curl -fsSL https://go.packager.io/srv/deb/zammad/zammad/gpg-key.asc | \
   gpg --dearmor | sudo tee /usr/share/keyrings/zammad.gpg > /dev/null \
   && sudo chmod 644 /usr/share/keyrings/zammad.gpg
```

### Add Zammad Repository

Debian 12:

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/12.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Debian 13:

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/debian/13.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Ubuntu 22.04:

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/22.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

Ubuntu 24.04:

```sh
sudo curl -fsSL "https://go.packager.io/srv/zammad/zammad/stable/installer/ubuntu/24.04.list" \
  -o /etc/apt/sources.list.d/zammad.list
```

### Install Zammad

```sh
sudo apt update && sudo apt install zammad
```

### Start Zammad

```sh
sudo systemctl start zammad
```

### Configure Zammad

Set the Elasticsearch server address:

```sh
zammad run rails r "Setting.set('es_url', 'https://localhost:9200')"
```

Set Elasticsearch user:

```sh
zammad run rails r "Setting.set('es_user', 'elastic')"
```

Set Elasticsearch password. Replace `<password>` with the one you got during the installation of Elasticsearch. In case
you need to create a new password, run `/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic`.

```sh
zammad run rails r "Setting.set('es_password', '<password>')"
```

### Add Elasticsearch Certificate to Zammad

```sh
sudo cat /etc/elasticsearch/certs/http_ca.crt | zammad run rails r 'SSLCertificate.create!(certificate: STDIN.read)'
```

### Initial Rebuild of Elasticsearch Search Index

```sh
zammad run rake zammad:searchindex:rebuild
```

### Verify Zammad Is Running

Open `localhost` and make sure you can see Zammad's setup screen.

EXECUTE NOW: Complete the above TODO list to achieve a successful installation of Zammad.
