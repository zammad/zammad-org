---
order: 5
title: 'Agentic Installation'
---

# Agentic Installation

::: danger
Be aware that the setup steps for AI agents don't cover security, network and configuration topics (e.g. SSL
certificates, hostname configuration, Elasticsearch settings). Instead, these steps are about a plain basic setup of
Zammad. To use it in production, make sure to configure it in a proper way according to the other ressources in this
documentation.
:::

If you want to install Zammad via LLM agent, do so by pointing your agent to
one of the installation instruction files you can find below.

## Installation via Docker Compose

This file covers an installation via Docker Compose by fetching the default
[Docker Compose repository](https://github.com/zammad/zammad-docker-compose)
of Zammad.

Prerequisites:

- Running Docker Compose setup
- Installed Git

Instructions:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-docker.md
```

## Installation via Package Manager

This file covers an installation via package manager, including
Elasticsearch.

Prerequisites:

- Host operating system: Ubuntu (22.04 or 24.04) or Debian (12 or 13).
- Installed `curl`, `apt-transport-https` and `gnupg`.
- A locale with UTF-8 support.

Instructions:

```plain
https://raw.githubusercontent.com/zammad/zammad-org/refs/heads/develop/install-package.md
```
