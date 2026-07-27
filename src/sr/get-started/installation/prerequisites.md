---
order: 1
title: Предуслови
---

# Предуслови

<!--@include: @/sr/modules/zammad-services-hint.md-->

## Server hardware

Хардверски предуслови зависе од сценарија. Ово отежава специфичне предлоге
за CPU и радну меморију који су прилагођени свим ситуацијама. У сваком
случају, јачи и бољи хардвер ће осигурати да Zammad ради глатко и да су
паузе у доступности током ажурирања верзија најкраће могуће.

Као апсолутни минимум за основну употребу са PostgreSQL сервером,
предлажемо:

- 2 CPU језгра
- 6 GB RAM (+4 GB за Elasticsearch)

За пример сценарија са максимално 40 оператера, добра почетна тачка је:

- 6 CPU језгара
- 6 GB RAM (+6 GB за Elasticsearch)

## Server software

На основу типа инсталације, постоје неки предуслови. Укључени су у упутства
за инсталацију:

- [Пакет](package)
- [Docker](docker)
- [Kubernetes](kubernetes)

## Client requirements

### Browser

Because Zammad is a web application, only an up-to-date browser is
needed. The following browsers are supported in their latest stable version:

- Firefox
- Chrome (and Chromium-based)
- Opera
- Safari

This does not mean that Zammad will not work with other browsers or older
versions, just that we do not test against or provide support for them.

### Network

Be aware that communication between client and server uses WebSockets. Some
firewalls and proxies may filter these connections. This could reduce
performance or prevent real-time updates.

### Display

Zammad adapts its layout to different screen sizes. For the best experience,
we recommend using a display with sufficient screen size and
resolution. When using small screens, Zammad collapses elements like the
sidebar to maintain usability. If these measures are not sufficient, a toast
warning shows up at the top of the screen. You can hide it by clicking the
corresponding button.

The standard desktop interface is intended for screens at least 640 px
wide. On narrower screens, use the [mobile
view](/en/documentation/use/guides/mobile-view).
