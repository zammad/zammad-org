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

### Browser

Because Zammad is a web application, only an up-to-date browser is needed. The following browsers are supported in
their latest stable version:

- Firefox
- Chrome (and Chromium-based)
- Opera
- Safari

This does not mean that Zammad will not work with other browsers or older versions, just that we do not test against or
provide support for them.

### Network

Be aware that communication between client and server uses WebSockets. Some firewalls and proxies may filter these
connections. This could reduce performance or prevent real-time updates.

### Display

Zammad adapts its layout to different screen sizes. For the best experience, we recommend using a display with
sufficient screen size and resolution. When using small screens, Zammad collapses elements like the sidebar to maintain
usability. If these measures are not sufficient, a toast warning shows up at the top of the screen. You can hide it by
clicking the corresponding button.

The standard desktop interface is intended for screens at least 640 px wide. On narrower screens, use the
[mobile view](/en/documentation/use/guides/mobile-view).
