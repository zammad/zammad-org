---
title: Prerequisites
order: 1
---

# Prerequisites

<!--@include: @/en/modules/zammad-services-hint.md-->

## Server Hardware

The hardware requirements vary depending on the scenario. This makes it hard to come up with specific CPU and memory
numbers which are fitting for all use cases. In any case, more and better hardware ensures that Zammad runs smoothly
and the maintenance breaks for updates should be shorter as well.

As an absolute minimum for basic usage with a PostgreSQL server, we consider:

- 2 CPU cores
- 6 GB RAM (+4 GB for Elasticsearch)

For an example scenario with up to 40 agents, a good starting point could be:

- 6 CPU cores
- 6 GB RAM (+6 GB for Elasticsearch)

## Server Software

Depending on the installation type, there are some prerequisites. They are included in the installation instructions:

- [Package](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Client Requirements

Because Zammad is a web application, only an up-to-date browser is needed. The following browsers are supported in
their latest stable version:

- Firefox
- Chrome (and Chromium-based)
- Opera
- Safari

This does not mean that Zammad will not work with other browsers or older versions, just that we do not test against or
provide support for them.

The communication between client and server is based on web sockets. Some firewalls may filter these connections. This
may lead to decreased browser performance.
